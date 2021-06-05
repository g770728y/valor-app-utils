import { getRelativePath } from "./url";

describe.only("getRelativePath", () => {
  it("case0", () => {
    expect(getRelativePath("http:localhost:8000//x", "")).toEqual("/x");
    expect(getRelativePath("http://x", "/")).toEqual("/x");
    expect(getRelativePath("http://x", "/x")).toEqual("/");
    expect(getRelativePath("http://x", "/x/")).toEqual("/");
    expect(() => getRelativePath("http://x", "x/")).toThrow();
  });

  it("case1", () => {
    expect(getRelativePath("http://x/y/z?a=1", "")).toEqual("/x/y/z?a=1");
    expect(getRelativePath("http://x/y/z?a=1", "/")).toEqual("/x/y/z?a=1");
    expect(getRelativePath("http://x/y/z?a=1", "/x")).toEqual("/y/z?a=1");
    expect(getRelativePath("http://x/y/z?a=1", "/x/")).toEqual("/y/z?a=1");
    expect(getRelativePath("http://x/y/z?a=1", "/x/z")).toEqual("/x/y/z?a=1");
    expect(getRelativePath("http://x/y/z?a=1", "/x/y")).toEqual("/z?a=1");
    expect(getRelativePath("http://x/y/z?a=1", "/x/y/")).toEqual("/z?a=1");
  });

  it("case2", () => {
    expect(getRelativePath("/x/y/z?a=1", "")).toEqual("/x/y/z?a=1");
    expect(getRelativePath("/x/y/z?a=1", "/")).toEqual("/x/y/z?a=1");
    expect(getRelativePath("x/y/z?a=1", "")).toEqual("/x/y/z?a=1");
    expect(getRelativePath("x/y/z?a=1", "/")).toEqual("/x/y/z?a=1");
    expect(getRelativePath(`/x/main/home`, "/x")).toEqual("/main/home");
  });

  it("case3", () => {
    expect(
      getRelativePath("http://x/y/z", "/x/y", { keepQuery: false })
    ).toEqual("/z");
    expect(getRelativePath("http://x/y/z", "/x/y")).toEqual("/z");

    expect(
      getRelativePath("http://x/y/z?a=1", "/x/y", {
        keepQuery: false,
        keepLeadingSlash: false,
      })
    ).toEqual("z");
  });
});
