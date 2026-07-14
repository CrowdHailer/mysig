import * as $request from "../../gleam_http/gleam/http/request.mjs";
import * as $response from "../../gleam_http/gleam/http/response.mjs";
import * as $json from "../../gleam_json/gleam/json.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import * as $uri from "../../gleam_stdlib/gleam/uri.mjs";
import { CustomType as $CustomType } from "../gleam.mjs";
import * as $effect from "../midas/effect.mjs";

export class Done extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Effect$Done = ($0) => new Done($0);
export const Effect$isDone = (value) => value instanceof Done;
export const Effect$Done$0 = (value) => value[0];

export class Bundle extends $CustomType {
  constructor(module, function$, resume) {
    super();
    this.module = module;
    this.function = function$;
    this.resume = resume;
  }
}
export const Effect$Bundle = (module, function$, resume) =>
  new Bundle(module, function$, resume);
export const Effect$isBundle = (value) => value instanceof Bundle;
export const Effect$Bundle$module = (value) => value.module;
export const Effect$Bundle$0 = (value) => value.module;
export const Effect$Bundle$function = (value) => value.function;
export const Effect$Bundle$1 = (value) => value.function;
export const Effect$Bundle$resume = (value) => value.resume;
export const Effect$Bundle$2 = (value) => value.resume;

export class ExportJsonWebKey extends $CustomType {
  constructor(key, resume) {
    super();
    this.key = key;
    this.resume = resume;
  }
}
export const Effect$ExportJsonWebKey = (key, resume) =>
  new ExportJsonWebKey(key, resume);
export const Effect$isExportJsonWebKey = (value) =>
  value instanceof ExportJsonWebKey;
export const Effect$ExportJsonWebKey$key = (value) => value.key;
export const Effect$ExportJsonWebKey$0 = (value) => value.key;
export const Effect$ExportJsonWebKey$resume = (value) => value.resume;
export const Effect$ExportJsonWebKey$1 = (value) => value.resume;

export class Follow extends $CustomType {
  constructor(uri, resume) {
    super();
    this.uri = uri;
    this.resume = resume;
  }
}
export const Effect$Follow = (uri, resume) => new Follow(uri, resume);
export const Effect$isFollow = (value) => value instanceof Follow;
export const Effect$Follow$uri = (value) => value.uri;
export const Effect$Follow$0 = (value) => value.uri;
export const Effect$Follow$resume = (value) => value.resume;
export const Effect$Follow$1 = (value) => value.resume;

export class Fetch extends $CustomType {
  constructor(request, resume) {
    super();
    this.request = request;
    this.resume = resume;
  }
}
export const Effect$Fetch = (request, resume) => new Fetch(request, resume);
export const Effect$isFetch = (value) => value instanceof Fetch;
export const Effect$Fetch$request = (value) => value.request;
export const Effect$Fetch$0 = (value) => value.request;
export const Effect$Fetch$resume = (value) => value.resume;
export const Effect$Fetch$1 = (value) => value.resume;

export class GenerateKeyPair extends $CustomType {
  constructor(algorithm, extractable, usages, resume) {
    super();
    this.algorithm = algorithm;
    this.extractable = extractable;
    this.usages = usages;
    this.resume = resume;
  }
}
export const Effect$GenerateKeyPair = (algorithm, extractable, usages, resume) =>
  new GenerateKeyPair(algorithm, extractable, usages, resume);
export const Effect$isGenerateKeyPair = (value) =>
  value instanceof GenerateKeyPair;
export const Effect$GenerateKeyPair$algorithm = (value) => value.algorithm;
export const Effect$GenerateKeyPair$0 = (value) => value.algorithm;
export const Effect$GenerateKeyPair$extractable = (value) => value.extractable;
export const Effect$GenerateKeyPair$1 = (value) => value.extractable;
export const Effect$GenerateKeyPair$usages = (value) => value.usages;
export const Effect$GenerateKeyPair$2 = (value) => value.usages;
export const Effect$GenerateKeyPair$resume = (value) => value.resume;
export const Effect$GenerateKeyPair$3 = (value) => value.resume;

