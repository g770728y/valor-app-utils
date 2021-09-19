import { humanReadableCapacity, filename, getFileExt } from "./fs";

describe("humanReadableCapacity", () => {
  it("< 1000", () => expect(humanReadableCapacity(999)).toEqual("999B"));
  it("< 1000 * 1000, 小数, 进位", () =>
    expect(humanReadableCapacity(999999)).toEqual("1000KB"));
  it("< 1000 * 1000, 小数", () =>
    expect(humanReadableCapacity(888888)).toEqual("888.9KB"));
  it("< 1000 * 1000", () =>
    expect(humanReadableCapacity(900000)).toEqual("900KB"));
  it("< 1000 * 1000 * 1000", () =>
    expect(humanReadableCapacity(900000000)).toEqual("900MB"));
  it(">= 1000 * 1000 * 1000", () =>
    expect(humanReadableCapacity(900000000000)).toEqual("900GB"));
});

describe("filename", () => {
  it("common", () =>
    expect(filename("http://a.b.c/1/x35.zip")).toEqual("x35.zip"));
  it("withSuffix", () => {
    expect(filename("http://a.b.c/1/x35.zip?abc111")).toEqual("x35.zip");
  });
});

describe("getFileExt", () => {
  it("common", () => {
    expect(getFileExt("http://a.b.c/1/x35.zip")).toEqual("zip");
    expect(getFileExt("3332.ssd.zip")).toEqual("zip");
    expect(getFileExt("3332")).toEqual(null);
    expect(getFileExt("3332.")).toEqual("");
  });
});
