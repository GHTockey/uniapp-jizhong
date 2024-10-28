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
		<view class="tce_theme_btn !rounded-[13.89rpx] text-[33rpx] mt-[50rpx] !py-[20rpx]"
			@click="sendPopupRef.open()">
			<text>赠送朋友</text>
		</view>
	</view>

	<!-- 分享弹窗 -->
	<uni-popup ref="sendPopupRef" type="bottom" :mask-click="false">
		<view class="h-[416rpx] bg-white rounded-t-lg flex justify-evenly items-center relative">
			<view class="w-[195rpx] flex flex-col items-center">
				<image class="w-[83rpx] h-[83rpx]" src="../../static/images/wx.svg" mode="widthFix"></image>
				<text class="text-[27.78rpx] text-center mt-[20rpx]">转发小程序链接给微信好友</text>
			</view>
			<!-- 中间分割线 -->
			<view class="w-[1rpx] h-[200rpx] bg-[#e5e5e5]"></view>

			<view class="w-[195rpx] flex flex-col items-center" @click="generatePoster">
				<image class="w-[83rpx] h-[83rpx]" src="../../static/images/xc.svg" mode="widthFix"></image>
				<text class="text-[27.78rpx] text-center mt-[20rpx]">生成海报图片朋友扫码领取</text>
			</view>

			<!-- 关闭按钮 -->
			<view class="absolute right-[30rpx] top-[30rpx]" @click="sendPopupRef.close()">
				<image class="w-[28rpx] h-[28rpx]" src="../../static/icon/pay-pup-close.svg"></image>
			</view>
		</view>
	</uni-popup>
	<!-- 海报弹窗 -->
	<uni-popup ref="posterPopupRef" type="center" :mask-click="false">
		<view class="h-[1032rpx] w-[625rpx] flex flex-col mt-[35rpx] relative">
			<view class=" bg-white p-[35rpx] flex flex-col items-center ">
				<image class="w-[550rpx] h-[550rpx]" src="../../static/images/kun.png"></image>
				<text class=" line-clamp-2  text-[29.17rpx]">
					这是商品的名称这是商品的名称这是商品的名称这是商品的名称这是商品的名称这是商品的名称
				</text>
				<view class=" text-[20.83rpx] w-full text-[#FF2626]">
					<text>￥</text>
					<text class="text-[30rpx] font-bold">100</text>
				</view>
				<!-- 小程序码区域 -->
				<view class="w-full flex justify-end items-center">
					<view class="w-[222rpx] text-[26rpx] text-[#828282]">扫描微信小程序码即可下单购买</view>
					<image class="w-[111rpx] h-[111rpx]" src="../../static/images/xcx-qr.png"></image>
				</view>
			</view>

			<!-- btns -->
			<view class="flex-1 flex justify-evenly items-center mt-[30rpx]">
				<view class="flex flex-col items-center">
					<image class=" w-[83rpx] h-[83rpx]" src="../../static/images/download.svg" mode="widthFix"></image>
					<text class="text-[27.78rpx] text-white mt-[20rpx]">下载海报</text>
				</view>
				<view class="flex flex-col items-center">
					<image class=" w-[83rpx] h-[83rpx]" src="../../static/images/wx.svg" mode="widthFix"></image>
					<text class="text-[27.78rpx] text-white mt-[20rpx]">下载小程序码</text>
				</view>
			</view>

			<!-- 关闭按钮 -->
			<view class="absolute right-[-20rpx] top-[-50rpx] z-[100]" @click="posterPopupRef.close()">
				<image class="w-[33rpx] h-[33rpx]" src="../../static/icon/popup-close.svg"></image>
			</view>
		</view>

	</uni-popup>
</template>

<script setup>
import { ref } from 'vue';

const sendPopupRef = ref(null) // 赠送弹窗实例
const posterPopupRef = ref(null) // 海报弹窗实例



// 生成海报
function generatePoster() {
	sendPopupRef.value.close()

	uni.showLoading({ title: '生成海报中' })

	setTimeout(() => {
		posterPopupRef.value.open()
		uni.hideLoading()
	}, 500)

}
</script>

<style scoped lang="scss">
.persent_send_container {
	height: calc(100vh - $nav-height);
	background-color: #f6f8fe;
	padding: 30rpx;
}
</style>
