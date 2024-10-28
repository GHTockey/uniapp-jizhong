<template>
	<view class="present_records_container">
		<!-- tabs -->
		<view class="present_records_tabs">
			<view class="present_records_tabs_item" :class="{ active: currentTabIndex == 0 }"
				@click="currentTabIndex = 0">
				<text>全部</text>
			</view>
			<view class="present_records_tabs_item" :class="{ active: currentTabIndex == 1 }"
				@click="currentTabIndex = 1">
				<text>待支付</text>
			</view>
			<view class="present_records_tabs_item" :class="{ active: currentTabIndex == 2 }"
				@click="currentTabIndex = 2">
				<text>已完成</text>
			</view>
			<view class="present_records_tabs_item" :class="{ active: currentTabIndex == 3 }"
				@click="currentTabIndex = 3">
				<text>已关闭</text>
			</view>
		</view>

		<!-- 列表 -->
		<view class="present_records_list">
			<view class="present_records_item" v-for="item in filteredRecords" :key="item.id">
				<!-- header -->
				<view class="flex items-center justify-between">
					<view class="flex items-center gap-2">
						<image class="w-[40rpx] h-[27rpx]"
							:src="`../../static/icon/${item.type ? 'chuzhi' : 'lipin'}-card.svg`" mode="widthFix">
						</image>
						<text class="text-[27rpx]">{{ getTypeName(item.type) }}</text>
					</view>
					<text class="text-[22rpx] text-[#696969]">{{ getStatusName(item.status) }}</text>
				</view>
				<!-- 卡片信息 -->
				<view class="present_records_item_card_info">
					<image class="w-[237.5rpx] h-[160rpx] rounded-[14rpx]" :src="item.image" mode="widthFix">
					</image>
					<view class="flex-1">
						<text class="line-clamp-2 text-[27rpx]">{{ item.description }}</text>
					</view>
					<view class="flex flex-col items-end gap-2 text-[22rpx] text-[#696969]">
						<text>￥{{ item.price }}</text>
						<text>x{{ item.quantity }}</text>
					</view>
				</view>
				<!-- 其它 -->
				<view class="flex items-center justify-between mt-[25rpx] text-[23rpx] text-[#696969]">
					<template v-if="item.status == 0">
						<view>
							<text>2024-08-0914:56:45提交,</text>
							<text class="text-[#FF0000]">{{ item.closingTime }}</text>
							<text>后将关闭</text>
						</view>
						<!-- 立即付款按钮 -->
						<view class="tce_theme_empty_btn !py-[5rpx]">
							<text>立即付款</text>
						</view>
					</template>
					<template v-else>
						<text>{{ item.date }}</text>
						<text>￥{{ item.total }}</text>
					</template>
				</view>
			</view>
		</view>

		<!-- 列表 -->
		<view class="present_records_list" v-if="false">
			<view class="present_records_item">
				<!-- header -->
				<view class="flex items-center justify-between">
					<view class="flex items-center gap-2">
						<image class="w-[40rpx] h-[27rpx]" src="../../static/icon/lipin-card.svg" mode="widthFix">
						</image>
						<text class="text-[27rpx]">礼品卡</text>
					</view>
					<text class="text-[22rpx] text-[#696969]">已关闭</text>
				</view>
				<!-- 卡片信息 -->
				<view class="present_records_item_card_info">
					<image class="w-[237.5rpx] h-[160rpx] rounded-[14rpx]" src="../../static/images/present_item.png"
						mode="widthFix">
					</image>
					<view class="flex-1">
						<text
							class="line-clamp-2 text-[27rpx]">2025新春礼品卡2025新春礼品卡2025新春礼2025新春礼品卡2025新春礼品卡2025新春礼</text>
					</view>
					<view class="flex flex-col items-end gap-2 text-[22rpx] text-[#696969]">
						<text>￥180</text>
						<text>x2</text>
					</view>
				</view>
				<!-- 其它 -->
				<view class="flex items-center justify-between mt-[25rpx] text-[23rpx] text-[#696969]">
					<text>2024-08-09 14:56:45</text>
					<text>￥360</text>
				</view>
			</view>
			<view class="present_records_item">
				<!-- header -->
				<view class="flex items-center justify-between">
					<view class="flex items-center gap-2">
						<image class="w-[40rpx] h-[27rpx]" src="../../static/icon/chuzhi-card.svg" mode="widthFix">
						</image>
						<text class="text-[27rpx]">储值卡</text>
					</view>
					<text class="text-[22rpx] text-[#696969]">已完成</text>
				</view>
				<!-- 卡片信息 -->
				<view class="present_records_item_card_info">
					<image class="w-[237.5rpx] h-[160rpx] rounded-[14rpx]" src="../../static/images/present_item.png"
						mode="widthFix">
					</image>
					<view class="flex-1">
						<text
							class="line-clamp-2 text-[27rpx]">2025新春礼品卡2025新春礼品卡2025新春礼2025新春礼品卡2025新春礼品卡2025新春礼</text>
					</view>
					<view class="flex flex-col items-end gap-2 text-[22rpx] text-[#696969]">
						<text>￥180</text>
						<text>x2</text>
					</view>
				</view>
				<!-- 其它 -->
				<view class="flex items-center justify-between mt-[25rpx] text-[23rpx] text-[#696969]">
					<text>2024-08-09 14:56:45</text>
					<text>￥360</text>
				</view>
			</view>
			<view class="present_records_item">
				<!-- header -->
				<view class="flex items-center justify-between">
					<view class="flex items-center gap-2">
						<image class="w-[40rpx] h-[27rpx]" src="../../static/icon/lipin-card.svg" mode="widthFix">
						</image>
						<text class="text-[27rpx]">礼品卡</text>
					</view>
					<text class="text-[22rpx] text-[#696969]">待支付</text>
				</view>
				<!-- 卡片信息 -->
				<view class="present_records_item_card_info">
					<image class="w-[237.5rpx] h-[160rpx] rounded-[14rpx]" src="../../static/images/present_item.png"
						mode="widthFix">
					</image>
					<view class="flex-1">
						<text
							class="line-clamp-2 text-[27rpx]">2025新春礼品卡2025新春礼品卡2025新春礼2025新春礼品卡2025新春礼品卡2025新春礼</text>
					</view>
					<view class="flex flex-col items-end gap-2 text-[22rpx] text-[#696969]">
						<text>￥180</text>
						<text>x2</text>
					</view>
				</view>
				<!-- 其它 -->
				<view class="flex items-center justify-between mt-[25rpx] text-[23rpx] text-[#989898]">
					<view>
						<text>2024-08-0914:56:45提交,</text>
						<text class="text-[#FF0000]">23:59:00</text>
						<text>后将关闭</text>
					</view>
					<!-- 立即付款按钮 -->
					<view class="tce_theme_empty_btn !py-[5rpx]">
						<text>立即付款</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';

