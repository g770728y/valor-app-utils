import * as R from "rambda";
import { removeNils, getOrElse, getNumberOrElse, remove } from "./object";
import { camel2snake, snake2camel, isNumberLike, ensureSuffix } from "./string";

type CSSProperties = Record<string, any>;

export function css(el: HTMLElement, styleName: string, styleValue: any) {
  el.style[styleName as any] = styleValue;
  return el;
}

export function deserializeCSSStyle(s: string): object {
  if (!s || s.length <= 0 || !s.includes(":")) return {};

  const s1 = s.endsWith(";") ? s.slice(0, s.length - 1) : s.slice(0);

  const s2 = s1
    .trim()
    .replace(/[\s]*:[\s]*/g, (_) => ":")
    .replace(/[\s]*;[\s]*/g, (_) => ";");

  const pairs = s2.split(";").map((it) => it.split(":"));

  return R.fromPairs(pairs as any);
}

export function serializeCSSStyle(css: Record<string, any>): string | null {
  const _css = removeNils(css);
  if (R.isEmpty(_css)) return null;

  return R.toPairs(_css)
    .map(([a, b]) => `${a}:${b}`)
    .join(";");
}

// 压缩styles object, 注意这个压缩只适用于某些场合, 比如 richeditor 等固定场合
// 因为它会删除默认值 ( text-align: left 等)
export function condenseStyles(styles: CSSProperties): CSSProperties {
  const withNulls = R.map((v: any, k: string) => {
    if (["text-indent", "textIndent"].includes(k)) {
      const iv = parseInt(v + "");
      return isNaN(iv) || iv === 0 ? null : v;
    } else if (["text-align", "textAlign"].includes(k)) {
      return ["left", ""].includes(v) ? null : v;
    } else {
      return v;
    }
  }, styles);

  return removeNils(withNulls);
}

/************ 工具方法, 对某个元素进行css操作 ********************** */
// 避免在 timer 未到600ms, 发生2次点击(此时取到的background是错的)
let highlighting: HTMLElement[] = [];
export function highlight(el: HTMLElement, color = "#FFFDD0") {
  if (highlighting.includes(el)) return;
  highlighting.push(el);

  const oldBackgroundColor = el.style.backgroundColor;
  css(el, "transition", "background-color ease 0.5s");
  css(el, "backgroundColor", color);
  setTimeout(() => {
    css(el, "backgroundColor", oldBackgroundColor);
    css(el, "transition", "");
    highlighting = highlighting.filter((it) => it !== el);
  }, 600);
}

/**
 * 从对象表示的style中获取margin
 * @param style 对象表示的style
 * @param singular 是否返回单一值 ( 如果为false, 表示返回数组 )
 */
export function getMarginFromStyle(
  style: CSSProperties,
  singular: boolean = true
): number | number[] {
  const marginLeft = getNumberOrElse(style, "marginLeft", 0);
  const marginRight = getNumberOrElse(style, "marginRight", 0);
  const marginTop = getNumberOrElse(style, "marginTop", 0);
  const marginBottom = getNumberOrElse(style, "marginBottom", 0);
  const marginLRTB = [marginTop, marginRight, marginBottom, marginLeft];

  const oMargin = getOrElse(style, "margin", 0) + "";
  const oMargins = oMargin.split(" ").map((x) => parseInt(x));
  const margin4 =
    oMargins.length === 1
      ? R.repeat(oMargins[0], 4)
      : oMargins.length === 2
      ? [...oMargins, ...oMargins]
      : oMargins.length === 3
      ? [...oMargins, oMargins[1]]
      : [...oMargins];

  const margins = R.map((i) => marginLRTB[i] || margin4[i], R.range(0, 4));

  return singular ? margins[0] : margins;
}

export function reactStyle2style(reactStyle: Record<string, any>): string {
  return Object.keys(reactStyle || {}).reduce((acc, k) => {
    const v = reactStyle[k];
    return `${acc}${camel2snake(k)}:${v};\n`;
  }, "");
}

export function style2ReactStyle(style: string): Record<string, any> {
  const s = remove(
    (style || "").split(";"),
    (el) => (el as string).trim() === ""
  );
  return s
    .map((it) => it.split(":"))
    .filter((el) => el.length === 2)
    .map(([a, b]) => [a.trim(), b.trim()])
    .reduce((acc, [k, v]) => {
      return {
        ...acc,
        [snake2camel(k)]: /^[\d|\.]+$/.test(v) ? parseFloat(v) : v,
      };
    }, {});
}

export function isDimStyleKey(k: string): boolean {
  const regs = [/width/i, /height/i, /padding/i, /margin/i];
  return regs.some((reg) => reg.test(k));
}

export function normalizeReactStyle(style: CSSProperties): CSSProperties {
  return R.map((v: any, k: string) => {
    return isDimStyleKey(k) && isNumberLike(v) ? `${v}px` : v;
  }, style);
}

export function normalizeDimValue(_v: any): string | undefined {
  const v = R.is(String, _v) ? _v.trim() : _v;
  if (["auto", "inherit"].includes(v)) return v;
  const regs = ["px", "pt", "rev", "em", "%"].map(
    (unit) => new RegExp(`^[\\d|\\.]+${unit}$`)
  );
  return isNumberLike(v)
    ? ensureSuffix(v, "px")
    : regs.some((reg) => reg.test(v))
    ? v
    : undefined;
}
