<template>
	<view class="withdraw_container">
		<!-- 提现到... -->
		<view class="withdraw_to_box">
			<view class="text-[27.78rpx]">提现到{{ withdrawType == 2 ? '银行卡' : '微信' }}</view>
			<!-- <view class="flex items-center gap-2">
				<view @click="toPage('/pages/mine/addBank')" v-if="withdrawType == 2"
					class="text-[27.78rpx] text-[#FF4F26]">提现到银行卡</view>
				<image class="w-[15rpx] h-[15rpx]" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/right1.svg" mode="widthFix"></image>
			</view> -->
		</view>

		<view class="mt-[30rpx] rounded-[14rpx] overflow-hidden">
			<view class="flex justify-between items-center px-[30rpx] mt-[1px] bg-white h-[80rpx]">
				<text class="text-[29.17rpx]">姓名</text>
				<input placeholder-style="color: #C7C7C7; font-size: 29.17rpx; text-align: right;" type="text"
					placeholder="请输入本人的真实姓名" v-model="formData.name" />
			</view>
			<view class="flex justify-between items-center px-[30rpx] mt-[1px] bg-white h-[80rpx]">
				<text class="text-[29.17rpx]">手机号码</text>
				<input placeholder-style="color: #C7C7C7; font-size: 29.17rpx; text-align: right;" type="number"
					placeholder="请输入本人的手机号码" v-model="formData.phone" />
			</view>
			<view class="flex justify-between items-center px-[30rpx] mt-[1px] bg-white h-[80rpx]">
				<text class="text-[29.17rpx]">开户银行</text>
				<input placeholder-style="color: #C7C7C7; font-size: 29.17rpx; text-align: right;" type="text"
					placeholder="请输入开户银行" v-model="formData.bank" />
			</view>
			<view class="flex justify-between items-center px-[30rpx] mt-[1px] bg-white h-[80rpx]">
				<text class="text-[29.17rpx]">银行卡号</text>
				<input placeholder-style="color: #C7C7C7; font-size: 29.17rpx; text-align: right;" type="number"
					placeholder="请输入本人的银行卡号" v-model="formData.bankCard" />
			</view>
		</view>

		<!-- 提现金额容器 -->
		<view class="withdraw_money_box">
			<view class="text-[27rpx] text-[#151515]">提现金额：</view>
			<view class="withdraw_input_box">
				<text class="text-[45.83rpx]">￥</text>
				<input class=" w-full text-[45.83rpx]" type="number">
			</view>
			<view class="withdraw_money_desc_box">
				<view class="flex justify-between">
					<view>可提现佣金：¥0.00</view>
					<view>全部提现</view>
				</view>
				<view class="mt-[28rpx]">根据微信支付的规则要求，单笔转账最高额度为500元，</view>
			</view>
		</view>

		<!-- 提现按钮 -->
		<view class="withdraw_btn_box" @click="withdrawHandler">
			<text class="text-[#FFFFFF]">申请提现</text>
		</view>

		<!-- 提现记录 -->
		<view class="mt-[70rpx] flex justify-center" @click="toPage('/pages/mine/withdraw_list')">
			<text class="text-[27.78rpx] text-[#6d6f6f]">提现记录</text>
		</view>
	</view>

	<!-- 提现结果 -->

</template>

<script setup>
import { ref } from "vue";
import { toPage } from "@/utils";

const withdrawType = ref(2) // 提现方式 [1微信  2银行卡]
const bankCardInfo = ref(null) // 银行卡信息


// 表单数据
const formData = ref({
	name: '',
	phone: '',
	bank: '',
	bankCard: ''
})


// 提现
function withdrawHandler() {
	// 如果是提现到银行卡
	if (withdrawType.value == 2) {
		// 检查银行卡信息
		if (!bankCardInfo.value) {
			uni.showToast({
				title: '请添加银行卡',
				icon: 'error'
			})
			return
		}
	}

	toPage('/pages/mine/withdraw_apply_ing')
}
</script>

<style scoped lang="scss">
.withdraw_container {
	height: calc(100vh - $nav-height);
	background-color: #f1f4f6;
	padding: 30rpx;


	.withdraw_to_box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 88.89rpx;
		background: #ffffff;
		border-radius: 13.89rpx;
		padding: 0 30rpx;
	}

	.withdraw_money_box {
		margin-top: 25rpx;
		height: 322.92rpx;
		background: #ffffff;
		border-radius: 13.89rpx;
		padding: 30rpx;

		.withdraw_input_box {
			padding-bottom: 10rpx;
			height: 100rpx;
			border-bottom: 1rpx solid #E5E5E5;
			display: flex;
			align-items: flex-end;
		}


		.withdraw_money_desc_box {
			padding: 28rpx 0;
			// border: 1px solid red;
			font-size: 25rpx;
			color: #787878;
		}
	}

	.withdraw_btn_box {
		width: 691.67rpx;
		height: 83.33rpx;
		background: #b9b9b9;
		border-radius: 13.89rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 70rpx;
	}
}
</style>
