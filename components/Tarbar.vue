<template>
	<view class="tabbar" :class="{'ios-bottom': systemStore.isIos}">
		<view v-for="(item, index) in list" :key="index" class="tabbar-item" @click="selectTab(index)">
			<image :src="selectedIndex === index ? item.selectedIconPath : item.iconPath" class="tabbar-icon" />
			<text :class="['tabbar-text', { 'active': selectedIndex === index }]">{{ item.text }}</text>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";
import { useSystemStore } from "@/stores/system.js"

const systemStore = useSystemStore();

const list = [
	{
		"selectedIconPath": "https://saas.jizhongkeji.com/static/jzkj/images/tab1.png",
		"iconPath": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab1.png",
		"path": "pages/index/index",
		"text": "首页"
	},
	{
		"selectedIconPath": "https://saas.jizhongkeji.com/static/jzkj/images/tab2.png",
		"iconPath": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab2.png",
		"path": "pages/product/menu",
		"text": "商品"
	},
	{
		"selectedIconPath": "https://saas.jizhongkeji.com/static/jzkj/images/tab3.png",
		"iconPath": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab3.png",
		"path": "pages/shopcar/shopcar",
		"text": "购物车"
	},
	{
		"selectedIconPath": "https://saas.jizhongkeji.com/static/jzkj/images/tab5.png",
		"iconPath": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab5.png",
		"path": "pages/index/introproduct",
		"text": "资讯"
	},
	{
		"selectedIconPath": "https://saas.jizhongkeji.com/static/jzkj/images/tab6.png",
		"iconPath": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab6.png",
		"path": "pages/activity/activity_list",
		"text": "活动"
	},
	{
		"selectedIconPath": "https://saas.jizhongkeji.com/static/jzkj/images/tab4.png",
		"iconPath": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab4.png",
		"path": "pages/mine/mine",
		"text": "我的"
	}
];

const selectedIndex = ref(0);

function selectTab(index) {
	selectedIndex.value = index;
	// 这里可以添加导航逻辑，例如使用路由导航到相应页面
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