import { TreeArrayItem } from "./interface";
import { TreeNode } from "..";
import { TreeContext } from "../tree/context";
import { array2tree } from "./transform";
import { tree2Array } from "../tree";
import { getTreeContexts } from "./context";

export function actionWrapper<A extends TreeArrayItem>(
  arr: A[],
  index: number,
  f: (tree: TreeNode<A>) => TreeNode<A>
): [A[], TreeContext] {
  const tree = array2tree(arr);
  const newTree = f(tree);
  const newArray = tree2Array(newTree, ["level"] as any);
  const context = getTreeContexts(newArray);
  return [newArray as A[], context];
}
