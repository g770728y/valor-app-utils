import { TreeArrayItem } from "./interface";
import { SimpleNodeContext } from "../tree/context";
import { actionWrapper } from "./util";
import { moveTreeNodeDown, moveTreeNodeUp } from "../tree";

export function moveUp<A extends TreeArrayItem>(
  arr: A[],
  index: number
): [A[], SimpleNodeContext[]] {
  return actionWrapper(arr, index, tree => moveTreeNodeUp(tree, arr[index].id));
}

export function moveDown<A extends TreeArrayItem>(
  arr: A[],
  index: number
): [A[], SimpleNodeContext[]] {
  return actionWrapper(arr, index, tree =>
    moveTreeNodeDown(tree, arr[index].id)
  );
}
