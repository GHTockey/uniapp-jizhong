<template>
	<view class="intro_product_container">
		
		<!-- 状态栏高度 -->
		<!-- <view :style="{ height: statusBarHeight + 'px' }"></view> -->

		<image v-if="!is_show_bar_title" class="img_home_bg"
			src="https://saas.jizhongkeji.com/static/jzkj/images/img_home_bg.png"></image>

		<view v-if="!is_show_bar_title"
			:style="`padding-top:${statusBarHeight}px;height:${navHeight}px;display: flex;align-items: center;color: #000;z-index: 109;position: fixed;`">
			<text style="margin-left: 24rpx;z-index: 99;">资讯</text>
		</view>
		<!-- <customNavigation wx:if="{{is_show_bar_title}}"
			class="bar_title {{has_bar_title_color?'bar_title_color':''}} {{is_show_bar_title? '':'bar_title_none'}}">
			<text style="margin-left: 24rpx;">资讯</text>
		</customNavigation> -->
		<NavBar class="!justify-start"
			:class="`bar_title ${has_bar_title_color ? 'bar_title_color' : ''} ${is_show_bar_title ? '' : 'bar_title_none'}`"
			v-if="is_show_bar_title">
			<template v-slot:title><text style="margin-left: 24rpx;">资讯</text></template>
		</NavBar>

		<!-- 多方案 -->
		<view v-if="userInfo.business?.introproduct_style == 1" :style="`height:${statusBarHeight + navHeight}px;`">
		</view>
		<view v-if="userInfo.business?.introproduct_style == 2" :style="`height:${statusBarHeight + navHeight}px;`">
		</view>
		<!-- 1 -->
		<view v-if="userInfo.business?.introproduct_style == 1" class="product_area">
			<view style="height:40rpx"></view>
			<view class="product_list" v-if="productList.length > 0">
				<navigator hover-class="none" :url="`/pages/index/introproduct_detail?id=${item.id}`"
					class="product_item_v" v-for="item in productList" :key="item.id">
					<image style="width: 174rpx;height: 174rpx;border-radius: 10rpx;margin-right: 33rpx;flex: none;"
						lazy-load :src="item.image_uri" mode="aspectFill" />
					<view class="product_info_v">
						<text class="title_v">{{ item.name }}</text>
						<view class="click_count">
							<view>{{ item.update_time }}</view>
							<view>{{ item.click_count }}阅读</view>
						</view>
					</view>
				</navigator>
			</view>

			<view class="kong" v-if="productList.length <= 0">
				<image lazy-load src="https://saas.jizhongkeji.com/static/jzkj/images/kong.png" mode="widthFix" />
				<text>暂无内容</text>
			</view>
		</view>
		<!-- 2 -->
		<view v-if="userInfo.business?.introproduct_style == 2" style="position: relative;z-index: 99;">
			<!-- 分类 -->
			<view class="menu flex_col_cen_cen"
				:style="`top: ${statusBarHeight + navHeight}px;height: calc(100vh - ${statusBarHeight}px);`">
				<template v-for="(item, index) in nav_list" :key="item.id">
					<view
						:class="`menu_item flex_col_cen_cen ${idnex == index ? 'active' : ''} menu_item_length${item.name.length}`"
						@click="choose_nav(index)" :data-idnex="index">
						<view class="active_border_left" v-if="idnex == index"></view>
						{{ item.name }}
					</view>
				</template>
				<view class="menu_item remain_menu"></view>
			</view>

			<!-- 商品 -->
			<view class="right_content flex_col_str_str">
				<view class="product_list" v-if="productList.length > 0">
					<!-- <template v-for="item in productList" :key="item.id">
						<navigator hover-class="none" :url="`/pages/index/introproduct_detail?id=${item.id}`"> -->
							<view class="product_item_v"  v-for="item in productList" :key="item.id" @click="toPage(`/pages/index/introproduct_detail?id=${item.id}`)">
								<image
									style="width: 174rpx;height: 174rpx;border-radius: 10rpx;margin-right: 33rpx;flex: none;"
									lazy-load :src="item.image_uri" mode="aspectFill" />
								<view class="product_info_v">
									<text class="title_v">{{ item.name }}</text>
									<view class="click_count">
										<view>{{ item.update_time }}</view>
										<view>{{ item.click_count }}阅读</view>
									</view>
								</view>
							</view>
						<!-- </navigator>
					</template> -->
				</view>

				<view class="kong" style="padding-left: 150rpx;" v-if="productList.length <= 0">
					<image lazy-load src="https://saas.jizhongkeji.com/static/jzkj/images/kong.png" mode="widthFix" />
					<text>暂无内容2</text>
				</view>
			</view>
		</view>
	</view>

	<view class="ying"></view>

	<TabBar class="fixed-bottom" :isAppMode="true" />
