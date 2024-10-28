<template>
	<view class="persent_send_container">
		<view class="flex items-center gap-[20rpx]">
			<image class="w-[33.3rpx] h-[33.3rpx]" src="../../static/icon/xiaolian.svg" mode="widthFix"></image>
			<text class="text-[29rpx]">给朋友捎句话吧~</text>
		</view>

		<!-- 输入框 -->
		<view class="mt-[30rpx] bg-[#ffffff] rounded-[13.89rpx] p-[20rpx]">
			<textarea class="h-[200rpx] w-full" placeholder="送你一份礼物，祝你开心快乐每一天" />
		</view>

		<!-- desc -->
		<view class="mt-[20rpx]">
			<text class="text-[27rpx] text-[#FF2828]">不能超过20个汉字</text>
		</view>

		<!-- 赠送按钮 -->
		<view class="tce_theme_btn !rounded-[13.89rpx] text-[33rpx] mt-[50rpx] !py-[20rpx]">
			<text>赠送朋友</text>
		</view>
	</view>
</template>

<script setup>

</script>

<style scoped lang="scss">
.persent_send_container {
	height: calc(100vh - $nav-height);
	background-color: #f6f8fe;
	padding: 30rpx;
}
</style>
