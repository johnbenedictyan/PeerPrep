//

export type QuestionTestCase = {
  testCaseNumber: number;
  input: string;
  expectedOutput: string;
  questionId: number;
};

export type OptionalQuestionTestCase = Partial<QuestionTestCase>;

export type FullTestCase = QuestionTestCase & {
  executed: boolean;
  passed: boolean;
  actualOutput: string;
};
