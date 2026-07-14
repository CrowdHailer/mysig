import gleam/dynamic.{type Dynamic}
import gleam/javascript/promise.{type Promise}
import gleam/result
import gleam/string
import simplifile
import snag

@external(javascript, "../../midas_node_rollup_ffi.mjs", "iife")
pub fn iife(input: String) -> Promise(Result(String, Dynamic))

pub fn bundle_fn(root, file, func) {
  let export_filename = "rollup_export.js"
  let export_path = string.concat([root, "/", export_filename])
  let export_content =
    "import { " <> func <> " } from \"./" <> file <> "\";\n" <> func <> "()"
  let assert Ok(Nil) = simplifile.write(export_path, export_content)
  use code <- promise.map(iife(export_path))
  code
  |> result.map_error(fn(err) { snag.new(string.inspect(err)) })
}
