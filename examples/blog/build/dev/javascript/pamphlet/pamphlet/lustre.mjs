import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $jot from "../../jot/jot.mjs";
import {
  BlockQuote,
  BulletList,
  Code,
  Codeblock,
  Delete,
  Div,
  Emphasis,
  Footnote,
  Heading,
  Image,
  Insert,
  Linebreak,
  Link,
  LowerAlphaOrdinal,
  Mark,
  MathDisplay,
  MathInline,
  NonBreakingSpace,
  NumericOrdinal,
  OrderedList,
  Paragraph,
  RawBlock,
  Reference,
  Span,
  Strong,
  Subscript,
  Superscript,
  Symbol,
  Text,
  ThematicBreak,
  Tight,
  UpperAlphaOrdinal,
  Url,
} from "../../jot/jot.mjs";
import * as $attribute from "../../lustre/lustre/attribute.mjs";
import * as $element from "../../lustre/lustre/element.mjs";
import * as $html from "../../lustre/lustre/element/html.mjs";
import * as $continuation from "../../midas/midas/continuation.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
  isEqual,
} from "../gleam.mjs";

export class Renderer extends $CustomType {
  constructor(resolve_url, resolve_raw_block, resolve_raw_inline, resolve_symbol) {
    super();
    this.resolve_url = resolve_url;
    this.resolve_raw_block = resolve_raw_block;
    this.resolve_raw_inline = resolve_raw_inline;
    this.resolve_symbol = resolve_symbol;
  }
}
export const Renderer$Renderer = (resolve_url, resolve_raw_block, resolve_raw_inline, resolve_symbol) =>
  new Renderer(resolve_url,
  resolve_raw_block,
  resolve_raw_inline,
  resolve_symbol);
export const Renderer$isRenderer = (value) => value instanceof Renderer;
export const Renderer$Renderer$resolve_url = (value) => value.resolve_url;
export const Renderer$Renderer$0 = (value) => value.resolve_url;
export const Renderer$Renderer$resolve_raw_block = (value) =>
  value.resolve_raw_block;
export const Renderer$Renderer$1 = (value) => value.resolve_raw_block;
export const Renderer$Renderer$resolve_raw_inline = (value) =>
  value.resolve_raw_inline;
export const Renderer$Renderer$2 = (value) => value.resolve_raw_inline;
export const Renderer$Renderer$resolve_symbol = (value) => value.resolve_symbol;
export const Renderer$Renderer$3 = (value) => value.resolve_symbol;

class GeneratedLustre extends $CustomType {
  constructor(elements, used_footnotes) {
    super();
    this.elements = elements;
    this.used_footnotes = used_footnotes;
  }
}

class RenderRefs extends $CustomType {
  constructor(renderer, urls, reference_attributes, footnotes) {
    super();
    this.renderer = renderer;
    this.urls = urls;
    this.reference_attributes = reference_attributes;
    this.footnotes = footnotes;
  }
}

class NoTrim extends $CustomType {}

class TrimLast extends $CustomType {}

/**
 * A renderer that matches `jot.document_to_html` as closely as lustre
 * allows.
 *
 * URLs pass through untouched and symbols render as written inside jot's
 * `<span class="symbol">`. Raw content cannot be spliced into a lustre
 * tree without a wrapper element, so raw blocks render inside a `<div>`
 * and raw inlines inside a `<span>`, both via
 * `element.unsafe_raw_html` — as with `jot.document_to_html`, the content
 * is not escaped, so override these for untrusted documents.
 */
export function default$() {
  return new Renderer(
    $continuation.return$,
    (content) => {
      return $continuation.return$(
        $element.unsafe_raw_html("", "div", toList([]), content),
      );
    },
    (content) => {
      return $continuation.return$(
        $element.unsafe_raw_html("", "span", toList([]), content),
      );
    },
    $continuation.return$,
  );
}

function get_new_footnotes(loop$original_lustre, loop$new_lustre, loop$acc) {
  while (true) {
    let original_lustre = loop$original_lustre;
    let new_lustre = loop$new_lustre;
    let acc = loop$acc;
    let $ = original_lustre.used_footnotes;
    let $1 = new_lustre.used_footnotes;
    if ($1 instanceof $Empty) {
      return acc;
    } else if ($ instanceof $Empty) {
      let new$ = $1.head;
      let rest = $1.tail;
      loop$original_lustre = original_lustre;
      loop$new_lustre = new GeneratedLustre(new_lustre.elements, rest);
      loop$acc = listPrepend(new$, acc);
    } else {
      let new$ = $1.head;
      let original = $.head;
      if (isEqual(original, new$)) {
        return acc;
      } else {
        let new$ = $1.head;
        let rest = $1.tail;
        loop$original_lustre = original_lustre;
        loop$new_lustre = new GeneratedLustre(new_lustre.elements, rest);
        loop$acc = listPrepend(new$, acc);
      }
    }
  }
}

