import { TreeArrayItem } from ".";
import * as R from "rambda";

/**
 * i对应的节点, 可能有多个子孙节点, 返回最后一个子孙节点的index
 * 如果没有子节点, 则返回i
 * @param
 * @param i 行号, 如果i===-1, 表示虚拟的根结点
 */
export function getLastDecendantIndex<A extends TreeArrayItem>(
  arr: A[],
  i: number
) {
  if (i === -1) return arr.length - 1;

  const itemLevel = arr[i].level;
  const index = arr.slice(i + 1).findIndex(it => {
    return it.level! <= itemLevel!;
  });
  return (index < 0 ? arr.length : index + i + 1) - 1;
}

export function getDecendantIndexes<A extends TreeArrayItem>(
  arr: A[],
  i: number
): number[] {
  const itemLevel = arr[i].level;
  const j = arr.slice(i + 1).findIndex(it => {
    return it.level! <= itemLevel!;
  });
  return j < 0 ? R.range(i + 1, arr.length) : R.range(i + 1, i + j + 1);
}