export function nop(...args: any) {}

export function getFunctionParamsFromStr(s: string): string[] {
  const match = /function[\s]*\(([^)]*)\)/.exec(s);
  if (!match) throw new Error('函数无效');
  const _params = match[1].split(',');
  const params = _params.map(it => it.trim()).filter(Boolean);
  console.log('paramStr', params);
  return params;
}

export function getFunctionBodyFromStr(s: string): string {
  const match = /function[\s]*\([^)]*\)[^{]*{([\s\S]*)}\s*$/.exec(s);
  if (!match) throw new Error('函数无效');
  return match[1];
}

export function invoke(s: string, ...args: any[]) {
  if (!s) throw new Error('函数体不能为空');
  const argDefs = getFunctionParamsFromStr(s);
  const f = new Function(...argDefs, getFunctionBodyFromStr(s));
  return f.apply(null, args);
}
