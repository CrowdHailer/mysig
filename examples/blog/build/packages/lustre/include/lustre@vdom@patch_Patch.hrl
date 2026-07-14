-record(patch, {
    index :: integer(),
    path :: list(integer()),
    removed :: integer(),
    changes :: list(lustre@vdom@patch:change(any())),
    children :: list(lustre@vdom@patch:patch(any()))
}).
