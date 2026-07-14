-record(document, {
    content :: list(jot:container()),
    references :: gleam@dict:dict(binary(), binary()),
    reference_attributes :: gleam@dict:dict(binary(), gleam@dict:dict(binary(), binary())),
    footnotes :: gleam@dict:dict(binary(), list(jot:container()))
}).
