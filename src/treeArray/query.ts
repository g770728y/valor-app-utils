import { TreeArrayItem } from ".";

/**
 * i对应的节点, 可能有多个子孙节点, 返回最后一个子孙节点的index
 * 如果没有子节点, 则返回i
 */
export function getLastDecendantIndex<A extends TreeArrayItem>(
  arr: A[],
  i: number
) {
  const itemLevel = arr[i].level;
  const index = arr.slice(i + 1).findIndex(it => {
    return it.level! <= itemLevel!;
  });
  return (index < 0 ? arr.length : index + i + 1) - 1;
}
