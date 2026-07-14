import * as $bool from "../gleam_stdlib/gleam/bool.mjs";
import * as $dict from "../gleam_stdlib/gleam/dict.mjs";
import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $option from "../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../gleam_stdlib/gleam/option.mjs";
import * as $result from "../gleam_stdlib/gleam/result.mjs";
import * as $string from "../gleam_stdlib/gleam/string.mjs";
import * as $houdini from "../houdini/houdini.mjs";
import * as $splitter from "../splitter/splitter.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
  isEqual,
} from "./gleam.mjs";

export class Document extends $CustomType {
  constructor(content, references, reference_attributes, footnotes) {
    super();
    this.content = content;
    this.references = references;
    this.reference_attributes = reference_attributes;
    this.footnotes = footnotes;
  }
}
export const Document$Document = (content, references, reference_attributes, footnotes) =>
  new Document(content, references, reference_attributes, footnotes);
export const Document$isDocument = (value) => value instanceof Document;
export const Document$Document$content = (value) => value.content;
export const Document$Document$0 = (value) => value.content;
export const Document$Document$references = (value) => value.references;
export const Document$Document$1 = (value) => value.references;
export const Document$Document$reference_attributes = (value) =>
  value.reference_attributes;
export const Document$Document$2 = (value) => value.reference_attributes;
export const Document$Document$footnotes = (value) => value.footnotes;
export const Document$Document$3 = (value) => value.footnotes;

export class ThematicBreak extends $CustomType {}
export const Container$ThematicBreak = () => new ThematicBreak();
export const Container$isThematicBreak = (value) =>
  value instanceof ThematicBreak;

export class Paragraph extends $CustomType {
  constructor(attributes, content) {
    super();
    this.attributes = attributes;
    this.content = content;
  }
}
export const Container$Paragraph = (attributes, content) =>
  new Paragraph(attributes, content);
export const Container$isParagraph = (value) => value instanceof Paragraph;
export const Container$Paragraph$attributes = (value) => value.attributes;
export const Container$Paragraph$0 = (value) => value.attributes;
export const Container$Paragraph$content = (value) => value.content;
export const Container$Paragraph$1 = (value) => value.content;

export class Heading extends $CustomType {
  constructor(attributes, level, content) {
    super();
    this.attributes = attributes;
    this.level = level;
    this.content = content;
  }
}
export const Container$Heading = (attributes, level, content) =>
  new Heading(attributes, level, content);
export const Container$isHeading = (value) => value instanceof Heading;
export const Container$Heading$attributes = (value) => value.attributes;
export const Container$Heading$0 = (value) => value.attributes;
export const Container$Heading$level = (value) => value.level;
export const Container$Heading$1 = (value) => value.level;
export const Container$Heading$content = (value) => value.content;
export const Container$Heading$2 = (value) => value.content;

export class Codeblock extends $CustomType {
  constructor(attributes, language, content) {
    super();
    this.attributes = attributes;
    this.language = language;
    this.content = content;
  }
}
export const Container$Codeblock = (attributes, language, content) =>
  new Codeblock(attributes, language, content);
export const Container$isCodeblock = (value) => value instanceof Codeblock;
export const Container$Codeblock$attributes = (value) => value.attributes;
export const Container$Codeblock$0 = (value) => value.attributes;
export const Container$Codeblock$language = (value) => value.language;
export const Container$Codeblock$1 = (value) => value.language;
export const Container$Codeblock$content = (value) => value.content;
export const Container$Codeblock$2 = (value) => value.content;

export class RawBlock extends $CustomType {
  constructor(content) {
    super();
    this.content = content;
  }
}
export const Container$RawBlock = (content) => new RawBlock(content);
export const Container$isRawBlock = (value) => value instanceof RawBlock;
export const Container$RawBlock$content = (value) => value.content;
export const Container$RawBlock$0 = (value) => value.content;

export class BulletList extends $CustomType {
  constructor(layout, style, items) {
    super();
    this.layout = layout;
    this.style = style;
    this.items = items;
  }
}
export const Container$BulletList = (layout, style, items) =>
  new BulletList(layout, style, items);
export const Container$isBulletList = (value) => value instanceof BulletList;
export const Container$BulletList$layout = (value) => value.layout;
export const Container$BulletList$0 = (value) => value.layout;
export const Container$BulletList$style = (value) => value.style;
export const Container$BulletList$1 = (value) => value.style;
export const Container$BulletList$items = (value) => value.items;
export const Container$BulletList$2 = (value) => value.items;

export class OrderedList extends $CustomType {
  constructor(layout, punctuation, ordinal, start, items) {
    super();
    this.layout = layout;
    this.punctuation = punctuation;
    this.ordinal = ordinal;
    this.start = start;
    this.items = items;
  }
}
export const Container$OrderedList = (layout, punctuation, ordinal, start, items) =>
  new OrderedList(layout, punctuation, ordinal, start, items);
export const Container$isOrderedList = (value) => value instanceof OrderedList;
export const Container$OrderedList$layout = (value) => value.layout;
export const Container$OrderedList$0 = (value) => value.layout;
export const Container$OrderedList$punctuation = (value) => value.punctuation;
export const Container$OrderedList$1 = (value) => value.punctuation;
export const Container$OrderedList$ordinal = (value) => value.ordinal;
export const Container$OrderedList$2 = (value) => value.ordinal;
export const Container$OrderedList$start = (value) => value.start;
export const Container$OrderedList$3 = (value) => value.start;
export const Container$OrderedList$items = (value) => value.items;
export const Container$OrderedList$4 = (value) => value.items;

export class BlockQuote extends $CustomType {
  constructor(attributes, items) {
    super();
    this.attributes = attributes;
    this.items = items;
  }
}
export const Container$BlockQuote = (attributes, items) =>
  new BlockQuote(attributes, items);
export const Container$isBlockQuote = (value) => value instanceof BlockQuote;
export const Container$BlockQuote$attributes = (value) => value.attributes;
export const Container$BlockQuote$0 = (value) => value.attributes;
export const Container$BlockQuote$items = (value) => value.items;
export const Container$BlockQuote$1 = (value) => value.items;

export class Div extends $CustomType {
  constructor(class$, attributes, items) {
    super();
    this.class = class$;
    this.attributes = attributes;
    this.items = items;
  }
}
export const Container$Div = (class$, attributes, items) =>
  new Div(class$, attributes, items);
export const Container$isDiv = (value) => value instanceof Div;
export const Container$Div$class = (value) => value.class;
export const Container$Div$0 = (value) => value.class;
export const Container$Div$attributes = (value) => value.attributes;
export const Container$Div$1 = (value) => value.attributes;
export const Container$Div$items = (value) => value.items;
export const Container$Div$2 = (value) => value.items;

export class BulletDash extends $CustomType {}
export const BulletStyle$BulletDash = () => new BulletDash();
export const BulletStyle$isBulletDash = (value) => value instanceof BulletDash;

export class BulletStar extends $CustomType {}
export const BulletStyle$BulletStar = () => new BulletStar();
export const BulletStyle$isBulletStar = (value) => value instanceof BulletStar;

export class BulletPlus extends $CustomType {}
export const BulletStyle$BulletPlus = () => new BulletPlus();
export const BulletStyle$isBulletPlus = (value) => value instanceof BulletPlus;

export class FullStop extends $CustomType {}
export const OrdinalPunctuation$FullStop = () => new FullStop();
export const OrdinalPunctuation$isFullStop = (value) =>
  value instanceof FullStop;

export class SingleParen extends $CustomType {}
export const OrdinalPunctuation$SingleParen = () => new SingleParen();
export const OrdinalPunctuation$isSingleParen = (value) =>
  value instanceof SingleParen;

export class DoubleParen extends $CustomType {}
export const OrdinalPunctuation$DoubleParen = () => new DoubleParen();
export const OrdinalPunctuation$isDoubleParen = (value) =>
  value instanceof DoubleParen;

export class NumericOrdinal extends $CustomType {}
export const OrdinalStyle$NumericOrdinal = () => new NumericOrdinal();
export const OrdinalStyle$isNumericOrdinal = (value) =>
  value instanceof NumericOrdinal;

export class LowerAlphaOrdinal extends $CustomType {}
export const OrdinalStyle$LowerAlphaOrdinal = () => new LowerAlphaOrdinal();
export const OrdinalStyle$isLowerAlphaOrdinal = (value) =>
  value instanceof LowerAlphaOrdinal;

export class UpperAlphaOrdinal extends $CustomType {}
export const OrdinalStyle$UpperAlphaOrdinal = () => new UpperAlphaOrdinal();
export const OrdinalStyle$isUpperAlphaOrdinal = (value) =>
  value instanceof UpperAlphaOrdinal;

class Bullet extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}

class Ordered extends $CustomType {
  constructor(start, punctuation, style) {
    super();
    this.start = start;
    this.punctuation = punctuation;
    this.style = style;
  }
}

export class Linebreak extends $CustomType {}
export const Inline$Linebreak = () => new Linebreak();
export const Inline$isLinebreak = (value) => value instanceof Linebreak;

export class NonBreakingSpace extends $CustomType {}
export const Inline$NonBreakingSpace = () => new NonBreakingSpace();
export const Inline$isNonBreakingSpace = (value) =>
  value instanceof NonBreakingSpace;

export class Text extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Inline$Text = ($0) => new Text($0);
export const Inline$isText = (value) => value instanceof Text;
export const Inline$Text$0 = (value) => value[0];

export class Link extends $CustomType {
  constructor(attributes, content, destination) {
    super();
    this.attributes = attributes;
    this.content = content;
    this.destination = destination;
  }
}
export const Inline$Link = (attributes, content, destination) =>
  new Link(attributes, content, destination);
export const Inline$isLink = (value) => value instanceof Link;
export const Inline$Link$attributes = (value) => value.attributes;
export const Inline$Link$0 = (value) => value.attributes;
export const Inline$Link$content = (value) => value.content;
export const Inline$Link$1 = (value) => value.content;
export const Inline$Link$destination = (value) => value.destination;
export const Inline$Link$2 = (value) => value.destination;

export class Image extends $CustomType {
  constructor(attributes, content, destination) {
    super();
    this.attributes = attributes;
    this.content = content;
    this.destination = destination;
  }
}
export const Inline$Image = (attributes, content, destination) =>
  new Image(attributes, content, destination);
export const Inline$isImage = (value) => value instanceof Image;
export const Inline$Image$attributes = (value) => value.attributes;
export const Inline$Image$0 = (value) => value.attributes;
export const Inline$Image$content = (value) => value.content;
export const Inline$Image$1 = (value) => value.content;
export const Inline$Image$destination = (value) => value.destination;
export const Inline$Image$2 = (value) => value.destination;

export class Span extends $CustomType {
  constructor(attributes, content) {
    super();
    this.attributes = attributes;
    this.content = content;
  }
}
export const Inline$Span = (attributes, content) =>
  new Span(attributes, content);
export const Inline$isSpan = (value) => value instanceof Span;
export const Inline$Span$attributes = (value) => value.attributes;
export const Inline$Span$0 = (value) => value.attributes;
export const Inline$Span$content = (value) => value.content;
export const Inline$Span$1 = (value) => value.content;

export class Emphasis extends $CustomType {
  constructor(content) {
    super();
    this.content = content;
  }
}
export const Inline$Emphasis = (content) => new Emphasis(content);
export const Inline$isEmphasis = (value) => value instanceof Emphasis;
export const Inline$Emphasis$content = (value) => value.content;
export const Inline$Emphasis$0 = (value) => value.content;

export class Strong extends $CustomType {
  constructor(content) {
    super();
    this.content = content;
  }
}
export const Inline$Strong = (content) => new Strong(content);
export const Inline$isStrong = (value) => value instanceof Strong;
export const Inline$Strong$content = (value) => value.content;
export const Inline$Strong$0 = (value) => value.content;

export class Delete extends $CustomType {
  constructor(content) {
    super();
    this.content = content;
  }
}
export const Inline$Delete = (content) => new Delete(content);
export const Inline$isDelete = (value) => value instanceof Delete;
export const Inline$Delete$content = (value) => value.content;
export const Inline$Delete$0 = (value) => value.content;

export class Insert extends $CustomType {
  constructor(content) {
    super();
    this.content = content;
  }
}
export const Inline$Insert = (content) => new Insert(content);
export const Inline$isInsert = (value) => value instanceof Insert;
export const Inline$Insert$content = (value) => value.content;
export const Inline$Insert$0 = (value) => value.content;

export class Mark extends $CustomType {
  constructor(content) {
    super();
    this.content = content;
  }
}
export const Inline$Mark = (content) => new Mark(content);
export const Inline$isMark = (value) => value instanceof Mark;
export const Inline$Mark$content = (value) => value.content;
export const Inline$Mark$0 = (value) => value.content;

export class Superscript extends $CustomType {
  constructor(content) {
    super();
    this.content = content;
  }
}
export const Inline$Superscript = (content) => new Superscript(content);
export const Inline$isSuperscript = (value) => value instanceof Superscript;
export const Inline$Superscript$content = (value) => value.content;
export const Inline$Superscript$0 = (value) => value.content;

export class Subscript extends $CustomType {
  constructor(content) {
    super();
    this.content = content;
  }
}
export const Inline$Subscript = (content) => new Subscript(content);
export const Inline$isSubscript = (value) => value instanceof Subscript;
export const Inline$Subscript$content = (value) => value.content;
export const Inline$Subscript$0 = (value) => value.content;

export class Footnote extends $CustomType {
  constructor(reference) {
    super();
    this.reference = reference;
  }
}
export const Inline$Footnote = (reference) => new Footnote(reference);
export const Inline$isFootnote = (value) => value instanceof Footnote;
export const Inline$Footnote$reference = (value) => value.reference;
export const Inline$Footnote$0 = (value) => value.reference;

export class Code extends $CustomType {
  constructor(content) {
    super();
    this.content = content;
  }
}
export const Inline$Code = (content) => new Code(content);
export const Inline$isCode = (value) => value instanceof Code;
export const Inline$Code$content = (value) => value.content;
export const Inline$Code$0 = (value) => value.content;

export class MathInline extends $CustomType {
  constructor(content) {
    super();
    this.content = content;
  }
}
export const Inline$MathInline = (content) => new MathInline(content);
export const Inline$isMathInline = (value) => value instanceof MathInline;
export const Inline$MathInline$content = (value) => value.content;
export const Inline$MathInline$0 = (value) => value.content;

export class MathDisplay extends $CustomType {
  constructor(content) {
    super();
    this.content = content;
  }
}
export const Inline$MathDisplay = (content) => new MathDisplay(content);
export const Inline$isMathDisplay = (value) => value instanceof MathDisplay;
export const Inline$MathDisplay$content = (value) => value.content;
export const Inline$MathDisplay$0 = (value) => value.content;

export class Symbol extends $CustomType {
  constructor(content) {
    super();
    this.content = content;
  }
}
export const Inline$Symbol = (content) => new Symbol(content);
export const Inline$isSymbol = (value) => value instanceof Symbol;
export const Inline$Symbol$content = (value) => value.content;
export const Inline$Symbol$0 = (value) => value.content;

export class Tight extends $CustomType {}
export const ListLayout$Tight = () => new Tight();
export const ListLayout$isTight = (value) => value instanceof Tight;

export class Loose extends $CustomType {}
export const ListLayout$Loose = () => new Loose();
export const ListLayout$isLoose = (value) => value instanceof Loose;

export class Reference extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Destination$Reference = ($0) => new Reference($0);
export const Destination$isReference = (value) => value instanceof Reference;
export const Destination$Reference$0 = (value) => value[0];

export class Url extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Destination$Url = ($0) => new Url($0);
export const Destination$isUrl = (value) => value instanceof Url;
export const Destination$Url$0 = (value) => value[0];

class Refs extends $CustomType {
  constructor(urls, url_attributes, headings, footnotes) {
    super();
    this.urls = urls;
    this.url_attributes = url_attributes;
    this.headings = headings;
    this.footnotes = footnotes;
  }
}

class Splitters extends $CustomType {
  constructor(verbatim_line_end, codeblock_language, inline, link_destination, math_end) {
    super();
    this.verbatim_line_end = verbatim_line_end;
    this.codeblock_language = codeblock_language;
    this.inline = inline;
    this.link_destination = link_destination;
    this.math_end = math_end;
  }
}

class RenderRefs extends $CustomType {
  constructor(urls, reference_attributes, footnotes) {
    super();
    this.urls = urls;
    this.reference_attributes = reference_attributes;
    this.footnotes = footnotes;
  }
}

class GeneratedHtml extends $CustomType {
  constructor(html, used_footnotes) {
    super();
    this.html = html;
    this.used_footnotes = used_footnotes;
  }
}

class NoTrim extends $CustomType {}

class TrimLast extends $CustomType {}

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

function append_to_html(original_html, str) {
  return new GeneratedHtml(
    original_html.html + str,
    original_html.used_footnotes,
  );
}

function close_tag(initial_html, tag) {
  return new GeneratedHtml(
    ((initial_html.html + "</") + tag) + ">",
    initial_html.used_footnotes,
  );
}

function get_new_footnotes(loop$original_html, loop$new_html, loop$acc) {
  while (true) {
    let original_html = loop$original_html;
    let new_html = loop$new_html;
    let acc = loop$acc;
    let $ = original_html.used_footnotes;
    let $1 = new_html.used_footnotes;
    if ($1 instanceof $Empty) {
      return acc;
    } else if ($ instanceof $Empty) {
      let new$ = $1.head;
      let rest = $1.tail;
      loop$original_html = original_html;
      loop$new_html = new GeneratedHtml(new_html.html, rest);
      loop$acc = listPrepend(new$, acc);
    } else {
      let new$ = $1.head;
      let original = $.head;
      if (isEqual(original, new$)) {
        return acc;
      } else {
        let new$ = $1.head;
        let rest = $1.tail;
        loop$original_html = original_html;
        loop$new_html = new GeneratedHtml(new_html.html, rest);
        loop$acc = listPrepend(new$, acc);
      }
    }
  }
}

function ordered_attributes_to_html(attributes, html) {
  return $list.fold(
    attributes,
    html,
    (html, pair) => {
      return ((((html + " ") + pair[0]) + "=\"") + pair[1]) + "\"";
    },
  );
}

function attributes_to_html(html, attributes) {
  let _pipe = attributes;
  let _pipe$1 = $dict.to_list(_pipe);
  let _pipe$2 = $list.sort(
    _pipe$1,
    (a, b) => { return $string.compare(a[0], b[0]); },
  );
  return ordered_attributes_to_html(_pipe$2, html);
}

