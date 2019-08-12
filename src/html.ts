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

  const pairs = s1.split(';').map(it => it.split(':'));

  return fromPairs(pairs as any);
}

// text 可能为数字 + 字符 + 汉字
// 也可能为html, 可能为多段文本
export const getTextSize = (
  text: string,
  styles: { fontSize: string; fontFamily?: string }
): { w: number; h: number } => {
  const span = document.createElement('span');
  span.innerText = text;
  span.style.display = 'fixed';
  span.style.left = '-1000000px';
  span.style.color = 'transparent';
  span.style.fontSize = styles.fontSize;
  (span.style.fontFamily = styles.fontFamily || '宋体'),
    document.body.appendChild(span);
  const box = span.getBoundingClientRect();
  const size = { w: box.width, h: box.height };
  document.body.removeChild(span);
  return size;
};
