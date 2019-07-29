import * as R from 'rambda';
import { findTreeNode, traverseTree, TreeNode, mapTreeNode } from './tree';

describe('traverse-tree', () => {
  const tree = {
    id: 1,
    v: 1,
    paths: [],
    children: [
      {
        id: 2,
        v: 2,
        paths: [],
        children: [{ id: 3, v: 3, paths: [], children: [] }]
      },
      {
        id: 4,
        v: 4,
        paths: [],
        children: []
      }
    ]
  };
  const result = {
    id: 1,
    v: 2,
    paths: [],
    children: [
      {
        id: 2,
        v: 3,
        paths: [],
        children: [{ id: 3, v: 4, children: [], paths: [] }]
      },
      { id: 4, v: 5, children: [], paths: [] }
    ]
  };
  it('default', () =>
    expect(
      traverseTree(tree, (node: TreeNode & { v: number }) => ({
        ...node,
        v: node.v + 1
      }))
    ).toEqual(result));

  const tree1 = {
    id: 1,
    v: 1,
    paths: [],
    children: [
      {
        id: 2,
        v: 2,
        paths: [],
        children: [{ id: 3, v: 3, paths: [], children: [] }]
      },
      { id: 4, v: 4, paths: [], children: [] }
    ]
  };
  const result1 = {
    id: 1,
    paths: [],
    children: [
      {
        id: 2,
        paths: [],
        children: [{ id: 3, children: [], paths: [] }]
      },
      { id: 4, children: [], paths: [] }
    ]
  };

  it('default', () =>
    expect(
      traverseTree(
        tree1,
        (node: TreeNode & { v: number }) => R.dissoc('v', node) as TreeNode
      )
    ).toEqual(result1));
});

describe('find-tree-node', () => {
  const tree = {
    id: 1,
    v: 1,
    paths: [],
    children: [
      {
        id: 2,
        v: 2,
        paths: [],
        children: [{ id: 3, v: 3, paths: [], children: [] }]
      },
      {
        id: 4,
        v: 4,
        paths: [],
        children: []
      }
    ]
  };

  expect(findTreeNode(tree, ({ id }) => id === 3)).toEqual({
    id: 3,
    v: 3,
    paths: [],
    children: []
  });
  expect(findTreeNode(tree, ({ id }) => id === 4)).toEqual({
    id: 4,
    v: 4,
    paths: [],
    children: []
  });
});

describe('map-tree-node', () => {
  const tree1 = {
    id: 1
  };
  expect(mapTreeNode(tree1, t => ({ ...t, x: 1 } as any))).toEqual({
    id: 1,
    x: 1
  });

  const tree2 = {
    id: 1,
    children: [{ id: 2 }]
  };

  expect(mapTreeNode(tree2, t => ({ ...t, x: t.id + 1 } as any))).toEqual({
    id: 1,
    x: 2,
    children: [{ id: 2, x: 3 }]
  });

  const tree3 = {
    id: 1,
    children: [{ id: 2, children: [{ id: 3 }] }]
  };
  expect(mapTreeNode(tree3, t => ({ ...t, x: t.id + 1 } as any))).toEqual({
    id: 1,
    x: 2,
    children: [{ id: 2, x: 3, children: [{ id: 3, x: 4 }] }]
  });
});
