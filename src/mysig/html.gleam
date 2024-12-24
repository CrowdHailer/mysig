import gleam/list
import lustre/attribute as a
import lustre/element/html as h

pub const tailwind_2_2_11 = "https://unpkg.com/tailwindcss@2.2.11/dist/tailwind.min.css"

pub fn doc(head, body) {
  h.html([a.attribute("lang", "en")], [
    h.head([], list.append(common_head_tags(), head)),
    h.body([], body),
  ])
}

pub fn common_head_tags() {
  [
    h.meta([a.attribute("charset", "UTF-8")]),
    h.meta([
      a.name("viewport"),
      a.content("width=device-width, initial-scale=1.0"),
    ]),
  ]
}

pub fn stylesheet(reference) {
  h.link([a.rel("stylesheet"), a.href(reference)])
}

// TODO remove as should render in place
pub fn empty_lustre() {
  h.div([a.id("app")], [])
}

pub fn plausible(domain) {
  h.script(
    [
      a.attribute("defer", ""),
      a.attribute("data-domain", domain),
      a.src("https://plausible.io/js/script.js"),
    ],
    "",
  )
}
