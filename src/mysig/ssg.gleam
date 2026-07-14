//// Static site generation helpers for Mysig.

import filepath
import gleam/dict
import gleam/javascript/promise.{type Promise}
import gleam/list
import gleam/result
import gleam/string
import lustre/element.{type Element}
import mysig/asset/server
import mysig/dev
import mysig/route.{type Route}
import pamphlet
import pamphlet/lustre as pamphlet_lustre
import simplifile
import snag.{type Snag}

pub type File =
  #(String, BitArray)

pub type ContentPage(msg) {
  ContentPage(
    path: String,
    metadata: List(#(String, String)),
    content: Element(msg),
  )
}

pub type Layout(msg) =
  fn(ContentPage(msg)) -> Element(msg)

pub type Entry {
  Entry(path: String, output_path: String)
}

pub type CollectionPage(msg) {
  CollectionPage(
    path: String,
    output_path: String,
    metadata: List(#(String, String)),
    content: Element(msg),
  )
}

pub type CollectionLayout(msg) =
  fn(CollectionPage(msg)) -> Element(msg)

pub fn collect_files(
  root: String,
  extensions: List(String),
) -> Result(List(String), Snag) {
  use files <- result_try(walk(root))
  files
  |> list.filter(fn(path) {
    case extensions {
      [] -> True
      _ -> list.contains(extensions, extension(path))
    }
  })
  |> Ok
}

pub fn content_entries(
  root: String,
  output_root: String,
  extensions: List(String),
) -> Result(List(Entry), Snag) {
  use files <- result_try(collect_files(root, extensions))
  files
  |> list.map(fn(path) {
    Entry(
      path: path,
      output_path: filepath.join(
        output_root,
        html_path(strip_prefix(path, root)),
      ),
    )
  })
  |> Ok
}

pub fn passthrough_files(
  root: String,
  output_root: String,
) -> Result(List(File), Snag) {
  use paths <- result_try(collect_files(root, []))
  paths
  |> list.map(fn(path) {
    use bytes <- result_try(read_bits(path))
    Ok(#(filepath.join(output_root, strip_prefix(path, root)), bytes))
  })
  |> collect_results([])
}

pub fn render_collection(
  entries: List(Entry),
  layout: CollectionLayout(msg),
) -> Result(List(File), Snag) {
  entries
  |> list.map(fn(entry) {
    let Entry(path:, output_path:) = entry
    use source <- result_try(read_text(path))
    let #(metadata, document) = pamphlet.parse(source)

    let content =
      document
      |> pamphlet_lustre.to_lustre(pamphlet_lustre.default())
      |> fn(render) { render(fn(element) { element }) }

    let page =
      CollectionPage(
        path: path,
        output_path: output_path,
        metadata: metadata,
        content: content,
      )

    layout(page)
    |> element.to_document_string()
    |> fn(html) { Ok(#(output_path, <<html:utf8>>)) }
  })
  |> collect_results([])
}

pub fn render_content_file(path: String, layout: Layout(msg)) {
  use source <- result_try(read_text(path))
  Ok(render_content_string(path, source, layout))
}

pub fn render_content_string(
  path: String,
  source: String,
  layout: Layout(msg),
) {
  let #(metadata, document) = pamphlet.parse(source)

  let body =
    document
    |> pamphlet_lustre.to_lustre(pamphlet_lustre.default())
    |> fn(render) { render(fn(element) { element }) }

  let page = ContentPage(path: path, metadata: metadata, content: body)
  layout(page)
  |> element.to_document_string()
}

pub fn route_to_files(route: Route) -> Promise(Result(List(File), Snag)) {
  use files <- promise.try_await(do_route_to_files(route, "", [], dict.new()))
  promise.resolve(Ok(list.reverse(files)))
}

pub fn write_files(files: List(File), output_dir: String) -> Result(Nil, Snag) {
  case files {
    [] -> Ok(Nil)
    [#(path, bytes), ..rest] -> {
      let path = filepath.join(output_dir, path)
      use Nil <- result_try(create_directory(filepath.directory_name(path)))
      use Nil <- result_try(write_bits(path, bytes))
      write_files(rest, output_dir)
    }
  }
}

fn do_route_to_files(route: Route, path: String, files: List(File), assets) {
  let route.Route(index, items) = route
  case index {
    route.Page(page) -> {
      use result <- promise.try_await(server.build_manifest(page, assets))
      let #(content, assets) = result
      let content =
        string.replace(content, "<body>", "<body>" <> dev.manifest(assets))
      let files = [#(path <> "/index.html", <<content:utf8>>), ..files]
      do_child_routes(items, path, files, assets)
    }
    route.Static(bytes) -> {
      let files = [#(path, bytes), ..files]
      do_child_routes(items, path, files, assets)
    }
  }
}

fn do_child_routes(items, path: String, files: List(File), assets) {
  case items {
    [] -> {
      let asset_files =
        assets
        |> dict.to_list()
        |> list.map(fn(entry) {
          let #(key, #(_file, _mime, bits)) = entry
          #("/assets/" <> key, bits)
        })
      promise.resolve(Ok(list.append(asset_files, files)))
    }
    [#(segment, route), ..rest] -> {
      use files <- promise.try_await(do_route_to_files(
        route,
        path <> "/" <> segment,
        files,
        assets,
      ))
      do_child_routes(rest, path, files, assets)
    }
  }
}

fn read_text(path: String) -> Result(String, Snag) {
  case simplifile.read(path) {
    Ok(content) -> Ok(content)
    Error(reason) -> snag.error(simplifile.describe_error(reason))
  }
}

fn read_bits(path: String) -> Result(BitArray, Snag) {
  case simplifile.read_bits(path) {
    Ok(content) -> Ok(content)
    Error(reason) -> snag.error(simplifile.describe_error(reason))
  }
}

fn write_bits(path: String, bytes: BitArray) -> Result(Nil, Snag) {
  case simplifile.write_bits(path, bytes) {
    Ok(Nil) -> Ok(Nil)
    Error(reason) -> snag.error(simplifile.describe_error(reason))
  }
}

fn create_directory(path: String) -> Result(Nil, Snag) {
  case simplifile.create_directory_all(path) {
    Ok(Nil) -> Ok(Nil)
    Error(reason) -> snag.error(simplifile.describe_error(reason))
  }
}

fn walk(root: String) -> Result(List(String), Snag) {
  case simplifile.read_directory(root) {
    Ok(entries) -> walk_entries(entries, root, [])
    Error(reason) -> snag.error(simplifile.describe_error(reason))
  }
}

fn walk_entries(entries: List(String), root: String, found: List(String)) {
  case entries {
    [] -> Ok(found)
    [entry, ..rest] -> {
      let path = filepath.join(root, entry)
      case simplifile.is_directory(path) {
        Ok(True) -> {
          use nested <- result_try(walk(path))
          walk_entries(rest, root, list.append(nested, found))
        }
        Ok(False) -> walk_entries(rest, root, [path, ..found])
        Error(reason) -> snag.error(simplifile.describe_error(reason))
      }
    }
  }
}

fn extension(path: String) -> String {
  path
  |> filepath.extension()
  |> result.unwrap("")
}

fn strip_prefix(path: String, root: String) -> String {
  let prefix = root <> "/"
  case string.drop_start(path, string.length(prefix)) {
    "" -> path
    rest -> rest
  }
}

fn html_path(path: String) -> String {
  case string.ends_with(path, ".md") {
    True -> string.drop_end(path, 3) <> "/index.html"
    False -> path <> "/index.html"
  }
}

fn collect_results(
  results: List(Result(a, e)),
  collected: List(a),
) -> Result(List(a), e) {
  case results {
    [] -> Ok(list.reverse(collected))
    [Ok(value), ..rest] -> collect_results(rest, [value, ..collected])
    [Error(reason), ..] -> Error(reason)
  }
}

fn result_try(
  result: Result(a, e),
  next: fn(a) -> Result(b, e),
) -> Result(b, e) {
  case result {
    Ok(value) -> next(value)
    Error(reason) -> Error(reason)
  }
}
