-module(lustre@server_component).
-compile([no_auto_import, nowarn_unused_vars, nowarn_unused_function, nowarn_nomatch, inline]).
-define(FILEPATH, "src/lustre/server_component.gleam").
-export([element/2, script/0, route/1, method/1, include/2, csrf_token/1, subject/1, pid/1, register_subject/1, deregister_subject/1, register_callback/1, deregister_callback/1, emit/2, select/1, runtime_message_decoder/0, client_message_to_json/1]).
-export_type([transport_method/0]).

-if(?OTP_RELEASE >= 27).
-define(MODULEDOC(Str), -moduledoc(Str)).
-define(DOC(Str), -doc(Str)).
-else.
-define(MODULEDOC(Str), -compile([])).
-define(DOC(Str), -compile([])).
-endif.

?MODULEDOC(
    " Server components are an advanced feature that allows you to run components\n"
    " or full Lustre applications on the server. Updates are broadcast to a small\n"
    " (10kb!) client runtime that patches the DOM and events are sent back to the\n"
    " server component in real-time.\n"
    "\n"
    " ```text\n"
    " -- SERVER -----------------------------------------------------------------\n"
    "\n"
    "                  Message                            Element(Message)\n"
    " +--------+        v        +----------------+        v        +------+\n"
    " |        | <-------------- |                | <-------------- |      |\n"
    " | update |                 | Lustre runtime |                 | view |\n"
    " |        | --------------> |                | --------------> |      |\n"
    " +--------+        ^        +----------------+        ^        +------+\n"
    "         #(model, Effect(message))  |        ^          Model\n"
    "                                |        |\n"
    "                                |        |\n"
    "                    DOM patches |        | DOM events\n"
    "                                |        |\n"
    "                                v        |\n"
    "                        +-----------------------+\n"
    "                        |                       |\n"
    "                        | Your WebSocket server |\n"
    "                        |                       |\n"
    "                        +-----------------------+\n"
    "                                |        ^\n"
    "                                |        |\n"
    "                    DOM patches |        | DOM events\n"
    "                                |        |\n"
    "                                v        |\n"
    " -- BROWSER ----------------------------------------------------------------\n"
    "                                |        ^\n"
    "                                |        |\n"
    "                    DOM patches |        | DOM events\n"
    "                                |        |\n"
    "                                v        |\n"
    "                            +----------------+\n"
    "                            |                |\n"
    "                            | Client runtime |\n"
    "                            |                |\n"
    "                            +----------------+\n"
    " ```\n"
    "\n"
    " > **Note**: Lustre's server component runtime is separate from your application's\n"
    " > WebSocket server. You're free to bring your own stack, connect multiple\n"
    " > clients to the same Lustre instance, or keep the application alive even when\n"
    " > no clients are connected.\n"
    "\n"
    " Lustre server components run next to the rest of your backend code, your\n"
    " services, your database, etc. Real-time applications like chat services, games,\n"
    " or components that can benefit from direct access to your backend services\n"
    " like an admin dashboard or data table are excellent candidates for server\n"
    " components.\n"
    "\n"
    " ## Examples\n"
    "\n"
    " Server components are a new feature in Lustre and we're still working on the\n"
    " best ways to use them and show them off. Here are a few examples we've\n"
    " developed so far:\n"
    "\n"
    " - [Basic setup](https://github.com/lustre-labs/lustre/tree/main/examples/06-server-components/01-basic-setup)\n"
    "\n"
    " - [Custom attributes and events](https://github.com/lustre-labs/lustre/tree/main/examples/06-server-components/02-attributes-and-events)\n"
    "\n"
    " - [Decoding DOM events](https://github.com/lustre-labs/lustre/tree/main/examples/06-server-components/03-event-include)\n"
    "\n"
    " - [Connecting more than one client](https://github.com/lustre-labs/lustre/tree/main/examples/06-server-components/04-multiple-clients)\n"
    "\n"
    " - [Adding publish-subscribe](https://github.com/lustre-labs/lustre/tree/main/examples/06-server-components/05-publish-subscribe)\n"
    "\n"
    " ## Getting help\n"
    "\n"
    " If you're having trouble with Lustre or not sure what the right way to do\n"
    " something is, the best place to get help is the [Gleam Discord server](https://discord.gg/Fm8Pwmy).\n"
    " You could also open an issue on the [Lustre GitHub repository](https://github.com/lustre-labs/lustre/issues).\n"
    "\n"
).

-type transport_method() :: web_socket | server_sent_events | polling.

