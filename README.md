# mysig

Cosy toolkit to make you feel at home.

[![Package Version](https://img.shields.io/hexpm/v/mysig)](https://hex.pm/packages/mysig)
[![Hex Docs](https://img.shields.io/badge/hex-docs-ffaff3)](https://hexdocs.pm/mysig/)

```sh
gleam add mysig
```

The project include several tools that I have for making it easier to build apps with Gleam (and Lustre).
*For the moment the project assumes lustre but that constraint should relax over time.*

The project acts as a bundler for Gleam web applications. It tries to.

- Avoid compiler magic
- Create the same out put in dev as in prod.
- Lazily build content in dev to remain fast

## Concepts

### Routes

Routes are the tree of endpoints that your application has.

### Assets

The main bundler is defined in the asset modules.
- `mysig/asset` allows you to declare what assets a component/page has
- `mysig/server` will collect all the assets referenced from the file system
- `mysig/client` will replace all asset lookup with fingerprinted values created by the server



### Other approaches to bundling

Mysig aims to be simple and **avoid compiler magic**. For example:

```js
import asset from "./cat.jpg"
```

This API is ergonomic results in build tooling that needs to understand the JavaScript syntax.
I don't want to build another Gleam compiler.

My current goal is to make a data structure that represents the content of a web application efficiently.

The datastructure should be lazy so that in dev you can build quickly on demand, and for production walk the whole data structure eagerly.
In this way **Development should product the same artifacts as Production**.

#### Gathering references at runtime only works for static site generation.

For example a view function.
```rs
pub fn render(bundle, state) {
  case state {
    True -> {
      use logo_bits <- t.do(t.read("logo.png"))
      use logo_src <- t.do(asset.png("logo", logo_bits))
      // build wont find this if state for SSR is false
    }
    False
  }
}
```

Therefore a runtime API needs to require building of assets to happen before any state control flow
```rs
pub fn view() {
  use asset <- load()
  fn(state) {
    // render html
  }
}
```
Returning the render function from a Build task ensures that all assets are referenced before any control flow.
However the API gets more verbose.

A new data structure representing if,loop,await in templates would allow walking the whole tree.

#### Asset lookup and build tool

If there was some way to specify all the assets you could have a build task

Start with a toml declaration and run `gleam run mysig/manifest/gen`
Works well with autocomplete in the editor. Doesn't usage discovery of assets, it also requires a total rebuild for any asset changes.

- Images don't update very often
- A task to create assets allows them to stay in git.

#### Investigating the lustre content

Walking the lustre tree and finding all source attributes would have the same problems as runtime generation.
i.e. if rendered on the server with a specific state there would be no way to discover assets that where no used with that state.

#### Find and replace in bundle

Once bundling we can find and replace all references using a magic string "__asset__/foo.png?w=20"

### Older tools in this repo

These are still include as they have some nice approaches but I think they are probably superceeded by the main approach above

- open_graph, helpful builders
- local, services static set of files

## Live reloading for local dev

In the `mysig/local` module, works with watching midas tasks.

See https://vimeo.com/1030747035

### Other Gleam tools

##### Pensive https://github.com/Pevensie/pevensie
A backend framework focusing on Auth and DB integration Mysig is instead a metaframework for front end first apps.

##### Arctic https://github.com/RyanBrewer317/arctic
Focuses on pulling content from the file system and composing parsers.
I want Mysig to focus on working with already structured data and ignoring the file system as much as possible.

##### Meadow https://github.com/JoelVerm/meadow
Not very active focuses on adding server signals to a solidjs client. I like the sound of this approach.

## Credit

Created for the [EYG](https://eyg.run/) homepage. EYG is a new integration focused programming language.

If startup is lazy then we just restart on any code change This would need file watching to trigger the restart
The client can inject to listen to a websocket and if it looses connection or reload the page when a new connection arrises
Gleam build is fast

Entry points can be listed when building

String replace involves parsing eventually. magic string is possible

Gen is not lazy BUT we cannot see all things unless walk the code
build using a mysig/manifest/gen
lustre dev tools finds main from toml name https://github.com/lustre-labs/dev-tools/blob/main/src/lustre_dev_tools/project.gleam#L86