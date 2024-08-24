<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const {user} = storeToRefs(useAuthStore());

const open = ref(false);
const toggleSide = ()=>{
    open.value = !open.value
}
</script>

<template>
    <aside class="transition-all relative overflow-hidden" :class="!open? ' w-[15%] h-full shadow-2xl p-2  ':'w-[0px] h-full shadow-2xl '">
         <button @click="toggleSide" class="fixed left-0 top-2 m z-20 drop-shadow-lg">
            <svg class="w-[2.5rem] h-[2.5rem]"viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 12H18" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <path d="M5 17H11" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> <path d="M5 7H15" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> </g>
            </svg>
        </button>
        <div>
            <h2 v-show="user" class="text-lg font-semibold text-nowrap">{{user.name}}</h2>
           
        </div>
        <nav class="mt-10">
            <ul class="space-y-8 p-4 *:text-nowrap">
                <li>

                    <router-link :to="{name: 'admin-dash'}" active-class="bg-blue-500 text-white" class="p-2  hover:opacity-45  drop-shadow-md rounded-md">Dashboard</router-link>
                    
                </li>
               <li>

                    <router-link :to="{name: 'Admin-Post'}" active-class="bg-blue-500 text-white" class="p-2  hover:opacity-45  drop-shadow-md rounded-md">Post</router-link>
                    
                </li>
                <li>

                    <router-link :to="{name: 'Admin-userList'}" active-class="bg-blue-500 text-white" class="p-2  hover:opacity-45  drop-shadow-md rounded-md">User list</router-link>
                    
                </li>
                <li>

                    <router-link :to="{name: 'Admin-activityLogs'}" active-class="bg-blue-500 text-white" class="p-2  hover:opacity-45  drop-shadow-md rounded-md">Activity logs</router-link>
                    
                </li>
            </ul>
        </nav>
    </aside>
</template>