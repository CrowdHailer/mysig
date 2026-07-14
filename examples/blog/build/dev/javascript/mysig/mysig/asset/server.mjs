import * as $filepath from "../../../filepath/filepath.mjs";
import * as $promise from "../../../gleam_javascript/gleam/javascript/promise.mjs";
import * as $bit_array from "../../../gleam_stdlib/gleam/bit_array.mjs";
import * as $dict from "../../../gleam_stdlib/gleam/dict.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $marceau from "../../../marceau/marceau.mjs";
import * as $node from "../../../midas_node/midas/node.mjs";
import * as $subtle from "../../../plinth/plinth/browser/crypto/subtle.mjs";
import * as $simplifile from "../../../simplifile/simplifile.mjs";
import * as $snag from "../../../snag/snag.mjs";
import { Ok, Error, toBitArray, stringBits } from "../../gleam.mjs";
import * as $asset from "../../mysig/asset.mjs";
import { Abort, Bundle, Done, Load, Ref } from "../../mysig/asset.mjs";

export function build_manifest(eff, assets) {
  let base = "/assets";
  if (eff instanceof Done) {
    let value = eff[0];
    return $promise.resolve(new Ok([value, assets]));
  } else if (eff instanceof Abort) {
    let reason = eff[0];
    return $promise.resolve(new Error(reason));
  } else if (eff instanceof Load) {
    let file = eff.file;
    let resume = eff.resume;
    return $promise.await$(
      (() => {
        let $ = $simplifile.read_bits(file);
        if ($ instanceof Ok) {
          let bits = $[0];
          let $1 = $string.split_once($filepath.base_name(file), ".");
          if ($1 instanceof Ok) {
            let name = $1[0][0];
            let ext = $1[0][1];
            return $promise.map(
              $subtle.digest(new $subtle.SHA256(), bits),
              (digest) => {
                if (digest instanceof Ok) {
                  let digest$1 = digest[0];
                  let digest$2 = $bit_array.base16_encode(digest$1);
                  let ref = (((name + ".") + digest$2) + ".") + ext;
                  let path = (base + "/") + ref;
                  let mime = $marceau.extension_to_mime_type(ext);
                  let assets$1 = $dict.insert(assets, ref, [file, mime, bits]);
                  return new Ok([new Ref(path), assets$1]);
                } else {
                  let reason = digest[0];
                  let _pipe = $snag.error(reason);
                  return $snag.context(_pipe, "could not hash file content");
                }
              },
            );
          } else {
            return $promise.resolve($snag.error("could not split on '.'"));
          }
        } else {
          let reason = $[0];
          return $promise.resolve(
            $snag.error($simplifile.describe_error(reason)),
          );
        }
      })(),
      (result) => {
        let result$1 = $snag.context(
          result,
          "failed to load asset from file: " + file,
        );
        if (result$1 instanceof Ok) {
          let ref = result$1[0][0];
          let assets$1 = result$1[0][1];
          return build_manifest(resume(new Ok(ref)), assets$1);
        } else {
          let reason = result$1[0];
          return build_manifest(resume(new Error(reason)), assets);
        }
      },
    );
  } else {
    let module = eff.module;
    let function$ = eff.function;
    let resume = eff.resume;
    return $promise.await$(
      $node.do_bundle(module, function$),
      (result) => {
        return $promise.await$(
          (() => {
            if (result instanceof Ok) {
              let code = result[0];
              let bits = toBitArray([stringBits(code)]);
              return $promise.map(
                $subtle.digest(new $subtle.SHA256(), bits),
                (digest) => {
                  if (digest instanceof Ok) {
                    let digest$1 = digest[0];
                    let digest$2 = $bit_array.base16_encode(digest$1);
                    let ref = (((function$ + ".") + digest$2) + ".") + "mjs";
                    let path = (base + "/") + ref;
                    let assets$1 = $dict.insert(
                      assets,
                      ref,
                      ["Nope", "application/javascript", bits],
                    );
                    return new Ok([new Ref(path), assets$1]);
                  } else {
                    let reason = digest[0];
                    let _pipe = $snag.error(reason);
                    return $snag.context(_pipe, "could not hash file content");
                  }
                },
              );
            } else {
              let reason = result[0];
              return $promise.resolve(new Error(reason));
            }
          })(),
          (result) => {
            let result$1 = $snag.context(
              result,
              (("failed to bundle module: " + module) + " function: ") + function$,
            );
            if (result$1 instanceof Ok) {
              let ref = result$1[0][0];
              let assets$1 = result$1[0][1];
              return build_manifest(resume(new Ok(ref)), assets$1);
            } else {
              let reason = result$1[0];
              return build_manifest(resume(new Error(reason)), assets);
            }
          },
        );
      },
    );
  }
}
