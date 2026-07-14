import * as $int from "../gleam_stdlib/gleam/int.mjs";
import * as $io from "../gleam_stdlib/gleam/io.mjs";
import * as $list from "../gleam_stdlib/gleam/list.mjs";
import * as $a from "../lustre/lustre/attribute.mjs";
import * as $element from "../lustre/lustre/element.mjs";
import * as $h from "../lustre/lustre/element/html.mjs";
import * as $simplifile from "../simplifile/simplifile.mjs";
import { Ok, toList, Empty as $Empty, CustomType as $CustomType, makeError } from "./gleam.mjs";

const FILEPATH = "src/mysig_ecommerce_example.gleam";

export class Product extends $CustomType {
  constructor(slug, name, price, summary) {
    super();
    this.slug = slug;
    this.name = name;
    this.price = price;
    this.summary = summary;
  }
}
export const Product$Product = (slug, name, price, summary) =>
  new Product(slug, name, price, summary);
export const Product$isProduct = (value) => value instanceof Product;
export const Product$Product$slug = (value) => value.slug;
export const Product$Product$0 = (value) => value.slug;
export const Product$Product$name = (value) => value.name;
export const Product$Product$1 = (value) => value.name;
export const Product$Product$price = (value) => value.price;
export const Product$Product$2 = (value) => value.price;
export const Product$Product$summary = (value) => value.summary;
export const Product$Product$3 = (value) => value.summary;

const css = "\nbody { margin: 0; font: 17px/1.5 Inter, ui-sans-serif, system-ui, sans-serif; color: #0f172a; background: #eef2ff; }\nmain { max-width: 1120px; margin: 0 auto; padding: 56px 24px; }\nh1 { font-size: clamp(2.4rem, 7vw, 5.6rem); line-height: .9; letter-spacing: -.07em; max-width: 820px; }\na { color: #4f46e5; font-weight: 800; }\n.eyebrow { color: #be123c; text-transform: uppercase; letter-spacing: .18em; font-size: 12px; font-weight: 900; }\n.hero { margin-bottom: 32px; }\n.cart { display: inline-flex; padding: 10px 14px; background: #0f172a; color: white; border-radius: 999px; margin-bottom: 28px; }\n.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 18px; }\n.card, .detail { background: white; border: 1px solid #c7d2fe; border-radius: 24px; padding: 24px; box-shadow: 0 18px 40px #6366f133; }\nbutton { border: 0; border-radius: 999px; padding: 14px 18px; background: #4f46e5; color: white; font-weight: 900; }\n";

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

function product_page(product) {
  return shell(
    "Buy " + product.name,
    toList([
      $h.a(toList([$a.href("/")]), toList([$element.text("Back to catalog")])),
      $h.article(
        toList([$a.class$("detail")]),
        toList([
          $h.p(
            toList([$a.class$("eyebrow")]),
            toList([$element.text("Product")]),
          ),
          $h.h1(toList([]), toList([$element.text(product.name)])),
          $h.p(toList([]), toList([$element.text(product.summary)])),
          $h.button(
            toList([$a.attribute("data-product", product.slug)]),
            toList([
              $element.text("Add to cart - £" + $int.to_string(product.price)),
            ]),
          ),
        ]),
      ),
    ]),
  );
}

function write_products(loop$products) {
  while (true) {
    let products = loop$products;
    if (products instanceof $Empty) {
      return undefined;
    } else {
      let product = products.head;
      let rest = products.tail;
      let directory = "public/products/" + product.slug;
      let $ = $simplifile.create_directory_all(directory);
      if (!($ instanceof Ok)) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "mysig_ecommerce_example",
          58,
          "write_products",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $,
            start: 1425,
            end: 1488,
            pattern_start: 1436,
            pattern_end: 1443
          }
        )
      }
      let _block;
      let _pipe = product_page(product);
      _block = $element.to_document_string(_pipe);
      let html = _block;
      let $1 = $simplifile.write(directory + "/index.html", html);
      if (!($1 instanceof Ok)) {
        throw makeError(
          "let_assert",
          FILEPATH,
          "mysig_ecommerce_example",
          60,
          "write_products",
          "Pattern match failed, no pattern matched the value.",
          {
            value: $1,
            start: 1566,
            end: 1637,
            pattern_start: 1577,
            pattern_end: 1584
          }
        )
      }
      loop$products = rest;
    }
  }
}

function product_card(product) {
  return $h.article(
    toList([$a.class$("card")]),
    toList([
      $h.h2(
        toList([]),
        toList([
          $h.a(
            toList([$a.href(("/products/" + product.slug) + "/")]),
            toList([$element.text(product.name)]),
          ),
        ]),
      ),
      $h.p(toList([]), toList([$element.text(product.summary)])),
      $h.strong(
        toList([]),
        toList([$element.text("£" + $int.to_string(product.price))]),
      ),
    ]),
  );
}

function product_grid(products) {
  return toList([
    $h.section(
      toList([$a.class$("hero")]),
      toList([
        $h.p(
          toList([$a.class$("eyebrow")]),
          toList([$element.text("Dummy CMS")]),
        ),
        $h.h1(
          toList([]),
          toList([$element.text("A static storefront with a Gleam cart")]),
        ),
        $h.p(
          toList([]),
          toList([
            $element.text(
              "Catalog data is decoded into typed Gleam records at build time.",
            ),
          ]),
        ),
      ]),
    ),
    $h.div(
      toList([$a.id("cart"), $a.class$("cart")]),
      toList([$element.text("Cart component mounts here.")]),
    ),
    $h.div(toList([$a.class$("grid")]), $list.map(products, product_card)),
    $h.script(toList([$a.type_("module"), $a.src("/cart.js")]), ""),
  ]);
}

function write_home(products) {
  let _pipe = products;
  let _pipe$1 = product_grid(_pipe);
  let _pipe$2 = ((_capture) => { return shell("Mysig Shop", _capture); })(
    _pipe$1,
  );
  let _pipe$3 = $element.to_document_string(_pipe$2);
  return ((_capture) => {
    return $simplifile.write("public/index.html", _capture);
  })(_pipe$3);
}

function fetch_catalog() {
  return new Ok(
    toList([
      new Product(
        "linen-bag",
        "Linen Market Bag",
        42,
        "A strong everyday bag woven from natural linen.",
      ),
      new Product(
        "brass-lamp",
        "Brass Desk Lamp",
        120,
        "Warm directional light for focused evening work.",
      ),
      new Product(
        "stone-mug",
        "Stoneware Mug",
        28,
        "Hand-thrown mug with a satin blue glaze.",
      ),
    ]),
  );
}

export function main() {
  let $ = fetch_catalog();
  let products;
  if ($ instanceof Ok) {
    products = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "mysig_ecommerce_example",
      14,
      "main",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 260, end: 301, pattern_start: 271, pattern_end: 283 }
    )
  }
  let $1 = $simplifile.create_directory_all("public/products");
  if (!($1 instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "mysig_ecommerce_example",
      15,
      "main",
      "Pattern match failed, no pattern matched the value.",
      { value: $1, start: 304, end: 375, pattern_start: 315, pattern_end: 322 }
    )
  }
  let $2 = write_home(products);
  if (!($2 instanceof Ok)) {
    throw makeError(
      "let_assert",
      FILEPATH,
      "mysig_ecommerce_example",
      16,
      "main",
      "Pattern match failed, no pattern matched the value.",
      { value: $2, start: 378, end: 419, pattern_start: 389, pattern_end: 396 }
    )
  }
  write_products(products);
  return $io.println("Built ecommerce example in public/");
}
