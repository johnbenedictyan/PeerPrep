import { ReactNode, createContext, useState } from "react";

interface Props {
    children?: ReactNode
}

interface MatchingContextType {
    matchedUserId: string | null,
    setMatchedUserId: React.Dispatch<React.SetStateAction<string | null>>
}

export const MatchingContext = createContext<MatchingContextType | undefined>(undefined);

export const MatchingProvider = ({ children }: Props) => {
    const [matchedUserId, setMatchedUserId] = useState<string | null>(null)

    const value = {
        matchedUserId,
        setMatchedUserId,
    }

    return <MatchingContext.Provider value={value}>{children}</MatchingContext.Provider>;
}