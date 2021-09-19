import * as R from "rambdax";
import { sliceBy } from "./array";

export function humanReadableCapacity(b: number): string {
  return b < Math.pow(10, 3)
    ? `${b}B`
    : b < Math.pow(10, 6)
    ? `${Math.round(b / Math.pow(10, 2)) / 10}KB`
    : b < Math.pow(10, 9)
    ? `${Math.round(b / Math.pow(10, 5)) / 10}MB`
    : `${Math.round(b / Math.pow(10, 8)) / 10}GB`;
}

export function filename(path: string): string | null {
  const result = R.match(/\/([^\/]+)$/, path);
  return result
    ? result[1] && result[1].includes("?")
      ? sliceBy(result[1], { to: "?" })
      : result[1]
    : null;
}

// 为什么要有本方法?
// <a href="http://....svg" download>下载</a>
// 将无法正常使用, 因为 href 跨域 ( 2018 年 chrome 禁止)
// 以下方法来自: https://stackoverflow.com/questions/17527713/force-browser-to-download-image-files-on-click/49836565#49836565
function toDataURL(url: string) {
  return fetch(url)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      return URL.createObjectURL(blob);
    });
}
export function download(url: string, fileName?: string) {
  toDataURL(url).then((hrefDataUrl) => {
    const a = document.createElement("a");
    a.href = hrefDataUrl;
    a.download = fileName || filename(url) || "file";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}

export function getFileExt(fileName: string): string | null {
  const lastIndex = fileName.lastIndexOf(".");
  return lastIndex < 0
    ? null
    : lastIndex === fileName.length - 1
    ? ""
    : fileName.slice(lastIndex + 1);
}
