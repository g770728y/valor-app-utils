import { isPlainObject } from "./object";

/**
 * 选定的keys, 如果数据存在, 才去判断是否相等
 * 例如: data={a:1,b:2,c:3}, patch={a:1,c:5}, keys=[a,b], 则 返回true (b不存在, 则不比较)
 * @param data 基准数据
 * @param patch 部分数据
 * @param keys 要比较的keys
 */
export function partialEquals(data: any, patch: any, keys: string[]): boolean {
  if (!isPlainObject(data) || !isPlainObject(patch)) return false;
  return keys.every((k) => {
    return patch[k] === undefined || patch[k] === data[k];
  });
}
