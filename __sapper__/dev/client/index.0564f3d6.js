import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, a as stores$1, b as validate_store, c as component_subscribe, e as element, t as text, f as space, g as claim_element, h as children, j as claim_text, k as detach_dev, l as claim_space, m as attr_dev, n as add_location, o as insert_hydration_dev, p as append_hydration_dev, q as listen_dev, r as set_data_dev, u as noop, w as get_store_value, x as client, y as validate_each_argument, z as binding_callbacks, A as bind, B as set_store_value, C as onMount, D as feather, E as create_component, F as claim_component, G as mount_component, H as add_flush_callback, I as transition_in, J as transition_out, K as destroy_each, L as destroy_component } from './client.096bb183.js';
import { M as Modal } from './modal.045e7bb7.js';

/* src/lib/components/home/downloadModal.svelte generated by Svelte v3.42.1 */
const file = "src/lib/components/home/downloadModal.svelte";

// (20:2) {:else}
function create_else_block(ctx) {
	let a;
	let t;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			a = element("a");
			t = text("Kayıt olun veya giriş yapınız");
			this.h();
		},
		l: function claim(nodes) {
			a = claim_element(nodes, "A", { href: true });
			var a_nodes = children(a);
			t = claim_text(a_nodes, "Kayıt olun veya giriş yapınız");
			a_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(a, "href", "/signin");
			add_location(a, file, 20, 4, 631);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, a, anchor);
			append_hydration_dev(a, t);

			if (!mounted) {
				dispose = listen_dev(a, "click", /*click_handler_1*/ ctx[5], false, false, false);
				mounted = true;
			}
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(a);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(20:2) {:else}",
		ctx
	});

	return block;
}

