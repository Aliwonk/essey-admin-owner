import { LAYOUT, MENU_BEHAVIOUR, NAV_COLOR, MENU_PLACEMENT, RADIUS, THEME_COLOR, USER_ROLE } from 'constants.js';

export const IS_DEMO = false;
export const IS_AUTH_GUARD_ACTIVE = true;
export const SERVICE_URL = '/app';
export const USE_MULTI_LANGUAGE = true;
export const DEFAUTL_BACKEND_URL = 'https://essey-api.site';
export const DEFAUTL_WS_URL = 'https://essey-api.site';
// https://essey-api.site
// 'https://essey-api.site'
export const REACT_HELMET_PROPS = {
  defaultTitle: 'ESSEY APP',
  titleTemplate: '%s | ESSEY APP',
};

export const DEFAULT_PATHS = {
  APP: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  REGISTER_COMPANY: '/register-company',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  USER_WELCOME: '/dashboards/default',
  NOTFOUND: '/page-not-found',
  UNAUTHORIZED: '/unauthorized',
  EMAIL_CONFIRM: '/email-confirm',
};

export const DEFAULT_SETTINGS = {
  MENU_PLACEMENT: MENU_PLACEMENT.Vertical,
  MENU_BEHAVIOUR: MENU_BEHAVIOUR.Unpinned,
  LAYOUT: LAYOUT.Boxed,
  RADIUS: RADIUS.Rounded,
  COLOR: THEME_COLOR.LightBlue,
  NAV_COLOR: NAV_COLOR.Default,
  USE_SIDEBAR: false,
};

export const DEFAUTL_BACKEND_API = {
  OWNER_PROFILE: `${DEFAUTL_BACKEND_URL}/owner/profile`,
  OWNER_LOGIN: `${DEFAUTL_BACKEND_URL}/auth/owner/login`,
  OWNER_REGISTER: `${DEFAUTL_BACKEND_URL}/auth/owner/registration`,
  EMAIL_CONFIRM: `${DEFAUTL_BACKEND_URL}/auth/owner/confirmation`,
  RESET_PASSWORD: `${DEFAUTL_BACKEND_URL}/auth/owner/reset`,
  CREATE_NEW_PASSWORD: `${DEFAUTL_BACKEND_URL}/auth/owner/reset`,
  CREATE_COMPANY: `${DEFAUTL_BACKEND_URL}/auth/shop/registration`,
  COMPANY: {
    GET_INF: `${DEFAUTL_BACKEND_URL}/shop`,
    UPDATE: `${DEFAUTL_BACKEND_URL}/shop/update`,
    GET_CLIENTS: `${DEFAUTL_BACKEND_URL}/shop/clients`,
    UPDATE_ACTIVE: `${DEFAUTL_BACKEND_URL}/shop/active`,
    UPDATE_ACTIVE_PLANS: `${DEFAUTL_BACKEND_URL}/shop/active-plans`,
  },
  ORDERS: {
    GET_ONE: `${DEFAUTL_BACKEND_URL}/orders/one`,
    GET_LIST: `${DEFAUTL_BACKEND_URL}/orders/shop`,
    UPDATE: `${DEFAUTL_BACKEND_URL}/orders/update`,
    GET_USER_ORDER_SHOP: `${DEFAUTL_BACKEND_URL}/orders/user-shop`,
  },
  PRODUCT: {
    CREATE: `${DEFAUTL_BACKEND_URL}/goods/create`,
    GET_LIST: `${DEFAUTL_BACKEND_URL}/goods/all`,
    GET_ONE: `${DEFAUTL_BACKEND_URL}/goods`,
    UPDATE: `${DEFAUTL_BACKEND_URL}/goods/update`,
    DELETE: `${DEFAUTL_BACKEND_URL}/goods/delete`,
  },
  CUSTOMERS: {
    GET_INF_CUSTOMER: `${DEFAUTL_BACKEND_URL}/shop/client/profile`,
    GET_ORDERS_CUSTOMER: `${DEFAUTL_BACKEND_URL}/orders/user`,
  },
  BONUS_PLAN: {
    CREATE: `${DEFAUTL_BACKEND_URL}/shop/plans-cashback/create`,
    GET_LIST: `${DEFAUTL_BACKEND_URL}/shop/plans-cashback/all`,
    UPDATE: `${DEFAUTL_BACKEND_URL}/shop/plans-cashback/update`,
    ACCRUE_ONE: `${DEFAUTL_BACKEND_URL}/shop/cashback/accrue/one`,
    WRITE_OFF_ONE: `${DEFAUTL_BACKEND_URL}/shop/cashback/write-off`,
  },
  NEWS: {
    CREATE: `${DEFAUTL_BACKEND_URL}/shop/news/create`,
    GET_ONE: `${DEFAUTL_BACKEND_URL}/shop/news/one`,
    GET_LIST: `${DEFAUTL_BACKEND_URL}/shop/news`,
  },
};

export const MAPBOX = {
  TOKEN: 'SECRET',
  STYLE: 'SECRET',
};

export const DADATA = {
  URLS: {
    GET_ADDRESS_BY_COORDS: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address',
    GET_ADDRESS: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
  },
  KEYS: {
    TOKEN: '244877602a2b7d6e0033ac937aae68e227c1d8fb',
    SECRET: '4ea41eb64056ff319d3c737c98957ef2480d6c70',
  },
};

export const REDUX_PERSIST_KEY = 'ecommerce-platform';
