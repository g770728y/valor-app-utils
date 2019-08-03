import { TreeNode } from './interface';

export function findTreeNode(tree: TreeNode, f: (node: TreeNode) => boolean) {
  if (f(tree)) {
    return tree;
  } else {
    // 这里无法用函数式做法了, 因为需要break
    let result: TreeNode | undefined;
    for (let i = 0; i < (tree.children || []).length; i++) {
      result = findTreeNode(tree.children![i], f);
      if (result) break;
    }
    return result;
  }
}
