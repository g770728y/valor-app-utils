import {
  // array2idTree_byLevel,
  // findParentNode,
  findIndexFrom,
  reAppend,
  swapByProp,
  dropIndex,
  insertIndex,
  arrayCompare,
  patchByDiffs,
  upsert,
  arrayCompareBy,
  insertBetween,
  insertArround,
  swap,
  padding,
  sliceBy,
  crossJoin,
  getPrevByIndex,
  getNextByIndex
} from "./array";
import * as R from "rambda";

describe("findIndexFrom", () => {
  const arr = [5, 6, 3, 4, 5];
  it("default", () =>
    expect(findIndexFrom(arr, 2, (i: number) => i >= 6)).toEqual(-1));

  const arr2 = [5, 6, 3, 4, 8];
  it("default - 1", () =>
    expect(findIndexFrom(arr2, 2, (i: number) => i >= 6)).toEqual(4));

  it("特殊行为: default - 3", () =>
    expect(findIndexFrom(arr, 2, (i: number) => i >= 3)).toEqual(2));

  const arr3 = [4, 5, 6];
  it("default - 4", () =>
    expect(findIndexFrom(arr3, 2, (i: number) => i < 1)).toEqual(-1));

  it("特殊行为: default - 5", () =>
    expect(findIndexFrom(arr3, 2, (i: number) => i >= 6)).toEqual(2));
});

describe("reAppend", () => {
  const arr = [1, 3, 2, 4, 5];
  it("not existed", () => expect(reAppend(arr, 6)).toEqual([1, 3, 2, 4, 5, 6]));
  it("existed", () => expect(reAppend(arr, 2)).toEqual([1, 3, 4, 5, 2]));
  it("existed, object", () =>
    expect(reAppend([{ a: 1 }, { a: 2 }], { a: 1 })).toEqual([
      { a: 2 },
      { a: 1 }
    ]));
  it("existed, complex", () =>
    expect(reAppend([{ a: [1] }, { a: [2] }], { a: [1] })).toEqual([
      { a: [2] },
      { a: [1] }
    ]));
});

describe("swapByProp", () => {
  const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
  it("swap self should return self", () =>
    expect(swapByProp(arr, "id", 1, 1)).toEqual(arr));
  it("swap 2 and 3", () =>
    expect(swapByProp(arr, "id", 2, 3)).toEqual([
      { id: 1 },
      { id: 3 },
      { id: 2 }
    ]));
});

describe("swap", () => {
  const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
  it("default", () => expect(swap(arr, 1, 1)).toEqual(arr));
  it("swap 1 and 2 ", () =>
    expect(swap(arr, 1, 2)).toEqual([{ id: 1 }, { id: 3 }, { id: 2 }]));
  it("swap 0 and 1", () =>
    expect(swap(arr, 0, 1)).toEqual([{ id: 2 }, { id: 1 }, { id: 3 }]));
  it("swap 2 and 0", () =>
    expect(swap(arr, 2, 0)).toEqual([{ id: 3 }, { id: 2 }, { id: 1 }]));
});

describe("dropIndex", () => {
  const arr = [1, 2, 3];
  it("drop 0", () => expect(dropIndex(arr, 0)).toEqual([2, 3]));

  it("drop 1", () => expect(dropIndex(arr, 1)).toEqual([1, 3]));

  const arr1 = [] as any;
  it("drop from empty", () => expect(dropIndex(arr1, 0)).toEqual([]));
});

describe("insertIndex", () => {
  const arr = [1, 2, 3];
  it("insert 0", () => expect(insertIndex(arr, 0, 4)).toEqual([4, 1, 2, 3]));

  it("insert 1", () => expect(insertIndex(arr, 1, 4)).toEqual([1, 4, 2, 3]));

  const arr1 = [] as any;
  it("insert from empty", () => expect(insertIndex(arr1, 0, 4)).toEqual([4]));
});

describe("array-compare", () => {
  const b1 = [
    { id: 1, k: 1 },
    { id: 2, k: 2 },
    { id: 3, k: 3 }
  ];
  const b2 = [
    { id: 3, k: 3 },
    { id: 4, k: 4 },
    { id: 5, k: 5 }
  ];
  it("数组成员是obj", () =>
    expect(arrayCompare(b1, b2)).toEqual({
      added: [
        { id: 4, k: 4 },
        { id: 5, k: 5 }
      ],
      removed: [
        { id: 1, k: 1 },
        { id: 2, k: 2 }
      ],
      updated: [],
      reserved: [{ id: 3, k: 3 }]
    }));

  const c1 = [
    { id: 1, k: 1 },
    { id: 2, k: 2 },
    { id: 3, k: 3 }
  ];
  const c2 = [
    { id: 3, k: 1 },
    { id: 4, k: 4 },
    { id: 5, k: 5 }
  ];
  it("数组成员是obj, 并且某个obj有变化", () =>
    expect(arrayCompare(c1, c2)).toEqual({
      added: [
        { id: 4, k: 4 },
        { id: 5, k: 5 }
      ],
      removed: [
        { id: 1, k: 1 },
        { id: 2, k: 2 }
      ],
      updated: [{ id: 3, k: 1 }],
      reserved: []
    }));

  const d1 = [
    { id: 1, k: 1 },
    { id: 2, k: 2 },
    { id: 3, k: 3 }
  ];
  const d2 = [
    { id: 1, k: 1 },
    { id: 2, k: 2 },
    { id: 3, k: 3 }
  ];
  it("数组成员是obj, reserve", () =>
    expect(arrayCompare(d1, d2)).toEqual({
      added: [],
      removed: [],
      updated: [],
      reserved: [
        { id: 1, k: 1 },
        { id: 2, k: 2 },
        { id: 3, k: 3 }
      ]
    }));
});

