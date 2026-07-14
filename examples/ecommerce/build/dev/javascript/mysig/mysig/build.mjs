import * as $promise from "../../gleam_javascript/gleam/javascript/promise.mjs";
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import {
  Ok,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  toBitArray,
  stringBits,
} from "../gleam.mjs";
import * as $server from "../mysig/asset/server.mjs";
import * as $dev from "../mysig/dev.mjs";
import * as $route from "../mysig/route.mjs";
import { Route } from "../mysig/route.mjs";

function do_items_to_files(items, path, routes, assets) {
  if (items instanceof $Empty) {
    return $promise.resolve(new Ok([routes, assets]));
  } else {
    let entry = items.head;
    let items$1 = items.tail;
    let segment = entry[0];
    let route = entry[1];
    return $promise.try_await(
      routes_to_files(route, (path + "/") + segment, routes, assets),
      (_use0) => {
        let routes$1 = _use0[0];
        let assets$1 = _use0[1];
        return do_items_to_files(items$1, path, routes$1, assets$1);
      },
    );
  }
}

function routes_to_files(route, path, routes, assets) {
  let index = route.index;
  let items = route.items;
  if (index instanceof $route.Page) {
    let index$1 = index[0];
    return $promise.try_await(
      $server.build_manifest(index$1, assets),
      (r) => {
        let content = r[0];
        let assets$1 = r[1];
        let content$1 = $string.replace(
          content,
          "<body>",
          "<body>" + $dev.manifest(assets$1),
        );
        let routes$1 = listPrepend(
          [path + "/index.html", toBitArray([stringBits(content$1)])],
          routes,
        );
        return do_items_to_files(items, path, routes$1, assets$1);
      },
    );
  } else {
    let bytes = index.content;
    let routes$1 = listPrepend([path, bytes], routes);
    return do_items_to_files(items, path, routes$1, assets);
  }
}

export function to_files(route) {
  return $promise.try_await(
    routes_to_files(route, "", toList([]), $dict.new$()),
    (_use0) => {
      let routes = _use0[0];
      let assets = _use0[1];
      let assets$1 = $list.map(
        $dict.to_list(assets),
        (asset) => {
          let key;
          let bits;
          key = asset[0];
          bits = asset[1][2];
          return ["/assets/" + key, bits];
        },
      );
      return $promise.resolve(new Ok($list.append(routes, assets$1)));
    },
  );
}
