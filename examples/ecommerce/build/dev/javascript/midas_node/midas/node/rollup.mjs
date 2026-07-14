import * as $promise from "../../../gleam_javascript/gleam/javascript/promise.mjs";
import * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $simplifile from "../../../simplifile/simplifile.mjs";
import * as $snag from "../../../snag/snag.mjs";
import { Ok, toList, makeError } from "../../gleam.mjs";
import { iife } from "../../midas_node_rollup_ffi.mjs";

export { iife };

const FILEPATH = "src/midas/node/rollup.gleam";

export function bundle_fn(root, file, func) {
  let export_filename = "rollup_export.js";
  let export_path = $string.concat(toList([root, "/", export_filename]));
  let export_content = ((((("import { " + func) + " } from \"./") + file) + "\";\n") + func) + "()";
  let $ = $simplifile.write(export_path, export_content);
  if (!($ instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "midas/node/rollup",
      16,
      "bundle_fn",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 529, end: 595, pattern_start: 540, pattern_end: 547 }
    )
  }
  return $promise.map(
    iife(export_path),
    (code) => {
      let _pipe = code;
      return $result.map_error(
        _pipe,
        (err) => { return $snag.new$($string.inspect(err)); },
      );
    },
  );
}
