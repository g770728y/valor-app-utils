import * as R from "rambda";
import { padding } from "./array";

export function isPlainObject(obj: any): boolean {
  return !!(
    obj &&
    typeof obj === "object" &&
    obj.constructor &&
    obj.constructor.name === "Object"
  );
}

export function reverseKV(obj: Record<string, any>): Record<string, string> {
  if (!obj) return {};
  return R.fromPairs(R.toPairs(obj).reduce(
    (acc: string[][], [k, v]) => [...acc, [v, k]],
    []
  ) as any);
}

export function remove<T extends Record<string, any>>(
  obj: T,
  f: (v: T[keyof T], k: keyof T, obj: T) => boolean
): T;
export function remove<T>(
  arr: T[],
  f: (v: T, k: number, arr: T[]) => boolean
): T[];
export function remove(obj: any, f: (v: any, k: any, obj: any) => boolean) {
  return isPlainObject(obj)
    ? Object.keys(obj).reduce(
        (acc, k) => (f(obj[k], k, obj) ? { ...acc } : { ...acc, [k]: obj[k] }),
        {} as Record<string, any>
      )
    : Array.isArray(obj)
    ? obj.filter((el, idx) => !f(el, idx, obj))
    : obj;
}

/**
 * 从对象中移除空值
 * 注意: removeBlank会移除零长字符串, removeEmpty会移除{}
 * 但removeEmpty不会移除[]
 */
export function removeNils(
  obj: Record<string, any>,
  options: {
    removeBlank?: boolean;
    removeEmpty?: boolean;
    recursive?: boolean;
  } = {
    removeBlank: false,
    removeEmpty: false,
    recursive: false
  }
): Record<string, any> {
  const deep = !!(options && options.recursive);
  if (!isPlainObject(obj)) return obj;

  return Object.keys(obj).reduce(
    (acc, k) => {
      const v = obj[k];
      return R.isNil(v)
        ? acc
        : options.removeBlank && v === ""
        ? acc
        : options.removeEmpty && isPlainObject(v) && R.isEmpty(v)
        ? acc
        : deep && Array.isArray(v)
        ? { ...acc, [k]: v.map(it => removeNils(it, options)) }
        : deep && isPlainObject(v)
        ? R.isEmpty(removeNils(v, options))
          ? acc
          : { ...acc, [k]: removeNils(v, options) }
        : { ...acc, [k]: v };
    },
    {} as Record<string, any>
  );
}

export function removeProp(
  obj: Record<string, any>,
  prop: string,
  options?: { recursive?: boolean }
): Record<string, any> {
  const deep = !!(options && options.recursive);
  if (!isPlainObject(obj)) return obj;

  return Object.keys(obj).reduce(
    (acc, k) => {
      const v = obj[k];
      return prop === k
        ? { ...acc }
        : ((deep && isPlainObject(v)
            ? { ...acc, [k]: removeProp(v, prop, options) }
            : deep && Array.isArray(v)
            ? { ...acc, [k]: v.map(it => removeProp(it, prop, options)) }
            : { ...acc, [k]: v }) as any);
    },
    {} as Record<string, any>
  );
}

