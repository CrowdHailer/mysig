import * as $filepath from "../../filepath/filepath.mjs";
import * as $crypto from "../../gleam_crypto/gleam/crypto.mjs";
import * as $fetch from "../../gleam_fetch/gleam/fetch.mjs";
import * as $http from "../../gleam_http/gleam/http.mjs";
import * as $request from "../../gleam_http/gleam/http/request.mjs";
import * as $response from "../../gleam_http/gleam/http/response.mjs";
import * as $promise from "../../gleam_javascript/gleam/javascript/promise.mjs";
import * as $io from "../../gleam_stdlib/gleam/io.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import * as $result from "../../gleam_stdlib/gleam/result.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $uri from "../../gleam_stdlib/gleam/uri.mjs";
import * as $glen from "../../glen/glen.mjs";
import * as $status from "../../glen/glen/status.mjs";
import * as $glen_node from "../../glen_node/glen_node.mjs";
import * as $mutable_reference from "../../javascript_mutable_reference/javascript/mutable_reference.mjs";
import * as $d from "../../midas/midas/defunctionalise.mjs";
import * as $e from "../../midas/midas/effect.mjs";
import * as $subtle from "../../plinth/plinth/browser/crypto/subtle.mjs";
import * as $date from "../../plinth/plinth/javascript/date.mjs";
import * as $snag from "../../snag/snag.mjs";
import {
  Ok,
  Error,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
  makeError,
  toBitArray,
  stringBits,
} from "../gleam.mjs";
import * as $r from "../midas/js/run.mjs";
import * as $browser from "../midas/node/browser.mjs";
import * as $chokidar from "../midas/node/chokidar.mjs";
import * as $fs from "../midas/node/file_system.mjs";
import * as $gleam from "../midas/node/gleam.mjs";
import * as $rollup from "../midas/node/rollup.mjs";
import * as $zip from "../midas/node/zip.mjs";

const FILEPATH = "src/midas/node.gleam";

class Working extends $CustomType {
  constructor(changed) {
    super();
    this.changed = changed;
  }
}

class Ready extends $CustomType {
  constructor(root, callback, final, previous, servers) {
    super();
    this.root = root;
    this.callback = callback;
    this.final = final;
    this.previous = previous;
    this.servers = servers;
  }
}

class WatchMessage extends $CustomType {
  constructor($0, $1) {
    super();
    this[0] = $0;
    this[1] = $1;
  }
}

class Done extends $CustomType {
  constructor(root, callback, final, previous, servers) {
    super();
    this.root = root;
    this.callback = callback;
    this.final = final;
    this.previous = previous;
    this.servers = servers;
  }
}

function sources(_) {
  return toList(["./src"]);
}

function stop_servers(servers) {
  if (servers instanceof $Empty) {
    return $promise.resolve(undefined);
  } else {
    let previous = servers.tail;
    let server = servers.head[1];
    return $promise.await$(
      $glen_node.close(server),
      (_use0) => {
        
        return stop_servers(previous);
      },
    );
  }
}

function do_read(file, root) {
  let path = $filepath.join(root, file);
  let _pipe = $fs.read(path);
  return $result.map_error(_pipe, $snag.line_print);
}

function hash_algorithm_to_subtle(algorithm) {
  if (algorithm instanceof $e.Sha1) {
    return new $subtle.SHA1();
  } else if (algorithm instanceof $e.Sha256) {
    return new $subtle.SHA256();
  } else if (algorithm instanceof $e.Sha384) {
    return new $subtle.SHA384();
  } else {
    return new $subtle.SHA512();
  }
}

function do_serve(port, handle) {
  return $glen_node.serve(
    port,
    (request) => {
      return $promise.map(
        $glen.read_body_bits(request),
        (body) => {
          if (body instanceof Ok) {
            let body$1 = body[0];
            let request$1 = $request.set_body(request, body$1);
            let response = handle(request$1);
            let _pipe = response;
            return $response.set_body(_pipe, new $glen.Bits(response.body));
          } else {
            let _pipe = $response.new$(500);
            return $response.set_body(
              _pipe,
              new $glen.Bits(
                toBitArray([stringBits("failed to read request body")]),
              ),
            );
          }
        },
      );
    },
  );
}

function do_hash(algorithm, bytes) {
  let algorithm$1 = hash_algorithm_to_subtle(algorithm);
  return $subtle.digest(algorithm$1, bytes);
}

