import { Identity, TreeNode } from "./interface";
import { traverseTree } from "./traverse";
// 典型用例:
// 有tree, 指定tree中的几个节点, 生成以下子树: 子树中包含这些节点, 以及它们的下级/上级
// 递归思路: 当前节点不满足collectFn, 下级节点也不满足collectFn, 则移除此节点, 否则保留
// 注意: 这是可变方法!!! 若不想可变, 请先clone
export function collectSubTree<A extends Identity>(
  mutableTree: TreeNode<A>,
  collectFn: (node: TreeNode<A>) => boolean
): TreeNode<A> | null {
  markDeleteFlag(mutableTree);
  if ((mutableTree as any).deleteFlag) {
    return null;
  } else {
    traverseTree(mutableTree, (node) => {
      if (node.children && node.children.length > 0) {
        node.children = node.children.filter((it) => !(it as any).deleteFlag);
      }
    });
    return mutableTree;
  }

  function markDeleteFlag(node: TreeNode<A>): boolean {
    let matched = false;
    if (collectFn(node)) {
      matched = true;
    } else {
      const children = node.children || [];
      const matcheds = children.map(markDeleteFlag);
      matched = matcheds.some((it) => it);
    }

    if (!matched) {
      (node as any).deleteFlag = true;
    }

    return matched;
  }
}
