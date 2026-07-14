import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $int from "../../gleam_stdlib/gleam/int.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../gleam_stdlib/gleam/option.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $jot from "../../jot/jot.mjs";
import * as $continuation from "../../midas/midas/continuation.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
  toBitArray,
  bitArraySlice,
  stringBits,
} from "../gleam.mjs";

export class Renderer extends $CustomType {
  constructor(resolve_url) {
    super();
    this.resolve_url = resolve_url;
  }
}
export const Renderer$Renderer = (resolve_url) => new Renderer(resolve_url);
export const Renderer$isRenderer = (value) => value instanceof Renderer;
export const Renderer$Renderer$resolve_url = (value) => value.resolve_url;
export const Renderer$Renderer$0 = (value) => value.resolve_url;

export function default$() {
  return new Renderer($continuation.return$);
}

function escape_attribute_value(value) {
  let _pipe = value;
  let _pipe$1 = $string.replace(_pipe, "\\", "\\\\");
  return $string.replace(_pipe$1, "\"", "\\\"");
}

function render_classes(value) {
  let _pipe = value;
  let _pipe$1 = $string.split(_pipe, " ");
  return $list.filter_map(
    _pipe$1,
    (class$) => {
      if (class$ === "") {
        return new Error(undefined);
      } else {
        let class$1 = class$;
        return new Ok("." + class$1);
      }
    },
  );
}

function attributes_to_string(attributes) {
  let _block;
  let $ = $dict.get(attributes, "class");
  if ($ instanceof Ok) {
    let classes = $[0];
    _block = render_classes(classes);
  } else {
    _block = toList([]);
  }
  let classes = _block;
  let _block$1;
  let $1 = $dict.get(attributes, "id");
  if ($1 instanceof Ok) {
    let id = $1[0];
    _block$1 = toList(["#" + id]);
  } else {
    _block$1 = toList([]);
  }
  let id = _block$1;
  let _block$2;
  let _pipe = attributes;
  let _pipe$1 = $dict.delete$(_pipe, "class");
  let _pipe$2 = $dict.delete$(_pipe$1, "id");
  let _pipe$3 = $dict.to_list(_pipe$2);
  _block$2 = $list.map(
    _pipe$3,
    (attribute) => {
      let key = attribute[0];
      let value = attribute[1];
      return ((key + "=\"") + escape_attribute_value(value)) + "\"";
    },
  );
  let other_attributes = _block$2;
  let rendered = $list.flatten(toList([classes, id, other_attributes]));
  if (rendered instanceof $Empty) {
    return "";
  } else {
    return ("{" + $string.join(rendered, " ")) + "}";
  }
}

function block_attributes(attributes) {
  let $ = attributes_to_string(attributes);
  if ($ === "") {
    return $;
  } else {
    let attributes$1 = $;
    return attributes$1 + "\n";
  }
}

function remove_class(attributes, class_to_remove) {
  let $ = $dict.get(attributes, "class");
  if ($ instanceof Ok) {
    let classes = $[0];
    let _block;
    let _pipe = classes;
    let _pipe$1 = $string.split(_pipe, " ");
    let _pipe$2 = $list.filter(
      _pipe$1,
      (class$) => { return (class$ !== "") && (class$ !== class_to_remove); },
    );
    _block = $string.join(_pipe$2, " ");
    let remaining = _block;
    if (remaining === "") {
      return $dict.delete$(attributes, "class");
    } else {
      return $dict.insert(attributes, "class", remaining);
    }
  } else {
    return attributes;
  }
}

function div(class$, attributes, content) {
  let _block;
  if (class$ instanceof Some) {
    let class$1 = class$[0];
    _block = remove_class(attributes, class$1);
  } else {
    _block = attributes;
  }
  let attributes$1 = _block;
  let _block$1;
  if (class$ instanceof Some) {
    let class$1 = class$[0];
    _block$1 = "::: " + class$1;
  } else {
    _block$1 = ":::";
  }
  let opening = _block$1;
  return (((block_attributes(attributes$1) + opening) + "\n") + content) + "\n:::";
}

