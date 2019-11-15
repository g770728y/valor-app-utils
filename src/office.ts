export function isCopyFromWord(s: string): boolean {
  return !!s && s.includes("urn:schemas-microsoft-com:office:word");
}
