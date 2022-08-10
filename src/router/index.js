import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../pages/Main';
import Basket from '../pages/Basket';
import Order from '../pages/Order';
import OrderInfoPage from '../pages/OrderInfo';
import PageNotFound from '../pages/PageNotFound';

const ProductPage = () => import('@/pages/Product');

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
    props: { imageSrc: true }
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
    path: '/order/info/:id',
    name: 'OrderInfoPage',
    component: OrderInfoPage
  },
  {
    name: '404',
    path: '/404',
    component: PageNotFound
  }, {
    path: '*',
    redirect: '404'
  }
];

const router = new VueRouter({

  routes,
});

export default router;
