<template>
	<view class="promot_container">
		<view class="news_content" v-if="is_loading">

			<view class="content" v-if="promot.detail_context">
				<template v-for="fuwenben in promot.about" :key="fuwenben.id">
					<rich-text @click="on_tap_rich_text(promot.about)" @longpress="on_tap_rich_text"
						v-if="fuwenben.content_type=='rich_text'" :nodes="fuwenben.content"></rich-text>
				</template>
			</view>

			<view class="kong" v-if="!promot.detail_context">
				<image lazy-load="true" src="https://saas.jizhongkeji.com/static/jzkj/images/kong.png" mode="widthFix" />
				<text>暂无内容</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { request } from '@/utils/request.js';
import { onLoad } from '@dcloudio/uni-app';

const promot = ref();
const is_loading = ref(false);


onLoad(options => {
	promot_about();
})

//点击预览图片,放大预览
function on_tap_rich_text(name) {
	console.log(name);
	let imgs = [] //把详情页面所有图片放在一个数组中
	// var name = e.currentTarget.dataset.name;

	console.log('00000000000', name, promot.value[name]);

	promot.value[name].forEach((m) => {
		console.log("mmmmm", m);
		if (m.content_type == "rich_text") { //如果详情内容是富文本，则遍历富文本中content中的每一个元素
			m.content.forEach((m2) => {
				console.log("mmmm2", m2);
				find_imgs(m2, imgs) //调用函数，把查找到的图片添加到imgs数组中
			})
		}
	})
	console.log("imgs", imgs);
	// let currentUrl = e.currentTarget.dataset.src
	if (imgs.length > 0) { //如果图片多余1张，则可以左右滑动查看(一张的时候左右滑不动)
		uni.previewImage({
			current: imgs[0], // 当前显示图片的为数组的第一张
			urls: imgs // 需要预览的图片http链接列表

		})
	}

	// console.log('4444', this.data.notice_list_show);
}
// 查找图片
function find_imgs(node, imgs) { //node是自定义节点，表示node下面的imgs
	if (node.name == "img") {
		imgs.push(node.attrs.src) //把查找到的图片放进imgs数组中
	}
	if (node.children) { //判断node下面有没有children，有的话接着遍历children里面的children去找img
		node.children.forEach((m) => {
			find_imgs(m, imgs) //调用查找函数，把得到的图片放进数组中
		})
	}
}

async function promot_about() {
	try {
		let res = await request('/WxAppCustomer/promot', 'post', {});
		// 更新数据
		if (res.code == 0) {
			promot.value = res.data.promot;
			is_loading.value = true;

		} else {
			uni.navigateBack();
			uni.showToast({
				title: res.msg,
				icon: 'none',
				mask: true
			})
		}
	} catch (error) {
		uni.showToast({
			title: '加载数据失败',
			icon: 'none'
		})
	}
}
</script>

<style>
page {
	/* background-color: #F6F7F9; */
	background-color: #ffffff;
	padding: 0;
}

.news_content {
	width: 100%;
	box-sizing: border-box;
	padding: 35rpx 29rpx;
	margin-top: 21rpx;
	background-color: #ffffff;
}

.news_info>text {
	display: block;
	width: 100%;
	font-size: 31rpx;
	color: #121212;
	font-weight: bold;
	letter-spacing: 2rpx;
}

.data {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 25rpx;
	font-family: PingFang SC;
	font-weight: 400;
	line-height: 39rpx;
	color: #7F8389;
	margin-top: 30rpx;
	padding-bottom: 25rpx;
	border-bottom: 1px solid #f4f4f4;
	letter-spacing: 1rpx;
}

.content {
	box-sizing: border-box;
	padding-top: 20rpx;
}

rich-text {
	max-width: 100%;
	color: #0D0D0D;
	/* letter-spacing: 3rpx; */
	text-align: justify;
	line-height: 1.5;
	font-size: 28rpx;
}

rich-text .img {
	max-width: 100%;
}

.fav {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	width: 320rpx;
	height: 70rpx;
	background-color: #FA5251;
	font-size: 30rpx;
	color: #ffffff;
	border-radius: 8rpx;
	margin-top: 50rpx;
	margin-bottom: 35rpx;
}

.fav image {
	width: 35rpx;
	height: 0;
	margin-right: 10rpx;
}

.fav_info {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.fav_number {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #B3B3B3;
	font-size: 24rpx;
	width: 100%;
	padding-top: 1em;
}

.fav_number text {
	color: #607CB8;
	margin-right: 5rpx;
}

.image_list {
	width: 100%;
	box-sizing: border-box;
	padding: 0 59rpx;
	display: flex;
	flex-wrap: wrap;
	margin-top: 30rpx;
	justify-content: center;
}

.image_list image:nth-child(8n) {
	margin-right: 0;
}

.image_list image {
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	margin-right: 15rpx;
	margin-bottom: 20rpx;
}

.xian {
	position: absolute;
	top: 50%;
	width: 400rpx;
	height: 1rpx;
	background-color: #E0E0E0;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
}

.dianzan_renshu {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateY(-50%) translateX(-50%);
	background-color: #FFFFFF;
	padding: 0 0.8em;
	color: #B3B3B3;
}

.news_content {
	width: 100%;
	box-sizing: border-box;
	padding: 0rpx 29rpx;
	padding-bottom: 100rpx;
	margin-top: 0rpx;
	background-color: #ffffff;
	text-align: justify;
}
</style>
