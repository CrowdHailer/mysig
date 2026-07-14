import * as $array from "../../../gleam_javascript/gleam/javascript/array.mjs";
import * as $io from "../../../gleam_stdlib/gleam/io.mjs";
import { CustomType as $CustomType } from "../../gleam.mjs";
import { watch as do_watch, on_all as do_on_all } from "../../midas_node_chokidar_ffi.mjs";

export class Add extends $CustomType {}
export const AllEvent$Add = () => new Add();
export const AllEvent$isAdd = (value) => value instanceof Add;

export class Change extends $CustomType {}
export const AllEvent$Change = () => new Change();
export const AllEvent$isChange = (value) => value instanceof Change;

export class Unlink extends $CustomType {}
export const AllEvent$Unlink = () => new Unlink();
export const AllEvent$isUnlink = (value) => value instanceof Unlink;

export class AddDir extends $CustomType {}
export const AllEvent$AddDir = () => new AddDir();
export const AllEvent$isAddDir = (value) => value instanceof AddDir;

export class UnlinkDir extends $CustomType {}
export const AllEvent$UnlinkDir = () => new UnlinkDir();
export const AllEvent$isUnlinkDir = (value) => value instanceof UnlinkDir;

export function watch(initial) {
  return do_watch($array.from_list(initial));
}

export function on_all(watcher, f) {
  return do_on_all(
    watcher,
    (event, path) => {
      if (event === "add") {
        return f(new Add(), path);
      } else if (event === "change") {
        return f(new Change(), path);
      } else if (event === "unlink") {
        return f(new Unlink(), path);
      } else if (event === "addDir") {
        return f(new AddDir(), path);
      } else if (event === "unlinkDir") {
        return f(new UnlinkDir(), path);
      } else {
        $io.println("unknown event: " + event);
        return undefined;
      }
    },
  );
}
