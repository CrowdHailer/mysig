import * as $fetch from "../../../gleam_fetch/gleam/fetch.mjs";
import * as $promise from "../../../gleam_javascript/gleam/javascript/promise.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $snag from "../../../snag/snag.mjs";

export function send(request) {
  return $promise.map(
    $fetch.send(request),
    (result) => {
      return $result.map_error(
        result,
        (reason) => { return $snag.new$($string.inspect(reason)); },
      );
    },
  );
}

export function read_text(response) {
  return $promise.map(
    $fetch.read_text_body(response),
    (result) => {
      return $result.map_error(
        result,
        (reason) => { return $snag.new$($string.inspect(reason)); },
      );
    },
  );
}

export function read_json(response) {
  return $promise.map(
    $fetch.read_json_body(response),
    (result) => {
      return $result.map_error(
        result,
        (reason) => { return $snag.new$($string.inspect(reason)); },
      );
    },
  );
}