/**
 * Where jot opens a tag, generates content, and closes the tag, a lustre
 * tree wraps the content rendered into `inner` in a parent element.
 * The footnotes used while rendering the content carry over.
 * 
 * @ignore
 */
function wrap_elements(original_lustre, inner, wrap) {
  return new GeneratedLustre(
    listPrepend(wrap($list.reverse(inner.elements)), original_lustre.elements),
    inner.used_footnotes,
  );
}

function append_element(original_lustre, element) {
  return new GeneratedLustre(
    listPrepend(element, original_lustre.elements),
    original_lustre.used_footnotes,
  );
}

function add_footnote_link(lustre, footnote_number) {
  let _pipe = lustre;
  return append_element(
    _pipe,
    $html.a(
      toList([
        $attribute.href("#fnref" + footnote_number),
        $attribute.role("doc-backlink"),
      ]),
      toList([$element.text("↩︎")]),
    ),
  );
}

function attributes_to_lustre(attributes) {
  let _pipe = attributes;
  let _pipe$1 = $dict.to_list(_pipe);
  let _pipe$2 = $list.sort(
    _pipe$1,
    (a, b) => { return $string.compare(a[0], b[0]); },
  );
  return $list.map(
    _pipe$2,
    (pair) => { return $attribute.attribute(pair[0], pair[1]); },
  );
}

function find_footnote_number(
  loop$footnotes_to_check,
  loop$reference,
  loop$used_footnotes
) {
  while (true) {
    let footnotes_to_check = loop$footnotes_to_check;
    let reference = loop$reference;
    let used_footnotes = loop$used_footnotes;
    if (footnotes_to_check instanceof $Empty) {
      let next_number = (() => {
        let _pipe = used_footnotes;
        let _pipe$1 = $list.first(_pipe);
        let _pipe$2 = $result.map(_pipe$1, (f) => { return f[0]; });
        return $result.unwrap(_pipe$2, 0);
      })() + 1;
      return [
        $int.to_string(next_number),
        listPrepend([next_number, reference], used_footnotes),
      ];
    } else {
      let ref = footnotes_to_check.head[1];
      if (reference === ref) {
        let index = footnotes_to_check.head[0];
        return [$int.to_string(index), used_footnotes];
      } else {
        let rest = footnotes_to_check.tail;
        loop$footnotes_to_check = rest;
        loop$reference = reference;
        loop$used_footnotes = used_footnotes;
      }
    }
  }
}

function take_inline_text(loop$inlines, loop$acc) {
  while (true) {
    let inlines = loop$inlines;
    let acc = loop$acc;
    if (inlines instanceof $Empty) {
      return acc;
    } else {
      let first = inlines.head;
      let rest = inlines.tail;
      if (first instanceof Linebreak) {
        loop$inlines = rest;
        loop$acc = acc;
      } else if (first instanceof NonBreakingSpace) {
        loop$inlines = rest;
        loop$acc = acc + " ";
      } else if (first instanceof Text) {
        let text = first[0];
        loop$inlines = rest;
        loop$acc = acc + text;
      } else if (first instanceof Link) {
        let nested = first.content;
        let acc$1 = take_inline_text(nested, acc);
        loop$inlines = rest;
        loop$acc = acc$1;
      } else if (first instanceof Image) {
        let nested = first.content;
        let acc$1 = take_inline_text(nested, acc);
        loop$inlines = rest;
        loop$acc = acc$1;
      } else if (first instanceof Span) {
        let nested = first.content;
        let acc$1 = take_inline_text(nested, acc);
        loop$inlines = rest;
        loop$acc = acc$1;
      } else if (first instanceof Emphasis) {
        let inlines$1 = first.content;
        loop$inlines = $list.append(inlines$1, rest);
        loop$acc = acc;
      } else if (first instanceof Strong) {
        let inlines$1 = first.content;
        loop$inlines = $list.append(inlines$1, rest);
        loop$acc = acc;
      } else if (first instanceof Delete) {
        let inlines$1 = first.content;
        loop$inlines = $list.append(inlines$1, rest);
        loop$acc = acc;
      } else if (first instanceof Insert) {
        let inlines$1 = first.content;
        loop$inlines = $list.append(inlines$1, rest);
        loop$acc = acc;
      } else if (first instanceof Mark) {
        let inlines$1 = first.content;
        loop$inlines = $list.append(inlines$1, rest);
        loop$acc = acc;
      } else if (first instanceof Superscript) {
        let inlines$1 = first.content;
        loop$inlines = $list.append(inlines$1, rest);
        loop$acc = acc;
      } else if (first instanceof Subscript) {
        let inlines$1 = first.content;
        loop$inlines = $list.append(inlines$1, rest);
        loop$acc = acc;
      } else if (first instanceof Footnote) {
        loop$inlines = rest;
        loop$acc = acc;
      } else if (first instanceof Code) {
        let text = first.content;
        loop$inlines = rest;
        loop$acc = acc + text;
      } else if (first instanceof MathInline) {
        let text = first.content;
        loop$inlines = rest;
        loop$acc = acc + text;
      } else if (first instanceof MathDisplay) {
        let text = first.content;
        loop$inlines = rest;
        loop$acc = acc + text;
      } else {
        let text = first.content;
        loop$inlines = rest;
        loop$acc = acc + text;
      }
    }
  }
}

