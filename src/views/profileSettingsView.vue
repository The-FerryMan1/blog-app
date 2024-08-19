<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { reactive , onMounted} from 'vue';

const {user, errorMessages} = storeToRefs(useAuthStore());
const {changeDetails,changePassword } = useAuthStore();

const formDataDetails = reactive({
    name: null,
    email: null
});
onMounted(()=>{
    errorMessages.value = null
})
const formDataPassword = reactive({
    old_password: null,
    new_password: null,
    new_password_confirmation: null
});



const handleSubmitDetails = async ()=>{

    const {name, email} = formDataDetails;

    if(!name && !email){
        return
    }
    let payload = {};
   
    if(name) payload.name = name;
    if(email) payload.email = email;

    user.value = await changeDetails(payload)
}
const handleSubmitChangePassword =async ()=>{

    const {old_password,new_password,new_password_confirmation}=formDataPassword;

    if(!old_password && !new_password && !new_password_confirmation){
        return
    }

    await changePassword(formDataPassword);


    formDataPassword.old_password = null;
    formDataPassword.new_password = null;
    formDataPassword.new_password_confirmation = null;
    

}
</script>


<template>
    <section class="h-screen w-full flex justify-center items-center">
        <div class="w-full h-full flex flex-col justify-start items-center">
           <h1 class="p-2 text-lg font-semibold text-red-500">{{ errorMessages }}</h1>
            <div class="w-[40%] bg-white drop-shadow-lg p-3">
                <form @submit.prevent="handleSubmitDetails" action="" class="grid grid-cols-1 place-items-start *:grid *:grid-cols-1 w-full "    >
                    <h2 class="mb-5 text-lg font-semibold">Changes Details</h2>
                    <div class="w-full">
                        <label for="">Name</label>
                        <input v-model="formDataDetails.name" type="text" class="bg-slate-300 py-2 px-3 placeholder:text-black" :placeholder="user?.name" />
                    </div>
                    <div class="w-full">
                        <label for="">Email</label>
                        <input v-model="formDataDetails.email" type="email" class="bg-slate-300 py-2 px-3 placeholder:text-black" :placeholder="user?.email" />
                    </div>
                    <button class="py-2 px-3 text-white bg-blue-500 hover:opacity-40 rounded-md my-3">Save</button>
                </form>


                <form @submit.prevent="handleSubmitChangePassword" class="grid grid-cols-1 place-items-start *:grid *:grid-cols-1 my-10 w-full" >
                    <h2 class="mb-5 text-lg  font-semibold">Change password</h2>
                    <div class="w-full" style="display:none;">
                        <label for="username">Username</label>
                        <input type="text" id="username" name="username" autocomplete="username">
                    </div>
                    <div class="w-full">
                        <label for="">Old password</label>
                        <input v-model="formDataPassword.old_password" type="password" class="bg-slate-300 py-2 px-3" autocomplete="current-password"/>
                    </div>
                    <div class="w-full">
                        <label for="">New password</label>
                        <input v-model="formDataPassword.new_password" type="password" class="bg-slate-300 py-2 px-3" autocomplete="new-password"/>
                    </div>
                    <div class="w-full">
                        <label for="">Confirm new password</label>
                        <input v-model="formDataPassword.new_password_confirmation" type="password" class="bg-slate-300 py-2 px-3" autocomplete="new-password"/>
                    </div>
                     <button class="py-2 px-3 text-white bg-blue-500 hover:opacity-40 rounded-md my-3">Save</button>
                </form>
            </div>
        </div>  
    </section>
</template>