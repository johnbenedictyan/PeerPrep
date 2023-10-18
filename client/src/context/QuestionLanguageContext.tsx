import { langs } from "@uiw/codemirror-extensions-langs";
import { createContext } from "react";

export type codingLanguage = keyof typeof langs;

const QuestionLanguageContext = createContext<codingLanguage>(
  "java" as codingLanguage,
);

export default QuestionLanguageContext;
