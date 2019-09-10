import { createTreeNode, deleteTreeNode } from './createNode';

describe('createTreeNode', () => {
  const tree1 = { id: 1 };
  it('根结点下, 插入子结点', () => {
    expect(createTreeNode(tree1, { id: 100 }, 1)).toEqual({
      id: 1,
      children: [{ id: 100 }]
    });
  });

  const tree2 = { id: 1, children: [{ id: 2 }] };
  it('叶结点下插入时, 插入为平级', () =>
    expect(createTreeNode(tree2, { id: 100 }, 2)).toEqual({
      id: 1,
      children: [{ id: 2 }, { id: 100 }]
    }));

  const tree4 = { id: 1, children: [{ id: 2 }, { id: 3 }] };
  it('多个叶结点', () =>
    expect(createTreeNode(tree4, { id: 100 }, 3)).toEqual({
      id: 1,
      children: [{ id: 2 }, { id: 3 }, { id: 100 }]
    }));

  const tree3 = { id: 1, children: [{ id: 2, children: [{ id: 3 }] }] };
  it('非叶结点插入时, 插入为非叶结点的第1个子结点', () => {
    expect(createTreeNode(tree3, { id: 100 }, 2)).toEqual({
      id: 1,
      children: [{ id: 2, children: [{ id: 100 }, { id: 3 }] }]
    });
  });
});

describe('deleteTreeNode', () => {
  const tree1 = { id: 1 };
  it('根结点不可删除', () => {
    expect(deleteTreeNode(tree1, 1)).toEqual({
      id: 1
    });
  });

  const tree2 = {
    id: 1,
    children: [{ id: 2, children: [{ id: 3 }] }, { id: 4 }]
  };
  it('删除节点时, rightSiblings将上移', () => {
    expect(deleteTreeNode(tree2, 2)).toEqual({
      id: 1,
      children: [{ id: 4 }]
    });
  });
});
