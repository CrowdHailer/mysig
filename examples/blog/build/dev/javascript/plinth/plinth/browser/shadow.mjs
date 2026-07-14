import * as $array from "../../../gleam_javascript/gleam/javascript/array.mjs";
import * as $dynamic from "../../../gleam_stdlib/gleam/dynamic.mjs";
import * as $decode from "../../../gleam_stdlib/gleam/dynamic/decode.mjs";
import { DecodeError } from "../../../gleam_stdlib/gleam/dynamic/decode.mjs";
import { Ok, Error, toList, CustomType as $CustomType } from "../../gleam.mjs";
import * as $element from "../../plinth/browser/element.mjs";
import {
  cast as do_cast,
  appendChild as append_child,
  attachShadow as attach_shadow,
  shadowRoot as shadow_root,
  host,
  querySelector as query_selector,
  querySelectorAll as query_selector_all,
} from "../../shadow_ffi.mjs";

export {
  append_child,
  attach_shadow,
  host,
  query_selector,
  query_selector_all,
  shadow_root,
};

export class Open extends $CustomType {}
export const Mode$Open = () => new Open();
export const Mode$isOpen = (value) => value instanceof Open;

export class Closed extends $CustomType {}
export const Mode$Closed = () => new Closed();
export const Mode$isClosed = (value) => value instanceof Closed;

export function cast(raw) {
  let $ = do_cast(raw);
  if ($ instanceof Ok) {
    return $;
  } else {
    return new Error(
      new DecodeError("ShadowRoot", $dynamic.classify(raw), toList([])),
    );
  }
}
