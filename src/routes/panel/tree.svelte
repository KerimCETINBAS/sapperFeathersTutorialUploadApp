
<script context="module">
    import { get } from 'svelte/store'
    import { feather } from '../../lib/stores/feather'

    export async function preload() {
        if(process.browser) {
            const client = get(feather)

            const catalogs = await client.service('uploadthree').find()
            return { catalogs }
        }
      
    }
</script>
<script>
    import { onMount } from "svelte";
    import CardButton from "../../lib/components/panel/cardButton.svelte";
    import Modal from '../../lib/components/modal.svelte'
    import addTreeModal from '../../lib/components/panel/addTreeModal.svelte'


    export let showAddCategoryModal = false, catalogs 
    




    onMount(async () => {
        const service =  $feather.service('uploadthree')
        ;['created', 'removed'].forEach(event => {
            service.on(event, async () => catalogs = await service.find())
   
        })
       
    })

    async function handleCategoryDelete(id) {
        const removed = await $feather.service('uploadthree').remove(id)
    }   





</script>

<Modal component={addTreeModal} bind:show = {showAddCategoryModal}/>

<div class="w-full h-full flex flex-col lg:flex-row gap-6  p-12">

    <div class="md:w-full lg:w-2/4 xl:w-1/4">
        <ul class="h-full bg-dark-500 p-3 text-white flex flex-col gap-1">
            {#each  catalogs?.data || [] as data }
                <li class="categoryItem p-2 bg-dark-700 hover:bg-rose-500 duration-500 flex">
                    <div class="w-full">{data.text}</div>  
                    <div 
                    
                    on:click={() => handleCategoryDelete(data._id)}
                    class="sil hidden cursor-pointer">sil</div>
                </li>
            {/each}
        </ul>
       
    </div>
    <div class="flex-1 w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3   gap-12">
        <CardButton data={{title : "Toplam kategori" , icon : "fas fa-list", value : catalogs?.total}}  />
        <CardButton data={{title : "Yeni kategori ekle" , icon : "fas fa-list"}} on:click={(e) => showAddCategoryModal =true} />
            
    </div>
</div>



<style>
    .categoryItem:hover .sil{
        @apply block;
    }
</style>