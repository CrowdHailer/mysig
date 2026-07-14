import * as $conversation from "../conversation/conversation.mjs";
import * as $filepath from "../filepath/filepath.mjs";
import * as $ansi from "../gleam_community_ansi/gleam_community/ansi.mjs";
import * as $http from "../gleam_http/gleam/http.mjs";
import * as $request from "../gleam_http/gleam/http/request.mjs";
import * as $response from "../gleam_http/gleam/http/response.mjs";
import { Response as HttpResponse } from "../gleam_http/gleam/http/response.mjs";
import * as $promise from "../gleam_javascript/gleam/javascript/promise.mjs";
import * as $dynamic from "../gleam_stdlib/gleam/dynamic.mjs";
import * as $float from "../gleam_stdlib/gleam/float.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $io from "../gleam_stdlib/gleam/io.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import * as $marceau from "../marceau/marceau.mjs";
import { Ok, toList, CustomType as $CustomType, isEqual, toBitArray } from "./gleam.mjs";
import {
  deno_serve,
  identity as ws_body_to_response,
  stream_file as do_file_stream,
  file_exists,
  now,
  get_timestamp,
  rescue as do_rescue,
} from "./glen.ffi.mjs";
import * as $status from "./glen/status.mjs";
import * as $ws from "./glen/ws.mjs";
import { upgrade } from "./ws.ffi.mjs";

/**
 * A text body.
 */
export class Text extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const ResponseBody$Text = ($0) => new Text($0);
export const ResponseBody$isText = (value) => value instanceof Text;
export const ResponseBody$Text$0 = (value) => value[0];

/**
 * A file body. The file will be streamed and not read into memory, so it is
 * okay to send files of any size. If the file cannot be accessed, an empty
 * response with a 500 status code (internal server error) will be returned.
 */
export class File extends $CustomType {
  constructor(path) {
    super();
    this.path = path;
  }
}
export const ResponseBody$File = (path) => new File(path);
export const ResponseBody$isFile = (value) => value instanceof File;
export const ResponseBody$File$path = (value) => value.path;
export const ResponseBody$File$0 = (value) => value.path;

/**
 * A `BitArray` body.
 */
export class Bits extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const ResponseBody$Bits = ($0) => new Bits($0);
export const ResponseBody$isBits = (value) => value instanceof Bits;
export const ResponseBody$Bits$0 = (value) => value[0];

/**
 * An empty body, equivalent to `Bits(<<>>)`.
 */
export class Empty extends $CustomType {}
export const ResponseBody$Empty = () => new Empty();
export const ResponseBody$isEmpty = (value) => value instanceof Empty;

/**
 * A websocket response body.
 */
export class Websocket extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const ResponseBody$Websocket = ($0) => new Websocket($0);
export const ResponseBody$isWebsocket = (value) => value instanceof Websocket;
export const ResponseBody$Websocket$0 = (value) => value[0];

/**
 * Set the body of a response.
 *
 * > ℹ️ This function is re-exported from `gleam_http`.
 */
export const set_body = $response.set_body;

/**
 * Set the header with the given value under the given header key.
 *
 * If the response already has that key, it is replaced.
 *
 * > ℹ️ This function is re-exported from `gleam_http`.
 */
export const set_header = $response.set_header;

/**
 * Return the non-empty segments of a request path.
 *
 * > ℹ️ This function is re-exported from `gleam_http`.
 *
 * # Examples
 *
 * ```
 * case glen.path_segments(req) {
 *   [] -> index_page()
 *   ["about"] -> about_page()
 *   ["greet", name] -> greet_page(name)
 *   _ -> not_found_page()
 * }
 * ```
 */
export const path_segments = $request.path_segments;

function log_error(message) {
  return $io.println($ansi.red("[err] ") + $ansi.italic(message));
}