function block_quote(attributes, content) {
  return block_attributes(attributes) + (() => {
    let _pipe = content;
    let _pipe$1 = $string.split(_pipe, "\n");
    let _pipe$2 = $list.map(
      _pipe$1,
      (line) => {
        if (line === "") {
          return ">";
        } else {
          let line$1 = line;
          return "> " + line$1;
        }
      },
    );
    return $string.join(_pipe$2, "\n");
  })();
}

function alpha_digit(number) {
  if (number === 0) {
    return "a";
  } else if (number === 1) {
    return "b";
  } else if (number === 2) {
    return "c";
  } else if (number === 3) {
    return "d";
  } else if (number === 4) {
    return "e";
  } else if (number === 5) {
    return "f";
  } else if (number === 6) {
    return "g";
  } else if (number === 7) {
    return "h";
  } else if (number === 8) {
    return "i";
  } else if (number === 9) {
    return "j";
  } else if (number === 10) {
    return "k";
  } else if (number === 11) {
    return "l";
  } else if (number === 12) {
    return "m";
  } else if (number === 13) {
    return "n";
  } else if (number === 14) {
    return "o";
  } else if (number === 15) {
    return "p";
  } else if (number === 16) {
    return "q";
  } else if (number === 17) {
    return "r";
  } else if (number === 18) {
    return "s";
  } else if (number === 19) {
    return "t";
  } else if (number === 20) {
    return "u";
  } else if (number === 21) {
    return "v";
  } else if (number === 22) {
    return "w";
  } else if (number === 23) {
    return "x";
  } else if (number === 24) {
    return "y";
  } else {
    return "z";
  }
}

function alpha_ordinal(number) {
  let $ = number <= 0;
  if ($) {
    return "";
  } else {
    let adjusted = number - 1;
    let prefix = alpha_ordinal(globalThis.Math.trunc(adjusted / 26));
    return prefix + alpha_digit(adjusted % 26);
  }
}

function ordinal_marker(number, punctuation, ordinal) {
  let _block;
  if (ordinal instanceof $jot.NumericOrdinal) {
    _block = $int.to_string(number);
  } else if (ordinal instanceof $jot.LowerAlphaOrdinal) {
    _block = alpha_ordinal(number);
  } else {
    let _pipe = alpha_ordinal(number);
    _block = $string.uppercase(_pipe);
  }
  let value = _block;
  if (punctuation instanceof $jot.FullStop) {
    return value + ".";
  } else if (punctuation instanceof $jot.SingleParen) {
    return value + ")";
  } else {
    return ("(" + value) + ")";
  }
}

function render_ordered_list(items, punctuation, ordinal, start) {
  if (items instanceof $Empty) {
    return items;
  } else {
    let item = items.head;
    let rest = items.tail;
    let line = (ordinal_marker(start, punctuation, ordinal) + " ") + item;
    return listPrepend(
      line,
      render_ordered_list(rest, punctuation, ordinal, start + 1),
    );
  }
}

function ordered_list(items, layout, punctuation, ordinal, start) {
  let _block;
  if (layout instanceof $jot.Tight) {
    _block = "\n";
  } else {
    _block = "\n\n";
  }
  let separator = _block;
  let _pipe = render_ordered_list(items, punctuation, ordinal, start);
  return $string.join(_pipe, separator);
}

function bullet_list(items, layout, style) {
  let _block;
  if (layout instanceof $jot.Tight) {
    _block = "\n";
  } else {
    _block = "\n\n";
  }
  let separator = _block;
  let _block$1;
  if (style instanceof $jot.BulletDash) {
    _block$1 = "-";
  } else if (style instanceof $jot.BulletStar) {
    _block$1 = "*";
  } else {
    _block$1 = "+";
  }
  let marker = _block$1;
  let _pipe = items;
  let _pipe$1 = $list.map(_pipe, (item) => { return (marker + " ") + item; });
  return $string.join(_pipe$1, separator);
}

