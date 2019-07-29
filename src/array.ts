import * as R from 'rambda';
import { traverseTree, TreeNode } from './tree';

export const RootNodeId = 10000;

export interface ArrayNode {
  id: any;
  level: number;

  [key: string]: any;
}

type TempNode = ArrayNode & TreeNode & { pNode?: TempNode };

// 这是一个中间过程, 具体请查看test
export function findParentNode(
  arr: TempNode[],
  level: number
): TempNode | undefined {
  const rra = R.reverse(arr);
  for (let i = 0; i < rra.length; i++) {
    if (level === rra[i].level) {
      return rra[i].pNode;
    } else if (level === rra[i].level + 1) {
      return rra[i];
    }
  }
}

// 高效地将array转化为idTree
// 处理过程: 除traverseTree外, 没有用到递归, 而是遍历一个数组, 遍历完成后, 取出level===1的节点即可
// 注意level不一定是从0开始, 比如document的level就是从1开始, 所以要保留lastLevel
export function array2idTree_byLevel<A extends ArrayNode>(arr: A[]): TreeNode {
  const nodes = arr.reduce(
    (acc: TempNode[], node: A, idx: number) => {
      const pNode = findParentNode(acc, node.level);
      const newNode = {
        id: node.id,
        el: node,
        level: node.level,
        pid: pNode ? pNode.id : undefined,
        paths: [
          ...(pNode ? pNode.paths! : []),
          pNode ? (pNode.children || []).length : 0
        ],
        pNode,
        children: []
      };
      if (!!pNode) pNode.children!.push(newNode);
      return [...acc, newNode];
    },
    [
      {
        id: RootNodeId,
        el: arr.length > 0 ? arr[0] : null,
        level: arr.length > 0 ? arr[0].level - 1 : 0,
        pid: undefined,
        paths: [],
        children: []
      }
    ]
  );

  return traverseTree(nodes[0], t => ({
    id: t.id,
    el: t.el,
    pid: t.pid,
    children: t.children,
    paths: t.paths
  }));
}

export function idTree2Array(tree: TreeNode): ArrayNode[] {
  function _f(children: TreeNode[], level: number): ArrayNode[] {
    return children.reduce((acc: ArrayNode[], node: TreeNode) => {
      const newEl = { ...node.el, level };
      return node.children && node.children.length > 0
        ? [...acc, newEl, ..._f(node.children, level + 1)]
        : [...acc, newEl];
    }, []);
  }
  return _f(tree.children!, 1);
}

// 从fromIndex查找符合condition的index
export function findIndexFrom<T>(
  arr: T[],
  fromIndex: number,
  condition: (i: T) => boolean
) {
  const result = arr.slice(fromIndex).findIndex(it => condition(it));
  return result < 0 ? result : result + fromIndex;
}

export function reAppend<T = any>(arr: T[], item: T) {
  return [...arr.filter(it => it !== item), item];
}

export function swapByProp<T>(
  xs: T[],
  propName: keyof T,
  v1: any,
  v2: any
): T[] {
  const i1 = xs.findIndex((x: T) => x[propName] === v1);
  const i2 = xs.findIndex((x: T) => x[propName] === v2);
  if (i1 < 0)
    throw new Error(`swapByProp error: v1 not existed in xs: ${xs}, v1: ${v1}`);
  if (i2 < 0)
    throw new Error(`swapByProp error: v2 not existed in xs: ${xs}, v2: ${v2}`);
  if (i1 === i2) return xs;

  const minIndex = Math.min(i1, i2);
  const maxIndex = Math.max(i1, i2);
  return [
    ...xs.slice(0, minIndex),
    xs[maxIndex],
    ...xs.slice(minIndex + 1, maxIndex),
    xs[minIndex],
    ...xs.slice(maxIndex + 1)
  ];
}
