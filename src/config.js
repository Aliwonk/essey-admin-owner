import { LAYOUT, MENU_BEHAVIOUR, NAV_COLOR, MENU_PLACEMENT, RADIUS, THEME_COLOR, USER_ROLE } from 'constants.js';

export const IS_DEMO = false;
export const IS_AUTH_GUARD_ACTIVE = true;
export const SERVICE_URL = '/app';
export const USE_MULTI_LANGUAGE = true;
export const DEFAUTL_BACKEND_URL = 'https://essey-api.site';

// For detailed information: https://github.com/nfl/react-helmet#reference-guide
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
};

export const MAPBOX = {
  TOKEN: 'pk.eyJ1IjoiYWxpd29uayIsImEiOiJjbGJuemp4MHUwdnluM29sOTB4NDRveDc4In0.ca9oT1Xiheo19LUqkHK8lA',
  STYLE: 'mapbox://styles/aliwonk/clbpdn452000014oilhmvewcu',
};

export const REDUX_PERSIST_KEY = 'ecommerce-platform';