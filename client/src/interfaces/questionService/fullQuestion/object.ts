import { Partial } from "../../../util/partial";
import { Question } from "../question/object";
import { QuestionInitialCode } from "../questionInitialCode/object";

export type FullQuestion = Question & {
  initialCodes: QuestionInitialCode[];
};

export type OptionalFullQuestion = Partial<FullQuestion>;
