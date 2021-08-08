'use strict';

var compression = require('compression');
var fs = require('fs');
var path = require('path');
var feathers = require('@feathersjs/client');
var io = require('socket.io-client');
var http = require('http');
var https = require('https');
var Url = require('url');
var Stream = require('stream');
var assert = require('assert');
var tty = require('tty');
var util$1 = require('util');
var os = require('os');
var zlib = require('zlib');
var fileUpload = require('express-fileupload');
var serveFavicon = require('serve-favicon');
var helmet = require('helmet');
var cors = require('cors');
var feathers$1 = require('@feathersjs/feathers');
var configuration = require('@feathersjs/configuration');
var express = require('@feathersjs/express');
var socketio = require('@feathersjs/socketio');
var feathersMongodb = require('feathers-mongodb');
var authentication$1 = require('@feathersjs/authentication');
var authenticationLocal = require('@feathersjs/authentication-local');
var feathersMongoose = require('feathers-mongoose');
var authenticationOauth = require('@feathersjs/authentication-oauth');
var mongodb$1 = require('mongodb');
var mongoose = require('mongoose');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var compression__default = /*#__PURE__*/_interopDefaultLegacy(compression);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var feathers__default = /*#__PURE__*/_interopDefaultLegacy(feathers);
var io__default = /*#__PURE__*/_interopDefaultLegacy(io);
var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
var https__default = /*#__PURE__*/_interopDefaultLegacy(https);
var Url__default = /*#__PURE__*/_interopDefaultLegacy(Url);
var Stream__default = /*#__PURE__*/_interopDefaultLegacy(Stream);
var assert__default = /*#__PURE__*/_interopDefaultLegacy(assert);
var tty__default = /*#__PURE__*/_interopDefaultLegacy(tty);
var util__default = /*#__PURE__*/_interopDefaultLegacy(util$1);
var os__default = /*#__PURE__*/_interopDefaultLegacy(os);
var zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);
var fileUpload__default = /*#__PURE__*/_interopDefaultLegacy(fileUpload);
var serveFavicon__default = /*#__PURE__*/_interopDefaultLegacy(serveFavicon);
var helmet__default = /*#__PURE__*/_interopDefaultLegacy(helmet);
var cors__default = /*#__PURE__*/_interopDefaultLegacy(cors);
var feathers__default$1 = /*#__PURE__*/_interopDefaultLegacy(feathers$1);
var configuration__default = /*#__PURE__*/_interopDefaultLegacy(configuration);
var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var socketio__default = /*#__PURE__*/_interopDefaultLegacy(socketio);
var feathersMongodb__default = /*#__PURE__*/_interopDefaultLegacy(feathersMongodb);
var authentication__default = /*#__PURE__*/_interopDefaultLegacy(authentication$1);
var authenticationLocal__default = /*#__PURE__*/_interopDefaultLegacy(authenticationLocal);
var feathersMongoose__default = /*#__PURE__*/_interopDefaultLegacy(feathersMongoose);
var authenticationOauth__default = /*#__PURE__*/_interopDefaultLegacy(authenticationOauth);
var mongodb__default = /*#__PURE__*/_interopDefaultLegacy(mongodb$1);
var mongoose__default = /*#__PURE__*/_interopDefaultLegacy(mongoose);

function noop$2() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop$2;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function set_store_value(store, ret, value) {
    store.set(value);
    return ret;
}
function custom_event(type, detail, bubbles = false) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, false, detail);
    return e;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
Promise.resolve();
const escaped$1 = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped$1[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
const missing_component = {
    $$render: () => ''
};
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots, context) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : context || []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, $$slots, context);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop$2) {
    let stop;
    const subscribers = new Set();
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (const subscriber of subscribers) {
                    subscriber[1]();
                    subscriber_queue.push(subscriber, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop$2) {
        const subscriber = [run, invalidate];
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
            stop = start(set) || noop$2;
        }
        run(value);
        return () => {
            subscribers.delete(subscriber);
            if (subscribers.size === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const featherClient = () => {
    const socket = io__default['default']();

    const app = feathers__default['default']();

    app.configure(feathers__default['default'].socketio(socket));
    
    return app
};   


const feather = readable(featherClient());

/* src/lib/components/modal.svelte generated by Svelte v3.42.1 */

const css$e = {
	code: ".bg-dark-500.svelte-bi8fhl{--tw-bg-opacity:1;background-color:rgba(31, 31, 31, var(--tw-bg-opacity))}.bg-opacity-70.svelte-bi8fhl{--tw-bg-opacity:0.7}.flex.svelte-bi8fhl{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.items-center.svelte-bi8fhl{-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center}.justify-center.svelte-bi8fhl{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center}.h-full.svelte-bi8fhl{height:100%}.fixed.svelte-bi8fhl{position:fixed}.top-0.svelte-bi8fhl{top:0px}.left-0.svelte-bi8fhl{left:0px}.w-full.svelte-bi8fhl{width:100%}",
	map: "{\"version\":3,\"file\":\"modal.svelte\",\"sources\":[\"modal.svelte\"],\"sourcesContent\":[\"<script>\\nexport let show = true,\\n  component,\\n  data;\\n</script>\\n\\n{#if show}\\n  <div id=\\\"modal\\\" class=\\\" fixed w-full h-full top-0 left-0 bg-opacity-70 bg-dark-500 flex items-center justify-center\\\">\\n    <svelte:component this=\\\"{component}\\\" bind:data bind:show />\\n  </div>\\n{/if}\\n\\n<style windi:inject>\\n.bg-dark-500 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(31, 31, 31, var(--tw-bg-opacity));\\n}\\n.bg-opacity-70 {\\n  --tw-bg-opacity: 0.7;\\n}\\n.flex {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: -webkit-flex;\\n  display: flex;\\n}\\n.items-center {\\n  -webkit-box-align: center;\\n  -ms-flex-align: center;\\n  -webkit-align-items: center;\\n  align-items: center;\\n}\\n.justify-center {\\n  -webkit-box-pack: center;\\n  -ms-flex-pack: center;\\n  -webkit-justify-content: center;\\n  justify-content: center;\\n}\\n.h-full {\\n  height: 100%;\\n}\\n.fixed {\\n  position: fixed;\\n}\\n.top-0 {\\n  top: 0px;\\n}\\n.left-0 {\\n  left: 0px;\\n}\\n.w-full {\\n  width: 100%;\\n}\\n</style>\"],\"names\":[],\"mappings\":\"AAaA,YAAY,cAAC,CAAC,AACZ,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,AAC1D,CAAC,AACD,cAAc,cAAC,CAAC,AACd,eAAe,CAAE,GAAG,AACtB,CAAC,AACD,KAAK,cAAC,CAAC,AACL,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,YAAY,CACrB,OAAO,CAAE,IAAI,AACf,CAAC,AACD,aAAa,cAAC,CAAC,AACb,iBAAiB,CAAE,MAAM,CACzB,cAAc,CAAE,MAAM,CACtB,mBAAmB,CAAE,MAAM,CAC3B,WAAW,CAAE,MAAM,AACrB,CAAC,AACD,eAAe,cAAC,CAAC,AACf,gBAAgB,CAAE,MAAM,CACxB,aAAa,CAAE,MAAM,CACrB,uBAAuB,CAAE,MAAM,CAC/B,eAAe,CAAE,MAAM,AACzB,CAAC,AACD,OAAO,cAAC,CAAC,AACP,MAAM,CAAE,IAAI,AACd,CAAC,AACD,MAAM,cAAC,CAAC,AACN,QAAQ,CAAE,KAAK,AACjB,CAAC,AACD,MAAM,cAAC,CAAC,AACN,GAAG,CAAE,GAAG,AACV,CAAC,AACD,OAAO,cAAC,CAAC,AACP,IAAI,CAAE,GAAG,AACX,CAAC,AACD,OAAO,cAAC,CAAC,AACP,KAAK,CAAE,IAAI,AACb,CAAC\"}"
};

const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { show = true, component, data } = $$props;
	if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
	if ($$props.component === void 0 && $$bindings.component && component !== void 0) $$bindings.component(component);
	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	$$result.css.add(css$e);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		$$rendered = `${show
		? `<div id="${"modal"}" class="${" fixed w-full h-full top-0 left-0 bg-opacity-70 bg-dark-500 flex items-center justify-center svelte-bi8fhl"}">${validate_component(component || missing_component, "svelte:component").$$render(
				$$result,
				{ data, show },
				{
					data: $$value => {
						data = $$value;
						$$settled = false;
					},
					show: $$value => {
						show = $$value;
						$$settled = false;
					}
				},
				{}
			)}</div>`
		: ``}`;
	} while (!$$settled);

	return $$rendered;
});

const CONTEXT_KEY = {};

/* src/lib/components/Nav.svelte generated by Svelte v3.42.1 */

const css$d = {
	code: "nav.svelte-1ehpunc{border-bottom:1px solid rgba(255, 62, 0, 0.1);font-weight:300;padding:0 1em}ul.svelte-1ehpunc{margin:0;padding:0}ul.svelte-1ehpunc::after{content:\"\";display:block;clear:both}li.svelte-1ehpunc{display:block;float:left}[aria-current].svelte-1ehpunc{position:relative;display:inline-block}[aria-current].svelte-1ehpunc::after{position:absolute;content:\"\";width:calc(100% - 1em);height:2px;background-color:rgb(255, 62, 0);display:block;bottom:-1px}a.svelte-1ehpunc,span.svelte-1ehpunc{text-decoration:none;padding:1em 0.5em;display:block}",
	map: "{\"version\":3,\"file\":\"Nav.svelte\",\"sources\":[\"Nav.svelte\"],\"sourcesContent\":[\"<script>\\nimport { stores, goto } from \\\"@sapper/app\\\";\\nexport let segment;\\nimport { feather } from \\\"../stores/feather\\\";\\nconst { session } = stores();\\n\\nasync function handleLogout() {\\n  await $feather.logout();\\n\\n  $session = undefined;\\n\\n  goto(\\\"/\\\");\\n}\\n</script>\\n\\n<nav>\\n  <ul>\\n    <li><a aria-current=\\\"{segment === undefined ? 'page' : undefined}\\\" href=\\\".\\\">home</a></li>\\n    {#if $session?.user != undefined}\\n      <li><a aria-current=\\\"{segment === 'upload' ? 'page' : undefined}\\\" href=\\\"/upload\\\">upload</a></li>\\n    {/if}\\n\\n    {#if $session?.user?.role == \\\"admin\\\"}\\n      <li><a aria-current=\\\"{segment === 'signin' ? 'page' : undefined}\\\" href=\\\"/panel\\\"> panel </a></li>\\n    {:else if $session?.user == undefined}\\n      <li><a aria-current=\\\"{segment === 'signin' ? 'page' : undefined}\\\" href=\\\"/signin\\\"> giriş / kayıt</a></li>\\n    {/if}\\n\\n    {#if $session?.user}\\n      <li><span on:click=\\\"{handleLogout}\\\">Çıkış</span></li>\\n    {/if}\\n  </ul>\\n</nav>\\n\\n<style windi:inject>\\nnav {\\n  border-bottom: 1px solid rgba(255, 62, 0, 0.1);\\n  font-weight: 300;\\n  padding: 0 1em;\\n}\\nul {\\n  margin: 0;\\n  padding: 0;\\n}\\nul::after {\\n  content: \\\"\\\";\\n  display: block;\\n  clear: both;\\n}\\nli {\\n  display: block;\\n  float: left;\\n}\\n[aria-current] {\\n  position: relative;\\n  display: inline-block;\\n}\\n[aria-current]::after {\\n  position: absolute;\\n  content: \\\"\\\";\\n  width: calc(100% - 1em);\\n  height: 2px;\\n  background-color: rgb(255, 62, 0);\\n  display: block;\\n  bottom: -1px;\\n}\\na, span {\\n  text-decoration: none;\\n  padding: 1em 0.5em;\\n  display: block;\\n}\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAmCA,GAAG,eAAC,CAAC,AACH,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC9C,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,CAAC,CAAC,GAAG,AAChB,CAAC,AACD,EAAE,eAAC,CAAC,AACF,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACZ,CAAC,AACD,iBAAE,OAAO,AAAC,CAAC,AACT,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,AACb,CAAC,AACD,EAAE,eAAC,CAAC,AACF,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,AACb,CAAC,AACD,CAAC,YAAY,CAAC,eAAC,CAAC,AACd,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,YAAY,AACvB,CAAC,AACD,CAAC,YAAY,gBAAC,OAAO,AAAC,CAAC,AACrB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,GAAG,CAAC,CACvB,MAAM,CAAE,GAAG,CACX,gBAAgB,CAAE,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CACjC,OAAO,CAAE,KAAK,CACd,MAAM,CAAE,IAAI,AACd,CAAC,AACD,gBAAC,CAAE,IAAI,eAAC,CAAC,AACP,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,GAAG,CAAC,KAAK,CAClB,OAAO,CAAE,KAAK,AAChB,CAAC\"}"
};

const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $session, $$unsubscribe_session;
	let $$unsubscribe_feather;
	validate_store(feather, 'feather');
	$$unsubscribe_feather = subscribe(feather, value => value);
	let { segment } = $$props;
	const { session } = stores$1();
	validate_store(session, 'session');
	$$unsubscribe_session = subscribe(session, value => $session = value);

	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	$$result.css.add(css$d);
	$$unsubscribe_session();
	$$unsubscribe_feather();

	return `<nav class="${"svelte-1ehpunc"}"><ul class="${"svelte-1ehpunc"}"><li class="${"svelte-1ehpunc"}"><a${add_attribute("aria-current", segment === undefined ? 'page' : undefined, 0)} href="${"."}" class="${"svelte-1ehpunc"}">home</a></li>
    ${$session?.user != undefined
	? `<li class="${"svelte-1ehpunc"}"><a${add_attribute("aria-current", segment === 'upload' ? 'page' : undefined, 0)} href="${"/upload"}" class="${"svelte-1ehpunc"}">upload</a></li>`
	: ``}

    ${$session?.user?.role == "admin"
	? `<li class="${"svelte-1ehpunc"}"><a${add_attribute("aria-current", segment === 'signin' ? 'page' : undefined, 0)} href="${"/panel"}" class="${"svelte-1ehpunc"}">panel </a></li>`
	: `${$session?.user == undefined
		? `<li class="${"svelte-1ehpunc"}"><a${add_attribute("aria-current", segment === 'signin' ? 'page' : undefined, 0)} href="${"/signin"}" class="${"svelte-1ehpunc"}">giriş / kayıt</a></li>`
		: ``}`}

    ${($session?.user)
	? `<li class="${"svelte-1ehpunc"}"><span class="${"svelte-1ehpunc"}">Çıkış</span></li>`
	: ``}</ul>
</nav>`;
});

/* src/routes/_layout.svelte generated by Svelte v3.42.1 */

const css$c = {
	code: "*,::before,::after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}*{--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59, 130, 246, 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}:-moz-focusring{outline:1px dotted ButtonText}:-moz-ui-invalid{box-shadow:none}::moz-focus-inner{border-style:none;padding:0}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[type='search']{-webkit-appearance:textfield;outline-offset:-2px}abbr[title]{-webkit-text-decoration:underline dotted;text-decoration:underline dotted}body{margin:0;font-family:inherit;line-height:inherit}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,\"Noto Sans\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\";line-height:1.5}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0;padding:0;line-height:inherit;color:inherit}button,select{text-transform:none}button,[type='button'],[type='reset'],[type='submit']{-webkit-appearance:button}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}button{background-color:transparent;background-image:none}button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}button,[role=\"button\"]{cursor:pointer}code,kbd,samp,pre{font-size:1em}fieldset{margin:0;padding:0}hr{height:0;color:inherit;border-top-width:1px}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}img{border-style:solid}input::placeholder{opacity:1;color:#9ca3af}input::webkit-input-placeholder{opacity:1;color:#9ca3af}input::-moz-placeholder{opacity:1;color:#9ca3af}input:-ms-input-placeholder{opacity:1;color:#9ca3af}input::-ms-input-placeholder{opacity:1;color:#9ca3af}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}legend{padding:0}ol,ul{list-style:none;margin:0;padding:0}progress{vertical-align:baseline}pre,code,kbd,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}summary{display:list-item}table{text-indent:0;border-color:inherit;border-collapse:collapse}textarea{resize:vertical}textarea::placeholder{opacity:1;color:#9ca3af}textarea::webkit-input-placeholder{opacity:1;color:#9ca3af}textarea::-moz-placeholder{opacity:1;color:#9ca3af}textarea:-ms-input-placeholder{opacity:1;color:#9ca3af}textarea::-ms-input-placeholder{opacity:1;color:#9ca3af}.bg-dark-700.svelte-xwytqq{--tw-bg-opacity:1;background-color:rgba(27, 27, 27, var(--tw-bg-opacity))}.flex.svelte-xwytqq{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.flex-col.svelte-xwytqq{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column}.flex-1.svelte-xwytqq{-webkit-box-flex:1;-ms-flex:1 1 0%;-webkit-flex:1 1 0%;flex:1 1 0%}.h-screen.svelte-xwytqq{height:100vh}.text-white.svelte-xwytqq{--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity))}.w-screen.svelte-xwytqq{width:100vw}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\nimport { get } from \\\"svelte/store\\\";\\nimport { feather } from \\\"../lib/stores/feather\\\";\\n\\nimport feathers from \\\"@feathersjs/client\\\";\\nexport async function preload() {\\n  if (false) {\\n    const client = get(feather);\\n    client.configure(\\n      feathers.authentication({\\n        storage: window.localStorage,\\n      })\\n    );\\n\\n    const user = await client.reAuthenticate().catch(() => false);\\n    return { user: user?.user };\\n  }\\n}\\n</script>\\n\\n<script>\\nimport { stores } from \\\"@sapper/app\\\";\\nimport { onMount } from \\\"svelte\\\";\\n\\nimport Nav from \\\"../lib/components/Nav.svelte\\\";\\n\\nexport let segment, user;\\n\\nconst { session } = stores();\\n\\n$session = {\\n  user,\\n};\\n\\nonMount(async () => {\\n  //console.log(await $feather.service('users').create({email : \\\"deneme@deneme\\\", password: \\\"1234\\\"}))\\n});\\n</script>\\n\\n<div class=\\\"w-screen h-screen flex flex-col bg-dark-700 text-white\\\">\\n  <Nav segment=\\\"{segment}\\\" />\\n\\n  <main class=\\\"flex-1\\\">\\n    <slot />\\n  </main>\\n</div>\\n\\n<style windi:inject windi:preflights:global windi:safelist:global>\\n:global(*), :global(::before), :global(::after) {\\n  -webkit-box-sizing: border-box;\\n  box-sizing: border-box;\\n  border-width: 0;\\n  border-style: solid;\\n  border-color: #e5e7eb;\\n}\\n:global(*) {\\n  --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);\\n  --tw-ring-offset-width: 0px;\\n  --tw-ring-offset-color: #fff;\\n  --tw-ring-color: rgba(59, 130, 246, 0.5);\\n  --tw-ring-offset-shadow: 0 0 #0000;\\n  --tw-ring-shadow: 0 0 #0000;\\n  --tw-shadow: 0 0 #0000;\\n}\\n:global(:root) {\\n  -moz-tab-size: 4;\\n  -o-tab-size: 4;\\n  tab-size: 4;\\n}\\n:global(:-moz-focusring) {\\n  outline: 1px dotted ButtonText;\\n}\\n:global(:-moz-ui-invalid) {\\n  box-shadow: none;\\n}\\n:global(::moz-focus-inner) {\\n  border-style: none;\\n  padding: 0;\\n}\\n:global(::-webkit-inner-spin-button), :global(::-webkit-outer-spin-button) {\\n  height: auto;\\n}\\n:global(::-webkit-search-decoration) {\\n  -webkit-appearance: none;\\n}\\n:global(::-webkit-file-upload-button) {\\n  -webkit-appearance: button;\\n  font: inherit;\\n}\\n:global([type='search']) {\\n  -webkit-appearance: textfield;\\n  outline-offset: -2px;\\n}\\n:global(abbr[title]) {\\n  -webkit-text-decoration: underline dotted;\\n  text-decoration: underline dotted;\\n}\\n:global(body) {\\n  margin: 0;\\n  font-family: inherit;\\n  line-height: inherit;\\n}\\n:global(html) {\\n  -webkit-text-size-adjust: 100%;\\n  font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\\\"Segoe UI\\\",Roboto,\\\"Helvetica Neue\\\",Arial,\\\"Noto Sans\\\",sans-serif,\\\"Apple Color Emoji\\\",\\\"Segoe UI Emoji\\\",\\\"Segoe UI Symbol\\\",\\\"Noto Color Emoji\\\";\\n  line-height: 1.5;\\n}\\n:global(a) {\\n  color: inherit;\\n  text-decoration: inherit;\\n}\\n:global(b), :global(strong) {\\n  font-weight: bolder;\\n}\\n:global(button), :global(input), :global(optgroup), :global(select), :global(textarea) {\\n  font-family: inherit;\\n  font-size: 100%;\\n  line-height: 1.15;\\n  margin: 0;\\n  padding: 0;\\n  line-height: inherit;\\n  color: inherit;\\n}\\n:global(button), :global(select) {\\n  text-transform: none;\\n}\\n:global(button), :global([type='button']), :global([type='reset']), :global([type='submit']) {\\n  -webkit-appearance: button;\\n}\\n:global(blockquote), :global(dl), :global(dd), :global(h1), :global(h2), :global(h3), :global(h4), :global(h5), :global(h6), :global(hr), :global(figure), :global(p), :global(pre) {\\n  margin: 0;\\n}\\n:global(button) {\\n  background-color: transparent;\\n  background-image: none;\\n}\\n:global(button:focus) {\\n  outline: 1px dotted;\\n  outline: 5px auto -webkit-focus-ring-color;\\n}\\n:global(button), :global([role=\\\"button\\\"]) {\\n  cursor: pointer;\\n}\\n:global(code), :global(kbd), :global(samp), :global(pre) {\\n  font-size: 1em;\\n}\\n:global(fieldset) {\\n  margin: 0;\\n  padding: 0;\\n}\\n:global(hr) {\\n  height: 0;\\n  color: inherit;\\n  border-top-width: 1px;\\n}\\n:global(h1), :global(h2), :global(h3), :global(h4), :global(h5), :global(h6) {\\n  font-size: inherit;\\n  font-weight: inherit;\\n}\\n:global(img) {\\n  border-style: solid;\\n}\\n:global(input::placeholder) {\\n  opacity: 1;\\n  color: #9ca3af;\\n}\\n:global(input::webkit-input-placeholder) {\\n  opacity: 1;\\n  color: #9ca3af;\\n}\\n:global(input::-moz-placeholder) {\\n  opacity: 1;\\n  color: #9ca3af;\\n}\\n:global(input:-ms-input-placeholder) {\\n  opacity: 1;\\n  color: #9ca3af;\\n}\\n:global(input::-ms-input-placeholder) {\\n  opacity: 1;\\n  color: #9ca3af;\\n}\\n:global(img), :global(svg), :global(video), :global(canvas), :global(audio), :global(iframe), :global(embed), :global(object) {\\n  display: block;\\n  vertical-align: middle;\\n}\\n:global(img), :global(video) {\\n  max-width: 100%;\\n  height: auto;\\n}\\n:global(legend) {\\n  padding: 0;\\n}\\n:global(ol), :global(ul) {\\n  list-style: none;\\n  margin: 0;\\n  padding: 0;\\n}\\n:global(progress) {\\n  vertical-align: baseline;\\n}\\n:global(pre), :global(code), :global(kbd), :global(samp) {\\n  font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\\\"Liberation Mono\\\",\\\"Courier New\\\",monospace;\\n}\\n:global(small) {\\n  font-size: 80%;\\n}\\n:global(sub), :global(sup) {\\n  font-size: 75%;\\n  line-height: 0;\\n  position: relative;\\n  vertical-align: baseline;\\n}\\n:global(sub) {\\n  bottom: -0.25em;\\n}\\n:global(sup) {\\n  top: -0.5em;\\n}\\n:global(summary) {\\n  display: list-item;\\n}\\n:global(table) {\\n  text-indent: 0;\\n  border-color: inherit;\\n  border-collapse: collapse;\\n}\\n:global(textarea) {\\n  resize: vertical;\\n}\\n:global(textarea::placeholder) {\\n  opacity: 1;\\n  color: #9ca3af;\\n}\\n:global(textarea::webkit-input-placeholder) {\\n  opacity: 1;\\n  color: #9ca3af;\\n}\\n:global(textarea::-moz-placeholder) {\\n  opacity: 1;\\n  color: #9ca3af;\\n}\\n:global(textarea:-ms-input-placeholder) {\\n  opacity: 1;\\n  color: #9ca3af;\\n}\\n:global(textarea::-ms-input-placeholder) {\\n  opacity: 1;\\n  color: #9ca3af;\\n}\\n.bg-dark-700 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(27, 27, 27, var(--tw-bg-opacity));\\n}\\n.flex {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: -webkit-flex;\\n  display: flex;\\n}\\n.flex-col {\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n  -ms-flex-direction: column;\\n  -webkit-flex-direction: column;\\n  flex-direction: column;\\n}\\n.flex-1 {\\n  -webkit-box-flex: 1;\\n  -ms-flex: 1 1 0%;\\n  -webkit-flex: 1 1 0%;\\n  flex: 1 1 0%;\\n}\\n.h-screen {\\n  height: 100vh;\\n}\\n.text-white {\\n  --tw-text-opacity: 1;\\n  color: rgba(255, 255, 255, var(--tw-text-opacity));\\n}\\n.w-screen {\\n  width: 100vw;\\n}\\n</style>\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

async function preload$7() {
}

const Layout$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $session, $$unsubscribe_session;
	let { segment, user } = $$props;
	const { session } = stores$1();
	validate_store(session, 'session');
	$$unsubscribe_session = subscribe(session, value => $session = value);
	set_store_value(session, $session = { user }, $session);

	onMount(async () => {
		
	}); //console.log(await $feather.service('users').create({email : "deneme@deneme", password: "1234"}))

	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	if ($$props.user === void 0 && $$bindings.user && user !== void 0) $$bindings.user(user);
	$$result.css.add(css$c);
	$$unsubscribe_session();

	return `<div class="${"w-screen h-screen flex flex-col bg-dark-700 text-white svelte-xwytqq"}">${validate_component(Nav, "Nav").$$render($$result, { segment }, {}, {})}

  <main class="${"flex-1 svelte-xwytqq"}">${slots.default ? slots.default({}) : ``}</main>
</div>`;
});