function destination_attribute(key, destination, refs) {
  let dict = $dict.new$();
  if (destination instanceof Reference) {
    let id = destination[0];
    let $ = $dict.get(refs.urls, id);
    if ($ instanceof Ok) {
      let url = $[0];
      return $continuation.then$(
        refs.renderer.resolve_url(url),
        (url) => { return $continuation.return$($dict.insert(dict, key, url)); },
      );
    } else {
      return $continuation.return$(dict);
    }
  } else {
    let url = destination[0];
    return $continuation.then$(
      refs.renderer.resolve_url(url),
      (url) => { return $continuation.return$($dict.insert(dict, key, url)); },
    );
  }
}

function get_reference_attributes(destination, refs) {
  if (destination instanceof Reference) {
    let id = destination[0];
    let _pipe = $dict.get(refs.reference_attributes, id);
    return $result.unwrap(_pipe, $dict.new$());
  } else {
    return $dict.new$();
  }
}

function inline_to_lustre(lustre, inline, refs, trim) {
  if (inline instanceof Linebreak) {
    return $continuation.return$(
      (() => {
        let _pipe = lustre;
        return append_element(_pipe, $html.br(toList([])));
      })(),
    );
  } else if (inline instanceof NonBreakingSpace) {
    return $continuation.return$(
      (() => {
        let _pipe = lustre;
        return append_element(_pipe, $element.text("\u{00A0}"));
      })(),
    );
  } else if (inline instanceof Text) {
    let text = inline[0];
    let _block;
    if (trim instanceof NoTrim) {
      _block = text;
    } else {
      _block = $string.trim_end(text);
    }
    let text$1 = _block;
    if (text$1 === "") {
      return $continuation.return$(lustre);
    } else {
      let text$2 = text$1;
      return $continuation.return$(
        append_element(lustre, $element.text(text$2)),
      );
    }
  } else if (inline instanceof Link) {
    let attributes = inline.attributes;
    let text = inline.content;
    let destination = inline.destination;
    let ref_attrs = get_reference_attributes(destination, refs);
    return $continuation.then$(
      destination_attribute("href", destination, refs),
      (destination_attrs) => {
        let _block;
        let _pipe = ref_attrs;
        let _pipe$1 = $dict.merge(_pipe, destination_attrs);
        _block = $dict.merge(_pipe$1, attributes);
        let attrs = _block;
        return $continuation.then$(
          inlines_to_lustre(
            new GeneratedLustre(toList([]), lustre.used_footnotes),
            text,
            refs,
            trim,
          ),
          (inner) => {
            return $continuation.return$(
              wrap_elements(
                lustre,
                inner,
                (_capture) => {
                  return $html.a(attributes_to_lustre(attrs), _capture);
                },
              ),
            );
          },
        );
      },
    );
  } else if (inline instanceof Image) {
    let attributes = inline.attributes;
    let text = inline.content;
    let destination = inline.destination;
    let ref_attrs = get_reference_attributes(destination, refs);
    return $continuation.then$(
      destination_attribute("src", destination, refs),
      (destination_attrs) => {
        let _block;
        let _pipe = ref_attrs;
        let _pipe$1 = $dict.merge(_pipe, destination_attrs);
        let _pipe$2 = $dict.insert(_pipe$1, "alt", take_inline_text(text, ""));
        _block = $dict.merge(_pipe$2, attributes);
        let attrs = _block;
        return $continuation.return$(
          (() => {
            let _pipe$3 = lustre;
            return append_element(
              _pipe$3,
              $html.img(attributes_to_lustre(attrs)),
            );
          })(),
        );
      },
    );
  } else if (inline instanceof Span) {
    let attributes = inline.attributes;
    let inlines = inline.content;
    return $continuation.then$(
      inlines_to_lustre(
        new GeneratedLustre(toList([]), lustre.used_footnotes),
        inlines,
        refs,
        trim,
      ),
      (inner) => {
        return $continuation.return$(
          wrap_elements(
            lustre,
            inner,
            (_capture) => {
              return $html.span(attributes_to_lustre(attributes), _capture);
            },
          ),
        );
      },
    );
  } else if (inline instanceof Emphasis) {
    let inlines = inline.content;
    return $continuation.then$(
      inlines_to_lustre(
        new GeneratedLustre(toList([]), lustre.used_footnotes),
        inlines,
        refs,
        trim,
      ),
      (inner) => {
        return $continuation.return$(
          wrap_elements(
            lustre,
            inner,
            (_capture) => { return $html.em(toList([]), _capture); },
          ),
        );
      },
    );
  } else if (inline instanceof Strong) {
    let inlines = inline.content;
    return $continuation.then$(
      inlines_to_lustre(
        new GeneratedLustre(toList([]), lustre.used_footnotes),
        inlines,
        refs,
        trim,
      ),
      (inner) => {
        return $continuation.return$(
          wrap_elements(
            lustre,
            inner,
            (_capture) => { return $html.strong(toList([]), _capture); },
          ),
        );
      },
    );
  } else if (inline instanceof Delete) {
    let inlines = inline.content;
    return $continuation.then$(
      inlines_to_lustre(
        new GeneratedLustre(toList([]), lustre.used_footnotes),
        inlines,
        refs,
        new NoTrim(),
      ),
      (inner) => {
        return $continuation.return$(
          wrap_elements(
            lustre,
            inner,
            (_capture) => { return $html.del(toList([]), _capture); },
          ),
        );
      },
    );
  } else if (inline instanceof Insert) {
    let inlines = inline.content;
    return $continuation.then$(
      inlines_to_lustre(
        new GeneratedLustre(toList([]), lustre.used_footnotes),
        inlines,
        refs,
        new NoTrim(),
      ),
      (inner) => {
        return $continuation.return$(
          wrap_elements(
            lustre,
            inner,
            (_capture) => { return $html.ins(toList([]), _capture); },
          ),
        );
      },
    );
  } else if (inline instanceof Mark) {
    let inlines = inline.content;
    return $continuation.then$(
      inlines_to_lustre(
        new GeneratedLustre(toList([]), lustre.used_footnotes),
        inlines,
        refs,
        new NoTrim(),
      ),
      (inner) => {
        return $continuation.return$(
          wrap_elements(
            lustre,
            inner,
            (_capture) => { return $html.mark(toList([]), _capture); },
          ),
        );
      },
    );
  } else if (inline instanceof Superscript) {
    let inlines = inline.content;
    return $continuation.then$(
      inlines_to_lustre(
        new GeneratedLustre(toList([]), lustre.used_footnotes),
        inlines,
        refs,
        new NoTrim(),
      ),
      (inner) => {
        return $continuation.return$(
          wrap_elements(
            lustre,
            inner,
            (_capture) => { return $html.sup(toList([]), _capture); },
          ),
        );
      },
    );
  } else if (inline instanceof Subscript) {
    let inlines = inline.content;
    return $continuation.then$(
      inlines_to_lustre(
        new GeneratedLustre(toList([]), lustre.used_footnotes),
        inlines,
        refs,
        new NoTrim(),
      ),
      (inner) => {
        return $continuation.return$(
          wrap_elements(
            lustre,
            inner,
            (_capture) => { return $html.sub(toList([]), _capture); },
          ),
        );
      },
    );
  } else if (inline instanceof Footnote) {
    let reference = inline.reference;
    let $ = find_footnote_number(
      lustre.used_footnotes,
      reference,
      lustre.used_footnotes,
    );
    let footnote_number = $[0];
    let new_used_footnotes = $[1];
    let footnote_attrs = toList([
      $attribute.id("fnref" + footnote_number),
      $attribute.href("#fn" + footnote_number),
      $attribute.role("doc-noteref"),
    ]);
    let _block;
    let _pipe = lustre;
    _block = append_element(
      _pipe,
      $html.a(
        footnote_attrs,
        toList([$html.sup(toList([]), toList([$element.text(footnote_number)]))]),
      ),
    );
    let updated_lustre = _block;
    return $continuation.return$(
      new GeneratedLustre(updated_lustre.elements, new_used_footnotes),
    );
  } else if (inline instanceof Code) {
    let content = inline.content;
    return $continuation.return$(
      (() => {
        let _pipe = lustre;
        return append_element(
          _pipe,
          $html.code(toList([]), toList([$element.text(content)])),
        );
      })(),
    );
  } else if (inline instanceof MathInline) {
    let latex = inline.content;
    let latex$1 = ("\\(" + latex) + "\\)";
    return $continuation.return$(
      (() => {
        let _pipe = lustre;
        return append_element(
          _pipe,
          $html.span(
            toList([$attribute.class$("math inline")]),
            toList([$element.text(latex$1)]),
          ),
        );
      })(),
    );
  } else if (inline instanceof MathDisplay) {
    let latex = inline.content;
    let latex$1 = ("\\[" + latex) + "\\]";
    return $continuation.return$(
      (() => {
        let _pipe = lustre;
        return append_element(
          _pipe,
          $html.span(
            toList([$attribute.class$("math display")]),
            toList([$element.text(latex$1)]),
          ),
        );
      })(),
    );
  } else {
    let content = inline.content;
    return $continuation.then$(
      refs.renderer.resolve_symbol(content),
      (text) => {
        return $continuation.return$(
          (() => {
            let _pipe = lustre;
            return append_element(
              _pipe,
              $html.span(
                toList([$attribute.class$("symbol")]),
                toList([$element.text(text)]),
              ),
            );
          })(),
        );
      },
    );
  }
}

