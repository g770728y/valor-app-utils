import { add, is } from 'rambda';

export function min(xs: number[], defaultValue?: number) {
  return xs.length === 0 && is(Number, defaultValue)
    ? defaultValue!
    : xs.reduce((acc: number, x: number) => Math.min(acc, x), Infinity);
}

export function max(xs: number[], defaultValue?: number) {
  return xs.length === 0 && is(Number, defaultValue)
    ? defaultValue!
    : xs.reduce((acc: number, x: number) => Math.max(acc, x), -Infinity);
}

export function sum(xs: any[]): number {
  return xs
    .filter(is(Number))
    .filter(Number.isFinite)
    .filter(it => !Number.isNaN(it))
    .reduce(add, 0);
}

export function safeDivide(a: any, b: any) {
  return a &&
    b &&
    is(Number, a) &&
    is(Number, b) &&
    !Number.isNaN(a) &&
    !Number.isNaN(b) &&
    b !== 0
    ? (a * 1.0) / b
    : 0;
}
