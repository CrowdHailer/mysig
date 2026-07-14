import gleam/javascript/promise.{type Promise}
import glen

pub type Server

@external(javascript, "./glen_node_ffi.mjs", "serve_node")
pub fn serve(
  port: Int,
  handler: fn(glen.Request) -> Promise(glen.Response),
) -> Result(Server, String)

@external(javascript, "./glen_node_ffi.mjs", "close_node")
pub fn close(server: Server) -> Promise(Nil)