function inlines_to_lustre(lustre, inlines, refs, trim) {
  if (inlines instanceof $Empty) {
    return $continuation.return$(lustre);
  } else {
    let $ = inlines.tail;
    if ($ instanceof $Empty) {
      if (trim instanceof TrimLast) {
        let inline = inlines.head;
        let _pipe = lustre;
        return inline_to_lustre(_pipe, inline, refs, trim);
      } else {
        let inline = inlines.head;
        let rest = $;
        return $continuation.then$(
          inline_to_lustre(lustre, inline, refs, new NoTrim()),
          (lustre) => { return inlines_to_lustre(lustre, rest, refs, trim); },
        );
      }
    } else {
      let $1 = inlines.head;
      if ($1 instanceof Code) {
        let $2 = $.head;
        if ($2 instanceof Text) {
          let $3 = $2[0];
          if ($3.startsWith("{=html}")) {
            let other = $.tail;
            let content = $1.content;
            let rest = $3.slice(7);
            return $continuation.then$(
              refs.renderer.resolve_raw_inline(content),
              (element) => {
                let _block;
                let _pipe = lustre;
                _block = append_element(_pipe, element);
                let lustre$1 = _block;
                if (rest === "") {
                  return inlines_to_lustre(lustre$1, other, refs, trim);
                } else {
                  return inlines_to_lustre(
                    lustre$1,
                    listPrepend(new Text(rest), other),
                    refs,
                    trim,
                  );
                }
              },
            );
          } else {
            let inline = $1;
            let rest = $;
            return $continuation.then$(
              inline_to_lustre(lustre, inline, refs, new NoTrim()),
              (lustre) => { return inlines_to_lustre(lustre, rest, refs, trim); },
            );
          }
        } else {
          let inline = $1;
          let rest = $;
          return $continuation.then$(
            inline_to_lustre(lustre, inline, refs, new NoTrim()),
            (lustre) => { return inlines_to_lustre(lustre, rest, refs, trim); },
          );
        }
      } else {
        let inline = $1;
        let rest = $;
        return $continuation.then$(
          inline_to_lustre(lustre, inline, refs, new NoTrim()),
          (lustre) => { return inlines_to_lustre(lustre, rest, refs, trim); },
        );
      }
    }
  }
}