function usage_to_subtle(usage) {
  if (usage instanceof $e.CanEncrypt) {
    return new $subtle.Encrypt();
  } else if (usage instanceof $e.CanDecrypt) {
    return new $subtle.Decrypt();
  } else if (usage instanceof $e.CanSign) {
    return new $subtle.Sign();
  } else if (usage instanceof $e.CanVerify) {
    return new $subtle.Verify();
  } else if (usage instanceof $e.CanDeriveKey) {
    return new $subtle.DeriveKey();
  } else if (usage instanceof $e.CanDeriveBits) {
    return new $subtle.DeriveBits();
  } else if (usage instanceof $e.CanWrapKey) {
    return new $subtle.WrapKey();
  } else {
    return new $subtle.UnwrapKey();
  }
}

function handle_redirect(request, resolve) {
  let $ = request.method;
  if ($ instanceof $http.Get) {
    let _pipe = "<html><body><h1>finalising authorization</h1><script>fetch(\"/\", {method:\"POST\",body:location})</script></body></html>";
    let _pipe$1 = $glen.html(_pipe, $status.ok);
    return $promise.resolve(_pipe$1);
  } else if ($ instanceof $http.Post) {
    return $promise.await$(
      $glen.read_text_body(request),
      (body) => {
        if (body instanceof Ok) {
          let body$1 = body[0];
          resolve(body$1);
          let _pipe = "";
          let _pipe$1 = $glen.html(_pipe, $status.ok);
          return $promise.resolve(_pipe$1);
        } else {
          let _pipe = "Not text content";
          let _pipe$1 = $glen.html(_pipe, $status.bad_request);
          return $promise.resolve(_pipe$1);
        }
      },
    );
  } else if ($ instanceof $http.Options) {
    let _pipe = "";
    let _pipe$1 = $glen.html(_pipe, $status.ok);
    return $promise.resolve(_pipe$1);
  } else {
    let m = $;
    throw makeError(
      "panic",
      FILEPATH,
      "midas/node",
      344,
      "handle_redirect",
      ("unexpected method" + $http.method_to_string(m)),
      {}
    )
  }
}

function receive_redirect() {
  let $ = $promise.start();
  let promise = $[0];
  let resolve = $[1];
  let $1 = $glen_node.serve(
    8080,
    (_capture) => { return handle_redirect(_capture, resolve); },
  );
  if ($1 instanceof Ok) {
    let server = $1[0];
    return $promise.await$(
      promise,
      (url) => {
        return $promise.await$(
          $glen_node.close(server),
          (_use0) => {
            
            return $promise.resolve(new Ok(url));
          },
        );
      },
    );
  } else {
    let reason = $1[0];
    return $promise.resolve(new Error(reason));
  }
}

function do_follow(url) {
  let url$1 = $uri.to_string(url);
  $browser.open(url$1);
  return receive_redirect();
}

function cast_fetch_error(reason) {
  if (reason instanceof $fetch.NetworkError) {
    let s = reason[0];
    return new $e.NetworkError(s);
  } else if (reason instanceof $fetch.UnableToReadBody) {
    return new $e.UnableToReadBody();
  } else {
    return new $e.UnableToReadBody();
  }
}

export function do_fetch(request) {
  return $promise.await$(
    $fetch.send_bits(request),
    (response) => {
      if (response instanceof Ok) {
        let response$1 = response[0];
        return $promise.await$(
          $fetch.read_bytes_body(response$1),
          (response) => {
            let _block;
            if (response instanceof Ok) {
              _block = response;
            } else {
              let reason = response[0];
              _block = new Error(cast_fetch_error(reason));
            }
            let response$1 = _block;
            return $promise.resolve(response$1);
          },
        );
      } else {
        let reason = response[0];
        return $promise.resolve(new Error(cast_fetch_error(reason)));
      }
    },
  );
}

export function do_bundle(module, function$) {
  return $r.try$(
    $fs.current_directory(),
    (project) => {
      return $r.try$(
        $gleam.build_js(project),
        (js_dir) => {
          let _block;
          let $ = $string.split_once(module, "/");
          if ($ instanceof Ok) {
            let package$ = $[0][0];
            _block = package$;
          } else {
            _block = module;
          }
          let package$ = _block;
          let module_path = $string.concat(toList([package$, "/", module]));
          return $rollup.bundle_fn(js_dir, module_path, function$);
        },
      );
    },
  );
}

