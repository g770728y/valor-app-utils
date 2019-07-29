import { max } from './math';

export function nextArrayId(arr: { id: number; [k: string]: any }[]) {
  return arr.length === 0 ? 1 : max(arr.map(it => it.id)) + 1;
}

function idGenerator() {
  let id = 1;
  return function() {
    return id++;
  };
}
export const nextId = idGenerator();

// 与number型分开, 避免调用时去转类型
function stringIdGenerator(prefix: string) {
  let id = 1;
  return function(_prefix?: string) {
    return `${_prefix || prefix}${id++}`;
  };
}
export const nextStringId = stringIdGenerator('id_');
