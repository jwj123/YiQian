
/**
 * 配置路由
 * @module router
 */
import Router from 'vue-router';
import Vue from 'vue';
import FormList from '@/components/user/FormList.vue';
import User from '@/components/user/User.vue';
import NewForm from '@/components/edit/NewForm.vue';
import UserInfo from '@/components/user/UserInfo.vue';
import Login from '@/components/user/Login.vue';
import Register from '@/components/user/Register.vue';
import Chart from '@/components/edit/Chart.vue';
import EditForm from '@/components/edit/edit-form/Index.vue';
import View from '@/components/public/View.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/form', name: 'index', component: FormList, alias: '/' },
    { path: '/form/new', name: 'new', component: NewForm },
    { path: '/form/chart/:id', name: 'chart', component: Chart },
    { path: '/form/edit/:id', name: 'edit', component: EditForm },
    { path: '/user', name: 'user', component: User },
    { path: '/user/info', name: 'userinfo', component: UserInfo },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/public/:id', name: 'public', component: View },
    { path: '*', component: FormList },
  ],
});
