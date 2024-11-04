<template>
	<view class="mine_container p-[20rpx]"
		style="background-image: url('https://saas.jizhongkeji.com/static/jzkj/static/images/my-bg.svg');">
		<!-- 状态栏 + 小程序胶囊栏高度占位 -->
		<!-- <view class="status_bar" :style="{ height: `${titleBarHeight}px` }"></view> -->
		<HeightBar appendTitleBar />

		<!-- 头像昵称设置 -->
		<view class=" flex justify-between text-white my-3">
			<!-- left -->
			<view class="flex">
				<image @click="show_pop_avatar_handler" class="w-[120rpx] h-[120rpx] rounded-[50%] mr-[20rpx]"
					:src="user.wx_image" mode="aspectFill">
				</image>
				<view class="flex flex-col justify-center">
					<text class="text-[30rpx] mb-2">{{ user.user_name }}</text>
					<text class=" text-[25rpx] bg-black/30 px-[20rpx] py-[3rpx] rounded-[50rpx] opacity-65">ID:
						{{ user.id }}</text>
					<text v-if="!user.user_name" @click="edit_user_info">设置个人资料</text>
				</view>
			</view>
			<!-- right -->
			<view class="flex items-center opacity-55" @click="edit_user_info">
				<text class="mr-[10rpx]">设置</text>
				<image class="w-[33.33rpx] h-[33.33rpx]"
					src="https://saas.jizhongkeji.com/static/jzkj/static/icon/setting.svg" mode="widthFix"></image>
			</view>
		</view>

		<!-- 个人数据积分/余额/优惠券 -->
		<view class="mine_data_box flex justify-evenly items-center" @click="toPage('/pages/mine/money')">
			<view class="mine_data_item">
				<text class="mine_data_value">1000</text>
				<text class="mine_data_name">我的积分</text>
			</view>
			<view class="mine_data_item">
				<text class="mine_data_value">1000</text>
				<text class="mine_data_name">我的余额</text>
			</view>
			<view class="mine_data_item">
				<text class="mine_data_value">1000</text>
				<text class="mine_data_name">优惠券</text>
			</view>
		</view>

		<!-- 我的订单 -->
		<view class="my_order_box">
			<!-- 头部 -->
			<view class="my_order_header flex justify-between">
				<text class=" text-[28rpx]">我的订单</text>
				<view @click="toPage('/pages/mine/order')">
					<text class=" text-[25rpx] text-[#575757]">详情</text>
					<image class="w-[14rpx] h-[20rpx] ml-[10rpx]"
						src="https://saas.jizhongkeji.com/static/jzkj/static/images/next1.svg" mode="widthFix">
					</image>
				</view>
			</view>
			<!-- 按钮列表 -->
			<!-- 左右滑动版 -->
			<!-- <view class="my_order_list">
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="120">
					<view class="scroll-view-item_H" v-for="item in order_nav_list">
						<view class="flex flex-col items-center ">
							<image class="w-[42rpx] h-[42rpx]"
								:src="`https://saas.jizhongkeji.com/static/jzkj/images/order${item.nav_index * 1 + 1}.png`"></image>
							<text class="text-[24rpx] mt-[13rpx]">{{ item.name }}</text>
						</view>
					</view>
				</scroll-view>
			</view> -->
			<view class="my_order_list flex justify-around">
				<view class="" v-for="item in order_nav_list" @click="nav_to(item)">
					<view class="flex flex-col items-center ">
						<image class="w-[42rpx] h-[42rpx]"
							:src="`https://saas.jizhongkeji.com/static/jzkj/images/order${item.nav_index * 1 + 1}.png`">
						</image>
						<text class="text-[24rpx] mt-[13rpx]">{{ item.name }}</text>
					</view>
				</view>
			</view>
		</view>


		<!-- 常用工具 -->
		<view class="common_tool_box">
			<!-- 头部 -->
			<view class="common_tool_header flex justify-between">
				<text class="text-[28rpx]">常用工具</text>
			</view>
			<!-- 按钮列表 -->
			<view class="common_tool_list">
				<view class="common_tool_item" @click="toPage('/pages/mine/present')">
					<view class="w-[71.5rpx] h-[71.5rpx] flex items-center justify-center">
						<image class=" h-full w-full"
							src="https://saas.jizhongkeji.com/static/jzkj/static/icon/sm-logo.svg"></image>
					</view>
					<text class="text-[24rpx] mt-[13rpx]">礼品卡</text>
				</view>
				<view class="common_tool_item" @click="toPage('/pages/mine/address?type=edit')">
					<view class="w-[71.5rpx] h-[71.5rpx] flex items-center justify-center">
						<image class=" h-full w-full"
							src="https://saas.jizhongkeji.com/static/jzkj/static/icon/my-address.svg"></image>
					</view>
					<text class="text-[24rpx] mt-[13rpx]">收货地址</text>
				</view>

				<view class="common_tool_item" @click="toPage('/pages/mine/collect_list')">
					<view class="w-[71.5rpx] h-[71.5rpx] flex items-center justify-center">
						<image class=" h-full w-full"
							src="https://saas.jizhongkeji.com/static/jzkj/static/icon/my-sc.svg"></image>
					</view>
					<text class="text-[24rpx] mt-[13rpx]">商品收藏</text>
				</view>

				<view class="common_tool_item" @click="toPage('/pages/notify/notify')">
					<view class="w-[71.5rpx] h-[71.5rpx] flex items-center justify-center">
						<image class=" h-full w-full"
							src="https://saas.jizhongkeji.com/static/jzkj/static/icon/sm-logo.svg"></image>
					</view>
					<text class="text-[24rpx] mt-[13rpx]">消息通知</text>
				</view>
				<view class="common_tool_item" @click="toPage('/pages/notify/notifyList')">
					<view class="w-[71.5rpx] h-[71.5rpx] flex items-center justify-center">
						<image class=" h-full w-full"
							src="https://saas.jizhongkeji.com/static/jzkj/static/icon/sm-logo.svg"></image>
					</view>
					<text class="text-[24rpx] mt-[13rpx]">物流消息</text>
				</view>
				<view class="common_tool_item" @click="toPage('/pages/coupon/myCoupon')">
					<view class="w-[71.5rpx] h-[71.5rpx] flex items-center justify-center">
						<image class=" h-full w-full"
							src="https://saas.jizhongkeji.com/static/jzkj/static/icon/sm-logo.svg"></image>
					</view>
					<text class="text-[24rpx] mt-[13rpx]">优惠券</text>
				</view>

				<view class="common_tool_item" @click="toPage('/pages/test/test')">
					<view class="w-[71.5rpx] h-[71.5rpx] flex items-center justify-center">
						<image class=" h-full w-full"
							src="https://saas.jizhongkeji.com/static/jzkj/static/icon/sm-logo.svg"></image>
					</view>
					<text class="text-[24rpx] mt-[13rpx]">test</text>
				</view>

				<view class="common_tool_item" @click="open_is_image">
					<view class="w-[71.5rpx] h-[71.5rpx] flex items-center justify-center">
						<!-- <image class=" h-full w-full" src="https://saas.jizhongkeji.com/static/jzkj/static/images/wx.svg"></image> -->
						<image lazy-load style="width: 71.5rpx;"
							src="https://saas.jizhongkeji.com/static/jzkj/images/kefu_wei.png" mode="widthFix" />
					</view>
					<text class="text-[24rpx] mt-[13rpx]">微信客服</text>
				</view>

				<view class="common_tool_item" @click="makePhoneCall">
					<view class="w-[71.5rpx] h-[71.5rpx] flex items-center justify-center">
						<image class=" h-full w-full" src="https://saas.jizhongkeji.com/static/jzkj/images/gongju4.png">
						</image>
					</view>
					<text class="text-[24rpx] mt-[13rpx]">拨打电话</text>
				</view>

				<view class="common_tool_item" @click="tool_nav('/pages/mine/shopInfoList')">
					<view class="w-[71.5rpx] h-[71.5rpx] flex items-center justify-center">
						<image class=" h-full w-full" src="https://saas.jizhongkeji.com/static/jzkj/images/gongju5.png">
						</image>
					</view>
					<text class="text-[24rpx] mt-[13rpx]">线下门店</text>
				</view>

				<view class="common_tool_item" @click="tool_nav('/pages/mine/distribution_center')">
					<view class="w-[71.5rpx] h-[71.5rpx] flex items-center justify-center">
						<image class=" h-full w-full"
							src="https://saas.jizhongkeji.com/static/jzkj/images/promotion1.png"></image>
					</view>
					<text class="text-[24rpx] mt-[13rpx]">分销中心</text>
				</view>
				<view class="common_tool_item" @click="to_scan_order">
					<view class="w-[71.5rpx] h-[71.5rpx] flex items-center justify-center">
						<image class=" h-full w-full" src="https://saas.jizhongkeji.com/static/jzkj/images/tool22.png">
						</image>
					</view>
					<text class="text-[24rpx] mt-[13rpx]">核销订单</text>
				</view>
			</view>
		</view>


		<!-- 猜你喜欢 -->
		<view class="product_area">
			<!-- <image  lazy-load="{{true}}" class="image_tit" src="https://saas.jizhongkeji.com/static/jzkj/images/tuijian.png" mode="widthFix" /> -->
			<view class="nav_list" v-if="nav_list.length > 0">
				<text v-for="item in nav_list" :class="`${id == item.id ? 'active' : ''}`" @click="choose_nav(item.id)"
					:key="item.id">{{ item.name }}</text>
			</view>
			<view class="product_list" v-if="productList?.length > 0">
				<view class="product_item" v-for="(item, index) in productList" :key="index">
					<navigator hover-class="none" :url="`/pages/product/detail?id=${item.id}`">
						<image lazy-load :src="item.image_uri" mode="aspectFill" />
						<view class="product_info">
							<text class="title">{{ item.name }}</text>
							<text class="price" v-if="item.price">￥<text>{{ item.price }}</text></text>
						</view>
					</navigator>
				</view>
			</view>

			<view class="ying"></view>
		</view>


		<!-- 底部 tabbar -->
		<!-- <Tarbar class="fixed-bottom" /> -->
		<TabBar class="fixed-bottom" :isAppMode="true" />
		<!-- 授权头像/昵称 pop -->
		<PopChooseAvatar v-model="show_pop_avatar" v-if="show_pop_avatar" @submit="on_pop_avatar_submit"
			@close="on_pop_avatar_close" />
		<!-- 微信客服二维码弹窗 -->
		<view class="tc_baoming" v-if="is_image">
			<view class="image_box">
				<view style="width: 100%;display: flex;justify-content: flex-end;margin-bottom: 30rpx;">
					<image @click="close_is_image" style="width: 40rpx;height: 40rpx;margin-top: 80rpx;"
						src="https://saas.jizhongkeji.com/static/jzkj/images/wrong.png" mode="widthFix" />
				</view>
				<image :src="business.erweima_serve" show-menu-by-longpress
					style="width: 100%;height: 850rpx;border-radius: 20rpx;" mode="aspectFill"></image>

				<!-- <view style="margin-top: 10rpx;">长按识别二维码</view> -->
			</view>
		</view>
	</view>
