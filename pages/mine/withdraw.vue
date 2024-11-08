<template>
	<view class="withdraw_container">
		<!-- 提现到... -->
		<view class="withdraw_to_box">
			<view class="text-[27.78rpx]">提现到{{ business.withdraw_type == 2 ? '银行卡' : '微信' }}</view>
			<!-- <view class="flex items-center gap-2">
				<view @click="toPage('/pages/mine/addBank')" v-if="withdrawType == 2"
					class="text-[27.78rpx] text-[#FF4F26]">提现到银行卡</view>
				<image class="w-[15rpx] h-[15rpx]" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/right1.svg" mode="widthFix"></image>
			</view> -->
		</view>

		<view class="mt-[30rpx] rounded-[14rpx] overflow-hidden">
			<view class="flex justify-between items-center px-[30rpx] mt-[1px] bg-white h-[80rpx]">
				<view class="w-[150rpx]">
					<text class="text-[29.17rpx]">姓名</text>
				</view>
				<input class="text-right" placeholder-style="color: #C7C7C7; font-size: 29.17rpx; text-align: right;"
					type="text" placeholder="请输入本人的真实姓名" v-model="formData.name" />
			</view>
			<view class="flex justify-between items-center px-[30rpx] mt-[1px] bg-white h-[80rpx]">
				<view class="w-[150rpx]">
					<text class="text-[29.17rpx]">手机号码</text>
				</view>
				<input class="text-right" placeholder-style="color: #C7C7C7; font-size: 29.17rpx; text-align: right;"
					type="number" placeholder="请输入本人的手机号码" v-model="formData.phone" />
			</view>
			<view class="flex justify-between items-center px-[30rpx] mt-[1px] bg-white h-[80rpx]">
				<view class="w-[150rpx]">
					<text class="text-[29.17rpx]">开户银行</text>
				</view>
				<input class="text-right" placeholder-style="color: #C7C7C7; font-size: 29.17rpx; text-align: right;"
					type="text" placeholder="请输入开户银行" v-model="formData.bank" />
			</view>
			<view class="flex justify-between items-center px-[30rpx] mt-[1px] bg-white h-[80rpx]">
				<view class="w-[150rpx]">
					<text class="text-[29.17rpx]">银行卡号</text>
				</view>
				<input class="text-right" placeholder-style="color: #C7C7C7; font-size: 29.17rpx; text-align: right;"
					type="number" placeholder="请输入本人的银行卡号" v-model="formData.bankCard" />
			</view>
		</view>

		<!-- 提现金额容器 -->
		<view class="withdraw_money_box">
			<view class="text-[27rpx] text-[#151515]">提现金额：</view>
			<view class="withdraw_input_box">
				<text class="text-[45.83rpx]">￥</text>
				<input class=" w-full text-[45.83rpx]" type="number" v-model="total_amount">
			</view>
			<view class="withdraw_money_desc_box">
				<view class="flex justify-between">
					<view>可提现佣金：¥{{ can_cash_money }}</view>
					<view @click="all_can_cash">全部提现</view>
				</view>
				<view class="mt-[28rpx]">根据微信支付的规则要求，单笔转账最高额度为500元，</view>
			</view>
		</view>

		<!-- 提现按钮 -->
		<view class="withdraw_btn_box" @click="create_batches_bank">
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
import { request } from '@/utils/request.js';
import { useTempStore } from '@/stores/temp';
import { storeToRefs } from 'pinia';
import { onShow } from '@dcloudio/uni-app';

const { user, business } = storeToRefs(useTempStore())

const withdrawType = ref(2) // 提现方式 [1微信  2银行卡]
const bankCardInfo = ref(null) // 银行卡信息


const total_amount = ref(0) // 可提现佣金
// user_name
// phone: '',
// bank: '',
// card: '',
const can_cash_money = ref()
const target_bank = ref()


// 表单数据
const formData = ref({
	name: '',
	phone: '',
	bank: '',
	bankCard: ''
})




