# Content Collections

Content collections turn many source files into rendered pages. Mysig uses Pamphlet to parse front matter and Djot content.

```gleam
import filepath
import gleam/list
import lustre/element
import lustre/element/html as h
import mysig/ssg.{type CollectionPage}

fn build_posts() {
  use entries <- result_try(ssg.content_entries("content", "public", ["md"]))
  use files <- result_try(ssg.render_collection(entries, article_layout))
  ssg.write_files(files, ".")
}

fn article_layout(page: CollectionPage(msg)) {
  shell(title(page.metadata), [
    h.article([], [page.content]),
  ])
}

fn title(metadata) {
  case list.key_find(metadata, "title") {
    Ok(title) -> title
    Error(Nil) -> "Untitled"
  }
}
```

## Front Matter

Pamphlet returns metadata as `List(#(String, String))`. Keep metadata lookup at the boundary and convert strings into richer types in your own site code when needed.

Useful fields for a blog:

- `title`
- `description`
- `date`
- `draft`
- `tags`
- `canonical`
- `share_image`
- `share_alt`

## Excluding Source Directories

When walking a repository root, exclude directories that should never be public output:

```gleam
let excluded = [".git", "build", "public", "node_modules", "_layouts"]
let assert Ok(paths) = ssg.collect_files_excluding(".", ["md"], excluded)
```

This matters when migrating existing sites with generated output, templates, or project documentation inside the same repository.
