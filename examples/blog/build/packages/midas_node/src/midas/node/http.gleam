import gleam/fetch
import gleam/javascript/promise
import gleam/result
import gleam/string
import snag

pub fn send(request) {
  use result <- promise.map(fetch.send(request))
  result.map_error(result, fn(reason) { snag.new(string.inspect(reason)) })
}

pub fn read_text(response) {
  use result <- promise.map(fetch.read_text_body(response))
  result.map_error(result, fn(reason) { snag.new(string.inspect(reason)) })
}

pub fn read_json(response) {
  use result <- promise.map(fetch.read_json_body(response))
  result.map_error(result, fn(reason) { snag.new(string.inspect(reason)) })
}
