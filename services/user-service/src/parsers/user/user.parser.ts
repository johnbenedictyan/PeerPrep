import { UserCreateDTO } from "../../interfaces/user/createDTO";
import { User } from "../../interfaces/user/object";
import { UserUpdateDTO } from "../../interfaces/user/updateDTO";

import { StringInterface } from "../../util/stringInterface";
import Parser from "../parser.interface";

class UserParser implements Parser<UserCreateDTO, UserUpdateDTO, User> {
  public parseCreateInput(
    input: StringInterface<UserCreateDTO>,
  ): UserCreateDTO {
    if (!input.id || !input.name || !input.roles) {
      throw new Error("Required fields of id, name, and roles are missing");
    }
    return {
      id: input.id,
      name: input.name,
      roles: input.roles,
    };
  }

  public parseFindByIdInput(id: string): string {
    return id;
  }

  public parseFindOneInput(
    input: Partial<StringInterface<User>>,
  ): Partial<User> {
    const parsedInput: Partial<User> = {};
    if (input.id) {
      parsedInput.id = input.id;
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
    input: Partial<StringInterface<UserUpdateDTO>>,
  ): Partial<UserUpdateDTO> {
    const parsedInput: Partial<UserUpdateDTO> = {};
    if (input.name) {
      parsedInput.name = input.name;
    }

    if (input.roles) {
      parsedInput.roles = input.roles;
    }

    if (input.questionsAuthored) {
      parsedInput.questionsAuthored = parseInt(input.questionsAuthored, 10);
    }

    return parsedInput;
  }

  public parseDeleteInput(id: string): string {
    return id;
  }
}

export default UserParser;
