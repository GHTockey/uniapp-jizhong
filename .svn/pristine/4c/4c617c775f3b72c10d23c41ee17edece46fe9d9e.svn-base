<template>
	<view class="present_card_container">
		<!-- tabs -->
		<view class="present_card_tabs">
			<view class="present_card_tabs_item" :class="{ active: tabsIndex == index }" @click="tabsIndex = index"
				v-for="(item, index) in tabsList" :key="index">
				<text>{{ item }}</text>
			</view>
		</view>

		<!-- 卡片列表 -->
		<view class="present_card_list">
			<view class="present_card_item" v-for="(item, index) in currentItemList" :key="index">
				<!-- 图片 -->
				<image class="w-full rounded-md" src="../../static/images/present_item.png" mode="widthFix"></image>
				<!-- 文字 -->
				<view class="flex flex-col gap-[10rpx] mt-[20rpx]">
					<text class="text-[29rpx] line-clamp-1">{{ item.title }}</text>
					<text class="text-[22rpx] text-[#696969]">有效期：{{ item.time }}</text>
				</view>
				<!-- 按钮 -->
				<view class="flex justify-between mt-[25rpx]">
					<view class="tce_empty_btn text-[24rpx]">{{ item.card_text }}</view>
					<view class="flex gap-[20rpx]">
						<template v-if="item.is_used == 0">
							<view class="tce_theme_btn text-[24rpx]" @click="toPage('/pages/mine/presentSend')">赠送朋友</view>
							<view class="tce_theme_empty_btn text-[24rpx]" @click="toPage('/pages/mine/presentActivate')">立即使用</view>
						</template>
						<template v-else-if="item.is_used == 1">
							<view class="tce_theme_disabled_btn text-[24rpx]">已使用</view>
						</template>
						<template v-else-if="item.is_used == 2">
							<view class="tce_theme_disabled_btn text-[24rpx]">已过期</view>
						</template>
					</view>
				</view>
			</view>
		</view>


		<!-- 底部TabBar -->
		<TabBar v-model:selectedIndex="selectedIndex" class="fixed-bottom" />
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { toPage } from '@/utils';

const selectedIndex = ref(1) // 底部TabBar的选中项
const tabsList = ref(['全部', '待使用', '已使用', '已过期']) // 顶部tabs的列表
const tabsIndex = ref(0) // 顶部tabs的选中项
const itemListData = ref([]) // 卡片列表的数据
itemListData.value = [
	{
		img: '../../static/images/present_item.png',
		card_text: '礼品卡',
		title: '2025新春礼品卡2025新春礼品卡2025新春礼2025新春礼品卡2025新春礼品卡2025新春礼',
		time: '2024-08-09 14:56:45 至 2024-08-09 14:56:45',
		is_used: 0, // 0: 未使用 1: 已使用 2: 已过期
	},
	{
		img: '../../static/images/present_item.png',
		card_text: '礼品卡',
		title: '2024中秋礼品卡2024中秋礼品卡2024中秋礼2024中秋礼品卡2024中秋礼品卡2024中秋礼',
		time: '2023-09-21 10:00:00 至 2023-09-21 10:00:00',
		is_used: 1, // 0: 未使用 1: 已使用 2: 已过期
	},
	{
		img: '../../static/images/present_item.png',
		card_text: '储值卡',
		title: '2023端午礼品卡2023端午礼品卡2023端午礼2023端午礼品卡2023端午礼品卡2023端午礼',
		time: '2023-06-14 08:00:00 至 2023-06-14 08:00:00',
		is_used: 2, // 0: 未使用 1: 已使用 2: 已过期
	},
	{
		img: '../../static/images/present_item.png',
		card_text: '储值卡',
		title: '2022春节礼品卡2022春节礼品卡2022春节礼2022春节礼品卡2022春节礼品卡2022春节礼',
		time: '2022-02-01 12:00:00 至 2022-02-01 12:00:00',
		is_used: 0, // 0: 未使用 1: 已使用 2: 已过期
	},
]

// 计算属性：根据tabsIndex和itemListData计算出当前显示的卡片列表
const currentItemList = computed(() => {
	return itemListData.value.filter(item => {
		return tabsIndex.value === 0 || item.is_used === tabsIndex.value - 1
	})
})
</script>

<style scoped lang="scss">
.present_card_container {
	background-color: #f6f8fe;
	min-height: calc(100vh - $nav-height);
	// padding-top 对应 tabs 的高度
	padding-top: 85rpx;
	// padding-bottom 对应 tabbar 的高度
	padding-bottom: $tabbar-height;

	.present_card_tabs {
		height: 85rpx;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-around;
		position: fixed;
		top: $nav-height;
		left: 0;
		right: 0;
		z-index: 100;


		.present_card_tabs_item {}

		.present_card_tabs_item.active {
			color: #FF0000;
			font-weight: bold;
		}
	}

	.present_card_list {
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		gap: 30rpx;

		.present_card_item {
			padding: 30rpx;
			// border: 1rpx solid red;
			background: #ffffff;
			border-radius: 13.89rpx;
			box-shadow: 0rpx 0rpx 4.17rpx 0rpx rgba(0, 0, 0, 0.05);
		}
	}
}
</style>
