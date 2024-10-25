<template>
	<view class="mine_money_container">
		<!-- 标题栏 -->
		<NavBar showBack title="我的钱包" isWhite>
			<template #title>
				<text class="text-[30rpx] text-white">我的钱包</text>
			</template>
		</NavBar>

		<!-- 卡片 -->
		<view class="card_box">
			<!-- 金币图案 -->
			<image class="coin_icon" src="../../static/images/jinbi.svg" mode="widthFix"></image>

			<!-- 账户余额 -->
			<view class="absolute top-[40rpx] left-[40rpx] flex flex-col justify-center">
				<text class="text-[45.83rpx] text-[#FC4740] font-bold">1000</text>
				<text class="text-[25rpx] text-[#222222] mt-[10rpx]">账户余额(元)</text>
			</view>

			<!-- 其它金额容器 -->
			<view class="other_money_box">
				<view class=" flex-1 flex flex-col justify-center">
					<text class="text-[31.25rpx] font-medium text-[#222222]">1000</text>
					<text class="text-[25rpx] text-[#222222]">储值余额(元)</text>
				</view>
				<view class=" flex-1 flex flex-col justify-center">
					<text class="text-[31.25rpx] font-medium text-[#222222]">1000</text>
					<text class="text-[25rpx] text-[#222222]">佣金余额(元)</text>
				</view>
			</view>

			<!-- 操作按钮容器 -->
			<view class="operation_btn_box">
				<!-- 充值 -->
				<view class="recharge_btn" @click="toPage('/pages/mine/topUpCenter')">
					<text class="text-[25rpx] text-white">充值</text>
				</view>
				<!-- 提现 -->
				<view class="withdraw_btn" @click="toPage('/pages/mine/withdraw')">
					<text class="text-[25rpx] text-[#FF0000]">提现</text>
				</view>
			</view>
		</view>

		<!-- 标签栏/日期选择 -->
		<view class="tab_box_container">
			<view class="tabs_box">
				<view class="tab_item" @click="selectTab = 0">
					<text class="text-[27.78rpx] text-[#181818] font-bold">全部</text>
					<!-- 高亮横条 -->
					<view class="high_line" v-if="selectTab == 0"></view>
				</view>
				<view class="tab_item" @click="selectTab = 1">
					<text class="text-[27.78rpx] text-[#181818] font-bold">收入</text>
					<!-- 高亮横条 -->
					<view class="high_line" v-if="selectTab == 1"></view>
				</view>
				<view class="tab_item" @click="selectTab = 2">
					<text class="text-[27.78rpx] text-[#181818] font-bold">支出</text>
					<!-- 高亮横条 -->
					<view class="high_line" v-if="selectTab == 2"></view>
				</view>
			</view>

			<!-- 年月选择 -->
			<view class="date_picker_box">
				<!-- <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					123
					<view class="uni-input">{{ date }}</view>
				</picker> -->
				<picker :range="years" :value="echoVal" @change="yearChange" mode="multiSelector">
					<view class="text-[23.61rpx] text-[#6A6A6A] flex items-center">
						{{ years[0][yearsIndex1] }}年{{ years[1][yearsIndex2] }}月
						<image class="w-[18rpx] h-[9rpx] ml-[10rpx]" src="../../static/icon/ondown.svg"></image>
					</view>
				</picker>
			</view>

		</view>

		<!-- 数据列表 -->
		<view class="data_list_box">
			<!-- 空状态 -->
			<DefaultTip text="暂无数据, 请选择其它时间" v-if="listData.length == 0" />

			<!-- 数据列表 -->
			<view class="data_list_item_box">
				<view class="data_list_item" v-for="item in showListData" :key="item.id">
					<!-- left -->
					<view class="flex gap-[10rpx] flex-col">
						<text class="text-[27.78rpx] text-[#181818]">{{ item.text }}</text>
						<text class="text-[23.61rpx] text-[#6A6A6A]">{{ item.time }}</text>
					</view>
					<!-- right -->
					<view class="flex gap-[10rpx] flex-col items-end">
						<text v-if="item.type == 2" class="text-[27.78rpx] text-[#181818]">-{{ item.amount }}</text>
						<text v-else class="text-[27.78rpx] text-[#FF0000]">+{{ item.amount }}</text>
						<template v-if="item.mark">
							<text v-if="item.mark.type == 1"
								class="text-[23.61rpx] text-[#12AB2C] bg-[#EBF9ED] px-[10rpx] py-[5rpx] rounded-[10rpx]">{{
									item.mark.text }}</text>
							<text v-else
								class="text-[23.61rpx] text-[#237AE3] bg-[#E8F1FF] px-[10rpx] py-[5rpx] rounded-[10rpx]">{{
									item.mark.text }}</text>
						</template>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { toPage } from '@/utils';