</template>

<script setup>
import { getTitleBarHeight } from '@/utils';
import { toPage } from '@/utils';
import { ref } from 'vue';
import { useTempStore } from '@/stores/temp.js';
import { storeToRefs } from 'pinia';
import { request } from '@/utils/request.js';
import { onLoad, onShow, onReachBottom, onPageScroll } from '@dcloudio/uni-app';

// 响应式解构 business user
const { business, user } = storeToRefs(useTempStore());

const titleBarHeight = getTitleBarHeight();

const tool_list = ref([
	{ id: 1, name: "收货地址", path: "/pages/mine/address?type=edit" },
	{ id: 2, name: "商品收藏", path: "/pages/mine/collect_list" },
	{ id: 3, name: "在线客服" },
	{ id: 4, name: "拨打电话" },
	{ id: 5, name: "线下门店", path: "/pages/mine/shop_info_list" },
]);
const order_nav_list = ref([
	{ id: 1, name: "待付款", status: 1, nav_index: 1 },
	{ id: 2, name: "待发货", status: 2, nav_index: 2 },
	{ id: 3, name: "待收货", status: 4, nav_index: 3 },
	// { id: 4, name: "待评价", status: 5, nav_index: 4 },
	{ id: 5, name: "已完成", status: 8, nav_index: 4 },
	// {id: 5,name: "售后",status: 7,}
]);
const nav_list = ref([
	{ id: 0, name: '猜你喜欢' }
]);
const id = ref(0);

