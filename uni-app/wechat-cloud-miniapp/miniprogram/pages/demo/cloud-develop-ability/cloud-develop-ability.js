// miniprogram/pages/demo/cloud-develop-ability/cloud-develop-ability.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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
	 * 云存储上传文件
	 */
	uploadFile: function () {
		// 让用户选择一张图片
		wx.pro.chooseImage().then(res => {
			// 将图片上传至云存储空间
			wx.cloud.uploadFile({
				// 指定上传到的云路径
				cloudPath: 'my-photo.png',
				// 指定要上传的文件的小程序临时文件路径
				filePath: res.tempFilePaths[0],
			}).then(res => {
				console.log('上传成功', res)
			})
		})
	},
	/**
	 * 获取数据库数据
	 */	
	fetchData: function () {
		// 1. 获取数据库引用
		const db = wx.cloud.database()
		// 2. 构造查询语句
		// collection 方法获取一个集合的引用
		// where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
		// get 方法会触发网络请求，往数据库取数据
		db.collection('books').where({
		  publishInfo: {
			country: 'United States'
		  }
		}).get().then(res => {
		  console.log(res)
		})
	},
	/**
	 * 调用云函数
	 */
	callAdd: function () {
		wx.cloud.callFunction({
			name: 'sum',  // 云函数函数名
			data: { a: 12, b: 19 }, // 传递参数
		}).then(result => {
			console.log("add调用结果为：", result)
		})
	},	

})