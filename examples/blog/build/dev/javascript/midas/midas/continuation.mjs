import { Ok, Error, toList, Empty as $Empty, prepend as listPrepend } from "../gleam.mjs";

/**
 * Create a continuation that returns the given value when called.
 * 
 * Often called pure.
 */
export function return$(value) {
  return (k) => { return k(value); };
}

/**
 * compose two a continuation with a new function that returns another continuation
 * 
 * This is monad bind.
 */
export function then$(cont, next) {
  return (k) => { return cont((a) => { return next(a)(k); }); };
}

/**
 * Apply a function to each value in a list in order
 */
export function each(list, f) {
  if (list instanceof $Empty) {
    return return$(toList([]));
  } else {
    let head = list.head;
    let tail = list.tail;
    return then$(
      f(head),
      (head) => {
        return then$(
          each(tail, f),
          (rest) => { return return$(listPrepend(head, rest)); },
        );
      },
    );
  }
}

/**
 * Iterate over a list of items, and apply each to the given function f.
 */
export function fold(list, initial, f) {
  if (list instanceof $Empty) {
    return return$(initial);
  } else {
    let head = list.head;
    let tail = list.tail;
    return then$(f(initial, head), (acc) => { return fold(tail, acc, f); });
  }
}

export function try_then(cont, next) {
  return then$(
    cont,
    (result) => {
      if (result instanceof Ok) {
        let a = result[0];
        return next(a);
      } else {
        let e = result[0];
        return return$(new Error(e));
      }
    },
  );
}

/**
 * Work with results that are not continuations.
 */
export function try$(result, then$) {
  if (result instanceof Ok) {
    let value = result[0];
    return then$(value);
  } else {
    let reason = result[0];
    return return$(new Error(reason));
  }
}

/**
 * Work with results that are not continuations.
 */
export function try_or(result, handle, then$) {
  if (result instanceof Ok) {
    let value = result[0];
    return then$(value);
  } else {
    let reason = result[0];
    return return$(handle(reason));
  }
}

/**
 * A task has completed successfully
 */
export function done(value) {
  return return$(new Ok(value));
}

/**
 * A task is done with an error
 */
export function fail(reason) {
  return return$(new Error(reason));
}

/**
 * Apply the given function to each item in a list, returning at first error.
 */
export function try_each(list, f) {
  if (list instanceof $Empty) {
    return return$(new Ok(toList([])));
  } else {
    let head = list.head;
    let tail = list.tail;
    return try_then(
      f(head),
      (head) => {
        return try_then(
          try_each(tail, f),
          (rest) => { return return$(new Ok(listPrepend(head, rest))); },
        );
      },
    );
  }
}
