import * as R from 'rambda';

export function replaceAll(s: string, from: string, to: string): string {
  return s.split(from).join(to);
}

export function camel2snake(s: string): string {
  return s.replace(/[A-Z]{1}/g, x => '-' + x.toLowerCase()).replace(/^-/, '');
}
export function snake2camel(s: string): string {
  return s.replace(/-[a-z]{1}/g, x => x[1].toUpperCase());
}

export function isNumberLike(s: any): boolean {
  return R.is(Number, s) || /^[\d|\.]+$/.test(s);
}
