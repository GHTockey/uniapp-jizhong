<template>
	<view class="top_up_center_container" v-if="!isShowTopUpStatus">
		<view class="top_up_center_header">
			<text>当前账户余额：</text>
			<text>0.00</text>
		</view>

		<!-- 选择充值金额 -->
		<view class="top_up_center_amount_box">
			<!-- head -->
			<view class="top_up_center_amount_head">
				<text>选择充值金额：</text>
			</view>
			<!-- 金额列表 -->
			<view class="top_up_center_amount_list" v-if="!isShowOtherAmount">
				<view :class="`top_up_center_amount_item ${activeIndex == index ? 'active' : ''}`"
					v-for="(item, index) in 6" @click="activeIndex = index">
					<text class="text-[#424242] text-[30.56rpx]">100元</text>
					<text class="text-[#FF0000] text-[22.22rpx] mt-[10rpx]">售价100</text>
					<!-- 选中图标 -->
					<image src="https://saas.jizhongkeji.com/static/jzkj/static/icon/topUp-ac.svg"
						class="w-[30.56rpx] h-[30.56rpx] absolute bottom-[-1px] right-0" v-if="activeIndex == index">
					</image>
				</view>
				<!-- 其它金额 -->
				<view class="top_up_center_amount_item justify-center !flex-row !p-0" @click="isShowOtherAmount = true">
					<text class="text-[#424242] text-[30.56rpx] mr-[10rpx]">其它金额</text>
					<image src="https://saas.jizhongkeji.com/static/jzkj/static/icon/edit.svg" class="w-[29.17rpx] h-[26.39rpx]"></image>
				</view>
			</view>
			<!-- 其它金额输入框 -->
			<view v-else class="top_up_center_other_amount_input_box">
				<view class="top_up_center_other_amount_input" @click="inputRef.open('bottom')">
					<text class="text-[#A8A8A8] text-[30.56rpx]">{{ inputValue || '请输入要充值的金额' }}</text>
					<image src="https://saas.jizhongkeji.com/static/jzkj/static/icon/edit.svg" class="w-[29.17rpx] h-[26.39rpx]"></image>
				</view>
			</view>
		</view>

		<!-- 充值规则说明 -->
		<view class="top_up_center_rule_box">
			<!-- head -->
			<view class="top_up_center_amount_head mb-[37.5rpx]">
				<text class="text-[#4C4C4C] text-[29.17rpx] font-bold">充值规则说明：</text>
			</view>
			<!-- 规则内容 -->
			<view class="top_up_center_rule_content">
				<text class="text-[#A8A8A8] text-[26.39rpx]">
					可根据需求自由选择充值金额，支付成功，金额自动充值到您的储值余额，可用于购买商城内商品。
					请确认充值信息无误后再进行操作，一旦完成充值，不支持提现或退款，不能转借给他人。如有疑问请联系客服咨询。</text>
			</view>
		</view>

		<!-- 充值按钮 -->
		<view class="top_up_center_recharge_btn" @click="rechargeEvent">
			<text>充值</text>
		</view>

		<!-- 输入栏[数字] -->
		<uni-popup ref="inputRef" background-color="#fff" @change="''">
			<view class="top_up_center_input_box">
				<!-- header -->
				<view class="top_up_center_input_header">
					<text class="text-[#424242] text-[30.56rpx]">{{ inputValue || '请输入要充值的金额' }}</text>
				</view>
				<!-- input btns box -->
				<view class="top_up_center_input_btns_box">
					<!-- left -->
					<view class="top_up_center_input_btns_left">
						<view @click="inputEvent('1')">1</view>
						<view @click="inputEvent('2')">2</view>
						<view @click="inputEvent('3')">3</view>
						<view @click="inputEvent('4')">4</view>
						<view @click="inputEvent('5')">5</view>
						<view @click="inputEvent('6')">6</view>
						<view @click="inputEvent('7')">7</view>
						<view @click="inputEvent('8')">8</view>
						<view @click="inputEvent('9')">9</view>
						<view></view>
						<view @click="inputEvent('0')">0</view>
						<view @click="inputEvent('.')">.</view>
					</view>
					<!-- right -->
					<view class="top_up_center_input_btns_right">
						<view class="h-1/2 flex justify-center items-center" @click="inputEvent('close')">
							<image src="https://saas.jizhongkeji.com/static/jzkj/static/icon/action-sheet-close.svg" class="w-[30rpx] h-[30rpx]"></image>
						</view>
						<view class="h-1/2 flex justify-center items-center top_up_center_input_btns_right_btn"
							@click="inputEvent('submit')">
							<text>充值</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>

	<!-- 充值状态 -->
	<view class="top_up_center_status_box" v-else>
		<view class="top_up_center_status_item">
			<image class="w-[83rpx] h-[83rpx]"
				:src="`https://saas.jizhongkeji.com/static/jzkj/static/icon/topUp${isShowTopUpStatus == 'ok' ? 'Ok' : 'No'}.svg`"></image>
			<text class="text-[#333333] text-[37.5rpx]">充值{{ isShowTopUpStatus == 'ok' ? '成功' : '失败' }}</text>
			<view class="w-[389rpx] text-[#9A9A9A] text-[27.78rpx] text-center">
				{{ isShowTopUpStatus == 'ok' ? '金额已自动充值到您的储值余额可进入“我的钱包”查看' : '本次充值失败，请检查支付密码是否正确或者重新充值' }}
			</view>
		</view>
		<!-- 返回按钮 -->
		<view class="top_up_center_status_back_btn_box">
			<view class="top_up_center_status_recharge_btn" @click="isShowTopUpStatus = null">
				<text>重新充值</text>
			</view>
			<view class="top_up_center_status_back_btn" @click="backEvent">
				<text>返回</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref(0) // 选中金额的索引
