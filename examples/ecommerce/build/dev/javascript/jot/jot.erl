-module(jot).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/jot.gleam").
-export([document_to_html/1, parse/1, to_html/1, inner_text/1]).
-export_type([document/0, container/0, bullet_style/0, ordinal_punctuation/0, ordinal_style/0, list_style/0, inline/0, list_layout/0, destination/0, refs/0, splitters/0, render_refs/0, generated_html/0, trim/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

-type document() :: {document,
        list(container()),
        gleam@dict:dict(binary(), binary()),
        gleam@dict:dict(binary(), gleam@dict:dict(binary(), binary())),
        gleam@dict:dict(binary(), list(container()))}.

-type container() :: thematic_break |
    {paragraph, gleam@dict:dict(binary(), binary()), list(inline())} |
    {heading, gleam@dict:dict(binary(), binary()), integer(), list(inline())} |
    {codeblock,
        gleam@dict:dict(binary(), binary()),
        gleam@option:option(binary()),
        binary()} |
    {raw_block, binary()} |
    {bullet_list, list_layout(), bullet_style(), list(list(container()))} |
    {ordered_list,
        list_layout(),
        ordinal_punctuation(),
        ordinal_style(),
        integer(),
        list(list(container()))} |
    {block_quote, gleam@dict:dict(binary(), binary()), list(container())} |
    {'div',
        gleam@option:option(binary()),
        gleam@dict:dict(binary(), binary()),
        list(container())}.

-type bullet_style() :: bullet_dash | bullet_star | bullet_plus.

-type ordinal_punctuation() :: full_stop | single_paren | double_paren.

-type ordinal_style() :: numeric_ordinal |
    lower_alpha_ordinal |
    upper_alpha_ordinal.

-type list_style() :: {bullet, bullet_style()} |
    {ordered, integer(), ordinal_punctuation(), ordinal_style()}.

-type inline() :: linebreak |
    non_breaking_space |
    {text, binary()} |
    {link, gleam@dict:dict(binary(), binary()), list(inline()), destination()} |
    {image, gleam@dict:dict(binary(), binary()), list(inline()), destination()} |
    {span, gleam@dict:dict(binary(), binary()), list(inline())} |
    {emphasis, list(inline())} |
    {strong, list(inline())} |
    {delete, list(inline())} |
    {insert, list(inline())} |
    {mark, list(inline())} |
    {superscript, list(inline())} |
    {subscript, list(inline())} |
    {footnote, binary()} |
    {code, binary()} |
    {math_inline, binary()} |
    {math_display, binary()} |
    {symbol, binary()}.

-type list_layout() :: tight | loose.

-type destination() :: {reference, binary()} | {url, binary()}.

-type refs() :: {refs,
        gleam@dict:dict(binary(), binary()),
        gleam@dict:dict(binary(), gleam@dict:dict(binary(), binary())),
        gleam@dict:dict(binary(), integer()),
        gleam@dict:dict(binary(), list(container()))}.

-type splitters() :: {splitters,
        splitter:splitter(),
        splitter:splitter(),
        splitter:splitter(),
        splitter:splitter(),
        splitter:splitter()}.

-type render_refs() :: {render_refs,
        gleam@dict:dict(binary(), binary()),
        gleam@dict:dict(binary(), gleam@dict:dict(binary(), binary())),
        gleam@dict:dict(binary(), list(container()))}.

-type generated_html() :: {generated_html,
        binary(),
        list({integer(), binary()})}.

-type trim() :: no_trim | trim_last.

-file("src/jot.gleam", 22).
-spec add_attribute(gleam@dict:dict(binary(), binary()), binary(), binary()) -> gleam@dict:dict(binary(), binary()).
add_attribute(Attributes, Key, Value) ->
    case Key of
        <<"class"/utf8>> ->
            gleam@dict:upsert(Attributes, Key, fun(Previous) -> case Previous of
                        none ->
                            Value;

                        {some, Previous@1} ->
                            <<<<Previous@1/binary, " "/utf8>>/binary,
                                Value/binary>>
                    end end);

        _ ->
            gleam@dict:insert(Attributes, Key, Value)
    end.

-file("src/jot.gleam", 2723).
-spec append_to_html(generated_html(), binary()) -> generated_html().
append_to_html(Original_html, Str) ->
    {generated_html,
        <<(erlang:element(2, Original_html))/binary, Str/binary>>,
        erlang:element(3, Original_html)}.

-file("src/jot.gleam", 2753).
-spec close_tag(generated_html(), binary()) -> generated_html().
close_tag(Initial_html, Tag) ->
    {generated_html,
        <<<<<<(erlang:element(2, Initial_html))/binary, "</"/utf8>>/binary,
                Tag/binary>>/binary,
            ">"/utf8>>,
        erlang:element(3, Initial_html)}.

-file("src/jot.gleam", 2706).
-spec get_new_footnotes(
    generated_html(),
    generated_html(),
    list({integer(), binary()})
) -> list({integer(), binary()}).
get_new_footnotes(Original_html, New_html, Acc) ->
    case {erlang:element(3, Original_html), erlang:element(3, New_html)} of
        {[Original | _], [New | _]} when Original =:= New ->
            Acc;

        {_, [New@1 | Rest]} ->
            get_new_footnotes(
                Original_html,
                {generated_html, erlang:element(2, New_html), Rest},
                [New@1 | Acc]
            );

        {_, _} ->
            Acc
    end.

-file("src/jot.gleam", 3049).
-spec ordered_attributes_to_html(list({binary(), binary()}), binary()) -> binary().
ordered_attributes_to_html(Attributes, Html) ->
    gleam@list:fold(
        Attributes,
        Html,
        fun(Html@1, Pair) ->
            <<<<<<<<<<Html@1/binary, " "/utf8>>/binary,
                            (erlang:element(1, Pair))/binary>>/binary,
                        "=\""/utf8>>/binary,
                    (erlang:element(2, Pair))/binary>>/binary,
                "\""/utf8>>
        end
    ).

-file("src/jot.gleam", 3039).
-spec attributes_to_html(binary(), gleam@dict:dict(binary(), binary())) -> binary().
attributes_to_html(Html, Attributes) ->
    _pipe = Attributes,
    _pipe@1 = maps:to_list(_pipe),
    _pipe@2 = gleam@list:sort(
        _pipe@1,
        fun(A, B) ->
            gleam@string:compare(erlang:element(1, A), erlang:element(1, B))
        end
    ),
    ordered_attributes_to_html(_pipe@2, Html).

-file("src/jot.gleam", 2727).
-spec open_tag(generated_html(), binary(), gleam@dict:dict(binary(), binary())) -> generated_html().
open_tag(Initial_html, Tag, Attributes) ->
    Html = <<<<(erlang:element(2, Initial_html))/binary, "<"/utf8>>/binary,
        Tag/binary>>,
    {generated_html,
        <<(attributes_to_html(Html, Attributes))/binary, ">"/utf8>>,
        erlang:element(3, Initial_html)}.

-file("src/jot.gleam", 2741).
-spec open_tag_ordered_attributes(
    generated_html(),
    binary(),
    list({binary(), binary()})
) -> generated_html().
open_tag_ordered_attributes(Initial_html, Tag, Attributes) ->
    Html = <<<<(erlang:element(2, Initial_html))/binary, "<"/utf8>>/binary,
        Tag/binary>>,
    {generated_html,
        <<(ordered_attributes_to_html(Attributes, Html))/binary, ">"/utf8>>,
        erlang:element(3, Initial_html)}.

-file("src/jot.gleam", 2696).
-spec add_footnote_link(generated_html(), binary()) -> generated_html().
add_footnote_link(Html, Footnote_number) ->
    _pipe = Html,
    _pipe@1 = open_tag_ordered_attributes(
        _pipe,
        <<"a"/utf8>>,
        [{<<"href"/utf8>>, <<"#fnref"/utf8, Footnote_number/binary>>},
            {<<"role"/utf8>>, <<"doc-backlink"/utf8>>}]
    ),
    _pipe@2 = append_to_html(_pipe@1, <<"↩︎"/utf8>>),
    close_tag(_pipe@2, <<"a"/utf8>>).

-file("src/jot.gleam", 2983).
-spec find_footnote_number(
    list({integer(), binary()}),
    binary(),
    list({integer(), binary()})
) -> {binary(), list({integer(), binary()})}.
find_footnote_number(Footnotes_to_check, Reference, Used_footnotes) ->
    case Footnotes_to_check of
        [] ->
            Next_number = begin
                _pipe = Used_footnotes,
                _pipe@1 = gleam@list:first(_pipe),
                _pipe@2 = gleam@result:map(
                    _pipe@1,
                    fun(F) -> erlang:element(1, F) end
                ),
                gleam@result:unwrap(_pipe@2, 0)
            end
            + 1,
            {erlang:integer_to_binary(Next_number),
                [{Next_number, Reference} | Used_footnotes]};

        [{Index, Ref} | _] when Reference =:= Ref ->
            {erlang:integer_to_binary(Index), Used_footnotes};

        [_ | Rest] ->
            find_footnote_number(Rest, Reference, Used_footnotes)
    end.

-file("src/jot.gleam", 1968).
-spec take_inline_text(list(inline()), binary()) -> binary().
take_inline_text(Inlines, Acc) ->
    case Inlines of
        [] ->
            Acc;

        [First | Rest] ->
            case First of
                non_breaking_space ->
                    take_inline_text(Rest, <<Acc/binary, " "/utf8>>);

                {text, Text} ->
                    take_inline_text(Rest, <<Acc/binary, Text/binary>>);

                {code, Text} ->
                    take_inline_text(Rest, <<Acc/binary, Text/binary>>);

                {math_inline, Text} ->
                    take_inline_text(Rest, <<Acc/binary, Text/binary>>);

                {math_display, Text} ->
                    take_inline_text(Rest, <<Acc/binary, Text/binary>>);

                {symbol, Text} ->
                    take_inline_text(Rest, <<Acc/binary, Text/binary>>);

                {strong, Inlines@1} ->
                    take_inline_text(lists:append(Inlines@1, Rest), Acc);

                {emphasis, Inlines@1} ->
                    take_inline_text(lists:append(Inlines@1, Rest), Acc);

                {delete, Inlines@1} ->
                    take_inline_text(lists:append(Inlines@1, Rest), Acc);

                {insert, Inlines@1} ->
                    take_inline_text(lists:append(Inlines@1, Rest), Acc);

                {mark, Inlines@1} ->
                    take_inline_text(lists:append(Inlines@1, Rest), Acc);

                {superscript, Inlines@1} ->
                    take_inline_text(lists:append(Inlines@1, Rest), Acc);

                {subscript, Inlines@1} ->
                    take_inline_text(lists:append(Inlines@1, Rest), Acc);

                {link, _, Nested, _} ->
                    Acc@1 = take_inline_text(Nested, Acc),
                    take_inline_text(Rest, Acc@1);

                {image, _, Nested, _} ->
                    Acc@1 = take_inline_text(Nested, Acc),
                    take_inline_text(Rest, Acc@1);

                {span, _, Nested} ->
                    Acc@1 = take_inline_text(Nested, Acc),
                    take_inline_text(Rest, Acc@1);

                linebreak ->
                    take_inline_text(Rest, Acc);

                {footnote, _} ->
                    take_inline_text(Rest, Acc)
            end
    end.

-file("src/jot.gleam", 3023).
-spec destination_attribute(binary(), destination(), render_refs()) -> gleam@dict:dict(binary(), binary()).
destination_attribute(Key, Destination, Refs) ->
    Dict = maps:new(),
    case Destination of
        {url, Url} ->
            gleam@dict:insert(Dict, Key, houdini:escape(Url));

        {reference, Id} ->
            case gleam_stdlib:map_get(erlang:element(2, Refs), Id) of
                {ok, Url@1} ->
                    gleam@dict:insert(Dict, Key, houdini:escape(Url@1));

                _ ->
                    Dict
            end
    end.

-file("src/jot.gleam", 3011).
-spec get_reference_attributes(destination(), render_refs()) -> gleam@dict:dict(binary(), binary()).
get_reference_attributes(Destination, Refs) ->
    case Destination of
        {url, _} ->
            maps:new();

        {reference, Id} ->
            _pipe = gleam_stdlib:map_get(erlang:element(3, Refs), Id),
            gleam@result:unwrap(_pipe, maps:new())
    end.

-file("src/jot.gleam", 2830).
-spec inline_to_html(generated_html(), inline(), render_refs(), trim()) -> generated_html().
inline_to_html(Html, Inline, Refs, Trim) ->
    case Inline of
        {math_inline, Latex} ->
            Math_class = maps:from_list(
                [{<<"class"/utf8>>, <<"math inline"/utf8>>}]
            ),
            Latex@1 = <<<<"\\("/utf8, (houdini:escape(Latex))/binary>>/binary,
                "\\)"/utf8>>,
            _pipe = Html,
            _pipe@1 = open_tag(_pipe, <<"span"/utf8>>, Math_class),
            _pipe@2 = append_to_html(_pipe@1, Latex@1),
            close_tag(_pipe@2, <<"span"/utf8>>);

        {math_display, Latex@2} ->
            Math_class@1 = maps:from_list(
                [{<<"class"/utf8>>, <<"math display"/utf8>>}]
            ),
            Latex@3 = <<<<"\\["/utf8, (houdini:escape(Latex@2))/binary>>/binary,
                "\\]"/utf8>>,
            _pipe@3 = Html,
            _pipe@4 = open_tag(_pipe@3, <<"span"/utf8>>, Math_class@1),
            _pipe@5 = append_to_html(_pipe@4, Latex@3),
            close_tag(_pipe@5, <<"span"/utf8>>);

        non_breaking_space ->
            _pipe@6 = Html,
            append_to_html(_pipe@6, <<"&nbsp;"/utf8>>);

        linebreak ->
            _pipe@7 = Html,
            _pipe@8 = open_tag(_pipe@7, <<"br"/utf8>>, maps:new()),
            append_to_html(_pipe@8, <<"\n"/utf8>>);

        {text, Text} ->
            Text@1 = houdini:escape(Text),
            case Trim of
                no_trim ->
                    append_to_html(Html, Text@1);

                trim_last ->
                    append_to_html(Html, gleam@string:trim_end(Text@1))
            end;

        {strong, Inlines} ->
            _pipe@9 = Html,
            _pipe@10 = open_tag(_pipe@9, <<"strong"/utf8>>, maps:new()),
            _pipe@11 = inlines_to_html(_pipe@10, Inlines, Refs, Trim),
            close_tag(_pipe@11, <<"strong"/utf8>>);

        {emphasis, Inlines@1} ->
            _pipe@12 = Html,
            _pipe@13 = open_tag(_pipe@12, <<"em"/utf8>>, maps:new()),
            _pipe@14 = inlines_to_html(_pipe@13, Inlines@1, Refs, Trim),
            close_tag(_pipe@14, <<"em"/utf8>>);

        {delete, Inlines@2} ->
            _pipe@15 = Html,
            _pipe@16 = open_tag(_pipe@15, <<"del"/utf8>>, maps:new()),
            _pipe@17 = inlines_to_html(_pipe@16, Inlines@2, Refs, no_trim),
            close_tag(_pipe@17, <<"del"/utf8>>);

        {insert, Inlines@3} ->
            _pipe@18 = Html,
            _pipe@19 = open_tag(_pipe@18, <<"ins"/utf8>>, maps:new()),
            _pipe@20 = inlines_to_html(_pipe@19, Inlines@3, Refs, no_trim),
            close_tag(_pipe@20, <<"ins"/utf8>>);

        {mark, Inlines@4} ->
            _pipe@21 = Html,
            _pipe@22 = open_tag(_pipe@21, <<"mark"/utf8>>, maps:new()),
            _pipe@23 = inlines_to_html(_pipe@22, Inlines@4, Refs, no_trim),
            close_tag(_pipe@23, <<"mark"/utf8>>);

        {superscript, Inlines@5} ->
            _pipe@24 = Html,
            _pipe@25 = open_tag(_pipe@24, <<"sup"/utf8>>, maps:new()),
            _pipe@26 = inlines_to_html(_pipe@25, Inlines@5, Refs, no_trim),
            close_tag(_pipe@26, <<"sup"/utf8>>);

        {subscript, Inlines@6} ->
            _pipe@27 = Html,
            _pipe@28 = open_tag(_pipe@27, <<"sub"/utf8>>, maps:new()),
            _pipe@29 = inlines_to_html(_pipe@28, Inlines@6, Refs, no_trim),
            close_tag(_pipe@29, <<"sub"/utf8>>);

        {link, Attributes, Text@2, Destination} ->
            Ref_attrs = get_reference_attributes(Destination, Refs),
            Attrs = begin
                _pipe@30 = Ref_attrs,
                _pipe@31 = maps:merge(
                    _pipe@30,
                    destination_attribute(<<"href"/utf8>>, Destination, Refs)
                ),
                maps:merge(_pipe@31, Attributes)
            end,
            _pipe@32 = Html,
            _pipe@33 = open_tag(_pipe@32, <<"a"/utf8>>, Attrs),
            _pipe@34 = inlines_to_html(_pipe@33, Text@2, Refs, Trim),
            close_tag(_pipe@34, <<"a"/utf8>>);

        {image, Attributes@1, Text@3, Destination@1} ->
            Ref_attrs@1 = get_reference_attributes(Destination@1, Refs),
            Attrs@1 = begin
                _pipe@35 = Ref_attrs@1,
                _pipe@36 = maps:merge(
                    _pipe@35,
                    destination_attribute(<<"src"/utf8>>, Destination@1, Refs)
                ),
                _pipe@37 = gleam@dict:insert(
                    _pipe@36,
                    <<"alt"/utf8>>,
                    houdini:escape(take_inline_text(Text@3, <<""/utf8>>))
                ),
                maps:merge(_pipe@37, Attributes@1)
            end,
            _pipe@38 = Html,
            open_tag(_pipe@38, <<"img"/utf8>>, Attrs@1);

        {symbol, Content} ->
            Attrs@2 = begin
                _pipe@39 = maps:new(),
                add_attribute(_pipe@39, <<"class"/utf8>>, <<"symbol"/utf8>>)
            end,
            _pipe@40 = Html,
            _pipe@41 = open_tag(_pipe@40, <<"span"/utf8>>, Attrs@2),
            _pipe@42 = append_to_html(_pipe@41, Content),
            close_tag(_pipe@42, <<"span"/utf8>>);

        {span, Attributes@2, Inlines@7} ->
            _pipe@43 = Html,
            _pipe@44 = open_tag(_pipe@43, <<"span"/utf8>>, Attributes@2),
            _pipe@45 = inlines_to_html(_pipe@44, Inlines@7, Refs, Trim),
            close_tag(_pipe@45, <<"span"/utf8>>);

        {code, Content@1} ->
            Content@2 = houdini:escape(Content@1),
            _pipe@46 = Html,
            _pipe@47 = open_tag(_pipe@46, <<"code"/utf8>>, maps:new()),
            _pipe@48 = append_to_html(_pipe@47, Content@2),
            close_tag(_pipe@48, <<"code"/utf8>>);

        {footnote, Reference} ->
            {Footnote_number, New_used_footnotes} = find_footnote_number(
                erlang:element(3, Html),
                Reference,
                erlang:element(3, Html)
            ),
            Footnote_attrs = [{<<"id"/utf8>>,
                    <<"fnref"/utf8, Footnote_number/binary>>},
                {<<"href"/utf8>>, <<"#fn"/utf8, Footnote_number/binary>>},
                {<<"role"/utf8>>, <<"doc-noteref"/utf8>>}],
            Updated_html = begin
                _pipe@49 = Html,
                _pipe@50 = open_tag_ordered_attributes(
                    _pipe@49,
                    <<"a"/utf8>>,
                    Footnote_attrs
                ),
                _pipe@51 = append_to_html(
                    _pipe@50,
                    <<<<"<sup>"/utf8, Footnote_number/binary>>/binary,
                        "</sup>"/utf8>>
                ),
                close_tag(_pipe@51, <<"a"/utf8>>)
            end,
            {generated_html,
                erlang:element(2, Updated_html),
                New_used_footnotes}
    end.

-file("src/jot.gleam", 2808).
-spec inlines_to_html(generated_html(), list(inline()), render_refs(), trim()) -> generated_html().
inlines_to_html(Html, Inlines, Refs, Trim) ->
    case Inlines of
        [] ->
            Html;

        [Inline] when Trim =:= trim_last ->
            _pipe = Html,
            inline_to_html(_pipe, Inline, Refs, Trim);

        [Inline@1 | Rest] ->
            _pipe@1 = Html,
            _pipe@2 = inline_to_html(_pipe@1, Inline@1, Refs, no_trim),
            inlines_to_html(_pipe@2, Rest, Refs, Trim)
    end.

-file("src/jot.gleam", 2543).
-spec containers_to_html(list(container()), render_refs(), generated_html()) -> generated_html().
containers_to_html(Containers, Refs, Html) ->
    case Containers of
        [] ->
            Html;

        [Container | Rest] ->
            Html@1 = container_to_html(Html, Container, Refs),
            containers_to_html(Rest, Refs, Html@1)
    end.

-file("src/jot.gleam", 2762).
-spec list_items_to_html(
    generated_html(),
    list_layout(),
    list(list(container())),
    render_refs()
) -> generated_html().
list_items_to_html(Html, Layout, Items, Refs) ->
    case Items of
        [] ->
            Html;

        [[{paragraph, _, Inlines}] | Rest] when Layout =:= tight ->
            _pipe = Html,
            _pipe@1 = open_tag(_pipe, <<"li"/utf8>>, maps:new()),
            _pipe@2 = append_to_html(_pipe@1, <<"\n"/utf8>>),
            _pipe@3 = inlines_to_html(_pipe@2, Inlines, Refs, trim_last),
            _pipe@4 = append_to_html(_pipe@3, <<"\n"/utf8>>),
            _pipe@5 = close_tag(_pipe@4, <<"li"/utf8>>),
            _pipe@6 = append_to_html(_pipe@5, <<"\n"/utf8>>),
            list_items_to_html(_pipe@6, Layout, Rest, Refs);

        [[{paragraph, _, Inlines@1}, Nested_list | Item_rest] | Rest@1] when Layout =:= tight ->
            _pipe@7 = Html,
            _pipe@8 = open_tag(_pipe@7, <<"li"/utf8>>, maps:new()),
            _pipe@9 = append_to_html(_pipe@8, <<"\n"/utf8>>),
            _pipe@10 = inlines_to_html(_pipe@9, Inlines@1, Refs, trim_last),
            _pipe@11 = append_to_html(_pipe@10, <<"\n"/utf8>>),
            _pipe@12 = containers_to_html(
                [Nested_list | Item_rest],
                Refs,
                _pipe@11
            ),
            _pipe@13 = close_tag(_pipe@12, <<"li"/utf8>>),
            _pipe@14 = append_to_html(_pipe@13, <<"\n"/utf8>>),
            list_items_to_html(_pipe@14, Layout, Rest@1, Refs);

        [Item | Rest@2] ->
            _pipe@15 = Html,
            _pipe@16 = open_tag(_pipe@15, <<"li"/utf8>>, maps:new()),
            _pipe@17 = append_to_html(_pipe@16, <<"\n"/utf8>>),
            _pipe@18 = containers_to_html(Item, Refs, _pipe@17),
            _pipe@19 = close_tag(_pipe@18, <<"li"/utf8>>),
            _pipe@20 = append_to_html(_pipe@19, <<"\n"/utf8>>),
            list_items_to_html(_pipe@20, Layout, Rest@2, Refs)
    end.

-file("src/jot.gleam", 2557).
-spec container_to_html(generated_html(), container(), render_refs()) -> generated_html().
container_to_html(Html, Container, Refs) ->
    New_html = case Container of
        thematic_break ->
            _pipe = Html,
            open_tag(_pipe, <<"hr"/utf8>>, maps:new());

        {paragraph, Attrs, Inlines} ->
            _pipe@1 = Html,
            _pipe@2 = open_tag(_pipe@1, <<"p"/utf8>>, Attrs),
            _pipe@3 = inlines_to_html(_pipe@2, Inlines, Refs, trim_last),
            close_tag(_pipe@3, <<"p"/utf8>>);

        {codeblock, Attrs@1, Language, Content} ->
            Code_attrs = case Language of
                {some, Lang} ->
                    add_attribute(
                        Attrs@1,
                        <<"class"/utf8>>,
                        <<"language-"/utf8, Lang/binary>>
                    );

                none ->
                    Attrs@1
            end,
            _pipe@4 = Html,
            _pipe@5 = open_tag(_pipe@4, <<"pre"/utf8>>, maps:new()),
            _pipe@6 = open_tag(_pipe@5, <<"code"/utf8>>, Code_attrs),
            _pipe@7 = append_to_html(_pipe@6, houdini:escape(Content)),
            _pipe@8 = close_tag(_pipe@7, <<"code"/utf8>>),
            close_tag(_pipe@8, <<"pre"/utf8>>);

        {heading, Attrs@2, Level, Inlines@1} ->
            Tag = <<"h"/utf8, (erlang:integer_to_binary(Level))/binary>>,
            _pipe@9 = Html,
            _pipe@10 = open_tag(_pipe@9, Tag, Attrs@2),
            _pipe@11 = inlines_to_html(_pipe@10, Inlines@1, Refs, trim_last),
            close_tag(_pipe@11, Tag);

        {raw_block, Content@1} ->
            {generated_html,
                <<(erlang:element(2, Html))/binary, Content@1/binary>>,
                erlang:element(3, Html)};

        {bullet_list, Layout, _, Items} ->
            _pipe@12 = Html,
            _pipe@13 = open_tag(_pipe@12, <<"ul"/utf8>>, maps:new()),
            _pipe@14 = append_to_html(_pipe@13, <<"\n"/utf8>>),
            _pipe@15 = list_items_to_html(_pipe@14, Layout, Items, Refs),
            close_tag(_pipe@15, <<"ul"/utf8>>);

        {ordered_list, Layout@1, _, Ordinal, Start, Items@1} ->
            Attrs@3 = case Start of
                1 ->
                    maps:new();

                _ ->
                    maps:from_list(
                        [{<<"start"/utf8>>, erlang:integer_to_binary(Start)}]
                    )
            end,
            Attrs@4 = case Ordinal of
                numeric_ordinal ->
                    Attrs@3;

                lower_alpha_ordinal ->
                    gleam@dict:insert(Attrs@3, <<"type"/utf8>>, <<"a"/utf8>>);

                upper_alpha_ordinal ->
                    gleam@dict:insert(Attrs@3, <<"type"/utf8>>, <<"A"/utf8>>)
            end,
            _pipe@16 = Html,
            _pipe@17 = open_tag(_pipe@16, <<"ol"/utf8>>, Attrs@4),
            _pipe@18 = append_to_html(_pipe@17, <<"\n"/utf8>>),
            _pipe@19 = list_items_to_html(_pipe@18, Layout@1, Items@1, Refs),
            close_tag(_pipe@19, <<"ol"/utf8>>);

        {block_quote, Attrs@5, Items@2} ->
            _pipe@20 = Html,
            _pipe@21 = open_tag(_pipe@20, <<"blockquote"/utf8>>, Attrs@5),
            _pipe@22 = append_to_html(_pipe@21, <<"\n"/utf8>>),
            _pipe@23 = containers_to_html(Items@2, Refs, _pipe@22),
            close_tag(_pipe@23, <<"blockquote"/utf8>>);

        {'div', _, Attributes, Items@3} ->
            _pipe@24 = Html,
            _pipe@25 = open_tag(_pipe@24, <<"div"/utf8>>, Attributes),
            _pipe@26 = append_to_html(_pipe@25, <<"\n"/utf8>>),
            _pipe@27 = containers_to_html(Items@3, Refs, _pipe@26),
            close_tag(_pipe@27, <<"div"/utf8>>)
    end,
    append_to_html(New_html, <<"\n"/utf8>>).

-file("src/jot.gleam", 2513).
-spec containers_to_html_with_last_paragraph(
    list(container()),
    render_refs(),
    generated_html(),
    fun((generated_html()) -> generated_html())
) -> generated_html().
containers_to_html_with_last_paragraph(Containers, Refs, Html, Apply) ->
    case Containers of
        [] ->
            Html;

        [Container] ->
            case Container of
                {paragraph, Attrs, Inlines} ->
                    _pipe = Html,
                    _pipe@1 = open_tag(_pipe, <<"p"/utf8>>, Attrs),
                    _pipe@2 = inlines_to_html(_pipe@1, Inlines, Refs, trim_last),
                    _pipe@3 = Apply(_pipe@2),
                    close_tag(_pipe@3, <<"p"/utf8>>);

                _ ->
                    _pipe@4 = container_to_html(Html, Container, Refs),
                    _pipe@5 = open_tag(_pipe@4, <<"p"/utf8>>, maps:new()),
                    _pipe@6 = Apply(_pipe@5),
                    close_tag(_pipe@6, <<"p"/utf8>>)
            end;

        [Container@1 | Rest] ->
            Html@1 = container_to_html(Html, Container@1, Refs),
            containers_to_html_with_last_paragraph(Rest, Refs, Html@1, Apply)
    end.

-file("src/jot.gleam", 2637).
-spec create_footnotes(
    document(),
    list({integer(), binary()}),
    generated_html()
) -> generated_html().
create_footnotes(Document, Used_footnotes, Html_acc) ->
    Footnote_to_html = fun(Html, Footnote, Footnote_number) ->
        _pipe = gleam_stdlib:map_get(erlang:element(5, Document), Footnote),
        _pipe@1 = gleam@result:'try'(
            _pipe,
            fun(Footnote@1) -> case gleam@list:is_empty(Footnote@1) of
                    true ->
                        {error, nil};

                    false ->
                        {ok, Footnote@1}
                end end
        ),
        _pipe@2 = gleam@result:map(
            _pipe@1,
            fun(Footnote@2) ->
                containers_to_html_with_last_paragraph(
                    Footnote@2,
                    {render_refs,
                        erlang:element(3, Document),
                        erlang:element(4, Document),
                        erlang:element(5, Document)},
                    Html,
                    fun(_capture) ->
                        add_footnote_link(_capture, Footnote_number)
                    end
                )
            end
        ),
        gleam@result:lazy_unwrap(_pipe@2, fun() -> _pipe@3 = Html,
                _pipe@4 = open_tag_ordered_attributes(_pipe@3, <<"p"/utf8>>, []),
                _pipe@5 = add_footnote_link(_pipe@4, Footnote_number),
                close_tag(_pipe@5, <<"p"/utf8>>) end)
    end,
    case Used_footnotes of
        [] ->
            Html_acc;

        [{Footnote_number@1, Footnote@3} | Other_footnotes] ->
            Footnote_number@2 = erlang:integer_to_binary(Footnote_number@1),
            Html@1 = begin
                _pipe@6 = Html_acc,
                _pipe@7 = open_tag(
                    _pipe@6,
                    <<"li"/utf8>>,
                    maps:from_list(
                        [{<<"id"/utf8>>,
                                <<"fn"/utf8, Footnote_number@2/binary>>}]
                    )
                ),
                _pipe@8 = append_to_html(_pipe@7, <<"\n"/utf8>>),
                _pipe@9 = Footnote_to_html(
                    _pipe@8,
                    Footnote@3,
                    Footnote_number@2
                ),
                _pipe@10 = append_to_html(_pipe@9, <<"\n"/utf8>>),
                _pipe@11 = close_tag(_pipe@10, <<"li"/utf8>>),
                append_to_html(_pipe@11, <<"\n"/utf8>>)
            end,
            New_used_footnotes = lists:append(
                get_new_footnotes(Html_acc, Html@1, []),
                Other_footnotes
            ),
            create_footnotes(Document, New_used_footnotes, Html@1)
    end.

-file("src/jot.gleam", 2463).
?DOC(
    " Convert a document tree into a string of HTML.\n"
    "\n"
    " See `to_html` for further documentation.\n"
).
-spec document_to_html(document()) -> binary().
document_to_html(Document) ->
    Generated_html = containers_to_html(
        erlang:element(2, Document),
        {render_refs,
            erlang:element(3, Document),
            erlang:element(4, Document),
            erlang:element(5, Document)},
        {generated_html, <<""/utf8>>, []}
    ),
    gleam@bool:guard(
        gleam@list:is_empty(erlang:element(3, Generated_html)),
        erlang:element(2, Generated_html),
        fun() ->
            Footnotes_section_html = begin
                _pipe = Generated_html,
                _pipe@1 = open_tag(
                    _pipe,
                    <<"section"/utf8>>,
                    maps:from_list([{<<"role"/utf8>>, <<"doc-endnotes"/utf8>>}])
                ),
                _pipe@2 = append_to_html(_pipe@1, <<"\n"/utf8>>),
                _pipe@3 = open_tag(_pipe@2, <<"hr"/utf8>>, maps:new()),
                _pipe@4 = append_to_html(_pipe@3, <<"\n"/utf8>>),
                _pipe@5 = open_tag(_pipe@4, <<"ol"/utf8>>, maps:new()),
                append_to_html(_pipe@5, <<"\n"/utf8>>)
            end,
            Html_with_footnotes = create_footnotes(
                Document,
                lists:reverse(erlang:element(3, Footnotes_section_html)),
                Footnotes_section_html
            ),
            erlang:element(
                2,
                begin
                    _pipe@6 = Html_with_footnotes,
                    _pipe@7 = close_tag(_pipe@6, <<"ol"/utf8>>),
                    _pipe@8 = append_to_html(_pipe@7, <<"\n"/utf8>>),
                    _pipe@9 = close_tag(_pipe@8, <<"section"/utf8>>),
                    append_to_html(_pipe@9, <<"\n"/utf8>>)
                end
            )
        end
    ).

-file("src/jot.gleam", 242).
-spec int_fold_down_zero_inclusive(integer(), DMD, fun((DMD, integer()) -> DMD)) -> DMD.
int_fold_down_zero_inclusive(Int, Acc, Reduce) ->
    case Int < 0 of
        true ->
            Acc;

        false ->
            int_fold_down_zero_inclusive(Int - 1, Reduce(Acc, Int), Reduce)
    end.

-file("src/jot.gleam", 1544).
-spec take_symbol_chars(binary(), binary()) -> gleam@option:option({binary(),
    binary()}).
take_symbol_chars(In, Acc) ->
    case In of
        <<""/utf8>> ->
            none;

        <<":"/utf8, _/binary>> when Acc =:= <<""/utf8>> ->
            none;

        <<":"/utf8, Rest/binary>> ->
            {some, {Acc, Rest}};

        <<"a"/utf8, Rest@1/binary>> ->
            C = <<"a"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"b"/utf8, Rest@1/binary>> ->
            C = <<"b"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"c"/utf8, Rest@1/binary>> ->
            C = <<"c"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"d"/utf8, Rest@1/binary>> ->
            C = <<"d"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"e"/utf8, Rest@1/binary>> ->
            C = <<"e"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"f"/utf8, Rest@1/binary>> ->
            C = <<"f"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"g"/utf8, Rest@1/binary>> ->
            C = <<"g"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"h"/utf8, Rest@1/binary>> ->
            C = <<"h"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"i"/utf8, Rest@1/binary>> ->
            C = <<"i"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"j"/utf8, Rest@1/binary>> ->
            C = <<"j"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"k"/utf8, Rest@1/binary>> ->
            C = <<"k"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"l"/utf8, Rest@1/binary>> ->
            C = <<"l"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"m"/utf8, Rest@1/binary>> ->
            C = <<"m"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"n"/utf8, Rest@1/binary>> ->
            C = <<"n"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"o"/utf8, Rest@1/binary>> ->
            C = <<"o"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"p"/utf8, Rest@1/binary>> ->
            C = <<"p"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"q"/utf8, Rest@1/binary>> ->
            C = <<"q"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"r"/utf8, Rest@1/binary>> ->
            C = <<"r"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"s"/utf8, Rest@1/binary>> ->
            C = <<"s"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"t"/utf8, Rest@1/binary>> ->
            C = <<"t"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"u"/utf8, Rest@1/binary>> ->
            C = <<"u"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"v"/utf8, Rest@1/binary>> ->
            C = <<"v"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"w"/utf8, Rest@1/binary>> ->
            C = <<"w"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"x"/utf8, Rest@1/binary>> ->
            C = <<"x"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"y"/utf8, Rest@1/binary>> ->
            C = <<"y"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"z"/utf8, Rest@1/binary>> ->
            C = <<"z"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"A"/utf8, Rest@1/binary>> ->
            C = <<"A"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"B"/utf8, Rest@1/binary>> ->
            C = <<"B"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"C"/utf8, Rest@1/binary>> ->
            C = <<"C"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"D"/utf8, Rest@1/binary>> ->
            C = <<"D"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"E"/utf8, Rest@1/binary>> ->
            C = <<"E"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"F"/utf8, Rest@1/binary>> ->
            C = <<"F"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"G"/utf8, Rest@1/binary>> ->
            C = <<"G"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"H"/utf8, Rest@1/binary>> ->
            C = <<"H"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"I"/utf8, Rest@1/binary>> ->
            C = <<"I"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"J"/utf8, Rest@1/binary>> ->
            C = <<"J"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"K"/utf8, Rest@1/binary>> ->
            C = <<"K"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"L"/utf8, Rest@1/binary>> ->
            C = <<"L"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"M"/utf8, Rest@1/binary>> ->
            C = <<"M"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"N"/utf8, Rest@1/binary>> ->
            C = <<"N"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"O"/utf8, Rest@1/binary>> ->
            C = <<"O"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"P"/utf8, Rest@1/binary>> ->
            C = <<"P"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"Q"/utf8, Rest@1/binary>> ->
            C = <<"Q"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"R"/utf8, Rest@1/binary>> ->
            C = <<"R"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"S"/utf8, Rest@1/binary>> ->
            C = <<"S"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"T"/utf8, Rest@1/binary>> ->
            C = <<"T"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"U"/utf8, Rest@1/binary>> ->
            C = <<"U"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"V"/utf8, Rest@1/binary>> ->
            C = <<"V"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"W"/utf8, Rest@1/binary>> ->
            C = <<"W"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"X"/utf8, Rest@1/binary>> ->
            C = <<"X"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"Y"/utf8, Rest@1/binary>> ->
            C = <<"Y"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"Z"/utf8, Rest@1/binary>> ->
            C = <<"Z"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"0"/utf8, Rest@1/binary>> ->
            C = <<"0"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"1"/utf8, Rest@1/binary>> ->
            C = <<"1"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"2"/utf8, Rest@1/binary>> ->
            C = <<"2"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"3"/utf8, Rest@1/binary>> ->
            C = <<"3"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"4"/utf8, Rest@1/binary>> ->
            C = <<"4"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"5"/utf8, Rest@1/binary>> ->
            C = <<"5"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"6"/utf8, Rest@1/binary>> ->
            C = <<"6"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"7"/utf8, Rest@1/binary>> ->
            C = <<"7"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"8"/utf8, Rest@1/binary>> ->
            C = <<"8"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"9"/utf8, Rest@1/binary>> ->
            C = <<"9"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"_"/utf8, Rest@1/binary>> ->
            C = <<"_"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"-"/utf8, Rest@1/binary>> ->
            C = <<"-"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        <<"+"/utf8, Rest@1/binary>> ->
            C = <<"+"/utf8>>,
            take_symbol_chars(Rest@1, <<Acc/binary, C/binary>>);

        _ ->
            none
    end.

-file("src/jot.gleam", 1532).
-spec parse_symbol(binary()) -> gleam@option:option({inline(), binary()}).
parse_symbol(In) ->
    case take_symbol_chars(In, <<""/utf8>>) of
        {some, {Text, Rest}} ->
            {some, {{symbol, Text}, Rest}};

        _ ->
            none
    end.

-file("src/jot.gleam", 990).
-spec parse_attribute_value(binary(), binary(), binary()) -> gleam@option:option({binary(),
    binary(),
    binary()}).
parse_attribute_value(In, Key, Value) ->
    case In of
        <<""/utf8>> ->
            none;

        <<" "/utf8, In@1/binary>> ->
            {some, {Key, Value, In@1}};

        <<"}"/utf8, _/binary>> ->
            {some, {Key, Value, In}};

        _ ->
            case gleam_stdlib:string_pop_grapheme(In) of
                {ok, {C, In@2}} ->
                    parse_attribute_value(In@2, Key, <<Value/binary, C/binary>>);

                {error, _} ->
                    none
            end
    end.

-file("src/jot.gleam", 1007).
-spec parse_attribute_quoted_value(binary(), binary(), binary()) -> gleam@option:option({binary(),
    binary(),
    binary()}).
parse_attribute_quoted_value(In, Key, Value) ->
    case In of
        <<""/utf8>> ->
            none;

        <<"\""/utf8, In@1/binary>> ->
            {some, {Key, Value, In@1}};

        _ ->
            case gleam_stdlib:string_pop_grapheme(In) of
                {ok, {C, In@2}} ->
                    parse_attribute_quoted_value(
                        In@2,
                        Key,
                        <<Value/binary, C/binary>>
                    );

                {error, _} ->
                    none
            end
    end.

-file("src/jot.gleam", 974).
-spec parse_attribute(binary(), binary()) -> gleam@option:option({binary(),
    binary(),
    binary()}).
parse_attribute(In, Key) ->
    case In of
        <<""/utf8>> ->
            none;

        <<" "/utf8, _/binary>> ->
            none;

        <<"=\""/utf8, In@1/binary>> ->
            parse_attribute_quoted_value(In@1, Key, <<""/utf8>>);

        <<"="/utf8, In@2/binary>> ->
            parse_attribute_value(In@2, Key, <<""/utf8>>);

        _ ->
            case gleam_stdlib:string_pop_grapheme(In) of
                {ok, {C, In@3}} ->
                    parse_attribute(In@3, <<Key/binary, C/binary>>);

                {error, _} ->
                    none
            end
    end.

-file("src/jot.gleam", 1023).
-spec parse_attributes_id_or_class(binary(), binary()) -> gleam@option:option({binary(),
    binary()}).
parse_attributes_id_or_class(In, Id) ->
    case In of
        <<""/utf8>> ->
            {some, {Id, In}};

        <<"}"/utf8, _/binary>> ->
            {some, {Id, In}};

        <<" "/utf8, _/binary>> ->
            {some, {Id, In}};

        <<"#"/utf8, _/binary>> ->
            none;

        <<"."/utf8, _/binary>> ->
            none;

        <<"="/utf8, _/binary>> ->
            none;

        <<"\n"/utf8, _/binary>> ->
            none;

        _ ->
            case gleam_stdlib:string_pop_grapheme(In) of
                {ok, {C, In@1}} ->
                    parse_attributes_id_or_class(In@1, <<Id/binary, C/binary>>);

                {error, _} ->
                    {some, {Id, In}}
            end
    end.

-file("src/jot.gleam", 260).
-spec drop_spaces(binary()) -> binary().
drop_spaces(In) ->
    case In of
        <<" "/utf8, Rest/binary>> ->
            drop_spaces(Rest);

        Other ->
            Other
    end.

-file("src/jot.gleam", 945).
-spec parse_attributes(binary(), gleam@dict:dict(binary(), binary())) -> gleam@option:option({gleam@dict:dict(binary(), binary()),
    binary()}).
parse_attributes(In, Attrs) ->
    In@1 = drop_spaces(In),
    case In@1 of
        <<""/utf8>> ->
            none;

        <<"}"/utf8, In@2/binary>> ->
            {some, {Attrs, In@2}};

        <<"#"/utf8, In@3/binary>> ->
            case parse_attributes_id_or_class(In@3, <<""/utf8>>) of
                {some, {Id, In@4}} ->
                    parse_attributes(
                        In@4,
                        add_attribute(Attrs, <<"id"/utf8>>, Id)
                    );

                none ->
                    none
            end;

        <<"."/utf8, In@5/binary>> ->
            case parse_attributes_id_or_class(In@5, <<""/utf8>>) of
                {some, {C, In@6}} ->
                    parse_attributes(
                        In@6,
                        add_attribute(Attrs, <<"class"/utf8>>, C)
                    );

                none ->
                    none
            end;

        _ ->
            case parse_attribute(In@1, <<""/utf8>>) of
                {some, {K, V, In@7}} ->
                    parse_attributes(In@7, add_attribute(Attrs, K, V));

                none ->
                    none
            end
    end.

-file("src/jot.gleam", 1509).
-spec parse_autolink(binary()) -> gleam@option:option({inline(), binary()}).
parse_autolink(In) ->
    case gleam@string:split_once(In, <<">"/utf8>>) of
        {error, _} ->
            none;

        {ok, {Url, Rest}} ->
            case gleam_stdlib:contains_string(Url, <<"@"/utf8>>) of
                true ->
                    Href = <<"mailto:"/utf8, Url/binary>>,
                    {some,
                        {{link, maps:new(), [{text, Url}], {url, Href}}, Rest}};

                false ->
                    case gleam_stdlib:contains_string(Url, <<"://"/utf8>>)
                    orelse gleam_stdlib:string_starts_with(Url, <<"//"/utf8>>) of
                        true ->
                            {some,
                                {{link, maps:new(), [{text, Url}], {url, Url}},
                                    Rest}};

                        false ->
                            none
                    end
            end
    end.

-file("src/jot.gleam", 1618).
-spec parse_math(binary(), splitters(), boolean()) -> gleam@option:option({inline(),
    binary()}).
parse_math(In, Splitters, Display) ->
    case splitter_ffi:split(erlang:element(6, Splitters), In) of
        {_, <<""/utf8>>, <<""/utf8>>} ->
            none;

        {Latex, _, Rest} ->
            Math = case Display of
                true ->
                    {math_display, Latex};

                false ->
                    {math_inline, Latex}
            end,
            {some, {Math, Rest}}
    end.

-file("src/jot.gleam", 1681).
-spec parse_code_end(binary(), integer(), integer(), binary()) -> {boolean(),
    binary(),
    binary()}.
parse_code_end(In, Limit, Count, Content) ->
    case In of
        <<""/utf8>> ->
            {true, Content, In};

        <<"`"/utf8, In@1/binary>> ->
            parse_code_end(In@1, Limit, Count + 1, Content);

        _ when Limit =:= Count ->
            {true, Content, In};

        _ ->
            {false,
                <<Content/binary,
                    (gleam@string:repeat(<<"`"/utf8>>, Count))/binary>>,
                In}
    end.

-file("src/jot.gleam", 1658).
-spec parse_code_content(binary(), integer(), binary()) -> {binary(), binary()}.
parse_code_content(In, Count, Content) ->
    case In of
        <<""/utf8>> ->
            {Content, In};

        <<"`"/utf8, In@1/binary>> ->
            {Done, Content@1, In@2} = parse_code_end(In@1, Count, 1, Content),
            case Done of
                true ->
                    {Content@1, In@2};

                false ->
                    parse_code_content(In@2, Count, Content@1)
            end;

        _ ->
            case gleam_stdlib:string_pop_grapheme(In) of
                {ok, {C, In@3}} ->
                    parse_code_content(
                        In@3,
                        Count,
                        <<Content/binary, C/binary>>
                    );

                {error, _} ->
                    {Content, In}
            end
    end.

-file("src/jot.gleam", 1636).
-spec parse_code(binary(), integer()) -> {inline(), binary()}.
parse_code(In, Count) ->
    case In of
        <<"`"/utf8, In@1/binary>> ->
            parse_code(In@1, Count + 1);

        _ ->
            {Content, In@2} = parse_code_content(In, Count, <<""/utf8>>),
            Content@1 = case gleam_stdlib:string_starts_with(
                Content,
                <<" `"/utf8>>
            ) of
                true ->
                    gleam@string:trim_start(Content);

                false ->
                    Content
            end,
            Content@2 = case gleam_stdlib:string_ends_with(
                Content@1,
                <<"` "/utf8>>
            ) of
                true ->
                    gleam@string:trim_end(Content@1);

                false ->
                    Content@1
            end,
            {{code, Content@2}, In@2}
    end.

-file("src/jot.gleam", 1772).
-spec consume_until_space_or_newline(binary(), binary()) -> {binary(), binary()}.
consume_until_space_or_newline(In, Acc) ->
    case In of
        <<""/utf8>> ->
            {Acc, <<""/utf8>>};

        <<" "/utf8, _/binary>> ->
            {Acc, In};

        <<"\n"/utf8, _/binary>> ->
            {Acc, In};

        _ ->
            case gleam_stdlib:string_pop_grapheme(In) of
                {ok, {C, Rest}} ->
                    consume_until_space_or_newline(
                        Rest,
                        <<Acc/binary, C/binary>>
                    );

                {error, _} ->
                    {Acc, <<""/utf8>>}
            end
    end.

-file("src/jot.gleam", 1914).
-spec take_link_chars_destination(
    binary(),
    boolean(),
    binary(),
    splitters(),
    binary()
) -> gleam@option:option({binary(), destination(), binary()}).
take_link_chars_destination(In, Is_url, Inline_in, Splitters, Acc) ->
    case splitter_ffi:split(erlang:element(5, Splitters), In) of
        {A, <<")"/utf8>>, In@1} when Is_url ->
            {some, {Inline_in, {url, <<Acc/binary, A/binary>>}, In@1}};

        {A@1, <<"]"/utf8>>, In@2} when not Is_url ->
            {some, {Inline_in, {reference, <<Acc/binary, A@1/binary>>}, In@2}};

        {A@2, <<"\n"/utf8>>, Rest} when Is_url ->
            take_link_chars_destination(
                Rest,
                Is_url,
                Inline_in,
                Splitters,
                <<Acc/binary, A@2/binary>>
            );

        {A@3, <<"\n"/utf8>>, Rest@1} when not Is_url ->
            take_link_chars_destination(
                Rest@1,
                Is_url,
                Inline_in,
                Splitters,
                <<<<Acc/binary, A@3/binary>>/binary, " "/utf8>>
            );

        _ ->
            none
    end.

-file("src/jot.gleam", 1843).
-spec take_link_chars_or_span_depth(binary(), binary(), splitters(), integer()) -> gleam@option:option({binary(),
    gleam@option:option(destination()),
    binary()}).
take_link_chars_or_span_depth(In, Inline_in, Splitters, Depth) ->
    case In of
        <<""/utf8>> ->
            none;

        <<"!["/utf8, Rest/binary>> ->
            take_link_chars_or_span_depth(
                Rest,
                <<Inline_in/binary, "!["/utf8>>,
                Splitters,
                Depth + 1
            );

        <<"["/utf8, Rest@1/binary>> ->
            take_link_chars_or_span_depth(
                Rest@1,
                <<Inline_in/binary, "["/utf8>>,
                Splitters,
                Depth + 1
            );

        <<"]"/utf8, Rest@2/binary>> when Depth > 0 ->
            take_link_chars_or_span_depth(
                Rest@2,
                <<Inline_in/binary, "]"/utf8>>,
                Splitters,
                Depth - 1
            );

        <<"]["/utf8, Rest@3/binary>> when Depth =:= 0 ->
            case take_link_chars_destination(
                Rest@3,
                false,
                Inline_in,
                Splitters,
                <<""/utf8>>
            ) of
                {some, {Inline_in@1, Dest, In@1}} ->
                    {some, {Inline_in@1, {some, Dest}, In@1}};

                none ->
                    none
            end;

        <<"]("/utf8, Rest@4/binary>> when Depth =:= 0 ->
            case take_link_chars_destination(
                Rest@4,
                true,
                Inline_in,
                Splitters,
                <<""/utf8>>
            ) of
                {some, {Inline_in@2, Dest@1, In@2}} ->
                    {some, {Inline_in@2, {some, Dest@1}, In@2}};

                none ->
                    none
            end;

        <<"]{"/utf8, Rest@5/binary>> when Depth =:= 0 ->
            {some, {Inline_in, none, <<"{"/utf8, Rest@5/binary>>}};

        <<"]"/utf8, _/binary>> when Depth =:= 0 ->
            none;

        _ ->
            case gleam_stdlib:string_pop_grapheme(In) of
                {ok, {C, Rest@6}} ->
                    take_link_chars_or_span_depth(
                        Rest@6,
                        <<Inline_in/binary, C/binary>>,
                        Splitters,
                        Depth
                    );

                {error, _} ->
                    none
            end
    end.

-file("src/jot.gleam", 1835).
-spec take_link_chars_or_span(binary(), binary(), splitters()) -> gleam@option:option({binary(),
    gleam@option:option(destination()),
    binary()}).
take_link_chars_or_span(In, Inline_in, Splitters) ->
    take_link_chars_or_span_depth(In, Inline_in, Splitters, 0).

-file("src/jot.gleam", 1940).
-spec parse_footnote(binary(), binary()) -> gleam@option:option({inline(),
    binary()}).
parse_footnote(In, Acc) ->
    case In of
        <<""/utf8>> ->
            none;

        <<"]"/utf8, Rest/binary>> ->
            {some, {{footnote, Acc}, Rest}};

        _ ->
            case gleam_stdlib:string_pop_grapheme(In) of
                {ok, {C, Rest@1}} ->
                    parse_footnote(Rest@1, <<Acc/binary, C/binary>>);

                {error, _} ->
                    none
            end
    end.

-file("src/jot.gleam", 1711).
-spec take_emphasis_chars(binary(), binary(), binary()) -> gleam@option:option({binary(),
    binary()}).
take_emphasis_chars(In, Close, Acc) ->
    case In of
        <<""/utf8>> ->
            none;

        <<"`"/utf8, _/binary>> ->
            none;

        <<"\t"/utf8, In@1/binary>> ->
            Ws = <<"\t"/utf8>>,
            case gleam_stdlib:string_pop_grapheme(In@1) of
                {ok, {C, In@2}} when C =:= Close ->
                    take_emphasis_chars(
                        In@2,
                        Close,
                        <<<<Acc/binary, Ws/binary>>/binary, C/binary>>
                    );

                _ ->
                    take_emphasis_chars(In@1, Close, <<Acc/binary, Ws/binary>>)
            end;

        <<"\n"/utf8, In@1/binary>> ->
            Ws = <<"\n"/utf8>>,
            case gleam_stdlib:string_pop_grapheme(In@1) of
                {ok, {C, In@2}} when C =:= Close ->
                    take_emphasis_chars(
                        In@2,
                        Close,
                        <<<<Acc/binary, Ws/binary>>/binary, C/binary>>
                    );

                _ ->
                    take_emphasis_chars(In@1, Close, <<Acc/binary, Ws/binary>>)
            end;

        <<" "/utf8, In@1/binary>> ->
            Ws = <<" "/utf8>>,
            case gleam_stdlib:string_pop_grapheme(In@1) of
                {ok, {C, In@2}} when C =:= Close ->
                    take_emphasis_chars(
                        In@2,
                        Close,
                        <<<<Acc/binary, Ws/binary>>/binary, C/binary>>
                    );

                _ ->
                    take_emphasis_chars(In@1, Close, <<Acc/binary, Ws/binary>>)
            end;

        _ ->
            case gleam_stdlib:string_pop_grapheme(In) of
                {ok, {C@1, _}} when (C@1 =:= Close) andalso (Acc =:= <<""/utf8>>) ->
                    none;

                {ok, {C@2, In@3}} when C@2 =:= Close ->
                    {some, {Acc, In@3}};

                {ok, {C@3, In@4}} ->
                    take_emphasis_chars(In@4, Close, <<Acc/binary, C@3/binary>>);

                {error, _} ->
                    none
            end
    end.

-file("src/jot.gleam", 283).
?DOC(
    " Given the length of a sequence of `-` this turns it in a series of em/en\n"
    " dashes.\n"
).
-spec dash_sequence(integer()) -> binary().
dash_sequence(Hyphens) ->
    case {Hyphens rem 3, Hyphens rem 2} of
        {0, _} ->
            gleam@string:repeat(<<"—"/utf8>>, Hyphens div 3);

        {_, 0} ->
            gleam@string:repeat(<<"–"/utf8>>, Hyphens div 2);

        {_, _} ->
            Ems = gleam@int:max(0, (Hyphens - 2) div 3),
            Hyphens@1 = Hyphens - (Ems * 3),
            <<<<(gleam@string:repeat(<<"—"/utf8>>, Ems))/binary,
                    (gleam@string:repeat(<<"–"/utf8>>, Hyphens@1 div 2))/binary>>/binary,
                (gleam@string:repeat(<<"-"/utf8>>, Hyphens@1 rem 2))/binary>>
    end.

-file("src/jot.gleam", 274).
-spec count_drop_hyphens(binary(), integer()) -> {integer(), binary()}.
count_drop_hyphens(In, Count) ->
    case In of
        <<"-"/utf8, Rest/binary>> ->
            count_drop_hyphens(Rest, Count + 1);

        _ ->
            {Count, In}
    end.

-file("src/jot.gleam", 1740).
-spec parse_insert_delete_mark_sup_sub(binary(), splitters(), binary()) -> gleam@option:option({list(inline()),
    binary()}).
parse_insert_delete_mark_sup_sub(In, Splitters, Close) ->
    case gleam@string:split_once(In, Close) of
        {error, _} ->
            none;

        {ok, {Inline_in, Rest}} ->
            {Inline, Inline_in_remaining} = parse_inline(
                Inline_in,
                Splitters,
                <<""/utf8>>,
                []
            ),
            {some, {Inline, <<Inline_in_remaining/binary, Rest/binary>>}}
    end.

-file("src/jot.gleam", 1788).
-spec parse_link(
    binary(),
    splitters(),
    fun((gleam@dict:dict(binary(), binary()), list(inline()), destination()) -> inline())
) -> gleam@option:option({inline(), binary()}).
parse_link(In, Splitters, To_inline) ->
    case take_link_chars_or_span(In, <<""/utf8>>, Splitters) of
        none ->
            none;

        {some, {Inline_in, none, In@1}} ->
            {Inline, Inline_in_remaining} = parse_inline(
                Inline_in,
                Splitters,
                <<""/utf8>>,
                []
            ),
            case In@1 of
                <<"{"/utf8, Rest/binary>> ->
                    case parse_attributes(Rest, maps:new()) of
                        {some, {Attrs, In@2}} ->
                            {some,
                                {{span, Attrs, Inline},
                                    <<Inline_in_remaining/binary, In@2/binary>>}};

                        none ->
                            none
                    end;

                _ ->
                    none
            end;

        {some, {Inline_in@1, {some, Ref}, In@3}} ->
            {Inline@1, Inline_in_remaining@1} = parse_inline(
                Inline_in@1,
                Splitters,
                <<""/utf8>>,
                []
            ),
            Ref@2 = case Ref of
                {reference, <<""/utf8>>} ->
                    {reference, take_inline_text(Inline@1, <<""/utf8>>)};

                Ref@1 ->
                    Ref@1
            end,
            {Attrs@2, In@5} = case In@3 of
                <<"{"/utf8, Rest@1/binary>> ->
                    case parse_attributes(Rest@1, maps:new()) of
                        {some, {Attrs@1, In@4}} ->
                            {Attrs@1, In@4};

                        none ->
                            {maps:new(), In@3}
                    end;

                _ ->
                    {maps:new(), In@3}
            end,
            {some,
                {To_inline(Attrs@2, Inline@1, Ref@2),
                    <<Inline_in_remaining@1/binary, In@5/binary>>}}
    end.

-file("src/jot.gleam", 1755).
-spec parse_link_or_recover(
    binary(),
    splitters(),
    fun((gleam@dict:dict(binary(), binary()), list(inline()), destination()) -> inline()),
    binary()
) -> {ok, {inline(), binary()}} | {error, {binary(), binary()}}.
parse_link_or_recover(In, Splitters, To_inline, Opening) ->
    case parse_link(In, Splitters, To_inline) of
        {some, {Inline, Remaining}} ->
            {ok, {Inline, Remaining}};

        none ->
            {Consumed, Remaining@1} = consume_until_space_or_newline(
                In,
                <<""/utf8>>
            ),
            {error, {<<Opening/binary, Consumed/binary>>, Remaining@1}}
    end.

-file("src/jot.gleam", 1695).
-spec parse_emphasis(binary(), splitters(), binary()) -> gleam@option:option({list(inline()),
    binary()}).
parse_emphasis(In, Splitters, Close) ->
    case take_emphasis_chars(In, Close, <<""/utf8>>) of
        none ->
            none;

        {some, {Inline_in, In@1}} ->
            {Inline, Inline_in_remaining} = parse_inline(
                Inline_in,
                Splitters,
                <<""/utf8>>,
                []
            ),
            {some, {Inline, <<Inline_in_remaining/binary, In@1/binary>>}}
    end.

-file("src/jot.gleam", 1232).
-spec parse_inline(binary(), splitters(), binary(), list(inline())) -> {list(inline()),
    binary()}.
parse_inline(In, Splitters, Text, Acc) ->
    case splitter_ffi:split(erlang:element(4, Splitters), In) of
        {Text2, <<""/utf8>>, <<""/utf8>>} ->
            case <<Text/binary, Text2/binary>> of
                <<""/utf8>> ->
                    {lists:reverse(Acc), <<""/utf8>>};

                Text@1 ->
                    {lists:reverse([{text, Text@1} | Acc]), <<""/utf8>>}
            end;

        {Before, <<"..."/utf8>>, In@1} ->
            Text@2 = <<<<Text/binary, Before/binary>>/binary, "…"/utf8>>,
            parse_inline(In@1, Splitters, Text@2, Acc);

        {Before@1, <<"--"/utf8>>, In@2} ->
            {Count, In@3} = count_drop_hyphens(In@2, 2),
            Text@3 = <<<<Text/binary, Before@1/binary>>/binary,
                (dash_sequence(Count))/binary>>,
            parse_inline(In@3, Splitters, Text@3, Acc);

        {Before@2, <<"\\"/utf8>>, In@4} ->
            Text@4 = <<Text/binary, Before@2/binary>>,
            case In@4 of
                <<"!"/utf8, In@5/binary>> ->
                    E = <<"!"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"\""/utf8, In@5/binary>> ->
                    E = <<"\""/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"#"/utf8, In@5/binary>> ->
                    E = <<"#"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"$"/utf8, In@5/binary>> ->
                    E = <<"$"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"%"/utf8, In@5/binary>> ->
                    E = <<"%"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"&"/utf8, In@5/binary>> ->
                    E = <<"&"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"'"/utf8, In@5/binary>> ->
                    E = <<"'"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"("/utf8, In@5/binary>> ->
                    E = <<"("/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<")"/utf8, In@5/binary>> ->
                    E = <<")"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"*"/utf8, In@5/binary>> ->
                    E = <<"*"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"+"/utf8, In@5/binary>> ->
                    E = <<"+"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<","/utf8, In@5/binary>> ->
                    E = <<","/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"-"/utf8, In@5/binary>> ->
                    E = <<"-"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"."/utf8, In@5/binary>> ->
                    E = <<"."/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"/"/utf8, In@5/binary>> ->
                    E = <<"/"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<":"/utf8, In@5/binary>> ->
                    E = <<":"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<";"/utf8, In@5/binary>> ->
                    E = <<";"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"<"/utf8, In@5/binary>> ->
                    E = <<"<"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"="/utf8, In@5/binary>> ->
                    E = <<"="/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<">"/utf8, In@5/binary>> ->
                    E = <<">"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"?"/utf8, In@5/binary>> ->
                    E = <<"?"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"@"/utf8, In@5/binary>> ->
                    E = <<"@"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"["/utf8, In@5/binary>> ->
                    E = <<"["/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"\\"/utf8, In@5/binary>> ->
                    E = <<"\\"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"]"/utf8, In@5/binary>> ->
                    E = <<"]"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"^"/utf8, In@5/binary>> ->
                    E = <<"^"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"_"/utf8, In@5/binary>> ->
                    E = <<"_"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"`"/utf8, In@5/binary>> ->
                    E = <<"`"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"{"/utf8, In@5/binary>> ->
                    E = <<"{"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"|"/utf8, In@5/binary>> ->
                    E = <<"|"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"}"/utf8, In@5/binary>> ->
                    E = <<"}"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"~"/utf8, In@5/binary>> ->
                    E = <<"~"/utf8>>,
                    parse_inline(
                        In@5,
                        Splitters,
                        <<Text@4/binary, E/binary>>,
                        Acc
                    );

                <<"\n"/utf8, In@6/binary>> ->
                    parse_inline(
                        In@6,
                        Splitters,
                        <<""/utf8>>,
                        [linebreak, {text, Text@4} | Acc]
                    );

                <<" "/utf8, In@7/binary>> ->
                    parse_inline(
                        In@7,
                        Splitters,
                        <<""/utf8>>,
                        [non_breaking_space, {text, Text@4} | Acc]
                    );

                _ ->
                    parse_inline(
                        In@4,
                        Splitters,
                        <<Text@4/binary, "\\"/utf8>>,
                        Acc
                    )
            end;

        {A, <<"_"/utf8>> = Start, In@8} ->
            Text@5 = <<Text/binary, A/binary>>,
            case In@8 of
                <<" "/utf8, In@9/binary>> ->
                    B = <<" "/utf8>>,
                    parse_inline(
                        In@9,
                        Splitters,
                        <<<<Text@5/binary, Start/binary>>/binary, B/binary>>,
                        Acc
                    );

                <<"\t"/utf8, In@9/binary>> ->
                    B = <<"\t"/utf8>>,
                    parse_inline(
                        In@9,
                        Splitters,
                        <<<<Text@5/binary, Start/binary>>/binary, B/binary>>,
                        Acc
                    );

                <<"\n"/utf8, In@9/binary>> ->
                    B = <<"\n"/utf8>>,
                    parse_inline(
                        In@9,
                        Splitters,
                        <<<<Text@5/binary, Start/binary>>/binary, B/binary>>,
                        Acc
                    );

                _ ->
                    case parse_emphasis(In@8, Splitters, Start) of
                        none ->
                            parse_inline(
                                In@8,
                                Splitters,
                                <<Text@5/binary, Start/binary>>,
                                Acc
                            );

                        {some, {Inner, In@10}} ->
                            Item = case Start of
                                <<"*"/utf8>> ->
                                    {strong, Inner};

                                _ ->
                                    {emphasis, Inner}
                            end,
                            parse_inline(
                                In@10,
                                Splitters,
                                <<""/utf8>>,
                                [Item, {text, Text@5} | Acc]
                            )
                    end
            end;

        {A, <<"*"/utf8>> = Start, In@8} ->
            Text@5 = <<Text/binary, A/binary>>,
            case In@8 of
                <<" "/utf8, In@9/binary>> ->
                    B = <<" "/utf8>>,
                    parse_inline(
                        In@9,
                        Splitters,
                        <<<<Text@5/binary, Start/binary>>/binary, B/binary>>,
                        Acc
                    );

                <<"\t"/utf8, In@9/binary>> ->
                    B = <<"\t"/utf8>>,
                    parse_inline(
                        In@9,
                        Splitters,
                        <<<<Text@5/binary, Start/binary>>/binary, B/binary>>,
                        Acc
                    );

                <<"\n"/utf8, In@9/binary>> ->
                    B = <<"\n"/utf8>>,
                    parse_inline(
                        In@9,
                        Splitters,
                        <<<<Text@5/binary, Start/binary>>/binary, B/binary>>,
                        Acc
                    );

                _ ->
                    case parse_emphasis(In@8, Splitters, Start) of
                        none ->
                            parse_inline(
                                In@8,
                                Splitters,
                                <<Text@5/binary, Start/binary>>,
                                Acc
                            );

                        {some, {Inner, In@10}} ->
                            Item = case Start of
                                <<"*"/utf8>> ->
                                    {strong, Inner};

                                _ ->
                                    {emphasis, Inner}
                            end,
                            parse_inline(
                                In@10,
                                Splitters,
                                <<""/utf8>>,
                                [Item, {text, Text@5} | Acc]
                            )
                    end
            end;

        {A@1, <<"[^"/utf8>>, Rest} ->
            Text@6 = <<Text/binary, A@1/binary>>,
            case parse_footnote(Rest, <<"^"/utf8>>) of
                none ->
                    parse_inline(
                        Rest,
                        Splitters,
                        <<Text@6/binary, "[^"/utf8>>,
                        Acc
                    );

                {some, {_, <<":"/utf8, _/binary>>}} when Text@6 =/= <<""/utf8>> ->
                    {lists:reverse([{text, Text@6} | Acc]), In};

                {some, {_, <<":"/utf8, _/binary>>}} ->
                    {lists:reverse(Acc), In};

                {some, {Footnote, In@11}} ->
                    parse_inline(
                        In@11,
                        Splitters,
                        <<""/utf8>>,
                        [Footnote, {text, Text@6} | Acc]
                    )
            end;

        {A@2, <<"["/utf8>>, In@12} ->
            Text@7 = <<Text/binary, A@2/binary>>,
            case parse_link_or_recover(
                In@12,
                Splitters,
                fun(Field@0, Field@1, Field@2) -> {link, Field@0, Field@1, Field@2} end,
                <<"["/utf8>>
            ) of
                {error, {Failed_text, Remaining}} ->
                    parse_inline(
                        Remaining,
                        Splitters,
                        <<Text@7/binary, Failed_text/binary>>,
                        Acc
                    );

                {ok, {Link, Remaining@1}} ->
                    parse_inline(
                        Remaining@1,
                        Splitters,
                        <<""/utf8>>,
                        [Link, {text, Text@7} | Acc]
                    )
            end;

        {A@3, <<"!["/utf8>>, In@13} ->
            Text@8 = <<Text/binary, A@3/binary>>,
            case parse_link_or_recover(
                In@13,
                Splitters,
                fun(Field@0, Field@1, Field@2) -> {image, Field@0, Field@1, Field@2} end,
                <<"!["/utf8>>
            ) of
                {error, {Failed_text@1, Remaining@2}} ->
                    parse_inline(
                        Remaining@2,
                        Splitters,
                        <<Text@8/binary, Failed_text@1/binary>>,
                        Acc
                    );

                {ok, {Image, Remaining@3}} ->
                    parse_inline(
                        Remaining@3,
                        Splitters,
                        <<""/utf8>>,
                        [Image, {text, Text@8} | Acc]
                    )
            end;

        {A@4, <<"`"/utf8>>, In@14} ->
            Text@9 = <<Text/binary, A@4/binary>>,
            {Code, In@15} = parse_code(In@14, 1),
            parse_inline(
                In@15,
                Splitters,
                <<""/utf8>>,
                [Code, {text, Text@9} | Acc]
            );

        {A@5, <<"\n"/utf8>>, In@16} ->
            Text@10 = <<Text/binary, A@5/binary>>,
            _pipe = drop_spaces(In@16),
            parse_inline(_pipe, Splitters, <<Text@10/binary, "\n"/utf8>>, Acc);

        {A@6, <<"$`"/utf8>>, In@17} ->
            Text@11 = <<Text/binary, A@6/binary>>,
            case parse_math(In@17, Splitters, false) of
                none ->
                    parse_inline(
                        In@17,
                        Splitters,
                        <<Text@11/binary, "$`"/utf8>>,
                        Acc
                    );

                {some, {Math, In@18}} ->
                    parse_inline(
                        In@18,
                        Splitters,
                        <<""/utf8>>,
                        [Math, {text, Text@11} | Acc]
                    )
            end;

        {A@7, <<"$$`"/utf8>>, In@19} ->
            Text@12 = <<Text/binary, A@7/binary>>,
            case parse_math(In@19, Splitters, true) of
                none ->
                    parse_inline(
                        In@19,
                        Splitters,
                        <<Text@12/binary, "$$`"/utf8>>,
                        Acc
                    );

                {some, {Math@1, In@20}} ->
                    parse_inline(
                        In@20,
                        Splitters,
                        <<""/utf8>>,
                        [Math@1, {text, Text@12} | Acc]
                    )
            end;

        {A@8, <<"<"/utf8>>, In@21} ->
            Text@13 = <<Text/binary, A@8/binary>>,
            case parse_autolink(In@21) of
                none ->
                    parse_inline(
                        In@21,
                        Splitters,
                        <<Text@13/binary, "<"/utf8>>,
                        Acc
                    );

                {some, {Link@1, In@22}} ->
                    parse_inline(
                        In@22,
                        Splitters,
                        <<""/utf8>>,
                        [Link@1, {text, Text@13} | Acc]
                    )
            end;

        {A@9, <<"{-"/utf8>>, In@23} ->
            Text@14 = <<Text/binary, A@9/binary>>,
            case parse_insert_delete_mark_sup_sub(
                In@23,
                Splitters,
                <<"-}"/utf8>>
            ) of
                none ->
                    parse_inline(
                        In@23,
                        Splitters,
                        <<Text@14/binary, "{-"/utf8>>,
                        Acc
                    );

                {some, {Inner@1, In@24}} ->
                    parse_inline(
                        In@24,
                        Splitters,
                        <<""/utf8>>,
                        [{delete, Inner@1}, {text, Text@14} | Acc]
                    )
            end;

        {A@10, <<"{+"/utf8>>, In@25} ->
            Text@15 = <<Text/binary, A@10/binary>>,
            case parse_insert_delete_mark_sup_sub(
                In@25,
                Splitters,
                <<"+}"/utf8>>
            ) of
                none ->
                    parse_inline(
                        In@25,
                        Splitters,
                        <<Text@15/binary, "{+"/utf8>>,
                        Acc
                    );

                {some, {Inner@2, In@26}} ->
                    parse_inline(
                        In@26,
                        Splitters,
                        <<""/utf8>>,
                        [{insert, Inner@2}, {text, Text@15} | Acc]
                    )
            end;

        {A@11, <<"{="/utf8>>, In@27} ->
            Text@16 = <<Text/binary, A@11/binary>>,
            case parse_insert_delete_mark_sup_sub(
                In@27,
                Splitters,
                <<"=}"/utf8>>
            ) of
                none ->
                    parse_inline(
                        In@27,
                        Splitters,
                        <<Text@16/binary, "{="/utf8>>,
                        Acc
                    );

                {some, {Inner@3, In@28}} ->
                    parse_inline(
                        In@28,
                        Splitters,
                        <<""/utf8>>,
                        [{mark, Inner@3}, {text, Text@16} | Acc]
                    )
            end;

        {A@12, <<"^"/utf8>>, In@29} ->
            Text@17 = <<Text/binary, A@12/binary>>,
            case parse_insert_delete_mark_sup_sub(
                In@29,
                Splitters,
                <<"^"/utf8>>
            ) of
                none ->
                    parse_inline(
                        In@29,
                        Splitters,
                        <<Text@17/binary, "^"/utf8>>,
                        Acc
                    );

                {some, {Inner@4, In@30}} ->
                    parse_inline(
                        In@30,
                        Splitters,
                        <<""/utf8>>,
                        [{superscript, Inner@4}, {text, Text@17} | Acc]
                    )
            end;

        {A@13, <<"{^"/utf8>>, In@31} ->
            Text@18 = <<Text/binary, A@13/binary>>,
            case parse_insert_delete_mark_sup_sub(
                In@31,
                Splitters,
                <<"^}"/utf8>>
            ) of
                none ->
                    parse_inline(
                        In@31,
                        Splitters,
                        <<Text@18/binary, "{^"/utf8>>,
                        Acc
                    );

                {some, {Inner@5, In@32}} ->
                    parse_inline(
                        In@32,
                        Splitters,
                        <<""/utf8>>,
                        [{superscript, Inner@5}, {text, Text@18} | Acc]
                    )
            end;

        {A@14, <<"~"/utf8>>, In@33} ->
            Text@19 = <<Text/binary, A@14/binary>>,
            case parse_insert_delete_mark_sup_sub(
                In@33,
                Splitters,
                <<"~"/utf8>>
            ) of
                none ->
                    parse_inline(
                        In@33,
                        Splitters,
                        <<Text@19/binary, "~"/utf8>>,
                        Acc
                    );

                {some, {Inner@6, In@34}} ->
                    parse_inline(
                        In@34,
                        Splitters,
                        <<""/utf8>>,
                        [{subscript, Inner@6}, {text, Text@19} | Acc]
                    )
            end;

        {A@15, <<"{~"/utf8>>, In@35} ->
            Text@20 = <<Text/binary, A@15/binary>>,
            case parse_insert_delete_mark_sup_sub(
                In@35,
                Splitters,
                <<"~}"/utf8>>
            ) of
                none ->
                    parse_inline(
                        In@35,
                        Splitters,
                        <<Text@20/binary, "{~"/utf8>>,
                        Acc
                    );

                {some, {Inner@7, In@36}} ->
                    parse_inline(
                        In@36,
                        Splitters,
                        <<""/utf8>>,
                        [{subscript, Inner@7}, {text, Text@20} | Acc]
                    )
            end;

        {A@16, <<"{"/utf8>>, In@37} ->
            Text@21 = <<Text/binary, A@16/binary>>,
            case parse_attributes(In@37, maps:new()) of
                none ->
                    parse_inline(
                        In@37,
                        Splitters,
                        <<Text@21/binary, "{"/utf8>>,
                        Acc
                    );

                {some, {_, In@38}} ->
                    parse_inline(
                        In@38,
                        Splitters,
                        <<""/utf8>>,
                        [{text, Text@21} | Acc]
                    )
            end;

        {A@17, <<":"/utf8>>, In@39} ->
            Text@22 = <<Text/binary, A@17/binary>>,
            case parse_symbol(In@39) of
                none ->
                    parse_inline(
                        In@39,
                        Splitters,
                        <<Text@22/binary, ":"/utf8>>,
                        Acc
                    );

                {some, {Symbol, In@40}} ->
                    parse_inline(
                        In@40,
                        Splitters,
                        <<""/utf8>>,
                        [Symbol, {text, Text@22} | Acc]
                    )
            end;

        {Text2@1, Text3, In@41} ->
            case <<<<Text/binary, Text2@1/binary>>/binary, Text3/binary>> of
                <<""/utf8>> ->
                    {lists:reverse(Acc), In@41};

                Text@23 ->
                    {lists:reverse([{text, Text@23} | Acc]), In@41}
            end
    end.

-file("src/jot.gleam", 719).
?DOC(
    " Counts the size of a div fence. Used to count pretrimmed lines which may\n"
    " contain a valid terminating fence. Valid pretrimmed fences contain only\n"
    " colons `:`.\n"
    "\n"
    " Returns Some(`size`) for a valid fence and None for an invalid fence.\n"
).
-spec count_div_terminator_fence_size(binary(), integer()) -> gleam@option:option(integer()).
count_div_terminator_fence_size(Line, Count) ->
    case Line of
        <<""/utf8>> ->
            {some, Count};

        <<":"/utf8, Rest/binary>> ->
            count_div_terminator_fence_size(Rest, Count + 1);

        _ ->
            none
    end.

-file("src/jot.gleam", 702).
-spec check_line_suitable_div_end(binary(), integer()) -> boolean().
check_line_suitable_div_end(Line, Fence_size) ->
    Candidate_fence_size = begin
        _pipe = Line,
        _pipe@1 = gleam@string:trim(_pipe),
        count_div_terminator_fence_size(_pipe@1, 0)
    end,
    case Candidate_fence_size of
        {some, Candidate_fence_size@1} ->
            Candidate_fence_size@1 >= Fence_size;

        none ->
            false
    end.

-file("src/jot.gleam", 2444).
?DOC(
    " Split at \\n. If a newline is not present, then the remaining characters\n"
    " will be returned as if there where a newline as the final character.\n"
).
-spec slurp_to_line_end(binary()) -> {binary(), binary()}.
slurp_to_line_end(In) ->
    case gleam@string:split_once(In, <<"\n"/utf8>>) of
        {ok, Split} ->
            Split;

        {error, nil} ->
            {In, <<""/utf8>>}
    end.

-file("src/jot.gleam", 2425).
?DOC(
    " Search a stretch of paragraph characters for valid div terminator. A valid\n"
    " div terminator is a line containing leading and trailing whitespace with an\n"
    " uninterrupted fence of colons `:`. The fence must be at least `size` long.\n"
).
-spec search_paragraph_for_div_end(binary(), list(binary()), integer()) -> {binary(),
    binary()}.
search_paragraph_for_div_end(In, Acc, Size) ->
    {Line, Rest} = slurp_to_line_end(In),
    case check_line_suitable_div_end(Line, Size) of
        true ->
            {begin
                    _pipe = Acc,
                    _pipe@1 = lists:reverse(_pipe),
                    gleam@string:join(_pipe@1, <<"\n"/utf8>>)
                end,
                In};

        false ->
            case Rest of
                <<""/utf8>> ->
                    {begin
                            _pipe@2 = [Line | Acc],
                            _pipe@3 = lists:reverse(_pipe@2),
                            gleam@string:join(_pipe@3, <<"\n"/utf8>>)
                        end,
                        <<""/utf8>>};

                Rest@1 ->
                    search_paragraph_for_div_end(Rest@1, [Line | Acc], Size)
            end
    end.

-file("src/jot.gleam", 2394).
-spec take_paragraph_chars(binary(), gleam@option:option(integer())) -> {binary(),
    binary()}.
take_paragraph_chars(In, Div_close_size) ->
    {Paragraph, In@2} = case gleam@string:split_once(In, <<"\n\n"/utf8>>) of
        {ok, {Content, In@1}} ->
            {Content, In@1};

        {error, _} ->
            case gleam_stdlib:string_ends_with(In, <<"\n"/utf8>>) of
                true ->
                    {gleam@string:drop_end(In, 1), <<""/utf8>>};

                false ->
                    {In, <<""/utf8>>}
            end
    end,
    case Div_close_size of
        {some, Size} ->
            {Split_paragraph, Paragraph_in} = search_paragraph_for_div_end(
                Paragraph,
                [],
                Size
            ),
            case {Split_paragraph, Paragraph_in} of
                {<<""/utf8>>, <<""/utf8>>} ->
                    {Paragraph, In@2};

                {_, <<""/utf8>>} ->
                    {Split_paragraph, In@2};

                {_, _} ->
                    {Split_paragraph,
                        <<<<Paragraph_in/binary, "\n\n"/utf8>>/binary,
                            In@2/binary>>}
            end;

        none ->
            {Paragraph, In@2}
    end.

-file("src/jot.gleam", 1998).
-spec parse_paragraph(
    binary(),
    gleam@dict:dict(binary(), binary()),
    splitters(),
    gleam@option:option(integer())
) -> {container(), binary()}.
parse_paragraph(In, Attrs, Splitters, Div_close_size) ->
    {Inline_in, In@1} = take_paragraph_chars(In, Div_close_size),
    {Inline, Inline_in_remaining} = parse_inline(
        Inline_in,
        Splitters,
        <<""/utf8>>,
        []
    ),
    {{paragraph, Attrs, Inline}, <<Inline_in_remaining/binary, In@1/binary>>}.

-file("src/jot.gleam", 2346).
-spec parse_upper_list(binary(), integer(), boolean()) -> gleam@option:option({ordinal_punctuation(),
    ordinal_style(),
    integer(),
    binary()}).
parse_upper_list(In, Num, Paren) ->
    case In of
        <<"A"/utf8, In@1/binary>> ->
            parse_upper_list(In@1, (Num * 26) + 1, Paren);

        <<"B"/utf8, In@2/binary>> ->
            parse_upper_list(In@2, (Num * 26) + 2, Paren);

        <<"C"/utf8, In@3/binary>> ->
            parse_upper_list(In@3, (Num * 26) + 3, Paren);

        <<"D"/utf8, In@4/binary>> ->
            parse_upper_list(In@4, (Num * 26) + 4, Paren);

        <<"E"/utf8, In@5/binary>> ->
            parse_upper_list(In@5, (Num * 26) + 5, Paren);

        <<"F"/utf8, In@6/binary>> ->
            parse_upper_list(In@6, (Num * 26) + 6, Paren);

        <<"G"/utf8, In@7/binary>> ->
            parse_upper_list(In@7, (Num * 26) + 7, Paren);

        <<"H"/utf8, In@8/binary>> ->
            parse_upper_list(In@8, (Num * 26) + 8, Paren);

        <<"I"/utf8, In@9/binary>> ->
            parse_upper_list(In@9, (Num * 26) + 9, Paren);

        <<"J"/utf8, In@10/binary>> ->
            parse_upper_list(In@10, (Num * 26) + 10, Paren);

        <<"K"/utf8, In@11/binary>> ->
            parse_upper_list(In@11, (Num * 26) + 11, Paren);

        <<"L"/utf8, In@12/binary>> ->
            parse_upper_list(In@12, (Num * 26) + 12, Paren);

        <<"M"/utf8, In@13/binary>> ->
            parse_upper_list(In@13, (Num * 26) + 13, Paren);

        <<"N"/utf8, In@14/binary>> ->
            parse_upper_list(In@14, (Num * 26) + 14, Paren);

        <<"O"/utf8, In@15/binary>> ->
            parse_upper_list(In@15, (Num * 26) + 15, Paren);

        <<"P"/utf8, In@16/binary>> ->
            parse_upper_list(In@16, (Num * 26) + 16, Paren);

        <<"Q"/utf8, In@17/binary>> ->
            parse_upper_list(In@17, (Num * 26) + 17, Paren);

        <<"R"/utf8, In@18/binary>> ->
            parse_upper_list(In@18, (Num * 26) + 18, Paren);

        <<"S"/utf8, In@19/binary>> ->
            parse_upper_list(In@19, (Num * 26) + 19, Paren);

        <<"T"/utf8, In@20/binary>> ->
            parse_upper_list(In@20, (Num * 26) + 20, Paren);

        <<"U"/utf8, In@21/binary>> ->
            parse_upper_list(In@21, (Num * 26) + 21, Paren);

        <<"V"/utf8, In@22/binary>> ->
            parse_upper_list(In@22, (Num * 26) + 22, Paren);

        <<"W"/utf8, In@23/binary>> ->
            parse_upper_list(In@23, (Num * 26) + 23, Paren);

        <<"X"/utf8, In@24/binary>> ->
            parse_upper_list(In@24, (Num * 26) + 24, Paren);

        <<"Y"/utf8, In@25/binary>> ->
            parse_upper_list(In@25, (Num * 26) + 25, Paren);

        <<"Z"/utf8, In@26/binary>> ->
            parse_upper_list(In@26, (Num * 26) + 26, Paren);

        <<". "/utf8, Rest/binary>> when not Paren ->
            {some, {full_stop, upper_alpha_ordinal, Num, Rest}};

        <<".\n"/utf8, Rest/binary>> when not Paren ->
            {some, {full_stop, upper_alpha_ordinal, Num, Rest}};

        <<") "/utf8, Rest@1/binary>> ->
            Punctuation = case Paren of
                true ->
                    double_paren;

                false ->
                    single_paren
            end,
            {some, {Punctuation, upper_alpha_ordinal, Num, Rest@1}};

        <<")\n"/utf8, Rest@1/binary>> ->
            Punctuation = case Paren of
                true ->
                    double_paren;

                false ->
                    single_paren
            end,
            {some, {Punctuation, upper_alpha_ordinal, Num, Rest@1}};

        _ ->
            none
    end.

-file("src/jot.gleam", 2298).
-spec parse_lower_list(binary(), integer(), boolean()) -> gleam@option:option({ordinal_punctuation(),
    ordinal_style(),
    integer(),
    binary()}).
parse_lower_list(In, Num, Paren) ->
    case In of
        <<"a"/utf8, In@1/binary>> ->
            parse_lower_list(In@1, (Num * 26) + 1, Paren);

        <<"b"/utf8, In@2/binary>> ->
            parse_lower_list(In@2, (Num * 26) + 2, Paren);

        <<"c"/utf8, In@3/binary>> ->
            parse_lower_list(In@3, (Num * 26) + 3, Paren);

        <<"d"/utf8, In@4/binary>> ->
            parse_lower_list(In@4, (Num * 26) + 4, Paren);

        <<"e"/utf8, In@5/binary>> ->
            parse_lower_list(In@5, (Num * 26) + 5, Paren);

        <<"f"/utf8, In@6/binary>> ->
            parse_lower_list(In@6, (Num * 26) + 6, Paren);

        <<"g"/utf8, In@7/binary>> ->
            parse_lower_list(In@7, (Num * 26) + 7, Paren);

        <<"h"/utf8, In@8/binary>> ->
            parse_lower_list(In@8, (Num * 26) + 8, Paren);

        <<"i"/utf8, In@9/binary>> ->
            parse_lower_list(In@9, (Num * 26) + 9, Paren);

        <<"j"/utf8, In@10/binary>> ->
            parse_lower_list(In@10, (Num * 26) + 10, Paren);

        <<"k"/utf8, In@11/binary>> ->
            parse_lower_list(In@11, (Num * 26) + 11, Paren);

        <<"l"/utf8, In@12/binary>> ->
            parse_lower_list(In@12, (Num * 26) + 12, Paren);

        <<"m"/utf8, In@13/binary>> ->
            parse_lower_list(In@13, (Num * 26) + 13, Paren);

        <<"n"/utf8, In@14/binary>> ->
            parse_lower_list(In@14, (Num * 26) + 14, Paren);

        <<"o"/utf8, In@15/binary>> ->
            parse_lower_list(In@15, (Num * 26) + 15, Paren);

        <<"p"/utf8, In@16/binary>> ->
            parse_lower_list(In@16, (Num * 26) + 16, Paren);

        <<"q"/utf8, In@17/binary>> ->
            parse_lower_list(In@17, (Num * 26) + 17, Paren);

        <<"r"/utf8, In@18/binary>> ->
            parse_lower_list(In@18, (Num * 26) + 18, Paren);

        <<"s"/utf8, In@19/binary>> ->
            parse_lower_list(In@19, (Num * 26) + 19, Paren);

        <<"t"/utf8, In@20/binary>> ->
            parse_lower_list(In@20, (Num * 26) + 20, Paren);

        <<"u"/utf8, In@21/binary>> ->
            parse_lower_list(In@21, (Num * 26) + 21, Paren);

        <<"v"/utf8, In@22/binary>> ->
            parse_lower_list(In@22, (Num * 26) + 22, Paren);

        <<"w"/utf8, In@23/binary>> ->
            parse_lower_list(In@23, (Num * 26) + 23, Paren);

        <<"x"/utf8, In@24/binary>> ->
            parse_lower_list(In@24, (Num * 26) + 24, Paren);

        <<"y"/utf8, In@25/binary>> ->
            parse_lower_list(In@25, (Num * 26) + 25, Paren);

        <<"z"/utf8, In@26/binary>> ->
            parse_lower_list(In@26, (Num * 26) + 26, Paren);

        <<". "/utf8, Rest/binary>> when not Paren ->
            {some, {full_stop, lower_alpha_ordinal, Num, Rest}};

        <<".\n"/utf8, Rest/binary>> when not Paren ->
            {some, {full_stop, lower_alpha_ordinal, Num, Rest}};

        <<") "/utf8, Rest@1/binary>> ->
            Punctuation = case Paren of
                true ->
                    double_paren;

                false ->
                    single_paren
            end,
            {some, {Punctuation, lower_alpha_ordinal, Num, Rest@1}};

        <<")\n"/utf8, Rest@1/binary>> ->
            Punctuation = case Paren of
                true ->
                    double_paren;

                false ->
                    single_paren
            end,
            {some, {Punctuation, lower_alpha_ordinal, Num, Rest@1}};

        _ ->
            none
    end.

-file("src/jot.gleam", 2269).
-spec parse_number_list(binary(), integer(), boolean()) -> gleam@option:option({ordinal_punctuation(),
    ordinal_style(),
    integer(),
    binary()}).
parse_number_list(In, Num, Paren) ->
    case In of
        <<"0"/utf8, Rest/binary>> ->
            parse_number_list(Rest, (Num * 10) + 0, Paren);

        <<"1"/utf8, Rest@1/binary>> ->
            parse_number_list(Rest@1, (Num * 10) + 1, Paren);

        <<"2"/utf8, Rest@2/binary>> ->
            parse_number_list(Rest@2, (Num * 10) + 2, Paren);

        <<"3"/utf8, Rest@3/binary>> ->
            parse_number_list(Rest@3, (Num * 10) + 3, Paren);

        <<"4"/utf8, Rest@4/binary>> ->
            parse_number_list(Rest@4, (Num * 10) + 4, Paren);

        <<"5"/utf8, Rest@5/binary>> ->
            parse_number_list(Rest@5, (Num * 10) + 5, Paren);

        <<"6"/utf8, Rest@6/binary>> ->
            parse_number_list(Rest@6, (Num * 10) + 6, Paren);

        <<"7"/utf8, Rest@7/binary>> ->
            parse_number_list(Rest@7, (Num * 10) + 7, Paren);

        <<"8"/utf8, Rest@8/binary>> ->
            parse_number_list(Rest@8, (Num * 10) + 8, Paren);

        <<"9"/utf8, Rest@9/binary>> ->
            parse_number_list(Rest@9, (Num * 10) + 9, Paren);

        <<". "/utf8, Rest@10/binary>> ->
            {some, {full_stop, numeric_ordinal, Num, Rest@10}};

        <<".\n"/utf8, Rest@10/binary>> ->
            {some, {full_stop, numeric_ordinal, Num, Rest@10}};

        <<") "/utf8, Rest@11/binary>> ->
            Punctuation = case Paren of
                true ->
                    double_paren;

                false ->
                    single_paren
            end,
            {some, {Punctuation, numeric_ordinal, Num, Rest@11}};

        <<")\n"/utf8, Rest@11/binary>> ->
            Punctuation = case Paren of
                true ->
                    double_paren;

                false ->
                    single_paren
            end,
            {some, {Punctuation, numeric_ordinal, Num, Rest@11}};

        _ ->
            none
    end.

-file("src/jot.gleam", 2112).
-spec parse_list_marker_maybe_paren(binary(), boolean()) -> gleam@option:option({list_style(),
    binary()}).
parse_list_marker_maybe_paren(In, Paren) ->
    case In of
        <<"0"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    {some, {{ordered, Start, Punctuation, Style}, In@1}};

                none ->
                    none
            end;

        <<"1"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    {some, {{ordered, Start, Punctuation, Style}, In@1}};

                none ->
                    none
            end;

        <<"2"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    {some, {{ordered, Start, Punctuation, Style}, In@1}};

                none ->
                    none
            end;

        <<"3"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    {some, {{ordered, Start, Punctuation, Style}, In@1}};

                none ->
                    none
            end;

        <<"4"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    {some, {{ordered, Start, Punctuation, Style}, In@1}};

                none ->
                    none
            end;

        <<"5"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    {some, {{ordered, Start, Punctuation, Style}, In@1}};

                none ->
                    none
            end;

        <<"6"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    {some, {{ordered, Start, Punctuation, Style}, In@1}};

                none ->
                    none
            end;

        <<"7"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    {some, {{ordered, Start, Punctuation, Style}, In@1}};

                none ->
                    none
            end;

        <<"8"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    {some, {{ordered, Start, Punctuation, Style}, In@1}};

                none ->
                    none
            end;

        <<"9"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    {some, {{ordered, Start, Punctuation, Style}, In@1}};

                none ->
                    none
            end;

        <<"a"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"b"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"c"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"d"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"e"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"f"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"g"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"h"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"i"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"j"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"k"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"l"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"m"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"n"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"o"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"p"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"q"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"r"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"s"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"t"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"u"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"v"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"w"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"x"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"y"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"z"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@1, Start@1, In@2}} ->
                    {some, {{ordered, Start@1, Punctuation@1, Style@1}, In@2}};

                none ->
                    none
            end;

        <<"A"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"B"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"C"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"D"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"E"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"F"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"G"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"H"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"I"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"J"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"K"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"L"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"M"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"N"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"O"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"P"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"Q"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"R"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"S"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"T"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"U"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"V"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"W"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"X"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"Y"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        <<"Z"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@2, Start@2, In@3}} ->
                    {some, {{ordered, Start@2, Punctuation@2, Style@2}, In@3}};

                none ->
                    none
            end;

        _ ->
            none
    end.

