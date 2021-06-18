// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  console.log(context)
  let { OPENID, APPID } = context
  return {
    OPENID,
    APPID,
    sum: event.a + event.b,
  }
}