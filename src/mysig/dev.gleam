import gleam/io
import gleam/javascript/array
import gleam/javascript/promise
import gleam/list
import gleam/option.{Some}
import gleam/string
import midas/node
import midas/task as t
import mysig/asset
import mysig/example/app
import mysig/local
import plinth/node/process
import snag

fn preview() {
  let bundle = asset.new_bundle("/assets")
  use examples <- t.do(app.page(bundle))

  let pages = [#("/index.html", examples), ..asset.to_files(bundle)]
  use Nil <- t.do(local.serve(Some(8080), pages))
  use Nil <- t.do(t.log("serving on 8080"))
  t.done(Nil)
}

// stream and check e-tag
pub fn main() {
  let args = list.drop(array.to_list(process.argv()), 2)
  let run = case args {
    ["preview"] -> {
      node.watch(preview(), ".", fn(result) {
        case result {
          Ok(Nil) -> Nil
          Error(reason) -> io.println(snag.pretty_print(reason))
        }
      })
      // run forever
      promise.new(fn(_resolve) { Nil })
    }
    _ -> promise.resolve(snag.error("no task: " <> string.inspect(args)))
  }
  use result <- promise.map(run)
  case result {
    Ok(_) -> Nil
    // process.exit(0)
    Error(reason) -> {
      snag.pretty_print(reason)
      |> io.print
      process.exit(1)
    }
  }
}
