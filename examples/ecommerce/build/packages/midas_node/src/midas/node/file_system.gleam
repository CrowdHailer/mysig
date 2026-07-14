import filepath
import gleam/list
import gleam/result
import gleam/string
import simplifile
import snag

pub fn current_directory() {
  simplifile.current_directory()
  |> result.map_error(fn(reason) { snag.new(simplifile.describe_error(reason)) })
  |> snag.context("Could not return current directory")
}

pub fn get_files(dir) {
  simplifile.get_files(dir)
  |> result.map_error(fn(reason) { snag.new(simplifile.describe_error(reason)) })
  |> snag.context("Could not read directory: " <> dir)
}

pub fn read_directory(dir) {
  simplifile.read_directory(dir)
  |> result.map_error(fn(reason) { snag.new(simplifile.describe_error(reason)) })
  |> snag.context("Could not read directory: " <> dir)
}

pub fn create_directory_all(dir) {
  simplifile.create_directory_all(dir)
  |> result.map_error(fn(reason) { snag.new(simplifile.describe_error(reason)) })
  |> snag.context(string.concat(["failed to create directory '", dir, "'"]))
}

// Not in simplifile. I'd like it, works only for flat atm
pub fn read_directory_content(dir) {
  use children <- result.try(
    simplifile.read_directory(dir)
    |> result.map_error(fn(reason) {
      snag.new(simplifile.describe_error(reason))
    })
    |> snag.context("Could not read directory: " <> dir),
  )

  list.try_map(children, fn(child) {
    let path = filepath.join(dir, child)
    use content <- result.try(
      simplifile.read_bits(path)
      |> result.map_error(fn(reason) {
        snag.new(simplifile.describe_error(reason))
      })
      |> snag.context("Could not read file: " <> path),
    )
    Ok(#(child, content))
  })
}

// I always read bits
pub fn read(filename) {
  simplifile.read_bits(filename)
  |> result.map_error(fn(reason) { snag.new(simplifile.describe_error(reason)) })
  |> snag.context(string.concat(["Could not read file '", filename, "'"]))
}

pub fn write(filename, bytes) {
  simplifile.write_bits(filename, bytes)
  |> result.map_error(fn(reason) { snag.new(simplifile.describe_error(reason)) })
  |> snag.context(string.concat(["Could not write file '", filename, "'"]))
}
