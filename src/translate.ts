const alpha2Hz: { [k: number]: string } = {
  0: "0",
  1: "一",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
  6: "六",
  7: "七",
  8: "八",
  9: "九",
  10: "十"
};

export function toHzNumber(n: number) {
  if (n >= 100) throw new Error("暂不支持转化100以上数字");
  const tens = Math.floor(n / 10);
  return n <= 10
    ? alpha2Hz[n]
    : n % 10 === 0
    ? alpha2Hz[tens] + "十"
    : n < 20
    ? "十" + alpha2Hz[n % 10]
    : alpha2Hz[tens] + "十" + alpha2Hz[n % 10];
}
