<template>
	<view class="present_mine_container"
		style="background-image: url('https://saas.jizhongkeji.com/static/jzkj/static/images/present-activate-bg.svg');">

		<HeightBar appendNavBar />

		<!-- 标题栏 -->
		<NavBar showBack bgc="transparent">
			<template #title>
				<text>礼品卡</text>
			</template>
		</NavBar>


		<!-- 头像昵称 -->
		<view class=" flex justify-between text-white my-3">
			<!-- left -->
			<view class="flex">
				<!-- <image class="w-[120rpx] h-[120rpx] rounded-[50%] mr-[20rpx]"
					src="https://saas.jizhongkeji.com/static/jzkj/static/images/emp.png" mode="aspectFill"></image> -->
				<image class="w-[120rpx] h-[120rpx] rounded-[50%] mr-[20rpx]" :src="user.wx_image" mode="aspectFill">
				</image>
				<view class="flex flex-col justify-center text-black">
					<text class="text-[30rpx] mb-2">{{ user.nickname }}</text>
					<text class=" text-[25rpx] py-[3rpx] rounded-[50rpx] opacity-65">ID:
						{{ user.id }}</text>
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
				<image class="w-[61rpx] h-[50rpx]" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/card.svg"
					mode="widthFix"></image>
			</view>
			<view class="present_mine_card_item">
				<view class="flex flex-col text-white">
					<text class="text-[28rpx]">我收到的卡</text>
					<text class="text-[22rpx] text-[#F6F8FE]">查看收到的卡</text>
				</view>
				<image class="w-[61rpx] h-[50rpx]" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/card.svg"
					mode="widthFix"></image>
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
					<image class="w-[61rpx] h-[50rpx]"
						src="https://saas.jizhongkeji.com/static/jzkj/static/icon/goukajilu.svg" mode="widthFix">
					</image>
					<text>购卡记录</text>
				</view>
				<image class="w-[11rpx] h-[11rpx]" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/right1.svg"
					mode="widthFix"></image>
			</view>
			<view class="present_mine_function_item">
				<view class="flex items-center gap-3">
					<image class="w-[61rpx] h-[50rpx]"
						src="https://saas.jizhongkeji.com/static/jzkj/static/icon/wodekabao.svg" mode="widthFix">
					</image>
					<text>我的卡包</text>
				</view>
				<image class="w-[11rpx] h-[11rpx]" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/right1.svg"
					mode="widthFix"></image>
			</view>
			<view class="present_mine_function_item" @click="toPage('/pages/mine/presentActivate')">
				<view class="flex items-center gap-3">
					<image class="w-[61rpx] h-[50rpx]"
						src="https://saas.jizhongkeji.com/static/jzkj/static/icon/kapianjihuo.svg" mode="widthFix">
					</image>
					<text>卡片激活</text>
				</view>
				<image class="w-[11rpx] h-[11rpx]" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/right1.svg"
					mode="widthFix"></image>
			</view>
		</view>


		<!-- 底部TabBar -->
		<TabBar v-model:selectedIndex="selectedIndex" class="fixed-bottom" />
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { toPage } from '@/utils';
import { useTempStore } from '@/stores/temp';
import { storeToRefs } from 'pinia';

const tempStore = useTempStore();
const { user } = storeToRefs(tempStore);

const selectedIndex = ref(2)
</script>

<style scoped lang="scss">
.present_mine_container {
	height: calc(100vh - $nav-height);
	background-color: #f6f8fe;
	// background-image: url(https://saas.jizhongkeji.com/static/jzkj/present-activate-bg.svg);
	background-size: 100%;
	background-repeat: no-repeat;
	padding: 0 30rpx;
	overflow: hidden;
	// padding-top: $nav-height;


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
