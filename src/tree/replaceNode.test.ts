import { replaceTreeNode } from './replaceNode';

describe('replaceTreeNode', () => {
  it('未找到要替换的结点', () => {
    const tree1 = { id: -1, children: [] };
    expect(replaceTreeNode(tree1, 1, { id: 1, children: [{ id: 3 }] })).toEqual(
      {
        id: -1,
        children: []
      }
    );
  });
  it('直接替换根结点', () => {
    const tree1 = { id: 1, children: [] };
    expect(replaceTreeNode(tree1, 1, { id: 1, children: [{ id: 3 }] })).toEqual(
      {
        id: 1,
        children: [{ id: 3 }]
      }
    );
  });

  it('替换第一级节点', () => {
    const tree = {
      id: 1,
      children: [
        { id: 2, children: [] },
        {
          id: 3,
          children: [{ id: 4, children: [] }, { id: 5, children: [] }]
        }
      ]
    };
    const newNode = {
      id: 3,
      children: []
    };

    expect(replaceTreeNode(tree, 3, newNode)).toEqual({
      id: 1,
      children: [
        { id: 2, children: [] },
        {
          id: 3,
          children: []
        }
      ]
    });
  });
});
