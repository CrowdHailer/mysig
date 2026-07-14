# Mysig SSG Report

## What Works

- Asset fingerprinting is already technically strong: SHA-256 content hashes,
  explicit asset declarations, and manifest replay in the browser.
- The new `mysig/ssg` module renders Pamphlet content through Lustre layouts.
- The continuation migration has started with `asset.Task`, `asset.return`, and
  `asset.then`, while preserving existing `asset.Effect` compatibility.
- Two example sites build:
  - `examples/blog`: repo Markdown/Djot content rendered through Pamphlet.
  - `examples/ecommerce`: dummy CMS boundary, static product pages, and a
    Gleam/Lustre cart component source.
- Screenshots were captured:
  - `examples/blog/screenshot.png`
  - `examples/ecommerce/screenshot.png`

## Pros Of Using Mysig

- Explicit assets avoid compiler magic. The code says what it needs.
- Gleam types make layouts, content data, and client components easier to
  refactor than template strings.
- Lustre gives one component model for server-rendered HTML and client-side
  interactivity.
- Continuations are a good fit for SSG effects: the same content traversal can
  be interpreted as pure, fallible, async, or stateful.
- Development and production can share the same artifact model: lazy in dev,
  eager in production.

## Cons And Risks

- The SSG is not yet Zola-feature-complete. Taxonomies, pagination, aliases,
  RSS, sitemap, drafts, and full image processing still need implementation.
- The image processing answer should be an external runner, probably Sharp via
  Node. Pure Gleam image codecs would be high effort and low leverage.
- Current Node FFI dependencies mean fresh projects may need npm dependencies
  even when they only use a subset of Mysig. That should be split or documented.
- The ecommerce example currently models the CMS as a typed dummy boundary, not
  a real HTTP request, to keep the example reliable offline.
- Migration of `../me` still needs route-by-route parity checks against current
  Jekyll and Zola output.

## Verification

- `gleam test` passes in the Mysig package.
- `examples/blog`: `gleam build` and `gleam run` pass.
- `examples/ecommerce`: `gleam build` and `gleam run` pass.
- Headless Chrome screenshots were generated for both example home pages.

## Measurement

- Track fresh-clone time to first successful SSG build.
- Track generated route parity for `../me`: missing paths, changed paths,
  content-type changes, and asset URL changes.
- Track example usability: can a user add one page, one image, and one client
  component without reading Mysig source?
