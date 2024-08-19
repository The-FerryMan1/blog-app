<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import {  ref, watchEffect } from 'vue';

const {user} = storeToRefs(useAuthStore());
const {logout} = useAuthStore();



const open = ref(false)
const modal = ()=>{
    open.value = !open.value;
}

const submitLogout = ()=>{
    logout();
    open.value = false;
}

</script>


<template>
    <header id="header"class="w-full p-2 bg-transparent flex items-center">
        <div class="me-auto">
            <router-link :to="{name: 'home'}" class="ms-10 text-2xl font-semibold tracking-widest p-2">BulagBlog</router-link>
        </div>

        <nav class="me-10">
            <ul class="flex text-base space-x-10 ">
                <li>
                    <router-link :to="{ name: 'home' }" active-class="text-red-500 " class="p-2 hover:underline underline-offset-4 transition-all">
                        Home
                    </router-link>
                </li>
                <div v-if="user" class="flex text-base space-x-10 ">
                    <li>
                        <button @click="modal" class="hover:underline underline-offset-4 transition-all">Profile</button>
                    </li>
                </div>
                <div v-else class="flex text-base space-x-10 "> 
                    <li>
                    <router-link :to="{ name: 'login' }" active-class="text-red-500" class="p-2 hover:underline underline-offset-4 transition-all">
                        Login
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'signUp' }" active-class="text-red-500" class="p-2 hover:underline underline-offset-4 transition-all">
                        Sign up
                    </router-link>
                </li>
                    
                </div>
               
            </ul>
        </nav>

    </header>

    <teleport to="#app">
        <div v-show="open" class="fixed top-0 w-full h-full z-20 ">
            <div class="absolute z-30 right-[3%] p-4 w-[10%] top-[4%] bg-white space-y-3 rounded-md">
                <h1 v-show="user" class="">{{ user?.name}}</h1>
                <ul class="space-y-3">
                    <li>
                       <router-link :to="{name: 'profile'}" class="hover:underline underline-offset-4 transition-all">Settings</router-link>
                    </li>
                    <li>
                         <button popovertarget="my-popover" class="hover:underline underline-offset-4 transition-all">Logout</button>
                         
                    </li>
                </ul>
            </div>

            <div popover id="my-popover" class="w-1/3 bg-white p-4 rounded-md">
                <form @submit.prevent="submitLogout" action="" class="z-30 flex flex-col justify-center items-center">
                        <h2 class="text-xl font-semibold mb-10">Are you sure you want to logout?</h2>
                        <div class="flex ms-auto space-x-5 text-white">
                            <button class="hover:opacity-50 transition-all bg-red-500 py-2 px-3 rounded-md">Yes!</button>
                            <button popovertarget="my-popover" type="button" class="hover:opacity-50 transition-all bg-slate-400 py-2 px-3 rounded-md">cancel</button>
                        </div>
                        
                </form>
            </div>
           
            <div @click="modal" class="w-full h-full bg-black opacity-50 absolute"></div>
        </div>
    </teleport>
</template>