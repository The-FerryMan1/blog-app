<script setup>
import postCard from "@/components/post-card.vue";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { usePostStore } from "@/stores/post";
import { useAuthStore } from "@/stores/auth";
const {userGetPost} = usePostStore();
const {user} = storeToRefs(useAuthStore());
const post = ref(null);


onMounted(async()=>{
   post.value = await userGetPost()
   
})
</script>

<template>
  <section class="h-screen w-full flex justify-center items-center">
    <div class="w-full h-full flex flex-col justify-start items-center">
      <router-link v-if="user"
        class="p-2 bg-blue-500 rounded-md text-white active:ring hover:opacity-50 drop-shadow-lg self-start my-5 mx-5"
        :to="{ name: 'createPost' }"
        >Create a post</router-link
      >
      <div v-if="post?.length > 0" class="w-full grid grid-cols-5 place-items-start gap-3 p-3">
            <div v-for="postEach in post" :key="postEach.id" class="w-full h-full drop-shadow-lg p-2 rounded-md">
                <router-link :to="{name: 'post', params:{id: postEach.id}}">
                    <postCard :post="postEach"/>
                </router-link>
                
            </div>
      </div>
      <div v-else>
          <h2>No post </h2>
      </div>
    </div>
  </section>
</template>
