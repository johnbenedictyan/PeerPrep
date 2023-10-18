import { QuestionInitialCode } from "@prisma/client";
import { Partial } from "../../util/partial";
import { Question } from "../question/object";

export type FullQuestion = Question & {
  initialCodes: QuestionInitialCode[];
};

export type OptionalFullQuestion = Partial<FullQuestion>;
