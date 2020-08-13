<template>
	<view class="container">
		<view class="intro">本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>
		<text class="intro">详见：</text>
		<uni-link :href="href" :text="href"></uni-link>
		<uni-list>
			<uni-list-item title="项目1" note="" @click="showToast"></uni-list-item>
			<uni-list-item title="项目2" note=""></uni-list-item>
		</uni-list>
		<view v-for="(item,index) in [1, 2, 3, 4]" :key="index">
			{{item}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			showToast () {
				uni.showToast({
					title: '金刚葫芦娃',
					mask: false,
					duration: 1500,
				});
			},
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
