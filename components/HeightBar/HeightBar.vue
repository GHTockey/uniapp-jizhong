<template>
	<view>
		<!-- 设备状态栏高度 -->
		<view :style="{ height: getStatusBarHeight() + 'px' }"></view>
		<!-- 小程序胶囊栏高度 -->
		<view v-if="appendTitleBar" :style="{ height: getTitleBarHeight() + 'px' }"></view>
		<!-- navbar高度 -->
		<view v-if="appendNavBar" class="navbar-height"></view>
	</view>
</template>

<script setup>
import { getTitleBarHeight, getStatusBarHeight } from '@/utils';


const props = defineProps({
	// 是否追加小程序胶囊栏高度
	appendTitleBar: {
		type: Boolean,
		default: false
	},
	// 是否追加标题栏高度
	appendNavBar: {
		type: Boolean,
		default: false
	}
})
</script>

<style lang="scss">
.navbar-height {
	height: $nav-height;
}
</style>
