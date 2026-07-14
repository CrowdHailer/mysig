# Mental Model

Mysig is a static-site generator by composition, not by configuration. Your site is a Gleam program. It reads content, renders HTML, copies static files, builds assets, and writes output.

## Core Ideas

- Routes are output paths, normally ending in `index.html` for clean URLs.
- Pages are Lustre element trees rendered to document strings.
- Content is parsed with Pamphlet, which returns metadata and a document body.
- Collections are lists of source files paired with output paths.
- Assets are explicit values declared before rendering code depends on state.
- Production eagerly walks the site, while development can lazily build the same artifacts.

## Why Explicitness Matters

Mysig avoids magic imports such as JavaScript's `import image from "./cat.jpg"`. Instead, a page asks for assets through Mysig APIs, and the runner turns those requests into fingerprinted files.

This keeps the build understandable:

- Gleam owns the data structures.
- The runner owns filesystem and bundling effects.
- HTML is normal Lustre output.
- A byte change creates a new content-addressed URL.

## What Mysig Does Not Hide

Mysig does not hide that static sites are files on disk. You should know where files come from, where they are written, and what external tools are needed. Image resizing is one of those external tools: Mysig should model requested transforms, but Sharp should do the JPEG, PNG, AVIF, and WebP work.
