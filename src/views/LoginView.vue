<script setup>
import { computed, reactive, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const {login} = useAuthStore()
const {errorMessages} = storeToRefs(useAuthStore())
const formData = reactive({
   email: null,
   password: null
})

onMounted(()=>{
    errorMessages.value = null
})
const incomplete = computed(()=>{
   return formData.email == null || formData.password == null? true:false
})


const handleSubmit = ()=>{
   
   if(incomplete.value) return;

   login(formData)
}
</script>

<template>
     <section class="h-screen w-full flex justify-center items-center">
         <div class="w-full h-full flex flex-col justify-center items-end">
           
            <form @submit.prevent="handleSubmit" action="" class="grid grid-cols-1 place-items-start w-[70%]">
                <p v-if="errorMessages" class="text-red-500 text-nowrap my-2">{{ errorMessages }}</p>
                <h2 class="text-2xl font-semibold self-start mb-10 text-blue-600">Welcome back!</h2>
                <div class="flex flex-col mb-5 w-full">
                    <label for="" class="text-base font-semibold mb-5">Email</label>
                    <input type="email" class="px-2 py-1 drop-shadow-lg w-full rounded-md" v-model="formData.email" autocomplete="email" required/>
                    <!-- <p>Validation</p> -->
                </div>
                <div class="flex flex-col mb-5 w-full">
                    <label for="" class="text-base font-semibold mb-5">Passwod</label>
                    <input type="password" class="px-2 py-1 drop-shadow-lg w-full rounded-md" v-model="formData.password" autocomplete="new-password" required/>
                    <!-- <p>Validation</p> -->
                </div>
                <div class="text-sm flex justify-between w-full my-4">
                    <p class="text-red-500">Forgot password?</p>
                    <router-link class="text-green-500" :to="{name: 'signUp'}">Create an account</router-link>
                </div>
                <button :disabled="incomplete"
                    class="my-5 py-2 px-3 place-self-end bg-blue-500 drop-shadow-lg text-white rounded-md disabled:bg-slate-400 active:ring">Login</button>
            </form>
        </div>
        <div class="w-full h-full grid grid-cols-1 place-items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/4105/4105459.png" alt=""
                class="w-[60%] h-[60%] object-contain drop-shadow-xl">
        </div>
     </section>
</template>