</template>

<script setup>
import { ref } from 'vue';
import { request } from "@/utils/request.js";
import { onLoad, onShow, onReachBottom, onShareAppMessage, onPageScroll } from '@dcloudio/uni-app';
import { useTempStore } from '@/stores/temp.js'
import { storeToRefs } from 'pinia';
import { getStatusBarHeight } from '@/utils';

const { user: userInfo, business } = storeToRefs(useTempStore())

const tarbarupdated = ref(0)

const idnex = ref(0)

const statusBarHeight = uni.getSystemInfoSync()['statusBarHeight']
// const navHeight = uni.getSystemInfoSync()['statusBarHeight']
const navHeight = ref(uni.getSystemInfoSync()['statusBarHeight'] || 40)

// 头部标题是否有白色背景
const has_bar_title_color = ref(false)
const is_show_bar_title = ref(false)

const productList = ref([]) // 商品列表
const id = ref('') // 分类id
const goods_group_list = ref([]) // 商品分组列表
const nav_list = ref([]) // 导航列表
const goods_count = ref(0) // 商品总数

// 路由跳转
const toPage = (url) => {
	uni.navigateTo({
		url
	});
}


onLoad((options) => {
	console.log('options', options)
	// 在组件实例进入页面节点树时执行
	const menuButtonRect = uni.getMenuButtonBoundingClientRect?.()
	if (menuButtonRect) {
		navHeight.value = (menuButtonRect.top - statusBarHeight) * 2 + menuButtonRect.height
	}

	console.log('navHeight', navHeight.value);
})
onShow(() => {
	console.log('onShow')
	// this.onLogin(user => {
	// 	this.setData({
	// 		userInfo: user,
	// 		tarbarupdated: this.data.tarbarupdated++
	// 	})
	// 	this.recommend_product()
	// 	console.log('userInfouserInfo', this.data.userInfo.business);
	// })

	recommend_product()
})
onReachBottom(() => {
	console.log('onReachBottom')
	if (goods_count.value > productList.value.length) {
		recommend_product(productList.value.length)
	}
})
onShareAppMessage(() => {
	console.log('onShareAppMessage')
	// return app.onShareAppMessage(options);
})
onPageScroll((e) => {
	// console.log('页面滚动', e.scrollTop);
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


async function recommend_product(length) {
	let goods_list = productList.value
	let goods_count = 0

	let res = await request('/WxAppCustomer/introproduct_list', 'post', { category_id: id.value, offset: length || 0 })
	if (res.code == 0) {
		// that.data.productList = res.data.data.goods_list;
		goods_group_list.value = res.data.goods_group_list;

		if (length) {
			goods_list.push.apply(goods_list, res.data.goods_list)
		} else {
			goods_list = res.data.goods_list
		}

		wx.hideLoading();
		if (res.data.goods_group_list.length > 0) {

			nav_list.value = res.data.goods_group_list
		}

		goods_count = res.data.goods_count

	} else {
		uni.showToast({
			title: res.data.msg,
			icon: 'none',
			mask: true
		})
	}

	productList.value = goods_list
}

function choose_nav(i) {
	// this.setData({
	// 	id: this.data.nav_list[e.currentTarget.dataset.idnex].id,
	// 	idnex: e.currentTarget.dataset.idnex,
	// })

	id.value = nav_list.value[i].id
	idnex.value = i

	// console.log('this.data.goods_group_list[e.currentTarget.dataset.idnex].id', e.currentTarget.dataset.id);
	productList.value = []
	recommend_product()
}
</script>

<style scoped lang="scss">
@import '../../static/styles/introproduct.css';

.intro_product_container {
	min-height: calc(100vh - $tabbar-height - $nav-height);
	// padding-bottom: $tabbar-height;
	padding-bottom: calc($tabbar-height + env(safe-area-inset-bottom));
}
</style>
