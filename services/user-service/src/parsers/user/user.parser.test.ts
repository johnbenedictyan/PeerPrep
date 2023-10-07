import { describe } from "@jest/globals";

import { UserCreateDTO } from "../../interfaces/user/createDTO";
import { StringInterface } from "../../util/stringInterface";
import UserParser from "./user.parser";

describe("Test user parser", () => {
  it("should parse create input", () => {
    const parser = new UserParser();

    const input: StringInterface<UserCreateDTO> = {
      id: "asd123",
      name: "asd",
      roles: ["user"],
    };

    const expectedOutput: UserCreateDTO = {
      id: "asd123",
      name: "asd",
      roles: ["user"],
    };

    expect(parser.parseCreateInput(input)).toEqual(expectedOutput);
  });
});
