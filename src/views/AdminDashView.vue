<script setup>
import { defineAsyncComponent } from 'vue';
const areaLine = defineAsyncComponent(()=>import('@/components/area-admin.vue'))
const bar = defineAsyncComponent(()=>import('@/components/bargraph-admin.vue'))
const pie = defineAsyncComponent(()=>import('@/components/pie-admin.vue'))
const dont = defineAsyncComponent(()=>import('@/components/donut-admin.vue'))

</script>



<template>
    <div class="w-full h-full grid grid-cols-6  grid-flow-row auto-cols-max place-items-start gap-2 p-2">
        <section class="col-span-3 p-2 w-full rounded-md bg-white drop-shadow-2xl">
            <bar/>
        </section>
        <section class="col-span-3 p-2 w-full rounded-md bg-white drop-shadow-2xl">
            <areaLine/>
        </section>
        <section class="col-span-3 w-full  p-2 rounded-md bg-white drop-shadow-2xl">
            <pie />
        </section>
        <section class="col-span-3 w-full  p-2 rounded-md bg-white drop-shadow-2xl">
            <dont />
        </section>
        
    </div>
    
</template>