import { querystring as qs } from "./querystring";
describe("querystring", () => {
  it("none", () => {
    expect(qs("http://111:80")).toEqual({});
    expect(qs("http://111:80?")).toEqual({});
  });
  it("one without value", () => {
    expect(qs("http://111:80?a")).toEqual({});
    expect(qs("http://111:80?a=")).toEqual({ a: "" });
    expect(qs("a=")).toEqual({ a: "" });
  });
  it("one", () => {
    expect(qs("http://111:80?a=1")).toEqual({ a: "1" });
    expect(qs("http://111:80?a=1&")).toEqual({ a: "1" });
  });
  it("two", () => {
    expect(qs("http://111:80?a=1&b")).toEqual({ a: "1" });
    expect(qs("http://111:80?a=1&b=")).toEqual({ a: "1", b: "" });
    expect(qs("http://111:80?a=1&b=2")).toEqual({ a: "1", b: "2" });
  });
});
