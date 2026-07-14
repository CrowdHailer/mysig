import { make as new$, get, set, reference_equal as is_same_reference } from "../mutable_reference_ffi.mjs";

export { get, is_same_reference, new$, set };

export function update(ref, f) {
  let value = get(ref);
  set(ref, f(value));
  return value;
}
