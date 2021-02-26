import { objSubtract, idMap } from "./object";
import * as R from "rambdax";

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
  const result = arr.slice(fromIndex).findIndex((it) => condition(it));
  return result < 0 ? result : result + fromIndex;
}

export function reAppend<T = any>(arr: T[], item: T) {
  return [...arr.filter((it) => !R.equals(it, item)), item];
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
    ...xs.slice(maxIndex + 1),
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
  const arr1Ids = arr1.map((it) => it[id]);
  const arr2Ids = arr2.map((it) => it[id]);

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
      arr2.find((it2) => R.equals(it1, it2)) ? [...acc, it1] : acc,
    [] as T[]
  );

  // 因为diff操作耗性能, 所以这里先将范围缩小
  const restArr1 = R.without([...removed, ...reserved], arr1);
  const restArr2 = R.without([...added, ...reserved], arr2);
  const _updated = restArr2.reduce((acc, arr2El) => {
    const arr2Id = arr2El[id];
    const arr1El = restArr1.find((_el) => _el[id] === arr2Id);
    if (!arr1El)
      throw new Error(
        "数组比较出错" +
          JSON.stringify(restArr1) +
          "    " +
          JSON.stringify(restArr2)
      );
    return [...acc, objSubtract(arr2El, arr1El, id + "")];
  }, [] as any[]);

  // 防止出现 [{id:1},{id:2}], 这样仅剩id的情形
  const updated = _updated.filter((it) => Object.keys(it).length > 1);

  return {
    added,
    removed,
    updated,
    reserved,
  };
}

// 与patchByDiffs可一起使用
export function arrayCompare<T extends { id: any }>(
  arr1: T[],
  arr2: T[]
): ArrayDiffs<T> {
  return arrayCompareBy(arr1, arr2, "id");
}

