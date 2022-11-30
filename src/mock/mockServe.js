import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'
import trade from './trade.json'
Mock.mock('/mock/banner', {
  code: 200,
  data: banner
})

// 提供所有楼层数据的接口
Mock.mock('/mock/floor', {
  code: 200,
  data: floor
})
Mock.mock('/mock/trade', {
  code: 200,
  data: trade,
  message: '请求成功'
})
Mock.mock('/mock/order', {
  code: 200,
  data: 71,
  message: '提交成功',
  ok: true
})
Mock.mock('/mock/pay', {
  code: 200,
  message: '成功',
  data: {
    codeUrl: 'weixin://wxpay/bizpayurl?pr=P0aPBJK',
    orderId: 71,
    totalFee: 23996,
    resultCode: 'SUCCESS'
  },
  ok: true
})
Mock.mock('/mock/paying', {
  code: 205,
  message: '支付中',
  data: null,
  ok: true
})
Mock.mock('/mock/payed', {
  code: 200,
  message: '支付完成',
  data: null,
  ok: true
})
