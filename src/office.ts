import { stripHtmlTag } from ".";
import { toHzNumber } from "./translate";
import * as R from "rambda";

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

// 根据模板生成章节号
export function renderCatalogNo(template: string, paths: number[]) {
  const index = paths[paths.length - 1];
  const level = paths.length;
  const num_of_n = R.match(/({n})/g, template).length;

  if (paths.length > level)
    throw new Error(
      "模板分配错误! 路径长度不得大于level, 比如第3级不得出现1.1.1.1"
    );
  const _paths = paths.slice(level - num_of_n);
  let i = 0;
  return template
    .replace("{N}", toHzNumber(index) + "")
    .replace(/({n})/g, _ => _paths[i++] + "");
}
