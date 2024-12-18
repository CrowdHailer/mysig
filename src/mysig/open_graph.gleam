// https://iamturns.com/open-graph-image-size/
// https://www.ogimage.gallery/libary/the-ultimate-guide-to-og-image-dimensions-2024-update
// image 1200x630px is best
// This tool is alright https://www.npmjs.com/package/seo-analyzer for validating can check all the rules https://github.com/maddevsio/seo-analyzer/tree/master/src/rules

// everything is property content and can be a keyvalue pair

import gleam/int
import gleam/uri
import lustre/attribute as a
import lustre/element/html as h

fn og(propery, content) {
  h.meta([a.attribute("property", "og:" <> propery), a.content(content)])
}

pub fn title(content) {
  og("title", content)
}

pub fn website() {
  og("type", "website")
}

pub fn url(content) {
  og("url", uri.to_string(content))
}

pub fn description(content) {
  og("description", content)
}

pub fn site_name(content) {
  og("site_name", content)
}

pub fn image(content) {
  og("image", uri.to_string(content))
}

pub fn image_type(content) {
  og("image:type", content)
}

pub fn image_width(content) {
  og("image:width", int.to_string(content))
}

pub fn image_height(content) {
  og("image:height", int.to_string(content))
}

pub fn image_alt(content) {
  og("image:alt", content)
}
