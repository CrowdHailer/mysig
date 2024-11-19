import gleam/bit_array
import gleam/list
import lustre
import lustre/attribute as a
import lustre/element.{text}
import lustre/element/html as h
import midas/task as t
import mysig/asset

// run depends on page and page depends on state so need separate file for state/model
pub fn run() {
  let app = lustre.element(h.h1([], [text("hello")]))
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}

pub fn page(bundle) {
  use script <- t.do(t.bundle("mysig/example/app", "run"))

  use mainjs <- t.do(asset.resource(asset.js("main", script), bundle))

  standard([mainjs], [h.div([a.id("app")], [])])
  |> element.to_document_string()
  |> bit_array.from_string
  |> t.done()
}

fn viewport() {
  [
    h.meta([a.attribute("charset", "UTF-8")]),
    h.meta([
      a.attribute("http-equiv", "X-UA-Compatible"),
      a.attribute("content", "IE=edge"),
    ]),
    h.meta([a.attribute("viewport", "width=device-width, initial-scale=1.0")]),
  ]
}

pub fn standard(head, body) {
  h.html([a.attribute("lang", "en")], [
    h.head([], list.append(viewport(), head)),
    h.body([], body),
  ])
}
