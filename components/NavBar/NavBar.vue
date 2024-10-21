<template>
	<view class="nav-bar-container">
		<!-- 返回按钮 -->
		<view class="nav-bar-back" v-if="showBack" @click="goBack">
			<image src="../../static/icon/left-black-icon.svg" style="width: 50rpx; height: 50rpx;" />
		</view>
		<!-- 标题 -->
		<view class="nav-bar-title">{{ title }}</view>
	</view>
</template>

<script setup>

const props = defineProps({
	title: {
		type: String,
		default: '标题'
	},
	showBack: {
		type: Boolean,
		default: false
	}
})

// 返回
const goBack = () => {
	uni.navigateBack();
}


</script>

<style scoped lang="scss">
.nav-bar-container {
	width: 100%;
	height: $nav-height;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 20rpx;

	.nav-bar-back {
		position: absolute;
		left: 20rpx;
		width: 49.31rpx;
		height: 49.31rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-bar-title {
		font-size: 33.33rpx;
		font-weight: 700;
		text-align: center;
	}
}
</style>
