import { ReactNode, createContext, useState } from "react";

interface Props {
    children?: ReactNode
}

interface MatchingContextType {
    matchingId: string | null,
    matchedUserId: string | null,
    setMatchedUserId: React.Dispatch<React.SetStateAction<string | null>>,
    setMatchingId: React.Dispatch<React.SetStateAction<string | null>>,
}

export const MatchingContext = createContext<MatchingContextType>({
    matchingId: null,
    matchedUserId: null,
    setMatchedUserId: () => {},
    setMatchingId: () => {},
});

export const MatchingProvider = ({ children }: Props) => {
    const [matchedUserId, setMatchedUserId] = useState<string | null>(null)
    const [matchingId, setMatchingId] = useState<string | null>(null)

    const value = {
        matchingId,
        matchedUserId,
        setMatchedUserId,
        setMatchingId
    }

    return <MatchingContext.Provider value={value}>{children}</MatchingContext.Provider>;
}