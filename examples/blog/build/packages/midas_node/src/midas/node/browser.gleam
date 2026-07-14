import gleam/string
import plinth/node/child_process

pub fn open(url: String) {
  // string.inspect wraps url in quotes and escapes any quote marks if they exist
  let command = string.append("open ", string.inspect(url))
  child_process.exec(command)
}
