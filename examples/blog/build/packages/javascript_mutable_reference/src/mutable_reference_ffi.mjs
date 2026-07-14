class MutableReference {
  constructor(value) {
    this.value = value;
  }
}

export function get(reference) {
  return reference.value;
}

export function make(value) {
  return new MutableReference(value);
}

export function set(ref, value) {
  let previous = ref.value;
  ref.value = value;
  return previous;
}

export function reference_equal(a, b) {
  return a === b;
}
