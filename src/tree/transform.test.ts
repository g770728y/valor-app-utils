import { RootNodeId } from './interface';
import { array2tree_byLevel, array2tree_byPid, tree2Array } from './transform';

describe('array2Tree_byLevel', () => {
  it('empty', () =>
    expect(array2tree_byLevel([])).toEqual({
      id: RootNodeId,
      level: 0,
      children: [],
    }));

  const arr1 = [
    { id: 1, level: 1 },
    { id: 2, level: 2 },
    { id: 3, level: 3 },
  ];
  const tree1 = {
    id: RootNodeId,
    level: 0,
    children: [
      {
        id: 1,
        level: 1,
        children: [
          { id: 2, level: 2, children: [{ id: 3, level: 3, children: [] }] },
        ],
      },
    ],
  };

  const result1 = array2tree_byLevel(arr1);
  it('simple', () => expect(result1).toEqual(tree1));

  const arr2 = [
    { id: 1, level: 1 },
    { id: 2, level: 2 },
    { id: 3, level: 3 },
    { id: 4, level: 3 },
    { id: 5, level: 1 },
  ];
  const tree2 = {
    id: RootNodeId,
    level: 0,
    children: [
      {
        id: 1,
        level: 1,
        children: [
          {
            id: 2,
            level: 2,
            children: [
              {
                id: 3,
                level: 3,
                children: [],
              },
              {
                id: 4,
                level: 3,
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 5,
        level: 1,
        children: [],
      },
    ],
  };
  const result2 = array2tree_byLevel(arr2);
  it('complex', () => expect(result2).toEqual(tree2));
});

describe('array2Tree_byPid', () => {
  const arr1 = [
    { id: 1, pid: RootNodeId },
    { id: 2, pid: 1 },
    { id: 3, pid: 2 },
  ];
  const tree1 = {
    id: RootNodeId,
    pid: undefined,
    children: [
      {
        id: 1,
        pid: RootNodeId,
        data: { id: 1, pid: RootNodeId },
        children: [
          { id: 2, pid: 1, data: {id:2, pid:1}, children: [{ id: 3, pid: 2, data: {id:3,pid:2}, children: [] }] },
        ],
      },
    ],
  };

  const result1 = array2tree_byPid(arr1);
  it("simple, bypid", () => expect(result1).toEqual(tree1));
  it("empty", () => {
    expect(array2tree_byPid([])).toEqual({
      id: RootNodeId,
      level: 0,
      children: [],
    });
  });
  it('custom rootId', () => {
    expect(
      array2tree_byPid([
        { id: 1, pid: null },
        { id: 2, pid: 1 },
      ])
    ).toEqual({
      id: null,
      children: [
        {
          id: 1,
          pid: null,
          data: { id: 1, pid: null },
          children: [{ id: 2, pid: 1, children: [] , data: {id:2, pid:1}}],
        },
      ],
    });
  });
});

describe('tree2Array', () => {
  it('空', () => expect(tree2Array(array2tree_byLevel([]))).toEqual([]));
  const arr0 = [
    { id: 1, level: 1, content: '1' },
    { id: 2, level: 2, content: '2' },
  ];
  const tree0 = array2tree_byLevel(arr0);
  it('2个节点', () => expect(tree2Array(tree0)).toEqual(arr0));

  const arr1 = [
    { id: 1, level: 1 },
    { id: 2, level: 2 },
    { id: 3, level: 3 },
  ];
  const tree1 = array2tree_byLevel(arr1);
  it('3个节点', () => expect(tree2Array(tree1)).toEqual(arr1));

  const arr2 = [
    { id: 1, level: 1, content: '1' },
    { id: 3, level: 2, content: '2' },
    { id: 4, level: 3, content: '2' },
    { id: 2, level: 2, content: '2' },
  ];
  const tree2 = array2tree_byLevel(arr2);
  it('4个节点', () => expect(tree2Array(tree2)).toEqual(arr2));
});
