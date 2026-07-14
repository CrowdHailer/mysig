import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $splitter from "../../splitter/splitter.mjs";
import { Ok, Error, toList, prepend as listPrepend } from "../gleam.mjs";

/**
 * Pop frontmatter from a document.
 * 
 * Doesn't check the validity of the frontmatter.
 * User parse_frontmatter to get a list of frontmatter properties
 */
export function take_frontmatter(text) {
  let fms = $splitter.new$(toList(["---\n", "---\r\n"]));
  let $ = $splitter.split(fms, text);
  let nothing = $[0];
  let start = $[1];
  let rest = $[2];
  let $1 = (nothing !== "") || (start === "");
  if ($1) {
    return new Error(undefined);
  } else {
    let $2 = $splitter.split(fms, rest);
    let frontmatter = $2[0];
    let end = $2[1];
    let rest$1 = $2[2];
    if (end === "") {
      return new Error(undefined);
    } else {
      return new Ok([frontmatter, rest$1]);
    }
  }
}

function split_all(loop$splitter, loop$input, loop$acc) {
  while (true) {
    let splitter = loop$splitter;
    let input = loop$input;
    let acc = loop$acc;
    if (input === "") {
      return $list.reverse(acc);
    } else {
      let $ = $splitter.split(splitter, input);
      let pre = $[0];
      let post = $[2];
      loop$splitter = splitter;
      loop$input = post;
      loop$acc = listPrepend(pre, acc);
    }
  }
}

export function parse_frontmatter(text) {
  let _block;
  let _pipe = $splitter.new$(toList(["\n", "\r\n"]));
  _block = split_all(_pipe, text, toList([]));
  let lines = _block;
  return $list.filter_map(
    lines,
    (line) => {
      let $ = $string.split_once(line, ":");
      if ($ instanceof Ok) {
        let key = $[0][0];
        let value = $[0][1];
        return new Ok([key, $string.trim(value)]);
      } else {
        return new Error(undefined);
      }
    },
  );
}
