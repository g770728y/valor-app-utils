import { TreeArrayItem } from "./interface";
import { RootNodeId } from "../tree/interface";
import { SimpleNodeContext, TreeContext } from "../tree/context";
import {
  createSiblingTreeNode,
  createChildTreeNode,
  deleteTreeNode
} from "../tree/createNode";
import { actionWrapper } from "./util";
import { array2tree } from "./transform";
import { replaceById } from "../array";

/**
 * 关于data参数, 既可以为 : {a:1}, 也可以为: [{a:1, level:5}, {a:2, leve:6}]
 * 也就是, 可以为子树
 * @param arr 原始树形数组
 * @param data 待插入的子树
 * @param baseI 将插入的基准节点 ( 如果为0, 表示插入为0行下一个兄弟节点), 支持 -1 (根结点)
 */
export function createSiblingItem<A extends TreeArrayItem>(
  arr: A[],
  data: A | A[],
  baseI: number
): [A[], TreeContext] {
  let _data = data as any;
  if (Array.isArray(data)) {
    // 子树数组, 见测试用例
    const baseLevel = baseI === -1 ? 0 : arr[baseI].level!;
    // 更新data的level
    const dataWithLevel = data.map(it => ({
      ...it,
      level: baseLevel + (it.level! - data[0].level!)
    }));
    _data = array2tree(dataWithLevel).children![0];
  }
  const result = actionWrapper(arr, baseI, tree =>
    arr.length === 0
      ? createChildTreeNode(tree, _data, RootNodeId, { clone: true })
      : createSiblingTreeNode(
          tree,
          _data,
          baseI === -1 ? RootNodeId : arr[baseI].id,
          {
            clone: true
          }
        )
  );
  // 确保 老节点引用不变
  return [replaceById(result[0], arr), result[1]];
}

/**
 * 在arr里, 找到index所在的节点, 并在其子节点的insertAt处插入子节点
 * 例如:
 * A
 *   A1
 *     A21
 *   A2
 * index=1, 表示A1
 * insertAt=1, 表示在A2后面插行
 * 默认插入在尾部
 * @param arr 原始树形数组
 * @param data 待插入的子树
 * @param baseI 将插入的基准节点 ( 如果为0, 表示插入为0行的子节点), 支持 -1 (根结点)
 * @param insertAt 将插入为baseI行的第多少行 ( 如果没有指定, 则插入到末尾 )
 */
export function createChildItem<A extends TreeArrayItem>(
  arr: A[],
  data: A | A[],
  baseI: number,
  insertAt?: number
): [A[], TreeContext] {
  // 增加逻辑: 如何保证正常插入第一个节点 ?

  let _data = data as any;
  if (Array.isArray(data)) {
    // 子树数组, 见测试用例
    const baseLevel = baseI === -1 ? 0 : arr[baseI].level!;
    const dataWithLevel = data.map(it => ({
      ...it,
      level: baseLevel + (it.level! - data[0].level!) + 1
    }));
    _data = array2tree(dataWithLevel).children![0];
  }
  const result = actionWrapper(arr, baseI, tree =>
    createChildTreeNode(
      tree,
      _data,
      arr.length === 0 || baseI === -1 ? RootNodeId : arr[baseI].id,
      { clone: true, insertAt }
    )
  );

  // 确保 老节点引用不变
  return [replaceById(result[0], arr), result[1]];
}

export function deleteItem<A extends TreeArrayItem>(
  arr: A[],
  index: number
): [A[], TreeContext] {
  const result = actionWrapper(arr, index, tree =>
    index >= arr.length || arr.length <= 0
      ? tree
      : deleteTreeNode(tree, arr[index] && arr[index].id, {
          clone: true
        })
  );

  // 确保 老节点引用不变
  return [replaceById(result[0], arr), result[1]];
}
