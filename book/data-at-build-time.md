# Data At Build Time

Static sites often need data that is not Markdown. In Mysig, a data source is just a function called by the build program.

## Local Data

Use typed Gleam records for small datasets:

```gleam
pub type Product {
  Product(slug: String, name: String, price: Int, summary: String)
}

fn catalog() {
  [Product("linen-bag", "Linen Market Bag", 42, "A strong everyday bag.")]
}
```

## File Data

For JSON, TOML, or CSV, read files at the boundary and decode into typed records before rendering. Keep parsing errors as build failures so broken content cannot deploy silently.

## Remote Data

For a headless CMS, put the HTTP boundary in one function:

```gleam
fn fetch_catalog() {
  // Replace the dummy data with an HTTP fetch and decoder.
  Ok(catalog())
}
```

Your rendering code should receive typed data, not raw JSON. This keeps templates simple and makes build failures precise.
