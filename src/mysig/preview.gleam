// preview is no so good because it is also the action
// a lot of it is about SEO but thats not the case for social share
// Synonyms for Summary

//     Abstract
//     Overview
//     Synopsis
//     Digest
//     Brief
//     Recap
//     Compendium
//     Cliff Notes
//     Highlight
//     Extract

// Synonyms for Preview

//     Teaser
//     Snapshot
//     Glimpse
//     Sneak Peek
//     Foretaste
//     Intro
//     Sample
//     Outline
//     Impression
//     Lead-in

import gleam/uri
import lustre/attribute as a
import lustre/element/html as h
import mysig/open_graph as og

fn meta_title(title) {
  h.meta([a.name("title"), a.content(title)])
}

fn meta_description(description) {
  h.meta([a.name("description"), a.content(description)])
}

fn canonical_link(canonical) {
  h.link([a.rel("canonical"), a.href(uri.to_string(canonical))])
}

// Lots of versions of this
// Create a Preview Object and add setting image etc

// og:description is optional but why not require it
pub fn homepage(title title, description description, canonical canonical) {
  [
    h.title([], title),
    og.title(title),
    meta_description(description),
    og.description(description),
    canonical_link(canonical),
    og.url(canonical),
  ]
}

pub fn page(
  site site,
  title title,
  description description,
  canonical canonical,
) {
  [og.site_name(site), ..homepage(title, description, canonical)]
}

pub const png = "image/png"

pub fn image(url url, type_ type_, width width, height height, alt alt) {
  [
    og.image(url),
    og.image_type(type_),
    og.image_width(width),
    og.image_height(height),
    og.image_alt(alt),
  ]
}

pub fn optimum_image(url url, type_ type_, alt alt) {
  image(url, type_, 1200, 630, alt)
}
