import * as R from "rambdax";
import { padding } from ".";

export function replaceAll(s: string, from: string, to: string): string {
  return s.split(from).join(to);
}

export function camel2snake(s: string): string {
  return s.replace(/[A-Z]{1}/g, (x) => "-" + x.toLowerCase()).replace(/^-/, "");
}
export function snake2camel(s: string): string {
  return s.replace(/-[a-z]{1}/g, (x) => x[1].toUpperCase());
}

export function isNumberLike(s: any): boolean {
  return R.is(Number, s) || /^[\d|\.]+$/.test(s);
}

export function ensureSuffix(_s: any, suffix: string): string | undefined {
  const s = R.is(String, _s) ? _s.trim() : _s;
  if (R.isNil(s) || s === "") return undefined;

  const reg = new RegExp(`^[\\d|\\.]+${suffix}$`);
  return R.is(Number, s) || /^[\d|\.]+$/.test(s)
    ? `${s}${suffix}`
    : reg.test(s)
    ? s
    : undefined;
}

export function getIgnoreBlank(
  s: string | null | undefined,
  defaultValue?: string
): string | undefined {
  const ss = (s || "").trim();
  return ss.length > 0 ? ss : defaultValue || undefined;
}

export function sortNo(nos: string[], separater = "."): string[] {
  return nos
    .map((no) => no.split(".").map((it) => parseInt(it)))
    .map((it) => ({ origin: it, normalized: padding(it, 10, () => 0) }))
    .sort((a, b) => sortArrayOneByOne(a.normalized, b.normalized))
    .map((it) => it.origin.join("."));
}

export function sortArrayOneByOne(xs1: number[], xs2: number[]): number {
  if (xs1.length !== xs2.length)
    throw new Error("sortArrayOneByOne数组长度必须相等");
  for (let i = 0; i < xs1.length; i++) {
    const x1 = xs1[i],
      x2 = xs2[i];
    if (x1 - x2 !== 0) return x1 - x2;
  }
  return 0;
}