-file("src/lustre/server_component.gleam", 143).
?DOC(
    " Render the server component custom element. This element acts as the thin\n"
    " client runtime for a server component running remotely. There are a handful\n"
    " of attributes you should provide to configure the client runtime:\n"
    "\n"
    " - [`route`](#route) is the URL your server component should connect to. This\n"
    "   **must** be provided before the client runtime will do anything. The route\n"
    "   can be a relative URL, in which case it will be resolved against the current\n"
    "   page URL.\n"
    "\n"
    " - [`method`](#method) is the transport method the client runtime should use.\n"
    "   This defaults to `WebSocket` enabling duplex communication between the client\n"
    "   and server runtime. Other options include `ServerSentEvents` and `Polling`\n"
    "   which are unidirectional transports.\n"
    "\n"
    " > **Note**: the server component runtime bundle must be included and sent to\n"
    " > the client for this to work correctly. You can do this by including the\n"
    " > JavaScript bundle found in Lustre's `priv/static` directory or by inlining\n"
    " > the script source directly with the [`script`](#script) element below.\n"
).
-spec element(
    list(lustre@vdom@vattr:attribute(OYH)),
    list(lustre@vdom@vnode:element(OYH))
) -> lustre@vdom@vnode:element(OYH).
element(Attributes, Children) ->
    lustre@element:element(
        <<"lustre-server-component"/utf8>>,
        Attributes,
        Children
    ).

