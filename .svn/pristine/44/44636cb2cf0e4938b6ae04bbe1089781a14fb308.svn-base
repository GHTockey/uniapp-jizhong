<template>
	<view class="coupon-container" style="
		height: calc(100vh - 44px); 
		background-image: url('../../static//images/coupons.png');">
		<!-- 空状态 -->
		<!-- <view class="empty-box">
			<image src="../../static/images/kong.png" mode="aspectFill"></image>
			<view>暂无优惠券, 敬请期待</view>
		</view> -->
		<!-- 券列表 -->
		<CouponList :coupons="coupons" style="padding-bottom: 100rpx;" />

		<!-- 底部按钮 -->
		<view class="coupon-bottom">
			<text>查看我的优惠券</text>
			<image src="../../static/icon/right.png"></image>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";
import CouponList from '@/components/CouponsList.vue';

const coupons = ref([
	{
		condition: '满100可用',
		title: '优惠券标题',
		date: '2024.08.08至2024.08.09',
		usage: '全部商品可用',
		amount: 1000,
	},
	{
		condition: '满100可用',
		title: '优惠券标题',
		date: '2024.08.08至2024.08.09',
		usage: '全部商品可用',
		amount: 1000,
	},
	{
		condition: '满100可用',
		title: '优惠券标题',
		date: '2024.08.08至2024.08.09',
		usage: '全部商品可用',
		amount: 300
	},
	{
		condition: '满100可用',
		title: '优惠券标题',
		date: '2024.08.08至2024.08.09',
		usage: '全部商品可用',
		amount: 300
	},
	{
		condition: '满100可用',
		title: '优惠券标题',
		date: '2024.08.08至2024.08.09',
		usage: '全部商品可用',
		amount: 300
	},
	{
		condition: '满100可用',
		title: '优惠券标题',
		date: '2024.08.08至2024.08.09',
		usage: '全部商品可用',
		amount: 300
	},
])

</script>

<style lang="less">
.coupon-container {
	background-color: #cb1402;
	// background-color: #02cb3e;
	background-repeat: no-repeat;
	background-size: contain;
	padding-top: 450rpx;
	box-sizing: border-box;


	// 空状态
	.empty-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 80%;
		margin: 0 auto;
		padding: 20rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		// border: 1px solid goldenrod;

		>image {
			width: 200rpx;
			height: 200rpx;
		}

		>view {
			margin-top: 40rpx;
			font-size: 26rpx;
			font-weight: 500;
			color: #ffffff;
			opacity: .9;
		}
	}


	// 底部按钮
	.coupon-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: white;

		>image {
			width: 32rpx;
			height: 32rpx;
		}

		>text {
			font-size: 29rpx;
			font-weight: 700;
			color: #000000;
		}
	}
}
</style>
