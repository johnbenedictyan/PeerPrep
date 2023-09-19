import { describe } from "@jest/globals";
import MatchingParser from "./matching.parser";

describe("Test matching parser", () => {
  it("should parse create input", () => {
    const parser = new MatchingParser();

    const testDate = new Date();

    const input = {
      user1Id: "123",
      user2Id: "456",
      dateTimeMatched: testDate.toISOString(),
    };

    const expectedOutput = {
      user1Id: "123",
      user2Id: "456",
      dateTimeMatched: testDate,
    };

    expect(parser.parseCreateInput(input)).toEqual(expectedOutput);
  });
});