-file("src/lustre/server_component.gleam", 155).
?DOC(
    " Inline the server component client runtime as a `<script>` tag. Where possible\n"
    " you should prefer serving the pre-built client runtime from Lustre's `priv/static`\n"
    " directory, but this inline script can be useful for development or scenarios\n"
    " where you don't control the HTML document.\n"
).
-spec script() -> lustre@vdom@vnode:element(any()).
script() ->
    lustre@element@html:script(
        [lustre@attribute:type_(<<"module"/utf8>>)],
        <<"function ge(s){return s.replaceAll(/[><&\"']/g,e=>{switch(e){case\">\":return\"&gt;\";case\"<\":return\"&lt;\";case\"'\":return\"&#39;\";case\"&\":return\"&amp;\";case'\"':return\"&quot;\";default:return e}})}function be(s){return ge(s)}function D(s){return be(s)}var ee=s=>s.head,q=s=>s.tail;var Lt=5,Zn=(1<<Lt)-1,er=Symbol(),tr=Symbol();var Be=[\" \",\"	\",`\\n`,\"\\v\",\"\\f\",\"\\r\",\"\\x85\",\"\\u2028\",\"\\u2029\"].join(\"\"),Xr=new RegExp(`^[${Be}]*`),Yr=new RegExp(`[${Be}]*$`);var Je=0,Qe=1,Ke=2,Xe=0;var ce=2;var W=0,J=1,ue=2,Ye=3,I=4,Ze=5;var et=0,tt=1,nt=2,rt=3,it=4,st=5,ot=6;var ct=\"\\r\",ut=\"	\";var g=(s,e)=>{if(Array.isArray(s))for(let t=0;t<s.length;t++)e(s[t]);else if(s)for(s;q(s);s=q(s))e(ee(s))};var ae=\"http://www.w3.org/1999/xhtml\";var ft=!!globalThis.HTMLElement?.prototype?.moveBefore;var wn=globalThis.setTimeout,fe=globalThis.clearTimeout,yn=(s,e)=>globalThis.document.createElementNS(s,e),pt=s=>globalThis.document.createTextNode(s),dt=s=>globalThis.document.createComment(s),kn=()=>globalThis.document.createDocumentFragment(),k=(s,e,t)=>s.insertBefore(e,t),ht=ft?(s,e,t)=>s.moveBefore(e,t):k,_t=(s,e)=>s.removeChild(e),vn=(s,e)=>s.getAttribute(e),mt=(s,e,t)=>s.setAttribute(e,t),En=(s,e)=>s.removeAttribute(e),jn=(s,e,t,r)=>s.addEventListener(e,t,r),xt=(s,e,t)=>s.removeEventListener(e,t),Cn=(s,e)=>s.innerHTML=e,Sn=(s,e)=>s.data=e,m=Symbol(\"lustre\"),de=class{constructor(e,t,r,n){this.kind=e,this.key=n,this.parent=t,this.children=[],this.node=r,this.endNode=null,this.handlers=new Map,this.throttles=new Map,this.debouncers=new Map}get isVirtual(){return this.kind===W||this.kind===I}get parentNode(){return this.isVirtual?this.node.parentNode:this.node}};var N=(s,e,t,r,n)=>{let o=new de(s,e,t,n);return t[m]=o,e?.children.splice(r,0,o),o},Mn=s=>{let e=\"\";for(let t=s[m];t.parent;t=t.parent){let r=t.parent&&t.parent.kind===I?ct:ut;if(t.key)e=`${r}${t.key}${e}`;else{let n=t.parent.children.indexOf(t);e=`${r}${n}${e}`}}return e.slice(1)},U=class{#i=null;#e;#t;#r=!1;constructor(e,t,r,{debug:n=!1}={}){this.#i=e,this.#e=t,this.#t=r,this.#r=n}mount(e){N(J,null,this.#i,0,null),this.#h(this.#i,null,this.#i[m],0,e)}push(e,t=null){this.#n=t,this.#s.push({node:this.#i[m],patch:e}),this.#l()}#n;#s=[];#l(){let e=this.#s;for(;e.length;){let{node:t,patch:r}=e.pop(),{path:n,changes:o,removed:i,children:l}=r;g(n,u=>{t=t.children[u]});let{children:c}=t;g(o,u=>this.#o(t,u)),i&&this.#d(t,c.length-i,i),g(l,u=>{let $=c[u.index|0];this.#s.push({node:$,patch:u})})}}#o(e,t){switch(t.kind){case et:this.#E(e,t);break;case tt:this.#w(e,t);break;case nt:this.#g(e,t);break;case rt:this.#f(e,t);break;case it:this.#m(e,t);break;case st:this.#c(e,t);break;case ot:this.#u(e,t);break}}#u(e,{children:t,before:r}){let n=kn(),o=this.#a(e,r);this.#b(n,null,e,r|0,t),k(e.parentNode,n,o)}#c(e,{index:t,with:r}){this.#d(e,t|0,1);let n=this.#a(e,t);this.#h(e.parentNode,n,e,t|0,r)}#a(e,t){t=t|0;let{children:r}=e,n=r.length;if(t<n)return r[t].node;if(e.endNode)return e.endNode;if(!e.isVirtual)return null;for(;e.isVirtual&&e.children.length;){if(e.endNode)return e.endNode.nextSibling;e=e.children[e.children.length-1]}return e.node.nextSibling}#f(e,{key:t,before:r}){r=r|0;let{children:n,parentNode:o}=e,i=n[r].node,l=n[r];for(let c=r+1;c<n.length;++c){let u=n[c];if(n[c]=l,l=u,u.key===t){n[r]=u;break}}this.#_(o,l,i)}#p(e,t,r){for(let n=0;n<t.length;++n)this.#_(e,t[n],r)}#_(e,t,r){ht(e,t.node,r),t.isVirtual&&this.#p(e,t.children,r),t.endNode&&ht(e,t.endNode,r)}#m(e,{index:t}){this.#d(e,t,1)}#d(e,t,r){let{children:n,parentNode:o}=e,i=n.splice(t,r);for(let l=0;l<i.length;++l){let c=i[l],{node:u,endNode:$,isVirtual:v,children:p}=c;_t(o,u),$&&_t(o,$),this.#x(c),v&&i.push(...p)}}#x(e){let{debouncers:t,children:r}=e;for(let{timeout:n}of t.values())n&&fe(n);t.clear(),g(r,n=>this.#x(n))}#g({node:e,handlers:t,throttles:r,debouncers:n},{added:o,removed:i}){g(i,({name:l})=>{t.delete(l)?(xt(e,l,pe),this.#$(r,l,0),this.#$(n,l,0)):(En(e,l),gt[l]?.removed?.(e,l))}),g(o,l=>this.#v(e,l))}#E({node:e},{content:t}){Sn(e,t??\"\")}#w({node:e},{inner_html:t}){Cn(e,t??\"\")}#b(e,t,r,n,o){g(o,i=>this.#h(e,t,r,n++,i))}#h(e,t,r,n,o){switch(o.kind){case J:{let i=this.#y(r,n,o);this.#b(i,null,i[m],0,o.children),k(e,i,t);break}case ue:{let i=this.#j(r,n,o);k(e,i,t);break}case W:{let i=\"lustre:fragment\",l=this.#k(i,r,n,o);k(e,l,t),this.#b(e,t,l[m],0,o.children),this.#r&&(l[m].endNode=dt(` /${i} `),k(e,l[m].endNode,t));break}case Ye:{let i=this.#y(r,n,o);this.#w({node:i},o),k(e,i,t);break}case I:{let i=this.#k(\"lustre:map\",r,n,o);k(e,i,t),this.#h(e,t,i[m],0,o.child);break}case Ze:{let i=this.#n?.get(o.view)??o.view();this.#h(e,t,r,n,i);break}}}#y(e,t,{kind:r,key:n,tag:o,namespace:i,attributes:l}){let c=yn(i||ae,o);return N(r,e,c,t,n),this.#r&&n&&mt(c,\"data-lustre-key\",n),g(l,u=>this.#v(c,u)),c}#j(e,t,{kind:r,key:n,content:o}){let i=pt(o??\"\");return N(r,e,i,t,n),i}#k(e,t,r,{kind:n,key:o}){let i=this.#r?dt(An(e,o)):pt(\"\");return N(n,t,i,r,o),i}#v(e,t){let{debouncers:r,handlers:n,throttles:o}=e[m],{kind:i,name:l,value:c,prevent_default:u,debounce:$,throttle:v}=t;switch(i){case Je:{let p=c??\"\";if(l===\"virtual:defaultValue\"){e.defaultValue=p;return}else if(l===\"virtual:defaultChecked\"){e.defaultChecked=!0;return}else if(l===\"virtual:defaultSelected\"){e.defaultSelected=!0;return}p!==vn(e,l)&&mt(e,l,p),gt[l]?.added?.(e,p);break}case Qe:e[l]=c;break;case Ke:{n.has(l)&&xt(e,l,pe);let p=u.kind===Xe;jn(e,l,pe,{passive:p}),this.#$(o,l,v),this.#$(r,l,$),n.set(l,E=>this.#C(t,E));break}}}#$(e,t,r){let n=e.get(t);if(r>0)n?n.delay=r:e.set(t,{delay:r});else if(n){let{timeout:o}=n;o&&fe(o),e.delete(t)}}#C(e,t){let{currentTarget:r,type:n}=t,{debouncers:o,throttles:i}=r[m],l=Mn(r),{prevent_default:c,stop_propagation:u,include:$}=e;c.kind===ce&&t.preventDefault(),u.kind===ce&&t.stopPropagation(),n===\"submit\"&&(t.detail??={},t.detail.formData=[...new FormData(t.target,t.submitter).entries()]);let v=this.#e(t,l,n,$),p=i.get(n);if(p){let $e=Date.now(),Nt=p.last||0;$e>Nt+p.delay&&(p.last=$e,p.lastEvent=t,this.#t(t,v))}let E=o.get(n);E&&(fe(E.timeout),E.timeout=wn(()=>{t!==i.get(n)?.lastEvent&&this.#t(t,v)},E.delay)),!p&&!E&&this.#t(t,v)}},An=(s,e)=>e?` ${s} key=\"${D(e)}\" `:` ${s} `,pe=s=>{let{currentTarget:e,type:t}=s;e[m].handlers.get(t)(s)},$t=s=>({added(e){e[s]=!0},removed(e){e[s]=!1}}),Bn=s=>({added(e,t){e[s]=t}}),gt={checked:$t(\"checked\"),selected:$t(\"selected\"),value:Bn(\"value\"),autofocus:{added(s){queueMicrotask(()=>{s.focus?.()})}},autoplay:{added(s){try{s.play?.()}catch(e){console.error(e)}}}};var Et=new WeakMap;async function jt(s){let e=[];for(let r of globalThis.document.querySelectorAll(\"link[rel=stylesheet], style\"))r.sheet||e.push(new Promise((n,o)=>{r.addEventListener(\"load\",n),r.addEventListener(\"error\",o)}));if(await Promise.allSettled(e),!s.host.isConnected)return[];s.adoptedStyleSheets=s.host.getRootNode().adoptedStyleSheets;let t=[];for(let r of globalThis.document.styleSheets)try{s.adoptedStyleSheets.push(r)}catch{try{let n=Et.get(r);if(!n){n=new CSSStyleSheet;for(let o of r.cssRules)n.insertRule(o.cssText,n.cssRules.length);Et.set(r,n)}s.adoptedStyleSheets.push(n)}catch{let n=r.ownerNode.cloneNode();s.prepend(n),t.push(n)}}return t}var K=class extends Event{constructor(e,t,r){super(\"context-request\",{bubbles:!0,composed:!0}),this.context=e,this.callback=t,this.subscribe=r}},X=class extends CustomEvent{isLustreEvent=!0;constructor(e,t){super(e,{detail:t,bubbles:!0,composed:!0})}};var Ct=0,St=1,Mt=2,At=3,Bt=4,Tt=5,Y=0,zt=1,Ot=2,Z=3,It=4;var he=class extends HTMLElement{static get observedAttributes(){return[\"route\",\"method\",\"csrf-token\"]}#i;#e=\"ws\";#t=null;#r=null;#n=null;#s=[];#l;#o=new Set;#u=new Set;#c=!1;#a=[];#f=new Map;#p=new Map;#_=new MutationObserver(e=>{let t=[];for(let r of e){if(r.type!==\"attributes\")continue;let n=r.attributeName;(!this.#c||this.#o.has(n))&&t.push([n,this.getAttribute(n)])}if(t.length===1){let[r,n]=t[0];this.#n?.send({kind:Y,name:r,value:n})}else t.length?this.#n?.send({kind:Z,messages:t.map(([r,n])=>({kind:Y,name:r,value:n}))}):this.#a.push(...t)});constructor(){super(),this.internals=this.attachInternals(),this.#_.observe(this,{attributes:!0})}connectedCallback(){for(let e of this.attributes)this.#a.push([e.name,e.value])}attributeChangedCallback(e,t,r){switch(e){case(t!==r&&\"route\"):{this.#t=new URL(r,location.href),this.#r=this.#m(),this.#t.searchParams.set(\"csrf-token\",this.#r),this.#d();return}case\"method\":{let n=r.toLowerCase();if(n==this.#e)return;[\"ws\",\"sse\",\"polling\"].includes(n)&&(this.#e=n,this.#e==\"ws\"&&(this.#t.protocol==\"https:\"&&(this.#t.protocol=\"wss:\"),this.#t.protocol==\"http:\"&&(this.#t.protocol=\"ws:\")),this.#d());return}case\"csrf-token\":t!==r&&this.#c&&this.#n?.close(),this.#r=this.#m(),this.#t&&this.#t.searchParams.set(\"csrf-token\",this.#r),this.#c&&this.#d()}}async messageReceivedCallback(e){switch(e.kind){case Ct:{for(this.#i??=this.attachShadow({mode:e.open_shadow_root?\"open\":\"closed\"});this.#i.firstChild;)this.#i.firstChild.remove();let t=(i,l,c,u)=>{let $=this.#g(i,u??[]);return{kind:zt,path:l,name:c,event:$}},r=(i,l)=>{this.#n?.send(l)};this.#l=new U(this.#i,t,r),this.#o=new Set(e.observed_attributes);let o=this.#a.filter(([i])=>this.#o.has(i)).map(([i,l])=>({kind:Y,name:i,value:l}));this.#a=[],this.#u=new Set(e.observed_properties);for(let i of this.#u)Object.defineProperty(this,i,{get(){return this[`_${i}`]},set(l){this[`_${i}`]=l,this.#n?.send({kind:Ot,name:i,value:l})}});for(let[i,l]of Object.entries(e.provided_contexts))this.provide(i,l);for(let i of[...new Set(e.requested_contexts)])this.subscribe(i);o.length&&this.#n.send({kind:Z,messages:o}),e.will_adopt_styles&&await this.#x(),this.#i.addEventListener(\"context-request\",i=>{if(!i.context||!i.callback||!this.#f.has(i.context))return;i.stopImmediatePropagation();let l=this.#f.get(i.context);if(i.subscribe){let c=()=>{l.subscribers=l.subscribers.filter(u=>u!==i.callback)};l.subscribers.push([i.callback,c]),i.callback(l.value,c)}else i.callback(l.value)}),this.#l.mount(e.vdom),this.dispatchEvent(new CustomEvent(\"lustre:mount\"));break}case St:{this.#l.push(e.patch);break}case Mt:{this.dispatchEvent(new X(e.name,e.data));break}case At:{this.provide(e.key,e.value);break}case Bt:{this.subscribe(e.key);break}case Tt:{this.unsubscribe(e.key);break}}}disconnectedCallback(){this.unsubscribeAll(),this.#n&&(this.#n.close(),this.#n=null)}provide(e,t){if(!this.#f.has(e))this.#f.set(e,{value:t,subscribers:[]});else{let r=this.#f.get(e);r.value=t;for(let n=r.subscribers.length-1;n>=0;n--){let[o,i]=r.subscribers[n];if(!o){r.subscribers.splice(n,1);continue}o(t,i)}}}subscribe(e){e&&(this.#p.get(e)?.(),this.dispatchEvent(new K(e,(t,r)=>{this.#n?.send({kind:It,key:e,value:t}),this.#p.get(e)?.(),this.#p.set(r)})))}unsubscribe(e){this.#p.get(e)?.(),this.#p.delete(e)}unsubscribeAll(){for(let[e,t]of this.#p)t?.();this.#p.clear()}#m(){return this.hasAttribute(\"csrf-token\")?this.getAttribute(\"csrf-token\")||null:document.querySelector('meta[name=\"csrf-token\"]')?.getAttribute(\"content\")||null}#d(){if(!this.#t||!this.#e)return;this.#n&&this.#n.close();let n={onConnect:()=>{this.#c=!0,this.dispatchEvent(new CustomEvent(\"lustre:connect\"),{detail:{route:this.#t,method:this.#e}})},onMessage:o=>{this.messageReceivedCallback(o)},onClose:()=>{this.#c=!1,this.dispatchEvent(new CustomEvent(\"lustre:close\",{detail:{route:this.#t,method:this.#e}}))},csrfToken:this.#r};switch(this.#e){case\"ws\":this.#n=new _e(this.#t,n);break;case\"sse\":this.#n=new me(this.#t,n);break;case\"polling\":this.#n=new xe(this.#t,n);break}}async#x(){for(;this.#s.length;)this.#s.pop().remove(),this.#i.firstChild.remove();this.#s=await jt(this.#i)}#g(e,t=[]){let r={};e.isLustreEvent&&t.push(\"detail\"),(e.type===\"input\"||e.type===\"change\")&&(e.target.type===\"checkbox\"?t.push(\"target.checked\"):t.push(\"target.value\")),(e.type===\"keydown\"||e.type===\"keyup\"||e.type===\"keypress\")&&t.push(\"key\"),e.type===\"submit\"&&t.push(\"detail.formData\");for(let n of t){let o=n.split(\".\");for(let i=0,l=e,c=r;i<o.length;i++){if(i===o.length-1){c[o[i]]=l[o[i]];break}c=c[o[i]]??={},l=l[o[i]]}}return r}},_e=class{#i;#e;#t=!1;#r=[];#n=!0;#s=500;#l=1e4;#o;#u;#c;constructor(e,{onConnect:t,onMessage:r,onClose:n}){this.#i=e,this.#o=t,this.#u=r,this.#c=n,this.#a()}#a(){this.#e=new WebSocket(this.#i),this.#n=!0,this.#r=[],this.#e.onopen=()=>{this.#s=500,this.#o()},this.#e.onmessage=({data:e})=>{try{this.#u(JSON.parse(e))}finally{this.#r.length?this.#e.send(JSON.stringify({kind:Z,messages:this.#r})):this.#t=!1,this.#r=[]}},this.#e.onclose=e=>{this.#c(),e.code!==1e3&&this.#n&&this.#f()}}#f(){let e=()=>{this.#n&&(this.#a(),this.#s=Math.min(this.#s*2,this.#l))};if(document.hidden){let t=()=>{!document.hidden&&this.#n&&(document.removeEventListener(\"visibilitychange\",t),e())};document.addEventListener(\"visibilitychange\",t)}else setTimeout(e,this.#s)}send(e){if(!(!this.#e||this.#e.readyState!==WebSocket.OPEN))if(this.#t){this.#r.push(e);return}else this.#e.send(JSON.stringify(e)),this.#t=!0}close(){this.#n=!1,this.#e.close(1e3),this.#e=null}},me=class{#i;#e;#t=!0;#r=500;#n=1e4;#s;#l;#o;constructor(e,{onConnect:t,onMessage:r,onClose:n}){this.#i=e,this.#s=t,this.#l=r,this.#o=n,this.#u()}#u(){this.#e=new EventSource(this.#i),this.#r=500,this.#t=!0,this.#e.onopen=()=>{this.#s()},this.#e.onmessage=({data:e})=>{try{this.#l(JSON.parse(e))}catch{}},this.#e.onerror=()=>{this.#e.close(),this.#o(),this.#t&&this.#c()}}#c(){let e=()=>{this.#t&&(this.#u(),this.#r=Math.min(this.#r*2,this.#n))};if(document.hidden){let t=()=>{!document.hidden&&this.#t&&(document.removeEventListener(\"visibilitychange\",t),e())};document.addEventListener(\"visibilitychange\",t)}else setTimeout(e,this.#r)}send(e){}close(){this.#t=!1,this.#e.close(),this.#o()}},xe=class{#i;#e;#t;#r;#n;#s;#l;constructor(e,{onConnect:t,onMessage:r,onClose:n,csrfToken:o,interval:i}){this.#i=e,this.#e=o,this.#t=i??5e3,this.#n=t,this.#s=r,this.#l=n,this.#o().finally(()=>{this.#n(),this.#r=setInterval(()=>this.#o(),this.#t)})}async send(e){}close(){clearInterval(this.#r),this.#l()}#o(){let e=Object.assign({},this.#e&&{\"x-csrf-token\":this.#e});return fetch(this.#i,{headers:e}).then(t=>t.json()).then(this.#s).catch(console.error)}};customElements.define(\"lustre-server-component\",he);export{he as ServerComponent};"/utf8>>
    ).