function open_tag(initial_html, tag, attributes) {
  let html = (initial_html.html + "<") + tag;
  return new GeneratedHtml(
    attributes_to_html(html, attributes) + ">",
    initial_html.used_footnotes,
  );
}

function open_tag_ordered_attributes(initial_html, tag, attributes) {
  let html = (initial_html.html + "<") + tag;
  return new GeneratedHtml(
    ordered_attributes_to_html(attributes, html) + ">",
    initial_html.used_footnotes,
  );
}

function add_footnote_link(html, footnote_number) {
  let _pipe = html;
  let _pipe$1 = open_tag_ordered_attributes(
    _pipe,
    "a",
    toList([["href", "#fnref" + footnote_number], ["role", "doc-backlink"]]),
  );
  let _pipe$2 = append_to_html(_pipe$1, "↩︎");
  return close_tag(_pipe$2, "a");
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
      return $dict.insert(dict, key, $houdini.escape(url));
    } else {
      return dict;
    }
  } else {
    let url = destination[0];
    return $dict.insert(dict, key, $houdini.escape(url));
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

function inline_to_html(html, inline, refs, trim) {
  if (inline instanceof Linebreak) {
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, "br", $dict.new$());
    return append_to_html(_pipe$1, "\n");
  } else if (inline instanceof NonBreakingSpace) {
    let _pipe = html;
    return append_to_html(_pipe, "&nbsp;");
  } else if (inline instanceof Text) {
    let text = inline[0];
    let text$1 = $houdini.escape(text);
    if (trim instanceof NoTrim) {
      return append_to_html(html, text$1);
    } else {
      return append_to_html(html, $string.trim_end(text$1));
    }
  } else if (inline instanceof Link) {
    let attributes = inline.attributes;
    let text = inline.content;
    let destination = inline.destination;
    let ref_attrs = get_reference_attributes(destination, refs);
    let _block;
    let _pipe = ref_attrs;
    let _pipe$1 = $dict.merge(
      _pipe,
      destination_attribute("href", destination, refs),
    );
    _block = $dict.merge(_pipe$1, attributes);
    let attrs = _block;
    let _pipe$2 = html;
    let _pipe$3 = open_tag(_pipe$2, "a", attrs);
    let _pipe$4 = inlines_to_html(_pipe$3, text, refs, trim);
    return close_tag(_pipe$4, "a");
  } else if (inline instanceof Image) {
    let attributes = inline.attributes;
    let text = inline.content;
    let destination = inline.destination;
    let ref_attrs = get_reference_attributes(destination, refs);
    let _block;
    let _pipe = ref_attrs;
    let _pipe$1 = $dict.merge(
      _pipe,
      destination_attribute("src", destination, refs),
    );
    let _pipe$2 = $dict.insert(
      _pipe$1,
      "alt",
      $houdini.escape(take_inline_text(text, "")),
    );
    _block = $dict.merge(_pipe$2, attributes);
    let attrs = _block;
    let _pipe$3 = html;
    return open_tag(_pipe$3, "img", attrs);
  } else if (inline instanceof Span) {
    let attributes = inline.attributes;
    let inlines = inline.content;
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, "span", attributes);
    let _pipe$2 = inlines_to_html(_pipe$1, inlines, refs, trim);
    return close_tag(_pipe$2, "span");
  } else if (inline instanceof Emphasis) {
    let inlines = inline.content;
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, "em", $dict.new$());
    let _pipe$2 = inlines_to_html(_pipe$1, inlines, refs, trim);
    return close_tag(_pipe$2, "em");
  } else if (inline instanceof Strong) {
    let inlines = inline.content;
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, "strong", $dict.new$());
    let _pipe$2 = inlines_to_html(_pipe$1, inlines, refs, trim);
    return close_tag(_pipe$2, "strong");
  } else if (inline instanceof Delete) {
    let inlines = inline.content;
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, "del", $dict.new$());
    let _pipe$2 = inlines_to_html(_pipe$1, inlines, refs, new NoTrim());
    return close_tag(_pipe$2, "del");
  } else if (inline instanceof Insert) {
    let inlines = inline.content;
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, "ins", $dict.new$());
    let _pipe$2 = inlines_to_html(_pipe$1, inlines, refs, new NoTrim());
    return close_tag(_pipe$2, "ins");
  } else if (inline instanceof Mark) {
    let inlines = inline.content;
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, "mark", $dict.new$());
    let _pipe$2 = inlines_to_html(_pipe$1, inlines, refs, new NoTrim());
    return close_tag(_pipe$2, "mark");
  } else if (inline instanceof Superscript) {
    let inlines = inline.content;
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, "sup", $dict.new$());
    let _pipe$2 = inlines_to_html(_pipe$1, inlines, refs, new NoTrim());
    return close_tag(_pipe$2, "sup");
  } else if (inline instanceof Subscript) {
    let inlines = inline.content;
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, "sub", $dict.new$());
    let _pipe$2 = inlines_to_html(_pipe$1, inlines, refs, new NoTrim());
    return close_tag(_pipe$2, "sub");
  } else if (inline instanceof Footnote) {
    let reference = inline.reference;
    let $ = find_footnote_number(
      html.used_footnotes,
      reference,
      html.used_footnotes,
    );
    let footnote_number = $[0];
    let new_used_footnotes = $[1];
    let footnote_attrs = toList([
      ["id", "fnref" + footnote_number],
      ["href", "#fn" + footnote_number],
      ["role", "doc-noteref"],
    ]);
    let _block;
    let _pipe = html;
    let _pipe$1 = open_tag_ordered_attributes(_pipe, "a", footnote_attrs);
    let _pipe$2 = append_to_html(
      _pipe$1,
      ("<sup>" + footnote_number) + "</sup>",
    );
    _block = close_tag(_pipe$2, "a");
    let updated_html = _block;
    return new GeneratedHtml(updated_html.html, new_used_footnotes);
  } else if (inline instanceof Code) {
    let content = inline.content;
    let content$1 = $houdini.escape(content);
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, "code", $dict.new$());
    let _pipe$2 = append_to_html(_pipe$1, content$1);
    return close_tag(_pipe$2, "code");
  } else if (inline instanceof MathInline) {
    let latex = inline.content;
    let math_class = $dict.from_list(toList([["class", "math inline"]]));
    let latex$1 = ("\\(" + $houdini.escape(latex)) + "\\)";
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, "span", math_class);
    let _pipe$2 = append_to_html(_pipe$1, latex$1);
    return close_tag(_pipe$2, "span");
  } else if (inline instanceof MathDisplay) {
    let latex = inline.content;
    let math_class = $dict.from_list(toList([["class", "math display"]]));
    let latex$1 = ("\\[" + $houdini.escape(latex)) + "\\]";
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, "span", math_class);
    let _pipe$2 = append_to_html(_pipe$1, latex$1);
    return close_tag(_pipe$2, "span");
  } else {
    let content = inline.content;
    let _block;
    let _pipe = $dict.new$();
    _block = add_attribute(_pipe, "class", "symbol");
    let attrs = _block;
    let _pipe$1 = html;
    let _pipe$2 = open_tag(_pipe$1, "span", attrs);
    let _pipe$3 = append_to_html(_pipe$2, content);
    return close_tag(_pipe$3, "span");
  }
}

function inlines_to_html(loop$html, loop$inlines, loop$refs, loop$trim) {
  while (true) {
    let html = loop$html;
    let inlines = loop$inlines;
    let refs = loop$refs;
    let trim = loop$trim;
    if (inlines instanceof $Empty) {
      return html;
    } else {
      let $ = inlines.tail;
      if ($ instanceof $Empty && trim instanceof TrimLast) {
        let inline = inlines.head;
        let _pipe = html;
        return inline_to_html(_pipe, inline, refs, trim);
      } else {
        let inline = inlines.head;
        let rest = $;
        let _pipe = html;
        let _pipe$1 = inline_to_html(_pipe, inline, refs, new NoTrim());
        loop$html = _pipe$1;
        loop$inlines = rest;
        loop$refs = refs;
        loop$trim = trim;
      }
    }
  }
}

function containers_to_html(loop$containers, loop$refs, loop$html) {
  while (true) {
    let containers = loop$containers;
    let refs = loop$refs;
    let html = loop$html;
    if (containers instanceof $Empty) {
      return html;
    } else {
      let container = containers.head;
      let rest = containers.tail;
      let html$1 = container_to_html(html, container, refs);
      loop$containers = rest;
      loop$refs = refs;
      loop$html = html$1;
    }
  }
}

function list_items_to_html(loop$html, loop$layout, loop$items, loop$refs) {
  while (true) {
    let html = loop$html;
    let layout = loop$layout;
    let items = loop$items;
    let refs = loop$refs;
    if (items instanceof $Empty) {
      return html;
    } else {
      let $ = items.head;
      if ($ instanceof $Empty) {
        let item = $;
        let rest = items.tail;
        let _pipe = html;
        let _pipe$1 = open_tag(_pipe, "li", $dict.new$());
        let _pipe$2 = append_to_html(_pipe$1, "\n");
        let _pipe$3 = ((_capture) => {
          return containers_to_html(item, refs, _capture);
        })(_pipe$2);
        let _pipe$4 = close_tag(_pipe$3, "li");
        let _pipe$5 = append_to_html(_pipe$4, "\n");
        loop$html = _pipe$5;
        loop$layout = layout;
        loop$items = rest;
        loop$refs = refs;
      } else {
        let $1 = $.tail;
        if ($1 instanceof $Empty) {
          let $2 = $.head;
          if ($2 instanceof Paragraph && layout instanceof Tight) {
            let rest = items.tail;
            let inlines = $2.content;
            let _pipe = html;
            let _pipe$1 = open_tag(_pipe, "li", $dict.new$());
            let _pipe$2 = append_to_html(_pipe$1, "\n");
            let _pipe$3 = inlines_to_html(
              _pipe$2,
              inlines,
              refs,
              new TrimLast(),
            );
            let _pipe$4 = append_to_html(_pipe$3, "\n");
            let _pipe$5 = close_tag(_pipe$4, "li");
            let _pipe$6 = append_to_html(_pipe$5, "\n");
            loop$html = _pipe$6;
            loop$layout = layout;
            loop$items = rest;
            loop$refs = refs;
          } else {
            let item = $;
            let rest = items.tail;
            let _pipe = html;
            let _pipe$1 = open_tag(_pipe, "li", $dict.new$());
            let _pipe$2 = append_to_html(_pipe$1, "\n");
            let _pipe$3 = ((_capture) => {
              return containers_to_html(item, refs, _capture);
            })(_pipe$2);
            let _pipe$4 = close_tag(_pipe$3, "li");
            let _pipe$5 = append_to_html(_pipe$4, "\n");
            loop$html = _pipe$5;
            loop$layout = layout;
            loop$items = rest;
            loop$refs = refs;
          }
        } else {
          let $2 = $.head;
          if ($2 instanceof Paragraph && layout instanceof Tight) {
            let rest = items.tail;
            let nested_list = $1.head;
            let item_rest = $1.tail;
            let inlines = $2.content;
            let _pipe = html;
            let _pipe$1 = open_tag(_pipe, "li", $dict.new$());
            let _pipe$2 = append_to_html(_pipe$1, "\n");
            let _pipe$3 = inlines_to_html(
              _pipe$2,
              inlines,
              refs,
              new TrimLast(),
            );
            let _pipe$4 = append_to_html(_pipe$3, "\n");
            let _pipe$5 = ((_capture) => {
              return containers_to_html(
                listPrepend(nested_list, item_rest),
                refs,
                _capture,
              );
            })(_pipe$4);
            let _pipe$6 = close_tag(_pipe$5, "li");
            let _pipe$7 = append_to_html(_pipe$6, "\n");
            loop$html = _pipe$7;
            loop$layout = layout;
            loop$items = rest;
            loop$refs = refs;
          } else {
            let item = $;
            let rest = items.tail;
            let _pipe = html;
            let _pipe$1 = open_tag(_pipe, "li", $dict.new$());
            let _pipe$2 = append_to_html(_pipe$1, "\n");
            let _pipe$3 = ((_capture) => {
              return containers_to_html(item, refs, _capture);
            })(_pipe$2);
            let _pipe$4 = close_tag(_pipe$3, "li");
            let _pipe$5 = append_to_html(_pipe$4, "\n");
            loop$html = _pipe$5;
            loop$layout = layout;
            loop$items = rest;
            loop$refs = refs;
          }
        }
      }
    }
  }
}

function container_to_html(html, container, refs) {
  let _block;
  if (container instanceof ThematicBreak) {
    let _pipe = html;
    _block = open_tag(_pipe, "hr", $dict.new$());
  } else if (container instanceof Paragraph) {
    let attrs = container.attributes;
    let inlines = container.content;
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, "p", attrs);
    let _pipe$2 = inlines_to_html(_pipe$1, inlines, refs, new TrimLast());
    _block = close_tag(_pipe$2, "p");
  } else if (container instanceof Heading) {
    let attrs = container.attributes;
    let level = container.level;
    let inlines = container.content;
    let tag = "h" + $int.to_string(level);
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, tag, attrs);
    let _pipe$2 = inlines_to_html(_pipe$1, inlines, refs, new TrimLast());
    _block = close_tag(_pipe$2, tag);
  } else if (container instanceof Codeblock) {
    let attrs = container.attributes;
    let language = container.language;
    let content = container.content;
    let _block$1;
    if (language instanceof Some) {
      let lang = language[0];
      _block$1 = add_attribute(attrs, "class", "language-" + lang);
    } else {
      _block$1 = attrs;
    }
    let code_attrs = _block$1;
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, "pre", $dict.new$());
    let _pipe$2 = open_tag(_pipe$1, "code", code_attrs);
    let _pipe$3 = append_to_html(_pipe$2, $houdini.escape(content));
    let _pipe$4 = close_tag(_pipe$3, "code");
    _block = close_tag(_pipe$4, "pre");
  } else if (container instanceof RawBlock) {
    let content = container.content;
    _block = new GeneratedHtml(html.html + content, html.used_footnotes);
  } else if (container instanceof BulletList) {
    let layout = container.layout;
    let items = container.items;
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, "ul", $dict.new$());
    let _pipe$2 = append_to_html(_pipe$1, "\n");
    let _pipe$3 = list_items_to_html(_pipe$2, layout, items, refs);
    _block = close_tag(_pipe$3, "ul");
  } else if (container instanceof OrderedList) {
    let layout = container.layout;
    let ordinal = container.ordinal;
    let start = container.start;
    let items = container.items;
    let _block$1;
    if (start === 1) {
      _block$1 = $dict.new$();
    } else {
      _block$1 = $dict.from_list(toList([["start", $int.to_string(start)]]));
    }
    let attrs = _block$1;
    let _block$2;
    if (ordinal instanceof NumericOrdinal) {
      _block$2 = attrs;
    } else if (ordinal instanceof LowerAlphaOrdinal) {
      _block$2 = $dict.insert(attrs, "type", "a");
    } else {
      _block$2 = $dict.insert(attrs, "type", "A");
    }
    let attrs$1 = _block$2;
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, "ol", attrs$1);
    let _pipe$2 = append_to_html(_pipe$1, "\n");
    let _pipe$3 = list_items_to_html(_pipe$2, layout, items, refs);
    _block = close_tag(_pipe$3, "ol");
  } else if (container instanceof BlockQuote) {
    let attrs = container.attributes;
    let items = container.items;
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, "blockquote", attrs);
    let _pipe$2 = append_to_html(_pipe$1, "\n");
    let _pipe$3 = ((_capture) => {
      return containers_to_html(items, refs, _capture);
    })(_pipe$2);
    _block = close_tag(_pipe$3, "blockquote");
  } else {
    let attributes = container.attributes;
    let items = container.items;
    let _pipe = html;
    let _pipe$1 = open_tag(_pipe, "div", attributes);
    let _pipe$2 = append_to_html(_pipe$1, "\n");
    let _pipe$3 = ((_capture) => {
      return containers_to_html(items, refs, _capture);
    })(_pipe$2);
    _block = close_tag(_pipe$3, "div");
  }
  let new_html = _block;
  return append_to_html(new_html, "\n");
}

function containers_to_html_with_last_paragraph(
  loop$containers,
  loop$refs,
  loop$html,
  loop$apply
) {
  while (true) {
    let containers = loop$containers;
    let refs = loop$refs;
    let html = loop$html;
    let apply = loop$apply;
    if (containers instanceof $Empty) {
      return html;
    } else {
      let $ = containers.tail;
      if ($ instanceof $Empty) {
        let container = containers.head;
        if (container instanceof Paragraph) {
          let attrs = container.attributes;
          let inlines = container.content;
          let _pipe = html;
          let _pipe$1 = open_tag(_pipe, "p", attrs);
          let _pipe$2 = inlines_to_html(_pipe$1, inlines, refs, new TrimLast());
          let _pipe$3 = apply(_pipe$2);
          return close_tag(_pipe$3, "p");
        } else {
          let _pipe = container_to_html(html, container, refs);
          let _pipe$1 = open_tag(_pipe, "p", $dict.new$());
          let _pipe$2 = apply(_pipe$1);
          return close_tag(_pipe$2, "p");
        }
      } else {
        let container = containers.head;
        let rest = $;
        let html$1 = container_to_html(html, container, refs);
        loop$containers = rest;
        loop$refs = refs;
        loop$html = html$1;
        loop$apply = apply;
      }
    }
  }
}

