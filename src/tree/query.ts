import { getTreeContexts } from "./context";
import { Identity, TreeNode } from "./interface";
import * as R from "rambdax";
import { findTreeNode } from "./findNode";
import { tree2Array } from "./transform";

export function getAncestors<T extends Identity>(
  tree: TreeNode<T>,
  id: any
): any[] /*注意是id[],id=any*/ {
  const treeContext = getTreeContexts(tree);

  let currId = id;
  const ancestors: TreeNode<T>[] = [];
  while (treeContext[currId]) {
    const nodeContext = treeContext[currId];
    const pid = nodeContext.parentId;
    if (nodeContext && !R.isNil(pid)) {
      ancestors.push(pid);
    }
    currId = pid;
  }
  return ancestors.reverse();
}

export function getDecendants<T extends Identity>(
  tree: TreeNode<T>,
  id: any
): Omit<TreeNode<T>, "children">[] {
  const node = findTreeNode(tree, (node) => node.id === id);
  if (!node) return [];

  return tree2Array(node).filter((it) => it.id !== id);
}
