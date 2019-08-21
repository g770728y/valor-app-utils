export function replaceAll(s: string, from: string, to: string): string {
  return s.split(from).join(to);
}
