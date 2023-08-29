import Chat from '../components/Chat';
import CodingSpace from '../components/CodingSpace';
import Question, { IQuestion } from '../components/Question';
import VideoCall from '../components/VideoCall';

export default function SingleQuestionPage() {
    const question: IQuestion = {
        name: 'Two Sum',
        difficulty: 'Easy',
        description: `
          <p>
          Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
          You may assume that each input would have exactly one solution, and you may not use the same element twice.
          You can return the answer in any order.
          </p>
        `,
        details: [
            {
                name: 'Examples',
                items: [
                    `<p>Input: nums = [2,7,11,15], target = 9</p>
                    <p>Output: [0,1]</p>
                    <p>Explanation: Because nums[0] + nums[1] == 9, we return [0, 1]</p>`,
                    `<p>Input: nums = [3,2,4], target = 6</p>
                    <p>Output: [1,2]</p>`,
                    `<p>Input: nums = [3,3], target = 6</p>
                    <p>Output: [0,1]</p>`,
                ],
            },
            {
                name: 'Constraints',
                items: [
                    '2 <= nums.length <= 104',
                    '-10^9 <= nums[i] <= 10^9',
                    '-10^9 <= target <= 10^9',
                    'Only one valid answer exists',
                ],
            },
            // More sections...
        ],
    };

    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
            <div className="min-h-full">
                <div className="py-0">
                    {/* <header>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Chat</h1>
                        </div>
                    </header> */}
                    <main>
                        <div className="mx-auto max-w-9xl sm:px-6 lg:px-8">
                            <div className="bg-white">
                                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl xl:max-w-9xl lg:px-8">
                                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 xl:grid-cols-3 xl:gap-x-12">


                                        {/* Product info */}
                                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 xl:col-span-2">
                                            <Question question={question} />
                                            <CodingSpace />
                                        </div>


                                        {/* Image gallery */}
                                        <div className="flex flex-col">
                                            <VideoCall />
                                            <Chat />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
