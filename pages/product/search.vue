<template>
	<view class="product-search-container">
		<!-- <view v-if="is_loading"> -->
		<view v-if="1">

			<HeightBar />

			<!-- 标题/搜索栏 -->
			<view class="product-search-title">
				<!-- 返回按钮 -->
				<view class="back_btn" @click="back_tap">
					<image lazy-load src="https://saas.jizhongkeji.com/static/jzkj/images/back_btn.png"
						mode="aspectFit" />
				</view>
				<!-- 搜索栏 -->
				<view class="search_input_box !flex-1">
					<input hold-keyboard="true" class="search_input" confirm-type="search" type="text"
						placeholder="输入搜索关键词" @input="change_search_str" placeholder-class="input_placeholder_class"
						@confirm="to_search" v-model="search_str" />
					<image lazy-load class="delete_btn" @click="delete_all_str" v-if="have_val"
						src="https://saas.jizhongkeji.com/static/jzkj/images/delete_btn.png" mode="aspectFit" />
					<view class="search_btn" @click="to_search">搜索</view>
				</view>
				<!-- 胶囊 -->
				<view :style="{ width: (boundingWidth || 20) + 'px', opacity: 0, flex: 'none' }"></view>
			</view>


			<view class="my_page">
				<view class="content " style="padding-bottom: 100rpx;">
					<template v-if="productList && productList.length > 0 && have_val">
						<view class="totall_tip">为你搜索到{{ goods_count }}条商品：</view>
						<!-- <import src="/pages/template/item.wxml" /> -->
						<!-- <template is="productList" data="{{productList: productList,hidden_prev:1}}" /> -->
						<ProductItem name="productList" :productList="productList" />
					</template>
					<template v-if="(!productList || productList.length <= 0) && have_search">
						<view class="empty_tip flex_row_space_bt">
							<view>
								<view class="empty_tip_text">没有找到你搜索的商品</view>
								<view class="empty_tip_text">换个关键词搜索试试吧~</view>
							</view>
							<image lazy-load class="kong_icon" catchtap="delete_all_str"
								src="https://saas.jizhongkeji.com/static/jzkj/images/kong.png" mode="aspectFit" />
						</view>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { request } from '@/utils/request';
import { useTempStore } from '@/stores/temp';
import { storeToRefs } from 'pinia';
import { onLoad } from '@dcloudio/uni-app';


const { user } = storeToRefs(useTempStore());


const boundingWidth = (uni.getSystemInfoSync?.()['windowWidth'] - uni.getMenuButtonBoundingClientRect?.()?.right) * 2 + uni.getMenuButtonBoundingClientRect?.()?.width || 0;
const have_val = ref(0);
const have_search = ref(0);
const productList = ref([]);
const goods_count = ref(0);
const is_loading = ref(false);

const search_str = ref('')


onLoad(options => {
	// const res = uni.getMenuButtonBoundingClientRect()
	// console.log('胶囊', res);
	// this.setData({
	// 	menu_btn_width: res.width * 1 + 10
	// })

	// this.onLogin(user => {
	// 	this.setData({
	// 		userInfo: user
	// 	})
	// 	if (this.data.userInfo.user_state == 1) {
	// 		// this.click_page(3);
	// 	}
	// })


	if (options && options.search_str) {
		// this.setData({
		// 	search_str: options.search_str || '',
		// 	have_val: 1,
		// 	have_search: 1,
		// }, () => {
		// 	this.goods_list(0)
		// })
		search_str.value = options.search_str || ''
		have_val.value = 1
		have_search.value = 1
		goods_list(0)
	}
})




