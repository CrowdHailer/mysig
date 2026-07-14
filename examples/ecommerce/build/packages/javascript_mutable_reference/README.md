# javascript_mutable_reference

Mutable references for Gleam JavaScript. This is a library you probably don't
want to use! Stick to immutable patterns unless you really really need to.

[![Package Version](https://img.shields.io/hexpm/v/javascript_mutable_reference)](https://hex.pm/packages/javascript_mutable_reference)
[![Hex Docs](https://img.shields.io/badge/hex-docs-ffaff3)](https://hexdocs.pm/javascript_mutable_reference/)

```sh
gleam add javascript_mutable_reference@1
```
```gleam
import javascript_mutable_reference

pub fn main() {
  // Create a new mutable reference
  let ref = mutable_reference.new(42)

// Get the inner value from it
  mutable_reference.get(ref)
  // -> 42

  // Mutate the reference to contain a new value
  mutable_reference.set(ref, 3)
  
  mutable_reference.get(ref)
  // -> 3
```

Further documentation can be found at <https://hexdocs.pm/javascript_mutable_reference>.
