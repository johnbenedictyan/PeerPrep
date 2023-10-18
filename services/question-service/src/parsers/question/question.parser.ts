import { FullQuestionCreateDTO } from "../../interfaces/fullQuestion/createDTO";
import { FullQuestion } from "../../interfaces/fullQuestion/object";
import { FullQuestionUpdateDTO } from "../../interfaces/fullQuestion/updateDTO";
import { Partial } from "../../util/partial";
import { StringInterface } from "../../util/stringInterface";
import Parser from "../parser.interface";

class QuestionParser
  implements Parser<FullQuestionCreateDTO, FullQuestionUpdateDTO, FullQuestion>
{
  public parseCreateInput(
    input: StringInterface<FullQuestionCreateDTO>,
  ): FullQuestionCreateDTO {
    if (!input.title || !input.content || !input.authorId) {
      throw new Error(
        "Required fields of title, content, or author id are missing",
      );
    }
    if (input.initialCodes.length == 0) {
      return input;
    }
    input.initialCodes.forEach((x) => {
      if (!x.code || !x.language || !x.questionId) {
        throw new Error(
          "Required fields for question's initial code of code, language, or questionId id are missing",
        );
      }
    });
    return input;
  }

  public parseFindByIdInput(id: string): number {
    return parseInt(id, 10);
  }

  public parseFindOneInput(
    input: Partial<StringInterface<FullQuestion>>,
  ): Partial<FullQuestion> {
    const parsedInput: Partial<FullQuestion> = {};
    if (input.id) {
      parsedInput.id = parseInt(input.id, 10);
    }
    if (input.title) {
      parsedInput.title = input.title;
    }
    if (input.content) {
      parsedInput.content = input.content;
    }
    if (input.authorId) {
      parsedInput.authorId = input.authorId;
    }
    return parsedInput;
  }

  public parseUpdateInput(
    input: Partial<StringInterface<FullQuestionUpdateDTO>>,
  ): Partial<FullQuestionUpdateDTO> {
    const parsedInput: Partial<FullQuestionUpdateDTO> = {};
    if (input.title) {
      parsedInput.title = input.title;
    }

    if (input.content) {
      parsedInput.content = input.content;
    }

    return parsedInput;
  }

  public parseDeleteInput(id: string): number {
    return parseInt(id, 10);
  }
}

export default QuestionParser;
