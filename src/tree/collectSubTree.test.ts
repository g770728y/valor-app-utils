import * as R from "rambdax";
import { collectSubTree } from "./collectSubTree";

describe("collectSubTree", () => {
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
  it("无匹配", () => {
    const tree1 = R.clone(tree);
    const result = collectSubTree(tree1, (node) => [8].indexOf(node.id) >= 0);
    expect(result).toEqual(null);
  });
  it("单节点+叶结点", () => {
    const tree1 = R.clone(tree);
    collectSubTree(tree1, (node) => [3].indexOf(node.id) >= 0);
    expect(tree1).toEqual({
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
      ],
    });
  });
  it("单节点+中间结点", () => {
    const tree1 = R.clone(tree);
    collectSubTree(tree1, (node) => [2].indexOf(node.id) >= 0);
    expect(tree1).toEqual({
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
      ],
    });
  });

  const complexTree = {
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
        children: [
          {
            id: 5,
            v: 5,
            paths: [],
            children: [
              {
                id: 6,
                v: 6,
                paths: [],
              },
            ],
          },
          {
            id: 7,
            v: 7,
            paths: [],
            children: [
              {
                id: 8,
                v: 8,
                paths: [],
              },
            ],
          },
        ],
      },
    ],
  };
  it("多个节点", () => {
    const tree1 = R.clone(complexTree);
    collectSubTree(tree1, (node) => [2, 8, 7].indexOf(node.id) >= 0);
    expect(tree1).toEqual({
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
          children: [
            {
              id: 7,
              v: 7,
              paths: [],
              children: [
                {
                  id: 8,
                  v: 8,
                  paths: [],
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
