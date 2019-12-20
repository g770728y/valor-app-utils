import { pushItemLeft, pushItemRight } from "./pushItem";
describe("moveItem", () => {
  const arr = [
    { id: 1, level: 1 },
    { id: 2, level: 2 },
    { id: 3, level: 3 },
    { id: 4, level: 2 },
    { id: 5, level: 3 }
  ] as any;
  it("case1: 一级节点无法左移", () => {
    expect(pushItemLeft(arr, 0)[0]).toEqual(arr);
  });

  it("case2: 其它节点正常左移", () => {
    expect(pushItemLeft(arr, 1)[0]).toEqual([
      { id: 1, level: 1 },
      { id: 2, level: 1 },
      { id: 3, level: 2 },
      { id: 4, level: 2 },
      { id: 5, level: 3 }
    ]);
    expect(pushItemLeft(arr, 2)[0]).toEqual([
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 2 },
      { id: 4, level: 2 },
      { id: 5, level: 3 }
    ]);
    expect(pushItemLeft(arr, 3)[0]).toEqual([
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 3 },
      { id: 4, level: 1 },
      { id: 5, level: 2 }
    ]);
    expect(pushItemLeft(arr, 4)[0]).toEqual([
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 3 },
      { id: 4, level: 2 },
      { id: 5, level: 2 }
    ]);
  });
});

describe("moveItem", () => {
  const arr = [
    { id: 1, level: 1 },
    { id: 2, level: 2 },
    { id: 3, level: 3 },
    { id: 4, level: 2 },
    { id: 5, level: 3 }
  ] as any;
  it("case1: 首节点无法右移", () => {
    expect(pushItemRight(arr, 0)[0]).toEqual(arr);
  });

  it("case2: 第1个子节点无法右移", () => {
    expect(pushItemRight(arr, 1)[0]).toEqual(arr);
    expect(pushItemRight(arr, 2)[0]).toEqual(arr);
  });

  it("case3: 第2个子节点正常右移", () => {
    expect(pushItemRight(arr, 3)[0]).toEqual([
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 3 },
      { id: 4, level: 3 },
      { id: 5, level: 4 }
    ]);
  });
});
