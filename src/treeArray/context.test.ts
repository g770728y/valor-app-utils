import { getTreeContexts } from "./context";
import { RootNodeId } from "../tree/interface";

describe("tree-context", () => {
  it("case1: 空树组", () => {
    const arr = [] as any;
    const expected = {
      "-1": {
        childrenIds: [],
        index: 0,
        level: 0,
        parentId: undefined,
        path: [],
      },
    } as any;
    expect(getTreeContexts(arr)).toEqual(expected);
  });
  it("case2: default", () => {
    const arr = [{ id: 1, level: 1 }, { id: 2, level: 2 }, { id: 3, level: 3 }];
    const expected = {
      "-1": {
        childrenIds: [1],
        index: 0,
        level: 0,
        parentId: undefined,
        path: [],
      },
      1: {
        level: 1,
        parentId: RootNodeId,
        childrenIds: [2],
        path: [0],
        index: 0,
      },
      2: { level: 2, parentId: 1, childrenIds: [3], path: [0, 0], index: 0 },
      3: { level: 3, parentId: 2, childrenIds: [], path: [0, 0, 0], index: 0 },
    };
    expect(getTreeContexts(arr)).toEqual(expected);
  });
  it("case3", () => {
    const arr = [{ id: 1, level: 1 }, { id: 2, level: 2 }, { id: 3, level: 1 }];
    const expected = {
      "-1": {
        childrenIds: [1, 3],
        index: 0,
        level: 0,
        parentId: undefined,
        path: [],
      },
      1: {
        level: 1,
        parentId: RootNodeId,
        childrenIds: [2],
        path: [0],
        index: 0,
      },
      2: { level: 2, parentId: 1, childrenIds: [], path: [0, 0], index: 0 },
      3: {
        level: 1,
        parentId: RootNodeId,
        childrenIds: [],
        path: [1],
        index: 1,
      },
    };
    expect(getTreeContexts(arr)).toEqual(expected);
  });

  it.only("case4: 复杂例子", () => {
    const arr = [
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 3 },
      { id: 4, level: 3 },
      { id: 5, level: 2 },
      { id: 6, level: 1 },
      { id: 7, level: 2 },
      { id: 8, level: 1 },
      { id: 9, level: 1 },
    ];
    const expected = {
      "-1": {
        childrenIds: [1, 6, 8, 9],
        index: 0,
        level: 0,
        parentId: undefined,
        path: [],
      },
      1: {
        level: 1,
        parentId: RootNodeId,
        childrenIds: [2, 5],
        path: [0],
        index: 0,
      },
      2: { level: 2, parentId: 1, childrenIds: [3, 4], path: [0, 0], index: 0 },
      3: { level: 3, parentId: 2, childrenIds: [], path: [0, 0, 0], index: 0 },
      4: { level: 3, parentId: 2, childrenIds: [], path: [0, 0, 1], index: 1 },
      5: { level: 2, parentId: 1, childrenIds: [], path: [0, 1], index: 1 },
      6: {
        level: 1,
        parentId: RootNodeId,
        childrenIds: [7],
        path: [1],
        index: 1,
      },
      7: { level: 2, parentId: 6, childrenIds: [], path: [1, 0], index: 0 },
      8: {
        level: 1,
        parentId: RootNodeId,
        childrenIds: [],
        path: [2],
        index: 2,
      },
      9: {
        level: 1,
        parentId: RootNodeId,
        childrenIds: [],
        path: [3],
        index: 3,
      },
    };
    expect(getTreeContexts(arr)).toEqual(expected);
  });
});
