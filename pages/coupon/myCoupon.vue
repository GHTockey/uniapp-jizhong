<template>
	<view style="height: calc(100vh - 44px);">
		<view class="tab-container">
			<view :class="['tab-item', activeTab === 0 ? 'active' : '']" @click="changeTab(0)">未使用</view>
			<view :class="['tab-item', activeTab === 1 ? 'active' : '']" @click="changeTab(1)">已使用</view>
			<view :class="['tab-item', activeTab === 2 ? 'active' : '']" @click="changeTab(2)">已过期</view>
		</view>
		<view class="content">
			<view v-if="activeTab == 0" style="height: 100%;">
				<!-- 空状态 -->
				<!-- <view class="empty">
					<image src="https://saas.jizhongkeji.com/static/jzkj/kong.png" mode="aspectFit"></image>
					<text>暂无优惠券</text>
				</view> -->
				<!-- 券列表 -->
				<CouponList :coupons="coupons" />
			</view>
			<view v-if="activeTab == 1" style="height: 100%;">
				<!-- 空状态 -->
				<view class="empty">
					<image src="https://saas.jizhongkeji.com/static/jzkj/kong.png" mode="aspectFit"></image>
					<text>已使用的优惠券</text>
				</view>
			</view>
			<view v-if="activeTab == 2" style="height: 100%;">
				<!-- 空状态 -->
				<view class="empty">
					<image src="https://saas.jizhongkeji.com/static/jzkj/kong.png" mode="aspectFit"></image>
					<text>已过期的优惠券</text>
				</view>
			</view>
		</view>
		<view class="more-coupons">
			<button class="more-coupons-btn" @click="getMoreCoupons">领取更多优惠券</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import CouponList from '@/components/CouponsList.vue';
import { toPage } from '@/utils';

const activeTab = ref(0);

const coupons = ref([
	{
		condition: '满100可用',
		title: '优惠券标题',
		date: '2024.08.08至2024.08.09',
		usage: '全部商品可用',
		amount: 1000,
	}
])

const changeTab = (index) => {
	activeTab.value = index;
};

const getMoreCoupons = () => {
	// 这里可以添加领取更多优惠券的逻辑
	console.log('领取更多优惠券');
	toPage('/pages/coupon/couponCenter');
};
</script>

<style lang="less" scoped>
// 标签容器样式
.tab-container {
	display: flex;
	justify-content: space-around;
	border-bottom: 1px solid #eee;
	background-color: white;
	font-size: 28rpx;
	font-weight: 700;
	color: #181818;

	.tab-item {
		padding: 20rpx 0;
		cursor: pointer;

		&.active {
			color: red;
			border-bottom: 2px solid red;
		}
	}
}

// 内容样式
.content {
	height: 100%;
	text-align: center;
	background-color: #f4f6fa;
	font-size: 13.33px;
	font-weight: 500;
	color: #b2b2b2;
	overflow: hidden;

	.empty {
		width: 190rpx;
		height: 200rpx;
		margin: 0 auto;
		margin-top: 200rpx;

		image {
			width: 100%;
			height: 80%;
			margin-bottom: 20rpx;
		}
	}
}



// 更多优惠券按钮样式
.more-coupons {
	width: 100%;
	height: 104rpx;
	position: fixed;
	bottom: 0px;
	background-color: white;
	padding: 20rpx;
	box-sizing: border-box;

	.more-coupons-btn {
		height: 70rpx;
		opacity: 0.9;
		background: linear-gradient(89deg, #ff3981 3%, #ff1e1a 97%);
		border-radius: 14rpx;
		font-size: 30rpx;
		font-weight: 400;
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
