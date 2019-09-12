import * as R from 'rambda';
import { objSubtract } from './object';

// 从fromIndex查找符合condition的index
export function findIndexFrom<T>(
  arr: T[],
  fromIndex: number,
  condition: (i: T) => boolean
) {
  const result = arr.slice(fromIndex).findIndex(it => condition(it));
  return result < 0 ? result : result + fromIndex;
}

export function reAppend<T = any>(arr: T[], item: T) {
  return [...arr.filter(it => it !== item), item];
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
  reserved: T[];
}
export function arrayCompare<T extends { id: any }>(
  arr1: T[],
  arr2: T[]
): ArrayDiffs<T> {
  const arr1Ids = arr1.map(it => it.id);
  const arr2Ids = arr2.map(it => it.id);

  const added = arr2.reduce(
    (acc: T[], el2: T) => (arr1Ids.includes(el2.id) ? acc : [...acc, el2]),
    []
  );
  const removed = arr1.reduce(
    (acc: T[], el1: T) => (arr2Ids.includes(el1.id) ? acc : [...acc, el1]),
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
      const arr2Id = arr2El.id;
      const arr1El = restArr1.find(_el => _el.id === arr2Id);
      if (!arr1El)
        throw new Error(
          '数组比较出错' +
            JSON.stringify(restArr1) +
            '    ' +
            JSON.stringify(restArr2)
        );
      return [...acc, objSubtract(arr2El, arr1El)];
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
