export function isDescendant(
  el: HTMLElement | string,
  maybeAncestorEl: HTMLElement | string
): boolean {
  const _el: HTMLElement =
    typeof el === "string" ? document.getElementById(el)! : el;
  const _maybeAncestorEl: HTMLElement =
    typeof maybeAncestorEl === "string"
      ? document.getElementById(maybeAncestorEl)!
      : maybeAncestorEl;
  if (!_el || !_maybeAncestorEl) return false;

  return (
    _el.parentElement === maybeAncestorEl ||
    isDescendant(_el.parentElement!, maybeAncestorEl)
  );
}
/**
 * 在caretContainer内设置光标, 然后移开
 * 在另一个容器里输入html字符串, 如  html = <span>111</span>孤立文本<span>222</span>
 * 点击一个按钮, 调用此方法
 * 结果: 将恢复光标到caretContainer内, 并在之前的光标位置插入html字符串的内容
 * @param html 要插入的html字符串
 * @param caretContainer 光标所在容器(html字符串将插入此处), 只能是div.contentEditable=true, 不能是input/textarea
 * @return
 */
export function insertHtmlStr_to_editableCaretContainer(
  html: string,
  caretContainer: HTMLElement
) {
  if (
    !caretContainer ||
    caretContainer instanceof HTMLInputElement ||
    caretContainer instanceof HTMLTextAreaElement
  ) {
    console.error(
      "caretContainer不能是input/textarea, 因这类容器无法接受html, 只能接受纯文本"
    );
    return;
  }
  if (caretContainer.getAttribute("contenteditable") !== "true") {
    console.error("caretContainer必须是<div contentEditable=true></div>的风格");
    return;
  }

  // 将html转化为nodes
  const _div = document.createElement("div");
  _div.innerHTML = html;

  caretContainer.focus();
  const selection = window.getSelection();
  if (!selection) return;
  const range = selection.getRangeAt(0);
  if (!range.startContainer || !caretContainer.contains(range.startContainer)) {
    console.warn(
      "意外: insertHtmlStr_to_editableCaretContainer方法中, 当focus到container时, range.startContainer不在container内"
    );
    return;
  }
  range.deleteContents();
  _div.childNodes.forEach((child, i) => {
    range.insertNode(child.cloneNode(true));
    // 必须折叠到最后, 否则顺序会颠倒
    range.collapse();
  });
}
