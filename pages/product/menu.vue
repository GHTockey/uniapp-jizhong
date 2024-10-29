<template>
	<view class="menu-container" :style="{ marginTop: containerMarTop + 'px' }">
		<!-- 导航栏 -->
		<NavBar title="标题" showSearch />

		<!-- 顶部菜单 -->
		<scroll-view v-if="business.is_open_product_menu == 1" scroll-x="true" class="nav"
			:style="{ top: statusBarHeight + 44 + 'px', overflow: 'scroll', '-webkit-overflow-scrolling': 'touch' }"
			scroll-left scroll-with-animation>
			<template style="display: flex;align-items: center;" v-for="navItem in cuisine_list">
				<view :class="['nav-item', currentTab == navItem.id ? 'active' : '']" @click="switchNav(navItem.id)">
					<view style="display: flex;flex-direction: column;align-items: center;">
						<image class="borderred"
							style="width: 84rpx;height: 84rpx;border-radius: 28rpx;margin-bottom: 15rpx;"
							mode="aspectFill" :src="navItem.image_uri"></image>
						<view class="active_text active_text_name"> {{ navItem.name }}</view>
					</view>
				</view>
			</template>
		</scroll-view>

		<!-- 展开按钮 -->
		<view v-if="cuisine_list?.length > 5 && business.is_open_product_menu == 1" class="band_btn_box"
			:style="{ top: statusBarHeight + 50 + 'px' }" @click="open_expand_list_show">
			<view class="writing-mode">展开</view>
			<image style="width: 27rpx;height: 26rpx;margin-top:10rpx"
				src="https://saas.jizhongkeji.com/static/jzkj/images/expand_btn.png"></image>
		</view>

		<!-- 顶部菜单展开内容 -->
		<view class="expand_box" :style="{ top: expand_box_top + 'px' }">
			<view class="expand_list expand_list_v">
				<block style="display: flex;align-items: center;" v-for="(navItem, idx) in cuisine_list" :key="idx">
					<view style="padding-bottom: 20rpx;" class="nav-item {{currentTab == navItem.id ?'active':''}}"
						:data-current="navItem.id" @click="switchNav">
						<view style="display: flex;flex-direction: column;align-items: center;">
							<image class="borderred"
								style="width: 84rpx;height: 84rpx;border-radius: 28rpx;margin-bottom: 15rpx;"
								mode="aspectFill" :src="navItem.image_uri"></image>
							<view class="active_text active_text_name active_text_name_v"> {{ navItem.name }}</view>
						</view>
					</view>
				</block>
			</view>

			<view class="shouqi" @click="close_expand_list_show">
				<view>点击收起</view>
			</view>
		</view>


		<!-- 左侧分类 -->
		<view class="menu flex_col_cen_cen"
			:style="{ top: statusBarHeight + menu_top + 10 + 'px', height: 'calc(100vh - ' + (statusBarHeight + menu_top) + 'px)', paddingBottom: 'constant(safe-area-inset-bottom)', paddingBottom: 'env(safe-area-inset-bottom)' }">

			<template v-for="item in product_category_list" :key="item.id">
				<view
					:class="`menu_item  flex_col_cen_cen ${item.is_actived ? 'active' : ''} menu_item_length${item.name.length}`"
					@click="navbarSelectvideo_category_id(item.id)">
					<!-- 竖条 -->
					<view class="active_border_left" v-show="category_id == item.id || item.is_actived"></view>
					{{ item.name }}
					<!-- 下箭头 -->
					<!-- <view class="triangle-down" v-show="item.sub_list && item.sub_list.length"></view> -->
				</view>

				<template v-if="item.sub_list && item.sub_list.length">
					<view
						:class="`menu_item menu_item_sub ${item.is_actived ? 'category_open' : 'category_close'} flex_col_cen_cen ${category_id == item_sub.id ? 'active' : ''} menu_item_length${item_sub.name.length}`"
						@click="navbarSelectvideo_category_id(item_sub.id)" v-for="item_sub in item.sub_list"
						:key="item_sub.index">
						<!-- <view class="active_border_left" wx:if="{{category_id == item_sub.id}}"></view> -->
						{{ item_sub.name }}
					</view>
				</template>

			</template>
			<view class="menu_item remain_menu"></view>
		</view>

		<!-- 商品 -->
		<view class="right_content flex_col_str_str">

			<view :style="`height:${navHeight}px;padding-top:${statusBarHeight + 20}px;`"></view>

			<block v-if="productList && productList.length">
				<!-- <import src="/pages/template/item.wxml" /> -->
				<!-- <template is="productListShowByRow"
					data="{{productListShowByRow: productList, productListName: productListShowByRow,functionName:'buy_now'}}" /> -->
				<ProductItem :name="'productListShowByRow'" :productListShowByRow="productList" />
			</block>
			<block v-else>
				<view class="flex_col_cen_cen no_data_tip_box">
					<image lazy-load class="no_data_img" src="https://saas.jizhongkeji.com/static/jzkj/images/kong.png"
						mode="aspectFit"></image>
					<view class="no_data_tip">暂无数据</view>
				</view>
			</block>

			<view class="ying"></view>
		</view>


		<!-- 底部 tabbar -->
		<!-- <Tarbar class="fixed-bottom" /> -->
		<TabBar class="fixed-bottom" :isAppMode="true" />
	</view>