const years = ref([]) // 年月选择
const yearsIndex1 = ref(0) // 年月选择
const yearsIndex2 = ref(0) // 年月选择
const echoVal = ref([]) // 当前日期回显

const selectTab = ref(0) // 选择标签
const listData = ref([]) // 数据列表
const showListData = computed(() => { // 计算属性：按需显示列表
	return listData.value.filter(item => {
		return selectTab.value == 0 || selectTab.value == item.type
	})
})

listData.value = [ // type 1 收入 2 支出
	{ text: '分销佣金提现', time: '2024-01-01 15:00:00', amount: 100.00, type: 2, mark: { text: '审核中', type: 2 } },
	{ text: '分销佣金提现', time: '2024-01-01 15:00:00', amount: 100.00, type: 2, mark: { text: '已打款', type: 1 } },
	{ text: '新人红包奖励', time: '2024-01-01 15:00:00', amount: 100.00, type: 1, mark: null },
	{ text: '订单消费扣除', time: '2024-01-01 15:00:00', amount: 100.00, type: 2, mark: null },
]

onLoad(() => {
	console.log('onLoad');

	var date = new Date();
	var year = date.getFullYear(); //获取完整的年份(4位)
	var month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
	var nowDay = date.getDate(); //获取当前日(1-31)

	yearsIndex1.value = year - 1500; //回显年
	yearsIndex2.value = month - 1; //回显月

	let numbers = [];
	for (let i = 1500; i <= 2999; i++) {
		numbers.push(i);
	}
	var arr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

	years.value.push(numbers); //下拉组合
	years.value.push(arr); //下拉组合

	echoVal.value.push(year - 1500); //回显年
	echoVal.value.push(month - 1); //回显月
})



function yearChange(e) {
	console.log(e)
	//获得对象的 detail的 value
	//通过数组的下标改变显示在页面的值
	yearsIndex1.value = e.detail.value[0];
	yearsIndex2.value = e.detail.value[1];
}


</script>

<style scoped lang="scss">
.mine_money_container {
	height: 100vh;
	background-color: #F8F9FA;
	background-image: url('../../static/images/money-bg.svg');
	background-size: 100%;
	background-repeat: no-repeat;
	padding: 0 29rpx;
	padding-top: $nav-height;


	// 卡片
	.card_box {
		margin-top: 30rpx;
		// width: 691.67rpx;
		height: 408.33rpx;
		border-radius: 13.89rpx;
		// border: 1rpx solid #E5E5E5;
		background-image: url('../../static/images/Mask.svg');
		background-size: 100%;
		background-repeat: no-repeat;

		position: relative;


		.coin_icon {
			width: 138.89rpx;
			height: 144.44rpx;
			position: absolute;
			top: 40rpx;
			right: 40rpx;
		}


		.other_money_box {
			width: 100%;
			// border: 1rpx solid red;
			position: absolute;
			bottom: 150rpx;
			padding: 0 40rpx;
			left: 0;
			display: flex;
		}

		.operation_btn_box {
			// border: 1rpx solid red;
			width: 100%;
			position: absolute;
			bottom: 40rpx;
			left: 0;
			display: flex;
			justify-content: space-evenly;

			.recharge_btn {
				background-image: $uni-color-gradient-primary;
				width: 291.67rpx;
				height: 61.11rpx;
				opacity: 0.9;
				border-radius: 13.89rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.withdraw_btn {
				width: 291.67rpx;
				height: 61.11rpx;
				opacity: 0.9;
				border: 1.39rpx solid #fe3948;
				border-radius: 13.89rpx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}

	// 标签栏/日期选择
	.tab_box_container {
		// border: 1rpx solid red;
		margin-top: 30rpx;
		display: flex;
		justify-content: space-between;

		.tabs_box {
			display: flex;

			.tab_item {
				// position: relative;
				padding: 0 30rpx;
				// border: 1rpx solid blue;
				display: flex;
				flex-direction: column;
				align-items: center;

				.high_line {
					margin-top: 5rpx;
					width: 43.06rpx;
					height: 4.17rpx;
					opacity: 0.9;
					background: linear-gradient(89deg, #ff3981 3%, #ff1e1a 97%);
					border-radius: 2.08rpx;
				}
			}
		}


		.date_picker_box {
			height: 41.67rpx;
			opacity: 0.9;
			border: 1.39rpx solid #707070;
			border-radius: 22.22rpx;
			padding: 0 15rpx;
			display: flex;
			align-items: center;
		}

	}

	// 数据列表
	.data_list_box {
		margin-top: 30rpx;
		height: calc(100vh - $nav-height - 408.33rpx - 41.67rpx - 150rpx - 41.67rpx);
		background-color: #fff;
		border-radius: 13.89rpx;
		padding: 29rpx;

		.data_list_item_box {


			.data_list_item {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
				border-bottom: 1rpx dashed #E5E5E5;

				&:last-child {
					border-bottom: none;
				}
			}
		}
	}
}
</style>