// (18:2) {#if $session?.user}
function create_if_block(ctx) {
	let a;
	let t;
	let a_href_value;

	const block = {
		c: function create() {
			a = element("a");
			t = text("indir");
			this.h();
		},
		l: function claim(nodes) {
			a = claim_element(nodes, "A", { download: true, href: true, class: true });
			var a_nodes = children(a);
			t = claim_text(a_nodes, "indir");
			a_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(a, "download", "");
			attr_dev(a, "href", a_href_value = /*data*/ ctx[1].path);
			attr_dev(a, "class", "bg-dark-200 p-3 w-22 text-center duration-500  hover:bg-dark-900 cursor-pointer svelte-1000xgn");
			add_location(a, file, 18, 4, 488);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, a, anchor);
			append_hydration_dev(a, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*data*/ 2 && a_href_value !== (a_href_value = /*data*/ ctx[1].path)) {
				attr_dev(a, "href", a_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(a);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(18:2) {#if $session?.user}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let div;
	let span;
	let t0;
	let t1;
	let h2;
	let t2_value = /*data*/ ctx[1].name + "";
	let t2;
	let t3;
	let p;
	let t4_value = /*data*/ ctx[1].describtion + "";
	let t4;
	let t5;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (/*$session*/ ctx[2]?.user) return create_if_block;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			div = element("div");
			span = element("span");
			t0 = text("x");
			t1 = space();
			h2 = element("h2");
			t2 = text(t2_value);
			t3 = space();
			p = element("p");
			t4 = text(t4_value);
			t5 = space();
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			span = claim_element(div_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t0 = claim_text(span_nodes, "x");
			span_nodes.forEach(detach_dev);
			t1 = claim_space(div_nodes);
			h2 = claim_element(div_nodes, "H2", { class: true });
			var h2_nodes = children(h2);
			t2 = claim_text(h2_nodes, t2_value);
			h2_nodes.forEach(detach_dev);
			t3 = claim_space(div_nodes);
			p = claim_element(div_nodes, "P", {});
			var p_nodes = children(p);
			t4 = claim_text(p_nodes, t4_value);
			p_nodes.forEach(detach_dev);
			t5 = claim_space(div_nodes);
			if_block.l(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span, "class", "w-6 h-6 flex items-center justify-center text-white  bg-rose-700 hover:bg-rose-900 duration-500 cursor-pointer svelte-1000xgn");
			add_location(span, file, 12, 2, 216);
			attr_dev(h2, "class", "bg-dark-200 p-3 svelte-1000xgn");
			add_location(h2, file, 14, 2, 387);
			add_location(p, file, 15, 2, 434);
			attr_dev(div, "class", "w-122 bg-rose-500 flex flex-col p-12  justify-center gap-6 svelte-1000xgn");
			add_location(div, file, 11, 0, 141);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			append_hydration_dev(div, span);
			append_hydration_dev(span, t0);
			append_hydration_dev(div, t1);
			append_hydration_dev(div, h2);
			append_hydration_dev(h2, t2);
			append_hydration_dev(div, t3);
			append_hydration_dev(div, p);
			append_hydration_dev(p, t4);
			append_hydration_dev(div, t5);
			if_block.m(div, null);

			if (!mounted) {
				dispose = listen_dev(span, "click", /*click_handler*/ ctx[4], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*data*/ 2 && t2_value !== (t2_value = /*data*/ ctx[1].name + "")) set_data_dev(t2, t2_value);
			if (dirty & /*data*/ 2 && t4_value !== (t4_value = /*data*/ ctx[1].describtion + "")) set_data_dev(t4, t4_value);

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div, null);
				}
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if_block.d();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let $session;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('DownloadModal', slots, []);
	let { show, data } = $$props;
	const { session } = stores$1();
	validate_store(session, 'session');
	component_subscribe($$self, session, value => $$invalidate(2, $session = value));
	const writable_props = ['show', 'data'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DownloadModal> was created with unknown prop '${key}'`);
	});

	const click_handler = () => $$invalidate(0, show = false);
	const click_handler_1 = () => $$invalidate(0, show = false);

	$$self.$$set = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('data' in $$props) $$invalidate(1, data = $$props.data);
	};

	$$self.$capture_state = () => ({ stores: stores$1, show, data, session, $session });

	$$self.$inject_state = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('data' in $$props) $$invalidate(1, data = $$props.data);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [show, data, $session, session, click_handler, click_handler_1];
}

class DownloadModal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { show: 0, data: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "DownloadModal",
			options,
			id: create_fragment$1.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*show*/ ctx[0] === undefined && !('show' in props)) {
			console.warn("<DownloadModal> was created without expected prop 'show'");
		}

		if (/*data*/ ctx[1] === undefined && !('data' in props)) {
			console.warn("<DownloadModal> was created without expected prop 'data'");
		}
	}

	get show() {
		throw new Error("<DownloadModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<DownloadModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get data() {
		throw new Error("<DownloadModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set data(value) {
		throw new Error("<DownloadModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/routes/index.svelte generated by Svelte v3.42.1 */
const file_1 = "src/routes/index.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[18] = list[i];
	return child_ctx;
}

// (70:8) {#each categories?.data || [] as category}
function create_each_block_1(ctx) {
	let li;
	let t_value = /*category*/ ctx[18].text + "";
	let t;
	let li_class_value;
	let mounted;
	let dispose;

	function click_handler_1() {
		return /*click_handler_1*/ ctx[10](/*category*/ ctx[18]);
	}

	const block = {
		c: function create() {
			li = element("li");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			li = claim_element(nodes, "LI", { class: true });
			var li_nodes = children(li);
			t = claim_text(li_nodes, t_value);
			li_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(li, "class", li_class_value = "p-2 " + (/*filter*/ ctx[3] == /*category*/ ctx[18].text
			? 'bg-dark-700'
			: 'bg-dark-200') + "   hover:bg-rose-500 duration-500" + " svelte-osabo4");

			add_location(li, file_1, 70, 10, 1863);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, li, anchor);
			append_hydration_dev(li, t);

			if (!mounted) {
				dispose = listen_dev(li, "click", click_handler_1, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*categories*/ 1 && t_value !== (t_value = /*category*/ ctx[18].text + "")) set_data_dev(t, t_value);

			if (dirty & /*filter, categories*/ 9 && li_class_value !== (li_class_value = "p-2 " + (/*filter*/ ctx[3] == /*category*/ ctx[18].text
			? 'bg-dark-700'
			: 'bg-dark-200') + "   hover:bg-rose-500 duration-500" + " svelte-osabo4")) {
				attr_dev(li, "class", li_class_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(70:8) {#each categories?.data || [] as category}",
		ctx
	});

	return block;
}

// (77:6) {#each filter !== "" ? (files?.data || []).filter((x) => x.category == filter) : files?.data || [] as file}
function create_each_block(ctx) {
	let div1;
	let div0;
	let t0;
	let span;
	let t1_value = /*file*/ ctx[4].name + "";
	let t1;
	let t2;
	let mounted;
	let dispose;

	function click_handler_2() {
		return /*click_handler_2*/ ctx[12](/*file*/ ctx[4]);
	}

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			t0 = space();
			span = element("span");
			t1 = text(t1_value);
			t2 = space();
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			children(div0).forEach(detach_dev);
			t0 = claim_space(div1_nodes);
			span = claim_element(div1_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t1 = claim_text(span_nodes, t1_value);
			span_nodes.forEach(detach_dev);
			t2 = claim_space(div1_nodes);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "absolute bg-rose-600 w-3/5 h-4 rounded-t-xl -top-4 right-5 shadow shadow-md shadow-rose-400 svelte-osabo4");
			add_location(div0, file_1, 78, 10, 2455);
			attr_dev(span, "class", "text-white uppercase font-bold text-center block h-full w-full overflow-hidden py-2 flex items-center justify-center svelte-osabo4");
			add_location(span, file_1, 79, 10, 2577);
			attr_dev(div1, "class", "bg-rose-500 hover:bg-rose-600 duration-150 float-left w-42 h-20 m-3 rounded-xl relative mt-6 flex flex-col justify-center items-center shadow shadow-md shadow-rose-400 cursor-pointer svelte-osabo4");
			add_location(div1, file_1, 77, 8, 2248);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div1, anchor);
			append_hydration_dev(div1, div0);
			append_hydration_dev(div1, t0);
			append_hydration_dev(div1, span);
			append_hydration_dev(span, t1);
			append_hydration_dev(div1, t2);

			if (!mounted) {
				dispose = listen_dev(span, "click", click_handler_2, false, false, false);
				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*filter, files*/ 10 && t1_value !== (t1_value = /*file*/ ctx[4].name + "")) set_data_dev(t1, t1_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(77:6) {#each filter !== \\\"\\\" ? (files?.data || []).filter((x) => x.category == filter) : files?.data || [] as file}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div3;
	let div2;
	let div0;
	let ul;
	let li;
	let t0;
	let li_class_value;
	let t1;
	let t2;
	let div1;
	let t3;
	let modal;
	let updating_show;
	let current;
	let mounted;
	let dispose;
	let each_value_1 = /*categories*/ ctx[0]?.data || [];
	validate_each_argument(each_value_1);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	let each_value = /*filter*/ ctx[3] !== ""
	? (/*files*/ ctx[1]?.data || []).filter(/*func*/ ctx[11])
	: /*files*/ ctx[1]?.data || [];

	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	function modal_show_binding(value) {
		/*modal_show_binding*/ ctx[13](value);
	}

	let modal_props = {
		data: /*file*/ ctx[4],
		component: DownloadModal
	};

	if (/*showModal*/ ctx[2] !== void 0) {
		modal_props.show = /*showModal*/ ctx[2];
	}

	modal = new Modal({ props: modal_props, $$inline: true });
	binding_callbacks.push(() => bind(modal, 'show', modal_show_binding));

	const block = {
		c: function create() {
			div3 = element("div");
			div2 = element("div");
			div0 = element("div");
			ul = element("ul");
			li = element("li");
			t0 = text("Tümü");
			t1 = space();

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t2 = space();
			div1 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t3 = space();
			create_component(modal.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div3 = claim_element(nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			div2 = claim_element(div3_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div0 = claim_element(div2_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			ul = claim_element(div0_nodes, "UL", { class: true });
			var ul_nodes = children(ul);
			li = claim_element(ul_nodes, "LI", { class: true });
			var li_nodes = children(li);
			t0 = claim_text(li_nodes, "Tümü");
			li_nodes.forEach(detach_dev);
			t1 = claim_space(ul_nodes);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].l(ul_nodes);
			}

			ul_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			t2 = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div1_nodes);
			}

			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			t3 = claim_space(nodes);
			claim_component(modal.$$.fragment, nodes);
			this.h();
		},
		h: function hydrate() {
			attr_dev(li, "class", li_class_value = "p-2 " + (/*filter*/ ctx[3] == '' ? 'bg-dark-700' : 'bg-dark-200') + "  hover:bg-rose-500 duration-500" + " svelte-osabo4");
			add_location(li, file_1, 68, 8, 1653);
			attr_dev(ul, "class", "flex flex-col gap-2 text-white p-3 svelte-osabo4");
			add_location(ul, file_1, 67, 6, 1597);
			attr_dev(div0, "class", "w-52 h-full bg-dark-400  svelte-osabo4");
			add_location(div0, file_1, 66, 4, 1552);
			attr_dev(div1, "class", "w-full bg-dark-500    svelte-osabo4");
			add_location(div1, file_1, 75, 4, 2090);
			attr_dev(div2, "class", " flex h-full   svelte-osabo4");
			add_location(div2, file_1, 65, 2, 1519);
			attr_dev(div3, "class", " w-full h-full svelte-osabo4");
			add_location(div3, file_1, 64, 0, 1488);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div3, anchor);
			append_hydration_dev(div3, div2);
			append_hydration_dev(div2, div0);
			append_hydration_dev(div0, ul);
			append_hydration_dev(ul, li);
			append_hydration_dev(li, t0);
			append_hydration_dev(ul, t1);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(ul, null);
			}

			append_hydration_dev(div2, t2);
			append_hydration_dev(div2, div1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}

			insert_hydration_dev(target, t3, anchor);
			mount_component(modal, target, anchor);
			current = true;

			if (!mounted) {
				dispose = listen_dev(li, "click", /*click_handler*/ ctx[9], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (!current || dirty & /*filter*/ 8 && li_class_value !== (li_class_value = "p-2 " + (/*filter*/ ctx[3] == '' ? 'bg-dark-700' : 'bg-dark-200') + "  hover:bg-rose-500 duration-500" + " svelte-osabo4")) {
				attr_dev(li, "class", li_class_value);
			}

			if (dirty & /*filter, categories, handleCategorySelect*/ 73) {
				each_value_1 = /*categories*/ ctx[0]?.data || [];
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_1(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(ul, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_1.length;
			}

			if (dirty & /*handleShowModal, filter, files*/ 138) {
				each_value = /*filter*/ ctx[3] !== ""
				? (/*files*/ ctx[1]?.data || []).filter(/*func*/ ctx[11])
				: /*files*/ ctx[1]?.data || [];

				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div1, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			const modal_changes = {};
			if (dirty & /*file*/ 16) modal_changes.data = /*file*/ ctx[4];

			if (!updating_show && dirty & /*showModal*/ 4) {
				updating_show = true;
				modal_changes.show = /*showModal*/ ctx[2];
				add_flush_callback(() => updating_show = false);
			}

			modal.$set(modal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div3);
			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t3);
			destroy_component(modal, detaching);
			mounted = false;
			dispose();
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

async function preload() {
	{
		const client$1 = get_store_value(feather);
		client$1.configure(client.authentication({ storage: window.localStorage }));
		const categories = await client$1.service("uploadthree").find();
		const files = await client$1.service("file").find();
		const user = await client$1.reAuthenticate().catch(() => false);
		return { user: user?.user, categories, files };
	}
}

function instance($$self, $$props, $$invalidate) {
	let $feather;
	let $session;
	validate_store(feather, 'feather');
	component_subscribe($$self, feather, $$value => $$invalidate(14, $feather = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Routes', slots, []);
	const { session } = stores$1();
	validate_store(session, 'session');
	component_subscribe($$self, session, value => $$invalidate(15, $session = value));
	let { user, categories, files } = $$props;
	let { showModal = false } = $$props;
	set_store_value(session, $session = { user }, $session);
	let filter = "", file;

	async function handleCategorySelect(category) {
		$$invalidate(3, filter = category);
	}

	function handleShowModal(data) {
		$$invalidate(4, file = data);
		$$invalidate(2, showModal = true);
	}

	onMount(async () => {
		const categoryService = $feather.service("uploadthree");
		const fileService = $feather.service("file");

		["created", "removed"].forEach(event => {
			categoryService.on(event, async () => {
				$$invalidate(0, categories = await categoryService.find());
			});

			fileService.on(event, async () => {
				$$invalidate(1, files = await fileService.find());
			});
		});
	});

	const writable_props = ['user', 'categories', 'files', 'showModal'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Routes> was created with unknown prop '${key}'`);
	});

	const click_handler = () => handleCategorySelect('');
	const click_handler_1 = category => handleCategorySelect(category.text);
	const func = x => x.category == filter;
	const click_handler_2 = file => handleShowModal(file);

	function modal_show_binding(value) {
		showModal = value;
		$$invalidate(2, showModal);
	}

	$$self.$$set = $$props => {
		if ('user' in $$props) $$invalidate(8, user = $$props.user);
		if ('categories' in $$props) $$invalidate(0, categories = $$props.categories);
		if ('files' in $$props) $$invalidate(1, files = $$props.files);
		if ('showModal' in $$props) $$invalidate(2, showModal = $$props.showModal);
	};

	$$self.$capture_state = () => ({
		get: get_store_value,
		feather,
		feathers: client,
		preload,
		onMount,
		Modal,
		DownloadModal,
		stores: stores$1,
		session,
		user,
		categories,
		files,
		showModal,
		filter,
		file,
		handleCategorySelect,
		handleShowModal,
		$feather,
		$session
	});

	$$self.$inject_state = $$props => {
		if ('user' in $$props) $$invalidate(8, user = $$props.user);
		if ('categories' in $$props) $$invalidate(0, categories = $$props.categories);
		if ('files' in $$props) $$invalidate(1, files = $$props.files);
		if ('showModal' in $$props) $$invalidate(2, showModal = $$props.showModal);
		if ('filter' in $$props) $$invalidate(3, filter = $$props.filter);
		if ('file' in $$props) $$invalidate(4, file = $$props.file);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		categories,
		files,
		showModal,
		filter,
		file,
		session,
		handleCategorySelect,
		handleShowModal,
		user,
		click_handler,
		click_handler_1,
		func,
		click_handler_2,
		modal_show_binding
	];
}

class Routes extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance, create_fragment, safe_not_equal, {
			user: 8,
			categories: 0,
			files: 1,
			showModal: 2
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Routes",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*user*/ ctx[8] === undefined && !('user' in props)) {
			console.warn("<Routes> was created without expected prop 'user'");
		}

		if (/*categories*/ ctx[0] === undefined && !('categories' in props)) {
			console.warn("<Routes> was created without expected prop 'categories'");
		}

		if (/*files*/ ctx[1] === undefined && !('files' in props)) {
			console.warn("<Routes> was created without expected prop 'files'");
		}
	}

	get user() {
		throw new Error("<Routes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set user(value) {
		throw new Error("<Routes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get categories() {
		throw new Error("<Routes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set categories(value) {
		throw new Error("<Routes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get files() {
		throw new Error("<Routes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set files(value) {
		throw new Error("<Routes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get showModal() {
		throw new Error("<Routes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set showModal(value) {
		throw new Error("<Routes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export { Routes as default, preload };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguMDU2NGYzZDYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50cy9ob21lL2Rvd25sb2FkTW9kYWwuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9pbmRleC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cblxuXG5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgeyBzdG9yZXMgfSBmcm9tICdAc2FwcGVyL2FwcCdcbiAgICBleHBvcnQgbGV0IHNob3csIGRhdGFcblxuICAgXG4gICAgY29uc3QgeyBzZXNzaW9uIH0gPSBzdG9yZXMoKVxuICAgXG4gICAgLyogb25Nb3VudCgoKT0+e1xuXG4gICAgfSkgKi9cbjwvc2NyaXB0PlxuXG5cbjxkaXYgY2xhc3M9XCJ3LTEyMiBiZy1yb3NlLTUwMCBmbGV4IGZsZXgtY29sIHAtMTIgIGp1c3RpZnktY2VudGVyIGdhcC02XCI+XG4gICAgPHNwYW4gY2xhc3M9XCJ3LTYgaC02IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtd2hpdGUgIGJnLXJvc2UtNzAwIGhvdmVyOmJnLXJvc2UtOTAwIGR1cmF0aW9uLTUwMCBjdXJzb3ItcG9pbnRlclwiIG9uOmNsaWNrPXsoKT0+c2hvdyA9IGZhbHNlfT54PC9zcGFuPlxuICAgXG4gICAgPGgyIGNsYXNzPVwiYmctZGFyay0yMDAgcC0zXCI+e2RhdGEubmFtZX08L2gyPlxuICAgIDxwPnsgZGF0YS5kZXNjcmlidGlvbiB9PC9wPlxuXG4gICAgeyNpZiAkc2Vzc2lvbj8udXNlcn1cbiAgICAgICAgPGEgZG93bmxvYWQgaHJlZj1cIntkYXRhLnBhdGh9XCIgY2xhc3M9XCJiZy1kYXJrLTIwMCBwLTMgdy0yMiB0ZXh0LWNlbnRlciBkdXJhdGlvbi01MDAgIGhvdmVyOmJnLWRhcmstOTAwIGN1cnNvci1wb2ludGVyXCI+aW5kaXI8L2E+XG4gICAgezplbHNlfVxuICAgICAgICA8YSBvbjpjbGljaz17KCk9PiBzaG93ID0gZmFsc2V9IGhyZWY9XCIvc2lnbmluXCI+S2F5xLF0IG9sdW4gdmV5YSBnaXJpxZ8geWFwxLFuxLF6PC9hPlxuICAgIHsvaWZ9XG48L2Rpdj4iLCI8c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIj5cbiAgICBpbXBvcnQgeyBnZXQgfSBmcm9tICdzdmVsdGUvc3RvcmUnXG4gICAgaW1wb3J0IHsgZmVhdGhlciB9IGZyb20gJy4uL2xpYi9zdG9yZXMvZmVhdGhlcidcblx0aW1wb3J0IGZlYXRoZXJzIGZyb20gJ0BmZWF0aGVyc2pzL2NsaWVudCdcblxuXHRcblxuXHRleHBvcnQgYXN5bmMgZnVuY3Rpb24gcHJlbG9hZCgpIHtcblx0XHRcblx0XHRpZihwcm9jZXNzLmJyb3dzZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGNsaWVudCA9ICBnZXQoZmVhdGhlcilcbiAgICAgICAgICAgIGNsaWVudC5jb25maWd1cmUoZmVhdGhlcnMuYXV0aGVudGljYXRpb24oe1xuICAgICAgICAgICAgICAgIHN0b3JhZ2U6IHdpbmRvdy5sb2NhbFN0b3JhZ2VcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGNhdGVnb3JpZXMgPSBhd2FpdCBjbGllbnQuc2VydmljZSgndXBsb2FkdGhyZWUnKS5maW5kKClcblx0XHRcdGNvbnN0IGZpbGVzID0gYXdhaXQgY2xpZW50LnNlcnZpY2UoJ2ZpbGUnKS5maW5kKClcbiAgICAgICAgXHRjb25zdCB1c2VyID0gYXdhaXQgY2xpZW50LnJlQXV0aGVudGljYXRlKCkuY2F0Y2goICgpID0+IGZhbHNlKVxuXHRcdFx0XG4gICAgICAgICAgICByZXR1cm4geyB1c2VyIDogdXNlcj8udXNlciwgY2F0ZWdvcmllcywgZmlsZXN9XG4gICAgICAgICAgICBcbiAgICAgICB9XG5cdH1cbiAgICBcblxuPC9zY3JpcHQ+XG5cdFxuXHRcbjxzY3JpcHQ+XG5cdGltcG9ydCB7IG9uTW91bnQgfSBmcm9tICdzdmVsdGUnXG5cdGltcG9ydCBNb2RhbCBmcm9tICcuLi9saWIvY29tcG9uZW50cy9tb2RhbC5zdmVsdGUnXG5cdGltcG9ydCBEb3dubG9hZE1vZGFsIGZyb20gJy4uL2xpYi9jb21wb25lbnRzL2hvbWUvZG93bmxvYWRNb2RhbC5zdmVsdGUnO1xuXHRpbXBvcnQgeyBzdG9yZXMgfSBmcm9tICdAc2FwcGVyL2FwcCdcbiAgICBjb25zdCB7IHNlc3Npb24gfSA9IHN0b3JlcygpXG5cblx0ZXhwb3J0IGxldCB1c2VyLCBjYXRlZ29yaWVzLGZpbGVzXG5cdGV4cG9ydCBsZXQgc2hvd01vZGFsID0gZmFsc2Vcblx0JHNlc3Npb24gPSB7XG4gICAgICAgIHVzZXJcbiAgICB9XG5cblx0bGV0IGZpbHRlciA9IFwiXCIsIGZpbGVcblxuXHRhc3luYyBmdW5jdGlvbiBoYW5kbGVDYXRlZ29yeVNlbGVjdChjYXRlZ29yeSkge1xuXHRcdGZpbHRlciA9IGNhdGVnb3J5XG5cdH1cblxuXHRmdW5jdGlvbiBoYW5kbGVTaG93TW9kYWwoZGF0YSkge1xuXHRcdFx0ZmlsZSA9IGRhdGFcblx0XHRcdHNob3dNb2RhbCA9IHRydWVcblx0fVxuXG5cdG9uTW91bnQoYXN5bmMgKCkgPT4ge1xuXHRcdGNvbnN0IGNhdGVnb3J5U2VydmljZSA9ICRmZWF0aGVyLnNlcnZpY2UoJ3VwbG9hZHRocmVlJylcblx0XHRjb25zdCBmaWxlU2VydmljZSA9ICRmZWF0aGVyLnNlcnZpY2UoJ2ZpbGUnKVxuXG5cblx0XHQ7W1wiY3JlYXRlZFwiICwgXCJyZW1vdmVkXCIgXS5mb3JFYWNoKCBldmVudCA9PiB7XG5cdFx0XHRjYXRlZ29yeVNlcnZpY2Uub24oZXZlbnQsIGFzeW5jICgpID0+IHtcblx0XHRcdFx0XG5cdFx0XHRcdGNhdGVnb3JpZXMgPSBhd2FpdCBjYXRlZ29yeVNlcnZpY2UuZmluZCgpXG5cdFx0XHRcblx0XHRcdH0pXG5cblx0XHRcdGZpbGVTZXJ2aWNlLm9uKGV2ZW50LCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGZpbGVzID0gYXdhaXQgZmlsZVNlcnZpY2UuZmluZCgpXG5cdFx0XHR9KVxuXHRcdH0pXG5cdH0pXG48L3NjcmlwdD5cblxuXG5cblx0PGRpdiBjbGFzcz1cIiB3LWZ1bGwgaC1mdWxsXCI+XG5cdFx0PGRpdiBjbGFzcz1cIiBmbGV4IGgtZnVsbCAgXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwidy01MiBoLWZ1bGwgYmctZGFyay00MDAgXCI+XG5cdFx0XHRcdDx1bCBjbGFzcz1cImZsZXggZmxleC1jb2wgZ2FwLTIgdGV4dC13aGl0ZSBwLTNcIj5cblx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8bGkgb246Y2xpY2s9eygpID0+IGhhbmRsZUNhdGVnb3J5U2VsZWN0KFwiXCIpfVxuXHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRjbGFzcz1cInAtMiB7ZmlsdGVyID09IFwiXCIgPyAnYmctZGFyay03MDAnIDogJ2JnLWRhcmstMjAwJ30gIGhvdmVyOmJnLXJvc2UtNTAwIGR1cmF0aW9uLTUwMFwiPlTDvG3DvDwvbGk+XG5cdFx0XHRcdFx0eyNlYWNoIGNhdGVnb3JpZXM/LmRhdGEgfHwgW10gYXMgY2F0ZWdvcnl9XG5cdFx0XHRcdFx0XHQ8bGkgXG5cdFx0XHRcdFx0XHRvbjpjbGljaz17KCkgPT4gaGFuZGxlQ2F0ZWdvcnlTZWxlY3QoY2F0ZWdvcnkudGV4dCl9XG5cdFx0XHRcdFx0XHRjbGFzcz1cInAtMiB7ZmlsdGVyID09IGNhdGVnb3J5LnRleHQgPyAnYmctZGFyay03MDAnIDogJ2JnLWRhcmstMjAwJ30gICBob3ZlcjpiZy1yb3NlLTUwMCBkdXJhdGlvbi01MDBcIj57Y2F0ZWdvcnkudGV4dH08L2xpPlxuXHRcdFx0XHRcdHsvZWFjaH1cblx0XHRcdFx0PC91bD5cblx0XHRcdDwvZGl2PlxuXG5cdFx0XHQ8ZGl2IGNsYXNzPVwidy1mdWxsIGJnLWRhcmstNTAwICAgXCI+XG5cdFx0XHRcdHsjZWFjaCBmaWx0ZXIgIT09IFwiXCIgPyAoZmlsZXM/LmRhdGEgfHwgW10pLmZpbHRlcih4ID0+IHguY2F0ZWdvcnkgPT0gZmlsdGVyKSA6IGZpbGVzPy5kYXRhIHx8IFtdICBhcyBmaWxlfVxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJiZy1yb3NlLTUwMCBob3ZlcjpiZy1yb3NlLTYwMCBkdXJhdGlvbi0xNTAgZmxvYXQtbGVmdCB3LTQyIGgtMjAgbS0zIHJvdW5kZWQteGwgcmVsYXRpdmUgbXQtNiBmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBzaGFkb3cgc2hhZG93LW1kIHNoYWRvdy1yb3NlLTQwMCBjdXJzb3ItcG9pbnRlclwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImFic29sdXRlIGJnLXJvc2UtNjAwIHctMy81IGgtNCByb3VuZGVkLXQteGwgLXRvcC00IHJpZ2h0LTUgc2hhZG93IHNoYWRvdy1tZCBzaGFkb3ctcm9zZS00MDBcIj48L2Rpdj5cblx0XHRcdFx0XHRcdFx0PHNwYW4gb246Y2xpY2s9eygpID0+IGhhbmRsZVNob3dNb2RhbChmaWxlKX0gY2xhc3M9XCJ0ZXh0LXdoaXRlIHVwcGVyY2FzZSBmb250LWJvbGQgdGV4dC1jZW50ZXIgYmxvY2sgaC1mdWxsIHctZnVsbCBvdmVyZmxvdy1oaWRkZW4gcHktMiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPntmaWxlLm5hbWV9PC9zcGFuPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHR7L2VhY2h9XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0PC9kaXY+XG48c3R5bGU+XG5cbjwvc3R5bGU+XG48TW9kYWwgYmluZDpzaG93PXtzaG93TW9kYWx9IGRhdGE9e2ZpbGV9ICBjb21wb25lbnQ9e0Rvd25sb2FkTW9kYWx9ICAvPlxuIl0sIm5hbWVzIjpbInN0b3JlcyIsImNsaWVudCIsImdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztZQW9Cd0QsK0JBQTZCOzs7Ozs7MkJBQTdCLCtCQUE2Qjs7Ozs7Ozs7O0dBQWpGLG9CQUFvRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBRm1DLE9BQUs7Ozs7OzsyQkFBTCxPQUFLOzs7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