</template>

<script setup>
import { computed, ref } from 'vue';
import { getTitleBarHeight, getStatusBarHeight } from '@/utils/index.js';
import { request } from '@/utils/request.js';
import { onLoad, onShow } from "@dcloudio/uni-app";
import Tarbar from "@/components/Tarbar.vue";



// 往下挤的高度 
const containerMarTop = computed(() => {
	return getTitleBarHeight() + getStatusBarHeight()
});
// 状态栏高度
const statusBarHeight = getStatusBarHeight()

const cuisine_list = ref(); // 顶部菜单
const currentTab = ref(0); // 当前选中菜单
const cuisine_id = ref(0); // 菜系id
const category_id = ref(0); // 分类id
const navScrollLeft = ref(0); // 菜单滚动距离
const productList = ref([]); // 商品列表
const product_category_list = ref([]); // 商品分类列表
const expand_box_top = ref(-300); // 展开菜单的顶部距离
const menu_top = 110; // 分类顶部距离
const isLoading = ref(false); // 是否加载中
const navHeight = uni.getSystemInfoSync()['statusBarHeight'];
const business = ref({
	is_open_product_menu: 1, // 是否开启顶部菜单
	expand_list_show: false, // 是否展开顶部菜单
})



onLoad((options) => {
	console.log('onLoad');

	getData()
})

onShow(() => {
	console.log('onShow');
	goods_list()
})


async function getData() {
	let res = await request('/WxAppCustomer/goods_group_list', 'post')
	// console.log(res);
	uni.hideLoading();
	if (res.code != 0) return uni.showToast({ title: res.message, icon: 'error' })
	cuisine_list.value = res.data.cuisine_list

}



// 切换菜单
function switchNav(id) {
	var cur = id;
	//    console.log('cur',cur);
	if (currentTab.value == cur) {
		currentTab.value = -1
		cuisine_id.value = 0
		category_id.value = 0
	} else {
		currentTab.value = cur
		cuisine_id.value = cur
		category_id.value = 0
	}

	// 将分类id变成0
	getScrollLeft();
	productList.value = [];
	goods_list();
	product_category_list_active();

}

