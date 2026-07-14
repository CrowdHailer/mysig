import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $a from "../../lustre/lustre/attribute.mjs";
import * as $h from "../../lustre/lustre/element/html.mjs";
import { toList } from "../gleam.mjs";

export const tailwind_2_2_11 = "https://unpkg.com/tailwindcss@2.2.11/dist/tailwind.min.css";

export function common_head_tags() {
  return toList([
    $h.meta(toList([$a.attribute("charset", "UTF-8")])),
    $h.meta(
      toList([
        $a.name("viewport"),
        $a.content("width=device-width, initial-scale=1.0"),
      ]),
    ),
  ]);
}

export function doc(head, body) {
  return $h.html(
    toList([$a.attribute("lang", "en")]),
    toList([
      $h.head(toList([]), $list.append(common_head_tags(), head)),
      $h.body(toList([]), body),
    ]),
  );
}

export function stylesheet(reference) {
  return $h.link(toList([$a.rel("stylesheet"), $a.href(reference)]));
}

export function empty_lustre() {
  return $h.div(toList([$a.id("app")]), toList([]));
}

export function plausible(domain) {
  return $h.script(
    toList([
      $a.attribute("defer", ""),
      $a.attribute("data-domain", domain),
      $a.src("https://plausible.io/js/script.js"),
    ]),
    "",
  );
}
