import { moveTreeNodeUp, moveTreeNodeDown } from './moveNode';

describe('moveTreeNodeUp', () => {
  const tree1 = {
    id: 1
  };
  it('第一个节点不可上移', () =>
    expect(moveTreeNodeUp(tree1, 1)).toEqual(tree1));

  const tree2 = {
    id: 1,
    children: [{ id: 2 }]
  };
  it('节点的index===0, 则不可上移', () =>
    expect(moveTreeNodeUp(tree2, 2)).toEqual(tree2));

  const tree3 = {
    id: 1,
    children: [{ id: 2 }, { id: 3 }]
  };
  it('如果节点的index>=1, 可正常上移', () =>
    expect(moveTreeNodeUp(tree3, 3)).toEqual({
      id: 1,
      children: [{ id: 3 }, { id: 2 }]
    }));
});

describe('moveTreeNodeDown', () => {
  const tree1 = { id: 1 };
  it('第一个节点不可下移', () =>
    expect(moveTreeNodeDown(tree1, 1)).toEqual(tree1));

  const tree2 = {
    id: 1,
    children: [{ id: 2 }, { id: 3 }]
  };
  it('节点的index===同级最大index, 则不可下移', () =>
    expect(moveTreeNodeDown(tree2, 3)).toEqual(tree2));

  const tree3 = {
    id: 1,
    children: [{ id: 2 }, { id: 3 }]
  };
  it('如果节点的index小于同级最大index, 可正常上移', () =>
    expect(moveTreeNodeDown(tree3, 2)).toEqual({
      id: 1,
      children: [{ id: 3 }, { id: 2 }]
    }));
});
