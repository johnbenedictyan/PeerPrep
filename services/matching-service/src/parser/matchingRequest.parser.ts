import { IMatchingRequestCreateInput } from "../interfaces/IMatching";

interface ICreateMatchingRequestParserInput {
  userId: string;
  questionId?: string;
  difficulty: string;
  dateRequested?: string;
}

class MatchingRequestParser {
  constructor() {}

  parseCreateInput(
    input: ICreateMatchingRequestParserInput
  ): IMatchingRequestCreateInput {
    const { userId, questionId, difficulty, dateRequested } = input;
    if (!userId || !difficulty) throw new Error("Invalid input");
    if (questionId && dateRequested) {
      return {
        userId: userId,
        questionId: parseInt(questionId),
        difficulty,
        dateRequested: new Date(dateRequested),
      };
    }
    if (questionId) {
      return {
        userId: userId,
        questionId: parseInt(questionId),
        difficulty,
      };
    }
    return {
      userId: userId,
      difficulty,
    };
  }
}

export default MatchingRequestParser;
