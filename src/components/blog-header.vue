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
    <header id="header"class="w-full p-5 bg-white flex items-center sticky top-0 z-10 drop-shadow-lg">
        <div v-once  class="me-auto">
            <router-link :to="{name: 'home'}" class="ms-10 text-2xl font-semibold tracking-widest p-2">BulagBlog</router-link>
        </div>

        <nav :class="!user? 'me-10 hidden sm:block':'me-10 block'">
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

        <button  v-if="!user" popovertarget="offcanvas" class="block sm:hidden me-3">
            <svg class="w-[2rem] h-[2rem]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z" fill="#000000"></path> </g></svg>
        </button>

        <nav v-if="!user" popover id="offcanvas"  class="sm:hidden translate-x-[50%] fixed w-1/2 h-full bg-white drop-shadow-lg">
            <button popovertarget="offcanvas" class="text-3xl text-red-500 font-semibold p-2 cursor-pointer me-auto mb-5">&times;</button>    
            <div class="p-3">
                <ul class="flex flex-col text-base space-y-5 ">
                <li>
                    <router-link :to="{ name: 'home' }" active-class="text-red-500 " class="p-2 hover:underline underline-offset-4 transition-all">
                        Home
                    </router-link>
                </li>
                <div v-if="user" class="flex ms-2 text-base ">
                    <li>
                        <button @click="modal" class="hover:underline underline-offset-4 transition-all">Profile</button>
                    </li>
                </div>
                <div v-else class="flex text-base flex-col space-y-5 "> 
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
            </div>
            
        </nav>



    </header>

    <teleport to="#app">
        <div v-show="open" class="fixed top-0 w-full h-full z-20  ">
            <div class="absolute z-30 right-[3%] p-4 w-[40%] sm:w-[10%] top-[4%] bg-white space-y-3 rounded-md">
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