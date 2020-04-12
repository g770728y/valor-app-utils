import {
  reverseKV,
  removeNils,
  objSubtract,
  getOrElse,
  getNumberOrElse,
  isPlainObject,
  objSubtractDeep,
  removeProp,
  remove,
  str2object,
  object2str,
  dissoc,
  mergeDeep,
  idMap
} from "./object";

describe("isPlainObject", () => {
  it("null", () => expect(isPlainObject(null)).toBe(false));
  it("undefined", () => expect(isPlainObject(undefined)).toBe(false));
  it("number", () => expect(isPlainObject(3)).toBe(false));
  it("string", () => expect(isPlainObject("3")).toBe(false));
  it("function", () => expect(isPlainObject(function() {})).toBe(false));
  it("lambda", () => expect(isPlainObject(() => {})).toBe(false));
  it("array", () => expect(isPlainObject([])).toBe(false));
  it("object create null", () =>
    expect(isPlainObject(Object.create(null))).toBe(false));
  it("object create", () => expect(isPlainObject({})).toBe(true));
  it("object", () => expect(isPlainObject({})).toBe(true));
});

describe("reverseKV", () => {
  it("empty", () => {
    expect(reverseKV({})).toEqual({});
  });

  it("value is string", () => {
    expect(reverseKV({ a: "1", b: "2" })).toEqual({ 1: "a", 2: "b" });
  });

  it("value has number, boolean", () => {
    expect(reverseKV({ a: true, b: 2 })).toEqual({ true: "a", 2: "b" });
  });
});

describe("remove", () => {
  it("empty", () => {
    expect(remove({}, () => true)).toEqual({});
  });

  it("object", () => {
    expect(remove({ a: 1, b: 2, c: 2 }, v => v === 2)).toEqual({ a: 1 });
    expect(remove({ a: 1, b: 2, c: 2 }, (v, k) => k === "a")).toEqual({
      b: 2,
      c: 2
    });
  });

  it("array", () => {
    expect(remove([0, 1, 2], v => v === 2)).toEqual([0, 1]);
    expect(remove([0, 1, 2], (v, k) => k === 1)).toEqual([0, 2]);
  });
});

describe("removeNils", () => {
  it("common", () => {
    expect(removeNils({})).toEqual({});
    expect(removeNils({ a: 1, b: null, c: undefined, d: "" })).toEqual({
      a: 1,
      d: ""
    });
    expect(
      removeNils({ a: 1, b: null, c: undefined, d: "" }, { removeBlank: true })
    ).toEqual({
      a: 1
    });
    expect(
      removeNils({ a: 1, b: null, c: undefined, d: {} }, { removeEmpty: true })
    ).toEqual({
      a: 1
    });
  });

  it("recursive", () => {
    expect(
      removeNils(
        { a: 1, b: {}, c: { d: {} } },
        { removeEmpty: true, recursive: true }
      )
    ).toEqual({ a: 1 });
    expect(
      removeNils(
        { a: 1, b: [{}], c: { d: [1, 2] }, d: [{}, {}] },
        { removeEmpty: true, recursive: true }
      )
    ).toEqual({ a: 1, b: [{}], c: { d: [1, 2] }, d: [{}, {}] });
  });
});

describe("removeProp", () => {
  it("common", () => {
    expect(removeProp({}, "a")).toEqual({});
    expect(removeProp({ a: [] }, "a")).toEqual({});
    expect(removeProp({ a: { b: 1 }, a1: 1 }, "a")).toEqual({ a1: 1 });
    expect(removeProp({ a: { b: 1 }, a1: { a: 2 } }, "a")).toEqual({
      a1: { a: 2 }
    });
    expect(removeProp({ b: [{ a: 1, b: [{ a: 1 }] }, { b: 2 }] }, "a")).toEqual(
      {
        b: [{ a: 1, b: [{ a: 1 }] }, { b: 2 }]
      }
    );
  });

  it("recursive", () => {
    expect(
      removeProp({ a: { b: 1 }, a1: { a: 2 } }, "a", { recursive: true })
    ).toEqual({ a1: {} });
    expect(
      removeProp({ b: [{ a: 1, b: [{ a: 1 }] }, { b: 2 }] }, "a", {
        recursive: true
      })
    ).toEqual({ b: [{ b: [{}] }, { b: 2 }] });
  });
});

describe("objSubtract", () => {
  it("same", () => expect(objSubtract({}, {})).toEqual({}));

  it("右侧多", () => expect(objSubtract({ b: 2 }, { a: 1, b: 2 })).toEqual({}));

  it("左侧多", () =>
    expect(objSubtract({ a: 1, b: 2 }, { a: 1 })).toEqual({ b: 2 }));

  it("右侧与左侧不同", () =>
    expect(objSubtract({ a: 2 }, { a: 1 })).toEqual({ a: 2 }));

  it("需要保留id", () =>
    expect(objSubtract({ a: 2, id: 1 }, { a: 1, id: 1 })).toEqual({
      id: 1,
      a: 2
    }));

  it("只剩下id", () => {
    expect(objSubtract({ a: 1, id: 1 }, { a: 1, id: 1 })).toEqual({
      id: 1
    });
  });

  it("复杂", () =>
    expect(objSubtract({ a: 2, b: [2, 3], c: 5 }, { a: 1, b: [1, 2] })).toEqual(
      { a: 2, b: [2, 3], c: 5 }
    ));
});