function create_footnotes(loop$document, loop$used_footnotes, loop$html_acc) {
  while (true) {
    let document = loop$document;
    let used_footnotes = loop$used_footnotes;
    let html_acc = loop$html_acc;
    let footnote_to_html = (html, footnote, footnote_number) => {
      let _pipe = $dict.get(document.footnotes, footnote);
      let _pipe$1 = $result.try$(
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
      let _pipe$2 = $result.map(
        _pipe$1,
        (footnote) => {
          return containers_to_html_with_last_paragraph(
            footnote,
            new RenderRefs(
              document.references,
              document.reference_attributes,
              document.footnotes,
            ),
            html,
            (_capture) => {
              return add_footnote_link(_capture, footnote_number);
            },
          );
        },
      );
      return $result.lazy_unwrap(
        _pipe$2,
        () => {
          let _pipe$3 = html;
          let _pipe$4 = open_tag_ordered_attributes(_pipe$3, "p", toList([]));
          let _pipe$5 = add_footnote_link(_pipe$4, footnote_number);
          return close_tag(_pipe$5, "p");
        },
      );
    };
    if (used_footnotes instanceof $Empty) {
      return html_acc;
    } else {
      let other_footnotes = used_footnotes.tail;
      let footnote_number = used_footnotes.head[0];
      let footnote = used_footnotes.head[1];
      let footnote_number$1 = $int.to_string(footnote_number);
      let _block;
      let _pipe = html_acc;
      let _pipe$1 = open_tag(
        _pipe,
        "li",
        $dict.from_list(toList([["id", "fn" + footnote_number$1]])),
      );
      let _pipe$2 = append_to_html(_pipe$1, "\n");
      let _pipe$3 = footnote_to_html(_pipe$2, footnote, footnote_number$1);
      let _pipe$4 = append_to_html(_pipe$3, "\n");
      let _pipe$5 = close_tag(_pipe$4, "li");
      _block = append_to_html(_pipe$5, "\n");
      let html = _block;
      let new_used_footnotes = $list.append(
        get_new_footnotes(html_acc, html, toList([])),
        other_footnotes,
      );
      loop$document = document;
      loop$used_footnotes = new_used_footnotes;
      loop$html_acc = html;
    }
  }
}

/**
 * Convert a document tree into a string of HTML.
 *
 * See `to_html` for further documentation.
 */
export function document_to_html(document) {
  let generated_html = containers_to_html(
    document.content,
    new RenderRefs(
      document.references,
      document.reference_attributes,
      document.footnotes,
    ),
    new GeneratedHtml("", toList([])),
  );
  return $bool.guard(
    $list.is_empty(generated_html.used_footnotes),
    generated_html.html,
    () => {
      let _block;
      let _pipe = generated_html;
      let _pipe$1 = open_tag(
        _pipe,
        "section",
        $dict.from_list(toList([["role", "doc-endnotes"]])),
      );
      let _pipe$2 = append_to_html(_pipe$1, "\n");
      let _pipe$3 = open_tag(_pipe$2, "hr", $dict.new$());
      let _pipe$4 = append_to_html(_pipe$3, "\n");
      let _pipe$5 = open_tag(_pipe$4, "ol", $dict.new$());
      _block = append_to_html(_pipe$5, "\n");
      let footnotes_section_html = _block;
      let html_with_footnotes = create_footnotes(
        document,
        $list.reverse(footnotes_section_html.used_footnotes),
        footnotes_section_html,
      );
      let _block$1;
      let _pipe$6 = html_with_footnotes;
      let _pipe$7 = close_tag(_pipe$6, "ol");
      let _pipe$8 = append_to_html(_pipe$7, "\n");
      let _pipe$9 = close_tag(_pipe$8, "section");
      _block$1 = append_to_html(_pipe$9, "\n");
      return _block$1.html;
    },
  );
}

function int_fold_down_zero_inclusive(loop$int, loop$acc, loop$reduce) {
  while (true) {
    let int = loop$int;
    let acc = loop$acc;
    let reduce = loop$reduce;
    let $ = int < 0;
    if ($) {
      return acc;
    } else {
      loop$int = int - 1;
      loop$acc = reduce(acc, int);
      loop$reduce = reduce;
    }
  }
}

function take_symbol_chars(loop$in, loop$acc) {
  while (true) {
    let in$ = loop$in;
    let acc = loop$acc;
    let $ = in$.charCodeAt(0);
    if (in$ === "") {
      return new None();
    } else if ($ === 58) {
      if (acc === "") {
        return new None();
      } else {
        let rest = in$.slice(1);
        return new Some([acc, rest]);
      }
    } else if ($ === 97) {
      let c = "a";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 98) {
      let c = "b";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 99) {
      let c = "c";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 100) {
      let c = "d";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 101) {
      let c = "e";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 102) {
      let c = "f";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 103) {
      let c = "g";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 104) {
      let c = "h";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 105) {
      let c = "i";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 106) {
      let c = "j";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 107) {
      let c = "k";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 108) {
      let c = "l";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 109) {
      let c = "m";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 110) {
      let c = "n";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 111) {
      let c = "o";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 112) {
      let c = "p";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 113) {
      let c = "q";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 114) {
      let c = "r";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 115) {
      let c = "s";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 116) {
      let c = "t";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 117) {
      let c = "u";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 118) {
      let c = "v";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 119) {
      let c = "w";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 120) {
      let c = "x";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 121) {
      let c = "y";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 122) {
      let c = "z";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 65) {
      let c = "A";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 66) {
      let c = "B";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 67) {
      let c = "C";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 68) {
      let c = "D";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 69) {
      let c = "E";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 70) {
      let c = "F";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 71) {
      let c = "G";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 72) {
      let c = "H";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 73) {
      let c = "I";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 74) {
      let c = "J";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 75) {
      let c = "K";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 76) {
      let c = "L";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 77) {
      let c = "M";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 78) {
      let c = "N";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 79) {
      let c = "O";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 80) {
      let c = "P";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 81) {
      let c = "Q";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 82) {
      let c = "R";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 83) {
      let c = "S";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 84) {
      let c = "T";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 85) {
      let c = "U";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 86) {
      let c = "V";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 87) {
      let c = "W";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 88) {
      let c = "X";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 89) {
      let c = "Y";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 90) {
      let c = "Z";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 48) {
      let c = "0";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 49) {
      let c = "1";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 50) {
      let c = "2";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 51) {
      let c = "3";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 52) {
      let c = "4";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 53) {
      let c = "5";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 54) {
      let c = "6";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 55) {
      let c = "7";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 56) {
      let c = "8";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 57) {
      let c = "9";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 95) {
      let c = "_";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 45) {
      let c = "-";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else if ($ === 43) {
      let c = "+";
      let rest = in$.slice(1);
      loop$in = rest;
      loop$acc = acc + c;
    } else {
      return new None();
    }
  }
}

function parse_symbol(in$) {
  let $ = take_symbol_chars(in$, "");
  if ($ instanceof Some) {
    let text = $[0][0];
    let rest = $[0][1];
    return new Some([new Symbol(text), rest]);
  } else {
    return new None();
  }
}

function parse_attribute_value(loop$in, loop$key, loop$value) {
  while (true) {
    let in$ = loop$in;
    let key = loop$key;
    let value = loop$value;
    let $ = in$.charCodeAt(0);
    if (in$ === "") {
      return new None();
    } else if ($ === 32) {
      let in$1 = in$.slice(1);
      return new Some([key, value, in$1]);
    } else if ($ === 125) {
      return new Some([key, value, in$]);
    } else {
      let $1 = $string.pop_grapheme(in$);
      if ($1 instanceof Ok) {
        let c = $1[0][0];
        let in$1 = $1[0][1];
        loop$in = in$1;
        loop$key = key;
        loop$value = value + c;
      } else {
        return new None();
      }
    }
  }
}

function parse_attribute_quoted_value(loop$in, loop$key, loop$value) {
  while (true) {
    let in$ = loop$in;
    let key = loop$key;
    let value = loop$value;
    if (in$ === "") {
      return new None();
    } else if (in$.charCodeAt(0) === 34) {
      let in$1 = in$.slice(1);
      return new Some([key, value, in$1]);
    } else {
      let $ = $string.pop_grapheme(in$);
      if ($ instanceof Ok) {
        let c = $[0][0];
        let in$1 = $[0][1];
        loop$in = in$1;
        loop$key = key;
        loop$value = value + c;
      } else {
        return new None();
      }
    }
  }
}

function parse_attribute(loop$in, loop$key) {
  while (true) {
    let in$ = loop$in;
    let key = loop$key;
    let $ = in$.charCodeAt(0);
    if (in$ === "") {
      return new None();
    } else if ($ === 32) {
      return new None();
    } else if (in$.startsWith("=\"")) {
      let in$1 = in$.slice(2);
      return parse_attribute_quoted_value(in$1, key, "");
    } else if ($ === 61) {
      let in$1 = in$.slice(1);
      return parse_attribute_value(in$1, key, "");
    } else {
      let $1 = $string.pop_grapheme(in$);
      if ($1 instanceof Ok) {
        let c = $1[0][0];
        let in$1 = $1[0][1];
        loop$in = in$1;
        loop$key = key + c;
      } else {
        return new None();
      }
    }
  }
}

function parse_attributes_id_or_class(loop$in, loop$id) {
  while (true) {
    let in$ = loop$in;
    let id = loop$id;
    let $ = in$.charCodeAt(0);
    if (in$ === "") {
      return new Some([id, in$]);
    } else if ($ === 125) {
      return new Some([id, in$]);
    } else if ($ === 32) {
      return new Some([id, in$]);
    } else if ($ === 35) {
      return new None();
    } else if ($ === 46) {
      return new None();
    } else if ($ === 61) {
      return new None();
    } else if ($ === 10) {
      return new None();
    } else {
      let $1 = $string.pop_grapheme(in$);
      if ($1 instanceof Ok) {
        let c = $1[0][0];
        let in$1 = $1[0][1];
        loop$in = in$1;
        loop$id = id + c;
      } else {
        return new Some([id, in$]);
      }
    }
  }
}

function drop_spaces(loop$in) {
  while (true) {
    let in$ = loop$in;
    if (in$.charCodeAt(0) === 32) {
      let rest = in$.slice(1);
      loop$in = rest;
    } else {
      return in$;
    }
  }
}

function parse_attributes(loop$in, loop$attrs) {
  while (true) {
    let in$ = loop$in;
    let attrs = loop$attrs;
    let in$1 = drop_spaces(in$);
    let $ = in$1.charCodeAt(0);
    if (in$1 === "") {
      return new None();
    } else if ($ === 125) {
      let in$2 = in$1.slice(1);
      return new Some([attrs, in$2]);
    } else if ($ === 35) {
      let in$2 = in$1.slice(1);
      let $1 = parse_attributes_id_or_class(in$2, "");
      if ($1 instanceof Some) {
        let id = $1[0][0];
        let in$3 = $1[0][1];
        loop$in = in$3;
        loop$attrs = add_attribute(attrs, "id", id);
      } else {
        return $1;
      }
    } else if ($ === 46) {
      let in$2 = in$1.slice(1);
      let $1 = parse_attributes_id_or_class(in$2, "");
      if ($1 instanceof Some) {
        let c = $1[0][0];
        let in$3 = $1[0][1];
        loop$in = in$3;
        loop$attrs = add_attribute(attrs, "class", c);
      } else {
        return $1;
      }
    } else {
      let $1 = parse_attribute(in$1, "");
      if ($1 instanceof Some) {
        let k = $1[0][0];
        let v = $1[0][1];
        let in$2 = $1[0][2];
        loop$in = in$2;
        loop$attrs = add_attribute(attrs, k, v);
      } else {
        return $1;
      }
    }
  }
}

function parse_autolink(in$) {
  let $ = $string.split_once(in$, ">");
  if ($ instanceof Ok) {
    let url = $[0][0];
    let rest = $[0][1];
    let $1 = $string.contains(url, "@");
    if ($1) {
      let href = "mailto:" + url;
      return new Some(
        [new Link($dict.new$(), toList([new Text(url)]), new Url(href)), rest],
      );
    } else {
      let $2 = $string.contains(url, "://") || $string.starts_with(url, "//");
      if ($2) {
        return new Some(
          [new Link($dict.new$(), toList([new Text(url)]), new Url(url)), rest],
        );
      } else {
        return new None();
      }
    }
  } else {
    return new None();
  }
}

function parse_math(in$, splitters, display) {
  let $ = $splitter.split(splitters.math_end, in$);
  let $1 = $[1];
  if ($1 === "") {
    let $2 = $[2];
    if ($2 === "") {
      return new None();
    } else {
      let latex = $[0];
      let rest = $2;
      let _block;
      if (display) {
        _block = new MathDisplay(latex);
      } else {
        _block = new MathInline(latex);
      }
      let math = _block;
      return new Some([math, rest]);
    }
  } else {
    let latex = $[0];
    let rest = $[2];
    let _block;
    if (display) {
      _block = new MathDisplay(latex);
    } else {
      _block = new MathInline(latex);
    }
    let math = _block;
    return new Some([math, rest]);
  }
}

function parse_code_end(loop$in, loop$limit, loop$count, loop$content) {
  while (true) {
    let in$ = loop$in;
    let limit = loop$limit;
    let count = loop$count;
    let content = loop$content;
    if (in$ === "") {
      return [true, content, in$];
    } else if (in$.charCodeAt(0) === 96) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$limit = limit;
      loop$count = count + 1;
      loop$content = content;
    } else if (limit === count) {
      return [true, content, in$];
    } else {
      return [false, content + $string.repeat("`", count), in$];
    }
  }
}

function parse_code_content(loop$in, loop$count, loop$content) {
  while (true) {
    let in$ = loop$in;
    let count = loop$count;
    let content = loop$content;
    if (in$ === "") {
      return [content, in$];
    } else if (in$.charCodeAt(0) === 96) {
      let in$1 = in$.slice(1);
      let $ = parse_code_end(in$1, count, 1, content);
      let done = $[0];
      let content$1 = $[1];
      let in$2 = $[2];
      if (done) {
        return [content$1, in$2];
      } else {
        loop$in = in$2;
        loop$count = count;
        loop$content = content$1;
      }
    } else {
      let $ = $string.pop_grapheme(in$);
      if ($ instanceof Ok) {
        let c = $[0][0];
        let in$1 = $[0][1];
        loop$in = in$1;
        loop$count = count;
        loop$content = content + c;
      } else {
        return [content, in$];
      }
    }
  }
}

function parse_code(loop$in, loop$count) {
  while (true) {
    let in$ = loop$in;
    let count = loop$count;
    if (in$.charCodeAt(0) === 96) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$count = count + 1;
    } else {
      let $ = parse_code_content(in$, count, "");
      let content = $[0];
      let in$1 = $[1];
      let _block;
      let $1 = $string.starts_with(content, " `");
      if ($1) {
        _block = $string.trim_start(content);
      } else {
        _block = content;
      }
      let content$1 = _block;
      let _block$1;
      let $2 = $string.ends_with(content$1, "` ");
      if ($2) {
        _block$1 = $string.trim_end(content$1);
      } else {
        _block$1 = content$1;
      }
      let content$2 = _block$1;
      return [new Code(content$2), in$1];
    }
  }
}

function consume_until_space_or_newline(loop$in, loop$acc) {
  while (true) {
    let in$ = loop$in;
    let acc = loop$acc;
    let $ = in$.charCodeAt(0);
    if (in$ === "") {
      return [acc, ""];
    } else if ($ === 32) {
      return [acc, in$];
    } else if ($ === 10) {
      return [acc, in$];
    } else {
      let $1 = $string.pop_grapheme(in$);
      if ($1 instanceof Ok) {
        let c = $1[0][0];
        let rest = $1[0][1];
        loop$in = rest;
        loop$acc = acc + c;
      } else {
        return [acc, ""];
      }
    }
  }
}

function take_link_chars_destination(
  loop$in,
  loop$is_url,
  loop$inline_in,
  loop$splitters,
  loop$acc
) {
  while (true) {
    let in$ = loop$in;
    let is_url = loop$is_url;
    let inline_in = loop$inline_in;
    let splitters = loop$splitters;
    let acc = loop$acc;
    let $ = $splitter.split(splitters.link_destination, in$);
    let $1 = $[1];
    if ($1 === ")" && is_url) {
      let a = $[0];
      let in$1 = $[2];
      return new Some([inline_in, new Url(acc + a), in$1]);
    } else if ($1 === "]" && !is_url) {
      let a = $[0];
      let in$1 = $[2];
      return new Some([inline_in, new Reference(acc + a), in$1]);
    } else if ($1 === "\n") {
      if (is_url) {
        let a = $[0];
        let rest = $[2];
        loop$in = rest;
        loop$is_url = is_url;
        loop$inline_in = inline_in;
        loop$splitters = splitters;
        loop$acc = acc + a;
      } else if (!is_url) {
        let a = $[0];
        let rest = $[2];
        loop$in = rest;
        loop$is_url = is_url;
        loop$inline_in = inline_in;
        loop$splitters = splitters;
        loop$acc = (acc + a) + " ";
      } else {
        return new None();
      }
    } else {
      return new None();
    }
  }
}

function take_link_chars_or_span_depth(
  loop$in,
  loop$inline_in,
  loop$splitters,
  loop$depth
) {
  while (true) {
    let in$ = loop$in;
    let inline_in = loop$inline_in;
    let splitters = loop$splitters;
    let depth = loop$depth;
    let $ = in$.charCodeAt(0);
    if (in$ === "") {
      return new None();
    } else if (in$.startsWith("![")) {
      let rest = in$.slice(2);
      loop$in = rest;
      loop$inline_in = inline_in + "![";
      loop$splitters = splitters;
      loop$depth = depth + 1;
    } else if ($ === 91) {
      let rest = in$.slice(1);
      loop$in = rest;
      loop$inline_in = inline_in + "[";
      loop$splitters = splitters;
      loop$depth = depth + 1;
    } else if ($ === 93) {
      if (depth > 0) {
        let rest = in$.slice(1);
        loop$in = rest;
        loop$inline_in = inline_in + "]";
        loop$splitters = splitters;
        loop$depth = depth - 1;
      } else {
        let $1 = in$.slice(1);
        let $2 = $1.charCodeAt(0);
        if ($2 === 91 && depth === 0) {
          let rest = $1.slice(1);
          let $3 = take_link_chars_destination(
            rest,
            false,
            inline_in,
            splitters,
            "",
          );
          if ($3 instanceof Some) {
            let inline_in$1 = $3[0][0];
            let dest = $3[0][1];
            let in$1 = $3[0][2];
            return new Some([inline_in$1, new Some(dest), in$1]);
          } else {
            return $3;
          }
        } else if ($2 === 40 && depth === 0) {
          let rest = $1.slice(1);
          let $3 = take_link_chars_destination(
            rest,
            true,
            inline_in,
            splitters,
            "",
          );
          if ($3 instanceof Some) {
            let inline_in$1 = $3[0][0];
            let dest = $3[0][1];
            let in$1 = $3[0][2];
            return new Some([inline_in$1, new Some(dest), in$1]);
          } else {
            return $3;
          }
        } else if ($2 === 123 && depth === 0) {
          let rest = $1.slice(1);
          return new Some([inline_in, new None(), "{" + rest]);
        } else if (depth === 0) {
          return new None();
        } else {
          let $3 = $string.pop_grapheme(in$);
          if ($3 instanceof Ok) {
            let c = $3[0][0];
            let rest = $3[0][1];
            loop$in = rest;
            loop$inline_in = inline_in + c;
            loop$splitters = splitters;
            loop$depth = depth;
          } else {
            return new None();
          }
        }
      }
    } else {
      let $1 = $string.pop_grapheme(in$);
      if ($1 instanceof Ok) {
        let c = $1[0][0];
        let rest = $1[0][1];
        loop$in = rest;
        loop$inline_in = inline_in + c;
        loop$splitters = splitters;
        loop$depth = depth;
      } else {
        return new None();
      }
    }
  }
}

