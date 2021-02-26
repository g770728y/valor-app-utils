import * as R from "rambdax";

/**
 * Rambda.memoize的升级版
 * 可以控制缓存次数, 在多数情况下, 其实缓存最上一次结果就可以了
 * @param n 缓存次数
 * @param f 要调用的方法
 * @param self 相当于要使用的this
 * @return memoized过的新方法
 */
export function memoizeByCount(n: number, f: Function, self: any = null) {
  if (n < 1) throw new Error("n必须大于1, 否则无意义");
  const cache: { params: any; result: any }[] = [];

  return (...args: any[]) => {
    console.log("args", args);
    if (args.length <= 0) throw new Error("memoizeByCount用于无参函数没有意义");
    const cached = cache.find(({ params, result }) => R.equals(args, params));
    if (!cached) {
      const result = f.apply(self, args);
      cache.push({ params: args, result });
      if (cache.length > n) {
        cache.shift();
      }
      return result;
    } else {
      return cached.result;
    }
  };
}
