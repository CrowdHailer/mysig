-module(lustre@effect).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/lustre/effect.gleam").
-export([none/0, from/1, before_paint/1, after_paint/1, event/2, select/1, provide/2, subscribe/2, unsubscribe/1, batch/1, map/2, perform/8]).
-export_type([effect/1, actions/1]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(
    " In many frontend frameworks it's common for components to perform side effects\n"
    " whenever the need them. An event handler might make an HTTP request, or a\n"
    " component might reach into the DOM to focus an input.\n"
    "\n"
    " In Lustre we try to keep side effects separate from our main program loop.\n"
    " This comes with a whole bunch of benefits like making it easier to test and\n"
    " reason about our code, making it possible to implement time-travel debugging,\n"
    " or even to run our app on the server using Lustre's server components. This\n"
    " is great but we still need to perform side effects at some point, so how do\n"
    " we do that?\n"
    "\n"
    " The answer is through the `Effect` type that treats side effects as *data*.\n"
    " This approach is known as having **managed effects**: you pass data that\n"
    " describes a side effect to Lustre's runtime and it takes care of performing\n"
    " that effect and potentially sending messages back to your program for you.\n"
    " By going through this abstraction we discourage side effects from being\n"
    " performed in the middle of our program.\n"
    "\n"
    " ## Related packages\n"
    "\n"
    " While Lustre doesn't include many built-in effects, there are a number of\n"
    " community packages define useful common effects for your applications.\n"
    "\n"
    " - [`rsvp`](https://hexdocs.pm/rsvp) – Send HTTP requests from Lustre\n"
    "   applications and server components.\n"
    "\n"
    " - [`modem`](https://hexdocs.pm/modem) – A friendly Lustre package to help\n"
    "   you build a router, handle links, and manage URLs.\n"
    "\n"
    "  - [`plinth`](https://hexdocs.pm/plinth) – Bindings to Node.js and browser\n"
    "    platform APIs. (This package does not include any effects directly, but\n"
    "    it does provide bindings to many APIs that you can use to create your\n"
    "    own.)\n"
    "\n"
    " ## Examples\n"
    "\n"
    " For folks coming from other languages (or other Gleam code!) where side\n"
    " effects are often performed in-place, this can feel a bit strange. We have\n"
    " a category of example apps dedicated to showing various effects in action:\n"
    "\n"
    " - [HTTP requests](https://github.com/lustre-labs/lustre/tree/main/examples/03-effects/01-http-requests)\n"
    "\n"
    " - [Generating random values](https://github.com/lustre-labs/lustre/tree/main/examples/03-effects/02-random)\n"
    "\n"
    " - [Setting up timers](https://github.com/lustre-labs/lustre/tree/main/examples/03-effects/03-timers)\n"
    "\n"
    " - [Working with LocalStorage](https://github.com/lustre-labs/lustre/tree/main/examples/03-effects/04-local-storage)\n"
    "\n"
    " - [Reading from the DOM](https://github.com/lustre-labs/lustre/tree/main/examples/03-effects/05-dom-effects)\n"
    "\n"
    " - [Optimistic state updates](https://github.com/lustre-labs/lustre/tree/main/examples/03-effects/06-optimistic-requests)\n"
    "\n"
    " This list of examples is likely to grow over time, so be sure to check back\n"
    " every now and then to see what's new!\n"
    "\n"
    " ## Getting help\n"
    "\n"
    " If you're having trouble with Lustre or not sure what the right way to do\n"
    " something is, the best place to get help is the [Gleam Discord server](https://discord.gg/Fm8Pwmy).\n"
    " You could also open an issue on the [Lustre GitHub repository](https://github.com/lustre-labs/lustre/issues).\n"
    "\n"
).

-opaque effect(GKF) :: {effect,
        list(fun((actions(GKF)) -> nil)),
        list(fun((actions(GKF)) -> nil)),
        list(fun((actions(GKF)) -> nil))}.

-type actions(GKG) :: {actions,
        fun((GKG) -> nil),
        fun((binary(), gleam@json:json()) -> nil),
        fun((gleam@erlang@process:selector(GKG)) -> nil),
        fun(() -> gleam@dynamic:dynamic_()),
        fun((binary(), gleam@json:json()) -> nil),
        fun((binary(), gleam@dynamic@decode:decoder(GKG)) -> nil),
        fun((binary()) -> nil)}.

-file("src/lustre/effect.gleam", 122).
?DOC(
    " Most Lustre applications need to return a tuple of `#(model, Effect(message))`\n"
    " from their `init` and `update` functions. If you don't want to perform any\n"
    " side effects, you can use `none` to tell the runtime there's no work to do.\n"
).
-spec none() -> effect(any()).
none() ->
    {effect, [], [], []}.

-file("src/lustre/effect.gleam", 157).
?DOC(
    " Construct your own reusable effect from a custom callback. This callback is\n"
    " called with a `dispatch` function you can use to send messages back to your\n"
    " application's `update` function.\n"
    "\n"
    " Example using the `window` module from the `plinth` library to dispatch a\n"
    " message on the browser window object's `\"visibilitychange\"` event.\n"
    "\n"
    " ```gleam\n"
    " import lustre/effect.{type Effect}\n"
    " import plinth/browser/window\n"
    "\n"
    " type Model {\n"
    "   Model(Int)\n"
    " }\n"
    "\n"
    " type message {\n"
    "   FetchState\n"
    " }\n"
    "\n"
    " fn init(_flags) -> #(Model, Effect(message)) {\n"
    "   #(\n"
    "     Model(0),\n"
    "     effect.from(fn(dispatch) {\n"
    "       window.add_event_listener(\"visibilitychange\", fn(_event) {\n"
    "         dispatch(FetchState)\n"
    "       })\n"
    "     }),\n"
    "   )\n"
    " }\n"
    " ```\n"
).
-spec from(fun((fun((GKJ) -> nil)) -> nil)) -> effect(GKJ).
from(Effect) ->
    Task = fun(Actions) ->
        Dispatch = erlang:element(2, Actions),
        Effect(Dispatch)
    end,
    {effect,
        lustre@internals@constants:singleton_list(Task),
        erlang:element(3, {effect, [], [], []}),
        erlang:element(4, {effect, [], [], []})}.

-file("src/lustre/effect.gleam", 188).
?DOC(
    " Schedule a side effect that is guaranteed to run after your `view` function\n"
    " is called and the DOM has been updated, but **before** the browser has\n"
    " painted the screen. This effect is useful when you need to read from the DOM\n"
    " or perform other operations that might affect the layout of your application.\n"
    "\n"
    " In addition to the `dispatch` function, your callback will also be provided\n"
    " with root element of your app or component. This is especially useful inside\n"
    " of components, giving you a reference to the [Shadow Root](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot).\n"
    "\n"
    " Messages dispatched immediately in this effect will trigger a second re-render\n"
    " of your application before the browser paints the screen. This let's you read\n"
    " the state of the DOM, update your model, and then render a second time with\n"
    " the additional information.\n"
    "\n"
    " > **Note**: dispatching messages synchronously in this effect can lead to\n"
    " > degraded performance if not used correctly. In the worst case you can lock\n"
    " > up the browser and prevent it from painting the screen _at all_.\n"
    "\n"
    " > **Note**: There is no concept of a \"paint\" for server components. These\n"
    " > effects will be ignored in those contexts and never run.\n"
).
-spec before_paint(fun((fun((GKL) -> nil), gleam@dynamic:dynamic_()) -> nil)) -> effect(GKL).
before_paint(Effect) ->
    Task = fun(Actions) ->
        Root = (erlang:element(5, Actions))(),
        Dispatch = erlang:element(2, Actions),
        Effect(Dispatch, Root)
    end,
    {effect,
        erlang:element(2, {effect, [], [], []}),
        lustre@internals@constants:singleton_list(Task),
        erlang:element(4, {effect, [], [], []})}.

-file("src/lustre/effect.gleam", 211).
?DOC(
    " Schedule a side effect that is guaranteed to run after the browser has painted\n"
    " the screen.\n"
    "\n"
    " In addition to the `dispatch` function, your callback will also be provided\n"
    " with root element of your app or component. This is especially useful inside\n"
    " of components, giving you a reference to the [Shadow Root](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot).\n"
    "\n"
    " > **Note**: There is no concept of a \"paint\" for server components. These\n"
    " > effects will be ignored in those contexts and never run.\n"
).
-spec after_paint(fun((fun((GKN) -> nil), gleam@dynamic:dynamic_()) -> nil)) -> effect(GKN).
after_paint(Effect) ->
    Task = fun(Actions) ->
        Root = (erlang:element(5, Actions))(),
        Dispatch = erlang:element(2, Actions),
        Effect(Dispatch, Root)
    end,
    {effect,
        erlang:element(2, {effect, [], [], []}),
        erlang:element(3, {effect, [], [], []}),
        lustre@internals@constants:singleton_list(Task)}.

-file("src/lustre/effect.gleam", 230).
?DOC(false).
-spec event(binary(), gleam@json:json()) -> effect(any()).
event(Name, Data) ->
    Task = fun(Actions) -> (erlang:element(3, Actions))(Name, Data) end,
    {effect,
        lustre@internals@constants:singleton_list(Task),
        erlang:element(3, {effect, [], [], []}),
        erlang:element(4, {effect, [], [], []})}.

-file("src/lustre/effect.gleam", 238).
?DOC(false).
-spec select(
    fun((fun((GKR) -> nil), gleam@erlang@process:subject(any())) -> gleam@erlang@process:selector(GKR))
) -> effect(GKR).
select(Sel) ->
    Task = fun(Actions) ->
        Self = gleam@erlang@process:new_subject(),
        Selector = Sel(erlang:element(2, Actions), Self),
        (erlang:element(4, Actions))(Selector)
    end,
    {effect,
        lustre@internals@constants:singleton_list(Task),
        erlang:element(3, {effect, [], [], []}),
        erlang:element(4, {effect, [], [], []})}.

-file("src/lustre/effect.gleam", 269).
?DOC(
    " Provide a context value to child components in the DOM that this Lustre app\n"
    " didn't render. This occurs in components with that render one or more `<slot>`\n"
    " elements in their `view` function.\n"
    " \n"
    " Once a value for the given key has been provided, children can [`subscribe`](#subscribe)\n"
    " to changes and receive updates any subsequent times `provide` is called with\n"
    " the same key. This facilitates parent-child communication even in cases where\n"
    " the parent doesn't own the child element directly. \n"
    " \n"
    " **Note**: This is one half of the WCCG [Context Protocol](https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/context.md)\n"
    " and will work in tandem with not just Lustre components but any third-party\n"
    " Web Component that implements the [`context-request` event](https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/context.md#the-context-request-event).\n"
).
-spec provide(binary(), gleam@json:json()) -> effect(any()).
provide(Key, Value) ->
    Task = fun(Actions) -> (erlang:element(6, Actions))(Key, Value) end,
    {effect,
        lustre@internals@constants:singleton_list(Task),
        erlang:element(3, {effect, [], [], []}),
        erlang:element(4, {effect, [], [], []})}.

-file("src/lustre/effect.gleam", 293).
?DOC(
    " Subscribe to changes for a context value provided by a parent element in the\n"
    " DOM. This effect will decode the context value from the first parent element\n"
    " that has _already provided_ a context for this key at least once. Once a\n"
    " subscription is set up, any changes to the context value will trigger additional\n"
    " messages to be dispatched with the new decoded value.\n"
    " \n"
    " If no parent elements have provided a context for the given key at the time\n"
    " this effect is run, no subscription is set up even if a parent later provides\n"
    " a context for this key.\n"
    " \n"
    " **Note**: Pay attention to timing and lifecycle differences between applications\n"
    " and components. Components that need to subscribe to a context should make sure\n"
    " this effect is called _after_ the component has [connected](./component.html#on_connect).\n"
    " \n"
    " **Note**: This is one half of the WCCG [Context Protocol](https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/context.md)\n"
    " and will work in tandem with not just Lustre components and applications, but\n"
    " any third-party Web Component that acts as a [context provider](https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/context.md#context-providers).\n"
).
-spec subscribe(binary(), gleam@dynamic@decode:decoder(GKY)) -> effect(GKY).
subscribe(Key, Decoder) ->
    Task = fun(Actions) -> (erlang:element(7, Actions))(Key, Decoder) end,
    {effect,
        lustre@internals@constants:singleton_list(Task),
        erlang:element(3, {effect, [], [], []}),
        erlang:element(4, {effect, [], [], []})}.

-file("src/lustre/effect.gleam", 302).
?DOC(
    " Unsubscribe from a context [`subscription`](#subscribe) that was previously\n"
    " set up for this key.\n"
).
-spec unsubscribe(binary()) -> effect(any()).
unsubscribe(Key) ->
    Task = fun(Actions) -> (erlang:element(8, Actions))(Key) end,
    {effect,
        lustre@internals@constants:singleton_list(Task),
        erlang:element(3, {effect, [], [], []}),
        erlang:element(4, {effect, [], [], []})}.

-file("src/lustre/effect.gleam", 322).
?DOC(
    " Batch multiple effects to be performed at the same time.\n"
    "\n"
    " > **Note**: The runtime makes no guarantees about the order on which effects\n"
    " > are performed! If you need to chain or sequence effects together, you have\n"
    " > two broad options:\n"
    " >\n"
    " > 1. Create variants of your `message` type to represent each step in the sequence\n"
    " >    and fire off the next effect in response to the previous one.\n"
    " >\n"
    " > 2. If you're defining effects yourself, consider whether or not you can handle\n"
    " >    the sequencing inside the effect itself.\n"
).
-spec batch(list(effect(GLD))) -> effect(GLD).
batch(Effects) ->
    gleam@list:fold(
        Effects,
        {effect, [], [], []},
        fun(Acc, Eff) ->
            {effect,
                gleam@list:fold(
                    erlang:element(2, Eff),
                    erlang:element(2, Acc),
                    fun gleam@list:prepend/2
                ),
                gleam@list:fold(
                    erlang:element(3, Eff),
                    erlang:element(3, Acc),
                    fun gleam@list:prepend/2
                ),
                gleam@list:fold(
                    erlang:element(4, Eff),
                    erlang:element(4, Acc),
                    fun gleam@list:prepend/2
                )}
        end
    ).

-file("src/lustre/effect.gleam", 369).
-spec do_comap_select(
    actions(GLV),
    gleam@erlang@process:selector(GLX),
    fun((GLX) -> GLV)
) -> nil.
do_comap_select(Actions, Selector, F) ->
    (erlang:element(4, Actions))(gleam_erlang_ffi:map_selector(Selector, F)).

-file("src/lustre/effect.gleam", 354).
-spec do_comap_actions(actions(GLR), fun((GLT) -> GLR)) -> actions(GLT).
do_comap_actions(Actions, F) ->
    {actions,
        fun(Message) -> (erlang:element(2, Actions))(F(Message)) end,
        erlang:element(3, Actions),
        fun(Selector) -> do_comap_select(Actions, Selector, F) end,
        erlang:element(5, Actions),
        erlang:element(6, Actions),
        fun(Name, Decoder) ->
            (erlang:element(7, Actions))(
                Name,
                gleam@dynamic@decode:map(Decoder, F)
            )
        end,
        erlang:element(8, Actions)}.

-file("src/lustre/effect.gleam", 345).
-spec do_map(list(fun((actions(GLL)) -> nil)), fun((GLL) -> GLO)) -> list(fun((actions(GLO)) -> nil)).
do_map(Effects, F) ->
    gleam@list:map(
        Effects,
        fun(Effect) ->
            fun(Actions) -> Effect(do_comap_actions(Actions, F)) end
        end
    ).

-file("src/lustre/effect.gleam", 337).
?DOC(
    " Transform the result of an effect. This is useful for mapping over effects\n"
    " produced by other libraries or modules.\n"
    "\n"
    " > **Note**: Remember that effects are not _required_ to dispatch any messages.\n"
    " > Your mapping function may never be called!\n"
).
-spec map(effect(GLH), fun((GLH) -> GLJ)) -> effect(GLJ).
map(Effect, F) ->
    {effect,
        do_map(erlang:element(2, Effect), F),
        do_map(erlang:element(3, Effect), F),
        do_map(erlang:element(4, Effect), F)}.

-file("src/lustre/effect.gleam", 397).
?DOC(false).
-spec perform(
    effect(GLZ),
    fun((GLZ) -> nil),
    fun((binary(), gleam@json:json()) -> nil),
    fun((gleam@erlang@process:selector(GLZ)) -> nil),
    fun(() -> gleam@dynamic:dynamic_()),
    fun((binary(), gleam@json:json()) -> nil),
    fun((binary(), gleam@dynamic@decode:decoder(GLZ)) -> nil),
    fun((binary()) -> nil)
) -> nil.
perform(Effect, Dispatch, Emit, Select, Root, Provide, Subscribe, Unsubscribe) ->
    Actions = {actions,
        Dispatch,
        Emit,
        Select,
        Root,
        Provide,
        Subscribe,
        Unsubscribe},
    gleam@list:each(erlang:element(2, Effect), fun(Run) -> Run(Actions) end).
