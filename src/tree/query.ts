import { getTreeContexts } from "./context";
import { Identity, TreeNode } from "./interface";
import * as R from "rambdax";

export function getAncestors<T extends Identity>(
  tree: TreeNode<T>,
  id: any
): any[] {
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
