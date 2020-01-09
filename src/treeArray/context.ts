import {
  getTreeContexts as get,
  SimpleNodeContext,
  TreeContext
} from "../tree/context";
import { TreeArrayItem } from "./interface";
import { array2tree } from "./transform";
import { dissoc } from "../object";

export function getTreeContexts<A extends TreeArrayItem>(
  arr: A[]
): TreeContext {
  const tree = array2tree(arr);
  // console.log("tree", JSON.stringify(tree));
  return dissoc(get(tree), ["-1"]);
}
