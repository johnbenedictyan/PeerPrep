import { SubmissionCreateDTO } from "../interfaces/submissionCreate.interface";
import { SubmissionUpdateDTO } from "../interfaces/submissionUpdate.interface";

class SubmissionParser {
  public parseId(id?: string): number | undefined {
    return id ? parseInt(id) : undefined;
  }

  public parseCreateBody(body: any): SubmissionCreateDTO {
    const { sourceCode, stdin, expectedOutput, userId } = body;
    if (!sourceCode || !stdin || !expectedOutput || !userId) {
      throw new Error("Invalid body");
    }

    let result: SubmissionCreateDTO = {
      sourceCode,
      stdin,
      expectedOutput,
      userId: parseInt(userId),
    };
    return result;
  }

  public parseUpdateBody(body: any): SubmissionUpdateDTO {
    const { sourceCode, stdin, expectedOutput, userId } = body;
    if (!sourceCode || !stdin || !expectedOutput || !userId) {
      throw new Error("Invalid body");
    }

    let result: SubmissionCreateDTO = {
      sourceCode,
      stdin,
      expectedOutput,
      userId: parseInt(userId),
    };
    return result;
  }
}

export default SubmissionParser;
