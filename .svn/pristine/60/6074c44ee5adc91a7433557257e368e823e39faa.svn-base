<template>
	<view class="online-search-container">
		<!-- 搜索栏 -->
		<view class="online-search-bar">
			<view class="online-search-bar-input">
				<image class="online-search-bar-input-icon"
					src="https://saas.jizhongkeji.com/static/jzkj/static/icon/search-icon-g.svg" mode="widthFix" />
				<input type="text" @input="handleSearch" v-model="searchKeyword" placeholder="输入关键词进行搜索" />
			</view>
			<view class="online-search-bar-button">
				<text>搜索</text>
			</view>
		</view>
		<!-- 搜索历史 -->
		<!-- <view v-if="searchHistory.length > 0" class="online-search-history"> -->
		<view v-if="!searchKeyword" class="online-search-history">
			<view class="online-search-history-title">
				<text class="online-search-history-title-text">搜索历史</text>
				<image @click="handleClearSearchHistory" class="online-search-history-clear"
					src="https://saas.jizhongkeji.com/static/jzkj/static/icon/del-icon.svg" />
			</view>
			<view class="online-search-history-list">
				<view class="online-search-history-item" v-for="item in searchHistory" :key="item.id">
					<text>{{ item.keyword }}</text>
				</view>
			</view>
		</view>
		<!-- 热门搜索 -->
		<view v-if="!searchKeyword" class="online-search-hot">
			<text class="online-search-hot-title">热门搜索</text>
			<view class="online-search-hot-list">
				<view class="online-search-hot-item" v-for="item in hotSearch" :key="item.id">
					<text>{{ item.keyword }}</text>
				</view>
			</view>
		</view>
		<!-- 搜索结果 -->
		<view v-if="searchKeyword" class="online-search-result">
			<!-- 空状态 -->
			<view class="online-search-result-empty">
				<image class="online-search-result-empty-icon"
					src="https://saas.jizhongkeji.com/static/jzkj/static/images/fangdajing.svg" />
				<text class="online-search-result-empty-text">没有搜到相关内容，换个关键词试试吧</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";


// 搜索关键词
const searchKeyword = ref('');
// 搜索历史
const searchHistory = ref([
	{
		id: 1,
		keyword: '苹果',
		time: '2024-02-01 12:00:00'
	},
	{
		id: 2,
		keyword: '香蕉',
		time: '2024-02-01 12:00:00'
	},
	{
		id: 3,
		keyword: '橘子',
		time: '2024-02-01 12:00:00'
	},
	{
		id: 4,
		keyword: '橘子',
		time: '2024-02-01 12:00:00'
	}
]);

// 热门搜索
const hotSearch = ref([
	{
		id: 1,
		keyword: '苹果',
		time: '2024-02-01 12:00:00'
	},
	{
		id: 2,
		keyword: '香蕉',
		time: '2024-02-01 12:00:00'
	},
	{
		id: 3,
		keyword: '橘子方式打开链接哦',
		time: '2024-02-01 12:00:00'
	},
]);


// 搜索
let debounceTimeout; // 防抖计时器
function handleSearch(event) {
	clearTimeout(debounceTimeout);
	debounceTimeout = setTimeout(() => {
		uni.showLoading({
			title: '搜索中'
		});
		setTimeout(() => {
			uni.hideLoading();
		}, 300);
		// console.log('搜索', event.detail.value);
		// console.log(searchKeyword.value);
	}, 500); // 防抖时间
}

// 搜索历史清除按钮点击事件
function handleClearSearchHistory() {
	// 弹窗
	uni.showModal({
		content: '是否确定删除所有搜索历史?',
		success: function (res) {
			if (res.confirm) {
				searchHistory.value = [];
			}
		}
	});
}


</script>

<style lang="scss">
.online-search-container {
	padding: 0 29.17rpx;
	box-sizing: border-box;
	height: calc(100vh - 100rpx);
	padding-top: 27.78rpx;

	// 搜索栏
	.online-search-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 60rpx;
		box-sizing: border-box;

		// 搜索栏输入框
		.online-search-bar-input {
			display: flex;
			align-items: center;
			flex-grow: 1;
			background-color: #f5f5f5;
			border-radius: 13.89rpx;
			padding: 18rpx 29rpx;
			display: flex;
			align-items: center;

			// 搜索图标
			.online-search-bar-input-icon {
				width: 23.61rpx;
				height: 23.61rpx;
				margin-right: 16.67rpx;
			}
		}

		// 搜索栏原生输入框
		.online-search-bar-input input {
			border: none;
			outline: none;
			background-color: transparent;
			// padding: 5px;
			flex-grow: 1;
			font-size: 25rpx;
		}

		// 搜索栏按钮
		.online-search-bar-button {
			// padding: 5px 10px;
			font-size: 29.17rpx;
			margin-left: 29.17rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			color: #3e3e3e;
			// 禁止文字换行
			white-space: nowrap;
		}
	}

	// 搜索历史
	.online-search-history {
		margin-top: 55.56rpx;

		// 搜索历史标题 bar
		.online-search-history-title {
			display: flex;
			align-items: center;
			justify-content: space-between;

			// 搜索历史标题文本
			.online-search-history-title-text {
				font-size: 29.17rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 700;
				color: #3e3e3e;
			}

			// 搜索历史清除按钮
			.online-search-history-clear {
				width: 27.78rpx;
				height: 27.78rpx;
			}
		}

		// 搜索历史列表
		.online-search-history-list {
			display: flex;
			flex-wrap: wrap;
			gap: 20rpx;
			margin-top: 27.78rpx;

			// 搜索历史列表项
			.online-search-history-item {
				background: #f0f0f0;
				border-radius: 29.86px;
				padding: 12.5rpx 19.44rpx;
				font-size: 25rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #000000;
			}
		}
	}

	// 热门搜索
	.online-search-hot {
		margin-top: 55.56rpx;

		// 热门搜索标题
		.online-search-hot-title {
			font-size: 29.17rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			color: #3e3e3e;
		}

		// 热门搜索列表
		.online-search-hot-list {
			display: flex;
			flex-wrap: wrap;
			gap: 20rpx;
			margin-top: 27.78rpx;

			// 热门搜索列表项
			.online-search-hot-item {
				background: #f0f0f0;
				border-radius: 29.86px;
				padding: 12.5rpx 19.44rpx;
				font-size: 25rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #000000;
			}
		}
	}

	// 搜索结果
	.online-search-result {


		// 搜索结果空状态
		.online-search-result-empty {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-grow: 1;
			margin-top: 128.83rpx;

			// 搜索结果空状态图标
			.online-search-result-empty-icon {
				width: 207.64rpx;
				height: 208.33rpx;
			}

			// 搜索结果空状态文本
			.online-search-result-empty-text {
				opacity: 0.9;
				font-size: 27.78rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				color: #b2b2b2;
				margin-top: 41.67rpx;
			}
		}
	}
}
</style>