import { sliceBy } from "./array";
import * as R from "rambdax";

export function querystring(s: string): Record<string, string> {
  const ss = s.includes("http")
    ? (sliceBy(s, { from: "?" }) || sliceBy(s, { from: "#" })).slice(1)
    : s;
  return R.fromPairs(
    decodeURIComponent(ss)
      .split("&")
      .map((segment) =>
        segment && segment.includes("=") ? segment.split("=") : ([] as any)
      )
  );
}
