<script context="module">
    import { get } from 'svelte/store'
    import { feather } from '../../lib/stores/feather'

    import feathers from '@feathersjs/client'
    export async function preload(page, session) {
      
       if(process.browser) {
            const users = await get(feather).service('users').find()
            const createAdmin = users.total === 0 ? true : false

            get(feather).configure(feathers.authentication({
                storage: window.localStorage
            }));
            const client =  get(feather)
            if( createAdmin ) return this.redirect(302, '/create_admin')
           
           
           
            const user = await client.reAuthenticate().catch( () => false)
            if(user) return { user : user?.user}
            else this.redirect(302, '/signin')
       }
    }

</script>
<script>
    import { stores } from '@sapper/app'
    const { session } = stores()
    import { fade } from 'svelte/transition';
    export let segment, user

    $session = {
        user
    }
    $:navItems = [
        {   
            icon : "fa fa-upload",
            text : "Yüklenenler",
            path : "/panel/",
            curent: segment === undefined ? 'page' : undefined,
        },
        {   
            icon : "fas fa-folder",
            text : "Katagoriler",
            path : "/panel/tree",
            curent: segment === "tree" ? 'page' : undefined,
        },
    ]

    let navHover = false


</script>



<div class="w-full h-full flex  select-none">
    <aside 
 
    class="">
        <nav 
            on:mouseenter={()=> setTimeout(()=>navHover = true, 200)}
            on:mouseleave={()=>navHover = false}
            class="h-full w-22">
            <ul class="flex flex-col h-full  w-22 hover:w-62  items-center justify-center fixed  duration-75 
             bg-rose-500 shadow shadow-xl shadow-dark-900 drop-shadow-md">

                {#each navItems as navItem}
                    <li 
                    
                        arria-current="{navItem.curent}"
                        class="w-[calc(100%_-_0.5rem)]  duration-200 transition-colors hover:text-white hover:bg-rose-800">
                        <a href="{navItem.path}" class="block w-full h-full p-3">
                            <i class=" w-8  {navItem.icon}"></i> 
                            {#if navHover}
                            <span 
                            in:fade="{{ duration : 200 , delay : 50}}"
                            out:fade="{{ duration : 0 , delay : 0}}">
                                {navItem.text}                            
                            </span>
                            {/if}
                        </a>
                    </li>
                {/each}
              
            </ul>
        </nav>
    </aside>
    <div class="w-full flex flex-col ">
       
        <div class="flex-1">
            <slot />
        </div>
    </div>
</div>



<style>
     aside:hover nav ul li a i {
         @apply w-6;
     }
     

     [arria-current] {
         @apply bg-rose-700 text-gray-100;
     }
</style>