function take_link_chars_or_span(in$, inline_in, splitters) {
  return take_link_chars_or_span_depth(in$, inline_in, splitters, 0);
}

function parse_footnote(loop$in, loop$acc) {
  while (true) {
    let in$ = loop$in;
    let acc = loop$acc;
    if (in$ === "") {
      return new None();
    } else if (in$.charCodeAt(0) === 93) {
      let rest = in$.slice(1);
      return new Some([new Footnote(acc), rest]);
    } else {
      let $ = $string.pop_grapheme(in$);
      if ($ instanceof Ok) {
        let c = $[0][0];
        let rest = $[0][1];
        loop$in = rest;
        loop$acc = acc + c;
      } else {
        return new None();
      }
    }
  }
}

function take_emphasis_chars(loop$in, loop$close, loop$acc) {
  while (true) {
    let in$ = loop$in;
    let close = loop$close;
    let acc = loop$acc;
    let $ = in$.charCodeAt(0);
    if (in$ === "") {
      return new None();
    } else if ($ === 96) {
      return new None();
    } else if ($ === 9) {
      let ws = "\t";
      let in$1 = in$.slice(1);
      let $1 = $string.pop_grapheme(in$1);
      if ($1 instanceof Ok) {
        let c = $1[0][0];
        if (c === close) {
          let in$2 = $1[0][1];
          loop$in = in$2;
          loop$close = close;
          loop$acc = (acc + ws) + c;
        } else {
          loop$in = in$1;
          loop$close = close;
          loop$acc = acc + ws;
        }
      } else {
        loop$in = in$1;
        loop$close = close;
        loop$acc = acc + ws;
      }
    } else if ($ === 10) {
      let ws = "\n";
      let in$1 = in$.slice(1);
      let $1 = $string.pop_grapheme(in$1);
      if ($1 instanceof Ok) {
        let c = $1[0][0];
        if (c === close) {
          let in$2 = $1[0][1];
          loop$in = in$2;
          loop$close = close;
          loop$acc = (acc + ws) + c;
        } else {
          loop$in = in$1;
          loop$close = close;
          loop$acc = acc + ws;
        }
      } else {
        loop$in = in$1;
        loop$close = close;
        loop$acc = acc + ws;
      }
    } else if ($ === 32) {
      let ws = " ";
      let in$1 = in$.slice(1);
      let $1 = $string.pop_grapheme(in$1);
      if ($1 instanceof Ok) {
        let c = $1[0][0];
        if (c === close) {
          let in$2 = $1[0][1];
          loop$in = in$2;
          loop$close = close;
          loop$acc = (acc + ws) + c;
        } else {
          loop$in = in$1;
          loop$close = close;
          loop$acc = acc + ws;
        }
      } else {
        loop$in = in$1;
        loop$close = close;
        loop$acc = acc + ws;
      }
    } else {
      let $1 = $string.pop_grapheme(in$);
      if ($1 instanceof Ok) {
        let c = $1[0][0];
        if ((c === close) && (acc === "")) {
          return new None();
        } else {
          let c = $1[0][0];
          if (c === close) {
            let in$1 = $1[0][1];
            return new Some([acc, in$1]);
          } else {
            let c = $1[0][0];
            let in$1 = $1[0][1];
            loop$in = in$1;
            loop$close = close;
            loop$acc = acc + c;
          }
        }
      } else {
        return new None();
      }
    }
  }
}

/**
 * Given the length of a sequence of `-` this turns it in a series of em/en
 * dashes.
 * 
 * @ignore
 */
function dash_sequence(hyphens) {
  let $ = hyphens % 3;
  let $1 = hyphens % 2;
  if ($ === 0) {
    return $string.repeat("—", globalThis.Math.trunc(hyphens / 3));
  } else if ($1 === 0) {
    return $string.repeat("–", globalThis.Math.trunc(hyphens / 2));
  } else {
    let ems = $int.max(0, globalThis.Math.trunc((hyphens - 2) / 3));
    let hyphens$1 = hyphens - ems * 3;
    return ($string.repeat("—", ems) + $string.repeat(
      "–",
      globalThis.Math.trunc(hyphens$1 / 2),
    )) + $string.repeat("-", hyphens$1 % 2);
  }
}

function count_drop_hyphens(loop$in, loop$count) {
  while (true) {
    let in$ = loop$in;
    let count = loop$count;
    if (in$.charCodeAt(0) === 45) {
      let rest = in$.slice(1);
      loop$in = rest;
      loop$count = count + 1;
    } else {
      return [count, in$];
    }
  }
}

function parse_insert_delete_mark_sup_sub(in$, splitters, close) {
  let $ = $string.split_once(in$, close);
  if ($ instanceof Ok) {
    let inline_in = $[0][0];
    let rest = $[0][1];
    let $1 = parse_inline(inline_in, splitters, "", toList([]));
    let inline = $1[0];
    let inline_in_remaining = $1[1];
    return new Some([inline, inline_in_remaining + rest]);
  } else {
    return new None();
  }
}

function parse_link(in$, splitters, to_inline) {
  let $ = take_link_chars_or_span(in$, "", splitters);
  if ($ instanceof Some) {
    let $1 = $[0][1];
    if ($1 instanceof Some) {
      let inline_in = $[0][0];
      let in$1 = $[0][2];
      let ref = $1[0];
      let $2 = parse_inline(inline_in, splitters, "", toList([]));
      let inline = $2[0];
      let inline_in_remaining = $2[1];
      let _block;
      if (ref instanceof Reference) {
        let $3 = ref[0];
        if ($3 === "") {
          _block = new Reference(take_inline_text(inline, ""));
        } else {
          _block = ref;
        }
      } else {
        _block = ref;
      }
      let ref$1 = _block;
      let _block$1;
      if (in$1.charCodeAt(0) === 123) {
        let rest = in$1.slice(1);
        let $4 = parse_attributes(rest, $dict.new$());
        if ($4 instanceof Some) {
          let attrs = $4[0][0];
          let in$2 = $4[0][1];
          _block$1 = [attrs, in$2];
        } else {
          _block$1 = [$dict.new$(), in$1];
        }
      } else {
        _block$1 = [$dict.new$(), in$1];
      }
      let $3 = _block$1;
      let attrs = $3[0];
      let in$2 = $3[1];
      return new Some(
        [to_inline(attrs, inline, ref$1), inline_in_remaining + in$2],
      );
    } else {
      let inline_in = $[0][0];
      let in$1 = $[0][2];
      let $2 = parse_inline(inline_in, splitters, "", toList([]));
      let inline = $2[0];
      let inline_in_remaining = $2[1];
      if (in$1.charCodeAt(0) === 123) {
        let rest = in$1.slice(1);
        let $3 = parse_attributes(rest, $dict.new$());
        if ($3 instanceof Some) {
          let attrs = $3[0][0];
          let in$2 = $3[0][1];
          return new Some([new Span(attrs, inline), inline_in_remaining + in$2]);
        } else {
          return $3;
        }
      } else {
        return new None();
      }
    }
  } else {
    return $;
  }
}

function parse_link_or_recover(in$, splitters, to_inline, opening) {
  let $ = parse_link(in$, splitters, to_inline);
  if ($ instanceof Some) {
    let inline = $[0][0];
    let remaining = $[0][1];
    return new Ok([inline, remaining]);
  } else {
    let $1 = consume_until_space_or_newline(in$, "");
    let consumed = $1[0];
    let remaining = $1[1];
    return new Error([opening + consumed, remaining]);
  }
}

function parse_emphasis(in$, splitters, close) {
  let $ = take_emphasis_chars(in$, close, "");
  if ($ instanceof Some) {
    let inline_in = $[0][0];
    let in$1 = $[0][1];
    let $1 = parse_inline(inline_in, splitters, "", toList([]));
    let inline = $1[0];
    let inline_in_remaining = $1[1];
    return new Some([inline, inline_in_remaining + in$1]);
  } else {
    return $;
  }
}

function parse_inline(loop$in, loop$splitters, loop$text, loop$acc) {
  while (true) {
    let in$ = loop$in;
    let splitters = loop$splitters;
    let text = loop$text;
    let acc = loop$acc;
    let $ = $splitter.split(splitters.inline, in$);
    let $1 = $[1];
    if ($1 === "") {
      let $2 = $[2];
      if ($2 === "") {
        let text2 = $[0];
        let $3 = text + text2;
        if ($3 === "") {
          return [$list.reverse(acc), ""];
        } else {
          let text$1 = $3;
          return [$list.reverse(listPrepend(new Text(text$1), acc)), ""];
        }
      } else {
        let text2 = $[0];
        let text3 = $1;
        let in$1 = $2;
        let $3 = (text + text2) + text3;
        if ($3 === "") {
          return [$list.reverse(acc), in$1];
        } else {
          let text$1 = $3;
          return [$list.reverse(listPrepend(new Text(text$1), acc)), in$1];
        }
      }
    } else if ($1 === "...") {
      let before = $[0];
      let in$1 = $[2];
      let text$1 = (text + before) + "…";
      loop$in = in$1;
      loop$splitters = splitters;
      loop$text = text$1;
      loop$acc = acc;
    } else if ($1 === "--") {
      let before = $[0];
      let in$1 = $[2];
      let $2 = count_drop_hyphens(in$1, 2);
      let count = $2[0];
      let in$2 = $2[1];
      let text$1 = (text + before) + dash_sequence(count);
      loop$in = in$2;
      loop$splitters = splitters;
      loop$text = text$1;
      loop$acc = acc;
    } else if ($1 === "\\") {
      let before = $[0];
      let in$1 = $[2];
      let text$1 = text + before;
      let $2 = in$1.charCodeAt(0);
      if ($2 === 33) {
        let e = "!";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 34) {
        let e = "\"";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 35) {
        let e = "#";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 36) {
        let e = "$";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 37) {
        let e = "%";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 38) {
        let e = "&";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 39) {
        let e = "'";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 40) {
        let e = "(";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 41) {
        let e = ")";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 42) {
        let e = "*";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 43) {
        let e = "+";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 44) {
        let e = ",";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 45) {
        let e = "-";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 46) {
        let e = ".";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 47) {
        let e = "/";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 58) {
        let e = ":";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 59) {
        let e = ";";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 60) {
        let e = "<";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 61) {
        let e = "=";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 62) {
        let e = ">";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 63) {
        let e = "?";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 64) {
        let e = "@";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 91) {
        let e = "[";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 92) {
        let e = "\\";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 93) {
        let e = "]";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 94) {
        let e = "^";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 95) {
        let e = "_";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 96) {
        let e = "`";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 123) {
        let e = "{";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 124) {
        let e = "|";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 125) {
        let e = "}";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 126) {
        let e = "~";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = text$1 + e;
        loop$acc = acc;
      } else if ($2 === 10) {
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = "";
        loop$acc = listPrepend(
          new Linebreak(),
          listPrepend(new Text(text$1), acc),
        );
      } else if ($2 === 32) {
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = "";
        loop$acc = listPrepend(
          new NonBreakingSpace(),
          listPrepend(new Text(text$1), acc),
        );
      } else {
        loop$in = in$1;
        loop$splitters = splitters;
        loop$text = text$1 + "\\";
        loop$acc = acc;
      }
    } else if ($1 === "_") {
      let a = $[0];
      let start = $1;
      let in$1 = $[2];
      let text$1 = text + a;
      let $2 = in$1.charCodeAt(0);
      if ($2 === 32) {
        let b = " ";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = (text$1 + start) + b;
        loop$acc = acc;
      } else if ($2 === 9) {
        let b = "\t";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = (text$1 + start) + b;
        loop$acc = acc;
      } else if ($2 === 10) {
        let b = "\n";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = (text$1 + start) + b;
        loop$acc = acc;
      } else {
        let $3 = parse_emphasis(in$1, splitters, start);
        if ($3 instanceof Some) {
          let inner = $3[0][0];
          let in$2 = $3[0][1];
          let _block;
          if (start === "*") {
            _block = new Strong(inner);
          } else {
            _block = new Emphasis(inner);
          }
          let item = _block;
          loop$in = in$2;
          loop$splitters = splitters;
          loop$text = "";
          loop$acc = listPrepend(item, listPrepend(new Text(text$1), acc));
        } else {
          loop$in = in$1;
          loop$splitters = splitters;
          loop$text = text$1 + start;
          loop$acc = acc;
        }
      }
    } else if ($1 === "*") {
      let a = $[0];
      let start = $1;
      let in$1 = $[2];
      let text$1 = text + a;
      let $2 = in$1.charCodeAt(0);
      if ($2 === 32) {
        let b = " ";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = (text$1 + start) + b;
        loop$acc = acc;
      } else if ($2 === 9) {
        let b = "\t";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = (text$1 + start) + b;
        loop$acc = acc;
      } else if ($2 === 10) {
        let b = "\n";
        let in$2 = in$1.slice(1);
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = (text$1 + start) + b;
        loop$acc = acc;
      } else {
        let $3 = parse_emphasis(in$1, splitters, start);
        if ($3 instanceof Some) {
          let inner = $3[0][0];
          let in$2 = $3[0][1];
          let _block;
          if (start === "*") {
            _block = new Strong(inner);
          } else {
            _block = new Emphasis(inner);
          }
          let item = _block;
          loop$in = in$2;
          loop$splitters = splitters;
          loop$text = "";
          loop$acc = listPrepend(item, listPrepend(new Text(text$1), acc));
        } else {
          loop$in = in$1;
          loop$splitters = splitters;
          loop$text = text$1 + start;
          loop$acc = acc;
        }
      }
    } else if ($1 === "[^") {
      let a = $[0];
      let rest = $[2];
      let text$1 = text + a;
      let $2 = parse_footnote(rest, "^");
      if ($2 instanceof Some) {
        let $3 = $2[0][1];
        if ($3.charCodeAt(0) === 58) {
          if (text$1 !== "") {
            return [$list.reverse(listPrepend(new Text(text$1), acc)), in$];
          } else {
            return [$list.reverse(acc), in$];
          }
        } else {
          let footnote = $2[0][0];
          let in$1 = $3;
          loop$in = in$1;
          loop$splitters = splitters;
          loop$text = "";
          loop$acc = listPrepend(footnote, listPrepend(new Text(text$1), acc));
        }
      } else {
        loop$in = rest;
        loop$splitters = splitters;
        loop$text = text$1 + "[^";
        loop$acc = acc;
      }
    } else if ($1 === "[") {
      let a = $[0];
      let in$1 = $[2];
      let text$1 = text + a;
      let $2 = parse_link_or_recover(
        in$1,
        splitters,
        (var0, var1, var2) => { return new Link(var0, var1, var2); },
        "[",
      );
      if ($2 instanceof Ok) {
        let link = $2[0][0];
        let remaining = $2[0][1];
        loop$in = remaining;
        loop$splitters = splitters;
        loop$text = "";
        loop$acc = listPrepend(link, listPrepend(new Text(text$1), acc));
      } else {
        let failed_text = $2[0][0];
        let remaining = $2[0][1];
        loop$in = remaining;
        loop$splitters = splitters;
        loop$text = text$1 + failed_text;
        loop$acc = acc;
      }
    } else if ($1 === "![") {
      let a = $[0];
      let in$1 = $[2];
      let text$1 = text + a;
      let $2 = parse_link_or_recover(
        in$1,
        splitters,
        (var0, var1, var2) => { return new Image(var0, var1, var2); },
        "![",
      );
      if ($2 instanceof Ok) {
        let image = $2[0][0];
        let remaining = $2[0][1];
        loop$in = remaining;
        loop$splitters = splitters;
        loop$text = "";
        loop$acc = listPrepend(image, listPrepend(new Text(text$1), acc));
      } else {
        let failed_text = $2[0][0];
        let remaining = $2[0][1];
        loop$in = remaining;
        loop$splitters = splitters;
        loop$text = text$1 + failed_text;
        loop$acc = acc;
      }
    } else if ($1 === "`") {
      let a = $[0];
      let in$1 = $[2];
      let text$1 = text + a;
      let $2 = parse_code(in$1, 1);
      let code = $2[0];
      let in$2 = $2[1];
      loop$in = in$2;
      loop$splitters = splitters;
      loop$text = "";
      loop$acc = listPrepend(code, listPrepend(new Text(text$1), acc));
    } else if ($1 === "\n") {
      let a = $[0];
      let in$1 = $[2];
      let text$1 = text + a;
      let _pipe = drop_spaces(in$1);
      loop$in = _pipe;
      loop$splitters = splitters;
      loop$text = text$1 + "\n";
      loop$acc = acc;
    } else if ($1 === "$`") {
      let a = $[0];
      let in$1 = $[2];
      let text$1 = text + a;
      let $2 = parse_math(in$1, splitters, false);
      if ($2 instanceof Some) {
        let math = $2[0][0];
        let in$2 = $2[0][1];
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = "";
        loop$acc = listPrepend(math, listPrepend(new Text(text$1), acc));
      } else {
        loop$in = in$1;
        loop$splitters = splitters;
        loop$text = text$1 + "$`";
        loop$acc = acc;
      }
    } else if ($1 === "$$`") {
      let a = $[0];
      let in$1 = $[2];
      let text$1 = text + a;
      let $2 = parse_math(in$1, splitters, true);
      if ($2 instanceof Some) {
        let math = $2[0][0];
        let in$2 = $2[0][1];
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = "";
        loop$acc = listPrepend(math, listPrepend(new Text(text$1), acc));
      } else {
        loop$in = in$1;
        loop$splitters = splitters;
        loop$text = text$1 + "$$`";
        loop$acc = acc;
      }
    } else if ($1 === "<") {
      let a = $[0];
      let in$1 = $[2];
      let text$1 = text + a;
      let $2 = parse_autolink(in$1);
      if ($2 instanceof Some) {
        let link = $2[0][0];
        let in$2 = $2[0][1];
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = "";
        loop$acc = listPrepend(link, listPrepend(new Text(text$1), acc));
      } else {
        loop$in = in$1;
        loop$splitters = splitters;
        loop$text = text$1 + "<";
        loop$acc = acc;
      }
    } else if ($1 === "{-") {
      let a = $[0];
      let in$1 = $[2];
      let text$1 = text + a;
      let $2 = parse_insert_delete_mark_sup_sub(in$1, splitters, "-}");
      if ($2 instanceof Some) {
        let inner = $2[0][0];
        let in$2 = $2[0][1];
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = "";
        loop$acc = listPrepend(
          new Delete(inner),
          listPrepend(new Text(text$1), acc),
        );
      } else {
        loop$in = in$1;
        loop$splitters = splitters;
        loop$text = text$1 + "{-";
        loop$acc = acc;
      }
    } else if ($1 === "{+") {
      let a = $[0];
      let in$1 = $[2];
      let text$1 = text + a;
      let $2 = parse_insert_delete_mark_sup_sub(in$1, splitters, "+}");
      if ($2 instanceof Some) {
        let inner = $2[0][0];
        let in$2 = $2[0][1];
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = "";
        loop$acc = listPrepend(
          new Insert(inner),
          listPrepend(new Text(text$1), acc),
        );
      } else {
        loop$in = in$1;
        loop$splitters = splitters;
        loop$text = text$1 + "{+";
        loop$acc = acc;
      }
    } else if ($1 === "{=") {
      let a = $[0];
      let in$1 = $[2];
      let text$1 = text + a;
      let $2 = parse_insert_delete_mark_sup_sub(in$1, splitters, "=}");
      if ($2 instanceof Some) {
        let inner = $2[0][0];
        let in$2 = $2[0][1];
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = "";
        loop$acc = listPrepend(
          new Mark(inner),
          listPrepend(new Text(text$1), acc),
        );
      } else {
        loop$in = in$1;
        loop$splitters = splitters;
        loop$text = text$1 + "{=";
        loop$acc = acc;
      }
    } else if ($1 === "^") {
      let a = $[0];
      let in$1 = $[2];
      let text$1 = text + a;
      let $2 = parse_insert_delete_mark_sup_sub(in$1, splitters, "^");
      if ($2 instanceof Some) {
        let inner = $2[0][0];
        let in$2 = $2[0][1];
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = "";
        loop$acc = listPrepend(
          new Superscript(inner),
          listPrepend(new Text(text$1), acc),
        );
      } else {
        loop$in = in$1;
        loop$splitters = splitters;
        loop$text = text$1 + "^";
        loop$acc = acc;
      }
    } else if ($1 === "{^") {
      let a = $[0];
      let in$1 = $[2];
      let text$1 = text + a;
      let $2 = parse_insert_delete_mark_sup_sub(in$1, splitters, "^}");
      if ($2 instanceof Some) {
        let inner = $2[0][0];
        let in$2 = $2[0][1];
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = "";
        loop$acc = listPrepend(
          new Superscript(inner),
          listPrepend(new Text(text$1), acc),
        );
      } else {
        loop$in = in$1;
        loop$splitters = splitters;
        loop$text = text$1 + "{^";
        loop$acc = acc;
      }
    } else if ($1 === "~") {
      let a = $[0];
      let in$1 = $[2];
      let text$1 = text + a;
      let $2 = parse_insert_delete_mark_sup_sub(in$1, splitters, "~");
      if ($2 instanceof Some) {
        let inner = $2[0][0];
        let in$2 = $2[0][1];
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = "";
        loop$acc = listPrepend(
          new Subscript(inner),
          listPrepend(new Text(text$1), acc),
        );
      } else {
        loop$in = in$1;
        loop$splitters = splitters;
        loop$text = text$1 + "~";
        loop$acc = acc;
      }
    } else if ($1 === "{~") {
      let a = $[0];
      let in$1 = $[2];
      let text$1 = text + a;
      let $2 = parse_insert_delete_mark_sup_sub(in$1, splitters, "~}");
      if ($2 instanceof Some) {
        let inner = $2[0][0];
        let in$2 = $2[0][1];
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = "";
        loop$acc = listPrepend(
          new Subscript(inner),
          listPrepend(new Text(text$1), acc),
        );
      } else {
        loop$in = in$1;
        loop$splitters = splitters;
        loop$text = text$1 + "{~";
        loop$acc = acc;
      }
    } else if ($1 === "{") {
      let a = $[0];
      let in$1 = $[2];
      let text$1 = text + a;
      let $2 = parse_attributes(in$1, $dict.new$());
      if ($2 instanceof Some) {
        let in$2 = $2[0][1];
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = "";
        loop$acc = listPrepend(new Text(text$1), acc);
      } else {
        loop$in = in$1;
        loop$splitters = splitters;
        loop$text = text$1 + "{";
        loop$acc = acc;
      }
    } else if ($1 === ":") {
      let a = $[0];
      let in$1 = $[2];
      let text$1 = text + a;
      let $2 = parse_symbol(in$1);
      if ($2 instanceof Some) {
        let symbol = $2[0][0];
        let in$2 = $2[0][1];
        loop$in = in$2;
        loop$splitters = splitters;
        loop$text = "";
        loop$acc = listPrepend(symbol, listPrepend(new Text(text$1), acc));
      } else {
        loop$in = in$1;
        loop$splitters = splitters;
        loop$text = text$1 + ":";
        loop$acc = acc;
      }
    } else {
      let text2 = $[0];
      let text3 = $1;
      let in$1 = $[2];
      let $2 = (text + text2) + text3;
      if ($2 === "") {
        return [$list.reverse(acc), in$1];
      } else {
        let text$1 = $2;
        return [$list.reverse(listPrepend(new Text(text$1), acc)), in$1];
      }
    }
  }
}