function file_stream(path, status) {
  let $ = do_file_stream(path);
  if ($ instanceof Ok) {
    let stream = $[0];
    return [new $conversation.Stream(stream), status];
  } else {
    log_error("Unable to access " + path);
    return [
      new $conversation.Bits(toBitArray([])),
      $status.internal_server_error,
    ];
  }
}

/**
 * Convert a Glen response into a JavaScript response.
 */
export function convert_response(res) {
  let make_res = (_capture) => {
    return new HttpResponse(res.status, res.headers, _capture);
  };
  let $ = res.body;
  if ($ instanceof Text) {
    let text$1 = $[0];
    let _pipe = make_res(new $conversation.Text(text$1));
    return $conversation.to_js_response(_pipe);
  } else if ($ instanceof File) {
    let path = $.path;
    let $1 = file_stream(path, res.status);
    let body = $1[0];
    let status = $1[1];
    let _pipe = new HttpResponse(status, res.headers, body);
    return $conversation.to_js_response(_pipe);
  } else if ($ instanceof Bits) {
    let bits = $[0];
    let _pipe = make_res(new $conversation.Bits(bits));
    return $conversation.to_js_response(_pipe);
  } else if ($ instanceof Empty) {
    let _pipe = make_res(new $conversation.Bits(toBitArray([])));
    return $conversation.to_js_response(_pipe);
  } else {
    let w = $[0];
    return ws_body_to_response(w);
  }
}

/**
 * Convert a JavaScript request into a Glen request.
 */
export function convert_request(req) {
  return $conversation.to_gleam_request(req);
}

/**
 * Start a server using `Deno.serve`.
 *
 * > ℹ️ Only works when using the `deno` runtime. See the readme for more info.
 *
 * # Examples
 *
 * ```
 * glen.serve(8000, fn(_req) {
 *   "Hello, world!"
 *   |> glen.text(status.ok)
 *   |> promise.resolve
 * })
 * ```
 */
export function serve(port, handler) {
  return deno_serve(
    port,
    (req) => {
      let _pipe = convert_request(req);
      let _pipe$1 = handler(_pipe);
      return $promise.map(_pipe$1, convert_response);
    },
  );
}

/**
 * Set the body of a response to text.
 */
export function text_body(res, text) {
  return set_body(res, new Text(text));
}

/**
 * Set the body of a response to HTML.
 */
export function html_body(res, html) {
  let _pipe = res;
  let _pipe$1 = set_body(_pipe, new Text(html));
  return set_header(_pipe$1, "content-type", "text/html; charset=utf-8");
}

/**
 * Set the body of a response to JSON.
 */
export function json_body(res, json) {
  let _pipe = res;
  let _pipe$1 = set_body(_pipe, new Text(json));
  return set_header(_pipe$1, "content-type", "application/json");
}

/**
 * Set the body of a response to a `BitArray`.
 */
export function bit_array_body(res, bits) {
  return set_body(res, new Bits(bits));
}

/**
 * Set the body of a response to a file stream. The `content-type` header
 * will be automatically set based on the file's extension.
 */
export function file_body(res, path) {
  let _block;
  let _pipe = path;
  let _pipe$1 = $filepath.extension(_pipe);
  let _pipe$2 = $result.unwrap(_pipe$1, "");
  let _pipe$3 = $string.lowercase(_pipe$2);
  _block = $marceau.extension_to_mime_type(_pipe$3);
  let content_type = _block;
  let _pipe$4 = res;
  let _pipe$5 = set_body(_pipe$4, new File(path));
  return set_header(_pipe$5, "content-type", content_type);
}

/**
 * Create a response with the given status code and an empty body.
 */
export function response(status) {
  return new HttpResponse(status, toList([]), new Empty());
}

/**
 * Create a response with a text body.
 */
export function text(text, status) {
  let _pipe = response(status);
  return text_body(_pipe, text);
}

/**
 * Create a response with an HTML body.
 */
export function html(html, status) {
  let _pipe = response(status);
  return html_body(_pipe, html);
}

/**
 * Create a response with a JSON body.
 */
