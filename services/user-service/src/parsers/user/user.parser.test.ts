import { describe } from "@jest/globals";
import UserParser from "./user.parser";

describe("Test user parser", () => {
  it("should parse create input", () => {
    const parser = new UserParser();

    const input = {
      user1Id: "123",
      user2Id: "456",
      requestId: "1",
    };

    const expectedOutput = {
      user1Id: "123",
      user2Id: "456",
      requestId: 1,
    };

    expect(parser.parseCreateInput(input)).toEqual(expectedOutput);
  });
});
