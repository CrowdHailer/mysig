import * as $uri from "../../gleam_stdlib/gleam/uri.mjs";
import * as $a from "../../lustre/lustre/attribute.mjs";
import * as $h from "../../lustre/lustre/element/html.mjs";
import { toList, prepend as listPrepend } from "../gleam.mjs";
import * as $og from "../mysig/open_graph.mjs";

export const png = "image/png";

function meta_description(description) {
  return $h.meta(toList([$a.name("description"), $a.content(description)]));
}

function canonical_link(canonical) {
  return $h.link(
    toList([$a.rel("canonical"), $a.href($uri.to_string(canonical))]),
  );
}

export function homepage(title, description, canonical) {
  return toList([
    $h.title(toList([]), title),
    $og.title(title),
    meta_description(description),
    $og.description(description),
    canonical_link(canonical),
    $og.url(canonical),
  ]);
}

export function page(site, title, description, canonical) {
  return listPrepend(
    $og.site_name(site),
    homepage(title, description, canonical),
  );
}

export function image(url, type_, width, height, alt) {
  return toList([
    $og.image(url),
    $og.image_type(type_),
    $og.image_width(width),
    $og.image_height(height),
    $og.image_alt(alt),
  ]);
}

export function optimum_image(url, type_, alt) {
  return image(url, type_, 1200, 630, alt);
}