export function json(json, status) {
  let _pipe = response(status);
  return json_body(_pipe, json);
}

/**
 * Create a response with a file stream as the body. The `content-type` header
 * will be automatically set based on the file's extension.
 */
export function file(path, status) {
  let _pipe = response(status);
  return file_body(_pipe, path);
}

/**
 * Redirect the client to a URL with the given status. The status should be
 * in the 3xx range (such as `303: See Other` or `307: Temporary Redirect`).
 */
export function redirect(url, status) {
  let _pipe = response(status);
  return set_header(_pipe, "location", url);
}

/**
 * Create a response with a status of 405 (method not allowed). The `allowed`
 * header will be set to the given allowed methods.
 */
export function method_not_allowed(allowed) {
  let _block;
  let _pipe = allowed;
  let _pipe$1 = $list.map(_pipe, $http.method_to_string);
  let _pipe$2 = $string.join(_pipe$1, ", ");
  _block = $string.uppercase(_pipe$2);
  let allowed$1 = _block;
  let _pipe$3 = response($status.method_not_allowed);
  return set_header(_pipe$3, "allowed", allowed$1);
}

/**
 * Create a response with a status of 415 (unsupported media type). The `accept`
 * header will be set to the given supported content types.
 */
export function unsupported_media_type(supported) {
  let _pipe = response($status.unsupported_media_type);
  return set_header(_pipe, "accept", $string.join(supported, ", "));
}

/**
 * Read a request body as text.
 */
export function read_text_body(req) {
  return $conversation.read_text(req.body);
}

/**
 * Read a request body as JSON.
 */
export function read_json_body(req) {
  return $conversation.read_json(req.body);
}

/**
 * Read a request body as a `BitArray`.
 */
export function read_body_bits(req) {
  return $conversation.read_bits(req.body);
}

/**
 * Read a request body as [`FormData`](https://hexdocs.pm/conversation/conversation.html#FormData).
 */
export function read_form_body(req) {
  return $conversation.read_form(req.body);
}

/**
 * Get the query parameters from a request. Parameters are not predictably
 * ordered, so you should not pattern match on them. Instead, use the
 * [`key_find`](https://hexdocs.pm/gleam_stdlib/gleam/list.html#key_find)
 * function from `gleam/list` to access parameters.
 */
export function get_query(req) {
  let _pipe = req;
  let _pipe$1 = $request.get_query(_pipe);
  return $result.unwrap(_pipe$1, toList([]));
}

/**
 * Middleware function for requiring the request to be of a certain HTTP method.
 * Returns the same as [`method_not_allowed`](#method_not_allowed) if the method
 * does not meet the requirement.
 *
 * # Examples
 *
 * ```
 * fn handle_req(req) {
 *   use <- glen.require_method(req, http.Get)
 *   // ...only GET requests are allowed...
 * }
 * ```
 */
export function require_method(req, method, next) {
  let $ = isEqual(req.method, method);
  if ($) {
    return next();
  } else {
    let _pipe = method_not_allowed(toList([method]));
    return $promise.resolve(_pipe);
  }
}

/**
 * Middleware function for requiring the request to have a `content-type` header
 * with a specific content type. Returns the same as
 * [`unsupported_media_type`](#unsupported_media_type) if the header is missing
 * or does not meet the requirement.
 *
 * # Examples
 *
 * ```
 * fn handle_req(req) {
 *   use <- glen.require_content_type(req, "text/html")
 *   // ...the request's content-type must be text/html...
 * }
 * ```
 */
export function require_content_type(req, required, next) {
  let $ = $list.key_find(req.headers, "content-type");
  if ($ instanceof Ok) {
    let content_type = $[0];
    if (content_type === required) {
      return next();
    } else {
      let _pipe = unsupported_media_type(toList([required]));
      return $promise.resolve(_pipe);
    }
  } else {
    let _pipe = unsupported_media_type(toList([required]));
    return $promise.resolve(_pipe);
  }
}

