import { max } from './math/arithmetic';

export function nextArrayId(arr: { id: number; [k: string]: any }[]) {
  return arr.length === 0 ? 1 : max(arr.map(it => it.id)) + 1;
}

export function nextStrArrayId(
  arr: string[],
  prefix: string,
  separator: string = '_'
): string {
  const seq =
    max(
      arr
        .map(it => it.split(separator))
        .filter(([_prefix, seqStr]) => _prefix === prefix)
        .map(([_, seqStr]) => parseInt(seqStr)),
      0
    ) + 1;
  return prefix + separator + seq;
}

function idGenerator() {
  let id = 1;
  return function() {
    return id++;
  };
}
export const nextId = idGenerator();

// 与number型分开, 避免调用时去转类型
// 另外, 由于可以prefix, 可以按类型命名, 比如:
// const nextId_name = stringGenerator('name_')
// const nextId_age = stringGenerator('age_')
export function stringIdGenerator(prefix: string) {
  let id = 1;
  return function(_prefix?: string) {
    return `${_prefix || prefix}${id++}`;
  };
}
export const nextStringId = stringIdGenerator('id_');
