import { getAncestors, getDecendants } from "./query";

describe("getAncestors", () => {
  const tree = {
    id: 1,
    v: 1,
    paths: [],
    children: [
      {
        id: 2,
        v: 2,
        paths: [],
        children: [{ id: 3, v: 3, paths: [], children: [] }],
      },
      {
        id: 4,
        v: 4,
        paths: [],
        children: [],
      },
    ],
  };

  it("", () => {
    expect(getAncestors(tree, 3)).toEqual([1, 2]);
  });
});

describe("getDecendants", () => {
  const tree = {
    id: 1,
    v: 1,
    paths: [],
    children: [
      {
        id: 2,
        v: 2,
        paths: [],
        children: [{ id: 3, v: 3, paths: [], children: [] }],
      },
      {
        id: 4,
        v: 4,
        paths: [],
        children: [],
      },
    ],
  };

  it("", () => {
    expect(getDecendants(tree, 1).map((it) => it.id)).toEqual([2, 3, 4]);
    expect(getDecendants(tree, 2).map((it) => it.id)).toEqual([3]);
    expect(getDecendants(tree, 3).map((it) => it.id)).toEqual([]);
  });
});
