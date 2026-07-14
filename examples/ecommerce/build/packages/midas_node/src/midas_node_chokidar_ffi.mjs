import chokidar from 'chokidar';

export function watch(initial) {
  return chokidar.watch(initial)
}

export function add(watcher, paths) {
  watcher.add(paths)
}

export function on_all(watcher, callback) {
  watcher.on("all", callback)
}

export function unwatch(watcher, paths) {
  watcher.unwatch(paths)
}
