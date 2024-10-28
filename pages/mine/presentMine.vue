<template>
	<view class="present_mine_container">
		<!-- 标题栏 -->
		<NavBar showBack>
			<template #title>
				<text>礼品卡</text>
			</template>
		</NavBar>


		<!-- 头像昵称 -->
		<view class=" flex justify-between text-white my-3">
			<!-- left -->
			<view class="flex">
				<image class="w-[120rpx] h-[120rpx] rounded-[50%] mr-[20rpx]" src="../../static/images/emp.png"
					mode="aspectFill"></image>
				<view class="flex flex-col justify-center text-black">
					<text class="text-[30rpx] mb-2">昵称</text>
					<text class=" text-[25rpx] py-[3rpx] rounded-[50rpx] opacity-65">ID:
						1234567890</text>
				</view>
			</view>
		</view>


		<!-- 送出/收到的卡 -->
		<view class="present_mine_card_box">
			<view class="present_mine_card_item">
				<view class="flex flex-col text-white">
					<text class="text-[28rpx]">我送出的卡</text>
					<text class="text-[22rpx] text-[#F6F8FE]">查看送出的卡</text>
				</view>
				<image class="w-[61rpx] h-[50rpx]" src="../../static/icon/card.svg" mode="widthFix"></image>
			</view>
			<view class="present_mine_card_item">
				<view class="flex flex-col text-white">
					<text class="text-[28rpx]">我收到的卡</text>
					<text class="text-[22rpx] text-[#F6F8FE]">查看收到的卡</text>
				</view>
				<image class="w-[61rpx] h-[50rpx]" src="../../static/icon/card.svg" mode="widthFix"></image>
			</view>
		</view>


		<!-- 常用功能 -->
		<view class="present_mine_function_box">
			<!-- header -->
			<view class="present_mine_function_header">
				<text>常用功能</text>
			</view>
			<!-- item -->
			<view class="present_mine_function_item" @click="toPage('/pages/mine/presentRecords')">
				<view class="flex items-center gap-3">
					<image class="w-[61rpx] h-[50rpx]" src="../../static/icon/goukajilu.svg" mode="widthFix"></image>
					<text>购卡记录</text>
				</view>
				<image class="w-[11rpx] h-[11rpx]" src="../../static/icon/right1.svg" mode="widthFix"></image>
			</view>
			<view class="present_mine_function_item">
				<view class="flex items-center gap-3">
					<image class="w-[61rpx] h-[50rpx]" src="../../static/icon/wodekabao.svg" mode="widthFix"></image>
					<text>我的卡包</text>
				</view>
				<image class="w-[11rpx] h-[11rpx]" src="../../static/icon/right1.svg" mode="widthFix"></image>
			</view>
			<view class="present_mine_function_item" @click="toPage('/pages/mine/persentActivate')">
				<view class="flex items-center gap-3">
					<image class="w-[61rpx] h-[50rpx]" src="../../static/icon/kapianjihuo.svg" mode="widthFix"></image>
					<text>卡片激活</text>
				</view>
				<image class="w-[11rpx] h-[11rpx]" src="../../static/icon/right1.svg" mode="widthFix"></image>
			</view>
		</view>


		<!-- 底部TabBar -->
		<TabBar v-model:selectedIndex="selectedIndex" class="fixed-bottom" />
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { toPage } from '@/utils';

const selectedIndex = ref(2)
</script>

<style scoped lang="scss">
.present_mine_container {
	height: calc(100vh - $nav-height);
	background-color: #f6f8fe;
	background-image: url(../../static/images/persent-activate-bg.svg);
	background-size: 100%;
	background-repeat: no-repeat;
	padding: 0 30rpx;
	padding-top: $nav-height;


	.present_mine_card_box {
		// border: 1px solid red;
		display: flex;
		justify-content: space-between;
		gap: 20rpx;
		margin-top: 30rpx;

		.present_mine_card_item {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 139rpx;
			border-radius: 14rpx;
			padding: 0 30rpx;
			background: linear-gradient(136deg, #ff713c 3%, #ff0058 99%);
		}
	}

	.present_mine_function_box {
		background-color: #ffffff;
		padding: 30rpx;
		margin-top: 30rpx;
		border-radius: 14rpx;

		.present_mine_function_item {
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
}
</style>