-file("src/jot.gleam", 2102).
-spec parse_list_marker(binary()) -> gleam@option:option({list_style(),
    binary()}).
parse_list_marker(In) ->
    case In of
        <<"- "/utf8, In@1/binary>> ->
            {some, {{bullet, bullet_dash}, In@1}};

        <<"-\n"/utf8, In@1/binary>> ->
            {some, {{bullet, bullet_dash}, In@1}};

        <<"* "/utf8, In@2/binary>> ->
            {some, {{bullet, bullet_star}, In@2}};

        <<"*\n"/utf8, In@2/binary>> ->
            {some, {{bullet, bullet_star}, In@2}};

        <<"+ "/utf8, In@3/binary>> ->
            {some, {{bullet, bullet_plus}, In@3}};

        <<"+\n"/utf8, In@3/binary>> ->
            {some, {{bullet, bullet_plus}, In@3}};

        <<"("/utf8, In@4/binary>> ->
            parse_list_marker_maybe_paren(In@4, true);

        _ ->
            parse_list_marker_maybe_paren(In, false)
    end.

-file("src/jot.gleam", 2245).
-spec continue_list(binary(), list_style()) -> gleam@option:option(binary()).
continue_list(In, Style) ->
    case parse_list_marker(In) of
        {some, {Next, In@1}} ->
            case {Style, Next} of
                {{ordered, _, P1, S1}, {ordered, _, P2, S2}} when (P1 =:= P2) andalso (S1 =:= S2) ->
                    {some, In@1};

                {_, _} when Style =:= Next ->
                    {some, In@1};

                {_, _} ->
                    none
            end;

        none ->
            none
    end.

