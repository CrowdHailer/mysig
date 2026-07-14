import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $lustre from "../../lustre/lustre.mjs";
import * as $a from "../../lustre/lustre/attribute.mjs";
import * as $element from "../../lustre/lustre/element.mjs";
import * as $h from "../../lustre/lustre/element/html.mjs";
import * as $event from "../../lustre/lustre/event.mjs";
import { Ok, toList, CustomType as $CustomType, makeError } from "../gleam.mjs";

const FILEPATH = "src/mysig_ecommerce_example/cart.gleam";

export class AddOne extends $CustomType {}
export const Message$AddOne = () => new AddOne();
export const Message$isAddOne = (value) => value instanceof AddOne;

function view(count) {
  return $h.button(
    toList([$a.class$("cart"), $event.on_click(new AddOne())]),
    toList([$element.text("Cart: " + $int.to_string(count))]),
  );
}

function update(count, message) {
  return count + 1;
}

function init(_) {
  return 0;
}

export function main() {
  let app = $lustre.simple(init, update, view);
  let $ = $lustre.start(app, "#cart", undefined);
  if (!($ instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "mysig_ecommerce_example/cart",
      10,
      "main",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 199, end: 249, pattern_start: 210, pattern_end: 215 }
    )
  }
  return undefined;
}