// 获取菜单滚动距离
function getScrollLeft() {
	const query = uni.createSelectorQuery();
	query.selectAll(".nav-item").boundingClientRect();
	//这里将会返回页面中所有class为item的节点，个数为tab列表的长度
	query.exec((res) => {
		let num = 0;
		for (let i = 0; i < currentTab.value - 1; i++) {
			num += res[0][i].width;
		}
		// 计算当前currentTab之前的宽度总和
		navScrollLeft.value = Math.ceil(num)

		// console.log('navScrollLeft', navScrollLeft.value);
	});
}
// 获取商品列表
async function goods_list() {
	uni.showLoading({ title: '加载中' });
	let res = await request('/WxAppCustomer/goods_list_v', 'post', {
		offset: productList.value.length,
		goods_group_ids: category_id.value || '',
		type: 2,
		cuisine_id: cuisine_id.value || ''
	})
	// console.log('res', res)
	uni.hideLoading();
	if (res.code != 0) return uni.showToast({ title: res.message, icon: 'error' })

	// 商品分类列表
	res.data.goods_group_list.forEach(item => {
		var find = product_category_list.value.find(item2 => item.id == item2.id);
		item.is_actived = false;
		item.is_category_open = find && find.is_category_open;
	});
	product_category_list.value = res.data.goods_group_list;

	// ???
	// this.data.cuisine_list = res.data.data.cuisine_list;
	// this.setData({
	// 	product_category_list: this.data.product_category_list,
	// 	cuisine_list: this.data.cuisine_list
	// });

	// 处理分类id
	if (category_id.value == 0) {
		if (product_category_list.value.length > 0) {
			var first = product_category_list.value[0].id
			category_id.value = first
		}
	}
	product_category_list_active();


	// 将返回的商品列表数据添加到productList中
	productList.value.push.apply(productList.value, res.data.list)
}
// 激活商品分类列表
function product_category_list_active() {
	// console.log('before', JSON.parse(JSON.stringify(product_category_list.value)));
	product_category_list.value.forEach(item => {
		item.is_actived = item.id == category_id.value || (item.sub_list && item.sub_list.find(item2 => item2.id == category_id.value));
	});
	// console.log('after', JSON.parse(JSON.stringify(product_category_list.value)));

}
// 展开菜单
function open_expand_list_show() {
	expand_box_top.value = statusBarHeight + 40
}
// 收起菜单
function close_expand_list_show() {
	expand_box_top.value = -300
}

// 选择分类
function navbarSelectvideo_category_id(id) {
	category_id.value = id
	// console.log('category_id', category_id.value);

	console.log(product_category_list.value.find(item => item.id == id), 333);


	productList.value = [];
	goods_list()


	var item = product_category_list.value.find(item => item.id == id);
	if (item) {
		if (!item.is_actived) {
			item.is_category_open = true;
		} else {
			item.is_category_open = !item.is_category_open;
		}
	}

	product_category_list_active(); // 激活商品分类列表
}
</script>

<style lang="scss" scoped>
.menu-container {
	padding-bottom: $tabbar-height;
}
</style>


<style>
.my_page {
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	/* height: 100vh; */
	width: 100vw;
	margin-top: 126rpx;
}

