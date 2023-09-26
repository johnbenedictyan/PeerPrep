import CodeMirror, { Extension, ViewUpdate } from '@uiw/react-codemirror';
import { useCallback, useEffect, useState } from 'react';

import { langs } from '@uiw/codemirror-extensions-langs';
import CodeResult from './CodeResult';

interface ICodeEditorProps {
    selectedLanguage: string;
}

const CodeEditor: React.FC<ICodeEditorProps> = ({ selectedLanguage }) => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [codeSubmitted, setCodeSubmitted] = useState<boolean>(false);
    const [codeResult, setCodeResult] = useState<string>('');
    const [extensions, setExtensions] = useState<Extension[]>();

    const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
        setCode(value);
    }, []);

    const handleSubmit = () => {
        console.log('submitting code');
        setCodeResult('hello world!');
        setCodeSubmitted(true);
    }

    useEffect(() => {
        const lang = selectedLanguage.toLowerCase() as keyof typeof langs;
        if (langs[lang]) {
            setExtensions([langs[lang]()]);
        } else {
            setExtensions([]);
        }
    }, [selectedLanguage]);

    return (
        <div>
            <div className='h-144 border rounded-lg shadow'>
                <CodeMirror
                    value={code}
                    height="576px"
                    extensions={extensions}
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