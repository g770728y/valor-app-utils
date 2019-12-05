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
  it("hash", () => {
    expect(qs("http://111:80/#/a?a=1&b")).toEqual({ a: "1" });
    expect(qs("http://111:80/#/b?a=1&b=")).toEqual({ a: "1", b: "" });
    expect(qs("http://111:80/#/c?a=1&b=2")).toEqual({ a: "1", b: "2" });
  });
  it("space", () => {
    expect(qs("http://111:80?a=1%202")).toEqual({ a: "1 2" });
    expect(qs("http://111:80?a=1%20%202")).toEqual({ a: "1  2" });
  });
});