-file("src/lustre/server_component.gleam", 170).
?DOC(
    " The `route` attribute tells the client runtime what route it should use to\n"
    " set up the WebSocket connection to the server. Whenever this attribute is\n"
    " changed (by a clientside Lustre app, for example), the client runtime will\n"
    " destroy the current connection and set up a new one.\n"
).
-spec route(binary()) -> lustre@vdom@vattr:attribute(any()).
route(Path) ->
    lustre@attribute:attribute(<<"route"/utf8>>, Path).

-file("src/lustre/server_component.gleam", 176).
?DOC("\n").
-spec method(transport_method()) -> lustre@vdom@vattr:attribute(any()).
method(Value) ->
    lustre@attribute:attribute(<<"method"/utf8>>, case Value of
            web_socket ->
                <<"ws"/utf8>>;

            server_sent_events ->
                <<"sse"/utf8>>;

            polling ->
                <<"polling"/utf8>>
        end).

-file("src/lustre/server_component.gleam", 212).
?DOC(
    " Properties of a JavaScript event object are typically not serialisable. This\n"
    " means if we want to send them to the server Lustre first needs to make a copy\n"
    " of any fields we want to decode first.\n"
    "\n"
    " This attribute tells Lustre what properties to include from an event. Properties\n"
    " can come from nested fields by using dot notation. For example, you could include\n"
    " the `id` of the target `element` by passing `[\"target.id\"]`:\n"
    "\n"
    " ```gleam\n"
    " import gleam/dynamic/decode\n"
    " import lustre/element.{type Element}\n"
    " import lustre/element/html\n"
    " import lustre/event\n"
    " import lustre/server_component\n"
    "\n"
    " pub fn custom_button(on_click: fn(String) -> message) -> Element(message) {\n"
    "   let handler = fn(event) {\n"
    "     use id <- decode.at([\"target\", \"id\"], decode.string)\n"
    "     decode.success(on_click(id))\n"
    "   }\n"
    "\n"
    "   html.button(\n"
    "     [event.on(\"click\", handler) |> server_component.include([\"target.id\"])],\n"
    "     [html.text(\"Click me!\")],\n"
    "   )\n"
    " }\n"
    " ```\n"
).
-spec include(lustre@vdom@vattr:attribute(OYT), list(binary())) -> lustre@vdom@vattr:attribute(OYT).
include(Event, Properties) ->
    case Event of
        {event, _, _, _, _, _, _, _, _} ->
            {event,
                erlang:element(2, Event),
                erlang:element(3, Event),
                erlang:element(4, Event),
                Properties,
                erlang:element(6, Event),
                erlang:element(7, Event),
                erlang:element(8, Event),
                erlang:element(9, Event)};

        _ ->
            Event
    end.

