import { w as get_store_value, S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, b as validate_store, c as component_subscribe, v as validate_slots, a as stores$1, D as feather, e as element, f as space, t as text, g as claim_element, h as children, l as claim_space, j as claim_text, k as detach_dev, m as attr_dev, n as add_location, o as insert_hydration_dev, p as append_hydration_dev, P as set_input_value, q as listen_dev, Q as prevent_default, r as set_data_dev, u as noop, R as run_all, B as set_store_value } from './client.c7c491ec.js';

/* src/routes/create_admin.svelte generated by Svelte v3.42.1 */
const file = "src/routes/create_admin.svelte";

function create_fragment(ctx) {
	let form;
	let input0;
	let t0;
	let input1;
	let t1;
	let button;
	let t2;
	let t3;
	let t4;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			form = element("form");
			input0 = element("input");
			t0 = space();
			input1 = element("input");
			t1 = space();
			button = element("button");
			t2 = text("Kaydol");
			t3 = space();
			t4 = text(/*flash*/ ctx[2]);
			this.h();
		},
		l: function claim(nodes) {
			form = claim_element(nodes, "FORM", { class: true });
			var form_nodes = children(form);
			input0 = claim_element(form_nodes, "INPUT", { type: true, class: true });
			t0 = claim_space(form_nodes);
			input1 = claim_element(form_nodes, "INPUT", { type: true, class: true });
			t1 = claim_space(form_nodes);
			button = claim_element(form_nodes, "BUTTON", { type: true });
			var button_nodes = children(button);
			t2 = claim_text(button_nodes, "Kaydol");
			button_nodes.forEach(detach_dev);
			t3 = claim_space(form_nodes);
			t4 = claim_text(form_nodes, /*flash*/ ctx[2]);
			form_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(input0, "type", "email");
			input0.required = true;
			attr_dev(input0, "class", "svelte-1pwmlc");
			add_location(input0, file, 38, 2, 842);
			attr_dev(input1, "type", "password");
			input1.required = true;
			attr_dev(input1, "class", "svelte-1pwmlc");
			add_location(input1, file, 39, 2, 897);
			attr_dev(button, "type", "submit");
			add_location(button, file, 41, 2, 959);
			attr_dev(form, "class", "flex flex-col w-132 gap-4 mx-auto mt-12 svelte-1pwmlc");
			add_location(form, file, 37, 0, 738);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, form, anchor);
			append_hydration_dev(form, input0);
			set_input_value(input0, /*email*/ ctx[0]);
			append_hydration_dev(form, t0);
			append_hydration_dev(form, input1);
			set_input_value(input1, /*password*/ ctx[1]);
			append_hydration_dev(form, t1);
			append_hydration_dev(form, button);
			append_hydration_dev(button, t2);
			append_hydration_dev(form, t3);
			append_hydration_dev(form, t4);

			if (!mounted) {
				dispose = [
					listen_dev(input0, "input", /*input0_input_handler*/ ctx[5]),
					listen_dev(input1, "input", /*input1_input_handler*/ ctx[6]),
					listen_dev(form, "submit", prevent_default(/*handleCreateAdmin*/ ctx[4]), false, true, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*email*/ 1 && input0.value !== /*email*/ ctx[0]) {
				set_input_value(input0, /*email*/ ctx[0]);
			}

			if (dirty & /*password*/ 2 && input1.value !== /*password*/ ctx[1]) {
				set_input_value(input1, /*password*/ ctx[1]);
			}

			if (dirty & /*flash*/ 4) set_data_dev(t4, /*flash*/ ctx[2]);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(form);
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
	const isAdminExist = !!(await get_store_value(feather).service("users").find()).total;
	return isAdminExist ? this.redirect(302, "/singin") : null;
}

function instance($$self, $$props, $$invalidate) {
	let $session;
	let $feather;
	validate_store(feather, 'feather');
	component_subscribe($$self, feather, $$value => $$invalidate(8, $feather = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Create_admin', slots, []);
	const { session } = stores$1();
	validate_store(session, 'session');
	component_subscribe($$self, session, value => $$invalidate(7, $session = value));
	let email, password, flash = "";

	async function handleCreateAdmin() {
		try {
			const admin = await $feather.service("users").create({ email, password, role: "admin" });
			set_store_value(session, $session.user = admin, $session);
		} catch(error) {
			$$invalidate(2, flash = error);
			setTimeout(() => $$invalidate(2, flash = ""), 2000);
		}
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Create_admin> was created with unknown prop '${key}'`);
	});

	function input0_input_handler() {
		email = this.value;
		$$invalidate(0, email);
	}

	function input1_input_handler() {
		password = this.value;
		$$invalidate(1, password);
	}

	$$self.$capture_state = () => ({
		get: get_store_value,
		feather,
		preload,
		stores: stores$1,
		session,
		email,
		password,
		flash,
		handleCreateAdmin,
		$session,
		$feather
	});

	$$self.$inject_state = $$props => {
		if ('email' in $$props) $$invalidate(0, email = $$props.email);
		if ('password' in $$props) $$invalidate(1, password = $$props.password);
		if ('flash' in $$props) $$invalidate(2, flash = $$props.flash);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		email,
		password,
		flash,
		session,
		handleCreateAdmin,
		input0_input_handler,
		input1_input_handler
	];
}

class Create_admin extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Create_admin",
			options,
			id: create_fragment.name
		});
	}
}

export { Create_admin as default, preload };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX2FkbWluLjI3MzEyZmEwLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL2NyZWF0ZV9hZG1pbi5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiXG48c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIj5cbiAgICBpbXBvcnQgeyBnZXQgfSBmcm9tICdzdmVsdGUvc3RvcmUnXG4gICAgaW1wb3J0IHsgZmVhdGhlciB9IGZyb20gJy4uL2xpYi9zdG9yZXMvZmVhdGhlcidcblxuICAgIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcmVsb2FkKHBhZ2UsIHNlc3Npb24pIHtcbiAgICAgICAgaWYoIXByb2Nlc3MuYnJvd3NlcikgcmV0dXJuXG4gICAgICAgIGNvbnN0IGlzQWRtaW5FeGlzdCA9ICEhKGF3YWl0IGdldChmZWF0aGVyKS5zZXJ2aWNlKCd1c2VycycpLmZpbmQoKSAgKS50b3RhbFxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGlzQWRtaW5FeGlzdCA/IHRoaXMucmVkaXJlY3QoMzAyLCAnL3NpbmdpbicpIDogbnVsbFxuICAgIH1cbjwvc2NyaXB0PlxuXG48c2NyaXB0PlxuICBpbXBvcnQgeyBzdG9yZXMgfSBmcm9tICdAc2FwcGVyL2FwcCdcbiAgY29uc3QgeyBzZXNzaW9uIH0gPSBzdG9yZXMoKVxuICBcbiAgbGV0IGVtYWlsLCBwYXNzd29yZCwgZmxhc2ggPSBcIlwiXG5cblxuICBhc3luYyBmdW5jdGlvbiBoYW5kbGVDcmVhdGVBZG1pbiAoKSB7XG4gICAgICAgXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYWRtaW4gPSBhd2FpdCAkZmVhdGhlci5zZXJ2aWNlKCd1c2VycycpLmNyZWF0ZSh7XG4gICAgICAgICAgICBlbWFpbCwgcGFzc3dvcmQsIHJvbGUgOiBcImFkbWluXCJcbiAgICAgICAgfSlcblxuICAgICAgICAkc2Vzc2lvbi51c2VyID0gYWRtaW5cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBcbiAgICAgICAgZmxhc2ggPSBlcnJvclxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZmxhc2ggPSBcIlwiLCAyMDAwKVxuICAgICAgICBcbiAgICB9XG4gICAgICAgXG4gIH1cbjwvc2NyaXB0PlxuXG5cbjxmb3JtIFxuXG5vbjpzdWJtaXR8cHJldmVudERlZmF1bHQ9e2hhbmRsZUNyZWF0ZUFkbWlufVxuY2xhc3M9XCJmbGV4IGZsZXgtY29sIHctMTMyIGdhcC00IG14LWF1dG8gbXQtMTJcIj5cblxuXG4gICAgPGlucHV0IHR5cGU9XCJlbWFpbFwiIGJpbmQ6dmFsdWU9e2VtYWlsfSByZXF1aXJlZD5cbiAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgYmluZDp2YWx1ZT17cGFzc3dvcmR9IHJlcXVpcmVkPlxuXG4gICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+IEtheWRvbDwvYnV0dG9uPlxuXG4gICAge2ZsYXNofVxuPC9mb3JtPlxuXG5cbjxzdHlsZT5cbiAgICBpbnB1dCB7XG4gICAgICAgIEBhcHBseSBib3JkZXIgYm9yZGVyLXNvbGlkIGJvcmRlci1kYXJrLTMwMDtcbiAgICB9XG48L3N0eWxlPiJdLCJuYW1lcyI6WyJzdG9yZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBMkNHLEdBQUs7Ozs7Ozs7Ozs7Ozs7Ozt5Q0FBTCxHQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBTlI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dURBTUcsR0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FyQ0EsWUFBdUI7Ozs7Ozs7Ozs7O1NBUXZCLE9BQU8sS0FBS0EsUUFBTTs7O1lBR3hCLFFBQVE7O2dCQUdLLGlCQUFpQjs7MERBRzFCLEtBQUssRUFDTCxRQUFRLEVBQ1IsSUFBSTs0QkFHTixRQUFRLENBQUMsSUFBSSxHQUFHOzttQkFFaEIsS0FBSyxHQUFHLEtBQUs7R0FFYixVQUFVLHVCQUFRLEtBQUssR0FBRyxFQUFFLEdBQUcsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
