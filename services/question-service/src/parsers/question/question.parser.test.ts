import { describe } from "@jest/globals";

import { FullQuestionCreateDTO } from "../../interfaces/fullQuestion/createDTO";
import { StringInterface } from "../../util/stringInterface";
import QuestionParser from "./question.parser";

describe("Test question parser", () => {
  it("should parse create input", () => {
    const parser = new QuestionParser();

    const input: StringInterface<FullQuestionCreateDTO> = {
      title: "New Question",
      content: "This is the new question",
      authorId: "abc123",
      difficulty: "easy",
      examples: ["1,2,3"],
      constraints: ["No Constraints"],
      initialCodes: [{ language: "java", code: "hello world" }],
      runnerCodes: [{ language: "python", code: "def hello world():" }],
    };

    const expectedOutput: FullQuestionCreateDTO = {
      ...input,
    };

    expect(parser.parseCreateInput(input)).toEqual(expectedOutput);
  });
});
