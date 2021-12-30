import { sum } from ".";

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

// 1 < 1.1
// 1.1 < 1.1.1
// 1.1.1 < 1.1.2
// 1.1.2 < 2
export function compareVersionNumber(v1: string, v2: string) {
  // 最多比较5位,
  const MAX_SEGMENGT_SIZE = 5;
  // 每段最大长度4位即9999
  const SEGMENT_LEN = 4;
  console.log("36:", to36(v1.split(".")), to36(v2.split(".")));
  return to36(v1.split(".")) - to36(v2.split("."));

  function to36(xs1: string[]): number {
    // 左移8位是65536即0x10000, 相当于每段最大数字为9999
    return sum(
      xs1.map(
        (x, i) =>
          parseInt(x) *
          Math.pow(Math.pow(10, SEGMENT_LEN), MAX_SEGMENGT_SIZE - i)
      )
    );
  }
}
