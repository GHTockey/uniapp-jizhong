<template>
	<view class="mine_container p-[20rpx]">
		<!-- 状态栏 + 小程序胶囊栏高度占位 -->
		<view class="status_bar" :style="{ height: `${titleBarHeight}px` }"></view>

		<!-- 头像昵称设置 -->
		<view class=" flex justify-between text-white my-3">
			<!-- left -->
			<view class="flex">
				<image class="w-[120rpx] h-[120rpx] rounded-[50%] mr-[20rpx]" src="../../static/images/avatar.png"
					mode="aspectFill"></image>
				<view class="flex flex-col justify-center">
					<text class="text-[30rpx] mb-2">昵称</text>
					<text class=" text-[25rpx] bg-black/30 px-[20rpx] py-[3rpx] rounded-[50rpx] opacity-65">ID:
						1234567890</text>
				</view>
			</view>
			<!-- right -->
			<view class="flex items-center opacity-55">
				<text class="mr-[10rpx]">设置</text>
				<image class="w-[33.33rpx] h-[33.33rpx]" src="../../static/icon/setting.svg" mode="widthFix"></image>
			</view>
		</view>

		<!-- 个人数据积分/余额/优惠券 -->
		<view class="mine_data_box flex justify-evenly" @click="toPage('/pages/mine/money')">
			<view class="mine_data_item">
				<text class="mine_data_value">1000</text>
				<text class="mine_data_name">我的积分</text>
			</view>
			<view class="mine_data_item">
				<text class="mine_data_value">1000</text>
				<text class="mine_data_name">我的余额</text>
			</view>
			<view class="mine_data_item">
				<text class="mine_data_value">1000</text>
				<text class="mine_data_name">优惠券</text>
			</view>
		</view>

		<!-- 我的订单 -->
		<view class="my_order_box">
			<!-- 头部 -->
			<view class="my_order_header flex justify-between">
				<text class=" text-[28rpx]">我的订单</text>
				<view>
					<text class=" text-[25rpx] text-[#575757]">详情</text>
					<image class="w-[14rpx] h-[20rpx] ml-[10rpx]" src="../../static/images/next1.svg" mode="widthFix">
					</image>
				</view>
			</view>
			<!-- 按钮列表 -->
			<view class="my_order_list">
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
					<view class="scroll-view-item_H" v-for="item in 5">
						<view class="flex flex-col items-center ">
							<image class="w-[42rpx] h-[42rpx]" src="../../static/icon/qb.svg"></image>
							<text class="text-[24rpx] mt-[13rpx]">待付款</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>


		<!-- 常用工具 -->
		<view class="common_tool_box">
			<!-- 头部 -->
			<view class="common_tool_header flex justify-between">
				<text class="text-[28rpx]">常用工具</text>
			</view>
			<!-- 按钮列表 -->
			<view class="common_tool_list">
				<view class="common_tool_item" @click="toPage('/pages/mine/address?type=edit')">
					<view class="w-[71.5rpx] h-[71.5rpx] flex items-center justify-center">
						<image class=" h-full w-full" src="../../static/icon/my-address.svg"></image>
					</view>
					<text class="text-[24rpx] mt-[13rpx]">收货地址</text>
				</view>

				<view class="common_tool_item" v-for="item in 7">
					<view class="w-[71.5rpx] h-[71.5rpx] flex items-center justify-center">
						<image class=" h-full w-full" src="../../static/icon/ppjs.svg"></image>
					</view>
					<text class="text-[24rpx] mt-[13rpx]">品牌介绍</text>
				</view>

				<view class="common_tool_item" @click="toPage('/pages/mine/present')">
					<view class="w-[71.5rpx] h-[71.5rpx] flex items-center justify-center">
						<image class=" h-full w-full" src="../../static/icon/sm-logo.svg"></image>
					</view>
					<text class="text-[24rpx] mt-[13rpx]">测试1</text>
				</view>

			</view>
		</view>


		<!-- 底部 tabbar -->
		<!-- <Tarbar class="fixed-bottom" /> -->
		<TabBar class="fixed-bottom" :isAppMode="true" />
	</view>
</template>

<script setup>
import Tarbar from '@/components/tarbar.vue';
import { getTitleBarHeight } from '@/utils/index.js';

const titleBarHeight = getTitleBarHeight();


// 跳转指定页面
function toPage(url) {
	uni.navigateTo({
		url
	})
}
</script>

<style>
.scroll-view_H {
	white-space: nowrap;
	width: 100%;
}

.scroll-view-item {
	text-align: center;
	font-size: 36rpx;
}

.scroll-view-item_H {
	display: inline-block;
	padding: 0 35rpx;
	/* height: 300rpx;
	line-height: 300rpx; */
	text-align: center;
	font-size: 36rpx;
}
</style>

<style scoped lang="scss">
.mine_container {
	height: 100vh;
	background-color: #f8f9fa;
	background-image: url('../../static/images/my-bg.svg');
	background-size: 100%;
	background-repeat: no-repeat;
	padding-bottom: $tabbar-height;


	// 个人数据积分/余额/优惠券
	.mine_data_box {
		height: 180.56rpx;
		background: linear-gradient(180deg, #fff1f1, #ffe4e4);
		border-radius: 13.89rpx;

		.mine_data_item {
			width: 33.33%;
			// border: 1px solid #000;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.mine_data_value {
				font-size: 34.72rpx;
				font-weight: 700;
				text-align: center;
				color: #fc4740;
			}

			.mine_data_name {
				border: 2rpx solid rgba(0, 0, 0, 0.00);
				font-size: 25rpx;
				font-weight: 500;
				text-align: center;
				color: #242424;
				margin-top: 15rpx;
			}

			&:nth-child(2) {
				// 左右边框
				// border-left: 1px solid #ff0000;
				// border-right: 1px solid #ff0000;
			}
		}
	}

	// 我的订单 按钮列表容器
	.my_order_box {
		width: 100%;
		margin-top: 20rpx;
		// height: 236.11rpx;
		background: #ffffff;
		border-radius: 13.89rpx;
		padding: 25rpx;

		.my_order_header {}

		.my_order_list {
			margin-top: 30rpx;
		}
	}

	// 常用工具
	.common_tool_box {
		margin-top: 20rpx;
		background: #ffffff;
		border-radius: 13.89rpx;
		padding: 25rpx;

		.common_tool_header {}

		.common_tool_list {
			margin-top: 30rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			row-gap: 25rpx;

			.common_tool_item {
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
		}
	}
}
</style>