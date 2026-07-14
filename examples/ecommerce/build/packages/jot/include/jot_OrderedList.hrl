-record(ordered_list, {
    layout :: jot:list_layout(),
    punctuation :: jot:ordinal_punctuation(),
    ordinal :: jot:ordinal_style(),
    start :: integer(),
    items :: list(list(jot:container()))
}).
