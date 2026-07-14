-module(lustre@runtime@app).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/lustre/runtime/app.gleam").
-export([configure/1, configure_server_component/1]).
-export_type([app/3, config/1, option/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-type app(LPK, LPL, LPM) :: {app,
        gleam@option:option(gleam@erlang@process:name(lustre@runtime@server@runtime:message(LPM))),
        fun((LPK) -> {LPL, lustre@effect:effect(LPM)}),
        fun((LPL, LPM) -> {LPL, lustre@effect:effect(LPM)}),
        fun((LPL) -> lustre@vdom@vnode:element(LPM)),
        config(LPM)}.

-type config(LPN) :: {config,
        boolean(),
        boolean(),
        boolean(),
        list({binary(), fun((binary()) -> {ok, LPN} | {error, nil})}),
        list({binary(), gleam@dynamic@decode:decoder(LPN)}),
        list({binary(), gleam@dynamic@decode:decoder(LPN)}),
        boolean(),
        gleam@option:option(fun((binary()) -> LPN)),
        gleam@option:option(LPN),
        gleam@option:option(fun((binary()) -> LPN)),
        gleam@option:option(fun((boolean()) -> LPN)),
        gleam@option:option(LPN),
        gleam@option:option(LPN),
        gleam@option:option(LPN)}.

-type option(LPO) :: {option, fun((config(LPO)) -> config(LPO))}.

-file("src/lustre/runtime/app.gleam", 73).
?DOC(false).
-spec configure(list(option(LPP))) -> config(LPP).
configure(Options) ->
    gleam@list:fold(
        Options,
        {config,
            true,
            true,
            false,
            [],
            [],
            [],
            false,
            none,
            none,
            none,
            none,
            none,
            none,
            none},
        fun(Config, Option) -> (erlang:element(2, Option))(Config) end
    ).

-file("src/lustre/runtime/app.gleam", 77).
?DOC(false).
-spec configure_server_component(config(LPT)) -> lustre@runtime@server@runtime:config(LPT).
configure_server_component(Config) ->
    {config,
        erlang:element(2, Config),
        erlang:element(3, Config),
        maps:from_list(lists:reverse(erlang:element(5, Config))),
        maps:from_list(lists:reverse(erlang:element(6, Config))),
        maps:from_list(lists:reverse(erlang:element(7, Config))),
        erlang:element(13, Config),
        erlang:element(15, Config)}.
