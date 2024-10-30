<template>
	<view class="introproduct_detail_container">
		<image v-if="!is_show_bar_title" class="img_home_bg"
			src="https://saas.jizhongkeji.com/static/jzkj/images/img_home_bg.png"></image>

		<view v-if="!is_show_bar_title"
			:style="`padding-top:${statusBarHeight}px;height:${navHeight}px;display: flex;align-items: center;color: #000;z-index: 109;position: fixed;`">
			<image @tap="to_upage" style="z-index: 99;width: 50rpx;height: 50rpx;"
				src="https://saas.jizhongkeji.com/static/jzkj/images/arraw_left.png"></image>
		</view>

		<NavBar class="!justify-start" title="" showBack
			:class="`bar_title ${has_bar_title_color ? 'bar_title_color' : ''} ${is_show_bar_title ? '' : 'bar_title_none'}`"
			v-if="is_show_bar_title">
		</NavBar>

		<view :style="`height: ${statusBarHeight + navHeight + 80}rpx;`"></view>


		<view class="product_area">
			<!-- <import src="../../wxParse/wxParse.wxml" /> -->

			<view class="section product_detail">
				<view style="font-weight: 700;">{{ product?.name }}</view>

				<view class="click_count">
					<view>{{ product?.update_time }}</view>
					<view>{{ product?.click_count }}阅读</view>
				</view>

				<!-- 富文本 -->
				<!-- <view class="wxParse">
					<template is="wxParse" data="{{wxParseData:detail_content.nodes}}" />
				</view> -->
				<view class="w-full">
					<view v-html="product?.detail"></view>
				</view>
				<!-- <rich-text :nodes="product?.detail"></rich-text> -->
			</view>
		</view>

		<!-- 可拖动图标 -->
		<movable-area v-if="goods_list.length > 0">
			<movable-view v-if="!is_open_product" :x="x" :y="y" direction="all" inertia='true' animation>
				<view @click="open_product" class="online_service">
					<view class="online_service_text">链接同款</view>
				</view>
			</movable-view>
		</movable-area>


		<view v-if="is_open_product && goods_list.length > 0"
			style="max-width: 414rpx;height: 250rpx;position: fixed;right:0;bottom:340rpx;z-index: 9999;"
			direction="all" inertia='true' animation>
			<view class="product_list_box">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view class="online_service_text" style="writing-mode:initial">链接同款</view>

					<view style="display: flex;align-items: center;margin-left: 10rpx;" @click="close_product">
						<view style="font-size: 22rpx;color: #FFFFFF;font-weight: 400;">隐藏</view>
						<image style="width: 22rpx;height: 22rpx;margin-left: 5rpx;"
							src="https://saas.jizhongkeji.com/static/jzkj/images/close_btn.png"></image>
					</view>
				</view>


				<view class="nav_list scrollable" style="overflow-x:scroll">
					<!-- <navigator hover-class="none" url="/pages/product/detail?id={{item.id}}"> -->
					<image @click="to_detail_product(item.id)" v-for=" (item, index) in goods_list" :key="index"
						mode="scaleToFill"
						style="border-radius: 10rpx;flex:none;width: 153rpx;height: 153rpx;margin-right: 15rpx;"
						:src="item.image_uri"></image>
				</view>

			</view>
		</view>

	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad, onShow, onShareAppMessage, onPageScroll, onShareTimeline } from '@dcloudio/uni-app';
import { request } from '@/utils/request.js';

// 头部标题是否有白色背景
const has_bar_title_color = ref(false)
const is_show_bar_title = ref(false)
const statusBarHeight = ref(uni.getSystemInfoSync()['statusBarHeight'])
const navHeight = ref(uni.getSystemInfoSync()['statusBarHeight'] || 40)

const product_id = ref(0)

const x = ref(750)
const y = ref(450)
const is_open_product = ref(true)

const is_loading = ref(false) // 是否加载中
const product = ref(null) // 产品
const goods_list = ref([])