// 与arrayCompare可一起使用
export function patchByDiffs<T extends { id: any }>(
  arr: T[],
  diffs: ArrayDiffs<T>
): T[] {
  const arr1 = (diffs.updated || []).reduce((acc, itemPatch) => {
    const idx = acc.findIndex((it) => it.id === itemPatch.id!);
    return idx >= 0
      ? R.update(idx, { ...acc[idx], ...itemPatch }, acc)
      : ([...acc] as any);
  }, arr);

  const arr2 = (diffs.added || []).reduce(
    (acc, itemToAdd) => [...acc, itemToAdd],
    arr1
  );

  const arr3 = (diffs.removed || []).reduce((acc, itemToRemoved) => {
    return acc.filter((it) => it.id !== itemToRemoved.id);
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
    ? ([...arr, patch as T] as any)
    : R.update(idx, { ...arr[idx], ...patch } as T, arr);
}

export function insertArround<T>(
  arr: T[],
  placeholder: T | ((i: number) => T)
): T[] {
  const f = (i?: number) =>
    R.isFunction(placeholder) ? (placeholder as any)(i) : placeholder;
  const result = arr.reduce((acc, curr, idx) => [...acc, curr, f(idx + 1)], [
    f(0),
  ]);

  return result.length === 1 ? [] : result;
}

export function insertBetween<T>(
  arr: T[],
  placeholder: T | ((i: number) => T)
): T[] {
  const f = (i?: number) =>
    R.isFunction(placeholder) ? (placeholder as any)(i) : placeholder;
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
  // 下面循环可能超界, mobx会报警, 所以创建一个新数组
  const _arr = [...arr];
  return R.range(0, toLength).reduce(
    (acc, i) =>
      _arr[i] === undefined ? [...acc, (ff as any)(i)] : [...acc, _arr[i]],
    [] as T[]
  );
}

/**
 * 类似于slice, 但针对string  和  array
 * sliceBy('12345', ':3') => '12'
 * sliceBy('12345', '2:4') => '23'
 * sliceBy('12345', '4:') => '45'
 */
export function sliceBy(
  s: string,
  slicer: { from?: string; to?: string }
): string;
export function sliceBy<T>(s: T[], slicer: { from?: T; to?: T }): T[];

export function sliceBy(s: any, slicer: any) {
  if (R.isEmpty(slicer)) return s;

  const fromIndex = slicer.from ? s.indexOf(slicer.from) : 0;
  const toIndex = slicer.to ? s.indexOf(slicer.to) : s.length;

  if (toIndex < fromIndex || toIndex < 0 || fromIndex < 0)
    return R.is(Array, s) ? [] : "";

  return s.slice(fromIndex >= 0 ? fromIndex : 0, toIndex >= 0 ? toIndex : 0);
}

// 笛卡尔积
export function crossJoin<T1, T2>(xs: T1[], ys: T2[]): [T1, T2][] {
  return xs
    .map((x) => ys.map((y) => [x, y]))
    .reduce((acc, xy) => [...acc, ...xy] as any, []) as any;
}

/**
 * 是否二维数组
 *  [] => true
 *  [1, 2] => false
 *  [[1], [2]] => ture
 */
export const is2dArray = (arr: any) => {
  if (!Array.isArray(arr)) return false;
  if (R.isEmpty(arr)) return true;
  return arr.every((x) => Array.isArray(x));
};

// 以下四个是用于以下场景
// 1. 将数组以index排序
// 2. 然后点击表格中的 上移/下移 按钮
// 3. 将[{id:1,index:1}, {id:2, index:2}]发往后端保存, 实现后端调序
// 4. 直接将数组元素换序,实现前端排序
// 以下是实现后端排序使用
export function getNextByIndex<T extends { id: any; index: number }>(
  xs: T[],
  id: any
): T | null {
  var sorted = R.sort((x1, x2) => x1.index - x2.index, xs);
  var idx_in_array = sorted.findIndex((it) => it.id === id);
  if (idx_in_array >= xs.length - 1) return null;

  return sorted[idx_in_array + 1];
}
// 以下是实现后端排序使用
export function getPrevByIndex<T extends { id: any; index: number }>(
  xs: T[],
  id: any
): T | null {
  var sorted = R.sort((x1, x2) => x1.index - x2.index, xs);
  var idx_in_array = sorted.findIndex((it) => it.id === id);
  if (idx_in_array <= 0) return null;

  return sorted[idx_in_array - 1];
}

/**
 *  按条件替换
 * @param source 要修改的源数组
 * @param patch patch数组, 见test
 * @param findFn patch中的元素, 对应到source中哪个元素? 通过findFn查找
 * @param updateFn 找到sourceEl后, 通过什么办法修改?
 * @return 修改后的数据
 */
export function updateBy<T>(
  source: T[],
  patch: T[],
  findFn: (sourceEl: T, patchEl: T) => boolean,
  updateFn: (sourceEl: T, patchEl: T) => T
): T[] {
  return source.reduce((acc: T[], sourceEl) => {
    const currentPatchEl = patch.find((patchEl) => findFn(sourceEl, patchEl));
    return currentPatchEl !== undefined
      ? [...acc, updateFn(sourceEl, currentPatchEl)]
      : [...acc, sourceEl];
  }, []);
}

export function replaceById<T extends { id: any }>(
  newArray: T[],
  baseArray: T[]
): T[] {
  const baseArrayIdMap = idMap(baseArray);
  return newArray.map((item) => baseArrayIdMap[item.id] || item);
}

// 例: 将indexRange=[3,5](含3,4,5)的索引数据, 向左移动一次delta=1
// 若无法移动, 则返回数组本身
/**
 * @param arr
 * @param indexRange 如 [3,5], 表示要移动从3-5(含)的区块. 由于是区块移动, 所以看作一个整体
 * @param delta 负值左移, 正值右移 ( 注意是区块移动, indexRange 当成整体 )
 * @returns [变动后的数组, 是否变动]
 */
export function batchMove<T>(
  arr: T[],
  indexRange: number[],
  delta: number
): [T[], boolean] {
  if (indexRange.length !== 2)
    throw new Error("range是长度为2的数组, 表示起始和结束索引");

  // 修正delta
  const d =
    delta < 0
      ? indexRange[0] + delta < 0
        ? -indexRange[0]
        : delta
      : indexRange[1] + delta > arr.length - 1
      ? arr.length - 1 - indexRange[1]
      : delta;

  if (d === 0) return [arr, false];

  const newArr =
    d > 0
      ? [
          ...arr.slice(0, indexRange[0]),
          ...arr.slice(indexRange[1] + 1, indexRange[1] + 1 + d),
          ...arr.slice(indexRange[0], indexRange[1] + 1),
          ...arr.slice(indexRange[1] + 1 + d),
        ]
      : [
          ...arr.slice(0, indexRange[0] + d),
          ...arr.slice(indexRange[0], indexRange[1] + 1),
          ...arr.slice(indexRange[0] + d, indexRange[0]),
          ...arr.slice(indexRange[1] + 1),
        ];

  return [newArr, true];
}
