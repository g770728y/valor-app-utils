import * as R from "rambdax";
import {
  compareDividedCode,
  compareVersionNumber,
  equals,
  shallowEqualsArray,
} from "./compare";
import fastEqual from "fast-deep-equal";

describe("equals", () => {
  it("null相等", () => expect(equals(null, null)).toBe(true));

  it("undefined相等", () => expect(equals(undefined, undefined)).toBe(true));

  it("null不等于undefined", () => expect(equals(null, undefined)).toBe(false));

  it("数字相等", () => expect(equals(3, 3)).toBe(true));

  it("数字不等", () => expect(equals(3, 5)).toBe(false));

  it("字符串相等", () => expect(equals("a", "a")).toBe(true));

  it("字符串不等", () => expect(equals("3", "5")).toBe(false));

  it("不同类型", () => {
    expect(equals(3, "a")).toBe(false);
    expect(equals([], {})).toBe(false);
    expect(equals({}, 5)).toBe(false);
  });

  it("数组", () => {
    expect(equals([], [])).toBe(true);
    expect(equals([1, 2], [1, 2])).toBe(true);
    expect(equals([1, 2, 3], [1, 2])).toBe(false);
    expect(equals([1, 2], [1, 2, 3])).toBe(false);
  });

  it("对象", () => {
    expect(equals({}, {})).toBe(true);
    expect(equals({ a: 1 }, { a: 1 })).toBe(true);
    expect(equals({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    expect(equals({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    expect(equals({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
  });

  const obj = { a: 1, b: 2, c: 3, d: 4 };
  const a1 = {
    o1: { o11: obj, a: 1 },
    o2: { o11: obj, a: 1 },
    o3: { o11: obj, a: 1 },
    o4: { o11: obj, a: 1 },
  };
  const a2 = {
    o1: { o11: obj, a: 1 },
    o2: { o11: obj, a: 1 },
    o3: { o11: obj, a: 1 },
    o4: { o11: obj, a: 1 },
  };

  it("浅比较", () => {
    expect(equals([obj, obj, obj, obj], [obj, obj, obj, obj])).toBe(true);
    expect(
      equals(
        { o1: obj, o2: obj, o3: obj, o4: obj },
        { o1: obj, o2: obj, o3: obj, o4: obj }
      )
    ).toBe(true);
    expect(
      equals(
        {
          o1: { o11: obj, a: 1 },
          o2: { o11: obj, a: 1 },
          o3: { o11: obj, a: 1 },
          o4: { o11: obj, a: 1 },
        },
        {
          o1: { o11: obj, a: 1 },
          o2: { o11: obj, a: 1 },
          o3: { o11: obj, a: 1 },
          o4: { o11: obj, a: 1 },
        }
      )
    ).toBe(true);
    expect(equals(a1, a2)).toBe(true);
  });

  it.skip("性能", () => {
    console.time("用我的方法测试10万次");
    for (let i = 0; i < 100000; i++) {
      equals(a1, a2);
    }
    console.timeEnd("用我的方法测试10万次");

    console.time("用R.equals测试10万次");
    for (let i = 0; i < 100000; i++) {
      R.equals(a1, a2);
    }
    console.timeEnd("用R.equals测试10万次");

    console.time("用fast-deep-equal测试10万次");
    for (let i = 0; i < 100000; i++) {
      fastEqual(a1, a2);
    }
    console.timeEnd("用fast-deep-equal测试10万次");
  });
});

describe("shallowEqualsArray", () => {
  it("ok", () => {
    expect(true).toBe(true);
  });
  const obj0 = { a: 1, b: 2, c: 3, d: 4 };
  const obj1 = { a: 1, b: 2, c: 3, d: 4 };
  const obj2 = { a: 1, b: 2, c: 3, d: 4 };
  const obj3 = { a: 1, b: 2, c: 3, d: 4 };
  const obj4 = { a: 1, b: 2, c: 3, d: 4 };

  const a = [obj0, obj1, obj2, obj3, obj4];
  const b = [obj0, obj1, obj2, obj3, obj4];

  console.log("引用");
  console.time("用我的方法测试10万次");
  for (let i = 0; i < 100000; i++) {
    shallowEqualsArray(a, b);
  }
  console.timeEnd("用我的方法测试10万次");

  console.time("用fast-deep-equal测试10万次");
  for (let i = 0; i < 100000; i++) {
    fastEqual(a, b);
  }
  console.timeEnd("用fast-deep-equal测试10万次");
});

// 分段编码大小比较
describe("compareDivivedCode", () => {
  ////////////// 原则: 类似: 图号, 工程量清单代码, 字母与字母比, 数字与数字比, 不存在其它意外
  /////////////  比如, 1. 不会遇到a与1比
  describe("单段比较", () => {
    it("单字符", () => {
      expect(compareDividedCode("1", "0")).toBeGreaterThan(0);
      expect(compareDividedCode("0", "0")).toEqual(0);
      expect(compareDividedCode("0", "1")).toBeLessThan(0);

      expect(compareDividedCode("a", "b")).toBeLessThan(0);
      expect(compareDividedCode("b", "a")).toBeGreaterThan(0);
      expect(compareDividedCode("b", "b")).toEqual(0);

      expect(compareDividedCode("1", "b")).toBeLessThan(0);
      expect(compareDividedCode("b", "1")).toBeGreaterThan(0);
    });

    it("多字符, 长度相等", () => {
      expect(compareDividedCode("111", "110")).toBeGreaterThan(0);
      expect(compareDividedCode("111", "111")).toEqual(0);
      expect(compareDividedCode("110", "111")).toBeLessThan(0);
    });

    it("", () => {
      // 纯数字, 前补0
      expect(compareDividedCode("111", "11" /*011*/)).toBeGreaterThan(0);

      // 先字母, 再数字, 数字前补0
      // S11 => S-11, 拆成两段
      expect(compareDividedCode("S11", "S10")).toBeGreaterThan(0);
      expect(compareDividedCode("S11", "S9" /*S09*/)).toBeGreaterThan(0);

      // 先数字, 再字母
      expect(compareDividedCode("5a", "3b")).toBeGreaterThan(0);

      // 先数字, 再字母, 长度不等
      // 工程量清单:
      //  -1
      //  -1a (增补)
      //  -2
      expect(compareDividedCode("1a", "1" /*1 */)).toBeGreaterThan(0);
      // 暂未实现
      // expect(compareDividedCode("2" /*2 */, "1a")).toBeGreaterThan(0);
      // expect(compareDividedCode("302" /*302 */, "301a")).toBeGreaterThan(0);

      // 先数字, 再字母, 缺失, 数字前补0, 字符补空格
      expect(compareDividedCode("10a", "3" /*03 */)).toBeGreaterThan(0);
    });
  });

  describe("多段", () => {
    it("段数相等", () => {
      expect(compareDividedCode("301-c-1", "301-b-1")).toBeGreaterThan(0);
    });

    it("段数不等", () => {
      // 300 => 300-0-
      expect(compareDividedCode("300", "201-1-a")).toBeGreaterThan(0);
      expect(compareDividedCode("300-2-1", "201")).toBeGreaterThan(0);
    });
  });
});

describe("compareVersionNumber", () => {
  it("1", () => {
    expect(compareVersionNumber("1", "2")).toBeLessThan(0);
    expect(compareVersionNumber("11", "2")).toBeGreaterThan(0);
    expect(compareVersionNumber("11", "11")).toEqual(0);
  });
  it("2", () => {
    expect(compareVersionNumber("1.1", "2.1")).toBeLessThan(0);
    expect(compareVersionNumber("11.1", "2.999")).toBeGreaterThan(0);
    expect(compareVersionNumber("11.9999", "11.9999")).toEqual(0);
  });
  it("1 & 2", () => {
    expect(compareVersionNumber("1", "1.1")).toBeLessThan(0);
    expect(compareVersionNumber("2", "1.999")).toBeGreaterThan(0);
  });
  it("n & m", () => {
    expect(compareVersionNumber("1", "1.1")).toBeLessThan(0);
    expect(compareVersionNumber("2", "1.1.1.1.1")).toBeGreaterThan(0);
    expect(compareVersionNumber("100", "99.1.1.1.1")).toBeGreaterThan(0);
    expect(compareVersionNumber("100.1.1.1", "100.2.1.1")).toBeLessThan(0);
  });
});
