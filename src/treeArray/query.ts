import { TreeArrayItem } from ".";
import * as R from "rambdax";

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
  const index = arr.slice(i + 1).findIndex((it) => {
    return it.level! <= itemLevel!;
  });
  return (index < 0 ? arr.length : index + i + 1) - 1;
}

export function getDecendantIndexes<A extends TreeArrayItem>(
  arr: A[],
  i: number
): number[] {
  const itemLevel = arr[i].level;
  const j = arr.slice(i + 1).findIndex((it) => {
    return it.level! <= itemLevel!;
  });
  return j < 0
    ? R.range(i + 1, arr.length)
    : (R.range(i + 1, i + j + 1) as any);
}

/**
 * 快速查询row是否有下级 (O(1))
 */
export function hasChildren(rows: TreeArrayItem[], row: TreeArrayItem) {
  const rowIdx = rows.findIndex((it) => it.id === row.id);
  const nextRow = rows[rowIdx + 1];
  return !!(nextRow && nextRow.level === row.level! + 1);
}

/**
 * 要求: pid为null/undefined时, 表示根结点
 * 注意查找是根据pid的, 所以必须有pid
 */
export function getAncestors(rows: TreeArrayItem[], id: any) {
  const ancestors: TreeArrayItem[] = [];

  while (!R.isNil(id)) {
    const parent = rows.find((r) => r.id === id)!;
    ancestors.push(parent);
    id = parent.pid;
  }
  return ancestors.slice(1).reverse();
}
