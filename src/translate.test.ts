import { parseInt36, toHzNumber } from "./translate";

describe("alpha-to-hz", () => {
  it("<= 10", () => expect(toHzNumber(1)).toEqual("一"));
  it("< 20", () => expect(toHzNumber(15)).toEqual("十五"));
  it("10的倍数", () => expect(toHzNumber(50)).toEqual("五十"));
  it("20-99间, 非10的倍数", () => expect(toHzNumber(58)).toEqual("五十八"));
});

describe("parseInt36", () => {
  it("number", () => {
    expect(parseInt36("0")).toEqual(0);
    expect(parseInt36("9")).toEqual(9);
    expect(parseInt36("10")).toEqual(36);
    expect(parseInt36("100")).toEqual(36 * 36);
  });

  it("mix", () => {
    expect(parseInt36("a")).toEqual(10);
    expect(parseInt36("z")).toEqual(35);
    expect(parseInt36("1a")).toEqual(46);
    expect(parseInt36("a00")).toEqual(36 * 36 * 10);
  });
});
