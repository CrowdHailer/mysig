-module(lustre@element@html).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/lustre/element/html.gleam").
-export([html/2, text/1, base/1, head/2, link/1, meta/1, style/2, title/2, body/2, address/2, article/2, aside/2, footer/2, header/2, h1/2, h2/2, h3/2, h4/2, h5/2, h6/2, hgroup/2, main/2, nav/2, section/2, search/2, blockquote/2, dd/2, 'div'/2, dl/2, dt/2, figcaption/2, figure/2, hr/1, li/2, menu/2, ol/2, p/2, pre/2, ul/2, a/2, abbr/2, b/2, bdi/2, bdo/2, br/1, cite/2, code/2, data/2, dfn/2, em/2, i/2, kbd/2, mark/2, q/2, rp/2, rt/2, ruby/2, s/2, samp/2, small/2, span/2, strong/2, sub/2, sup/2, time/2, u/2, var/2, wbr/1, area/1, audio/2, img/1, map/2, track/1, video/2, embed/1, iframe/1, object/1, picture/2, portal/1, source/1, math/2, svg/2, canvas/1, noscript/2, script/2, del/2, ins/2, caption/2, col/1, colgroup/2, table/2, tbody/2, td/2, tfoot/2, th/2, thead/2, tr/2, button/2, datalist/2, fieldset/2, form/2, input/1, label/2, legend/2, meter/2, optgroup/2, option/2, output/2, progress/2, select/2, textarea/2, details/2, dialog/2, summary/2, slot/2, template/2]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

-file("src/lustre/element/html.gleam", 11).
?DOC("\n").
-spec html(
    list(lustre@vdom@vattr:attribute(HJE)),
    list(lustre@vdom@vnode:element(HJE))
) -> lustre@vdom@vnode:element(HJE).
html(Attrs, Children) ->
    lustre@element:element(<<"html"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 18).
-spec text(binary()) -> lustre@vdom@vnode:element(any()).
text(Content) ->
    lustre@element:text(Content).

-file("src/lustre/element/html.gleam", 25).
?DOC("\n").
-spec base(list(lustre@vdom@vattr:attribute(HJM))) -> lustre@vdom@vnode:element(HJM).
base(Attrs) ->
    lustre@element:element(<<"base"/utf8>>, Attrs, []).

-file("src/lustre/element/html.gleam", 30).
?DOC("\n").
-spec head(
    list(lustre@vdom@vattr:attribute(HJQ)),
    list(lustre@vdom@vnode:element(HJQ))
) -> lustre@vdom@vnode:element(HJQ).
head(Attrs, Children) ->
    lustre@element:element(<<"head"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 38).
?DOC("\n").
-spec link(list(lustre@vdom@vattr:attribute(HJW))) -> lustre@vdom@vnode:element(HJW).
link(Attrs) ->
    lustre@element:element(<<"link"/utf8>>, Attrs, []).

-file("src/lustre/element/html.gleam", 43).
?DOC("\n").
-spec meta(list(lustre@vdom@vattr:attribute(HKA))) -> lustre@vdom@vnode:element(HKA).
meta(Attrs) ->
    lustre@element:element(<<"meta"/utf8>>, Attrs, []).

-file("src/lustre/element/html.gleam", 48).
?DOC("\n").
-spec style(list(lustre@vdom@vattr:attribute(HKE)), binary()) -> lustre@vdom@vnode:element(HKE).
style(Attrs, Css) ->
    lustre@element:unsafe_raw_html(<<""/utf8>>, <<"style"/utf8>>, Attrs, Css).

-file("src/lustre/element/html.gleam", 53).
?DOC("\n").
-spec title(list(lustre@vdom@vattr:attribute(HKI)), binary()) -> lustre@vdom@vnode:element(HKI).
title(Attrs, Content) ->
    lustre@element:element(<<"title"/utf8>>, Attrs, [text(Content)]).

-file("src/lustre/element/html.gleam", 63).
?DOC("\n").
-spec body(
    list(lustre@vdom@vattr:attribute(HKM)),
    list(lustre@vdom@vnode:element(HKM))
) -> lustre@vdom@vnode:element(HKM).
body(Attrs, Children) ->
    lustre@element:element(<<"body"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 73).
?DOC("\n").
-spec address(
    list(lustre@vdom@vattr:attribute(HKS)),
    list(lustre@vdom@vnode:element(HKS))
) -> lustre@vdom@vnode:element(HKS).
address(Attrs, Children) ->
    lustre@element:element(<<"address"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 81).
?DOC("\n").
-spec article(
    list(lustre@vdom@vattr:attribute(HKY)),
    list(lustre@vdom@vnode:element(HKY))
) -> lustre@vdom@vnode:element(HKY).
article(Attrs, Children) ->
    lustre@element:element(<<"article"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 89).
?DOC("\n").
-spec aside(
    list(lustre@vdom@vattr:attribute(HLE)),
    list(lustre@vdom@vnode:element(HLE))
) -> lustre@vdom@vnode:element(HLE).
aside(Attrs, Children) ->
    lustre@element:element(<<"aside"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 97).
?DOC("\n").
-spec footer(
    list(lustre@vdom@vattr:attribute(HLK)),
    list(lustre@vdom@vnode:element(HLK))
) -> lustre@vdom@vnode:element(HLK).
footer(Attrs, Children) ->
    lustre@element:element(<<"footer"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 105).
?DOC("\n").
-spec header(
    list(lustre@vdom@vattr:attribute(HLQ)),
    list(lustre@vdom@vnode:element(HLQ))
) -> lustre@vdom@vnode:element(HLQ).
header(Attrs, Children) ->
    lustre@element:element(<<"header"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 113).
?DOC("\n").
-spec h1(
    list(lustre@vdom@vattr:attribute(HLW)),
    list(lustre@vdom@vnode:element(HLW))
) -> lustre@vdom@vnode:element(HLW).
h1(Attrs, Children) ->
    lustre@element:element(<<"h1"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 121).
?DOC("\n").
-spec h2(
    list(lustre@vdom@vattr:attribute(HMC)),
    list(lustre@vdom@vnode:element(HMC))
) -> lustre@vdom@vnode:element(HMC).
h2(Attrs, Children) ->
    lustre@element:element(<<"h2"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 129).
?DOC("\n").
-spec h3(
    list(lustre@vdom@vattr:attribute(HMI)),
    list(lustre@vdom@vnode:element(HMI))
) -> lustre@vdom@vnode:element(HMI).
h3(Attrs, Children) ->
    lustre@element:element(<<"h3"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 137).
?DOC("\n").
-spec h4(
    list(lustre@vdom@vattr:attribute(HMO)),
    list(lustre@vdom@vnode:element(HMO))
) -> lustre@vdom@vnode:element(HMO).
h4(Attrs, Children) ->
    lustre@element:element(<<"h4"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 145).
?DOC("\n").
-spec h5(
    list(lustre@vdom@vattr:attribute(HMU)),
    list(lustre@vdom@vnode:element(HMU))
) -> lustre@vdom@vnode:element(HMU).
h5(Attrs, Children) ->
    lustre@element:element(<<"h5"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 153).
?DOC("\n").
-spec h6(
    list(lustre@vdom@vattr:attribute(HNA)),
    list(lustre@vdom@vnode:element(HNA))
) -> lustre@vdom@vnode:element(HNA).
h6(Attrs, Children) ->
    lustre@element:element(<<"h6"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 161).
?DOC("\n").
-spec hgroup(
    list(lustre@vdom@vattr:attribute(HNG)),
    list(lustre@vdom@vnode:element(HNG))
) -> lustre@vdom@vnode:element(HNG).
hgroup(Attrs, Children) ->
    lustre@element:element(<<"hgroup"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 169).
?DOC("\n").
-spec main(
    list(lustre@vdom@vattr:attribute(HNM)),
    list(lustre@vdom@vnode:element(HNM))
) -> lustre@vdom@vnode:element(HNM).
main(Attrs, Children) ->
    lustre@element:element(<<"main"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 177).
?DOC("\n").
-spec nav(
    list(lustre@vdom@vattr:attribute(HNS)),
    list(lustre@vdom@vnode:element(HNS))
) -> lustre@vdom@vnode:element(HNS).
nav(Attrs, Children) ->
    lustre@element:element(<<"nav"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 185).
?DOC("\n").
-spec section(
    list(lustre@vdom@vattr:attribute(HNY)),
    list(lustre@vdom@vnode:element(HNY))
) -> lustre@vdom@vnode:element(HNY).
section(Attrs, Children) ->
    lustre@element:element(<<"section"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 193).
?DOC("\n").
-spec search(
    list(lustre@vdom@vattr:attribute(HOE)),
    list(lustre@vdom@vnode:element(HOE))
) -> lustre@vdom@vnode:element(HOE).
search(Attrs, Children) ->
    lustre@element:element(<<"search"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 203).
?DOC("\n").
-spec blockquote(
    list(lustre@vdom@vattr:attribute(HOK)),
    list(lustre@vdom@vnode:element(HOK))
) -> lustre@vdom@vnode:element(HOK).
blockquote(Attrs, Children) ->
    lustre@element:element(<<"blockquote"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 211).
?DOC("\n").
-spec dd(
    list(lustre@vdom@vattr:attribute(HOQ)),
    list(lustre@vdom@vnode:element(HOQ))
) -> lustre@vdom@vnode:element(HOQ).
dd(Attrs, Children) ->
    lustre@element:element(<<"dd"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 219).
?DOC("\n").
-spec 'div'(
    list(lustre@vdom@vattr:attribute(HOW)),
    list(lustre@vdom@vnode:element(HOW))
) -> lustre@vdom@vnode:element(HOW).
'div'(Attrs, Children) ->
    lustre@element:element(<<"div"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 227).
?DOC("\n").
-spec dl(
    list(lustre@vdom@vattr:attribute(HPC)),
    list(lustre@vdom@vnode:element(HPC))
) -> lustre@vdom@vnode:element(HPC).
dl(Attrs, Children) ->
    lustre@element:element(<<"dl"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 235).
?DOC("\n").
-spec dt(
    list(lustre@vdom@vattr:attribute(HPI)),
    list(lustre@vdom@vnode:element(HPI))
) -> lustre@vdom@vnode:element(HPI).
dt(Attrs, Children) ->
    lustre@element:element(<<"dt"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 243).
?DOC("\n").
-spec figcaption(
    list(lustre@vdom@vattr:attribute(HPO)),
    list(lustre@vdom@vnode:element(HPO))
) -> lustre@vdom@vnode:element(HPO).
figcaption(Attrs, Children) ->
    lustre@element:element(<<"figcaption"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 251).
?DOC("\n").
-spec figure(
    list(lustre@vdom@vattr:attribute(HPU)),
    list(lustre@vdom@vnode:element(HPU))
) -> lustre@vdom@vnode:element(HPU).
figure(Attrs, Children) ->
    lustre@element:element(<<"figure"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 259).
?DOC("\n").
-spec hr(list(lustre@vdom@vattr:attribute(HQA))) -> lustre@vdom@vnode:element(HQA).
hr(Attrs) ->
    lustre@element:element(<<"hr"/utf8>>, Attrs, []).

-file("src/lustre/element/html.gleam", 264).
?DOC("\n").
-spec li(
    list(lustre@vdom@vattr:attribute(HQE)),
    list(lustre@vdom@vnode:element(HQE))
) -> lustre@vdom@vnode:element(HQE).
li(Attrs, Children) ->
    lustre@element:element(<<"li"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 272).
?DOC("\n").
-spec menu(
    list(lustre@vdom@vattr:attribute(HQK)),
    list(lustre@vdom@vnode:element(HQK))
) -> lustre@vdom@vnode:element(HQK).
menu(Attrs, Children) ->
    lustre@element:element(<<"menu"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 280).
?DOC("\n").
-spec ol(
    list(lustre@vdom@vattr:attribute(HQQ)),
    list(lustre@vdom@vnode:element(HQQ))
) -> lustre@vdom@vnode:element(HQQ).
ol(Attrs, Children) ->
    lustre@element:element(<<"ol"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 288).
?DOC("\n").
-spec p(
    list(lustre@vdom@vattr:attribute(HQW)),
    list(lustre@vdom@vnode:element(HQW))
) -> lustre@vdom@vnode:element(HQW).
p(Attrs, Children) ->
    lustre@element:element(<<"p"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 296).
?DOC("\n").
-spec pre(
    list(lustre@vdom@vattr:attribute(HRC)),
    list(lustre@vdom@vnode:element(HRC))
) -> lustre@vdom@vnode:element(HRC).
pre(Attrs, Children) ->
    lustre@element:element(<<"pre"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 304).
?DOC("\n").
-spec ul(
    list(lustre@vdom@vattr:attribute(HRI)),
    list(lustre@vdom@vnode:element(HRI))
) -> lustre@vdom@vnode:element(HRI).
ul(Attrs, Children) ->
    lustre@element:element(<<"ul"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 314).
?DOC("\n").
-spec a(
    list(lustre@vdom@vattr:attribute(HRO)),
    list(lustre@vdom@vnode:element(HRO))
) -> lustre@vdom@vnode:element(HRO).
a(Attrs, Children) ->
    lustre@element:element(<<"a"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 322).
?DOC("\n").
-spec abbr(
    list(lustre@vdom@vattr:attribute(HRU)),
    list(lustre@vdom@vnode:element(HRU))
) -> lustre@vdom@vnode:element(HRU).
abbr(Attrs, Children) ->
    lustre@element:element(<<"abbr"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 330).
?DOC("\n").
-spec b(
    list(lustre@vdom@vattr:attribute(HSA)),
    list(lustre@vdom@vnode:element(HSA))
) -> lustre@vdom@vnode:element(HSA).
b(Attrs, Children) ->
    lustre@element:element(<<"b"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 338).
?DOC("\n").
-spec bdi(
    list(lustre@vdom@vattr:attribute(HSG)),
    list(lustre@vdom@vnode:element(HSG))
) -> lustre@vdom@vnode:element(HSG).
bdi(Attrs, Children) ->
    lustre@element:element(<<"bdi"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 346).
?DOC("\n").
-spec bdo(
    list(lustre@vdom@vattr:attribute(HSM)),
    list(lustre@vdom@vnode:element(HSM))
) -> lustre@vdom@vnode:element(HSM).
bdo(Attrs, Children) ->
    lustre@element:element(<<"bdo"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 354).
?DOC("\n").
-spec br(list(lustre@vdom@vattr:attribute(HSS))) -> lustre@vdom@vnode:element(HSS).
br(Attrs) ->
    lustre@element:element(<<"br"/utf8>>, Attrs, []).

-file("src/lustre/element/html.gleam", 359).
?DOC("\n").
-spec cite(
    list(lustre@vdom@vattr:attribute(HSW)),
    list(lustre@vdom@vnode:element(HSW))
) -> lustre@vdom@vnode:element(HSW).
cite(Attrs, Children) ->
    lustre@element:element(<<"cite"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 367).
?DOC("\n").
-spec code(
    list(lustre@vdom@vattr:attribute(HTC)),
    list(lustre@vdom@vnode:element(HTC))
) -> lustre@vdom@vnode:element(HTC).
code(Attrs, Children) ->
    lustre@element:element(<<"code"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 375).
?DOC("\n").
-spec data(
    list(lustre@vdom@vattr:attribute(HTI)),
    list(lustre@vdom@vnode:element(HTI))
) -> lustre@vdom@vnode:element(HTI).
data(Attrs, Children) ->
    lustre@element:element(<<"data"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 383).
?DOC("\n").
-spec dfn(
    list(lustre@vdom@vattr:attribute(HTO)),
    list(lustre@vdom@vnode:element(HTO))
) -> lustre@vdom@vnode:element(HTO).
dfn(Attrs, Children) ->
    lustre@element:element(<<"dfn"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 391).
?DOC("\n").
-spec em(
    list(lustre@vdom@vattr:attribute(HTU)),
    list(lustre@vdom@vnode:element(HTU))
) -> lustre@vdom@vnode:element(HTU).
em(Attrs, Children) ->
    lustre@element:element(<<"em"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 399).
?DOC("\n").
-spec i(
    list(lustre@vdom@vattr:attribute(HUA)),
    list(lustre@vdom@vnode:element(HUA))
) -> lustre@vdom@vnode:element(HUA).
i(Attrs, Children) ->
    lustre@element:element(<<"i"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 407).
?DOC("\n").
-spec kbd(
    list(lustre@vdom@vattr:attribute(HUG)),
    list(lustre@vdom@vnode:element(HUG))
) -> lustre@vdom@vnode:element(HUG).
kbd(Attrs, Children) ->
    lustre@element:element(<<"kbd"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 415).
?DOC("\n").
-spec mark(
    list(lustre@vdom@vattr:attribute(HUM)),
    list(lustre@vdom@vnode:element(HUM))
) -> lustre@vdom@vnode:element(HUM).
mark(Attrs, Children) ->
    lustre@element:element(<<"mark"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 423).
?DOC("\n").
-spec q(
    list(lustre@vdom@vattr:attribute(HUS)),
    list(lustre@vdom@vnode:element(HUS))
) -> lustre@vdom@vnode:element(HUS).
q(Attrs, Children) ->
    lustre@element:element(<<"q"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 431).
?DOC("\n").
-spec rp(
    list(lustre@vdom@vattr:attribute(HUY)),
    list(lustre@vdom@vnode:element(HUY))
) -> lustre@vdom@vnode:element(HUY).
rp(Attrs, Children) ->
    lustre@element:element(<<"rp"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 439).
?DOC("\n").
-spec rt(
    list(lustre@vdom@vattr:attribute(HVE)),
    list(lustre@vdom@vnode:element(HVE))
) -> lustre@vdom@vnode:element(HVE).
rt(Attrs, Children) ->
    lustre@element:element(<<"rt"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 447).
?DOC("\n").
-spec ruby(
    list(lustre@vdom@vattr:attribute(HVK)),
    list(lustre@vdom@vnode:element(HVK))
) -> lustre@vdom@vnode:element(HVK).
ruby(Attrs, Children) ->
    lustre@element:element(<<"ruby"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 455).
?DOC("\n").
-spec s(
    list(lustre@vdom@vattr:attribute(HVQ)),
    list(lustre@vdom@vnode:element(HVQ))
) -> lustre@vdom@vnode:element(HVQ).
s(Attrs, Children) ->
    lustre@element:element(<<"s"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 463).
?DOC("\n").
-spec samp(
    list(lustre@vdom@vattr:attribute(HVW)),
    list(lustre@vdom@vnode:element(HVW))
) -> lustre@vdom@vnode:element(HVW).
samp(Attrs, Children) ->
    lustre@element:element(<<"samp"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 471).
?DOC("\n").
-spec small(
    list(lustre@vdom@vattr:attribute(HWC)),
    list(lustre@vdom@vnode:element(HWC))
) -> lustre@vdom@vnode:element(HWC).
small(Attrs, Children) ->
    lustre@element:element(<<"small"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 479).
?DOC("\n").
-spec span(
    list(lustre@vdom@vattr:attribute(HWI)),
    list(lustre@vdom@vnode:element(HWI))
) -> lustre@vdom@vnode:element(HWI).
span(Attrs, Children) ->
    lustre@element:element(<<"span"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 487).
?DOC("\n").
-spec strong(
    list(lustre@vdom@vattr:attribute(HWO)),
    list(lustre@vdom@vnode:element(HWO))
) -> lustre@vdom@vnode:element(HWO).
strong(Attrs, Children) ->
    lustre@element:element(<<"strong"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 495).
?DOC("\n").
-spec sub(
    list(lustre@vdom@vattr:attribute(HWU)),
    list(lustre@vdom@vnode:element(HWU))
) -> lustre@vdom@vnode:element(HWU).
sub(Attrs, Children) ->
    lustre@element:element(<<"sub"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 503).
?DOC("\n").
-spec sup(
    list(lustre@vdom@vattr:attribute(HXA)),
    list(lustre@vdom@vnode:element(HXA))
) -> lustre@vdom@vnode:element(HXA).
sup(Attrs, Children) ->
    lustre@element:element(<<"sup"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 511).
?DOC("\n").
-spec time(
    list(lustre@vdom@vattr:attribute(HXG)),
    list(lustre@vdom@vnode:element(HXG))
) -> lustre@vdom@vnode:element(HXG).
time(Attrs, Children) ->
    lustre@element:element(<<"time"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 519).
?DOC("\n").
-spec u(
    list(lustre@vdom@vattr:attribute(HXM)),
    list(lustre@vdom@vnode:element(HXM))
) -> lustre@vdom@vnode:element(HXM).
u(Attrs, Children) ->
    lustre@element:element(<<"u"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 527).
?DOC("\n").
-spec var(
    list(lustre@vdom@vattr:attribute(HXS)),
    list(lustre@vdom@vnode:element(HXS))
) -> lustre@vdom@vnode:element(HXS).
var(Attrs, Children) ->
    lustre@element:element(<<"var"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 535).
?DOC("\n").
-spec wbr(list(lustre@vdom@vattr:attribute(HXY))) -> lustre@vdom@vnode:element(HXY).
wbr(Attrs) ->
    lustre@element:element(<<"wbr"/utf8>>, Attrs, []).

-file("src/lustre/element/html.gleam", 542).
?DOC("\n").
-spec area(list(lustre@vdom@vattr:attribute(HYC))) -> lustre@vdom@vnode:element(HYC).
area(Attrs) ->
    lustre@element:element(<<"area"/utf8>>, Attrs, []).

-file("src/lustre/element/html.gleam", 547).
?DOC("\n").
-spec audio(
    list(lustre@vdom@vattr:attribute(HYG)),
    list(lustre@vdom@vnode:element(HYG))
) -> lustre@vdom@vnode:element(HYG).
audio(Attrs, Children) ->
    lustre@element:element(<<"audio"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 555).
?DOC("\n").
-spec img(list(lustre@vdom@vattr:attribute(HYM))) -> lustre@vdom@vnode:element(HYM).
img(Attrs) ->
    lustre@element:element(<<"img"/utf8>>, Attrs, []).

-file("src/lustre/element/html.gleam", 561).
?DOC(" Used with <area> elements to define an image map (a clickable link area).\n").
-spec map(
    list(lustre@vdom@vattr:attribute(HYQ)),
    list(lustre@vdom@vnode:element(HYQ))
) -> lustre@vdom@vnode:element(HYQ).
map(Attrs, Children) ->
    lustre@element:element(<<"map"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 569).
?DOC("\n").
-spec track(list(lustre@vdom@vattr:attribute(HYW))) -> lustre@vdom@vnode:element(HYW).
track(Attrs) ->
    lustre@element:element(<<"track"/utf8>>, Attrs, []).

-file("src/lustre/element/html.gleam", 574).
?DOC("\n").
-spec video(
    list(lustre@vdom@vattr:attribute(HZA)),
    list(lustre@vdom@vnode:element(HZA))
) -> lustre@vdom@vnode:element(HZA).
video(Attrs, Children) ->
    lustre@element:element(<<"video"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 584).
?DOC("\n").
-spec embed(list(lustre@vdom@vattr:attribute(HZG))) -> lustre@vdom@vnode:element(HZG).
embed(Attrs) ->
    lustre@element:element(<<"embed"/utf8>>, Attrs, []).

-file("src/lustre/element/html.gleam", 589).
?DOC("\n").
-spec iframe(list(lustre@vdom@vattr:attribute(HZK))) -> lustre@vdom@vnode:element(HZK).
iframe(Attrs) ->
    lustre@element:element(<<"iframe"/utf8>>, Attrs, []).

-file("src/lustre/element/html.gleam", 594).
?DOC("\n").
-spec object(list(lustre@vdom@vattr:attribute(HZO))) -> lustre@vdom@vnode:element(HZO).
object(Attrs) ->
    lustre@element:element(<<"object"/utf8>>, Attrs, []).

-file("src/lustre/element/html.gleam", 599).
?DOC("\n").
-spec picture(
    list(lustre@vdom@vattr:attribute(HZS)),
    list(lustre@vdom@vnode:element(HZS))
) -> lustre@vdom@vnode:element(HZS).
picture(Attrs, Children) ->
    lustre@element:element(<<"picture"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 607).
?DOC("\n").
-spec portal(list(lustre@vdom@vattr:attribute(HZY))) -> lustre@vdom@vnode:element(HZY).
portal(Attrs) ->
    lustre@element:element(<<"portal"/utf8>>, Attrs, []).

-file("src/lustre/element/html.gleam", 612).
?DOC("\n").
-spec source(list(lustre@vdom@vattr:attribute(IAC))) -> lustre@vdom@vnode:element(IAC).
source(Attrs) ->
    lustre@element:element(<<"source"/utf8>>, Attrs, []).

-file("src/lustre/element/html.gleam", 619).
?DOC("\n").
-spec math(
    list(lustre@vdom@vattr:attribute(IAG)),
    list(lustre@vdom@vnode:element(IAG))
) -> lustre@vdom@vnode:element(IAG).
math(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/1998/Math/MathML"/utf8>>,
        <<"math"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/html.gleam", 627).
?DOC("\n").
-spec svg(
    list(lustre@vdom@vattr:attribute(IAM)),
    list(lustre@vdom@vnode:element(IAM))
) -> lustre@vdom@vnode:element(IAM).
svg(Attrs, Children) ->
    lustre@element:namespaced(
        <<"http://www.w3.org/2000/svg"/utf8>>,
        <<"svg"/utf8>>,
        Attrs,
        Children
    ).

-file("src/lustre/element/html.gleam", 637).
?DOC("\n").
-spec canvas(list(lustre@vdom@vattr:attribute(IAS))) -> lustre@vdom@vnode:element(IAS).
canvas(Attrs) ->
    lustre@element:element(<<"canvas"/utf8>>, Attrs, []).

-file("src/lustre/element/html.gleam", 642).
?DOC("\n").
-spec noscript(
    list(lustre@vdom@vattr:attribute(IAW)),
    list(lustre@vdom@vnode:element(IAW))
) -> lustre@vdom@vnode:element(IAW).
noscript(Attrs, Children) ->
    lustre@element:element(<<"noscript"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 650).
?DOC("\n").
-spec script(list(lustre@vdom@vattr:attribute(IBC)), binary()) -> lustre@vdom@vnode:element(IBC).
script(Attrs, Js) ->
    lustre@element:unsafe_raw_html(<<""/utf8>>, <<"script"/utf8>>, Attrs, Js).

-file("src/lustre/element/html.gleam", 657).
?DOC("\n").
-spec del(
    list(lustre@vdom@vattr:attribute(IBG)),
    list(lustre@vdom@vnode:element(IBG))
) -> lustre@vdom@vnode:element(IBG).
del(Attrs, Children) ->
    lustre@element:element(<<"del"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 665).
?DOC("\n").
-spec ins(
    list(lustre@vdom@vattr:attribute(IBM)),
    list(lustre@vdom@vnode:element(IBM))
) -> lustre@vdom@vnode:element(IBM).
ins(Attrs, Children) ->
    lustre@element:element(<<"ins"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 675).
?DOC("\n").
-spec caption(
    list(lustre@vdom@vattr:attribute(IBS)),
    list(lustre@vdom@vnode:element(IBS))
) -> lustre@vdom@vnode:element(IBS).
caption(Attrs, Children) ->
    lustre@element:element(<<"caption"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 683).
?DOC("\n").
-spec col(list(lustre@vdom@vattr:attribute(IBY))) -> lustre@vdom@vnode:element(IBY).
col(Attrs) ->
    lustre@element:element(<<"col"/utf8>>, Attrs, []).

-file("src/lustre/element/html.gleam", 688).
?DOC("\n").
-spec colgroup(
    list(lustre@vdom@vattr:attribute(ICC)),
    list(lustre@vdom@vnode:element(ICC))
) -> lustre@vdom@vnode:element(ICC).
colgroup(Attrs, Children) ->
    lustre@element:element(<<"colgroup"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 696).
?DOC("\n").
-spec table(
    list(lustre@vdom@vattr:attribute(ICI)),
    list(lustre@vdom@vnode:element(ICI))
) -> lustre@vdom@vnode:element(ICI).
table(Attrs, Children) ->
    lustre@element:element(<<"table"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 704).
?DOC("\n").
-spec tbody(
    list(lustre@vdom@vattr:attribute(ICO)),
    list(lustre@vdom@vnode:element(ICO))
) -> lustre@vdom@vnode:element(ICO).
tbody(Attrs, Children) ->
    lustre@element:element(<<"tbody"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 712).
?DOC("\n").
-spec td(
    list(lustre@vdom@vattr:attribute(ICU)),
    list(lustre@vdom@vnode:element(ICU))
) -> lustre@vdom@vnode:element(ICU).
td(Attrs, Children) ->
    lustre@element:element(<<"td"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 720).
?DOC("\n").
-spec tfoot(
    list(lustre@vdom@vattr:attribute(IDA)),
    list(lustre@vdom@vnode:element(IDA))
) -> lustre@vdom@vnode:element(IDA).
tfoot(Attrs, Children) ->
    lustre@element:element(<<"tfoot"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 728).
?DOC("\n").
-spec th(
    list(lustre@vdom@vattr:attribute(IDG)),
    list(lustre@vdom@vnode:element(IDG))
) -> lustre@vdom@vnode:element(IDG).
th(Attrs, Children) ->
    lustre@element:element(<<"th"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 736).
?DOC("\n").
-spec thead(
    list(lustre@vdom@vattr:attribute(IDM)),
    list(lustre@vdom@vnode:element(IDM))
) -> lustre@vdom@vnode:element(IDM).
thead(Attrs, Children) ->
    lustre@element:element(<<"thead"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 744).
?DOC("\n").
-spec tr(
    list(lustre@vdom@vattr:attribute(IDS)),
    list(lustre@vdom@vnode:element(IDS))
) -> lustre@vdom@vnode:element(IDS).
tr(Attrs, Children) ->
    lustre@element:element(<<"tr"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 754).
?DOC("\n").
-spec button(
    list(lustre@vdom@vattr:attribute(IDY)),
    list(lustre@vdom@vnode:element(IDY))
) -> lustre@vdom@vnode:element(IDY).
button(Attrs, Children) ->
    lustre@element:element(<<"button"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 762).
?DOC("\n").
-spec datalist(
    list(lustre@vdom@vattr:attribute(IEE)),
    list(lustre@vdom@vnode:element(IEE))
) -> lustre@vdom@vnode:element(IEE).
datalist(Attrs, Children) ->
    lustre@element:element(<<"datalist"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 770).
?DOC("\n").
-spec fieldset(
    list(lustre@vdom@vattr:attribute(IEK)),
    list(lustre@vdom@vnode:element(IEK))
) -> lustre@vdom@vnode:element(IEK).
fieldset(Attrs, Children) ->
    lustre@element:element(<<"fieldset"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 778).
?DOC("\n").
-spec form(
    list(lustre@vdom@vattr:attribute(IEQ)),
    list(lustre@vdom@vnode:element(IEQ))
) -> lustre@vdom@vnode:element(IEQ).
form(Attrs, Children) ->
    lustre@element:element(<<"form"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 786).
?DOC("\n").
-spec input(list(lustre@vdom@vattr:attribute(IEW))) -> lustre@vdom@vnode:element(IEW).
input(Attrs) ->
    lustre@element:element(<<"input"/utf8>>, Attrs, []).

-file("src/lustre/element/html.gleam", 791).
?DOC("\n").
-spec label(
    list(lustre@vdom@vattr:attribute(IFA)),
    list(lustre@vdom@vnode:element(IFA))
) -> lustre@vdom@vnode:element(IFA).
label(Attrs, Children) ->
    lustre@element:element(<<"label"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 799).
?DOC("\n").
-spec legend(
    list(lustre@vdom@vattr:attribute(IFG)),
    list(lustre@vdom@vnode:element(IFG))
) -> lustre@vdom@vnode:element(IFG).
legend(Attrs, Children) ->
    lustre@element:element(<<"legend"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 807).
?DOC("\n").
-spec meter(
    list(lustre@vdom@vattr:attribute(IFM)),
    list(lustre@vdom@vnode:element(IFM))
) -> lustre@vdom@vnode:element(IFM).
meter(Attrs, Children) ->
    lustre@element:element(<<"meter"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 815).
?DOC("\n").
-spec optgroup(
    list(lustre@vdom@vattr:attribute(IFS)),
    list(lustre@vdom@vnode:element(IFS))
) -> lustre@vdom@vnode:element(IFS).
optgroup(Attrs, Children) ->
    lustre@element:element(<<"optgroup"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 823).
?DOC("\n").
-spec option(list(lustre@vdom@vattr:attribute(IFY)), binary()) -> lustre@vdom@vnode:element(IFY).
option(Attrs, Label) ->
    lustre@element:element(
        <<"option"/utf8>>,
        Attrs,
        [lustre@element:text(Label)]
    ).

-file("src/lustre/element/html.gleam", 831).
?DOC("\n").
-spec output(
    list(lustre@vdom@vattr:attribute(IGC)),
    list(lustre@vdom@vnode:element(IGC))
) -> lustre@vdom@vnode:element(IGC).
output(Attrs, Children) ->
    lustre@element:element(<<"output"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 839).
?DOC("\n").
-spec progress(
    list(lustre@vdom@vattr:attribute(IGI)),
    list(lustre@vdom@vnode:element(IGI))
) -> lustre@vdom@vnode:element(IGI).
progress(Attrs, Children) ->
    lustre@element:element(<<"progress"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 847).
?DOC("\n").
-spec select(
    list(lustre@vdom@vattr:attribute(IGO)),
    list(lustre@vdom@vnode:element(IGO))
) -> lustre@vdom@vnode:element(IGO).
select(Attrs, Children) ->
    lustre@element:element(<<"select"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 855).
?DOC("\n").
-spec textarea(list(lustre@vdom@vattr:attribute(IGU)), binary()) -> lustre@vdom@vnode:element(IGU).
textarea(Attrs, Content) ->
    lustre@element:element(
        <<"textarea"/utf8>>,
        [lustre@attribute:property(<<"value"/utf8>>, gleam@json:string(Content)) |
            Attrs],
        [lustre@element:text(Content)]
    ).

-file("src/lustre/element/html.gleam", 869).
?DOC("\n").
-spec details(
    list(lustre@vdom@vattr:attribute(IGY)),
    list(lustre@vdom@vnode:element(IGY))
) -> lustre@vdom@vnode:element(IGY).
details(Attrs, Children) ->
    lustre@element:element(<<"details"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 877).
?DOC("\n").
-spec dialog(
    list(lustre@vdom@vattr:attribute(IHE)),
    list(lustre@vdom@vnode:element(IHE))
) -> lustre@vdom@vnode:element(IHE).
dialog(Attrs, Children) ->
    lustre@element:element(<<"dialog"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 885).
?DOC("\n").
-spec summary(
    list(lustre@vdom@vattr:attribute(IHK)),
    list(lustre@vdom@vnode:element(IHK))
) -> lustre@vdom@vnode:element(IHK).
summary(Attrs, Children) ->
    lustre@element:element(<<"summary"/utf8>>, Attrs, Children).

-file("src/lustre/element/html.gleam", 895).
?DOC("\n").
-spec slot(
    list(lustre@vdom@vattr:attribute(IHQ)),
    list(lustre@vdom@vnode:element(IHQ))
) -> lustre@vdom@vnode:element(IHQ).
slot(Attrs, Fallback) ->
    lustre@element:element(<<"slot"/utf8>>, Attrs, Fallback).

-file("src/lustre/element/html.gleam", 903).
?DOC("\n").
-spec template(
    list(lustre@vdom@vattr:attribute(IHW)),
    list(lustre@vdom@vnode:element(IHW))
) -> lustre@vdom@vnode:element(IHW).
template(Attrs, Children) ->
    lustre@element:element(<<"template"/utf8>>, Attrs, Children).