// 头部标题是否有白色背景
const has_bar_title_color = ref(false);

const is_show_bar_title = ref(false);
const navBarHeight = ref(uni.getSystemInfoSync().statusBarHeight + 44); //计算得出导航栏高度
const navHeight = ref(uni.getSystemInfoSync().statusBarHeight);

const show_pop_avatar = ref(false);
const tarbarupdated = ref(0);
const is_image = ref(false);

const goods_group_list = ref();
const productList = ref();
const goods_count = ref(0);


onLoad(() => {
	uni.showLoading({
		title: 'loading',
	})
})
onShow(() => {
	recommend_product()
})
onReachBottom(() => {
	if (goods_count.value > productList.value.length) {
		recommend_product(productList.value.length)
	}
})
// 监听用户滑动页面事件
onPageScroll((e) => {
	if (e.scrollTop > 100) {
		// 让页面标题有白色背景
		has_bar_title_color.value = true;
		is_show_bar_title.value = true;
	} else {
		// 让页面标题去掉白色背景
		has_bar_title_color.value = false;
		is_show_bar_title.value = false;
	}
})




function close_is_image() {
	is_image.value = false;
}
function open_is_image() {
	is_image.value = true;
}
function on_pop_avatar_submit() {
	show_pop_avatar.value = false;
	// user: getApp().globalData.user,
	// business: getApp().globalData.user.business
}


