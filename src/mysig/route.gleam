import gleam/list

pub type Endpoint {
  // page at this endpoint
  Page(String)
  // static below this point
  App
}

pub type Route(endpoint) {
  Route(index: endpoint, items: List(#(String, Route(endpoint))))
  // Slug
  //   Segment(index: Endpoint, lookup: fn(String) -> Route)
  //   Spread(fn(List(String)) -> Route)
}

pub fn match(segments: List(String), route: Route(_)) {
  case segments {
    [] -> Ok(route.index)
    [next, ..rest] ->
      case list.key_find(route.items, next) {
        Ok(child) -> match(rest, child)
        Error(Nil) -> Error(Nil)
      }
  }
}
