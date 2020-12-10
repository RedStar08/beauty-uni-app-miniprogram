<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello this is a demo page.'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.logo {
			height: 200rpx;
			width: 200rpx;
			margin: 200rpx auto 50rpx auto;
		}
		.title {
			font-size: 36rpx;
			color:$uni-text-color;
		}
	}

	.text-area {
		display: flex;
		justify-content: center;
	}
	
</style>