-file("src/jot.gleam", 2261).
-spec drop_n_spaces(binary(), integer()) -> binary().
drop_n_spaces(In, Count) ->
    case In of
        _ when Count =:= 0 ->
            In;

        <<" "/utf8, Rest/binary>> ->
            drop_n_spaces(Rest, Count - 1);

        _ ->
            In
    end.

-file("src/jot.gleam", 2201).
-spec take_list_item_chars_indented(
    binary(),
    binary(),
    list_style(),
    list_layout(),
    integer()
) -> {binary(), binary(), list_layout()}.
take_list_item_chars_indented(In, Acc, Style, Layout, Indent) ->
    In@1 = drop_n_spaces(In, Indent),
    {Line, In@2} = case gleam@string:split_once(In@1, <<"\n"/utf8>>) of
        {ok, Split} ->
            Split;

        {error, _} ->
            {In@1, <<""/utf8>>}
    end,
    Acc@1 = <<Acc/binary, Line/binary>>,
    case In@2 of
        <<""/utf8>> ->
            {Acc@1, <<""/utf8>>, Layout};

        <<" "/utf8, _/binary>> ->
            take_list_item_chars_indented(
                In@2,
                <<Acc@1/binary, "\n"/utf8>>,
                Style,
                Layout,
                Indent
            );

        <<"\n "/utf8, Rest/binary>> ->
            Layout@1 = case parse_list_marker(drop_spaces(Rest)) of
                {some, _} ->
                    Layout;

                none ->
                    loose
            end,
            Acc@2 = <<Acc@1/binary, "\n\n"/utf8>>,
            In@3 = gleam@string:drop_start(In@2, 1),
            take_list_item_chars_indented(In@3, Acc@2, Style, Layout@1, Indent);

        <<"\n"/utf8, Rest2/binary>> ->
            {Acc@1, Rest2, Layout};

        _ ->
            case continue_list(In@2, Style) of
                {some, _} ->
                    {Acc@1, In@2, Layout};

                none ->
                    take_list_item_chars_indented(
                        In@2,
                        <<Acc@1/binary, "\n"/utf8>>,
                        Style,
                        Layout,
                        Indent
                    )
            end
    end.

