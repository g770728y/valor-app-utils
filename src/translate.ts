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
  10: "十",
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

// 0 => 0
// a => 16
// b => 17
// z => 35
// 10 => 36
// ...
export function parseInt36(s: string): number {
  const ss = s.toLowerCase().split("").reverse();
  let result = 0;
  for (let i = 0; i < ss.length; i++) {
    const code = ss[i].charCodeAt(0);
    if (code <= 57 && code >= 48) {
      // 0-9
      result += parseInt(ss[i]) * Math.pow(36, i);
    } else if (code >= 97 && code <= 122) {
      // a-z
      result += (code - 97 + 10) * Math.pow(36, i);
    } else {
      throw new Error(
        `parseInt36暂时只支持: a1, 11, 1a, 1a1 这样仅由字母和数字组成的字符串, 接收到:${s}`
      );
    }
  }

  return result;
}
