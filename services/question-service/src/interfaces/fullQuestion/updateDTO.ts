import { QuestionUpdateDTO } from "../question/updateDTO";
import { QuestionInitialCodeUpdateDTO } from "../questionInitialCode/updateDTO";

export type FullQuestionUpdateDTO = QuestionUpdateDTO & {
  initialCodes: QuestionInitialCodeUpdateDTO[];
};
