import * as $continuation from "../../midas/midas/continuation.mjs";
import * as $snag from "../../snag/snag.mjs";
import { Ok, Error, CustomType as $CustomType } from "../gleam.mjs";

export class Ref extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Asset$Ref = ($0) => new Ref($0);
export const Asset$isRef = (value) => value instanceof Ref;
export const Asset$Ref$0 = (value) => value[0];

export class Done extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Effect$Done = ($0) => new Done($0);
export const Effect$isDone = (value) => value instanceof Done;
export const Effect$Done$0 = (value) => value[0];

export class Abort extends $CustomType {
  constructor($0) {
    super();
    this[0] = $0;
  }
}
export const Effect$Abort = ($0) => new Abort($0);
export const Effect$isAbort = (value) => value instanceof Abort;
export const Effect$Abort$0 = (value) => value[0];

export class Load extends $CustomType {
  constructor(file, resume) {
    super();
    this.file = file;
    this.resume = resume;
  }
}
export const Effect$Load = (file, resume) => new Load(file, resume);
export const Effect$isLoad = (value) => value instanceof Load;
export const Effect$Load$file = (value) => value.file;
export const Effect$Load$0 = (value) => value.file;
export const Effect$Load$resume = (value) => value.resume;
export const Effect$Load$1 = (value) => value.resume;

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

export function src(asset) {
  let path = asset[0];
  return path;
}

export function done(x) {
  return new Done(x);
}

export function return$(x) {
  return $continuation.return$(new Ok(x));
}

export function then$(task, next) {
  return $continuation.then$(
    task,
    (result) => {
      if (result instanceof Ok) {
        let value = result[0];
        return next(value);
      } else {
        let reason = result[0];
        return $continuation.return$(new Error(reason));
      }
    },
  );
}

function result_to_effect(result) {
  if (result instanceof Ok) {
    let value = result[0];
    return new Done(value);
  } else {
    let reason = result[0];
    return new Abort(reason);
  }
}

export function load(file) {
  return new Load(file, result_to_effect);
}

export function bundle(module, function$) {
  return new Bundle(module, function$, result_to_effect);
}

export function do$(eff, then$) {
  if (eff instanceof Done) {
    let value = eff[0];
    return then$(value);
  } else if (eff instanceof Abort) {
    return eff;
  } else if (eff instanceof Load) {
    let lift = eff.file;
    let resume = eff.resume;
    return new Load(lift, (reply) => { return do$(resume(reply), then$); });
  } else {
    let m = eff.module;
    let f = eff.function;
    let resume = eff.resume;
    return new Bundle(m, f, (reply) => { return do$(resume(reply), then$); });
  }
}
