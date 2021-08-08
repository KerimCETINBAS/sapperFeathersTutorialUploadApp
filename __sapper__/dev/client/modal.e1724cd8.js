import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, z as binding_callbacks, A as bind, e as element, E as create_component, g as claim_element, h as children, F as claim_component, k as detach_dev, m as attr_dev, n as add_location, o as insert_hydration_dev, G as mount_component, H as add_flush_callback, M as group_outros, J as transition_out, L as destroy_component, N as check_outros, I as transition_in, O as empty } from './client.aa460f1a.js';

/* src/lib/components/modal.svelte generated by Svelte v3.42.1 */

const file = "src/lib/components/modal.svelte";

// (7:0) {#if show}
function create_if_block(ctx) {
	let div;
	let switch_instance;
	let updating_data;
	let updating_show;
	let current;

	function switch_instance_data_binding(value) {
		/*switch_instance_data_binding*/ ctx[3](value);
	}

	function switch_instance_show_binding(value) {
		/*switch_instance_show_binding*/ ctx[4](value);
	}

	var switch_value = /*component*/ ctx[2];

	function switch_props(ctx) {
		let switch_instance_props = {};

		if (/*data*/ ctx[1] !== void 0) {
			switch_instance_props.data = /*data*/ ctx[1];
		}

		if (/*show*/ ctx[0] !== void 0) {
			switch_instance_props.show = /*show*/ ctx[0];
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
		binding_callbacks.push(() => bind(switch_instance, 'data', switch_instance_data_binding));
		binding_callbacks.push(() => bind(switch_instance, 'show', switch_instance_show_binding));
	}

	const block = {
		c: function create() {
			div = element("div");
			if (switch_instance) create_component(switch_instance.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { id: true, class: true });
			var div_nodes = children(div);
			if (switch_instance) claim_component(switch_instance.$$.fragment, div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "id", "modal");
			attr_dev(div, "class", " fixed w-full h-full top-0 left-0 bg-opacity-70 bg-dark-500 flex items-center justify-center svelte-bi8fhl");
			add_location(div, file, 7, 2, 78);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div, anchor);

			if (switch_instance) {
				mount_component(switch_instance, div, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = {};

			if (!updating_data && dirty & /*data*/ 2) {
				updating_data = true;
				switch_instance_changes.data = /*data*/ ctx[1];
				add_flush_callback(() => updating_data = false);
			}

			if (!updating_show && dirty & /*show*/ 1) {
				updating_show = true;
				switch_instance_changes.show = /*show*/ ctx[0];
				add_flush_callback(() => updating_show = false);
			}

			if (switch_value !== (switch_value = /*component*/ ctx[2])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					binding_callbacks.push(() => bind(switch_instance, 'data', switch_instance_data_binding));
					binding_callbacks.push(() => bind(switch_instance, 'show', switch_instance_show_binding));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, div, null);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (switch_instance) destroy_component(switch_instance);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(7:0) {#if show}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*show*/ ctx[0] && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_hydration_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*show*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*show*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
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
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
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

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Modal', slots, []);
	let { show = true, component, data } = $$props;
	const writable_props = ['show', 'component', 'data'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Modal> was created with unknown prop '${key}'`);
	});

	function switch_instance_data_binding(value) {
		data = value;
		$$invalidate(1, data);
	}

	function switch_instance_show_binding(value) {
		show = value;
		$$invalidate(0, show);
	}

	$$self.$$set = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('component' in $$props) $$invalidate(2, component = $$props.component);
		if ('data' in $$props) $$invalidate(1, data = $$props.data);
	};

	$$self.$capture_state = () => ({ show, component, data });

	$$self.$inject_state = $$props => {
		if ('show' in $$props) $$invalidate(0, show = $$props.show);
		if ('component' in $$props) $$invalidate(2, component = $$props.component);
		if ('data' in $$props) $$invalidate(1, data = $$props.data);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		show,
		data,
		component,
		switch_instance_data_binding,
		switch_instance_show_binding
	];
}

class Modal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, { show: 0, component: 2, data: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Modal",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*component*/ ctx[2] === undefined && !('component' in props)) {
			console.warn("<Modal> was created without expected prop 'component'");
		}

		if (/*data*/ ctx[1] === undefined && !('data' in props)) {
			console.warn("<Modal> was created without expected prop 'data'");
		}
	}

	get show() {
		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get component() {
		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set component(value) {
		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get data() {
		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set data(value) {
		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export { Modal as M };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuZTE3MjRjZDguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50cy9tb2RhbC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgICBcblxuICAgIGV4cG9ydCBsZXQgc2hvdyA9IHRydWUsIGNvbXBvbmVudCwgZGF0YVxuPC9zY3JpcHQ+XG5cbnsjaWYgc2hvd31cbiAgICA8ZGl2IGlkID0gXCJtb2RhbFwiIGNsYXNzPVwiIGZpeGVkIHctZnVsbCBoLWZ1bGwgdG9wLTAgbGVmdC0wIGJnLW9wYWNpdHktNzAgYmctZGFyay01MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgIDxzdmVsdGU6Y29tcG9uZW50IHRoaXM9e2NvbXBvbmVudH0gYmluZDpkYXRhPXtkYXRhfSBiaW5kOnNob3c9e3Nob3d9IC8+XG4gICAgPC9kaXY+XG57L2lmfVxuXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0FRNkIsR0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FEcEMsb0JBRUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NEQURzQixHQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQUZqQyxHQUFJOzs7Ozs7Ozs7Ozs7Ozs7OztnQkFBSixHQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BTEUsSUFBSSxHQUFHLElBQUksRUFDcEIsU0FBUyxFQUNULElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