-file("src/jot.gleam", 267).
-spec count_drop_spaces(binary(), integer()) -> {binary(), integer()}.
count_drop_spaces(In, Count) ->
    case In of
        <<" "/utf8, Rest/binary>> ->
            count_drop_spaces(Rest, Count + 1);

        Other ->
            {Other, Count}
    end.

-file("src/jot.gleam", 2055).
-spec take_list_item_chars(binary(), binary(), list_style(), list_layout()) -> {binary(),
    binary(),
    list_layout()}.
take_list_item_chars(In, Acc, Style, Layout) ->
    {Line, In@1} = case gleam@string:split_once(In, <<"\n"/utf8>>) of
        {ok, Split} ->
            Split;

        {error, _} ->
            {In, <<""/utf8>>}
    end,
    Acc@1 = <<Acc/binary, Line/binary>>,
    case In@1 of
        <<""/utf8>> ->
            {Acc@1, <<""/utf8>>, Layout};

        <<" "/utf8, _/binary>> ->
            take_list_item_chars(
                In@1,
                <<Acc@1/binary, "\n"/utf8>>,
                Style,
                Layout
            );

        <<"\n "/utf8, Rest/binary>> ->
            {Rest@1, Indent} = count_drop_spaces(Rest, 1),
            Layout@1 = case parse_list_marker(Rest@1) of
                {some, _} ->
                    Layout;

                none ->
                    loose
            end,
            Acc@2 = <<Acc@1/binary, "\n\n"/utf8>>,
            take_list_item_chars_indented(
                Rest@1,
                Acc@2,
                Style,
                Layout@1,
                Indent
            );

        <<"\n"/utf8, In@2/binary>> ->
            Layout@2 = case continue_list(In@2, Style) of
                {some, _} ->
                    loose;

                none ->
                    Layout
            end,
            {Acc@1, In@2, Layout@2};

        _ ->
            case parse_list_marker(In@1) of
                {some, _} ->
                    {Acc@1, In@1, Layout};

                none ->
                    take_list_item_chars(
                        In@1,
                        <<Acc@1/binary, "\n"/utf8>>,
                        Style,
                        Layout
                    )
            end
    end.

