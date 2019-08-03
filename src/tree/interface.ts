export const RootNodeId = 10000;

export interface TreeNode {
  id: any;
  children?: TreeNode[];
}

export interface NodeContext {
  parent?: TreeNode;
  children: TreeNode[];
  level: number;
  index: number;
  path: number[];
}

export interface NamingStrategy {
  pidField?: any;
  levelField?: any;
  indexField?: any;
}
