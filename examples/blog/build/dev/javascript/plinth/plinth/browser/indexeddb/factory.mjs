import * as $promise from "../../../../gleam_javascript/gleam/javascript/promise.mjs";
import { Ok, Error } from "../../../gleam.mjs";
import * as $database from "../../../plinth/browser/indexeddb/database.mjs";
import * as $window from "../../../plinth/browser/window.mjs";
import {
  window_indexeddb as from_window,
  factory_open as open,
  open_db_on_success as on_success,
  open_db_on_error as on_error,
  open_db_on_upgrade_needed as on_upgrade_needed,
} from "../../../plinth_indexeddb_ffi.mjs";

export { from_window, on_error, on_success, on_upgrade_needed, open };

export function opendb(factory, name, version, upgrade) {
  return $promise.new$(
    (resolve) => {
      let $ = open(factory, name, version);
      if ($ instanceof Ok) {
        let open_request = $[0];
        on_success(open_request, (db) => { return resolve(new Ok(db)); });
        on_error(
          open_request,
          (reason) => { return resolve(new Error(reason)); },
        );
        return on_upgrade_needed(open_request, upgrade);
      } else {
        let reason = $[0];
        return resolve(new Error(reason));
      }
    },
  );
}
