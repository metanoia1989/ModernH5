
// miniprogram/pages/demo/demo.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		items: [
			{ 
				title: "云开发能力",
				path: "/pages/demo/cloud-develop-ability/cloud-develop-ability"
			},
			{ 
				title: "增删改查SDK",
				path: "/pages/demo/curd-sdk/curd-sdk"
			}
		],
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
	 * 跳转子页面
	 */
	navigateTo: function (event) {
		let url = event.currentTarget.dataset.path
		wx.pro.navigateTo({ url }).then(res => {
			console.log(res)
		}).catch(error => {
			console.log('跳转出错了: ', error)
		})
	},
})