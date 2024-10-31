<template>
	<view>
		<!-- 设备状态栏高度 -->
		<view :style="{ height: getStatusBarHeight() + 'px' }"></view>
		<!-- 小程序胶囊栏高度 -->
		<view :style="{ height: getTitleBarHeight() + 'px' }"></view>
		<!-- navbar高度 -->
		<!-- <view :style="{ height: getNavBarHeight() + 'px' }"></view> -->
	</view>
</template>

<script setup>
import { getTitleBarHeight, getStatusBarHeight } from '@/utils';
</script>

<style lang="scss"></style>