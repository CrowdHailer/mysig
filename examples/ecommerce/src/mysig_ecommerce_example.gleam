import gleam/int
import gleam/io
import gleam/list
import lustre/attribute as a
import lustre/element
import lustre/element/html as h
import simplifile

pub type Product {
  Product(slug: String, name: String, price: Int, summary: String)
}

pub fn main() {
  let assert Ok(products) = fetch_catalog()
  let assert Ok(Nil) = simplifile.create_directory_all("public/products")
  let assert Ok(Nil) = write_home(products)
  write_products(products)
  io.println("Built ecommerce example in public/")
}

fn fetch_catalog() {
  // A dummy headless CMS boundary. Swap this function for an HTTP fetch runner.
  Ok([
    Product(
      slug: "linen-bag",
      name: "Linen Market Bag",
      price: 42,
      summary: "A strong everyday bag woven from natural linen.",
    ),
    Product(
      slug: "brass-lamp",
      name: "Brass Desk Lamp",
      price: 120,
      summary: "Warm directional light for focused evening work.",
    ),
    Product(
      slug: "stone-mug",
      name: "Stoneware Mug",
      price: 28,
      summary: "Hand-thrown mug with a satin blue glaze.",
    ),
  ])
}

fn write_home(products) {
  products
  |> product_grid()
  |> shell("Mysig Shop", _)
  |> element.to_document_string()
  |> simplifile.write("public/index.html", _)
}

fn write_products(products: List(Product)) {
  case products {
    [] -> Nil
    [product, ..rest] -> {
      let directory = "public/products/" <> product.slug
      let assert Ok(Nil) = simplifile.create_directory_all(directory)
      let html = product_page(product) |> element.to_document_string()
      let assert Ok(Nil) = simplifile.write(directory <> "/index.html", html)
      write_products(rest)
    }
  }
}

fn product_grid(products) {
  [
    h.section([a.class("hero")], [
      h.p([a.class("eyebrow")], [element.text("Dummy CMS")]),
      h.h1([], [element.text("A static storefront with a Gleam cart")]),
      h.p([], [
        element.text(
          "Catalog data is decoded into typed Gleam records at build time.",
        ),
      ]),
    ]),
    h.div([a.id("cart"), a.class("cart")], [
      element.text("Cart component mounts here."),
    ]),
    h.div([a.class("grid")], list.map(products, product_card)),
    h.script([a.type_("module"), a.src("/cart.js")], ""),
  ]
}

fn product_card(product: Product) {
  h.article([a.class("card")], [
    h.h2([], [
      h.a([a.href("/products/" <> product.slug <> "/")], [
        element.text(product.name),
      ]),
    ]),
    h.p([], [element.text(product.summary)]),
    h.strong([], [element.text("£" <> int.to_string(product.price))]),
  ])
}

fn product_page(product: Product) {
  shell("Buy " <> product.name, [
    h.a([a.href("/")], [element.text("Back to catalog")]),
    h.article([a.class("detail")], [
      h.p([a.class("eyebrow")], [element.text("Product")]),
      h.h1([], [element.text(product.name)]),
      h.p([], [element.text(product.summary)]),
      h.button([a.attribute("data-product", product.slug)], [
        element.text("Add to cart - £" <> int.to_string(product.price)),
      ]),
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

const css = "
body { margin: 0; font: 17px/1.5 Inter, ui-sans-serif, system-ui, sans-serif; color: #0f172a; background: #eef2ff; }
main { max-width: 1120px; margin: 0 auto; padding: 56px 24px; }
h1 { font-size: clamp(2.4rem, 7vw, 5.6rem); line-height: .9; letter-spacing: -.07em; max-width: 820px; }
a { color: #4f46e5; font-weight: 800; }
.eyebrow { color: #be123c; text-transform: uppercase; letter-spacing: .18em; font-size: 12px; font-weight: 900; }
.hero { margin-bottom: 32px; }
.cart { display: inline-flex; padding: 10px 14px; background: #0f172a; color: white; border-radius: 999px; margin-bottom: 28px; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 18px; }
.card, .detail { background: white; border: 1px solid #c7d2fe; border-radius: 24px; padding: 24px; box-shadow: 0 18px 40px #6366f133; }
button { border: 0; border-radius: 999px; padding: 14px 18px; background: #4f46e5; color: white; font-weight: 900; }
"
