import { TreeArrayItem } from "./interface";
import { RootNodeId } from "../tree/interface";
import { SimpleNodeContext } from "../tree/context";
import {
  createSiblingTreeNode,
  createChildTreeNode,
  deleteTreeNode
} from "../tree/createNode";
import { actionWrapper } from "./util";

export function createSiblingItem<A extends TreeArrayItem>(
  arr: A[],
  data: A,
  index: number
): [A[], SimpleNodeContext[]] {
  return actionWrapper(arr, index, tree =>
    arr.length === 0
      ? createChildTreeNode(tree, data, RootNodeId, { clone: true })
      : createSiblingTreeNode(tree, data, arr[index].id, {
          clone: true
        })
  );
}

export function createChildItem<A extends TreeArrayItem>(
  arr: A[],
  data: A,
  index: number
): [A[], SimpleNodeContext[]] {
  return actionWrapper(arr, index, tree =>
    createChildTreeNode(
      tree,
      data,
      arr.length === 0 ? RootNodeId : arr[index].id,
      { clone: true }
    )
  );
}

export function deleteItem<A extends TreeArrayItem>(
  arr: A[],
  index: number
): [A[], SimpleNodeContext[]] {
  return actionWrapper(arr, index, tree =>
    index >= arr.length || arr.length <= 0
      ? tree
      : deleteTreeNode(tree, arr[index] && arr[index].id, {
          clone: true
        })
  );
}
