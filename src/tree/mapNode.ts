import { TreeNode, NodeContext } from './interface';

// 改内容, 返回新树
export function mapTreeNode<T extends TreeNode>(
  tree: TreeNode,
  f: (node: TreeNode, context: NodeContext) => T,
  context?: NodeContext
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
    target.children = tree.children.map((t, i) =>
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
