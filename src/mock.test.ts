import { mockLocation } from "./mock";

describe("mockLocation", () => {
  it("default", () => {
    const url = "http://aaa";
    mockLocation(url);
    expect(window.location.href).toEqual(url);
  });
});
