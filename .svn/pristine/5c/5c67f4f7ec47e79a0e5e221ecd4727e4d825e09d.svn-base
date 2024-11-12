<template>
	<view class="present_detail_container">
		<!-- 头部 img -->
		<view class="present_detail_header">
			<image class="w-full" src="https://saas.jizhongkeji.com/static/jzkj/static/images/present-default.png" mode="widthFix"></image>
		</view>

		<!-- 标题/有效期 -->
		<view class="present_detail_header_title">
			<view class="text-[29.17rpx] font-bold">2025新春礼品卡2025新春礼品卡2025新春礼品</view>
			<view class=" text-[22.22rpx] text-[#696969]">有效期：2024-08-09 14:56:45 至 2024-08-09 14:56:45</view>
		</view>

		<!-- 包含的商品 -->
		<view class="present_detail_goods">
			<!-- header -->
			<view class="flex justify-between">
				<view class="text-[27.78rpx]">本礼品卡包含以下商品：</view>
				<view class="text-[26.39rpx]">合计：￥666.33</view>
			</view>

			<view class="present_detail_goods_item_box">
				<view class="present_detail_goods_item_box_item" v-for="item in 2">
					<image class="w-[166rpx] h-[166rpx] mr-[20rpx]" src="https://saas.jizhongkeji.com/static/jzkj/static/images/present-default.png">
					</image>
					<view class="flex-1 flex flex-col justify-between">
						<!-- 最多显示两行 超出显示省略号 -->
						<view class="text-[26.39rpx] text-[#323232] line-clamp-2">
							商品标题商品标题商品标商品商品标题商品标题商品标商商品标题商品标题商品标商品商品标题商品标题商品标商
						</view>
						<view class="flex justify-between">
							<view class="flex items-center text-[#EB2C2A]">
								<text class="text-[18rpx]">￥</text><text class="text-[26.39rpx]">666.33</text>
							</view>
							<text class="text-[#9B9B9B] text-[27rpx]">X1</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 使用须知 -->
		<view class="present_detail_use_notice">
			<view class="text-[27.78rpx] font-bold">
				<text>使用须知</text>
				<view class="bottom_line"></view>
			</view>
			<view class="mt-[20rpx]">
				<text class="text-[26.39rpx] text-[#323232]">
					购买与赠送：礼品卡支持在线购买，可赠予亲朋好友。<br />
					有效期：请留意礼品卡上的有效期，过期将无法使用。<br />
					绑定与使用：收到礼品卡后，请在小程序内绑定至个人账户，即可在商城消费时抵扣相应金额。<br />
					限制说明：部分商品可能不支持使用礼品卡，请以商城的说明为准。<br />
					退换政策：礼品卡一经售出，非质量问题不接受退换，请确认后再购买。<br />
					余额查询：随时在“我的账户”查看礼品卡余额及使用情况。<br />
					客服支持：如有疑问，请您及时联系客服，我们将竭诚为您服务！
				</text>
			</view>
		</view>

		<!-- 显示图片区域 -->
		<view class="present_detail_show_img_box">
			<!-- <image class="w-full" src="https://saas.jizhongkeji.com/static/jzkj/static/images/present-default.png" mode="widthFix"></image> -->
		</view>

		<!-- 底部操作栏 -->
		<view class="present_detail_bottom_box">
			<view class="text-[29.17rpx]">
				<text>售价：</text>
				<text class="text-[#EB2C2A]">￥666.33</text>
			</view>
			<!-- 购买按钮 -->
			<view class="present_detail_bottom_box_buy_btn" @click="toPage('/pages/mine/presentPay')">
				<text>购买礼品卡</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { toPage } from '@/utils';
</script>

<style scoped lang="scss">
.present_detail_container {
	padding: 30rpx;
	padding-bottom: 96rpx;
	min-height: calc(100vh - $nav-height);
	background-color: #f6f8fe;

	.present_detail_header {
		height: 460rpx;
		// border: 1rpx solid red;
		border-radius: 17rpx;
		overflow: hidden;
	}

	.present_detail_header_title {
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		padding: 20rpx;
		row-gap: 20rpx;


		background: #ffffff;
		border-radius: 13.89rpx;
		box-shadow: 0rpx 0rpx 4.17rpx 0rpx rgba(0, 0, 0, 0.05);
	}

	.present_detail_goods {
		margin-top: 20rpx;
		background: #ffffff;
		border-radius: 13.89rpx;
		box-shadow: 0rpx 0rpx 4.17rpx 0rpx rgba(0, 0, 0, 0.05);
		padding: 30rpx;


		.present_detail_goods_item_box {
			margin-top: 40rpx;
			display: flex;
			flex-direction: column;
			row-gap: 20rpx;


			.present_detail_goods_item_box_item {
				// border: 1rpx solid blue;
				display: flex;
			}

		}
	}

	.present_detail_use_notice {
		margin-top: 20rpx;
		background: #ffffff;
		border-radius: 13.89rpx;
		box-shadow: 0rpx 0rpx 4.17rpx 0rpx rgba(0, 0, 0, 0.05);
		padding: 30rpx;

		.bottom_line {
			width: 112.5rpx;
			// width: 100%;
			height: 2.78rpx;
			background: $uni-color-gradient-primary;
			border-radius: 1.39rpx;
			margin-top: 10rpx;
		}
	}

	.present_detail_show_img_box {
		margin-top: 20rpx;
		border-radius: 13.89rpx;
		overflow: hidden;
		// border: 1rpx solid red;
	}

	.present_detail_bottom_box {
		height: 96rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;

		.present_detail_bottom_box_buy_btn {
			width: 277.78rpx;
			height: 61.11rpx;
			opacity: 0.9;
			background: $uni-color-gradient-primary;
			border-radius: 13.89rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ffffff;
		}
	}
}
</style>
