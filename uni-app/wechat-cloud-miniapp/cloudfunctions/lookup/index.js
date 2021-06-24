// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: 'cloud-study-9gfse8a97faca715',
  regin: 'ap-shanghai',
})
const $ = db.command.aggregate
const _ = db.command

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
  /**
   * 将关联对象直接合并
   */
  mergeObject: async function () {
    return await db.collection('orders').aggregate()
      .lookup({
        from: 'books',
        localField: 'book',
        foreignField: 'title',
        as: 'bookList'
      })
      .replaceRoot({
        newRoot: $.mergeObjects([ $.arrayElemAt(['$bookList', 0]), '$$ROOT' ])
      })
      .project({
        bookList: 0,
      })
      .end()
  },
  /**
   * 连接 orders 和 books 集合，要求两个条件：
   * orders 的 book 字段与 books 的 title 字段相等
   * orders 的 quantity 字段大于或等于 books 的 stock 字段
   */
  connectMultipleField: async function () {
    db.collection('orders').aggregate() 
      .lookup({
        from: 'books',
        let: {
          order_book: '$book',
          order_quantity: '$quantity',
        },
        pipeline: $.pipeline()
          .match(_.expr($.and([
            $.eq(['$title', "$$order_book"]),
            $.gte(['$stock', '$$order_quantity'])
          ])))
          .project({
            _id: 0,
            title: 1,
            author: 1,
            stock: 1
          })
          .done(),
        as: 'bookList',
      })
  }
}


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  if (Object.hasOwnProperty.call(functions, event.action)) {
    return await functions[event.action]() 
  }
  
  return
}