function max_ticks(loop$rest, loop$current, loop$max) {
  while (true) {
    let rest = loop$rest;
    let current = loop$current;
    let max = loop$max;
    if (current instanceof Some) {
      if (rest.bitSize >= 8) {
        if (rest.byteAt(0) === 96) {
          let count = current[0];
          let rest$1 = bitArraySlice(rest, 8);
          loop$rest = rest$1;
          loop$current = new Some(count + 1);
          loop$max = max;
        } else {
          let count = current[0];
          let rest$1 = bitArraySlice(rest, 8);
          loop$rest = rest$1;
          loop$current = new None();
          loop$max = $int.max(count, max);
        }
      } else {
        let count = current[0];
        return $int.max(count, max);
      }
    } else if (rest.bitSize >= 8) {
      if (rest.byteAt(0) === 96) {
        let rest$1 = bitArraySlice(rest, 8);
        loop$rest = rest$1;
        loop$current = new Some(1);
        loop$max = max;
      } else {
        let rest$1 = bitArraySlice(rest, 8);
        loop$rest = rest$1;
        loop$current = new None();
        loop$max = max;
      }
    } else {
      return max;
    }
  }
}

function codeblock_fence(content) {
  let ticks = $int.max(
    3,
    max_ticks(toBitArray([stringBits(content)]), new None(), 0) + 1,
  );
  return $string.repeat("`", ticks);
}

function raw_block(content) {
  let fence = codeblock_fence(content);
  let _block;
  let $ = $string.ends_with(content, "\n");
  if ($) {
    _block = content;
  } else {
    _block = content + "\n";
  }
  let content$1 = _block;
  return ((fence + "=html\n") + content$1) + fence;
}

function codeblock(attributes, language, content) {
  let fence = codeblock_fence(content);
  let _block;
  if (language instanceof Some) {
    let language$1 = language[0];
    _block = language$1;
  } else {
    _block = "";
  }
  let language$1 = _block;
  let _block$1;
  let $ = $string.ends_with(content, "\n");
  if ($) {
    _block$1 = content;
  } else {
    _block$1 = content + "\n";
  }
  let content$1 = _block$1;
  return ((((block_attributes(attributes) + fence) + language$1) + "\n") + content$1) + fence;
}

function heading(attributes, level, content) {
  return (((block_attributes(attributes) + $string.repeat("#", level)) + " ") + content) + "\n";
}

function symbol(content) {
  return (":" + content) + ":";
}

function verbatim(content) {
  let count = max_ticks(toBitArray([stringBits(content)]), new None(), 0);
  let wrap = $string.repeat("`", count + 1);
  return (wrap + content) + wrap;
}

function math_display(content) {
  return "$$" + verbatim(content);
}

function math_inline(content) {
  return "$" + verbatim(content);
}

function footnote_reference(content) {
  return ("[" + content) + "]";
}

function subscript(content) {
  return ("~" + content) + "~";
}

function superscript(content) {
  return ("^" + content) + "^";
}

function mark(content) {
  return ("{=" + content) + "=}";
}

function insert(content) {
  return ("{+" + content) + "+}";
}

function delete$(content) {
  return ("{-" + content) + "-}";
}

function strong(content) {
  return ("*" + content) + "*";
}

function emphasis(content) {
  return ("_" + content) + "_";
}

function inline_attributes(attributes) {
  return attributes_to_string(attributes);
}

function span(attributes, content) {
  return (("[" + content) + "]") + inline_attributes(attributes);
}

function image(attributes, content, url) {
  return (((("![" + content) + "](") + url) + ")") + inline_attributes(
    attributes,
  );
}

function reference_image(attributes, content, reference) {
  return (((("![" + content) + "][") + reference) + "]") + inline_attributes(
    attributes,
  );
}

function link(attributes, content, url) {
  return (((("[" + content) + "](") + url) + ")") + inline_attributes(
    attributes,
  );
}

