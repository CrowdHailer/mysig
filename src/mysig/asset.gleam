import snag.{type Snag}

pub type Asset {
  Ref(String)
}

pub fn src(asset) {
  let Ref(path) = asset
  path
}

pub type Effect(a) {
  Done(a)
  Abort(Snag)
  Load(file: String, resume: fn(Result(Asset, Snag)) -> Effect(a))
  Bundle(
    module: String,
    function: String,
    resume: fn(Result(Asset, Snag)) -> Effect(a),
  )
}

pub fn done(x) {
  Done(x)
}

pub fn load(file) {
  Load(file, result_to_effect)
}

pub fn bundle(module, function) {
  Bundle(module, function, result_to_effect)
}

fn result_to_effect(result) {
  case result {
    Ok(value) -> Done(value)
    Error(reason) -> Abort(reason)
  }
}

pub fn do(eff, then) {
  case eff {
    Done(value) -> then(value)
    Abort(reason) -> Abort(reason)
    Bundle(m, f, resume) -> Bundle(m, f, fn(reply) { do(resume(reply), then) })
    Load(lift, resume) -> Load(lift, fn(reply) { do(resume(reply), then) })
  }
}
