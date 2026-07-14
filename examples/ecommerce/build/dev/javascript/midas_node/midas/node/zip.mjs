import * as $array from "../../../gleam_javascript/gleam/javascript/array.mjs";
import * as $promise from "../../../gleam_javascript/gleam/javascript/promise.mjs";
import { zipItems as do_zip } from "../../midas_node_zip_ffi.mjs";

export function zip(files) {
  return do_zip($array.from_list(files));
}
