<template>
	<view class="present_pay_container">
		<!-- 标题栏 -->
		<NavBar showBack isWhite>
			<template #title>
				<text class=" text-white">待付款订单</text>
			</template>
		</NavBar>

		<!-- 礼品信息卡片 -->
		<view class="present_pay_card">
			<!-- header -->
			<view class="flex items-center gap-[20rpx]">
				<image class="w-[40rpx] h-[28rpx]" src="../../static/icon/persent-card.svg" mode="widthFix"></image>
				<text class="text-[27.78rpx] text-[#2C2C2C]">礼品卡</text>
			</view>
			<!-- 礼品信息 -->
			<view class="present_pay_card_info my-[25rpx] h-[160rpx]">
				<image class="w-[237.5rpx] h-[160rpx]" src="../../static/images/present_item.png" z>
				</image>
				<view class="flex-1 flex flex-col h-full !justify-between ml-[25rpx]">
					<text
						class="line-clamp-2 text-[29.17rpx] font-bold">2025新春礼品卡2025新春礼品卡2025新春礼品卡2025新春礼品卡2025新春礼品卡2025新春礼品卡</text>
					<view class="flex items-center text-[25rpx] text-[#FF2626] font-bold">
						<text class="text-[18rpx]">￥</text>
						<text>23.5</text>
					</view>
				</view>
			</view>
			<!-- 购买数量 -->
			<view class="flex items-center justify-between">
				<text class="text-[27.78rpx] text-[#2C2C2C] font-bold">购买数量</text>
				<view class="flex items-center">
					<uni-number-box />
				</view>
			</view>
		</view>

		<!-- 买家留言 -->
		<view class="buyer_msg_box" @click="showActionSheet = true">
			<text class="buyer_msg_title">买家留言</text>
			<view style="display: flex;align-items: center;">
				<view class="line-clamp-1" style="font-size: 27.78rpx;font-weight: 500;color: #a0a0a0;">{{ buyerMsg || '无留言' }}</view>
				<image style="width: 13.89rpx; height: 20.83rpx; margin-left: 19.44rpx;" mode="aspectFit"
					src="/static/icon/right1.svg">
				</image>
			</view>
		</view>


		<!-- 底部提交 -->
		<view class="bottom_submit_box">
			<view class="bottom_submit_price_box">
				<view style="color: #A7A7A7; margin-right: 20rpx;">共3件</view>
				<view>
					<text>合计：</text>
					<text style="color: #eb2c2a;">￥100</text>
				</view>
			</view>
			<view @click="toPage('/pages/mine/persentPayRes')" class="bottom_submit_btn">立即支付</view>
		</view>

	</view>

	<!-- 留言弹窗 -->
	<ActionSheetSlot v-model:show="showActionSheet" :title="'买家留言'">
		<template #body>
			<view style="height: 422.22rpx; border-radius: 13.89rpx; padding: 32rpx; background-color: #ececec;">
				<!-- 输入框 -->
				<textarea class="buyer_msg_input" placeholder="请与商家客服沟通一致后再留言，留言内容勿超过100个汉字" v-model="buyerMsg" />
			</view>
		</template>
	</ActionSheetSlot>
</template>

<script setup>
import { ref } from 'vue';
import { toPage } from '@/utils';

const showActionSheet = ref(false);
const buyerMsg = ref('');
</script>

<style scoped lang="scss">
.present_pay_container {
	height: 100vh;
	background-color: #f6f8fe;
	background-image: url('@/static/images/goods-pay-bg.svg');
	background-size: 100%;
	background-repeat: no-repeat;
	padding: 0 14rpx;
	padding-top: $nav-height;

	.present_pay_card {
		background: #ffffff;
		border-radius: 13.89rpx;
		padding: 30rpx;
		margin-top: 25rpx;


		.present_pay_card_info {
			box-sizing: content-box;
			// border: 1px solid red;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 30rpx;
			border-bottom: 1px dashed #e6e6e6;
		}
	}



	// 买家留言 [TODO: 待公共封装]
	.buyer_msg_box {
		border-radius: 14rpx;
		background-color: #FFFFFF;
		// margin: 25rpx 14rpx;
		margin-top: 25rpx;
		padding: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		font-size: 27.78rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		text-align: left;
		color: #1d1d1d;
	}

	// 底部提交 [TODO: 待公共封装]
	.bottom_submit_box {
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #FFFFFF;
		height: 97.22rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 47.22rpx;

		.bottom_submit_price_box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 29.17rpx;
		}

		.bottom_submit_btn {
			color: #FFFFFF;
			background-image: $uni-color-gradient-primary;
			border-radius: 31.25rpx;
			padding: 10rpx 45rpx;
		}
	}
}
</style>