/**
 * Counts the size of a div fence. Used to count pretrimmed lines which may
 * contain a valid terminating fence. Valid pretrimmed fences contain only
 * colons `:`.
 *
 * Returns Some(`size`) for a valid fence and None for an invalid fence.
 * 
 * @ignore
 */
function count_div_terminator_fence_size(loop$line, loop$count) {
  while (true) {
    let line = loop$line;
    let count = loop$count;
    if (line === "") {
      return new Some(count);
    } else if (line.charCodeAt(0) === 58) {
      let rest = line.slice(1);
      loop$line = rest;
      loop$count = count + 1;
    } else {
      return new None();
    }
  }
}

function check_line_suitable_div_end(line, fence_size) {
  let _block;
  let _pipe = line;
  let _pipe$1 = $string.trim(_pipe);
  _block = count_div_terminator_fence_size(_pipe$1, 0);
  let candidate_fence_size = _block;
  if (candidate_fence_size instanceof Some) {
    let candidate_fence_size$1 = candidate_fence_size[0];
    return candidate_fence_size$1 >= fence_size;
  } else {
    return false;
  }
}

/**
 * Split at \n. If a newline is not present, then the remaining characters
 * will be returned as if there where a newline as the final character.
 * 
 * @ignore
 */
function slurp_to_line_end(in$) {
  let $ = $string.split_once(in$, "\n");
  if ($ instanceof Ok) {
    let split = $[0];
    return split;
  } else {
    return [in$, ""];
  }
}

/**
 * Search a stretch of paragraph characters for valid div terminator. A valid
 * div terminator is a line containing leading and trailing whitespace with an
 * uninterrupted fence of colons `:`. The fence must be at least `size` long.
 * 
 * @ignore
 */
function search_paragraph_for_div_end(loop$in, loop$acc, loop$size) {
  while (true) {
    let in$ = loop$in;
    let acc = loop$acc;
    let size = loop$size;
    let $ = slurp_to_line_end(in$);
    let line = $[0];
    let rest = $[1];
    let $1 = check_line_suitable_div_end(line, size);
    if ($1) {
      return [
        (() => {
          let _pipe = acc;
          let _pipe$1 = $list.reverse(_pipe);
          return $string.join(_pipe$1, "\n");
        })(),
        in$,
      ];
    } else {
      if (rest === "") {
        return [
          (() => {
            let _pipe = listPrepend(line, acc);
            let _pipe$1 = $list.reverse(_pipe);
            return $string.join(_pipe$1, "\n");
          })(),
          "",
        ];
      } else {
        let rest$1 = rest;
        loop$in = rest$1;
        loop$acc = listPrepend(line, acc);
        loop$size = size;
      }
    }
  }
}

function take_paragraph_chars(in$, div_close_size) {
  let _block;
  let $1 = $string.split_once(in$, "\n\n");
  if ($1 instanceof Ok) {
    let content = $1[0][0];
    let in$1 = $1[0][1];
    _block = [content, in$1];
  } else {
    let $2 = $string.ends_with(in$, "\n");
    if ($2) {
      _block = [$string.drop_end(in$, 1), ""];
    } else {
      _block = [in$, ""];
    }
  }
  let $ = _block;
  let paragraph = $[0];
  let in$1 = $[1];
  if (div_close_size instanceof Some) {
    let size = div_close_size[0];
    let $2 = search_paragraph_for_div_end(paragraph, toList([]), size);
    let split_paragraph = $2[0];
    let paragraph_in = $2[1];
    if (paragraph_in === "") {
      if (split_paragraph === "") {
        return [paragraph, in$1];
      } else {
        return [split_paragraph, in$1];
      }
    } else {
      return [split_paragraph, (paragraph_in + "\n\n") + in$1];
    }
  } else {
    return [paragraph, in$1];
  }
}

function parse_paragraph(in$, attrs, splitters, div_close_size) {
  let $ = take_paragraph_chars(in$, div_close_size);
  let inline_in = $[0];
  let in$1 = $[1];
  let $1 = parse_inline(inline_in, splitters, "", toList([]));
  let inline = $1[0];
  let inline_in_remaining = $1[1];
  return [new Paragraph(attrs, inline), inline_in_remaining + in$1];
}

function parse_upper_list(loop$in, loop$num, loop$paren) {
  while (true) {
    let in$ = loop$in;
    let num = loop$num;
    let paren = loop$paren;
    let $ = in$.charCodeAt(0);
    if ($ === 65) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 1;
      loop$paren = paren;
    } else if ($ === 66) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 2;
      loop$paren = paren;
    } else if ($ === 67) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 3;
      loop$paren = paren;
    } else if ($ === 68) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 4;
      loop$paren = paren;
    } else if ($ === 69) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 5;
      loop$paren = paren;
    } else if ($ === 70) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 6;
      loop$paren = paren;
    } else if ($ === 71) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 7;
      loop$paren = paren;
    } else if ($ === 72) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 8;
      loop$paren = paren;
    } else if ($ === 73) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 9;
      loop$paren = paren;
    } else if ($ === 74) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 10;
      loop$paren = paren;
    } else if ($ === 75) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 11;
      loop$paren = paren;
    } else if ($ === 76) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 12;
      loop$paren = paren;
    } else if ($ === 77) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 13;
      loop$paren = paren;
    } else if ($ === 78) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 14;
      loop$paren = paren;
    } else if ($ === 79) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 15;
      loop$paren = paren;
    } else if ($ === 80) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 16;
      loop$paren = paren;
    } else if ($ === 81) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 17;
      loop$paren = paren;
    } else if ($ === 82) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 18;
      loop$paren = paren;
    } else if ($ === 83) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 19;
      loop$paren = paren;
    } else if ($ === 84) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 20;
      loop$paren = paren;
    } else if ($ === 85) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 21;
      loop$paren = paren;
    } else if ($ === 86) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 22;
      loop$paren = paren;
    } else if ($ === 87) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 23;
      loop$paren = paren;
    } else if ($ === 88) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 24;
      loop$paren = paren;
    } else if ($ === 89) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 25;
      loop$paren = paren;
    } else if ($ === 90) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 26;
      loop$paren = paren;
    } else if (in$.startsWith(". ") && !paren) {
      let rest = in$.slice(2);
      return new Some([new FullStop(), new UpperAlphaOrdinal(), num, rest]);
    } else if (in$.startsWith(".\n") && !paren) {
      let rest = in$.slice(2);
      return new Some([new FullStop(), new UpperAlphaOrdinal(), num, rest]);
    } else if (in$.startsWith(") ")) {
      let rest = in$.slice(2);
      let _block;
      if (paren) {
        _block = new DoubleParen();
      } else {
        _block = new SingleParen();
      }
      let punctuation = _block;
      return new Some([punctuation, new UpperAlphaOrdinal(), num, rest]);
    } else if (in$.startsWith(")\n")) {
      let rest = in$.slice(2);
      let _block;
      if (paren) {
        _block = new DoubleParen();
      } else {
        _block = new SingleParen();
      }
      let punctuation = _block;
      return new Some([punctuation, new UpperAlphaOrdinal(), num, rest]);
    } else {
      return new None();
    }
  }
}

function parse_lower_list(loop$in, loop$num, loop$paren) {
  while (true) {
    let in$ = loop$in;
    let num = loop$num;
    let paren = loop$paren;
    let $ = in$.charCodeAt(0);
    if ($ === 97) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 1;
      loop$paren = paren;
    } else if ($ === 98) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 2;
      loop$paren = paren;
    } else if ($ === 99) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 3;
      loop$paren = paren;
    } else if ($ === 100) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 4;
      loop$paren = paren;
    } else if ($ === 101) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 5;
      loop$paren = paren;
    } else if ($ === 102) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 6;
      loop$paren = paren;
    } else if ($ === 103) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 7;
      loop$paren = paren;
    } else if ($ === 104) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 8;
      loop$paren = paren;
    } else if ($ === 105) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 9;
      loop$paren = paren;
    } else if ($ === 106) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 10;
      loop$paren = paren;
    } else if ($ === 107) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 11;
      loop$paren = paren;
    } else if ($ === 108) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 12;
      loop$paren = paren;
    } else if ($ === 109) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 13;
      loop$paren = paren;
    } else if ($ === 110) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 14;
      loop$paren = paren;
    } else if ($ === 111) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 15;
      loop$paren = paren;
    } else if ($ === 112) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 16;
      loop$paren = paren;
    } else if ($ === 113) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 17;
      loop$paren = paren;
    } else if ($ === 114) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 18;
      loop$paren = paren;
    } else if ($ === 115) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 19;
      loop$paren = paren;
    } else if ($ === 116) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 20;
      loop$paren = paren;
    } else if ($ === 117) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 21;
      loop$paren = paren;
    } else if ($ === 118) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 22;
      loop$paren = paren;
    } else if ($ === 119) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 23;
      loop$paren = paren;
    } else if ($ === 120) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 24;
      loop$paren = paren;
    } else if ($ === 121) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 25;
      loop$paren = paren;
    } else if ($ === 122) {
      let in$1 = in$.slice(1);
      loop$in = in$1;
      loop$num = num * 26 + 26;
      loop$paren = paren;
    } else if (in$.startsWith(". ") && !paren) {
      let rest = in$.slice(2);
      return new Some([new FullStop(), new LowerAlphaOrdinal(), num, rest]);
    } else if (in$.startsWith(".\n") && !paren) {
      let rest = in$.slice(2);
      return new Some([new FullStop(), new LowerAlphaOrdinal(), num, rest]);
    } else if (in$.startsWith(") ")) {
      let rest = in$.slice(2);
      let _block;
      if (paren) {
        _block = new DoubleParen();
      } else {
        _block = new SingleParen();
      }
      let punctuation = _block;
      return new Some([punctuation, new LowerAlphaOrdinal(), num, rest]);
    } else if (in$.startsWith(")\n")) {
      let rest = in$.slice(2);
      let _block;
      if (paren) {
        _block = new DoubleParen();
      } else {
        _block = new SingleParen();
      }
      let punctuation = _block;
      return new Some([punctuation, new LowerAlphaOrdinal(), num, rest]);
    } else {
      return new None();
    }
  }
}

function parse_number_list(loop$in, loop$num, loop$paren) {
  while (true) {
    let in$ = loop$in;
    let num = loop$num;
    let paren = loop$paren;
    let $ = in$.charCodeAt(0);
    if ($ === 48) {
      let rest = in$.slice(1);
      loop$in = rest;
      loop$num = num * 10 + 0;
      loop$paren = paren;
    } else if ($ === 49) {
      let rest = in$.slice(1);
      loop$in = rest;
      loop$num = num * 10 + 1;
      loop$paren = paren;
    } else if ($ === 50) {
      let rest = in$.slice(1);
      loop$in = rest;
      loop$num = num * 10 + 2;
      loop$paren = paren;
    } else if ($ === 51) {
      let rest = in$.slice(1);
      loop$in = rest;
      loop$num = num * 10 + 3;
      loop$paren = paren;
    } else if ($ === 52) {
      let rest = in$.slice(1);
      loop$in = rest;
      loop$num = num * 10 + 4;
      loop$paren = paren;
    } else if ($ === 53) {
      let rest = in$.slice(1);
      loop$in = rest;
      loop$num = num * 10 + 5;
      loop$paren = paren;
    } else if ($ === 54) {
      let rest = in$.slice(1);
      loop$in = rest;
      loop$num = num * 10 + 6;
      loop$paren = paren;
    } else if ($ === 55) {
      let rest = in$.slice(1);
      loop$in = rest;
      loop$num = num * 10 + 7;
      loop$paren = paren;
    } else if ($ === 56) {
      let rest = in$.slice(1);
      loop$in = rest;
      loop$num = num * 10 + 8;
      loop$paren = paren;
    } else if ($ === 57) {
      let rest = in$.slice(1);
      loop$in = rest;
      loop$num = num * 10 + 9;
      loop$paren = paren;
    } else if (in$.startsWith(". ")) {
      let rest = in$.slice(2);
      return new Some([new FullStop(), new NumericOrdinal(), num, rest]);
    } else if (in$.startsWith(".\n")) {
      let rest = in$.slice(2);
      return new Some([new FullStop(), new NumericOrdinal(), num, rest]);
    } else if (in$.startsWith(") ")) {
      let rest = in$.slice(2);
      let _block;
      if (paren) {
        _block = new DoubleParen();
      } else {
        _block = new SingleParen();
      }
      let punctuation = _block;
      return new Some([punctuation, new NumericOrdinal(), num, rest]);
    } else if (in$.startsWith(")\n")) {
      let rest = in$.slice(2);
      let _block;
      if (paren) {
        _block = new DoubleParen();
      } else {
        _block = new SingleParen();
      }
      let punctuation = _block;
      return new Some([punctuation, new NumericOrdinal(), num, rest]);
    } else {
      return new None();
    }
  }
}

