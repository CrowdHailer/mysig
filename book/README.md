# Mysig Book

Mysig is a small, explicit toolkit for building static sites and Gleam web apps without compiler magic. This book teaches the pieces you need to build a static site with Mysig today, and records the image-resizing design needed for parity with generators such as Zola.

The examples assume a JavaScript-target Gleam project using Lustre for HTML, Pamphlet for content, Simplifile for files, and Mysig for static export and asset handling.

## Chapters

1. [Mental Model](./mental-model.md)
2. [Project Setup](./project-setup.md)
3. [Pages And Layouts](./pages-and-layouts.md)
4. [Content Collections](./content-collections.md)
5. [Static Files And Assets](./static-files-and-assets.md)
6. [Data At Build Time](./data-at-build-time.md)
7. [Image Resizing](./image-resizing.md)
8. [Development, Export, And Deploy](./development-export-deploy.md)

## What You Will Build

A Mysig static site is just a Gleam program that produces files:

```gleam
pub fn main() {
  let assert Ok(files) = ssg.passthrough_files("static", "public")
  let assert Ok(Nil) = ssg.write_files(files, ".")
}
```

As the site grows, you add typed layouts, Markdown collections, data loaders, client bundles, and image transforms. Mysig keeps these as ordinary values so development and production can share the same build model.
