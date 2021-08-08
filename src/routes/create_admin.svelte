
<script context="module">
    import { get } from 'svelte/store'
    import { feather } from '../lib/stores/feather'

    export async function preload(page, session) {
        if(!process.browser) return
        const isAdminExist = !!(await get(feather).service('users').find()  ).total
        
        return isAdminExist ? this.redirect(302, '/singin') : null
    }
</script>

<script>
  import { stores } from '@sapper/app'
  const { session } = stores()
  
  let email, password, flash = ""


  async function handleCreateAdmin () {
       
    try {
        const admin = await $feather.service('users').create({
            email, password, role : "admin"
        })

        $session.user = admin
    } catch (error) {
        
        flash = error

        setTimeout(() => flash = "", 2000)
        
    }
       
  }
</script>


<form 

on:submit|preventDefault={handleCreateAdmin}
class="flex flex-col w-132 gap-4 mx-auto mt-12">


    <input type="email" bind:value={email} required>
    <input type="password" bind:value={password} required>

    <button type="submit"> Kaydol</button>

    {flash}
</form>


<style>
    input {
        @apply border border-solid border-dark-300;
    }
</style>