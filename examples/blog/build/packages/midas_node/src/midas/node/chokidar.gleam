import gleam/io
import gleam/javascript/array.{type Array}

pub type FsWatcher

@external(javascript, "../../midas_node_chokidar_ffi.mjs", "watch")
fn do_watch(initial: Array(String)) -> FsWatcher

pub fn watch(initial) {
  do_watch(array.from_list(initial))
}

@external(javascript, "../../midas_node_chokidar_ffi.mjs", "on_all")
fn do_on_all(watcher: FsWatcher, callback: fn(String, String) -> Nil) -> Nil

pub type AllEvent {
  Add
  Change
  Unlink
  AddDir
  UnlinkDir
}

pub fn on_all(watcher, callback f) {
  do_on_all(watcher, fn(event, path) {
    case event {
      "add" -> f(Add, path)
      "change" -> f(Change, path)
      "unlink" -> f(Unlink, path)
      "addDir" -> f(AddDir, path)
      "unlinkDir" -> f(UnlinkDir, path)
      _ -> {
        io.println("unknown event: " <> event)
        Nil
      }
    }
  })
}
