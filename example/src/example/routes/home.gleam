import lustre
import lustre/attribute as a
import lustre/element
import lustre/element/html as h
import lustre/event
import mysig/asset
import mysig/asset/client
import mysig/html
import mysig/route

pub fn route() {
  route.Route(index: page(), items: [])
}

pub fn page() {
  use client <- asset.do(asset.bundle("example/routes/home", "client"))
  use ssr <- asset.do(view())

  let state = True
  html.doc([], [
    h.div([a.id("app")], [ssr(state)]),
    h.script([a.src(asset.src(client))], ""),
  ])
  |> asset.done()
}

pub fn client() {
  let assert Ok(render) = client.load_manifest(view())
  let app = lustre.simple(init, update, render)
  let assert Ok(_) = lustre.start(app, "#app", Nil)
  Nil
}

pub fn init(_) {
  True
}

pub type Message {
  Toggle
}

pub fn update(state, _message: Message) {
  !state
}

pub fn view() {
  use logo <- asset.do(asset.load("src/example/routes/logo.webp"))

  let render = fn(state) {
    h.div([event.on_click(Toggle)], [
      h.h1([], [element.text("Mysig example")]),
      h.p([], [element.text("click to toggle image")]),
      case state {
        True -> h.img([a.style([#("width", "100px")]), a.src(asset.src(logo))])
        False ->
          h.div(
            [
              a.style([
                #("width", "100px"),
                #("height", "100px"),
                #("background", "salmon"),
              ]),
            ],
            [],
          )
      },
    ])
  }
  asset.done(render)
}
