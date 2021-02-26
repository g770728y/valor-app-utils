import { isPlainObject } from "./object";
import * as R from "rambdax";
import fastEquals from "fast-deep-equal";

/**
 * 聪明的比较: 先比较引用, 如果引用不等, 再进行深比较
 * 注意: 对[] / {} / 基本类型支持得好, 但对Hash等退化到deep
 */
export function equals(a: any, b: any): boolean {
  console.error("不要使用equals方法, 这比fast-deep-equals要慢几倍");
  if (a === b) return true;

  if (Array.isArray(a) && Array.isArray) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      // 很关键: 先进行引用比较, 如果不等, 再进行值比较
      if (a[i] !== b[i]) {
        if (!equals(a, b)) return false;
      }
    }
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    // key全等
    if (aKeys.length !== bKeys.length) return false;
    for (let i = 0; i < aKeys.length; i++) {
      if (bKeys.indexOf(aKeys[i]) < 0) return false;
    }
    for (let i = 0; i < bKeys.length; i++) {
      if (aKeys.indexOf(bKeys[i]) < 0) return false;
    }

    // 每个value相同
    for (let i = 0; i < aKeys.length; i++) {
      const key = aKeys[i];
      if (!equals(a[key], b[key])) return false;
    }
  }

  return R.equals(a, b);
}

export function shallowEqualsArray<T>(a: T[], b: T[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;

  const len = a.length;
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}
