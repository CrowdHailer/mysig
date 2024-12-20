import gleam/list

pub type Endpoint {
  // page at this endpoint
  Page(String)
  // static below this point
  App
}

pub type Route {
  // Page
  Route(index: Endpoint, items: List(#(String, Route)))
  // Slug
  //   Segment(index: Endpoint, lookup: fn(String) -> Route)
  //   Spread(fn(List(String)) -> Route)
  // Page
  // Action
}

pub fn to_files(route) {
  do_to_files(route, "", [])
}

fn do_to_files(route, path, acc) {
  let Route(index, items) = route
  let file = case index {
    Page(content) -> #(path <> "/index.html", <<content:utf8>>)
    _ -> todo as "handle app and redirects"
  }
  let acc = [file, ..acc]
  list.fold(items, acc, fn(acc, entry) {
    let #(segment, route) = entry
    do_to_files(route, path <> "/" <> segment, acc)
  })
}
