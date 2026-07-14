import gleam/javascript/promise.{type Promise}
import gleam/result

// currently errors are all strings, snag is better but do we want client libraries to depend on snag
// and also need to depend on task abstraction
// create_tweet can return fetch error but not if decoding the response
// then error will be decode and fetch error (and another if handling incorrect state case)
// is there a snag requirement even in the case where tasks are executed on the caller site

// maybe task abstraction can be added snag?
pub type Run(a) =
  Promise(Result(a, String))

pub fn try(result, then) {
  case result {
    Ok(value) -> then(value)
    // This type doesn't work because it unifies the value type as well
    // Error(_reason) -> promise.resolve(result)
    Error(reason) -> promise.resolve(Error(reason))
  }
}

pub fn await(p, then) {
  promise.await(p, fn(r) { try(r, then) })
}

pub fn done(value) {
  promise.resolve(Ok(value))
}

pub fn fail(reason) {
  promise.resolve(Error(reason))
}

pub fn map_error(p, f) {
  promise.map(p, result.map_error(_, f))
}
