import gleam/string
import shellout
import snag

pub fn build_js(root) {
  let result =
    shellout.command(
      run: "gleam",
      with: ["build", "--target=javascript"],
      in: root,
      opt: [],
    )
  case result {
    Ok(_) -> {
      let dir = string.append(root, "/build/dev/javascript")
      Ok(dir)
    }
    Error(_reason) -> snag.error("failed to bundle javascript")
  }
}