var root_comp = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Layout$1,
    preload: preload$7
});

/* src/routes/_error.svelte generated by Svelte v3.42.1 */

const css$b = {
	code: "h1.svelte-vuz8ld,p.svelte-vuz8ld{margin:0 auto}h1.svelte-vuz8ld{font-size:2.8em;font-weight:700;margin:0 0 0.5em 0}p.svelte-vuz8ld{margin:1em auto}@media(min-width: 480px){h1.svelte-vuz8ld{font-size:4em}}",
	map: "{\"version\":3,\"file\":\"_error.svelte\",\"sources\":[\"_error.svelte\"],\"sourcesContent\":[\"<script>\\nexport let status;\\nexport let error;\\n\\nconst dev = \\\"development\\\" === \\\"development\\\";\\n</script>\\n\\n<svelte:head>\\n  <title>{status}</title>\\n</svelte:head>\\n\\n<h1>{status}</h1>\\n\\n<p>{error.message}</p>\\n\\n{#if dev && error.stack}\\n  <pre>{error.stack}</pre>\\n{/if}\\n\\n<style windi:inject>\\nh1, p {\\n  margin: 0 auto;\\n}\\nh1 {\\n  font-size: 2.8em;\\n  font-weight: 700;\\n  margin: 0 0 0.5em 0;\\n}\\np {\\n  margin: 1em auto;\\n}\\n@media (min-width: 480px) {\\n  h1 {\\n    font-size: 4em;\\n  }\\n}\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAoBA,gBAAE,CAAE,CAAC,cAAC,CAAC,AACL,MAAM,CAAE,CAAC,CAAC,IAAI,AAChB,CAAC,AACD,EAAE,cAAC,CAAC,AACF,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,AACrB,CAAC,AACD,CAAC,cAAC,CAAC,AACD,MAAM,CAAE,GAAG,CAAC,IAAI,AAClB,CAAC,AACD,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,EAAE,cAAC,CAAC,AACF,SAAS,CAAE,GAAG,AAChB,CAAC,AACH,CAAC\"}"
};

const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { status } = $$props;
	let { error } = $$props;
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	$$result.css.add(css$b);

	return `${($$result.head += `${($$result.title = `<title>${escape(status)}</title>`, "")}`, "")}

<h1 class="${"svelte-vuz8ld"}">${escape(status)}</h1>

<p class="${"svelte-vuz8ld"}">${escape(error.message)}</p>

${error.stack
	? `<pre>${escape(error.stack)}</pre>`
	: ``}`;
});

/* src/node_modules/@sapper/internal/App.svelte generated by Svelte v3.42.1 */

const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { level2 = null } = $$props;
	let { notify } = $$props;
	afterUpdate(notify);
	setContext(CONTEXT_KEY, stores);
	if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0) $$bindings.stores(stores);
	if ($$props.error === void 0 && $$bindings.error && error !== void 0) $$bindings.error(error);
	if ($$props.status === void 0 && $$bindings.status && status !== void 0) $$bindings.status(status);
	if ($$props.segments === void 0 && $$bindings.segments && segments !== void 0) $$bindings.segments(segments);
	if ($$props.level0 === void 0 && $$bindings.level0 && level0 !== void 0) $$bindings.level0(level0);
	if ($$props.level1 === void 0 && $$bindings.level1 && level1 !== void 0) $$bindings.level1(level1);
	if ($$props.level2 === void 0 && $$bindings.level2 && level2 !== void 0) $$bindings.level2(level2);
	if ($$props.notify === void 0 && $$bindings.notify && notify !== void 0) $$bindings.notify(notify);

	return `${validate_component(Layout$1, "Layout").$$render($$result, Object.assign({ segment: segments[0] }, level0.props), {}, {
		default: () => `${error
		? `${validate_component(Error$1, "Error").$$render($$result, { error, status }, {}, {})}`
		: `${validate_component(level1.component || missing_component, "svelte:component").$$render($$result, Object.assign({ segment: segments[1] }, level1.props), {}, {
				default: () => `${level2
				? `${validate_component(level2.component || missing_component, "svelte:component").$$render($$result, Object.assign(level2.props), {}, {})}`
				: ``}`
			})}`}`
	})}`;
});

// This file is generated by Sapper — do not edit it!

if (typeof window !== 'undefined') {
	Promise.resolve().then(function () { return require('./sapper-dev-client-baba2825.js'); }).then(client => {
		client.connect(10000);
	});
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter$1(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function page_store(value) {
    const store = writable(value);
    let ready = true;
    function notify() {
        ready = true;
        store.update(val => val);
    }
    function set(new_value) {
        ready = false;
        store.set(new_value);
    }
    function subscribe(run) {
        let old_value;
        return store.subscribe((new_value) => {
            if (old_value === undefined || (ready && new_value !== old_value)) {
                run(old_value = new_value);
            }
        });
    }
    return { notify, set, subscribe };
}

const initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;
const stores = {
    page: page_store({}),
    preloading: writable(null),
    session: writable(initial_data && initial_data.session)
};
stores.session.subscribe((value) => __awaiter$1(void 0, void 0, void 0, function* () {
    return;
}));

const stores$1 = () => getContext(CONTEXT_KEY);

/* src/lib/components/home/downloadModal.svelte generated by Svelte v3.42.1 */

const css$a = {
	code: ".bg-rose-500.svelte-1000xgn{--tw-bg-opacity:1;background-color:rgba(244, 63, 94, var(--tw-bg-opacity))}.bg-rose-700.svelte-1000xgn{--tw-bg-opacity:1;background-color:rgba(190, 18, 60, var(--tw-bg-opacity))}.hover\\:bg-rose-900.svelte-1000xgn:hover{--tw-bg-opacity:1;background-color:rgba(136, 19, 55, var(--tw-bg-opacity))}.bg-dark-200.svelte-1000xgn{--tw-bg-opacity:1;background-color:rgba(50, 50, 50, var(--tw-bg-opacity))}.hover\\:bg-dark-900.svelte-1000xgn:hover{--tw-bg-opacity:1;background-color:rgba(15, 15, 15, var(--tw-bg-opacity))}.cursor-pointer.svelte-1000xgn{cursor:pointer}.flex.svelte-1000xgn{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.flex-col.svelte-1000xgn{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column}.items-center.svelte-1000xgn{-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center}.justify-center.svelte-1000xgn{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center}.h-6.svelte-1000xgn{height:1.5rem}.p-12.svelte-1000xgn{padding:3rem}.p-3.svelte-1000xgn{padding:0.75rem}.text-center.svelte-1000xgn{text-align:center}.text-white.svelte-1000xgn{--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity))}.w-6.svelte-1000xgn{width:1.5rem}.w-122.svelte-1000xgn{width:30.5rem}.w-22.svelte-1000xgn{width:5.5rem}.gap-6.svelte-1000xgn{grid-gap:1.5rem;gap:1.5rem}.duration-500.svelte-1000xgn{-webkit-transition-duration:500ms;-o-transition-duration:500ms;transition-duration:500ms}",
	map: "{\"version\":3,\"file\":\"downloadModal.svelte\",\"sources\":[\"downloadModal.svelte\"],\"sourcesContent\":[\"<script>\\nimport { stores } from \\\"@sapper/app\\\";\\nexport let show, data;\\n\\nconst { session } = stores();\\n\\n/* onMount(()=>{\\n\\n    }) */\\n</script>\\n\\n<div class=\\\"w-122 bg-rose-500 flex flex-col p-12  justify-center gap-6\\\">\\n  <span class=\\\"w-6 h-6 flex items-center justify-center text-white  bg-rose-700 hover:bg-rose-900 duration-500 cursor-pointer\\\" on:click=\\\"{() => (show = false)}\\\">x</span>\\n\\n  <h2 class=\\\"bg-dark-200 p-3\\\">{data.name}</h2>\\n  <p>{data.describtion}</p>\\n\\n  {#if $session?.user}\\n    <a download href=\\\"{data.path}\\\" class=\\\"bg-dark-200 p-3 w-22 text-center duration-500  hover:bg-dark-900 cursor-pointer\\\">indir</a>\\n  {:else}\\n    <a on:click=\\\"{() => (show = false)}\\\" href=\\\"/signin\\\">Kayıt olun veya giriş yapınız</a>\\n  {/if}\\n</div>\\n\\n<style windi:inject>\\n.bg-rose-500 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(244, 63, 94, var(--tw-bg-opacity));\\n}\\n.bg-rose-700 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(190, 18, 60, var(--tw-bg-opacity));\\n}\\n.hover\\\\:bg-rose-900:hover {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(136, 19, 55, var(--tw-bg-opacity));\\n}\\n.bg-dark-200 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(50, 50, 50, var(--tw-bg-opacity));\\n}\\n.hover\\\\:bg-dark-900:hover {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(15, 15, 15, var(--tw-bg-opacity));\\n}\\n.cursor-pointer {\\n  cursor: pointer;\\n}\\n.flex {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: -webkit-flex;\\n  display: flex;\\n}\\n.flex-col {\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n  -ms-flex-direction: column;\\n  -webkit-flex-direction: column;\\n  flex-direction: column;\\n}\\n.items-center {\\n  -webkit-box-align: center;\\n  -ms-flex-align: center;\\n  -webkit-align-items: center;\\n  align-items: center;\\n}\\n.justify-center {\\n  -webkit-box-pack: center;\\n  -ms-flex-pack: center;\\n  -webkit-justify-content: center;\\n  justify-content: center;\\n}\\n.h-6 {\\n  height: 1.5rem;\\n}\\n.p-12 {\\n  padding: 3rem;\\n}\\n.p-3 {\\n  padding: 0.75rem;\\n}\\n.text-center {\\n  text-align: center;\\n}\\n.text-white {\\n  --tw-text-opacity: 1;\\n  color: rgba(255, 255, 255, var(--tw-text-opacity));\\n}\\n.w-6 {\\n  width: 1.5rem;\\n}\\n.w-122 {\\n  width: 30.5rem;\\n}\\n.w-22 {\\n  width: 5.5rem;\\n}\\n.gap-6 {\\n  grid-gap: 1.5rem;\\n  gap: 1.5rem;\\n}\\n.duration-500 {\\n  -webkit-transition-duration: 500ms;\\n  -o-transition-duration: 500ms;\\n  transition-duration: 500ms;\\n}\\n</style>\"],\"names\":[],\"mappings\":\"AAyBA,YAAY,eAAC,CAAC,AACZ,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,AAC3D,CAAC,AACD,YAAY,eAAC,CAAC,AACZ,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,AAC3D,CAAC,AACD,kCAAmB,MAAM,AAAC,CAAC,AACzB,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,AAC3D,CAAC,AACD,YAAY,eAAC,CAAC,AACZ,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,AAC1D,CAAC,AACD,kCAAmB,MAAM,AAAC,CAAC,AACzB,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,AAC1D,CAAC,AACD,eAAe,eAAC,CAAC,AACf,MAAM,CAAE,OAAO,AACjB,CAAC,AACD,KAAK,eAAC,CAAC,AACL,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,YAAY,CACrB,OAAO,CAAE,IAAI,AACf,CAAC,AACD,SAAS,eAAC,CAAC,AACT,kBAAkB,CAAE,QAAQ,CAC5B,qBAAqB,CAAE,MAAM,CAC7B,kBAAkB,CAAE,MAAM,CAC1B,sBAAsB,CAAE,MAAM,CAC9B,cAAc,CAAE,MAAM,AACxB,CAAC,AACD,aAAa,eAAC,CAAC,AACb,iBAAiB,CAAE,MAAM,CACzB,cAAc,CAAE,MAAM,CACtB,mBAAmB,CAAE,MAAM,CAC3B,WAAW,CAAE,MAAM,AACrB,CAAC,AACD,eAAe,eAAC,CAAC,AACf,gBAAgB,CAAE,MAAM,CACxB,aAAa,CAAE,MAAM,CACrB,uBAAuB,CAAE,MAAM,CAC/B,eAAe,CAAE,MAAM,AACzB,CAAC,AACD,IAAI,eAAC,CAAC,AACJ,MAAM,CAAE,MAAM,AAChB,CAAC,AACD,KAAK,eAAC,CAAC,AACL,OAAO,CAAE,IAAI,AACf,CAAC,AACD,IAAI,eAAC,CAAC,AACJ,OAAO,CAAE,OAAO,AAClB,CAAC,AACD,YAAY,eAAC,CAAC,AACZ,UAAU,CAAE,MAAM,AACpB,CAAC,AACD,WAAW,eAAC,CAAC,AACX,iBAAiB,CAAE,CAAC,CACpB,KAAK,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,iBAAiB,CAAC,CAAC,AACpD,CAAC,AACD,IAAI,eAAC,CAAC,AACJ,KAAK,CAAE,MAAM,AACf,CAAC,AACD,MAAM,eAAC,CAAC,AACN,KAAK,CAAE,OAAO,AAChB,CAAC,AACD,KAAK,eAAC,CAAC,AACL,KAAK,CAAE,MAAM,AACf,CAAC,AACD,MAAM,eAAC,CAAC,AACN,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,MAAM,AACb,CAAC,AACD,aAAa,eAAC,CAAC,AACb,2BAA2B,CAAE,KAAK,CAClC,sBAAsB,CAAE,KAAK,CAC7B,mBAAmB,CAAE,KAAK,AAC5B,CAAC\"}"
};

const DownloadModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $session, $$unsubscribe_session;
	let { show, data } = $$props;
	const { session } = stores$1();
	validate_store(session, 'session');
	$$unsubscribe_session = subscribe(session, value => $session = value);
	if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	$$result.css.add(css$a);
	$$unsubscribe_session();

	return `<div class="${"w-122 bg-rose-500 flex flex-col p-12  justify-center gap-6 svelte-1000xgn"}"><span class="${"w-6 h-6 flex items-center justify-center text-white  bg-rose-700 hover:bg-rose-900 duration-500 cursor-pointer svelte-1000xgn"}">x</span>

  <h2 class="${"bg-dark-200 p-3 svelte-1000xgn"}">${escape(data.name)}</h2>
  <p>${escape(data.describtion)}</p>

  ${($session?.user)
	? `<a download${add_attribute("href", data.path, 0)} class="${"bg-dark-200 p-3 w-22 text-center duration-500  hover:bg-dark-900 cursor-pointer svelte-1000xgn"}">indir</a>`
	: `<a href="${"/signin"}">Kayıt olun veya giriş yapınız</a>`}
</div>`;
});

/* src/routes/index.svelte generated by Svelte v3.42.1 */

const css$9 = {
	code: ".bg-dark-400.svelte-osabo4{--tw-bg-opacity:1;background-color:rgba(34, 34, 34, var(--tw-bg-opacity))}.bg-dark-700.svelte-osabo4{--tw-bg-opacity:1;background-color:rgba(27, 27, 27, var(--tw-bg-opacity))}.bg-dark-200.svelte-osabo4{--tw-bg-opacity:1;background-color:rgba(50, 50, 50, var(--tw-bg-opacity))}.hover\\:bg-rose-500.svelte-osabo4:hover{--tw-bg-opacity:1;background-color:rgba(244, 63, 94, var(--tw-bg-opacity))}.bg-dark-500.svelte-osabo4{--tw-bg-opacity:1;background-color:rgba(31, 31, 31, var(--tw-bg-opacity))}.bg-rose-500.svelte-osabo4{--tw-bg-opacity:1;background-color:rgba(244, 63, 94, var(--tw-bg-opacity))}.hover\\:bg-rose-600.svelte-osabo4:hover{--tw-bg-opacity:1;background-color:rgba(225, 29, 72, var(--tw-bg-opacity))}.bg-rose-600.svelte-osabo4{--tw-bg-opacity:1;background-color:rgba(225, 29, 72, var(--tw-bg-opacity))}.rounded-xl.svelte-osabo4{border-radius:0.75rem}.rounded-t-xl.svelte-osabo4{border-top-left-radius:0.75rem;border-top-right-radius:0.75rem}.cursor-pointer.svelte-osabo4{cursor:pointer}.block.svelte-osabo4{display:block}.flex.svelte-osabo4{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.flex-col.svelte-osabo4{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column}.items-center.svelte-osabo4{-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center}.justify-center.svelte-osabo4{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center}.float-left.svelte-osabo4{float:left}.font-bold.svelte-osabo4{font-weight:700}.h-full.svelte-osabo4{height:100%}.h-20.svelte-osabo4{height:5rem}.h-4.svelte-osabo4{height:1rem}.m-3.svelte-osabo4{margin:0.75rem}.mt-6.svelte-osabo4{margin-top:1.5rem}.overflow-hidden.svelte-osabo4{overflow:hidden}.p-3.svelte-osabo4{padding:0.75rem}.p-2.svelte-osabo4{padding:0.5rem}.py-2.svelte-osabo4{padding-top:0.5rem;padding-bottom:0.5rem}.absolute.svelte-osabo4{position:absolute}.relative.svelte-osabo4{position:relative}.-top-4.svelte-osabo4{top:-1rem}.right-5.svelte-osabo4{right:1.25rem}.shadow.svelte-osabo4{--tw-shadow-color:0, 0, 0;--tw-shadow:0 1px 3px 0 rgba(var(--tw-shadow-color), 0.1), 0 1px 2px 0 rgba(var(--tw-shadow-color), 0.06);-webkit-box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.shadow-md.svelte-osabo4{--tw-shadow-color:0, 0, 0;--tw-shadow:0 4px 6px -1px rgba(var(--tw-shadow-color), 0.1), 0 2px 4px -1px rgba(var(--tw-shadow-color), 0.06);-webkit-box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.shadow-rose-400.svelte-osabo4{--tw-shadow-color:251, 113, 133}.text-center.svelte-osabo4{text-align:center}.text-white.svelte-osabo4{--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity))}.uppercase.svelte-osabo4{text-transform:uppercase}.w-full.svelte-osabo4{width:100%}.w-52.svelte-osabo4{width:13rem}.w-3\\/5.svelte-osabo4{width:60%}.w-42.svelte-osabo4{width:10.5rem}.gap-2.svelte-osabo4{grid-gap:0.5rem;gap:0.5rem}.duration-500.svelte-osabo4{-webkit-transition-duration:500ms;-o-transition-duration:500ms;transition-duration:500ms}.duration-150.svelte-osabo4{-webkit-transition-duration:150ms;-o-transition-duration:150ms;transition-duration:150ms}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\nimport { get } from \\\"svelte/store\\\";\\nimport { feather } from \\\"../lib/stores/feather\\\";\\nimport feathers from \\\"@feathersjs/client\\\";\\n\\nexport async function preload() {\\n  if (false) {\\n    const client = get(feather);\\n    client.configure(\\n      feathers.authentication({\\n        storage: window.localStorage,\\n      })\\n    );\\n\\n    const categories = await client.service(\\\"uploadthree\\\").find();\\n    const files = await client.service(\\\"file\\\").find();\\n    const user = await client.reAuthenticate().catch(() => false);\\n\\n    return { user: user?.user, categories, files };\\n  }\\n}\\n</script>\\n\\n<script>\\nimport { onMount } from \\\"svelte\\\";\\nimport Modal from \\\"../lib/components/modal.svelte\\\";\\nimport DownloadModal from \\\"../lib/components/home/downloadModal.svelte\\\";\\nimport { stores } from \\\"@sapper/app\\\";\\nconst { session } = stores();\\n\\nexport let user, categories, files;\\nexport let showModal = false;\\n$session = {\\n  user,\\n};\\n\\nlet filter = \\\"\\\",\\n  file;\\n\\nasync function handleCategorySelect(category) {\\n  filter = category;\\n}\\n\\nfunction handleShowModal(data) {\\n  file = data;\\n  showModal = true;\\n}\\n\\nonMount(async () => {\\n  const categoryService = $feather.service(\\\"uploadthree\\\");\\n  const fileService = $feather.service(\\\"file\\\");\\n\\n  [\\\"created\\\", \\\"removed\\\"].forEach((event) => {\\n    categoryService.on(event, async () => {\\n      categories = await categoryService.find();\\n    });\\n\\n    fileService.on(event, async () => {\\n      files = await fileService.find();\\n    });\\n  });\\n});\\n</script>\\n\\n<div class=\\\" w-full h-full\\\">\\n  <div class=\\\" flex h-full  \\\">\\n    <div class=\\\"w-52 h-full bg-dark-400 \\\">\\n      <ul class=\\\"flex flex-col gap-2 text-white p-3\\\">\\n        <li on:click=\\\"{() => handleCategorySelect('')}\\\" class=\\\"p-2 {filter == '' ? 'bg-dark-700' : 'bg-dark-200'}  hover:bg-rose-500 duration-500\\\">Tümü</li>\\n        {#each categories?.data || [] as category}\\n          <li on:click=\\\"{() => handleCategorySelect(category.text)}\\\" class=\\\"p-2 {filter == category.text ? 'bg-dark-700' : 'bg-dark-200'}   hover:bg-rose-500 duration-500\\\">{category.text}</li>\\n        {/each}\\n      </ul>\\n    </div>\\n\\n    <div class=\\\"w-full bg-dark-500   \\\">\\n      {#each filter !== \\\"\\\" ? (files?.data || []).filter((x) => x.category == filter) : files?.data || [] as file}\\n        <div class=\\\"bg-rose-500 hover:bg-rose-600 duration-150 float-left w-42 h-20 m-3 rounded-xl relative mt-6 flex flex-col justify-center items-center shadow shadow-md shadow-rose-400 cursor-pointer\\\">\\n          <div class=\\\"absolute bg-rose-600 w-3/5 h-4 rounded-t-xl -top-4 right-5 shadow shadow-md shadow-rose-400\\\"></div>\\n          <span on:click=\\\"{() => handleShowModal(file)}\\\" class=\\\"text-white uppercase font-bold text-center block h-full w-full overflow-hidden py-2 flex items-center justify-center\\\">{file.name}</span>\\n        </div>\\n      {/each}\\n    </div>\\n  </div>\\n</div>\\n<Modal bind:show=\\\"{showModal}\\\" data=\\\"{file}\\\" component=\\\"{DownloadModal}\\\" />\\n\\n<style windi:inject>\\n.bg-dark-400 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(34, 34, 34, var(--tw-bg-opacity));\\n}\\n.bg-dark-700 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(27, 27, 27, var(--tw-bg-opacity));\\n}\\n.bg-dark-200 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(50, 50, 50, var(--tw-bg-opacity));\\n}\\n.hover\\\\:bg-rose-500:hover {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(244, 63, 94, var(--tw-bg-opacity));\\n}\\n.bg-dark-500 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(31, 31, 31, var(--tw-bg-opacity));\\n}\\n.bg-rose-500 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(244, 63, 94, var(--tw-bg-opacity));\\n}\\n.hover\\\\:bg-rose-600:hover {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(225, 29, 72, var(--tw-bg-opacity));\\n}\\n.bg-rose-600 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(225, 29, 72, var(--tw-bg-opacity));\\n}\\n.rounded-xl {\\n  border-radius: 0.75rem;\\n}\\n.rounded-t-xl {\\n  border-top-left-radius: 0.75rem;\\n  border-top-right-radius: 0.75rem;\\n}\\n.cursor-pointer {\\n  cursor: pointer;\\n}\\n.block {\\n  display: block;\\n}\\n.flex {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: -webkit-flex;\\n  display: flex;\\n}\\n.flex-col {\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n  -ms-flex-direction: column;\\n  -webkit-flex-direction: column;\\n  flex-direction: column;\\n}\\n.items-center {\\n  -webkit-box-align: center;\\n  -ms-flex-align: center;\\n  -webkit-align-items: center;\\n  align-items: center;\\n}\\n.justify-center {\\n  -webkit-box-pack: center;\\n  -ms-flex-pack: center;\\n  -webkit-justify-content: center;\\n  justify-content: center;\\n}\\n.float-left {\\n  float: left;\\n}\\n.font-bold {\\n  font-weight: 700;\\n}\\n.h-full {\\n  height: 100%;\\n}\\n.h-20 {\\n  height: 5rem;\\n}\\n.h-4 {\\n  height: 1rem;\\n}\\n.m-3 {\\n  margin: 0.75rem;\\n}\\n.mt-6 {\\n  margin-top: 1.5rem;\\n}\\n.overflow-hidden {\\n  overflow: hidden;\\n}\\n.p-3 {\\n  padding: 0.75rem;\\n}\\n.p-2 {\\n  padding: 0.5rem;\\n}\\n.py-2 {\\n  padding-top: 0.5rem;\\n  padding-bottom: 0.5rem;\\n}\\n.absolute {\\n  position: absolute;\\n}\\n.relative {\\n  position: relative;\\n}\\n.-top-4 {\\n  top: -1rem;\\n}\\n.right-5 {\\n  right: 1.25rem;\\n}\\n.shadow {\\n  --tw-shadow-color: 0, 0, 0;\\n  --tw-shadow: 0 1px 3px 0 rgba(var(--tw-shadow-color), 0.1), 0 1px 2px 0 rgba(var(--tw-shadow-color), 0.06);\\n  -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\\n}\\n.shadow-md {\\n  --tw-shadow-color: 0, 0, 0;\\n  --tw-shadow: 0 4px 6px -1px rgba(var(--tw-shadow-color), 0.1), 0 2px 4px -1px rgba(var(--tw-shadow-color), 0.06);\\n  -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\\n}\\n.shadow-rose-400 {\\n  --tw-shadow-color: 251, 113, 133;\\n}\\n.text-center {\\n  text-align: center;\\n}\\n.text-white {\\n  --tw-text-opacity: 1;\\n  color: rgba(255, 255, 255, var(--tw-text-opacity));\\n}\\n.uppercase {\\n  text-transform: uppercase;\\n}\\n.w-full {\\n  width: 100%;\\n}\\n.w-52 {\\n  width: 13rem;\\n}\\n.w-3\\\\/5 {\\n  width: 60%;\\n}\\n.w-42 {\\n  width: 10.5rem;\\n}\\n.gap-2 {\\n  grid-gap: 0.5rem;\\n  gap: 0.5rem;\\n}\\n.duration-500 {\\n  -webkit-transition-duration: 500ms;\\n  -o-transition-duration: 500ms;\\n  transition-duration: 500ms;\\n}\\n.duration-150 {\\n  -webkit-transition-duration: 150ms;\\n  -o-transition-duration: 150ms;\\n  transition-duration: 150ms;\\n}\\n</style>\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

async function preload$6() {
}

const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $feather, $$unsubscribe_feather;
	let $session, $$unsubscribe_session;
	validate_store(feather, 'feather');
	$$unsubscribe_feather = subscribe(feather, value => $feather = value);
	const { session } = stores$1();
	validate_store(session, 'session');
	$$unsubscribe_session = subscribe(session, value => $session = value);
	let { user, categories, files } = $$props;
	let { showModal = false } = $$props;
	set_store_value(session, $session = { user }, $session);
	let filter = "", file;

	onMount(async () => {
		const categoryService = $feather.service("uploadthree");
		const fileService = $feather.service("file");

		["created", "removed"].forEach(event => {
			categoryService.on(event, async () => {
				categories = await categoryService.find();
			});

			fileService.on(event, async () => {
				files = await fileService.find();
			});
		});
	});

	if ($$props.user === void 0 && $$bindings.user && user !== void 0) $$bindings.user(user);
	if ($$props.categories === void 0 && $$bindings.categories && categories !== void 0) $$bindings.categories(categories);
	if ($$props.files === void 0 && $$bindings.files && files !== void 0) $$bindings.files(files);
	if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0) $$bindings.showModal(showModal);
	$$result.css.add(css$9);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		$$rendered = `<div class="${" w-full h-full svelte-osabo4"}"><div class="${" flex h-full   svelte-osabo4"}"><div class="${"w-52 h-full bg-dark-400  svelte-osabo4"}"><ul class="${"flex flex-col gap-2 text-white p-3 svelte-osabo4"}"><li class="${"p-2 " + escape('bg-dark-700' ) + "  hover:bg-rose-500 duration-500" + " svelte-osabo4"}">Tümü</li>
        ${each(categories?.data || [], category => `<li class="${"p-2 " + escape(filter == category.text ? 'bg-dark-700' : 'bg-dark-200') + "   hover:bg-rose-500 duration-500" + " svelte-osabo4"}">${escape(category.text)}</li>`)}</ul></div>

    <div class="${"w-full bg-dark-500    svelte-osabo4"}">${each(
			files?.data || [],
			file => `<div class="${"bg-rose-500 hover:bg-rose-600 duration-150 float-left w-42 h-20 m-3 rounded-xl relative mt-6 flex flex-col justify-center items-center shadow shadow-md shadow-rose-400 cursor-pointer svelte-osabo4"}"><div class="${"absolute bg-rose-600 w-3/5 h-4 rounded-t-xl -top-4 right-5 shadow shadow-md shadow-rose-400 svelte-osabo4"}"></div>
          <span class="${"text-white uppercase font-bold text-center block h-full w-full overflow-hidden py-2 flex items-center justify-center svelte-osabo4"}">${escape(file.name)}</span>
        </div>`
		)}</div></div></div>
${validate_component(Modal, "Modal").$$render(
			$$result,
			{
				data: file,
				component: DownloadModal,
				show: showModal
			},
			{
				show: $$value => {
					showModal = $$value;
					$$settled = false;
				}
			},
			{}
		)}`;
	} while (!$$settled);

	$$unsubscribe_feather();
	$$unsubscribe_session();
	return $$rendered;
});