function parse_list_marker_maybe_paren(in$, paren) {
  let $ = in$.charCodeAt(0);
  if ($ === 48) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 49) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 50) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 51) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 52) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 53) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 54) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 55) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 56) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 57) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 97) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 98) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 99) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 100) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 101) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 102) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 103) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 104) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 105) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 106) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 107) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 108) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 109) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 110) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 111) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 112) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 113) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 114) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 115) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 116) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 117) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 118) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 119) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 120) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 121) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 122) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 65) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 66) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 67) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 68) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 69) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 70) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 71) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 72) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 73) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 74) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 75) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 76) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 77) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 78) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 79) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 80) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 81) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 82) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 83) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 84) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 85) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 86) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 87) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 88) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 89) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else if ($ === 90) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      return new Some([new Ordered(start, punctuation, style), in$1]);
    } else {
      return $1;
    }
  } else {
    return new None();
  }
}

function parse_list_marker(in$) {
  if (in$.startsWith("- ")) {
    let in$1 = in$.slice(2);
    return new Some([new Bullet(new BulletDash()), in$1]);
  } else if (in$.startsWith("-\n")) {
    let in$1 = in$.slice(2);
    return new Some([new Bullet(new BulletDash()), in$1]);
  } else if (in$.startsWith("* ")) {
    let in$1 = in$.slice(2);
    return new Some([new Bullet(new BulletStar()), in$1]);
  } else if (in$.startsWith("*\n")) {
    let in$1 = in$.slice(2);
    return new Some([new Bullet(new BulletStar()), in$1]);
  } else if (in$.startsWith("+ ")) {
    let in$1 = in$.slice(2);
    return new Some([new Bullet(new BulletPlus()), in$1]);
  } else if (in$.startsWith("+\n")) {
    let in$1 = in$.slice(2);
    return new Some([new Bullet(new BulletPlus()), in$1]);
  } else if (in$.charCodeAt(0) === 40) {
    let in$1 = in$.slice(1);
    return parse_list_marker_maybe_paren(in$1, true);
  } else {
    return parse_list_marker_maybe_paren(in$, false);
  }
}

function continue_list(in$, style) {
  let $ = parse_list_marker(in$);
  if ($ instanceof Some) {
    let next = $[0][0];
    let in$1 = $[0][1];
    if (style instanceof Ordered && next instanceof Ordered) {
      let p1 = style.punctuation;
      let s1 = style.style;
      let p2 = next.punctuation;
      let s2 = next.style;
      if ((isEqual(p1, p2)) && (isEqual(s1, s2))) {
        return new Some(in$1);
      } else if (isEqual(style, next)) {
        return new Some(in$1);
      } else {
        return new None();
      }
    } else if (isEqual(style, next)) {
      return new Some(in$1);
    } else {
      return new None();
    }
  } else {
    return $;
  }
}

function drop_n_spaces(loop$in, loop$count) {
  while (true) {
    let in$ = loop$in;
    let count = loop$count;
    if (count === 0) {
      return in$;
    } else if (in$.charCodeAt(0) === 32) {
      let rest = in$.slice(1);
      loop$in = rest;
      loop$count = count - 1;
    } else {
      return in$;
    }
  }
}

function take_list_item_chars_indented(
  loop$in,
  loop$acc,
  loop$style,
  loop$layout,
  loop$indent
) {
  while (true) {
    let in$ = loop$in;
    let acc = loop$acc;
    let style = loop$style;
    let layout = loop$layout;
    let indent = loop$indent;
    let in$1 = drop_n_spaces(in$, indent);
    let _block;
    let $1 = $string.split_once(in$1, "\n");
    if ($1 instanceof Ok) {
      let split = $1[0];
      _block = split;
    } else {
      _block = [in$1, ""];
    }
    let $ = _block;
    let line = $[0];
    let in$2 = $[1];
    let acc$1 = acc + line;
    let $2 = in$2.charCodeAt(0);
    if (in$2 === "") {
      return [acc$1, "", layout];
    } else if ($2 === 32) {
      loop$in = in$2;
      loop$acc = acc$1 + "\n";
      loop$style = style;
      loop$layout = layout;
      loop$indent = indent;
    } else if (in$2.startsWith("\n ")) {
      let rest = in$2.slice(2);
      let _block$1;
      let $3 = parse_list_marker(drop_spaces(rest));
      if ($3 instanceof Some) {
        _block$1 = layout;
      } else {
        _block$1 = new Loose();
      }
      let layout$1 = _block$1;
      let acc$2 = acc$1 + "\n\n";
      let in$3 = $string.drop_start(in$2, 1);
      loop$in = in$3;
      loop$acc = acc$2;
      loop$style = style;
      loop$layout = layout$1;
      loop$indent = indent;
    } else if ($2 === 10) {
      let rest2 = in$2.slice(1);
      return [acc$1, rest2, layout];
    } else {
      let $3 = continue_list(in$2, style);
      if ($3 instanceof Some) {
        return [acc$1, in$2, layout];
      } else {
        loop$in = in$2;
        loop$acc = acc$1 + "\n";
        loop$style = style;
        loop$layout = layout;
        loop$indent = indent;
      }
    }
  }
}

function count_drop_spaces(loop$in, loop$count) {
  while (true) {
    let in$ = loop$in;
    let count = loop$count;
    if (in$.charCodeAt(0) === 32) {
      let rest = in$.slice(1);
      loop$in = rest;
      loop$count = count + 1;
    } else {
      let other = in$;
      return [other, count];
    }
  }
}

function take_list_item_chars(loop$in, loop$acc, loop$style, loop$layout) {
  while (true) {
    let in$ = loop$in;
    let acc = loop$acc;
    let style = loop$style;
    let layout = loop$layout;
    let _block;
    let $1 = $string.split_once(in$, "\n");
    if ($1 instanceof Ok) {
      let split = $1[0];
      _block = split;
    } else {
      _block = [in$, ""];
    }
    let $ = _block;
    let line = $[0];
    let in$1 = $[1];
    let acc$1 = acc + line;
    let $2 = in$1.charCodeAt(0);
    if (in$1 === "") {
      return [acc$1, "", layout];
    } else if ($2 === 32) {
      loop$in = in$1;
      loop$acc = acc$1 + "\n";
      loop$style = style;
      loop$layout = layout;
    } else if (in$1.startsWith("\n ")) {
      let rest = in$1.slice(2);
      let $3 = count_drop_spaces(rest, 1);
      let rest$1 = $3[0];
      let indent = $3[1];
      let _block$1;
      let $4 = parse_list_marker(rest$1);
      if ($4 instanceof Some) {
        _block$1 = layout;
      } else {
        _block$1 = new Loose();
      }
      let layout$1 = _block$1;
      let acc$2 = acc$1 + "\n\n";
      return take_list_item_chars_indented(
        rest$1,
        acc$2,
        style,
        layout$1,
        indent,
      );
    } else if ($2 === 10) {
      let in$2 = in$1.slice(1);
      let _block$1;
      let $3 = continue_list(in$2, style);
      if ($3 instanceof Some) {
        _block$1 = new Loose();
      } else {
        _block$1 = layout;
      }
      let layout$1 = _block$1;
      return [acc$1, in$2, layout$1];
    } else {
      let $3 = parse_list_marker(in$1);
      if ($3 instanceof Some) {
        return [acc$1, in$1, layout];
      } else {
        loop$in = in$1;
        loop$acc = acc$1 + "\n";
        loop$style = style;
        loop$layout = layout;
      }
    }
  }
}

/**
 * Checks if current line is a suitable terminator for
 * a div fence of a particular size.
 *
 * Returns the rest of the input if it is.
 * 
 * @ignore
 */
function check_first_line_suitable_div_end(in$, fence_size) {
  let $ = slurp_to_line_end(in$);
  let line = $[0];
  let rest = $[1];
  let $1 = check_line_suitable_div_end(line, fence_size);
  if ($1) {
    return new Some(rest);
  } else {
    return new None();
  }
}

/**
 * Parse the class name for a div. Returns Some if a classname is present.
 * Returns Some if no classname is present. Returns None if the text is an
 * invalid classname.
 * 
 * @ignore
 */
function parse_div_class(in$) {
  let $ = slurp_to_line_end(in$);
  let line = $[0];
  let rest = $[1];
  let line$1 = $string.trim(line);
  let has_prohibited = $list.any(
    toList([" ", "\t"]),
    (_capture) => { return $string.contains(line$1, _capture); },
  );
  if (has_prohibited) {
    return new None();
  } else {
    return new Some([line$1, rest]);
  }
}

/**
 * Counts the size of a div fence. Used in initial parsing of a div once a
 * minimum fence structure has been seen: `:::`.
 *
 * Returns the size of the fence seen with the remainder of the unused input
 * stream.
 * 
 * @ignore
 */
function count_div_fence_size(loop$in, loop$count) {
  while (true) {
    let in$ = loop$in;
    let count = loop$count;
    if (in$.charCodeAt(0) === 58) {
      let rest = in$.slice(1);
      loop$in = rest;
      loop$count = count + 1;
    } else {
      return [count, in$];
    }
  }
}

function parse_ref_value(loop$in, loop$id, loop$url) {
  while (true) {
    let in$ = loop$in;
    let id = loop$id;
    let url = loop$url;
    if (in$.startsWith("\n ")) {
      let in$1 = in$.slice(2);
      loop$in = drop_spaces(in$1);
      loop$id = id;
      loop$url = url;
    } else if (in$.charCodeAt(0) === 10) {
      let in$1 = in$.slice(1);
      return new Some([id, $string.trim(url), in$1]);
    } else {
      let $ = $string.pop_grapheme(in$);
      if ($ instanceof Ok) {
        let c = $[0][0];
        let in$1 = $[0][1];
        loop$in = in$1;
        loop$id = id;
        loop$url = url + c;
      } else {
        return new Some([id, $string.trim(url), ""]);
      }
    }
  }
}

function parse_ref_def(loop$in, loop$id) {
  while (true) {
    let in$ = loop$in;
    let id = loop$id;
    let $ = in$.charCodeAt(0);
    if (in$.startsWith("]:")) {
      let in$1 = in$.slice(2);
      return parse_ref_value(in$1, id, "");
    } else if (in$ === "") {
      return new None();
    } else if ($ === 93) {
      return new None();
    } else if ($ === 10) {
      return new None();
    } else {
      let $1 = $string.pop_grapheme(in$);
      if ($1 instanceof Ok) {
        let c = $1[0][0];
        let in$1 = $1[0][1];
        loop$in = in$1;
        loop$id = id + c;
      } else {
        return new None();
      }
    }
  }
}

function drop_lines(loop$in) {
  while (true) {
    let in$ = loop$in;
    if (in$.charCodeAt(0) === 10) {
      let rest = in$.slice(1);
      loop$in = rest;
    } else {
      return in$;
    }
  }
}

function parse_thematic_break(loop$count, loop$in) {
  while (true) {
    let count = loop$count;
    let in$ = loop$in;
    let $ = in$.charCodeAt(0);
    if (in$ === "" && count >= 3) {
      return new Some([new ThematicBreak(), in$]);
    } else if ($ === 10 && count >= 3) {
      return new Some([new ThematicBreak(), in$]);
    } else if ($ === 32) {
      let rest = in$.slice(1);
      loop$count = count;
      loop$in = rest;
    } else if ($ === 9) {
      let rest = in$.slice(1);
      loop$count = count;
      loop$in = rest;
    } else if ($ === 45) {
      let rest = in$.slice(1);
      loop$count = count + 1;
      loop$in = rest;
    } else if ($ === 42) {
      let rest = in$.slice(1);
      loop$count = count + 1;
      loop$in = rest;
    } else {
      return new None();
    }
  }
}

function take_block_quote_stop_on_div_close(in$, lines, div_close_size) {
  let $ = slurp_to_line_end(in$);
  let line = $[0];
  let rest = $[1];
  if (div_close_size instanceof Some) {
    let size = div_close_size[0];
    let $1 = check_line_suitable_div_end(line, size);
    if ($1) {
      return [lines, in$];
    } else {
      if (rest === "") {
        return [listPrepend(line, lines), ""];
      } else {
        return take_block_quote_chars(
          rest,
          listPrepend(line, lines),
          div_close_size,
        );
      }
    }
  } else {
    if (rest === "") {
      return [listPrepend(line, lines), ""];
    } else {
      return take_block_quote_chars(
        rest,
        listPrepend(line, lines),
        div_close_size,
      );
    }
  }
}

function take_block_quote_chars(loop$in, loop$lines, loop$div_close_size) {
  while (true) {
    let in$ = loop$in;
    let lines = loop$lines;
    let div_close_size = loop$div_close_size;
    if (in$.charCodeAt(0) === 10) {
      let in$1 = in$.slice(1);
      return [lines, in$1];
    } else if (in$ === ">") {
      return [listPrepend("", lines), ""];
    } else if (in$.startsWith(">\n")) {
      let in$1 = in$.slice(2);
      if (lines instanceof $Empty) {
        loop$in = in$1;
        loop$lines = toList([]);
        loop$div_close_size = div_close_size;
      } else {
        loop$in = in$1;
        loop$lines = listPrepend("", lines);
        loop$div_close_size = div_close_size;
      }
    } else if (in$.startsWith("> ")) {
      let in$1 = in$.slice(2);
      let $ = $string.split_once(in$1, "\n");
      if ($ instanceof Ok) {
        let line = $[0][0];
        let in$2 = $[0][1];
        loop$in = in$2;
        loop$lines = listPrepend(line, lines);
        loop$div_close_size = div_close_size;
      } else {
        return [listPrepend(in$1, lines), ""];
      }
    } else {
      let in$1 = in$;
      return take_block_quote_stop_on_div_close(in$1, lines, div_close_size);
    }
  }
}

function slurp_verbatim_line(
  loop$in,
  loop$indentation,
  loop$acc,
  loop$splitters
) {
  while (true) {
    let in$ = loop$in;
    let indentation = loop$indentation;
    let acc = loop$acc;
    let splitters = loop$splitters;
    let $ = $splitter.split(splitters.verbatim_line_end, in$);
    let $1 = $[1];
    if ($1 === "\n") {
      let before = $[0];
      let in$1 = $[2];
      return [(acc + before) + "\n", in$1];
    } else if ($1 === " ") {
      let $2 = $[0];
      if ($2 === "" && indentation > 0) {
        let in$1 = $[2];
        loop$in = in$1;
        loop$indentation = indentation - 1;
        loop$acc = acc;
        loop$splitters = splitters;
      } else {
        let before = $2;
        let split = $1;
        let in$1 = $[2];
        loop$in = in$1;
        loop$indentation = indentation;
        loop$acc = (acc + before) + split;
        loop$splitters = splitters;
      }
    } else {
      let before = $[0];
      let split = $1;
      let in$1 = $[2];
      loop$in = in$1;
      loop$indentation = indentation;
      loop$acc = (acc + before) + split;
      loop$splitters = splitters;
    }
  }
}

function parse_codeblock_end(loop$in, loop$delim, loop$count) {
  while (true) {
    let in$ = loop$in;
    let delim = loop$delim;
    let count = loop$count;
    let $ = in$.charCodeAt(0);
    if ($ === 10 && count === 0) {
      let in$1 = in$.slice(1);
      return new Some(in$1);
    } else if ($ === 32) {
      if (count === 0) {
        return new Some(in$);
      } else {
        let in$1 = in$.slice(1);
        loop$in = in$1;
        loop$delim = delim;
        loop$count = count;
      }
    } else if (count === 0) {
      return new Some(in$);
    } else {
      let $1 = $string.pop_grapheme(in$);
      if ($1 instanceof Ok) {
        let c = $1[0][0];
        if (c === delim) {
          let in$1 = $1[0][1];
          loop$in = in$1;
          loop$delim = delim;
          loop$count = count - 1;
        } else {
          return new None();
        }
      } else {
        return new Some(in$);
      }
    }
  }
}

function parse_codeblock_content(
  loop$in,
  loop$delim,
  loop$count,
  loop$indentation,
  loop$acc,
  loop$splitters
) {
  while (true) {
    let in$ = loop$in;
    let delim = loop$delim;
    let count = loop$count;
    let indentation = loop$indentation;
    let acc = loop$acc;
    let splitters = loop$splitters;
    let $ = parse_codeblock_end(in$, delim, count);
    if ($ instanceof Some) {
      let in$1 = $[0];
      return [acc, in$1];
    } else {
      let $1 = slurp_verbatim_line(in$, indentation, acc, splitters);
      let acc$1 = $1[0];
      let in$1 = $1[1];
      loop$in = in$1;
      loop$delim = delim;
      loop$count = count;
      loop$indentation = indentation;
      loop$acc = acc$1;
      loop$splitters = splitters;
    }
  }
}

function parse_codeblock_language(in$, splitters, language) {
  let $ = $splitter.split(splitters.codeblock_language, in$);
  let $1 = $[1];
  if ($1 === "`") {
    return new None();
  } else if ($1 === "\n") {
    let a = $[0];
    if ((a === "") && (language === "")) {
      return new Some([new None(), in$]);
    } else {
      let a = $[0];
      let in$1 = $[2];
      return new Some([new Some(language + a), in$1]);
    }
  } else {
    return new Some([new None(), in$]);
  }
}

function parse_codeblock_start(loop$in, loop$splitters, loop$delim, loop$count) {
  while (true) {
    let in$ = loop$in;
    let splitters = loop$splitters;
    let delim = loop$delim;
    let count = loop$count;
    let $ = in$.charCodeAt(0);
    if ($ === 96) {
      let c = "`";
      if (c === delim) {
        let in$1 = in$.slice(1);
        loop$in = in$1;
        loop$splitters = splitters;
        loop$delim = delim;
        loop$count = count + 1;
      } else if (count >= 3) {
        let in$1 = drop_spaces(in$);
        return $option.map(
          parse_codeblock_language(in$1, splitters, ""),
          (_use0) => {
            let language = _use0[0];
            let in$2 = _use0[1];
            return [language, count, in$2];
          },
        );
      } else {
        return new None();
      }
    } else if ($ === 126) {
      let c = "~";
      if (c === delim) {
        let in$1 = in$.slice(1);
        loop$in = in$1;
        loop$splitters = splitters;
        loop$delim = delim;
        loop$count = count + 1;
      } else if (count >= 3) {
        let in$1 = drop_spaces(in$);
        return $option.map(
          parse_codeblock_language(in$1, splitters, ""),
          (_use0) => {
            let language = _use0[0];
            let in$2 = _use0[1];
            return [language, count, in$2];
          },
        );
      } else {
        return new None();
      }
    } else if ($ === 10 && count >= 3) {
      let in$1 = in$.slice(1);
      return new Some([new None(), count, in$1]);
    } else if (in$ === "") {
      return new None();
    } else if (count >= 3) {
      let in$1 = drop_spaces(in$);
      return $option.map(
        parse_codeblock_language(in$1, splitters, ""),
        (_use0) => {
          let language = _use0[0];
          let in$2 = _use0[1];
          return [language, count, in$2];
        },
      );
    } else {
      return new None();
    }
  }
}

