<script setup>
import BlogHeader from '@/components/blog-header.vue'

</script>

<template>
    
     <main class="h-screen w-full flex flex-col overflow-hidden">
           <BlogHeader/>
       
         
         <router-view></router-view>
      
    
  </main>
 
  
 

</template>
  

