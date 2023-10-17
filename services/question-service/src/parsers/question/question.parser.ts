import { QuestionCreateDTO } from "../../interfaces/question/createDTO";
import { Question } from "../../interfaces/question/object";
import { QuestionUpdateDTO } from "../../interfaces/question/updateDTO";
import { Partial } from "../../util/partial";
import { StringInterface } from "../../util/stringInterface";
import Parser from "../parser.interface";

class QuestionParser
  implements Parser<QuestionCreateDTO, QuestionUpdateDTO, Question>
{
  public parseCreateInput(
    input: StringInterface<QuestionCreateDTO>,
  ): QuestionCreateDTO {
    if (!input.title || !input.content || !input.authorId) {
      throw new Error(
        "Required fields of title, content, and author id are missing",
      );
    }
    return input;
  }

  public parseFindByIdInput(id: string): number {
    return parseInt(id, 10);
  }

  public parseFindOneInput(
    input: Partial<StringInterface<Question>>,
  ): Partial<Question> {
    const parsedInput: Partial<Question> = {};
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
    input: Partial<StringInterface<QuestionUpdateDTO>>,
  ): Partial<QuestionUpdateDTO> {
    const parsedInput: Partial<QuestionUpdateDTO> = {};
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
