# midas_node

Run [midas](https://github.com/midas-framework/midas) tasks on nodejs.
midas_node supports all of the defined effects in the latest version of the midas library.

[![Package Version](https://img.shields.io/hexpm/v/midas_node)](https://hex.pm/packages/midas_node)
[![Hex Docs](https://img.shields.io/badge/hex-docs-ffaff3)](https://hexdocs.pm/midas_node/)

## Dependencies

Install the required dependencies for the node environment as well as the gleam dependency

```sh
npm install --save @zip.js/zip.js rollup @rollup/plugin-node-resolve chokidar
gleam add midas_node
```

## Run a task once

Use `node.run` with a task and root position in the file system.
All calls to `Read` `Write` or `List` (contents of a directory) are relative to this path.

```gleam
import midas/node

pub fn main() {
  let task = // a midas task
  node.run(task, "/root")
}
```

## Watch a task

Use `node.watch` to run a task and the rerun it when required in response to changes on the filesystem.
See the following example in the [example](./example) directory.

```gleam
import midas/node

// print the reason for a task failing
fn callback(result) {
  case result {
    Ok(Nil) -> Nil
    Error(reason) -> io.println(snag.pretty_print(reason))
  }
}

pub fn main() {
  let task = {
    use src <- t.do(t.bundle("example/client", "run"))
    use page <- t.do(t.read("src/index.html"))
    t.done([#("/", page), #("/main.js", <<src:utf8>>)])
  }
  node.watch(task, "/root", callback)
}
```

[Watch me talk through this example](https://vimeo.com/1030747035)

**Note: watch is lazy**, and will only rerun the task from the point where a file has changed.
In the previous example if `index.html` is changed then the project will not be rebundled.
This makes watch more responsive. To get the most out response watch pipeline put slow tasks earlier in the task.
(asynchrony is coming soon to make things even faster but the API is still being finalised)

The result of calls to HTTP fetch are assumed unchanged so will be rerun if only a previous files value has changed.

Further documentation can be found at <https://hexdocs.pm/midas_node>.

## Development

```sh
gleam run   # Run the project
gleam test  # Run the tests
```
