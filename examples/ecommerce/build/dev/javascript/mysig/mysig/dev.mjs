import * as $filepath from "../../filepath/filepath.mjs";
import * as $request from "../../gleam_http/gleam/http/request.mjs";
import * as $response from "../../gleam_http/gleam/http/response.mjs";
import * as $promise from "../../gleam_javascript/gleam/javascript/promise.mjs";
import * as $json from "../../gleam_json/gleam/json.mjs";
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $io from "../../gleam_stdlib/gleam/io.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $glen from "../../glen/glen.mjs";
import * as $glen_node from "../../glen_node/glen_node.mjs";
import * as $mutable_reference from "../../javascript_mutable_reference/javascript/mutable_reference.mjs";
import * as $a from "../../lustre/lustre/attribute.mjs";
import * as $element from "../../lustre/lustre/element.mjs";
import * as $h from "../../lustre/lustre/element/html.mjs";
import * as $marceau from "../../marceau/marceau.mjs";
import * as $snag from "../../snag/snag.mjs";
import { Ok, toList, Empty as $Empty, makeError } from "../gleam.mjs";
import * as $server from "../mysig/asset/server.mjs";
import * as $route from "../mysig/route.mjs";

const FILEPATH = "src/mysig/dev.gleam";

export function manifest(assets) {
  let _pipe = $json.object(
    $list.map(
      $dict.to_list(assets),
      (entry) => {
        let key;
        let file;
        key = entry[0];
        file = entry[1][0];
        return [file, $json.string(key)];
      },
    ),
  );
  let _pipe$1 = $json.to_string(_pipe);
  let _pipe$2 = ((_capture) => {
    return $h.script(
      toList([$a.type_("application/json"), $a.id("mysig")]),
      _capture,
    );
  })(_pipe$1);
  return $element.to_string(_pipe$2);
}

