import * as R from "rambdax";

/**
 * 有向无环图排序
 * @params nodes: [[1,[2,3]],...], 表示 顶点1 , 邻接边 [2,3]
 * @return [[1], [2,3],[4] ...] 顶点1没有入度, 顶点23有1的入度, 顶点4有23的入度
 */
export function dagSort<T>(nodes: [T, T[]][]): T[][] {
  if (R.isEmpty(nodes)) return [];
  const nodesClone = R.clone(nodes);

  function _sort(_nodes: [T, T[]][], acc: T[][]): T[][] {
    const verts = _nodes.map((it) => it[0]);
    const adjVerts = new Set(R.flatten(_nodes.map((it) => it[1])) as any);
    const diff = verts.reduce(
      (acc, x) => (adjVerts.has(x) ? acc : [...acc, x]),
      [] as T[]
    );
    const rest = _nodes.filter((it) => !diff.includes(it[0]));
    return R.isEmpty(rest) ? [...acc, diff] : _sort(rest, [...acc, diff]);
  }

  return _sort(nodesClone, []);
}
