<template>
	<view class="info-box">
		<view class="header">
			<text class="company-name">郑州集中科技有限公司</text>
			<view class="icons">
				<view class="icon phone">
					<image src="../static/icon/phone-icon.png" style="width: 100%;height: 100%;" mode="aspectFit"></image>
				</view>
				<view class="icon message">
					<image src="../static/icon/map-icon.png" style="width: 100%;height: 100%;" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<view class="distance">距离 1.8km</view>
		<view class="address" style="display: flex; align-items: center;">
			<!-- <icon type="cancel" size="12"/> -->
			<image src="../static/icon/self-icon.png" style="width: 19.44rpx;
height: 19.44rpx;" mode="aspectFit"></image>
			<text style="margin-left: 5px;">郑州市惠济区清华园路天元路交叉口艺茂国际仓3楼</text>
		</view>
		<view class="hours" style="display: flex; align-items: center;">
			<image src="../static/icon/time-icon.png" style="width: 19.44rpx;
height: 19.44rpx;" mode="aspectFit"></image>
			<text style="margin-left: 5px;">10:00 - 21:00</text>
		</view>
		<view class="tags">
			<view class="tag open">
				<image src="../static/images/working.png" mode="aspectFit"></image>
			</view>
			<view class="tag close">
				<image src="../static/images/closing.png" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
</script>

<style lang="less" scoped>
.info-box {
	height: 325rpx;
	padding: 33rpx 30rpx;
	background: linear-gradient(0deg, #fff8f8 4%, #ffffff);
	border: 1.39rpx solid #ffb6c1;
	border-radius: 14rpx;
	box-sizing: border-box;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 41rpx;
}

.company-name {
	font-weight: bold;
}

.icons {
	display: flex;
	gap: 20rpx;
}

.icon {
	width: 61.11rpx;
	height: 61.11rpx;
	// background-color: #f0f0f0;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.distance,
.address,
.hours {
	font-size: 24rpx;
	margin-top: 12.5rpx;
	color: #888;
}

.company-name {
	font-size: 29.17rpx;
	font-weight: 700;
	color: #000000;
}

.address {
	margin-top: 24rpx;
	font-size: 24rpx;
	color: #666666;
}

.distance {
	margin-top: 33rpx;
	font-weight: 500;
	color: #323232;
}

.hours {
	color: #666666;
}

.tags {
	margin-top: 14rpx;
	display: flex;
	gap: 25rpx;

	>view {
		width: 111.11rpx;
		height: 33.33rpx;

		>image {
			width: 100%;
			height: 100%;
		}
	}
}
</style>