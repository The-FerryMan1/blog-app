import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('@/views/LoginView.vue'),
    meta: {isGuest: true}
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: ()=>import('@/views/RegisterView.vue'),
    meta: {isGuest: true}
  },
  {
    path: '/createPost',
    name: 'createPost',
    component: ()=>import('@/views/CreatePost.vue'),
    meta: {reqAuth: true}
  },
  {
    path: '/post/:id',
    name: 'post',
    component: ()=>import('@/views/PostView.vue'),
  },
  {
    path: '/post/edit/:id',
    name: 'postEdit',
    component: ()=>import('@/views/postEditView.vue'),
    meta: {reqAuth: true}
  },
  {
    path: '/profile/settings',
    name: 'profile',
    component: ()=> import('@/views/profileSettingsView.vue'),
    meta: {reqAuth: true}
  },



]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async(to, from)=>{
  const auth = useAuthStore();
  await auth.getMemoUser();

  if(auth.user && to.meta.isGuest){
    return {name: 'home'};
  }

  if(!auth.user && to.meta.reqAuth){
     return {name: 'login'};
  }
})

export default router
