import CodeMirror, { Extension, ViewUpdate } from '@uiw/react-codemirror';
import { useCallback, useContext, useEffect, useState } from 'react';

import { langs } from '@uiw/codemirror-extensions-langs';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/FirebaseAuthContext';
import { MatchingContext } from '../context/MatchingContext';
import { socket } from '../util/socket';
import CodeResult from './CodeResult';

interface ICodeEditorProps {
    selectedLanguage: string;
}

const CodeEditor: React.FC<ICodeEditorProps> = ({ selectedLanguage }) => {
    const [currentCode, setCurrentCode] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const [codeSubmitted, setCodeSubmitted] = useState<boolean>(false);
    const [codeResult, setCodeResult] = useState<string>('');
    const [extensions, setExtensions] = useState<Extension[]>();
    const { matchingId, setMatchedUserId, setMatchingId } = useContext(MatchingContext);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
        setCurrentCode(value);
    }, []);

    const handleCancelMatch = () => {
        setMatchedUserId(null);
        setMatchingId(null);
        navigate('/match')
    }

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

    useEffect(() => {
        function onJoined(message: string) {
            console.log(message);
        }

        function onDisconnect() {
        }

        function onEditCode(value: any) {
            const valString = JSON.stringify(value);
            const obj = JSON.parse(valString);
            const { userId, requestId, code } = obj;
            console.log(userId, "\n", currentUser!.uid, "\n", requestId, "\n", matchingId)
            if (userId == currentUser!.uid || requestId != matchingId || code == currentCode) {
                return;
            }
            setCurrentCode(code);
        }

        function onCancelMatch(value: any) {
            const valString = JSON.stringify(value);
            const obj = JSON.parse(valString);
            const { userId, requestId } = obj;
            if (userId != currentUser!.uid || requestId == matchingId) {
                handleCancelMatch();
            }
        }

        socket.connect();
        socket.on('joined', onJoined);
        socket.on('disconnect', onDisconnect);
        socket.on('edit-code', onEditCode);
        socket.on('cancel-match', onCancelMatch);

        return () => {
            socket.off('joined', onJoined);
            socket.off('disconnect', onDisconnect);
            socket.off('edit-code', onEditCode);
            socket.off('cancel-match', onCancelMatch);
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        socket.connect();
        socket.emit("session-begin", {
            userId: currentUser!.uid,
            matchingId: matchingId
        });
        return () => {
            console.log("AHH")
        };
    }, [matchingId]);

    useEffect(() => {
        socket.connect();
        socket.emit("edit-code", {
            userId: currentUser!.uid,
            requestId: matchingId,
            code: currentCode
        });
        return () => {
            console.log("BHHH")
        };
    }, [currentCode]);

    return (
        <div>
            <div className='h-144 border rounded-lg shadow'>
                <CodeMirror
                    value={currentCode}
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