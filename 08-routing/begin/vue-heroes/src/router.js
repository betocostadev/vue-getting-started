import Vue from 'vue';
import Router from 'vue-router';
import PageNotFound from './views/page-not-found.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/heroes',
    },
    {
      path: '/heroes',
      name: 'heroes',
      // component: Heroes,
      component: () =>
        import(/* webpackChunkName: "bundle-heroes" */ './views/heroes.vue'),
    },
    {
      path: '/heroes/:id',
      name: 'hero-detail',
      // component: HeroDetail,
      // Using lazy loading syntax for the component
      component: () =>
        import(/* webpackChunkName: "bundle-hero-detail" */ './views/hero-detail.vue'),

      // By just saying props: true, it works, but we get the problem that the prop will be a string instead of a number
      props: route => ({ id: parseInt(route.params.id) }),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "bundle-about" */ './views/about.vue'),
    },
    {
      path: '*',
      component: PageNotFound,
    },
  ],
});
