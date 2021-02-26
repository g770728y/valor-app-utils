// 仅仅为了自己的lib与main共享同一个cache, 没有别的用处
// 比如 valor-uform-ext, 为了避免picker打开时每次清空, 就需要用到cache
// 但 main 里自己的picker 也需要cache ( 这里的picker 并非全部使用uform-ext的组件)
// 其实这里完全可以扩展成一个 可缓存到localStorage的 cache

import * as R from "rambdax";

export class AppCache {
  // 帮助调用者判断, 比如你可以用: appCache.get(id || AppCache.DreamerId) ,  以避免一堆判断:  appCache.get(id) ? appCache.get(id) || '' : ..
  static DreamerId = "_not_exists_at_all_";

  cache: Record<string, any> = {};

  get = (k: string, defaultValue?: any) => {
    if (k === AppCache.DreamerId) return null;

    const strv0 = localStorage.getItem(k);
    const str = R.isNil(strv0) ? "null" : strv0;
    return this.cache[k] || JSON.parse(str) || defaultValue || null;
  };

  set = (k: string, v: any) => {
    if (k === AppCache.DreamerId) return;

    this.cache[k] = v;
    localStorage.setItem(k, JSON.stringify(v));
  };
}

export default new AppCache();
