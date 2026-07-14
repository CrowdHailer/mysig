import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $shellout from "../../../shellout/shellout.mjs";
import * as $snag from "../../../snag/snag.mjs";
import { Ok, toList } from "../../gleam.mjs";

export function build_js(root) {
  let result = $shellout.command(
    "gleam",
    toList(["build", "--target=javascript"]),
    root,
    toList([]),
  );
  if (result instanceof Ok) {
    let dir = $string.append(root, "/build/dev/javascript");
    return new Ok(dir);
  } else {
    return $snag.error("failed to bundle javascript");
  }
}
