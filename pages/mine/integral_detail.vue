<template>
	<view class="integral_detail_container">
		<HeightBar appendTitleBar />
		<NavBar showBack bgc="white">
			<template #title>
				<view class="w-full text-left pl-[80rpx]">积分明细</view>
			</template>
		</NavBar>

		<!-- 年月/积分类型 picker 选择器 -->
		<view class="integral_detail_picker_box">
			<view class="flex items-center gap-1">
				<picker :range="years" :value="echoVal" @change="yearChange" mode="multiSelector">
					<text>{{ years[0][yearsIndex1] }}年{{ years[1][yearsIndex2] }}月</text>
				</picker>
				<image src="https://saas.jizhongkeji.com/static/jzkj/static/icon/ondown.svg" mode="widthFix"
					class="w-[20rpx] h-[20rpx]"></image>
			</view>
			<view class=" flex items-center gap-1">
				<picker @change="bindPickerChange" :value="index" :range="array">
					<view class="uni-input">{{ array[index] }}</view>
				</picker>
				<!-- <text>全部</text> -->
				<image src="https://saas.jizhongkeji.com/static/jzkj/static/icon/ondown.svg" mode="widthFix"
					class="w-[20rpx] h-[20rpx]"></image>
			</view>
		</view>

		<!-- 积分明细列表 -->
		<view class="integral_detail_list_box">
			<view v-for="(item, index) in integralDetails" :key="index" class="integral_detail_list_item">
				<view class="flex justify-between text-[27.78rpx]">
					<text class="text-[#181818]">{{ item.description }}</text>
					<!-- <text :class="{ 'text-[#FF5722]': item.amount > 0 }">{{ item.amount }}</text> -->
					<template v-if="item.amount > 0">
						<text class="text-[#FF5722]">{{ item.amount }}</text>
					</template>
					<template v-else>
						<text class="text-[#6A6A6A]">{{ item.amount }}</text>
					</template>
				</view>
				<view class="text-[#6A6A6A] text-[23.61rpx] mt-[10rpx]">
					<text>{{ item.date }}</text>
				</view>
			</view>
		</view>


		<view>{{ filterIntegralDetails }}</view>

	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const years = ref([]) // 年月选择
const yearsIndex1 = ref(0) // 年月选择
const yearsIndex2 = ref(0) // 年月选择
const echoVal = ref([]) // 当前日期回显
const selectYear = ref(0) // 当前年 23 => 2023年
const selectMonth = ref(0) // 当前月 10 => 10月

const array = ref(['全部', '收入', '支出'])
const index = ref(0) // 积分类型 0:全部 1:收入 2:支出

// 计算属性：根据年+月+积分类型筛选积分明细
const filterIntegralDetails = computed(() => {
	let ultimatelyData;

	// TODO: 待修改 1106

	let accordWithYearMonth;
	if (selectYear.value != 0) { // selectYear 是 23 => 2023  去和 item.date 的 2023 对比
		accordWithYearMonth = integralDetails.value.filter(item => {
			return item.date.includes(`${selectYear.value}-${selectMonth.value}`);
		});
	}
	let accordWithType;
	if (index.value != 0 && accordWithYearMonth) {
		accordWithType = accordWithYearMonth.filter(item => { // 判断金额正负
			return index.value == 1 ? item.amount > 0 : item.amount < 0;
		});
	}

	return ultimatelyData;
});

// 临时假数据
const integralDetails = ref([
	{ description: '会员充值赠送积分', amount: -100, date: '2022-06-22 15:33:44' },
	{ description: '分销佣金提现', amount: -100, date: '2023-07-22 15:33:44' },
	{ description: '新人红包奖励', amount: 100, date: '2023-08-22 15:33:44' },
	{ description: '购物返利', amount: 50, date: '2024-10-23 10:20:30' },
	{ description: '签到奖励', amount: 10, date: '2024-10-24 08:15:00' },
	{ description: '活动奖励', amount: 200, date: '2025-11-25 12:00:00' },
	{ description: '退款扣除积分', amount: -50, date: '2025-12-26 14:45:00' },
	{ description: '积分兑换商品', amount: -150, date: '2026-01-27 16:30:00' }
]);

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
	// console.log(e)
	//获得对象的 detail的 value
	//通过数组的下标改变显示在页面的值
	// console.log(e.detail.value[0], e.detail.value[1]) // 返回521 10  => 2021年11月
	yearsIndex1.value = e.detail.value[0];
	yearsIndex2.value = e.detail.value[1];
	// 年 取后两位
	selectYear.value = e.detail.value[0] % 100;
	// 月 +1
	selectMonth.value = e.detail.value[1] + 1;
}
function bindPickerChange(e) {
	console.log('picker发送选择改变，携带值为', e.detail.value)
	index.value = e.detail.value
}

</script>

<style lang="scss" scoped>
.integral_detail_container {
	min-height: 100vh;
	background-color: #f4f6fa;

	.integral_detail_picker_box {
		height: 97rpx;
		display: flex;
		justify-content: space-between;
		padding: 0 30rpx;
	}

	.integral_detail_list_box {
		padding: 0 30rpx;
		background-color: #fff;

		.integral_detail_list_item {
			padding: 25rpx 0;
			border-bottom: 1rpx dashed #e6e6e6;

			// 最后一项
			&:last-child {
				border-bottom: none;
			}
		}
	}
}
</style>