var component_0 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Routes,
    preload: preload$6
});

/* src/routes/create_admin.svelte generated by Svelte v3.42.1 */

const css$8 = {
	code: "input.svelte-1pwmlc{--tw-border-opacity:1;border-color:rgba(45, 45, 45, var(--tw-border-opacity));border-style:solid;border-width:1px}.flex.svelte-1pwmlc{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.flex-col.svelte-1pwmlc{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column}.mx-auto.svelte-1pwmlc{margin-left:auto;margin-right:auto}.mt-12.svelte-1pwmlc{margin-top:3rem}.w-132.svelte-1pwmlc{width:33rem}.gap-4.svelte-1pwmlc{grid-gap:1rem;gap:1rem}",
	map: "{\"version\":3,\"file\":\"create_admin.svelte\",\"sources\":[\"create_admin.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\nimport { get } from \\\"svelte/store\\\";\\nimport { feather } from \\\"../lib/stores/feather\\\";\\n\\nexport async function preload(page, session) {\\n  if (!false) return;\\n  const isAdminExist = !!(await get(feather).service(\\\"users\\\").find()).total;\\n\\n  return isAdminExist ? this.redirect(302, \\\"/singin\\\") : null;\\n}\\n</script>\\n\\n<script>\\nimport { stores } from \\\"@sapper/app\\\";\\nconst { session } = stores();\\n\\nlet email,\\n  password,\\n  flash = \\\"\\\";\\n\\nasync function handleCreateAdmin() {\\n  try {\\n    const admin = await $feather.service(\\\"users\\\").create({\\n      email,\\n      password,\\n      role: \\\"admin\\\",\\n    });\\n\\n    $session.user = admin;\\n  } catch (error) {\\n    flash = error;\\n\\n    setTimeout(() => (flash = \\\"\\\"), 2000);\\n  }\\n}\\n</script>\\n\\n<form on:submit|preventDefault=\\\"{handleCreateAdmin}\\\" class=\\\"flex flex-col w-132 gap-4 mx-auto mt-12\\\">\\n  <input type=\\\"email\\\" bind:value=\\\"{email}\\\" required />\\n  <input type=\\\"password\\\" bind:value=\\\"{password}\\\" required />\\n\\n  <button type=\\\"submit\\\"> Kaydol</button>\\n\\n  {flash}\\n</form>\\n\\n<style windi:inject>\\ninput {\\n  --tw-border-opacity: 1;\\n  border-color: rgba(45, 45, 45, var(--tw-border-opacity));\\n  border-style: solid;\\n  border-width: 1px;\\n}\\n.flex {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: -webkit-flex;\\n  display: flex;\\n}\\n.flex-col {\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n  -ms-flex-direction: column;\\n  -webkit-flex-direction: column;\\n  flex-direction: column;\\n}\\n.mx-auto {\\n  margin-left: auto;\\n  margin-right: auto;\\n}\\n.mt-12 {\\n  margin-top: 3rem;\\n}\\n.w-132 {\\n  width: 33rem;\\n}\\n.gap-4 {\\n  grid-gap: 1rem;\\n  gap: 1rem;\\n}\\n</style>\\n\"],\"names\":[],\"mappings\":\"AA+CA,KAAK,cAAC,CAAC,AACL,mBAAmB,CAAE,CAAC,CACtB,YAAY,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,mBAAmB,CAAC,CAAC,CACxD,YAAY,CAAE,KAAK,CACnB,YAAY,CAAE,GAAG,AACnB,CAAC,AACD,KAAK,cAAC,CAAC,AACL,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,YAAY,CACrB,OAAO,CAAE,IAAI,AACf,CAAC,AACD,SAAS,cAAC,CAAC,AACT,kBAAkB,CAAE,QAAQ,CAC5B,qBAAqB,CAAE,MAAM,CAC7B,kBAAkB,CAAE,MAAM,CAC1B,sBAAsB,CAAE,MAAM,CAC9B,cAAc,CAAE,MAAM,AACxB,CAAC,AACD,QAAQ,cAAC,CAAC,AACR,WAAW,CAAE,IAAI,CACjB,YAAY,CAAE,IAAI,AACpB,CAAC,AACD,MAAM,cAAC,CAAC,AACN,UAAU,CAAE,IAAI,AAClB,CAAC,AACD,MAAM,cAAC,CAAC,AACN,KAAK,CAAE,KAAK,AACd,CAAC,AACD,MAAM,cAAC,CAAC,AACN,QAAQ,CAAE,IAAI,CACd,GAAG,CAAE,IAAI,AACX,CAAC\"}"
};

async function preload$5(page, session) {
	return;
}

const Create_admin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$unsubscribe_session;
	let $$unsubscribe_feather;
	validate_store(feather, 'feather');
	$$unsubscribe_feather = subscribe(feather, value => value);
	const { session } = stores$1();
	validate_store(session, 'session');
	$$unsubscribe_session = subscribe(session, value => value);
	let email, password, flash = "";

	$$result.css.add(css$8);
	$$unsubscribe_session();
	$$unsubscribe_feather();

	return `<form class="${"flex flex-col w-132 gap-4 mx-auto mt-12 svelte-1pwmlc"}"><input type="${"email"}" required class="${"svelte-1pwmlc"}"${add_attribute("value", email, 0)}>
  <input type="${"password"}" required class="${"svelte-1pwmlc"}"${add_attribute("value", password, 0)}>

  <button type="${"submit"}">Kaydol</button>

  ${escape(flash)}
</form>`;
});

var component_1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Create_admin,
    preload: preload$5
});

/* src/routes/signin.svelte generated by Svelte v3.42.1 */

const css$7 = {
	code: ".bg-dark-400.svelte-1nesk0u{--tw-bg-opacity:1;background-color:rgba(34, 34, 34, var(--tw-bg-opacity))}.bg-rose-700.svelte-1nesk0u{--tw-bg-opacity:1;background-color:rgba(190, 18, 60, var(--tw-bg-opacity))}.bg-white.svelte-1nesk0u{--tw-bg-opacity:1;background-color:rgba(255, 255, 255, var(--tw-bg-opacity))}.bg-dark-700.svelte-1nesk0u{--tw-bg-opacity:1;background-color:rgba(27, 27, 27, var(--tw-bg-opacity))}.flex.svelte-1nesk0u{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.flex-col.svelte-1nesk0u{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column}.items-center.svelte-1nesk0u{-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center}.justify-center.svelte-1nesk0u{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center}.h-full.svelte-1nesk0u{height:100%}.h-102.svelte-1nesk0u{height:25.5rem}.mx-auto.svelte-1nesk0u{margin-left:auto;margin-right:auto}.p-6.svelte-1nesk0u{padding:1.5rem}.p-2.svelte-1nesk0u{padding:0.5rem}.text-dark-900.svelte-1nesk0u{--tw-text-opacity:1;color:rgba(15, 15, 15, var(--tw-text-opacity))}.text-white.svelte-1nesk0u{--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity))}.w-full.svelte-1nesk0u{width:100%}.w-202.svelte-1nesk0u{width:50.5rem}.w-101.svelte-1nesk0u{width:25.25rem}.w-70.svelte-1nesk0u{width:17.5rem}.gap-6.svelte-1nesk0u{grid-gap:1.5rem;gap:1.5rem}@media(min-width: 768px){.md\\:flex-row.svelte-1nesk0u{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;-webkit-flex-direction:row;flex-direction:row}}",
	map: "{\"version\":3,\"file\":\"signin.svelte\",\"sources\":[\"signin.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\nimport { get } from \\\"svelte/store\\\";\\nimport { feather } from \\\"../lib/stores/feather\\\";\\nimport feathers from \\\"@feathersjs/client\\\";\\n\\nexport async function preload() {\\n  if (false) {\\n    const client = get(feather);\\n    client.configure(\\n      feathers.authentication({\\n        storage: window.localStorage,\\n      })\\n    );\\n\\n    const users = await client.service(\\\"users\\\").find();\\n\\n    console.log(users);\\n\\n    const createAdmin = users.total === 0 || undefined ? true : false;\\n    console.log(createAdmin);\\n    if (createAdmin) {\\n      return this.redirect(302, \\\"/create_admin\\\");\\n    }\\n\\n    const user = await client.reAuthenticate().catch(() => false);\\n\\n    if (user) return this.redirect(302, \\\"/\\\");\\n  }\\n}\\n</script>\\n\\n<script>\\nimport { stores } from \\\"@sapper/app\\\";\\n\\nconst { session } = stores();\\nlet loginForm = {};\\nlet registerForm = {};\\n\\nasync function handleLogin() {\\n  const user = await $feather.authenticate({\\n    strategy: \\\"local\\\",\\n    ...loginForm,\\n  });\\n  $session = {\\n    user: user?.user,\\n  };\\n}\\n\\nasync function handleRegister() {\\n  try {\\n    const user = await $feather.service(\\\"users\\\").create({\\n      email: registerForm.email,\\n      password: registerForm.password,\\n    });\\n\\n    if (user) {\\n      alert(\\\"Kayıt oldunuz\\\");\\n    }\\n  } catch (error) {\\n    alert(error);\\n  }\\n}\\n</script>\\n\\n<div class=\\\"flex h-full items-center justify-center bg-dark-400\\\">\\n  <div class=\\\"w-202 h-102 flex  md:flex-row flex-col\\\">\\n    <div class=\\\"w-101  h-102 p-6 bg-rose-700\\\">\\n      <form on:submit|preventDefault=\\\"{handleLogin}\\\" class=\\\"flex flex-col items-center justify-center h-full w-70 mx-auto gap-6\\\">\\n        <h2>Eposta ve şifre ile giriş yapın</h2>\\n        <input type=\\\"email\\\" class=\\\"p-2 w-full text-dark-900\\\" placeholder=\\\"Eposta\\\" bind:value=\\\"{loginForm.email}\\\" required />\\n        <input type=\\\"password\\\" class=\\\"p-2 w-full text-dark-900\\\" placeholder=\\\"Şifre\\\" bind:value=\\\"{loginForm.password}\\\" required />\\n        <button type=\\\"submit\\\" class=\\\"p-2 bg-white text-dark-900 w-full\\\">Giriş</button>\\n      </form>\\n    </div>\\n    <div class=\\\"w-101  h-102 p-6 bg-dark-700\\\">\\n      <form on:submit|preventDefault=\\\"{handleRegister}\\\" class=\\\"flex flex-col items-center justify-center h-full w-70 mx-auto gap-6\\\">\\n        <h2 class=\\\"text-white\\\">Kayıt olmak için formu doldurun</h2>\\n        <input type=\\\"email\\\" class=\\\"p-2 w-full text-dark-900\\\" placeholder=\\\"Eposta\\\" bind:value=\\\"{registerForm.email}\\\" required />\\n        <input type=\\\"password\\\" class=\\\"p-2 w-full text-dark-900\\\" placeholder=\\\"Şifre\\\" bind:value=\\\"{registerForm.password}\\\" required />\\n\\n        <button type=\\\"submit\\\" class=\\\"p-2 bg-white text-dark-900 w-full\\\">Kayıt</button>\\n      </form>\\n    </div>\\n  </div>\\n</div>\\n\\n<style windi:inject>\\n.bg-dark-400 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(34, 34, 34, var(--tw-bg-opacity));\\n}\\n.bg-rose-700 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(190, 18, 60, var(--tw-bg-opacity));\\n}\\n.bg-white {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));\\n}\\n.bg-dark-700 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(27, 27, 27, var(--tw-bg-opacity));\\n}\\n.flex {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: -webkit-flex;\\n  display: flex;\\n}\\n.flex-col {\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n  -ms-flex-direction: column;\\n  -webkit-flex-direction: column;\\n  flex-direction: column;\\n}\\n.items-center {\\n  -webkit-box-align: center;\\n  -ms-flex-align: center;\\n  -webkit-align-items: center;\\n  align-items: center;\\n}\\n.justify-center {\\n  -webkit-box-pack: center;\\n  -ms-flex-pack: center;\\n  -webkit-justify-content: center;\\n  justify-content: center;\\n}\\n.h-full {\\n  height: 100%;\\n}\\n.h-102 {\\n  height: 25.5rem;\\n}\\n.mx-auto {\\n  margin-left: auto;\\n  margin-right: auto;\\n}\\n.p-6 {\\n  padding: 1.5rem;\\n}\\n.p-2 {\\n  padding: 0.5rem;\\n}\\n.text-dark-900 {\\n  --tw-text-opacity: 1;\\n  color: rgba(15, 15, 15, var(--tw-text-opacity));\\n}\\n.text-white {\\n  --tw-text-opacity: 1;\\n  color: rgba(255, 255, 255, var(--tw-text-opacity));\\n}\\n.w-full {\\n  width: 100%;\\n}\\n.w-202 {\\n  width: 50.5rem;\\n}\\n.w-101 {\\n  width: 25.25rem;\\n}\\n.w-70 {\\n  width: 17.5rem;\\n}\\n.gap-6 {\\n  grid-gap: 1.5rem;\\n  gap: 1.5rem;\\n}\\n@media (min-width: 768px) {\\n  .md\\\\:flex-row {\\n    -webkit-box-orient: horizontal;\\n    -webkit-box-direction: normal;\\n    -ms-flex-direction: row;\\n    -webkit-flex-direction: row;\\n    flex-direction: row;\\n  }\\n}\\n</style>\"],\"names\":[],\"mappings\":\"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\"}"
};

async function preload$4() {
}

const Signin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$unsubscribe_feather;
	let $$unsubscribe_session;
	validate_store(feather, 'feather');
	$$unsubscribe_feather = subscribe(feather, value => value);
	const { session } = stores$1();
	validate_store(session, 'session');
	$$unsubscribe_session = subscribe(session, value => value);
	let loginForm = {};
	let registerForm = {};

	$$result.css.add(css$7);
	$$unsubscribe_feather();
	$$unsubscribe_session();

	return `<div class="${"flex h-full items-center justify-center bg-dark-400 svelte-1nesk0u"}"><div class="${"w-202 h-102 flex  md:flex-row flex-col svelte-1nesk0u"}"><div class="${"w-101  h-102 p-6 bg-rose-700 svelte-1nesk0u"}"><form class="${"flex flex-col items-center justify-center h-full w-70 mx-auto gap-6 svelte-1nesk0u"}"><h2>Eposta ve şifre ile giriş yapın</h2>
        <input type="${"email"}" class="${"p-2 w-full text-dark-900 svelte-1nesk0u"}" placeholder="${"Eposta"}" required${add_attribute("value", loginForm.email, 0)}>
        <input type="${"password"}" class="${"p-2 w-full text-dark-900 svelte-1nesk0u"}" placeholder="${"Şifre"}" required${add_attribute("value", loginForm.password, 0)}>
        <button type="${"submit"}" class="${"p-2 bg-white text-dark-900 w-full svelte-1nesk0u"}">Giriş</button></form></div>
    <div class="${"w-101  h-102 p-6 bg-dark-700 svelte-1nesk0u"}"><form class="${"flex flex-col items-center justify-center h-full w-70 mx-auto gap-6 svelte-1nesk0u"}"><h2 class="${"text-white svelte-1nesk0u"}">Kayıt olmak için formu doldurun</h2>
        <input type="${"email"}" class="${"p-2 w-full text-dark-900 svelte-1nesk0u"}" placeholder="${"Eposta"}" required${add_attribute("value", registerForm.email, 0)}>
        <input type="${"password"}" class="${"p-2 w-full text-dark-900 svelte-1nesk0u"}" placeholder="${"Şifre"}" required${add_attribute("value", registerForm.password, 0)}>

        <button type="${"submit"}" class="${"p-2 bg-white text-dark-900 w-full svelte-1nesk0u"}">Kayıt</button></form></div></div>
</div>`;
});

var component_2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Signin,
    preload: preload$4
});

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob$1(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams$1(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

var utils = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob$1,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams$1,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

function encode$2(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode$2(key) + '=' + encode$2(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

var cookies = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
var buildFullPath = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

var isURLSameOrigin = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

function createCommonjsModule$1(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire$1(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

function commonjsRequire$1 () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

var ms = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse$1(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse$1(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = ms;
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

var common = setup;

var browser$1 = createCommonjsModule$1(function (module, exports) {
/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = common(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};
});

var hasFlag = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};

const env = process.env;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false')) {
	forceColor = false;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = true;
}
if ('FORCE_COLOR' in env) {
	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === false) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor !== true) {
		return 0;
	}

	const min = forceColor ? 1 : 0;

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os__default['default'].release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return min;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

var supportsColor_1 = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};

var node = createCommonjsModule$1(function (module, exports) {
/**
 * Module dependencies.
 */




/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util__default['default'].deprecate(
	() => {},
	'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
);

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = supportsColor_1;

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty__default['default'].isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util__default['default'].format(...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = common(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util__default['default'].inspect(v, this.inspectOpts)
		.split('\n')
		.map(str => str.trim())
		.join(' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util__default['default'].inspect(v, this.inspectOpts);
};
});

var src = createCommonjsModule$1(function (module) {
/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || false === true || process.__nwjs) {
	module.exports = browser$1;
} else {
	module.exports = node;
}
});

var debug;

var debug_1 = function () {
  if (!debug) {
    try {
      /* eslint global-require: off */
      debug = src("follow-redirects");
    }
    catch (error) {
      debug = function () { /* */ };
    }
  }
  debug.apply(null, arguments);
};

var URL = Url__default['default'].URL;


var Writable = Stream__default['default'].Writable;



// Create handlers that pass events from native requests
var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
var eventHandlers = Object.create(null);
events.forEach(function (event) {
  eventHandlers[event] = function (arg1, arg2, arg3) {
    this._redirectable.emit(event, arg1, arg2, arg3);
  };
});

// Error types with codes
var RedirectionError = createErrorType(
  "ERR_FR_REDIRECTION_FAILURE",
  ""
);
var TooManyRedirectsError = createErrorType(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded"
);
var MaxBodyLengthExceededError = createErrorType(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
);
var WriteAfterEndError = createErrorType(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
);

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  this._sanitizeOptions(options);
  this._options = options;
  this._ended = false;
  this._ending = false;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

RedirectableRequest.prototype.abort = function () {
  abortRequest(this._currentRequest);
  this.emit("abort");
};

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new WriteAfterEndError();
  }

  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  }
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
    this.emit("error", new MaxBodyLengthExceededError());
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  }
  else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Write data if needed and end
  if (!data) {
    this._ended = this._ending = true;
    this._currentRequest.end(null, null, callback);
  }
  else {
    var self = this;
    var currentRequest = this._currentRequest;
    this.write(data, encoding, function () {
      self._ended = true;
      currentRequest.end(null, null, callback);
    });
    this._ending = true;
  }
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Global timeout for all underlying requests
RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
  var self = this;
  if (callback) {
    this.on("timeout", callback);
  }

  function destroyOnTimeout(socket) {
    socket.setTimeout(msecs);
    socket.removeListener("timeout", socket.destroy);
    socket.addListener("timeout", socket.destroy);
  }

  // Sets up a timer to trigger a timeout event
  function startTimer(socket) {
    if (self._timeout) {
      clearTimeout(self._timeout);
    }
    self._timeout = setTimeout(function () {
      self.emit("timeout");
      clearTimer();
    }, msecs);
    destroyOnTimeout(socket);
  }

  // Prevent a timeout from triggering
  function clearTimer() {
    clearTimeout(this._timeout);
    if (callback) {
      self.removeListener("timeout", callback);
    }
    if (!this.socket) {
      self._currentRequest.removeListener("socket", startTimer);
    }
  }

  // Start the timer when the socket is opened
  if (this.socket) {
    startTimer(this.socket);
  }
  else {
    this._currentRequest.once("socket", startTimer);
  }

  this.on("socket", destroyOnTimeout);
  this.once("response", clearTimer);
  this.once("error", clearTimer);

  return this;
};

// Proxy all other public ClientRequest methods
[
  "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

RedirectableRequest.prototype._sanitizeOptions = function (options) {
  // Ensure headers are always present
  if (!options.headers) {
    options.headers = {};
  }

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }
};


// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new TypeError("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = Url__default['default'].format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var e = 0; e < events.length; e++) {
    request.on(events[e], eventHandlers[events[e]]);
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var self = this;
    var buffers = this._requestBodyBuffers;
    (function writeNext(error) {
      // Only write if this request has not been redirected yet
      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors
        /* istanbul ignore if */
        if (error) {
          self.emit("error", error);
        }
        // Write the next buffer if there are still left
        else if (i < buffers.length) {
          var buffer = buffers[i++];
          /* istanbul ignore else */
          if (!request.finished) {
            request.write(buffer.data, buffer.encoding, writeNext);
          }
        }
        // End the request if `end` has been called on us
        else if (self._ended) {
          request.end();
        }
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  var statusCode = response.statusCode;
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.
  var location = response.headers.location;
  if (location && this._options.followRedirects !== false &&
      statusCode >= 300 && statusCode < 400) {
    // Abort the current request
    abortRequest(this._currentRequest);
    // Discard the remainder of the response to avoid waiting for data
    response.destroy();

    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new TooManyRedirectsError());
      return;
    }

    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe, […]
    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
    // the request method from POST to GET for the subsequent request.
    if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
        // RFC7231§6.4.4: The 303 (See Other) status code indicates that
        // the server is redirecting the user agent to a different resource […]
        // A user agent can perform a retrieval request targeting that URI
        // (a GET or HEAD request if using HTTP) […]
        (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
      this._options.method = "GET";
      // Drop a possible entity and headers related to it
      this._requestBodyBuffers = [];
      removeMatchingHeaders(/^content-/i, this._options.headers);
    }

    // Drop the Host header, as the redirect might lead to a different host
    var previousHostName = removeMatchingHeaders(/^host$/i, this._options.headers) ||
      Url__default['default'].parse(this._currentUrl).hostname;

    // Create the redirected request
    var redirectUrl = Url__default['default'].resolve(this._currentUrl, location);
    debug_1("redirecting to", redirectUrl);
    this._isRedirect = true;
    var redirectUrlParts = Url__default['default'].parse(redirectUrl);
    Object.assign(this._options, redirectUrlParts);

    // Drop the Authorization header if redirecting to another host
    if (redirectUrlParts.hostname !== previousHostName) {
      removeMatchingHeaders(/^authorization$/i, this._options.headers);
    }

    // Evaluate the beforeRedirect callback
    if (typeof this._options.beforeRedirect === "function") {
      var responseDetails = { headers: response.headers };
      try {
        this._options.beforeRedirect.call(null, this._options, responseDetails);
      }
      catch (err) {
        this.emit("error", err);
        return;
      }
      this._sanitizeOptions(this._options);
    }

    // Perform the redirected request
    try {
      this._performRequest();
    }
    catch (cause) {
      var error = new RedirectionError("Redirected request failed: " + cause.message);
      error.cause = cause;
      this.emit("error", error);
    }
  }
  else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    function request(input, options, callback) {
      // Parse parameters
      if (typeof input === "string") {
        var urlStr = input;
        try {
          input = urlToOptions(new URL(urlStr));
        }
        catch (err) {
          /* istanbul ignore next */
          input = Url__default['default'].parse(urlStr);
        }
      }
      else if (URL && (input instanceof URL)) {
        input = urlToOptions(input);
      }
      else {
        callback = options;
        options = input;
        input = { protocol: protocol };
      }
      if (typeof options === "function") {
        callback = options;
        options = null;
      }

      // Set defaults
      options = Object.assign({
        maxRedirects: exports.maxRedirects,
        maxBodyLength: exports.maxBodyLength,
      }, input, options);
      options.nativeProtocols = nativeProtocols;

      assert__default['default'].equal(options.protocol, protocol, "protocol mismatch");
      debug_1("options", options);
      return new RedirectableRequest(options, callback);
    }

    // Executes a GET request, following redirects
    function get(input, options, callback) {
      var wrappedRequest = wrappedProtocol.request(input, options, callback);
      wrappedRequest.end();
      return wrappedRequest;
    }

    // Expose the properties on the wrapped protocol
    Object.defineProperties(wrappedProtocol, {
      request: { value: request, configurable: true, enumerable: true, writable: true },
      get: { value: get, configurable: true, enumerable: true, writable: true },
    });
  });
  return exports;
}