const currentTabIndex = ref(0); // 当前选中tab的索引
// 定义卡片类型常量
const TYPE_GIFT_CARD = 0; // 礼品卡
const TYPE_STORE_CARD = 1; // 储值卡

// 定义状态类型常量
const STATUS_PENDING = 0; // 待支付
const STATUS_COMPLETED = 1; // 已完成
const STATUS_CLOSED = 2; // 已关闭

// 计算属性：根据当前选中tab的索引，过滤出对应状态的记录
const filteredRecords = computed(() => {
	// 0 全部 1 待支付 2 已完成 3 已关闭
	if (currentTabIndex.value == 0) {
		return records.value;
	} else if (currentTabIndex.value == 1) {
		return records.value.filter(item => item.status == STATUS_PENDING);
	} else if (currentTabIndex.value == 2) {
		return records.value.filter(item => item.status == STATUS_COMPLETED);
	} else if (currentTabIndex.value == 3) {
		return records.value.filter(item => item.status == STATUS_CLOSED);
	}
});

// 定义临时数据
const records = ref([
	{
		type: TYPE_GIFT_CARD, // 礼品卡
		status: STATUS_CLOSED, // 已关闭
		image: '../../static/images/present_item.png',
		description: '2025新春礼品卡2025新春礼品卡2025新春礼2025新春礼品卡2025新春礼品卡2025新春礼',
		price: 180,
		quantity: 2,
		date: '2024-08-09 14:56:45',
		total: 360
	},
	{
		type: TYPE_STORE_CARD, // 储值卡
		status: STATUS_COMPLETED, // 已完成
		image: '../../static/images/present_item.png',
		description: '2025新春礼品卡2025新春礼品卡2025新春礼2025新春礼品卡2025新春礼品卡2025新春礼',
		price: 180,
		quantity: 2,
		date: '2024-08-09 14:56:45',
		total: 360
	},
	{
		type: TYPE_GIFT_CARD, // 礼品卡
		status: STATUS_PENDING, // 待支付
		image: '../../static/images/present_item.png',
		description: '2025新春礼品卡2025新春礼品卡2025新春礼2025新春礼品卡2025新春礼品卡2025新春礼',
		price: 180,
		quantity: 2,
		date: '2024-08-09 14:56:45',
		total: 360,
		closingTime: '23:59:00'
	}
]);

// 用于显示卡片类型的函数
function getTypeName(type) {
	switch (type) {
		case TYPE_GIFT_CARD:
			return '礼品卡';
		case TYPE_STORE_CARD:
			return '储值卡';
		default:
			return '未知类型';
	}
}

// 用于显示状态类型的函数
function getStatusName(status) {
	switch (status) {
		case STATUS_PENDING:
			return '待支付';
		case STATUS_COMPLETED:
			return '已完成';
		case STATUS_CLOSED:
			return '已关闭';
		default:
			return '未知状态';
	}
}
</script>

<style scoped lang="scss">
.present_records_container {
	height: calc(100vh - $nav-height);
	background-color: #f6f8fe;

	.present_records_tabs {
		height: 83rpx;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: space-around;

		.present_records_tabs_item.active {
			color: #FF0000;
			font-weight: bold;
		}
	}

	.present_records_list {
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		gap: 30rpx;

		.present_records_item {
			background-color: white;
			border-radius: 13.89rpx;
			padding: 30rpx;
			box-shadow: 0rpx 0rpx 4.17rpx 0rpx rgba(0, 0, 0, 0.05);


			.present_records_item_card_info {
				display: flex;
				gap: 25rpx;
				margin-top: 25rpx;
			}
		}
	}



}
</style>
