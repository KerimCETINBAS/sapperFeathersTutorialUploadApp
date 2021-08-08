import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, b as validate_store, D as feather, c as component_subscribe, v as validate_slots, a as stores$1, e as element, t as text, f as space, g as claim_element, h as children, j as claim_text, k as detach_dev, l as claim_space, m as attr_dev, n as add_location, o as insert_hydration_dev, p as append_hydration_dev, q as listen_dev, r as set_data_dev, u as noop, R as run_all, w as get_store_value, x as client, y as validate_each_argument, z as binding_callbacks, A as bind, B as set_store_value, E as create_component, F as claim_component, G as mount_component, H as add_flush_callback, I as transition_in, J as transition_out, K as destroy_each, L as destroy_component } from './client.acd1a430.js';
import { M as Modal } from './modal.26d6178d.js';

/* src/lib/components/panel/deleteModal.svelte generated by Svelte v3.42.1 */
const file = "src/lib/components/panel/deleteModal.svelte";

function create_fragment$1(ctx) {
	let div;
	let span0;
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
	let span1;
	let t6;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div = element("div");
			span0 = element("span");
			t0 = text("x");
			t1 = space();
			h2 = element("h2");
			t2 = text(t2_value);
			t3 = space();
			p = element("p");
			t4 = text(t4_value);
			t5 = space();
			span1 = element("span");
			t6 = text("Sil");
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			span0 = claim_element(div_nodes, "SPAN", { class: true });
			var span0_nodes = children(span0);
			t0 = claim_text(span0_nodes, "x");
			span0_nodes.forEach(detach_dev);
			t1 = claim_space(div_nodes);
			h2 = claim_element(div_nodes, "H2", {});
			var h2_nodes = children(h2);
			t2 = claim_text(h2_nodes, t2_value);
			h2_nodes.forEach(detach_dev);
			t3 = claim_space(div_nodes);
			p = claim_element(div_nodes, "P", {});
			var p_nodes = children(p);
			t4 = claim_text(p_nodes, t4_value);
			p_nodes.forEach(detach_dev);
			t5 = claim_space(div_nodes);
			span1 = claim_element(div_nodes, "SPAN", { class: true });
			var span1_nodes = children(span1);
			t6 = claim_text(span1_nodes, "Sil");
			span1_nodes.forEach(detach_dev);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(span0, "class", "w-6 h-6 flex items-center justify-center text-white  bg-rose-700 svelte-m6zieu");
			add_location(span0, file, 13, 2, 323);
			add_location(h2, file, 15, 2, 448);
			add_location(p, file, 16, 2, 471);
			attr_dev(span1, "class", "p-3 px-6 bg-dark-400 text-white text-center svelte-m6zieu");
			add_location(span1, file, 18, 2, 500);
			attr_dev(div, "class", "w-122 bg-rose-500 flex flex-col p-12  justify-center gap-6 svelte-m6zieu");
			add_location(div, file, 12, 0, 248);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);
			append_hydration_dev(div, span0);
			append_hydration_dev(span0, t0);
			append_hydration_dev(div, t1);
			append_hydration_dev(div, h2);
			append_hydration_dev(h2, t2);
			append_hydration_dev(div, t3);
			append_hydration_dev(div, p);
			append_hydration_dev(p, t4);
			append_hydration_dev(div, t5);
			append_hydration_dev(div, span1);
			append_hydration_dev(span1, t6);

			if (!mounted) {
				dispose = [
					listen_dev(span0, "click", /*click_handler*/ ctx[3], false, false, false),
					listen_dev(span1, "click", /*handleDeleteFile*/ ctx[2], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*data*/ 2 && t2_value !== (t2_value = /*data*/ ctx[1].name + "")) set_data_dev(t2, t2_value);
			if (dirty & /*data*/ 2 && t4_value !== (t4_value = /*data*/ ctx[1].describtion + "")) set_data_dev(t4, t4_value);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			mounted = false;
			run_all(dispose);
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
	let $feather;
	validate_store(feather, 'feather');
	component_subscribe($$self, feather, $$value => $$invalidate(4, $feather = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('DeleteModal', slots, []);
	let { show, data } = $$props;

	async function handleDeleteFile() {
		await $feather.service("file").remove(data);
		$$invalidate(0, show = false);
	}

	const writable_props = ['show', 'data'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DeleteModal> was created with unknown prop '${key}'`);
	});

	const click_handler = () => $$invalidate(0, show = false);

	$$self.$$set = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('data' in $$props) $$invalidate(1, data = $$props.data);
	};

	$$self.$capture_state = () => ({
		feather,
		stores: stores$1,
		show,
		data,
		handleDeleteFile,
		$feather
	});

	$$self.$inject_state = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('data' in $$props) $$invalidate(1, data = $$props.data);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [show, data, handleDeleteFile, click_handler];
}

class DeleteModal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { show: 0, data: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "DeleteModal",
			options,
			id: create_fragment$1.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*show*/ ctx[0] === undefined && !('show' in props)) {
			console.warn("<DeleteModal> was created without expected prop 'show'");
		}

		if (/*data*/ ctx[1] === undefined && !('data' in props)) {
			console.warn("<DeleteModal> was created without expected prop 'data'");
		}
	}

	get show() {
		throw new Error("<DeleteModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<DeleteModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get data() {
		throw new Error("<DeleteModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set data(value) {
		throw new Error("<DeleteModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/routes/panel/index.svelte generated by Svelte v3.42.1 */
const file_1 = "src/routes/panel/index.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[17] = list[i];
	return child_ctx;
}

// (54:8) {#each categories?.data || [] as category}
function create_each_block_1(ctx) {
	let li;
	let t_value = /*category*/ ctx[17].text + "";
	let t;
	let li_class_value;
	let mounted;
	let dispose;

	function click_handler_1() {
		return /*click_handler_1*/ ctx[10](/*category*/ ctx[17]);
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
			attr_dev(li, "class", li_class_value = "p-2 " + (/*filter*/ ctx[3] == /*category*/ ctx[17].text
			? 'bg-dark-700'
			: 'bg-dark-200') + "  hover:bg-rose-500 duration-500" + " svelte-osabo4");

			add_location(li, file_1, 54, 10, 1458);
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
			if (dirty & /*categories*/ 2 && t_value !== (t_value = /*category*/ ctx[17].text + "")) set_data_dev(t, t_value);

			if (dirty & /*filter, categories*/ 10 && li_class_value !== (li_class_value = "p-2 " + (/*filter*/ ctx[3] == /*category*/ ctx[17].text
			? 'bg-dark-700'
			: 'bg-dark-200') + "  hover:bg-rose-500 duration-500" + " svelte-osabo4")) {
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
		source: "(54:8) {#each categories?.data || [] as category}",
		ctx
	});

	return block;
}

// (61:6) {#each filter !== "" ? (files?.data || []).filter((x) => x.category == filter) : files?.data || [] as file}
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
			add_location(div0, file_1, 62, 10, 2046);
			attr_dev(span, "class", "text-white uppercase font-bold text-center block h-full w-full overflow-hidden py-2 flex items-center justify-center svelte-osabo4");
			add_location(span, file_1, 63, 10, 2168);
			attr_dev(div1, "class", "bg-rose-500 hover:bg-rose-600 duration-150 float-left w-42 h-20 m-3 rounded-xl relative mt-6 flex flex-col justify-center items-center shadow shadow-md shadow-rose-400 cursor-pointer svelte-osabo4");
			add_location(div1, file_1, 61, 8, 1839);
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
			if (dirty & /*filter, files*/ 12 && t1_value !== (t1_value = /*file*/ ctx[4].name + "")) set_data_dev(t1, t1_value);
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
		source: "(61:6) {#each filter !== \\\"\\\" ? (files?.data || []).filter((x) => x.category == filter) : files?.data || [] as file}",
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
	let each_value_1 = /*categories*/ ctx[1]?.data || [];
	validate_each_argument(each_value_1);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	let each_value = /*filter*/ ctx[3] !== ""
	? (/*files*/ ctx[2]?.data || []).filter(/*func*/ ctx[11])
	: /*files*/ ctx[2]?.data || [];

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
		component: DeleteModal
	};

	if (/*showModal*/ ctx[0] !== void 0) {
		modal_props.show = /*showModal*/ ctx[0];
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
			add_location(li, file_1, 52, 8, 1248);
			attr_dev(ul, "class", "flex flex-col gap-2 text-white p-3 svelte-osabo4");
			add_location(ul, file_1, 51, 6, 1192);
			attr_dev(div0, "class", "w-52 h-full bg-dark-400  svelte-osabo4");
			add_location(div0, file_1, 50, 4, 1147);
			attr_dev(div1, "class", "bg-dark-500 w-full svelte-osabo4");
			add_location(div1, file_1, 59, 4, 1684);
			attr_dev(div2, "class", " flex h-full   svelte-osabo4");
			add_location(div2, file_1, 49, 2, 1114);
			attr_dev(div3, "class", " w-full h-full svelte-osabo4");
			add_location(div3, file_1, 48, 0, 1083);
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

			if (dirty & /*filter, categories, handleCategorySelect*/ 74) {
				each_value_1 = /*categories*/ ctx[1]?.data || [];
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

			if (dirty & /*handleShowModal, filter, files*/ 140) {
				each_value = /*filter*/ ctx[3] !== ""
				? (/*files*/ ctx[2]?.data || []).filter(/*func*/ ctx[11])
				: /*files*/ ctx[2]?.data || [];

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

			if (!updating_show && dirty & /*showModal*/ 1) {
				updating_show = true;
				modal_changes.show = /*showModal*/ ctx[0];
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
	let $session;
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Panel', slots, []);
	const { session } = stores$1();
	validate_store(session, 'session');
	component_subscribe($$self, session, value => $$invalidate(14, $session = value));
	let { user, categories, files } = $$props;
	let { showModal = false } = $$props;
	set_store_value(session, $session = { user }, $session);
	let filter = "", file;

	async function handleCategorySelect(category) {
		$$invalidate(3, filter = category);
	}

	function handleShowModal(data) {
		$$invalidate(4, file = data);
		$$invalidate(0, showModal = true);
	}

	const writable_props = ['user', 'categories', 'files', 'showModal'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Panel> was created with unknown prop '${key}'`);
	});

	const click_handler = () => handleCategorySelect('');
	const click_handler_1 = category => handleCategorySelect(category.text);
	const func = x => x.category == filter;
	const click_handler_2 = file => handleShowModal(file);

	function modal_show_binding(value) {
		showModal = value;
		$$invalidate(0, showModal);
	}

	$$self.$$set = $$props => {
		if ('user' in $$props) $$invalidate(8, user = $$props.user);
		if ('categories' in $$props) $$invalidate(1, categories = $$props.categories);
		if ('files' in $$props) $$invalidate(2, files = $$props.files);
		if ('showModal' in $$props) $$invalidate(0, showModal = $$props.showModal);
	};

	$$self.$capture_state = () => ({
		get: get_store_value,
		feather,
		feathers: client,
		preload,
		Modal,
		DeleteModal,
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
		$session
	});

	$$self.$inject_state = $$props => {
		if ('user' in $$props) $$invalidate(8, user = $$props.user);
		if ('categories' in $$props) $$invalidate(1, categories = $$props.categories);
		if ('files' in $$props) $$invalidate(2, files = $$props.files);
		if ('showModal' in $$props) $$invalidate(0, showModal = $$props.showModal);
		if ('filter' in $$props) $$invalidate(3, filter = $$props.filter);
		if ('file' in $$props) $$invalidate(4, file = $$props.file);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		showModal,
		categories,
		files,
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

class Panel extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance, create_fragment, safe_not_equal, {
			user: 8,
			categories: 1,
			files: 2,
			showModal: 0
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Panel",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*user*/ ctx[8] === undefined && !('user' in props)) {
			console.warn("<Panel> was created without expected prop 'user'");
		}

		if (/*categories*/ ctx[1] === undefined && !('categories' in props)) {
			console.warn("<Panel> was created without expected prop 'categories'");
		}

		if (/*files*/ ctx[2] === undefined && !('files' in props)) {
			console.warn("<Panel> was created without expected prop 'files'");
		}
	}

	get user() {
		throw new Error("<Panel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set user(value) {
		throw new Error("<Panel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get categories() {
		throw new Error("<Panel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set categories(value) {
		throw new Error("<Panel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get files() {
		throw new Error("<Panel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set files(value) {
		throw new Error("<Panel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get showModal() {
		throw new Error("<Panel>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set showModal(value) {
		throw new Error("<Panel>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export { Panel as default, preload };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguMzQ0ZGZlMGYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50cy9wYW5lbC9kZWxldGVNb2RhbC5zdmVsdGUiLCIuLi8uLi8uLi9zcmMvcm91dGVzL3BhbmVsL2luZGV4LnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuXG5cblxuXG48c2NyaXB0PlxuICAgIGltcG9ydCB7IGZlYXRoZXIgfSBmcm9tICcuLi8uLi9zdG9yZXMvZmVhdGhlcidcbiAgICBpbXBvcnQgeyBzdG9yZXMgfSBmcm9tICdAc2FwcGVyL2FwcCdcbiAgICBleHBvcnQgbGV0IHNob3csIGRhdGFcblxuXG4gICAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlRGVsZXRlRmlsZSgpIHtcbiAgICAgICAgIGNvbnN0IGRlbGV0ZWQgPSBhd2FpdCAkZmVhdGhlci5zZXJ2aWNlKCdmaWxlJykucmVtb3ZlKGRhdGEpXG5cbiAgICAgICAgIHNob3cgPSBmYWxzZTtcbiAgICB9XG48L3NjcmlwdD5cblxuXG48ZGl2IGNsYXNzPVwidy0xMjIgYmctcm9zZS01MDAgZmxleCBmbGV4LWNvbCBwLTEyICBqdXN0aWZ5LWNlbnRlciBnYXAtNlwiPlxuICAgIDxzcGFuIGNsYXNzPVwidy02IGgtNiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXdoaXRlICBiZy1yb3NlLTcwMFwiIG9uOmNsaWNrPXsoKT0+c2hvdyA9IGZhbHNlfT54PC9zcGFuPlxuICAgICBcbiAgICA8aDI+e2RhdGEubmFtZX08L2gyPlxuICAgIDxwPnsgZGF0YS5kZXNjcmlidGlvbiB9PC9wPlxuXG4gICAgXG4gICAgPHNwYW4gY2xhc3M9XCJwLTMgcHgtNiBiZy1kYXJrLTQwMCB0ZXh0LXdoaXRlIHRleHQtY2VudGVyXCIgb246Y2xpY2s9e2hhbmRsZURlbGV0ZUZpbGV9PlNpbDwvc3Bhbj5cbiAgICBcbjwvZGl2PiIsIjxzY3JpcHQgY29udGV4dD1cIm1vZHVsZVwiPlxuICAgIGltcG9ydCB7IGdldCB9IGZyb20gJ3N2ZWx0ZS9zdG9yZSdcbiAgICBpbXBvcnQgeyBmZWF0aGVyIH0gZnJvbSAnLi4vLi4vbGliL3N0b3Jlcy9mZWF0aGVyJ1xuXHRpbXBvcnQgZmVhdGhlcnMgZnJvbSAnQGZlYXRoZXJzanMvY2xpZW50J1xuXG5cdFxuXG5cdGV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcmVsb2FkKCkge1xuXHRcdFxuXHRcdGlmKHByb2Nlc3MuYnJvd3Nlcikge1xuICAgICAgICAgICAgY29uc3QgY2xpZW50ID0gIGdldChmZWF0aGVyKVxuICAgICAgICAgICAgY2xpZW50LmNvbmZpZ3VyZShmZWF0aGVycy5hdXRoZW50aWNhdGlvbih7XG4gICAgICAgICAgICAgICAgc3RvcmFnZTogd2luZG93LmxvY2FsU3RvcmFnZVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgY2F0ZWdvcmllcyA9IGF3YWl0IGNsaWVudC5zZXJ2aWNlKCd1cGxvYWR0aHJlZScpLmZpbmQoKVxuXHRcdFx0Y29uc3QgZmlsZXMgPSBhd2FpdCBjbGllbnQuc2VydmljZSgnZmlsZScpLmZpbmQoKVxuICAgICAgICBcdGNvbnN0IHVzZXIgPSBhd2FpdCBjbGllbnQucmVBdXRoZW50aWNhdGUoKS5jYXRjaCggKCkgPT4gZmFsc2UpXG5cdFx0XHRcbiAgICAgICAgICAgIHJldHVybiB7IHVzZXIgOiB1c2VyPy51c2VyLCBjYXRlZ29yaWVzLCBmaWxlc31cbiAgICAgICAgICAgIFxuICAgICAgIH1cblx0fVxuICAgIFxuXG48L3NjcmlwdD5cblx0XG5cdFxuPHNjcmlwdD5cblx0aW1wb3J0IE1vZGFsIGZyb20gJy4uLy4uL2xpYi9jb21wb25lbnRzL21vZGFsLnN2ZWx0ZSdcblx0aW1wb3J0IERlbGV0ZU1vZGFsIGZyb20gJy4uLy4uL2xpYi9jb21wb25lbnRzL3BhbmVsL2RlbGV0ZU1vZGFsLnN2ZWx0ZSc7XG5cdGltcG9ydCB7IHN0b3JlcyB9IGZyb20gJ0BzYXBwZXIvYXBwJ1xuICAgIGNvbnN0IHsgc2Vzc2lvbiB9ID0gc3RvcmVzKClcblxuXHRleHBvcnQgbGV0IHVzZXIsIGNhdGVnb3JpZXMsZmlsZXNcblx0ZXhwb3J0IGxldCBzaG93TW9kYWwgPSBmYWxzZVxuXHQkc2Vzc2lvbiA9IHtcbiAgICAgICAgdXNlclxuICAgIH1cblxuXHRsZXQgZmlsdGVyID0gXCJcIiwgZmlsZVxuXG5cdGFzeW5jIGZ1bmN0aW9uIGhhbmRsZUNhdGVnb3J5U2VsZWN0KGNhdGVnb3J5KSB7XG5cdFx0ZmlsdGVyID0gY2F0ZWdvcnlcblx0fVxuXG5cdGZ1bmN0aW9uIGhhbmRsZVNob3dNb2RhbChkYXRhKSB7XG5cdFx0XHRmaWxlID0gZGF0YVxuXHRcdFx0c2hvd01vZGFsID0gdHJ1ZVxuXHR9XG48L3NjcmlwdD5cblxuXG5cblx0PGRpdiBjbGFzcz1cIiB3LWZ1bGwgaC1mdWxsXCI+XG5cdFx0PGRpdiBjbGFzcz1cIiBmbGV4IGgtZnVsbCAgXCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwidy01MiBoLWZ1bGwgYmctZGFyay00MDAgXCI+XG5cdFx0XHRcdDx1bCBjbGFzcz1cImZsZXggZmxleC1jb2wgZ2FwLTIgdGV4dC13aGl0ZSBwLTNcIj5cblx0XHRcdFx0XHRcblx0XHRcdFx0XHQ8bGkgb246Y2xpY2s9eygpID0+IGhhbmRsZUNhdGVnb3J5U2VsZWN0KFwiXCIpfSBjbGFzcz1cInAtMiB7ZmlsdGVyID09IFwiXCIgPyAnYmctZGFyay03MDAnIDogJ2JnLWRhcmstMjAwJ30gIGhvdmVyOmJnLXJvc2UtNTAwIGR1cmF0aW9uLTUwMFwiPlTDvG3DvDwvbGk+XG5cdFx0XHRcdFx0eyNlYWNoIGNhdGVnb3JpZXM/LmRhdGEgfHwgW10gYXMgY2F0ZWdvcnl9XG5cdFx0XHRcdFx0XHQ8bGkgXG5cdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdG9uOmNsaWNrPXsoKSA9PiBoYW5kbGVDYXRlZ29yeVNlbGVjdChjYXRlZ29yeS50ZXh0KX1cblx0XHRcdFx0XHRcdGNsYXNzPVwicC0yIHtmaWx0ZXIgPT0gY2F0ZWdvcnkudGV4dCA/ICdiZy1kYXJrLTcwMCcgOiAnYmctZGFyay0yMDAnfSAgaG92ZXI6Ymctcm9zZS01MDAgZHVyYXRpb24tNTAwXCI+e2NhdGVnb3J5LnRleHR9PC9saT5cblx0XHRcdFx0XHR7L2VhY2h9XG5cdFx0XHRcdDwvdWw+XG5cdFx0XHQ8L2Rpdj5cblxuXHRcdFx0PGRpdiBjbGFzcz1cImJnLWRhcmstNTAwIHctZnVsbFwiPlxuXHRcdFx0XHR7I2VhY2ggZmlsdGVyICE9PSBcIlwiID8gKGZpbGVzPy5kYXRhIHx8IFtdKS5maWx0ZXIoeCA9PiB4LmNhdGVnb3J5ID09IGZpbHRlcikgOiBmaWxlcz8uZGF0YSB8fCBbXSAgYXMgZmlsZX1cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYmctcm9zZS01MDAgaG92ZXI6Ymctcm9zZS02MDAgZHVyYXRpb24tMTUwIGZsb2F0LWxlZnQgdy00MiBoLTIwIG0tMyByb3VuZGVkLXhsIHJlbGF0aXZlIG10LTYgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgc2hhZG93IHNoYWRvdy1tZCBzaGFkb3ctcm9zZS00MDAgY3Vyc29yLXBvaW50ZXJcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJhYnNvbHV0ZSBiZy1yb3NlLTYwMCB3LTMvNSBoLTQgcm91bmRlZC10LXhsIC10b3AtNCByaWdodC01IHNoYWRvdyBzaGFkb3ctbWQgc2hhZG93LXJvc2UtNDAwXCI+PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIG9uOmNsaWNrPXsoKSA9PiBoYW5kbGVTaG93TW9kYWwoZmlsZSl9IGNsYXNzPVwidGV4dC13aGl0ZSB1cHBlcmNhc2UgZm9udC1ib2xkIHRleHQtY2VudGVyIGJsb2NrIGgtZnVsbCB3LWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIHB5LTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj57ZmlsZS5uYW1lfTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0ey9lYWNofVxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdDwvZGl2PlxuPHN0eWxlPlxuXG48L3N0eWxlPlxuXG48TW9kYWwgYmluZDpzaG93PXtzaG93TW9kYWx9IGRhdGE9e2ZpbGV9ICBjb21wb25lbnQ9e0RlbGV0ZU1vZGFsfSAgLz4iXSwibmFtZXMiOlsiY2xpZW50IiwiZ2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7eUJBZU8sR0FBSSxJQUFDLElBQUk7Ozs7eUJBQ1YsR0FBSSxJQUFDLFdBQVc7Ozs7Ozs7Ozs7OzthQUg2RixHQUFDOzs7Ozs7Ozs7YUFLMUIsS0FBRzs7Ozs7Ozs7Z0NBTHNCLEdBQUM7Ozs7Ozs7Ozs7Ozs7OztnQ0FLMUIsS0FBRzs7Ozs7Ozs7Ozs7Ozs7OztHQU43RixvQkFPSztHQU5ILG9CQUF3SDs7O0dBRXhILG9CQUFtQjs7O0dBQ25CLG9CQUF3Qjs7O0dBRXhCLG9CQUFpRzs7Ozs7O3FEQUE1QixHQUFnQjs7Ozs7OzsrREFIaEYsR0FBSSxJQUFDLElBQUk7K0RBQ1YsR0FBSSxJQUFDLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FiWCxJQUFJLEVBQUUsSUFBSTs7Z0JBRU4sZ0JBQWdCO1FBQ1AsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUk7a0JBRTFELElBQUksR0FBRyxLQUFLOzs7Ozs7Ozs7NkNBS3FGLElBQUksR0FBRyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dDeUNyRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQU9GLG9CQUdLOzs7R0FESDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBSEcsR0FBTSxRQUFLLEVBQUU7Y0FBSSxHQUFLLEtBQUUsSUFBSTs7Ozs7O2dDQUFqQyxNQUFJOzs7Ozs7Ozs7aUJBVTBCLEdBQUk7YUFBZSxXQUFXOzs7bUJBQWpELEdBQVM7bUNBQVQsR0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXRCNUI7R0FDRSxvQkFrQks7R0FqQkgsb0JBT0s7dUJBREM7Ozs7Ozs7Ozs7R0FHTixvQkFPSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQU5JLEdBQU0sUUFBSyxFQUFFO2lCQUFJLEdBQUssS0FBRSxJQUFJOzs7Ozs7K0JBQWpDLE1BQUk7Ozs7Ozs7Ozs7Ozs7Ozs7b0NBQUosTUFBSTs7OzswREFVMEIsR0FBSTs7Ozt1Q0FBdkIsR0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBL0RsQkEsUUFBTSxHQUFHQyxlQUFHLENBQUMsT0FBTzs2Q0FHdEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxZQUFZO1FBSTFCO1FBQ0EsS0FBSyxTQUFTRCxRQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJO1FBQ3pDLElBQUksU0FBU0EsUUFBTSxDQUFDLGNBQWMsR0FBRyxLQUFLOzs7Ozs7Ozs7Ozs7T0FhekMsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLO09BQ3ZCLFNBQVMsR0FBRyxLQUFLOzBCQUM1QixRQUFRLEtBQ04sSUFBSTtLQUdGLE1BQU0sR0FBRyxFQUFFLEVBQ2IsSUFBSTs7Ozs7O1VBTUcsZUFBZSxDQUFDLElBQUk7a0JBQzNCLElBQUksR0FBRyxJQUFJO2tCQUNYOzs7Ozs7Ozs7Ozs7aUNBbUIrQixlQUFlLENBQUMsSUFBSTs7O0VBT2xDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
