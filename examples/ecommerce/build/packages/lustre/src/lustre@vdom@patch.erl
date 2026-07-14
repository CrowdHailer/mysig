-module(lustre@vdom@patch).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/lustre/vdom/patch.gleam").
-export([new/4, replace_text/1, replace_inner_html/1, update/2, move/2, remove/1, replace/2, insert/2, is_empty/1, add_parent/2, to_json/2]).
-export_type([patch/1, change/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-type patch(IOY) :: {patch,
        integer(),
        list(integer()),
        integer(),
        list(change(IOY)),
        list(patch(IOY))}.

-type change(IOZ) :: {replace_text, integer(), binary()} |
    {replace_inner_html, integer(), binary()} |
    {update,
        integer(),
        list(lustre@vdom@vattr:attribute(IOZ)),
        list(lustre@vdom@vattr:attribute(IOZ))} |
    {move, integer(), binary(), integer()} |
    {replace, integer(), integer(), lustre@vdom@vnode:element(IOZ)} |
    {remove, integer(), integer()} |
    {insert, integer(), list(lustre@vdom@vnode:element(IOZ)), integer()}.

-file("src/lustre/vdom/patch.gleam", 77).
?DOC(false).
-spec new(integer(), integer(), list(change(IPA)), list(patch(IPA))) -> patch(IPA).
new(Index, Removed, Changes, Children) ->
    {patch, Index, [], Removed, Changes, Children}.

-file("src/lustre/vdom/patch.gleam", 88).
?DOC(false).
-spec replace_text(binary()) -> change(any()).
replace_text(Content) ->
    {replace_text, 0, Content}.

-file("src/lustre/vdom/patch.gleam", 94).
?DOC(false).
-spec replace_inner_html(binary()) -> change(any()).
replace_inner_html(Inner_html) ->
    {replace_inner_html, 1, Inner_html}.

-file("src/lustre/vdom/patch.gleam", 100).
?DOC(false).
-spec update(
    list(lustre@vdom@vattr:attribute(IPK)),
    list(lustre@vdom@vattr:attribute(IPK))
) -> change(IPK).
update(Added, Removed) ->
    {update, 2, Added, Removed}.

-file("src/lustre/vdom/patch.gleam", 109).
?DOC(false).
-spec move(binary(), integer()) -> change(any()).
move(Key, Before) ->
    {move, 3, Key, Before}.

-file("src/lustre/vdom/patch.gleam", 115).
?DOC(false).
-spec remove(integer()) -> change(any()).
remove(Index) ->
    {remove, 4, Index}.

-file("src/lustre/vdom/patch.gleam", 121).
?DOC(false).
-spec replace(integer(), lustre@vdom@vnode:element(IPU)) -> change(IPU).
replace(Index, With) ->
    {replace, 5, Index, With}.

-file("src/lustre/vdom/patch.gleam", 130).
?DOC(false).
-spec insert(list(lustre@vdom@vnode:element(IPX)), integer()) -> change(IPX).
insert(Children, Before) ->
    {insert, 6, Children, Before}.

-file("src/lustre/vdom/patch.gleam", 139).
?DOC(false).
-spec is_empty(patch(any())) -> boolean().
is_empty(Patch) ->
    case Patch of
        {patch, _, _, 0, [], []} ->
            true;

        _ ->
            false
    end.

-file("src/lustre/vdom/patch.gleam", 148).
?DOC(false).
-spec add_parent(patch(IQD), integer()) -> patch(IQD).
add_parent(Child, Index) ->
    {patch,
        Index,
        [erlang:element(2, Child) | erlang:element(3, Child)],
        erlang:element(4, Child),
        erlang:element(5, Child),
        erlang:element(6, Child)}.

-file("src/lustre/vdom/patch.gleam", 221).
?DOC(false).
-spec insert_to_json(
    integer(),
    list(lustre@vdom@vnode:element(ISU)),
    integer(),
    lustre@internals@mutable_map:mutable_map(fun(() -> lustre@vdom@vnode:element(ISU)), lustre@vdom@vnode:element(ISU))
) -> gleam@json:json().
insert_to_json(Kind, Children, Before, Memos) ->
    _pipe = lustre@internals@json_object_builder:tagged(Kind),
    _pipe@1 = lustre@internals@json_object_builder:int(
        _pipe,
        <<"before"/utf8>>,
        Before
    ),
    _pipe@2 = lustre@internals@json_object_builder:list(
        _pipe@1,
        <<"children"/utf8>>,
        Children,
        fun(_capture) -> lustre@vdom@vnode:to_json(_capture, Memos) end
    ),
    lustre@internals@json_object_builder:build(_pipe@2).

-file("src/lustre/vdom/patch.gleam", 214).
?DOC(false).
-spec replace_to_json(
    integer(),
    integer(),
    lustre@vdom@vnode:element(ISW),
    lustre@internals@mutable_map:mutable_map(fun(() -> lustre@vdom@vnode:element(ISW)), lustre@vdom@vnode:element(ISW))
) -> gleam@json:json().
replace_to_json(Kind, Index, With, Memos) ->
    _pipe = lustre@internals@json_object_builder:tagged(Kind),
    _pipe@1 = lustre@internals@json_object_builder:int(
        _pipe,
        <<"index"/utf8>>,
        Index
    ),
    _pipe@2 = lustre@internals@json_object_builder:json(
        _pipe@1,
        <<"with"/utf8>>,
        lustre@vdom@vnode:to_json(With, Memos)
    ),
    lustre@internals@json_object_builder:build(_pipe@2).

-file("src/lustre/vdom/patch.gleam", 208).
?DOC(false).
-spec remove_to_json(integer(), integer()) -> gleam@json:json().
remove_to_json(Kind, Index) ->
    _pipe = lustre@internals@json_object_builder:tagged(Kind),
    _pipe@1 = lustre@internals@json_object_builder:int(
        _pipe,
        <<"index"/utf8>>,
        Index
    ),
    lustre@internals@json_object_builder:build(_pipe@1).

-file("src/lustre/vdom/patch.gleam", 201).
?DOC(false).
-spec move_to_json(integer(), binary(), integer()) -> gleam@json:json().
move_to_json(Kind, Key, Before) ->
    _pipe = lustre@internals@json_object_builder:tagged(Kind),
    _pipe@1 = lustre@internals@json_object_builder:string(
        _pipe,
        <<"key"/utf8>>,
        Key
    ),
    _pipe@2 = lustre@internals@json_object_builder:int(
        _pipe@1,
        <<"before"/utf8>>,
        Before
    ),
    lustre@internals@json_object_builder:build(_pipe@2).

-file("src/lustre/vdom/patch.gleam", 194).
?DOC(false).
-spec update_to_json(
    integer(),
    list(lustre@vdom@vattr:attribute(any())),
    list(lustre@vdom@vattr:attribute(any()))
) -> gleam@json:json().
update_to_json(Kind, Added, Removed) ->
    _pipe = lustre@internals@json_object_builder:tagged(Kind),
    _pipe@1 = lustre@internals@json_object_builder:list(
        _pipe,
        <<"added"/utf8>>,
        Added,
        fun lustre@vdom@vattr:to_json/1
    ),
    _pipe@2 = lustre@internals@json_object_builder:list(
        _pipe@1,
        <<"removed"/utf8>>,
        Removed,
        fun lustre@vdom@vattr:to_json/1
    ),
    lustre@internals@json_object_builder:build(_pipe@2).

-file("src/lustre/vdom/patch.gleam", 188).
?DOC(false).
-spec replace_inner_html_to_json(integer(), binary()) -> gleam@json:json().
replace_inner_html_to_json(Kind, Inner_html) ->
    _pipe = lustre@internals@json_object_builder:tagged(Kind),
    _pipe@1 = lustre@internals@json_object_builder:string(
        _pipe,
        <<"inner_html"/utf8>>,
        Inner_html
    ),
    lustre@internals@json_object_builder:build(_pipe@1).

-file("src/lustre/vdom/patch.gleam", 182).
?DOC(false).
-spec replace_text_to_json(integer(), binary()) -> gleam@json:json().
replace_text_to_json(Kind, Content) ->
    _pipe = lustre@internals@json_object_builder:tagged(Kind),
    _pipe@1 = lustre@internals@json_object_builder:string(
        _pipe,
        <<"content"/utf8>>,
        Content
    ),
    lustre@internals@json_object_builder:build(_pipe@1).

-file("src/lustre/vdom/patch.gleam", 168).
?DOC(false).
-spec change_to_json(
    change(IQJ),
    lustre@internals@mutable_map:mutable_map(fun(() -> lustre@vdom@vnode:element(IQJ)), lustre@vdom@vnode:element(IQJ))
) -> gleam@json:json().
change_to_json(Change, Memos) ->
    case Change of
        {replace_text, Kind, Content} ->
            replace_text_to_json(Kind, Content);

        {replace_inner_html, Kind@1, Inner_html} ->
            replace_inner_html_to_json(Kind@1, Inner_html);

        {update, Kind@2, Added, Removed} ->
            update_to_json(Kind@2, Added, Removed);

        {move, Kind@3, Key, Before} ->
            move_to_json(Kind@3, Key, Before);

        {remove, Kind@4, Index} ->
            remove_to_json(Kind@4, Index);

        {replace, Kind@5, Index@1, With} ->
            replace_to_json(Kind@5, Index@1, With, Memos);

        {insert, Kind@6, Children, Before@1} ->
            insert_to_json(Kind@6, Children, Before@1, Memos)
    end.

-file("src/lustre/vdom/patch.gleam", 154).
?DOC(false).
-spec to_json(
    patch(IQG),
    lustre@internals@mutable_map:mutable_map(fun(() -> lustre@vdom@vnode:element(IQG)), lustre@vdom@vnode:element(IQG))
) -> gleam@json:json().
to_json(Patch, Memos) ->
    _pipe = lustre@internals@json_object_builder:new(),
    _pipe@1 = lustre@internals@json_object_builder:list(
        _pipe,
        <<"path"/utf8>>,
        erlang:element(3, Patch),
        fun gleam@json:int/1
    ),
    _pipe@2 = lustre@internals@json_object_builder:int(
        _pipe@1,
        <<"index"/utf8>>,
        erlang:element(2, Patch)
    ),
    _pipe@3 = lustre@internals@json_object_builder:int(
        _pipe@2,
        <<"removed"/utf8>>,
        erlang:element(4, Patch)
    ),
    _pipe@4 = lustre@internals@json_object_builder:list(
        _pipe@3,
        <<"changes"/utf8>>,
        erlang:element(5, Patch),
        fun(Change) -> change_to_json(Change, Memos) end
    ),
    _pipe@5 = lustre@internals@json_object_builder:list(
        _pipe@4,
        <<"children"/utf8>>,
        erlang:element(6, Patch),
        fun(Child) -> to_json(Child, Memos) end
    ),
    lustre@internals@json_object_builder:build(_pipe@5).