describe("objSubtractDeep recusive", () => {
  it("1 layer -> 1 layer, equals", () =>
    expect(objSubtractDeep({ a: 1, b: 2 }, { a: 1, b: 2 })).toEqual({}));
  it("1 layer -> 1 layer, equals, removeNil", () =>
    expect(
      objSubtractDeep({ a: 1, b: undefined }, { a: 1 }, { removeNil: true })
    ).toEqual({}));
  it("1 layer -> 1 layer, equals, removeEmpty", () =>
    expect(objSubtractDeep({ a: 1, b: [] }, { a: 1 })).toEqual({}));
  it("1 layer -> 1 layer, equals, !removeEmpty", () =>
    expect(
      objSubtractDeep(
        { a: 1, b: [], c: { c1: {} } },
        { a: 1, c: { c1: {} } },
        { removeEmpty: false }
      )
    ).toEqual({ b: [] }));

  it("1 layer -> 1 layer, equals, !removeEmpty2", () =>
    expect(
      objSubtractDeep(
        {
          id: "slot102",
          type: "slot",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }
          }
        },
        {
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }
          }
        },
        { removeEmpty: true }
      )
    ).toEqual({
      id: "slot102",
      type: "slot"
    }));

  it("1 layer -> 1 layer, equals, removeBlank", () =>
    expect(
      objSubtractDeep({ a: 1, b: "" }, { a: 1 }, { removeBlank: true })
    ).toEqual({}));
  it("1 layer -> 1 layer, equals, removeNil", () =>
    expect(
      objSubtractDeep({ a: 1, b: undefined }, { a: 1 }, { removeNil: true })
    ).toEqual({}));
  it("1 layer -> 1 layer", () =>
    expect(objSubtractDeep({ a: 1, b: 2 }, { a: 2, b: 2 })).toEqual({ a: 1 }));
  it("2 layers -> 1 layer", () =>
    expect(objSubtract({ a: { a1: 1, a2: 2 }, b: 2 }, { a: 2, b: 2 })).toEqual({
      a: { a1: 1, a2: 2 }
    }));
  it("2 layers -> 2 layer, empty", () =>
    expect(
      objSubtractDeep(
        { a: { a1: 1, a2: 2 }, b: 2 },
        { a: { a1: 1, a2: 2 }, b: 2 }
      )
    ).toEqual({}));
  it("2 layers -> 2 layer", () =>
    expect(
      objSubtractDeep(
        { a: { a1: 1, a2: 2 }, b: 2 },
        { a: { a1: 1, a2: 3 }, b: 2 }
      )
    ).toEqual({ a: { a2: 2 } }));
  it("2 layers -> 3 layer", () =>
    expect(
      objSubtractDeep(
        { a: { a1: { a11: 1, a12: 2 }, a2: 2 }, b: 2 },
        { a: { a1: 1, a2: 3 }, b: 2 }
      )
    ).toEqual({ a: { a1: { a11: 1, a12: 2 }, a2: 2 } }));
  it("3 layers -> 2 layer", () =>
    expect(
      objSubtractDeep(
        { a: { a1: 1, a2: 3 }, b: 2 },
        { a: { a1: { a11: 1, a12: 2 }, a2: 2 }, b: 2 }
      )
    ).toEqual({ a: { a1: 1, a2: 3 } }));
});

describe("getOrElse", () => {
  it("without default", () =>
    expect(getOrElse({ a: 1, b: 2 }, "a")).toEqual(1));
  it("without default2", () =>
    expect(getOrElse({ a: 1, b: 2 }, "c" as any)).toEqual(undefined));
  it("with default", () =>
    expect(getOrElse({ a: 1, b: 2 }, "c" as any, 3)).toEqual(3));
});

describe("getNumberOrElse", () => {
  it("without default", () =>
    expect(getNumberOrElse({ a: 1 }, "a")).toEqual(1));
  it("with default2", () =>
    expect(getNumberOrElse({ a: 1 }, "c" as any, 2)).toEqual(2));
  it("without default", () =>
    expect(getNumberOrElse({ a: "1px" }, "a")).toEqual(1));
});

describe("str2object", () => {
  it("default", () => {
    expect(str2object("{}")).toEqual({});
    expect(str2object("[]")).toEqual([]);
    expect(str2object("[{}, {}]")).toEqual([{}, {}]);
    expect(str2object("null")).toEqual(null);
    expect(str2object("undefined")).toEqual(undefined);
    expect(str2object("3")).toEqual(3);
    expect(str2object('"3"')).toEqual("3");
  });

  it("complex", () => {
    expect(str2object("{a:[{b:{a1: {b1: 1}}}]}")).toEqual({
      a: [{ b: { a1: { b1: 1 } } }]
    });
  });

  it("function", () => {
    const expected = function() {}.toString();
    expect(str2object("function () { }").toString()).toEqual(expected);
  });
});

