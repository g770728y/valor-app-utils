import { TreeNode } from "./interface";
import { findTreeNode } from "./findNode";
import { insertIndex, dropIndex } from "../array";
import { getTreeContexts } from "./context";
import * as R from "rambda";

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
    parent &&
      (parent.children = insertIndex(parent!.children || [], idx + 1, data));
  }

  return tree;
}

export function createSiblingTreeNode<T extends { id: any }>(
  _tree: TreeNode<T>,
  data: T,
  id: any,
  options?: { clone?: boolean }
) {
  const tree = options && options.clone ? R.clone(_tree) : _tree;

  const node = findTreeNode(tree, node => node.id === id)!;
  const contexts = getTreeContexts(tree);
  const nodeContext = contexts[node.id];

  if (id === tree.id) {
    // 不可插入根结点的同级结点
    return tree;
  } else {
    // 非根结点
    const parent = findTreeNode(tree, node => node.id === nodeContext.parentId);
    const idx = parent!.children!.findIndex(it => it.id === id);
    parent &&
      (parent.children = insertIndex(parent!.children || [], idx + 1, data));
    return tree;
  }
}

/**
 * @param options.insertAt 比如A有[A1,A2,A3]三个子节点, 默认插入到最后, 但可以选择插入到 A1前, 即insertAt=0
 */
export function createChildTreeNode<T extends { id: any }>(
  _tree: TreeNode<T>,
  data: T,
  id: any,
  options?: { clone?: boolean; insertAt?: number }
) {
  const tree = options && options.clone ? R.clone(_tree) : _tree;

  const node = findTreeNode(tree, node => node.id === id)!;
  const _insertAt =
    options && options.insertAt !== undefined
      ? options.insertAt
      : (node.children || []).length;
  node.children = insertIndex(node.children || [], _insertAt, data);

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
