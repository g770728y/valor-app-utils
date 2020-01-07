import { TreeArrayItem } from "./interface";
import { SimpleNodeContext, TreeContext } from "../tree/context";
import { actionWrapper } from "./util";
import { pushTreeNodeLeft, pushTreeNodeRight } from "../tree";

export function pushItemLeft<A extends TreeArrayItem>(
  arr: A[],
  index: number
): [A[], TreeContext] {
  return actionWrapper(arr, index, tree =>
    pushTreeNodeLeft(tree, arr[index].id)
  );
}

export function pushItemRight<A extends TreeArrayItem>(
  arr: A[],
  index: number
): [A[], TreeContext] {
  return actionWrapper(arr, index, tree =>
    pushTreeNodeRight(tree, arr[index].id)
  );
}
