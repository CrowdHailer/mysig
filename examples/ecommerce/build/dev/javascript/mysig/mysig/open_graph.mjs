import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $uri from "../../gleam_stdlib/gleam/uri.mjs";
import * as $a from "../../lustre/lustre/attribute.mjs";
import * as $h from "../../lustre/lustre/element/html.mjs";
import { toList } from "../gleam.mjs";

function og(propery, content) {
  return $h.meta(
    toList([$a.attribute("property", "og:" + propery), $a.content(content)]),
  );
}

export function title(content) {
  return og("title", content);
}

export function website() {
  return og("type", "website");
}

export function url(content) {
  return og("url", $uri.to_string(content));
}

export function description(content) {
  return og("description", content);
}

export function site_name(content) {
  return og("site_name", content);
}

export function image(content) {
  return og("image", $uri.to_string(content));
}

export function image_type(content) {
  return og("image:type", content);
}

export function image_width(content) {
  return og("image:width", $int.to_string(content));
}

export function image_height(content) {
  return og("image:height", $int.to_string(content));
}

export function image_alt(content) {
  return og("image:alt", content);
}
