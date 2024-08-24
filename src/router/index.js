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
  {
    path: '/dashboard',
    component: ()=>import('@/views/AdminPanelView.vue'),
    meta: {isAdmin: true},
    children: [
      {
        path: '',
        name: 'admin-dash',
        component: ()=>import('@/views/AdminDashView.vue'),
        meta: {isAdmin: true},
      },
      {
        path: 'Admin-Post',
        name: 'Admin-Post',
        component: ()=>import('@/views/AdminPostView.vue'),
        meta: {isAdmin: true},
      },
      {
        path: 'Admin-userList',
        name: 'Admin-userList',
        component: ()=>import('@/views/UserListView.vue'),
        meta: {isAdmin: true},
      },
      {
        path: 'Admin-activityLogs',
        name: 'Admin-activityLogs',
        component: ()=>import('@/views/ActivityLogsView.vue'),
        meta: {isAdmin: true},
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: "404Page",
    component: ()=>import('@/views/404View.vue'),
  }



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

  if(auth.user?.role?.permission !== '0755' && to.meta.isAdmin){
    return {name: '404Page'};
  }
})

export default router