/* istanbul ignore next */
function noop$1() { /* empty */ }

// from https://github.com/nodejs/node/blob/master/lib/internal/url.js
function urlToOptions(urlObject) {
  var options = {
    protocol: urlObject.protocol,
    hostname: urlObject.hostname.startsWith("[") ?
      /* istanbul ignore next */
      urlObject.hostname.slice(1, -1) :
      urlObject.hostname,
    hash: urlObject.hash,
    search: urlObject.search,
    pathname: urlObject.pathname,
    path: urlObject.pathname + urlObject.search,
    href: urlObject.href,
  };
  if (urlObject.port !== "") {
    options.port = Number(urlObject.port);
  }
  return options;
}

function removeMatchingHeaders(regex, headers) {
  var lastValue;
  for (var header in headers) {
    if (regex.test(header)) {
      lastValue = headers[header];
      delete headers[header];
    }
  }
  return lastValue;
}

function createErrorType(code, defaultMessage) {
  function CustomError(message) {
    Error.captureStackTrace(this, this.constructor);
    this.message = message || defaultMessage;
  }
  CustomError.prototype = new Error();
  CustomError.prototype.constructor = CustomError;
  CustomError.prototype.name = "Error [" + code + "]";
  CustomError.prototype.code = code;
  return CustomError;
}

function abortRequest(request) {
  for (var e = 0; e < events.length; e++) {
    request.removeListener(events[e], eventHandlers[events[e]]);
  }
  request.on("error", noop$1);
  request.abort();
}

// Exports
var followRedirects = wrap({ http: http__default['default'], https: https__default['default'] });
var wrap_1 = wrap;
followRedirects.wrap = wrap_1;

var _args = [
	[
		"axios@0.21.1",
		"/home/kerim/Masaüstü/upload_app"
	]
];
var _development = true;
var _from = "axios@0.21.1";
var _id = "axios@0.21.1";
var _inBundle = false;
var _integrity = "sha512-dKQiRHxGD9PPRIUNIWvZhPTPpl1rf/OxTYKsqKUDjBwYylTvV7SjSHJb9ratfyzM6wCdLCOYLzs73qpg5c4iGA==";
var _location = "/axios";
var _phantomChildren = {
};
var _requested = {
	type: "version",
	registry: true,
	raw: "axios@0.21.1",
	name: "axios",
	escapedName: "axios",
	rawSpec: "0.21.1",
	saveSpec: null,
	fetchSpec: "0.21.1"
};
var _requiredBy = [
	"#DEV:/"
];
var _resolved = "https://registry.npmjs.org/axios/-/axios-0.21.1.tgz";
var _spec = "0.21.1";
var _where = "/home/kerim/Masaüstü/upload_app";
var author = {
	name: "Matt Zabriskie"
};
var browser = {
	"./lib/adapters/http.js": "./lib/adapters/xhr.js"
};
var bugs = {
	url: "https://github.com/axios/axios/issues"
};
var bundlesize = [
	{
		path: "./dist/axios.min.js",
		threshold: "5kB"
	}
];
var dependencies = {
	"follow-redirects": "^1.10.0"
};
var description = "Promise based HTTP client for the browser and node.js";
var devDependencies = {
	bundlesize: "^0.17.0",
	coveralls: "^3.0.0",
	"es6-promise": "^4.2.4",
	grunt: "^1.0.2",
	"grunt-banner": "^0.6.0",
	"grunt-cli": "^1.2.0",
	"grunt-contrib-clean": "^1.1.0",
	"grunt-contrib-watch": "^1.0.0",
	"grunt-eslint": "^20.1.0",
	"grunt-karma": "^2.0.0",
	"grunt-mocha-test": "^0.13.3",
	"grunt-ts": "^6.0.0-beta.19",
	"grunt-webpack": "^1.0.18",
	"istanbul-instrumenter-loader": "^1.0.0",
	"jasmine-core": "^2.4.1",
	karma: "^1.3.0",
	"karma-chrome-launcher": "^2.2.0",
	"karma-coverage": "^1.1.1",
	"karma-firefox-launcher": "^1.1.0",
	"karma-jasmine": "^1.1.1",
	"karma-jasmine-ajax": "^0.1.13",
	"karma-opera-launcher": "^1.0.0",
	"karma-safari-launcher": "^1.0.0",
	"karma-sauce-launcher": "^1.2.0",
	"karma-sinon": "^1.0.5",
	"karma-sourcemap-loader": "^0.3.7",
	"karma-webpack": "^1.7.0",
	"load-grunt-tasks": "^3.5.2",
	minimist: "^1.2.0",
	mocha: "^5.2.0",
	sinon: "^4.5.0",
	typescript: "^2.8.1",
	"url-search-params": "^0.10.0",
	webpack: "^1.13.1",
	"webpack-dev-server": "^1.14.1"
};
var homepage = "https://github.com/axios/axios";
var jsdelivr = "dist/axios.min.js";
var keywords = [
	"xhr",
	"http",
	"ajax",
	"promise",
	"node"
];
var license = "MIT";
var main = "index.js";
var name = "axios";
var repository = {
	type: "git",
	url: "git+https://github.com/axios/axios.git"
};
var scripts = {
	build: "NODE_ENV=production grunt build",
	coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
	examples: "node ./examples/server.js",
	fix: "eslint --fix lib/**/*.js",
	postversion: "git push && git push --tags",
	preversion: "npm test",
	start: "node ./sandbox/server.js",
	test: "grunt test && bundlesize",
	version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"
};
var typings = "./index.d.ts";
var unpkg = "dist/axios.min.js";
var version = "0.21.1";
var _package = {
	_args: _args,
	_development: _development,
	_from: _from,
	_id: _id,
	_inBundle: _inBundle,
	_integrity: _integrity,
	_location: _location,
	_phantomChildren: _phantomChildren,
	_requested: _requested,
	_requiredBy: _requiredBy,
	_resolved: _resolved,
	_spec: _spec,
	_where: _where,
	author: author,
	browser: browser,
	bugs: bugs,
	bundlesize: bundlesize,
	dependencies: dependencies,
	description: description,
	devDependencies: devDependencies,
	homepage: homepage,
	jsdelivr: jsdelivr,
	keywords: keywords,
	license: license,
	main: main,
	name: name,
	repository: repository,
	scripts: scripts,
	typings: typings,
	unpkg: unpkg,
	version: version
};

var _package$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    _args: _args,
    _development: _development,
    _from: _from,
    _id: _id,
    _inBundle: _inBundle,
    _integrity: _integrity,
    _location: _location,
    _phantomChildren: _phantomChildren,
    _requested: _requested,
    _requiredBy: _requiredBy,
    _resolved: _resolved,
    _spec: _spec,
    _where: _where,
    author: author,
    browser: browser,
    bugs: bugs,
    bundlesize: bundlesize,
    dependencies: dependencies,
    description: description,
    devDependencies: devDependencies,
    homepage: homepage,
    jsdelivr: jsdelivr,
    keywords: keywords,
    license: license,
    main: main,
    name: name,
    repository: repository,
    scripts: scripts,
    typings: typings,
    unpkg: unpkg,
    version: version,
    'default': _package
});

var pkg = getCjsExportFromNamespace(_package$1);

var httpFollow = followRedirects.http;
var httpsFollow = followRedirects.https;






var isHttps = /https:?/;

/**
 *
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} proxy
 * @param {string} location
 */
function setProxy(options, proxy, location) {
  options.hostname = proxy.host;
  options.host = proxy.host;
  options.port = proxy.port;
  options.path = location;

  // Basic proxy authorization
  if (proxy.auth) {
    var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
    options.headers['Proxy-Authorization'] = 'Basic ' + base64;
  }

  // If a proxy is used, any redirects must also pass through the proxy
  options.beforeRedirect = function beforeRedirect(redirection) {
    redirection.headers.host = redirection.host;
    setProxy(redirection, proxy, redirection.href);
  };
}

/*eslint consistent-return:0*/
var http_1 = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var resolve = function resolve(value) {
      resolvePromise(value);
    };
    var reject = function reject(value) {
      rejectPromise(value);
    };
    var data = config.data;
    var headers = config.headers;

    // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/axios/axios/issues/69
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) ; else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var fullPath = buildFullPath(config.baseURL, config.url);
    var parsed = Url__default['default'].parse(fullPath);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = Url__default['default'].parse(proxyUrl);
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });

          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }
            if (proxyElement === '*') {
              return true;
            }
            if (proxyElement[0] === '.' &&
                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }

        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port,
            protocol: parsedProxyUrl.protocol
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https__default['default'] : http__default['default'];
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // uncompress the response body transparently if required
      var stream = res;

      // return the last request in case of redirects
      var lastRequest = res.req || req;


      // if no content, is HEAD request or decompress disabled we should not decompress
      if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
        switch (res.headers['content-encoding']) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'compress':
        case 'deflate':
        // add the unzipper to the body stream processing pipeline
          stream = stream.pipe(zlib__default['default'].createUnzip());

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
        }
      }

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
            stream.destroy();
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString(config.responseEncoding);
            if (!config.responseEncoding || config.responseEncoding === 'utf8') {
              responseData = utils.stripBOM(responseData);
            }
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout) {
      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devoring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
      req.setTimeout(config.timeout, function handleRequestTimeout() {
        req.abort();
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
      });
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(cancel);
      });
    }

    // Send the request
    if (utils.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = http_1;
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults_1 = defaults;

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults_1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
var mergeConfig = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

var Axios_1 = Axios;

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

var Cancel_1 = Cancel;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
var isAxiosError = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios_1.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults_1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios_1;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = Cancel_1;
axios.CancelToken = CancelToken_1;
axios.isCancel = isCancel;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

var axios_1 = axios;

// Allow use of default import syntax in TypeScript
var _default = axios;
axios_1.default = _default;

/* src/routes/upload.svelte generated by Svelte v3.42.1 */

const css$6 = {
	code: ".bg-dark-400.svelte-avkjn8{--tw-bg-opacity:1;background-color:rgba(34, 34, 34, var(--tw-bg-opacity))}.bg-white.svelte-avkjn8{--tw-bg-opacity:1;background-color:rgba(255, 255, 255, var(--tw-bg-opacity))}.bg-dark-900.svelte-avkjn8{--tw-bg-opacity:1;background-color:rgba(15, 15, 15, var(--tw-bg-opacity))}.flex.svelte-avkjn8{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.flex-col.svelte-avkjn8{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column}.items-center.svelte-avkjn8{-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center}.justify-center.svelte-avkjn8{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center}.h-full.svelte-avkjn8{height:100%}.h-32.svelte-avkjn8{height:8rem}.h-2.svelte-avkjn8{height:0.5rem}.h-1.svelte-avkjn8{height:0.25rem}.p-12.svelte-avkjn8{padding:3rem}.p-3.svelte-avkjn8{padding:0.75rem}.text-center.svelte-avkjn8{text-align:center}.text-dark-900.svelte-avkjn8{--tw-text-opacity:1;color:rgba(15, 15, 15, var(--tw-text-opacity))}.text-white.svelte-avkjn8{--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity))}.w-full.svelte-avkjn8{width:100%}.w-102.svelte-avkjn8{width:25.5rem}.gap-6.svelte-avkjn8{grid-gap:1.5rem;gap:1.5rem}",
	map: "{\"version\":3,\"file\":\"upload.svelte\",\"sources\":[\"upload.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\nimport { get } from \\\"svelte/store\\\";\\nimport { feather } from \\\"../lib/stores/feather\\\";\\n\\nimport feathers from \\\"@feathersjs/client\\\";\\nexport async function preload(page, session) {\\n  if (false) {\\n    const client = get(feather);\\n    client.configure(\\n      feathers.authentication({\\n        storage: window.localStorage,\\n      })\\n    );\\n\\n    const categories = await client.service(\\\"uploadthree\\\").find();\\n\\n    const user = await client.reAuthenticate().catch(() => false);\\n\\n    if (user) return { user: user?.user, categories };\\n    else this.redirect(302, \\\"/signin\\\");\\n  }\\n}\\n</script>\\n\\n<script>\\nimport axios from \\\"axios\\\";\\nimport { stores, goto } from \\\"@sapper/app\\\";\\nconst { session } = stores();\\nimport { tick } from \\\"svelte\\\";\\nexport let categories, user;\\n$session = {\\n  user,\\n};\\n\\nlet category,\\n  name,\\n  description,\\n  files,\\n  uploadProgress = false,\\n  uploadPercent = 0;\\n\\nasync function handleUpload(e) {\\n  const form = new FormData();\\n  for (const file of files) {\\n    form.append(\\\"files\\\", file);\\n  }\\n  form.append(\\\"category\\\", category);\\n  form.append(\\\"name\\\", name);\\n  form.append(\\\"description\\\", description);\\n  if (category == \\\"\\\") return alert(\\\"Lütfen kategori seçiniz\\\");\\n  uploadProgress = true;\\n  await axios.post(\\\"upload\\\", form, {\\n    async onUploadProgress(event) {\\n      const { total, loaded } = event;\\n\\n      uploadPercent = (100 * loaded) / total;\\n\\n      if (loaded === total) {\\n        goto(\\\"/\\\");\\n      }\\n    },\\n  });\\n}\\n</script>\\n\\n<div class=\\\"w-full h-full flex justify-center items-center\\\">\\n  <form on:submit|preventDefault=\\\"{handleUpload}\\\" class=\\\"flex flex-col w-102 bg-dark-400 p-12 gap-6\\\">\\n    <select name=\\\"\\\" id=\\\"\\\" class=\\\"w-full bg-white p-3 text-dark-900\\\" bind:value=\\\"{category}\\\" required>\\n      <option value=\\\"\\\">Kategori seçiniz</option>\\n      {#each categories?.data || [] as category}\\n        <option value=\\\"{category.text}\\\">{category.text}</option>\\n      {/each}\\n    </select>\\n    <input type=\\\"text\\\" class=\\\"w-full bg-white p-3 text-dark-900\\\" placeholder=\\\"Dosya adız\\\" bind:value=\\\"{name}\\\" required />\\n    <textarea name=\\\"\\\" class=\\\"w-full bg-white p-3 h-32 text-dark-900\\\" id=\\\"\\\" cols=\\\"30\\\" rows=\\\"10\\\" placeholder=\\\"Açıklama\\\" bind:value=\\\"{description}\\\" required></textarea>\\n\\n    {#if !uploadProgress}\\n      <input type=\\\"file\\\" bind:files class=\\\"text-white\\\" />\\n      {#if files?.[0]}\\n        <p>\\n          {files[0].name}\\n        </p>\\n      {/if}\\n      <button type=\\\"submit\\\">Yukle</button>\\n    {:else}\\n      <div class=\\\"w-full bg-dark-900 h-2 flex items-center\\\">\\n        <div class=\\\"bg-white h-1\\\" style=\\\"width:{uploadPercent.toFixed(3)}%;\\\"></div>\\n      </div>\\n\\n      <div class=\\\"w-full text-center text-white\\\">{uploadPercent.toFixed(2)}%</div>\\n    {/if}\\n  </form>\\n</div>\\n\\n<style windi:inject>\\n.bg-dark-400 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(34, 34, 34, var(--tw-bg-opacity));\\n}\\n.bg-white {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));\\n}\\n.bg-dark-900 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(15, 15, 15, var(--tw-bg-opacity));\\n}\\n.flex {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: -webkit-flex;\\n  display: flex;\\n}\\n.flex-col {\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n  -ms-flex-direction: column;\\n  -webkit-flex-direction: column;\\n  flex-direction: column;\\n}\\n.items-center {\\n  -webkit-box-align: center;\\n  -ms-flex-align: center;\\n  -webkit-align-items: center;\\n  align-items: center;\\n}\\n.justify-center {\\n  -webkit-box-pack: center;\\n  -ms-flex-pack: center;\\n  -webkit-justify-content: center;\\n  justify-content: center;\\n}\\n.h-full {\\n  height: 100%;\\n}\\n.h-32 {\\n  height: 8rem;\\n}\\n.h-2 {\\n  height: 0.5rem;\\n}\\n.h-1 {\\n  height: 0.25rem;\\n}\\n.p-12 {\\n  padding: 3rem;\\n}\\n.p-3 {\\n  padding: 0.75rem;\\n}\\n.text-center {\\n  text-align: center;\\n}\\n.text-dark-900 {\\n  --tw-text-opacity: 1;\\n  color: rgba(15, 15, 15, var(--tw-text-opacity));\\n}\\n.text-white {\\n  --tw-text-opacity: 1;\\n  color: rgba(255, 255, 255, var(--tw-text-opacity));\\n}\\n.w-full {\\n  width: 100%;\\n}\\n.w-102 {\\n  width: 25.5rem;\\n}\\n.gap-6 {\\n  grid-gap: 1.5rem;\\n  gap: 1.5rem;\\n}\\n</style>\"],\"names\":[],\"mappings\":\"AA+FA,YAAY,cAAC,CAAC,AACZ,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,AAC1D,CAAC,AACD,SAAS,cAAC,CAAC,AACT,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,AAC7D,CAAC,AACD,YAAY,cAAC,CAAC,AACZ,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,AAC1D,CAAC,AACD,KAAK,cAAC,CAAC,AACL,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,YAAY,CACrB,OAAO,CAAE,IAAI,AACf,CAAC,AACD,SAAS,cAAC,CAAC,AACT,kBAAkB,CAAE,QAAQ,CAC5B,qBAAqB,CAAE,MAAM,CAC7B,kBAAkB,CAAE,MAAM,CAC1B,sBAAsB,CAAE,MAAM,CAC9B,cAAc,CAAE,MAAM,AACxB,CAAC,AACD,aAAa,cAAC,CAAC,AACb,iBAAiB,CAAE,MAAM,CACzB,cAAc,CAAE,MAAM,CACtB,mBAAmB,CAAE,MAAM,CAC3B,WAAW,CAAE,MAAM,AACrB,CAAC,AACD,eAAe,cAAC,CAAC,AACf,gBAAgB,CAAE,MAAM,CACxB,aAAa,CAAE,MAAM,CACrB,uBAAuB,CAAE,MAAM,CAC/B,eAAe,CAAE,MAAM,AACzB,CAAC,AACD,OAAO,cAAC,CAAC,AACP,MAAM,CAAE,IAAI,AACd,CAAC,AACD,KAAK,cAAC,CAAC,AACL,MAAM,CAAE,IAAI,AACd,CAAC,AACD,IAAI,cAAC,CAAC,AACJ,MAAM,CAAE,MAAM,AAChB,CAAC,AACD,IAAI,cAAC,CAAC,AACJ,MAAM,CAAE,OAAO,AACjB,CAAC,AACD,KAAK,cAAC,CAAC,AACL,OAAO,CAAE,IAAI,AACf,CAAC,AACD,IAAI,cAAC,CAAC,AACJ,OAAO,CAAE,OAAO,AAClB,CAAC,AACD,YAAY,cAAC,CAAC,AACZ,UAAU,CAAE,MAAM,AACpB,CAAC,AACD,cAAc,cAAC,CAAC,AACd,iBAAiB,CAAE,CAAC,CACpB,KAAK,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,iBAAiB,CAAC,CAAC,AACjD,CAAC,AACD,WAAW,cAAC,CAAC,AACX,iBAAiB,CAAE,CAAC,CACpB,KAAK,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,iBAAiB,CAAC,CAAC,AACpD,CAAC,AACD,OAAO,cAAC,CAAC,AACP,KAAK,CAAE,IAAI,AACb,CAAC,AACD,MAAM,cAAC,CAAC,AACN,KAAK,CAAE,OAAO,AAChB,CAAC,AACD,MAAM,cAAC,CAAC,AACN,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,MAAM,AACb,CAAC\"}"
};

async function preload$3(page, session) {
}

const Upload = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $session, $$unsubscribe_session;
	const { session } = stores$1();
	validate_store(session, 'session');
	$$unsubscribe_session = subscribe(session, value => $session = value);
	let { categories, user } = $$props;
	set_store_value(session, $session = { user }, $session);
	let name, files;

	if ($$props.categories === void 0 && $$bindings.categories && categories !== void 0) $$bindings.categories(categories);
	if ($$props.user === void 0 && $$bindings.user && user !== void 0) $$bindings.user(user);
	$$result.css.add(css$6);
	$$unsubscribe_session();

	return `<div class="${"w-full h-full flex justify-center items-center svelte-avkjn8"}"><form class="${"flex flex-col w-102 bg-dark-400 p-12 gap-6 svelte-avkjn8"}"><select name="${""}" id="${""}" class="${"w-full bg-white p-3 text-dark-900 svelte-avkjn8"}" required><option value="${""}">Kategori seçiniz</option>${each(categories?.data || [], category => `<option${add_attribute("value", category.text, 0)}>${escape(category.text)}</option>`)}</select>
    <input type="${"text"}" class="${"w-full bg-white p-3 text-dark-900 svelte-avkjn8"}" placeholder="${"Dosya adız"}" required${add_attribute("value", name, 0)}>
    <textarea name="${""}" class="${"w-full bg-white p-3 h-32 text-dark-900 svelte-avkjn8"}" id="${""}" cols="${"30"}" rows="${"10"}" placeholder="${"Açıklama"}" required>${""}</textarea>

    ${`<input type="${"file"}" class="${"text-white svelte-avkjn8"}">
      ${(files?.[0]) ? `<p>${escape(files[0].name)}</p>` : ``}
      <button type="${"submit"}">Yukle</button>`
	}</form>
</div>`;
});

var component_3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Upload,
    preload: preload$3
});

/* src/routes/panel/_layout.svelte generated by Svelte v3.42.1 */

