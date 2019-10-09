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
  arrayCompareBy
} from './array';
import * as R from 'rambda';

describe('findIndexFrom', () => {
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
  it('数组成员是obj, 并且某个obj有变化', () =>
    expect(arrayCompare(c1, c2)).toEqual({
      added: [{ id: 4, k: 4 }, { id: 5, k: 5 }],
      removed: [{ id: 1, k: 1 }, { id: 2, k: 2 }],
      updated: [{ id: 3, k: 1 }],
      reserved: []
    }));

  const d1 = [{ id: 1, k: 1 }, { id: 2, k: 2 }, { id: 3, k: 3 }];
  const d2 = [{ id: 1, k: 1 }, { id: 2, k: 2 }, { id: 3, k: 3 }];
  it('数组成员是obj, reserve', () =>
    expect(arrayCompare(d1, d2)).toEqual({
      added: [],
      removed: [],
      updated: [],
      reserved: [{ id: 1, k: 1 }, { id: 2, k: 2 }, { id: 3, k: 3 }]
    }));
});

describe('array-compare-by', () => {
  const b1 = [{ xid: 1, k: 1 }, { xid: 2, k: 2 }, { xid: 3, k: 3 }];
  const b2 = [{ xid: 3, k: 3 }, { xid: 4, k: 4 }, { xid: 5, k: 5 }];
  it('数组成员是obj', () =>
    expect(arrayCompareBy(b1, b2, 'xid')).toEqual({
      added: [{ xid: 4, k: 4 }, { xid: 5, k: 5 }],
      removed: [{ xid: 1, k: 1 }, { xid: 2, k: 2 }],
      updated: [],
      reserved: [{ xid: 3, k: 3 }]
    }));

  const c1 = [{ xid: 1, k: 1 }, { xid: 2, k: 2 }, { xid: 3, k: 3 }];
  const c2 = [{ xid: 3, k: 1 }, { xid: 4, k: 4 }, { xid: 5, k: 5 }];
  it('数组成员是obj, 并且某个obj有变化', () =>
    expect(arrayCompareBy(c1, c2, 'xid')).toEqual({
      added: [{ xid: 4, k: 4 }, { xid: 5, k: 5 }],
      removed: [{ xid: 1, k: 1 }, { xid: 2, k: 2 }],
      updated: [{ xid: 3, k: 1 }],
      reserved: []
    }));

  const d1 = [{ xid: 1, k: 1 }, { xid: 2, k: 2 }, { xid: 3, k: 3 }];
  const d2 = [{ xid: 1, k: 1 }, { xid: 2, k: 2 }, { xid: 3, k: 3 }];
  it('数组成员是obj, reserve', () =>
    expect(arrayCompareBy(d1, d2, 'xid')).toEqual({
      added: [],
      removed: [],
      updated: [],
      reserved: [{ xid: 1, k: 1 }, { xid: 2, k: 2 }, { xid: 3, k: 3 }]
    }));
});

describe('patchByDiffs', () => {
  it('数组成员是obj', () => {
    const b1 = [{ id: 1, k: 1 }, { id: 2, k: 2 }, { id: 3, k: 3 }];
    const b2 = [{ id: 3, k: 3 }, { id: 4, k: 4 }, { id: 5, k: 5 }];
    const diffs1 = {
      added: [{ id: 4, k: 4 }, { id: 5, k: 5 }],
      removed: [{ id: 1, k: 1 }, { id: 2, k: 2 }],
      updated: [],
      reserved: [{ id: 3, k: 3 }]
    };
    expect(patchByDiffs(b1, diffs1)).toEqual(b2);
  });

  it('数组成员是obj, 并且某个obj有变化', () => {
    const c1 = [{ id: 1, k: 1 }, { id: 2, k: 2 }, { id: 3, k: 3 }];
    const c2 = [{ id: 3, k: 1 }, { id: 4, k: 4 }, { id: 5, k: 5 }];
    const diffs2 = {
      added: [{ id: 4, k: 4 }, { id: 5, k: 5 }],
      removed: [{ id: 1, k: 1 }, { id: 2, k: 2 }],
      updated: [{ id: 3, k: 1 }],
      reserved: []
    };
    expect(patchByDiffs(c1, diffs2)).toEqual(c2);
  });

  it('数组成员是obj, reserve', () => {
    const d1 = [{ id: 1, k: 1 }, { id: 2, k: 2 }, { id: 3, k: 3 }];
    const d2 = [{ id: 1, k: 1 }, { id: 2, k: 2 }, { id: 3, k: 3 }];
    const diffs3 = {
      added: [],
      removed: [],
      updated: [],
      reserved: [{ id: 1, k: 1 }, { id: 2, k: 2 }, { id: 3, k: 3 }]
    };
    expect(patchByDiffs(d1, diffs3)).toEqual(d2);
  });
});

describe('upsert', () => {
  const arr = [{ id: 1, a: 1 }, { id: 2, a: 2 }, { id: 3, a: 3 }];
  it('push', () => {
    const result = [
      { id: 1, a: 1 },
      { id: 2, a: 2 },
      { id: 3, a: 3 },
      { id: 0, a: 22 }
    ];
    // expect(upsert(arr, {id:0}, {id:0, a:22})).toEqual( result)
    expect(upsert(arr, n => n.id === 0, { id: 0, a: 22 })).toEqual(result);
  });
  it('update', () => {
    const result = [{ id: 1, a: 22 }, { id: 2, a: 2 }, { id: 3, a: 3 }];
    // expect(upsert(arr, {id:1}, {id:0, a:22})).toEqual( result)
    expect(upsert(arr, n => n.id === 1, { id: 1, a: 22 })).toEqual(result);
  });
});
