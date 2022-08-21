import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../pages/Main';
import Basket from '../pages/Basket';
import Order from '../pages/Order';
import OrderInfoPage from '../pages/OrderInfo';
import PageNotFound from '../pages/PageNotFound';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import PublicOffer from '../pages/PublicOffer';

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
    path: '/order/:id',
    name: 'OrderInfoPage',
    component: OrderInfoPage
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: PrivacyPolicy
  },
  {
    path: '/public_offer',
    name: 'PublicOffer',
    component: PublicOffer
  },
  {
    name: '404',
    path: '/404',
    component: PageNotFound
  },
  {
    path: '*',
    redirect: '404'
  }
];

const router = new VueRouter({
  routes,
});

export default router;
