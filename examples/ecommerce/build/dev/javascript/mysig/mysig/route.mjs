import * as $list from "../../gleam_stdlib/gleam/list.mjs";
import { Ok, Empty as $Empty, CustomType as $CustomType } from "../gleam.mjs";
import * as $asset from "../mysig/asset.mjs";

export class Page extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Endpoint$Page = ($0) => new Page($0);
export const Endpoint$isPage = (value) => value instanceof Page;
export const Endpoint$Page$0 = (value) => value[0];

export class Static extends $CustomType {
  constructor(content) {
    super();
    this.content = content;
  }
}
export const Endpoint$Static = (content) => new Static(content);
export const Endpoint$isStatic = (value) => value instanceof Static;
export const Endpoint$Static$content = (value) => value.content;
export const Endpoint$Static$0 = (value) => value.content;

export class Route extends $CustomType {
  constructor(index, items) {
    super();
    this.index = index;
    this.items = items;
  }
}
export const Route$Route = (index, items) => new Route(index, items);
export const Route$isRoute = (value) => value instanceof Route;
export const Route$Route$index = (value) => value.index;
export const Route$Route$0 = (value) => value.index;
export const Route$Route$items = (value) => value.items;
export const Route$Route$1 = (value) => value.items;

export function match(loop$segments, loop$route) {
  while (true) {
    let segments = loop$segments;
    let route = loop$route;
    if (segments instanceof $Empty) {
      return new Ok(route.index);
    } else {
      let next = segments.head;
      let rest = segments.tail;
      let $ = $list.key_find(route.items, next);
      if ($ instanceof Ok) {
        let child = $[0];
        loop$segments = rest;
        loop$route = child;
      } else {
        return $;
      }
    }
  }
}