-file("src/jot.gleam", 690).
?DOC(
    " Checks if current line is a suitable terminator for\n"
    " a div fence of a particular size.\n"
    "\n"
    " Returns the rest of the input if it is.\n"
).
-spec check_first_line_suitable_div_end(binary(), integer()) -> gleam@option:option(binary()).
check_first_line_suitable_div_end(In, Fence_size) ->
    {Line, Rest} = slurp_to_line_end(In),
    case check_line_suitable_div_end(Line, Fence_size) of
        false ->
            none;

        true ->
            {some, Rest}
    end.

-file("src/jot.gleam", 742).
?DOC(
    " Parse the class name for a div. Returns Some if a classname is present.\n"
    " Returns Some if no classname is present. Returns None if the text is an\n"
    " invalid classname.\n"
).
-spec parse_div_class(binary()) -> gleam@option:option({binary(), binary()}).
parse_div_class(In) ->
    {Line, Rest} = slurp_to_line_end(In),
    Line@1 = gleam@string:trim(Line),
    Has_prohibited = gleam@list:any(
        [<<" "/utf8>>, <<"\t"/utf8>>],
        fun(_capture) -> gleam_stdlib:contains_string(Line@1, _capture) end
    ),
    case Has_prohibited of
        false ->
            {some, {Line@1, Rest}};

        true ->
            none
    end.

