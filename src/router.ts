import JwtStore from '@/stores/JwtStore';
import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/Login.vue';
import Sites from './components/Sites.vue';
import Users from './components/Users.vue';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        if (!JwtStore.jwtHeader || JwtStore.jwtHeader === '') {
          next();
          return;
        }
        next('/sites');
      },
    },
    {
      path: '/users/:siteId',
      name: 'users',
      component: Users,
      beforeEnter: (to, from, next) => {
        if (JwtStore.jwtHeader && JwtStore.jwtHeader !== '') {
          next();
          return;
        }
        next('/login');
      },
    },
    {
      path: '/sites',
      name: 'sites',
      component: Sites,
      beforeEnter: (to, from, next) => {
        if (JwtStore.jwtHeader && JwtStore.jwtHeader !== '') {
          next();
          return;
        }
        next('/login');
      },
    },
  ],
});
