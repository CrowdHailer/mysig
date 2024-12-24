import example/routes/home
import gleam/io
import gleam/javascript/array
import gleam/javascript/promise
import gleam/list
import gleam/string
import mysig/dev
import plinth/node/process

pub fn main() {
  do_main(list.drop(array.to_list(process.argv()), 2))
}

fn do_main(args) {
  case args {
    [] as args | ["develop", ..args] -> develop(args)
    _ -> {
      io.println("no runner for: " <> args |> string.join(" "))
      process.exit(1)
      promise.resolve(1)
    }
  }
}

fn develop(_args) {
  dev.serve(home.route())
  promise.resolve(0)
}
