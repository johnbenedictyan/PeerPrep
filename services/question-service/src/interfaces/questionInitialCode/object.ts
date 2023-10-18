import { Partial } from "../../util/partial";

export type QuestionInitialCode = {
  language: string;
  code: string;
  questionId: string;
};

export type OptionalQuestionInitialCode = Partial<QuestionInitialCode>;
