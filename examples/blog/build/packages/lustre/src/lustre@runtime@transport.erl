-module(lustre@runtime@transport).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/lustre/runtime/transport.gleam").
-export([mount/8, reconcile/2, emit/2, provide/2, subscribe/1, unsubscribe/1, attribute_changed/2, event_fired/3, property_changed/2, batch/1, context_provided/2, client_message_to_json/1, server_message_decoder/0, context_provided_decoder/0]).
-export_type([client_message/1, server_message/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-type client_message(IUG) :: {mount,
        integer(),
        boolean(),
        boolean(),
        list(binary()),
        list(binary()),
        list(binary()),
        gleam@dict:dict(binary(), gleam@json:json()),
        lustre@vdom@vnode:element(IUG),
        lustre@internals@mutable_map:mutable_map(fun(() -> lustre@vdom@vnode:element(IUG)), lustre@vdom@vnode:element(IUG))} |
    {reconcile,
        integer(),
        lustre@vdom@patch:patch(IUG),
        lustre@internals@mutable_map:mutable_map(fun(() -> lustre@vdom@vnode:element(IUG)), lustre@vdom@vnode:element(IUG))} |
    {emit, integer(), binary(), gleam@json:json()} |
    {provide, integer(), binary(), gleam@json:json()} |
    {subscribe, integer(), binary()} |
    {unsubscribe, integer(), binary()}.

-type server_message() :: {batch, integer(), list(server_message())} |
    {attribute_changed, integer(), binary(), binary()} |
    {property_changed, integer(), binary(), gleam@dynamic:dynamic_()} |
    {event_fired, integer(), binary(), binary(), gleam@dynamic:dynamic_()} |
    {context_provided, integer(), binary(), gleam@dynamic:dynamic_()}.

-file("src/lustre/runtime/transport.gleam", 44).
?DOC(false).
-spec mount(
    boolean(),
    boolean(),
    list(binary()),
    list(binary()),
    list(binary()),
    gleam@dict:dict(binary(), gleam@json:json()),
    lustre@vdom@vnode:element(IUM),
    lustre@internals@mutable_map:mutable_map(fun(() -> lustre@vdom@vnode:element(IUM)), lustre@vdom@vnode:element(IUM))
) -> client_message(IUM).
mount(
    Open_shadow_root,
    Will_adopt_styles,
    Observed_attributes,
    Observed_properties,
    Requested_contexts,
    Provided_contexts,
    Vdom,
    Memos
) ->
    {mount,
        0,
        Open_shadow_root,
        Will_adopt_styles,
        Observed_attributes,
        Observed_properties,
        Requested_contexts,
        Provided_contexts,
        Vdom,
        Memos}.

-file("src/lustre/runtime/transport.gleam", 69).
?DOC(false).
-spec reconcile(
    lustre@vdom@patch:patch(IUQ),
    lustre@internals@mutable_map:mutable_map(fun(() -> lustre@vdom@vnode:element(IUQ)), lustre@vdom@vnode:element(IUQ))
) -> client_message(IUQ).
reconcile(Patch, Memos) ->
    {reconcile, 1, Patch, Memos}.

-file("src/lustre/runtime/transport.gleam", 78).
?DOC(false).
-spec emit(binary(), gleam@json:json()) -> client_message(any()).
emit(Name, Data) ->
    {emit, 2, Name, Data}.

-file("src/lustre/runtime/transport.gleam", 84).
?DOC(false).
-spec provide(binary(), gleam@json:json()) -> client_message(any()).
provide(Key, Value) ->
    {provide, 3, Key, Value}.

-file("src/lustre/runtime/transport.gleam", 90).
?DOC(false).
-spec subscribe(binary()) -> client_message(any()).
subscribe(Key) ->
    {subscribe, 4, Key}.

-file("src/lustre/runtime/transport.gleam", 96).
?DOC(false).
-spec unsubscribe(binary()) -> client_message(any()).
unsubscribe(Key) ->
    {unsubscribe, 5, Key}.

-file("src/lustre/runtime/transport.gleam", 102).
?DOC(false).
-spec attribute_changed(binary(), binary()) -> server_message().
attribute_changed(Name, Value) ->
    {attribute_changed, 0, Name, Value}.

-file("src/lustre/runtime/transport.gleam", 111).
?DOC(false).
-spec event_fired(binary(), binary(), gleam@dynamic:dynamic_()) -> server_message().
event_fired(Path, Name, Event) ->
    {event_fired, 1, Path, Name, Event}.

-file("src/lustre/runtime/transport.gleam", 121).
?DOC(false).
-spec property_changed(binary(), gleam@dynamic:dynamic_()) -> server_message().
property_changed(Name, Value) ->
    {property_changed, 2, Name, Value}.

-file("src/lustre/runtime/transport.gleam", 130).
?DOC(false).
-spec batch(list(server_message())) -> server_message().
batch(Messages) ->
    {batch, 3, Messages}.

-file("src/lustre/runtime/transport.gleam", 136).
?DOC(false).
-spec context_provided(binary(), gleam@dynamic:dynamic_()) -> server_message().
context_provided(Key, Value) ->
    {context_provided, 4, Key, Value}.

-file("src/lustre/runtime/transport.gleam", 234).
?DOC(false).
-spec unsubscribe_to_json(integer(), binary()) -> gleam@json:json().
unsubscribe_to_json(Kind, Key) ->
    gleam@json:object(
        [{<<"kind"/utf8>>, gleam@json:int(Kind)},
            {<<"key"/utf8>>, gleam@json:string(Key)}]
    ).

-file("src/lustre/runtime/transport.gleam", 227).
?DOC(false).
-spec subscribe_to_json(integer(), binary()) -> gleam@json:json().
subscribe_to_json(Kind, Key) ->
    gleam@json:object(
        [{<<"kind"/utf8>>, gleam@json:int(Kind)},
            {<<"key"/utf8>>, gleam@json:string(Key)}]
    ).

-file("src/lustre/runtime/transport.gleam", 219).
?DOC(false).
-spec provide_to_json(integer(), binary(), gleam@json:json()) -> gleam@json:json().
provide_to_json(Kind, Key, Value) ->
    gleam@json:object(
        [{<<"kind"/utf8>>, gleam@json:int(Kind)},
            {<<"key"/utf8>>, gleam@json:string(Key)},
            {<<"value"/utf8>>, Value}]
    ).

-file("src/lustre/runtime/transport.gleam", 211).
?DOC(false).
-spec emit_to_json(integer(), binary(), gleam@json:json()) -> gleam@json:json().
emit_to_json(Kind, Name, Data) ->
    gleam@json:object(
        [{<<"kind"/utf8>>, gleam@json:int(Kind)},
            {<<"name"/utf8>>, gleam@json:string(Name)},
            {<<"data"/utf8>>, Data}]
    ).

-file("src/lustre/runtime/transport.gleam", 200).
?DOC(false).
-spec reconcile_to_json(
    integer(),
    lustre@vdom@patch:patch(IVN),
    lustre@internals@mutable_map:mutable_map(fun(() -> lustre@vdom@vnode:element(IVN)), lustre@vdom@vnode:element(IVN))
) -> gleam@json:json().
reconcile_to_json(Kind, Patch, Memos) ->
    gleam@json:object(
        [{<<"kind"/utf8>>, gleam@json:int(Kind)},
            {<<"patch"/utf8>>, lustre@vdom@patch:to_json(Patch, Memos)}]
    ).

-file("src/lustre/runtime/transport.gleam", 174).
?DOC(false).
-spec mount_to_json(
    integer(),
    boolean(),
    boolean(),
    list(binary()),
    list(binary()),
    list(binary()),
    gleam@dict:dict(binary(), gleam@json:json()),
    lustre@vdom@vnode:element(IVK),
    lustre@internals@mutable_map:mutable_map(fun(() -> lustre@vdom@vnode:element(IVK)), lustre@vdom@vnode:element(IVK))
) -> gleam@json:json().
mount_to_json(
    Kind,
    Open_shadow_root,
    Will_adopt_styles,
    Observed_attributes,
    Observed_properties,
    Requested_contexts,
    Provided_contexts,
    Vdom,
    Memos
) ->
    gleam@json:object(
        [{<<"kind"/utf8>>, gleam@json:int(Kind)},
            {<<"open_shadow_root"/utf8>>, gleam@json:bool(Open_shadow_root)},
            {<<"will_adopt_styles"/utf8>>, gleam@json:bool(Will_adopt_styles)},
            {<<"observed_attributes"/utf8>>,
                gleam@json:array(Observed_attributes, fun gleam@json:string/1)},
            {<<"observed_properties"/utf8>>,
                gleam@json:array(Observed_properties, fun gleam@json:string/1)},
            {<<"requested_contexts"/utf8>>,
                gleam@json:array(Requested_contexts, fun gleam@json:string/1)},
            {<<"provided_contexts"/utf8>>,
                gleam@json:dict(
                    Provided_contexts,
                    fun gleam@function:identity/1,
                    fun gleam@function:identity/1
                )},
            {<<"vdom"/utf8>>, lustre@vdom@vnode:to_json(Vdom, Memos)}]
    ).

-file("src/lustre/runtime/transport.gleam", 142).
?DOC(false).
-spec client_message_to_json(client_message(any())) -> gleam@json:json().
client_message_to_json(Message) ->
    case Message of
        {mount,
            Kind,
            Open_shadow_root,
            Will_adopt_styles,
            Observed_attributes,
            Observed_properties,
            Requested_contexts,
            Provided_contexts,
            Vdom,
            Memos} ->
            mount_to_json(
                Kind,
                Open_shadow_root,
                Will_adopt_styles,
                Observed_attributes,
                Observed_properties,
                Requested_contexts,
                Provided_contexts,
                Vdom,
                Memos
            );

        {reconcile, Kind@1, Patch, Memos@1} ->
            reconcile_to_json(Kind@1, Patch, Memos@1);

        {emit, Kind@2, Name, Data} ->
            emit_to_json(Kind@2, Name, Data);

        {provide, Kind@3, Key, Value} ->
            provide_to_json(Kind@3, Key, Value);

        {subscribe, Kind@4, Key@1} ->
            subscribe_to_json(Kind@4, Key@1);

        {unsubscribe, Kind@5, Key@2} ->
            unsubscribe_to_json(Kind@5, Key@2)
    end.

-file("src/lustre/runtime/transport.gleam", 269).
?DOC(false).
-spec event_fired_decoder() -> gleam@dynamic@decode:decoder(server_message()).
event_fired_decoder() ->
    gleam@dynamic@decode:field(
        <<"path"/utf8>>,
        {decoder, fun gleam@dynamic@decode:decode_string/1},
        fun(Path) ->
            gleam@dynamic@decode:field(
                <<"name"/utf8>>,
                {decoder, fun gleam@dynamic@decode:decode_string/1},
                fun(Name) ->
                    gleam@dynamic@decode:field(
                        <<"event"/utf8>>,
                        {decoder, fun gleam@dynamic@decode:decode_dynamic/1},
                        fun(Event) ->
                            gleam@dynamic@decode:success(
                                event_fired(Path, Name, Event)
                            )
                        end
                    )
                end
            )
        end
    ).

-file("src/lustre/runtime/transport.gleam", 262).
?DOC(false).
-spec property_changed_decoder() -> gleam@dynamic@decode:decoder(server_message()).
property_changed_decoder() ->
    gleam@dynamic@decode:field(
        <<"name"/utf8>>,
        {decoder, fun gleam@dynamic@decode:decode_string/1},
        fun(Name) ->
            gleam@dynamic@decode:field(
                <<"value"/utf8>>,
                {decoder, fun gleam@dynamic@decode:decode_dynamic/1},
                fun(Value) ->
                    gleam@dynamic@decode:success(property_changed(Name, Value))
                end
            )
        end
    ).

-file("src/lustre/runtime/transport.gleam", 255).
?DOC(false).
-spec attribute_changed_decoder() -> gleam@dynamic@decode:decoder(server_message()).
attribute_changed_decoder() ->
    gleam@dynamic@decode:field(
        <<"name"/utf8>>,
        {decoder, fun gleam@dynamic@decode:decode_string/1},
        fun(Name) ->
            gleam@dynamic@decode:field(
                <<"value"/utf8>>,
                {decoder, fun gleam@dynamic@decode:decode_string/1},
                fun(Value) ->
                    gleam@dynamic@decode:success(attribute_changed(Name, Value))
                end
            )
        end
    ).

-file("src/lustre/runtime/transport.gleam", 277).
?DOC(false).
-spec batch_decoder() -> gleam@dynamic@decode:decoder(server_message()).
batch_decoder() ->
    gleam@dynamic@decode:field(
        <<"messages"/utf8>>,
        gleam@dynamic@decode:list(server_message_decoder()),
        fun(Messages) -> gleam@dynamic@decode:success(batch(Messages)) end
    ).

-file("src/lustre/runtime/transport.gleam", 243).
?DOC(false).
-spec server_message_decoder() -> gleam@dynamic@decode:decoder(server_message()).
server_message_decoder() ->
    gleam@dynamic@decode:field(
        <<"kind"/utf8>>,
        {decoder, fun gleam@dynamic@decode:decode_int/1},
        fun(Kind) -> case Kind of
                _ when Kind =:= 0 ->
                    attribute_changed_decoder();

                _ when Kind =:= 2 ->
                    property_changed_decoder();

                _ when Kind =:= 1 ->
                    event_fired_decoder();

                _ when Kind =:= 3 ->
                    batch_decoder();

                _ ->
                    gleam@dynamic@decode:failure(batch([]), <<""/utf8>>)
            end end
    ).

-file("src/lustre/runtime/transport.gleam", 286).
?DOC(false).
-spec context_provided_decoder() -> gleam@dynamic@decode:decoder(server_message()).
context_provided_decoder() ->
    gleam@dynamic@decode:field(
        <<"key"/utf8>>,
        {decoder, fun gleam@dynamic@decode:decode_string/1},
        fun(Key) ->
            gleam@dynamic@decode:field(
                <<"value"/utf8>>,
                {decoder, fun gleam@dynamic@decode:decode_dynamic/1},
                fun(Value) ->
                    gleam@dynamic@decode:success(context_provided(Key, Value))
                end
            )
        end
    ).
