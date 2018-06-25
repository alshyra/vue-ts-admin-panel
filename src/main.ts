import axios from 'axios';
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = process.env.NODE_ENV === 'production';
Vue.prototype.$http = axios;

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (err) => {
    if (err.response.status === 401) {
      router.push('login');
      return Promise.reject(err);
    }
  },
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
