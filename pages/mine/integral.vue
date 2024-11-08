<template>
	<view class="integral_container">
		<!-- header -->
		<view class="integral_header_box">

			<HeightBar appendNavBar />
			<NavBar showBack isWhite bgc="transparent">
				<template #title>
					<view class="text-white text-[32rpx] text-left w-full pl-[80rpx]">我的积分</view>
				</template>
			</NavBar>

			<!-- 内容容器 -->
			<view class="integral_header_content">
				<!-- 我的积分 -->
				<view class="flex flex-col">
					<text class="text-[45.83rpx] font-bold">100</text>
					<text class="text-[32rpx]">我的积分(个)</text>
				</view>
				<!-- 累计积分/消费/今日获得 -->
				<view class="flex justify-between z-10">
					<view class="flex flex-col">
						<text class="text-[31.5rpx]">100</text>
						<text class="text-[25rpx]">累计积分</text>
					</view>
					<view class="flex flex-col">
						<text class="text-[31.5rpx]">100</text>
						<text class="text-[25rpx]">累计消费</text>
					</view>
					<view class="flex flex-col">
						<text class="text-[31.5rpx]">100</text>
						<text class="text-[25rpx]">今日获得</text>
					</view>
				</view>
				<!-- 相对定位的图标 -->
				<image src="../../static/Integral_detail.svg" mode="widthFix"
					class="w-[175rpx] h-[182rpx] absolute top-[80rpx] right-[100rpx]"></image>
			</view>


			<!-- 积分明细/商城入口按钮 -->
			<view class="integral_detail_shop_btn">
				<view class="flex items-center gap-5" @click="toPage('/pages/mine/integral_detail')">
					<image src="../../static/Integral_detail.svg" mode="widthFix" class="w-[60rpx]"></image>
					<text class="">积分明细</text>
				</view>
				<view class="flex items-center gap-5">
					<image src="../../static/integral_shop.svg" mode="widthFix" class="w-[60rpx]"></image>
					<text class="">积分商城</text>
				</view>
			</view>

			<!-- 积分任务 -->
			<view class="integral_task_box">

			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { toPage } from '@/utils';


</script>

<style lang="scss" scoped>
.integral_container {
	min-height: 100vh;
	background-color: #f4f6fa;


	.integral_header_box {
		height: 536.81rpx;
		background: linear-gradient(180deg, #ff9100, #ff5903);

		.integral_header_content {
			width: 100%;
			height: 380rpx;
			padding: 20rpx 62.5rpx;
			// border: 1px solid red;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			color: #fff;
			position: relative;
		}
	}

	.integral_detail_shop_btn {
		width: calc(100% - 60rpx);
		margin: 0 30rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-around;
		height: 180.56rpx;
		border-radius: 16.67rpx;
	}

	.integral_task_box {
		width: calc(100% - 60rpx);
		margin: 0 30rpx;
		height: 379.86rpx;
		background: #ffffff;
		border-radius: 22.22rpx;
		margin-top: 30rpx;
	}
}
</style>