import * as $filepath from "../../../filepath/filepath.mjs";
import * as $list from "../../../gleam_stdlib/gleam/list.mjs";
import * as $result from "../../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../../gleam_stdlib/gleam/string.mjs";
import * as $simplifile from "../../../simplifile/simplifile.mjs";
import * as $snag from "../../../snag/snag.mjs";
import { Ok, toList } from "../../gleam.mjs";

export function current_directory() {
  let _pipe = $simplifile.current_directory();
  let _pipe$1 = $result.map_error(
    _pipe,
    (reason) => { return $snag.new$($simplifile.describe_error(reason)); },
  );
  return $snag.context(_pipe$1, "Could not return current directory");
}

export function get_files(dir) {
  let _pipe = $simplifile.get_files(dir);
  let _pipe$1 = $result.map_error(
    _pipe,
    (reason) => { return $snag.new$($simplifile.describe_error(reason)); },
  );
  return $snag.context(_pipe$1, "Could not read directory: " + dir);
}

export function read_directory(dir) {
  let _pipe = $simplifile.read_directory(dir);
  let _pipe$1 = $result.map_error(
    _pipe,
    (reason) => { return $snag.new$($simplifile.describe_error(reason)); },
  );
  return $snag.context(_pipe$1, "Could not read directory: " + dir);
}

export function create_directory_all(dir) {
  let _pipe = $simplifile.create_directory_all(dir);
  let _pipe$1 = $result.map_error(
    _pipe,
    (reason) => { return $snag.new$($simplifile.describe_error(reason)); },
  );
  return $snag.context(
    _pipe$1,
    $string.concat(toList(["failed to create directory '", dir, "'"])),
  );
}

export function read_directory_content(dir) {
  return $result.try$(
    (() => {
      let _pipe = $simplifile.read_directory(dir);
      let _pipe$1 = $result.map_error(
        _pipe,
        (reason) => { return $snag.new$($simplifile.describe_error(reason)); },
      );
      return $snag.context(_pipe$1, "Could not read directory: " + dir);
    })(),
    (children) => {
      return $list.try_map(
        children,
        (child) => {
          let path = $filepath.join(dir, child);
          return $result.try$(
            (() => {
              let _pipe = $simplifile.read_bits(path);
              let _pipe$1 = $result.map_error(
                _pipe,
                (reason) => {
                  return $snag.new$($simplifile.describe_error(reason));
                },
              );
              return $snag.context(_pipe$1, "Could not read file: " + path);
            })(),
            (content) => { return new Ok([child, content]); },
          );
        },
      );
    },
  );
}

export function read(filename) {
  let _pipe = $simplifile.read_bits(filename);
  let _pipe$1 = $result.map_error(
    _pipe,
    (reason) => { return $snag.new$($simplifile.describe_error(reason)); },
  );
  return $snag.context(
    _pipe$1,
    $string.concat(toList(["Could not read file '", filename, "'"])),
  );
}

export function write(filename, bytes) {
  let _pipe = $simplifile.write_bits(filename, bytes);
  let _pipe$1 = $result.map_error(
    _pipe,
    (reason) => { return $snag.new$($simplifile.describe_error(reason)); },
  );
  return $snag.context(
    _pipe$1,
    $string.concat(toList(["Could not write file '", filename, "'"])),
  );
}
