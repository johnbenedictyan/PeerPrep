import { useContext, useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import MatchingModal from '../components/MatchingModal';
import ThreeTier from '../components/ThreeTier';
import { AuthContext } from '../context/FirebaseAuthContext';
import { MatchingContext } from '../context/MatchingContext';
import MatchingController from '../controllers/matching/matching.controller';
import { socket } from '../util/socket';



const MatchPage = () => {
    const { currentUser } = useContext(AuthContext);
    const { matchedUserId, setMatchedUserId } = useContext(MatchingContext)!;

    const [difficulty, setDifficulty] = useState<string>('');
    const [open, setOpen] = useState(false);

    const [establishedConnection, setEstablishedConnection] = useState<boolean>(false);
    const [foundMatch, setFoundMatch] = useState<boolean>(false);

    const [connectionLoading, setConnectionLoading] = useState<boolean>(true);
    const [matchLoading, setMatchLoading] = useState<boolean>(true);

    const navigate = useNavigate();

    const matchingController = useRef<MatchingController>(new MatchingController());


    useEffect(() => {
        if (matchedUserId) {
            console.log(matchedUserId)
            navigate('/questions/1');
        }
    }, [matchedUserId]);


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
            setFoundMatch(true);
            setMatchLoading(false);
            // parse the value from json
            const { user1Id, user2Id } = JSON.parse(value);

            if (user1Id === currentUser?.uid) {
                setMatchedUserId(user2Id);
            } else {
                setMatchedUserId(user1Id);
            }
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

    useEffect(() => {
        if (difficulty == '' || foundMatch || !establishedConnection || !currentUser) {
            return;
        }
        setOpen(true);

        matchingController.current.createMatchingRequest({
            userId: currentUser!.uid,
            difficulty
        });
    }, [difficulty]);

    const cancelMatch = () => {
        setOpen(false);
        setFoundMatch(false);
        setMatchLoading(true);
        matchingController.current.cancelMatchingRequest({
            userId: currentUser!.uid
        });
    }


    return (
        <div className="space-y-16 py-16 xl:space-y-20">
            <ThreeTier
                setDifficulty={setDifficulty}
            />
            <MatchingModal
                difficulty={difficulty}
                open={open}
                setOpen={setOpen}
                connectionLoading={connectionLoading}
                connectionSuccess={establishedConnection}
                matchLoading={matchLoading}
                matchSuccess={foundMatch}
                cancelMatch={cancelMatch}
            />
        </div>
    )
}

export default MatchPage;