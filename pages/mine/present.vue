<template>
	<view class="present_container">
		<view class="present_header">
			<view class="present_header_item">
				<image class="w-full h-full" src="../../static/images/present-img.png" mode="widthFix"></image>
			</view>
		</view>

		<!-- card item list -->
		<view class="present_card_list">
			<view class="present_card_item" v-for="item in 3" @click="toPage('/pages/mine/presentDetail')">
				<image class="w-[290rpx] h-[195rpx] mr-[20rpx]" src="../../static/images/present-default.png"
					mode="widthFix"></image>
				<view>
					<view class="text-[27.78rpx] mb-[20rpx] mt-[5rpx]">2025新春礼品卡</view>
					<view>
						<text class="text-[25rpx]">有效期：</text>
						<text class="text-[25rpx]">xxx</text>
					</view>
					<view>
						<text class="text-[25rpx]">金额：</text>
						<text class="text-[25rpx]">xxx</text>
					</view>
					<view>
						<text class="text-[25rpx]">金额：</text>
						<text class="text-[25rpx]">xxx</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { toPage } from '@/utils';

</script>

<style scoped lang="scss">
.present_container {
	height: calc(100vh - $nav-height);
	background-color: #f6f8fe;
	padding: 30rpx;

	.present_header {

		.present_header_item {
			width: 100%;
			height: 347rpx;
			border-radius: 17rpx;
			overflow: hidden;
			// border: 1rpx solid red;
		}
	}

	.present_card_list {
		// display: flex;
		// flex-wrap: wrap;
		// justify-content: space-between;
		// border: 1rpx solid red;
		margin-top: 30rpx;
		// height: 195rpx;

		.present_card_item {
			padding: 15rpx 20rpx;
			border-radius: 17rpx;
			background-color: #fff;
			display: flex;
			margin-top: 20rpx;
		}
	}

}
</style>
