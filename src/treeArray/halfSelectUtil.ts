import { TreeNode } from "../tree";
import { Identity } from "../tree/interface";
import { TreeArrayItem } from ".";
import { getDecendantIndexes } from "./query";

/**
 * 移除半选节点
 * 但 如果半选节点下, 还存在子节点, 则应提升子节点
 * 如:
 * - A
 *   A1 [half]
 *     A11
 *        A111
 *     A12
 *   A2
 *
 * 则返回结果为:
 * - A
 *   A11 (左移)
 *      A111 (左移)
 *   A12 (左移)
 *   A2
 * @param arr
 * @param halfSelectedIds 半选的节点id, 顺序不需要正确( 经常是鼠标选择, 无法保证顺序正常 )
 */
export function zipByHalfSelect<A extends TreeArrayItem>(
  arr: A[],
  halfSelectedIds: any[] //使用ids作参数, 而不使用index, 是因为删除时索引不稳定
): A[] {
  return halfSelectedIds.reduce((acc: A[], id) => {
    const idx = acc.findIndex(it => it.id === id);
    // 找到当前半选项的decendants
    const decendantIndexes = getDecendantIndexes(acc, idx);
    // 第一步: 向左升级全部decendants
    const arr1 = decendantIndexes.reduce(
      (acc_inner, idx_inner) => [
        ...acc_inner.slice(0, idx_inner),
        { ...acc_inner[idx_inner], level: acc_inner[idx_inner].level! - 1 },
        ...acc_inner.slice(idx_inner + 1)
      ],
      acc
    );
    // 第二步: 删除半选项
    return [...arr1.slice(0, idx), ...arr1.slice(idx + 1)];
  }, arr);
}