-file("src/jot.gleam", 732).
?DOC(
    " Counts the size of a div fence. Used in initial parsing of a div once a\n"
    " minimum fence structure has been seen: `:::`.\n"
    "\n"
    " Returns the size of the fence seen with the remainder of the unused input\n"
    " stream.\n"
).
-spec count_div_fence_size(binary(), integer()) -> {integer(), binary()}.
count_div_fence_size(In, Count) ->
    case In of
        <<":"/utf8, Rest/binary>> ->
            count_div_fence_size(Rest, Count + 1);

        _ ->
            {Count, In}
    end.

-file("src/jot.gleam", 889).
-spec parse_ref_value(binary(), binary(), binary()) -> gleam@option:option({binary(),
    binary(),
    binary()}).
parse_ref_value(In, Id, Url) ->
    case In of
        <<"\n "/utf8, In@1/binary>> ->
            parse_ref_value(drop_spaces(In@1), Id, Url);

        <<"\n"/utf8, In@2/binary>> ->
            {some, {Id, gleam@string:trim(Url), In@2}};

        _ ->
            case gleam_stdlib:string_pop_grapheme(In) of
                {ok, {C, In@3}} ->
                    parse_ref_value(In@3, Id, <<Url/binary, C/binary>>);

                {error, _} ->
                    {some, {Id, gleam@string:trim(Url), <<""/utf8>>}}
            end
    end.

-file("src/jot.gleam", 877).
-spec parse_ref_def(binary(), binary()) -> gleam@option:option({binary(),
    binary(),
    binary()}).
parse_ref_def(In, Id) ->
    case In of
        <<"]:"/utf8, In@1/binary>> ->
            parse_ref_value(In@1, Id, <<""/utf8>>);

        <<""/utf8>> ->
            none;

        <<"]"/utf8, _/binary>> ->
            none;

        <<"\n"/utf8, _/binary>> ->
            none;

        _ ->
            case gleam_stdlib:string_pop_grapheme(In) of
                {ok, {C, In@2}} ->
                    parse_ref_def(In@2, <<Id/binary, C/binary>>);

                {error, _} ->
                    none
            end
    end.

-file("src/jot.gleam", 253).
-spec drop_lines(binary()) -> binary().
drop_lines(In) ->
    case In of
        <<"\n"/utf8, Rest/binary>> ->
            drop_lines(Rest);

        Other ->
            Other
    end.

-file("src/jot.gleam", 754).
-spec parse_thematic_break(integer(), binary()) -> gleam@option:option({container(),
    binary()}).
parse_thematic_break(Count, In) ->
    case In of
        <<""/utf8>> when Count >= 3 ->
            {some, {thematic_break, In}};

        <<"\n"/utf8, _/binary>> when Count >= 3 ->
            {some, {thematic_break, In}};

        <<" "/utf8, Rest/binary>> ->
            parse_thematic_break(Count, Rest);

        <<"\t"/utf8, Rest/binary>> ->
            parse_thematic_break(Count, Rest);

        <<"-"/utf8, Rest@1/binary>> ->
            parse_thematic_break(Count + 1, Rest@1);

        <<"*"/utf8, Rest@1/binary>> ->
            parse_thematic_break(Count + 1, Rest@1);

        _ ->
            none
    end.

-file("src/jot.gleam", 1086).
-spec take_block_quote_stop_on_div_close(
    binary(),
    list(binary()),
    gleam@option:option(integer())
) -> {list(binary()), binary()}.
take_block_quote_stop_on_div_close(In, Lines, Div_close_size) ->
    {Line, Rest} = slurp_to_line_end(In),
    case Div_close_size of
        none ->
            case Rest of
                <<""/utf8>> ->
                    {[Line | Lines], <<""/utf8>>};

                _ ->
                    take_block_quote_chars(Rest, [Line | Lines], Div_close_size)
            end;

        {some, Size} ->
            case check_line_suitable_div_end(Line, Size) of
                true ->
                    {Lines, In};

                false ->
                    case Rest of
                        <<""/utf8>> ->
                            {[Line | Lines], <<""/utf8>>};

                        _ ->
                            take_block_quote_chars(
                                Rest,
                                [Line | Lines],
                                Div_close_size
                            )
                    end
            end
    end.

-file("src/jot.gleam", 1059).
-spec take_block_quote_chars(
    binary(),
    list(binary()),
    gleam@option:option(integer())
) -> {list(binary()), binary()}.
take_block_quote_chars(In, Lines, Div_close_size) ->
    case In of
        <<"\n"/utf8, In@1/binary>> ->
            {Lines, In@1};

        <<">"/utf8>> ->
            {[<<""/utf8>> | Lines], <<""/utf8>>};

        <<">\n"/utf8, In@2/binary>> ->
            case Lines of
                [] ->
                    take_block_quote_chars(In@2, [], Div_close_size);

                _ ->
                    take_block_quote_chars(
                        In@2,
                        [<<""/utf8>> | Lines],
                        Div_close_size
                    )
            end;

        <<"> "/utf8, In@3/binary>> ->
            case gleam@string:split_once(In@3, <<"\n"/utf8>>) of
                {ok, {Line, In@4}} ->
                    take_block_quote_chars(In@4, [Line | Lines], Div_close_size);

                {error, _} ->
                    {[In@3 | Lines], <<""/utf8>>}
            end;

        In@5 ->
            take_block_quote_stop_on_div_close(In@5, Lines, Div_close_size)
    end.

-file("src/jot.gleam", 827).
-spec slurp_verbatim_line(binary(), integer(), binary(), splitters()) -> {binary(),
    binary()}.
slurp_verbatim_line(In, Indentation, Acc, Splitters) ->
    case splitter_ffi:split(erlang:element(2, Splitters), In) of
        {Before, <<"\n"/utf8>>, In@1} ->
            {<<<<Acc/binary, Before/binary>>/binary, "\n"/utf8>>, In@1};

        {<<""/utf8>>, <<" "/utf8>>, In@2} when Indentation > 0 ->
            slurp_verbatim_line(In@2, Indentation - 1, Acc, Splitters);

        {Before@1, Split, In@3} ->
            slurp_verbatim_line(
                In@3,
                Indentation,
                <<<<Acc/binary, Before@1/binary>>/binary, Split/binary>>,
                Splitters
            )
    end.

-file("src/jot.gleam", 842).
-spec parse_codeblock_end(binary(), binary(), integer()) -> gleam@option:option(binary()).
parse_codeblock_end(In, Delim, Count) ->
    case In of
        <<"\n"/utf8, In@1/binary>> when Count =:= 0 ->
            {some, In@1};

        _ when Count =:= 0 ->
            {some, In};

        <<" "/utf8, In@2/binary>> ->
            parse_codeblock_end(In@2, Delim, Count);

        _ ->
            case gleam_stdlib:string_pop_grapheme(In) of
                {ok, {C, In@3}} when C =:= Delim ->
                    parse_codeblock_end(In@3, Delim, Count - 1);

                {ok, _} ->
                    none;

                {error, _} ->
                    {some, In}
            end
    end.

-file("src/jot.gleam", 810).
-spec parse_codeblock_content(
    binary(),
    binary(),
    integer(),
    integer(),
    binary(),
    splitters()
) -> {binary(), binary()}.
parse_codeblock_content(In, Delim, Count, Indentation, Acc, Splitters) ->
    case parse_codeblock_end(In, Delim, Count) of
        none ->
            {Acc@1, In@1} = slurp_verbatim_line(In, Indentation, Acc, Splitters),
            parse_codeblock_content(
                In@1,
                Delim,
                Count,
                Indentation,
                Acc@1,
                Splitters
            );

        {some, In@2} ->
            {Acc, In@2}
    end.

-file("src/jot.gleam", 863).
-spec parse_codeblock_language(binary(), splitters(), binary()) -> gleam@option:option({gleam@option:option(binary()),
    binary()}).
parse_codeblock_language(In, Splitters, Language) ->
    case splitter_ffi:split(erlang:element(3, Splitters), In) of
        {_, <<"`"/utf8>>, _} ->
            none;

        {A, <<"\n"/utf8>>, _} when (A =:= <<""/utf8>>) andalso (Language =:= <<""/utf8>>) ->
            {some, {none, In}};

        {A@1, <<"\n"/utf8>>, In@1} ->
            {some, {{some, <<Language/binary, A@1/binary>>}, In@1}};

        _ ->
            {some, {none, In}}
    end.

-file("src/jot.gleam", 783).
-spec parse_codeblock_start(binary(), splitters(), binary(), integer()) -> gleam@option:option({gleam@option:option(binary()),
    integer(),
    binary()}).
parse_codeblock_start(In, Splitters, Delim, Count) ->
    case In of
        <<"`"/utf8, In@1/binary>> when <<"`"/utf8>> =:= Delim ->
            C = <<"`"/utf8>>,
            parse_codeblock_start(In@1, Splitters, Delim, Count + 1);

        <<"~"/utf8, In@1/binary>> when <<"~"/utf8>> =:= Delim ->
            C = <<"~"/utf8>>,
            parse_codeblock_start(In@1, Splitters, Delim, Count + 1);

        <<"\n"/utf8, In@2/binary>> when Count >= 3 ->
            {some, {none, Count, In@2}};

        <<""/utf8>> ->
            none;

        _ when Count >= 3 ->
            In@3 = drop_spaces(In),
            gleam@option:map(
                parse_codeblock_language(In@3, Splitters, <<""/utf8>>),
                fun(_use0) ->
                    {Language, In@4} = _use0,
                    {Language, Count, In@4}
                end
            );

        _ ->
            none
    end.

-file("src/jot.gleam", 766).
-spec parse_codeblock(
    binary(),
    gleam@dict:dict(binary(), binary()),
    binary(),
    integer(),
    splitters()
) -> gleam@option:option({container(), binary()}).
parse_codeblock(In, Attrs, Delim, Indentation, Splitters) ->
    Out = parse_codeblock_start(In, Splitters, Delim, 1),
    gleam@option:then(
        Out,
        fun(_use0) ->
            {Language, Count, In@1} = _use0,
            {Content, In@2} = parse_codeblock_content(
                In@1,
                Delim,
                Count,
                Indentation,
                <<""/utf8>>,
                Splitters
            ),
            case Language of
                {some, <<"=html"/utf8>>} ->
                    {some, {{raw_block, gleam@string:trim_end(Content)}, In@2}};

                _ ->
                    {some, {{codeblock, Attrs, Language, Content}, In@2}}
            end
        end
    ).

-file("src/jot.gleam", 1181).
-spec id_sanitise(binary()) -> binary().
id_sanitise(Content) ->
    _pipe = Content,
    _pipe@1 = gleam@string:replace(_pipe, <<"#"/utf8>>, <<""/utf8>>),
    _pipe@2 = gleam@string:replace(_pipe@1, <<"?"/utf8>>, <<""/utf8>>),
    _pipe@3 = gleam@string:replace(_pipe@2, <<"!"/utf8>>, <<""/utf8>>),
    _pipe@4 = gleam@string:replace(_pipe@3, <<","/utf8>>, <<""/utf8>>),
    _pipe@5 = gleam@string:trim(_pipe@4),
    _pipe@6 = gleam@string:replace(_pipe@5, <<" "/utf8>>, <<"-"/utf8>>),
    gleam@string:replace(_pipe@6, <<"\n"/utf8>>, <<"-"/utf8>>).

