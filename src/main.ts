import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Storage from '@/plugins/Storage';
import './assets/main.scss';

createApp(App)
  .use(store)
  .use(Storage)
  .use(router)
  .mount('#app');
