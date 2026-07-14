import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $child_process from "../../../plinth/plinth/node/child_process.mjs";

export function open(url) {
  let command = $string.append("open ", $string.inspect(url));
  return $child_process.exec(command);
}
