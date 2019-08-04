import { NodeContext, TreeNode, Identity } from './interface';

// 直接在树节点上修改, 是可变方法
export function traverseTree<T extends Identity>(
  node: TreeNode<T>,
  f: (node: TreeNode<T>, context: NodeContext<T>) => void,
  context?: NodeContext<T>
): void {
  const _context = context || {
    parent: undefined,
    children: node.children || [],
    level: 0,
    index: 0,
    path: []
  };
  f(node, _context);
  (node.children || []).forEach((it, i) =>
    traverseTree(it, f, {
      parent: node,
      children: it.children || [],
      level: _context.level + 1,
      index: i,
      path: [..._context.path, i]
    })
  );
}