-file("src/lustre/server_component.gleam", 232).
?DOC(
    " If this attribute is present, the client runtime will include the CSRF token\n"
    " in the query parameters when connecting to the server. This can be used to\n"
    " mitigate cross-site request forgery attacks, by ensuring that only clients\n"
    " that have access to the token can connect to the server component runtime.\n"
    " \n"
    " *Note**: When this attribute is not provided, the client runtime will look for\n"
    " a `<meta name=\"csrf-token\" content=\"...\">` tag in the page and use the content\n"
    " of that tag as the CSRF token. We recommend using this approach over the\n"
    " `csrf_token` attribute where possible.\n"
).
-spec csrf_token(binary()) -> lustre@vdom@vattr:attribute(any()).
csrf_token(Token) ->
    lustre@attribute:attribute(<<"csrf-token"/utf8>>, Token).

-file("src/lustre/server_component.gleam", 246).
?DOC(
    " Recover the `Subject` of the server component runtime so that it can be used\n"
    " in supervision trees or passed to other processes. If you want to hand out\n"
    " different `Subject`s to send messages to your application, take a look at the\n"
    " [`select`](#select) effect.\n"
    "\n"
    " > **Note**: this function is not available on the JavaScript target.\n"
).
-spec subject(lustre:runtime(OYZ)) -> gleam@erlang@process:subject(lustre@runtime@server@runtime:message(OYZ)).
subject(Runtime) ->
    gleam@function:identity(Runtime).

