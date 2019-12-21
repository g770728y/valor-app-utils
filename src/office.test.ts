import { stripWordTag, renderCatalogNo } from "./office";
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

describe("title-template-parser", () => {
  it("level-1", () => expect(renderCatalogNo("第{n}章", [1])).toEqual("第1章"));
  it("level-1, 第一章", () =>
    expect(renderCatalogNo("第{N}章", [1])).toEqual("第一章"));
  it("level-1, 第十八章", () =>
    expect(renderCatalogNo("第{N}章", [18])).toEqual("第十八章"));
  it("level-2, 一.", () =>
    expect(renderCatalogNo("{N}.", [1, 1])).toEqual("一."));
  it("level-3, 1.", () =>
    expect(renderCatalogNo("{n}.", [1, 1, 1])).toEqual("1."));
  it("level-4, 1.1", () =>
    expect(renderCatalogNo("{n}.{n}", [1, 1, 1, 1])).toEqual("1.1"));
  it("level-5, 1.1.1", () =>
    expect(renderCatalogNo("{n}.{n}.{n}", [1, 1, 1, 1, 1])).toEqual("1.1.1"));
  it("level-6, 1.1.1.1", () =>
    expect(renderCatalogNo("{n}.{n}.{n}.{n}", [1, 1, 1, 1, 1, 1])).toEqual(
      "1.1.1.1"
    ));
  it("level-6, 1.4.5", () =>
    expect(renderCatalogNo("{n}.{n}.{n}", [1, 1, 1, 1, 4, 5])).toEqual(
      "1.4.5"
    ));
});
