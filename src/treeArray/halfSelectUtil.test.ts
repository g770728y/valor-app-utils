import { zipByHalfSelect } from "./halfSelectUtil";
describe("zipHalfSelect", () => {
  const old = [
    { id: 1, level: 1 },
    { id: 2, level: 2 },
    { id: 3, level: 3 },
    { id: 4, level: 4 },
    { id: 5, level: 3 },
    { id: 6, level: 2 }
  ];

  it("case0: half-select-ids为空", () => {
    const result = zipByHalfSelect(old, []);
    const expected = old;
    expect(result).toEqual(expected);
  });

  it("case1: half-select-ids含根结点", () => {
    const result = zipByHalfSelect(old, [1]);
    const expected = [
      { id: 2, level: 1 },
      { id: 3, level: 2 },
      { id: 4, level: 3 },
      { id: 5, level: 2 },
      { id: 6, level: 1 }
    ] as any;
    expect(result).toEqual(expected);
  });

  it("case2: half-select-ids是第1级节点", () => {
    const result = zipByHalfSelect(old, [2]);
    const expected = [
      { id: 1, level: 1 },
      { id: 3, level: 2 },
      { id: 4, level: 3 },
      { id: 5, level: 2 },
      { id: 6, level: 2 }
    ];
    expect(result).toEqual(expected);
  });

  it("case3: half-select-ids是第2级节点", () => {
    const result = zipByHalfSelect(old, [3]);
    const expected = [
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 4, level: 3 },
      { id: 5, level: 3 },
      { id: 6, level: 2 }
    ];
    expect(result).toEqual(expected);
  });

  it("case4: half-select-ids包含多个", () => {
    const result = zipByHalfSelect(old, [3, 6]);
    const expected = [
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 4, level: 3 },
      { id: 5, level: 3 }
    ];
    expect(result).toEqual(expected);
    // 换序
    const result1 = zipByHalfSelect(old, [6, 3]);
    expect(result1).toEqual(expected);
  });
});
