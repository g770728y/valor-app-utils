import * as R from "rambda";
import { equals, shallowEqualsArray } from "./compare";
const fastEqual = require("fast-deep-equal");

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
    o4: { o11: obj, a: 1 }
  };
  const a2 = {
    o1: { o11: obj, a: 1 },
    o2: { o11: obj, a: 1 },
    o3: { o11: obj, a: 1 },
    o4: { o11: obj, a: 1 }
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
          o4: { o11: obj, a: 1 }
        },
        {
          o1: { o11: obj, a: 1 },
          o2: { o11: obj, a: 1 },
          o3: { o11: obj, a: 1 },
          o4: { o11: obj, a: 1 }
        }
      )
    ).toBe(true);
    expect(equals(a1, a2)).toBe(true);
  });

  it("性能", () => {
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
