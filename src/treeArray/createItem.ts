import { TreeArrayItem } from "./interface";
import { Identity, RootNodeId } from "../tree/interface";
import { SimpleNodeContext } from "../tree/context";
import { array2tree } from "./transform";
import {
  createSiblingTreeNode,
  createChildTreeNode,
  deleteTreeNode
} from "../tree/createNode";
import { tree2Array } from "../tree/transform";
import { getTreeContexts } from "./context";
import { TreeNode } from "../tree";

export function createSiblingItem<A extends TreeArrayItem>(
  arr: A[],
  data: A,
  index: number
): [A[], SimpleNodeContext[]] {
  // 需要空数组插入, 所以不能直接使用wrapper
  const tree = array2tree(arr);
  const newTree =
    arr.length === 0
      ? createChildTreeNode(tree, data, RootNodeId, { clone: true })
      : createSiblingTreeNode(tree, data, arr[index].id, {
          clone: true
        });
  const newArray = tree2Array(newTree, ["level"] as any);
  const context = getTreeContexts(newArray);
  return [newArray as A[], context];
}

export function createChildItem<A extends TreeArrayItem>(
  arr: A[],
  data: A,
  index: number
): [A[], SimpleNodeContext[]] {
  // 需要空数组插入, 所以不能直接使用wrapper
  const tree = array2tree(arr);
  const newTree = createChildTreeNode(
    tree,
    data,
    arr.length === 0 ? RootNodeId : arr[index].id,
    { clone: true }
  );
  const newArray = tree2Array(newTree, ["level"] as any);
  const context = getTreeContexts(newArray);
  return [newArray as A[], context];
}

export function deleteItem<A extends TreeArrayItem>(
  arr: A[],
  index: number
): [A[], SimpleNodeContext[]] {
  return wrapper(arr, index, tree =>
    deleteTreeNode(tree, arr[index] && arr[index].id, {
      clone: true
    })
  );
}

export function wrapper<A extends TreeArrayItem>(
  arr: A[],
  index: number,
  f: (tree: TreeNode<A>) => TreeNode<A>
): [A[], SimpleNodeContext[]] {
  const tree = array2tree(arr);
  const newTree = index >= arr.length || arr.length <= 0 ? tree : f(tree);
  const newArray = tree2Array(newTree, ["level"] as any);
  const context = getTreeContexts(newArray);
  return [newArray as A[], context];
}
