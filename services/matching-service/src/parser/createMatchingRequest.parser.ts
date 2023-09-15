interface ICreateMatchingRequestParserInput {
  userId: string;
  questionId?: string;
  difficulty: string;
  dateRequested?: string;
}

const createMatchingRequestParser = (
  input: ICreateMatchingRequestParserInput
) => {
  const { userId, questionId, difficulty, dateRequested } = input;
  const parsedInput = {
    userId: userId,
    questionId: questionId ? parseInt(questionId) : undefined,
    difficulty,
    dateRequested: dateRequested ? new Date(dateRequested) : undefined,
  };
  return parsedInput;
};

export default createMatchingRequestParser;