-file("src/jot.gleam", 1214).
-spec take_heading_chars_newline_hash(binary(), integer(), binary()) -> gleam@option:option({binary(),
    binary()}).
take_heading_chars_newline_hash(In, Level, Acc) ->
    case In of
        _ when Level < 0 ->
            none;

        <<""/utf8>> when Level > 0 ->
            none;

        <<""/utf8>> when Level =:= 0 ->
            {some, {Acc, <<""/utf8>>}};

        <<" "/utf8, In@1/binary>> when Level =:= 0 ->
            {some, {Acc, In@1}};

        <<"#"/utf8, Rest/binary>> ->
            take_heading_chars_newline_hash(Rest, Level - 1, Acc);

        _ ->
            none
    end.

-file("src/jot.gleam", 1192).
-spec take_heading_chars(binary(), integer(), binary()) -> {binary(), binary()}.
take_heading_chars(In, Level, Acc) ->
    case In of
        <<""/utf8>> ->
            {Acc, <<""/utf8>>};

        <<"\n"/utf8>> ->
            {Acc, <<""/utf8>>};

        <<"\n\n"/utf8, In@1/binary>> ->
            {Acc, In@1};

        <<"\n#"/utf8, Rest/binary>> ->
            case take_heading_chars_newline_hash(
                Rest,
                Level - 1,
                <<Acc/binary, "\n"/utf8>>
            ) of
                {some, {Acc@1, In@2}} ->
                    take_heading_chars(In@2, Level, Acc@1);

                none ->
                    {Acc, In}
            end;

        _ ->
            case gleam_stdlib:string_pop_grapheme(In) of
                {ok, {C, In@3}} ->
                    take_heading_chars(In@3, Level, <<Acc/binary, C/binary>>);

                {error, _} ->
                    {Acc, <<""/utf8>>}
            end
    end.

-file("src/jot.gleam", 1957).
-spec heading_level(binary(), integer()) -> gleam@option:option({integer(),
    binary()}).
heading_level(In, Level) ->
    case In of
        <<"#"/utf8, Rest/binary>> ->
            heading_level(Rest, Level + 1);

        <<""/utf8>> when Level > 0 ->
            {some, {Level, <<""/utf8>>}};

        <<" "/utf8, Rest@1/binary>> when Level =/= 0 ->
            {some, {Level, Rest@1}};

        <<"\n"/utf8, Rest@1/binary>> when Level =/= 0 ->
            {some, {Level, Rest@1}};

        _ ->
            none
    end.

-file("src/jot.gleam", 1130).
-spec parse_heading(
    binary(),
    refs(),
    splitters(),
    gleam@dict:dict(binary(), binary()),
    gleam@option:option(integer())
) -> {container(), refs(), binary()}.
parse_heading(In, Refs, Splitters, Attrs, Div_close_size) ->
    case heading_level(In, 1) of
        {some, {Level, In@1}} ->
            In@2 = drop_spaces(In@1),
            {Inline_in, In@3} = take_heading_chars(In@2, Level, <<""/utf8>>),
            {Inline, Inline_in_remaining} = parse_inline(
                Inline_in,
                Splitters,
                <<""/utf8>>,
                []
            ),
            Text = take_inline_text(Inline, <<""/utf8>>),
            {Refs@3, Attrs@3} = case id_sanitise(Text) of
                <<""/utf8>> ->
                    {Refs, Attrs};

                Id ->
                    case gleam_stdlib:map_get(erlang:element(4, Refs), Id) of
                        {ok, I} ->
                            I@1 = I + 1,
                            Refs@1 = {refs,
                                erlang:element(2, Refs),
                                erlang:element(3, Refs),
                                gleam@dict:insert(
                                    erlang:element(4, Refs),
                                    Id,
                                    I@1
                                ),
                                erlang:element(5, Refs)},
                            Id@1 = <<<<Id/binary, "-"/utf8>>/binary,
                                (erlang:integer_to_binary(I@1))/binary>>,
                            Attrs@1 = add_attribute(Attrs, <<"id"/utf8>>, Id@1),
                            {Refs@1, Attrs@1};

                        {error, _} ->
                            Refs@2 = {refs,
                                erlang:element(2, Refs),
                                erlang:element(3, Refs),
                                gleam@dict:insert(
                                    erlang:element(4, Refs),
                                    Id,
                                    0
                                ),
                                erlang:element(5, Refs)},
                            Attrs@2 = add_attribute(Attrs, <<"id"/utf8>>, Id),
                            {Refs@2, Attrs@2}
                    end
            end,
            Heading = {heading, Attrs@3, Level, Inline},
            {Heading, Refs@3, <<Inline_in_remaining/binary, In@3/binary>>};

        none ->
            {P, In@4} = parse_paragraph(
                <<"#"/utf8, In/binary>>,
                Attrs,
                Splitters,
                Div_close_size
            ),
            {P, Refs, In@4}
    end.

-file("src/jot.gleam", 2036).
-spec parse_list_item(
    binary(),
    refs(),
    gleam@dict:dict(binary(), binary()),
    splitters(),
    list(container())
) -> list(container()).
parse_list_item(In, Refs, Attrs, Splitters, Children) ->
    {In@1, Refs@1, Container, Attrs@1} = parse_container(
        In,
        Refs,
        Splitters,
        Attrs,
        0,
        none
    ),
    Children@1 = case Container of
        none ->
            Children;

        {some, Container@1} ->
            [Container@1 | Children]
    end,
    case In@1 of
        <<""/utf8>> ->
            lists:reverse(Children@1);

        _ ->
            parse_list_item(In@1, Refs@1, Attrs@1, Splitters, Children@1)
    end.

-file("src/jot.gleam", 2010).
-spec parse_list(
    binary(),
    refs(),
    gleam@dict:dict(binary(), binary()),
    list_style(),
    list_layout(),
    list(list(container())),
    splitters()
) -> {container(), binary()}.
parse_list(In, Refs, Attrs, Style, Layout, Items, Splitters) ->
    {Inline_in, In@1, Layout@1} = take_list_item_chars(
        In,
        <<""/utf8>>,
        Style,
        Layout
    ),
    Item = parse_list_item(Inline_in, Refs, Attrs, Splitters, []),
    Items@1 = [Item | Items],
    case continue_list(In@1, Style) of
        {some, In@2} ->
            parse_list(In@2, Refs, Attrs, Style, Layout@1, Items@1, Splitters);

        none ->
            Items@2 = lists:reverse(Items@1),
            Container = case Style of
                {bullet, Style@1} ->
                    {bullet_list, Layout@1, Style@1, Items@2};

                {ordered, Start, Punctuation, Ordinal} ->
                    {ordered_list,
                        Layout@1,
                        Punctuation,
                        Ordinal,
                        Start,
                        Items@2}
            end,
            {Container, In@1}
    end.

-file("src/jot.gleam", 528).
-spec parse_maybe_list(
    binary(),
    refs(),
    gleam@dict:dict(binary(), binary()),
    splitters(),
    boolean()
) -> gleam@option:option({binary(), refs(), container()}).
parse_maybe_list(In, Refs, Attrs, Splitters, Paren) ->
    case In of
        <<"0"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    Style@1 = {ordered, Start, Punctuation, Style},
                    {List, In@2} = parse_list(
                        In@1,
                        Refs,
                        Attrs,
                        Style@1,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@2, Refs, List}};

                none ->
                    none
            end;

        <<"1"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    Style@1 = {ordered, Start, Punctuation, Style},
                    {List, In@2} = parse_list(
                        In@1,
                        Refs,
                        Attrs,
                        Style@1,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@2, Refs, List}};

                none ->
                    none
            end;

        <<"2"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    Style@1 = {ordered, Start, Punctuation, Style},
                    {List, In@2} = parse_list(
                        In@1,
                        Refs,
                        Attrs,
                        Style@1,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@2, Refs, List}};

                none ->
                    none
            end;

        <<"3"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    Style@1 = {ordered, Start, Punctuation, Style},
                    {List, In@2} = parse_list(
                        In@1,
                        Refs,
                        Attrs,
                        Style@1,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@2, Refs, List}};

                none ->
                    none
            end;

        <<"4"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    Style@1 = {ordered, Start, Punctuation, Style},
                    {List, In@2} = parse_list(
                        In@1,
                        Refs,
                        Attrs,
                        Style@1,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@2, Refs, List}};

                none ->
                    none
            end;

        <<"5"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    Style@1 = {ordered, Start, Punctuation, Style},
                    {List, In@2} = parse_list(
                        In@1,
                        Refs,
                        Attrs,
                        Style@1,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@2, Refs, List}};

                none ->
                    none
            end;

        <<"6"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    Style@1 = {ordered, Start, Punctuation, Style},
                    {List, In@2} = parse_list(
                        In@1,
                        Refs,
                        Attrs,
                        Style@1,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@2, Refs, List}};

                none ->
                    none
            end;

        <<"7"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    Style@1 = {ordered, Start, Punctuation, Style},
                    {List, In@2} = parse_list(
                        In@1,
                        Refs,
                        Attrs,
                        Style@1,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@2, Refs, List}};

                none ->
                    none
            end;

        <<"8"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    Style@1 = {ordered, Start, Punctuation, Style},
                    {List, In@2} = parse_list(
                        In@1,
                        Refs,
                        Attrs,
                        Style@1,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@2, Refs, List}};

                none ->
                    none
            end;

        <<"9"/utf8, _/binary>> ->
            case parse_number_list(In, 0, Paren) of
                {some, {Punctuation, Style, Start, In@1}} ->
                    Style@1 = {ordered, Start, Punctuation, Style},
                    {List, In@2} = parse_list(
                        In@1,
                        Refs,
                        Attrs,
                        Style@1,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@2, Refs, List}};

                none ->
                    none
            end;

        <<"a"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"b"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"c"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"d"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"e"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"f"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"g"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"h"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"i"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"j"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"k"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"l"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"m"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"n"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"o"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"p"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"q"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"r"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"s"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"t"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"u"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"v"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"w"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"x"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"y"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"z"/utf8, _/binary>> ->
            case parse_lower_list(In, 0, Paren) of
                {some, {Punctuation@1, Style@2, Start@1, In@3}} ->
                    Style@3 = {ordered, Start@1, Punctuation@1, Style@2},
                    {List@1, In@4} = parse_list(
                        In@3,
                        Refs,
                        Attrs,
                        Style@3,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@4, Refs, List@1}};

                none ->
                    none
            end;

        <<"A"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"B"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"C"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"D"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"E"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"F"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"G"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"H"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"I"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"J"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"K"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"L"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"M"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"N"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"O"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"P"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"Q"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"R"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"S"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"T"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"U"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"V"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"W"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"X"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"Y"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        <<"Z"/utf8, _/binary>> ->
            case parse_upper_list(In, 0, Paren) of
                {some, {Punctuation@2, Style@4, Start@2, In@5}} ->
                    Style@5 = {ordered, Start@2, Punctuation@2, Style@4},
                    {List@2, In@6} = parse_list(
                        In@5,
                        Refs,
                        Attrs,
                        Style@5,
                        tight,
                        [],
                        Splitters
                    ),
                    {some, {In@6, Refs, List@2}};

                none ->
                    none
            end;

        _ ->
            none
    end.

-file("src/jot.gleam", 657).
-spec parse_div_content(
    binary(),
    refs(),
    gleam@dict:dict(binary(), binary()),
    integer(),
    splitters(),
    list(container())
) -> {binary(), list(container())}.
parse_div_content(In, Refs, Attrs, Fence_size, Splitters, Children) ->
    case check_first_line_suitable_div_end(In, Fence_size) of
        {some, In2} ->
            {In2, lists:reverse(Children)};

        none ->
            {In@1, Refs@1, Container, Attrs@1} = parse_container(
                In,
                Refs,
                Splitters,
                Attrs,
                0,
                {some, Fence_size}
            ),
            Children@1 = case Container of
                none ->
                    Children;

                {some, Container@1} ->
                    [Container@1 | Children]
            end,
            case In@1 of
                <<""/utf8>> ->
                    {In@1, lists:reverse(Children@1)};

                _ ->
                    parse_div_content(
                        In@1,
                        Refs@1,
                        Attrs@1,
                        Fence_size,
                        Splitters,
                        Children@1
                    )
            end
    end.

-file("src/jot.gleam", 634).
?DOC(" Parse a div.\n").
-spec parse_div(
    binary(),
    refs(),
    gleam@dict:dict(binary(), binary()),
    splitters()
) -> gleam@option:option({binary(),
    gleam@option:option(binary()),
    gleam@dict:dict(binary(), binary()),
    list(container())}).
parse_div(In, Refs, Attrs, Splitters) ->
    {Size, In2} = count_div_fence_size(In, 3),
    Class = parse_div_class(In2),
    gleam@option:then(
        Class,
        fun(_use0) ->
            {Class@1, Rest} = _use0,
            Attrs@1 = case Class@1 of
                <<""/utf8>> ->
                    Attrs;

                Class@2 ->
                    add_attribute(Attrs, <<"class"/utf8>>, Class@2)
            end,
            Class@3 = case Class@1 of
                <<""/utf8>> ->
                    none;

                _ ->
                    {some, Class@1}
            end,
            {Rest@1, Content} = parse_div_content(
                Rest,
                Refs,
                maps:new(),
                Size,
                Splitters,
                []
            ),
            {some, {Rest@1, Class@3, Attrs@1, Content}}
        end
    ).

-file("src/jot.gleam", 334).
?DOC(
    " Parse a block of Djot that ends once the content is no longer indented\n"
    " to a certain level.\n"
    " For example:\n"
    "\n"
    " ```djot\n"
    " Here's the reference.[^ref]\n"
    "\n"
    " [^ref]: This footnote is a block with two paragraphs.\n"
    "\n"
    "   This is part of the block because it is indented past the start of `[^ref]`\n"
    "\n"
    " But this would not be parsed as part of the block because it has no indentation\n"
    " ```\n"
).
-spec parse_block(
    binary(),
    refs(),
    splitters(),
    list(container()),
    gleam@dict:dict(binary(), binary()),
    integer()
) -> {list(container()), refs(), binary()}.
parse_block(In, Refs, Splitters, Ast, Attrs, Required_spaces) ->
    In@1 = drop_lines(In),
    {In@2, Indentation} = count_drop_spaces(In@1, 0),
    case Indentation < Required_spaces of
        true ->
            {lists:reverse(Ast), Refs, In@2};

        false ->
            {In@3, Refs@1, Container, Attrs@1} = parse_container(
                In@2,
                Refs,
                Splitters,
                Attrs,
                Indentation,
                none
            ),
            Ast@1 = case Container of
                none ->
                    Ast;

                {some, Container@1} ->
                    [Container@1 | Ast]
            end,
            case In@3 of
                <<""/utf8>> ->
                    {lists:reverse(Ast@1), Refs@1, In@3};

                _ ->
                    parse_block(
                        In@3,
                        Refs@1,
                        Splitters,
                        Ast@1,
                        Attrs@1,
                        Required_spaces
                    )
            end
    end.

-file("src/jot.gleam", 366).
?DOC(
    " This function allows us to parse the contents of a block after we know\n"
    " that the *first* container meets indentation requirements, but we want to\n"
    " ensure that once this container is parsed, future containers meet the\n"
    " indentation requirements\n"
).
-spec parse_block_after_indent_checked(
    binary(),
    refs(),
    splitters(),
    list(container()),
    gleam@dict:dict(binary(), binary()),
    integer(),
    integer()
) -> {list(container()), refs(), binary()}.
parse_block_after_indent_checked(
    In,
    Refs,
    Splitters,
    Ast,
    Attrs,
    Required_spaces,
    Indentation
) ->
    {In@1, Refs@1, Container, Attrs@1} = parse_container(
        In,
        Refs,
        Splitters,
        Attrs,
        Indentation,
        none
    ),
    Ast@1 = case Container of
        none ->
            Ast;

        {some, Container@1} ->
            [Container@1 | Ast]
    end,
    case In@1 of
        <<""/utf8>> ->
            {lists:reverse(Ast@1), Refs@1, In@1};

        _ ->
            parse_block(
                In@1,
                Refs@1,
                Splitters,
                Ast@1,
                Attrs@1,
                Required_spaces
            )
    end.

-file("src/jot.gleam", 905).
-spec parse_footnote_def(binary(), refs(), splitters(), binary()) -> gleam@option:option({binary(),
    list(container()),
    refs(),
    binary()}).
parse_footnote_def(In, Refs, Splitters, Id) ->
    case In of
        <<"]:"/utf8, In@1/binary>> ->
            {In@2, Spaces_count} = count_drop_spaces(In@1, 0),
            Block_parser = case In@2 of
                <<"\n"/utf8, _/binary>> ->
                    fun parse_block/6;

                _ ->
                    fun(In@3, Refs@1, Splitters@1, Ast, Attrs, Required_spaces) ->
                        parse_block_after_indent_checked(
                            In@3,
                            Refs@1,
                            Splitters@1,
                            Ast,
                            Attrs,
                            Required_spaces,
                            (4 + string:length(Id)) + Spaces_count
                        )
                    end
            end,
            {Block, Refs@2, Rest} = Block_parser(
                In@2,
                Refs,
                Splitters,
                [],
                maps:new(),
                1
            ),
            {some, {Id, Block, Refs@2, Rest}};

        <<""/utf8>> ->
            none;

        <<"]"/utf8, _/binary>> ->
            none;

        <<"\n"/utf8, _/binary>> ->
            none;

        _ ->
            case gleam_stdlib:string_pop_grapheme(In) of
                {ok, {C, In@4}} ->
                    parse_footnote_def(
                        In@4,
                        Refs,
                        Splitters,
                        <<Id/binary, C/binary>>
                    );

                {error, _} ->
                    none
            end
    end.

-file("src/jot.gleam", 1111).
-spec parse_block_quote_items(
    binary(),
    refs(),
    gleam@dict:dict(binary(), binary()),
    splitters(),
    list(container())
) -> list(container()).
parse_block_quote_items(In, Refs, Attrs, Splitters, Children) ->
    {In@1, Refs@1, Container, Attrs@1} = parse_container(
        In,
        Refs,
        Splitters,
        Attrs,
        0,
        none
    ),
    Children@1 = case Container of
        none ->
            Children;

        {some, Container@1} ->
            [Container@1 | Children]
    end,
    case In@1 of
        <<""/utf8>> ->
            lists:reverse(Children@1);

        _ ->
            parse_block_quote_items(
                In@1,
                Refs@1,
                Attrs@1,
                Splitters,
                Children@1
            )
    end.

-file("src/jot.gleam", 1040).
-spec parse_block_quote(
    binary(),
    refs(),
    gleam@dict:dict(binary(), binary()),
    splitters(),
    gleam@option:option(integer())
) -> {container(), binary()}.
parse_block_quote(In, Refs, Attrs, Splitters, Div_close_size) ->
    {Reversed_lines, In@1} = take_block_quote_chars(In, [], Div_close_size),
    Items = case lists:reverse(Reversed_lines) of
        [] ->
            [];

        Lines ->
            Content = gleam@string:join(Lines, <<"\n"/utf8>>),
            parse_block_quote_items(Content, Refs, maps:new(), Splitters, [])
    end,
    {{block_quote, Attrs, Items}, In@1}.