// 返回obj2有, 但obj1没有, 或obj2[k]!==obj1[k] 所对应的entries, 约等于 obj2-obj1
export function objSubtract<T extends object>(
  obj2: T,
  obj1: T,
  reserveKey = "id"
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

export function objSubtractDeep<T extends {}>(
  obj2: T,
  obj1: T,
  options: {
    removeBlank?: boolean;
    removeEmpty?: boolean;
    removeNil?: boolean;
  } = { removeBlank: false, removeEmpty: true, removeNil: true }
): Partial<T> {
  // 不对比 非 object
  if (!(isPlainObject(obj2) && isPlainObject(obj1))) {
    return obj2;
  }

  const _result = Object.keys(obj2).reduce((acc: Partial<T>, k2) => {
    const v2 = (obj2 as any)[k2];
    const v1 = (obj1 as any)[k2];
    return R.equals(v1, v2)
      ? acc
      : isPlainObject(v2) && isPlainObject(v1)
      ? { ...acc, [k2]: objSubtractDeep(v2, v1) }
      : { ...acc, [k2]: v2 };
  }, {});

  return R.filter(
    v =>
      !(
        (options.removeNil && R.isNil(v)) ||
        (options.removeEmpty && (R.equals({}, v) || R.equals([], v))) ||
        (options.removeBlank && v === "")
      ),
    _result
  ) as any;
}

export function getOrElse<T extends Record<string, any>>(
  obj: T,
  k: keyof T,
  defaultValue?: T[keyof T]
): T[keyof T] | undefined {
  return obj && obj.hasOwnProperty(k) ? obj[k] || defaultValue : defaultValue;
}

export function getNumberOrElse<T extends Record<string, any>>(
  obj: T,
  k: keyof T,
  defaultValue: number = 0
): number {
  const result = getOrElse(obj, k);
  return !result
    ? defaultValue
    : R.is(Number, result)
    ? result
    : R.is(String, result)
    ? parseInt(result)
    : defaultValue;
}

/**
 * 注意与JSON.parse不同
 */
export function str2object(s: string): any {
  return eval(`(()=>(${s}))()`);
}

/**
 * 注意与JSON.stringify不同
 */
export function object2str(obj: any): string {
  return isPlainObject(obj)
    ? "{" +
        Object.keys(obj).reduce((acc: string, k: string) => {
          const v = obj[k];
          const p = `${k}:${object2str(v)}`;
          return acc ? acc + "," + p : p;
        }, "") +
        "}"
    : R.is(Array, obj)
    ? "[" + obj.map(object2str).join(",") + "]"
    : R.isNil(obj)
    ? obj + ""
    : R.is(String, obj)
    ? `\"${obj}\"`
    : obj.toString();
}

export function dissoc(obj: any, arr: string[] | string) {
  return ((R.is(Array, arr) ? arr : [arr]) as string[]).reduce(
    (acc, key) => R.dissoc(key, acc),
    obj
  );
}

/**
 * 类似Rx.mergeDeep, 但支持数组 ( 按index )
 */
export function mergeDeep(slave: any, master: any): any {
  if (slave === undefined) return master;
  if (master === undefined) return slave;

  if (isPlainObject(slave) && isPlainObject(master)) {
    const added = Object.keys(master).reduce(
      (acc, masterKey) =>
        Object.keys(slave).includes(masterKey)
          ? acc
          : { ...acc, [masterKey]: master[masterKey] },
      {}
    );
    const updated = Object.keys(slave).reduce(
      (acc, k) => ({ ...acc, [k]: mergeDeep(slave[k], master[k]) }),
      {}
    );
    return { ...updated, ...added };
  }

  if (R.is(Array, slave) && R.is(Array, master)) {
    return master.map((it: any, i: number) =>
      mergeDeep(slave[i], i >= master.length ? undefined : master[i])
    );
  }

  return master;
}

/**
 * [{id:1},{id:2}] =>{1: {id:1}, 2: {id:2}}
 */
export function idMap<T>(
  idArray: T[],
  idField: string = "id"
): { [id: string]: T } {
  /* 用于性能比较, 3300条记录需要2.7秒!!!
  console.log("测试记录条数:", idArray.length);
  console.time("idMap");
  const result1 = idArray.reduce(
    (acc, obj) => ({ ...acc, [(obj as any)[idField]]: obj }),
    {}
  );
  console.timeEnd("idMap");
  */

  // forEach同样记录数, 只要0.7ms, 差距非常悬殊
  let result = {} as any;
  idArray.forEach((obj, i) => {
    const idName = (obj as any)[idField];
    result[idName] = obj;
  });
  return result;
}
