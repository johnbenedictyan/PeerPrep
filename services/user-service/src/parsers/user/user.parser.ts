import { UserCreateDTO } from "../../interfaces/user/createDTO";
import { User } from "../../interfaces/user/object";
import { UserUpdateDTO } from "../../interfaces/user/updateDTO";
import { OptionalInterface } from "../../util/optionalInterface";
import { StringInterface } from "../../util/stringInterface";
import Parser from "../parser.interface";

class UserParser implements Parser<UserCreateDTO, UserUpdateDTO, User> {
  public parseCreateInput(
    input: StringInterface<UserCreateDTO>,
  ): UserCreateDTO {
    if (!input.email || !input.name) {
      throw new Error("Invalid input");
    }
    return {
      email: input.email,
      name: input.name,
    };
  }

  public parseFindByIdInput(id: string | undefined): number {
    if (!id) {
      throw new Error("Invalid input");
    }
    return parseInt(id, 10);
  }

  public parseFindOneInput(
    input: OptionalInterface<StringInterface<User>>,
  ): OptionalInterface<User> {
    const parsedInput: OptionalInterface<User> = {};
    if (input.id) {
      parsedInput.id = parseInt(input.id, 10);
    }
    if (input.email) {
      parsedInput.email = input.email;
    }
    if (input.name) {
      parsedInput.name = input.name;
    }
    if (input.questionsAuthored) {
      parsedInput.questionsAuthored = parseInt(input.questionsAuthored, 10);
    }
    return parsedInput;
  }

  public parseUpdateInput(
    input: StringInterface<UserUpdateDTO>,
  ): UserUpdateDTO {
    if (!input.email || !input.name || !input.questionsAuthored) {
      throw new Error("Invalid input");
    }
    return {
      email: input.email,
      name: input.name,
      questionsAuthored: parseInt(input.questionsAuthored, 10),
    };
  }

  public parseDeleteInput(id: string | undefined): number {
    if (!id) {
      throw new Error("Invalid input");
    }
    return parseInt(id, 10);
  }
}

export default UserParser;