function do_run(loop$task, loop$root, loop$cache, loop$servers) {
  while (true) {
    let task = loop$task;
    let root = loop$root;
    let cache = loop$cache;
    let servers = loop$servers;
    if (task instanceof $d.Done) {
      let value = task[0];
      return $promise.resolve([value, $list.reverse(cache), servers]);
    } else if (task instanceof $d.Bundle) {
      let module = task.module;
      let function$ = task.function;
      let resume = task.resume;
      return $promise.await$(
        do_bundle(module, function$),
        (output) => {
          let output$1 = $result.map_error(output, $snag.pretty_print);
          let cache$1 = listPrepend(task, cache);
          return do_run(resume(output$1), root, cache$1, servers);
        },
      );
    } else if (task instanceof $d.ExportJsonWebKey) {
      let key = task.key;
      let resume = task.resume;
      return $promise.await$(
        $subtle.export_jwk(key),
        (output) => {
          let output$1;
          if (output instanceof Ok) {
            output$1 = output[0];
          } else {
            throw makeError(
              "let_assert",
              FILEPATH,
              "midas/node",
              178,
              "do_run",
              "Pattern match failed, no pattern matched the value.",
              {
                value: output,
                start: 5108,
                end: 5138,
                pattern_start: 5119,
                pattern_end: 5129
              }
            )
          }
          let cache$1 = listPrepend(task, cache);
          return do_run(resume(output$1), root, cache$1, servers);
        },
      );
    } else if (task instanceof $d.Follow) {
      let uri = task.uri;
      let resume = task.resume;
      return $promise.await$(
        do_follow(uri),
        (return$) => {
          let raw;
          if (return$ instanceof Ok) {
            raw = return$[0];
          } else {
            throw makeError(
              "let_assert",
              FILEPATH,
              "midas/node",
              189,
              "do_run",
              "Pattern match failed, no pattern matched the value.",
              {
                value: return$,
                start: 5495,
                end: 5522,
                pattern_start: 5506,
                pattern_end: 5513
              }
            )
          }
          let cache$1 = listPrepend(task, cache);
          return do_run(resume($uri.parse(raw)), root, cache$1, servers);
        },
      );
    } else if (task instanceof $d.Fetch) {
      let request = task.request;
      let resume = task.resume;
      return $promise.await$(
        do_fetch(request),
        (return$) => {
          let cache$1 = listPrepend(task, cache);
          return do_run(resume(return$), root, cache$1, servers);
        },
      );
    } else if (task instanceof $d.GenerateKeyPair) {
      let algorithm = task.algorithm;
      let exportable = task.extractable;
      let usages = task.usages;
      let resume = task.resume;
      let _block;
      let name = algorithm.name;
      let curve = algorithm.named_curve;
      _block = new $subtle.EcKeyGenParams(name, curve);
      let alg = _block;
      let usages$1 = $list.map(usages, usage_to_subtle);
      return $promise.await$(
        $subtle.generate_key(alg, exportable, usages$1),
        (result) => {
          let _block$1;
          if (result instanceof Ok) {
            let public$ = result[0][0];
            let private$ = result[0][1];
            _block$1 = new Ok(new $e.KeyPair(public$, private$));
          } else {
            _block$1 = result;
          }
          let result$1 = _block$1;
          let cache$1 = listPrepend(task, cache);
          return do_run(resume(result$1), root, cache$1, servers);
        },
      );
    } else if (task instanceof $d.Hash) {
      let algorithm = task.algorithm;
      let bytes = task.bytes;
      let resume = task.resume;
      return $promise.await$(
        do_hash(algorithm, bytes),
        (result) => {
          let result$1;
          if (result instanceof Ok) {
            result$1 = result[0];
          } else {
            throw makeError(
              "let_assert",
              FILEPATH,
              "midas/node",
              208,
              "do_run",
              "Pattern match failed, no pattern matched the value.",
              {
                value: result,
                start: 6285,
                end: 6315,
                pattern_start: 6296,
                pattern_end: 6306
              }
            )
          }
          let cache$1 = listPrepend(task, cache);
          return do_run(resume(result$1), root, cache$1, servers);
        },
      );
    } else if (task instanceof $d.Log) {
      let message = task.message;
      let resume = task.resume;
      $io.println(message);
      let cache$1 = listPrepend(task, cache);
      loop$task = resume(undefined);
      loop$root = root;
      loop$cache = cache$1;
      loop$servers = servers;
    } else if (task instanceof $d.ReadDirectory) {
      let directory = task.directory;
      let resume = task.resume;
      let path = $filepath.join(root, directory);
      let entries = $fs.read_directory(path);
      let entries$1 = $result.map_error(entries, $snag.pretty_print);
      let cache$1 = listPrepend(task, cache);
      loop$task = resume(entries$1);
      loop$root = root;
      loop$cache = cache$1;
      loop$servers = servers;
    } else if (task instanceof $d.ReadFile) {
      let file = task.file;
      let resume = task.resume;
      let cache$1 = listPrepend(task, cache);
      loop$task = resume(do_read(file, root));
      loop$root = root;
      loop$cache = cache$1;
      loop$servers = servers;
    } else if (task instanceof $d.Serve) {
      let port = task.port;
      let handle$1 = task.handle;
      let resume = task.resume;
      let port$1 = $option.unwrap(port, 8080);
      let _block;
      let $1 = do_serve(port$1, handle$1);
      if ($1 instanceof Ok) {
        let server = $1[0];
        _block = [new Ok(undefined), listPrepend([port$1, server], servers)];
      } else {
        let reason = $1[0];
        _block = [new Error(reason), servers];
      }
      let $ = _block;
      let result = $[0];
      let servers$1 = $[1];
      let cache$1 = listPrepend(task, cache);
      let result$1 = $result.replace(result, port$1);
      loop$task = resume(result$1);
      loop$root = root;
      loop$cache = cache$1;
      loop$servers = servers$1;
    } else if (task instanceof $d.Sign) {
      let algorithm = task.algorithm;
      let key = task.key;
      let data = task.data;
      let resume = task.resume;
      let _block;
      let x = algorithm.hash;
      _block = new $subtle.EcdsaParams(hash_algorithm_to_subtle(x));
      let algorithm$1 = _block;
      return $promise.await$(
        $subtle.sign(algorithm$1, key, data),
        (result) => {
          let cache$1 = listPrepend(task, cache);
          return do_run(resume(result), root, cache$1, servers);
        },
      );
    } else if (task instanceof $d.StrongRandom) {
      let length = task.length;
      let resume = task.resume;
      let bytes = $crypto.strong_random_bytes(length);
      let cache$1 = listPrepend(task, cache);
      loop$task = resume(bytes);
      loop$root = root;
      loop$cache = cache$1;
      loop$servers = servers;
    } else if (task instanceof $d.WriteFile) {
      let file = task.file;
      let bytes = task.bytes;
      let resume = task.resume;
      let path = $filepath.join(root, file);
      let _block;
      let _pipe = $fs.write(path, bytes);
      _block = $result.map_error(_pipe, $snag.line_print);
      let result = _block;
      let cache$1 = listPrepend(task, cache);
      loop$task = resume(result);
      loop$root = root;
      loop$cache = cache$1;
      loop$servers = servers;
    } else if (task instanceof $d.Visit) {
      let uri = task.uri;
      let resume = task.resume;
      $browser.open($uri.to_string(uri));
      let cache$1 = listPrepend(task, cache);
      loop$task = resume(new Ok(undefined));
      loop$root = root;
      loop$cache = cache$1;
      loop$servers = servers;
    } else if (task instanceof $d.Zip) {
      let files = task.files;
      let resume = task.resume;
      return $promise.await$(
        $zip.zip(files),
        (return$) => {
          let cache$1 = listPrepend(task, cache);
          return do_run(resume(new Ok(return$)), root, cache$1, servers);
        },
      );
    } else {
      let resume = task.resume;
      let now = globalThis.Math.trunc($date.get_time($date.now()) / 1000);
      let cache$1 = listPrepend(task, cache);
      loop$task = resume(now);
      loop$root = root;
      loop$cache = cache$1;
      loop$servers = servers;
    }
  }
}

