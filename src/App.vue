<script setup>
import BlogHeader from '@/components/blog-header.vue'

</script>

<template>
  
     <main class=" grow  overflow-hidden">
       <BlogHeader/>
       <div class="h-screen w-full overflow-y-auto">
         <router-view></router-view>
       </div>
    
  </main>
 
  
 

</template>
  