function parse_codeblock(in$, attrs, delim, indentation, splitters) {
  let out = parse_codeblock_start(in$, splitters, delim, 1);
  return $option.then$(
    out,
    (_use0) => {
      let language = _use0[0];
      let count = _use0[1];
      let in$1 = _use0[2];
      let $ = parse_codeblock_content(
        in$1,
        delim,
        count,
        indentation,
        "",
        splitters,
      );
      let content = $[0];
      let in$2 = $[1];
      if (language instanceof Some) {
        let $1 = language[0];
        if ($1 === "=html") {
          return new Some([new RawBlock($string.trim_end(content)), in$2]);
        } else {
          return new Some([new Codeblock(attrs, language, content), in$2]);
        }
      } else {
        return new Some([new Codeblock(attrs, language, content), in$2]);
      }
    },
  );
}

function id_sanitise(content) {
  let _pipe = content;
  let _pipe$1 = $string.replace(_pipe, "#", "");
  let _pipe$2 = $string.replace(_pipe$1, "?", "");
  let _pipe$3 = $string.replace(_pipe$2, "!", "");
  let _pipe$4 = $string.replace(_pipe$3, ",", "");
  let _pipe$5 = $string.trim(_pipe$4);
  let _pipe$6 = $string.replace(_pipe$5, " ", "-");
  return $string.replace(_pipe$6, "\n", "-");
}

function take_heading_chars_newline_hash(loop$in, loop$level, loop$acc) {
  while (true) {
    let in$ = loop$in;
    let level = loop$level;
    let acc = loop$acc;
    if (level < 0) {
      return new None();
    } else {
      let $ = in$.charCodeAt(0);
      if (in$ === "") {
        if (level > 0) {
          return new None();
        } else if (level === 0) {
          return new Some([acc, ""]);
        } else {
          return new None();
        }
      } else if ($ === 32 && level === 0) {
        let in$1 = in$.slice(1);
        return new Some([acc, in$1]);
      } else if ($ === 35) {
        let rest = in$.slice(1);
        loop$in = rest;
        loop$level = level - 1;
        loop$acc = acc;
      } else {
        return new None();
      }
    }
  }
}

function take_heading_chars(loop$in, loop$level, loop$acc) {
  while (true) {
    let in$ = loop$in;
    let level = loop$level;
    let acc = loop$acc;
    if (in$ === "") {
      return [acc, ""];
    } else if (in$ === "\n") {
      return [acc, ""];
    } else if (in$.startsWith("\n\n")) {
      let in$1 = in$.slice(2);
      return [acc, in$1];
    } else if (in$.startsWith("\n#")) {
      let rest = in$.slice(2);
      let $ = take_heading_chars_newline_hash(rest, level - 1, acc + "\n");
      if ($ instanceof Some) {
        let acc$1 = $[0][0];
        let in$1 = $[0][1];
        loop$in = in$1;
        loop$level = level;
        loop$acc = acc$1;
      } else {
        return [acc, in$];
      }
    } else {
      let $ = $string.pop_grapheme(in$);
      if ($ instanceof Ok) {
        let c = $[0][0];
        let in$1 = $[0][1];
        loop$in = in$1;
        loop$level = level;
        loop$acc = acc + c;
      } else {
        return [acc, ""];
      }
    }
  }
}

function heading_level(loop$in, loop$level) {
  while (true) {
    let in$ = loop$in;
    let level = loop$level;
    let $ = in$.charCodeAt(0);
    if ($ === 35) {
      let rest = in$.slice(1);
      loop$in = rest;
      loop$level = level + 1;
    } else if (in$ === "" && level > 0) {
      return new Some([level, ""]);
    } else if ($ === 32 && level !== 0) {
      let rest = in$.slice(1);
      return new Some([level, rest]);
    } else if ($ === 10 && level !== 0) {
      let rest = in$.slice(1);
      return new Some([level, rest]);
    } else {
      return new None();
    }
  }
}

function parse_heading(in$, refs, splitters, attrs, div_close_size) {
  let $ = heading_level(in$, 1);
  if ($ instanceof Some) {
    let level = $[0][0];
    let in$1 = $[0][1];
    let in$2 = drop_spaces(in$1);
    let $1 = take_heading_chars(in$2, level, "");
    let inline_in = $1[0];
    let in$3 = $1[1];
    let $2 = parse_inline(inline_in, splitters, "", toList([]));
    let inline = $2[0];
    let inline_in_remaining = $2[1];
    let text = take_inline_text(inline, "");
    let _block;
    let $4 = id_sanitise(text);
    if ($4 === "") {
      _block = [refs, attrs];
    } else {
      let id = $4;
      let $5 = $dict.get(refs.headings, id);
      if ($5 instanceof Ok) {
        let i = $5[0];
        let i$1 = i + 1;
        let refs$1 = new Refs(
          refs.urls,
          refs.url_attributes,
          $dict.insert(refs.headings, id, i$1),
          refs.footnotes,
        );
        let id$1 = (id + "-") + $int.to_string(i$1);
        let attrs$1 = add_attribute(attrs, "id", id$1);
        _block = [refs$1, attrs$1];
      } else {
        let refs$1 = new Refs(
          refs.urls,
          refs.url_attributes,
          $dict.insert(refs.headings, id, 0),
          refs.footnotes,
        );
        let attrs$1 = add_attribute(attrs, "id", id);
        _block = [refs$1, attrs$1];
      }
    }
    let $3 = _block;
    let refs$1 = $3[0];
    let attrs$1 = $3[1];
    let heading = new Heading(attrs$1, level, inline);
    return [heading, refs$1, inline_in_remaining + in$3];
  } else {
    let $1 = parse_paragraph("#" + in$, attrs, splitters, div_close_size);
    let p = $1[0];
    let in$1 = $1[1];
    return [p, refs, in$1];
  }
}

function parse_list_item(
  loop$in,
  loop$refs,
  loop$attrs,
  loop$splitters,
  loop$children
) {
  while (true) {
    let in$ = loop$in;
    let refs = loop$refs;
    let attrs = loop$attrs;
    let splitters = loop$splitters;
    let children = loop$children;
    let $ = parse_container(in$, refs, splitters, attrs, 0, new None());
    let in$1 = $[0];
    let refs$1 = $[1];
    let container = $[2];
    let attrs$1 = $[3];
    let _block;
    if (container instanceof Some) {
      let container$1 = container[0];
      _block = listPrepend(container$1, children);
    } else {
      _block = children;
    }
    let children$1 = _block;
    if (in$1 === "") {
      return $list.reverse(children$1);
    } else {
      loop$in = in$1;
      loop$refs = refs$1;
      loop$attrs = attrs$1;
      loop$splitters = splitters;
      loop$children = children$1;
    }
  }
}

function parse_list(
  loop$in,
  loop$refs,
  loop$attrs,
  loop$style,
  loop$layout,
  loop$items,
  loop$splitters
) {
  while (true) {
    let in$ = loop$in;
    let refs = loop$refs;
    let attrs = loop$attrs;
    let style = loop$style;
    let layout = loop$layout;
    let items = loop$items;
    let splitters = loop$splitters;
    let $ = take_list_item_chars(in$, "", style, layout);
    let inline_in = $[0];
    let in$1 = $[1];
    let layout$1 = $[2];
    let item = parse_list_item(inline_in, refs, attrs, splitters, toList([]));
    let items$1 = listPrepend(item, items);
    let $1 = continue_list(in$1, style);
    if ($1 instanceof Some) {
      let in$2 = $1[0];
      loop$in = in$2;
      loop$refs = refs;
      loop$attrs = attrs;
      loop$style = style;
      loop$layout = layout$1;
      loop$items = items$1;
      loop$splitters = splitters;
    } else {
      let items$2 = $list.reverse(items$1);
      let _block;
      if (style instanceof Bullet) {
        let style$1 = style[0];
        _block = new BulletList(layout$1, style$1, items$2);
      } else {
        let start = style.start;
        let punctuation = style.punctuation;
        let ordinal = style.style;
        _block = new OrderedList(layout$1, punctuation, ordinal, start, items$2);
      }
      let container = _block;
      return [container, in$1];
    }
  }
}

function parse_maybe_list(in$, refs, attrs, splitters, paren) {
  let $ = in$.charCodeAt(0);
  if ($ === 48) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 49) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 50) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 51) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 52) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 53) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 54) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 55) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 56) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 57) {
    let $1 = parse_number_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 97) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 98) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 99) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 100) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 101) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 102) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 103) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 104) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 105) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 106) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 107) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 108) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 109) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 110) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 111) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 112) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 113) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 114) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 115) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 116) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 117) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 118) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 119) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 120) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 121) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 122) {
    let $1 = parse_lower_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 65) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 66) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 67) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 68) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 69) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 70) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 71) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 72) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 73) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 74) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 75) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 76) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 77) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 78) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 79) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 80) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 81) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 82) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 83) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 84) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 85) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 86) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 87) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 88) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 89) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else if ($ === 90) {
    let $1 = parse_upper_list(in$, 0, paren);
    if ($1 instanceof Some) {
      let punctuation = $1[0][0];
      let style = $1[0][1];
      let start = $1[0][2];
      let in$1 = $1[0][3];
      let style$1 = new Ordered(start, punctuation, style);
      let $2 = parse_list(
        in$1,
        refs,
        attrs,
        style$1,
        new Tight(),
        toList([]),
        splitters,
      );
      let list = $2[0];
      let in$2 = $2[1];
      return new Some([in$2, refs, list]);
    } else {
      return $1;
    }
  } else {
    return new None();
  }
}

function parse_div_content(
  loop$in,
  loop$refs,
  loop$attrs,
  loop$fence_size,
  loop$splitters,
  loop$children
) {
  while (true) {
    let in$ = loop$in;
    let refs = loop$refs;
    let attrs = loop$attrs;
    let fence_size = loop$fence_size;
    let splitters = loop$splitters;
    let children = loop$children;
    let $ = check_first_line_suitable_div_end(in$, fence_size);
    if ($ instanceof Some) {
      let in2 = $[0];
      return [in2, $list.reverse(children)];
    } else {
      let $1 = parse_container(
        in$,
        refs,
        splitters,
        attrs,
        0,
        new Some(fence_size),
      );
      let in$1 = $1[0];
      let refs$1 = $1[1];
      let container = $1[2];
      let attrs$1 = $1[3];
      let _block;
      if (container instanceof Some) {
        let container$1 = container[0];
        _block = listPrepend(container$1, children);
      } else {
        _block = children;
      }
      let children$1 = _block;
      if (in$1 === "") {
        return [in$1, $list.reverse(children$1)];
      } else {
        loop$in = in$1;
        loop$refs = refs$1;
        loop$attrs = attrs$1;
        loop$fence_size = fence_size;
        loop$splitters = splitters;
        loop$children = children$1;
      }
    }
  }
}

/**
 * Parse a div.
 * 
 * @ignore
 */
function parse_div(in$, refs, attrs, splitters) {
  let $ = count_div_fence_size(in$, 3);
  let size = $[0];
  let in2 = $[1];
  let class$ = parse_div_class(in2);
  return $option.then$(
    class$,
    (_use0) => {
      let class$1 = _use0[0];
      let rest = _use0[1];
      let _block;
      if (class$1 === "") {
        _block = attrs;
      } else {
        let class$2 = class$1;
        _block = add_attribute(attrs, "class", class$2);
      }
      let attrs$1 = _block;
      let _block$1;
      if (class$1 === "") {
        _block$1 = new $option.None();
      } else {
        _block$1 = new $option.Some(class$1);
      }
      let class$2 = _block$1;
      let $1 = parse_div_content(
        rest,
        refs,
        $dict.new$(),
        size,
        splitters,
        toList([]),
      );
      let rest$1 = $1[0];
      let content = $1[1];
      return new Some([rest$1, class$2, attrs$1, content]);
    },
  );
}

/**
 * Parse a block of Djot that ends once the content is no longer indented
 * to a certain level.
 * For example:
 *
 * ```djot
 * Here's the reference.[^ref]
 *
 * [^ref]: This footnote is a block with two paragraphs.
 *
 *   This is part of the block because it is indented past the start of `[^ref]`
 *
 * But this would not be parsed as part of the block because it has no indentation
 * ```
 * 
 * @ignore
 */
function parse_block(
  loop$in,
  loop$refs,
  loop$splitters,
  loop$ast,
  loop$attrs,
  loop$required_spaces
) {
  while (true) {
    let in$ = loop$in;
    let refs = loop$refs;
    let splitters = loop$splitters;
    let ast = loop$ast;
    let attrs = loop$attrs;
    let required_spaces = loop$required_spaces;
    let in$1 = drop_lines(in$);
    let $ = count_drop_spaces(in$1, 0);
    let in$2 = $[0];
    let indentation = $[1];
    let $1 = indentation < required_spaces;
    if ($1) {
      return [$list.reverse(ast), refs, in$2];
    } else {
      let $2 = parse_container(
        in$2,
        refs,
        splitters,
        attrs,
        indentation,
        new None(),
      );
      let in$3 = $2[0];
      let refs$1 = $2[1];
      let container = $2[2];
      let attrs$1 = $2[3];
      let _block;
      if (container instanceof Some) {
        let container$1 = container[0];
        _block = listPrepend(container$1, ast);
      } else {
        _block = ast;
      }
      let ast$1 = _block;
      if (in$3 === "") {
        return [$list.reverse(ast$1), refs$1, in$3];
      } else {
        loop$in = in$3;
        loop$refs = refs$1;
        loop$splitters = splitters;
        loop$ast = ast$1;
        loop$attrs = attrs$1;
        loop$required_spaces = required_spaces;
      }
    }
  }
}

/**
 * This function allows us to parse the contents of a block after we know
 * that the *first* container meets indentation requirements, but we want to
 * ensure that once this container is parsed, future containers meet the
 * indentation requirements
 * 
 * @ignore
 */
function parse_block_after_indent_checked(
  in$,
  refs,
  splitters,
  ast,
  attrs,
  required_spaces,
  indentation
) {
  let $ = parse_container(in$, refs, splitters, attrs, indentation, new None());
  let in$1 = $[0];
  let refs$1 = $[1];
  let container = $[2];
  let attrs$1 = $[3];
  let _block;
  if (container instanceof Some) {
    let container$1 = container[0];
    _block = listPrepend(container$1, ast);
  } else {
    _block = ast;
  }
  let ast$1 = _block;
  if (in$1 === "") {
    return [$list.reverse(ast$1), refs$1, in$1];
  } else {
    return parse_block(in$1, refs$1, splitters, ast$1, attrs$1, required_spaces);
  }
}

function parse_footnote_def(loop$in, loop$refs, loop$splitters, loop$id) {
  while (true) {
    let in$ = loop$in;
    let refs = loop$refs;
    let splitters = loop$splitters;
    let id = loop$id;
    let $ = in$.charCodeAt(0);
    if (in$.startsWith("]:")) {
      let in$1 = in$.slice(2);
      let $1 = count_drop_spaces(in$1, 0);
      let in$2 = $1[0];
      let spaces_count = $1[1];
      let _block;
      if (in$2.charCodeAt(0) === 10) {
        _block = parse_block;
      } else {
        _block = (in$, refs, splitters, ast, attrs, required_spaces) => {
          return parse_block_after_indent_checked(
            in$,
            refs,
            splitters,
            ast,
            attrs,
            required_spaces,
            (4 + $string.length(id)) + spaces_count,
          );
        };
      }
      let block_parser = _block;
      let $2 = block_parser(in$2, refs, splitters, toList([]), $dict.new$(), 1);
      let block = $2[0];
      let refs$1 = $2[1];
      let rest = $2[2];
      return new Some([id, block, refs$1, rest]);
    } else if (in$ === "") {
      return new None();
    } else if ($ === 93) {
      return new None();
    } else if ($ === 10) {
      return new None();
    } else {
      let $1 = $string.pop_grapheme(in$);
      if ($1 instanceof Ok) {
        let c = $1[0][0];
        let in$1 = $1[0][1];
        loop$in = in$1;
        loop$refs = refs;
        loop$splitters = splitters;
        loop$id = id + c;
      } else {
        return new None();
      }
    }
  }
}

function parse_block_quote_items(
  loop$in,
  loop$refs,
  loop$attrs,
  loop$splitters,
  loop$children
) {
  while (true) {
    let in$ = loop$in;
    let refs = loop$refs;
    let attrs = loop$attrs;
    let splitters = loop$splitters;
    let children = loop$children;
    let $ = parse_container(in$, refs, splitters, attrs, 0, new None());
    let in$1 = $[0];
    let refs$1 = $[1];
    let container = $[2];
    let attrs$1 = $[3];
    let _block;
    if (container instanceof Some) {
      let container$1 = container[0];
      _block = listPrepend(container$1, children);
    } else {
      _block = children;
    }
    let children$1 = _block;
    if (in$1 === "") {
      return $list.reverse(children$1);
    } else {
      loop$in = in$1;
      loop$refs = refs$1;
      loop$attrs = attrs$1;
      loop$splitters = splitters;
      loop$children = children$1;
    }
  }
}

function parse_block_quote(in$, refs, attrs, splitters, div_close_size) {
  let $ = take_block_quote_chars(in$, toList([]), div_close_size);
  let reversed_lines = $[0];
  let in$1 = $[1];
  let _block;
  let $1 = $list.reverse(reversed_lines);
  if ($1 instanceof $Empty) {
    _block = $1;
  } else {
    let lines = $1;
    let content = $string.join(lines, "\n");
    _block = parse_block_quote_items(
      content,
      refs,
      $dict.new$(),
      splitters,
      toList([]),
    );
  }
  let items = _block;
  return [new BlockQuote(attrs, items), in$1];
}

