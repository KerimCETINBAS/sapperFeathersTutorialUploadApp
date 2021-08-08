<script context="module">
    import { get } from 'svelte/store'
    import { feather } from '../lib/stores/feather'

    import feathers from '@feathersjs/client'
    export async function preload() {
      
       if(process.browser) {
           

		   const client =  get(feather)
		   client .configure(feathers.authentication({
                storage: window.localStorage
            }));
           
           
           
           
            const user = await client.reAuthenticate().catch( () => false)
            return { user : user?.user}
       }
    }

</script>
<script>
	import { stores } from '@sapper/app'
	import { onMount } from 'svelte';

	import Nav from '../lib/components/Nav.svelte';

	export let segment, user;

	const { session } = stores()

	$session = {
		user
	}


	onMount(async ()=>{
		//console.log(await $feather.service('users').create({email : "deneme@deneme", password: "1234"}))
	})
</script>


<div class="w-screen h-screen flex flex-col bg-dark-700 text-white">
	<Nav {segment}/>

	<main class="flex-1">
		<slot></slot>
	</main>
</div>




<style windi:preflights:global windi:safelist:global>
</style>
