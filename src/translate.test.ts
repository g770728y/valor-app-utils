import { toHzNumber } from "./translate";

describe("alpha-to-hz", () => {
  it("<= 10", () => expect(toHzNumber(1)).toEqual("一"));
  it("< 20", () => expect(toHzNumber(15)).toEqual("十五"));
  it("10的倍数", () => expect(toHzNumber(50)).toEqual("五十"));
  it("20-99间, 非10的倍数", () => expect(toHzNumber(58)).toEqual("五十八"));
});
