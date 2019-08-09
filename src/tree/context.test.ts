import { RootNodeId } from './interface';
import { getTreeContexts } from './context';

describe('get-context-context', () => {
  const tree1 = {
    id: RootNodeId,
    level: 0,
    children: [
      {
        id: 1,
        level: 1,
        children: [
          {
            id: 2,
            level: 2,
            children: [{ id: 3, level: 3, children: [] as any }]
          }
        ]
      }
    ]
  };
  const _context1_ = {
    [RootNodeId]: {
      level: 0,
      parentId: undefined,
      childrenIds: [1],
      path: [],
      index: 0
    },
    1: {
      level: 1,
      parentId: RootNodeId,
      childrenIds: [2],
      path: [0],
      index: 0
    },
    2: { level: 2, parentId: 1, childrenIds: [3], path: [0, 0], index: 0 },
    3: { level: 3, parentId: 2, childrenIds: [], path: [0, 0, 0], index: 0 }
  };
  it('simple', () => expect(getTreeContexts(tree1 as any)).toEqual(_context1_));

  const tree2 = {
    id: RootNodeId,
    level: 0,
    children: [
      {
        id: 1,
        level: 1,
        children: [
          {
            id: 2,
            level: 2,
            children: [
              {
                id: 3,
                level: 3,
                children: [] as any
              },
              {
                id: 4,
                level: 3,
                children: [] as any
              }
            ]
          }
        ]
      },
      {
        id: 5,
        level: 1,
        children: [] as any
      }
    ]
  };
  const _context2_ = {
    [RootNodeId]: {
      level: 0,
      parentId: undefined,
      childrenIds: [1, 5],
      path: [],
      index: 0
    },
    1: {
      level: 1,
      parentId: RootNodeId,
      childrenIds: [2],
      path: [0],
      index: 0
    },
    2: {
      level: 2,
      parentId: 1,
      childrenIds: [3, 4],
      path: [0, 0],
      index: 0
    },
    3: {
      level: 3,
      parentId: 2,
      childrenIds: [],
      path: [0, 0, 0],
      index: 0
    },
    4: {
      level: 3,
      parentId: 2,
      childrenIds: [],
      path: [0, 0, 1],
      index: 1
    },
    5: {
      level: 1,
      parentId: RootNodeId,
      childrenIds: [],
      path: [1],
      index: 1
    }
  };
  it('simple', () => expect(getTreeContexts(tree2 as any)).toEqual(_context2_));
});
