<script setup>
import { usePostStore } from '@/stores/post';
import { onMounted, reactive, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
const {userGetPostOne, userEditPost} = usePostStore();
const {errorPostMessages} = storeToRefs(usePostStore());
const post = ref(null);
const route = useRoute();

const formData = reactive({
    title: null,
    body: null
})

const disabled = computed(()=>{
    return formData.title == null || formData.title == null? true:false;
});

const handleSubmit = () =>{
    userEditPost(formData,route.params.id);
};
onMounted(async()=>{
    post.value = await userGetPostOne(route.params.id);
})
</script>

<template>
   <section class="h-screen w-full flex justify-center items-center">
    <div class="w-full h-full flex flex-col justify-start items-center">
        <form @submit.prevent="handleSubmit"  action="" class="grid grid-cols-1 w-full sm:w-1/2 p-2">
            <p v-if="errorPostMessages" class="text-red-500 text-nowrap my-2">{{ errorPostMessages }}</p>
            <h2 class="text-2xl font-semibold text-green-500" >Edit post</h2>
            <div  class="grid grid-cols-1 gap-2 my-3">
                <label for="" class="text-lg ">Title</label>
                <input v-model="formData.title" :placeholder="post?.post?.title" type="text" class="w-full py-2 px-3 drop-shadow-lg border-2 border-black rounded-md" required/>
            </div>
            <div class="grid grid-cols-1 gap-2">
                <label class="text-lg " for="">Body</label>
                <textarea v-model="formData.body" :placeholder="post?.post?.body" name="" id="" class="resize-none w-full  p-2 h-[300px] drop-shadow-lg border-2 border-black rounded-md" required></textarea>
            </div>

            <button :disabled="disabled" class="disabled:bg-slate-500 text-white my-3 bg-blue-500 drop-shadow-lg py-2 px-3 rounded-md">Confirm Edit</button>
        </form>
    </div>

   </section>
</template>