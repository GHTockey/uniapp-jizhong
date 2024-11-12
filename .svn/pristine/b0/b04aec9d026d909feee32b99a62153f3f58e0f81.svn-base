<template>
	<view class="present_activate_res_container">
		<!-- 标题栏 -->
		<NavBar showBack>
			<template #title>卡片激活</template>
		</NavBar>

		<!-- 结果 -->
		<view class="flex flex-col items-center justify-center gap-[30rpx]" style="height: 328rpx;">
			<image class="w-[83rpx] h-[83rpx]" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/topUpOk.svg" />
			<text class="text-[#000000] text-[37.5rpx] font-bold">激活成功</text>
		</view>

		<view class=" p-[30rpx] bg-white rounded-[14rpx]">
			<!-- 图片 -->
			<image class="w-full rounded-md" src="https://saas.jizhongkeji.com/static/jzkj/static/images/present_item.png" mode="widthFix"></image>
			<!-- 文字 -->
			<view class="flex flex-col gap-[10rpx] mt-[20rpx]">
				<text class="text-[29rpx] line-clamp-1">{{ currentItem.title }}</text>
				<text class="text-[22rpx] text-[#696969]">有效期：{{ currentItem.time }}</text>
			</view>
			<!-- 按钮 -->
			<view class="flex justify-between mt-[25rpx]">
				<view class="tce_empty_btn text-[24rpx]">{{ currentItem.card_text }}</view>
				<view class="flex items-center">
					<text class=" text-[#FF0000] text-[28rpx]">储值金额：￥500</text>
				</view>
			</view>
		</view>

		<!-- 底部使用按钮 -->
		<view class="fixed bottom-0 left-0 right-0 p-[30rpx]">
			<view class="tce_theme_btn text-[33rpx] !rounded-[14rpx] !py-[20rpx]" @click="handleUse">立即使用</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const currentItem = ref({
	img: 'https://saas.jizhongkeji.com/static/jzkj/static/images/present_item.png',
	card_text: '储值卡',
	title: '2025新春礼品卡2025新春礼品卡2025新春礼2025新春礼品卡2025新春礼品卡2025新春礼',
	time: '2024-08-09 14:56:45 至 2024-08-09 14:56:45'
})



// 立即使用
const handleUse = () => {
	console.log('立即使用');
	uni.showModal({
		title: '确定要使用该储值卡吗?',
		success: function (res) {
			if (res.confirm) {
				// console.log('用户点击确定');
				uni.showToast({
					title: '使用成功',
					icon: 'success',
					duration: 1500
				});
				setTimeout(() => {
					uni.navigateBack();
				}, 1500);
			} else if (res.cancel) {
				console.log('用户点击取消');
			}
		}
	});
}
</script>

<style scoped lang="scss">
.present_activate_res_container {
	height: 100vh;
	background-color: #f6f8fe;
	background-image: url(https://saas.jizhongkeji.com/static/jzkj/present-activate-bg.svg);
	background-size: 100%;
	background-repeat: no-repeat;
	padding: 0 30rpx;
	padding-top: $nav-height;
}
</style>