function add_attribute(attributes, key, value) {
  if (key === "class") {
    return $dict.upsert(
      attributes,
      key,
      (previous) => {
        if (previous instanceof Some) {
          let previous$1 = previous[0];
          return (previous$1 + " ") + value;
        } else {
          return value;
        }
      },
    );
  } else {
    return $dict.insert(attributes, key, value);
  }
}

function containers_to_lustre(containers, refs, lustre) {
  if (containers instanceof $Empty) {
    return $continuation.return$(lustre);
  } else {
    let container = containers.head;
    let rest = containers.tail;
    return $continuation.then$(
      container_to_lustre(lustre, container, refs),
      (lustre) => { return containers_to_lustre(rest, refs, lustre); },
    );
  }
}

function list_items_to_lustre(lustre, layout, items, refs) {
  if (items instanceof $Empty) {
    return $continuation.return$(lustre);
  } else {
    let $ = items.head;
    if ($ instanceof $Empty) {
      let item = $;
      let rest = items.tail;
      return $continuation.then$(
        containers_to_lustre(
          item,
          refs,
          new GeneratedLustre(toList([]), lustre.used_footnotes),
        ),
        (inner) => {
          let _pipe = lustre;
          let _pipe$1 = wrap_elements(
            _pipe,
            inner,
            (_capture) => { return $html.li(toList([]), _capture); },
          );
          return list_items_to_lustre(_pipe$1, layout, rest, refs);
        },
      );
    } else {
      let $1 = $.tail;
      if ($1 instanceof $Empty) {
        let $2 = $.head;
        if ($2 instanceof Paragraph && layout instanceof Tight) {
          let rest = items.tail;
          let inlines = $2.content;
          return $continuation.then$(
            inlines_to_lustre(
              new GeneratedLustre(toList([]), lustre.used_footnotes),
              inlines,
              refs,
              new TrimLast(),
            ),
            (inner) => {
              let _pipe = lustre;
              let _pipe$1 = wrap_elements(
                _pipe,
                inner,
                (_capture) => { return $html.li(toList([]), _capture); },
              );
              return list_items_to_lustre(_pipe$1, layout, rest, refs);
            },
          );
        } else {
          let item = $;
          let rest = items.tail;
          return $continuation.then$(
            containers_to_lustre(
              item,
              refs,
              new GeneratedLustre(toList([]), lustre.used_footnotes),
            ),
            (inner) => {
              let _pipe = lustre;
              let _pipe$1 = wrap_elements(
                _pipe,
                inner,
                (_capture) => { return $html.li(toList([]), _capture); },
              );
              return list_items_to_lustre(_pipe$1, layout, rest, refs);
            },
          );
        }
      } else {
        let $2 = $.head;
        if ($2 instanceof Paragraph && layout instanceof Tight) {
          let rest = items.tail;
          let nested_list = $1.head;
          let item_rest = $1.tail;
          let inlines = $2.content;
          return $continuation.then$(
            inlines_to_lustre(
              new GeneratedLustre(toList([]), lustre.used_footnotes),
              inlines,
              refs,
              new TrimLast(),
            ),
            (inner) => {
              return $continuation.then$(
                containers_to_lustre(
                  listPrepend(nested_list, item_rest),
                  refs,
                  inner,
                ),
                (inner) => {
                  let _pipe = lustre;
                  let _pipe$1 = wrap_elements(
                    _pipe,
                    inner,
                    (_capture) => { return $html.li(toList([]), _capture); },
                  );
                  return list_items_to_lustre(_pipe$1, layout, rest, refs);
                },
              );
            },
          );
        } else {
          let item = $;
          let rest = items.tail;
          return $continuation.then$(
            containers_to_lustre(
              item,
              refs,
              new GeneratedLustre(toList([]), lustre.used_footnotes),
            ),
            (inner) => {
              let _pipe = lustre;
              let _pipe$1 = wrap_elements(
                _pipe,
                inner,
                (_capture) => { return $html.li(toList([]), _capture); },
              );
              return list_items_to_lustre(_pipe$1, layout, rest, refs);
            },
          );
        }
      }
    }
  }
}