export class Hash extends $CustomType {
  constructor(algorithm, bytes, resume) {
    super();
    this.algorithm = algorithm;
    this.bytes = bytes;
    this.resume = resume;
  }
}
export const Effect$Hash = (algorithm, bytes, resume) =>
  new Hash(algorithm, bytes, resume);
export const Effect$isHash = (value) => value instanceof Hash;
export const Effect$Hash$algorithm = (value) => value.algorithm;
export const Effect$Hash$0 = (value) => value.algorithm;
export const Effect$Hash$bytes = (value) => value.bytes;
export const Effect$Hash$1 = (value) => value.bytes;
export const Effect$Hash$resume = (value) => value.resume;
export const Effect$Hash$2 = (value) => value.resume;

export class Log extends $CustomType {
  constructor(message, resume) {
    super();
    this.message = message;
    this.resume = resume;
  }
}
export const Effect$Log = (message, resume) => new Log(message, resume);
export const Effect$isLog = (value) => value instanceof Log;
export const Effect$Log$message = (value) => value.message;
export const Effect$Log$0 = (value) => value.message;
export const Effect$Log$resume = (value) => value.resume;
export const Effect$Log$1 = (value) => value.resume;

export class ReadDirectory extends $CustomType {
  constructor(directory, resume) {
    super();
    this.directory = directory;
    this.resume = resume;
  }
}
export const Effect$ReadDirectory = (directory, resume) =>
  new ReadDirectory(directory, resume);
export const Effect$isReadDirectory = (value) => value instanceof ReadDirectory;
export const Effect$ReadDirectory$directory = (value) => value.directory;
export const Effect$ReadDirectory$0 = (value) => value.directory;
export const Effect$ReadDirectory$resume = (value) => value.resume;
export const Effect$ReadDirectory$1 = (value) => value.resume;

export class ReadFile extends $CustomType {
  constructor(file, resume) {
    super();
    this.file = file;
    this.resume = resume;
  }
}
export const Effect$ReadFile = (file, resume) => new ReadFile(file, resume);
export const Effect$isReadFile = (value) => value instanceof ReadFile;
export const Effect$ReadFile$file = (value) => value.file;
export const Effect$ReadFile$0 = (value) => value.file;
export const Effect$ReadFile$resume = (value) => value.resume;
export const Effect$ReadFile$1 = (value) => value.resume;

export class Serve extends $CustomType {
  constructor(port, handle, resume) {
    super();
    this.port = port;
    this.handle = handle;
    this.resume = resume;
  }
}
export const Effect$Serve = (port, handle, resume) =>
  new Serve(port, handle, resume);
export const Effect$isServe = (value) => value instanceof Serve;
export const Effect$Serve$port = (value) => value.port;
export const Effect$Serve$0 = (value) => value.port;
export const Effect$Serve$handle = (value) => value.handle;
export const Effect$Serve$1 = (value) => value.handle;
export const Effect$Serve$resume = (value) => value.resume;
export const Effect$Serve$2 = (value) => value.resume;

export class Sign extends $CustomType {
  constructor(algorithm, key, data, resume) {
    super();
    this.algorithm = algorithm;
    this.key = key;
    this.data = data;
    this.resume = resume;
  }
}
export const Effect$Sign = (algorithm, key, data, resume) =>
  new Sign(algorithm, key, data, resume);
export const Effect$isSign = (value) => value instanceof Sign;
export const Effect$Sign$algorithm = (value) => value.algorithm;
export const Effect$Sign$0 = (value) => value.algorithm;
export const Effect$Sign$key = (value) => value.key;
export const Effect$Sign$1 = (value) => value.key;
export const Effect$Sign$data = (value) => value.data;
export const Effect$Sign$2 = (value) => value.data;
export const Effect$Sign$resume = (value) => value.resume;
export const Effect$Sign$3 = (value) => value.resume;

export class StrongRandom extends $CustomType {
  constructor(length, resume) {
    super();
    this.length = length;
    this.resume = resume;
  }
}
export const Effect$StrongRandom = (length, resume) =>
  new StrongRandom(length, resume);
