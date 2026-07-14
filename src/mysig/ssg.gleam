//// Static site generation helpers for Mysig.

import filepath
import gleam/dict
import gleam/javascript/promise.{type Promise}
import gleam/list
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

fn result_try(
  result: Result(a, e),
  next: fn(a) -> Result(b, e),
) -> Result(b, e) {
  case result {
    Ok(value) -> next(value)
    Error(reason) -> Error(reason)
  }
}
