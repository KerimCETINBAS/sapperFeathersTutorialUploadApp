import { $ as identity, w as get_store_value, x as client, S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, y as validate_each_argument, a0 as create_slot, v as validate_slots, a as stores$1, b as validate_store, c as component_subscribe, B as set_store_value, D as feather, e as element, f as space, g as claim_element, h as children, k as detach_dev, l as claim_space, m as attr_dev, n as add_location, o as insert_hydration_dev, p as append_hydration_dev, I as transition_in, J as transition_out, N as check_outros, q as listen_dev, a1 as update_slot_base, a2 as get_all_dirty_from_scope, a3 as get_slot_changes, K as destroy_each, R as run_all, t as text, j as claim_text, r as set_data_dev, X as add_render_callback, a4 as create_in_transition, a5 as create_out_transition, M as group_outros } from './client.e7dbbcc0.js';

function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
    const o = +getComputedStyle(node).opacity;
    return {
        delay,
        duration,
        easing,
        css: t => `opacity: ${t * o}`
    };
}

/* src/routes/panel/_layout.svelte generated by Svelte v3.42.1 */
const file = "src/routes/panel/_layout.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[10] = list[i];
	return child_ctx;
}

// (61:14) {#if navHover}
function create_if_block(ctx) {
	let span;
	let t_value = /*navItem*/ ctx[10].text + "";
	let t;
	let span_intro;
	let span_outro;
	let current;

	const block = {
		c: function create() {
			span = element("span");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", {});
			var span_nodes = children(span);
			t = claim_text(span_nodes, t_value);
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file, 61, 16, 1956);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, span, anchor);
			append_hydration_dev(span, t);
			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty & /*navItems*/ 2) && t_value !== (t_value = /*navItem*/ ctx[10].text + "")) set_data_dev(t, t_value);
		},
		i: function intro(local) {
			if (current) return;

			add_render_callback(() => {
				if (span_outro) span_outro.end(1);
				span_intro = create_in_transition(span, fade, { duration: 200, delay: 50 });
				span_intro.start();
			});

			current = true;
		},
		o: function outro(local) {
			if (span_intro) span_intro.invalidate();
			span_outro = create_out_transition(span, fade, { duration: 0, delay: 0 });
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			if (detaching && span_outro) span_outro.end();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(61:14) {#if navHover}",
		ctx
	});

	return block;
}

