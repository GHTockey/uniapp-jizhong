<template>
	<view class="default_tip_container">
		<image class="default_tip_image" src="../../static/images/kong2.svg" mode="widthFix" />
		<view class="default_tip_text">
			<text>{{ props.tipText }}</text>
		</view>
	</view>
</template>

<script setup>

const props = defineProps({
	tipText: {
		type: String,
		default: '暂无数据'
	}
})
</script>

<style lang="scss">
.default_tip_container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 200rpx;
	// justify-content: center;


	.default_tip_image {
		width: 330rpx;
	}

	.default_tip_text {
		margin-top: 20rpx;
		opacity: 0.9;
		font-size: 27.78rpx;
		font-weight: 500;
		text-align: center;
		color: #838383;
	}
}
</style>