function container_to_lustre(lustre, container, refs) {
  if (container instanceof ThematicBreak) {
    return $continuation.return$(
      (() => {
        let _pipe = lustre;
        return append_element(_pipe, $html.hr(toList([])));
      })(),
    );
  } else if (container instanceof Paragraph) {
    let attrs = container.attributes;
    let inlines = container.content;
    return $continuation.then$(
      inlines_to_lustre(
        new GeneratedLustre(toList([]), lustre.used_footnotes),
        inlines,
        refs,
        new TrimLast(),
      ),
      (inner) => {
        return $continuation.return$(
          wrap_elements(
            lustre,
            inner,
            (_capture) => {
              return $html.p(attributes_to_lustre(attrs), _capture);
            },
          ),
        );
      },
    );
  } else if (container instanceof Heading) {
    let attrs = container.attributes;
    let level = container.level;
    let inlines = container.content;
    let tag = "h" + $int.to_string(level);
    return $continuation.then$(
      inlines_to_lustre(
        new GeneratedLustre(toList([]), lustre.used_footnotes),
        inlines,
        refs,
        new TrimLast(),
      ),
      (inner) => {
        return $continuation.return$(
          wrap_elements(
            lustre,
            inner,
            (_capture) => {
              return $element.element(
                tag,
                attributes_to_lustre(attrs),
                _capture,
              );
            },
          ),
        );
      },
    );
  } else if (container instanceof Codeblock) {
    let attrs = container.attributes;
    let language = container.language;
    let content = container.content;
    let _block;
    if (language instanceof Some) {
      let lang = language[0];
      _block = add_attribute(attrs, "class", "language-" + lang);
    } else {
      _block = attrs;
    }
    let code_attrs = _block;
    return $continuation.return$(
      (() => {
        let _pipe = lustre;
        return append_element(
          _pipe,
          $html.pre(
            toList([]),
            toList([
              $html.code(
                attributes_to_lustre(code_attrs),
                toList([$element.text(content)]),
              ),
            ]),
          ),
        );
      })(),
    );
  } else if (container instanceof RawBlock) {
    let content = container.content;
    return $continuation.then$(
      refs.renderer.resolve_raw_block(content),
      (element) => {
        return $continuation.return$(
          (() => {
            let _pipe = lustre;
            return append_element(_pipe, element);
          })(),
        );
      },
    );
  } else if (container instanceof BulletList) {
    let layout = container.layout;
    let items = container.items;
    return $continuation.then$(
      list_items_to_lustre(
        new GeneratedLustre(toList([]), lustre.used_footnotes),
        layout,
        items,
        refs,
      ),
      (inner) => {
        return $continuation.return$(
          wrap_elements(
            lustre,
            inner,
            (_capture) => { return $html.ul(toList([]), _capture); },
          ),
        );
      },
    );
  } else if (container instanceof OrderedList) {
    let layout = container.layout;
    let ordinal = container.ordinal;
    let start = container.start;
    let items = container.items;
    let _block;
    if (start === 1) {
      _block = $dict.new$();
    } else {
      _block = $dict.from_list(toList([["start", $int.to_string(start)]]));
    }
    let attrs = _block;
    let _block$1;
    if (ordinal instanceof NumericOrdinal) {
      _block$1 = attrs;
    } else if (ordinal instanceof LowerAlphaOrdinal) {
      _block$1 = $dict.insert(attrs, "type", "a");
    } else {
      _block$1 = $dict.insert(attrs, "type", "A");
    }
    let attrs$1 = _block$1;
    return $continuation.then$(
      list_items_to_lustre(
        new GeneratedLustre(toList([]), lustre.used_footnotes),
        layout,
        items,
        refs,
      ),
      (inner) => {
        return $continuation.return$(
          wrap_elements(
            lustre,
            inner,
            (_capture) => {
              return $html.ol(attributes_to_lustre(attrs$1), _capture);
            },
          ),
        );
      },
    );
  } else if (container instanceof BlockQuote) {
    let attrs = container.attributes;
    let items = container.items;
    return $continuation.then$(
      containers_to_lustre(
        items,
        refs,
        new GeneratedLustre(toList([]), lustre.used_footnotes),
      ),
      (inner) => {
        return $continuation.return$(
          wrap_elements(
            lustre,
            inner,
            (_capture) => {
              return $html.blockquote(attributes_to_lustre(attrs), _capture);
            },
          ),
        );
      },
    );
  } else {
    let attributes = container.attributes;
    let items = container.items;
    return $continuation.then$(
      containers_to_lustre(
        items,
        refs,
        new GeneratedLustre(toList([]), lustre.used_footnotes),
      ),
      (inner) => {
        return $continuation.return$(
          wrap_elements(
            lustre,
            inner,
            (_capture) => {
              return $html.div(attributes_to_lustre(attributes), _capture);
            },
          ),
        );
      },
    );
  }
}

