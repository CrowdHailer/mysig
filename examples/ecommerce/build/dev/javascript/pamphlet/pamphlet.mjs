import * as $jot from "../jot/jot.mjs";
import { Ok, toList } from "./gleam.mjs";
import * as $document from "./pamphlet/document.mjs";

export function parse(text) {
  let $ = $document.take_frontmatter(text);
  if ($ instanceof Ok) {
    let meta = $[0][0];
    let body = $[0][1];
    return [$document.parse_frontmatter(meta), $jot.parse(body)];
  } else {
    return [toList([]), $jot.parse(text)];
  }
}
