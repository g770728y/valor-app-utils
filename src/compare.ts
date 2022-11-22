import { isPlainObject } from "./object";
import * as R from "rambdax";
import { parseInt36 } from "./translate";
import { sum } from "./math";

/**
 * 聪明的比较: 先比较引用, 如果引用不等, 再进行深比较
 * 注意: 对[] / {} / 基本类型支持得好, 但对Hash等退化到deep
 */
export function equals(a: any, b: any): boolean {
  console.error("不要使用equals方法, 这比fast-deep-equals要慢几倍");
  if (a === b) return true;

  if (Array.isArray(a) && Array.isArray(b)) {
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

// 301-a-1 vs 301-b-1
// 302 vs 301-a
// S1 vs S3-1
export function compareDividedCode(
  s1: string,
  s2: string,
  divider = "-"
): number {
  const s1_segments = s1.split("-");
  const s2_segments = s2.split("-");
  const len = Math.max(s1_segments.length, s2_segments.length);

  for (let i = 0; i < len; i++) {
    const s1_segment = s1_segments[i];
    const s2_segment = s2_segments[i];
    // null < everything
    if (!s1_segment) return -1;
    if (!s2_segment) return 1;

    const s1_int = parseInt36(s1_segment);
    const s2_int = parseInt36(s2_segment);
    const curr = s1_int - s2_int;
    if (curr !== 0) return curr;
  }
  return 0;
}

// 1 < 1.1
// 1.1 < 1.1.1
// 1.1.1 < 1.1.2
// 1.1.2 < 2
export function compareVersionNumber(v1: string, v2: string) {
  // 最多比较5位,
  const MAX_SEGMENGT_SIZE = 5;
  // 每段最大长度4位即9999
  const SEGMENT_LEN = 4;
  return to36(v1.split(".")) - to36(v2.split("."));

  function to36(xs1: string[]): number {
    // 左移8位是65536即0x10000, 相当于每段最大数字为9999
    return sum(
      xs1.map(
        (x, i) =>
          parseInt(x) *
          Math.pow(Math.pow(10, SEGMENT_LEN), MAX_SEGMENGT_SIZE - i)
      )
    );
  }
}
