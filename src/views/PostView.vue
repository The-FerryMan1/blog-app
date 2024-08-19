<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { usePostStore } from '@/stores/post';
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from 'pinia';
const {userGetPostOne, userDeletePost} = usePostStore();

const {user} = storeToRefs(useAuthStore());
const route = useRoute();
const post = ref(null);
console.log(route.params.id)
onMounted(async()=>{
    post.value = await userGetPostOne(route.params.id);
})


const handleDelete = ()=>{
    const dec = confirm('Are you sure you want to delete this post?');

    if (dec) {
        userDeletePost(route.params.id);
    } else {
        
    }

    
}
</script>

<template>
   
  
   <section class="w-full flex justify-center items-center">
    <div v-if="post" class="w-full flex flex-col justify-start items-start p-4">
        <div class="w-full flex items-center">
            <h1 class="text-4xl ms-5 font-semibold"> {{ post?.post?.title }}</h1>
            <div v-if="user?.email === post?.post?.user?.email" class="ms-auto p-2 space-x-5 text-white *:rounded-md">
                <router-link :to="{name: 'postEdit'}" class="py-1 px-3 bg-blue-600 hover:opacity-50">Edit</router-link >
                <button @click="handleDelete"  class="py-1 px-3 bg-red-600 hover:opacity-50">Delete</button>
            </div>
        </div>
        
        <p class="ms-5">Author: <span class="font-semibold text-blue-500">{{ post?.post?.user?.name }}</span></p>
        <p class="ms-5 text-justify my-10 p-2x`">{{ post?.post?.body }}</p>
    </div>
    <div v-else>
        <h1>No post found</h1>
    </div>
   </section>
</template>
