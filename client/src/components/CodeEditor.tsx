import { langs } from "@uiw/codemirror-extensions-langs";
import CodeMirror, { Extension, ViewUpdate } from "@uiw/react-codemirror";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/FirebaseAuthContext";
import { MatchingContext } from "../context/MatchingContext";
import CodeResult from "./CodeResult";

interface ICodeEditorProps {
  selectedLanguage: string;
}

const CodeEditor: React.FC<ICodeEditorProps> = ({ selectedLanguage }) => {
  const [currentCode, setCurrentCode] = useState("");
  const [_codeSubmitted, setCodeSubmitted] = useState<boolean>(false);
  const [codeResult, setCodeResult] = useState<string>("");
  const [extensions, setExtensions] = useState<Extension[]>();
  const { socketCode, changeCode } = useContext(MatchingContext);
  const { currentUser } = useContext(AuthContext);

  const onChange = useCallback((value: string, _viewUpdate: ViewUpdate) => {
    setCurrentCode(value);
  }, []);

  const handleSubmit = () => {
    console.log("submitting code");
    setCodeResult("hello world!");
    setCodeSubmitted(true);
  };

  useEffect(() => {
    const lang = selectedLanguage.toLowerCase() as keyof typeof langs;
    if (langs[lang]) {
      setExtensions([langs[lang]()]);
    } else {
      setExtensions([]);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (!currentUser) return;
    if (socketCode == "") return;
    if (socketCode == currentCode) return;
    setCurrentCode(socketCode);
  }, [socketCode]);

  useEffect(() => {
    if (!currentUser) return;
    changeCode(currentCode);
  }, [currentCode]);

  return (
    <div>
      <div className="h-144 border rounded-lg shadow">
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
  );
};

export default CodeEditor;