-file("src/lustre/server_component.gleam", 258).
?DOC(
    " Recover the `Pid` of the server component runtime so that it can be used in\n"
    " supervision trees or passed to other processes. If you want to hand out\n"
    " different `Subject`s to send messages to your application, take a look at the\n"
    " [`select`](#select) effect.\n"
    "\n"
    " > **Note**: this function is not available on the JavaScript target.\n"
).
-spec pid(lustre:runtime(any())) -> gleam@erlang@process:pid_().
pid(Runtime) ->
    Pid@1 = case gleam@erlang@process:subject_owner(subject(Runtime)) of
        {ok, Pid} -> Pid;
        _assert_fail ->
            erlang:error(#{gleam_error => let_assert,
                        message => <<"Pattern match failed, no pattern matched the value."/utf8>>,
                        file => <<?FILEPATH/utf8>>,
                        module => <<"lustre/server_component"/utf8>>,
                        function => <<"pid"/utf8>>,
                        line => 259,
                        value => _assert_fail,
                        start => 25326,
                        'end' => 25386,
                        pattern_start => 25337,
                        pattern_end => 25344})
    end,
    Pid@1.

-file("src/lustre/server_component.gleam", 275).
?DOC(
    " Register a `Subject` to receive messages and updates from Lustre's server\n"
    " component runtime. The process that owns this will be monitored and the\n"
    " subject will be gracefully removed if the process dies.\n"
    "\n"
    " > **Note**: if you are developing a server component for the JavaScript runtime,\n"
    " > you should use [`register_callback`](#register_callback) instead.\n"
).
-spec register_subject(
    gleam@erlang@process:subject(lustre@runtime@transport:client_message(OZH))
) -> lustre@runtime@server@runtime:message(OZH).
register_subject(Client) ->
    {client_registered_subject, Client}.