function to_application_record() {
	const pages = getCurrentPages()
	let index = pages.findIndex(item => item.route == 'pages/activity/application_record')
	if (index == -1) {
		if (business.value.id == 4) {
			uni.navigateTo({
				// url: `/pages/activity/application_record?activity_id=54&type=2`,
				url: `/pages/activity/application_record?type=2`,
			})
			return
		}

		if (business.value.id == 12) {
			uni.navigateTo({
				// url: `/pages/activity/application_record?activity_id=55&type=2`,
				url: `/pages/activity/application_record?type=2`,
			})
			return
		}

	} else {
		uni.navigateBack({
			delta: pages.length - index - 1
		})
	}
}
function show_pop_avatar_handler() {
	show_pop_avatar.value = true
}
function on_pop_avatar_close() {
	show_pop_avatar.value = false
}
// 点击填写用户资料
function edit_user_info() {
	// 用户带头像页面
	uni.navigateTo({
		// url: '/pages/index/user?form_type=edit',
		url: '/pages/mine/info_edit',
	})
}
// 打电话
function makePhoneCall() {
	var phone = business.value.phone;

	if (!phone) {
		uni.showToast({
			title: '商家未留有电话',
			icon: 'none',
		})
		return;
	}

	uni.makePhoneCall({
		phoneNumber: phone,
	})
}

function tool_nav(path) {
	if (path) {
		uni.navigateTo({
			url: path
		})
	} else {
		uni.showToast({
			title: '敬请期待',
			icon: 'none',
		})
	}
}
function nav_to(item) {
	if (item.nav_index) {
		uni.navigateTo({
			url: '/pages/mine/order?status=' + item.status + '&nav_index=' + item.nav_index,
		})
	}
}

async function recommend_product(length) {
	let goods_list = productList.value
	let goods_count_temp = 0

	let res = await request('/WxAppCustomer/recommend_product', 'post', {
		goods_group_id: id.value || '',
		offset: length || 0
	})
	// 更新数据
	if (res.code == 0) {
		// that.data.productList = res.data.data.goods_list;
		goods_group_list.value = res.data.goods_group_list;

		if (length) {
			goods_list.push.apply(goods_list, res.data.goods_list)
		} else {
			goods_list = res.data.goods_list
		}

		uni.hideLoading();
		if (res.data.goods_group_list.length > 0) {
			nav_list.value = [{
				id: 0,
				name: '猜你喜欢'
			}];

			res.data.goods_group_list.forEach(element => {
				nav_list.value.push(element)
			});
		}

		goods_count_temp = res.data.goods_count

	} else {
		uni.showToast({
			title: res.data.msg,
			icon: 'none',
			mask: true
		})
	}
	productList.value = goods_list;
	goods_count.value = goods_count_temp;
}
function choose_nav(idParam) {
	id.value = idParam;
	recommend_product()
}

function to_appoint(type) {
	uni.navigateTo({
		url: '/pages/mine/appointent?type=' + type,
	})
}
function to_scan_appoint() {
	uni.navigateTo({
		url: '/pages/mine/scan',
	})
}

