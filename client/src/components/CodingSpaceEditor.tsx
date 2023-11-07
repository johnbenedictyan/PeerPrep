import { useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { CodingLanguage, QuestionContext } from '../context/QuestionContext';
import CodeEditorEditor from './CodeEditorEditor';

function CodingSpaceEditor() {
    const languageOptions: CodingLanguage[] = useMemo(() => ["java", "cpp"], []);

    const { question, selectedLanguage, setSelectedLanguage } = useContext(QuestionContext);

    const handleLanguageChange = useCallback(
        (newLanguage: CodingLanguage) => {
            setSelectedLanguage(newLanguage);
        },
        [setSelectedLanguage],
    );

    const navigate = useNavigate();

    return (
        <div>
            <div className="flex flex-row justify-between items-center">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2">
                    Coding Space
                </h3>
                <div className="flex flex-row-reverse mb-4 gap-5">
                    <div>
                        <label
                            htmlFor="language"
                            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
                        >
                            Language
                        </label>
                        <select
                            id="language"
                            name="language"
                            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 sm:text-sm sm:leading-6"
                            value={selectedLanguage}
                            onChange={(e) =>
                                handleLanguageChange(e.target.value as CodingLanguage)
                            }
                        >
                            {languageOptions.map((lang, _index) => (
                                <option key={`lang-opt-${lang}`}>{lang}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="button"
                        className="rounded-md bg-slate-600 dark:bg-slate-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 dark:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 dark:focus-visible:outline-slate-400"
                        onClick={() => {
                            navigate(`/questions/${question.id}`);
                        }}
                    >
                        Return to Question
                    </button>
                </div>
            </div>
            <CodeEditorEditor />
        </div>
    );
}

export default CodingSpaceEditor;
