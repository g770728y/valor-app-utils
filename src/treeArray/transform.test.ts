import { RootNodeId } from "../tree/interface";
import { array2tree, transform } from "./transform";
import { tree2Array } from "../tree/transform";
import * as R from "rambdax";

describe("transform", () => {
  it("空数组", () => {
    expect(transform([], R.identity)).toEqual([]);
  });

  const arr1 = [
    { id: 1, level: 1 },
    { id: 2, level: 2 },
    { id: 3, level: 3 },
  ];

  const result1 = transform(arr1, R.identity);
  it("转换前后, 值引等", () => expect(result1).toEqual(arr1));
});