describe("array-compare-by", () => {
  const b1 = [
    { xid: 1, k: 1 },
    { xid: 2, k: 2 },
    { xid: 3, k: 3 }
  ];
  const b2 = [
    { xid: 3, k: 3 },
    { xid: 4, k: 4 },
    { xid: 5, k: 5 }
  ];
  it("数组成员是obj", () =>
    expect(arrayCompareBy(b1, b2, "xid")).toEqual({
      added: [
        { xid: 4, k: 4 },
        { xid: 5, k: 5 }
      ],
      removed: [
        { xid: 1, k: 1 },
        { xid: 2, k: 2 }
      ],
      updated: [],
      reserved: [{ xid: 3, k: 3 }]
    }));

  const c1 = [
    { xid: 1, k: 1 },
    { xid: 2, k: 2 },
    { xid: 3, k: 3 }
  ];
  const c2 = [
    { xid: 3, k: 1 },
    { xid: 4, k: 4 },
    { xid: 5, k: 5 }
  ];
  it("数组成员是obj, 并且某个obj有变化", () =>
    expect(arrayCompareBy(c1, c2, "xid")).toEqual({
      added: [
        { xid: 4, k: 4 },
        { xid: 5, k: 5 }
      ],
      removed: [
        { xid: 1, k: 1 },
        { xid: 2, k: 2 }
      ],
      updated: [{ xid: 3, k: 1 }],
      reserved: []
    }));

  const d1 = [
    { xid: 1, k: 1 },
    { xid: 2, k: 2 },
    { xid: 3, k: 3 }
  ];
  const d2 = [
    { xid: 1, k: 1 },
    { xid: 2, k: 2 },
    { xid: 3, k: 3 }
  ];
  it("数组成员是obj, reserve", () =>
    expect(arrayCompareBy(d1, d2, "xid")).toEqual({
      added: [],
      removed: [],
      updated: [],
      reserved: [
        { xid: 1, k: 1 },
        { xid: 2, k: 2 },
        { xid: 3, k: 3 }
      ]
    }));
});

describe("patchByDiffs", () => {
  it("数组成员是obj", () => {
    const b1 = [
      { id: 1, k: 1 },
      { id: 2, k: 2 },
      { id: 3, k: 3 }
    ];
    const b2 = [
      { id: 3, k: 3 },
      { id: 4, k: 4 },
      { id: 5, k: 5 }
    ];
    const diffs1 = {
      added: [
        { id: 4, k: 4 },
        { id: 5, k: 5 }
      ],
      removed: [
        { id: 1, k: 1 },
        { id: 2, k: 2 }
      ],
      updated: [],
      reserved: [{ id: 3, k: 3 }]
    };
    expect(patchByDiffs(b1, diffs1)).toEqual(b2);
  });

  it("数组成员是obj, 并且某个obj有变化", () => {
    const c1 = [
      { id: 1, k: 1 },
      { id: 2, k: 2 },
      { id: 3, k: 3 }
    ];
    const c2 = [
      { id: 3, k: 1 },
      { id: 4, k: 4 },
      { id: 5, k: 5 }
    ];
    const diffs2 = {
      added: [
        { id: 4, k: 4 },
        { id: 5, k: 5 }
      ],
      removed: [
        { id: 1, k: 1 },
        { id: 2, k: 2 }
      ],
      updated: [{ id: 3, k: 1 }],
      reserved: []
    };
    expect(patchByDiffs(c1, diffs2)).toEqual(c2);
  });

  it("数组成员是obj, reserve", () => {
    const d1 = [
      { id: 1, k: 1 },
      { id: 2, k: 2 },
      { id: 3, k: 3 }
    ];
    const d2 = [
      { id: 1, k: 1 },
      { id: 2, k: 2 },
      { id: 3, k: 3 }
    ];
    const diffs3 = {
      added: [],
      removed: [],
      updated: [],
      reserved: [
        { id: 1, k: 1 },
        { id: 2, k: 2 },
        { id: 3, k: 3 }
      ]
    };
    expect(patchByDiffs(d1, diffs3)).toEqual(d2);
  });
});

