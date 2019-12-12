import { getTreeContexts } from "./context";
import { RootNodeId } from "../tree/interface";

describe("tree-context", () => {
  it("空树组", () => {
    const arr = [] as any;
    const expected = [] as any;
    expect(getTreeContexts(arr)).toEqual(expected);
  });
  it.skip("default", () => {
    const arr = [
      { id: 1, level: 1 },
      { id: 2, level: 2 },
      { id: 3, level: 3 }
    ];
    const expected = [
      {
        level: 1,
        parentId: RootNodeId,
        childrenIds: [2],
        path: [0],
        index: 0
      },
      { level: 2, parentId: 1, childrenIds: [3], path: [0, 0], index: 0 },
      { level: 3, parentId: 2, childrenIds: [], path: [0, 0, 0], index: 0 }
    ];
    expect(getTreeContexts(arr)).toEqual(expected);
  });
});