function redo(
  loop$final,
  loop$previous,
  loop$servers,
  loop$root,
  loop$invalidated,
  loop$unchanged
) {
  while (true) {
    let final = loop$final;
    let previous = loop$previous;
    let servers = loop$servers;
    let root = loop$root;
    let invalidated = loop$invalidated;
    let unchanged = loop$unchanged;
    let src_affected = $list.any(
      invalidated,
      (_capture) => { return $string.starts_with(_capture, "src"); },
    );
    if (previous instanceof $Empty) {
      return $promise.resolve([final, $list.reverse(unchanged), toList([])]);
    } else {
      let cached = previous.head;
      let previous$1 = previous.tail;
      let unchanged$1 = listPrepend(cached, unchanged);
      if (cached instanceof $d.Bundle && src_affected) {
        let mod = cached.module;
        let func = cached.function;
        let resume = cached.resume;
        return $promise.await$(
          stop_servers(servers),
          (_use0) => {
            
            return $promise.await$(
              do_bundle(mod, func),
              (output) => {
                let output$1 = $result.map_error(output, $snag.pretty_print);
                return do_run(resume(output$1), root, unchanged$1, servers);
              },
            );
          },
        );
      } else if (cached instanceof $d.ReadFile) {
        let file = cached.file;
        let resume = cached.resume;
        let $ = $list.contains(invalidated, file);
        if ($) {
          return $promise.await$(
            stop_servers(servers),
            (_use0) => {
              
              return do_run(
                resume(do_read(file, root)),
                root,
                unchanged$1,
                servers,
              );
            },
          );
        } else {
          loop$final = final;
          loop$previous = previous$1;
          loop$servers = servers;
          loop$root = root;
          loop$invalidated = invalidated;
          loop$unchanged = unchanged$1;
        }
      } else if (cached instanceof $d.Serve) {
        let port = cached.port;
        let _block;
        let $ = $list.key_pop(servers, $option.unwrap(port, 8080));
        if ($ instanceof Ok) {
          let servers$1 = $[0][1];
          _block = servers$1;
        } else {
          _block = servers;
        }
        let servers$1 = _block;
        loop$final = final;
        loop$previous = previous$1;
        loop$servers = servers$1;
        loop$root = root;
        loop$invalidated = invalidated;
        loop$unchanged = unchanged$1;
      } else {
        loop$final = final;
        loop$previous = previous$1;
        loop$servers = servers;
        loop$root = root;
        loop$invalidated = invalidated;
        loop$unchanged = unchanged$1;
      }
    }
  }
}

