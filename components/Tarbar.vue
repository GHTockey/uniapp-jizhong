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
import { useTarbarStore } from "@/stores/tarbar.js";
import { storeToRefs } from "pinia";

const systemStore = useSystemStore();
const tarbarStore = useTarbarStore();

const { list, selectedIndex } = storeToRefs(tarbarStore)

async function selectTab(index) {
	// console.log(list.value[index].path);
	if (selectedIndex.value == index) return;
	try {
		await uni.navigateTo({ url: '/' + list.value[index].path })
		selectedIndex.value = index
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

<style lang="less">
// ios 底部的导航条
.ios-bottom {
	padding-bottom: env(safe-area-inset-bottom) !important;
}

.tabbar {
	// height: 95.83rpx;
	background: #ffffff;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: #fff;
	border-top: 1px solid #eaeaea;
	padding: 16rpx 0;
	// padding-top: 16rpx;
	// padding-bottom: 16rpx;
	// box-sizing: border-box;

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
				color: red;
				/* 高亮颜色 */
			}
		}
	}
}
</style>