export const Effect$isStrongRandom = (value) => value instanceof StrongRandom;
export const Effect$StrongRandom$length = (value) => value.length;
export const Effect$StrongRandom$0 = (value) => value.length;
export const Effect$StrongRandom$resume = (value) => value.resume;
export const Effect$StrongRandom$1 = (value) => value.resume;

export class WriteFile extends $CustomType {
  constructor(file, bytes, resume) {
    super();
    this.file = file;
    this.bytes = bytes;
    this.resume = resume;
  }
}
export const Effect$WriteFile = (file, bytes, resume) =>
  new WriteFile(file, bytes, resume);
export const Effect$isWriteFile = (value) => value instanceof WriteFile;
export const Effect$WriteFile$file = (value) => value.file;
export const Effect$WriteFile$0 = (value) => value.file;
export const Effect$WriteFile$bytes = (value) => value.bytes;
export const Effect$WriteFile$1 = (value) => value.bytes;
export const Effect$WriteFile$resume = (value) => value.resume;
export const Effect$WriteFile$2 = (value) => value.resume;

export class Visit extends $CustomType {
  constructor(uri, resume) {
    super();
    this.uri = uri;
    this.resume = resume;
  }
}
export const Effect$Visit = (uri, resume) => new Visit(uri, resume);
export const Effect$isVisit = (value) => value instanceof Visit;
export const Effect$Visit$uri = (value) => value.uri;
export const Effect$Visit$0 = (value) => value.uri;
export const Effect$Visit$resume = (value) => value.resume;
export const Effect$Visit$1 = (value) => value.resume;

export class Zip extends $CustomType {
  constructor(files, resume) {
    super();
    this.files = files;
    this.resume = resume;
  }
}
export const Effect$Zip = (files, resume) => new Zip(files, resume);
export const Effect$isZip = (value) => value instanceof Zip;
export const Effect$Zip$files = (value) => value.files;
export const Effect$Zip$0 = (value) => value.files;
export const Effect$Zip$resume = (value) => value.resume;
export const Effect$Zip$1 = (value) => value.resume;

export class UnixNow extends $CustomType {
  constructor(resume) {
    super();
    this.resume = resume;
  }
}
export const Effect$UnixNow = (resume) => new UnixNow(resume);
export const Effect$isUnixNow = (value) => value instanceof UnixNow;
export const Effect$UnixNow$resume = (value) => value.resume;
export const Effect$UnixNow$0 = (value) => value.resume;

export function bundle(module, function$) {
  return (_capture) => { return new Bundle(module, function$, _capture); };
}

export function export_jwk(key) {
  return (_capture) => { return new ExportJsonWebKey(key, _capture); };
}

export function fetch(request) {
  return (_capture) => { return new Fetch(request, _capture); };
}

export function follow(uri) {
  return (_capture) => { return new Follow(uri, _capture); };
}

export function generate_keypair(algorithm, extractable, usages) {
  return (_capture) => {
    return new GenerateKeyPair(algorithm, extractable, usages, _capture);
  };
}

export function hash(algorithm, bytes) {
  return (_capture) => { return new Hash(algorithm, bytes, _capture); };
}

export function log(message) {
  return (_capture) => { return new Log(message, _capture); };
}

export function read_directory(directory) {
  return (_capture) => { return new ReadDirectory(directory, _capture); };
}

export function read_file(file) {
  return (_capture) => { return new ReadFile(file, _capture); };
}

export function serve(port, handle) {
  return (_capture) => { return new Serve(port, handle, _capture); };
}

export function sign(algorithm, key, data) {
  return (_capture) => { return new Sign(algorithm, key, data, _capture); };
}

export function strong_random(length) {
  return (_capture) => { return new StrongRandom(length, _capture); };
}

export function unix_now() {
  return (var0) => { return new UnixNow(var0); };
}

export function write_file(file, bytes) {
  return (_capture) => { return new WriteFile(file, bytes, _capture); };
}

export function visit(uri) {
  return (_capture) => { return new Visit(uri, _capture); };
}

export function zip(files) {
  return (_capture) => { return new Zip(files, _capture); };
}
