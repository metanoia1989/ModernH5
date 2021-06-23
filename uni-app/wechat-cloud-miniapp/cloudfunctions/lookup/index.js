// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'cloud-study-9gfse8a97faca715',
  regin: 'ap-shanghai',
})

var functions = {
  /**
   * 通过一个相等匹配条件连接 orders 和 books 集合，匹配的字段是 orders 集合的 book 字段和 books 集合的 title 字段 
   * @returns object
   */
	lookupQuery: async function () {
		return await db.collection('orders').aggregate()	
			.lookup({
				from: 'books',
				localField: 'book',
				foreignField: 'title',
				as: 'bookList',
			})
			.end()
	},

}


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if (Object.hasOwnProperty.call(functions, event.action)) {
    return await functions[event.action]() 
  }
  
  return
}