function send(ref, message) {
  $mutable_reference.update(
    ref,
    (_capture) => { return handle(ref, message, _capture); },
  );
  return undefined;
}

function handle(self, message, state) {
  if (state instanceof Working) {
    let changed = state.changed;
    if (message instanceof WatchMessage) {
      let $ = message[0];
      if ($ instanceof $chokidar.Change) {
        let path = message[1];
        return new Working(listPrepend(path, changed));
      } else {
        return state;
      }
    } else {
      let root = message.root;
      let callback = message.callback;
      let final = message.final;
      let previous = message.previous;
      let servers = message.servers;
      return new Ready(root, callback, final, previous, servers);
    }
  } else {
    let root = state.root;
    let callback = state.callback;
    let final = state.final;
    let previous = state.previous;
    let servers = state.servers;
    if (message instanceof WatchMessage) {
      let $ = message[0];
      if ($ instanceof $chokidar.Change) {
        let path = message[1];
        $promise.map(
          redo(final, previous, servers, root, toList([path]), toList([])),
          (result) => {
            let final$1 = result[0];
            let previous$1 = result[1];
            let servers$1 = result[2];
            callback(final$1);
            return send(
              self,
              new Done(root, callback, final$1, previous$1, servers$1),
            );
          },
        );
        return new Working(toList([]));
      } else {
        return state;
      }
    } else {
      $io.println("should not happen");
      return state;
    }
  }
}

export function watch(task, root, callback) {
  return $promise.await$(
    do_run(task, root, toList([]), toList([])),
    (_use0) => {
      let final = _use0[0];
      let previous = _use0[1];
      let servers = _use0[2];
      let initial = sources(previous);
      let watcher = $chokidar.watch(initial);
      let ref = $mutable_reference.new$(
        new Ready(root, callback, final, previous, servers),
      );
      callback(final);
      $chokidar.on_all(
        watcher,
        (event, path) => { return send(ref, new WatchMessage(event, path)); },
      );
      return $promise.resolve(undefined);
    },
  );
}

export function run(task, root) {
  return $promise.map(
    do_run(task, root, toList([]), toList([])),
    (_use0) => {
      let result = _use0[0];
      return result;
    },
  );
}