-file("src/lustre/server_component.gleam", 285).
?DOC(
    " Deregister a `Subject` to stop receiving messages and updates from Lustre's\n"
    " server component runtime. The subject should first have been registered with\n"
    " [`register_subject`](#register_subject) otherwise this will do nothing.\n"
).
-spec deregister_subject(
    gleam@erlang@process:subject(lustre@runtime@transport:client_message(OZL))
) -> lustre@runtime@server@runtime:message(OZL).
deregister_subject(Client) ->
    {client_deregistered_subject, Client}.

-file("src/lustre/server_component.gleam", 299).
?DOC(
    " Register a callback to be called whenever the server component runtime\n"
    " produces a message. Avoid using anonymous functions with this function, as\n"
    " they cannot later be removed using [`deregister_callback`](#deregister_callback).\n"
    "\n"
    " > **Note**: server components running on the Erlang target are **strongly**\n"
    " > encouraged to use [`register_subject`](#register_subject) instead of this\n"
    " > function.\n"
).
-spec register_callback(
    fun((lustre@runtime@transport:client_message(OZP)) -> nil)
) -> lustre@runtime@server@runtime:message(OZP).
register_callback(Callback) ->
    {client_registered_callback, Callback}.

-file("src/lustre/server_component.gleam", 313).
?DOC(
    " Deregister a callback to be called whenever the server component runtime\n"
    " produces a message. The callback to remove is determined by function equality\n"
    " and must be the same function that was passed to [`register_callback`](#register_callback).\n"
    "\n"
    " > **Note**: server components running on the Erlang target are **strongly**\n"
    " > encouraged to use [`register_subject`](#register_subject) instead of this\n"
    " > function.\n"
).
-spec deregister_callback(
    fun((lustre@runtime@transport:client_message(OZS)) -> nil)
) -> lustre@runtime@server@runtime:message(OZS).
deregister_callback(Callback) ->
    {client_deregistered_callback, Callback}.