const css$5 = {
	code: "aside.svelte-1yzwhdn:hover nav ul li a i.svelte-1yzwhdn{width:1.5rem}[arria-current].svelte-1yzwhdn.svelte-1yzwhdn{--tw-bg-opacity:1;background-color:rgba(190, 18, 60, var(--tw-bg-opacity));--tw-text-opacity:1;color:rgba(243, 244, 246, var(--tw-text-opacity))}.bg-rose-500.svelte-1yzwhdn.svelte-1yzwhdn{--tw-bg-opacity:1;background-color:rgba(244, 63, 94, var(--tw-bg-opacity))}.hover\\:bg-rose-800.svelte-1yzwhdn.svelte-1yzwhdn:hover{--tw-bg-opacity:1;background-color:rgba(159, 18, 57, var(--tw-bg-opacity))}.block.svelte-1yzwhdn.svelte-1yzwhdn{display:block}.flex.svelte-1yzwhdn.svelte-1yzwhdn{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.flex-col.svelte-1yzwhdn.svelte-1yzwhdn{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column}.items-center.svelte-1yzwhdn.svelte-1yzwhdn{-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center}.justify-center.svelte-1yzwhdn.svelte-1yzwhdn{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center}.flex-1.svelte-1yzwhdn.svelte-1yzwhdn{-webkit-box-flex:1;-ms-flex:1 1 0%;-webkit-flex:1 1 0%;flex:1 1 0%}.h-full.svelte-1yzwhdn.svelte-1yzwhdn{height:100%}.p-3.svelte-1yzwhdn.svelte-1yzwhdn{padding:0.75rem}.fixed.svelte-1yzwhdn.svelte-1yzwhdn{position:fixed}.shadow.svelte-1yzwhdn.svelte-1yzwhdn{--tw-shadow-color:0, 0, 0;--tw-shadow:0 1px 3px 0 rgba(var(--tw-shadow-color), 0.1), 0 1px 2px 0 rgba(var(--tw-shadow-color), 0.06);-webkit-box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.shadow-xl.svelte-1yzwhdn.svelte-1yzwhdn{--tw-shadow-color:0, 0, 0;--tw-shadow:0 20px 25px -5px rgba(var(--tw-shadow-color), 0.1), 0 10px 10px -5px rgba(var(--tw-shadow-color), 0.04);-webkit-box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.shadow-dark-900.svelte-1yzwhdn.svelte-1yzwhdn{--tw-shadow-color:15, 15, 15}.hover\\:text-white.svelte-1yzwhdn.svelte-1yzwhdn:hover{--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity))}.select-none.svelte-1yzwhdn.svelte-1yzwhdn{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.w-full.svelte-1yzwhdn.svelte-1yzwhdn{width:100%}.w-8.svelte-1yzwhdn.svelte-1yzwhdn{width:2rem}.w-22.svelte-1yzwhdn.svelte-1yzwhdn{width:5.5rem}.hover\\:w-62.svelte-1yzwhdn.svelte-1yzwhdn:hover{width:15.5rem}.w-\\[calc\\(100\\%_-_0\\.5rem\\)\\].svelte-1yzwhdn.svelte-1yzwhdn{width:calc(100% - 0.5rem)}.transition-colors.svelte-1yzwhdn.svelte-1yzwhdn{-webkit-transition-property:background-color, border-color, color, fill, stroke;-o-transition-property:background-color, border-color, color, fill, stroke;transition-property:background-color, border-color, color, fill, stroke;-webkit-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-o-transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transition-duration:150ms;-o-transition-duration:150ms;transition-duration:150ms}.duration-75.svelte-1yzwhdn.svelte-1yzwhdn{-webkit-transition-duration:75ms;-o-transition-duration:75ms;transition-duration:75ms}.duration-200.svelte-1yzwhdn.svelte-1yzwhdn{-webkit-transition-duration:200ms;-o-transition-duration:200ms;transition-duration:200ms}.drop-shadow-md.svelte-1yzwhdn.svelte-1yzwhdn{--tw-drop-shadow:drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06))}",
	map: "{\"version\":3,\"file\":\"_layout.svelte\",\"sources\":[\"_layout.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\nimport { get } from \\\"svelte/store\\\";\\nimport { feather } from \\\"../../lib/stores/feather\\\";\\n\\nimport feathers from \\\"@feathersjs/client\\\";\\nexport async function preload(page, session) {\\n  if (false) {\\n    const users = await get(feather).service(\\\"users\\\").find();\\n    const createAdmin = users.total === 0 ? true : false;\\n\\n    get(feather).configure(\\n      feathers.authentication({\\n        storage: window.localStorage,\\n      })\\n    );\\n    const client = get(feather);\\n    if (createAdmin) return this.redirect(302, \\\"/create_admin\\\");\\n\\n    const user = await client.reAuthenticate().catch(() => false);\\n    if (user) return { user: user?.user };\\n    else this.redirect(302, \\\"/signin\\\");\\n  }\\n}\\n</script>\\n\\n<script>\\nimport { stores } from \\\"@sapper/app\\\";\\nconst { session } = stores();\\nimport { fade } from \\\"svelte/transition\\\";\\nexport let segment, user;\\n\\n$session = {\\n  user,\\n};\\n$: navItems = [\\n  {\\n    icon: \\\"fa fa-upload\\\",\\n    text: \\\"Yüklenenler\\\",\\n    path: \\\"/panel/\\\",\\n    curent: segment === undefined ? \\\"page\\\" : undefined,\\n  },\\n  {\\n    icon: \\\"fas fa-folder\\\",\\n    text: \\\"Katagoriler\\\",\\n    path: \\\"/panel/tree\\\",\\n    curent: segment === \\\"tree\\\" ? \\\"page\\\" : undefined,\\n  },\\n];\\n\\nlet navHover = false;\\n</script>\\n\\n<div class=\\\"w-full h-full flex  select-none\\\">\\n  <aside class=\\\"\\\">\\n    <nav on:mouseenter=\\\"{() => setTimeout(() => (navHover = true), 200)}\\\" on:mouseleave=\\\"{() => (navHover = false)}\\\" class=\\\"h-full w-22\\\">\\n      <ul class=\\\"flex flex-col h-full  w-22 hover:w-62  items-center justify-center fixed  duration-75               bg-rose-500 shadow shadow-xl shadow-dark-900 drop-shadow-md\\\">\\n        {#each navItems as navItem}\\n          <li arria-current=\\\"{navItem.curent}\\\" class=\\\"w-[calc(100%_-_0.5rem)]  duration-200 transition-colors hover:text-white hover:bg-rose-800\\\">\\n            <a href=\\\"{navItem.path}\\\" class=\\\"block w-full h-full p-3\\\">\\n              <i class=\\\" w-8  {navItem.icon}\\\"></i>\\n              {#if navHover}\\n                <span in:fade=\\\"{{ duration: 200, delay: 50 }}\\\" out:fade=\\\"{{ duration: 0, delay: 0 }}\\\">\\n                  {navItem.text}\\n                </span>\\n              {/if}\\n            </a>\\n          </li>\\n        {/each}\\n      </ul>\\n    </nav>\\n  </aside>\\n  <div class=\\\"w-full flex flex-col \\\">\\n    <div class=\\\"flex-1\\\">\\n      <slot />\\n    </div>\\n  </div>\\n</div>\\n\\n<style windi:inject>\\naside:hover nav ul li a i {\\n  width: 1.5rem;\\n}\\n[arria-current] {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(190, 18, 60, var(--tw-bg-opacity));\\n  --tw-text-opacity: 1;\\n  color: rgba(243, 244, 246, var(--tw-text-opacity));\\n}\\n.bg-rose-500 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(244, 63, 94, var(--tw-bg-opacity));\\n}\\n.hover\\\\:bg-rose-800:hover {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(159, 18, 57, var(--tw-bg-opacity));\\n}\\n.block {\\n  display: block;\\n}\\n.flex {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: -webkit-flex;\\n  display: flex;\\n}\\n.flex-col {\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n  -ms-flex-direction: column;\\n  -webkit-flex-direction: column;\\n  flex-direction: column;\\n}\\n.items-center {\\n  -webkit-box-align: center;\\n  -ms-flex-align: center;\\n  -webkit-align-items: center;\\n  align-items: center;\\n}\\n.justify-center {\\n  -webkit-box-pack: center;\\n  -ms-flex-pack: center;\\n  -webkit-justify-content: center;\\n  justify-content: center;\\n}\\n.flex-1 {\\n  -webkit-box-flex: 1;\\n  -ms-flex: 1 1 0%;\\n  -webkit-flex: 1 1 0%;\\n  flex: 1 1 0%;\\n}\\n.h-full {\\n  height: 100%;\\n}\\n.p-3 {\\n  padding: 0.75rem;\\n}\\n.fixed {\\n  position: fixed;\\n}\\n.shadow {\\n  --tw-shadow-color: 0, 0, 0;\\n  --tw-shadow: 0 1px 3px 0 rgba(var(--tw-shadow-color), 0.1), 0 1px 2px 0 rgba(var(--tw-shadow-color), 0.06);\\n  -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\\n}\\n.shadow-xl {\\n  --tw-shadow-color: 0, 0, 0;\\n  --tw-shadow: 0 20px 25px -5px rgba(var(--tw-shadow-color), 0.1), 0 10px 10px -5px rgba(var(--tw-shadow-color), 0.04);\\n  -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\\n}\\n.shadow-dark-900 {\\n  --tw-shadow-color: 15, 15, 15;\\n}\\n.hover\\\\:text-white:hover {\\n  --tw-text-opacity: 1;\\n  color: rgba(255, 255, 255, var(--tw-text-opacity));\\n}\\n.select-none {\\n  -webkit-user-select: none;\\n  -moz-user-select: none;\\n  -ms-user-select: none;\\n  user-select: none;\\n}\\n.w-full {\\n  width: 100%;\\n}\\n.w-8 {\\n  width: 2rem;\\n}\\n.w-22 {\\n  width: 5.5rem;\\n}\\n.hover\\\\:w-62:hover {\\n  width: 15.5rem;\\n}\\n.w-\\\\[calc\\\\(100\\\\%_-_0\\\\.5rem\\\\)\\\\] {\\n  width: calc(100% - 0.5rem);\\n}\\n.transition-colors {\\n  -webkit-transition-property: background-color, border-color, color, fill, stroke;\\n  -o-transition-property: background-color, border-color, color, fill, stroke;\\n  transition-property: background-color, border-color, color, fill, stroke;\\n  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\\n  -o-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\\n  -webkit-transition-duration: 150ms;\\n  -o-transition-duration: 150ms;\\n  transition-duration: 150ms;\\n}\\n.duration-75 {\\n  -webkit-transition-duration: 75ms;\\n  -o-transition-duration: 75ms;\\n  transition-duration: 75ms;\\n}\\n.duration-200 {\\n  -webkit-transition-duration: 200ms;\\n  -o-transition-duration: 200ms;\\n  transition-duration: 200ms;\\n}\\n.drop-shadow-md {\\n  --tw-drop-shadow: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06));\\n}\\n</style>\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

async function preload$2(page, session) {
}

const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let navItems;
	let $session, $$unsubscribe_session;
	const { session } = stores$1();
	validate_store(session, 'session');
	$$unsubscribe_session = subscribe(session, value => $session = value);
	let { segment, user } = $$props;
	set_store_value(session, $session = { user }, $session);
	if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0) $$bindings.segment(segment);
	if ($$props.user === void 0 && $$bindings.user && user !== void 0) $$bindings.user(user);
	$$result.css.add(css$5);

	navItems = [
		{
			icon: "fa fa-upload",
			text: "Yüklenenler",
			path: "/panel/",
			curent: segment === undefined ? "page" : undefined
		},
		{
			icon: "fas fa-folder",
			text: "Katagoriler",
			path: "/panel/tree",
			curent: segment === "tree" ? "page" : undefined
		}
	];

	$$unsubscribe_session();

	return `<div class="${"w-full h-full flex  select-none svelte-1yzwhdn"}"><aside class="${" svelte-1yzwhdn"}"><nav class="${"h-full w-22 svelte-1yzwhdn"}"><ul class="${"flex flex-col h-full  w-22 hover:w-62  items-center justify-center fixed  duration-75               bg-rose-500 shadow shadow-xl shadow-dark-900 drop-shadow-md svelte-1yzwhdn"}">${each(navItems, navItem => `<li${add_attribute("arria-current", navItem.curent, 0)} class="${"w-[calc(100%_-_0.5rem)]  duration-200 transition-colors hover:text-white hover:bg-rose-800 svelte-1yzwhdn"}"><a${add_attribute("href", navItem.path, 0)} class="${"block w-full h-full p-3 svelte-1yzwhdn"}"><i class="${" w-8  " + escape(navItem.icon) + " svelte-1yzwhdn"}"></i>
              ${``}</a>
          </li>`)}</ul></nav></aside>
  <div class="${"w-full flex flex-col  svelte-1yzwhdn"}"><div class="${"flex-1 svelte-1yzwhdn"}">${slots.default ? slots.default({}) : ``}</div></div>
</div>`;
});

var component_4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Layout,
    preload: preload$2
});

/* src/lib/components/panel/deleteModal.svelte generated by Svelte v3.42.1 */

const css$4 = {
	code: ".bg-rose-500.svelte-m6zieu{--tw-bg-opacity:1;background-color:rgba(244, 63, 94, var(--tw-bg-opacity))}.bg-rose-700.svelte-m6zieu{--tw-bg-opacity:1;background-color:rgba(190, 18, 60, var(--tw-bg-opacity))}.bg-dark-400.svelte-m6zieu{--tw-bg-opacity:1;background-color:rgba(34, 34, 34, var(--tw-bg-opacity))}.flex.svelte-m6zieu{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.flex-col.svelte-m6zieu{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column}.items-center.svelte-m6zieu{-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center}.justify-center.svelte-m6zieu{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center}.h-6.svelte-m6zieu{height:1.5rem}.p-12.svelte-m6zieu{padding:3rem}.p-3.svelte-m6zieu{padding:0.75rem}.px-6.svelte-m6zieu{padding-left:1.5rem;padding-right:1.5rem}.text-center.svelte-m6zieu{text-align:center}.text-white.svelte-m6zieu{--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity))}.w-6.svelte-m6zieu{width:1.5rem}.w-122.svelte-m6zieu{width:30.5rem}.gap-6.svelte-m6zieu{grid-gap:1.5rem;gap:1.5rem}",
	map: "{\"version\":3,\"file\":\"deleteModal.svelte\",\"sources\":[\"deleteModal.svelte\"],\"sourcesContent\":[\"<script>\\nimport { feather } from \\\"../../stores/feather\\\";\\nimport { stores } from \\\"@sapper/app\\\";\\nexport let show, data;\\n\\nasync function handleDeleteFile() {\\n  const deleted = await $feather.service(\\\"file\\\").remove(data);\\n\\n  show = false;\\n}\\n</script>\\n\\n<div class=\\\"w-122 bg-rose-500 flex flex-col p-12  justify-center gap-6\\\">\\n  <span class=\\\"w-6 h-6 flex items-center justify-center text-white  bg-rose-700\\\" on:click=\\\"{() => (show = false)}\\\">x</span>\\n\\n  <h2>{data.name}</h2>\\n  <p>{data.describtion}</p>\\n\\n  <span class=\\\"p-3 px-6 bg-dark-400 text-white text-center\\\" on:click=\\\"{handleDeleteFile}\\\">Sil</span>\\n</div>\\n\\n<style windi:inject>\\n.bg-rose-500 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(244, 63, 94, var(--tw-bg-opacity));\\n}\\n.bg-rose-700 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(190, 18, 60, var(--tw-bg-opacity));\\n}\\n.bg-dark-400 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(34, 34, 34, var(--tw-bg-opacity));\\n}\\n.flex {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: -webkit-flex;\\n  display: flex;\\n}\\n.flex-col {\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n  -ms-flex-direction: column;\\n  -webkit-flex-direction: column;\\n  flex-direction: column;\\n}\\n.items-center {\\n  -webkit-box-align: center;\\n  -ms-flex-align: center;\\n  -webkit-align-items: center;\\n  align-items: center;\\n}\\n.justify-center {\\n  -webkit-box-pack: center;\\n  -ms-flex-pack: center;\\n  -webkit-justify-content: center;\\n  justify-content: center;\\n}\\n.h-6 {\\n  height: 1.5rem;\\n}\\n.p-12 {\\n  padding: 3rem;\\n}\\n.p-3 {\\n  padding: 0.75rem;\\n}\\n.px-6 {\\n  padding-left: 1.5rem;\\n  padding-right: 1.5rem;\\n}\\n.text-center {\\n  text-align: center;\\n}\\n.text-white {\\n  --tw-text-opacity: 1;\\n  color: rgba(255, 255, 255, var(--tw-text-opacity));\\n}\\n.w-6 {\\n  width: 1.5rem;\\n}\\n.w-122 {\\n  width: 30.5rem;\\n}\\n.gap-6 {\\n  grid-gap: 1.5rem;\\n  gap: 1.5rem;\\n}\\n</style>\"],\"names\":[],\"mappings\":\"AAsBA,YAAY,cAAC,CAAC,AACZ,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,AAC3D,CAAC,AACD,YAAY,cAAC,CAAC,AACZ,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,AAC3D,CAAC,AACD,YAAY,cAAC,CAAC,AACZ,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,AAC1D,CAAC,AACD,KAAK,cAAC,CAAC,AACL,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,YAAY,CACrB,OAAO,CAAE,IAAI,AACf,CAAC,AACD,SAAS,cAAC,CAAC,AACT,kBAAkB,CAAE,QAAQ,CAC5B,qBAAqB,CAAE,MAAM,CAC7B,kBAAkB,CAAE,MAAM,CAC1B,sBAAsB,CAAE,MAAM,CAC9B,cAAc,CAAE,MAAM,AACxB,CAAC,AACD,aAAa,cAAC,CAAC,AACb,iBAAiB,CAAE,MAAM,CACzB,cAAc,CAAE,MAAM,CACtB,mBAAmB,CAAE,MAAM,CAC3B,WAAW,CAAE,MAAM,AACrB,CAAC,AACD,eAAe,cAAC,CAAC,AACf,gBAAgB,CAAE,MAAM,CACxB,aAAa,CAAE,MAAM,CACrB,uBAAuB,CAAE,MAAM,CAC/B,eAAe,CAAE,MAAM,AACzB,CAAC,AACD,IAAI,cAAC,CAAC,AACJ,MAAM,CAAE,MAAM,AAChB,CAAC,AACD,KAAK,cAAC,CAAC,AACL,OAAO,CAAE,IAAI,AACf,CAAC,AACD,IAAI,cAAC,CAAC,AACJ,OAAO,CAAE,OAAO,AAClB,CAAC,AACD,KAAK,cAAC,CAAC,AACL,YAAY,CAAE,MAAM,CACpB,aAAa,CAAE,MAAM,AACvB,CAAC,AACD,YAAY,cAAC,CAAC,AACZ,UAAU,CAAE,MAAM,AACpB,CAAC,AACD,WAAW,cAAC,CAAC,AACX,iBAAiB,CAAE,CAAC,CACpB,KAAK,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,iBAAiB,CAAC,CAAC,AACpD,CAAC,AACD,IAAI,cAAC,CAAC,AACJ,KAAK,CAAE,MAAM,AACf,CAAC,AACD,MAAM,cAAC,CAAC,AACN,KAAK,CAAE,OAAO,AAChB,CAAC,AACD,MAAM,cAAC,CAAC,AACN,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,MAAM,AACb,CAAC\"}"
};

const DeleteModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$unsubscribe_feather;
	validate_store(feather, 'feather');
	$$unsubscribe_feather = subscribe(feather, value => value);
	let { show, data } = $$props;

	if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	$$result.css.add(css$4);
	$$unsubscribe_feather();

	return `<div class="${"w-122 bg-rose-500 flex flex-col p-12  justify-center gap-6 svelte-m6zieu"}"><span class="${"w-6 h-6 flex items-center justify-center text-white  bg-rose-700 svelte-m6zieu"}">x</span>

  <h2>${escape(data.name)}</h2>
  <p>${escape(data.describtion)}</p>

  <span class="${"p-3 px-6 bg-dark-400 text-white text-center svelte-m6zieu"}">Sil</span>
</div>`;
});

/* src/routes/panel/index.svelte generated by Svelte v3.42.1 */

const css$3 = {
	code: ".bg-dark-400.svelte-osabo4{--tw-bg-opacity:1;background-color:rgba(34, 34, 34, var(--tw-bg-opacity))}.bg-dark-700.svelte-osabo4{--tw-bg-opacity:1;background-color:rgba(27, 27, 27, var(--tw-bg-opacity))}.bg-dark-200.svelte-osabo4{--tw-bg-opacity:1;background-color:rgba(50, 50, 50, var(--tw-bg-opacity))}.hover\\:bg-rose-500.svelte-osabo4:hover{--tw-bg-opacity:1;background-color:rgba(244, 63, 94, var(--tw-bg-opacity))}.bg-dark-500.svelte-osabo4{--tw-bg-opacity:1;background-color:rgba(31, 31, 31, var(--tw-bg-opacity))}.bg-rose-500.svelte-osabo4{--tw-bg-opacity:1;background-color:rgba(244, 63, 94, var(--tw-bg-opacity))}.hover\\:bg-rose-600.svelte-osabo4:hover{--tw-bg-opacity:1;background-color:rgba(225, 29, 72, var(--tw-bg-opacity))}.bg-rose-600.svelte-osabo4{--tw-bg-opacity:1;background-color:rgba(225, 29, 72, var(--tw-bg-opacity))}.rounded-xl.svelte-osabo4{border-radius:0.75rem}.rounded-t-xl.svelte-osabo4{border-top-left-radius:0.75rem;border-top-right-radius:0.75rem}.cursor-pointer.svelte-osabo4{cursor:pointer}.block.svelte-osabo4{display:block}.flex.svelte-osabo4{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.flex-col.svelte-osabo4{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column}.items-center.svelte-osabo4{-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center}.justify-center.svelte-osabo4{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center}.float-left.svelte-osabo4{float:left}.font-bold.svelte-osabo4{font-weight:700}.h-full.svelte-osabo4{height:100%}.h-20.svelte-osabo4{height:5rem}.h-4.svelte-osabo4{height:1rem}.m-3.svelte-osabo4{margin:0.75rem}.mt-6.svelte-osabo4{margin-top:1.5rem}.overflow-hidden.svelte-osabo4{overflow:hidden}.p-3.svelte-osabo4{padding:0.75rem}.p-2.svelte-osabo4{padding:0.5rem}.py-2.svelte-osabo4{padding-top:0.5rem;padding-bottom:0.5rem}.absolute.svelte-osabo4{position:absolute}.relative.svelte-osabo4{position:relative}.-top-4.svelte-osabo4{top:-1rem}.right-5.svelte-osabo4{right:1.25rem}.shadow.svelte-osabo4{--tw-shadow-color:0, 0, 0;--tw-shadow:0 1px 3px 0 rgba(var(--tw-shadow-color), 0.1), 0 1px 2px 0 rgba(var(--tw-shadow-color), 0.06);-webkit-box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.shadow-md.svelte-osabo4{--tw-shadow-color:0, 0, 0;--tw-shadow:0 4px 6px -1px rgba(var(--tw-shadow-color), 0.1), 0 2px 4px -1px rgba(var(--tw-shadow-color), 0.06);-webkit-box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.shadow-rose-400.svelte-osabo4{--tw-shadow-color:251, 113, 133}.text-center.svelte-osabo4{text-align:center}.text-white.svelte-osabo4{--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity))}.uppercase.svelte-osabo4{text-transform:uppercase}.w-full.svelte-osabo4{width:100%}.w-52.svelte-osabo4{width:13rem}.w-3\\/5.svelte-osabo4{width:60%}.w-42.svelte-osabo4{width:10.5rem}.gap-2.svelte-osabo4{grid-gap:0.5rem;gap:0.5rem}.duration-500.svelte-osabo4{-webkit-transition-duration:500ms;-o-transition-duration:500ms;transition-duration:500ms}.duration-150.svelte-osabo4{-webkit-transition-duration:150ms;-o-transition-duration:150ms;transition-duration:150ms}",
	map: "{\"version\":3,\"file\":\"index.svelte\",\"sources\":[\"index.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\nimport { get } from \\\"svelte/store\\\";\\nimport { feather } from \\\"../../lib/stores/feather\\\";\\nimport feathers from \\\"@feathersjs/client\\\";\\n\\nexport async function preload() {\\n  if (false) {\\n    const client = get(feather);\\n    client.configure(\\n      feathers.authentication({\\n        storage: window.localStorage,\\n      })\\n    );\\n\\n    const categories = await client.service(\\\"uploadthree\\\").find();\\n    const files = await client.service(\\\"file\\\").find();\\n    const user = await client.reAuthenticate().catch(() => false);\\n\\n    return { user: user?.user, categories, files };\\n  }\\n}\\n</script>\\n\\n<script>\\nimport { onMount } from \\\"svelte\\\";\\nimport Modal from \\\"../../lib/components/modal.svelte\\\";\\nimport DeleteModal from \\\"../../lib/components/panel/deleteModal.svelte\\\";\\nimport { stores } from \\\"@sapper/app\\\";\\nconst { session } = stores();\\n\\nexport let user, categories, files;\\nexport let showModal = false;\\n$session = {\\n  user,\\n};\\n\\nlet filter = \\\"\\\",\\n  file;\\n\\nasync function handleCategorySelect(category) {\\n  filter = category;\\n}\\n\\nfunction handleShowModal(data) {\\n  file = data;\\n  showModal = true;\\n}\\n\\nonMount(async () => {\\n  const categoryService = $feather.service(\\\"uploadthree\\\");\\n  const fileService = $feather.service(\\\"file\\\");\\n\\n  [\\\"created\\\", \\\"removed\\\"].forEach((event) => {\\n    categoryService.on(event, async () => {\\n      categories = await categoryService.find();\\n    });\\n\\n    fileService.on(event, async () => {\\n      files = await fileService.find();\\n    });\\n  });\\n});\\n</script>\\n\\n<div class=\\\" w-full h-full\\\">\\n  <div class=\\\" flex h-full  \\\">\\n    <div class=\\\"w-52 h-full bg-dark-400 \\\">\\n      <ul class=\\\"flex flex-col gap-2 text-white p-3\\\">\\n        <li on:click=\\\"{() => handleCategorySelect('')}\\\" class=\\\"p-2 {filter == '' ? 'bg-dark-700' : 'bg-dark-200'}  hover:bg-rose-500 duration-500\\\">Tümü</li>\\n        {#each categories?.data || [] as category}\\n          <li on:click=\\\"{() => handleCategorySelect(category.text)}\\\" class=\\\"p-2 {filter == category.text ? 'bg-dark-700' : 'bg-dark-200'}  hover:bg-rose-500 duration-500\\\">{category.text}</li>\\n        {/each}\\n      </ul>\\n    </div>\\n\\n    <div class=\\\"bg-dark-500 w-full\\\">\\n      {#each filter !== \\\"\\\" ? (files?.data || []).filter((x) => x.category == filter) : files?.data || [] as file}\\n        <div class=\\\"bg-rose-500 hover:bg-rose-600 duration-150 float-left w-42 h-20 m-3 rounded-xl relative mt-6 flex flex-col justify-center items-center shadow shadow-md shadow-rose-400 cursor-pointer\\\">\\n          <div class=\\\"absolute bg-rose-600 w-3/5 h-4 rounded-t-xl -top-4 right-5 shadow shadow-md shadow-rose-400\\\"></div>\\n          <span on:click=\\\"{() => handleShowModal(file)}\\\" class=\\\"text-white uppercase font-bold text-center block h-full w-full overflow-hidden py-2 flex items-center justify-center\\\">{file.name}</span>\\n        </div>\\n      {/each}\\n    </div>\\n  </div>\\n</div>\\n\\n<Modal bind:show=\\\"{showModal}\\\" data=\\\"{file}\\\" component=\\\"{DeleteModal}\\\" />\\n\\n<style windi:inject>\\n.bg-dark-400 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(34, 34, 34, var(--tw-bg-opacity));\\n}\\n.bg-dark-700 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(27, 27, 27, var(--tw-bg-opacity));\\n}\\n.bg-dark-200 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(50, 50, 50, var(--tw-bg-opacity));\\n}\\n.hover\\\\:bg-rose-500:hover {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(244, 63, 94, var(--tw-bg-opacity));\\n}\\n.bg-dark-500 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(31, 31, 31, var(--tw-bg-opacity));\\n}\\n.bg-rose-500 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(244, 63, 94, var(--tw-bg-opacity));\\n}\\n.hover\\\\:bg-rose-600:hover {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(225, 29, 72, var(--tw-bg-opacity));\\n}\\n.bg-rose-600 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(225, 29, 72, var(--tw-bg-opacity));\\n}\\n.rounded-xl {\\n  border-radius: 0.75rem;\\n}\\n.rounded-t-xl {\\n  border-top-left-radius: 0.75rem;\\n  border-top-right-radius: 0.75rem;\\n}\\n.cursor-pointer {\\n  cursor: pointer;\\n}\\n.block {\\n  display: block;\\n}\\n.flex {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: -webkit-flex;\\n  display: flex;\\n}\\n.flex-col {\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n  -ms-flex-direction: column;\\n  -webkit-flex-direction: column;\\n  flex-direction: column;\\n}\\n.items-center {\\n  -webkit-box-align: center;\\n  -ms-flex-align: center;\\n  -webkit-align-items: center;\\n  align-items: center;\\n}\\n.justify-center {\\n  -webkit-box-pack: center;\\n  -ms-flex-pack: center;\\n  -webkit-justify-content: center;\\n  justify-content: center;\\n}\\n.float-left {\\n  float: left;\\n}\\n.font-bold {\\n  font-weight: 700;\\n}\\n.h-full {\\n  height: 100%;\\n}\\n.h-20 {\\n  height: 5rem;\\n}\\n.h-4 {\\n  height: 1rem;\\n}\\n.m-3 {\\n  margin: 0.75rem;\\n}\\n.mt-6 {\\n  margin-top: 1.5rem;\\n}\\n.overflow-hidden {\\n  overflow: hidden;\\n}\\n.p-3 {\\n  padding: 0.75rem;\\n}\\n.p-2 {\\n  padding: 0.5rem;\\n}\\n.py-2 {\\n  padding-top: 0.5rem;\\n  padding-bottom: 0.5rem;\\n}\\n.absolute {\\n  position: absolute;\\n}\\n.relative {\\n  position: relative;\\n}\\n.-top-4 {\\n  top: -1rem;\\n}\\n.right-5 {\\n  right: 1.25rem;\\n}\\n.shadow {\\n  --tw-shadow-color: 0, 0, 0;\\n  --tw-shadow: 0 1px 3px 0 rgba(var(--tw-shadow-color), 0.1), 0 1px 2px 0 rgba(var(--tw-shadow-color), 0.06);\\n  -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\\n}\\n.shadow-md {\\n  --tw-shadow-color: 0, 0, 0;\\n  --tw-shadow: 0 4px 6px -1px rgba(var(--tw-shadow-color), 0.1), 0 2px 4px -1px rgba(var(--tw-shadow-color), 0.06);\\n  -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\\n}\\n.shadow-rose-400 {\\n  --tw-shadow-color: 251, 113, 133;\\n}\\n.text-center {\\n  text-align: center;\\n}\\n.text-white {\\n  --tw-text-opacity: 1;\\n  color: rgba(255, 255, 255, var(--tw-text-opacity));\\n}\\n.uppercase {\\n  text-transform: uppercase;\\n}\\n.w-full {\\n  width: 100%;\\n}\\n.w-52 {\\n  width: 13rem;\\n}\\n.w-3\\\\/5 {\\n  width: 60%;\\n}\\n.w-42 {\\n  width: 10.5rem;\\n}\\n.gap-2 {\\n  grid-gap: 0.5rem;\\n  gap: 0.5rem;\\n}\\n.duration-500 {\\n  -webkit-transition-duration: 500ms;\\n  -o-transition-duration: 500ms;\\n  transition-duration: 500ms;\\n}\\n.duration-150 {\\n  -webkit-transition-duration: 150ms;\\n  -o-transition-duration: 150ms;\\n  transition-duration: 150ms;\\n}\\n</style>\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

async function preload$1() {
}

const Panel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $feather, $$unsubscribe_feather;
	let $session, $$unsubscribe_session;
	validate_store(feather, 'feather');
	$$unsubscribe_feather = subscribe(feather, value => $feather = value);
	const { session } = stores$1();
	validate_store(session, 'session');
	$$unsubscribe_session = subscribe(session, value => $session = value);
	let { user, categories, files } = $$props;
	let { showModal = false } = $$props;
	set_store_value(session, $session = { user }, $session);
	let filter = "", file;

	onMount(async () => {
		const categoryService = $feather.service("uploadthree");
		const fileService = $feather.service("file");

		["created", "removed"].forEach(event => {
			categoryService.on(event, async () => {
				categories = await categoryService.find();
			});

			fileService.on(event, async () => {
				files = await fileService.find();
			});
		});
	});

	if ($$props.user === void 0 && $$bindings.user && user !== void 0) $$bindings.user(user);
	if ($$props.categories === void 0 && $$bindings.categories && categories !== void 0) $$bindings.categories(categories);
	if ($$props.files === void 0 && $$bindings.files && files !== void 0) $$bindings.files(files);
	if ($$props.showModal === void 0 && $$bindings.showModal && showModal !== void 0) $$bindings.showModal(showModal);
	$$result.css.add(css$3);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		$$rendered = `<div class="${" w-full h-full svelte-osabo4"}"><div class="${" flex h-full   svelte-osabo4"}"><div class="${"w-52 h-full bg-dark-400  svelte-osabo4"}"><ul class="${"flex flex-col gap-2 text-white p-3 svelte-osabo4"}"><li class="${"p-2 " + escape('bg-dark-700' ) + "  hover:bg-rose-500 duration-500" + " svelte-osabo4"}">Tümü</li>
        ${each(categories?.data || [], category => `<li class="${"p-2 " + escape(filter == category.text ? 'bg-dark-700' : 'bg-dark-200') + "  hover:bg-rose-500 duration-500" + " svelte-osabo4"}">${escape(category.text)}</li>`)}</ul></div>

    <div class="${"bg-dark-500 w-full svelte-osabo4"}">${each(
			files?.data || [],
			file => `<div class="${"bg-rose-500 hover:bg-rose-600 duration-150 float-left w-42 h-20 m-3 rounded-xl relative mt-6 flex flex-col justify-center items-center shadow shadow-md shadow-rose-400 cursor-pointer svelte-osabo4"}"><div class="${"absolute bg-rose-600 w-3/5 h-4 rounded-t-xl -top-4 right-5 shadow shadow-md shadow-rose-400 svelte-osabo4"}"></div>
          <span class="${"text-white uppercase font-bold text-center block h-full w-full overflow-hidden py-2 flex items-center justify-center svelte-osabo4"}">${escape(file.name)}</span>
        </div>`
		)}</div></div></div>

${validate_component(Modal, "Modal").$$render(
			$$result,
			{
				data: file,
				component: DeleteModal,
				show: showModal
			},
			{
				show: $$value => {
					showModal = $$value;
					$$settled = false;
				}
			},
			{}
		)}`;
	} while (!$$settled);

	$$unsubscribe_feather();
	$$unsubscribe_session();
	return $$rendered;
});

