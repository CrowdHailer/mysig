import * as $json from "../../../gleam_json/gleam/json.mjs";
import * as $dict from "../../../gleam_stdlib/gleam/dict.mjs";
import * as $decode from "../../../gleam_stdlib/gleam/dynamic/decode.mjs";
import * as $document from "../../../plinth/plinth/browser/document.mjs";
import * as $element from "../../../plinth/plinth/browser/element.mjs";
import { Ok, Error, makeError } from "../../gleam.mjs";
import * as $asset from "../../mysig/asset.mjs";

const FILEPATH = "src/mysig/asset/client.gleam";

function do_load_manifest(loop$eff, loop$assets) {
  while (true) {
    let eff = loop$eff;
    let assets = loop$assets;
    if (eff instanceof $asset.Done) {
      let value = eff[0];
      return new Ok(value);
    } else if (eff instanceof $asset.Abort) {
      let reason = eff[0];
      return new Error(reason);
    } else if (eff instanceof $asset.Load) {
      let file = eff.file;
      let resume = eff.resume;
      let $ = $dict.get(assets, file);
      if ($ instanceof Ok) {
        let key = $[0];
        let path = "/assets/" + key;
        loop$eff = resume(new Ok(new $asset.Ref(path)));
        loop$assets = assets;
      } else {
        throw makeError(
          "panic",
          FILEPATH,
          "mysig/asset/client",
          31,
          "do_load_manifest",
          file,
          {}
        )
      }
    } else {
      throw makeError(
        "panic",
        FILEPATH,
        "mysig/asset/client",
        24,
        "do_load_manifest",
        "can't bundle in the client",
        {}
      )
    }
  }
}

export function load_manifest(eff) {
  let $ = $document.query_selector("#mysig");
  let el;
  if ($ instanceof Ok) {
    el = $[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "mysig/asset/client",
      10,
      "load_manifest",
      "Pattern match failed, no pattern matched the value.",
      { value: $, start: 221, end: 274, pattern_start: 232, pattern_end: 238 }
    )
  }
  let $1 = $json.parse(
    $element.inner_text(el),
    $decode.dict($decode.string, $decode.string),
  );
  let assets;
  if ($1 instanceof Ok) {
    assets = $1[0];
  } else {
    throw makeError(
      "let_assert",
      FILEPATH,
      "mysig/asset/client",
      11,
      "load_manifest",
      "Pattern match failed, no pattern matched the value.",
      { value: $1, start: 277, end: 401, pattern_start: 288, pattern_end: 298 }
    )
  }
  return do_load_manifest(eff, assets);
}