-file("src/lustre/server_component.gleam", 329).
?DOC(
    " Instruct any connected clients to emit a DOM event with the given name and\n"
    " data. This lets your server component communicate to the frontend the same way\n"
    " any other HTML elements do: you might emit a `\"change\"` event when some part\n"
    " of the server component's state changes, for example.\n"
    "\n"
    " This is a real DOM event and any JavaScript on the page can attach an event\n"
    " listener to the server component element and listen for these events.\n"
).
-spec emit(binary(), gleam@json:json()) -> lustre@effect:effect(any()).
emit(Event, Data) ->
    lustre@effect:event(Event, Data).

-file("src/lustre/server_component.gleam", 352).
?DOC(
    " On the Erlang target, Lustre's server component runtime is an OTP\n"
    " [actor](https://hexdocs.pm/gleam_otp/gleam/otp/actor.html) that can be\n"
    " communicated with using the standard process API and the `Subject` returned\n"
    " when starting the server component.\n"
    "\n"
    " Sometimes, you might want to hand a different `Subject` to a process to restrict\n"
    " the type of messages it can send or to distinguish messages from different\n"
    " sources from one another. The `select` effect creates a fresh `Subject` each\n"
    " time it is run. By returning a `Selector` you can teach the Lustre server\n"
    " component runtime how to listen to messages from this `Subject`.\n"
    "\n"
    " The `select` effect also gives you the dispatch function passed to `effect.from`.\n"
    " This is useful in case you want to store the provided `Subject` in your model\n"
    " for later use. For example you may subscribe to a pubsub service and later use\n"
    " that same `Subject` to unsubscribe.\n"
    "\n"
    " > **Note**: This effect does nothing on the JavaScript runtime, where `Subject`s\n"
    " > and `Selector`s don't exist, and is the equivalent of returning `effect.none()`.\n"
).
-spec select(
    fun((fun((OZX) -> nil), gleam@erlang@process:subject(any())) -> gleam@erlang@process:selector(OZX))
) -> lustre@effect:effect(OZX).
select(Sel) ->
    lustre@effect:select(Sel).

-file("src/lustre/server_component.gleam", 365).
?DOC(
    " The server component client runtime sends JSON-encoded messages for the server\n"
    " runtime to execute. Because your own WebSocket server sits between the two\n"
    " parts of the runtime, you need to decode these actions and pass them to the\n"
    " server runtime yourself.\n"
).
-spec runtime_message_decoder() -> gleam@dynamic@decode:decoder(lustre@runtime@server@runtime:message(any())).
runtime_message_decoder() ->
    gleam@dynamic@decode:map(
        lustre@runtime@transport:server_message_decoder(),
        fun(Field@0) -> {client_dispatched_message, Field@0} end
    ).

-file("src/lustre/server_component.gleam", 381).
?DOC(
    " Encode a message you can send to the client runtime to respond to. The server\n"
    " component runtime will send messages to any registered clients to instruct\n"
    " them to update their DOM or emit events, for example.\n"
    "\n"
    " Because your WebSocket server sits between the two parts of the runtime, you\n"
    " need to encode these actions and send them to the client runtime yourself.\n"
).
-spec client_message_to_json(lustre@runtime@transport:client_message(any())) -> gleam@json:json().
client_message_to_json(Message) ->
    lustre@runtime@transport:client_message_to_json(Message).
