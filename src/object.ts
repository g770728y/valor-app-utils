import { toPairs, fromPairs, isNil, type as rtype } from 'rambda';

export function reverseKV(obj: Record<string, any>): Record<string, string> {
  if (!obj) return {};
  return fromPairs(toPairs(obj).reduce((acc: string[][], [k, v]) => [...acc, [v, k]], []) as any);
}

export function removeNils(
  obj: Record<string, any>,
  options: { removeBlank?: boolean; removeEmpty?: boolean } = {
    removeBlank: false,
    removeEmpty: false,
  },
) {
  return fromPairs(toPairs(obj).reduce(
    (acc: string[][], [k, v]) =>
      isNil(v) ||
      (options.removeBlank && v === '') ||
      (options.removeEmpty && rtype(v) === 'Object' && Object.keys(v).length === 0)
        ? acc
        : [...acc, [k, v]],
    [],
  ) as any);
}
