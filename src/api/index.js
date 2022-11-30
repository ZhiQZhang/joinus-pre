import mockAjax from './mockAjax'
import requests from './request'
export const reqCategory = () => {
  return requests.get('/product/getBaseCategoryList')
}
export const reqBanner = () => {
  return mockAjax.get('/banner')
}
export const reqFloor = () => {
  return mockAjax.get('/floor')
}
export const reqGetSearchInfo = (params) => {
  return requests({
    url: '/list',
    method: 'POST',
    data: params
  })
}
export const reqGetdetailInfo = (skuId) => {
  return requests({
    url: `/item/${skuId}`,
    method: 'GET'
  })
}
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'POST'
  })
}
export const reqCartList = () => {
  return requests({
    url: '/cart/cartList',
    method: 'GET'
  })
}
export const reqUpdateChecked = (skuId, isChecked) => {
  return requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'GET'
  })
}
export const reqDelgood = (skuId) => {
  return requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'DELETE'
  })
}
export const reqCode = (phone) => {
  return requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'GET'
  })
}
export const reqUserRegister = (data) => {
  return requests({
    url: '/user/passport/register',
    data,
    method: 'POST'
  })
}
export const reqUserLogin = (userInfo) => {
  return requests({
    url: '/user/passport/login',
    data: userInfo,
    method: 'POST'
  })
}
export const reqGetUserInfo = () => {
  return requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'GET'
  })
}
export const reqLogout = () => {
  return requests({
    url: '/user/passport/logout',
    method: 'GET'
  })
}
export const reqTradeInfo = () => {
  return mockAjax({
    url: '/trade',
    method: 'GET'
  })
}
export const reqOrderInfo = () => {
  return requests({
    url: '/order/auth/trade',
    method: 'GET'
  })
}
export const reqSubmitOrder = (tradeNo, data) => {
  return mockAjax({
    url: '/order',
    data: data,
    method: 'POST'
  })
}
export const reqPayinfo = (orderId) => {
  return mockAjax({
    url: 'pay',
    method: 'GET'
  })
}
export const reqPaying = () => {
  return mockAjax({
    url: 'paying',
    method: 'GET'
  })
}
export const reqPayed = () => {
  return mockAjax({
    url: 'payed',
    method: 'GET'
  })
}
