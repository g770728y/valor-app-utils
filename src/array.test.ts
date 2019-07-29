import {
  array2idTree_byLevel,
  findParentNode,
  RootNodeId,
  findIndexFrom,
  reAppend,
  swapByProp,
  idTree2Array
} from './array';
import * as R from 'rambda';

describe('array2idTree_byLevel', () => {
  const arr1 = [{ id: 1, level: 1 }, { id: 2, level: 2 }, { id: 3, level: 3 }];
  const tree1 = [
    {
      id: 1,
      pid: RootNodeId,
      el: { id: 1, level: 1 },
      paths: [0],
      children: [
        {
          id: 2,
          pid: 1,
          el: { id: 2, level: 2 },
          paths: [0, 0],
          children: [
            {
              id: 3,
              pid: 2,
              el: { id: 3, level: 3 },
              paths: [0, 0, 0],
              children: []
            }
          ]
        }
      ]
    }
  ];
  it('simple', () =>
    expect(array2idTree_byLevel(arr1).children).toEqual(tree1));

  const arr2 = [
    { id: 1, level: 1 },
    { id: 2, level: 2 },
    { id: 3, level: 3 },
    { id: 4, level: 3 },
    { id: 5, level: 1 }
  ];
  const tree2 = [
    {
      id: 1,
      pid: RootNodeId,
      el: { id: 1, level: 1 },
      paths: [0],
      children: [
        {
          id: 2,
          pid: 1,
          el: { id: 2, level: 2 },
          paths: [0, 0],
          children: [
            {
              id: 3,
              pid: 2,
              el: { id: 3, level: 3 },
              paths: [0, 0, 0],
              children: []
            },
            {
              id: 4,
              pid: 2,
              el: { id: 4, level: 3 },
              paths: [0, 0, 1],
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 5,
      pid: RootNodeId,
      el: { id: 5, level: 1 },
      paths: [1],
      children: []
    }
  ];
  it('complex', () =>
    expect(array2idTree_byLevel(arr2).children).toEqual(tree2));
});

describe('idTree2Array', () => {
  it('空', () => expect(idTree2Array(array2idTree_byLevel([]))).toEqual([]));
  const arr0 = [
    { id: 1, level: 1, content: '1' },
    { id: 2, level: 2, content: '2' }
  ];
  const tree0 = array2idTree_byLevel(arr0);
  it('2个节点', () => expect(idTree2Array(tree0)).toEqual(arr0));

  const arr1 = [{ id: 1, level: 1 }, { id: 2, level: 2 }, { id: 3, level: 3 }];
  const tree1 = array2idTree_byLevel(arr1);
  it('3个节点', () => expect(idTree2Array(tree1)).toEqual(arr1));

  const arr2 = [
    { id: 1, level: 1, content: '1' },
    { id: 3, level: 2, content: '2' },
    { id: 4, level: 3, content: '2' },
    { id: 2, level: 2, content: '2' }
  ];
  const tree2 = array2idTree_byLevel(arr2);
  it('4个节点', () => expect(idTree2Array(tree2)).toEqual(arr2));
});

describe('findParentNode', () => {
  const node1 = { id: 1, level: 1, paths: [], children: [] };
  const node2 = { id: 2, level: 2, paths: [], children: [], pNode: node1 };
  const arr1 = [node1, node2];
  it('case1', () => expect(findParentNode(arr1, 2)).toBe(node1));

  const node3 = { id: 3, level: 3, paths: [], children: [], pNode: node2 };
  const arr2 = [...arr1, node3];
  it('case2', () => expect(findParentNode(arr2, 3)).toBe(node2));

  it('case3', () => expect(findParentNode(arr2, 2)).toBe(node1));
  it('case4', () => expect(findParentNode(arr2, 1)).toBeFalsy());
});

describe('findIndexUntil', () => {
  const arr = [5, 6, 3, 4, 5];
  it('default', () =>
    expect(findIndexFrom(arr, 2, (i: number) => i >= 6)).toEqual(-1));

  const arr2 = [5, 6, 3, 4, 8];
  it('default - 1', () =>
    expect(findIndexFrom(arr2, 2, (i: number) => i >= 6)).toEqual(4));

  it('特殊行为: default - 3', () =>
    expect(findIndexFrom(arr, 2, (i: number) => i >= 3)).toEqual(2));

  const arr3 = [4, 5, 6];
  it('default - 4', () =>
    expect(findIndexFrom(arr3, 2, (i: number) => i < 1)).toEqual(-1));

  it('特殊行为: default - 5', () =>
    expect(findIndexFrom(arr3, 2, (i: number) => i >= 6)).toEqual(2));
});

describe('reAppend', () => {
  const arr = [1, 3, 2, 4, 5];
  it('not existed', () => expect(reAppend(arr, 6)).toEqual([1, 3, 2, 4, 5, 6]));
  it('existed', () => expect(reAppend(arr, 2)).toEqual([1, 3, 4, 5, 2]));
});

describe('swapByProp', () => {
  const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
  it('swap self should return self', () =>
    expect(swapByProp(arr, 'id', 1, 1)).toEqual(arr));
  it('swap 2 and 3', () =>
    expect(swapByProp(arr, 'id', 2, 3)).toEqual([
      { id: 1 },
      { id: 3 },
      { id: 2 }
    ]));
});
