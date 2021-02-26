import * as R from "rambdax";

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
