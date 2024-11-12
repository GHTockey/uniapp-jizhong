<template>
	<view class="present_activate_container" style="background-image: url('https://saas.jizhongkeji.com/static/jzkj/static/images/present-activate-bg.svg');">
		<!-- 标题栏 -->
		<NavBar showBack  bgc="transparent">
			<template #title>
				<text>卡片激活</text>
			</template>
		</NavBar>

		<!-- 头部样式 -->
		<view class="present_activate_header">
			<image class="w-[486rpx] absolute right-0 bottom-[20rpx]"
				src="https://saas.jizhongkeji.com/static/jzkj/static/images/present-activate-icon.png" mode="widthFix"></image>
			<image class="w-[360rpx] absolute top-1/2 -translate-y-1/2 left-[20rpx]"
				src="https://saas.jizhongkeji.com/static/jzkj/static/images/present-activate-txt.svg" mode="widthFix"></image>
		</view>

		<!-- 输入卡号/密码 -->
		<view class="present_activate_input_box">
			<view class=" h-[100rpx] flex gap-2 items-center bg-[#ececec] rounded-[14rpx] px-4">
				<image class="w-[40rpx]" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/present-card-num.svg" mode="widthFix"></image>
				<input v-model="formData.cardNum" class="flex-1 text-[30rpx]" placeholder="请输入卡片号码" />
			</view>
			<view class=" h-[100rpx] flex gap-2 items-center bg-[#ececec] rounded-[14rpx] px-4">
				<image class="w-[40rpx]" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/present-card-pwd.svg" mode="widthFix"></image>
				<input v-model="formData.cardPwd" class="flex-1 text-[30rpx]" placeholder="请输入卡片密码" />
			</view>


			<!-- 激活按钮 -->
			<view class="tce_theme_btn !rounded-[14rpx] !py-[18rpx]" @click="handleActivate">
				<text>激活</text>
			</view>
		</view>

		<!-- 操作须知 -->
		<view class="present_activate_operation_box">
			<text class="text-[27.78rpx] text-[#6d6f6f] font-bold">操作须知：</text>
			<text class="text-[27rpx] text-[#6d6f6f]">
				为了保护您的账户安全，请务必准确输入。若您当天连续输入错误三次，激活功能将被暂时锁定，24小时后才能解除。遇到任何操作问题，欢迎联系客服。
			</text>
		</view>

		<!-- 商家电话 -->
		<view class="flex items-center justify-center gap-2 mt-[216rpx]">
			<image class="w-[31rpx] h-[31rpx]" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/sj-mobile.svg" />
			<text>商家客服热线：18888888888</text>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { toPage } from '@/utils';

const formData = ref({
	cardNum: '',
	cardPwd: '',
});


// 激活
const handleActivate = () => {
	// console.log(formData.value);
	if (!formData.value.cardNum || !formData.value.cardPwd) {
		uni.showToast({
			title: '请输入卡片号码和密码',
			icon: 'none'
		});

		return;
	}

	// TODO: 临时演示
	if (formData.value.cardNum == '111' && formData.value.cardPwd == '111') {
		toPage('/pages/mine/presentActivateRes');
		return;
	}

	uni.showToast({
		title: '当前卡密无效或已被激活',
		icon: 'error'
	});
};
</script>

<style scoped lang="scss">
.present_activate_container {
	height: 100vh;
	background-color: #f6f8fe;
	// background-image: url(https://saas.jizhongkeji.com/static/jzkj/present-activate-bg.svg);
	background-size: 100%;
	background-repeat: no-repeat;
	padding: 0 30rpx;
	padding-top: $nav-height;

	.present_activate_header {
		position: relative;
		height: 350rpx;
		width: 100%;
	}

	.present_activate_input_box {
		background-color: #ffffff;
		padding: 70rpx 30rpx;
		border-radius: 14rpx;
		display: flex;
		flex-direction: column;
		gap: 50rpx;
	}

	.present_activate_operation_box {
		margin-top: 70rpx;
		border: 0.69rpx solid #979797;
		border-radius: 13.89rpx;
		box-shadow: 0rpx 0rpx 4.17rpx 0rpx rgba(0, 0, 0, 0.05);
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}
}
</style>