var component_5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Panel,
    preload: preload$1
});

/* src/lib/components/panel/cardButton.svelte generated by Svelte v3.42.1 */

const css$2 = {
	code: ".card.svelte-10or6yi.svelte-10or6yi{border-radius:0.25rem;height:16.5rem;padding-top:3rem;padding-bottom:3rem;width:100%;--tw-border-opacity:1;display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;--tw-bg-opacity:1;background-color:rgba(229, 231, 235, var(--tw-bg-opacity));cursor:pointer}.card.svelte-10or6yi.svelte-10or6yi:hover{--tw-bg-opacity:1;background-color:rgba(45, 45, 45, var(--tw-bg-opacity));--tw-border-opacity:0;-webkit-transition-duration:500ms;-o-transition-duration:500ms;transition-duration:500ms}.card.svelte-10or6yi:hover h3.svelte-10or6yi{--tw-border-opacity:0;--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity))}.card.svelte-10or6yi:hover span.svelte-10or6yi{--tw-border-opacity:0}.card.svelte-10or6yi span.svelte-10or6yi:hover{--tw-bg-opacity:1;background-color:rgba(244, 63, 94, var(--tw-bg-opacity));--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity));-webkit-transition-duration:400ms;-o-transition-duration:400ms;transition-duration:400ms}.bg-white.svelte-10or6yi.svelte-10or6yi{--tw-bg-opacity:1;background-color:rgba(255, 255, 255, var(--tw-bg-opacity))}.rounded-1.svelte-10or6yi.svelte-10or6yi{border-radius:100%}.cursor-pointer.svelte-10or6yi.svelte-10or6yi{cursor:pointer}.block.svelte-10or6yi.svelte-10or6yi{display:block}.flex.svelte-10or6yi.svelte-10or6yi{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.items-center.svelte-10or6yi.svelte-10or6yi{-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center}.justify-center.svelte-10or6yi.svelte-10or6yi{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center}.font-bold.svelte-10or6yi.svelte-10or6yi{font-weight:700}.h-16.svelte-10or6yi.svelte-10or6yi{height:4rem}.text-xl.svelte-10or6yi.svelte-10or6yi{font-size:1.25rem;line-height:1.75rem}.p-3.svelte-10or6yi.svelte-10or6yi{padding:0.75rem}.text-dark-400.svelte-10or6yi.svelte-10or6yi{--tw-text-opacity:1;color:rgba(34, 34, 34, var(--tw-text-opacity))}.uppercase.svelte-10or6yi.svelte-10or6yi{text-transform:uppercase}.w-16.svelte-10or6yi.svelte-10or6yi{width:4rem}",
	map: "{\"version\":3,\"file\":\"cardButton.svelte\",\"sources\":[\"cardButton.svelte\"],\"sourcesContent\":[\"<script>\\nimport { createEventDispatcher } from \\\"svelte\\\";\\nconst dispatch = createEventDispatcher();\\nexport let data = {\\n  title: \\\"title\\\",\\n  icon: \\\"fa fa-list\\\",\\n};\\n\\nconst dispatcher = async () => dispatch(\\\"click\\\");\\n</script>\\n\\n<div class=\\\"card \\\">\\n  <span class=\\\"block w-16 h-16 bg-white rounded-1 flex items-center justify-center cursor-pointer\\\" on:click=\\\"{() => dispatcher()}\\\">\\n    <i class=\\\"{data.icon} fa-2x\\\"></i>\\n  </span>\\n\\n  <h2 class=\\\"p-3 uppercase text-xl font-bold text-dark-400\\\">\\n    {#if data.value}\\n      {data.value}\\n    {/if}\\n  </h2>\\n\\n  <h3 class=\\\"p-3 uppercase text-xl font-bold text-dark-400\\\">{data.title}</h3>\\n</div>\\n\\n<style windi:inject>\\n.card {\\n  border-radius: 0.25rem;\\n  height: 16.5rem;\\n  padding-top: 3rem;\\n  padding-bottom: 3rem;\\n  width: 100%;\\n  --tw-border-opacity: 1;\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: -webkit-flex;\\n  display: flex;\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n  -ms-flex-direction: column;\\n  -webkit-flex-direction: column;\\n  flex-direction: column;\\n  -webkit-box-align: center;\\n  -ms-flex-align: center;\\n  -webkit-align-items: center;\\n  align-items: center;\\n  -webkit-box-pack: center;\\n  -ms-flex-pack: center;\\n  -webkit-justify-content: center;\\n  justify-content: center;\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(229, 231, 235, var(--tw-bg-opacity));\\n  cursor: pointer;\\n}\\n.card:hover {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(45, 45, 45, var(--tw-bg-opacity));\\n  --tw-border-opacity: 0;\\n  -webkit-transition-duration: 500ms;\\n  -o-transition-duration: 500ms;\\n  transition-duration: 500ms;\\n}\\n.card:hover h3 {\\n  --tw-border-opacity: 0;\\n  --tw-text-opacity: 1;\\n  color: rgba(255, 255, 255, var(--tw-text-opacity));\\n}\\n.card:hover span {\\n  --tw-border-opacity: 0;\\n}\\n.card span:hover {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(244, 63, 94, var(--tw-bg-opacity));\\n  --tw-text-opacity: 1;\\n  color: rgba(255, 255, 255, var(--tw-text-opacity));\\n  -webkit-transition-duration: 400ms;\\n  -o-transition-duration: 400ms;\\n  transition-duration: 400ms;\\n}\\n.bg-white {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));\\n}\\n.rounded-1 {\\n  border-radius: 100%;\\n}\\n.cursor-pointer {\\n  cursor: pointer;\\n}\\n.block {\\n  display: block;\\n}\\n.flex {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: -webkit-flex;\\n  display: flex;\\n}\\n.items-center {\\n  -webkit-box-align: center;\\n  -ms-flex-align: center;\\n  -webkit-align-items: center;\\n  align-items: center;\\n}\\n.justify-center {\\n  -webkit-box-pack: center;\\n  -ms-flex-pack: center;\\n  -webkit-justify-content: center;\\n  justify-content: center;\\n}\\n.font-bold {\\n  font-weight: 700;\\n}\\n.h-16 {\\n  height: 4rem;\\n}\\n.text-xl {\\n  font-size: 1.25rem;\\n  line-height: 1.75rem;\\n}\\n.p-3 {\\n  padding: 0.75rem;\\n}\\n.text-dark-400 {\\n  --tw-text-opacity: 1;\\n  color: rgba(34, 34, 34, var(--tw-text-opacity));\\n}\\n.uppercase {\\n  text-transform: uppercase;\\n}\\n.w-16 {\\n  width: 4rem;\\n}\\n</style>\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

const CardButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	createEventDispatcher();
	let { data = { title: "title", icon: "fa fa-list" } } = $$props;
	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	$$result.css.add(css$2);

	return `<div class="${"card  svelte-10or6yi"}"><span class="${"block w-16 h-16 bg-white rounded-1 flex items-center justify-center cursor-pointer svelte-10or6yi"}"><i class="${escape(data.icon) + " fa-2x" + " svelte-10or6yi"}"></i></span>

  <h2 class="${"p-3 uppercase text-xl font-bold text-dark-400 svelte-10or6yi"}">${data.value ? `${escape(data.value)}` : ``}</h2>

  <h3 class="${"p-3 uppercase text-xl font-bold text-dark-400 svelte-10or6yi"}">${escape(data.title)}</h3>
</div>`;
});

/* src/lib/components/panel/addTreeModal.svelte generated by Svelte v3.42.1 */

const css$1 = {
	code: ".bg-dark-500.svelte-38sf33{--tw-bg-opacity:1;background-color:rgba(31, 31, 31, var(--tw-bg-opacity))}.rounded.svelte-38sf33{border-radius:0.25rem}.flex.svelte-38sf33{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.flex-col.svelte-38sf33{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column}.items-center.svelte-38sf33{-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center}.justify-center.svelte-38sf33{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center}.p-12.svelte-38sf33{padding:3rem}.p-2.svelte-38sf33{padding:0.5rem}.p-3.svelte-38sf33{padding:0.75rem}.text-white.svelte-38sf33{--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity))}.text-dark-900.svelte-38sf33{--tw-text-opacity:1;color:rgba(15, 15, 15, var(--tw-text-opacity))}.w-6.svelte-38sf33{width:1.5rem}.w-full.svelte-38sf33{width:100%}.w-122.svelte-38sf33{width:30.5rem}.gap-6.svelte-38sf33{grid-gap:1.5rem;gap:1.5rem}",
	map: "{\"version\":3,\"file\":\"addTreeModal.svelte\",\"sources\":[\"addTreeModal.svelte\"],\"sourcesContent\":[\"<script>\\nimport { feather } from \\\"../../stores/feather\\\";\\nlet text,\\n  disabled = false;\\nexport let show;\\nasync function handleNewCategory() {\\n  try {\\n    disabled = true;\\n    const newTree = await $feather.service(\\\"uploadthree\\\").create({ text });\\n    disabled = false;\\n    show = false;\\n  } catch (error) {\\n    if (error) {\\n      alert(error);\\n      disabled = false;\\n      text = \\\"\\\";\\n    }\\n  }\\n}\\n</script>\\n\\n<div class=\\\"w-122 bg-dark-500 flex flex-col p-12  justify-center gap-6\\\">\\n  <span on:click=\\\"{() => (show = false)}\\\" class=\\\"p-2 text-white  w-6\\\"> x </span>\\n  <p class=\\\"text-white\\\">/ - _ % gibi özel karakterler içermemelidir</p>\\n  <form on:submit|preventDefault=\\\"{handleNewCategory}\\\" class=\\\"flex flex-col items-center justify-center gap-6\\\">\\n    <input type=\\\"text\\\" placeholder=\\\"categori\\\" class=\\\"p-2 rounded text-dark-900\\\" bind:value=\\\"{text}\\\" required />\\n\\n    <button type=\\\"submit\\\" disabled=\\\"{disabled}\\\" class=\\\"w-full p-3 text-white\\\">{disabled ? \\\"Kaydediliyor...\\\" : \\\"Kaydet\\\"}</button>\\n  </form>\\n</div>\\n\\n<style windi:inject>\\n.bg-dark-500 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(31, 31, 31, var(--tw-bg-opacity));\\n}\\n.rounded {\\n  border-radius: 0.25rem;\\n}\\n.flex {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: -webkit-flex;\\n  display: flex;\\n}\\n.flex-col {\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n  -ms-flex-direction: column;\\n  -webkit-flex-direction: column;\\n  flex-direction: column;\\n}\\n.items-center {\\n  -webkit-box-align: center;\\n  -ms-flex-align: center;\\n  -webkit-align-items: center;\\n  align-items: center;\\n}\\n.justify-center {\\n  -webkit-box-pack: center;\\n  -ms-flex-pack: center;\\n  -webkit-justify-content: center;\\n  justify-content: center;\\n}\\n.p-12 {\\n  padding: 3rem;\\n}\\n.p-2 {\\n  padding: 0.5rem;\\n}\\n.p-3 {\\n  padding: 0.75rem;\\n}\\n.text-white {\\n  --tw-text-opacity: 1;\\n  color: rgba(255, 255, 255, var(--tw-text-opacity));\\n}\\n.text-dark-900 {\\n  --tw-text-opacity: 1;\\n  color: rgba(15, 15, 15, var(--tw-text-opacity));\\n}\\n.w-6 {\\n  width: 1.5rem;\\n}\\n.w-full {\\n  width: 100%;\\n}\\n.w-122 {\\n  width: 30.5rem;\\n}\\n.gap-6 {\\n  grid-gap: 1.5rem;\\n  gap: 1.5rem;\\n}\\n</style>\"],\"names\":[],\"mappings\":\"AAgCA,YAAY,cAAC,CAAC,AACZ,eAAe,CAAE,CAAC,CAClB,gBAAgB,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,AAC1D,CAAC,AACD,QAAQ,cAAC,CAAC,AACR,aAAa,CAAE,OAAO,AACxB,CAAC,AACD,KAAK,cAAC,CAAC,AACL,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,WAAW,CACpB,OAAO,CAAE,YAAY,CACrB,OAAO,CAAE,IAAI,AACf,CAAC,AACD,SAAS,cAAC,CAAC,AACT,kBAAkB,CAAE,QAAQ,CAC5B,qBAAqB,CAAE,MAAM,CAC7B,kBAAkB,CAAE,MAAM,CAC1B,sBAAsB,CAAE,MAAM,CAC9B,cAAc,CAAE,MAAM,AACxB,CAAC,AACD,aAAa,cAAC,CAAC,AACb,iBAAiB,CAAE,MAAM,CACzB,cAAc,CAAE,MAAM,CACtB,mBAAmB,CAAE,MAAM,CAC3B,WAAW,CAAE,MAAM,AACrB,CAAC,AACD,eAAe,cAAC,CAAC,AACf,gBAAgB,CAAE,MAAM,CACxB,aAAa,CAAE,MAAM,CACrB,uBAAuB,CAAE,MAAM,CAC/B,eAAe,CAAE,MAAM,AACzB,CAAC,AACD,KAAK,cAAC,CAAC,AACL,OAAO,CAAE,IAAI,AACf,CAAC,AACD,IAAI,cAAC,CAAC,AACJ,OAAO,CAAE,MAAM,AACjB,CAAC,AACD,IAAI,cAAC,CAAC,AACJ,OAAO,CAAE,OAAO,AAClB,CAAC,AACD,WAAW,cAAC,CAAC,AACX,iBAAiB,CAAE,CAAC,CACpB,KAAK,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,iBAAiB,CAAC,CAAC,AACpD,CAAC,AACD,cAAc,cAAC,CAAC,AACd,iBAAiB,CAAE,CAAC,CACpB,KAAK,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,iBAAiB,CAAC,CAAC,AACjD,CAAC,AACD,IAAI,cAAC,CAAC,AACJ,KAAK,CAAE,MAAM,AACf,CAAC,AACD,OAAO,cAAC,CAAC,AACP,KAAK,CAAE,IAAI,AACb,CAAC,AACD,MAAM,cAAC,CAAC,AACN,KAAK,CAAE,OAAO,AAChB,CAAC,AACD,MAAM,cAAC,CAAC,AACN,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,MAAM,AACb,CAAC\"}"
};

const AddTreeModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $$unsubscribe_feather;
	validate_store(feather, 'feather');
	$$unsubscribe_feather = subscribe(feather, value => value);
	let text;
	let { show } = $$props;

	if ($$props.show === void 0 && $$bindings.show && show !== void 0) $$bindings.show(show);
	$$result.css.add(css$1);
	$$unsubscribe_feather();

	return `<div class="${"w-122 bg-dark-500 flex flex-col p-12  justify-center gap-6 svelte-38sf33"}"><span class="${"p-2 text-white  w-6 svelte-38sf33"}">x </span>
  <p class="${"text-white svelte-38sf33"}">/ - _ % gibi özel karakterler içermemelidir</p>
  <form class="${"flex flex-col items-center justify-center gap-6 svelte-38sf33"}"><input type="${"text"}" placeholder="${"categori"}" class="${"p-2 rounded text-dark-900 svelte-38sf33"}" required${add_attribute("value", text, 0)}>

    <button type="${"submit"}" ${""} class="${"w-full p-3 text-white svelte-38sf33"}">${escape("Kaydet")}</button></form>
</div>`;
});

/* src/routes/panel/tree.svelte generated by Svelte v3.42.1 */