onLoad(options => {
	// 在组件实例进入页面节点树时执行
	const menuButtonRect = uni.getMenuButtonBoundingClientRect?.()
	if (menuButtonRect) {
		navHeight.value = (menuButtonRect.top - statusBarHeight.value) * 2 + menuButtonRect.height
		console.log('navHeight', navHeight);
	}
	product_id.value = options.id;
})
onShow(() => {
	goods_detail_v2()
})
// 分享给朋友
onShareAppMessage(() => {
	return {
		title: product.value.name,
		path: 'pages/index/introproduct_detail?id=' + product.value.id,
		imageUrl: product.value.image_uri
	}
})
// 页面滚动
onPageScroll(e => {
	// console.log('onPageScroll', e);
	// 页面像下滚动了
	if (e.scrollTop > 50) {
		// 让页面标题有白色背景
		has_bar_title_color.value = true
		is_show_bar_title.value = true
	} else {
		// 让页面标题去掉白色背景
		has_bar_title_color.value = false
		is_show_bar_title.value = false
	}
})
// 分享朋友圈
onShareTimeline(() => {
	return {
		title: product.value.name,
		path: 'pages/index/introproduct_detail?id=' + product.value.id,
		imageUrl: product.value.image_uri
	}
})

function open_product() {
	is_open_product.value = true
}
function close_product() {
	is_open_product.value = false
}

function to_detail_product(detailid) {
	uni.navigateTo({
		url: '/pages/product/detail?id=' + detailid,
	})
}

async function goods_detail_v2() {
	let res = await request('/WxAppCustomer/introproduct_detail', 'post', { id: product_id.value })
	if (res.code != 0) return uni.showToast({ title: res.msg, icon: 'none' })
	product.value = res.data.detail
	goods_list.value = res.data.goods_list
	is_loading.value = true
}

function to_upage() {
	// this.navigateBack()
	console.log('to_upage');
	uni.navigateBack()
}
</script>

<style>
/* @import "/pages/product/detail.wxss"; */
@import "../../static/styles/detailOld.css";

.img_home_bg {
	position: fixed;
	top: 0;
	width: 100%;
	height: 380rpx;
	z-index: 0;
}


.bar_title_color {
	background-color: #ffffff;
	color: #000000;
}

.has_backgord {
	background-color: #ffffff;
}

.bar_title_none {
	display: none;
}

.customNavigation {
	position: fixed;
	top: 0;
	z-index: 9999;
	width: 100%;
	display: flex;
	align-items: center;
}


.product_area {
	position: relative;
	z-index: 99;
	padding-bottom: 100rpx;
}

.wxParse {
	font-size: 30rpx;
	color: #000000;
}


.product_detail {
	background-color: unset;
	margin-bottom: 18rpx;
	box-sizing: border-box;
	padding: 0rpx 30rpx;
}

.section {
	background-color: unset;
}

.click_count {
	display: flex;
	justify-content: space-between;
	width: 100%;
	font-size: 25rpx;
	color: #999999;
	border-bottom: 1rpx solid #EDEDED;
	padding-top: 30rpx;
	padding-bottom: 25rpx;
	margin-bottom: 15rpx;
}

movable-area {
	position: fixed;
	left: 0;
	top: 0;
	height: 100vh;
	width: 100vw;
	z-index: 99999;
	pointer-events: none;
}

movable-view {
	min-width: 74rpx;
	min-height: 208rpx;
	pointer-events: auto;
}

.online_service {
	background-color: none;
	width: 100%;
	height: 100%;
	padding: 0rpx;
	margin: 0rpx;
	border: none;
	position: relative;
	/* border-radius: 50%; */
}

.online_service {
	width: 100%;
	height: 100%;
	z-index: 999;
	/* transform: scale(1.3); */
	background-image: linear-gradient(to bottom, #FF3C56, #FF1E77);
	border-top-left-radius: 16rpx;
	border-bottom-left-radius: 16rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.product_list_box {
	display: flex;
	flex-direction: column;
	background-image: linear-gradient(to bottom, #FF3C56, #FF1E77);
	border-top-left-radius: 16rpx;
	border-bottom-left-radius: 16rpx;
	box-sizing: border-box;
	padding: 20rpx;
	justify-content: space-between;
	width: 100%;
	height: 100%;
}

.online_service_text {
	/** 文本1 */
	font-size: 29rpx;
	font-weight: 700;
	color: #FFFFFF;
	writing-mode: vertical-rl;
}

.nav_list {
	display: flex;
	align-items: center;
	width: 100%;
	overflow-x: auto;
	box-sizing: border-box;
}

.scrollable {
	-webkit-overflow-scrolling: touch;
	overflow-y: auto;
	scrollbar-width: none;
	-ms-overflow-style: none;
}

.scrollable::-webkit-scrollbar {
	display: none;
}
</style>
