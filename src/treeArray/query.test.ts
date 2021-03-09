import {
  getLastDecendantIndex,
  getDecendantIndexes,
  getAncestors,
} from "./query";

describe("getLastDecendantIndex", () => {
  const arr = [
    { id: 1, level: 1 },
    { id: 2, level: 2 },
    { id: 3, level: 3 },
    { id: 333, level: 4 },
    { id: 33, level: 3 },
    { id: 4, level: 2 },
    { id: 5, level: 3 },
  ];
  it("如果没有子节点, 则返回i", () => {
    expect(getLastDecendantIndex(arr, 6)).toEqual(6);
  });

  it("单级子节点", () => {
    expect(getLastDecendantIndex(arr, 1)).toEqual(4);
  });

  it("多级子节点", () => {
    expect(getLastDecendantIndex(arr, 0)).toEqual(6);
  });
});

describe("getDecendantIndexes", () => {
  const arr = [
    { id: 1, level: 1 },
    { id: 2, level: 2 },
    { id: 3, level: 3 },
    { id: 333, level: 4 },
    { id: 33, level: 3 },
    { id: 4, level: 2 },
    { id: 5, level: 3 },
  ];
  it("case0: 无后代", () => {
    expect(getDecendantIndexes(arr, 6)).toEqual([]);
  });

  it("case1: 中间节点", () => {
    expect(getDecendantIndexes(arr, 1)).toEqual([2, 3, 4]);
  });

  it("case2: 根结点(会找到最后一个)", () => {
    expect(getDecendantIndexes(arr, 0)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe("getAncestors", () => {
  const arr = [
    { id: 1, pid: undefined },
    { id: 2, pid: 1 },
    { id: 5, pid: 1 },
    { id: 555, pid: 3 },
    { id: 3, pid: 2 },
    { id: 6, pid: 2 },
    { id: 7, pid: 1 },
    { id: 333, pid: 3 },
  ];

  it("case0", () => {
    expect(getAncestors(arr, 333)).toEqual([
      { id: 1, pid: undefined },
      { id: 2, pid: 1 },
      {
        id: 3,
        pid: 2,
      },
    ]);
  });
});
