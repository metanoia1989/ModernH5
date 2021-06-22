// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("函数参数", event)
  console.log("函数上下文", context)
  let { OPENID, APPID } =  cloud.getWXContext()
  return {
    OPENID,
    APPID,
    sum: event.a + event.b,
  }
}