function handle(request, route, store) {
  let segments = $request.path_segments(request);
  if (segments instanceof $Empty) {
    let $ = $route.match(segments, route);
    if ($ instanceof Ok) {
      let $1 = $[0];
      if ($1 instanceof $route.Page) {
        let endpoint = $1[0];
        return $promise.map(
          $server.build_manifest(endpoint, $dict.new$()),
          (result) => {
            if (result instanceof Ok) {
              let page = result[0][0];
              let assets = result[0][1];
              $mutable_reference.update(
                store,
                (_capture) => { return $dict.merge(assets, _capture); },
              );
              let page$1 = $string.replace(
                page,
                "<body>",
                "<body>" + manifest(assets),
              );
              let _pipe = $response.new$(200);
              let _pipe$1 = $response.prepend_header(
                _pipe,
                "content-type",
                "text/html",
              );
              return $response.set_body(_pipe$1, new $glen.Text(page$1));
            } else {
              let reason = result[0];
              let _pipe = $response.new$(500);
              let _pipe$1 = $response.prepend_header(
                _pipe,
                "content-type",
                "text/html",
              );
              return $response.set_body(
                _pipe$1,
                new $glen.Text(
                  $element.to_document_string(
                    $h.pre(
                      toList([]),
                      toList([$element.text($snag.pretty_print(reason))]),
                    ),
                  ),
                ),
              );
            }
          },
        );
      } else {
        let content = $1.content;
        let _block;
        let _pipe = $filepath.extension(request.path);
        _block = $result.unwrap(_pipe, "application/octet-stream");
        let ext = _block;
        let mime = $marceau.extension_to_mime_type(ext);
        let _pipe$1 = $response.new$(200);
        let _pipe$2 = $response.prepend_header(_pipe$1, "content-type", mime);
        let _pipe$3 = $response.set_body(_pipe$2, new $glen.Bits(content));
        return $promise.resolve(_pipe$3);
      }
    } else {
      return $promise.resolve(
        (() => {
          let _pipe = $response.new$(404);
          return $response.set_body(_pipe, new $glen.Empty());
        })(),
      );
    }
  } else {
    let $ = segments.tail;
    if ($ instanceof $Empty) {
      let $1 = $route.match(segments, route);
      if ($1 instanceof Ok) {
        let $2 = $1[0];
        if ($2 instanceof $route.Page) {
          let endpoint = $2[0];
          return $promise.map(
            $server.build_manifest(endpoint, $dict.new$()),
            (result) => {
              if (result instanceof Ok) {
                let page = result[0][0];
                let assets = result[0][1];
                $mutable_reference.update(
                  store,
                  (_capture) => { return $dict.merge(assets, _capture); },
                );
                let page$1 = $string.replace(
                  page,
                  "<body>",
                  "<body>" + manifest(assets),
                );
                let _pipe = $response.new$(200);
                let _pipe$1 = $response.prepend_header(
                  _pipe,
                  "content-type",
                  "text/html",
                );
                return $response.set_body(_pipe$1, new $glen.Text(page$1));
              } else {
                let reason = result[0];
                let _pipe = $response.new$(500);
                let _pipe$1 = $response.prepend_header(
                  _pipe,
                  "content-type",
                  "text/html",
                );
                return $response.set_body(
                  _pipe$1,
                  new $glen.Text(
                    $element.to_document_string(
                      $h.pre(
                        toList([]),
                        toList([$element.text($snag.pretty_print(reason))]),
                      ),
                    ),
                  ),
                );
              }
            },
          );
        } else {
          let content = $2.content;
          let _block;
          let _pipe = $filepath.extension(request.path);
          _block = $result.unwrap(_pipe, "application/octet-stream");
          let ext = _block;
          let mime = $marceau.extension_to_mime_type(ext);
          let _pipe$1 = $response.new$(200);
          let _pipe$2 = $response.prepend_header(_pipe$1, "content-type", mime);
          let _pipe$3 = $response.set_body(_pipe$2, new $glen.Bits(content));
          return $promise.resolve(_pipe$3);
        }
      } else {
        return $promise.resolve(
          (() => {
            let _pipe = $response.new$(404);
            return $response.set_body(_pipe, new $glen.Empty());
          })(),
        );
      }
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        let $2 = segments.head;
        if ($2 === "assets") {
          let asset = $.head;
          let _block;
          let $3 = $dict.get($mutable_reference.get(store), asset);
          if ($3 instanceof Ok) {
            let mime = $3[0][1];
            let bits = $3[0][2];
            let _pipe = $response.new$(200);
            let _pipe$1 = $response.prepend_header(_pipe, "content-type", mime);
            _block = $response.set_body(_pipe$1, new $glen.Bits(bits));
          } else {
            let _pipe = $response.new$(404);
            _block = $response.set_body(_pipe, new $glen.Empty());
          }
          let _pipe = _block;
          return $promise.resolve(_pipe);
        } else {
          let $3 = $route.match(segments, route);
          if ($3 instanceof Ok) {
            let $4 = $3[0];
            if ($4 instanceof $route.Page) {
              let endpoint = $4[0];
              return $promise.map(
                $server.build_manifest(endpoint, $dict.new$()),
                (result) => {
                  if (result instanceof Ok) {
                    let page = result[0][0];
                    let assets = result[0][1];
                    $mutable_reference.update(
                      store,
                      (_capture) => { return $dict.merge(assets, _capture); },
                    );
                    let page$1 = $string.replace(
                      page,
                      "<body>",
                      "<body>" + manifest(assets),
                    );
                    let _pipe = $response.new$(200);
                    let _pipe$1 = $response.prepend_header(
                      _pipe,
                      "content-type",
                      "text/html",
                    );
                    return $response.set_body(_pipe$1, new $glen.Text(page$1));
                  } else {
                    let reason = result[0];
                    let _pipe = $response.new$(500);
                    let _pipe$1 = $response.prepend_header(
                      _pipe,
                      "content-type",
                      "text/html",
                    );
                    return $response.set_body(
                      _pipe$1,
                      new $glen.Text(
                        $element.to_document_string(
                          $h.pre(
                            toList([]),
                            toList([$element.text($snag.pretty_print(reason))]),
                          ),
                        ),
                      ),
                    );
                  }
                },
              );
            } else {
              let content = $4.content;
              let _block;
              let _pipe = $filepath.extension(request.path);
              _block = $result.unwrap(_pipe, "application/octet-stream");
              let ext = _block;
              let mime = $marceau.extension_to_mime_type(ext);
              let _pipe$1 = $response.new$(200);
              let _pipe$2 = $response.prepend_header(
                _pipe$1,
                "content-type",
                mime,
              );
              let _pipe$3 = $response.set_body(_pipe$2, new $glen.Bits(content));
              return $promise.resolve(_pipe$3);
            }
          } else {
            return $promise.resolve(
              (() => {
                let _pipe = $response.new$(404);
                return $response.set_body(_pipe, new $glen.Empty());
              })(),
            );
          }
        }
      } else {
        let $2 = $route.match(segments, route);
        if ($2 instanceof Ok) {
          let $3 = $2[0];
          if ($3 instanceof $route.Page) {
            let endpoint = $3[0];
            return $promise.map(
              $server.build_manifest(endpoint, $dict.new$()),
              (result) => {
                if (result instanceof Ok) {
                  let page = result[0][0];
                  let assets = result[0][1];
                  $mutable_reference.update(
                    store,
                    (_capture) => { return $dict.merge(assets, _capture); },
                  );
                  let page$1 = $string.replace(
                    page,
                    "<body>",
                    "<body>" + manifest(assets),
                  );
                  let _pipe = $response.new$(200);
                  let _pipe$1 = $response.prepend_header(
                    _pipe,
                    "content-type",
                    "text/html",
                  );
                  return $response.set_body(_pipe$1, new $glen.Text(page$1));
                } else {
                  let reason = result[0];
                  let _pipe = $response.new$(500);
                  let _pipe$1 = $response.prepend_header(
                    _pipe,
                    "content-type",
                    "text/html",
                  );
                  return $response.set_body(
                    _pipe$1,
                    new $glen.Text(
                      $element.to_document_string(
                        $h.pre(
                          toList([]),
                          toList([$element.text($snag.pretty_print(reason))]),
                        ),
                      ),
                    ),
                  );
                }
              },
            );
          } else {
            let content = $3.content;
            let _block;
            let _pipe = $filepath.extension(request.path);
            _block = $result.unwrap(_pipe, "application/octet-stream");
            let ext = _block;
            let mime = $marceau.extension_to_mime_type(ext);
            let _pipe$1 = $response.new$(200);
            let _pipe$2 = $response.prepend_header(
              _pipe$1,
              "content-type",
              mime,
            );
            let _pipe$3 = $response.set_body(_pipe$2, new $glen.Bits(content));
            return $promise.resolve(_pipe$3);
          }
        } else {
          return $promise.resolve(
            (() => {
              let _pipe = $response.new$(404);
              return $response.set_body(_pipe, new $glen.Empty());
            })(),
          );
        }
      }
    }
  }
}

export function serve(route) {
  let store = $mutable_reference.new$($dict.new$());
  let $ = $glen_node.serve(
    8080,
    (_capture) => { return handle(_capture, route, store); },
  );
  if (!($ instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "mysig/dev",
      24,
      "serve",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 504, end: 569, pattern_start: 515, pattern_end: 520 }
    )
  }
  return $io.println("serving on 8080");
}
