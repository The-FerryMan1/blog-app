<script setup>
import { computed } from 'vue';

const postProps = defineProps({
    post: Object
});




const formattedDate = computed(()=>{
    const date = new Date(postProps.post.created_at);
    const formattedDate = date.toLocaleDateString();
    return formattedDate;
})

</script>

<template>
  <div  class="relative group h-full">
    <div class="absolute w-full h-0 group-hover:h-full rounded-lg flex justify-center items-center z-20 overflow-hidden transition-all">
        <p class="text-lg font-semibold text-black"> Click to read more</p>
    </div>
    <div
      class="w-full h-full bg-slate-100 hover:ring transition-all group-hover:blur-sm rounded-md z-10 p-3 space-y-5"
    >
    
      <h3 class="text-2xl font-bold truncate ">{{ postProps.post.title }}</h3>

      <p class="truncate ">
       {{ postProps.post.body }}
      </p>
      <div class="w-full ">
        <p class="text-sky-500 text-md">{{ postProps.post.user.name }}</p>
        <p class="text-sm font-thin">Author</p>
      </div>
      <div class="w-full flex justify-end p-2">
        <p class="text-sm font-thin tracking-wide">{{ formattedDate}}</p>
      </div>

      
    </div>
  </div>
</template>
