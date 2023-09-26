import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { socket } from "../util/socket";
import { User } from "firebase/auth";
import { AuthContext } from "./FirebaseAuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
    children?: ReactNode
}

interface MatchingContextType {
    matchingId: string,
    matchedUserId: string,
    setMatchedUserId: React.Dispatch<React.SetStateAction<string>>,
    setMatchingId: React.Dispatch<React.SetStateAction<string>>,
    beginCollaboration: (currentUser: User) => void
    cancelCollaboration: (currentUser: User) => void
    changeCode: (currentUser: User, code: string) => void
    socketCode: string
    establishedConnection: boolean
    foundMatch: boolean
    connectionLoading: boolean
    matchLoading: boolean
}

export const MatchingContext = createContext<MatchingContextType>({
    matchingId: '',
    matchedUserId: '',
    setMatchedUserId: () => { },
    setMatchingId: () => { },
    beginCollaboration: () => { },
    cancelCollaboration: () => { },
    changeCode: () => { },
    socketCode: '',
    establishedConnection: false,
    foundMatch: false,
    connectionLoading: true,
    matchLoading: true,
});

export const MatchingProvider = ({ children }: Props) => {
    const events = new Map<string, string>([
        ["join", "joined"],
        ["begin-collaboration", "collaboration-begun"],
        ["change-code", "code-changed"],
        ["cancel-collaboration", "collaboration-cancelled"],
    ]);

    const { currentUser } = useContext(AuthContext);

    const [establishedConnection, setEstablishedConnection] = useState<boolean>(false);
    const [foundMatch, setFoundMatch] = useState<boolean>(false);

    const [connectionLoading, setConnectionLoading] = useState<boolean>(true);
    const [matchLoading, setMatchLoading] = useState<boolean>(true);

    const [matchedUserId, setMatchedUserId] = useState<string>('')
    const [matchingId, setMatchingId] = useState<string>('')

    const [socketCode, setSocketCode] = useState<string>('')

    const navigate = useNavigate();

    const join = (currentUser: User) => {
        if (!currentUser) return;
        socket.emit("join", {
            userId: currentUser.uid,
        });
    }

    const cancelCollaboration = (currentUser: User) => {
        if (!matchingId) return;
        socket.emit("cancel-collaboration", {
            userId: currentUser.uid,
            requestId: matchingId,
        });
        setMatchedUserId('');
        setMatchingId('');
    }

    const beginCollaboration = (currentUser: User) => {
        if (!currentUser) return;
        socket.emit("begin-collaboration", {
            userId: currentUser.uid,
            requestId: matchingId,
        });
    }

    const changeCode = (currentUser: User, code: string) => {
        if (!currentUser || !matchingId) return;
        socket.emit("change-code", {
            userId: currentUser.uid,
            requestId: matchingId,
            code
        });
    }

    const onJoined = (message: string) => {
        setEstablishedConnection(true);
        setConnectionLoading(false);
        setMatchLoading(true);
    }

    const onDisconnect = () => {
        console.log('Disconnected');
    }

    const onMatchingCreated = (value: any) => {
        if (!currentUser) return;
        const obj = JSON.parse(value);
        const { user1Id, user2Id, requestId } = obj;
        if (user1Id == currentUser.uid) {
            setMatchedUserId((prev) => user2Id);
        } else {
            setMatchedUserId((prev) => user1Id);
        }
        setMatchingId((prev) => requestId)
        setMatchLoading(false);
        setFoundMatch(true);
    }

    const onCodeChanged = (value: any) => {
        const valString = JSON.stringify(value);
        const obj = JSON.parse(valString);
        const { userId, requestId, code } = obj;
        if (userId == currentUser!.uid || requestId != matchingId) return;
        setSocketCode(code);
    }

    const onCollaborationCancelled = (value: any) => {
        const valString = JSON.stringify(value);
        const obj = JSON.parse(valString);
        const { userId, requestId } = obj;
        if (userId == currentUser!.uid || requestId != matchingId) return
        setMatchedUserId('');
        setMatchingId('');
        navigate('/match');
    }

    useEffect(() => {
        setConnectionLoading(true);
        socket.connect();

        if (currentUser) {
            join(currentUser);
        };

        socket.on('joined', onJoined);
        socket.on('disconnect', onDisconnect);
        socket.on('matching-created', onMatchingCreated);

        return () => {
            socket.off('joined', onJoined);
            socket.off('disconnect', onDisconnect);
            socket.off('matching-created', onMatchingCreated);
            socket.disconnect();
        };
    }, [currentUser]);

    useEffect(() => {
        setConnectionLoading(true);
        socket.connect();

        if (currentUser) {
            join(currentUser);
        };

        socket.on('code-changed', onCodeChanged);
        socket.on('collaboration-cancelled', onCollaborationCancelled);

        return () => {
            socket.off('code-changed', onCodeChanged);
            socket.off('collaboration-cancelled', onCollaborationCancelled);
            socket.disconnect();
        };
    }, [currentUser, matchedUserId, matchingId]);


    const value = {
        matchingId,
        matchedUserId,
        setMatchedUserId,
        setMatchingId,
        beginCollaboration,
        cancelCollaboration,
        changeCode,
        socketCode,
        establishedConnection,
        foundMatch,
        connectionLoading,
        matchLoading
    }

    return <MatchingContext.Provider value={value}>{children}</MatchingContext.Provider>;
}