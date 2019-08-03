import {
  // array2idTree_byLevel,
  // findParentNode,
  findIndexFrom,
  reAppend,
  swapByProp,
  dropIndex,
  insertIndex,
  arrayCompare
} from './array';
import * as R from 'rambda';

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

describe('dropIndex', () => {
  const arr = [1, 2, 3];
  it('drop 0', () => expect(dropIndex(arr, 0)).toEqual([2, 3]));

  it('drop 1', () => expect(dropIndex(arr, 1)).toEqual([1, 3]));

  const arr1 = [] as any;
  it('drop from empty', () => expect(dropIndex(arr1, 0)).toEqual([]));
});

describe('insertIndex', () => {
  const arr = [1, 2, 3];
  it('insert 0', () => expect(insertIndex(arr, 0, 4)).toEqual([4, 1, 2, 3]));

  it('insert 1', () => expect(insertIndex(arr, 1, 4)).toEqual([1, 4, 2, 3]));

  const arr1 = [] as any;
  it('insert from empty', () => expect(insertIndex(arr1, 0, 4)).toEqual([4]));
});

describe('array-compare', () => {
  const b1 = [{ id: 1, k: 1 }, { id: 2, k: 2 }, { id: 3, k: 3 }];
  const b2 = [{ id: 3, k: 3 }, { id: 4, k: 4 }, { id: 5, k: 5 }];
  it('数组成员是obj', () =>
    expect(arrayCompare(b1, b2)).toEqual({
      added: [{ id: 4, k: 4 }, { id: 5, k: 5 }],
      removed: [{ id: 1, k: 1 }, { id: 2, k: 2 }],
      updated: [],
      reserved: [{ id: 3, k: 3 }]
    }));

  const c1 = [{ id: 1, k: 1 }, { id: 2, k: 2 }, { id: 3, k: 3 }];
  const c2 = [{ id: 3, k: 1 }, { id: 4, k: 4 }, { id: 5, k: 5 }];
  console.log('...', arrayCompare(c1, c2));
  it('数组成员是obj, 并且某个obj有变化', () =>
    expect(arrayCompare(c1, c2)).toEqual({
      added: [{ id: 4, k: 4 }, { id: 5, k: 5 }],
      removed: [{ id: 1, k: 1 }, { id: 2, k: 2 }],
      updated: [{ id: 3, k: 1 }],
      reserved: []
    }));
});
