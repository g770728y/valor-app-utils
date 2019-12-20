import { RootNodeId, TreeNode, Identity } from "./interface";
import * as R from "rambda";
import { traverseTree } from "./traverse";
import { SimpleNodeContext } from "./context";

// 高效地将array转化为idTree, 在调用前, 按level + index 对数组排好序
// 处理过程: 除traverseTree外, 没有用到递归, 而是遍历一个数组, 遍历完成后, 取出level===1的节点即可
// 注意level不一定是从0开始, 比如document的level就是从1开始, 所以要保留lastLevel
export function array2tree_byLevel<A extends { id: any; level: number }>(
  arr: A[],
  options?: { rootId: any }
): TreeNode<A> {
  const { rootId = RootNodeId } = options || ({} as any);
  if (arr.length === 0) return { id: rootId, level: 0, children: [] } as any;

  const minLevel = (arr[0].level || 1) - 1;
  const nodes = arr.reduce(
    (acc: any, node: A, idx: number) => {
      // 找到node的parent
      let i;
      for (i = acc.length - 1; i >= 0; i--) {
        if (acc[i].level === node.level - 1) break;
      }
      const pNode = acc[i];

      const newNode = {
        ...node,
        children: []
      };
      if (!!pNode) pNode.children!.push(newNode);
      return [...acc, newNode];
    },
    [
      {
        id: rootId,
        level: minLevel,
        children: []
      }
    ]
  );

  return nodes[0];
}

export function array2tree_byPid<A extends { id: any; pid: any }>(
  arr: A[],
  options?: { pidField?: string }
): TreeNode<A> {
  const pidField = (options && options.pidField) || "pid";
  const rootId = (arr[0] as any)[pidField];
  if (arr.length === 0) return { id: rootId, level: 0, children: [] } as any;
  const nodes = arr.reduce(
    (acc: any, node: A, idx: number) => {
      // 找到node的parent
      let i;
      for (i = acc.length - 1; i >= 0; i--) {
        if (acc[i].id === (node as any)[pidField]) break;
      }
      const pNode = acc[i];

      const newNode = {
        ...node,
        children: []
      };
      if (!!pNode) pNode.children!.push(newNode);
      return [...acc, newNode];
    },
    [
      {
        id: rootId,
        [pidField]: undefined,
        children: []
      }
    ]
  );

  return nodes[0];
}

export function tree2Array<A extends Identity>(
  tree: TreeNode<A>,
  attachContextKeys: keyof SimpleNodeContext = [] as any
): Omit<TreeNode<A>, "children">[] {
  const result = [] as any;
  traverseTree(tree, (node, context) => {
    const contextObj = R.pick(attachContextKeys as any, context);
    const newNode = { ...R.dissoc("children", node), ...contextObj };
    result.push(newNode);
  });
  return result.slice(1) as any;
}
