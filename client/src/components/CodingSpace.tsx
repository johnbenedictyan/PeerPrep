import { useState } from "react";
import CodeEditor from './CodeEditor';


const CodingSpace: React.FC = () => {
    const languageOptions = [
        'JavaScript',
        'Python',
        'Java',
        'C++',
    ]

    const [selectedLanguage, setSelectedLanguage] = useState<string>(languageOptions[0]);

    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2">Coding Space</h3>
                <div className='mb-4'>
                    <label htmlFor="language" className="block text-sm font-medium leading-6 text-gray-900">
                        Language
                    </label>
                    <select
                        id="language"
                        name="language"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue="Canada"
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                    >
                        {
                            languageOptions.map((language, index) => {
                                return <option key={index}>{language}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <CodeEditor selectedLanguage={selectedLanguage} />
        </div>
    )
}

export default CodingSpace;