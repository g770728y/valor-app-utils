import { TreeNode } from './interface';
import { getTreeContexts } from './context';
import { findTreeNode } from './findNode';
import { swapByProp } from '../array';
import * as R from 'rambda';

// 为何有clone选项? 对于mobx管理的对象, 最好直接改原对象, 克隆代价太高
export function moveTreeNodeUp(
  _tree: TreeNode,
  id: any,
  options?: { clone?: boolean }
) {
  const tree = options && options.clone ? R.clone(_tree) : _tree;
  const contexts = getTreeContexts(tree);

  const nodeContext = contexts[id];
  const parent = findTreeNode(tree, node => node.id === nodeContext.parentId);

  if (!parent) {
    // 1. 根结点不可上移
    return tree;
  }

  if (nodeContext.index > 0) {
    // 2. 如果是父结点下的第2+个结点, 正常上移
    /**
     *   A
     *      A1
     *      A2    <==
     */
    const leftSibling = parent.children![nodeContext.index - 1];
    parent.children! = swapByProp(parent.children!, 'id', id, leftSibling.id);
    return tree;
  }

  return tree;
}

// 为何有clone选项? 对于mobx管理的对象, 最好直接改原对象, 克隆代价太高
export function moveTreeNodeDown(
  _tree: TreeNode,
  id: any,
  options?: { clone?: boolean }
) {
  const tree = options && options.clone ? R.clone(_tree) : _tree;
  const contexts = getTreeContexts(tree);

  const nodeContext = contexts[id];
  const parent = findTreeNode(tree, node => node.id === nodeContext.parentId);

  if (!parent) {
    // 1. 根结点不可上移
    return tree;
  }

  if (nodeContext.index < parent.children!.length - 1) {
    // 2. 如果是父结点下的第2+个结点, 正常上移
    /**
     *   A
     *      A1
     *      A2    <==
     */
    const rightSibling = parent.children![nodeContext.index + 1];
    parent.children! = swapByProp(parent.children!, 'id', id, rightSibling.id);
    return tree;
  }

  return tree;
}
