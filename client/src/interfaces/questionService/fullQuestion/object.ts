import { Question } from "../question/object";
import { QuestionInitialCode } from "../questionInitialCode/object";
import { QuestionTestCase } from "../questionTestCase/object";

export type FullQuestion = Question & {
  initialCodes: QuestionInitialCode[];
} & {
  testCases: QuestionTestCase[];
};

export type OptionalFullQuestion = Partial<FullQuestion>;
