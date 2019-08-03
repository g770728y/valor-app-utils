import * as R from 'rambda';

export function reverseKV(obj: Record<string, any>): Record<string, string> {
  if (!obj) return {};
  return R.fromPairs(R.toPairs(obj).reduce(
    (acc: string[][], [k, v]) => [...acc, [v, k]],
    []
  ) as any);
}

export function removeNils(
  obj: Record<string, any>,
  options: { removeBlank?: boolean; removeEmpty?: boolean } = {
    removeBlank: false,
    removeEmpty: false
  }
) {
  return R.fromPairs(R.toPairs(obj).reduce(
    (acc: string[][], [k, v]) =>
      R.isNil(v) ||
      (options.removeBlank && v === '') ||
      (options.removeEmpty &&
        R.type(v) === 'Object' &&
        Object.keys(v).length === 0)
        ? acc
        : [...acc, [k, v]],
    []
  ) as any);
}

// 返回obj2有, 但obj1没有, 或obj2[k]!==obj1[k] 所对应的entries, 约等于 obj2-obj1
export function objSubtract<T extends object>(
  obj2: T,
  obj1: T,
  reserveKey = 'id'
): Partial<T> {
  return Object.keys(obj2).reduce((acc: Partial<T>, k2: string) => {
    if ((obj2 as any)[k2] !== (obj1 as any)[k2]) {
      return { ...acc, [k2]: (obj2 as any)[k2] };
    } else {
      // 可能需要保留 id key
      return reserveKey === k2 ? { ...acc, [k2]: (obj2 as any)[k2] } : acc;
    }
  }, {});
}
