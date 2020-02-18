import { Identity } from "../tree/interface";
import { TreeNode, array2tree_byLevel, array2tree_byPid } from "../tree";
import { tree2Array } from "../tree/transform";
import { TreeArrayItem } from "./interface";
import * as R from "rambda";

export function array2tree<A extends TreeArrayItem>(arr: A[]): TreeNode<A> {
  if (arr.length <= 0) {
    //@ts-ignore
    return array2tree_byLevel(arr as any);
  } else if (!R.isNil(arr[0].level)) {
    //@ts-ignore
    return array2tree_byLevel(arr as any);
  } else if (arr[1].pid) {
    //@ts-ignore
    return array2tree_byPid(arr as any);
  } else {
    throw new Error("array2tree 出错, 源数组元素至少有level/pid");
  }
}

/**
 * @deprecated
 */
export function transform<A extends TreeArrayItem>(
  arr: A[],
  f: (t: TreeNode<A>) => TreeNode<A>
): A[] {
  const tree = array2tree(arr);
  const newTree = f(tree);
  return tree2Array(newTree) as any;
}