function handle_read_errors(result, next) {
  if (result instanceof Ok) {
    let value = result[0];
    return next(value);
  } else {
    let error = result[0];
    let _block;
    if (error instanceof $conversation.AlreadyRead) {
      log_error("Request body has already been read");
      _block = response($status.internal_server_error);
    } else if (error instanceof $conversation.ParseError) {
      _block = response($status.bad_request);
    } else {
      _block = response($status.bad_request);
    }
    let _pipe = _block;
    return $promise.resolve(_pipe);
  }
}

/**
 * Middleware function that reads a request body as a string.
 *
 * # Examples
 *
 * ```
 * fn handle_req(req) {
 *   use string_body <- glen.require_string_body(req)
 *
 *   "You gave me: " <> glen.escape_html(string_body)
 *   |> glen.html(status.ok)
 *   |> promise.resolve
 * }
 * ```
 */
export function require_string_body(req, next) {
  return $promise.await$(
    read_text_body(req),
    (body) => { return handle_read_errors(body, next); },
  );
}

/**
 * Middleware function that reads a request body as a `BitArray`.
 *
 * # Examples
 *
 * ```
 * fn handle_req(req) {
 *   use bits <- glen.require_bit_array_body(req)
 *
 *   "Look at all the bits! " <> string.inspect(bits)
 *   |> glen.html(status.ok)
 *   |> promise.resolve
 * }
 * ```
 */
export function require_bit_array_body(req, next) {
  return $promise.await$(
    read_body_bits(req),
    (body) => { return handle_read_errors(body, next); },
  );
}

/**
 * Middleware function for requiring the request body to be JSON with a
 * `content-type` of `application/json`.
 *
 * # Examples
 *
 * ```
 * fn handle_req(req) {
 *   use json <- glen.require_json(req)
 *
 *   case my_decoder(json) {
 *     Ok(decoded) -> decoded.foo |> glen.text(status.ok)
 *     Error(_) -> glen.response(status.bad_request)
 *   }
 *   |> promise.resolve
 * }
 * ```
 */
export function require_json(req, next) {
  return require_content_type(
    req,
    "application/json",
    () => {
      return $promise.await$(
        read_json_body(req),
        (body) => { return handle_read_errors(body, next); },
      );
    },
  );
}

/**
 * Middleware for requiring the request body to be a form with a `content-type`
 * of either `application/x-www-form-urlencoded` or `multipart/form-data`.
 *
 * Formdata values are sorted alphabetically so they can be pattern matched on.
 *
 * # Examples
 *
 * ```
 * fn handle_req(req) {
 *   use formdata <- glen.require_form(req)
 *
 *   case formdata.values {
 *     [#("name", name)] -> greet(name)
 *     _ -> glen.response(status.bad_request)
 *   }
 *   |> promise.resolve
 * }
 * ```
 */
export function require_form(req, next) {
  let $ = $list.key_find(req.headers, "content-type");
  if ($ instanceof Ok) {
    let $1 = $[0];
    if ($1 === "application/x-www-form-urlencoded") {
      return $promise.await$(
        read_form_body(req),
        (body) => { return handle_read_errors(body, next); },
      );
    } else if ($1.startsWith("application/x-www-form-urlencoded;")) {
      return $promise.await$(
        read_form_body(req),
        (body) => { return handle_read_errors(body, next); },
      );
    } else if ($1 === "multipart/form-data") {
      return $promise.await$(
        read_form_body(req),
        (body) => { return handle_read_errors(body, next); },
      );
    } else if ($1.startsWith("multipart/form-data;")) {
      return $promise.await$(
        read_form_body(req),
        (body) => { return handle_read_errors(body, next); },
      );
    } else {
      let _pipe = unsupported_media_type(
        toList(["application/x-www-form-urlencoded", "multipart/form-data"]),
      );
      return $promise.resolve(_pipe);
    }
  } else {
    let _pipe = unsupported_media_type(
      toList(["application/x-www-form-urlencoded", "multipart/form-data"]),
    );
    return $promise.resolve(_pipe);
  }
}