onShow(() => {
	// this.onLogin(user => {
	// 	this.setData({
	// 		user: user,
	// 		business: user.business,
	// 	})
	// })



	distribution_center_data();
	last_withdraw();
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

function total_amount_change(e) {
	console.log('total_amount_change', e.detail.value);
	total_amount.value = e.detail.value
}
function total_amount_input(e) {
	console.log('total_amount_input', e.detail.value);
	total_amount.value = e.detail.value
}

function user_name_input(e) {
	// this.setData({
	// 	'user_name': e.detail.value
	// })
	formData.value.name = e.detail.value
}
function phone_input(e) {
	// this.setData({
	// 	'phone': e.detail.value
	// })
	formData.value.phone = e.detail.value
}
function bank_input(e) {
	// this.setData({
	// 	'bank': e.detail.value
	// })
	formData.value.bank = e.detail.value
}
function card_input(e) {
	// this.setData({
	// 	'card': e.detail.value
	// })
	formData.value.bankCard = e.detail.value
}

function all_can_cash() {
	// this.setData({
	// 	'total_amount': this.data.can_cash_money
	// })
	total_amount.value = can_cash_money.value
}

async function distribution_center_data() {
	let res = await request('/WxAppCustomer/distribution_center_data', 'post', {})
	console.log('distribution_center_data', res);
	// 更新数据
	if (res.code == 0) {

		// that.setData({
		// 	can_cash_money: res.data.can_cash_money,
		// })
		can_cash_money.value = res.data.can_cash_money

	} else {
		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true
		})
	}
}
async function last_withdraw() {

	let res = await request('/WxAppCustomer/last_withdraw', 'post', {})
	console.log('last_withdraw', res);
	// 更新数据
	if (res.code == 0) {
		target_bank.value = res.data.target_bank

		if (res.data.target_bank && res.data.target_bank.id) {
			// that.setData({
			// 	user_name: res.data.data.target_bank.user_name,
			// 	phone: res.data.data.target_bank.phone,
			// 	bank: res.data.data.target_bank.bank,
			// 	card: res.data.data.target_bank.card,
			// })
			formData.value.name = res.data.target_bank.user_name
			formData.value.phone = res.data.target_bank.phone
			formData.value.bank = res.data.target_bank.bank
			formData.value.bankCard = res.data.target_bank.card
		}
	} else {
		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true
		})
	}
}
function create_batches(e) {
	// var that = this
	if (total_amount.value <= 0) return uni.showToast({ title: '请输入提现金额', icon: 'none' })
	if (total_amount.value >= 2000) return uni.showToast({ title: '最多提现不能超过2000', icon: 'none' })

	uni.showModal({
		title: '系统提示',
		content: '确认提现吗?',
		complete: async (res) => {
			if (res.cancel) { }
			if (res.confirm) {

				let reqRes = await request('/WxAppCustomer/apply_withdraw', 'post', {
					total_amount: total_amount.value
				})
				console.log('create_batches', reqRes);
				// 更新数据
				if (res.code == 0) {
					// that.setData({
					// 	user: res.data.data.user,
					// 	can_cash_money: res.data.data.can_cash_money,
					// })

					can_cash_money.value = reqRes.data.can_cash_money
					user.value = reqRes.data.user

					// getApp().globalData.user = res.data.data.user;
					uni.redirectTo({
						url: '/pages/mine/withdraw_apply_ing',
					})
				} else {
					uni.showToast({
						title: reqRes.msg,
						icon: 'none',
						mask: true
					})
				}
			}
		}
	})
}
function create_batches_bank() {
	if (!formData.value.name) return uni.showToast({ title: '请输入本人真实姓名', icon: 'none' })
	if (!formData.value.phone) return uni.showToast({ title: '请输入本人手机号码', icon: 'none' })
	if (!formData.value.bank) return uni.showToast({ title: '请输入开户银行', icon: 'none' })
	if (!formData.value.bankCard) return uni.showToast({ title: '请输入银行卡号', icon: 'none' })
	if (total_amount.value <= 0) return uni.showToast({ title: '请输入提现金额', icon: 'none' })

	uni.showModal({
		title: '系统提示',
		content: '确认提现吗?',
		complete: async (res) => {
			if (res.cancel) { }
			if (res.confirm) {
				let reqRes = await request('/WxAppCustomer/apply_withdraw_bank', 'post', {
					total_amount: total_amount.value,
					user_name: formData.value.name,
					phone: formData.value.phone,
					bank: formData.value.bank,
					card: formData.value.bankCard,
				})
				// 更新数据
				if (res.code == 0) {
					// that.setData({
					// 	user: res.data.data.user,
					// 	can_cash_money: res.data.data.can_cash_money,
					// })
					can_cash_money.value = reqRes.data.can_cash_money
					user.value = reqRes.data.user

					uni.redirectTo({
						url: '/pages/mine/withdraw_apply_ing',
					})
				} else {
					uni.showToast({
						title: reqRes.msg,
						icon: 'none',
						mask: true
					})
				}
			}
		}
	})
}
function to_withdraw_list() {
	uni.navigateTo({
		url: '/pages/mine/withdraw_list',
	})
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
