import { memoizeByCount } from "./hoc";

describe("memoizeByCount", () => {
  test("被包装的函数必须带参数,否则无意义", () => {
    const f = jest.fn((a: number) => a + 1);
    const memoized = memoizeByCount(1, f);
    expect(() => memoized()).toThrow();
  });

  test("返回的结果必须正确(简单参数)", () => {
    const f = jest.fn((a: number) => a + 1);
    const memoized = memoizeByCount(1, f);
    const result1 = memoized(1);
    const result2 = memoized(1);
    const result3 = memoized(1);
    expect(result1).toEqual(2);
    expect(result2).toEqual(2);
    expect(result3).toEqual(2);
    expect(f.mock.calls.length).toBe(1);
  });

  test("返回的结果必须正确(复杂参数)", () => {
    const f1 = jest.fn(({ a, b }: { a: number; b: number }) => a + b);
    const memoized1 = memoizeByCount(1, f1);
    const result11 = memoized1({ a: 1, b: 2 });
    const result21 = memoized1({ a: 1, b: 2 });
    const result31 = memoized1({ a: 1, b: 2 });
    expect(result11).toEqual(3);
    expect(result21).toEqual(3);
    expect(result31).toEqual(3);
    expect(f1.mock.calls.length).toBe(1);
  });

  test("返回的结果必须正确(复杂参数)", () => {
    const f1 = jest.fn(({ a, b }: { a: number; b: number }) => a + b);
    const memoized1 = memoizeByCount(1, f1);
    const result11 = memoized1({ a: 1, b: 2 });
    expect(result11).toEqual(3);
    const result21 = memoized1({ a: 1, b: 2 });
    expect(result21).toEqual(3);
    expect(f1.mock.calls.length).toBe(1);

    const result22 = memoized1({ a: 2, b: 2 });
    expect(result22).toEqual(4);
    expect(f1.mock.calls.length).toBe(2);

    const result23 = memoized1({ a: 2, b: 2 });
    expect(result23).toEqual(4);
    expect(f1.mock.calls.length).toBe(2);

    const result24 = memoized1({ a: 1, b: 2 });
    expect(result24).toEqual(3);
    expect(f1.mock.calls.length).toBe(3);
  });
});