function containers_to_lustre_with_last_paragraph(
  containers,
  refs,
  lustre,
  apply
) {
  if (containers instanceof $Empty) {
    return $continuation.return$(lustre);
  } else {
    let $ = containers.tail;
    if ($ instanceof $Empty) {
      let container = containers.head;
      if (container instanceof Paragraph) {
        let attrs = container.attributes;
        let inlines = container.content;
        return $continuation.then$(
          inlines_to_lustre(
            new GeneratedLustre(toList([]), lustre.used_footnotes),
            inlines,
            refs,
            new TrimLast(),
          ),
          (inner) => {
            let inner$1 = apply(inner);
            return $continuation.return$(
              wrap_elements(
                lustre,
                inner$1,
                (_capture) => {
                  return $html.p(attributes_to_lustre(attrs), _capture);
                },
              ),
            );
          },
        );
      } else {
        return $continuation.then$(
          container_to_lustre(lustre, container, refs),
          (lustre) => {
            let inner = apply(
              new GeneratedLustre(toList([]), lustre.used_footnotes),
            );
            return $continuation.return$(
              wrap_elements(
                lustre,
                inner,
                (_capture) => { return $html.p(toList([]), _capture); },
              ),
            );
          },
        );
      }
    } else {
      let container = containers.head;
      let rest = $;
      return $continuation.then$(
        container_to_lustre(lustre, container, refs),
        (lustre) => {
          return containers_to_lustre_with_last_paragraph(
            rest,
            refs,
            lustre,
            apply,
          );
        },
      );
    }
  }
}

