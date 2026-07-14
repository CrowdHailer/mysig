import { CustomType as $CustomType } from "../gleam.mjs";

export class Informational extends $CustomType {}
export const StatusType$Informational = () => new Informational();
export const StatusType$isInformational = (value) =>
  value instanceof Informational;

export class Successful extends $CustomType {}
export const StatusType$Successful = () => new Successful();
export const StatusType$isSuccessful = (value) => value instanceof Successful;

export class Redirection extends $CustomType {}
export const StatusType$Redirection = () => new Redirection();
export const StatusType$isRedirection = (value) => value instanceof Redirection;

export class ClientError extends $CustomType {}
export const StatusType$ClientError = () => new ClientError();
export const StatusType$isClientError = (value) => value instanceof ClientError;

export class ServerError extends $CustomType {}
export const StatusType$ServerError = () => new ServerError();
export const StatusType$isServerError = (value) => value instanceof ServerError;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/100)
 */
export const continue$ = 100;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/101)
 */
export const switching_protocols = 101;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/102)
 */
export const processing = 102;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/103)
 */
export const early_hints = 103;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200)
 */
export const ok = 200;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201)
 */
export const created = 201;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202)
 */
export const accepted = 202;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/203)
 */
export const non_authoritative_information = 203;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204)
 */
export const no_content = 204;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/205)
 */
export const reset_content = 205;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/206)
 */
export const partial_content = 206;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/207)
 */
export const multi_status = 207;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/208)
 */
export const already_reported = 208;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/226)
 */
export const im_used = 226;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/300)
 */
export const multiple_choices = 300;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301)
 */
export const moved_permanently = 301;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302)
 */
export const found = 302;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/303)
 */
export const see_other = 303;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304)
 */
export const not_modified = 304;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/305)
 */
export const use_proxy = 305;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307)
 */
export const temporary_redirect = 307;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308)
 */
export const permanent_redirect = 308;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400)
 */
export const bad_request = 400;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401)
 */
export const unauthorized = 401;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402)
 */
export const payment_required = 402;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403)
 */
export const forbidden = 403;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404)
 */
export const not_found = 404;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405)
 */
export const method_not_allowed = 405;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406)
 */
export const not_acceptable = 406;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/407)
 */
export const proxy_authentication_required = 407;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/408)
 */
export const request_timeout = 408;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409)
 */
export const conflict = 409;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/410)
 */
export const gone = 410;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/411)
 */
export const length_required = 411;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412)
 */
export const precondition_failed = 412;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413)
 */
export const payload_too_large = 413;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/414)
 */
export const request_uri_too_long = 414;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/415)
 */
export const unsupported_media_type = 415;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/416)
 */
export const requested_range_not_satisfiable = 416;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/417)
 */
export const expectation_failed = 417;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418)
 */
export const im_a_teapot = 418;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/421)
 */
export const misdirected_request = 421;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422)
 */
export const unprocessable_entity = 422;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/423)
 */
export const locked = 423;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/424)
 */
export const failed_dependency = 424;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/426)
 */
export const upgrade_required = 426;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/428)
 */
export const precondition_required = 428;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429)
 */
export const too_many_requests = 429;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/431)
 */
export const request_header_fields_too_large = 431;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/444)
 */
export const connection_closed_without_response = 444;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/451)
 */
export const unavailable_for_legal_reasons = 451;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/499)
 */
export const client_closed_request = 499;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500)
 */
export const internal_server_error = 500;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/501)
 */
export const not_implemented = 501;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/502)
 */
export const bad_gateway = 502;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503)
 */
export const service_unavailable = 503;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/504)
 */
export const gateway_timeout = 504;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/505)
 */
export const http_version_not_supported = 505;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/506)
 */
export const variant_also_negotiates = 506;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/507)
 */
export const insufficient_storage = 507;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/508)
 */
export const loop_detected = 508;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/510)
 */
export const not_extended = 510;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/511)
 */
export const network_authentication_required = 511;

/**
 * [Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/599)
 */
export const network_connect_timeout_error = 599;

/**
 * Classify a status code into a [`StatusType`](#StatusType).
 */
export function classify(status) {
  if (status >= 500) {
    return new ServerError();
  } else if (status >= 400) {
    return new ClientError();
  } else if (status >= 300) {
    return new Redirection();
  } else if (status >= 200) {
    return new Successful();
  } else {
    return new Informational();
  }
}