// (57:8) {#each navItems as navItem}
function create_each_block(ctx) {
	let li;
	let a;
	let i;
	let i_class_value;
	let t0;
	let a_href_value;
	let t1;
	let li_arria_current_value;
	let current;
	let if_block = /*navHover*/ ctx[0] && create_if_block(ctx);

	const block = {
		c: function create() {
			li = element("li");
			a = element("a");
			i = element("i");
			t0 = space();
			if (if_block) if_block.c();
			t1 = space();
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", { "arria-current": true, class: true });
			var li_nodes = children(li);
			a = claim_element(li_nodes, "A", { href: true, class: true });
			var a_nodes = children(a);
			i = claim_element(a_nodes, "I", { class: true });
			children(i).forEach(detach_dev);
			t0 = claim_space(a_nodes);
			if (if_block) if_block.l(a_nodes);
			a_nodes.forEach(detach_dev);
			t1 = claim_space(li_nodes);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(i, "class", i_class_value = " w-8  " + /*navItem*/ ctx[10].icon + " svelte-1yzwhdn");
			add_location(i, file, 59, 14, 1874);
			attr_dev(a, "href", a_href_value = /*navItem*/ ctx[10].path);
			attr_dev(a, "class", "block w-full h-full p-3 svelte-1yzwhdn");
			add_location(a, file, 58, 12, 1802);
			attr_dev(li, "arria-current", li_arria_current_value = /*navItem*/ ctx[10].curent);
			attr_dev(li, "class", "w-[calc(100%_-_0.5rem)]  duration-200 transition-colors hover:text-white hover:bg-rose-800 svelte-1yzwhdn");
			add_location(li, file, 57, 10, 1653);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, li, anchor);
			append_hydration_dev(li, a);
			append_hydration_dev(a, i);
			append_hydration_dev(a, t0);
			if (if_block) if_block.m(a, null);
			append_hydration_dev(li, t1);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (!current || dirty & /*navItems*/ 2 && i_class_value !== (i_class_value = " w-8  " + /*navItem*/ ctx[10].icon + " svelte-1yzwhdn")) {
				attr_dev(i, "class", i_class_value);
			}

			if (/*navHover*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*navHover*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(a, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (!current || dirty & /*navItems*/ 2 && a_href_value !== (a_href_value = /*navItem*/ ctx[10].path)) {
				attr_dev(a, "href", a_href_value);
			}

			if (!current || dirty & /*navItems*/ 2 && li_arria_current_value !== (li_arria_current_value = /*navItem*/ ctx[10].curent)) {
				attr_dev(li, "arria-current", li_arria_current_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			if (if_block) if_block.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(57:8) {#each navItems as navItem}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div2;
	let aside;
	let nav;
	let ul;
	let t;
	let div1;
	let div0;
	let current;
	let mounted;
	let dispose;
	let each_value = /*navItems*/ ctx[1];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

	const block = {
		c: function create() {
			div2 = element("div");
			aside = element("aside");
			nav = element("nav");
			ul = element("ul");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t = space();
			div1 = element("div");
			div0 = element("div");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			aside = claim_element(div2_nodes, "ASIDE", { class: true });
			var aside_nodes = children(aside);
			nav = claim_element(aside_nodes, "NAV", { class: true });
			var nav_nodes = children(nav);
			ul = claim_element(nav_nodes, "UL", { class: true });
			var ul_nodes = children(ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(ul_nodes);
			}

			ul_nodes.forEach(detach_dev);
			nav_nodes.forEach(detach_dev);
			aside_nodes.forEach(detach_dev);
			t = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			if (default_slot) default_slot.l(div0_nodes);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(ul, "class", "flex flex-col h-full  w-22 hover:w-62  items-center justify-center fixed  duration-75               bg-rose-500 shadow shadow-xl shadow-dark-900 drop-shadow-md svelte-1yzwhdn");
			add_location(ul, file, 55, 6, 1434);
			attr_dev(nav, "class", "h-full w-22 svelte-1yzwhdn");
			add_location(nav, file, 54, 4, 1294);
			attr_dev(aside, "class", " svelte-1yzwhdn");
			add_location(aside, file, 53, 2, 1273);
			attr_dev(div0, "class", "flex-1 svelte-1yzwhdn");
			add_location(div0, file, 72, 4, 2245);
			attr_dev(div1, "class", "w-full flex flex-col  svelte-1yzwhdn");
			add_location(div1, file, 71, 2, 2205);
			attr_dev(div2, "class", "w-full h-full flex  select-none svelte-1yzwhdn");
			add_location(div2, file, 52, 0, 1225);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div2, anchor);
			append_hydration_dev(div2, aside);
			append_hydration_dev(aside, nav);
			append_hydration_dev(nav, ul);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(ul, null);
			}

			append_hydration_dev(div2, t);
			append_hydration_dev(div2, div1);
			append_hydration_dev(div1, div0);

			if (default_slot) {
				default_slot.m(div0, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(nav, "mouseenter", /*mouseenter_handler*/ ctx[7], false, false, false),
					listen_dev(nav, "mouseleave", /*mouseleave_handler*/ ctx[8], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*navItems, navHover*/ 3) {
				each_value = /*navItems*/ ctx[1];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(ul, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[5],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			destroy_each(each_blocks, detaching);
			if (default_slot) default_slot.d(detaching);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

async function preload(page, session) {
	{
		const users = await get_store_value(feather).service("users").find();
		const createAdmin = users.data.length === 0 ? true : false;
		get_store_value(feather).configure(client.authentication({ storage: window.localStorage }));
		const client$1 = get_store_value(feather);
		if (createAdmin) return this.redirect(302, "/create_admin");
		const user = await client$1.reAuthenticate().catch(() => false);
		if (user) return { user: user?.user }; else this.redirect(302, "/signin");
	}
}

function instance($$self, $$props, $$invalidate) {
	let navItems;
	let $session;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Layout', slots, ['default']);
	const { session } = stores$1();
	validate_store(session, 'session');
	component_subscribe($$self, session, value => $$invalidate(9, $session = value));
	let { segment, user } = $$props;
	set_store_value(session, $session = { user }, $session);
	let navHover = false;
	const writable_props = ['segment', 'user'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Layout> was created with unknown prop '${key}'`);
	});

	const mouseenter_handler = () => setTimeout(() => $$invalidate(0, navHover = true), 200);
	const mouseleave_handler = () => $$invalidate(0, navHover = false);

	$$self.$$set = $$props => {
		if ('segment' in $$props) $$invalidate(3, segment = $$props.segment);
		if ('user' in $$props) $$invalidate(4, user = $$props.user);
		if ('$$scope' in $$props) $$invalidate(5, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		get: get_store_value,
		feather,
		feathers: client,
		preload,
		stores: stores$1,
		session,
		fade,
		segment,
		user,
		navHover,
		navItems,
		$session
	});

	$$self.$inject_state = $$props => {
		if ('segment' in $$props) $$invalidate(3, segment = $$props.segment);
		if ('user' in $$props) $$invalidate(4, user = $$props.user);
		if ('navHover' in $$props) $$invalidate(0, navHover = $$props.navHover);
		if ('navItems' in $$props) $$invalidate(1, navItems = $$props.navItems);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*segment*/ 8) {
			$$invalidate(1, navItems = [
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
			]);
		}
	};

	return [
		navHover,
		navItems,
		session,
		segment,
		user,
		$$scope,
		slots,
		mouseenter_handler,
		mouseleave_handler
	];
}

class Layout extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { segment: 3, user: 4 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Layout",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*segment*/ ctx[3] === undefined && !('segment' in props)) {
			console.warn("<Layout> was created without expected prop 'segment'");
		}

		if (/*user*/ ctx[4] === undefined && !('user' in props)) {
			console.warn("<Layout> was created without expected prop 'user'");
		}
	}

	get segment() {
		throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segment(value) {
		throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get user() {
		throw new Error("<Layout>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set user(value) {
		throw new Error("<Layout>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export { Layout as default, preload };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX2xheW91dC5kMDM5YjZkZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N2ZWx0ZS90cmFuc2l0aW9uL2luZGV4Lm1qcyIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvcGFuZWwvX2xheW91dC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3ViaWNJbk91dCwgbGluZWFyLCBjdWJpY091dCB9IGZyb20gJy4uL2Vhc2luZy9pbmRleC5tanMnO1xuaW1wb3J0IHsgaXNfZnVuY3Rpb24sIGFzc2lnbiB9IGZyb20gJy4uL2ludGVybmFsL2luZGV4Lm1qcyc7XG5cbi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG5mdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cblxuZnVuY3Rpb24gYmx1cihub2RlLCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSA0MDAsIGVhc2luZyA9IGN1YmljSW5PdXQsIGFtb3VudCA9IDUsIG9wYWNpdHkgPSAwIH0gPSB7fSkge1xuICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICBjb25zdCB0YXJnZXRfb3BhY2l0eSA9ICtzdHlsZS5vcGFjaXR5O1xuICAgIGNvbnN0IGYgPSBzdHlsZS5maWx0ZXIgPT09ICdub25lJyA/ICcnIDogc3R5bGUuZmlsdGVyO1xuICAgIGNvbnN0IG9kID0gdGFyZ2V0X29wYWNpdHkgKiAoMSAtIG9wYWNpdHkpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGRlbGF5LFxuICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgZWFzaW5nLFxuICAgICAgICBjc3M6IChfdCwgdSkgPT4gYG9wYWNpdHk6ICR7dGFyZ2V0X29wYWNpdHkgLSAob2QgKiB1KX07IGZpbHRlcjogJHtmfSBibHVyKCR7dSAqIGFtb3VudH1weCk7YFxuICAgIH07XG59XG5mdW5jdGlvbiBmYWRlKG5vZGUsIHsgZGVsYXkgPSAwLCBkdXJhdGlvbiA9IDQwMCwgZWFzaW5nID0gbGluZWFyIH0gPSB7fSkge1xuICAgIGNvbnN0IG8gPSArZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS5vcGFjaXR5O1xuICAgIHJldHVybiB7XG4gICAgICAgIGRlbGF5LFxuICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgZWFzaW5nLFxuICAgICAgICBjc3M6IHQgPT4gYG9wYWNpdHk6ICR7dCAqIG99YFxuICAgIH07XG59XG5mdW5jdGlvbiBmbHkobm9kZSwgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gNDAwLCBlYXNpbmcgPSBjdWJpY091dCwgeCA9IDAsIHkgPSAwLCBvcGFjaXR5ID0gMCB9ID0ge30pIHtcbiAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgY29uc3QgdGFyZ2V0X29wYWNpdHkgPSArc3R5bGUub3BhY2l0eTtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBzdHlsZS50cmFuc2Zvcm0gPT09ICdub25lJyA/ICcnIDogc3R5bGUudHJhbnNmb3JtO1xuICAgIGNvbnN0IG9kID0gdGFyZ2V0X29wYWNpdHkgKiAoMSAtIG9wYWNpdHkpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGRlbGF5LFxuICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgZWFzaW5nLFxuICAgICAgICBjc3M6ICh0LCB1KSA9PiBgXG5cdFx0XHR0cmFuc2Zvcm06ICR7dHJhbnNmb3JtfSB0cmFuc2xhdGUoJHsoMSAtIHQpICogeH1weCwgJHsoMSAtIHQpICogeX1weCk7XG5cdFx0XHRvcGFjaXR5OiAke3RhcmdldF9vcGFjaXR5IC0gKG9kICogdSl9YFxuICAgIH07XG59XG5mdW5jdGlvbiBzbGlkZShub2RlLCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSA0MDAsIGVhc2luZyA9IGN1YmljT3V0IH0gPSB7fSkge1xuICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICBjb25zdCBvcGFjaXR5ID0gK3N0eWxlLm9wYWNpdHk7XG4gICAgY29uc3QgaGVpZ2h0ID0gcGFyc2VGbG9hdChzdHlsZS5oZWlnaHQpO1xuICAgIGNvbnN0IHBhZGRpbmdfdG9wID0gcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nVG9wKTtcbiAgICBjb25zdCBwYWRkaW5nX2JvdHRvbSA9IHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ0JvdHRvbSk7XG4gICAgY29uc3QgbWFyZ2luX3RvcCA9IHBhcnNlRmxvYXQoc3R5bGUubWFyZ2luVG9wKTtcbiAgICBjb25zdCBtYXJnaW5fYm90dG9tID0gcGFyc2VGbG9hdChzdHlsZS5tYXJnaW5Cb3R0b20pO1xuICAgIGNvbnN0IGJvcmRlcl90b3Bfd2lkdGggPSBwYXJzZUZsb2F0KHN0eWxlLmJvcmRlclRvcFdpZHRoKTtcbiAgICBjb25zdCBib3JkZXJfYm90dG9tX3dpZHRoID0gcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJCb3R0b21XaWR0aCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVsYXksXG4gICAgICAgIGR1cmF0aW9uLFxuICAgICAgICBlYXNpbmcsXG4gICAgICAgIGNzczogdCA9PiAnb3ZlcmZsb3c6IGhpZGRlbjsnICtcbiAgICAgICAgICAgIGBvcGFjaXR5OiAke01hdGgubWluKHQgKiAyMCwgMSkgKiBvcGFjaXR5fTtgICtcbiAgICAgICAgICAgIGBoZWlnaHQ6ICR7dCAqIGhlaWdodH1weDtgICtcbiAgICAgICAgICAgIGBwYWRkaW5nLXRvcDogJHt0ICogcGFkZGluZ190b3B9cHg7YCArXG4gICAgICAgICAgICBgcGFkZGluZy1ib3R0b206ICR7dCAqIHBhZGRpbmdfYm90dG9tfXB4O2AgK1xuICAgICAgICAgICAgYG1hcmdpbi10b3A6ICR7dCAqIG1hcmdpbl90b3B9cHg7YCArXG4gICAgICAgICAgICBgbWFyZ2luLWJvdHRvbTogJHt0ICogbWFyZ2luX2JvdHRvbX1weDtgICtcbiAgICAgICAgICAgIGBib3JkZXItdG9wLXdpZHRoOiAke3QgKiBib3JkZXJfdG9wX3dpZHRofXB4O2AgK1xuICAgICAgICAgICAgYGJvcmRlci1ib3R0b20td2lkdGg6ICR7dCAqIGJvcmRlcl9ib3R0b21fd2lkdGh9cHg7YFxuICAgIH07XG59XG5mdW5jdGlvbiBzY2FsZShub2RlLCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSA0MDAsIGVhc2luZyA9IGN1YmljT3V0LCBzdGFydCA9IDAsIG9wYWNpdHkgPSAwIH0gPSB7fSkge1xuICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICBjb25zdCB0YXJnZXRfb3BhY2l0eSA9ICtzdHlsZS5vcGFjaXR5O1xuICAgIGNvbnN0IHRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybSA9PT0gJ25vbmUnID8gJycgOiBzdHlsZS50cmFuc2Zvcm07XG4gICAgY29uc3Qgc2QgPSAxIC0gc3RhcnQ7XG4gICAgY29uc3Qgb2QgPSB0YXJnZXRfb3BhY2l0eSAqICgxIC0gb3BhY2l0eSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVsYXksXG4gICAgICAgIGR1cmF0aW9uLFxuICAgICAgICBlYXNpbmcsXG4gICAgICAgIGNzczogKF90LCB1KSA9PiBgXG5cdFx0XHR0cmFuc2Zvcm06ICR7dHJhbnNmb3JtfSBzY2FsZSgkezEgLSAoc2QgKiB1KX0pO1xuXHRcdFx0b3BhY2l0eTogJHt0YXJnZXRfb3BhY2l0eSAtIChvZCAqIHUpfVxuXHRcdGBcbiAgICB9O1xufVxuZnVuY3Rpb24gZHJhdyhub2RlLCB7IGRlbGF5ID0gMCwgc3BlZWQsIGR1cmF0aW9uLCBlYXNpbmcgPSBjdWJpY0luT3V0IH0gPSB7fSkge1xuICAgIGNvbnN0IGxlbiA9IG5vZGUuZ2V0VG90YWxMZW5ndGgoKTtcbiAgICBpZiAoZHVyYXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoc3BlZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZHVyYXRpb24gPSA4MDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IGxlbiAvIHNwZWVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkdXJhdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBkdXJhdGlvbiA9IGR1cmF0aW9uKGxlbik7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGRlbGF5LFxuICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgZWFzaW5nLFxuICAgICAgICBjc3M6ICh0LCB1KSA9PiBgc3Ryb2tlLWRhc2hhcnJheTogJHt0ICogbGVufSAke3UgKiBsZW59YFxuICAgIH07XG59XG5mdW5jdGlvbiBjcm9zc2ZhZGUoX2EpIHtcbiAgICB2YXIgeyBmYWxsYmFjayB9ID0gX2EsIGRlZmF1bHRzID0gX19yZXN0KF9hLCBbXCJmYWxsYmFja1wiXSk7XG4gICAgY29uc3QgdG9fcmVjZWl2ZSA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCB0b19zZW5kID0gbmV3IE1hcCgpO1xuICAgIGZ1bmN0aW9uIGNyb3NzZmFkZShmcm9tLCBub2RlLCBwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gZCA9PiBNYXRoLnNxcnQoZCkgKiAzMCwgZWFzaW5nID0gY3ViaWNPdXQgfSA9IGFzc2lnbihhc3NpZ24oe30sIGRlZmF1bHRzKSwgcGFyYW1zKTtcbiAgICAgICAgY29uc3QgdG8gPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBkeCA9IGZyb20ubGVmdCAtIHRvLmxlZnQ7XG4gICAgICAgIGNvbnN0IGR5ID0gZnJvbS50b3AgLSB0by50b3A7XG4gICAgICAgIGNvbnN0IGR3ID0gZnJvbS53aWR0aCAvIHRvLndpZHRoO1xuICAgICAgICBjb25zdCBkaCA9IGZyb20uaGVpZ2h0IC8gdG8uaGVpZ2h0O1xuICAgICAgICBjb25zdCBkID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm0gPSBzdHlsZS50cmFuc2Zvcm0gPT09ICdub25lJyA/ICcnIDogc3R5bGUudHJhbnNmb3JtO1xuICAgICAgICBjb25zdCBvcGFjaXR5ID0gK3N0eWxlLm9wYWNpdHk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkZWxheSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiBpc19mdW5jdGlvbihkdXJhdGlvbikgPyBkdXJhdGlvbihkKSA6IGR1cmF0aW9uLFxuICAgICAgICAgICAgZWFzaW5nLFxuICAgICAgICAgICAgY3NzOiAodCwgdSkgPT4gYFxuXHRcdFx0XHRvcGFjaXR5OiAke3QgKiBvcGFjaXR5fTtcblx0XHRcdFx0dHJhbnNmb3JtLW9yaWdpbjogdG9wIGxlZnQ7XG5cdFx0XHRcdHRyYW5zZm9ybTogJHt0cmFuc2Zvcm19IHRyYW5zbGF0ZSgke3UgKiBkeH1weCwke3UgKiBkeX1weCkgc2NhbGUoJHt0ICsgKDEgLSB0KSAqIGR3fSwgJHt0ICsgKDEgLSB0KSAqIGRofSk7XG5cdFx0XHRgXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyYW5zaXRpb24oaXRlbXMsIGNvdW50ZXJwYXJ0cywgaW50cm8pIHtcbiAgICAgICAgcmV0dXJuIChub2RlLCBwYXJhbXMpID0+IHtcbiAgICAgICAgICAgIGl0ZW1zLnNldChwYXJhbXMua2V5LCB7XG4gICAgICAgICAgICAgICAgcmVjdDogbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudGVycGFydHMuaGFzKHBhcmFtcy5rZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgcmVjdCB9ID0gY291bnRlcnBhcnRzLmdldChwYXJhbXMua2V5KTtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcnBhcnRzLmRlbGV0ZShwYXJhbXMua2V5KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyb3NzZmFkZShyZWN0LCBub2RlLCBwYXJhbXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgbm9kZSBpcyBkaXNhcHBlYXJpbmcgYWx0b2dldGhlclxuICAgICAgICAgICAgICAgIC8vIChpLmUuIHdhc24ndCBjbGFpbWVkIGJ5IHRoZSBvdGhlciBsaXN0KVxuICAgICAgICAgICAgICAgIC8vIHRoZW4gd2UgbmVlZCB0byBzdXBwbHkgYW4gb3V0cm9cbiAgICAgICAgICAgICAgICBpdGVtcy5kZWxldGUocGFyYW1zLmtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbGxiYWNrICYmIGZhbGxiYWNrKG5vZGUsIHBhcmFtcywgaW50cm8pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIFtcbiAgICAgICAgdHJhbnNpdGlvbih0b19zZW5kLCB0b19yZWNlaXZlLCBmYWxzZSksXG4gICAgICAgIHRyYW5zaXRpb24odG9fcmVjZWl2ZSwgdG9fc2VuZCwgdHJ1ZSlcbiAgICBdO1xufVxuXG5leHBvcnQgeyBibHVyLCBjcm9zc2ZhZGUsIGRyYXcsIGZhZGUsIGZseSwgc2NhbGUsIHNsaWRlIH07XG4iLCI8c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIj5cbiAgICBpbXBvcnQgeyBnZXQgfSBmcm9tICdzdmVsdGUvc3RvcmUnXG4gICAgaW1wb3J0IHsgZmVhdGhlciB9IGZyb20gJy4uLy4uL2xpYi9zdG9yZXMvZmVhdGhlcidcblxuICAgIGltcG9ydCBmZWF0aGVycyBmcm9tICdAZmVhdGhlcnNqcy9jbGllbnQnXG4gICAgZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByZWxvYWQocGFnZSwgc2Vzc2lvbikge1xuICAgICAgXG4gICAgICAgaWYocHJvY2Vzcy5icm93c2VyKSB7XG4gICAgICAgICAgICBjb25zdCB1c2VycyA9IGF3YWl0IGdldChmZWF0aGVyKS5zZXJ2aWNlKCd1c2VycycpLmZpbmQoKVxuICAgICAgICAgICAgY29uc3QgY3JlYXRlQWRtaW4gPSB1c2Vycy5kYXRhLmxlbmd0aCA9PT0gMCA/IHRydWUgOiBmYWxzZVxuXG4gICAgICAgICAgICBnZXQoZmVhdGhlcikuY29uZmlndXJlKGZlYXRoZXJzLmF1dGhlbnRpY2F0aW9uKHtcbiAgICAgICAgICAgICAgICBzdG9yYWdlOiB3aW5kb3cubG9jYWxTdG9yYWdlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBjb25zdCBjbGllbnQgPSAgZ2V0KGZlYXRoZXIpXG4gICAgICAgICAgICBpZiggY3JlYXRlQWRtaW4gKSByZXR1cm4gdGhpcy5yZWRpcmVjdCgzMDIsICcvY3JlYXRlX2FkbWluJylcbiAgICAgICAgICAgXG4gICAgICAgICAgIFxuICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBjbGllbnQucmVBdXRoZW50aWNhdGUoKS5jYXRjaCggKCkgPT4gZmFsc2UpXG4gICAgICAgICAgICBpZih1c2VyKSByZXR1cm4geyB1c2VyIDogdXNlcj8udXNlcn1cbiAgICAgICAgICAgIGVsc2UgdGhpcy5yZWRpcmVjdCgzMDIsICcvc2lnbmluJylcbiAgICAgICB9XG4gICAgfVxuXG48L3NjcmlwdD5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IHsgc3RvcmVzIH0gZnJvbSAnQHNhcHBlci9hcHAnXG4gICAgY29uc3QgeyBzZXNzaW9uIH0gPSBzdG9yZXMoKVxuICAgIGltcG9ydCB7IGZhZGUgfSBmcm9tICdzdmVsdGUvdHJhbnNpdGlvbic7XG4gICAgZXhwb3J0IGxldCBzZWdtZW50LCB1c2VyXG5cbiAgICAkc2Vzc2lvbiA9IHtcbiAgICAgICAgdXNlclxuICAgIH1cbiAgICAkOm5hdkl0ZW1zID0gW1xuICAgICAgICB7ICAgXG4gICAgICAgICAgICBpY29uIDogXCJmYSBmYS11cGxvYWRcIixcbiAgICAgICAgICAgIHRleHQgOiBcIlnDvGtsZW5lbmxlclwiLFxuICAgICAgICAgICAgcGF0aCA6IFwiL3BhbmVsL1wiLFxuICAgICAgICAgICAgY3VyZW50OiBzZWdtZW50ID09PSB1bmRlZmluZWQgPyAncGFnZScgOiB1bmRlZmluZWQsXG4gICAgICAgIH0sXG4gICAgICAgIHsgICBcbiAgICAgICAgICAgIGljb24gOiBcImZhcyBmYS1mb2xkZXJcIixcbiAgICAgICAgICAgIHRleHQgOiBcIkthdGFnb3JpbGVyXCIsXG4gICAgICAgICAgICBwYXRoIDogXCIvcGFuZWwvdHJlZVwiLFxuICAgICAgICAgICAgY3VyZW50OiBzZWdtZW50ID09PSBcInRyZWVcIiA/ICdwYWdlJyA6IHVuZGVmaW5lZCxcbiAgICAgICAgfSxcbiAgICBdXG5cbiAgICBsZXQgbmF2SG92ZXIgPSBmYWxzZVxuXG5cbjwvc2NyaXB0PlxuXG5cblxuPGRpdiBjbGFzcz1cInctZnVsbCBoLWZ1bGwgZmxleCAgc2VsZWN0LW5vbmVcIj5cbiAgICA8YXNpZGUgXG4gXG4gICAgY2xhc3M9XCJcIj5cbiAgICAgICAgPG5hdiBcbiAgICAgICAgICAgIG9uOm1vdXNlZW50ZXI9eygpPT4gc2V0VGltZW91dCgoKT0+bmF2SG92ZXIgPSB0cnVlLCAyMDApfVxuICAgICAgICAgICAgb246bW91c2VsZWF2ZT17KCk9Pm5hdkhvdmVyID0gZmFsc2V9XG4gICAgICAgICAgICBjbGFzcz1cImgtZnVsbCB3LTIyXCI+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJmbGV4IGZsZXgtY29sIGgtZnVsbCAgdy0yMiBob3Zlcjp3LTYyICBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZml4ZWQgIGR1cmF0aW9uLTc1IFxuICAgICAgICAgICAgIGJnLXJvc2UtNTAwIHNoYWRvdyBzaGFkb3cteGwgc2hhZG93LWRhcmstOTAwIGRyb3Atc2hhZG93LW1kXCI+XG5cbiAgICAgICAgICAgICAgICB7I2VhY2ggbmF2SXRlbXMgYXMgbmF2SXRlbX1cbiAgICAgICAgICAgICAgICAgICAgPGxpIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycmlhLWN1cnJlbnQ9XCJ7bmF2SXRlbS5jdXJlbnR9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidy1bY2FsYygxMDAlXy1fMC41cmVtKV0gIGR1cmF0aW9uLTIwMCB0cmFuc2l0aW9uLWNvbG9ycyBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXJvc2UtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwie25hdkl0ZW0ucGF0aH1cIiBjbGFzcz1cImJsb2NrIHctZnVsbCBoLWZ1bGwgcC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCIgdy04ICB7bmF2SXRlbS5pY29ufVwiPjwvaT4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyNpZiBuYXZIb3Zlcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbjpmYWRlPVwie3sgZHVyYXRpb24gOiAyMDAgLCBkZWxheSA6IDUwfX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dDpmYWRlPVwie3sgZHVyYXRpb24gOiAwICwgZGVsYXkgOiAwfX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge25hdkl0ZW0udGV4dH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvaWZ9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgey9lYWNofVxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvbmF2PlxuICAgIDwvYXNpZGU+XG4gICAgPGRpdiBjbGFzcz1cInctZnVsbCBmbGV4IGZsZXgtY29sIFwiPlxuICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC0xXCI+XG4gICAgICAgICAgICA8c2xvdCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG5cblxuPHN0eWxlPlxuICAgICBhc2lkZTpob3ZlciBuYXYgdWwgbGkgYSBpIHtcbiAgICAgICAgIEBhcHBseSB3LTY7XG4gICAgIH1cbiAgICAgXG5cbiAgICAgW2FycmlhLWN1cnJlbnRdIHtcbiAgICAgICAgIEBhcHBseSBiZy1yb3NlLTcwMCB0ZXh0LWdyYXktMTAwO1xuICAgICB9XG48L3N0eWxlPiJdLCJuYW1lcyI6WyJsaW5lYXIiLCJmZWF0aGVycyIsImNsaWVudCIsImdldCIsInN0b3JlcyJdLCJtYXBwaW5ncyI6Ijs7QUEwQ0EsU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxRQUFRLEdBQUcsR0FBRyxFQUFFLE1BQU0sR0FBR0EsUUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFO0FBQ3pFLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDOUMsSUFBSSxPQUFPO0FBQ1gsUUFBUSxLQUFLO0FBQ2IsUUFBUSxRQUFRO0FBQ2hCLFFBQVEsTUFBTTtBQUNkLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDckMsS0FBSyxDQUFDO0FBQ047Ozs7Ozs7Ozs7Ozs7OzJCQ1ltQixHQUFPLEtBQUMsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBQ1Q7Ozs7O2tGQURILEdBQU8sS0FBQyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0VBTEQsR0FBTyxLQUFDLE1BQU07Ozs7O0dBQWxDLG9CQVNJO3VCQURDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEdBUmUsR0FBTyxLQUFDLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBTDVDLG9CQXdCSztHQXZCSCxvQkFpQk87dUJBREE7dUJBREM7Ozs7Ozs7R0FHUixvQkFJSztHQUhILG9CQUVLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQXJFYSxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU87O1FBRWpDLEtBQWdCO1FBQ2hCLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEdBQUcsSUFBSSxHQUFHLEtBQUs7cUNBR3hEQyxNQUFRLENBQUMsY0FBYyxHQUNyQixPQUFPLEVBQUUsTUFBTSxDQUFDLFlBQVk7UUFHMUJDLFFBQU0sR0FBR0MsZUFBRyxDQUFDLE9BQU87TUFDdEI7UUFFRTtNQUNGLElBQUksV0FBVyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksU0FDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsU0FBUzs7Ozs7Ozs7O1NBTzdCLE9BQU8sS0FBS0MsUUFBTTs7O09BRWYsT0FBTyxFQUFFLElBQUk7MEJBRXhCLGFBQ0UsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQUVIOztLQUVDLElBQUksRUFBRTtLQUNOLElBQUksRUFBRSxhQUFhO0tBQ25CLElBQUksRUFBRSxTQUFTO0tBQ2YsTUFBTSxFQUFFLE9BQU8sS0FBSzs7O0tBR3BCLElBQUksRUFBRTtLQUNOLElBQUksRUFBRSxhQUFhO0tBQ25CLElBQUksRUFBRSxhQUFhO0tBQ25CLE1BQU0sRUFBRSxPQUFPLEtBQUssTUFBTSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
