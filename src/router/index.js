import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../pages/Main';
import Basket from '../pages/Basket';
import Order from '../pages/Order';
import OrderInfoPage from '../pages/OrderInfo';
const ProductPage = () => import('@/pages/Product')

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
  {
    path: '/order',
    name: 'Order',
    component: Order,
  },
  {
    path: '/order/info',
    name: 'OrderInfoPage',
    component: OrderInfoPage
  }

];

const router = new VueRouter({
  // history: VueRouter.createWebHashHistory(),
  routes,
});

export default router;