function create_footnotes(refs, used_footnotes, lustre_acc) {
  let footnote_to_lustre = (lustre, footnote, footnote_number) => {
    let _block;
    let _pipe = $dict.get(refs.footnotes, footnote);
    _block = $result.try$(
      _pipe,
      (footnote) => {
        let $ = $list.is_empty(footnote);
        if ($) {
          return new Error(undefined);
        } else {
          return new Ok(footnote);
        }
      },
    );
    let footnote$1 = _block;
    if (footnote$1 instanceof Ok) {
      let footnote$2 = footnote$1[0];
      return containers_to_lustre_with_last_paragraph(
        footnote$2,
        refs,
        lustre,
        (_capture) => { return add_footnote_link(_capture, footnote_number); },
      );
    } else {
      let _block$1;
      let _pipe$1 = new GeneratedLustre(toList([]), lustre.used_footnotes);
      _block$1 = add_footnote_link(_pipe$1, footnote_number);
      let inner = _block$1;
      return $continuation.return$(
        wrap_elements(
          lustre,
          inner,
          (_capture) => { return $html.p(toList([]), _capture); },
        ),
      );
    }
  };
  if (used_footnotes instanceof $Empty) {
    return $continuation.return$(lustre_acc);
  } else {
    let other_footnotes = used_footnotes.tail;
    let footnote_number = used_footnotes.head[0];
    let footnote = used_footnotes.head[1];
    let footnote_number$1 = $int.to_string(footnote_number);
    return $continuation.then$(
      footnote_to_lustre(
        new GeneratedLustre(toList([]), lustre_acc.used_footnotes),
        footnote,
        footnote_number$1,
      ),
      (inner) => {
        let _block;
        let _pipe = lustre_acc;
        _block = wrap_elements(
          _pipe,
          inner,
          (_capture) => {
            return $html.li(
              toList([$attribute.id("fn" + footnote_number$1)]),
              _capture,
            );
          },
        );
        let lustre = _block;
        let new_used_footnotes = $list.append(
          get_new_footnotes(lustre_acc, lustre, toList([])),
          other_footnotes,
        );
        return create_footnotes(refs, new_used_footnotes, lustre);
      },
    );
  }
}

/**
 * Render a document to a lustre element.
 * Special forms are resolved through the given renderer.
 *
 * The document's containers (and the footnote section, when the document
 * uses footnotes) are returned as an `element.fragment`.
 *
 * The result is a `Cont(t, Element(msg))`: apply it to a final
 * continuation to run the render. A pure renderer runs at any answer
 * type — `to_lustre(document, default())(fn(element) { element })` — while
 * with `t = Result(Element(msg), e)` a resolver can halt the render by
 * returning an `Error` instead of continuing, and the final continuation
 * is `Ok`.
 */
export function to_lustre(document, renderer) {
  let refs = new RenderRefs(
    renderer,
    document.references,
    document.reference_attributes,
    document.footnotes,
  );
  return $continuation.then$(
    containers_to_lustre(
      document.content,
      refs,
      new GeneratedLustre(toList([]), toList([])),
    ),
    (generated_lustre) => {
      let $ = generated_lustre.used_footnotes;
      if ($ instanceof $Empty) {
        return $continuation.return$(
          $element.fragment($list.reverse(generated_lustre.elements)),
        );
      } else {
        let used_footnotes = $;
        return $continuation.then$(
          create_footnotes(
            refs,
            $list.reverse(used_footnotes),
            new GeneratedLustre(toList([]), used_footnotes),
          ),
          (lustre_with_footnotes) => {
            let footnotes_section = $html.section(
              toList([$attribute.role("doc-endnotes")]),
              toList([
                $html.hr(toList([])),
                $html.ol(
                  toList([]),
                  $list.reverse(lustre_with_footnotes.elements),
                ),
              ]),
            );
            return $continuation.return$(
              $element.fragment(
                $list.reverse(
                  listPrepend(footnotes_section, generated_lustre.elements),
                ),
              ),
            );
          },
        );
      }
    },
  );
}
