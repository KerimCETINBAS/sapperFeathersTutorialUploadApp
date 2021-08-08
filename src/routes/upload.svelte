<script context="module">
    import { get } from 'svelte/store'
    import { feather } from '../lib/stores/feather'

    import feathers from '@feathersjs/client'
    export async function preload(page, session) {
      
       if(process.browser) {
            const client =  get(feather)
            client.configure(feathers.authentication({
                storage: window.localStorage
            }));
          
            const categories = await client.service('uploadthree').find()
          
            const user = await client.reAuthenticate().catch( () => false)
  
            if(user) return { user : user?.user, categories}
            else this.redirect(302, '/signin')
       }
    }

</script>


<script>
    import axios from 'axios'
    import { stores, goto } from '@sapper/app'
    const { session } = stores()
    import { tick } from 'svelte';
    export let categories, user
    $session = {
        user
    }
 
    let category, name, description, files, uploadProgress = false, uploadPercent = 0

    async function handleUpload(e) {
   
        const form = new FormData()
        for(const file of files) {
            form.append('files',  file)
        }
        form.append('category', category)
        form.append('name', name)
        form.append('description', description)
        if(category == "") return alert('Lütfen kategori seçiniz')
        uploadProgress = true
        await axios.post('upload', form , {
            async onUploadProgress(event) {

                const {total, loaded} = event

                uploadPercent = (100 * loaded) / total;

                if(loaded === total) {
                    
                    goto('/')
                }
            }
            
        })


       

       
    }



</script>


<div class="w-full h-full flex justify-center items-center">

    <form  on:submit|preventDefault={handleUpload}  class="flex flex-col w-102 bg-dark-400 p-12 gap-6">

        <select name="" id="" class="w-full bg-white p-3 text-dark-900"  bind:value={category} required>
            <option value="" >Kategori seçiniz</option>
            {#each categories?.data || [] as category}
                <option value={category.text}>{category.text}</option>
       
            {/each}
        </select>
        <input type="text"  class="w-full bg-white p-3 text-dark-900"  placeholder="Dosya adız" bind:value={name} required>
        <textarea name=""  class="w-full bg-white p-3 h-32 text-dark-900"  id="" cols="30" rows="10" placeholder="Açıklama"  bind:value={description} required></textarea>


        {#if !uploadProgress}
        <input type="file"  bind:files class="text-white" />
        {#if files?.[0]}
        <p>
            {files[0].name}
        </p>
        {/if}
        <button type="submit" >Yukle</button>
        {:else}
        <div class="w-full bg-dark-900 h-2 flex items-center">
            <div class="bg-white h-1" style="width:{uploadPercent.toFixed(3)}%;"></div>
        </div>

        <div class="w-full text-center text-white"> { uploadPercent.toFixed(2) }%</div>
        {/if}
    </form>
    
   
</div>