function back_tap(e) {
	uni.navigateBack()
}
function change_search_str(e) {
	// console.log('change_search_str', e);
	if (search_str.value.length == 0) {
		have_val.value = 0
		have_search.value = 0
		productList.value = []
	} else {
		have_val.value = 1
	}
	// search_str.value = e.detail.value // 已双向绑定
	console.log('000000', search_str.value);

}
function delete_all_str(e) {
	search_str.value = ''
	have_val.value = 0
	have_search.value = 0
	productList.value = []
}
function to_search(e) {
	// search_str.value = e.detail.value || '' // 已双向绑定

	console.log('to_searchto_searchto_search', search_str.value);

	have_search.value = 1
	productList.value = []
	goods_list(0)
}


async function goods_list(category) {
	let res = await request('/WxAppCustomer/goods_list', 'post', {
		offset: productList.value.length,
		name: search_str.value || '',
		goods_group_ids: category || '',
		type: 2,
	})
	if (res.code == 1) {
		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true
		})
	} else {
		// console.log('00000000000000000000', productList.value);
		productList.value.push.apply(productList.value, res.data.list)
		productList.value = productList.value
		goods_count.value = res.data.goods_count
		is_loading.value = true
		uni.hideLoading()
		// console.log('00000000000000000000', productList.value);
	}
}
function get_introduce_goods() {
	// TODO 推荐
	console.log('get_introduce_goods 待修改');
	// var that = this
	return
	// 商品列表
	this.request({
		url: '/WxAppCustomer/goods_list',
		data: {
			name: search_str || '',
			goods_group_ids: category || '',
			type: 2,
		},
		success: (res) => {
			this.setData({
				'is_searching': 0
			})

			if (res.data && res.data.code == 1) {
				wx.showToast({
					title: res.data.msg,
					icon: 'none',
					mask: true
				})
			} else {
				this.setData({
					productList: res.data.data.list,
				})
			}
		}
	});
}
</script>

<style>
@import '../../static/styles/menuOld.css';

.back_btn {
	width: 100rpx;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex: none;
}

.back_btn image {
	height: 49rpx;
	width: 49rpx;
}

.search_input_box {
	background-color: #F0F0F0;
	box-sizing: border-box;
	border-radius: 34rpx;
	height: 60rpx;
	padding: 4rpx;
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
}

.search_input {
	background-color: transparent;
	height: 100%;
	width: 100%;
}

.search_btn {
	flex: none;
	background: #FF4F26;
	border-radius: 31rpx;
	color: #ffffff;
	font-size: 25rpx;
	padding: 8rpx 12rpx;
	width: max-content;
	box-sizing: border-box;
}

.delete_btn {
	flex: none;
	display: inline-block;
	height: 38rpx;
	padding: 8rpx;
	margin-left: 4rpx;
	margin-right: 14rpx;
	width: 38rpx;
}

.totall_tip {
	box-sizing: border-box;
	color: #000000;
	font-size: 28rpx;
	font-weight: 400;
	padding-left: 25rpx;
	margin-top: 24rpx;
	width: 100vw;
}

/* 商品列表 */
.section {
	margin-top: 22rpx;
}

.section_title {
	display: none;
}

.product_list .product_item .image {
	height: 331rpx;
	width: 340rpx;
}

.product_item .product_radius text {
	font-size: 25rpx;
	-webkit-line-clamp: 2 !important;
}

.product_item .product_radius text.price {
	font-size: 28rpx;
}

.empty_tip {
	box-sizing: border-box;
	border-bottom: 1rpx solid #EEEEEE;
	padding: 30rpx 0rpx;
	align-items: flex-end;
	height: 200rpx;
	margin: 0 auto;
	width: calc(100vw - 50rpx);
}

.empty_tip_text {
	color: #000000;
	font-size: 28rpx;
	font-weight: 400;
	line-height: 1.5;
}

.kong_icon {
	height: 100rpx;
	width: 189rpx;
}

.content {
	flex: 1;
	box-sizing: border-box;
	overflow: auto;
	width: 100%;
}
</style>

<style lang="scss" scoped>
.product-search-container {


	.product-search-title {
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
		// border: 1px solid red;
	}
}
</style>
