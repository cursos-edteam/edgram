import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const beforeEnter = (_to: any, _from: any, next: any) => {
  const isAutenticated = window.localStorage.getItem(`${process.env.VUE_APP_SITENAME}_refreshToken`);
  console.log(isAutenticated);
  if (isAutenticated) next();
  else next({ name: 'Login' });
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    beforeEnter,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../components/Login/index.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    beforeEnter,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
