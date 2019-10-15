import * as R from 'rambda';
import { objSubtract } from './object';
import * as Rx from 'rambdax';

/**
 * 从fromIndex查找符合condition的index
 * 如果 fromIndex 刚好符合condition, 则返回 fromIndex
 * 如果 没有符合要求的, 则返回 -1
 * @param arr 数组
 * @param fromIndex 起始索引
 * @param condition 查找条件
 */
export function findIndexFrom<T>(
  arr: T[],
  fromIndex: number,
  condition: (i: T) => boolean
) {
  const result = arr.slice(fromIndex).findIndex(it => condition(it));
  return result < 0 ? result : result + fromIndex;
}

export function reAppend<T = any>(arr: T[], item: T) {
  return [...arr.filter(it => !R.equals(it, item)), item];
}

export function swapByProp<T>(
  xs: T[],
  propName: keyof T,
  v1: any,
  v2: any
): T[] {
  const i1 = xs.findIndex((x: T) => x[propName] === v1);
  const i2 = xs.findIndex((x: T) => x[propName] === v2);
  if (i1 < 0)
    throw new Error(`swapByProp error: v1 not existed in xs: ${xs}, v1: ${v1}`);
  if (i2 < 0)
    throw new Error(`swapByProp error: v2 not existed in xs: ${xs}, v2: ${v2}`);
  if (i1 === i2) return xs;

  return swap(xs, i1, i2);
}

export function swap<T>(xs: T[], i1: number, i2: number): T[] {
  if (i1 === i2) return xs;

  const minIndex = Math.min(i1, i2);
  const maxIndex = Math.max(i1, i2);

  return [
    ...xs.slice(0, minIndex),
    xs[maxIndex],
    ...xs.slice(minIndex + 1, maxIndex),
    xs[minIndex],
    ...xs.slice(maxIndex + 1)
  ];
}

export function dropIndex<T>(arr: T[], i: number) {
  return [...arr.slice(0, i), ...arr.slice(i + 1)];
}

export function insertIndex<T>(arr: T[], i: number, v: T) {
  return [...arr.slice(0, i), v, ...arr.slice(i)];
}

export interface ArrayDiffs<T> {
  added: T[];
  removed: T[];
  updated: Partial<T>[];
  reserved?: T[];
}

export function arrayCompareBy<T extends {}>(
  arr1: T[],
  arr2: T[],
  id: keyof T
): ArrayDiffs<T> {
  const arr1Ids = arr1.map(it => it[id]);
  const arr2Ids = arr2.map(it => it[id]);

  const added = arr2.reduce(
    (acc: T[], el2: T) => (arr1Ids.includes(el2[id]) ? acc : [...acc, el2]),
    []
  );
  const removed = arr1.reduce(
    (acc: T[], el1: T) => (arr2Ids.includes(el1[id]) ? acc : [...acc, el1]),
    []
  );
  const reserved = arr1.reduce(
    (acc: T[], it1: T) =>
      arr2.find(it2 => R.equals(it1, it2)) ? [...acc, it1] : acc,
    [] as T[]
  );

  // 因为diff操作耗性能, 所以这里先将范围缩小
  const restArr1 = R.without([...removed, ...reserved], arr1);
  const restArr2 = R.without([...added, ...reserved], arr2);
  const _updated = restArr2.reduce(
    (acc, arr2El) => {
      const arr2Id = arr2El[id];
      const arr1El = restArr1.find(_el => _el[id] === arr2Id);
      if (!arr1El)
        throw new Error(
          '数组比较出错' +
            JSON.stringify(restArr1) +
            '    ' +
            JSON.stringify(restArr2)
        );
      return [...acc, objSubtract(arr2El, arr1El, id + '')];
    },
    [] as any[]
  );

  // 防止出现 [{id:1},{id:2}], 这样仅剩id的情形
  const updated = _updated.filter(it => Object.keys(it).length > 1);

  return {
    added,
    removed,
    updated,
    reserved
  };
}

// 与patchByDiffs可一起使用
export function arrayCompare<T extends { id: any }>(
  arr1: T[],
  arr2: T[]
): ArrayDiffs<T> {
  return arrayCompareBy(arr1, arr2, 'id');
}

// 与arrayCompare可一起使用
export function patchByDiffs<T extends { id: any }>(
  arr: T[],
  diffs: ArrayDiffs<T>
): T[] {
  const arr1 = (diffs.updated || []).reduce((acc, itemPatch) => {
    const idx = acc.findIndex(it => it.id === itemPatch.id!);
    return idx >= 0
      ? R.update(idx, { ...acc[idx], ...itemPatch }, acc)
      : [...acc];
  }, arr);

  const arr2 = (diffs.added || []).reduce(
    (acc, itemToAdd) => [...acc, itemToAdd],
    arr1
  );

  const arr3 = (diffs.removed || []).reduce((acc, itemToRemoved) => {
    return acc.filter(it => it.id !== itemToRemoved.id);
  }, arr2);

  return arr3;
}

export function upsert<T extends {}>(
  arr: T[],
  query: (t: T) => boolean,
  patch: Partial<T>
): T[] {
  const idx = arr.findIndex(query);
  return idx < 0
    ? [...arr, patch as T]
    : R.update(idx, { ...arr[idx], ...patch } as T, arr);
}

export function insertArround<T>(
  arr: T[],
  placeholder: T | ((i: number) => T)
): T[] {
  const f = (i?: number) =>
    Rx.isFunction(placeholder) ? (placeholder as any)(i) : placeholder;
  const result = arr.reduce((acc, curr, idx) => [...acc, curr, f(idx + 1)], [
    f(0)
  ]);

  return result.length === 1 ? [] : result;
}

export function insertBetween<T>(
  arr: T[],
  placeholder: T | ((i: number) => T)
): T[] {
  const f = (i?: number) =>
    Rx.isFunction(placeholder) ? (placeholder as any)(i) : placeholder;
  const result = arr.reduce(
    (acc, curr, idx) => [...acc, f(idx - 1), curr],
    [] as T[]
  );
  return result.length > 0 ? result.slice(1) : result;
}

/**
 * 对齐到长度toLength
 * 如果长度小于toLength, 则用f填充
 * 如果长度大于toLength, 则删除多余元素
 * 如果元素为undefined, 则会填充之!
 */
export function padding<T>(
  arr: T[],
  toLength: number,
  f: ((i: number) => T) | T
): T[] {
  const ff = R.is(Function, f) ? f : () => f;
  return R.range(0, toLength).reduce(
    (acc, i) =>
      arr[i] === undefined ? [...acc, (ff as any)(i)] : [...acc, arr[i]],
    [] as T[]
  );
}
