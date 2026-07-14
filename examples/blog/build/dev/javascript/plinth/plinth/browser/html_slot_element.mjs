import * as $array from "../../../gleam_javascript/gleam/javascript/array.mjs";
import * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.mjs";
import * as $decode from "../../../gleam_stdlib/gleam/dynamic/decode.mjs";
import { DecodeError } from "../../../gleam_stdlib/gleam/dynamic/decode.mjs";
import { Ok, Error, toList } from "../../gleam.mjs";
import { cast as do_cast, assignedElements as assigned_elements } from "../../html_slot_element_ffi.mjs";
import * as $element from "../../plinth/browser/element.mjs";

export { assigned_elements };

export function cast(raw) {
  let $ = do_cast(raw);
  if ($ instanceof Ok) {
    return $;
  } else {
    return new Error(
      new DecodeError("Element", $dynamic.classify(raw), toList([])),
    );
  }
}
