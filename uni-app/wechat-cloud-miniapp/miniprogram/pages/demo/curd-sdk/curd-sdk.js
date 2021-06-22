// /E:/WorkSpace/ModernH5/uni-app/wechat-cloud-miniapp/miniprogram/pages/demo/curd-sdk/curd-sdk.js
const db = wx.cloud.database()	

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		todos: [],
		page: 5,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.fetchTodoList()
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},
	/**
	 * 获取 todo 列表
	 */
	fetchTodoList: function() {
		db.collection('todos').get().then(res => {
			let todos = res.data.map(item => {
				item.due = item.due.toString()	
				return item
			})	
			this.setData({ todos })	
		})
	},
	/**
	 * 插入数据
	 */	
	insertTodo() {
		db.collection('todos').add({
			data: {
				// _id: 'xxxxxxxxxxxxxxxxxxxxxx', 自定义 _id
				description: "学习云数据库",
				due: new Date('20210-06-22'),
				tags: ['cloud', 'database'],
				// 为待办事项添加一个地理我i之(113E 23N)
				location: new db.Geo.Point(113, 23),
				done: false,
				style: {
					color: "yellow",
				}
			}
		}).then(res => {
			console.log("创建记录成功：" + res._id)	
			this.fetchTodoList()
		})
	},
	deleteTodo(event) {
		let id = event.currentTarget.dataset.id
		if (!id) return 
		db.collection('todos').where({
			_id: id,
		}).remove().then(res => {
			console.log("删除记录成功啦" + id)
			this.fetchTodoList()
		})
	},
	selectTodo() {
		db.collection('todos').where({
			"style.color": "yellow"
		}).get().then(res => {
			if (res.data.length > 0) {
				wx.pro.showToast({ title: JSON.stringify(res.data), icon: "none" })
			} else {
				wx.pro.showToast({ title: "暂无数据", icon: "none" })
			}
		})
	},
	slideChange(event) {
		this.setData({
			page: event.detail.value
		})
	},
})