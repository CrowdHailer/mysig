import * as $promise from "../gleam_javascript/gleam/javascript/promise.mjs";
import * as $glen from "../glen/glen.mjs";
import { serve_node as serve, close_node as close } from "./glen_node_ffi.mjs";

export { close, serve };
