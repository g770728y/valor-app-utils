import { TreeNode } from './interface';
import * as R from 'rambda';
import { findTreeNode } from './findNode';

// 完整替换节点, 包含 children 都要一步替换
export function replaceTreeNode<T extends { id: any }>(
  _tree: TreeNode<T>,
  id: any,
  newNode: TreeNode<T>,
  options?: { clone?: boolean }
) {
  const tree = options && options.clone ? R.clone(_tree) : _tree;

  const node = findTreeNode(tree, node => node.id === id);

  if (node) Object.assign(node, newNode);

  return tree;
}
