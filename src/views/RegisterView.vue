<script setup>
import {reactive, onMounted} from 'vue'
import {useAuthStore} from '@/stores/auth.js'
import { storeToRefs } from 'pinia';
const {register} = useAuthStore();
const {errorMessages} = storeToRefs(useAuthStore());



onMounted(()=>{
    errorMessages.value = null
})
const formData = reactive({
    name: null,
    email: null,
    password: null,
    password_confirmation: null
});

const handleSubmit = ()=>{
    register(formData)
};

</script>

<template>
    <section class="h-screen w-full flex justify-center items-center">
        <div class="w-full h-full flex flex-col justify-center items-end">

            <form @submit.prevent="handleSubmit" action="" class="grid grid-cols-1 place-items-start p-3 w-full sm:w-[70%]">
                <p v-if="errorMessages" class="text-red-500 text-nowrap my-2">{{ errorMessages }}</p>
                <h2 class="text-2xl font-semibold self-start mb-10 text-green-500">Register account</h2>
                <div class="flex flex-col mb-5 w-full">
                    <label for="" class="text-base font-semibold mb-5">Name</label>
                    <input type="text" class="px-2 py-1 drop-shadow-lg  w-full rounded-md" v-model="formData.name" required/>
                    <!-- <p>Validation</p> -->
                </div>
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
                <div class="flex flex-col mb-5 w-full">
                    <label for="" class="text-base font-semibold mb-5">Confirm Passoword</label>
                    <input type="password" class="px-2 py-1 drop-shadow-lg w-full rounded-md" v-model="formData.password_confirmation" autocomplete="new-password" required/>
                    <!-- <p>Validation</p> -->
                </div>
                <div class="text-sm flex justify-between w-full my-4">
                    <router-link class="text-green-500" :to="{name: 'login'}">Already have an account?</router-link>
                    <button
                    class="py-2 px-3 place-self-end bg-blue-500 drop-shadow-lg text-white rounded-md">Confirm</button>
                </div>
                
            </form>
        </div>
        <div class="w-full h-full hidden sm:grid grid-cols-1 place-items-center">
            <img src="https://cdn-icons-png.flaticon.com/512/4105/4105455.png" alt=""
                class="w-[60%] h-[60%] object-contain drop-shadow-xl">
        </div>
    </section>
</template>
