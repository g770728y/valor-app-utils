import * as R from 'rambda';

export function isPlainObject(obj: any): boolean {
  return !!(
    obj &&
    typeof obj === 'object' &&
    obj.constructor &&
    obj.constructor.name === 'Object'
  );
}

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
        (options.removeBlank && v === '')
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
