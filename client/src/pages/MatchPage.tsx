import { useState } from "react";
import MatchingModal from "../components/MatchingModal";

const MatchPage = () => {
    const difficulty = [
        { id: 1, name: 'Easy' },
        { id: 2, name: 'Medium' },
        { id: 3, name: 'Hard' },
    ]

    const [open, setOpen] = useState(false);

    return (
        <div className="space-y-16 py-16 xl:space-y-20">
            {/* Recent activity table */}
            <div>
                {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                        Recent activity
                    </h2>
                </div> */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                        <div className="bg-white py-24 sm:py-32">
                            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                                    {difficulty.map((stat) => (
                                        <button key={stat.id} className="rounded-md bg-white px-3.5 py-16 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={() => setOpen(true)}>
                                            <dd className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                                {stat.name}
                                            </dd>
                                        </button>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <MatchingModal open={open} setOpen={setOpen} />
            </div>
        </div>
    )
}

export default MatchPage;