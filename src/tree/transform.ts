import { RootNodeId, TreeNode, Identity } from './interface';
import * as R from 'rambdax';
import { traverseTree } from './traverse';
import { SimpleNodeContext } from './context';

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
  // 后面将arr.reduce改成for循环, reduce性能不足以支撑万级节点
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
        children: [],
      };
      if (!!pNode) pNode.children!.push(newNode);
      return [...acc, newNode];
    },
    [
      {
        id: rootId,
        level: minLevel,
        children: [],
      },
    ]
  );

  return nodes[0];
}

export function array2tree_byPid<A extends { id: any; pid: any }>(
  arr: A[],
  options?: { pidField?: string; rootId?: any }
): TreeNode<A> {
  console.warn(
    '使用此方法前, 必须满足: [node1, node2] => node1.level <= node2.level的条件, 即应该sort(a,b=>a.leve-b.level)'
  );
  console.warn(
    'RootNode一定是虚节点, 在数组中不存在, 所以如果树组是一棵全树, 根结点具有pid, 那么真正的rootNodeId=pid'
  );
  const pidField = (options && options.pidField) || 'pid';
  const rootId =
    options?.rootId !== undefined
      ? options.rootId
      : (arr[0] as any)?.[pidField] !== undefined
      ? (arr[0] as any)?.[pidField]
      : RootNodeId;
  if (arr.length === 0) return { id: rootId, level: 0, children: [] } as any;
  const nodes:TreeNode<A>[] = [];
  nodes.push({
    id: rootId,
    [pidField]: undefined,
    children: [],
  } as unknown as TreeNode<A>);

  for (let i = 0; i < arr.length; i++) {
    const data = arr[i];
    let pNode;
    for (let j = nodes.length - 1; j >= 0; j--) {
      if (nodes[j].id === (data as any)[pidField]) {
        pNode = nodes[j];
        break;
      }
    }

    const newNode = {
      ...data,
      children: [],
      data: data,
    };
    if (pNode) pNode.children!.push(newNode);
    nodes.push(newNode);
  }

  return nodes[0];
}

export function tree2Array<A extends Identity>(
  tree: TreeNode<A>,
  attachContextKeys: keyof SimpleNodeContext = [] as any
): Omit<TreeNode<A>, 'children'>[] {
  const result = [] as any;
  traverseTree(tree, (node, context) => {
    const contextObj = R.pick(attachContextKeys as any, context as any);
    const newNode = { ...(R.dissoc('children', node) as any), ...contextObj };
    result.push(newNode);
  });
  return result.slice(1) as any;
}
