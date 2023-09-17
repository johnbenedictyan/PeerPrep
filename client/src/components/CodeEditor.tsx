import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';

import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { useCallback } from 'react';

interface ICodeEditorProps {
    selectedLanguage: string;
}

const CodeEditor: React.FC<ICodeEditorProps> = ({ selectedLanguage }) => {
    const languageMap = {
        'JavaScript': javascript,
        'Python': python,
        'Java': java,
        'C++': cpp,
    }

    const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
        console.log('value:', value);
    }, []);

    return (
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
    )
};

export default CodeEditor;