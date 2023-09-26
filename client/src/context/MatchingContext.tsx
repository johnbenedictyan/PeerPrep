import { ReactNode, createContext, useState } from "react";
import { socket } from "../util/socket";
import { User } from "firebase/auth";

interface Props {
    children?: ReactNode
}

interface MatchingContextType {
    matchingId: string | null,
    matchedUserId: string | null,
    setMatchedUserId: React.Dispatch<React.SetStateAction<string | null>>,
    setMatchingId: React.Dispatch<React.SetStateAction<string | null>>,
    cancelMatch: (currentUser: User) => void
}

export const MatchingContext = createContext<MatchingContextType>({
    matchingId: null,
    matchedUserId: null,
    setMatchedUserId: () => { },
    setMatchingId: () => { },
    cancelMatch: () => { }
});

export const MatchingProvider = ({ children }: Props) => {
    const [matchedUserId, setMatchedUserId] = useState<string | null>(null)
    const [matchingId, setMatchingId] = useState<string | null>(null)

    const cancelMatch = (currentUser: User) => {
        socket.connect();
        if(!matchingId) return;

        socket.emit("cancel-match", {
            userId: currentUser.uid,
            requestId: matchingId,
        });
    }

    const value = {
        matchingId,
        matchedUserId,
        setMatchedUserId,
        setMatchingId,
        cancelMatch
    }

    return <MatchingContext.Provider value={value}>{children}</MatchingContext.Provider>;
}