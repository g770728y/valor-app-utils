import * as R from "rambdax";

/// 获取rowspan/colspan
/// 根据 comparer(row1, row2),确定是否要合并
/// 返回 [2,0,1] 之类的数据, 其中rowspan=0表示此行应该删除(antd默认)
export function getSpanSeq<T>(
  arr: T[],
  comparer: (a1: T, a2: T) => boolean
): number[] {
  const result = R.repeat(0, arr.length) as number[];

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    let rowSpan = 1;
    const i0 = i;

    while (i + 1 < arr.length && comparer(item, arr[i + 1])) {
      rowSpan++;
      i++;
    }

    result[i0] = rowSpan;
  }
  return result;
}
