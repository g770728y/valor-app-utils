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

/**
 * 关于data参数, 既可以为 : {a:1}, 也可以为: [{a:1, level:5}, {a:2, leve:6}]
 * 也就是, 可以为子树
 */
export function createSiblingItem<A extends TreeArrayItem>(
  arr: A[],
  data: A | A[],
  index: number
): [A[], TreeContext] {
  let _data = data as any;
  if (Array.isArray(data)) {
    // 子树数组, 见测试用例
    const baseLevel = arr[index].level!;
    const dataWithLevel = data.map(it => ({
      ...it,
      level: baseLevel + (it.level! - data[0].level!)
    }));
    _data = array2tree(dataWithLevel).children![0];
  }
  return actionWrapper(arr, index, tree =>
    arr.length === 0
      ? createChildTreeNode(tree, _data, RootNodeId, { clone: true })
      : createSiblingTreeNode(tree, _data, arr[index].id, {
          clone: true
        })
  );
}

export function createChildItem<A extends TreeArrayItem>(
  arr: A[],
  data: A | A[],
  index: number
): [A[], TreeContext] {
  let _data = data as any;
  if (Array.isArray(data)) {
    // 子树数组, 见测试用例
    const baseLevel = arr[index].level!;
    const dataWithLevel = data.map(it => ({
      ...it,
      level: baseLevel + (it.level! - data[0].level!) + 1
    }));
    _data = array2tree(dataWithLevel).children![0];
  }
  return actionWrapper(arr, index, tree =>
    createChildTreeNode(
      tree,
      _data,
      arr.length === 0 ? RootNodeId : arr[index].id,
      { clone: true }
    )
  );
}

export function deleteItem<A extends TreeArrayItem>(
  arr: A[],
  index: number
): [A[], TreeContext] {
  return actionWrapper(arr, index, tree =>
    index >= arr.length || arr.length <= 0
      ? tree
      : deleteTreeNode(tree, arr[index] && arr[index].id, {
          clone: true
        })
  );
}
