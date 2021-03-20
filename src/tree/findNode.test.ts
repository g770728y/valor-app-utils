import { findTreeNode } from "./findNode";

describe("find-tree-node", () => {
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

  it("", () =>
    expect(findTreeNode(tree, ({ id }) => id === 3)).toEqual({
      id: 3,
      v: 3,
      paths: [],
      children: [],
    }));
  it("", () =>
    expect(findTreeNode(tree, ({ id }) => id === 4)).toEqual({
      id: 4,
      v: 4,
      paths: [],
      children: [],
    }));
});
