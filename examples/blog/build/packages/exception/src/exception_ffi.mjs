import { Result$Ok, Result$Error, Result$isError } from "./gleam.mjs";
import { Exception$Errored, Exception$Thrown } from "./exception.mjs";

export function on_crash(cleanup, body) {
  try {
    return body();
  } catch (e) {
    cleanup();
    throw e;
  }
}

export function rescue(f) {
  try {
    return Result$Ok(f());
  } catch (e) {
    if (Result$isError(e)) {
      return Result$Error(Exception$Errored(e));
    } else {
      return Result$Error(Exception$Thrown(e));
    }
  }
}

export function defer(cleanup, body) {
  try {
    return body();
  } finally {
    cleanup();
  }
}
