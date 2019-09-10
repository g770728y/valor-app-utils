import { TreeNode } from './interface';
import { findTreeNode } from './findNode';
import { insertIndex, dropIndex } from '../array';
import { getTreeContexts } from './context';
import * as R from 'rambda';

export function createTreeNode<T extends { id: any }>(
  _tree: TreeNode<T>,
  data: T,
  id: any,
  options?: { clone?: boolean }
) {
  const tree = options && options.clone ? R.clone(_tree) : _tree;

  const node = findTreeNode(tree, node => node.id === id)!;
  const contexts = getTreeContexts(tree);
  const nodeContext = contexts[node.id];

  if (id === tree.id || (node.children && node.children.length > 0)) {
    // 根结点, 或 非叶, 插入为第一个节点
    node.children = [data, ...(node.children || [])];
  } else {
    // 非根, 叶,播入为平级下一节点
    const parent = findTreeNode(tree, node => node.id === nodeContext.parentId);
    const idx = parent!.children!.findIndex(it => it.id === id);
    const parentContext = contexts[parent!.id];
    parent &&
      (parent.children = insertIndex(parent!.children || [], idx + 1, data));
  }

  return tree;
}

export function deleteTreeNode<T extends { id: any }>(
  _tree: TreeNode<T>,
  id: any,
  options?: { clone?: boolean }
) {
  const tree = options && options.clone ? R.clone(_tree) : _tree;

  const node = findTreeNode(tree, node => node.id === id)!;
  const contexts = getTreeContexts(tree);
  const nodeContext = contexts[node.id];

  if (id === tree.id) {
    // 根结点 不可删除
  } else {
    // 非根, 叶,播入为平级下一节点
    const parent = findTreeNode(tree, node => node.id === nodeContext.parentId);
    parent &&
      (parent.children = dropIndex(parent!.children || [], nodeContext.index));
  }

  return tree;
}
