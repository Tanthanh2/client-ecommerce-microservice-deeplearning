
const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetail: ':nameId',
  cart: '/cart',

  // seller page
  order: '/seller/order',
  detailorder: '/seller/order/:id',
  
  productlist: '/seller/product/list',
  product: '/seller/product/:id',

  RegisterShop : '/seller-shop-register',

  pageShop:'/seller-shop/:id',

  pageFormPromotion:'/seller-promiton/:promotionId',
  pageListPromotion:'/seller-list-promotion',


  

  shipping: '/seller/product/shipping',
  revenue: '/seller/product/revenue',
  





} as const

export default path
