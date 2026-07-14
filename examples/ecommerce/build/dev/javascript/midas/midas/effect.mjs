import * as $request from "../../gleam_http/gleam/http/request.mjs";
import * as $response from "../../gleam_http/gleam/http/response.mjs";
import * as $json from "../../gleam_json/gleam/json.mjs";
import * as $option from "../../gleam_stdlib/gleam/option.mjs";
import * as $uri from "../../gleam_stdlib/gleam/uri.mjs";
import { CustomType as $CustomType } from "../gleam.mjs";
import * as $continuation from "../midas/continuation.mjs";

export class Sha1 extends $CustomType {}
export const HashAlgorithm$Sha1 = () => new Sha1();
export const HashAlgorithm$isSha1 = (value) => value instanceof Sha1;

export class Sha256 extends $CustomType {}
export const HashAlgorithm$Sha256 = () => new Sha256();
export const HashAlgorithm$isSha256 = (value) => value instanceof Sha256;

export class Sha384 extends $CustomType {}
export const HashAlgorithm$Sha384 = () => new Sha384();
export const HashAlgorithm$isSha384 = (value) => value instanceof Sha384;

export class Sha512 extends $CustomType {}
export const HashAlgorithm$Sha512 = () => new Sha512();
export const HashAlgorithm$isSha512 = (value) => value instanceof Sha512;

export class KeyPair extends $CustomType {
  constructor(public$, private$) {
    super();
    this.public = public$;
    this.private = private$;
  }
}
export const KeyPair$KeyPair = (public$, private$) =>
  new KeyPair(public$, private$);
export const KeyPair$isKeyPair = (value) => value instanceof KeyPair;
export const KeyPair$KeyPair$public = (value) => value.public;
export const KeyPair$KeyPair$0 = (value) => value.public;
export const KeyPair$KeyPair$private = (value) => value.private;
export const KeyPair$KeyPair$1 = (value) => value.private;

export class EcKeyGenParams extends $CustomType {
  constructor(name, named_curve) {
    super();
    this.name = name;
    this.named_curve = named_curve;
  }
}
export const KeyPairAlgorithm$EcKeyGenParams = (name, named_curve) =>
  new EcKeyGenParams(name, named_curve);
export const KeyPairAlgorithm$isEcKeyGenParams = (value) =>
  value instanceof EcKeyGenParams;
export const KeyPairAlgorithm$EcKeyGenParams$name = (value) => value.name;
export const KeyPairAlgorithm$EcKeyGenParams$0 = (value) => value.name;
export const KeyPairAlgorithm$EcKeyGenParams$named_curve = (value) =>
  value.named_curve;
export const KeyPairAlgorithm$EcKeyGenParams$1 = (value) => value.named_curve;

export class CanEncrypt extends $CustomType {}
export const KeyUsage$CanEncrypt = () => new CanEncrypt();
export const KeyUsage$isCanEncrypt = (value) => value instanceof CanEncrypt;

export class CanDecrypt extends $CustomType {}
export const KeyUsage$CanDecrypt = () => new CanDecrypt();
export const KeyUsage$isCanDecrypt = (value) => value instanceof CanDecrypt;

export class CanSign extends $CustomType {}
export const KeyUsage$CanSign = () => new CanSign();
export const KeyUsage$isCanSign = (value) => value instanceof CanSign;

export class CanVerify extends $CustomType {}
export const KeyUsage$CanVerify = () => new CanVerify();
export const KeyUsage$isCanVerify = (value) => value instanceof CanVerify;

export class CanDeriveKey extends $CustomType {}
export const KeyUsage$CanDeriveKey = () => new CanDeriveKey();
export const KeyUsage$isCanDeriveKey = (value) => value instanceof CanDeriveKey;

export class CanDeriveBits extends $CustomType {}
export const KeyUsage$CanDeriveBits = () => new CanDeriveBits();
export const KeyUsage$isCanDeriveBits = (value) =>
  value instanceof CanDeriveBits;

export class CanWrapKey extends $CustomType {}
export const KeyUsage$CanWrapKey = () => new CanWrapKey();
export const KeyUsage$isCanWrapKey = (value) => value instanceof CanWrapKey;

export class CanUnwrapKey extends $CustomType {}
export const KeyUsage$CanUnwrapKey = () => new CanUnwrapKey();
export const KeyUsage$isCanUnwrapKey = (value) => value instanceof CanUnwrapKey;

export class EcdsaParams extends $CustomType {
  constructor(hash) {
    super();
    this.hash = hash;
  }
}
export const SignAlgorithm$EcdsaParams = (hash) => new EcdsaParams(hash);
export const SignAlgorithm$isEcdsaParams = (value) =>
  value instanceof EcdsaParams;
export const SignAlgorithm$EcdsaParams$hash = (value) => value.hash;
export const SignAlgorithm$EcdsaParams$0 = (value) => value.hash;

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

export class UnableToReadBody extends $CustomType {}
export const FetchError$UnableToReadBody = () => new UnableToReadBody();
export const FetchError$isUnableToReadBody = (value) =>
  value instanceof UnableToReadBody;

export class NotImplemented extends $CustomType {}
export const FetchError$NotImplemented = () => new NotImplemented();
export const FetchError$isNotImplemented = (value) =>
  value instanceof NotImplemented;

export function describe_fetch_error(reason) {
  if (reason instanceof NetworkError) {
    let message = reason[0];
    return "Network Error: " + message;
  } else if (reason instanceof UnableToReadBody) {
    return "UnableToReadBody";
  } else {
    return "NotImplemented";
  }
}
