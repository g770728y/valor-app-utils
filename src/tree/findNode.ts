import { TreeNode, Identity } from './interface';

export function findTreeNode<T extends Identity>(
  tree: TreeNode<T>,
  f: (node: TreeNode<T>) => boolean
) {
  if (f(tree)) {
    return tree;
  } else {
    // 这里无法用函数式做法了, 因为需要break
    let result: TreeNode<T> | undefined;
    for (let i = 0; i < (tree.children || []).length; i++) {
      result = findTreeNode(tree.children![i], f);
      if (result) break;
    }
    return result;
  }
}
