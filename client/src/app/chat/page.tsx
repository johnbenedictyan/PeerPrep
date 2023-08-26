'use client'

import React, { useEffect } from 'react';
import { uuid } from 'uuidv4';

interface IMessage {
    sender: string;
    message: string;
}

export default function ChatPage() {
    const [recvIdInput, setRecvIdInput] = React.useState<string>('')
    const [messages, setMessages] = React.useState<any>([])
    const [currMessage, setCurrMessage] = React.useState<string>('')
    const [userId, setUserId] = React.useState<string>('')

    const handleConnect = () => { };

    const handleSend = () => { };

    useEffect(() => {
        setUserId(uuid());
        import("peerjs").then(({ default: Peer }) => {
            // normal synchronous code
            const peer = new Peer(userId, { host: 'localhost', port: 9000 });
            peer.on('open', id => {
                console.log(id);
            })
        })
    }, [])

    return (
        <div className="bg-white p-5 h-full">
            <div className="space-y-4">
                <div>
                    <h1 className="text-lg font-medium leading-6 text-gray-900">Chat Page</h1>
                </div>
                <div>
                    <h1 className="text-md font-medium leading-6 text-gray-900">{`Your Id: ${userId}`}</h1>
                </div>
                <div>
                    <label htmlFor="connectorId" className="block text-sm font-medium leading-6 text-gray-900">
                        Connector Id
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="connectorId"
                            id="connectorId"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="you@example.com"
                            aria-describedby="connectorId-description"
                            onChange={(e) => setRecvIdInput(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="mt-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleConnect}
                    >
                        Connect
                    </button>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="min-w-0 flex-1">
                        <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                            <label htmlFor="comment" className="sr-only">
                                Add your comment
                            </label>
                            <textarea
                                rows={3}
                                name="comment"
                                id="comment"
                                className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Add your comment..."
                                value={currMessage}
                                onChange={(e) => setCurrMessage(e.target.value)}
                            />

                            {/* Spacer element to match the height of the toolbar */}
                            <div className="py-2" aria-hidden="true">
                                {/* Matches height of button in toolbar (1px border + 36px content height) */}
                                <div className="py-px">
                                    <div className="h-9" />
                                </div>
                            </div>
                        </div>

                        <div className="inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
                            <div className="flex-shrink-0">
                                <button
                                    type="button"
                                    className="items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={handleSend}
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    {messages.map((message: IMessage, idx: number) => {
                        <div key={idx}>
                            <h1>{message.sender}</h1>
                            <p>{message.message}</p>
                        </div>
                    })}
                </div>

                {/* <ul role="list" className="space-y-6">
                {activity.map((activityItem, activityItemIdx) => (
                    <li key={activityItem.id} className="relative flex gap-x-4">
                        <div
                            className={classNames(
                                activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-6',
                                'absolute left-0 top-0 flex w-6 justify-center'
                            )}
                        >
                            <div className="w-px bg-gray-200" />
                        </div>
                        {activityItem.type === 'commented' ? (
                            <>
                                <img
                                    src={activityItem.person.imageUrl}
                                    alt=""
                                    className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
                                />
                                <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                                    <div className="flex justify-between gap-x-4">
                                        <div className="py-0.5 text-xs leading-5 text-gray-500">
                                            <span className="font-medium text-gray-900">{activityItem.person.name}</span> commented
                                        </div>
                                        <time dateTime={activityItem.dateTime} className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                                            {activityItem.date}
                                        </time>
                                    </div>
                                    <p className="text-sm leading-6 text-gray-500">{activityItem.comment}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                                    {activityItem.type === 'paid' ? (
                                        <CheckCircleIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                                    ) : (
                                        <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
                                    )}
                                </div>
                                <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                                    <span className="font-medium text-gray-900">{activityItem.person.name}</span> {activityItem.type} the
                                    invoice.
                                </p>
                                <time dateTime={activityItem.dateTime} className="flex-none py-0.5 text-xs leading-5 text-gray-500">
                                    {activityItem.date}
                                </time>
                            </>
                        )}
                    </li>
                ))}
            </ul> */}
            </div>
        </div>
    );
}