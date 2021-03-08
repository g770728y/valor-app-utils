import { getAncestors } from "./query";

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
