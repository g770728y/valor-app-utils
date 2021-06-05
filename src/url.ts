import { sliceBy } from "./array";

export function getRelativePath(
  url: string,
  basePath: string,
  options?: { keepLeadingSlash?: boolean; keepQuery?: boolean }
): string {
  const keepLeadingSlash =
    options?.keepLeadingSlash === undefined ? true : false;
  const keepQuery = options?.keepQuery === undefined ? true : false;

  if (basePath.length > 1 && !basePath.startsWith("/")) {
    throw new Error(`basePath必须以\/号开始`);
  }

  let path = sliceBy(url, { from: "//" }) || url;
  path = path.startsWith("//") ? path.slice(2) : path;

  let basePath_ = basePath.startsWith("/") ? basePath.slice(1) : basePath;
  basePath_ = basePath_.endsWith("/")
    ? basePath_.slice(0, basePath_.length - 1)
    : basePath_;

  let result = path.replace(basePath_, "");
  result = keepLeadingSlash
    ? "/" + result
    : result.startsWith("/")
    ? result.slice(1)
    : result;
  result = keepQuery ? result : sliceBy(result, { to: "?" }) || result;

  return result.replace(/[\/]{2,}/g, "/");
}
