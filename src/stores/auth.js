import { defineStore } from "pinia";
import { ref } from "vue";
import { useAxios } from "../../axios";
import { useRouter } from "vue-router";
export const useAuthStore = defineStore('auth', ()=>{


    const router = useRouter();

    const user = ref(null);
    const errorMessages = ref(null);
    const successMessage = ref(null);

    


    const getUser = async()=>{
      let result;
      try {
        const res = await useAxios.get('user', {
           headers:{
            'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
          }
        });
        result = res.data;
        
      } catch (error) {
        errorMessages.value = error.response.data.message;
      }
      return result;
    }

    const memoGetUser = () => {
      let cachedUser = null;
      
      return async()=>{
        if (cachedUser) {
            console.log('fetching from cache');
            return cachedUser;
        }

        try {
           cachedUser =  await getUser()
           user.value = cachedUser
        } catch (error) {
          console.log(error)
        }
      }
    }

    const getMemoUser = memoGetUser();

    const register = async(formData)=>{
          if(!formData) return;
        try{
          const res =  await useAxios.post('register', formData);
          
          user.value = res.data.user
          localStorage.setItem('TOKEN', res.data.plainTextToken);
          router.push({name: 'home'})
        }
        catch(error){
          errorMessages.value = error.response.data.message;
        }
        
      
    }

    const login = async(formdData)=>{
      try {
        const res = await useAxios.post('login', formdData);
        
        user.value = res.data.user;
        localStorage.setItem('TOKEN', res.data.plainTextToken);
        router.push({name: 'home'})
      } catch (error) {
        errorMessages.value = error.response.data.message;
      }
      
    }

    const changeDetails = async(formData)=>{
      let userTemp = null;
        try {
           const res =  await useAxios.put('user', formData, {
               headers:{
                     'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
                }
            });
             userTemp = res.data.user
              successMessage.value = res.data.message
             router.push({name: 'profile'});
        } catch (error) {
          console.log(error);
        }

        return userTemp;
    }
    const changePassword = async(formData)=>{
      try {
        await useAxios.put('user/password', formData, {
           headers:{
                     'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
                }
        })

        alert('password updated')
        router.push({name: 'profile'});
      } catch (error) {
        errorMessages.value = error.response.data.message;
      }
    }

    const logout = async()=>{
      try {
        await useAxios.post('logout',null, {
          headers:{
            'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
          }
        });
       
        user.value = null;
        localStorage.removeItem('TOKEN');
        router.push({name: 'login'});
        errorMessages.value = null;
      } catch (error) {
          errorMessages.value = error.response.data.errors;
      }
    }

    return {register, user, login, errorMessages, logout, changeDetails, changePassword, getMemoUser, successMessage};
});

