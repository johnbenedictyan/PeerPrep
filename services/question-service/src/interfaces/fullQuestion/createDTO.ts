import { QuestionCreateDTO } from "../question/createDTO";
import { QuestionInitialCodeCreateDTO } from "../questionInitialCode/createDTO";

export type FullQuestionCreateDTO = QuestionCreateDTO & {
  initialCodes: QuestionInitialCodeCreateDTO[];
};
