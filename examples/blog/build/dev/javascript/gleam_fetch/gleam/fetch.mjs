import * as $request from "../../gleam_http/gleam/http/request.mjs";
import * as $response from "../../gleam_http/gleam/http/response.mjs";
import * as $promise from "../../gleam_javascript/gleam/javascript/promise.mjs";
import * as $dynamic from "../../gleam_stdlib/gleam/dynamic.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import { Ok, CustomType as $CustomType } from "../gleam.mjs";
import * as $form_data from "../gleam/fetch/form_data.mjs";
import {
  raw_send,
  from_fetch_response,
  to_fetch_request,
  form_data_to_fetch_request,
  bitarray_request_to_fetch_request,
  read_bytes_body,
  read_text_body,
  read_json_body,
  stream_body,
  read_chunk,
} from "../gleam_fetch_ffi.mjs";

export {
  bitarray_request_to_fetch_request,
  form_data_to_fetch_request,
  from_fetch_response,
  raw_send,
  read_bytes_body,
  read_chunk,
  read_json_body,
  read_text_body,
  stream_body,
  to_fetch_request,
};

/**
 * A network error occurred, maybe because user lost network connection,
 * because the network took to long to answer, or because the
 * server timed out.
 */
export class NetworkError extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const FetchError$NetworkError = ($0) => new NetworkError($0);
export const FetchError$isNetworkError = (value) =>
  value instanceof NetworkError;
export const FetchError$NetworkError$0 = (value) => value[0];

/**
 * Fetch is unable to read body, for example when body as already been read
 * once.
 */
export class UnableToReadBody extends $CustomType {}
export const FetchError$UnableToReadBody = () => new UnableToReadBody();
export const FetchError$isUnableToReadBody = (value) =>
  value instanceof UnableToReadBody;

/**
 * The body was not valid JSON.
 */
export class InvalidJsonBody extends $CustomType {}
export const FetchError$InvalidJsonBody = () => new InvalidJsonBody();
export const FetchError$isInvalidJsonBody = (value) =>
  value instanceof InvalidJsonBody;

/**
 * Call `fetch` with a Gleam `Request(String)`, and convert the result back
 * to Gleam. Use it to send strings or JSON stringified.
 *
 * If you're looking for something more low-level, take a look at
 * [`raw_send`](#raw_send).
 *
 * ```gleam
 * let my_data = json.object([#("field", "value")])
 * request.new()
 * |> request.set_host("example.com")
 * |> request.set_path("/example")
 * |> request.set_body(json.to_string(my_data))
 * |> request.set_header("content-type", "application/json")
 * |> fetch.send
 * ```
 */
export function send(request) {
  let _pipe = request;
  let _pipe$1 = to_fetch_request(_pipe);
  let _pipe$2 = raw_send(_pipe$1);
  return $promise.try_await(
    _pipe$2,
    (resp) => { return $promise.resolve(new Ok(from_fetch_response(resp))); },
  );
}

/**
 * Call `fetch` with a Gleam `Request(FormData)`, and convert the result back
 * to Gleam. Request will be sent as a `multipart/form-data`, and should be
 * decoded as-is on servers.
 *
 * If you're looking for something more low-level, take a look at
 * [`raw_send`](#raw_send).
 *
 * ```gleam
 * request.new()
 * |> request.set_host("example.com")
 * |> request.set_path("/example")
 * |> request.set_body({
 *   form_data.new()
 *   |> form_data.append("key", "value")
 * })
 * |> fetch.send_form_data
 * ```
 */
export function send_form_data(request) {
  let _pipe = request;
  let _pipe$1 = form_data_to_fetch_request(_pipe);
  let _pipe$2 = raw_send(_pipe$1);
  return $promise.try_await(
    _pipe$2,
    (resp) => { return $promise.resolve(new Ok(from_fetch_response(resp))); },
  );
}

/**
 * Call `fetch` with a Gleam `Request(FormData)`, and convert the result back
 * to Gleam. Binary will be sent as-is, and you probably want a proper
 * content-type added.
 *
 * If you're looking for something more low-level, take a look at
 * [`raw_send`](#raw_send).
 *
 * ```gleam
 * request.new()
 * |> request.set_host("example.com")
 * |> request.set_path("/example")
 * |> request.set_body(<<"data">>)
 * |> request.set_header("content-type", "application/octet-stream")
 * |> fetch.send_form_data
 * ```
 */
export function send_bits(request) {
  let _pipe = request;
  let _pipe$1 = bitarray_request_to_fetch_request(_pipe);
  let _pipe$2 = raw_send(_pipe$1);
  return $promise.try_await(
    _pipe$2,
    (resp) => { return $promise.resolve(new Ok(from_fetch_response(resp))); },
  );
}
