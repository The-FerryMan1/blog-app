<script setup>
import adminAside from '@/components/admin-aside.vue';
</script>


<template>
    <section class="grow w-full flex justify-center items-center overflow-hidden">
        <adminAside/>
        
        <div class="w-full h-full grid grid-cols-1 place-items-center overflow-y-auto">
            
            <router-view></router-view>
        </div>
    </section>
</template>