// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'cloud-study-9gfse8a97faca715',
  regin: 'ap-shanghai',
})
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { page = 1, perSize = 1 } = event
  const skip = (page - 1) * perSize

  // 集合记录总数
  const countResult = await db.collection('todos').count()
  const total = countResult.total
  
  let result = await db.collection('todos').skip(skip).limit(perSize).get()

  return {
    total, 
    data: result.data
  }
}