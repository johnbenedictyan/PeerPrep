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
    if (!input.id || !input.email || !input.name || !input.roles) {
      throw new Error("Invalid input");
    }
    return {
      id: input.id,
      email: input.email,
      name: input.name,
      roles: input.roles,
    };
  }

  public parseFindByIdInput(id: string | undefined): string {
    if (!id) {
      throw new Error("User Id is required");
    }
    return id;
  }

  public parseFindOneInput(
    input: OptionalInterface<StringInterface<User>>,
  ): OptionalInterface<User> {
    const parsedInput: OptionalInterface<User> = {};
    if (input.id) {
      parsedInput.id = input.id;
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
      roles: input.roles,
    };
  }

  public parseDeleteInput(id: string | undefined): string {
    if (!id) {
      throw new Error("Invalid input");
    }
    return id;
  }
}

export default UserParser;
