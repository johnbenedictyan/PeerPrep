import Chat from '../components/Chat';
import CodingSpace from '../components/CodingSpace';
import Question, { IQuestion } from '../components/Question';
import VideoCall from '../components/VideoCall';

export default function ChatPage() {
    const question: IQuestion = {
        name: 'Zip Tote Basket',
        difficulty: 'easy',
        description: `
          <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
        `,
        details: [
            {
                name: 'Features',
                items: [
                    'Multiple strap configurations',
                    'Spacious interior with top zip',
                    'Leather handle and tabs',
                    'Interior dividers',
                    'Stainless strap loops',
                    'Double stitched construction',
                    'Water-resistant',
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
                <div className="py-10">
                    <header>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Chat</h1>
                        </div>
                    </header>
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
