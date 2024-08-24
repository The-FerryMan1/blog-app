<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostStore } from '@/stores/post';
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from 'pinia';
const {getMemoOnePost, userDeletePost} = usePostStore();

const {user} = storeToRefs(useAuthStore());
const route = useRoute();
const router = useRouter();
const post = ref(null);

onMounted(async()=>{
    post.value = await getMemoOnePost(route.params.id);
})


const handleDelete = ()=>{
    const dec = confirm('Are you sure you want to delete this post?');

    if (dec) {
        userDeletePost(route.params.id);
    } else {
        
    }

    
}

const goBackButton = ()=>{
    router.back();  
}
</script>

<template>
   
    <button @click="goBackButton" class="me-auto p-2 ms-9 my-5 bg-blue-500 rounded-md text-white">Go back</button>
   <section class="w-full flex justify-center items-center overflow-y-auto">
    <div v-if="post" class="w-full flex flex-col justify-start items-start p-4">
        <div class="w-full flex  flex-col items-start">
            <h1 class="sm:text-4xl break-all text-2xl ms-5 font-semibold"> {{ post?.post?.title }}</h1>
             <p class="ms-5">Author: <span class="font-semibold text-blue-500">{{ post?.post?.user?.name }}</span></p>
            <div v-if="user?.email === post?.post?.user?.email" class=" me-auto p-2 space-x-3 ms-3  text-white *:rounded-md">
                <router-link :to="{name: 'postEdit'}" class="py-1 px-3 bg-blue-600 hover:opacity-50">Edit</router-link >
                <button @click="handleDelete"  class="py-1 px-3 bg-red-600 hover:opacity-50">Delete</button>
            </div>
        </div>
        
       
        <p class="ms-5 text-justify my-10 p-2x`">{{ post?.post?.body }}</p>
    </div>
    <div v-else>
        <h1>No post found</h1>
    </div>
   </section>
</template>