function remove_preceeding_slashes(loop$path) {
  while (true) {
    let path = loop$path;
    if (path.charCodeAt(0) === 47) {
      let rest = path.slice(1);
      loop$path = rest;
    } else {
      return path;
    }
  }
}

/**
 * Middleware for serving up static files from a directory under a path prefix.
 *
 * # Examples
 *
 * ```
 * fn handle_req(req) {
 *   use <- glen.static(req, "static", "./somedir/static")
 *
 *   "<img src='/static/image.png'/>" |> glen.html(status.ok) |> promise.resolve
 * }
 * ```
 */
export function static$(req, prefix, directory, next) {
  let prefix$1 = remove_preceeding_slashes(prefix);
  let path = remove_preceeding_slashes(req.path);
  let $ = req.method;
  let $1 = $string.starts_with(path, prefix$1);
  if ($1 && $ instanceof $http.Get) {
    let _block;
    let _pipe = path;
    let _pipe$1 = $string.drop_start(_pipe, $string.length(prefix$1));
    let _pipe$2 = $filepath.expand(_pipe$1);
    let _pipe$3 = $result.unwrap(_pipe$2, "");
    _block = ((_capture) => { return $filepath.join(directory, _capture); })(
      _pipe$3,
    );
    let path$1 = _block;
    let $2 = file_exists(path$1);
    if ($2) {
      let _pipe$4 = file(path$1, $status.ok);
      return $promise.resolve(_pipe$4);
    } else {
      return next();
    }
  } else {
    return next();
  }
}

/**
 * Rounds a Float to 3 decimal places
 * 
 * @ignore
 */
function round(f) {
  return $int.to_float($float.round(f * 1000.0)) / 1000.0;
}

function log_response(res, time) {
  let _block;
  let $ = $status.classify(res.status);
  if ($ instanceof $status.Informational) {
    _block = $ansi.cyan;
  } else if ($ instanceof $status.Successful) {
    _block = $ansi.green;
  } else if ($ instanceof $status.Redirection) {
    _block = $ansi.cyan;
  } else if ($ instanceof $status.ClientError) {
    _block = $ansi.yellow;
  } else {
    _block = $ansi.red;
  }
  let color = _block;
  let _block$1;
  let _pipe = time;
  let _pipe$1 = round(_pipe);
  _block$1 = $float.to_string(_pipe$1);
  let time$1 = _block$1;
  let _block$2;
  let $1 = res.status === 0;
  if ($1) {
    _block$2 = " websocket started";
  } else {
    _block$2 = " ~> " + $int.to_string(res.status);
  }
  let info = _block$2;
  return $io.println(
    (color("[res]") + info) + $ansi.italic((" (" + time$1) + "ms)"),
  );
}

function get_query_string(req) {
  let $ = req.query;
  if ($ instanceof $option.Some) {
    let q = $[0];
    return "?" + q;
  } else {
    return "";
  }
}

function log_request(req) {
  let _block;
  let _pipe = req.method;
  let _pipe$1 = $http.method_to_string(_pipe);
  _block = $string.uppercase(_pipe$1);
  let method = _block;
  let _block$1;
  let $ = $list.key_find(req.headers, "upgrade");
  if ($ instanceof Ok) {
    let $1 = $[0];
    if ($1 === "websocket") {
      _block$1 = "ws";
    } else {
      _block$1 = $http.scheme_to_string(req.scheme);
    }
  } else {
    _block$1 = $http.scheme_to_string(req.scheme);
  }
  let scheme = _block$1;
  let url = (((scheme + "://") + req.host) + req.path) + get_query_string(req);
  return $io.println((($ansi.blue("[req] ") + method) + " ") + url);
}

