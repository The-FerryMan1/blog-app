import { defineStore } from "pinia";
import { ref } from "vue";
import { useAxios } from "../../axios";
import { useRouter } from "vue-router";
export const usePostStore = defineStore('post', ()=>{
    const router = useRouter();
    const errorPostMessages = ref(null)


    const userGetPost = async()=>{
        let post = null;
        try {
          const res =  await useAxios.get('post');
          post = res.data;
        } catch (error) {
            console.log(error)
        }

        return post;
    }

    const userGetPostOne = async(id)=>{
        let post = null;
        try {
          const res =  await useAxios.get(`post/${id}`);
          post = res.data;
        } catch (error) {
            console.log(error)
        }

        return post;
    }

    const userPost = async(formData)=>{

        try {
            await useAxios.post('post', formData, {
                headers:{
                     'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
                }
            })
            router.push({name: 'home'});
        } catch (error) {
            console.log(error)
        }
        
    }
    
    const userEditPost = async(formData, id)=>{
         try {
            await useAxios.put(`post/${id}`, formData, {
                headers:{
                     'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
                }
            });
            router.push({name: 'post', params:{id: id}});
        } catch (error) {
            console.log(error)
        }
    }

    const userDeletePost = async(id) =>{
         try {
            await useAxios.delete(`post/${id}`, {
                headers:{
                     'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
                }
            });
            router.push({name: 'home'});
        } catch (error) {
            console.log(error)
        }
    }


    return {errorPostMessages,userPost, userGetPost, userGetPostOne,userEditPost,userDeletePost};
})