import gleam/list
import mysig/asset

pub type Endpoint {
  // page at this endpoint
  Page(asset.Effect(String))
  // static below this point
  Static(content: BitArray)
}

pub type Route {
  Route(index: Endpoint, items: List(#(String, Route)))
  // Slug
  //   Segment(index: Endpoint, lookup: fn(String) -> Route)
  //   Spread(fn(List(String)) -> Route)
}

pub fn match(segments: List(String), route: Route) {
  case segments {
    [] -> Ok(route.index)
    [next, ..rest] ->
      case list.key_find(route.items, next) {
        Ok(child) -> match(rest, child)
        Error(Nil) -> Error(Nil)
      }
  }
}
