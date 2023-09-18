export interface Submission {
  id: number;
  createdAt: Date;
  sourceCode: string;
  stdin: string;
  expectedOutput: string;
  userId: number;
}
