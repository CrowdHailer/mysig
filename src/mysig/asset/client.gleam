import gleam/dict
import gleam/dynamic
import gleam/io
import gleam/json
import mysig/asset
import plinth/browser/document
import plinth/browser/element

pub fn load_manifest(eff) {
  // if fail do base 64 encoding of bad image
  let assert Ok(el) = document.query_selector("#mysig")
  let assert Ok(assets) =
    json.decode(
      element.inner_text(el),
      dynamic.dict(dynamic.string, dynamic.string),
    )
    |> io.debug
  do_load_manifest(eff, assets)
}

fn do_load_manifest(eff, assets) {
  case eff {
    asset.Done(value) -> Ok(value)
    asset.Abort(reason) -> Error(reason)
    asset.Bundle(_, _, _) -> panic as "can't bundle in the client"
    asset.Load(file, resume) ->
      case dict.get(assets, file) {
        Ok(key) -> {
          let path = "/assets/" <> key
          do_load_manifest(resume(Ok(asset.Ref(path))), assets)
        }
        _ -> panic as file
      }
  }
}
