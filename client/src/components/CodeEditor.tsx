import { langs } from "@uiw/codemirror-extensions-langs";
import CodeMirror, { Extension, ViewUpdate } from "@uiw/react-codemirror";
import { useCallback, useContext, useEffect, useState } from "react";

import { CollaborationContext } from "../context/CollaborationContext";
import { DarkModeContext } from "../context/DarkModeContext";
import { AuthContext } from "../context/FirebaseAuthContext";
import { QuestionContext } from "../context/QuestionContext";

function CodeEditor() {
  const { initialCode, selectedLanguage } = useContext(QuestionContext);
  const { socketCode, changeCode } = useContext(CollaborationContext);
  const { currentUser } = useContext(AuthContext);
  const { isDarkMode } = useContext(DarkModeContext);

  const [initializing, setInitializing] = useState<boolean>(true)
  const [currentCode, setCurrentCode] = useState(initialCode);
  const [_codeSubmitted, setCodeSubmitted] = useState<boolean>(false);
  const [codeResult, setCodeResult] = useState<string>("");
  const [extensions, setExtensions] = useState<Extension[]>();

  const onChange = useCallback((value: string, _viewUpdate: ViewUpdate) => {
    setCurrentCode(value);
  }, []);

  const handleSubmit = () => {
    setCodeResult("hello world!");
    setCodeSubmitted(true);
  };

  useEffect(() => {
    if (langs[selectedLanguage]) {
      setExtensions([langs[selectedLanguage]()]);
    } else {
      setExtensions([]);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (!currentUser) return;
    if (socketCode === "") return;
    setCurrentCode(socketCode);
  }, [socketCode, currentUser, initialCode]);

  useEffect(() => {
    if (!currentUser) return;
    if (initializing) return;
    changeCode(currentCode);
  }, [currentCode, changeCode, currentUser, initialCode, initializing]);

  useEffect(() => {
    setCurrentCode(initialCode);
    setInitializing(false);
  }, [initialCode]);

  return (
    <div className="h-144 border rounded-lg shadow">
      <CodeMirror
        value={currentCode}
        height="576px"
        extensions={extensions}
        onChange={onChange}
        theme={isDarkMode ? "dark" : "light"}
      />
    </div>
  );
}

export default CodeEditor;
