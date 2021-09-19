import {
  camel2snake,
  snake2camel,
  isNumberLike,
  ensureSuffix,
  getIgnoreBlank,
  sortNo,
  sortArrayOneByOne,
} from "./string";
describe("camel2snake", () => {
  test("common", () => {
    expect(camel2snake("textIndex")).toEqual("text-index");
    expect(camel2snake("TextIndex")).toEqual("text-index");
    expect(camel2snake("textIndexIndex")).toEqual("text-index-index");
  });
});

describe("snake2camel", () => {
  test("common", () => {
    expect(snake2camel("text-index")).toEqual("textIndex");
    expect(snake2camel("text-index-index")).toEqual("textIndexIndex");
  });
});

describe("isNumberLike", () => {
  test("number", () => {
    expect(isNumberLike(3)).toBe(true);
    expect(isNumberLike(3.0)).toBe(true);
  });

  test("number string", () => {
    expect(isNumberLike("3")).toBe(true);
    expect(isNumberLike("3.0")).toBe(true);
    expect(isNumberLike("3.0%")).toBe(false);
  });
});

describe("ensureSuffix", () => {
  test("number", () => {
    expect(ensureSuffix(3, "px")).toEqual("3px");
    expect(ensureSuffix(3.0, "px")).toEqual("3px");
  });

  test("blank", () => {
    expect(ensureSuffix(null, "px")).toEqual(undefined);
    expect(ensureSuffix(undefined, "px")).toEqual(undefined);
  });

  test("blank", () => {
    expect(ensureSuffix("", "px")).toEqual(undefined);
    expect(ensureSuffix("3", "px")).toEqual("3px");
    expect(ensureSuffix("-", "px")).toEqual(undefined);
    expect(ensureSuffix("30-3", "px")).toEqual(undefined);
    expect(ensureSuffix("30px", "px")).toEqual("30px");
  });
});

describe("getIgnoreBlank", () => {
  it("nil", () => {
    expect(getIgnoreBlank(null)).toEqual(undefined);
    expect(getIgnoreBlank(undefined)).toEqual(undefined);
  });

  it("blank", () => {
    expect(getIgnoreBlank("")).toEqual(undefined);
    expect(getIgnoreBlank("", "x")).toEqual("x");
    expect(getIgnoreBlank("   ")).toEqual(undefined);
  });

  it("with blank", () => {
    expect(getIgnoreBlank(" x  ")).toEqual("x");
  });
});

describe("sortNo", () => {
  it("same length", () => {
    expect(sortNo(["1", "3", "2", "0"])).toEqual(["0", "1", "2", "3"]);
  });
  it("difference length", () => {
    expect(sortNo(["1", "1.3", "2.1", "0"])).toEqual(["0", "1", "1.3", "2.1"]);
  });
  it("complex", () => {
    expect(sortNo(["2", "2.1.1", "1", "2.1.0", "2.3.5", "4.2", "1.3"])).toEqual(
      ["1", "1.3", "2", "2.1.0", "2.1.1", "2.3.5", "4.2"]
    );
  });
});

describe("sortArrayOneByOne", () => {
  it("default", () => {
    expect(sortArrayOneByOne([], [])).toEqual(0);
    expect(() => sortArrayOneByOne([1], [])).toThrow();
    expect(sortArrayOneByOne([1], [1])).toEqual(0);
    expect(sortArrayOneByOne([2], [1])).toEqual(1);
    expect(sortArrayOneByOne([1], [3])).toEqual(-2);
    expect(sortArrayOneByOne([1, 1], [3, 1])).toEqual(-2);
    expect(sortArrayOneByOne([1, 3], [1, 3])).toEqual(0);
    expect(sortArrayOneByOne([1, 3], [1, 2])).toEqual(1);
    expect(sortArrayOneByOne([2, 3, 0], [2, 3, 1])).toEqual(-1);
  });
});
