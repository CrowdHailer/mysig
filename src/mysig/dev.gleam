import filepath
import gleam/dict
import gleam/http/request
import gleam/http/response
import gleam/io
import gleam/javascript/promise
import gleam/json
import gleam/list
import gleam/result
import gleam/string
import glen
import glen_node
import javascript/mutable_reference
import lustre/attribute as a
import lustre/element
import lustre/element/html as h
import marceau
import mysig/asset/server
import mysig/route
import snag

pub fn serve(route) {
  let store = mutable_reference.new(dict.new())
  let assert Ok(_) = glen_node.serve(8080, handle(_, route, store))
  io.println("serving on 8080")
}

fn handle(request, route, store) {
  let segments = request.path_segments(request)
  case segments {
    ["assets", asset] -> {
      case dict.get(mutable_reference.get(store), asset) {
        Ok(#(_file, mime, bits)) ->
          response.new(200)
          |> response.prepend_header("content-type", mime)
          |> response.set_body(glen.Bits(bits))
        Error(Nil) -> response.new(404) |> response.set_body(glen.Empty)
      }
      |> promise.resolve
    }
    // TODO should be a get request
    _ ->
      case route.match(segments, route) {
        Ok(route.Page(endpoint)) -> {
          use result <- promise.map(server.build_manifest(endpoint, dict.new()))
          case result {
            Ok(#(page, assets)) -> {
              mutable_reference.update(store, dict.merge(assets, _))
              let page =
                string.replace(page, "<body>", "<body>" <> manifest(assets))
              response.new(200)
              // TODO use a set content helper
              |> response.prepend_header("content-type", "text/html")
              |> response.set_body(glen.Text(page))
            }
            Error(reason) -> {
              response.new(500)
              // TODO use a set content helper
              |> response.prepend_header("content-type", "text/html")
              |> response.set_body(
                glen.Text(
                  element.to_document_string(
                    h.pre([], [element.text(snag.pretty_print(reason))]),
                  ),
                ),
              )
            }
          }
        }
        Ok(route.Static(content)) -> {
          let ext =
            filepath.extension(request.path)
            |> result.unwrap("application/octet-stream")
          let mime = marceau.extension_to_mime_type(ext)
          response.new(200)
          |> response.prepend_header("content-type", mime)
          |> response.set_body(glen.Bits(content))
          |> promise.resolve()
        }
        Error(Nil) ->
          promise.resolve(response.new(404) |> response.set_body(glen.Empty))
      }
  }
}

pub fn manifest(assets) {
  json.object(
    list.map(dict.to_list(assets), fn(entry) {
      let #(key, #(file, _mime, _bits)) = entry
      #(file, json.string(key))
    }),
  )
  |> json.to_string()
  // |> list.wrap()
  |> h.script([a.type_("application/json"), a.id("mysig")], _)
  |> element.to_string
}
