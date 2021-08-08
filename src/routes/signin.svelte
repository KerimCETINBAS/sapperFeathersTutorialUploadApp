
<script context="module">
    import { get } from 'svelte/store'
    import { feather } from '../lib/stores/feather'
    import feathers from '@feathersjs/client'

    export async function preload() {
    if(process.browser) {
        const client = get(feather)
        client .configure(feathers.authentication({
            storage: window.localStorage
        }));
     
       const users = await client.service('users').find()

       console.log(users)

       const createAdmin = users.total === 0 || undefined? true : false
        console.log(createAdmin)
        if(createAdmin) {
            return this.redirect(302, '/create_admin')
        }

       const user = await client.reAuthenticate().catch( () => false)
     
       if(user) return this.redirect(302, '/')
        }

        
    }


    
</script>

<script>
    import { stores } from '@sapper/app'

    const { session } = stores()
    let loginForm = {}
    let registerForm = {}


    async function handleLogin() {
        const user = await $feather.authenticate({
           strategy: 'local',
           ...loginForm
        }) 
        $session = {
            user : user?.user
        }
    }

    async function handleRegister() {
       
        try {
            const user = await $feather.service('users').create({
              email: registerForm.email,
              password: registerForm.password
            }) 
            
            if(user) {
                alert('Kayıt oldunuz')
            }
        } catch (error) {
                alert(error)
        }   
    }
</script>


<div class="flex h-full items-center justify-center bg-dark-400">

<div class="w-202 h-102 flex  md:flex-row flex-col">
    <div class="w-101  h-102 p-6 bg-rose-700">

        <form on:submit|preventDefault={handleLogin} class="flex flex-col items-center justify-center h-full w-70 mx-auto gap-6">
            <h2>Eposta ve şifre ile giriş yapın</h2>
            <input type="email" class="p-2 w-full text-dark-900" placeholder="Eposta" bind:value={loginForm.email} required>
            <input type="password" class="p-2 w-full text-dark-900" placeholder="Şifre" bind:value={loginForm.password} required>
            <button  type="submit"  class="p-2 bg-white text-dark-900 w-full">Giriş</button>
        </form>
    </div>
    <div class="w-101  h-102 p-6 bg-dark-700">

       

            <form  on:submit|preventDefault={handleRegister} class="flex flex-col items-center justify-center h-full w-70 mx-auto gap-6">
                <h2 class="text-white">Kayıt olmak için formu doldurun</h2>
                <input type="email" class="p-2 w-full text-dark-900" placeholder="Eposta" bind:value={registerForm.email} required>
                <input type="password" class="p-2 w-full text-dark-900" placeholder="Şifre" bind:value={registerForm.password}  required>
                
                <button type="submit" class="p-2 bg-white text-dark-900 w-full">Kayıt</button>
            </form>
     
    </div>
</div>
</div>