import * as R from "rambdax";

// memory: 不要使用DomParser, 原因是: 校验更严格, 甚至 "<p>1</p><p>2</p>"也无法能通过(必须要有root)
// withRoot: 是否保留div根结点 ? 对于prosemirror需要保留
export function string2domNode(
  s: string,
  withRoot: boolean = false
): HTMLElement {
  const div = document.createElement("div");
  div.innerHTML = s;
  return withRoot ? div : (div.firstChild as HTMLElement);
}

// text 可能为数字 + 字符 + 汉字
// 也可能为html, 可能为多段文本
export const getTextSize = (
  text: string,
  styles: { fontSize: string; fontFamily?: string }
): { w: number; h: number } => {
  const span = document.createElement("span");
  span.innerText = text;
  span.style.display = "fixed";
  span.style.left = "-1000000px";
  span.style.color = "transparent";
  span.style.fontSize = styles.fontSize;
  (span.style.fontFamily = styles.fontFamily || "宋体"),
    document.body.appendChild(span);
  const box = span.getBoundingClientRect();
  const size = { w: box.width, h: box.height };
  document.body.removeChild(span);
  return size;
};

export function getAttrFromHtmlStr(rawHtml: string, attr: string) {
  const r = new RegExp(`${attr}[\\s]*?=[\\s]*?["']([\\s\\S]+?)["']`);
  const v = rawHtml.match(r);
  return v && v[1];
}

// 获取全部 src, 通常用于替换src , 比如从 base64 换为 http
export function getAllSrcsFromHtmlStr(rawHtml: string) {
  const r = new RegExp(`src[\\s]*?=[\\s]*?["']([\\s\\S]+?)["']`, "g");
  const v = rawHtml.match(r);
  if (v) {
    return v.map((_match) => getAttrFromHtmlStr(_match, "src"));
  } else {
    return null;
  }
}

export function stripHtmlTag(s: string) {
  return s
    .replace(/<style>[\s\S]*?<\/style>/g, (_) => "")
    .replace(/<script>[\s\S]*?<\/script>/g, (_) => "")
    .replace(/^[\s]*?</g, (_) => "<")
    .replace(/>[\s]*?$/g, (_) => ">")
    .replace(/>[\s]*?</g, (_) => "><")
    .replace(/<[^>]+?>/g, (_) => "");
}

// 这是一个可变方法!!!, 最终将修改doc
export function renameTag_danger(
  doc: HTMLElement,
  fromSelector: string,
  toTag: string
) {
  const nodes = Array.from(doc.querySelectorAll(fromSelector));
  // 必须要倒序! 避免 <div 1> <div 11> <div 111></div></div></div> 这样的嵌套情况 ( 应先运算 div 111 )
  R.reverse(nodes).forEach((node) => {
    const newNode = document.createElement(toTag);
    node.getAttributeNames().forEach((attrKey: string) => {
      newNode.setAttribute(attrKey, node.getAttribute(attrKey)!);
    });
    newNode.innerHTML = node.innerHTML;
    node.replaceWith(newNode);
  });
  return doc;
}