function log_timestamp() {
  let _pipe = (("[" + get_timestamp()) + "]");
  let _pipe$1 = $ansi.dim(_pipe);
  return $io.println(_pipe$1);
}

/**
 * Middleware function for logging requests and responses.
 *
 * # Examples
 *
 * ```
 * fn handle_req(req) {
 *   use <- glen.log(req)
 *   // ...requests and responses are now logged...
 * }
 * ```
 */
export function log(req, next) {
  log_timestamp();
  log_request(req);
  let before = now();
  return $promise.await$(
    next(),
    (res) => {
      let after = now();
      let time = after - before;
      log_response(res, time);
      return $promise.resolve(res);
    },
  );
}

/**
 * Middleware function that rescues any crashes with an empty response and a
 * status of 500 (internal server error).
 *
 * Gleam code should never crash under normal circumstances, but it's always good
 * to be prepared.
 *
 * # Examples
 *
 * ```
 * fn handle_req(req) {
 *   use <- glen.rescue_crashes
 *   // ...crashes are now handled gracefully...
 * }
 * ```
 */
export function rescue_crashes(handler) {
  return $promise.await$(
    do_rescue(handler),
    (result) => {
      if (result instanceof Ok) {
        let response$1 = result[0];
        let _pipe = response$1;
        return $promise.resolve(_pipe);
      } else {
        let message = result[0];
        log_error("Handler crashed: " + message);
        let _pipe = response($status.internal_server_error);
        return $promise.resolve(_pipe);
      }
    },
  );
}

/**
 * Upgrade a request to become a websocket. If the request does not have an
 * `upgrade` header set to `websocket`, a response of 426 (upgrade required) will
 * be returned.
 *
 * - `on_open` gets called when a client starts a websocket connection.
 * - `on_close` is called when the connection in closed.
 * - `on_event` gets called when the websocket recieves an event or message.
 *
 * > ℹ️ Websockets are currently only supported when using the `deno` runtime.
 *
 * # Examples
 *
 * See [this](https://github.com/MystPi/glen/blob/main/test/glen_test.gleam)
 * for a more detailed example of websockets.
 *
 * ```
 * fn handle_req(req) {
 *   use _conn <- glen.websocket(
 *     req,
 *     on_open: on_open,
 *     on_close: on_close,
 *     on_event: on_event,
 *   )
 *   Nil
 * }
 *
 * fn on_open(conn) {
 *   // ...
 * }
 *
 * fn on_close(state) {
 *   // ...
 * }
 *
 * fn on_event(conn, state, msg) {
 *   // ...
 * }
 * ```
 */
export function websocket(req, on_open, on_close, on_event, do$) {
  let $ = $list.key_find(req.headers, "upgrade");
  if ($ instanceof Ok) {
    let $1 = $[0];
    if ($1 === "websocket") {
      let $2 = upgrade(req, on_open, on_close, on_event);
      let body = $2[0];
      let conn = $2[1];
      do$(conn);
      let _pipe = response(0);
      let _pipe$1 = set_body(_pipe, new Websocket(body));
      return $promise.resolve(_pipe$1);
    } else {
      let _pipe = response($status.upgrade_required);
      let _pipe$1 = set_header(_pipe, "upgrade", "websocket");
      return $promise.resolve(_pipe$1);
    }
  } else {
    let _pipe = response($status.upgrade_required);
    let _pipe$1 = set_header(_pipe, "upgrade", "websocket");
    return $promise.resolve(_pipe$1);
  }
}

/**
 * Escape a string so it can be included inside of HTML safely. You should run
 * this function on all user input being included in HTML to prevent possible
 * [XSS attacks](https://en.wikipedia.org/wiki/Cross-site_scripting).
 */
export function escape_html(string) {
  let _pipe = string;
  let _pipe$1 = $string.replace(_pipe, "<", "&lt;");
  let _pipe$2 = $string.replace(_pipe$1, ">", "&gt;");
  return $string.replace(_pipe$2, "&", "&amp;");
}
