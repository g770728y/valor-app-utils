import { fromPairs } from 'rambda';

// memory: 不要使用DomParser, 原因是: 校验更严格, 甚至 "<p>1</p><p>2</p>"也无法能通过(必须要有root)
// withRoot: 是否保留div根结点 ? 对于prosemirror需要保留
export function string2domNode(s: string, withRoot: boolean = false): Element {
  const div = document.createElement('div');
  div.innerHTML = s;
  return withRoot ? div : (div.firstChild as Element);
}

export function serializeCSSStyle(s: string): object {
  if (!s || s.length <= 0 || !s.includes(':')) return {};

  const s1 = s.endsWith(';') ? s.slice(0, s.length - 1) : s.slice(0);

  const pairs = s.split(';').map(it => it.split(':'));

  return fromPairs(pairs as any);
}
