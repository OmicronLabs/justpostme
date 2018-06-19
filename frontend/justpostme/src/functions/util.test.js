import { processText, cleanupText, convertSecondsToDate } from "./util";

describe("cleanupText", () => {
  it("removes |p||/p| tags", () => {
    expect(cleanupText("|p|hello|/p|")).toEqual("hello");
  });
  it("removes nested |p| tags", () => {
    expect(cleanupText("|p||p|hello|/p||/p|")).toEqual("hello");
  });
  it("removes |i||/i| tags", () => {
    expect(cleanupText("|i|hello|/i|")).toEqual("hello");
  });
  it("removes nested |i| tags", () => {
    expect(cleanupText("|i||i|hello|/i||/i|")).toEqual("hello");
  });
  it("keeps untagged strings intact", () => {
    expect(cleanupText("hello")).toEqual("hello");
    expect(cleanupText("")).toEqual("");
    expect(cleanupText(undefined)).toEqual(undefined);
  });
});

describe("processText", () => {
  it("split normal strings to words", () => {
    expect(processText("hello there general kenobi")).toEqual([
      "hello",
      "there",
      "general",
      "kenobi"
    ]);
  });
  it("split profanity strings to correct representation", () => {
    expect(processText("hello there |p|general|/p| kenobi")).toEqual([
      "hello",
      "there",
      { word: "general", profanity: true },
      "kenobi"
    ]);
  });
  it("split personal information strings to correct representation", () => {
    expect(processText("hello there |i|general|/i| kenobi")).toEqual([
      "hello",
      "there",
      { word: "general", information: true },
      "kenobi"
    ]);
  });
});

describe("convertSecondsToDate", () => {
  it("correctyl converts epoche seconds to date", () => {
    expect(convertSecondsToDate(1529393865)).toEqual("19-Jun-2018 8:37");
  });
});
