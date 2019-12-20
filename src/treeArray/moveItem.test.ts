import { moveUp, moveDown } from "./moveItem";

describe("moveItem", () => {
  const arr = [
    { id: 1, level: 1 },
    { id: 2, level: 2 },
    { id: 3, level: 3 },
    { id: 4, level: 2 }
  ] as any;
  it("case1: 首节点无法上移", () => {
    expect(moveUp(arr, 0)[0]).toEqual(arr);
  });

  it("case2: 第1个子节点无法上移", () => {
    expect(moveUp(arr, 1)[0]).toEqual(arr);
    expect(moveUp(arr, 2)[0]).toEqual(arr);
  });

  it("case2: 正常上移", () => {
    expect(moveUp(arr, 3)[0]).toEqual([
      { id: 1, level: 1 },
      { id: 4, level: 2 },
      { id: 2, level: 2 },
      { id: 3, level: 3 }
    ]);
  });
});

describe("moveItem", () => {
  const arr = [
    { id: 1, level: 1 },
    { id: 2, level: 2 },
    { id: 3, level: 3 },
    { id: 4, level: 2 }
  ] as any;
  it("case1: 尾节点无法下移", () => {
    expect(moveDown(arr, 0)[0]).toEqual(arr);
    expect(moveDown(arr, 2)[0]).toEqual(arr);
    expect(moveDown(arr, 3)[0]).toEqual(arr);
  });

  it("case2: 正常下移", () => {
    expect(moveDown(arr, 1)[0]).toEqual([
      { id: 1, level: 1 },
      { id: 4, level: 2 },
      { id: 2, level: 2 },
      { id: 3, level: 3 }
    ]);
  });
});
