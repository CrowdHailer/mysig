import filepath
import gleam/bit_array
import gleam/dict
import gleam/javascript/promise
import gleam/string
import marceau
import midas/node
import mysig/asset.{Abort, Bundle, Done, Load, Ref}
import plinth/browser/crypto/subtle
import simplifile
import snag

pub fn build_manifest(eff, assets) {
  let base = "/assets"
  case eff {
    Done(value) -> promise.resolve(Ok(#(value, assets)))
    Abort(reason) -> promise.resolve(Error(reason))
    Load(file, resume) -> {
      use result <- promise.await(case simplifile.read_bits(file) {
        Ok(bits) -> {
          case string.split_once(filepath.base_name(file), ".") {
            Ok(#(name, ext)) -> {
              use digest <- promise.map(subtle.digest(subtle.SHA256, bits))
              case digest {
                Ok(digest) -> {
                  let digest = bit_array.base16_encode(digest)
                  let ref = name <> "." <> digest <> "." <> ext
                  let path = base <> "/" <> ref
                  let mime = marceau.extension_to_mime_type(ext)
                  let assets = dict.insert(assets, ref, #(file, mime, bits))
                  Ok(#(Ref(path), assets))
                }
                Error(reason) ->
                  snag.error(reason)
                  |> snag.context("could not hash file content")
              }
            }
            Error(Nil) -> promise.resolve(snag.error("could not split on '.'"))
          }
        }
        Error(reason) ->
          promise.resolve(snag.error(simplifile.describe_error(reason)))
      })
      let result =
        snag.context(result, "failed to load asset from file: " <> file)
      case result {
        Ok(#(ref, assets)) -> build_manifest(resume(Ok(ref)), assets)
        Error(reason) -> build_manifest(resume(Error(reason)), assets)
      }
    }
    Bundle(module, function, resume) -> {
      use result <- promise.await(node.do_bundle(module, function))
      use result <- promise.await(case result {
        Ok(code) -> {
          let bits = <<code:utf8>>
          use digest <- promise.map(subtle.digest(subtle.SHA256, bits))
          case digest {
            Ok(digest) -> {
              let digest = bit_array.base16_encode(digest)
              let ref = function <> "." <> digest <> "." <> "mjs"
              let path = base <> "/" <> ref
              let assets =
                dict.insert(assets, ref, #(
                  "Nope",
                  "application/javascript",
                  bits,
                ))
              Ok(#(Ref(path), assets))
            }
            Error(reason) ->
              snag.error(reason)
              |> snag.context("could not hash file content")
          }
        }
        Error(reason) -> promise.resolve(Error(reason))
      })
      let result =
        snag.context(
          result,
          "failed to bundle module: " <> module <> " function: " <> function,
        )
      case result {
        Ok(#(ref, assets)) -> build_manifest(resume(Ok(ref)), assets)
        Error(reason) -> build_manifest(resume(Error(reason)), assets)
      }
    }
  }
}
