import * as $promise from "../../../gleam_javascript/gleam/javascript/promise.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import { Ok, Error } from "../../gleam.mjs";

export function try$(result, then$) {
  if (result instanceof Ok) {
    let value = result[0];
    return then$(value);
  } else {
    let reason = result[0];
    return $promise.resolve(new Error(reason));
  }
}

export function await$(p, then$) {
  return $promise.await$(p, (r) => { return try$(r, then$); });
}

export function done(value) {
  return $promise.resolve(new Ok(value));
}

export function fail(reason) {
  return $promise.resolve(new Error(reason));
}

export function map_error(p, f) {
  return $promise.map(
    p,
    (_capture) => { return $result.map_error(_capture, f); },
  );
}