describe("object2str", () => {
  it("default", () => {
    expect(object2str({})).toEqual("{}");
    expect(object2str([])).toEqual("[]");
    expect(object2str([{}, {}])).toEqual("[{},{}]");
    expect(object2str({ a: 1 })).toEqual("{a:1}");
    expect(object2str([1, 2])).toEqual("[1,2]");
    expect(object2str(null)).toEqual("null");
    expect(object2str(undefined)).toEqual("undefined");
    expect(object2str(3)).toEqual("3");
    expect(object2str("3")).toEqual('"3"');
  });

  it("complex", () => {
    expect(object2str({ a: [{ b: { a1: { b1: 1 } } }] })).toEqual(
      "{a:[{b:{a1:{b1:1}}}]}"
    );
    expect(object2str({ a: 1, b: 2 })).toEqual("{a:1,b:2}");
  });

  it("function", () => {
    expect(object2str(function() {})).toEqual("function () { }");
    expect(
      object2str(function() {
        return "a";
      }).replace(/\s/g, "")
    ).toEqual('function(){return"a";}');
    expect(
      object2str(function() {
        return "a'b'";
      }).replace(/\s/g, "")
    ).toEqual("function(){return\"a'b'\";}");
    expect(object2str(() => {})).toEqual("() => { }");
  });
});

describe("str <-> object", () => {
  it("simple", () => {
    const str = "{a:1,b:2,d:null,e:[{f:1}]}";
    const expected = { a: 1, b: 2, d: null, e: [{ f: 1 }] };
    expect(str2object(str)).toEqual(expected);
    expect(object2str(expected)).toEqual(str);
  });

  it("with function", () => {
    const str = "{c:function(a,b){return a+b;}}";
    const expected = {
      // @ts-ignore
      c: function(a, b) {
        return a + b;
      }
    };
    expect(str2object(str).c(1, 2)).toEqual(3);
    expect(object2str(expected).replace(/\s/g, x => "")).toEqual(
      str.replace(/\s/g, x => "")
    );
  });
});

describe("dissocByArr", () => {
  it("default", () => {
    expect(dissoc({ a: 1, b: 2, c: 3 }, ["a", "b"])).toEqual({ c: 3 });
    expect(dissoc({ a: 1, b: 2 }, "a")).toEqual({ b: 2 });
  });
});

describe("mergeDeep", () => {
  it("with nil", () => {
    expect(mergeDeep(null, null)).toEqual(null);
    expect(mergeDeep(null, {})).toEqual({});
    expect(mergeDeep({}, null)).toEqual(null);
  });

  it("without array", () => {
    expect(
      mergeDeep({ a: 1, b: { b1: 2, c1: 3 } }, { a: 2, b: { b2: 1, c1: 4 } })
    ).toEqual({ a: 2, b: { b1: 2, b2: 1, c1: 4 } });
  });

  it("with array", () => {
    expect(mergeDeep([1, 2, undefined, null], [3, 4, null, undefined])).toEqual(
      [3, 4, null, null]
    );

    expect(
      mergeDeep(
        { a: [{ a1: 1, a2: { a3: 1, a4: 1 } }, { a10: 1 }], b: 1 },
        { a: [{ a1: 1, a2: { a3: 4 } }, { a10: 2 }], c: 1 }
      )
    ).toEqual({
      a: [{ a1: 1, a2: { a3: 4, a4: 1 } }, { a10: 2 }],
      b: 1,
      c: 1
    });

    expect(
      mergeDeep(
        { a: [{ a1: 1 }, { a10: 1 }, { a11: 1 }] },
        { a: [{ a1: 2 }, { a10: 2 }] }
      )
    ).toEqual({ a: [{ a1: 2 }, { a10: 2 }] });

    expect(
      mergeDeep(
        { a: [{ a1: 1 }, { a10: 1 }] },
        { a: [{ a1: 2 }, { a10: 2 }, { a11: 1 }] }
      )
    ).toEqual({ a: [{ a1: 2 }, { a10: 2 }, { a11: 1 }] });
  });

  it("类型不同", () => {
    expect(mergeDeep({ a: { a: 1 } }, { a: [2] })).toEqual({ a: [2] });
  });
});

describe("idMap", () => {
  it("default", () => {
    const idArray = [{ id: 1 }, { id: 2 }];
    const result = idMap(idArray);
    const expected = {
      1: { id: 1 },
      2: { id: 2 }
    };
    expect(result).toEqual(expected);
    // 引用不变
    expect(result[1] === idArray[0]).toBe(true);
  });
  it("with idKey", () => {
    expect(idMap([{ key: 1 }, { key: 2 }], "key")).toEqual({
      1: { key: 1 },
      2: { key: 2 }
    });
  });
});
