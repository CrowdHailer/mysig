# Launch Draft: Mysig SSG

Static sites should not need compiler magic.

Mysig is becoming a static site generator for Gleam and Lustre. Pages are
ordinary Gleam values, layouts are Lustre functions, content is rendered with
Pamphlet, and assets are declared explicitly in code. When you load an image or
bundle a client component, Mysig fingerprints the bytes with SHA-256 and emits
immutable URLs.

The design goal is simple: development and production should build the same
artifacts. Development can be lazy and production can be eager, but both should
walk the same route tree and run the same effect interpreters.

The interesting part is continuations. Content rendering, asset lookup, client
bundling, and future image transforms can all be described once and interpreted
by different runners. A pure runner renders immediately. A fallible runner can
halt with a build error. An async runner can wait for a CMS. A stateful runner
can collect every broken link in one pass.

This first SSG branch includes a Pamphlet/Lustre content renderer, a repo-backed
blog example, a dummy-CMS ecommerce example, and a Gleam client cart component.
The next milestone is migrating my two existing static sites from Jekyll and
Zola to prove Mysig against real content, real media, and real deployment
constraints.

Mysig is for people who want static sites that feel like Gleam: explicit,
typed, small pieces composed by functions.
