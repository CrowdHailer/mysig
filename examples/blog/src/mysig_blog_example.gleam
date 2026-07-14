import filepath
import gleam/io
import gleam/list
import lustre/attribute as a
import lustre/element
import lustre/element/html as h
import mysig/ssg.{type ContentPage}
import simplifile

const posts = [
  #("content/hello.md", "public/hello/index.html"),
  #("content/continuations.md", "public/continuations/index.html"),
]

pub fn main() {
  let assert Ok(Nil) = simplifile.create_directory_all("public")
  let assert Ok(Nil) = write_index()
  write_posts(posts)
  io.println("Built blog example in public/")
}

fn write_index() {
  let html =
    shell("Mysig Blog", [
      h.section([a.class("hero")], [
        h.p([a.class("eyebrow")], [element.text("Repo content")]),
        h.h1([], [element.text("A tiny blog built from Markdown files")]),
        h.p([], [
          element.text(
            "Mysig renders content with Pamphlet and layouts with Lustre.",
          ),
        ]),
      ]),
      h.ul([], [
        h.li([], [h.a([a.href("/hello/")], [element.text("Hello Mysig")])]),
        h.li([], [
          h.a([a.href("/continuations/")], [
            element.text("Continuations for static sites"),
          ]),
        ]),
      ]),
    ])
    |> element.to_document_string()

  simplifile.write("public/index.html", html)
}

fn write_posts(posts) {
  case posts {
    [] -> Nil
    [#(source, output), ..rest] -> {
      let assert Ok(html) = ssg.render_content_file(source, article_layout)
      let assert Ok(Nil) = simplifile.create_directory_all(directory(output))
      let assert Ok(Nil) = simplifile.write(output, html)
      write_posts(rest)
    }
  }
}

fn article_layout(page: ContentPage(msg)) {
  shell(title(page.metadata), [
    h.article([], [
      h.a([a.href("/")], [element.text("Back to posts")]),
      page.content,
    ]),
  ])
}

fn shell(title, children) {
  h.html([a.attribute("lang", "en")], [
    h.head([], [
      h.meta([a.attribute("charset", "utf-8")]),
      h.meta([
        a.name("viewport"),
        a.content("width=device-width, initial-scale=1"),
      ]),
      h.title([], title),
      h.style([], css),
    ]),
    h.body([], [h.main([], children)]),
  ])
}

fn title(metadata) {
  case list.key_find(metadata, "title") {
    Ok(title) -> title
    Error(Nil) -> "Untitled"
  }
}

fn directory(path) {
  filepath.directory_name(path)
}

const css = "
body { margin: 0; font: 18px/1.6 ui-serif, Georgia, serif; color: #1c1917; background: #fafaf9; }
main { max-width: 760px; margin: 0 auto; padding: 72px 24px; }
h1 { font-size: clamp(2.4rem, 8vw, 5rem); line-height: .95; letter-spacing: -.06em; }
a { color: #9f1239; font-weight: 700; }
.hero { border-bottom: 1px solid #ddd6ce; margin-bottom: 36px; }
.eyebrow { color: #9f1239; text-transform: uppercase; letter-spacing: .16em; font: 700 13px/1 sans-serif; }
article { background: white; border: 1px solid #e7e5e4; padding: 32px; box-shadow: 12px 12px 0 #fed7aa; }
"
