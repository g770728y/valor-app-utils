export function isDescendant(
  el: HTMLElement | string,
  maybeAncestorEl: HTMLElement | string
): boolean {
  const _el: HTMLElement =
    typeof el === 'string' ? document.getElementById(el)! : el;
  const _maybeAncestorEl: HTMLElement =
    typeof maybeAncestorEl === 'string'
      ? document.getElementById(maybeAncestorEl)!
      : maybeAncestorEl;
  if (!_el || !_maybeAncestorEl) return false;

  return (
    _el.parentElement === maybeAncestorEl ||
    isDescendant(_el.parentElement!, maybeAncestorEl)
  );
}
