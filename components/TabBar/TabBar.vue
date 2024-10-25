<template>
	<view class="tabbar" :class="{ 'ios-bottom': systemStore.isIos }">
		<view v-for="(item, index) in list" :key="index" class="tabbar-item" @click="selectTab(index)">
			<image
				:src="selectedIndex == index ? ('/static/' + item.selected_icon_path) : ('/static/' + item.icon_path)"
				class="tabbar-icon" />
			<!-- <image src="/static/images/init_tab4.png" class="tabbar-icon" /> -->
			<text :class="['tabbar-text', { 'active': selectedIndex == index }]">{{ item.text }}</text>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";

import { useSystemStore } from "@/stores/system.js";

const systemStore = useSystemStore();

const emit = defineEmits(['update:selectedIndex'])
const props = defineProps({
	selectedIndex: {
		type: Number,
		default: 0
	},
	list: {
		type: Array,
		default: () => [
			{
				icon_path: '/images/present-home-n.svg', selected_icon_path: '/images/present-home-a.svg',
				page_name: '首页', text: '首页',
				path: 'pages/mine/present', is_hide: 0
			},
			{
				icon_path: '/images/present-card-n.svg', selected_icon_path: '/images/present-card-a.svg',
				page_name: '卡包', text: '卡包',
				path: 'pages/mine/presentCard', is_hide: 0
			},
			{
				icon_path: '/images/present-mine-n.svg', selected_icon_path: '/images/present-mine-a.svg',
				page_name: '我的', text: '我的',
				path: 'pages/mine/presentMine', is_hide: 0
			},
		]
	}
})

const updateSelectedIndex = (index) => {
	emit('update:selectedIndex', index)
}

async function selectTab(index) {
	// console.log(list.value[index].path);
	if (props.selectedIndex == index) return;
	try {
		await uni.navigateTo({ url: '/' + props.list[index].path })
		updateSelectedIndex(index)
	} catch (error) {
		console.log(error)
		uni.showToast({
			title: '页面不存在',
			icon: 'error'
		})
	}
	// tarbarStore.getTarBarListApi()
}
</script>

<style lang="scss">
.fixed-bottom {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
}

// ios 底部的导航条
.ios-bottom {
	padding-bottom: env(safe-area-inset-bottom) !important;
}

.tabbar {
	height: $tabbar-height;
	background: #ffffff;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: #fff;
	border-top: 1px solid #eaeaea;
	padding: 16rpx 0;

	.tabbar-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		// padding: 16rpx 0;

		.tabbar-icon {
			width: 37.5rpx;
			height: 37.5rpx;
		}

		.tabbar-text {
			margin-top: 4rpx;
			color: #666;

			font-size: 19.44rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;

			&.active {
				/* 高亮颜色 */
				color: red;
			}
		}
	}
}
</style>