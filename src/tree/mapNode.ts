import { TreeNode, NodeContext, Identity } from './interface';

// 改内容, 返回新树
export function mapTreeNode<T extends Identity, S extends Identity>(
  tree: TreeNode<T>,
  f: (node: TreeNode<T>, context: NodeContext<T>) => TreeNode<S>,
  context?: NodeContext<T>
) {
  const _context = context || {
    parent: undefined,
    children: tree.children || [],
    level: 0,
    index: 0,
    path: []
  };
  const target = f(tree, _context);
  if (tree.children && tree.children.length > 0) {
    target.children = ((tree.children || []) as TreeNode<T>[]).map((t, i) =>
      mapTreeNode(t, f, {
        parent: tree,
        children: t.children || [],
        level: _context.level + 1,
        index: i,
        path: [..._context.path, i]
      })
    );
  }
  return target;
}
