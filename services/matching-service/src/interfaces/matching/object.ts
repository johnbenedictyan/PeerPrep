import { OptionalInterface } from "../../util/optionalInterface";

export type Matching = {
  id: number;
  user1Id: string;
  user2Id: string;
  dateTimeMatched: Date;
};

export type OptionalMatching = OptionalInterface<Matching>;