const css = {
	code: ".categoryItem.svelte-1aibcvx:hover .sil.svelte-1aibcvx{display:block}.bg-dark-500.svelte-1aibcvx.svelte-1aibcvx{--tw-bg-opacity:1;background-color:rgba(31, 31, 31, var(--tw-bg-opacity))}.bg-dark-700.svelte-1aibcvx.svelte-1aibcvx{--tw-bg-opacity:1;background-color:rgba(27, 27, 27, var(--tw-bg-opacity))}.hover\\:bg-rose-500.svelte-1aibcvx.svelte-1aibcvx:hover{--tw-bg-opacity:1;background-color:rgba(244, 63, 94, var(--tw-bg-opacity))}.cursor-pointer.svelte-1aibcvx.svelte-1aibcvx{cursor:pointer}.flex.svelte-1aibcvx.svelte-1aibcvx{display:-webkit-box;display:-ms-flexbox;display:-webkit-flex;display:flex}.grid.svelte-1aibcvx.svelte-1aibcvx{display:-ms-grid;display:grid}.hidden.svelte-1aibcvx.svelte-1aibcvx{display:none}.flex-col.svelte-1aibcvx.svelte-1aibcvx{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column}.flex-1.svelte-1aibcvx.svelte-1aibcvx{-webkit-box-flex:1;-ms-flex:1 1 0%;-webkit-flex:1 1 0%;flex:1 1 0%}.h-full.svelte-1aibcvx.svelte-1aibcvx{height:100%}.p-12.svelte-1aibcvx.svelte-1aibcvx{padding:3rem}.p-3.svelte-1aibcvx.svelte-1aibcvx{padding:0.75rem}.p-2.svelte-1aibcvx.svelte-1aibcvx{padding:0.5rem}.text-white.svelte-1aibcvx.svelte-1aibcvx{--tw-text-opacity:1;color:rgba(255, 255, 255, var(--tw-text-opacity))}.w-full.svelte-1aibcvx.svelte-1aibcvx{width:100%}.gap-6.svelte-1aibcvx.svelte-1aibcvx{grid-gap:1.5rem;gap:1.5rem}.gap-1.svelte-1aibcvx.svelte-1aibcvx{grid-gap:0.25rem;gap:0.25rem}.gap-12.svelte-1aibcvx.svelte-1aibcvx{grid-gap:3rem;gap:3rem}.grid-cols-1.svelte-1aibcvx.svelte-1aibcvx{grid-template-columns:repeat(1, minmax(0, 1fr))}.duration-500.svelte-1aibcvx.svelte-1aibcvx{-webkit-transition-duration:500ms;-o-transition-duration:500ms;transition-duration:500ms}@media(min-width: 768px){.md\\:w-full.svelte-1aibcvx.svelte-1aibcvx{width:100%}.md\\:grid-cols-1.svelte-1aibcvx.svelte-1aibcvx{grid-template-columns:repeat(1, minmax(0, 1fr))}}@media(min-width: 1024px){.lg\\:flex-row.svelte-1aibcvx.svelte-1aibcvx{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;-webkit-flex-direction:row;flex-direction:row}.lg\\:w-2\\/4.svelte-1aibcvx.svelte-1aibcvx{width:50%}.lg\\:grid-cols-2.svelte-1aibcvx.svelte-1aibcvx{grid-template-columns:repeat(2, minmax(0, 1fr))}}@media(min-width: 1280px){.xl\\:w-1\\/4.svelte-1aibcvx.svelte-1aibcvx{width:25%}.xl\\:grid-cols-3.svelte-1aibcvx.svelte-1aibcvx{grid-template-columns:repeat(3, minmax(0, 1fr))}}",
	map: "{\"version\":3,\"file\":\"tree.svelte\",\"sources\":[\"tree.svelte\"],\"sourcesContent\":[\"<script context=\\\"module\\\">\\nimport { get } from \\\"svelte/store\\\";\\nimport { feather } from \\\"../../lib/stores/feather\\\";\\n\\nexport async function preload() {\\n  if (false) {\\n    const client = get(feather);\\n\\n    const catalogs = await client.service(\\\"uploadthree\\\").find();\\n    return { catalogs };\\n  }\\n}\\n</script>\\n\\n<script>\\nimport { onMount } from \\\"svelte\\\";\\nimport CardButton from \\\"../../lib/components/panel/cardButton.svelte\\\";\\nimport Modal from \\\"../../lib/components/modal.svelte\\\";\\nimport addTreeModal from \\\"../../lib/components/panel/addTreeModal.svelte\\\";\\n\\nexport let showAddCategoryModal = false,\\n  catalogs;\\n\\nonMount(async () => {\\n  const service = $feather.service(\\\"uploadthree\\\");\\n  [\\\"created\\\", \\\"removed\\\"].forEach((event) => {\\n    service.on(event, async () => (catalogs = await service.find()));\\n  });\\n});\\n\\nasync function handleCategoryDelete(id) {\\n  const removed = await $feather.service(\\\"uploadthree\\\").remove(id);\\n}\\n</script>\\n\\n<Modal component=\\\"{addTreeModal}\\\" bind:show=\\\"{showAddCategoryModal}\\\" />\\n\\n<div class=\\\"w-full h-full flex flex-col lg:flex-row gap-6  p-12\\\">\\n  <div class=\\\"md:w-full lg:w-2/4 xl:w-1/4\\\">\\n    <ul class=\\\"h-full bg-dark-500 p-3 text-white flex flex-col gap-1\\\">\\n      {#each catalogs?.data || [] as data}\\n        <li class=\\\"categoryItem p-2 bg-dark-700 hover:bg-rose-500 duration-500 flex\\\">\\n          <div class=\\\"w-full\\\">{data.text}</div>\\n          <div on:click=\\\"{() => handleCategoryDelete(data._id)}\\\" class=\\\"sil hidden cursor-pointer\\\">sil</div>\\n        </li>\\n      {/each}\\n    </ul>\\n  </div>\\n  <div class=\\\"flex-1 w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3   gap-12\\\">\\n    <CardButton data=\\\"{{ title: 'Toplam kategori', icon: 'fas fa-list', value: catalogs?.total }}\\\" />\\n    <CardButton data=\\\"{{ title: 'Yeni kategori ekle', icon: 'fas fa-list' }}\\\" on:click=\\\"{(e) => (showAddCategoryModal = true)}\\\" />\\n  </div>\\n</div>\\n\\n<style windi:inject>\\n.categoryItem:hover .sil {\\n  display: block;\\n}\\n.bg-dark-500 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(31, 31, 31, var(--tw-bg-opacity));\\n}\\n.bg-dark-700 {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(27, 27, 27, var(--tw-bg-opacity));\\n}\\n.hover\\\\:bg-rose-500:hover {\\n  --tw-bg-opacity: 1;\\n  background-color: rgba(244, 63, 94, var(--tw-bg-opacity));\\n}\\n.cursor-pointer {\\n  cursor: pointer;\\n}\\n.flex {\\n  display: -webkit-box;\\n  display: -ms-flexbox;\\n  display: -webkit-flex;\\n  display: flex;\\n}\\n.grid {\\n  display: -ms-grid;\\n  display: grid;\\n}\\n.hidden {\\n  display: none;\\n}\\n.flex-col {\\n  -webkit-box-orient: vertical;\\n  -webkit-box-direction: normal;\\n  -ms-flex-direction: column;\\n  -webkit-flex-direction: column;\\n  flex-direction: column;\\n}\\n.flex-1 {\\n  -webkit-box-flex: 1;\\n  -ms-flex: 1 1 0%;\\n  -webkit-flex: 1 1 0%;\\n  flex: 1 1 0%;\\n}\\n.h-full {\\n  height: 100%;\\n}\\n.p-12 {\\n  padding: 3rem;\\n}\\n.p-3 {\\n  padding: 0.75rem;\\n}\\n.p-2 {\\n  padding: 0.5rem;\\n}\\n.text-white {\\n  --tw-text-opacity: 1;\\n  color: rgba(255, 255, 255, var(--tw-text-opacity));\\n}\\n.w-full {\\n  width: 100%;\\n}\\n.gap-6 {\\n  grid-gap: 1.5rem;\\n  gap: 1.5rem;\\n}\\n.gap-1 {\\n  grid-gap: 0.25rem;\\n  gap: 0.25rem;\\n}\\n.gap-12 {\\n  grid-gap: 3rem;\\n  gap: 3rem;\\n}\\n.grid-cols-1 {\\n  grid-template-columns: repeat(1, minmax(0, 1fr));\\n}\\n.duration-500 {\\n  -webkit-transition-duration: 500ms;\\n  -o-transition-duration: 500ms;\\n  transition-duration: 500ms;\\n}\\n@media (min-width: 768px) {\\n  .md\\\\:w-full {\\n    width: 100%;\\n  }\\n  .md\\\\:grid-cols-1 {\\n    grid-template-columns: repeat(1, minmax(0, 1fr));\\n  }\\n}\\n@media (min-width: 1024px) {\\n  .lg\\\\:flex-row {\\n    -webkit-box-orient: horizontal;\\n    -webkit-box-direction: normal;\\n    -ms-flex-direction: row;\\n    -webkit-flex-direction: row;\\n    flex-direction: row;\\n  }\\n  .lg\\\\:w-2\\\\/4 {\\n    width: 50%;\\n  }\\n  .lg\\\\:grid-cols-2 {\\n    grid-template-columns: repeat(2, minmax(0, 1fr));\\n  }\\n}\\n@media (min-width: 1280px) {\\n  .xl\\\\:w-1\\\\/4 {\\n    width: 25%;\\n  }\\n  .xl\\\\:grid-cols-3 {\\n    grid-template-columns: repeat(3, minmax(0, 1fr));\\n  }\\n}\\n</style>\\n\"],\"names\":[],\"mappings\":\"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\"}"
};

async function preload() {
}

const Tree = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $feather, $$unsubscribe_feather;
	validate_store(feather, 'feather');
	$$unsubscribe_feather = subscribe(feather, value => $feather = value);
	let { showAddCategoryModal = false, catalogs } = $$props;

	onMount(async () => {
		const service = $feather.service("uploadthree");

		["created", "removed"].forEach(event => {
			service.on(event, async () => catalogs = await service.find());
		});
	});

	if ($$props.showAddCategoryModal === void 0 && $$bindings.showAddCategoryModal && showAddCategoryModal !== void 0) $$bindings.showAddCategoryModal(showAddCategoryModal);
	if ($$props.catalogs === void 0 && $$bindings.catalogs && catalogs !== void 0) $$bindings.catalogs(catalogs);
	$$result.css.add(css);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		$$rendered = `${validate_component(Modal, "Modal").$$render(
			$$result,
			{
				component: AddTreeModal,
				show: showAddCategoryModal
			},
			{
				show: $$value => {
					showAddCategoryModal = $$value;
					$$settled = false;
				}
			},
			{}
		)}

<div class="${"w-full h-full flex flex-col lg:flex-row gap-6  p-12 svelte-1aibcvx"}"><div class="${"md:w-full lg:w-2/4 xl:w-1/4 svelte-1aibcvx"}"><ul class="${"h-full bg-dark-500 p-3 text-white flex flex-col gap-1 svelte-1aibcvx"}">${each(catalogs?.data || [], data => `<li class="${"categoryItem p-2 bg-dark-700 hover:bg-rose-500 duration-500 flex svelte-1aibcvx"}"><div class="${"w-full svelte-1aibcvx"}">${escape(data.text)}</div>
          <div class="${"sil hidden cursor-pointer svelte-1aibcvx"}">sil</div>
        </li>`)}</ul></div>
  <div class="${"flex-1 w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3   gap-12 svelte-1aibcvx"}">${validate_component(CardButton, "CardButton").$$render(
			$$result,
			{
				data: {
					title: 'Toplam kategori',
					icon: 'fas fa-list',
					value: catalogs?.total
				}
			},
			{},
			{}
		)}
    ${validate_component(CardButton, "CardButton").$$render(
			$$result,
			{
				data: {
					title: 'Yeni kategori ekle',
					icon: 'fas fa-list'
				}
			},
			{},
			{}
		)}</div>
</div>`;
	} while (!$$settled);

	$$unsubscribe_feather();
	return $$rendered;
});

var component_6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Tree,
    preload: preload
});

// This file is generated by Sapper — do not edit it!

const manifest = {
	server_routes: [
		
	],

	pages: [
		{
			// index.svelte
			pattern: /^\/$/,
			parts: [
				{ name: "index", file: "index.svelte", component: component_0 }
			]
		},

		{
			// create_admin.svelte
			pattern: /^\/create_admin\/?$/,
			parts: [
				{ name: "create_admin", file: "create_admin.svelte", component: component_1 }
			]
		},

		{
			// signin.svelte
			pattern: /^\/signin\/?$/,
			parts: [
				{ name: "signin", file: "signin.svelte", component: component_2 }
			]
		},

		{
			// upload.svelte
			pattern: /^\/upload\/?$/,
			parts: [
				{ name: "upload", file: "upload.svelte", component: component_3 }
			]
		},

		{
			// panel/index.svelte
			pattern: /^\/panel\/?$/,
			parts: [
				{ name: "panel__layout", file: "panel/_layout.svelte", component: component_4 },
				{ name: "panel", file: "panel/index.svelte", component: component_5 }
			]
		},

		{
			// panel/tree.svelte
			pattern: /^\/panel\/tree\/?$/,
			parts: [
				{ name: "panel__layout", file: "panel/_layout.svelte", component: component_4 },
				{ name: "panel_tree", file: "panel/tree.svelte", component: component_6 }
			]
		}
	],

	root_comp,
	error: Error$1
};

const build_dir = "__sapper__/dev";

const src_dir = "src";

/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */
function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (var i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}

/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */
Mime.prototype.define = function(typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(function(t) {return t.toLowerCase()});
    type = type.toLowerCase();

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i];

      // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.
      if (ext[0] == '*') {
        continue;
      }

      if (!force && (ext in this._types)) {
        throw new Error(
          'Attempt to change mapping for "' + ext +
          '" extension from "' + this._types[ext] + '" to "' + type +
          '". Pass `force=true` to allow this, otherwise remove "' + ext +
          '" from the list of extensions for "' + type + '".'
        );
      }

      this._types[ext] = type;
    }

    // Use first extension as default
    if (force || !this._extensions[type]) {
      var ext = extensions[0];
      this._extensions[type] = (ext[0] != '*') ? ext : ext.substr(1);
    }
  }
};

/**
 * Lookup a mime type based on extension
 */
Mime.prototype.getType = function(path) {
  path = String(path);
  var last = path.replace(/^.*[/\\]/, '').toLowerCase();
  var ext = last.replace(/^.*\./, '').toLowerCase();

  var hasPath = last.length < path.length;
  var hasDot = ext.length < last.length - 1;

  return (hasDot || !hasPath) && this._types[ext] || null;
};

/**
 * Return file extension associated with a mime type
 */
Mime.prototype.getExtension = function(type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

var Mime_1 = Mime;

var standard = {"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomdeleted+xml":["atomdeleted"],"application/atomsvc+xml":["atomsvc"],"application/atsc-dwd+xml":["dwd"],"application/atsc-held+xml":["held"],"application/atsc-rsat+xml":["rsat"],"application/bdoc":["bdoc"],"application/calendar+xml":["xcs"],"application/ccxml+xml":["ccxml"],"application/cdfx+xml":["cdfx"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/emotionml+xml":["emotionml"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/fdt+xml":["fdt"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/its+xml":["its"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lgr+xml":["lgr"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mmt-aei+xml":["maei"],"application/mmt-usd+xml":["musd"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/mrb-consumer+xml":["*xdf"],"application/mrb-publish+xml":["*xdf"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/node":["cjs"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/p2p-overlay+xml":["relo"],"application/patch-ops-error+xml":["*xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/provenance+xml":["provx"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/route-apd+xml":["rapd"],"application/route-s-tsid+xml":["sls"],"application/route-usd+xml":["rusd"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/senml+xml":["senmlx"],"application/sensml+xml":["sensmlx"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/swid+xml":["swidtag"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/toml":["toml"],"application/ttml+xml":["ttml"],"application/urc-ressheet+xml":["rsheet"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-att+xml":["xav"],"application/xcap-caps+xml":["xca"],"application/xcap-diff+xml":["xdf"],"application/xcap-el+xml":["xel"],"application/xcap-error+xml":["xer"],"application/xcap-ns+xml":["xns"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xliff+xml":["xlf"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mobile-xmf":["mxmf"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/hej2k":["hej2"],"image/hsj2":["hsj2"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jph":["jph"],"image/jphc":["jhc"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/jxra":["jxra"],"image/jxrs":["jxrs"],"image/jxs":["jxs"],"image/jxsc":["jxsc"],"image/jxsi":["jxsi"],"image/jxss":["jxss"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/mtl":["mtl"],"model/obj":["obj"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]};

var lite = new Mime_1(standard);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function get_server_route_handler(routes) {
    function handle_route(route, req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.params = route.params(route.pattern.exec(req.path));
            const method = req.method.toLowerCase();
            // 'delete' cannot be exported from a module because it is a keyword,
            // so check for 'del' instead
            const method_export = method === 'delete' ? 'del' : method;
            const handle_method = route.handlers[method_export];
            if (handle_method) {
                if (process.env.SAPPER_EXPORT) {
                    const { write, end, setHeader } = res;
                    const chunks = [];
                    const headers = {};
                    // intercept data so that it can be exported
                    res.write = function (chunk) {
                        chunks.push(Buffer.from(chunk));
                        return write.apply(res, [chunk]);
                    };
                    res.setHeader = function (name, value) {
                        headers[name.toLowerCase()] = value;
                        setHeader.apply(res, [name, value]);
                    };
                    res.end = function (chunk) {
                        if (chunk)
                            chunks.push(Buffer.from(chunk));
                        end.apply(res, [chunk]);
                        process.send({
                            __sapper__: true,
                            event: 'file',
                            url: req.url,
                            method: req.method,
                            status: res.statusCode,
                            type: headers['content-type'],
                            body: Buffer.concat(chunks)
                        });
                    };
                }
                const handle_next = (err) => {
                    if (err) {
                        res.statusCode = 500;
                        res.end(err.message);
                    }
                    else {
                        process.nextTick(next);
                    }
                };
                try {
                    yield handle_method(req, res, handle_next);
                }
                catch (err) {
                    console.error(err);
                    handle_next(err);
                }
            }
            else {
                // no matching handler for method
                process.nextTick(next);
            }
        });
    }
    return function find_route(req, res, next) {
        for (const route of routes) {
            if (route.pattern.test(req.path)) {
                handle_route(route, req, res, next);
                return;
            }
        }
        next();
    };
}

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

var parse_1 = parse;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {};
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim();
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped = {
    '<': '\\u003C',
    '>': '\\u003E',
    '/': '\\u002F',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
    '\0': '\\0',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join('\0');
function devalue(value) {
    var counts = new Map();
    function walk(thing) {
        if (typeof thing === 'function') {
            throw new Error("Cannot stringify a function");
        }
        if (counts.has(thing)) {
            counts.set(thing, counts.get(thing) + 1);
            return;
        }
        counts.set(thing, 1);
        if (!isPrimitive(thing)) {
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                case 'Date':
                case 'RegExp':
                    return;
                case 'Array':
                    thing.forEach(walk);
                    break;
                case 'Set':
                case 'Map':
                    Array.from(thing).forEach(walk);
                    break;
                default:
                    var proto = Object.getPrototypeOf(thing);
                    if (proto !== Object.prototype &&
                        proto !== null &&
                        Object.getOwnPropertyNames(proto).sort().join('\0') !== objectProtoOwnPropertyNames) {
                        throw new Error("Cannot stringify arbitrary non-POJOs");
                    }
                    if (Object.getOwnPropertySymbols(thing).length > 0) {
                        throw new Error("Cannot stringify POJOs with symbolic keys");
                    }
                    Object.keys(thing).forEach(function (key) { return walk(thing[key]); });
            }
        }
    }
    walk(value);
    var names = new Map();
    Array.from(counts)
        .filter(function (entry) { return entry[1] > 1; })
        .sort(function (a, b) { return b[1] - a[1]; })
        .forEach(function (entry, i) {
        names.set(entry[0], getName(i));
    });
    function stringify(thing) {
        if (names.has(thing)) {
            return names.get(thing);
        }
        if (isPrimitive(thing)) {
            return stringifyPrimitive(thing);
        }
        var type = getType(thing);
        switch (type) {
            case 'Number':
            case 'String':
            case 'Boolean':
                return "Object(" + stringify(thing.valueOf()) + ")";
            case 'RegExp':
                return "new RegExp(" + stringifyString(thing.source) + ", \"" + thing.flags + "\")";
            case 'Date':
                return "new Date(" + thing.getTime() + ")";
            case 'Array':
                var members = thing.map(function (v, i) { return i in thing ? stringify(v) : ''; });
                var tail = thing.length === 0 || (thing.length - 1 in thing) ? '' : ',';
                return "[" + members.join(',') + tail + "]";
            case 'Set':
            case 'Map':
                return "new " + type + "([" + Array.from(thing).map(stringify).join(',') + "])";
            default:
                var obj = "{" + Object.keys(thing).map(function (key) { return safeKey(key) + ":" + stringify(thing[key]); }).join(',') + "}";
                var proto = Object.getPrototypeOf(thing);
                if (proto === null) {
                    return Object.keys(thing).length > 0
                        ? "Object.assign(Object.create(null)," + obj + ")"
                        : "Object.create(null)";
                }
                return obj;
        }
    }
    var str = stringify(value);
    if (names.size) {
        var params_1 = [];
        var statements_1 = [];
        var values_1 = [];
        names.forEach(function (name, thing) {
            params_1.push(name);
            if (isPrimitive(thing)) {
                values_1.push(stringifyPrimitive(thing));
                return;
            }
            var type = getType(thing);
            switch (type) {
                case 'Number':
                case 'String':
                case 'Boolean':
                    values_1.push("Object(" + stringify(thing.valueOf()) + ")");
                    break;
                case 'RegExp':
                    values_1.push(thing.toString());
                    break;
                case 'Date':
                    values_1.push("new Date(" + thing.getTime() + ")");
                    break;
                case 'Array':
                    values_1.push("Array(" + thing.length + ")");
                    thing.forEach(function (v, i) {
                        statements_1.push(name + "[" + i + "]=" + stringify(v));
                    });
                    break;
                case 'Set':
                    values_1.push("new Set");
                    statements_1.push(name + "." + Array.from(thing).map(function (v) { return "add(" + stringify(v) + ")"; }).join('.'));
                    break;
                case 'Map':
                    values_1.push("new Map");
                    statements_1.push(name + "." + Array.from(thing).map(function (_a) {
                        var k = _a[0], v = _a[1];
                        return "set(" + stringify(k) + ", " + stringify(v) + ")";
                    }).join('.'));
                    break;
                default:
                    values_1.push(Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}');
                    Object.keys(thing).forEach(function (key) {
                        statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
                    });
            }
        });
        statements_1.push("return " + str);
        return "(function(" + params_1.join(',') + "){" + statements_1.join(';') + "}(" + values_1.join(',') + "))";
    }
    else {
        return str;
    }
}
function getName(num) {
    var name = '';
    do {
        name = chars[num % chars.length] + name;
        num = ~~(num / chars.length) - 1;
    } while (num >= 0);
    return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
    return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
    if (typeof thing === 'string')
        return stringifyString(thing);
    if (thing === void 0)
        return 'void 0';
    if (thing === 0 && 1 / thing < 0)
        return '-0';
    var str = String(thing);
    if (typeof thing === 'number')
        return str.replace(/^(-)?0\./, '$1.');
    return str;
}
function getType(thing) {
    return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
    return escaped[c] || c;
}
function escapeUnsafeChars(str) {
    return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
    return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
    var result = '"';
    for (var i = 0; i < str.length; i += 1) {
        var char = str.charAt(i);
        var code = char.charCodeAt(0);
        if (char === '"') {
            result += '\\"';
        }
        else if (char in escaped) {
            result += escaped[char];
        }
        else if (code >= 0xd800 && code <= 0xdfff) {
            var next = str.charCodeAt(i + 1);
            // If this is the beginning of a [high, low] surrogate pair,
            // add the next two characters, otherwise escape
            if (code <= 0xdbff && (next >= 0xdc00 && next <= 0xdfff)) {
                result += char + str[++i];
            }
            else {
                result += "\\u" + code.toString(16).toUpperCase();
            }
        }
        else {
            result += char;
        }
    }
    result += '"';
    return result;
}

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream__default['default'].Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = require('encoding').convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream__default['default'].PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream__default['default']) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream__default['default']) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream__default['default'])) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
		if (!res) {
			res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
			if (res) {
				res.pop(); // drop last quote
			}
		}

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream__default['default'] && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream__default['default']) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http__default['default'].STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url__default['default'].parse;
const format_url = Url__default['default'].format;

const streamDestructionSupported = 'destroy' in Stream__default['default'].Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream__default['default'].Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream__default['default'].PassThrough;
const resolve_url = Url__default['default'].resolve;

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https__default['default'] : http__default['default']).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream__default['default'].Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout,
							size: request.size
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib__default['default'].Z_SYNC_FLUSH,
				finishFlush: zlib__default['default'].Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib__default['default'].createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib__default['default'].createInflate());
					} else {
						body = body.pipe(zlib__default['default'].createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib__default['default'].createBrotliDecompress === 'function') {
				body = body.pipe(zlib__default['default'].createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
var encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
var decode$1 = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};

var base64 = {
	encode: encode,
	decode: decode$1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
var encode$1 = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
var decode$2 = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};

var base64Vlq = {
	encode: encode$1,
	decode: decode$2
};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var util = createCommonjsModule(function (module, exports) {
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port;
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 === null) {
    return 1; // aStr2 !== null
  }

  if (aStr2 === null) {
    return -1; // aStr1 !== null
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */
function parseSourceMapInput(str) {
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || '';

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
      sourceRoot += '/';
    }
    // The spec says:
    //   Line 4: An optional source root, useful for relocating source
    //   files on a server or removing repeated values in the
    //   “sources” entry.  This value is prepended to the individual
    //   entries in the “source” field.
    sourceURL = sourceRoot + sourceURL;
  }

  // Historically, SourceMapConsumer did not take the sourceMapURL as
  // a parameter.  This mode is still somewhat supported, which is why
  // this code block is conditional.  However, it's preferable to pass
  // the source map URL to SourceMapConsumer, so that this function
  // can implement the source URL resolution algorithm as outlined in
  // the spec.  This block is basically the equivalent of:
  //    new URL(sourceURL, sourceMapURL).toString()
  // ... except it avoids using URL, which wasn't available in the
  // older releases of node still supported by this library.
  //
  // The spec says:
  //   If the sources are not absolute URLs after prepending of the
  //   “sourceRoot”, the sources are resolved relative to the
  //   SourceMap (like resolving script src in a html document).
  if (sourceMapURL) {
    var parsed = urlParse(sourceMapURL);
    if (!parsed) {
      throw new Error("sourceMapURL could not be parsed");
    }
    if (parsed.path) {
      // Strip the last path component, but keep the "/".
      var index = parsed.path.lastIndexOf('/');
      if (index >= 0) {
        parsed.path = parsed.path.substring(0, index + 1);
      }
    }
    sourceURL = join(urlGenerate(parsed), sourceURL);
  }

  return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;
});

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */


var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

var ArraySet_1 = ArraySet;

var arraySet = {
	ArraySet: ArraySet_1
};

var binarySearch = createCommonjsModule(function (module, exports) {
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  }
  else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  }
  else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};
});

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
var quickSort_1 = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};

var quickSort = {
	quickSort: quickSort_1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */



var ArraySet$1 = arraySet.ArraySet;

var quickSort$1 = quickSort.quickSort;

function SourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
};

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;

SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */
SourceMapConsumer.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util.getArg(aArgs, 'column', 0)
    };

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

