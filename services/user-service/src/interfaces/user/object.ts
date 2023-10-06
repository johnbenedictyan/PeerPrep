import { OptionalInterface } from "../../util/optionalInterface";

export type User = {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  questionsAuthored: number;
};

export type OptionalUser = OptionalInterface<User>;
