import { MatchingRequestCreateDTO } from "../../interfaces/matchingRequest/createDTO";

interface ICreateMatchingRequestParserInput {
  userId: string;
  questionId?: string;
  difficulty: string;
}

class MatchingRequestParser {
  constructor() {}

  parseCreateInput(
    input: ICreateMatchingRequestParserInput
  ): MatchingRequestCreateDTO {
    const { userId, questionId, difficulty } = input;
    if (!userId || !difficulty) throw new Error("Invalid input");
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
