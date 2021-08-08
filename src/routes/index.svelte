<script context="module">
    import { get } from 'svelte/store'
    import { feather } from '../lib/stores/feather'
	import feathers from '@feathersjs/client'

	

	export async function preload() {
		
		if(process.browser) {
            const client =  get(feather)
            client.configure(feathers.authentication({
                storage: window.localStorage
            }));
          
            const categories = await client.service('uploadthree').find()
			const files = await client.service('file').find()
        	const user = await client.reAuthenticate().catch( () => false)
			
            return { user : user?.user, categories, files}
            
       }
	}
    

</script>
	
	
<script>
	import { onMount } from 'svelte'
	import Modal from '../lib/components/modal.svelte'
	import DownloadModal from '../lib/components/home/downloadModal.svelte';
	import { stores } from '@sapper/app'
    const { session } = stores()

	export let user, categories,files
	export let showModal = false
	$session = {
        user
    }

	let filter = "", file

	async function handleCategorySelect(category) {
		filter = category
	}

	function handleShowModal(data) {
			file = data
			showModal = true
	}

	onMount(async () => {
		const categoryService = $feather.service('uploadthree')
		const fileService = $feather.service('file')


		;["created" , "removed" ].forEach( event => {
			categoryService.on(event, async () => {
				
				categories = await categoryService.find()
			
			})

			fileService.on(event, async () => {
				files = await fileService.find()
			})
		})
	})
</script>



	<div class=" w-full h-full">
		<div class=" flex h-full  ">
			<div class="w-52 h-full bg-dark-400 ">
				<ul class="flex flex-col gap-2 text-white p-3">
					
					<li on:click={() => handleCategorySelect("")}
						
						class="p-2 {filter == "" ? 'bg-dark-700' : 'bg-dark-200'}  hover:bg-rose-500 duration-500">Tümü</li>
					{#each categories?.data || [] as category}
						<li 
						on:click={() => handleCategorySelect(category.text)}
						class="p-2 {filter == category.text ? 'bg-dark-700' : 'bg-dark-200'}   hover:bg-rose-500 duration-500">{category.text}</li>
					{/each}
				</ul>
			</div>

			<div class="w-full bg-dark-500   ">
				{#each filter !== "" ? (files?.data || []).filter(x => x.category == filter) : files?.data || []  as file}
					<div class="bg-rose-500 hover:bg-rose-600 duration-150 float-left w-42 h-20 m-3 rounded-xl relative mt-6 flex flex-col justify-center items-center shadow shadow-md shadow-rose-400 cursor-pointer">
						<div class="absolute bg-rose-600 w-3/5 h-4 rounded-t-xl -top-4 right-5 shadow shadow-md shadow-rose-400"></div>
							<span on:click={() => handleShowModal(file)} class="text-white uppercase font-bold text-center block h-full w-full overflow-hidden py-2 flex items-center justify-center">{file.name}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
<style>

</style>
<Modal bind:show={showModal} data={file}  component={DownloadModal}  />
