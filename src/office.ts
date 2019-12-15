import { stripHtmlTag } from ".";

export function isCopyFromWord(s: string): boolean {
  return (
    (!!s && s.includes("urn:schemas-microsoft-com:office:word")) ||
    s.includes('content="Word.Document"')
  );
}

export function stripWordTag(s: string): string {
  const regexp = /<!--StartFragment-->([\s\S]*?)<!--EndFragment-->/g;
  const matched = regexp.exec(s);
  return matched && matched.length >= 0 ? stripHtmlTag(matched[1]) : "";
}
