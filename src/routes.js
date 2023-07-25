/* eslint-disable */
import { lazy } from 'react';
import { USER_ROLE } from 'constants.js';
import { DEFAULT_PATHS } from 'config.js';

const dashboard = lazy(() => import('views/dashboard/Dashboard'));
const products = lazy(() => import('views/products/list/ProductsList'));
const orders = lazy(() => import('views/orders/list/OrdersList'));
const customers = lazy(() => import('views/customers/list/CustomersList'));
const customer = lazy(() => import('views/customers/detail/CustomersDetail'));
const detail = lazy(() => import('views/products/detail/ProductsDetail'));
const profileStandard = lazy(() => import('views/profile/ProfileStandard'));
const order = lazy(() => import('views/orders/detail/OrdersDetail'));
const discount = lazy(() => import('views/discount/Discount'));
const company = lazy(() => import('views/company/Company'));
const subscription = lazy(() => import('views/subscription/Upgrade'));
const productAdd = lazy(() => import('views/products/add/ProductAdd'));
const bonusPlans = lazy(() => import('views/bonus-plans/BonusPlans'));
const newsList = lazy(() => import('views/news/list'));
const newsAdd = lazy(() => import('views/news/add/index'))

// const storefront = {
//   home: lazy(() => import('views/storefront/home/Home')),
//   filters: lazy(() => import('views/storefront/filters/Filters')),
//   categories: lazy(() => import('views/storefront/categories/Categories')),
//   cart: lazy(() => import('views/storefront/cart/Cart')),
//   checkout: lazy(() => import('views/storefront/checkout/Checkout')),
//   invoice: lazy(() => import('views/storefront/invoice/Invoice')),
// };
// const shipping = lazy(() => import('views/shipping/Shipping'));

// const settings = {
//   home: lazy(() => import('views/settings/home/Home')),
//   general: lazy(() => import('views/settings/general/General')),
// };

const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const routesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      to: `${appRoot}/dashboard`,
    },
    {
      path: `${appRoot}/dashboard`,
      component: dashboard,
      label: 'menu.dashboard',
      icon: 'shop',
    },
    {
      path: `${appRoot}/products`,
      // exact: true,
      // redirect: true,
      // to: `${appRoot}/products`,
      label: 'menu.products',
      icon: 'cupcake',
      component: products,
    },
    {
      path: `${appRoot}/product/:id`,
      icon: 'cupcake',
      component: detail,
    },
    {
      path: `${appRoot}/product-add`,
      icon: 'cupcake',
      component: productAdd,
    },
    {
      path: `${appRoot}/profile`,
      // exact: true,
      // redirect: true,
      // to: `${appRoot}/products`,
      //label: 'menu.products',
      icon: 'cupcake',
      component: profileStandard,
      // subs: [
      //   { path: '/list', label: 'menu.list',  component: products.list},
      //   { path: '/detail', label: 'menu.detail', component: products.detail },
      // ],
    },
    {
      path: `${appRoot}/company`,
      icon: 'cupcake',
      component: company,
    },
    {
      path: `${appRoot}/subscription`,
      icon: 'cupcake',
      component: subscription,
    },
    {
      path: `${appRoot}/orders`,
      // exact: true,
      // redirect: true,
      // to: `${appRoot}/orders/list`,
      label: 'menu.orders',
      icon: 'cart',
      component: orders,
      // subs: [
      //   { path: '/list', label: 'menu.list', component: orders.list },
      //   { path: '/detail', label: 'menu.detail', component: orders.detail },
      // ],
    },
    {
      path: `${appRoot}/order/:id`,
      icon: 'cart',
      component: order,
    },
    {
      path: `${appRoot}/customers`,
      // exact: true,
      // redirect: true,
      // to: `${appRoot}/customers/list`,
      label: 'menu.customers',
      icon: 'user',
      component: customers,
      // subs: [
      //   { path: '/list', label: 'menu.list', component: customers.list },
      //   { path: '/detail', label: 'menu.detail', component: customers.detail },
      // ],
    },
    {
      path: `${appRoot}/customer/:id`,
      // exact: true,
      // redirect: true,
      // to: `${appRoot}/customers/list`,
      // label: 'menu.customer',
      // icon: 'user',
      component: customer,
      // subs: [
      //   { path: '/list', label: 'menu.list', component: customers.list },
      //   { path: '/detail', label: 'menu.detail', component: customers.detail },
      // ],
    },
    // {
    //   path: `${appRoot}/storefront`,
    //   exact: true,
    //   redirect: true,
    //   to: `${appRoot}/storefront/home`,
    //   label: 'menu.storefront',
    //   icon: 'screen',
    //   subs: [
    //     { path: '/home', label: 'menu.home', component: storefront.home },
    //     { path: '/filters', label: 'menu.filters', component: storefront.filters },
    //     { path: '/categories', label: 'menu.categories', component: storefront.categories },
    //     { path: '/detail', label: 'menu.detail', component: storefront.detail },
    //     { path: '/cart', label: 'menu.cart', component: storefront.cart },
    //     { path: '/checkout', label: 'menu.checkout', component: storefront.checkout },
    //     { path: '/invoice', label: 'menu.invoice', component: storefront.invoice },
    //   ],
    // },
    // {
    //   path: `${appRoot}/shipping`,
    //   component: shipping,
    //   label: 'menu.shipping',
    //   icon: 'shipping',
    // },
    {
      path: `${appRoot}/news`,
      component: newsList,
      label: 'menu.news',
      icon: 'news',
    },
    {
      path: `${appRoot}/news-add`,
      // icon: 'cupcake',
      component: newsAdd,
    },
    {
      path: `${appRoot}/bonus-plan`,
      component: bonusPlans,
      label: 'menu.bonus-plan',
      icon: 'tag',
    },
    // {
    //   path: `${appRoot}/settings`,
    //   component: settings.home,
    //   label: 'menu.settings',
    //   icon: 'gear',
    //   subs: [{ path: '/general', component: settings.general, hideInMenu: true }],
    // },
  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
