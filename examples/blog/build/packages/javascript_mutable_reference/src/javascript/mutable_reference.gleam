pub type MutableReference(value)

@external(javascript, "../mutable_reference_ffi.mjs", "make")
pub fn new(value: value) -> MutableReference(value)

@external(javascript, "../mutable_reference_ffi.mjs", "get")
pub fn get(value: MutableReference(value)) -> value

@external(javascript, "../mutable_reference_ffi.mjs", "set")
pub fn set(value: MutableReference(value), b: value) -> value

pub fn update(ref: MutableReference(value), f: fn(value) -> value) -> value {
  let value = get(ref)
  set(ref, f(value))
  value
}

@external(javascript, "../mutable_reference_ffi.mjs", "reference_equal")
pub fn is_same_reference(
  left: MutableReference(value),
  right: MutableReference(value),
) -> Bool
