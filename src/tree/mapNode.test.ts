import { mapTreeNode } from './mapNode';
import { TreeNode } from './interface';

describe('map-tree-node', () => {
  const tree1 = {
    id: 1
  };

  it('', () =>
    expect(mapTreeNode(tree1, t => ({ ...t, x: 1 } as any))).toEqual({
      id: 1,
      x: 1
    }));

  const tree2 = {
    id: 1,
    children: [{ id: 2 }]
  };

  it('', () =>
    expect(mapTreeNode(tree2, t => ({ ...t, x: t.id + 1 } as any))).toEqual({
      id: 1,
      x: 2,
      children: [{ id: 2, x: 3 }]
    }));

  const tree3: TreeNode<{ id: any }> = {
    id: 1,
    children: [{ id: 2, children: [{ id: 3 }] }]
  };
  it('', () =>
    expect(mapTreeNode(tree3, t => ({ ...t, x: t.id + 1 } as any))).toEqual({
      id: 1,
      x: 2,
      children: [{ id: 2, x: 3, children: [{ id: 3, x: 4 }] }]
    }));
});