const isShowOtherAmount = ref(false) // 是否显示其它金额
const inputRef = ref(null) // 输入框实例  [打开普通弹窗：inputRef.open('bottom')]
const inputValue = ref('') // 输入框的值
const isShowTopUpStatus = ref(null) // 充值状态 null不显示  ok显示充值成功  no显示充值失败



// 充值
function rechargeEvent() {
	console.log('rechargeEvent')


	isShowTopUpStatus.value = 'ok'
}

// 输入事件
function inputEvent(params) {
	switch (params) {
		case 'close':
			inputValue.value = ''
			break
		case 'submit':
			console.log('submit')
			isShowTopUpStatus.value = 'no'
			break
		default:
			// 数字/小数点   小数点追加逻辑 [必须在数字后追加]
			if (params == '.') {
				if (inputValue.value.includes('.')) return
				// 判断 inputValue 是否有值且是否为数字
				if (!inputValue.value && !Number(params)) return
				inputValue.value += params
			} else {
				inputValue.value += params
			}
			break
	}
}

// 返回
function backEvent() {
	uni.navigateBack()
}
</script>

<style scoped lang="scss">
.top_up_center_container {
	// padding-top: $nav-height;
	height: calc(100vh - $nav-height);
	// background-color: #F8F9FA;
	padding: 0 29rpx;

	.top_up_center_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx 0;

		border-bottom: 1rpx dashed #e6e6e6;
		color: #4C4C4C;

	}


	.top_up_center_amount_box {
		padding: 29rpx 0;
		// border: 1px solid red;
		min-height: 700rpx;

		.top_up_center_amount_head {
			color: #181818;
			font-weight: bold;
		}


		.top_up_center_amount_list {
			margin-top: 29rpx;
			// border: 1px solid blue;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			// gap: 20rpx;
			row-gap: 20rpx;

			.top_up_center_amount_item {
				padding: 29rpx;
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;

				width: 216.67rpx;
				height: 138.89rpx;
				border-radius: 11.11rpx;
				border: 1px solid #cbcbcb;

			}

			.top_up_center_amount_item.active {
				border: 1px solid #ff5f5f;
			}
		}

		// 其它金额输入框
		.top_up_center_other_amount_input_box {
			// border: 1px solid red;
			margin-top: 29rpx;

			.top_up_center_other_amount_input {
				width: 691.67rpx;
				height: 138.89rpx;
				border: 1.39rpx solid #cbcbcb;
				border-radius: 11.11rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 35rpx;
			}
		}
	}

	// 输入栏[数字]
	.top_up_center_input_box {
		height: 586.11rpx;
		background: rgba(0, 0, 0, 0.00);

		.top_up_center_input_header {
			height: 134rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.top_up_center_input_btns_box {
			// border: 1px solid red;
			height: 452.78rpx;
			display: flex;

			.top_up_center_input_btns_left {
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				width: 100%;

				view {
					// 每行三个
					width: calc(100% / 3);
					text-align: center;
					line-height: 100rpx;
					border: 1px solid #eeeeee;
					color: #555555;
					font-size: 30.56rpx;
					font-weight: bold;
				}
			}

			.top_up_center_input_btns_right {
				width: 200rpx;
				height: 100%;
				border: 1px solid #eeeeee;

				.top_up_center_input_btns_right_btn {
					color: #fff;
					background-image: $uni-color-gradient-primary;
				}
			}
		}
	}

	// 充值按钮
	.top_up_center_recharge_btn {
		margin-top: 180rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: $uni-color-gradient-primary;
		color: #fff;
		width: 691.67rpx;
		height: 83.33rpx;
		opacity: 0.9;
		border-radius: 13.89rpx;
	}
}

// 充值状态
.top_up_center_status_box {
	height: calc(100vh - $nav-height);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	// background-color: #4C4C4C;




	.top_up_center_status_item {
		width: 100%;
		padding: 132rpx 0;
		// border: 1px solid red;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 20rpx;
	}


	.top_up_center_status_back_btn_box {
		margin-bottom: 335rpx;

		.top_up_center_status_back_btn {
			width: 319.44rpx;
			height: 69.44rpx;
			opacity: 0.9;
			border: 1.39rpx solid #fe3948;
			border-radius: 13.89rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #FF0000;
			font-size: 29.17rpx;
		}

		.top_up_center_status_recharge_btn {
			width: 319.44rpx;
			height: 69.44rpx;
			opacity: 0.9;
			background: $uni-color-gradient-primary;
			border-radius: 13.89rpx;
			margin-bottom: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			font-size: 29.17rpx;
		}
	}

}
</style>