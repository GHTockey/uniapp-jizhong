<template>
	<view class="present_pay_res_container">
		<!-- 标题栏 -->
		<!-- <NavBar title="礼品卡" showBack /> -->


		<!-- 礼品信息卡片 -->
		<view class="present_pay_card">
			<!-- header -->
			<view class="flex items-center justify-between gap-[20rpx]">
				<view class="flex items-center gap-[10rpx]">
					<image class="w-[40rpx] h-[28rpx]" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/present-card.svg" mode="widthFix"></image>
					<text class="text-[27.78rpx] text-[#2C2C2C]">礼品卡</text>
				</view>
				<text class="text-[27.78rpx] text-[#FF2626]">已完成</text>
			</view>
			<!-- 礼品信息 -->
			<view class="present_pay_card_info my-[25rpx] h-[160rpx]">
				<image class="w-[237.5rpx] h-[160rpx]" src="https://saas.jizhongkeji.com/static/jzkj/static/images/present_item.png" z>
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

			<!-- 信息列表 -->
			<view class="present_pay_res_info_list">
				<view class="present_pay_res_info_item">
					<text>订单编号</text>
					<text>20240808170500051001</text>
				</view>
				<view class="present_pay_res_info_item">
					<text>下单时间</text>
					<text>2022-05-06 12:00:00</text>
				</view>
				<view class="present_pay_res_info_item">
					<text>购买数量</text>
					<text>1</text>
				</view>
				<view class="present_pay_res_info_item">
					<text>订单金额</text>
					<text>￥23.5</text>
				</view>
				<view class="present_pay_res_info_item">
					<text>买家留言</text>
					<!-- <text>无</text> -->
					<text>这是一段买家留言测试文字这是一段买家留言测试文字这是一段买家留言测试文字这是一段买家留言测试文字这是一段买家留言测试文字</text>
				</view>
			</view>
		</view>

		<!-- 底部按钮 -->
		<view class="present_pay_res_btn_box" v-if="!isRecords" @click="toPage('/pages/mine/presentCard')">
			<text>查看卡包</text>
		</view>
	</view>
</template>

<script setup>
import { toPage } from "@/utils";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from 'vue';

const isRecords = ref(false)

onLoad((options) => {
	// console.log(options)
	isRecords.value = options.is_records || false

	if (isRecords.value) {
		// 从购卡记录进入
		uni.setNavigationBarTitle({
			title: '订单详情'
		})
	}
})
</script>

<style scoped lang="scss">
.present_pay_res_container {
	// height: 100vh;
	// height: calc(100vh - $nav-height);
	min-height: 100vh;
	background-color: #f6f8fe;
	padding: 0 14rpx;
	padding-bottom: 100rpx;
	overflow: hidden;
	// padding-top: $nav-height;



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


		// 信息列表
		.present_pay_res_info_list {
			// margin-top: 25rpx;


			.present_pay_res_info_item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 10rpx 0;
				color: #6d6f6f;
				font-size: 26.39rpx;

				text {


					&:last-child {
						text-align: right;
						max-width: 500rpx;
					}
				}
			}
		}
	}

	.present_pay_res_btn_box {
		width: 655.56rpx;
		height: 80rpx;
		opacity: 0.9;
		// background: linear-gradient(89deg, #ff3981 3%, #ff1e1a 97%);
		background-image: $uni-color-gradient-primary;
		border-radius: 13.89rpx;
		color: #ffffff;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		bottom: 20rpx;
		left: 50%;
		transform: translateX(-50%);
	}
}
</style>
