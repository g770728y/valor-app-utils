import { max } from "./math/arithmetic";

export function nextArrayId(arr: { id: number; [k: string]: any }[]) {
  return arr.length === 0 ? 1 : max(arr.map((it) => it.id)) + 1;
}

export function nextStrArrayId(
  arr: string[],
  prefix: string,
  separator: string = "_"
): string {
  const seq =
    max(
      arr
        .map((it) => it.split(separator))
        // 排除 prefix_ / _seq
        .filter(([_prefix, seqStr]) => _prefix && seqStr)
        .filter(([_prefix, seqStr]) => _prefix === prefix)
        .map(([_, seqStr]) => parseInt(seqStr))
        .filter((seq) => !isNaN(seq)),
      0
    ) + 1;
  return prefix + separator + seq;
}

function idGenerator() {
  let id = 1;
  return function() {
    return id++;
  };
}
export const nextId = idGenerator();

// 与number型分开, 避免调用时去转类型
// 另外, 由于可以prefix, 可以按类型命名, 比如:
// const nextId_name = stringGenerator('name_')
// const nextId_age = stringGenerator('age_')
export function stringIdGenerator(prefix: string) {
  let id = 1;
  return function(_prefix?: string) {
    return `${_prefix || prefix}${id++}`;
  };
}
export const nextStringId = stringIdGenerator("id_");

////////////////////////////// 以下从https://github.com/zhaixiaowai/shortGuid/blob/master/src/shortguid.js复制而来//////////////////
// 用于将 36位uuid  缩短为22位uuid, 并且支持从22位还原到36位uuid
// 用法:
/*
ShortGuid.short("3ec6ecc0-8698-4d83-8020-caec0d143a43");
//"0_nkp0XfXDWu0WokmD53f3"
ShortGuid.restore(ShortGuid.short("3ec6ecc0-8698-4d83-8020-caec0d143a43"))==="3ec6ecc0-8698-4d83-8020-caec0d143a43";
//true
*/
const conversionChar =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-";
let _conversionCharIndex: any;
const getConversionCharIndex = function() {
  if (_conversionCharIndex) return _conversionCharIndex;
  _conversionCharIndex = {};
  for (let index = 0; index < conversionChar.length; index++) {
    const char0 = conversionChar[index];
    _conversionCharIndex[char0] = index;
  }
  return _conversionCharIndex;
};

// 将
export class ShortGuid {
  /**
   * 简化guid,缩短到22位
   * @param {string} guid
   */
  static short(guid: string) {
    if (guid.length !== 36) {
      throw "guid格式异常";
    }
    let value = "0" + guid.replace(/-/g, "");
    if (value.length !== 33) {
      throw "guid格式异常";
    }
    let result = "";
    for (let index = 0; index < 11; index++) {
      let start = index * 3;
      const str = parseInt(
        value[start] + value[start + 1] + value[start + 2],
        16
      );
      result += conversionChar[Math.floor(str / 64)] + conversionChar[str % 64];
    }
    return result;
  }
  /**
   * 复原guid
   * @param {string} shortGuid
   */
  static restore(shortGuid: string) {
    if (shortGuid.length !== 22) throw "short-guid格式异常";
    let conversionCharIndex = getConversionCharIndex();
    let result = "";
    for (let index = 0; index < 22; index += 2) {
      let u = (
        conversionCharIndex[shortGuid[index]] * 64 +
        conversionCharIndex[shortGuid[index + 1]]
      )
        .toString(16)
        .padStart(3, "0");
      if (index === 0 && u[0] === "0") {
        u = u.substr(1);
      }
      result += u;
    }
    return `${result.substr(0, 8)}-${result.substr(8, 4)}-${result.substr(
      12,
      4
    )}-${result.substr(16, 4)}-${result.substr(20)}`;
  }
}
