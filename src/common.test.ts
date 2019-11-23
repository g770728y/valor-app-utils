import { partialEquals } from "./common";
describe("partialEquals", () => {
  it("common", () => {
    expect(partialEquals({}, {}, [])).toBe(true);
  });

  it("common", () => {
    expect(partialEquals({ a: 1, b: 2, c: 3 }, { a: 1 }, ["a"])).toBe(true);
    expect(partialEquals({ a: 1, b: 2, c: 3 }, { a: 1 }, ["a", "b"])).toBe(
      true
    );
    expect(
      partialEquals({ a: 1, b: 2, c: 3 }, { a: 1, c: 4 }, ["a", "b"])
    ).toBe(true);
    expect(
      partialEquals({ a: 1, b: 2, c: 3 }, { a: 2, c: 4 }, ["a", "b"])
    ).toBe(false);
  });
});
