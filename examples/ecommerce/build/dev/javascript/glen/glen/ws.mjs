import { CustomType as $CustomType } from "../gleam.mjs";
import { send_text, send_bits, dispatch_event } from "../ws.ffi.mjs";

export { dispatch_event, send_bits, send_text };

/**
 * Recieved a text message
 */
export class Text extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const WebsocketMessage$Text = ($0) => new Text($0);
export const WebsocketMessage$isText = (value) => value instanceof Text;
export const WebsocketMessage$Text$0 = (value) => value[0];

/**
 * Recieved a BitArray message
 */
export class Bits extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const WebsocketMessage$Bits = ($0) => new Bits($0);
export const WebsocketMessage$isBits = (value) => value instanceof Bits;
export const WebsocketMessage$Bits$0 = (value) => value[0];

/**
 * Recieved a custom event
 */
export class Event extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const WebsocketMessage$Event = ($0) => new Event($0);
export const WebsocketMessage$isEvent = (value) => value instanceof Event;
export const WebsocketMessage$Event$0 = (value) => value[0];
