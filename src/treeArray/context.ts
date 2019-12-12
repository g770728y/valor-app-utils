import { getTreeContexts as get, SimpleNodeContext } from "../tree/context";
import { TreeArrayItem } from "./interface";
import { transform, array2tree } from "./transform";

export function getTreeContexts<A extends TreeArrayItem>(
  arr: A[]
): SimpleNodeContext[] {
  const tree = array2tree(arr);
  return Object.values(get(tree))
    .filter(it => it.level > 0)
    .sort(
      (it1, it2) =>
        it1.level * 100000 + it1.index - (it2.level * 100000 + it2.index)
    );
}