-file("src/jot.gleam", 387).
-spec parse_container(
    binary(),
    refs(),
    splitters(),
    gleam@dict:dict(binary(), binary()),
    integer(),
    gleam@option:option(integer())
) -> {binary(),
    refs(),
    gleam@option:option(container()),
    gleam@dict:dict(binary(), binary())}.
parse_container(In, Refs, Splitters, Attrs, Indentation, Div_close_size) ->
    case In of
        <<""/utf8>> ->
            {In, Refs, none, maps:new()};

        <<"{"/utf8, In2/binary>> ->
            case parse_attributes(In2, Attrs) of
                none ->
                    {Paragraph, In@1} = parse_paragraph(
                        In,
                        Attrs,
                        Splitters,
                        Div_close_size
                    ),
                    {In@1, Refs, {some, Paragraph}, maps:new()};

                {some, {Attrs@1, In@2}} ->
                    {In@2, Refs, none, Attrs@1}
            end;

        <<"#"/utf8, In@3/binary>> ->
            {Heading, Refs@1, In@4} = parse_heading(
                In@3,
                Refs,
                Splitters,
                Attrs,
                Div_close_size
            ),
            {In@4, Refs@1, {some, Heading}, maps:new()};

        <<"~"/utf8, In2@1/binary>> ->
            Delim = <<"~"/utf8>>,
            case parse_codeblock(In2@1, Attrs, Delim, Indentation, Splitters) of
                none ->
                    {Paragraph@1, In@5} = parse_paragraph(
                        In,
                        Attrs,
                        Splitters,
                        Div_close_size
                    ),
                    {In@5, Refs, {some, Paragraph@1}, maps:new()};

                {some, {Codeblock, In@6}} ->
                    {In@6, Refs, {some, Codeblock}, maps:new()}
            end;

        <<"`"/utf8, In2@1/binary>> ->
            Delim = <<"`"/utf8>>,
            case parse_codeblock(In2@1, Attrs, Delim, Indentation, Splitters) of
                none ->
                    {Paragraph@1, In@5} = parse_paragraph(
                        In,
                        Attrs,
                        Splitters,
                        Div_close_size
                    ),
                    {In@5, Refs, {some, Paragraph@1}, maps:new()};

                {some, {Codeblock, In@6}} ->
                    {In@6, Refs, {some, Codeblock}, maps:new()}
            end;

        <<"> "/utf8, _/binary>> ->
            {Block_quote, In@7} = parse_block_quote(
                In,
                Refs,
                Attrs,
                Splitters,
                Div_close_size
            ),
            {In@7, Refs, {some, Block_quote}, maps:new()};

        <<">\n"/utf8, _/binary>> ->
            {Block_quote, In@7} = parse_block_quote(
                In,
                Refs,
                Attrs,
                Splitters,
                Div_close_size
            ),
            {In@7, Refs, {some, Block_quote}, maps:new()};

        <<"-"/utf8, In2@2/binary>> ->
            Style = <<"-"/utf8>>,
            case {parse_thematic_break(1, In2@2), In2@2} of
                {none, <<" "/utf8, In2@3/binary>>} ->
                    Bullet_style = case Style of
                        <<"-"/utf8>> ->
                            bullet_dash;

                        <<"*"/utf8>> ->
                            bullet_star;

                        _ ->
                            bullet_plus
                    end,
                    Style@1 = {bullet, Bullet_style},
                    {List, In@8} = parse_list(
                        In2@3,
                        Refs,
                        Attrs,
                        Style@1,
                        tight,
                        [],
                        Splitters
                    ),
                    {In@8, Refs, {some, List}, maps:new()};

                {none, <<"\n"/utf8, In2@3/binary>>} ->
                    Bullet_style = case Style of
                        <<"-"/utf8>> ->
                            bullet_dash;

                        <<"*"/utf8>> ->
                            bullet_star;

                        _ ->
                            bullet_plus
                    end,
                    Style@1 = {bullet, Bullet_style},
                    {List, In@8} = parse_list(
                        In2@3,
                        Refs,
                        Attrs,
                        Style@1,
                        tight,
                        [],
                        Splitters
                    ),
                    {In@8, Refs, {some, List}, maps:new()};

                {none, _} ->
                    {Paragraph@2, In@9} = parse_paragraph(
                        In,
                        Attrs,
                        Splitters,
                        Div_close_size
                    ),
                    {In@9, Refs, {some, Paragraph@2}, maps:new()};

                {{some, {Thematic_break, In@10}}, _} ->
                    {In@10, Refs, {some, Thematic_break}, maps:new()}
            end;

        <<"*"/utf8, In2@2/binary>> ->
            Style = <<"*"/utf8>>,
            case {parse_thematic_break(1, In2@2), In2@2} of
                {none, <<" "/utf8, In2@3/binary>>} ->
                    Bullet_style = case Style of
                        <<"-"/utf8>> ->
                            bullet_dash;

                        <<"*"/utf8>> ->
                            bullet_star;

                        _ ->
                            bullet_plus
                    end,
                    Style@1 = {bullet, Bullet_style},
                    {List, In@8} = parse_list(
                        In2@3,
                        Refs,
                        Attrs,
                        Style@1,
                        tight,
                        [],
                        Splitters
                    ),
                    {In@8, Refs, {some, List}, maps:new()};

                {none, <<"\n"/utf8, In2@3/binary>>} ->
                    Bullet_style = case Style of
                        <<"-"/utf8>> ->
                            bullet_dash;

                        <<"*"/utf8>> ->
                            bullet_star;

                        _ ->
                            bullet_plus
                    end,
                    Style@1 = {bullet, Bullet_style},
                    {List, In@8} = parse_list(
                        In2@3,
                        Refs,
                        Attrs,
                        Style@1,
                        tight,
                        [],
                        Splitters
                    ),
                    {In@8, Refs, {some, List}, maps:new()};

                {none, _} ->
                    {Paragraph@2, In@9} = parse_paragraph(
                        In,
                        Attrs,
                        Splitters,
                        Div_close_size
                    ),
                    {In@9, Refs, {some, Paragraph@2}, maps:new()};

                {{some, {Thematic_break, In@10}}, _} ->
                    {In@10, Refs, {some, Thematic_break}, maps:new()}
            end;

        <<"+"/utf8, In2@2/binary>> ->
            Style = <<"+"/utf8>>,
            case {parse_thematic_break(1, In2@2), In2@2} of
                {none, <<" "/utf8, In2@3/binary>>} ->
                    Bullet_style = case Style of
                        <<"-"/utf8>> ->
                            bullet_dash;

                        <<"*"/utf8>> ->
                            bullet_star;

                        _ ->
                            bullet_plus
                    end,
                    Style@1 = {bullet, Bullet_style},
                    {List, In@8} = parse_list(
                        In2@3,
                        Refs,
                        Attrs,
                        Style@1,
                        tight,
                        [],
                        Splitters
                    ),
                    {In@8, Refs, {some, List}, maps:new()};

                {none, <<"\n"/utf8, In2@3/binary>>} ->
                    Bullet_style = case Style of
                        <<"-"/utf8>> ->
                            bullet_dash;

                        <<"*"/utf8>> ->
                            bullet_star;

                        _ ->
                            bullet_plus
                    end,
                    Style@1 = {bullet, Bullet_style},
                    {List, In@8} = parse_list(
                        In2@3,
                        Refs,
                        Attrs,
                        Style@1,
                        tight,
                        [],
                        Splitters
                    ),
                    {In@8, Refs, {some, List}, maps:new()};

                {none, _} ->
                    {Paragraph@2, In@9} = parse_paragraph(
                        In,
                        Attrs,
                        Splitters,
                        Div_close_size
                    ),
                    {In@9, Refs, {some, Paragraph@2}, maps:new()};

                {{some, {Thematic_break, In@10}}, _} ->
                    {In@10, Refs, {some, Thematic_break}, maps:new()}
            end;

        <<"[^"/utf8, In2@4/binary>> ->
            case parse_footnote_def(In2@4, Refs, Splitters, <<"^"/utf8>>) of
                none ->
                    {Paragraph@3, In@11} = parse_paragraph(
                        In,
                        Attrs,
                        Splitters,
                        Div_close_size
                    ),
                    {In@11, Refs, {some, Paragraph@3}, maps:new()};

                {some, {Id, Footnote, Refs@2, In@12}} ->
                    Refs@3 = {refs,
                        erlang:element(2, Refs@2),
                        erlang:element(3, Refs@2),
                        erlang:element(4, Refs@2),
                        gleam@dict:insert(
                            erlang:element(5, Refs@2),
                            Id,
                            Footnote
                        )},
                    {In@12, Refs@3, none, maps:new()}
            end;

        <<"["/utf8, In2@5/binary>> ->
            case parse_ref_def(In2@5, <<""/utf8>>) of
                none ->
                    {Paragraph@4, In@13} = parse_paragraph(
                        In,
                        Attrs,
                        Splitters,
                        Div_close_size
                    ),
                    {In@13, Refs, {some, Paragraph@4}, maps:new()};

                {some, {Id@1, Url, In@14}} ->
                    Url_attributes = case gleam@dict:is_empty(Attrs) of
                        true ->
                            erlang:element(3, Refs);

                        false ->
                            gleam@dict:insert(
                                erlang:element(3, Refs),
                                Id@1,
                                Attrs
                            )
                    end,
                    Urls = gleam@dict:insert(erlang:element(2, Refs), Id@1, Url),
                    Refs@4 = {refs,
                        Urls,
                        Url_attributes,
                        erlang:element(4, Refs),
                        erlang:element(5, Refs)},
                    {In@14, Refs@4, none, maps:new()}
            end;

        <<":::"/utf8, In2@6/binary>> ->
            case parse_div(In2@6, Refs, Attrs, Splitters) of
                none ->
                    {Paragraph@5, In@15} = parse_paragraph(
                        In,
                        Attrs,
                        Splitters,
                        Div_close_size
                    ),
                    {In@15, Refs, {some, Paragraph@5}, maps:new()};

                {some, {In@16, Class, Attrs@2, Content}} ->
                    Div = {some, {'div', Class, Attrs@2, Content}},
                    {In@16, Refs, Div, maps:new()}
            end;

        <<"("/utf8, Rest/binary>> ->
            case parse_maybe_list(Rest, Refs, Attrs, Splitters, true) of
                {some, {In@17, Refs@5, List@1}} ->
                    {In@17, Refs@5, {some, List@1}, maps:new()};

                none ->
                    {Paragraph@6, In@18} = parse_paragraph(
                        In,
                        Attrs,
                        Splitters,
                        Div_close_size
                    ),
                    {In@18, Refs, {some, Paragraph@6}, maps:new()}
            end;

        _ ->
            case parse_maybe_list(In, Refs, Attrs, Splitters, false) of
                {some, {In@19, Refs@6, List@2}} ->
                    {In@19, Refs@6, {some, List@2}, maps:new()};

                none ->
                    {Paragraph@7, In@20} = parse_paragraph(
                        In,
                        Attrs,
                        Splitters,
                        Div_close_size
                    ),
                    {In@20, Refs, {some, Paragraph@7}, maps:new()}
            end
    end.

-file("src/jot.gleam", 299).
-spec parse_document_content(
    binary(),
    refs(),
    splitters(),
    list(container()),
    gleam@dict:dict(binary(), binary())
) -> {list(container()), refs(), binary()}.
parse_document_content(In, Refs, Splitters, Ast, Attrs) ->
    In@1 = drop_lines(In),
    {In@2, Spaces_count} = count_drop_spaces(In@1, 0),
    {In@3, Refs@1, Container, Attrs@1} = parse_container(
        In@2,
        Refs,
        Splitters,
        Attrs,
        Spaces_count,
        none
    ),
    Ast@1 = case Container of
        none ->
            Ast;

        {some, Container@1} ->
            [Container@1 | Ast]
    end,
    case In@3 of
        <<""/utf8>> ->
            {lists:reverse(Ast@1), Refs@1, In@3};

        _ ->
            parse_document_content(In@3, Refs@1, Splitters, Ast@1, Attrs@1)
    end.

-file("src/jot.gleam", 186).
?DOC(
    " Convert a string of Djot into a tree of records.\n"
    "\n"
    " This may be useful when you want more control over the HTML to be converted\n"
    " to, or you wish to convert Djot to some other format.\n"
).
-spec parse(binary()) -> document().
parse(Djot) ->
    Splitters = {splitters,
        splitter:new([<<" "/utf8>>, <<"\n"/utf8>>]),
        splitter:new([<<"`"/utf8>>, <<"\n"/utf8>>]),
        splitter:new(
            [<<"\\"/utf8>>,
                <<"_"/utf8>>,
                <<"*"/utf8>>,
                <<"[^"/utf8>>,
                <<"["/utf8>>,
                <<"!["/utf8>>,
                <<"$$`"/utf8>>,
                <<"$`"/utf8>>,
                <<"`"/utf8>>,
                <<"\n"/utf8>>,
                <<"--"/utf8>>,
                <<"..."/utf8>>,
                <<"<"/utf8>>,
                <<"{-"/utf8>>,
                <<"{+"/utf8>>,
                <<"{="/utf8>>,
                <<"~"/utf8>>,
                <<"{~"/utf8>>,
                <<"^"/utf8>>,
                <<"{^"/utf8>>,
                <<"{"/utf8>>,
                <<":"/utf8>>]
        ),
        splitter:new([<<")"/utf8>>, <<"]"/utf8>>, <<"\n"/utf8>>]),
        splitter:new([<<"`"/utf8>>])},
    Refs = {refs, maps:new(), maps:new(), maps:new(), maps:new()},
    {Ast, {refs, Urls, Url_attributes, Headings, Footnotes}, _} = begin
        _pipe = Djot,
        _pipe@1 = gleam@string:replace(_pipe, <<"\r\n"/utf8>>, <<"\n"/utf8>>),
        parse_document_content(_pipe@1, Refs, Splitters, [], maps:new())
    end,
    Urls@3 = gleam@dict:fold(
        Headings,
        Urls,
        fun(Urls@1, Id, Count) ->
            int_fold_down_zero_inclusive(
                Count,
                Urls@1,
                fun(Urls@2, I) ->
                    Key = case I of
                        0 ->
                            Id;

                        _ ->
                            <<<<Id/binary, "-"/utf8>>/binary,
                                (erlang:integer_to_binary(I))/binary>>
                    end,
                    case gleam@dict:has_key(Urls@2, Key) of
                        true ->
                            Urls@2;

                        false ->
                            gleam@dict:insert(
                                Urls@2,
                                Key,
                                <<"#"/utf8, Key/binary>>
                            )
                    end
                end
            )
        end
    ),
    {document, Ast, Urls@3, Url_attributes, Footnotes}.

-file("src/jot.gleam", 165).
?DOC(
    " Convert a string of Djot into a string of HTML.\n"
    "\n"
    " If you want to have more control over the HTML generated you can use the\n"
    " `parse` function to convert Djot to a tree of records instead. You can then\n"
    " traverse this tree and turn it into HTML yourself.\n"
    "\n"
    " # Security\n"
    "\n"
    " This does not escape the content of raw blocks! If you use this with\n"
    " user-input you likely need to escape raw blocks to prevent\n"
    " cross-site-scripting (XSS) attacks.\n"
).
-spec to_html(binary()) -> binary().
to_html(Djot) ->
    _pipe = Djot,
    _pipe@1 = parse(_pipe),
    document_to_html(_pipe@1).

-file("src/jot.gleam", 3080).
-spec inline_text(binary(), inline()) -> binary().
inline_text(Accumulator, Item) ->
    case Item of
        {footnote, _} ->
            Accumulator;

        {image, _, _, _} ->
            Accumulator;

        linebreak ->
            <<Accumulator/binary, "\n\n"/utf8>>;

        non_breaking_space ->
            <<Accumulator/binary, " "/utf8>>;

        {code, Content} ->
            <<Accumulator/binary, Content/binary>>;

        {math_inline, Content} ->
            <<Accumulator/binary, Content/binary>>;

        {math_display, Content} ->
            <<Accumulator/binary, Content/binary>>;

        {symbol, Content} ->
            <<Accumulator/binary, Content/binary>>;

        {text, Content} ->
            <<Accumulator/binary, Content/binary>>;

        {link, _, Content@1, _} ->
            gleam@list:fold(Content@1, Accumulator, fun inline_text/2);

        {span, _, Content@1} ->
            gleam@list:fold(Content@1, Accumulator, fun inline_text/2);

        {emphasis, Content@1} ->
            gleam@list:fold(Content@1, Accumulator, fun inline_text/2);

        {strong, Content@1} ->
            gleam@list:fold(Content@1, Accumulator, fun inline_text/2);

        {delete, Content@1} ->
            gleam@list:fold(Content@1, Accumulator, fun inline_text/2);

        {insert, Content@1} ->
            gleam@list:fold(Content@1, Accumulator, fun inline_text/2);

        {mark, Content@1} ->
            gleam@list:fold(Content@1, Accumulator, fun inline_text/2);

        {superscript, Content@1} ->
            gleam@list:fold(Content@1, Accumulator, fun inline_text/2);

        {subscript, Content@1} ->
            gleam@list:fold(Content@1, Accumulator, fun inline_text/2)
    end.

-file("src/jot.gleam", 3063).
?DOC(
    " Get the text from within a container.\n"
    "\n"
    " Raw blocks, footnotes, and the ordinals and bullets from lists are not\n"
    " included.\n"
).
-spec inner_text(container()) -> binary().
inner_text(Container) ->
    case Container of
        {raw_block, _} ->
            <<""/utf8>>;

        thematic_break ->
            <<""/utf8>>;

        {codeblock, _, _, Content} ->
            Content;

        {paragraph, _, Content@1} ->
            gleam@list:fold(Content@1, <<""/utf8>>, fun inline_text/2);

        {heading, _, _, Content@1} ->
            gleam@list:fold(Content@1, <<""/utf8>>, fun inline_text/2);

        {block_quote, _, Items} ->
            _pipe = gleam@list:map(Items, fun inner_text/1),
            gleam@string:join(_pipe, <<"\n\n"/utf8>>);

        {'div', _, _, Items} ->
            _pipe = gleam@list:map(Items, fun inner_text/1),
            gleam@string:join(_pipe, <<"\n\n"/utf8>>);

        {bullet_list, _, _, Items@1} ->
            _pipe@1 = Items@1,
            _pipe@2 = gleam@list:flat_map(
                _pipe@1,
                fun(_capture) -> gleam@list:map(_capture, fun inner_text/1) end
            ),
            gleam@string:join(_pipe@2, <<"\n\n"/utf8>>);

        {ordered_list, _, _, _, _, Items@1} ->
            _pipe@1 = Items@1,
            _pipe@2 = gleam@list:flat_map(
                _pipe@1,
                fun(_capture) -> gleam@list:map(_capture, fun inner_text/1) end
            ),
            gleam@string:join(_pipe@2, <<"\n\n"/utf8>>)
    end.
