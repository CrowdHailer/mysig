import gleam/dict
import gleam/javascript/promise
import gleam/list
import gleam/string
import mysig/asset/server
import mysig/dev
import mysig/route.{Route}

pub fn to_files(route) {
  use #(routes, assets) <- promise.try_await(routes_to_files(
    route,
    "",
    [],
    dict.new(),
  ))
  let assets =
    list.map(dict.to_list(assets), fn(asset) {
      let #(key, #(_file, _mime, bits)) = asset
      #("/assets/" <> key, bits)
    })
  promise.resolve(Ok(list.append(routes, assets)))
}

fn routes_to_files(route, path, routes, assets) {
  let Route(index, items) = route
  case index {
    route.Page(index) -> {
      use r <- promise.try_await(server.build_manifest(index, assets))
      let #(content, assets) = r
      let content =
        string.replace(content, "<body>", "<body>" <> dev.manifest(assets))
      let routes = [#(path <> "/index.html", <<content:utf8>>), ..routes]
      do_items_to_files(items, path, routes, assets)
    }
    route.Static(bytes) -> {
      let routes = [#(path, bytes), ..routes]
      do_items_to_files(items, path, routes, assets)
    }
  }
}

fn do_items_to_files(items, path, routes, assets) {
  case items {
    [] -> promise.resolve(Ok(#(routes, assets)))
    [entry, ..items] -> {
      let #(segment, route) = entry
      use #(routes, assets) <- promise.try_await(routes_to_files(
        route,
        path <> "/" <> segment,
        routes,
        assets,
      ))
      do_items_to_files(items, path, routes, assets)
    }
  }
}
