import { pushTreeNodeLeft, pushTreeNodeRight } from './pushNode';

describe('push-node-left', () => {
  const tree1 = {
    id: 1,
    children: []
  };
  it('根节点无法左移', () => expect(pushTreeNodeLeft(tree1, 1)).toEqual(tree1));

  const tree2 = {
    id: 1,
    children: [{ id: 2, children: [] }]
  };
  it('第1级子节点不可左移, 因为不允许多根', () =>
    expect(pushTreeNodeLeft(tree2, 2)).toEqual(tree2));

  const tree3 = {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          {
            id: 3,
            children: [
              {
                id: 4
              }
            ]
          }
        ]
      }
    ]
  };
  it('第1级的第1个子节点左移', () =>
    expect(pushTreeNodeLeft(tree3, 3)).toEqual({
      id: 1,
      children: [
        { id: 2, children: [] },
        {
          id: 3,
          children: [
            {
              id: 4
            }
          ]
        }
      ]
    }));

  const tree4 = {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          {
            id: 3,
            children: [
              {
                id: 4
              }
            ]
          },
          {
            id: 5,
            children: [
              {
                id: 6
              }
            ]
          },
          {
            id: 7,
            children: [
              {
                id: 8
              }
            ]
          }
        ]
      }
    ]
  };
  it('普通左移, 要保证位置不变, 所以下方的siblings要变成其子节点', () =>
    expect(pushTreeNodeLeft(tree4, 5)).toEqual({
      id: 1,
      children: [
        {
          id: 2,
          children: [
            {
              id: 3,
              children: [
                {
                  id: 4
                }
              ]
            }
          ]
        },
        {
          id: 5,
          children: [
            {
              id: 6
            },
            {
              id: 7,
              children: [
                {
                  id: 8
                }
              ]
            }
          ]
        }
      ]
    }));
});

describe('push-node-right', () => {
  const tree1 = {
    id: 1,
    children: []
  };
  it('根节点无法右移', () =>
    expect(pushTreeNodeRight(tree1, 1)).toEqual(tree1));

  const tree2 = {
    id: 1,
    children: [{ id: 2, children: [] }]
  };
  it('同级第1个子节点不可右移', () =>
    expect(pushTreeNodeRight(tree2, 2)).toEqual(tree2));

  const tree4 = {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          {
            id: 3,
            children: [
              {
                id: 4
              }
            ]
          },
          {
            id: 5,
            children: [
              {
                id: 6
              }
            ]
          },
          {
            id: 7,
            children: [
              {
                id: 8
              }
            ]
          }
        ]
      }
    ]
  };
  it('普通右移, 从当前parent中移除, 成为 leftSibling的最后一个子节点', () =>
    expect(pushTreeNodeRight(tree4, 5)).toEqual({
      id: 1,
      children: [
        {
          id: 2,
          children: [
            {
              id: 3,
              children: [
                {
                  id: 4
                },
                {
                  id: 5,
                  children: [
                    {
                      id: 6
                    }
                  ]
                }
              ]
            },
            {
              id: 7,
              children: [
                {
                  id: 8
                }
              ]
            }
          ]
        }
      ]
    }));
});
