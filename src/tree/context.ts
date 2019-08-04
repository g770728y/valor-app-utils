import { traverseTree } from './traverse';
import { TreeNode, Identity } from './interface';

export interface SimpleNodeContext {
  parentId: any;
  childrenIds: any[];
  level: number;
  index: number;
  path: number[];
}

export function getTreeContexts<A extends Identity>(tree: TreeNode<A>) {
  const context: Record<string, SimpleNodeContext> = {};
  traverseTree(tree, (t, c) => {
    const parentId = c.parent && c.parent.id;
    const childrenIds = (c.children || []).map((it: any) => it.id);
    context[t.id] = {
      index: c.index,
      level: c.level,
      path: c.path,
      parentId,
      childrenIds
    };
  });
  return context;
}
