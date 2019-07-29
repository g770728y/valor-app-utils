export function min(xs: number[]) {
  return xs.reduce((acc: number, x: number) => Math.min(acc, x), Infinity);
}

export function max(xs: number[]) {
  return xs.reduce((acc: number, x: number) => Math.max(acc, x), -Infinity);
}