.product_list_row .name {
	max-width: 356rpx;
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

.search_box_lable {
	flex: none;
	color: #000000;
	height: 60rpx;
	font-size: 36rpx;
	/* max-width: max-content; */
}

.search_input_box {
	position: relative;
	box-sizing: border-box;
	/* width: max-content; */
	width: 100%;
	padding-right: 90rpx;
}

.search_input {
	box-sizing: border-box;
	background-color: #EFEFEF;
	border-radius: 30rpx;
	height: 60rpx;
	padding: 0rpx 10rpx;
	font-size: 28rpx;
	text-align: center;
	width: 400rpx;
}

.search_icon {
	position: absolute;
	top: calc(50% - 14rpx);
	left: 40rpx;
	height: 24rpx;
	width: 24rpx;
}

.arrow_right_icon {
	height: 16rpx;
	margin-left: 16rpx;
	width: 8rpx;
}

.default_heihgt {
	border-bottom: 1rpx solid #EEEEEE;
	height: 20rpx;
	width: 100vw;
}

.content {
	flex: 1;
	box-sizing: border-box;
	overflow: hidden;
	width: 100%;
}

.menu {
	box-sizing: border-box;
	height: 100%;
}

.good_list {
	box-sizing: border-box;
	padding-bottom: 150rpx;
}

.menu {
	background-color: #FFFFFF;
	flex: none;
	overflow-y: scroll;
	box-sizing: border-box;
	justify-content: flex-start;
	width: 168rpx;
	position: fixed;
	left: 0;
	top: 80px;
	overflow-x: hidden;
}

.menu_item.remain_menu {
	flex: 1;
	background-color: #F0F1F5;
	height: 100%;
	width: 100%;
}

.menu_item {
	background-color: #F0F1F5;
	flex: none;
	font-size: 28rpx;
	min-height: 104rpx;
	position: relative;
	width: 100%;
	transition: all .2s;
}

.menu_item.category_close {
	min-height: 0;
	height: 0;
	font-size: 0;
}

.menu_item_length5 {
	font-size: 26rpx;
}

.menu_item_length6 {
	font-size: 22rpx;
}

.menu_item:nth-of-type(1) {
	padding-top: 10rpx;
}

.menu_item.active {
	background-color: #FFFFFF;
	color: #ff2000;
}

.menu_item.menu_item_sub {
	background-color: #FFFFFF;
	color: unset;
}

.menu_item.menu_item_sub.active {
	/* color: #ff2000; */
	color: #F2AB20;
}

.active_border_left {
	background-color: #ff2700;
	border-radius: 20rpx;
	position: absolute;
	top: calc(50% - 27rpx);
	height: 54rpx;
	left: 0rpx;
	width: 8rpx;
}

.right_content {
	flex: none;
	box-sizing: border-box;
	justify-content: flex-start;
	width: 100%;
	padding-left: 170rpx;
	width: 100%;
	overflow-x: hidden;
}

.no_data_tip_box {
	box-sizing: border-box;
	padding-bottom: 240rpx;
	height: 100%;
	padding-top: 200rpx;
}

.no_data_img {
	height: 128rpx;
	width: 239rpx;
}

.no_data_tip {
	color: #838383;
	font-size: 28rpx;
	font-weight: 500;
	margin-top: 42rpx;
}


.nav {
	padding-top: 20rpx;
	height: 150rpx;
	width: 100%;
	/* box-sizing: border-box; */
	overflow: hidden;
	/* line-height: 80rpx; */
	background: #fff;
	font-size: 22rpx;
	white-space: nowrap;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 99;
	color: #3E3E3E;
	box-shadow: 0rpx 2rpx 2rpx 1rpx rgba(0, 0, 0, 0.05);
}

.nav-item {
	width: 20%;
	display: inline-flex;
	justify-content: center;
}

.active .active_text {
	background: #FF4F26;
	border-radius: 17rpx 17rpx 17rpx 17rpx;
	color: #fff;
	padding: 2rpx 8rpx;
}

.active .borderred {
	border: 2rpx solid #FF4F26;
	box-sizing: border-box;
}

.active_text_name {
	width: 90rpx;
	text-align: center;
	box-sizing: border-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: break-all;
}

.active_text_name_v {
	width: 120rpx;
	display: -webkit-box;
	font-size: 22rpx;
	color: #3E3E3E;
}

.section {
	width: 100%;
}

.band_btn_box {
	width: 79rpx;
	height: 150rpx;
	background: #FFFFFF;
	box-shadow: 2rpx 0rpx 2rpx 1rpx rgba(0, 0, 0, 0.05);
	border-radius: 8rpx 0rpx 0rpx 8rpx;
	opacity: 1;
	border: 1rpx solid #EEEEEE;
	position: fixed;
	right: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.writing-mode {
	writing-mode: vertical-lr;
	font-size: 26rpx;
	font-weight: bold;
	color: #333333;
}

.expand_box {
	position: fixed;
	right: 0;
	z-index: 999;
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 0 30rpx;
	box-shadow: 0rpx 2rpx 2rpx 1rpx rgba(0, 0, 0, 0.05);
	border-radius: 0rpx 0rpx 28rpx 28rpx;
	background-color: #fff;
	box-sizing: border-box;
	height: 445rpx;
	transition: all 1s ease;
	padding-top: 20rpx;
}

.expand_list_v {
	height: 360rpx;
	overflow-y: auto;
}

.shouqi {
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	border-top: 1rpx solid #D3D3D3;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24rpx;
	font-weight: 500;
	color: #8A8A8A;
	height: 85rpx;
}

::-webkit-scrollbar {
	/* //隐藏scroll-view里面自带的滚动条 */
	display: block;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: auto !important;
	background: transparent;
	overflow: auto !important;
}


.triangle-down {
	position: relative;
	width: 0;
	height: 0;
	border-left: 10rpx solid transparent;
	border-right: 10rpx solid transparent;
	border-top: 10rpx solid #ff2000;
	position: absolute;
	right: 4rpx;
	transform: rotate(0deg);
	transition: all .2s;
}

.triangle-right {
	transform: rotate(-90deg);
}
</style>
