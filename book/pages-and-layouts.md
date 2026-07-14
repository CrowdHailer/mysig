# Pages And Layouts

Mysig pages are Lustre elements rendered to strings. Keep layouts as functions so all page structure remains typed Gleam code.

```gleam
import lustre/attribute as a
import lustre/element
import lustre/element/html as h

fn shell(title, children) {
  h.html([a.attribute("lang", "en")], [
    h.head([], [
      h.meta([a.attribute("charset", "utf-8")]),
      h.meta([a.name("viewport"), a.content("width=device-width, initial-scale=1")]),
      h.title([], title),
    ]),
    h.body([], [h.main([], children)]),
  ])
}

fn home() {
  shell("Home", [
    h.h1([], [element.text("Hello Mysig")]),
    h.p([], [element.text("A static page rendered by Gleam.")]),
  ])
  |> element.to_document_string()
}
```

Write the result to `public/index.html` with `simplifile.write` or collect it as an `ssg.File` and pass it to `ssg.write_files`.

## Clean URLs

Use `index.html` files for clean URLs:

- `/` maps to `public/index.html`.
- `/about/` maps to `public/about/index.html`.
- `/posts/hello/` maps to `public/posts/hello/index.html`.

Mysig's collection helpers map `about.md` to `about/index.html` and `section/index.md` to `section/index.html`.