function to_scan_order() {
	uni.navigateTo({
		url: '/pages/mine/scan_order',
	})
}
async function tixian(e) {
	let res = await request('/WxAppCustomer/tixian', 'post', e.detail.value);
	if (res.code == 0) {

	} else {
		uni.showToast({
			title: res.data.msg,
			icon: 'none'
		})
	}
}
</script>

<style>
.scroll-view_H {
	white-space: nowrap;
	width: 100%;
}

.scroll-view-item {
	text-align: center;
	font-size: 36rpx;
}

.scroll-view-item_H {
	display: inline-block;
	padding: 0 35rpx;
	/* height: 300rpx;
	line-height: 300rpx; */
	text-align: center;
	font-size: 36rpx;
}

.tc_baoming {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999999999;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.8);
	overflow-y: auto;
	display: flex;
	align-items: center;
	justify-content: center;
}


.image_box {
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 100%;
	padding: 0 60rpx;
	color: #fff;
	font-size: 28rpx;
	box-sizing: border-box;
	/* padding-top: 180rpx; */
	padding-bottom: 100rpx;
}

/* ----------------------------- */
page {
	padding-top: 0;
	background-color: #F8F9FA;
}

.head_area {}

.topbg {
	width: 100%;
	height: 200rpx;
}

.user_info {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	box-sizing: border-box;
	padding: 0 33rpx;
	padding-top: 144rpx;
}

.info {
	display: flex;
	flex-direction: column;
	justify-content: center;
	font-size: 32rpx;
	font-weight: 400;
	color: #FFFFFF;
}

.info .phone {
	font-size: 24rpx;
	font-weight: normal;
	color: #FFFFFF;
	margin-top: 10rpx;
}

.user_info_deng {
	display: flex;
	align-items: center;
}

.user_info_deng image {
	width: 111rpx;
	height: 111rpx;
	margin-right: 28rpx;
	border-radius: 50%;
}

.user_info_deng text {
	font-size: 32rpx;
	font-weight: 400;
	color: #FFFFFF;
}

.order_btn_area {
	position: relative;
	z-index: 1;
	width: 692rpx;
	min-height: 269rpx;
	background: #FFFFFF;
	border-radius: 17rpx;
	margin: 0 auto;
	margin-top: -150rpx;
	box-sizing: border-box;
	padding: 24rpx 29rpx;
}

.order_btn_nav {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 60rpx;
}

.order_btn_nav image {
	width: 17rpx;
	height: 20rpx;
	margin-left: 20rpx;
}

.order_btn_nav navigator text {
	font-size: 24rpx;
	font-weight: 400;
	color: #666666;
}

.order_btn_nav>text {
	font-size: 28rpx;
	font-weight: bold;
	color: #000000;
}

.btn_list {
	width: 100%;
	display: flex;
	align-items: center;
	/* justify-content: space-between; */
	flex-wrap: wrap;
}

.daili .btn_item {
	margin-top: 30rpx;
}

.btn_list .btn_item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 20%;
	margin-top: 20rpx;
}

.btn_list .btn_item image {
	width: 53rpx;
	height: 47rpx;
	margin-bottom: 20rpx;
}

.btn_list .btn_item text {
	font-size: 25rpx;
	font-weight: 500;
	color: #666666;
}

.logo {
	position: absolute;
	bottom: 83rpx;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
}

.logo image {
	width: 25rpx;
	height: 25rpx;
	margin-right: 5rpx;
}

.logo text {
	font-size: 25rpx;
	font-weight: 400;
	color: #BABBBD;
}

.image_tit {
	margin: 0 auto;
	display: block;
	margin-top: 30rpx;
	width: 400rpx;
	height: 30rpx;
	margin-bottom: 30rpx;
}

.product_list {
	width: 100%;
	box-sizing: border-box;
	/* padding: 0 29rpx; */
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
}

.product_item {
	width: 331rpx !important;
	background: #FFFFFF;
	border-radius: 14rpx;
	box-sizing: border-box;
	margin: 0;
	margin-bottom: 29rpx !important;
	margin-top: 0 !important;
}

.product_list .product_item:nth-child(even) {
	margin-left: 30rpx;
}

.product_item image {
	width: 100%;
	height: 331rpx;
	border-top-left-radius: 14rpx;
	border-top-right-radius: 14rpx;
}

.product_item .product_info {
	width: 100%;
	box-sizing: border-box;
	padding: 0 15rpx;
	padding-top: 10rpx;
	padding-bottom: 24rpx;
}

