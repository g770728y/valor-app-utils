import { traverseTree } from './traverse';

describe('traverse-tree', () => {
  const tree = {
    id: 1,
    v: 1,
    paths: [],
    children: [
      {
        id: 2,
        v: 2,
        paths: [],
        children: [{ id: 3, v: 3, paths: [], children: [] }]
      },
      {
        id: 4,
        v: 4,
        paths: [],
        children: []
      }
    ]
  };
  const result = [1, 2, 3, 4];

  const _result: any[] = [];
  traverseTree(tree, (node: any, context) => {
    _result.push(node.v);
  });
  it('default', () => expect(_result).toEqual(result));
});
