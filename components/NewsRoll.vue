<template>
	<view class="news-box">
		<image src="../static/images/news.png" mode=""></image>
		<view style="overflow: hidden;">
			<view class="txt-box" :class="{ 'txt-box-animation': txtBoxAnimation }" @click="scrollNews">
				<text v-for="(item, index) in visibleNewsList" :key="item.id">{{ item.title }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const newsList = ref([
	{ id: 10, title: '热烈祝贺XX公司微信小程序上线运营！' },
	{ id: 11, title: '祝贺河南省智慧健康养老专业委员会成立' },
	{ id: 12, title: '公司年会圆满结束，感谢全体员工的努力' },
	{ id: 13, title: '新产品发布会即将举行，敬请期待' },
]);

const visibleNewsList = ref(newsList.value.slice(0, 2)); // 初始化可见新闻列表

const txtBoxAnimation = ref(false);

const scrollNews = () => {
	// console.log(txtBox.value);
	const lastIndex = newsList.value.findIndex(item => item.id == visibleNewsList.value[visibleNewsList.value.length - 1].id);
	const nextIndex = (lastIndex + 1) % newsList.value.length;
	const nextNextIndex = (lastIndex + 2) % newsList.value.length;
	visibleNewsList.value.push(newsList.value[nextIndex], newsList.value[nextNextIndex]);

	txtBoxAnimation.value = true;
	setTimeout(() => {
		// 移除前两项
		visibleNewsList.value.splice(0, 2);
		txtBoxAnimation.value = false;
	}, 500);
};

onMounted(() => {
	setInterval(scrollNews, 5000); // 3秒滚动一次
});
</script>

<style lang="less">
// 新闻滚动栏
.news-box {
	margin-top: 20rpx;
	border-radius: 14rpx;
	padding: 20rpx 28rpx;
	background-color: white;
	display: flex;
	align-items: center;

	>image {
		width: 74.31rpx;
		height: 71.53rpx;
	}

	.txt-box {
		// overflow: hidden;
		// transition: all .5s ease;
		flex: 1;
		display: flex;
		flex-direction: column;
		// align-items: center;
		// justify-content: center;
		margin-left: 18rpx;
		// 固定高度，避免内容溢出
		height: 80rpx;

		text {
			// display: block;
			height: 39rpx !important;
			width: 100%;
			font-size: 27.78rpx;
			font-weight: 400;
			text-align: left;
			color: #1b1b1b;
		}
	}
}


// txt-box动画
.txt-box-animation {
	animation: slide .5s;
}

@keyframes slide {
	0% {
		transform: translateY(0);
	}

	100% {
		transform: translateY(-72rpx); // 两行高度的和
	}
}
</style>