<template>
	<!-- [[[[[[[[[[[[[[[[[[[	此页废弃	]]]]]]]]]]]]]]]]]]] -->
	<view class="addBank_container">
		<view class="mt-[30rpx]">
			<view class="flex justify-between items-center px-[30rpx] mt-[1px] bg-white h-[80rpx]">
				<text>姓名</text>
				<input placeholder-style="color: #C7C7C7; font-size: 29.17rpx; text-align: right;" type="text"
					placeholder="请输入本人的真实姓名" v-model="formData.name" />
			</view>
			<view class="flex justify-between items-center px-[30rpx] mt-[1px] bg-white h-[80rpx]">
				<text>手机号码</text>
				<input placeholder-style="color: #C7C7C7; font-size: 29.17rpx; text-align: right;" type="number"
					placeholder="请输入本人的手机号码" v-model="formData.phone" />
			</view>
			<view class="flex justify-between items-center px-[30rpx] mt-[1px] bg-white h-[80rpx]">
				<text>开户银行</text>
				<picker @change="bankChangeHandler" :value="bankValue" range-key="name" :range="bankList">
					<view class="text-[29.17rpx] flex items-center">
						<template v-if="bankList[bankValue]?.name">
							<text class="mr-[15rpx]">{{ bankList[bankValue].name }}</text>
							<image src="https://saas.jizhongkeji.com/static/jzkj/static/icon/right1.svg" mode="widthFix" class="w-[16rpx] h-[16rpx]">
							</image>
						</template>
						<template v-else>
							<text class="mr-[15rpx]">请选择</text>
							<image src="https://saas.jizhongkeji.com/static/jzkj/static/icon/right1.svg" mode="widthFix" class="w-[16rpx] h-[16rpx]">
							</image>
						</template>
					</view>
				</picker>
			</view>
			<view class="flex justify-between items-center px-[30rpx] mt-[1px] bg-white h-[80rpx]">
				<text>银行卡号</text>
				<input placeholder-style="color: #C7C7C7; font-size: 29.17rpx; text-align: right;" type="number"
					placeholder="请输入本人的银行卡号" v-model="formData.bankCard" />
			</view>
		</view>

		<!-- 保存按钮 -->
		<view class="save_btn_box">
			<view class="save_btn" @click="saveHandler">
				<text>保存</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";


const bankList = ref([
	{ name: '中国银行', icon: '', id: 1 },
	{ name: '中国工商银行', icon: '', id: 2 },
	{ name: '中国建设银行', icon: '', id: 3 },
	{ name: '中国农业银行', icon: '', id: 4 },
	{ name: '中国邮政储蓄银行', icon: '', id: 5 },
	{ name: '中国交通银行', icon: '', id: 6 },
	{ name: '中国招商银行', icon: '', id: 7 },
	{ name: '中国民生银行', icon: '', id: 8 },
	{ name: '中国兴业银行', icon: '', id: 9 },
	{ name: '中国平安银行', icon: '', id: 10 },
	{ name: '中国中信银行', icon: '', id: 11 },
	{ name: '中国广发银行', icon: '', id: 12 },
	{ name: '中国华夏银行', icon: '', id: 13 },
	{ name: '中国浦发银行', icon: '', id: 14 },
	{ name: '中国光大银行', icon: '', id: 15 },
	{ name: '中国民生银行', icon: '', id: 16 }
]) // 银行列表
const bankValue = ref()
// 表单数据
const formData = ref({
	name: '',
	phone: '',
	bank: '',
	bankCard: ''
})





// 保存
function saveHandler() {
	// 如果选择了银行
	if (bankValue.value) {
		formData.value.bank = bankList.value[bankValue.value].name
	} else {
		uni.showToast({
			title: '请选择银行',
			icon: 'error'
		})
		return
	}

	// 检查表单数据
	if (!formData.value.name || !formData.value.phone || !formData.value.bank || !formData.value.bankCard) {
		uni.showToast({
			title: '请填写完整信息',
			icon: 'error'
		})
		return
	}


	// 携带数据返回
	uni.navigateBack({
		delta: 1
	})
}

// 银行选择
function bankChangeHandler(e) {
	// console.log(e)
	bankValue.value = e.detail.value
}
</script>

<style scoped lang="scss">
.addBank_container {
	height: calc(100vh - $nav-height);
	background-color: #f1f4f6;
	overflow: hidden;


	.save_btn_box {
		display: flex;
		justify-content: center;
		margin-top: 60rpx;

		.save_btn {
			width: 691.67rpx;
			height: 83.33rpx;
			background: #b9b9b9;
			border-radius: 13.89rpx;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
