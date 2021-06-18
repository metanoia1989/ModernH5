import http from './http'

/**
 * 上传图片
 * @param {String} tempFilePath 图片路径
 */
export const uploadImage = tempFilePath => {
  return wx.pro.uploadFile({
    url: baseURL + '/weapp/common/uploadali',
    filePath: tempFilePath,
    name: 'file',
    formData: {
      file: tempFilePath,
    },
    header: {
      'Content-Type': 'multipart/form-data',
      token: wx.getStorageSync('token'),
      ...headers,
    },
  })
}


/**
 * 统一支付方法
 * @param {'3' | '1'} payType - 支付方式：3：微信，1：余额
 * @param {Number} orderId - 订单id
 */
export const payMent = (payType, orderId) => {
  const tp = typeof payType
  if (tp !== 'string') {
    console.error('支付方式仅限字符串')
    payType = String(payType)
  }
  wx.showLoading({
    title: '支付中...',
  })
  if (payType === '1') {
    return http
      .post('/order/pay', {
        order_id: orderId,
        pay_type: payType,
      })
      .then(res => {
        wx.showToast({
          title: '支付成功',
          icon: 'none',
        })
        return Promise.resolve(res)
      })
      .catch(err => {
        wx.showToast({
          title: err.msg || '支付失败',
          icon: 'none',
        })
        return Promise.reject(err)
      })
  }
  if (payType === '3') {
    return http
      .post('/order/pay', {
        order_id: orderId,
        pay_type: payType,
      })
      .then(({ data }) => {
        const pay = JSON.parse(data.pay)
        return wx.pro
          .requestPayment({
            timeStamp: pay.timeStamp,
            nonceStr: pay.nonceStr,
            package: pay.package,
            signType: pay.signType,
            paySign: pay.paySign,
          })
          .then(() => {
            wx.pro.showToast({
              title: '支付成功',
              icon: 'none',
            })
          })
          .catch(err => {
            wx.pro.showToast({
              title: '支付失败',
              icon: 'none',
            })
            if (err.errMsg === 'requestPayment:fail cancel') {
              err.errMsg = '用户取消支付'
            }
            return Promise.reject(err)
          })
      })
  }
}

/**
 * 发送短信
 * @param {(String|Number)} mobile - 手机号
 * @param {'mobilelogin'} event - 事件
 */
export const sendSms = async (mobile, event) => {
  return http.get('/api/sms/send', {
    params: {
      mobile,
      event,
      from: 3,
    },
  })
}