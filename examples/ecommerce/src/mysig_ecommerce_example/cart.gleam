import gleam/int
import lustre
import lustre/attribute as a
import lustre/element
import lustre/element/html as h
import lustre/event

pub fn main() {
  let app = lustre.simple(init, update, view)
  let assert Ok(_) = lustre.start(app, "#cart", Nil)
  Nil
}

fn init(_) {
  0
}

pub type Message {
  AddOne
}

fn update(count, message) {
  case message {
    AddOne -> count + 1
  }
}

fn view(count) {
  h.button([a.class("cart"), event.on_click(AddOne)], [
    element.text("Cart: " <> int.to_string(count)),
  ])
}
