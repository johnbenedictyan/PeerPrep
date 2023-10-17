import { Partial } from "../../util/partial";

export type Question = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

export type OptionalQuestion = Partial<Question>;
