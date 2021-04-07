import { createSeqByTemplate } from "./batch";

describe("createSeqByTemplate", () => {
  it("case0", () => {
    expect(createSeqByTemplate("{1}", 2)).toEqual(["1", "2"]);
    expect(createSeqByTemplate("{2}", 2)).toEqual(["2", "3"]);
    expect(createSeqByTemplate("第{1}", 2)).toEqual(["第1", "第2"]);
    expect(createSeqByTemplate("第{1}个", 2)).toEqual(["第1个", "第2个"]);
  });

  it("case1", () => {
    expect(createSeqByTemplate("{a}", 2)).toEqual(["a", "b"]);
    expect(createSeqByTemplate("{c}", 2)).toEqual(["c", "d"]);
    expect(createSeqByTemplate("第{a}", 2)).toEqual(["第a", "第b"]);
    expect(createSeqByTemplate("第{a}个", 2)).toEqual(["第a个", "第b个"]);
  });

  it("case2", () => {
    expect(createSeqByTemplate("1-{1}", 2)).toEqual(["1-1", "1-2"]);
    expect(createSeqByTemplate("第1-{1}", 2)).toEqual(["第1-1", "第1-2"]);
    expect(createSeqByTemplate("第1-{1}个", 2)).toEqual(["第1-1个", "第1-2个"]);
    expect(createSeqByTemplate("第1-{9}个", 3)).toEqual([
      "第1-9个",
      "第1-10个",
      "第1-11个",
    ]);
  });

  it("case3", () => {
    expect(createSeqByTemplate("1-{a}", 2)).toEqual(["1-a", "1-b"]);
    expect(createSeqByTemplate("第1-{a}", 2)).toEqual(["第1-a", "第1-b"]);
    expect(createSeqByTemplate("第1-{a}个", 2)).toEqual(["第1-a个", "第1-b个"]);
  });

  it("case4", () => {
    expect(createSeqByTemplate("a{1}", 2)).toEqual(["a1", "a2"]);
    expect(createSeqByTemplate("1{a}", 2)).toEqual(["1a", "1b"]);
    expect(createSeqByTemplate("第1{a}", 2)).toEqual(["第1a", "第1b"]);
  });

  it("case5", () => {
    expect(createSeqByTemplate("第第第", 2)).toEqual(["第第第", "第第第"]);
    expect(() => createSeqByTemplate("{ab}", 2)).toThrow();
    expect(() => createSeqByTemplate("{1b}", 2)).toThrow();
    expect(() => createSeqByTemplate("{b1}", 2)).toThrow();
  });
});