describe("upsert", () => {
  const arr = [
    { id: 1, a: 1 },
    { id: 2, a: 2 },
    { id: 3, a: 3 }
  ];
  it("push", () => {
    const result = [
      { id: 1, a: 1 },
      { id: 2, a: 2 },
      { id: 3, a: 3 },
      { id: 0, a: 22 }
    ];
    // expect(upsert(arr, {id:0}, {id:0, a:22})).toEqual( result)
    expect(upsert(arr, n => n.id === 0, { id: 0, a: 22 })).toEqual(result);
  });
  it("update", () => {
    const result = [
      { id: 1, a: 22 },
      { id: 2, a: 2 },
      { id: 3, a: 3 }
    ];
    // expect(upsert(arr, {id:1}, {id:0, a:22})).toEqual( result)
    expect(upsert(arr, n => n.id === 1, { id: 1, a: 22 })).toEqual(result);
  });
});

describe("insertArround", () => {
  it("empty", () => {
    expect(insertArround<number>([], 0)).toEqual([]);
  });

  it("one", () => {
    expect(insertArround([1], 0)).toEqual([0, 1, 0]);
  });

  it("two", () => {
    expect(insertArround([1, 2], 0)).toEqual([0, 1, 0, 2, 0]);
  });

  it("two, function", () => {
    expect(insertArround([1, 2], i => i + 10)).toEqual([10, 1, 11, 2, 12]);
  });
});

describe("insertBetween", () => {
  it("empty", () => {
    expect(insertBetween<number>([], 0)).toEqual([]);
  });

  it("one", () => {
    expect(insertBetween([1], 0)).toEqual([1]);
  });

  it("two", () => {
    expect(insertBetween([1, 2], 0)).toEqual([1, 0, 2]);
  });

  it("three", () => {
    expect(insertBetween([1, 2, 3], 0)).toEqual([1, 0, 2, 0, 3]);
  });

  it("three", () => {
    expect(insertBetween([1, 2, 3], i => i + 10)).toEqual([1, 10, 2, 11, 3]);
  });
});

describe("padding", () => {
  it("差2个", () => {
    expect(padding<number>([], 2, 1)).toEqual([1, 1]);
  });

  it("差1个", () => {
    expect(padding([3], 2, 1)).toEqual([3, 1]);
  });

  it("刚刚好", () => {
    expect(padding([3, 3], 2, 1)).toEqual([3, 3]);
  });

  it("null", () => {
    expect(padding([null, 3], 2, 1)).toEqual([null, 3]);
  });

  it("undefined会被替换", () => {
    expect(padding([undefined, 3], 2, 1)).toEqual([1, 3]);
  });

  it("多一个", () => {
    expect(padding([3, 3, 3], 2, 1)).toEqual([3, 3]);
  });

  it("函数参数", () => {
    expect(padding([], 2, i => `${i}1`)).toEqual(["01", "11"]);
  });
});

describe("sliceBy", () => {
  test("nil", () => {
    expect(sliceBy("12345", {})).toEqual("12345");
  });

  test("common", () => {
    expect(sliceBy("12345", { to: "1" })).toEqual("");
    expect(sliceBy("12345", { to: "2" })).toEqual("1");
    expect(sliceBy("12345", { from: "1", to: "4" })).toEqual("123");
    expect(sliceBy("12345", { from: "1" })).toEqual("12345");
    expect(sliceBy("12345", { from: "5" })).toEqual("5");
  });

  test("不存在的值,  一律返回空", () => {
    expect(sliceBy("12345", { from: "6" })).toEqual("");
    expect(sliceBy("12345", { from: "6", to: "3" })).toEqual("");
    expect(sliceBy("12345", { from: "3", to: "6" })).toEqual("");
  });

  test("from > to", () => {
    expect(sliceBy("12345", { from: "5", to: "1" })).toEqual("");
  });

  test("array", () => {
    expect(sliceBy([1, 2, 3, 4, 5], { from: 1, to: 2 })).toEqual([1]);
    expect(sliceBy([1, 2, 3, 4, 5], { from: 3, to: 2 })).toEqual([]);
  });
});

describe("crossjoin", () => {
  test("simple", () => {
    expect(crossJoin([1, 2], ["a", "b"])).toEqual([
      [1, "a"],
      [1, "b"],
      [2, "a"],
      [2, "b"]
    ]);
  });
});

describe("getNextByIndex", () => {
  var xs = [
    { id: 1, index: 1 },
    { id: 0, index: -1 },
    { id: 2, index: 2 },
    { id: 3, index: 3 }
  ];

  it("case0: 没有下一个", () => {
    var result = getNextByIndex(xs, 3);
    var expected = null;
    expect(result).toEqual(expected);
  });

  it("case1: 有下一个", () => {
    var result = getNextByIndex(xs, 0);
    var expected = { id: 1, index: 1 };
    expect(result).toEqual(expected);
  });
});

describe("getPrevByIndex", () => {
  var xs = [
    { id: 1, index: 1 },
    { id: 0, index: -1 },
    { id: 2, index: 2 },
    { id: 3, index: 3 }
  ];

  it("case0: 没有上一个", () => {
    var result = getPrevByIndex(xs, 0);
    var expected = null;
    expect(result).toEqual(expected);
  });

  it("case1: 有上一个", () => {
    var result = getPrevByIndex(xs, 1);
    var expected = { id: 0, index: -1 };
    expect(result).toEqual(expected);
  });
});