function reference_link(attributes, content, reference) {
  return (((("[" + content) + "][") + reference) + "]") + inline_attributes(
    attributes,
  );
}

function non_breaking_space() {
  return "\\ ";
}

function linebreak() {
  return "\\\n";
}

function inline_to_markup(inline, renderer) {
  let resolve_url = renderer.resolve_url;
  if (inline instanceof $jot.Linebreak) {
    return $continuation.return$(linebreak());
  } else if (inline instanceof $jot.NonBreakingSpace) {
    return $continuation.return$(non_breaking_space());
  } else if (inline instanceof $jot.Text) {
    let text = inline[0];
    return $continuation.return$(text);
  } else if (inline instanceof $jot.Link) {
    let attributes = inline.attributes;
    let content = inline.content;
    let destination = inline.destination;
    if (destination instanceof $jot.Reference) {
      let reference = destination[0];
      return $continuation.then$(
        inlines_to_markup(content, renderer),
        (inlines) => {
          return $continuation.return$(
            reference_link(attributes, inlines, reference),
          );
        },
      );
    } else {
      let url = destination[0];
      return $continuation.then$(
        resolve_url(url),
        (url) => {
          return $continuation.then$(
            inlines_to_markup(content, renderer),
            (inlines) => {
              return $continuation.return$(link(attributes, inlines, url));
            },
          );
        },
      );
    }
  } else if (inline instanceof $jot.Image) {
    let attributes = inline.attributes;
    let content = inline.content;
    let destination = inline.destination;
    if (destination instanceof $jot.Reference) {
      let reference = destination[0];
      return $continuation.then$(
        inlines_to_markup(content, renderer),
        (inlines) => {
          return $continuation.return$(
            reference_image(attributes, inlines, reference),
          );
        },
      );
    } else {
      let url = destination[0];
      return $continuation.then$(
        resolve_url(url),
        (url) => {
          return $continuation.then$(
            inlines_to_markup(content, renderer),
            (inlines) => {
              return $continuation.return$(image(attributes, inlines, url));
            },
          );
        },
      );
    }
  } else if (inline instanceof $jot.Span) {
    let attributes = inline.attributes;
    let content = inline.content;
    return $continuation.then$(
      inlines_to_markup(content, renderer),
      (inlines) => { return $continuation.return$(span(attributes, inlines)); },
    );
  } else if (inline instanceof $jot.Emphasis) {
    let content = inline.content;
    return $continuation.then$(
      inlines_to_markup(content, renderer),
      (inlines) => { return $continuation.return$(emphasis(inlines)); },
    );
  } else if (inline instanceof $jot.Strong) {
    let content = inline.content;
    return $continuation.then$(
      inlines_to_markup(content, renderer),
      (inlines) => { return $continuation.return$(strong(inlines)); },
    );
  } else if (inline instanceof $jot.Delete) {
    let content = inline.content;
    return $continuation.then$(
      inlines_to_markup(content, renderer),
      (inlines) => { return $continuation.return$(delete$(inlines)); },
    );
  } else if (inline instanceof $jot.Insert) {
    let content = inline.content;
    return $continuation.then$(
      inlines_to_markup(content, renderer),
      (inlines) => { return $continuation.return$(insert(inlines)); },
    );
  } else if (inline instanceof $jot.Mark) {
    let content = inline.content;
    return $continuation.then$(
      inlines_to_markup(content, renderer),
      (inlines) => { return $continuation.return$(mark(inlines)); },
    );
  } else if (inline instanceof $jot.Superscript) {
    let content = inline.content;
    return $continuation.then$(
      inlines_to_markup(content, renderer),
      (inlines) => { return $continuation.return$(superscript(inlines)); },
    );
  } else if (inline instanceof $jot.Subscript) {
    let content = inline.content;
    return $continuation.then$(
      inlines_to_markup(content, renderer),
      (inlines) => { return $continuation.return$(subscript(inlines)); },
    );
  } else if (inline instanceof $jot.Footnote) {
    let reference = inline.reference;
    return $continuation.return$(footnote_reference(reference));
  } else if (inline instanceof $jot.Code) {
    let content = inline.content;
    return $continuation.return$(verbatim(content));
  } else if (inline instanceof $jot.MathInline) {
    let content = inline.content;
    return $continuation.return$(math_inline(content));
  } else if (inline instanceof $jot.MathDisplay) {
    let content = inline.content;
    return $continuation.return$(math_display(content));
  } else {
    let content = inline.content;
    return $continuation.return$(symbol(content));
  }
}

