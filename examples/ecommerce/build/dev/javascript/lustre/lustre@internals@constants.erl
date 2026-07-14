-module(lustre@internals@constants).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/lustre/internals/constants.gleam").
-export([singleton_list/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(false).

-file("src/lustre/internals/constants.gleam", 16).
?DOC(false).
-spec singleton_list(FJU) -> list(FJU).
singleton_list(Item) ->
    [Item | []].
