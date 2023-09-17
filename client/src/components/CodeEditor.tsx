import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';

import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { useCallback, useState } from 'react';
import CodeResult from './CodeResult';

interface ICodeEditorProps {
    selectedLanguage: string;
}

const CodeEditor: React.FC<ICodeEditorProps> = ({ selectedLanguage }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [codeSubmitted, setCodeSubmitted] = useState<boolean>(false);
    const [codeResult, setCodeResult] = useState<string>('');

    const languageMap = {
        'JavaScript': javascript,
        'Python': python,
        'Java': java,
        'C++': cpp,
    }

    const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
        console.log('value:', value);
    }, []);

    const handleSubmit = () => {
        console.log('submitting code');
        setCodeResult('hello world!');
        setCodeSubmitted(true);
    }

    return (
        <div>
            <div className='h-144 border rounded-lg shadow'>
                <CodeMirror
                    value="console.log('hello world!');"
                    height="576px"
                    extensions={[
                        // Load all languages
                        javascript(),
                        python(),
                        java(),
                        cpp(),
                    ]}
                    onChange={onChange}
                />
            </div>
            <div className="flex flex-row-reverse mt-5">
                <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleSubmit}
                >
                    Submit Code
                </button>
            </div>
            <div className="mt-5">
                <CodeResult result={codeResult} />
            </div>
        </div>

    )
};

export default CodeEditor;