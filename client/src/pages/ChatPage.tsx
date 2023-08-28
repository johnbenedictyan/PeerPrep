import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { classNames } from '../util/ClassNames';
import VideoCall from '../components/VideoCall';
import Chat from '../components/Chat';


export default function ChatPage() {
    const product = {
        name: 'Zip Tote Basket',
        price: '$140',
        rating: 4,
        images: [
            {
                id: 1,
                name: 'Angled view',
                src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
                alt: 'Angled front view with bag zipped and handles upright.',
            },
            // More images...
        ],
        colors: [
            { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
            { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
            { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
        ],
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
                                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

                                            <div className="mt-3">
                                                <h2 className="sr-only">Product information</h2>
                                                <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>
                                            </div>

                                            <div className="mt-6">
                                                <h3 className="sr-only">Description</h3>

                                                <div
                                                    className="space-y-6 text-base text-gray-700"
                                                    dangerouslySetInnerHTML={{ __html: product.description }} />
                                            </div>

                                            <section aria-labelledby="details-heading" className="mt-12">
                                                <h2 id="details-heading" className="sr-only">
                                                    Additional details
                                                </h2>

                                                <div className="divide-y divide-gray-200 border-t">
                                                    {product.details.map((detail) => (
                                                        <Disclosure as="div" key={detail.name}>
                                                            {({ open }) => (
                                                                <>
                                                                    <h3>
                                                                        <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                                                                            <span
                                                                                className={classNames(open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}
                                                                            >
                                                                                {detail.name}
                                                                            </span>
                                                                            <span className="ml-6 flex items-center">
                                                                                {open ? (
                                                                                    <MinusIcon
                                                                                        className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                                                                        aria-hidden="true" />
                                                                                ) : (
                                                                                    <PlusIcon
                                                                                        className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                                        aria-hidden="true" />
                                                                                )}
                                                                            </span>
                                                                        </Disclosure.Button>
                                                                    </h3>
                                                                    <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                                                                        <ul role="list">
                                                                            {detail.items.map((item) => (
                                                                                <li key={item}>{item}</li>
                                                                            ))}
                                                                        </ul>
                                                                    </Disclosure.Panel>
                                                                </>
                                                            )}
                                                        </Disclosure>
                                                    ))}
                                                </div>
                                            </section>

                                            <div>
                                                <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2">Coding Space</h3>
                                                <div className='h-144 border rounded-lg shadow'>

                                                </div>
                                            </div>


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
