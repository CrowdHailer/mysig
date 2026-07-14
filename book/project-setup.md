# Project Setup

Create a JavaScript-target Gleam project and add Mysig plus the libraries used by the current SSG helpers.

```sh
gleam new my_site
cd my_site
gleam add mysig lustre simplifile filepath snag
```

For Markdown/Djot content, Mysig currently uses Pamphlet from this workspace. In this repository that dependency is configured as:

```toml
pamphlet = { path = "../spotless_server/packages/pamphlet" }
```

For Mysig asset bundling and image resizing on Node, install the Node dependencies used by the runner:

```sh
npm install --save-dev @rollup/plugin-node-resolve @zip.js/zip.js chokidar rollup sharp
```

Use these generated directories and ignore them in git:

```gitignore
build
public
node_modules
```

## Minimal Main Module

```gleam
import gleam/io
import mysig/ssg
import simplifile

pub fn main() {
  let assert Ok(Nil) = simplifile.create_directory_all("public")
  let assert Ok(files) = ssg.passthrough_files("static", "public")
  let assert Ok(Nil) = ssg.write_files(files, ".")
  io.println("Built site in public/")
}
```

This copies everything under `static/` into `public/`. From there, add pages and collections.
