export function css(el: HTMLElement, styleName: string, styleValue: any) {
  el.style[styleName as any] = styleValue;
  return el;
}

// 避免在 timer 未到600ms, 发生2次点击(此时取到的background是错的)
let highlighting: HTMLElement[] = [];
export function highlight(el: HTMLElement, color = '#FFFDD0') {
  if (highlighting.includes(el)) return;
  highlighting.push(el);

  const oldBackgroundColor = el.style.backgroundColor;
  css(el, 'transition', 'background-color ease 0.5s');
  css(el, 'backgroundColor', color);
  setTimeout(() => {
    css(el, 'backgroundColor', oldBackgroundColor);
    css(el, 'transition', '');
    highlighting = highlighting.filter(it => it !== el);
  }, 600);
}
