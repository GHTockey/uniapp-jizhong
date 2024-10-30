<template>
	<view class="default_tip_container">
		<image class="default_tip_image" :src="`/static/images/${props.image}`" mode="widthFix" />
		<view class="default_tip_text">
			<text>{{ props.text }}</text>
		</view>
		<!-- 按钮 -->
		<view class="default_tip_btn" @click="emit('btnClick')" v-show="props.btnText">
			<text>{{ props.btnText }}</text>
		</view>
	</view>
</template>

<script setup>

const props = defineProps({
	text: {
		type: String,
		default: '暂无数据'
	},
	btnText: {
		type: String
	},
	image: {
		type: String,
		default: 'kong2.svg'
	}
})
const emit = defineEmits(['btnClick'])
</script>

<style lang="scss">
.default_tip_container {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 200rpx;
	// border: 1px solid red;
	// justify-content: center;


	.default_tip_image {
		width: 280rpx;
	}

	.default_tip_text {
		margin-top: 20rpx;
		opacity: 0.9;
		font-size: 27.78rpx;
		font-weight: 500;
		text-align: center;
		color: #838383;
	}

	.default_tip_btn {
		margin-top: 80rpx;
		border-radius: 31.25rpx;
		padding: 10rpx 30rpx;
		color: #FFFFFF;
		font-size: 29.17rpx;
		background-image: $uni-color-gradient-primary;
	}
}
</style>