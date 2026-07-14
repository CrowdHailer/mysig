import gleam/javascript/array
import gleam/javascript/promise.{type Promise}

pub fn zip(files) {
  do_zip(array.from_list(files))
}

// can't call zip as global var zip used by import
@external(javascript, "../../midas_node_zip_ffi.mjs", "zipItems")
fn do_zip(items: array.Array(#(String, BitArray))) -> Promise(BitArray)
