import { getLastDecendantIndex } from "./query";

describe("getLastDecendantIndex", () => {
  const arr = [
    { id: 1, level: 1 },
    { id: 2, level: 2 },
    { id: 3, level: 3 },
    { id: 333, level: 4 },
    { id: 33, level: 3 },
    { id: 4, level: 2 },
    { id: 5, level: 3 }
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
