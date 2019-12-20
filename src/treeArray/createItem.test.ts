import { createSiblingItem, createChildItem, deleteItem } from "./createItem";

describe("createSiblingItem", () => {
  it("空数组里添加节点, 将变成一级节点", () => {
    const arr = [] as any;
    const expected = [{ id: 1, level: 1 }];
    const [result, _] = createSiblingItem(arr, { id: 1, level: 1 }, 0);
    expect(result).toEqual(expected);
  });
  it("case2", () => {
    const arr = [
      { id: 1, level: 1 },
      { id: 2, level: 2 }
    ] as any;
    const expected = [
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 1 }
    ];
    expect(createSiblingItem(arr, { id: 3 }, 0 /*index*/)[0]).toEqual(expected);
  });
  it("case3", () => {
    const arr = [
      { id: 1, level: 1 },
      { id: 2, level: 2 }
    ] as any;
    const expected = [
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 2 }
    ];
    expect(createSiblingItem(arr, { id: 3 }, 1 /*index*/)[0]).toEqual(expected);
  });
  it("case4", () => {
    const arr = [
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 3 },
      { id: 4, level: 2 }
    ] as any;
    const expected = [
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 3 },
      { id: 5, level: 2 },
      { id: 4, level: 2 }
    ];
    expect(createSiblingItem(arr, { id: 5 }, 1 /*index*/)[0]).toEqual(expected);
  });
});

describe("createChildItem", () => {
  it("空数组里添加节点, 将变成一级节点", () => {
    const arr = [] as any;
    const expected = [{ id: 1, level: 1 }];
    const [result, _] = createChildItem(arr, { id: 1, level: 1 }, 0);
    expect(result).toEqual(expected);
  });
  it("case2", () => {
    const arr = [
      { id: 1, level: 1 },
      { id: 2, level: 2 }
    ] as any;
    const expected = [
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 2 }
    ];
    expect(createChildItem(arr, { id: 3 }, 0 /*index*/)[0]).toEqual(expected);
  });
  it("case3", () => {
    const arr = [
      { id: 1, level: 1 },
      { id: 2, level: 2 }
    ] as any;
    const expected = [
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 3 }
    ];
    expect(createChildItem(arr, { id: 3 }, 1 /*index*/)[0]).toEqual(expected);
  });
  it("case4", () => {
    const arr = [
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 3 },
      { id: 4, level: 2 }
    ] as any;
    const expected = [
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 3 },
      { id: 5, level: 3 },
      { id: 4, level: 2 }
    ];
    expect(createChildItem(arr, { id: 5 }, 1 /*index*/)[0]).toEqual(expected);

    const expected1 = [
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 3 },
      { id: 5, level: 4 },
      { id: 4, level: 2 }
    ];
    expect(createChildItem(arr, { id: 5 }, 2 /*index*/)[0]).toEqual(expected1);
  });
});

describe("deleteItem", () => {
  it("empty", () => {
    const arr = [] as any;
    const expected = [] as any;
    expect(deleteItem(arr, 0)[0]).toEqual(expected);
  });

  it("case1", () => {
    const arr = [{ id: 1, level: 1 }];
    expect(deleteItem(arr, 1)[0]).toEqual(arr);
  });

  it("case2", () => {
    const arr = [{ id: 1, level: 1 }];
    expect(deleteItem(arr, 0)[0]).toEqual([]);
  });

  it("case3", () => {
    const arr = [
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 3 },
      { id: 4, level: 2 }
    ] as any;
    expect(deleteItem(arr, 0)[0]).toEqual([]);

    expect(deleteItem(arr, 1)[0]).toEqual([
      { id: 1, level: 1 },
      { id: 4, level: 2 }
    ]);

    expect(deleteItem(arr, 2)[0]).toEqual([
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 4, level: 2 }
    ]);
  });

  it("case4", () => {
    const arr = [
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 3 },
      { id: 4, level: 2 },
      { id: 5, level: 3 },
      { id: 6, level: 2 },
      { id: 7, level: 1 }
    ] as any;
    expect(deleteItem(arr, 4)[0]).toEqual([
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 3 },
      { id: 4, level: 2 },
      { id: 6, level: 2 },
      { id: 7, level: 1 }
    ]);
  });
});
