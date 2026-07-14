import * as $array from "../../../../gleam_javascript/gleam/javascript/array.mjs";
import * as $promise from "../../../../gleam_javascript/gleam/javascript/promise.mjs";
import * as $json from "../../../../gleam_json/gleam/json.mjs";
import * as $dynamic from "../../../../gleam_stdlib/gleam/dynamic.mjs";
import * as $option from "../../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../../gleam_stdlib/gleam/option.mjs";
import { object_store_get_all as get_all, object_store_put as do_put } from "../../../plinth_indexeddb_ffi.mjs";

export { get_all };

export function put(object_store, item, key) {
  let _block;
  if (key instanceof Some) {
    let key$1 = key[0];
    _block = $json.string(key$1);
  } else {
    _block = $json.null$();
  }
  let key$1 = _block;
  return do_put(object_store, item, key$1);
}
