export const RootNodeId = "-1";

export interface Identity {
  id: any;
}

export type TreeNode<T extends Identity> = T & {
  id: any;
  children?: TreeNode<T>[];
};

export interface NodeContext<T extends Identity> {
  parent?: TreeNode<T>;
  children: TreeNode<T>[];
  level: number;
  index: number;
  path: number[];
}

export interface NamingStrategy {
  pidField?: any;
  levelField?: any;
  indexField?: any;
}
