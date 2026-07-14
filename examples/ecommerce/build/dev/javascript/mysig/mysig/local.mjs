import * as $filepath from "../../filepath/filepath.mjs";
import * as $http from "../../gleam_http/gleam/http.mjs";
import * as $request from "../../gleam_http/gleam/http/request.mjs";
import * as $response from "../../gleam_http/gleam/http/response.mjs";
import * as $bit_array from "../../gleam_stdlib/gleam/bit_array.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $marceau from "../../marceau/marceau.mjs";
import * as $continuation from "../../midas/midas/continuation.mjs";
import * as $e from "../../midas/midas/effect.mjs";
import * as $snag from "../../snag/snag.mjs";
import { Ok, toBitArray } from "../gleam.mjs";

function handle_option(response, method) {
  if (method instanceof $http.Get) {
    return response;
  } else if (method instanceof $http.Options) {
    return $response.set_body(response, toBitArray([]));
  } else {
    let _pipe = $response.new$(405);
    return $response.set_body(_pipe, toBitArray([]));
  }
}

function do_serve(request, content) {
  let method = request.method;
  let path = request.path;
  let $ = $list.key_find(content, path);
  if ($ instanceof Ok) {
    let response = $[0];
    return handle_option(response, method);
  } else {
    let path$1 = $filepath.join(path, "index.html");
    let _block;
    let $1 = $string.starts_with(path$1, "/");
    if ($1) {
      _block = path$1;
    } else {
      _block = "/" + path$1;
    }
    let path$2 = _block;
    let $2 = $list.key_find(content, path$2);
    if ($2 instanceof Ok) {
      let response = $2[0];
      return handle_option(response, method);
    } else {
      let _pipe = $response.new$(404);
      return $response.set_body(_pipe, toBitArray([]));
    }
  }
}

function check_absolute(path) {
  let $ = $filepath.is_absolute(path);
  if ($) {
    return new Ok(undefined);
  } else {
    return $snag.error(
      "can't serve file unless path is absolute, given: " + path,
    );
  }
}

function expand_path(path) {
  let _pipe = $filepath.expand(path);
  return $result.replace_error(
    _pipe,
    $snag.new$("invalid path goes outside root"),
  );
}

function script(key) {
  return ("<script>\n  async function poll() {\n    let response = await window.fetch('', {method: 'OPTIONS'}).catch(() => {  });\n    let next = response ? response.headers.get('etag') : undefined;\n    let reload = next && next != '" + key) + "';\n    if (reload) window.location.reload()\n\n    window.setTimeout(poll, 100)\n  }\n  \n  poll()\n</script>";
}

export function inject_live_reload(hash, bytes) {
  let $ = $bit_array.to_string(bytes);
  if ($ instanceof Ok) {
    let content = $[0];
    let _pipe = $string.replace(content, "</head>", script(hash) + "</head>");
    return $bit_array.from_string(_pipe);
  } else {
    return bytes;
  }
}

export function handler(content, hash) {
  return $continuation.then$(
    $continuation.try_each(
      content,
      (file) => {
        let path = file[0];
        let bytes = file[1];
        return $continuation.try$(
          check_absolute(path),
          (_use0) => {
            
            return $continuation.try$(
              expand_path(path),
              (path) => {
                let _block;
                let $ = $filepath.extension(path);
                if ($ instanceof Ok) {
                  let ext = $[0];
                  _block = $marceau.extension_to_mime_type(ext);
                } else {
                  _block = "application/octet-stream";
                }
                let mime = _block;
                return $continuation.then$(
                  hash(new $e.Sha1(), bytes),
                  (hash) => {
                    let etag = $bit_array.base64_url_encode(hash, false);
                    let _block$1;
                    if (mime === "text/html") {
                      _block$1 = inject_live_reload(etag, bytes);
                    } else {
                      _block$1 = bytes;
                    }
                    let bytes$1 = _block$1;
                    let _block$2;
                    let _pipe = $response.new$(200);
                    let _pipe$1 = $response.set_header(
                      _pipe,
                      "content-type",
                      mime,
                    );
                    let _pipe$2 = $response.set_header(_pipe$1, "etag", etag);
                    _block$2 = $response.set_body(_pipe$2, bytes$1);
                    let response = _block$2;
                    return $continuation.done([path, response]);
                  },
                );
              },
            );
          },
        );
      },
    ),
    (content) => {
      if (content instanceof Ok) {
        let content$1 = content[0];
        return $continuation.done(
          (_capture) => { return do_serve(_capture, content$1); },
        );
      } else {
        let reason = content[0];
        return $continuation.fail(reason);
      }
    },
  );
}
