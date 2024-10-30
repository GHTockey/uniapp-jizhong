<template>
	<view class="shopping-car-default-container">
		<!-- 图片 -->
		<image class="shopping-car-default-image" :src="imageConfig[props.status]" mode="" />
		<!-- 文字 -->
		<view class="shopping-car-default-text">
			<text>{{ text[props.status] }}</text>
		</view>
		<!-- 按钮 -->
		<view class="shopping-car-default-button" :class="buttonConfig.btnStyle[props.status]"
			v-if="buttonConfig.btnText[props.status]" @click="handleClick">
			<text>{{ buttonConfig.btnText[props.status] }}</text>
		</view>
	</view>
</template>

<script setup>

// 接受参数控制显示状态:
// 404 抱歉，你访问的页面找不到了  返回首页 主题渐变色 [404]
// 管理员暂未发布内容，敬请期待		返回首页 主题渐变色 [unpublished]
// wifi 网络遇到问题，请检查后再试  重新加载 边框按钮 [network]
// 订单支付失败 [pay_fail]
// 当前用户该功能的操作权限 返回 边框按钮 [no_permission]
// 购物车内暂无商品，快去选购吧 [empty]

// 接受常量来控制显示状态
const props = defineProps({
	status: {
		type: String,
		required: true,
		default: '404'
	}
});

// console.log(props.status, buttonConfig.btnText['404']);

// 文字配置
const text = {
	'404': '抱歉，你访问的页面找不到了',
	unpublished: '管理员暂未发布内容，敬请期待',
	network: '网络遇到问题，请检查后再试',
	pay_fail: '订单支付失败',
	no_permission: '当前用户该功能的操作权限',
	empty: '购物车内暂无商品，快去选购吧'
}

// 按钮配置
const buttonConfig = {
	btnText: {
		404: '返回首页',
		unpublished: '返回首页',
		network: '重新加载',
		pay_fail: null,
		no_permission: '返回',
		empty: null
	},
	btnStyle: {
		404: 'shopping-car-default-button-gradient',
		unpublished: 'shopping-car-default-button-gradient',
		network: 'shopping-car-default-button-border',
		pay_fail: null,
		no_permission: 'shopping-car-default-button-border',
		empty: null
	}
}
// 图片配置
const imageConfig = {
	404: '../../static/default/404.svg',
	unpublished: '../../static/default/kong.svg',
	network: '../../static/default/wifi.svg',
	pay_fail: '../../static/default/pay_fail.svg',
	no_permission: '../../static/default/no_permission.svg',
	empty: '../../static/default/shoppingCart-empty.svg'
}

// 按钮点击事件
const handleClick = () => {
	// 判断btnText值
	if (buttonConfig.btnText[props.status] == '返回首页') {
		uni.navigateTo({
			url: '/pages/index/index'
		})
	} else if (buttonConfig.btnText[props.status] == '重新加载') {

	} else if (buttonConfig.btnText[props.status] == '返回') {
		uni.navigateBack()
	}
}
</script>

<style lang="scss">
.shopping-car-default-container {
	// border: 1px solid #000;
	display: flex;
	flex-direction: column;
	align-items: center;
	// justify-content: center;
	background-color: #f8fafb;
	height: calc(100vh - $uni-navigationBar-height);

	.shopping-car-default-image {
		margin-top: 208rpx;
		width: 234.03rpx;
		height: 208.33rpx;
	}

	.shopping-car-default-text {
		font-size: 27.78rpx;
		font-weight: 500;
		color: #b2b2b2;
		margin-top: 42rpx;
	}

	.shopping-car-default-button {
		width: 194.44rpx;
		height: 62.5rpx;
		border-radius: 31.25rpx;
		text-align: center;
		line-height: 62.5rpx;
		font-size: 29.17rpx;
		margin-top: 250rpx;
		// border: 1px solid #000;
		// // background-image: $uni-color-gradient-primary;
	}

	// 主题渐变色按钮
	.shopping-car-default-button-gradient {
		background-image: $uni-color-gradient-primary;
		color: #fff;
	}

	// 边框按钮
	.shopping-car-default-button-border {
		opacity: 0.9;
		border: 1.39rpx solid #333333;
		border-radius: 32.64rpx;
	}
}
</style>