function inlines_to_markup(inlines, renderer) {
  return $continuation.then$(
    $continuation.each(
      inlines,
      (_capture) => { return inline_to_markup(_capture, renderer); },
    ),
    (inlines) => { return $continuation.return$($string.join(inlines, "")); },
  );
}

function paragraph(attributes, content) {
  return block_attributes(attributes) + content;
}

function thematic_break() {
  return "---";
}

function container_to_markup(container, renderer) {
  if (container instanceof $jot.ThematicBreak) {
    return $continuation.return$(thematic_break());
  } else if (container instanceof $jot.Paragraph) {
    let attributes = container.attributes;
    let content = container.content;
    return $continuation.then$(
      inlines_to_markup(content, renderer),
      (inlines) => {
        return $continuation.return$(paragraph(attributes, inlines));
      },
    );
  } else if (container instanceof $jot.Heading) {
    let attributes = container.attributes;
    let level = container.level;
    let content = container.content;
    return $continuation.then$(
      inlines_to_markup(content, renderer),
      (inlines) => {
        return $continuation.return$(heading(attributes, level, inlines));
      },
    );
  } else if (container instanceof $jot.Codeblock) {
    let attributes = container.attributes;
    let language = container.language;
    let content = container.content;
    return $continuation.return$(codeblock(attributes, language, content));
  } else if (container instanceof $jot.RawBlock) {
    let content = container.content;
    return $continuation.return$(raw_block(content));
  } else if (container instanceof $jot.BulletList) {
    let layout = container.layout;
    let style = container.style;
    let items = container.items;
    return $continuation.then$(
      $continuation.each(
        items,
        (_capture) => { return containers_to_markup(_capture, renderer); },
      ),
      (items) => {
        return $continuation.return$(bullet_list(items, layout, style));
      },
    );
  } else if (container instanceof $jot.OrderedList) {
    let layout = container.layout;
    let punctuation = container.punctuation;
    let ordinal = container.ordinal;
    let start = container.start;
    let items = container.items;
    return $continuation.then$(
      $continuation.each(
        items,
        (_capture) => { return containers_to_markup(_capture, renderer); },
      ),
      (items) => {
        return $continuation.return$(
          ordered_list(items, layout, punctuation, ordinal, start),
        );
      },
    );
  } else if (container instanceof $jot.BlockQuote) {
    let attributes = container.attributes;
    let items = container.items;
    return $continuation.then$(
      containers_to_markup(items, renderer),
      (items) => {
        return $continuation.return$(block_quote(attributes, items));
      },
    );
  } else {
    let class$ = container.class;
    let attributes = container.attributes;
    let items = container.items;
    return $continuation.then$(
      containers_to_markup(items, renderer),
      (items) => {
        return $continuation.return$(div(class$, attributes, items));
      },
    );
  }
}

function containers_to_markup(containers, renderer) {
  return $continuation.then$(
    $continuation.each(
      containers,
      (_capture) => { return container_to_markup(_capture, renderer); },
    ),
    (containers) => {
      let _pipe = containers;
      let _pipe$1 = $string.join(_pipe, "\n");
      return $continuation.return$(_pipe$1);
    },
  );
}

/**
 * Render a document to djot flavoured markup.
 * Special forms are resolved through the given renderer.
 */
export function to_markup(document, renderer) {
  return containers_to_markup(document.content, renderer);
}
