import { useContext, useEffect, useState } from 'react';

import MatchingModal from '../components/MatchingModal';
import ThreeTier from '../components/ThreeTier';
import { AuthContext } from '../context/FirebaseAuthContext';
import { socket } from '../util/socket';
import MatchingController from '../controllers/matching/matching.controller';
import { useNavigate } from 'react-router-dom';


const MatchPage = () => {
    const { currentUser } = useContext(AuthContext);
    const [difficulty, setDifficulty] = useState<string>('');
    const [open, setOpen] = useState(false);

    const [establishedConnection, setEstablishedConnection] = useState<boolean>(false);
    const [foundMatch, setFoundMatch] = useState<boolean>(false);

    const [connectionLoading, setConnectionLoading] = useState<boolean>(true);
    const [matchLoading, setMatchLoading] = useState<boolean>(true);

    const navigate = useNavigate();


    useEffect(() => {
        function onJoined(message: string) {
            console.log(message);
            setEstablishedConnection(true);
            setConnectionLoading(false);
        }

        function onDisconnect() {
            setEstablishedConnection(false);
            setConnectionLoading(true);
        }

        function onMatchEvent(value: any) {
            console.log(value);
            setFoundMatch(true);
            setMatchLoading(false);
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }

        socket.on('joined', onJoined);
        socket.on('disconnect', onDisconnect);
        socket.on('success-matching', onMatchEvent);

        return () => {
            socket.off('joined', onJoined);
            socket.off('disconnect', onDisconnect);
            socket.off('success-matching', onMatchEvent);
            socket.disconnect();
        };
    }, [navigate]);

    useEffect(() => {
        console.log("Trying to join")
        if (currentUser) {
            if (!establishedConnection) {
                socket.connect();
            }
            socket.emit("join", {
                userId: currentUser.uid
            });
        }
        return () => {
            socket.disconnect();
        };
    }, [currentUser]);

    const handleSubmitMatchReq = () => {
        if (foundMatch && !establishedConnection && !currentUser) {
            return;
        }
        setOpen(true);
        const matchingController = new MatchingController();
        matchingController.createMatchingRequest({
            userId: currentUser!.uid,
            difficulty
        });
    }

    return (
        <div className="space-y-16 py-16 xl:space-y-20">
            <ThreeTier
                handleSubmitMatchReq={handleSubmitMatchReq}
                difficultyController={setDifficulty}
            />
            <MatchingModal
                difficulty={difficulty}
                open={open}
                setOpen={setOpen}
                connectionLoading={connectionLoading}
                connectionSuccess={establishedConnection}
                matchLoading={matchLoading}
                matchSuccess={foundMatch}
            />
        </div>
    )
}

export default MatchPage;