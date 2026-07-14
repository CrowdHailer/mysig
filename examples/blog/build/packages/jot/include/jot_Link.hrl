-record(link, {
    attributes :: gleam@dict:dict(binary(), binary()),
    content :: list(jot:inline()),
    destination :: jot:destination()
}).
