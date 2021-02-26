import { TreeNode, Identity } from "./interface";
import { getTreeContexts } from "./context";
import { findTreeNode } from "./findNode";
import { swapByProp, dropIndex } from "../array";
import * as R from "rambdax";

// 为何有clone选项? 对于mobx管理的对象, 最好直接改原对象, 克隆代价太高
export function pushTreeNodeLeft<T extends Identity>(
  _tree: TreeNode<T>,
  id: any,
  options?: { clone?: boolean }
) {
  const tree = options && options.clone ? R.clone(_tree) : _tree;
  const contexts = getTreeContexts(tree);

  const nodeContext = contexts[id];
  const parent = findTreeNode(tree, (node) => node.id === nodeContext.parentId);

  if (nodeContext.level <= 1) {
    // 1. 根结点 + 一级节点 不可左移
    return tree;
  }

  const node = parent!.children![nodeContext.index];
  // 2. 将当前节点及全部 rightSibling从parent中剪切
  /**
   *   R
   *       P1
   *         P11
   *         P12     <== 要左移P12, 需先将 P12,P13 从父节点中移除
   *         P13
   */
  const rightSiblings = parent!.children!.slice(nodeContext.index + 1);
  parent!.children = parent!.children!.slice(0, nodeContext.index);

  // 将P13当成P12的children ( 目的是保持P12位置不变 )
  node.children = [...(node.children || []), ...rightSiblings];

  // 3. 将P12作为P1的 直接right sibling
  /**
   *   R
   *       P1
   *         P11
   *      P12     <== 要操作的节点
   *         P13
   */

  const parentContext = contexts[parent!.id];
  const parentIndex = parentContext.index;
  const parentParent = findTreeNode(
    tree,
    (node) => node.id === parentContext.parentId
  )!;
  parentParent.children = [
    ...parentParent.children!.slice(0, parentIndex + 1),
    node,
    ...parentParent.children!.slice(parentIndex + 1),
  ];

  return tree;
}

// 为何有clone选项? 对于mobx管理的对象, 最好直接改原对象, 克隆代价太高
export function pushTreeNodeRight<T extends Identity>(
  _tree: TreeNode<T>,
  id: any,
  options?: { clone?: boolean }
) {
  const tree = options && options.clone ? R.clone(_tree) : _tree;
  const contexts = getTreeContexts(tree);

  const nodeContext = contexts[id];
  const parent = findTreeNode(tree, (node) => node.id === nodeContext.parentId);

  if (nodeContext.level < 1) {
    // 1. 根结点 不可右移
    return tree;
  }

  const node = parent!.children![nodeContext.index];
  // 2. 将当前节点及全部 rightSibling从parent中剪切
  /**
   *   R
   *       P1
   *         P11
   *         P12     <== 要右移P12, 需先将 P12 从父节点中移除
   *         P13
   */
  const leftSibling = parent!.children![nodeContext.index - 1];
  // 同级第一个节点不可右移
  if (!leftSibling) return tree;

  parent!.children = dropIndex(parent!.children || [], nodeContext.index);

  // 3. 将P12作为P11的 最后一个child
  /**
   *   R
   *       P1
   *         P11
   *            P12     <== 要操作的节点
   *         P13
   */
  leftSibling.children = [...(leftSibling!.children || []), node];

  return tree;
}
