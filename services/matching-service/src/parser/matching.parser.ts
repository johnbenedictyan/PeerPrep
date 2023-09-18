import { IMatchingCreateInput } from "../interfaces/IMatching";

interface ICreateMatchingParserInput {
  user1Id: string;
  user2Id: string;
  dateTimeMatched: Date | string;
}

class MatchingParser {
  constructor() {}

  parseCreateInput(input: ICreateMatchingParserInput): IMatchingCreateInput {
    const { user1Id, user2Id, dateTimeMatched } = input;
    if (!user1Id || !user2Id || !dateTimeMatched)
      throw new Error("Invalid input");
    return {
      user1Id: user1Id,
      user2Id: user2Id,
      dateTimeMatched: new Date(dateTimeMatched),
    };
  }
}

export default MatchingParser;
