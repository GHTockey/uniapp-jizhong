<template>
	<!-- <view class="tabbar" :class="{ 'ios-bottom': systemStore.isIos }"> -->
	<view class="tabbar">
		<template v-if="isAppMode">
			<view v-for="(item, index) in tabbarList" :key="index" class="tabbar-item" @click="selectTab(index)">
				<image
					:src="tabbarSelectedIndex == index ? ('https://saas.jizhongkeji.com/static/jzkj/static/' + item.selected_icon_path) : ('https://saas.jizhongkeji.com/static/jzkj/static/' + item.icon_path)"
					class="tabbar-icon" />
				<!-- <image src="/static/images/init_tab4.png" class="tabbar-icon" /> -->
				<text :class="['tabbar-text', { 'active': tabbarSelectedIndex == index }]">{{ item.text }}</text>
			</view>
		</template>
		<template v-else>
			<view v-for="(item, index) in list" :key="index" class="tabbar-item" @click="selectTab(index)">
				<image
					:src="selectedIndex == index ? ('https://saas.jizhongkeji.com/static/jzkj/static/' + item.selected_icon_path) : ('https://saas.jizhongkeji.com/static/jzkj/static/' + item.icon_path)"
					class="tabbar-icon" />
				<!-- <image src="/static/images/init_tab4.png" class="tabbar-icon" /> -->
				<text :class="['tabbar-text', { 'active': selectedIndex == index }]">{{ item.text }}</text>
			</view>
		</template>
	</view>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { request } from "@/utils/request.js";
import { useSystemStore } from "@/stores/system.js";
import { useTabBarStore } from "@/stores/tabBar.js";
import { storeToRefs } from "pinia";

const systemStore = useSystemStore();
const tabBarStore = useTabBarStore();
const { list: tabbarList, selectedIndex: tabbarSelectedIndex } = storeToRefs(tabBarStore)

const emit = defineEmits(['update:selectedIndex'])
const props = defineProps({
	selectedIndex: {
		type: Number,
		default: 0
	},
	isAppMode: {
		type: Boolean,
		default: false
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

// 获取当前path
// console.log(getCurrentPages()[getCurrentPages().length - 1].route);
// watch(() => tabbarList.value, (newVal) => {
// 	// console.log('=======================================newVal', newVal);
// 	newVal.forEach((item, index) => {
// 		if (item.path == getCurrentPages()[getCurrentPages().length - 1].route) {
// 			tabBarStore.selectedIndex = index
// 			emit('update:selectedIndex', index)
// 		}
// 	})
// })

const updateSelectedIndex = (index) => {
	emit('update:selectedIndex', index)
}

async function selectTab(index) {
	if (props.isAppMode) {
		if (tabbarSelectedIndex.value == index) return;
		try {
			// await uni.navigateTo({ url: '/' + tabbarList.value[index].path })
			await uni.redirectTo({ url: '/' + tabbarList.value[index].path });
			tabbarSelectedIndex.value = index
		} catch (error) {
			console.log(error)
			uni.showToast({ title: error.errMsg, icon: 'none' })
		}
	} else {
		if (props.selectedIndex == index) return;
		try {
			// await uni.navigateTo({ url: '/' + props.list[index].path })
			await uni.redirectTo({ url: '/' + props.list[index].path });
			updateSelectedIndex(index)
		} catch (error) {
			console.log(error)
			uni.showToast({ title: error.errMsg, icon: 'none' })
		}
	}
}
</script>



<style lang="scss">
// ios 底部的导航条
.ios-bottom {
	// padding-bottom: env(safe-area-inset-bottom) !important;
	padding-bottom: Max(env(safe-area-inset-bottom), 16rpx) !important;
}

.tabbar {
	// height: $tabbar-height;
	height: 95.83rpx;
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