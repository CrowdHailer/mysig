import * as $filepath from "../../filepath/filepath.mjs";
import * as $promise from "../../gleam_javascript/gleam/javascript/promise.mjs";
import * as $dict from "../../gleam_stdlib/gleam/dict.mjs";
import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import * as $string from "../../gleam_stdlib/gleam/string.mjs";
import * as $element from "../../lustre/lustre/element.mjs";
import * as $pamphlet from "../../pamphlet/pamphlet.mjs";
import * as $pamphlet_lustre from "../../pamphlet/pamphlet/lustre.mjs";
import * as $simplifile from "../../simplifile/simplifile.mjs";
import * as $snag from "../../snag/snag.mjs";
import {
  Ok,
  toList,
  Empty as $Empty,
  prepend as listPrepend,
  CustomType as $CustomType,
  toBitArray,
  stringBits,
} from "../gleam.mjs";
import * as $server from "../mysig/asset/server.mjs";
import * as $dev from "../mysig/dev.mjs";
import * as $route from "../mysig/route.mjs";

export class ContentPage extends $CustomType {
  constructor(path, metadata, content) {
    super();
    this.path = path;
    this.metadata = metadata;
    this.content = content;
  }
}
export const ContentPage$ContentPage = (path, metadata, content) =>
  new ContentPage(path, metadata, content);
export const ContentPage$isContentPage = (value) =>
  value instanceof ContentPage;
export const ContentPage$ContentPage$path = (value) => value.path;
export const ContentPage$ContentPage$0 = (value) => value.path;
export const ContentPage$ContentPage$metadata = (value) => value.metadata;
export const ContentPage$ContentPage$1 = (value) => value.metadata;
export const ContentPage$ContentPage$content = (value) => value.content;
export const ContentPage$ContentPage$2 = (value) => value.content;

export function render_content_string(path, source, layout) {
  let $ = $pamphlet.parse(source);
  let metadata = $[0];
  let document = $[1];
  let _block;
  let _pipe = document;
  let _pipe$1 = $pamphlet_lustre.to_lustre(_pipe, $pamphlet_lustre.default$());
  _block = ((render) => { return render((element) => { return element; }); })(
    _pipe$1,
  );
  let body = _block;
  let page = new ContentPage(path, metadata, body);
  let _pipe$2 = layout(page);
  return $element.to_document_string(_pipe$2);
}

function read_text(path) {
  let $ = $simplifile.read(path);
  if ($ instanceof Ok) {
    return $;
  } else {
    let reason = $[0];
    return $snag.error($simplifile.describe_error(reason));
  }
}

function result_try(result, next) {
  if (result instanceof Ok) {
    let value = result[0];
    return next(value);
  } else {
    return result;
  }
}

export function render_content_file(path, layout) {
  return result_try(
    read_text(path),
    (source) => { return new Ok(render_content_string(path, source, layout)); },
  );
}

function do_child_routes(items, path, files, assets) {
  if (items instanceof $Empty) {
    let _block;
    let _pipe = assets;
    let _pipe$1 = $dict.to_list(_pipe);
    _block = $list.map(
      _pipe$1,
      (entry) => {
        let key;
        let bits;
        key = entry[0];
        bits = entry[1][2];
        return ["/assets/" + key, bits];
      },
    );
    let asset_files = _block;
    return $promise.resolve(new Ok($list.append(asset_files, files)));
  } else {
    let rest = items.tail;
    let segment = items.head[0];
    let route = items.head[1];
    return $promise.try_await(
      do_route_to_files(route, (path + "/") + segment, files, assets),
      (files) => { return do_child_routes(rest, path, files, assets); },
    );
  }
}

function do_route_to_files(route, path, files, assets) {
  let index = route.index;
  let items = route.items;
  if (index instanceof $route.Page) {
    let page = index[0];
    return $promise.try_await(
      $server.build_manifest(page, assets),
      (result) => {
        let content = result[0];
        let assets$1 = result[1];
        let content$1 = $string.replace(
          content,
          "<body>",
          "<body>" + $dev.manifest(assets$1),
        );
        let files$1 = listPrepend(
          [path + "/index.html", toBitArray([stringBits(content$1)])],
          files,
        );
        return do_child_routes(items, path, files$1, assets$1);
      },
    );
  } else {
    let bytes = index.content;
    let files$1 = listPrepend([path, bytes], files);
    return do_child_routes(items, path, files$1, assets);
  }
}

export function route_to_files(route) {
  return $promise.try_await(
    do_route_to_files(route, "", toList([]), $dict.new$()),
    (files) => { return $promise.resolve(new Ok($list.reverse(files))); },
  );
}

function write_bits(path, bytes) {
  let $ = $simplifile.write_bits(path, bytes);
  if ($ instanceof Ok) {
    return $;
  } else {
    let reason = $[0];
    return $snag.error($simplifile.describe_error(reason));
  }
}

function create_directory(path) {
  let $ = $simplifile.create_directory_all(path);
  if ($ instanceof Ok) {
    return $;
  } else {
    let reason = $[0];
    return $snag.error($simplifile.describe_error(reason));
  }
}

export function write_files(files, output_dir) {
  if (files instanceof $Empty) {
    return new Ok(undefined);
  } else {
    let rest = files.tail;
    let path = files.head[0];
    let bytes = files.head[1];
    let path$1 = $filepath.join(output_dir, path);
    return result_try(
      create_directory($filepath.directory_name(path$1)),
      (_use0) => {
        
        return result_try(
          write_bits(path$1, bytes),
          (_use0) => {
            
            return write_files(rest, output_dir);
          },
        );
      },
    );
  }
}