.product_item .product_info .title {
	font-size: 25rpx;
	font-weight: 500;
	color: #313131;
	line-height: 33rpx;
	display: block;
	width: 100%;
	display: -webkit-box;
	word-break: break-all;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	text-overflow: ellipsis;
}

.product_item .product_info .price {
	margin-left: 0;
	font-size: 28rpx;
	font-weight: bold;
	color: #FE3E3D;
	line-height: 33rpx;
	padding-top: 15rpx;
}

.tanchuang {
	margin-top: 100rpx;
}

.tanchuang2 {
	margin-top: 120rpx;
}

.nav_list {
	display: flex;
	align-items: center;
	width: 100%;
	overflow-x: auto;
	box-sizing: border-box;
	padding: 35rpx 29rpx;
}

.nav_list text {
	font-size: 28rpx;
	font-weight: 500;
	color: #2D2D2D;
	margin-right: 25rpx;
	white-space: nowrap;
	flex: none;
}

.nav_list text.active {
	font-size: 28rpx;
	font-weight: bold;
	color: #2D2D2D;
}

.nav_list text:last-child {
	margin-right: 0;
}

button {
	border: none;
	background-color: transparent;
	outline: none;
	padding: 0;
	margin: 0;
	border-radius: 0;
}

button::after {
	border: none;
	outline: none;
	/* height: 60rpx; */
}


.bar_title {
	position: fixed;
	left: 0;
	color: #ffffff;
	z-index: 9999;
	width: 100%;
	text-align: center;
}


.bar_title_color {
	background-color: #ffffff;
	color: #000000;
}

.bar_title_none {
	display: none;
}

.open_distribution .btn_item {
	width: 25%;
}


.tc_baoming {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999999999;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.8);
	overflow-y: auto;
	display: flex;
	align-items: center;
	justify-content: center;
}


.image_box {
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 100%;
	padding: 0 60rpx;
	color: #fff;
	font-size: 28rpx;
	box-sizing: border-box;
	/* padding-top: 180rpx; */
	padding-bottom: 100rpx;
}
</style>

<style scoped lang="scss">
.mine_container {
	min-height: 100vh;
	background-color: #f8f9fa;
	// background-image: url('https://saas.jizhongkeji.com/static/jzkj/static/images/my-bg.svg');
	background-size: 100%;
	background-repeat: no-repeat;
	// padding-bottom: $tabbar-height;
	padding-bottom: calc($tabbar-height + env(safe-area-inset-bottom));


	// 个人数据积分/余额/优惠券
	.mine_data_box {
		height: 180.56rpx;
		background: linear-gradient(180deg, #fff1f1, #ffe4e4);
		border-radius: 13.89rpx;

		.mine_data_item {
			width: 33.33%;
			// border: 1px solid #000;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.mine_data_value {
				font-size: 34.72rpx;
				font-weight: 700;
				text-align: center;
				color: #fc4740;
			}

			.mine_data_name {
				border: 2rpx solid rgba(0, 0, 0, 0.00);
				font-size: 25rpx;
				font-weight: 500;
				text-align: center;
				color: #242424;
				margin-top: 15rpx;
			}

			&:nth-child(2) {
				// 左右边框
				// border-left: 1px solid #ff0000;
				// border-right: 1px solid #ff0000;
				// border: 1px solid red;
				background-image: url('https://saas.jizhongkeji.com/static/jzkj/static/images/mine-lr-border.svg');
				background-size: 100%;
				background-repeat: no-repeat;
			}
		}
	}

	// 我的订单 按钮列表容器
	.my_order_box {
		width: 100%;
		margin-top: 20rpx;
		// height: 236.11rpx;
		background: #ffffff;
		border-radius: 13.89rpx;
		padding: 25rpx;

		.my_order_header {}

		.my_order_list {
			margin-top: 30rpx;
		}
	}

	// 常用工具
	.common_tool_box {
		margin-top: 20rpx;
		background: #ffffff;
		border-radius: 13.89rpx;
		padding: 25rpx;

		.common_tool_header {}

		.common_tool_list {
			margin-top: 30rpx;
			display: flex;
			flex-wrap: wrap;
			// justify-content: space-between;
			row-gap: 25rpx;

			.common_tool_item {
				width: 25%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
		}
	}
}
</style>