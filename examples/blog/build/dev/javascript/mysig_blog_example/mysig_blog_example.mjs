import * as $filepath from "../filepath/filepath.mjs";
import * as $io from "../gleam_stdlib/gleam/io.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $a from "../lustre/lustre/attribute.mjs";
import * as $element from "../lustre/lustre/element.mjs";
import * as $h from "../lustre/lustre/element/html.mjs";
import * as $ssg from "../mysig/mysig/ssg.mjs";
import * as $simplifile from "../simplifile/simplifile.mjs";
import { Ok, toList, Empty as $Empty, makeError } from "./gleam.mjs";

const FILEPATH = "src/mysig_blog_example.gleam";

const posts = /* @__PURE__ */ toList([
  ["content/hello.md", "public/hello/index.html"],
  ["content/continuations.md", "public/continuations/index.html"],
]);

const css = "\nbody { margin: 0; font: 18px/1.6 ui-serif, Georgia, serif; color: #1c1917; background: #fafaf9; }\nmain { max-width: 760px; margin: 0 auto; padding: 72px 24px; }\nh1 { font-size: clamp(2.4rem, 8vw, 5rem); line-height: .95; letter-spacing: -.06em; }\na { color: #9f1239; font-weight: 700; }\n.hero { border-bottom: 1px solid #ddd6ce; margin-bottom: 36px; }\n.eyebrow { color: #9f1239; text-transform: uppercase; letter-spacing: .16em; font: 700 13px/1 sans-serif; }\narticle { background: white; border: 1px solid #e7e5e4; padding: 32px; box-shadow: 12px 12px 0 #fed7aa; }\n";

function directory(path) {
  return $filepath.directory_name(path);
}

function title(metadata) {
  let $ = $list.key_find(metadata, "title");
  if ($ instanceof Ok) {
    let title$1 = $[0];
    return title$1;
  } else {
    return "Untitled";
  }
}

function shell(title, children) {
  return $h.html(
    toList([$a.attribute("lang", "en")]),
    toList([
      $h.head(
        toList([]),
        toList([
          $h.meta(toList([$a.attribute("charset", "utf-8")])),
          $h.meta(
            toList([
              $a.name("viewport"),
              $a.content("width=device-width, initial-scale=1"),
            ]),
          ),
          $h.title(toList([]), title),
          $h.style(toList([]), css),
        ]),
      ),
      $h.body(toList([]), toList([$h.main(toList([]), children)])),
    ]),
  );
}

function article_layout(page) {
  return shell(
    title(page.metadata),
    toList([
      $h.article(
        toList([]),
        toList([
          $h.a(toList([$a.href("/")]), toList([$element.text("Back to posts")])),
          page.content,
        ]),
      ),
    ]),
  );
}

function write_posts(loop$posts) {
  while (true) {
    let posts = loop$posts;
    if (posts instanceof $Empty) {
      return undefined;
    } else {
      let rest = posts.tail;
      let source = posts.head[0];
      let output = posts.head[1];
      let $ = $ssg.render_content_file(source, article_layout);
      let html;
      if ($ instanceof Ok) {
        html = $[0];
      } else {
        throw makeError(
          "let_assert",
          FILEPATH,
          "mysig_blog_example",
          52,
          "write_posts",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 1348,
            end: 1417,
            pattern_start: 1359,
            pattern_end: 1367
          }
        )
      }
      let $1 = $simplifile.create_directory_all(directory(output));
      if (!($1 instanceof Ok)) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "mysig_blog_example",
          53,
          "write_posts",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $1,
            start: 1424,
            end: 1495,
            pattern_start: 1435,
            pattern_end: 1442
          }
        )
      }
      let $2 = $simplifile.write(output, html);
      if (!($2 instanceof Ok)) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "mysig_blog_example",
          54,
          "write_posts",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $2,
            start: 1502,
            end: 1553,
            pattern_start: 1513,
            pattern_end: 1520
          }
        )
      }
      loop$posts = rest;
    }
  }
}

function write_index() {
  let _block;
  let _pipe = shell(
    "Mysig Blog",
    toList([
      $h.section(
        toList([$a.class$("hero")]),
        toList([
          $h.p(
            toList([$a.class$("eyebrow")]),
            toList([$element.text("Repo content")]),
          ),
          $h.h1(
            toList([]),
            toList([$element.text("A tiny blog built from Markdown files")]),
          ),
          $h.p(
            toList([]),
            toList([
              $element.text(
                "Mysig renders content with Pamphlet and layouts with Lustre.",
              ),
            ]),
          ),
        ]),
      ),
      $h.ul(
        toList([]),
        toList([
          $h.li(
            toList([]),
            toList([
              $h.a(
                toList([$a.href("/hello/")]),
                toList([$element.text("Hello Mysig")]),
              ),
            ]),
          ),
          $h.li(
            toList([]),
            toList([
              $h.a(
                toList([$a.href("/continuations/")]),
                toList([$element.text("Continuations for static sites")]),
              ),
            ]),
          ),
        ]),
      ),
    ]),
  );
  _block = $element.to_document_string(_pipe);
  let html = _block;
  return $simplifile.write("public/index.html", html);
}

export function main() {
  let $ = $simplifile.create_directory_all("public");
  if (!($ instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "mysig_blog_example",
      16,
      "main",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 345, end: 407, pattern_start: 356, pattern_end: 363 }
    )
  }
  let $1 = write_index();
  if (!($1 instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "mysig_blog_example",
      17,
      "main",
      "Pattern match failed, no pattern matched the value.",
      { value: $1, start: 410, end: 444, pattern_start: 421, pattern_end: 428 }
    )
  }
  write_posts(posts);
  return $io.println("Built blog example in public/");
}