var SourceMapConsumer_1 = SourceMapConsumer;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  if (sourceRoot) {
    sourceRoot = util.normalize(sourceRoot);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
        ? util.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet$1.fromArray(names.map(String), true);
  this._sources = ArraySet$1.fromArray(sources, true);

  this._absoluteSources = this._sources.toArray().map(function (s) {
    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util.relative(this.sourceRoot, relativeSource);
  }

  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }

  // Maybe aSource is an absolute URL as returned by |sources|.  In
  // this case we can't simply undo the transform.
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }

  return -1;
};

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet$1.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet$1.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function (s) {
      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort$1(smc.__originalMappings, util.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._absoluteSources.slice();
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64Vlq.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort$1(generatedMappings, util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort$1(originalMappings, util.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util.compareByGeneratedPositionsDeflated,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name = util.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }

    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util.relative(this.sourceRoot, relativeSource);
    }

    var url;
    if (this.sourceRoot != null
        && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }

    var needle = {
      source: source,
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util.compareByOriginalPositions,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

var BasicSourceMapConsumer_1 = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet$1();
  this._names = new ArraySet$1();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = null;
        if (mapping.name) {
          name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
        }

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort$1(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort$1(this.__originalMappings, util.compareByOriginalPositions);
  };

var IndexedSourceMapConsumer_1 = IndexedSourceMapConsumer;

var sourceMapConsumer = {
	SourceMapConsumer: SourceMapConsumer_1,
	BasicSourceMapConsumer: BasicSourceMapConsumer_1,
	IndexedSourceMapConsumer: IndexedSourceMapConsumer_1
};

var SourceMapConsumer$1 = sourceMapConsumer.SourceMapConsumer;

function get_sourcemap_url(contents) {
    const reversed = contents
        .split('\n')
        .reverse()
        .join('\n');
    const match = /\/[/*]#[ \t]+sourceMappingURL=([^\s'"]+?)(?:[ \t]+|$)/gm.exec(reversed);
    if (match)
        return match[1];
    return undefined;
}
const file_cache = new Map();
function get_file_contents(file_path) {
    if (file_cache.has(file_path)) {
        return file_cache.get(file_path);
    }
    try {
        const data = fs__default['default'].readFileSync(file_path, 'utf8');
        file_cache.set(file_path, data);
        return data;
    }
    catch (_a) {
        return undefined;
    }
}
function sourcemap_stacktrace(stack) {
    const replace = (line) => line.replace(/^ {4}at (?:(.+?)\s+\()?(?:(.+?):(\d+)(?::(\d+))?)\)?/, (input, var_name, file_path, line_num, column) => {
        if (!file_path)
            return input;
        const contents = get_file_contents(file_path);
        if (!contents)
            return input;
        const sourcemap_url = get_sourcemap_url(contents);
        if (!sourcemap_url)
            return input;
        let dir = path__default['default'].dirname(file_path);
        let sourcemap_data;
        if (/^data:application\/json[^,]+base64,/.test(sourcemap_url)) {
            const raw_data = sourcemap_url.slice(sourcemap_url.indexOf(',') + 1);
            try {
                sourcemap_data = Buffer.from(raw_data, 'base64').toString();
            }
            catch (_a) {
                return input;
            }
        }
        else {
            const sourcemap_path = path__default['default'].resolve(dir, sourcemap_url);
            const data = get_file_contents(sourcemap_path);
            if (!data)
                return input;
            sourcemap_data = data;
            dir = path__default['default'].dirname(sourcemap_path);
        }
        let raw_sourcemap;
        try {
            raw_sourcemap = JSON.parse(sourcemap_data);
        }
        catch (_b) {
            return input;
        }
        const consumer = new SourceMapConsumer$1(raw_sourcemap);
        const pos = consumer.originalPositionFor({
            line: Number(line_num),
            column: Number(column),
            bias: SourceMapConsumer$1.LEAST_UPPER_BOUND
        });
        if (!pos.source)
            return input;
        const source_path = path__default['default'].resolve(dir, pos.source);
        const source = `${source_path}:${pos.line || 0}:${pos.column || 0}`;
        if (!var_name)
            return `    at ${source}`;
        return `    at ${var_name} (${source})`;
    });
    file_cache.clear();
    return stack
        .split('\n')
        .map(replace)
        .join('\n');
}

function get_page_handler(manifest, session_getter) {
    const get_build_info = () => JSON.parse(fs__default['default'].readFileSync(path__default['default'].join(build_dir, 'build.json'), 'utf-8'))
        ;
    const template = () => read_template(src_dir)
        ;
    const has_service_worker = fs__default['default'].existsSync(path__default['default'].join(build_dir, 'service-worker.js'));
    const { pages, error: error_route } = manifest;
    function bail(res, err) {
        console.error(err);
        const message = escape_html(typeof err === 'string' ? err : err.message) ;
        res.statusCode = 500;
        res.end(`<pre>${message}</pre>`);
    }
    function handle_error(req, res, statusCode, error) {
        handle_page({
            pattern: null,
            parts: [
                { name: null, component: { default: error_route } }
            ]
        }, req, res, statusCode, error || 'Unknown error');
    }
    function handle_page(page, req, res, status = 200, error = null) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const is_service_worker_index = req.path === '/service-worker-index.html';
            const build_info = get_build_info();
            res.setHeader('Content-Type', 'text/html');
            // preload main js and css
            // TODO detect other stuff we can preload like fonts?
            let preload_files = Array.isArray(build_info.assets.main) ? build_info.assets.main : [build_info.assets.main];
            if ((_a = build_info === null || build_info === void 0 ? void 0 : build_info.css) === null || _a === void 0 ? void 0 : _a.main) {
                preload_files = preload_files.concat((_b = build_info === null || build_info === void 0 ? void 0 : build_info.css) === null || _b === void 0 ? void 0 : _b.main);
            }
            let es6_preload = false;
            if (build_info.bundler === 'rollup') {
                es6_preload = true;
                const route = page.parts[page.parts.length - 1].file;
                const deps = build_info.dependencies[route];
                if (deps) {
                    preload_files = preload_files.concat(deps);
                }
            }
            else if (!error && !is_service_worker_index) {
                page.parts.forEach(part => {
                    if (!part)
                        return;
                    // using concat because it could be a string or an array. thanks webpack!
                    preload_files = preload_files.concat(build_info.assets[part.name]);
                });
            }
            const link = preload_files
                .filter((v, i, a) => a.indexOf(v) === i) // remove any duplicates
                .filter(file => file && !file.match(/\.map$/)) // exclude source maps
                .map((file) => {
                const as = /\.css$/.test(file) ? 'style' : 'script';
                const rel = es6_preload && as === 'script' ? 'modulepreload' : 'preload';
                return `<${req.baseUrl}/client/${file}>;rel="${rel}";as="${as}"`;
            })
                .join(', ');
            res.setHeader('Link', link);
            let session;
            try {
                session = yield session_getter(req, res);
            }
            catch (err) {
                return bail(res, err);
            }
            let redirect;
            let preload_error;
            const preload_context = {
                redirect: (statusCode, location) => {
                    if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
                        throw new Error('Conflicting redirects');
                    }
                    location = location.replace(/^\//g, ''); // leading slash (only)
                    redirect = { statusCode, location };
                },
                error: (statusCode, message) => {
                    preload_error = { statusCode, message };
                },
                fetch: (url, opts) => {
                    const protocol = req.socket.encrypted ? 'https' : 'http';
                    const parsed = new Url__default['default'].URL(url, `${protocol}://127.0.0.1:${process.env.PORT}${req.baseUrl ? req.baseUrl + '/' : ''}`);
                    opts = Object.assign({}, opts);
                    const include_credentials = (opts.credentials === 'include' ||
                        opts.credentials !== 'omit' && parsed.origin === `${protocol}://127.0.0.1:${process.env.PORT}`);
                    if (include_credentials) {
                        opts.headers = Object.assign({}, opts.headers);
                        const cookies = Object.assign({}, parse_1(req.headers.cookie || ''), parse_1(opts.headers.cookie || ''));
                        const set_cookie = res.getHeader('Set-Cookie');
                        (Array.isArray(set_cookie) ? set_cookie : [set_cookie]).forEach((s) => {
                            const m = /([^=]+)=([^;]+)/.exec(s);
                            if (m)
                                cookies[m[1]] = m[2];
                        });
                        const str = Object.keys(cookies)
                            .map(key => `${key}=${cookies[key]}`)
                            .join('; ');
                        opts.headers.cookie = str;
                        if (!opts.headers.authorization && req.headers.authorization) {
                            opts.headers.authorization = req.headers.authorization;
                        }
                    }
                    return fetch(parsed.href, opts);
                }
            };
            let preloaded;
            let match;
            let params;
            try {
                const root_preload = manifest.root_comp.preload || (() => { });
                const root_preloaded = root_preload.call(preload_context, {
                    host: req.headers.host,
                    path: req.path,
                    query: req.query,
                    params: {}
                }, session);
                match = error ? null : page.pattern.exec(req.path);
                let toPreload = [root_preloaded];
                if (!is_service_worker_index) {
                    toPreload = toPreload.concat(page.parts.map(part => {
                        if (!part)
                            return null;
                        // the deepest level is used below, to initialise the store
                        params = part.params ? part.params(match) : {};
                        return part.component.preload
                            ? part.component.preload.call(preload_context, {
                                host: req.headers.host,
                                path: req.path,
                                query: req.query,
                                params
                            }, session)
                            : {};
                    }));
                }
                preloaded = yield Promise.all(toPreload);
            }
            catch (err) {
                if (error) {
                    return bail(res, err);
                }
                preload_error = { statusCode: 500, message: err };
                preloaded = []; // appease TypeScript
            }
            try {
                if (redirect) {
                    const location = Url__default['default'].resolve((req.baseUrl || '') + '/', redirect.location);
                    res.statusCode = redirect.statusCode;
                    res.setHeader('Location', location);
                    res.end();
                    return;
                }
                if (preload_error) {
                    if (!error) {
                        handle_error(req, res, preload_error.statusCode, preload_error.message);
                    }
                    else {
                        bail(res, preload_error.message);
                    }
                    return;
                }
                const segments = req.path.split('/').filter(Boolean);
                // TODO make this less confusing
                const layout_segments = [segments[0]];
                let l = 1;
                page.parts.forEach((part, i) => {
                    layout_segments[l] = segments[i + 1];
                    if (!part)
                        return null;
                    l++;
                });
                if (error instanceof Error && error.stack) {
                    error.stack = sourcemap_stacktrace(error.stack);
                }
                const pageContext = {
                    host: req.headers.host,
                    path: req.path,
                    query: req.query,
                    params,
                    error: error
                        ? error instanceof Error
                            ? error
                            : { message: error, name: 'PreloadError' }
                        : null
                };
                const props = {
                    stores: {
                        page: {
                            subscribe: writable(pageContext).subscribe
                        },
                        preloading: {
                            subscribe: writable(null).subscribe
                        },
                        session: writable(session)
                    },
                    segments: layout_segments,
                    status: error ? status : 200,
                    error: pageContext.error,
                    level0: {
                        props: preloaded[0]
                    },
                    level1: {
                        segment: segments[0],
                        props: {}
                    }
                };
                if (!is_service_worker_index) {
                    let level_index = 1;
                    for (let i = 0; i < page.parts.length; i += 1) {
                        const part = page.parts[i];
                        if (!part)
                            continue;
                        props[`level${level_index++}`] = {
                            component: part.component.default,
                            props: preloaded[i + 1] || {},
                            segment: segments[i]
                        };
                    }
                }
                const { html, head, css } = App.render(props);
                const serialized = {
                    preloaded: `[${preloaded.map(data => try_serialize(data, err => {
                        console.error(`Failed to serialize preloaded data to transmit to the client at the /${segments.join('/')} route: ${err.message}`);
                        console.warn('The client will re-render over the server-rendered page fresh instead of continuing where it left off. See https://sapper.svelte.dev/docs#Return_value for more information');
                    })).join(',')}]`,
                    session: session && try_serialize(session, err => {
                        throw new Error(`Failed to serialize session data: ${err.message}`);
                    }),
                    error: error && serialize_error(props.error)
                };
                let script = `__SAPPER__={${[
                    error && `error:${serialized.error},status:${status}`,
                    `baseUrl:"${req.baseUrl}"`,
                    serialized.preloaded && `preloaded:${serialized.preloaded}`,
                    serialized.session && `session:${serialized.session}`
                ].filter(Boolean).join(',')}};`;
                if (has_service_worker) {
                    script += `if('serviceWorker' in navigator)navigator.serviceWorker.register('${req.baseUrl}/service-worker.js');`;
                }
                const file = [].concat(build_info.assets.main).filter(f => f && /\.js$/.test(f))[0];
                const main = `${req.baseUrl}/client/${file}`;
                // users can set a CSP nonce using res.locals.nonce
                const nonce_value = (res.locals && res.locals.nonce) ? res.locals.nonce : '';
                const nonce_attr = nonce_value ? ` nonce="${nonce_value}"` : '';
                if (build_info.bundler === 'rollup') {
                    if (build_info.legacy_assets) {
                        const legacy_main = `${req.baseUrl}/client/legacy/${build_info.legacy_assets.main}`;
                        script += `(function(){try{eval("async function x(){}");var main="${main}"}catch(e){main="${legacy_main}"};var s=document.createElement("script");try{new Function("if(0)import('')")();s.src=main;s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main",main);}document.head.appendChild(s);}());`;
                    }
                    else {
                        script += `var s=document.createElement("script");try{new Function("if(0)import('')")();s.src="${main}";s.type="module";s.crossOrigin="use-credentials";}catch(e){s.src="${req.baseUrl}/client/shimport@${build_info.shimport}.js";s.setAttribute("data-main","${main}")}document.head.appendChild(s)`;
                    }
                }
                else {
                    script += `</script><script${nonce_attr} src="${main}" defer>`;
                }
                let styles;
                // TODO make this consistent across apps
                // TODO embed build_info in placeholder.ts
                if (build_info.css && build_info.css.main) {
                    const css_chunks = new Set(build_info.css.main);
                    page.parts.forEach(part => {
                        if (!part || !build_info.dependencies)
                            return;
                        const deps_for_part = build_info.dependencies[part.file];
                        if (deps_for_part) {
                            deps_for_part.filter(d => d.endsWith('.css')).forEach(chunk => {
                                css_chunks.add(chunk);
                            });
                        }
                    });
                    styles = Array.from(css_chunks)
                        .map(href => `<link rel="stylesheet" href="client/${href}">`)
                        .join('');
                }
                else {
                    styles = (css && css.code ? `<style${nonce_attr}>${css.code}</style>` : '');
                }
                const body = template()
                    .replace('%sapper.base%', () => `<base href="${req.baseUrl}/">`)
                    .replace('%sapper.scripts%', () => `<script${nonce_attr}>${script}</script>`)
                    .replace('%sapper.html%', () => html)
                    .replace('%sapper.head%', () => head)
                    .replace('%sapper.styles%', () => styles)
                    .replace(/%sapper\.cspnonce%/g, () => nonce_value);
                res.statusCode = status;
                res.end(body);
            }
            catch (err) {
                if (error) {
                    bail(res, err);
                }
                else {
                    handle_error(req, res, 500, err);
                }
            }
        });
    }
    return function find_route(req, res, next) {
        const path = req.path === '/service-worker-index.html' ? '/' : req.path;
        const page = pages.find(page => page.pattern.test(path));
        if (page) {
            handle_page(page, req, res);
        }
        else {
            handle_error(req, res, 404, 'Not found');
        }
    };
}
function read_template(dir = build_dir) {
    return fs__default['default'].readFileSync(`${dir}/template.html`, 'utf-8');
}
function try_serialize(data, fail) {
    try {
        return devalue(data);
    }
    catch (err) {
        if (fail)
            fail(err);
        return null;
    }
}
// Ensure we return something truthy so the client will not re-render the page over the error
function serialize_error(error) {
    if (!error)
        return null;
    let serialized = try_serialize(error);
    if (!serialized) {
        const { name, message, stack } = error;
        serialized = try_serialize({ name, message, stack });
    }
    if (!serialized) {
        serialized = '{}';
    }
    return serialized;
}
function escape_html(html) {
    const chars = {
        '"': 'quot',
        '\'': '#39',
        '&': 'amp',
        '<': 'lt',
        '>': 'gt'
    };
    return html.replace(/["'&<>]/g, c => `&${chars[c]};`);
}

function middleware$1(opts = {}) {
    const { session, ignore } = opts;
    let emitted_basepath = false;
    return compose_handlers(ignore, [
        (req, res, next) => {
            if (req.baseUrl === undefined) {
                let originalUrl = req.originalUrl || req.url;
                if (req.url === '/' && originalUrl[originalUrl.length - 1] !== '/') {
                    originalUrl += '/';
                }
                req.baseUrl = originalUrl
                    ? originalUrl.slice(0, -req.url.length)
                    : '';
            }
            if (!emitted_basepath && process.send) {
                process.send({
                    __sapper__: true,
                    event: 'basepath',
                    basepath: req.baseUrl
                });
                emitted_basepath = true;
            }
            if (req.path === undefined) {
                req.path = req.url.replace(/\?.*/, '');
            }
            next();
        },
        fs__default['default'].existsSync(path__default['default'].join(build_dir, 'service-worker.js')) && serve({
            pathname: '/service-worker.js',
            cache_control: 'no-cache, no-store, must-revalidate'
        }),
        fs__default['default'].existsSync(path__default['default'].join(build_dir, 'service-worker.js.map')) && serve({
            pathname: '/service-worker.js.map',
            cache_control: 'no-cache, no-store, must-revalidate'
        }),
        serve({
            prefix: '/client/',
            cache_control: 'no-cache' 
        }),
        get_server_route_handler(manifest.server_routes),
        get_page_handler(manifest, session || noop)
    ].filter(Boolean));
}
function compose_handlers(ignore, handlers) {
    const total = handlers.length;
    function nth_handler(n, req, res, next) {
        if (n >= total) {
            return next();
        }
        handlers[n](req, res, () => nth_handler(n + 1, req, res, next));
    }
    return !ignore
        ? (req, res, next) => nth_handler(0, req, res, next)
        : (req, res, next) => {
            if (should_ignore(req.path, ignore)) {
                next();
            }
            else {
                nth_handler(0, req, res, next);
            }
        };
}
function should_ignore(uri, val) {
    if (Array.isArray(val))
        return val.some(x => should_ignore(uri, x));
    if (val instanceof RegExp)
        return val.test(uri);
    if (typeof val === 'function')
        return val(uri);
    return uri.startsWith(val.charCodeAt(0) === 47 ? val : `/${val}`);
}
function serve({ prefix, pathname, cache_control }) {
    const filter = pathname
        ? (req) => req.path === pathname
        : (req) => req.path.startsWith(prefix);
    const read = (file) => fs__default['default'].readFileSync(path__default['default'].join(build_dir, file))
        ;
    return (req, res, next) => {
        if (filter(req)) {
            const type = lite.getType(req.path);
            try {
                const file = path__default['default'].posix.normalize(decodeURIComponent(req.path));
                const data = read(file);
                res.setHeader('Content-Type', type);
                res.setHeader('Cache-Control', cache_control);
                res.end(data);
            }
            catch (err) {
                if (err.code === 'ENOENT') {
                    next();
                }
                else {
                    console.error(err);
                    res.statusCode = 500;
                    res.end('an error occurred while reading a static file from disk');
                }
            }
        }
        else {
            next();
        }
    };
}
function noop() { }

const { createLogger, format, transports } = require('winston');

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.combine(
    format.splat(),
    format.simple()
  ),
  transports: [
    new transports.Console()
  ],
});

// eslint-disable-next-line no-unused-vars
var middleware = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.
};

const { Service: Service$2 } = feathersMongodb__default['default'];

var Users_1 = class Users extends Service$2 {
  constructor(options, app) {
    super(options);
    
    app.get('mongoClient').then(db => {
      this.Model = db.collection('users');
    });
  }
};

var users_class = {
	Users: Users_1
};

const { authenticate: authenticate$1 } = authentication__default['default'].hooks;

const {
  hashPassword, protect
} = authenticationLocal__default['default'].hooks;

var users_hooks = {
  before: {
    all: [ ],
    find: [
     
    ],
    get: [ authenticate$1('jwt') ],
    create: [ hashPassword('password'), 
    async context => {
      let input = context.data;

      await context.service.find({
          query: {
                  email: input.email
                 }
          }).then((data) => {
              if (data.data.length) {
              throw new Error('Email sistemde mevcut!');
          }
      });
    }

    ],
    update: [ hashPassword('password'),  authenticate$1('jwt') ],
    patch:  [ hashPassword('password'),  authenticate$1('jwt') ],
    remove: [ authenticate$1('jwt') ]
  },

  after: {
    all: [ 


      protect('password'),
      // Make sure the password field is never sent to the client
      // Always must be the last hook
    
    ],
    find:[
      async context => {
        if (!context.arguments[0].authenticated) {
          context.result.data = {
            count : context.result.total
          };  
        
        }
        
      }
   
    ],
    get: [  protect('password') , async context => {
      context.app.local = context.result;
      
    }
  ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

// Initializes the `users` service on path `/users`
const { Users } = users_class;


var users_service = function (app) {
  const options = {
    paginate: app.get('paginate')
  };


  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(users_hooks);
};

const { Service: Service$1 } = feathersMongoose__default['default'];

var Uploadthree_1 = class Uploadthree extends Service$1 {
  
};

var uploadthree_class = {
	Uploadthree: Uploadthree_1
};

// uploadthree-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
var uploadthree_model = function (app) {
  const modelName = 'uploadthree';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    text: { type: String, required: true }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};

const { authenticate } = authentication__default['default'].hooks;

var uploadthree_hooks = {
  before: {
    all: [ ],
    find: [],
    get: [],
    create:[ authenticate('jwt'),
    async context => {
      let input = context.data;

      await context.service.find({
          query: {
                  text: input.text
                 }
          }).then((data) => {
              if (data.data.length) {
              throw new Error('Kategori sistemde mevcut!');
          }
      });
    }],
    update:[ authenticate('jwt')],
    patch: [ authenticate('jwt')],
    remove:[ authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

// Initializes the `uploadthree` service on path `/uploadthree`
const { Uploadthree } = uploadthree_class;



var uploadthree_service = function (app) {
  const options = {
    Model: uploadthree_model(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/uploadthree', new Uploadthree(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('uploadthree');

  service.hooks(uploadthree_hooks);
};

const { Service } = require('feathers-mongoose');
const { unlinkSync } = require('fs');

class File$1 extends Service {
   

    async remove(data, params) {

        console.log('dat : ', data, 'param : ', params, this);

        const { path: path$1 } = await super.get(data);
        unlinkSync(path.resolve(process.cwd(), 'static', path$1.replace(/\//, "")));


        
        return super.remove(data, params)
    }
}

var file_class = /*#__PURE__*/Object.freeze({
    __proto__: null,
    File: File$1
});

// file-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
var file_model = function (app) {
  const modelName = 'file';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    path: { type: String, required: true },
    name: String,
    category: String,
    describtion: String
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
  
};

authentication__default['default'].hooks;

var file_hooks = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

// Initializes the `file` service on path `/file`
const { File } = file_class;



var file_service = function (app) {
  const options = {
    Model: file_model(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/file', new File(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('file');

  service.hooks(file_hooks);
};

// eslint-disable-next-line no-unused-vars
var services = function (app) {
  app.configure(users_service);
  app.configure(uploadthree_service);
  app.configure(file_service);
};

// Application hooks that run for every service

var app_hooks = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

var channels = function(app) {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
  });

  app.on('login', (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if(connection) {
      // Obtain the logged in user from the connection
      // const user = connection.user;
      
      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);

      // Channels can be named anything and joined on any condition 
      
      // E.g. to send real-time events only to admins use
      // if(user.isAdmin) { app.channel('admins').join(connection); }

      // If the user has joined e.g. chat rooms
      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(connection));
      
      // Easily organize users by email and userid for things like messaging
      // app.channel(`emails/${user.email}`).join(connection);
      // app.channel(`userIds/${user.id}`).join(connection);
    }
  });

  // eslint-disable-next-line no-unused-vars
  app.publish((data, hook) => {
    // Here you can add event publishers to channels set up in `channels.js`
    // To publish only for a specific event use `app.publish(eventname, () => {})`

    console.log('Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'); // eslint-disable-line

    // e.g. to publish all service events to all authenticated users use
    return app.channel('authenticated');
  });

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));
  
  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
};

const { AuthenticationService, JWTStrategy } = authentication__default['default'];
const { LocalStrategy } = authenticationLocal__default['default'];
const { expressOauth } = authenticationOauth__default['default'];

var authentication = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};

const MongoClient = mongodb__default['default'].MongoClient;

var mongodb = function (app) {
  const connection = app.get('mongodb');
  const database = connection.substr(connection.lastIndexOf('/') + 1);
  const mongoClient = MongoClient.connect(connection, { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(client => client.db(database));

  app.set('mongoClient', mongoClient);
};

var mongoose_1 = function (app) {
  mongoose__default['default'].connect(
    app.get('mongodb'),
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true  }
  ).catch(err => {
    logger.error(err);
    process.exit(1);
  });

  app.set('mongooseClient', mongoose__default['default']);
};

const app = express__default['default'](feathers__default$1['default']());

// Load app configuration
app.configure(configuration__default['default']());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet__default['default']({
  contentSecurityPolicy: false
}));
app.use(cors__default['default']());
app.use(compression__default['default']());
app.use(express__default['default'].json());
app.use(express__default['default'].urlencoded({ extended: true }));
app.use(serveFavicon__default['default'](path__default['default'].join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express__default['default'].static(app.get('public')));

// Set up Plugins and providers
app.configure(express__default['default'].rest());
app.configure(socketio__default['default']());

app.configure(mongodb);

app.configure(mongoose_1);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 4
app.use(express__default['default'].errorHandler({ logger }));

app.hooks(app_hooks);

var app_1 = app;

/* eslint-disable no-console */
const { PORT, NODE_ENV } = process.env;
process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);
app_1.use(fileUpload__default['default']({
    useTempFiles : true,
    tempFileDir : '/tmp/',
	createParentPath: true
}));

app_1.post('/upload', async (req, res) => {
	req.files.files.name.replace(" ", ""); 
	const mimetype = req.files.files.mimetype.split('/')[1];
	console.log(req.body);
	await req.files.files.mv(path.resolve(process.cwd(), 'static', req.body.category, `${req.body.name}.${mimetype}`), async err => {
		if(err) console.error(err);
		const file = await app_1.service('file').create({
			path : `/${req.body.category}/${req.body.name}.${mimetype}`,
			name : req.body.name,
			category: req.body.category,
			describtion: req.body.description
		});
	
		console.log('file', file);
	});

	
});
app_1 // You can also use Express
	.use(
		compression__default['default']({ threshold: 0 }),
		
		middleware$1({
			session: (req,res) => {
				
			}
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});

app_1.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app_1.get('host'), port)
);