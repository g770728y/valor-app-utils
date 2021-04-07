import * as R from "rambdax";

// (1-{a} , 3) => ['1-a', '1-b', '1-c']
export function createSeqByTemplate(template: string, n: number = 1): string[] {
  const variables = template.match(/\{[^}]+\}/g);
  if (!variables || variables.length <= 0)
    return R.repeat(template, n) as string[];

  const variable = variables[0].slice(1, variables[0].length - 1);
  if (/[a-zA-Z]/.test(variable)) {
    if (/\d/.test(variable)) {
      throw new Error("可变内容只能为数字或字母");
    } else if (variable.length > 1) {
      throw new Error("可变内容为只能为1位字母");
    }
  }

  const result: string[] = [];
  for (let i = 0; i < n; i++) {
    if (/\d/.test(variable)) {
      result.push(parseInt(variable, 10) + i + "");
    } else {
      // 肯定是字母
      result.push(String.fromCharCode(variable[0].charCodeAt(0) + i));
    }
  }

  const [p1, p2] = template.split(/\{[^}]+\}/);
  return result.map((it) => `${p1}${it}${p2}`);
}

// 1-a , 3 => ['1-a', '1-b', '1-c']
// 作废, 这种处理确定性太差
// export function createSeqByTemplate(template: string, n: number = 1): string[] {
//   const chars = template.split("").reverse();

//   // 例如: 我是第1-ab号梁, 分拆结果见下面的备注:
//   const numbers: string[] = []; //数字集, [], 反序
//   const letters: string[] = []; // 字母集, [ba], 反序
//   const s1: string[] = []; // [梁号], 反序
//   let s2: string[]; // [我是第1-] 正序
//   let prevType: "null" | "number" | "letter" = "null";

//   // 从 "第1-ab" 中获到到 ba, 从 第a-12 中获取到 21
//   // 注意顺序是反的!
//   let i = 0;
//   for (; i < chars.length; i++) {
//     const c = chars[i];
//     if (/\d/.test(c)) {
//       // 检测到数字, 但上轮是字母, 直接停止
//       if (prevType === "letter") {
//         break;
//       } else {
//         numbers.push(c);
//         prevType = "number";
//       }
//     } else if (/[a-zA-Z]/.test(c)) {
//       // 检测到字母, 但上轮是数字, 直接停止
//       if (prevType === "number") {
//         break;
//       } else {
//         letters.push(c);
//         prevType = "letter";
//       }
//     } else {
//       s1.push(c);
//     }
//   }

//   s2 = chars.slice(0, chars.length - i);

//   if (numbers.length > 0) {
//     const n = numbers
//       .map((it) => parseInt(it, 10))
//       .reduce((acc, item, i) => item * Math.pow(10, i) + acc);
//     console.log("n", n);
//   } else if (letters.length > 0) {
//     if (letters.length > 1) {
//       throw new Error(`暂不支持处理两位字母:${letters.reverse().join("")}`);
//     }
//     const c = letters[0].charCodeAt(0);
//     console.log('c', c);
//   } else {
//     return template;
//   }

//   return [];
// }
