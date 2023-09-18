import { SubmissionCreateInput } from "../interfaces/submissionCreate.interface";

class SubmissionParser {
  public parseId(id?: string): number | undefined {
    return id ? parseInt(id) : undefined;
  }

  public parseBody(body: any): SubmissionCreateInput {
    const { sourceCode, stdin, expectedOutput, userId } = body;
    if (!sourceCode || !stdin || !expectedOutput || !userId) {
      throw new Error("Invalid body");
    }

    let result: SubmissionCreateInput = {
      sourceCode,
      stdin,
      expectedOutput,
      userId: parseInt(userId),
    };
    return result;
  }
}

export default SubmissionParser;
