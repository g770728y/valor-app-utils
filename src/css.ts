import { Properties as CSSProperties } from 'csstype';
import * as R from 'rambda';
import { removeNils } from './object';

export function css(el: HTMLElement, styleName: string, styleValue: any) {
  el.style[styleName as any] = styleValue;
  return el;
}

export function deserializeCSSStyle(s: string): object {
  if (!s || s.length <= 0 || !s.includes(':')) return {};

  const s1 = s.endsWith(';') ? s.slice(0, s.length - 1) : s.slice(0);

  const s2 = s1
    .trim()
    .replace(/[\s]*:[\s]*/g, _ => ':')
    .replace(/[\s]*;[\s]*/g, _ => ';');

  const pairs = s2.split(';').map(it => it.split(':'));

  return R.fromPairs(pairs as any);
}

export function serializeCSSStyle(css: Record<string, any>): string | null {
  const _css = removeNils(css);
  if (R.isEmpty(_css)) return null;

  return R.toPairs(_css)
    .map(([a, b]) => `${a}:${b}`)
    .join(';');
}

// 压缩styles object, 注意这个压缩只适用于某些场合, 比如 richeditor 等固定场合
// 因为它会删除默认值 ( text-align: left 等)
export function condenseStyles(styles: CSSProperties): CSSProperties {
  const withNulls = R.map((v: any, k: string) => {
    if (['text-indent', 'textIndent'].includes(k)) {
      const iv = parseInt(v + '');
      return isNaN(iv) || iv === 0 ? null : v;
    } else if (['text-align', 'textAlign'].includes(k)) {
      return ['left', ''].includes(v) ? null : v;
    } else {
      return v;
    }
  }, styles);

  return removeNils(withNulls);
}

/************ 工具方法, 对某个元素进行css操作 ********************** */
// 避免在 timer 未到600ms, 发生2次点击(此时取到的background是错的)
let highlighting: HTMLElement[] = [];
export function highlight(el: HTMLElement, color = '#FFFDD0') {
  if (highlighting.includes(el)) return;
  highlighting.push(el);

  const oldBackgroundColor = el.style.backgroundColor;
  css(el, 'transition', 'background-color ease 0.5s');
  css(el, 'backgroundColor', color);
  setTimeout(() => {
    css(el, 'backgroundColor', oldBackgroundColor);
    css(el, 'transition', '');
    highlighting = highlighting.filter(it => it !== el);
  }, 600);
}
