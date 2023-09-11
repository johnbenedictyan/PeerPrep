import { useState } from "react";
import MatchingModal from "../components/MatchingModal";
import ThreeTier from "../components/ThreeTier";

const MatchPage = () => {
    const [difficulty, setDifficulty] = useState<string>('');
    const [open, setOpen] = useState(false);

    return (
        <div className="space-y-16 py-16 xl:space-y-20">
            <ThreeTier modalController={setOpen} difficultyController={setDifficulty} />
            <MatchingModal difficulty={difficulty} open={open} setOpen={setOpen} />
        </div>
    )
}

export default MatchPage;