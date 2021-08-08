import { w as get_store_value, x as client, S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, b as validate_store, c as component_subscribe, v as validate_slots, a as stores$1, D as feather, T as globals, e as element, t as text, f as space, g as claim_element, h as children, j as claim_text, k as detach_dev, l as claim_space, n as add_location, m as attr_dev, o as insert_hydration_dev, p as append_hydration_dev, P as set_input_value, q as listen_dev, Q as prevent_default, u as noop, R as run_all, B as set_store_value } from './client.dc43af7a.js';

/* src/routes/signin.svelte generated by Svelte v3.42.1 */

const { console: console_1 } = globals;
const file = "src/routes/signin.svelte";

function create_fragment(ctx) {
	let div3;
	let div2;
	let div0;
	let form0;
	let h20;
	let t0;
	let t1;
	let input0;
	let t2;
	let input1;
	let t3;
	let button0;
	let t4;
	let t5;
	let div1;
	let form1;
	let h21;
	let t6;
	let t7;
	let input2;
	let t8;
	let input3;
	let t9;
	let button1;
	let t10;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div3 = element("div");
			div2 = element("div");
			div0 = element("div");
			form0 = element("form");
			h20 = element("h2");
			t0 = text("Eposta ve şifre ile giriş yapın");
			t1 = space();
			input0 = element("input");
			t2 = space();
			input1 = element("input");
			t3 = space();
			button0 = element("button");
			t4 = text("Giriş");
			t5 = space();
			div1 = element("div");
			form1 = element("form");
			h21 = element("h2");
			t6 = text("Kayıt olmak için formu doldurun");
			t7 = space();
			input2 = element("input");
			t8 = space();
			input3 = element("input");
			t9 = space();
			button1 = element("button");
			t10 = text("Kayıt");
			this.h();
		},
		l: function claim(nodes) {
			div3 = claim_element(nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			div2 = claim_element(div3_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div0 = claim_element(div2_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			form0 = claim_element(div0_nodes, "FORM", { class: true });
			var form0_nodes = children(form0);
			h20 = claim_element(form0_nodes, "H2", {});
			var h20_nodes = children(h20);
			t0 = claim_text(h20_nodes, "Eposta ve şifre ile giriş yapın");
			h20_nodes.forEach(detach_dev);
			t1 = claim_space(form0_nodes);

			input0 = claim_element(form0_nodes, "INPUT", {
				type: true,
				class: true,
				placeholder: true
			});

			t2 = claim_space(form0_nodes);

			input1 = claim_element(form0_nodes, "INPUT", {
				type: true,
				class: true,
				placeholder: true
			});

			t3 = claim_space(form0_nodes);
			button0 = claim_element(form0_nodes, "BUTTON", { type: true, class: true });
			var button0_nodes = children(button0);
			t4 = claim_text(button0_nodes, "Giriş");
			button0_nodes.forEach(detach_dev);
			form0_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			t5 = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			form1 = claim_element(div1_nodes, "FORM", { class: true });
			var form1_nodes = children(form1);
			h21 = claim_element(form1_nodes, "H2", { class: true });
			var h21_nodes = children(h21);
			t6 = claim_text(h21_nodes, "Kayıt olmak için formu doldurun");
			h21_nodes.forEach(detach_dev);
			t7 = claim_space(form1_nodes);

			input2 = claim_element(form1_nodes, "INPUT", {
				type: true,
				class: true,
				placeholder: true
			});

			t8 = claim_space(form1_nodes);

			input3 = claim_element(form1_nodes, "INPUT", {
				type: true,
				class: true,
				placeholder: true
			});

			t9 = claim_space(form1_nodes);
			button1 = claim_element(form1_nodes, "BUTTON", { type: true, class: true });
			var button1_nodes = children(button1);
			t10 = claim_text(button1_nodes, "Kayıt");
			button1_nodes.forEach(detach_dev);
			form1_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(h20, file, 68, 8, 1623);
			attr_dev(input0, "type", "email");
			attr_dev(input0, "class", "p-2 w-full text-dark-900 svelte-1nesk0u");
			attr_dev(input0, "placeholder", "Eposta");
			input0.required = true;
			add_location(input0, file, 69, 8, 1672);
			attr_dev(input1, "type", "password");
			attr_dev(input1, "class", "p-2 w-full text-dark-900 svelte-1nesk0u");
			attr_dev(input1, "placeholder", "Şifre");
			input1.required = true;
			add_location(input1, file, 70, 8, 1797);
			attr_dev(button0, "type", "submit");
			attr_dev(button0, "class", "p-2 bg-white text-dark-900 w-full svelte-1nesk0u");
			add_location(button0, file, 71, 8, 1927);
			attr_dev(form0, "class", "flex flex-col items-center justify-center h-full w-70 mx-auto gap-6 svelte-1nesk0u");
			add_location(form0, file, 67, 6, 1491);
			attr_dev(div0, "class", "w-101  h-102 p-6 bg-rose-700 svelte-1nesk0u");
			add_location(div0, file, 66, 4, 1442);
			attr_dev(h21, "class", "text-white svelte-1nesk0u");
			add_location(h21, file, 76, 8, 2219);
			attr_dev(input2, "type", "email");
			attr_dev(input2, "class", "p-2 w-full text-dark-900 svelte-1nesk0u");
			attr_dev(input2, "placeholder", "Eposta");
			input2.required = true;
			add_location(input2, file, 77, 8, 2287);
			attr_dev(input3, "type", "password");
			attr_dev(input3, "class", "p-2 w-full text-dark-900 svelte-1nesk0u");
			attr_dev(input3, "placeholder", "Şifre");
			input3.required = true;
			add_location(input3, file, 78, 8, 2415);
			attr_dev(button1, "type", "submit");
			attr_dev(button1, "class", "p-2 bg-white text-dark-900 w-full svelte-1nesk0u");
			add_location(button1, file, 80, 8, 2549);
			attr_dev(form1, "class", "flex flex-col items-center justify-center h-full w-70 mx-auto gap-6 svelte-1nesk0u");
			add_location(form1, file, 75, 6, 2084);
			attr_dev(div1, "class", "w-101  h-102 p-6 bg-dark-700 svelte-1nesk0u");
			add_location(div1, file, 74, 4, 2035);
			attr_dev(div2, "class", "w-202 h-102 flex  md:flex-row flex-col svelte-1nesk0u");
			add_location(div2, file, 65, 2, 1385);
			attr_dev(div3, "class", "flex h-full items-center justify-center bg-dark-400 svelte-1nesk0u");
			add_location(div3, file, 64, 0, 1317);
		},
		m: function mount(target, anchor) {
			insert_hydration_dev(target, div3, anchor);
			append_hydration_dev(div3, div2);
			append_hydration_dev(div2, div0);
			append_hydration_dev(div0, form0);
			append_hydration_dev(form0, h20);
			append_hydration_dev(h20, t0);
			append_hydration_dev(form0, t1);
			append_hydration_dev(form0, input0);
			set_input_value(input0, /*loginForm*/ ctx[0].email);
			append_hydration_dev(form0, t2);
			append_hydration_dev(form0, input1);
			set_input_value(input1, /*loginForm*/ ctx[0].password);
			append_hydration_dev(form0, t3);
			append_hydration_dev(form0, button0);
			append_hydration_dev(button0, t4);
			append_hydration_dev(div2, t5);
			append_hydration_dev(div2, div1);
			append_hydration_dev(div1, form1);
			append_hydration_dev(form1, h21);
			append_hydration_dev(h21, t6);
			append_hydration_dev(form1, t7);
			append_hydration_dev(form1, input2);
			set_input_value(input2, /*registerForm*/ ctx[1].email);
			append_hydration_dev(form1, t8);
			append_hydration_dev(form1, input3);
			set_input_value(input3, /*registerForm*/ ctx[1].password);
			append_hydration_dev(form1, t9);
			append_hydration_dev(form1, button1);
			append_hydration_dev(button1, t10);

			if (!mounted) {
				dispose = [
					listen_dev(input0, "input", /*input0_input_handler*/ ctx[5]),
					listen_dev(input1, "input", /*input1_input_handler*/ ctx[6]),
					listen_dev(form0, "submit", prevent_default(/*handleLogin*/ ctx[3]), false, true, false),
					listen_dev(input2, "input", /*input2_input_handler*/ ctx[7]),
					listen_dev(input3, "input", /*input3_input_handler*/ ctx[8]),
					listen_dev(form1, "submit", prevent_default(/*handleRegister*/ ctx[4]), false, true, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*loginForm*/ 1 && input0.value !== /*loginForm*/ ctx[0].email) {
				set_input_value(input0, /*loginForm*/ ctx[0].email);
			}

			if (dirty & /*loginForm*/ 1 && input1.value !== /*loginForm*/ ctx[0].password) {
				set_input_value(input1, /*loginForm*/ ctx[0].password);
			}

			if (dirty & /*registerForm*/ 2 && input2.value !== /*registerForm*/ ctx[1].email) {
				set_input_value(input2, /*registerForm*/ ctx[1].email);
			}

			if (dirty & /*registerForm*/ 2 && input3.value !== /*registerForm*/ ctx[1].password) {
				set_input_value(input3, /*registerForm*/ ctx[1].password);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div3);
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

async function preload() {
	{
		const client$1 = get_store_value(feather);
		client$1.configure(client.authentication({ storage: window.localStorage }));
		const users = await client$1.service("users").find();
		console.log(users);
		const createAdmin = users.total === 0 || undefined ? true : false;
		console.log(createAdmin);

		if (createAdmin) {
			return this.redirect(302, "/create_admin");
		}

		const user = await client$1.reAuthenticate().catch(() => false);
		if (user) return this.redirect(302, "/");
	}
}

function instance($$self, $$props, $$invalidate) {
	let $feather;
	let $session;
	validate_store(feather, 'feather');
	component_subscribe($$self, feather, $$value => $$invalidate(9, $feather = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Signin', slots, []);
	const { session } = stores$1();
	validate_store(session, 'session');
	component_subscribe($$self, session, value => $$invalidate(10, $session = value));
	let loginForm = {};
	let registerForm = {};

	async function handleLogin() {
		const user = await $feather.authenticate({ strategy: "local", ...loginForm });
		set_store_value(session, $session = { user: user?.user }, $session);
	}

	async function handleRegister() {
		try {
			const user = await $feather.service("users").create({
				email: registerForm.email,
				password: registerForm.password
			});

			if (user) {
				alert("Kayıt oldunuz");
			}
		} catch(error) {
			alert(error);
		}
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Signin> was created with unknown prop '${key}'`);
	});

	function input0_input_handler() {
		loginForm.email = this.value;
		$$invalidate(0, loginForm);
	}

	function input1_input_handler() {
		loginForm.password = this.value;
		$$invalidate(0, loginForm);
	}

	function input2_input_handler() {
		registerForm.email = this.value;
		$$invalidate(1, registerForm);
	}

	function input3_input_handler() {
		registerForm.password = this.value;
		$$invalidate(1, registerForm);
	}

	$$self.$capture_state = () => ({
		get: get_store_value,
		feather,
		feathers: client,
		preload,
		stores: stores$1,
		session,
		loginForm,
		registerForm,
		handleLogin,
		handleRegister,
		$feather,
		$session
	});

	$$self.$inject_state = $$props => {
		if ('loginForm' in $$props) $$invalidate(0, loginForm = $$props.loginForm);
		if ('registerForm' in $$props) $$invalidate(1, registerForm = $$props.registerForm);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		loginForm,
		registerForm,
		session,
		handleLogin,
		handleRegister,
		input0_input_handler,
		input1_input_handler,
		input2_input_handler,
		input3_input_handler
	];
}

class Signin extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Signin",
			options,
			id: create_fragment.name
		});
	}
}

export { Signin as default, preload };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmluLmQ4YTVjZWEwLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcm91dGVzL3NpZ25pbi5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiXG48c2NyaXB0IGNvbnRleHQ9XCJtb2R1bGVcIj5cbiAgICBpbXBvcnQgeyBnZXQgfSBmcm9tICdzdmVsdGUvc3RvcmUnXG4gICAgaW1wb3J0IHsgZmVhdGhlciB9IGZyb20gJy4uL2xpYi9zdG9yZXMvZmVhdGhlcidcbiAgICBpbXBvcnQgZmVhdGhlcnMgZnJvbSAnQGZlYXRoZXJzanMvY2xpZW50J1xuXG4gICAgZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHByZWxvYWQoKSB7XG4gICAgaWYocHJvY2Vzcy5icm93c2VyKSB7XG4gICAgICAgIGNvbnN0IGNsaWVudCA9IGdldChmZWF0aGVyKVxuICAgICAgICBjbGllbnQgLmNvbmZpZ3VyZShmZWF0aGVycy5hdXRoZW50aWNhdGlvbih7XG4gICAgICAgICAgICBzdG9yYWdlOiB3aW5kb3cubG9jYWxTdG9yYWdlXG4gICAgICAgIH0pKTtcbiAgICAgXG4gICAgICAgY29uc3QgdXNlcnMgPSBhd2FpdCBjbGllbnQuc2VydmljZSgndXNlcnMnKS5maW5kKClcblxuICAgICAgIGNvbnNvbGUubG9nKHVzZXJzKVxuXG4gICAgICAgY29uc3QgY3JlYXRlQWRtaW4gPSB1c2Vycy50b3RhbCA9PT0gMCB8fCB1bmRlZmluZWQ/IHRydWUgOiBmYWxzZVxuICAgICAgICBjb25zb2xlLmxvZyhjcmVhdGVBZG1pbilcbiAgICAgICAgaWYoY3JlYXRlQWRtaW4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZGlyZWN0KDMwMiwgJy9jcmVhdGVfYWRtaW4nKVxuICAgICAgICB9XG5cbiAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgY2xpZW50LnJlQXV0aGVudGljYXRlKCkuY2F0Y2goICgpID0+IGZhbHNlKVxuICAgICBcbiAgICAgICBpZih1c2VyKSByZXR1cm4gdGhpcy5yZWRpcmVjdCgzMDIsICcvJylcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgIH1cblxuXG4gICAgXG48L3NjcmlwdD5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgeyBzdG9yZXMgfSBmcm9tICdAc2FwcGVyL2FwcCdcblxuICAgIGNvbnN0IHsgc2Vzc2lvbiB9ID0gc3RvcmVzKClcbiAgICBsZXQgbG9naW5Gb3JtID0ge31cbiAgICBsZXQgcmVnaXN0ZXJGb3JtID0ge31cblxuXG4gICAgYXN5bmMgZnVuY3Rpb24gaGFuZGxlTG9naW4oKSB7XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCAkZmVhdGhlci5hdXRoZW50aWNhdGUoe1xuICAgICAgICAgICBzdHJhdGVneTogJ2xvY2FsJyxcbiAgICAgICAgICAgLi4ubG9naW5Gb3JtXG4gICAgICAgIH0pIFxuICAgICAgICAkc2Vzc2lvbiA9IHtcbiAgICAgICAgICAgIHVzZXIgOiB1c2VyPy51c2VyXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBoYW5kbGVSZWdpc3RlcigpIHtcbiAgICAgICBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCAkZmVhdGhlci5zZXJ2aWNlKCd1c2VycycpLmNyZWF0ZSh7XG4gICAgICAgICAgICAgIGVtYWlsOiByZWdpc3RlckZvcm0uZW1haWwsXG4gICAgICAgICAgICAgIHBhc3N3b3JkOiByZWdpc3RlckZvcm0ucGFzc3dvcmRcbiAgICAgICAgICAgIH0pIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZih1c2VyKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ0thecSxdCBvbGR1bnV6JylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBhbGVydChlcnJvcilcbiAgICAgICAgfSAgIFxuICAgIH1cbjwvc2NyaXB0PlxuXG5cbjxkaXYgY2xhc3M9XCJmbGV4IGgtZnVsbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctZGFyay00MDBcIj5cblxuPGRpdiBjbGFzcz1cInctMjAyIGgtMTAyIGZsZXggIG1kOmZsZXgtcm93IGZsZXgtY29sXCI+XG4gICAgPGRpdiBjbGFzcz1cInctMTAxICBoLTEwMiBwLTYgYmctcm9zZS03MDBcIj5cblxuICAgICAgICA8Zm9ybSBvbjpzdWJtaXR8cHJldmVudERlZmF1bHQ9e2hhbmRsZUxvZ2lufSBjbGFzcz1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGgtZnVsbCB3LTcwIG14LWF1dG8gZ2FwLTZcIj5cbiAgICAgICAgICAgIDxoMj5FcG9zdGEgdmUgxZ9pZnJlIGlsZSBnaXJpxZ8geWFwxLFuPC9oMj5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZW1haWxcIiBjbGFzcz1cInAtMiB3LWZ1bGwgdGV4dC1kYXJrLTkwMFwiIHBsYWNlaG9sZGVyPVwiRXBvc3RhXCIgYmluZDp2YWx1ZT17bG9naW5Gb3JtLmVtYWlsfSByZXF1aXJlZD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBjbGFzcz1cInAtMiB3LWZ1bGwgdGV4dC1kYXJrLTkwMFwiIHBsYWNlaG9sZGVyPVwixZ5pZnJlXCIgYmluZDp2YWx1ZT17bG9naW5Gb3JtLnBhc3N3b3JkfSByZXF1aXJlZD5cbiAgICAgICAgICAgIDxidXR0b24gIHR5cGU9XCJzdWJtaXRcIiAgY2xhc3M9XCJwLTIgYmctd2hpdGUgdGV4dC1kYXJrLTkwMCB3LWZ1bGxcIj5HaXJpxZ88L2J1dHRvbj5cbiAgICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ3LTEwMSAgaC0xMDIgcC02IGJnLWRhcmstNzAwXCI+XG5cbiAgICAgICBcblxuICAgICAgICAgICAgPGZvcm0gIG9uOnN1Ym1pdHxwcmV2ZW50RGVmYXVsdD17aGFuZGxlUmVnaXN0ZXJ9IGNsYXNzPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgaC1mdWxsIHctNzAgbXgtYXV0byBnYXAtNlwiPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cInRleHQtd2hpdGVcIj5LYXnEsXQgb2xtYWsgacOnaW4gZm9ybXUgZG9sZHVydW48L2gyPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZW1haWxcIiBjbGFzcz1cInAtMiB3LWZ1bGwgdGV4dC1kYXJrLTkwMFwiIHBsYWNlaG9sZGVyPVwiRXBvc3RhXCIgYmluZDp2YWx1ZT17cmVnaXN0ZXJGb3JtLmVtYWlsfSByZXF1aXJlZD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgY2xhc3M9XCJwLTIgdy1mdWxsIHRleHQtZGFyay05MDBcIiBwbGFjZWhvbGRlcj1cIsWeaWZyZVwiIGJpbmQ6dmFsdWU9e3JlZ2lzdGVyRm9ybS5wYXNzd29yZH0gIHJlcXVpcmVkPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwicC0yIGJnLXdoaXRlIHRleHQtZGFyay05MDAgdy1mdWxsXCI+S2F5xLF0PC9idXR0b24+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgIFxuICAgIDwvZGl2PlxuPC9kaXY+XG48L2Rpdj4iXSwibmFtZXMiOlsiY2xpZW50IiwiZmVhdGhlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7YUE0RStCLGlDQUErQjs7Ozs7OztjQUlVLE9BQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBSjlDLGlDQUErQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQUlVLE9BQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FoQjdFO0dBQ0Usb0JBa0JLO0dBakJILG9CQU9LOztHQUxEOzs7Ozs7Ozs7R0FHQTs7O0dBR0osb0JBUUs7dUJBREc7R0FMSixvQkFBMEQ7OztHQUMxRDs7O0dBQ0E7NENBQXlGLEdBQVksSUFBQyxRQUFROztHQUU5RyxvQkFBNkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VFQUZZLEdBQVksSUFBQyxRQUFROzZDQUFyQixHQUFZLElBQUMsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF0RWxIQSxRQUFNLENBQUMsU0FBUyxDQUNkQyxNQUFRLENBQUMsY0FBYyxHQUNyQixPQUFPLEVBQUUsTUFBTSxDQUFDLFlBQVk7OztRQVExQixXQUFXLEdBQUcsS0FBSyxDQUFDO0VBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUM7O01BQ1IsV0FBVzs7Ozs7TUFNWDs7Ozs7Ozs7Ozs7Ozs7S0FTSjtLQUNBLFlBQVk7O2dCQUVELFdBQVc7UUFDbEIsSUFBSSxTQUFTLHdCQUNqQixRQUFRLEVBQUUsT0FBTzsyQkFHbkIsUUFBUSxLQUNOLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSTs7O2dCQUlMOzs7Ozs7O09BT1AsSUFBSTtJQUNOLEtBQUssQ0FBQyxlQUFlOztVQUVoQixLQUFLO0dBQ1osS0FBSyxDQUFDLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBbUJrRixZQUFZLENBQUMsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
