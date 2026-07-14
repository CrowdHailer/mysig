-record(heading, {
    attributes :: gleam@dict:dict(binary(), binary()),
    level :: integer(),
    content :: list(jot:inline())
}).