function parse_container(
  in$,
  refs,
  splitters,
  attrs,
  indentation,
  div_close_size
) {
  let $ = in$.charCodeAt(0);
  if (in$ === "") {
    return [in$, refs, new None(), $dict.new$()];
  } else if ($ === 123) {
    let in2 = in$.slice(1);
    let $1 = parse_attributes(in2, attrs);
    if ($1 instanceof Some) {
      let attrs$1 = $1[0][0];
      let in$1 = $1[0][1];
      return [in$1, refs, new None(), attrs$1];
    } else {
      let $2 = parse_paragraph(in$, attrs, splitters, div_close_size);
      let paragraph = $2[0];
      let in$1 = $2[1];
      return [in$1, refs, new Some(paragraph), $dict.new$()];
    }
  } else if ($ === 35) {
    let in$1 = in$.slice(1);
    let $1 = parse_heading(in$1, refs, splitters, attrs, div_close_size);
    let heading = $1[0];
    let refs$1 = $1[1];
    let in$2 = $1[2];
    return [in$2, refs$1, new Some(heading), $dict.new$()];
  } else if ($ === 126) {
    let delim = "~";
    let in2 = in$.slice(1);
    let $1 = parse_codeblock(in2, attrs, delim, indentation, splitters);
    if ($1 instanceof Some) {
      let codeblock = $1[0][0];
      let in$1 = $1[0][1];
      return [in$1, refs, new Some(codeblock), $dict.new$()];
    } else {
      let $2 = parse_paragraph(in$, attrs, splitters, div_close_size);
      let paragraph = $2[0];
      let in$1 = $2[1];
      return [in$1, refs, new Some(paragraph), $dict.new$()];
    }
  } else if ($ === 96) {
    let delim = "`";
    let in2 = in$.slice(1);
    let $1 = parse_codeblock(in2, attrs, delim, indentation, splitters);
    if ($1 instanceof Some) {
      let codeblock = $1[0][0];
      let in$1 = $1[0][1];
      return [in$1, refs, new Some(codeblock), $dict.new$()];
    } else {
      let $2 = parse_paragraph(in$, attrs, splitters, div_close_size);
      let paragraph = $2[0];
      let in$1 = $2[1];
      return [in$1, refs, new Some(paragraph), $dict.new$()];
    }
  } else if (in$.startsWith("> ")) {
    let $1 = parse_block_quote(in$, refs, attrs, splitters, div_close_size);
    let block_quote = $1[0];
    let in$1 = $1[1];
    return [in$1, refs, new Some(block_quote), $dict.new$()];
  } else if (in$.startsWith(">\n")) {
    let $1 = parse_block_quote(in$, refs, attrs, splitters, div_close_size);
    let block_quote = $1[0];
    let in$1 = $1[1];
    return [in$1, refs, new Some(block_quote), $dict.new$()];
  } else if ($ === 45) {
    let style = "-";
    let in2 = in$.slice(1);
    let $1 = parse_thematic_break(1, in2);
    if ($1 instanceof Some) {
      let thematic_break = $1[0][0];
      let in$1 = $1[0][1];
      return [in$1, refs, new Some(thematic_break), $dict.new$()];
    } else {
      let $2 = in2.charCodeAt(0);
      if ($2 === 32) {
        let in2$1 = in2.slice(1);
        let _block;
        if (style === "-") {
          _block = new BulletDash();
        } else if (style === "*") {
          _block = new BulletStar();
        } else {
          _block = new BulletPlus();
        }
        let bullet_style = _block;
        let style$1 = new Bullet(bullet_style);
        let $3 = parse_list(
          in2$1,
          refs,
          attrs,
          style$1,
          new Tight(),
          toList([]),
          splitters,
        );
        let list = $3[0];
        let in$1 = $3[1];
        return [in$1, refs, new Some(list), $dict.new$()];
      } else if ($2 === 10) {
        let in2$1 = in2.slice(1);
        let _block;
        if (style === "-") {
          _block = new BulletDash();
        } else if (style === "*") {
          _block = new BulletStar();
        } else {
          _block = new BulletPlus();
        }
        let bullet_style = _block;
        let style$1 = new Bullet(bullet_style);
        let $3 = parse_list(
          in2$1,
          refs,
          attrs,
          style$1,
          new Tight(),
          toList([]),
          splitters,
        );
        let list = $3[0];
        let in$1 = $3[1];
        return [in$1, refs, new Some(list), $dict.new$()];
      } else {
        let $3 = parse_paragraph(in$, attrs, splitters, div_close_size);
        let paragraph = $3[0];
        let in$1 = $3[1];
        return [in$1, refs, new Some(paragraph), $dict.new$()];
      }
    }
  } else if ($ === 42) {
    let style = "*";
    let in2 = in$.slice(1);
    let $1 = parse_thematic_break(1, in2);
    if ($1 instanceof Some) {
      let thematic_break = $1[0][0];
      let in$1 = $1[0][1];
      return [in$1, refs, new Some(thematic_break), $dict.new$()];
    } else {
      let $2 = in2.charCodeAt(0);
      if ($2 === 32) {
        let in2$1 = in2.slice(1);
        let _block;
        if (style === "-") {
          _block = new BulletDash();
        } else if (style === "*") {
          _block = new BulletStar();
        } else {
          _block = new BulletPlus();
        }
        let bullet_style = _block;
        let style$1 = new Bullet(bullet_style);
        let $3 = parse_list(
          in2$1,
          refs,
          attrs,
          style$1,
          new Tight(),
          toList([]),
          splitters,
        );
        let list = $3[0];
        let in$1 = $3[1];
        return [in$1, refs, new Some(list), $dict.new$()];
      } else if ($2 === 10) {
        let in2$1 = in2.slice(1);
        let _block;
        if (style === "-") {
          _block = new BulletDash();
        } else if (style === "*") {
          _block = new BulletStar();
        } else {
          _block = new BulletPlus();
        }
        let bullet_style = _block;
        let style$1 = new Bullet(bullet_style);
        let $3 = parse_list(
          in2$1,
          refs,
          attrs,
          style$1,
          new Tight(),
          toList([]),
          splitters,
        );
        let list = $3[0];
        let in$1 = $3[1];
        return [in$1, refs, new Some(list), $dict.new$()];
      } else {
        let $3 = parse_paragraph(in$, attrs, splitters, div_close_size);
        let paragraph = $3[0];
        let in$1 = $3[1];
        return [in$1, refs, new Some(paragraph), $dict.new$()];
      }
    }
  } else if ($ === 43) {
    let style = "+";
    let in2 = in$.slice(1);
    let $1 = parse_thematic_break(1, in2);
    if ($1 instanceof Some) {
      let thematic_break = $1[0][0];
      let in$1 = $1[0][1];
      return [in$1, refs, new Some(thematic_break), $dict.new$()];
    } else {
      let $2 = in2.charCodeAt(0);
      if ($2 === 32) {
        let in2$1 = in2.slice(1);
        let _block;
        if (style === "-") {
          _block = new BulletDash();
        } else if (style === "*") {
          _block = new BulletStar();
        } else {
          _block = new BulletPlus();
        }
        let bullet_style = _block;
        let style$1 = new Bullet(bullet_style);
        let $3 = parse_list(
          in2$1,
          refs,
          attrs,
          style$1,
          new Tight(),
          toList([]),
          splitters,
        );
        let list = $3[0];
        let in$1 = $3[1];
        return [in$1, refs, new Some(list), $dict.new$()];
      } else if ($2 === 10) {
        let in2$1 = in2.slice(1);
        let _block;
        if (style === "-") {
          _block = new BulletDash();
        } else if (style === "*") {
          _block = new BulletStar();
        } else {
          _block = new BulletPlus();
        }
        let bullet_style = _block;
        let style$1 = new Bullet(bullet_style);
        let $3 = parse_list(
          in2$1,
          refs,
          attrs,
          style$1,
          new Tight(),
          toList([]),
          splitters,
        );
        let list = $3[0];
        let in$1 = $3[1];
        return [in$1, refs, new Some(list), $dict.new$()];
      } else {
        let $3 = parse_paragraph(in$, attrs, splitters, div_close_size);
        let paragraph = $3[0];
        let in$1 = $3[1];
        return [in$1, refs, new Some(paragraph), $dict.new$()];
      }
    }
  } else if (in$.startsWith("[^")) {
    let in2 = in$.slice(2);
    let $1 = parse_footnote_def(in2, refs, splitters, "^");
    if ($1 instanceof Some) {
      let id = $1[0][0];
      let footnote = $1[0][1];
      let refs$1 = $1[0][2];
      let in$1 = $1[0][3];
      let refs$2 = new Refs(
        refs$1.urls,
        refs$1.url_attributes,
        refs$1.headings,
        $dict.insert(refs$1.footnotes, id, footnote),
      );
      return [in$1, refs$2, new None(), $dict.new$()];
    } else {
      let $2 = parse_paragraph(in$, attrs, splitters, div_close_size);
      let paragraph = $2[0];
      let in$1 = $2[1];
      return [in$1, refs, new Some(paragraph), $dict.new$()];
    }
  } else if ($ === 91) {
    let in2 = in$.slice(1);
    let $1 = parse_ref_def(in2, "");
    if ($1 instanceof Some) {
      let id = $1[0][0];
      let url = $1[0][1];
      let in$1 = $1[0][2];
      let _block;
      let $2 = $dict.is_empty(attrs);
      if ($2) {
        _block = refs.url_attributes;
      } else {
        _block = $dict.insert(refs.url_attributes, id, attrs);
      }
      let url_attributes = _block;
      let urls = $dict.insert(refs.urls, id, url);
      let refs$1 = new Refs(urls, url_attributes, refs.headings, refs.footnotes);
      return [in$1, refs$1, new None(), $dict.new$()];
    } else {
      let $2 = parse_paragraph(in$, attrs, splitters, div_close_size);
      let paragraph = $2[0];
      let in$1 = $2[1];
      return [in$1, refs, new Some(paragraph), $dict.new$()];
    }
  } else if (in$.startsWith(":::")) {
    let in2 = in$.slice(3);
    let $1 = parse_div(in2, refs, attrs, splitters);
    if ($1 instanceof Some) {
      let in$1 = $1[0][0];
      let class$ = $1[0][1];
      let attrs$1 = $1[0][2];
      let content = $1[0][3];
      let div = new Some(new Div(class$, attrs$1, content));
      return [in$1, refs, div, $dict.new$()];
    } else {
      let $2 = parse_paragraph(in$, attrs, splitters, div_close_size);
      let paragraph = $2[0];
      let in$1 = $2[1];
      return [in$1, refs, new Some(paragraph), $dict.new$()];
    }
  } else if ($ === 40) {
    let rest = in$.slice(1);
    let $1 = parse_maybe_list(rest, refs, attrs, splitters, true);
    if ($1 instanceof Some) {
      let in$1 = $1[0][0];
      let refs$1 = $1[0][1];
      let list = $1[0][2];
      return [in$1, refs$1, new Some(list), $dict.new$()];
    } else {
      let $2 = parse_paragraph(in$, attrs, splitters, div_close_size);
      let paragraph = $2[0];
      let in$1 = $2[1];
      return [in$1, refs, new Some(paragraph), $dict.new$()];
    }
  } else {
    let $1 = parse_maybe_list(in$, refs, attrs, splitters, false);
    if ($1 instanceof Some) {
      let in$1 = $1[0][0];
      let refs$1 = $1[0][1];
      let list = $1[0][2];
      return [in$1, refs$1, new Some(list), $dict.new$()];
    } else {
      let $2 = parse_paragraph(in$, attrs, splitters, div_close_size);
      let paragraph = $2[0];
      let in$1 = $2[1];
      return [in$1, refs, new Some(paragraph), $dict.new$()];
    }
  }
}

function parse_document_content(
  loop$in,
  loop$refs,
  loop$splitters,
  loop$ast,
  loop$attrs
) {
  while (true) {
    let in$ = loop$in;
    let refs = loop$refs;
    let splitters = loop$splitters;
    let ast = loop$ast;
    let attrs = loop$attrs;
    let in$1 = drop_lines(in$);
    let $ = count_drop_spaces(in$1, 0);
    let in$2 = $[0];
    let spaces_count = $[1];
    let $1 = parse_container(
      in$2,
      refs,
      splitters,
      attrs,
      spaces_count,
      new None(),
    );
    let in$3 = $1[0];
    let refs$1 = $1[1];
    let container = $1[2];
    let attrs$1 = $1[3];
    let _block;
    if (container instanceof Some) {
      let container$1 = container[0];
      _block = listPrepend(container$1, ast);
    } else {
      _block = ast;
    }
    let ast$1 = _block;
    if (in$3 === "") {
      return [$list.reverse(ast$1), refs$1, in$3];
    } else {
      loop$in = in$3;
      loop$refs = refs$1;
      loop$splitters = splitters;
      loop$ast = ast$1;
      loop$attrs = attrs$1;
    }
  }
}

/**
 * Convert a string of Djot into a tree of records.
 *
 * This may be useful when you want more control over the HTML to be converted
 * to, or you wish to convert Djot to some other format.
 */
export function parse(djot) {
  let splitters = new Splitters(
    $splitter.new$(toList([" ", "\n"])),
    $splitter.new$(toList(["`", "\n"])),
    $splitter.new$(
      toList([
        "\\",
        "_",
        "*",
        "[^",
        "[",
        "![",
        "$$`",
        "$`",
        "`",
        "\n",
        "--",
        "...",
        "<",
        "{-",
        "{+",
        "{=",
        "~",
        "{~",
        "^",
        "{^",
        "{",
        ":",
      ]),
    ),
    $splitter.new$(toList([")", "]", "\n"])),
    $splitter.new$(toList(["`"])),
  );
  let refs = new Refs($dict.new$(), $dict.new$(), $dict.new$(), $dict.new$());
  let _block;
  let _pipe = djot;
  let _pipe$1 = $string.replace(_pipe, "\r\n", "\n");
  _block = parse_document_content(
    _pipe$1,
    refs,
    splitters,
    toList([]),
    $dict.new$(),
  );
  let $ = _block;
  let ast;
  let urls;
  let url_attributes;
  let headings;
  let footnotes;
  ast = $[0];
  urls = $[1].urls;
  url_attributes = $[1].url_attributes;
  headings = $[1].headings;
  footnotes = $[1].footnotes;
  let urls$1 = $dict.fold(
    headings,
    urls,
    (urls, id, count) => {
      return int_fold_down_zero_inclusive(
        count,
        urls,
        (urls, i) => {
          let _block$1;
          if (i === 0) {
            _block$1 = id;
          } else {
            _block$1 = (id + "-") + $int.to_string(i);
          }
          let key = _block$1;
          let $1 = $dict.has_key(urls, key);
          if ($1) {
            return urls;
          } else {
            return $dict.insert(urls, key, "#" + key);
          }
        },
      );
    },
  );
  return new Document(ast, urls$1, url_attributes, footnotes);
}

/**
 * Convert a string of Djot into a string of HTML.
 *
 * If you want to have more control over the HTML generated you can use the
 * `parse` function to convert Djot to a tree of records instead. You can then
 * traverse this tree and turn it into HTML yourself.
 *
 * # Security
 *
 * This does not escape the content of raw blocks! If you use this with
 * user-input you likely need to escape raw blocks to prevent
 * cross-site-scripting (XSS) attacks.
 */
export function to_html(djot) {
  let _pipe = djot;
  let _pipe$1 = parse(_pipe);
  return document_to_html(_pipe$1);
}

function inline_text(accumulator, item) {
  if (item instanceof Linebreak) {
    return accumulator + "\n\n";
  } else if (item instanceof NonBreakingSpace) {
    return accumulator + " ";
  } else if (item instanceof Text) {
    let content = item[0];
    return accumulator + content;
  } else if (item instanceof Link) {
    let content = item.content;
    return $list.fold(content, accumulator, inline_text);
  } else if (item instanceof Image) {
    return accumulator;
  } else if (item instanceof Span) {
    let content = item.content;
    return $list.fold(content, accumulator, inline_text);
  } else if (item instanceof Emphasis) {
    let content = item.content;
    return $list.fold(content, accumulator, inline_text);
  } else if (item instanceof Strong) {
    let content = item.content;
    return $list.fold(content, accumulator, inline_text);
  } else if (item instanceof Delete) {
    let content = item.content;
    return $list.fold(content, accumulator, inline_text);
  } else if (item instanceof Insert) {
    let content = item.content;
    return $list.fold(content, accumulator, inline_text);
  } else if (item instanceof Mark) {
    let content = item.content;
    return $list.fold(content, accumulator, inline_text);
  } else if (item instanceof Superscript) {
    let content = item.content;
    return $list.fold(content, accumulator, inline_text);
  } else if (item instanceof Subscript) {
    let content = item.content;
    return $list.fold(content, accumulator, inline_text);
  } else if (item instanceof Footnote) {
    return accumulator;
  } else if (item instanceof Code) {
    let content = item.content;
    return accumulator + content;
  } else if (item instanceof MathInline) {
    let content = item.content;
    return accumulator + content;
  } else if (item instanceof MathDisplay) {
    let content = item.content;
    return accumulator + content;
  } else {
    let content = item.content;
    return accumulator + content;
  }
}

/**
 * Get the text from within a container.
 *
 * Raw blocks, footnotes, and the ordinals and bullets from lists are not
 * included.
 */
export function inner_text(container) {
  if (container instanceof ThematicBreak) {
    return "";
  } else if (container instanceof Paragraph) {
    let content = container.content;
    return $list.fold(content, "", inline_text);
  } else if (container instanceof Heading) {
    let content = container.content;
    return $list.fold(content, "", inline_text);
  } else if (container instanceof Codeblock) {
    let content = container.content;
    return content;
  } else if (container instanceof RawBlock) {
    return "";
  } else if (container instanceof BulletList) {
    let items = container.items;
    let _pipe = items;
    let _pipe$1 = $list.flat_map(
      _pipe,
      (_capture) => { return $list.map(_capture, inner_text); },
    );
    return $string.join(_pipe$1, "\n\n");
  } else if (container instanceof OrderedList) {
    let items = container.items;
    let _pipe = items;
    let _pipe$1 = $list.flat_map(
      _pipe,
      (_capture) => { return $list.map(_capture, inner_text); },
    );
    return $string.join(_pipe$1, "\n\n");
  } else if (container instanceof BlockQuote) {
    let items = container.items;
    let _pipe = $list.map(items, inner_text);
    return $string.join(_pipe, "\n\n");
  } else {
    let items = container.items;
    let _pipe = $list.map(items, inner_text);
    return $string.join(_pipe, "\n\n");
  }
}
