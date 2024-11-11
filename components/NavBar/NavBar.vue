<template>
	<view class="nav-bar-container"
		:style="{ paddingTop: getStatusBarHeight() + 'px', backgroundColor: bgc || '#FFFFFF' }">
		<!-- 返回按钮 -->
		<view class="nav-bar-back" v-if="showBack" @click="goBack">
			<image
				:src="isWhite ? 'https://saas.jizhongkeji.com/static/jzkj/static/icon/left-white-icon.svg' : 'https://saas.jizhongkeji.com/static/jzkj/static/icon/left-black-icon.svg'"
				style="width: 30rpx; height: 30rpx;" />
		</view>
		<!-- 标题 -->
		<template v-if="!showSearch">
			<slot name="title">
				<view class="nav-bar-title">{{ title }}</view>
			</slot>
		</template>


		<!-- 搜索栏 -->
		<view class="search_box flex_row_space_ar" v-if="showSearch">
			<view class="search_input_box">
				<image lazy-load class="search_icon" src="https://saas.jizhongkeji.com/static/jzkj/images/search.png"
					mode="aspectFit" v-if="!search_str || search_str.length == 0" />
				<input hold-keyboard="true" class="search_input" @click="toPage(searchPath)" confirm-type="search"
					type="text" placeholder="搜索商品" placeholder-class="input_placeholder_class" v-model="search_str" />
			</view>
			<!-- 小程序胶囊宽度 -->
			<view class="search_box_lable flex_row_cen_cen" :style="{ opacity: 0, width: boundingWidth + 'px' }">
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { getTitleBarHeight, getStatusBarHeight, toPage, getTitleBarWidth } from '@/utils';

const props = defineProps({
	title: {
		type: String,
		default: '标题'
	},
	isWhite: {
		type: Boolean,
		default: false
	},
	showBack: {
		type: Boolean,
		default: false
	},
	showSearch: {
		type: Boolean,
		default: false
	},
	searchPath: {
		type: String,
		default: ''
	},
	bgc: {
		type: String
	}
})

// console.log(process.env);
const search_str = ref('');
const boundingWidth = getTitleBarWidth();

// 返回
const goBack = () => {
	uni.navigateBack();
}


</script>

<style scoped lang="scss">
.nav-bar-container {
	box-sizing: content-box;
	width: 100%;
	min-height: $nav-height;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 20rpx;

	.nav-bar-back {
		position: absolute;
		left: 20rpx;
		width: 49.31rpx;
		height: 49.31rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-bar-title {
		font-size: 33.33rpx;
		font-weight: 700;
		text-align: center;
	}
}


.search_box {
	flex: none;
	background-color: #FFFFFF;
	box-sizing: border-box;
	/* padding: 0rpx 30rpx; */
	width: 100%;
	height: 100%;
	z-index: 9999;
}

.flex_row_space_ar {
	display: flex;
	flex-direction: row;

	justify-content: space-around;
	align-items: center;
	width: 100%;
}

.search_input_box {
	position: relative;
	box-sizing: border-box;
	/* width: max-content; */
	width: 100%;
	// padding-right: 90rpx;
}

.search_icon {
	position: absolute;
	top: calc(50% - 14rpx);
	left: 40rpx;
	height: 24rpx;
	width: 24rpx;
}

.search_input {
	box-sizing: border-box;
	background-color: #EFEFEF;
	border-radius: 30rpx;
	height: 60rpx;
	padding: 0rpx 10rpx;
	font-size: 28rpx;
	text-align: center;
	// width: 400rpx;
	width: calc(100% - 40rpx);
}

.search_box_lable {
	flex: none;
	color: #000000;
	height: 60rpx;
	font-size: 36rpx;
	/* max-width: max-content; */
}


.flex_row_cen_cen {
	display: flex;
	flex-direction: row;

	justify-content: center;
	align-items: center;
	width: 100%;
}
</style>
