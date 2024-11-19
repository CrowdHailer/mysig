import filepath
import gleam/bit_array
import gleam/http
import gleam/http/request
import gleam/http/response
import gleam/list
import gleam/result
import gleam/string
import marceau
import midas/task as t
import snag

// can be as you would have on filesystem but server functions might also be wanted
// currently is as presented on the file system

fn handle_option(response, method) {
  case method {
    http.Get -> response
    http.Options -> response.set_body(response, <<>>)
    _ -> response.new(405) |> response.set_body(<<>>)
  }
}

fn do_serve(request, content) {
  let request.Request(method: method, path: path, ..) = request
  case list.key_find(content, path) {
    Ok(response) -> handle_option(response, method)

    Error(Nil) -> {
      let path = filepath.join(path, "index.html")
      let path = case string.starts_with(path, "/") {
        False -> "/" <> path
        True -> path
      }
      case list.key_find(content, path) {
        Ok(response) -> handle_option(response, method)
        Error(Nil) ->
          response.new(404)
          |> response.set_body(<<>>)
      }
    }
  }
}

fn check_absolute(path) {
  case filepath.is_absolute(path) {
    True -> Ok(Nil)
    False ->
      snag.error("can't serve file unless path is absolute, given: " <> path)
  }
}

fn expand_path(path) {
  filepath.expand(path)
  |> result.replace_error(snag.new("invalid path goes outside root"))
}

pub fn serve(port, content) {
  use content <- t.do(
    t.each(content, fn(file) {
      let #(path, bytes) = file
      use Nil <- t.try(check_absolute(path))
      use path <- t.try(expand_path(path))
      let mime = case filepath.extension(path) {
        Ok(ext) -> marceau.extension_to_mime_type(ext)
        Error(Nil) -> "application/octet-stream"
      }
      use hash <- t.do(t.hash(t.SHA1, bytes))
      let etag = bit_array.base64_url_encode(hash, False)
      let bytes = case mime {
        "text/html" -> inject_live_reload(etag, bytes)
        _ -> bytes
      }
      let response =
        response.new(200)
        |> response.set_header("content-type", mime)
        |> response.set_header("etag", etag)
        |> response.set_body(bytes)
      t.Done(#(path, response))
    }),
  )
  t.serve(port, do_serve(_, content))
}

fn script(key) {
  "<script>
  async function poll() {
    let response = await window.fetch('', {method: 'OPTIONS'}).catch(() => {  });
    let next = response ? response.headers.get('etag') : undefined;
    let reload = next && next != '" <> key <> "';
    if (reload) window.location.reload()

    window.setTimeout(poll, 100)
  }
  
  poll()
</script>"
}

pub fn inject_live_reload(hash, bytes) {
  case bit_array.to_string(bytes) {
    Ok(content) ->
      string.replace(content, "</head>", script(hash) <> "</head>")
      |> bit_array.from_string
    Error(Nil) -> bytes
  }
}
