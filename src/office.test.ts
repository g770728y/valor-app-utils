import { stripWordTag } from "./office";
describe("stripWordTags", () => {
  it("default", () => {
    const s = `222<!--StartFragment-->
    abc
    <!--EndFragment-->11`;
    const expected = "abc";
    expect(stripWordTag(s).replace(/\s/g, "")).toEqual(expected);
  });

  it("not match", () => {
    const s = `<!-StartFragment-->
    abc
    <!--EndFragment-->`;
    const expected = "";
    expect(stripWordTag(s)).toEqual(expected);
  });
});
