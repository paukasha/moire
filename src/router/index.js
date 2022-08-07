import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../pages/MainPage';
import Basket from '../pages/Basket';
const ProductPage = () => import('@/pages/ProductPage')

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/product/:id',
    name: 'ProductPage',
    component: ProductPage,
    props: {imageSrc: true}
  },
  {
    path: '/basket',
    name: 'Basket',
    component: Basket,
  },
];

const router = new VueRouter({
  // history: VueRouter.createWebHashHistory(),
  routes,
});

export default router;
