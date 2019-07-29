export interface TreeNode<T = any> {
  id: any;
  paths?: number[];
  pid?: any;
  //树结点对应的真实结点
  el?: T;
  children?: TreeNode[];

  [key: string]: any;
}

export function traverseTree<T extends TreeNode, R extends TreeNode>(
  node: T,
  f: (node: T) => R
): R {
  return {
    ...f(node),
    children: node.children && node.children.map(it => traverseTree(it as T, f))
  };
}

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

export function mapTreeNode<T extends { id: any; children: T[] }>(
  tree: TreeNode,
  f: (node: TreeNode) => T
) {
  const target = f(tree);
  if (tree.children && tree.children.length > 0) {
    target.children = tree.children.map(t => mapTreeNode(t, f));
  }
  return target;
}
