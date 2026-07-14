import * as $array from "../../../../gleam_javascript/gleam/javascript/array.mjs";
import * as $json from "../../../../gleam_json/gleam/json.mjs";
import * as $option from "../../../../gleam_stdlib/gleam/option.mjs";
import { None, Some } from "../../../../gleam_stdlib/gleam/option.mjs";
import { toList, prepend as listPrepend, CustomType as $CustomType } from "../../../gleam.mjs";
import * as $object_store from "../../../plinth/browser/indexeddb/object_store.mjs";
import * as $transaction from "../../../plinth/browser/indexeddb/transaction.mjs";
import {
  database_name as name,
  database_version as version,
  database_object_store_names as object_store_names,
  database_create_object_store as do_create_object_store,
  database_transaction as do_transaction,
} from "../../../plinth_indexeddb_ffi.mjs";

export { name, object_store_names, version };

export class ReadOnly extends $CustomType {}
export const Mode$ReadOnly = () => new ReadOnly();
export const Mode$isReadOnly = (value) => value instanceof ReadOnly;

export class ReadWrite extends $CustomType {}
export const Mode$ReadWrite = () => new ReadWrite();
export const Mode$isReadWrite = (value) => value instanceof ReadWrite;

export class ReadWriteFlush extends $CustomType {}
export const Mode$ReadWriteFlush = () => new ReadWriteFlush();
export const Mode$isReadWriteFlush = (value) => value instanceof ReadWriteFlush;

export class Strict extends $CustomType {}
export const Durability$Strict = () => new Strict();
export const Durability$isStrict = (value) => value instanceof Strict;

export class Relaxed extends $CustomType {}
export const Durability$Relaxed = () => new Relaxed();
export const Durability$isRelaxed = (value) => value instanceof Relaxed;

export class Default extends $CustomType {}
export const Durability$Default = () => new Default();
export const Durability$isDefault = (value) => value instanceof Default;

/**
 * This method can be called only within a versionchange transaction.
 *
 * ## In-Line Out-Of-Line keys
 * https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#structuring_the_database
 *
 * IndexedDB has two ways to handle keys:
 * In-line keys: The key is a property within the stored object itself
 * { id: 1, name: "Alice", email: "alice@example.com" }
 *
 * Out-of-line keys: The key is stored separately and is not part of the object
 * { name: "Alice", email: "alice@example.com" }
 *
 * If a key_path is provided then in-line keys are used.
 * Storing simple values, not objects, will require out-of-line keys
 *
 * Autoincrement and key_path can be used in any combination, though use of the database is affected
 *
 * If auto_increment is False and you store a value without an id you will get an error.
 *
 * ## Key vs Index
 *
 * The key, in-line or out-of-line, is automatically indexed and unique.
 *
 * Using `add` will fail if inserting a value with a key that already exists.
 * Use `put` to insert or replace a value
 */
export function create_object_store(database, name, key_path, auto_increment) {
  let entries = toList([["autoIncrement", $json.bool(auto_increment)]]);
  let _block;
  if (key_path instanceof Some) {
    let key_path$1 = key_path[0];
    _block = listPrepend(["keyPath", $json.string(key_path$1)], entries);
  } else {
    _block = entries;
  }
  let entries$1 = _block;
  return do_create_object_store(database, name, $json.object(entries$1));
}

function mode_to_string(mode) {
  if (mode instanceof ReadOnly) {
    return "readonly";
  } else if (mode instanceof ReadWrite) {
    return "readwrite";
  } else {
    return "readwriteflush";
  }
}

function durability_to_string(durability) {
  if (durability instanceof Strict) {
    return "strict";
  } else if (durability instanceof Relaxed) {
    return "relaxed";
  } else {
    return "default";
  }
}

export function transaction(database, store_names, mode, durability) {
  return do_transaction(
    database,
    $array.from_list(store_names),
    mode_to_string(mode),
    durability_to_string(durability),
  );
}
