export function formatNumber(n: number, precision: number) {
  return Math.round(n * Math.pow(10, precision)) / Math.pow(10, precision) + '';
}

export function formatPercent(n: number, precision: number) {
  return (
    Math.round(n * Math.pow(10, precision + 2)) / Math.pow(10, precision) + '%'
  );
}

export function formatPermillage(n: number, precision: number) {
  return (
    Math.round(n * Math.pow(10, precision + 3)) / Math.pow(10, precision) + '‰'
  );
}
