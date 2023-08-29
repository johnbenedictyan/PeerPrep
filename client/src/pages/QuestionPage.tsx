import { Link } from "react-router-dom";

interface IQuestion {
    id: number;
    title: string;
    difficulty: string;
    tags: string[];
}

const QuestionPage = () => {
    const questions: IQuestion[] = [
        { id: 1, title: "Subarray with given sum", difficulty: "easy", tags: ['algo'] },
        { id: 2, title: "Count the triplets", difficulty: "easy", tags: ['algo'] },
        { id: 3, title: "Kadane's Algorithm", difficulty: "easy", tags: ['algo'] },
        { id: 4, title: "Missing number in array", difficulty: "easy", tags: ['algo'] },
        { id: 5, title: "Merge two sorted arrays", difficulty: "easy", tags: ['algo'] },
        { id: 6, title: "Rearrange array alternatively", difficulty: "easy", tags: ['algo'] },
        { id: 7, title: "Number of pairs", difficulty: "easy", tags: ['algo'] },
        { id: 8, title: "Inversion of Array", difficulty: "easy", tags: ['algo'] },
        { id: 9, title: "Sort an array of 0s, 1s and 2s", difficulty: "easy", tags: ['algo'] },
        { id: 10, title: "Equilibrium point", difficulty: "easy", tags: ['algo'] },
        { id: 11, title: "Leaders in an array", difficulty: "easy", tags: ['algo'] },
        { id: 12, title: "Minimum Platforms", difficulty: "easy", tags: ['algo'] },
        { id: 13, title: "Reverse array in groups", difficulty: "easy", tags: ['algo'] },
        { id: 14, title: "K'th smallest element", difficulty: "easy", tags: ['algo'] },
        { id: 15, title: "Trapping Rain Water", difficulty: "easy", tags: ['algo'] },
        { id: 16, title: "Pythagorean Triplet", difficulty: "easy", tags: ['algo'] },
        { id: 17, title: "Chocolate Distribution Problem", difficulty: "easy", tags: ['algo'] },
        { id: 18, title: "Stock buy and sell", difficulty: "easy", tags: ['algo'] },
        { id: 19, title: "Element with left side smaller and right side greater", difficulty: "easy", tags: ['algo'] },
        { id: 20, title: "Convert array into Zig-Zag fashion", difficulty: "easy", tags: ['algo'] },
        { id: 21, title: "Last Index of 1", difficulty: "easy", tags: ['algo'] },
        { id: 22, title: "Spirally traversing a matrix", difficulty: "easy", tags: ['algo'] },
        { id: 23, title: "Largest Number formed from an Array", difficulty: "easy", tags: ['algo'] },
        { id: 24, title: "Permutations of a given string", difficulty: "easy", tags: ['algo'] },
        { id: 25, title: "Longest Palindrome in a String", difficulty: "easy", tags: ['algo'] },
        { id: 26, title: "Recursively remove all adjacent duplicates", difficulty: "easy", tags: ['algo'] },
        { id: 27, title: "Check if string is rotated by two places", difficulty: "easy", tags: ['algo'] },
        { id: 28, title: "Roman Number to Integer", difficulty: "easy", tags: ['algo'] },
        { id: 29, title: "Anagram", difficulty: "easy", tags: ['algo'] },
        { id: 30, title: "Remove Duplicates", difficulty: "easy", tags: ['algo'] },
        { id: 31, title: "Form a Palindrome", difficulty: "easy", tags: ['algo'] },
        { id: 32, title: "Longest Distinct Characters in the string", difficulty: "easy", tags: ['algo'] },
        { id: 33, title: "Implement Atoi", difficulty: "easy", tags: ['algo'] },
        { id: 34, title: "Implement strstr", difficulty: "easy", tags: ['algo'] },
        { id: 35, title: "Longest Common Prefix", difficulty: "easy", tags: ['algo'] },
        { id: 36, title: "Finding middle element in a linked list", difficulty: "easy", tags: ['algo'] },
        { id: 37, title: "Reverse a linked list", difficulty: "easy", tags: ['algo'] },
        { id: 38, title: "Rotate a Linked List", difficulty: "easy", tags: ['algo'] },
        { id: 39, title: "Reverse a Linked List in groups of given size", difficulty: "easy", tags: ['algo'] },
        { id: 40, title: "Intersection point in Y shaped linked lists", difficulty: "easy", tags: ['algo'] },
        { id: 41, title: "Detect Loop in linked list", difficulty: "easy", tags: ['algo'] },
        { id: 42, title: "Remove loop in Linked List", difficulty: "easy", tags: ['algo'] },
        { id: 43, title: "n'th node from end of linked list", difficulty: "easy", tags: ['algo'] },
        { id: 44, title: "Flattening a Linked List", difficulty: "easy", tags: ['algo'] },
        { id: 45, title: "Merge two sorted linked lists", difficulty: "easy", tags: ['algo'] },
    ]

    return (
        <div className="min-h-full">
            <div className="py-5">
                <main>
                    <div className="mx-auto max-w-9xl sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-base font-semibold leading-6 text-gray-900">Questions</h1>
                                <p className="mt-2 text-sm text-gray-700">
                                    A list of all Questions
                                </p>
                            </div>
                            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                <button
                                    type="button"
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Random Question
                                </button>
                            </div>
                        </div>
                        <div className="mt-8 flow-root">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
                                                >
                                                    Status
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                                                >
                                                    Title
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                                                >
                                                    Difficulty
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                                                >
                                                    Tags
                                                </th>
                                                <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-0">
                                                    <span className="sr-only">Attempt</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {questions.map((question) => (
                                                <tr key={question.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                        {'Not Done'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{question.title}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{question.difficulty}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{
                                                        question.tags.map((tag) => (
                                                            <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                                                {tag}
                                                            </span>
                                                        ))
                                                    }</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                        <Link to={`${question.id}`} className="text-indigo-600 hover:text-indigo-900">
                                                            Attempt
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
export default QuestionPage;