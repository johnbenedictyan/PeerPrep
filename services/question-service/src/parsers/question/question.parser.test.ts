import { describe } from "@jest/globals";

import { QuestionCreateDTO } from "../../interfaces/question/createDTO";
import { StringInterface } from "../../util/stringInterface";
import QuestionParser from "./question.parser";

describe("Test question parser", () => {
  it("should parse create input", () => {
    const parser = new QuestionParser();

    const input: StringInterface<QuestionCreateDTO> = {
      title: "New Question",
      content: "This is the new question",
      authorId: "abc123",
    };

    const expectedOutput: QuestionCreateDTO = {
      title: "New Question",
      content: "This is the new question",
      authorId: "abc123",
    };

    expect(parser.parseCreateInput(input)).toEqual(expectedOutput);
  });
});
