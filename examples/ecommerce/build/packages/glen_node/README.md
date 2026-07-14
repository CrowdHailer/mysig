# glen_node

[![Package Version](https://img.shields.io/hexpm/v/glen_node)](https://hex.pm/packages/glen_node)
[![Hex Docs](https://img.shields.io/badge/hex-docs-ffaff3)](https://hexdocs.pm/glen_node/)

```sh
gleam add glen_node
```
```gleam
import gleam/javascript/promise.{type Promise}
import glen
import glen/status
import glen_node

pub fn main() {
    // Replace glen.serve with glen_node.serve
    glen_node.serve(8000, handle_req)
}

fn handle_req(req: glen.Request) -> Promise(glen.Response) {
  "<h1>Welcome to my webpage!</h1>
  <p>Make yourself at home 😄</p>"
  |> glen.html(status.ok)
  |> promise.resolve
}
```

Note: This package is unstable right now so issues may arrise. Websockets are not supported.

Further documentation can be found at <https://hexdocs.pm/glen_node>.
