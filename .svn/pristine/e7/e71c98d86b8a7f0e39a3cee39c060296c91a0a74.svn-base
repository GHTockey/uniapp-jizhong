<template>
	<view class="activity_list_container">

		<image v-if="!is_show_bar_title" class="img_home_bg"
			src="https://saas.jizhongkeji.com/static/jzkj/images/img_home_bg.png"></image>

		<view v-if="!is_show_bar_title"
			:style="`padding-top:${statusBarHeight}px;height:${navHeight}px;display: flex;align-items: center;color: #000;z-index: 109;position: fixed;`">
			<text style="margin-left: 24rpx;z-index: 99;">活动</text>
		</view>

		<!-- <customNavigation wx:if="{{is_show_bar_title}}"
			class="bar_title {{has_bar_title_color?'bar_title_color':''}} {{is_show_bar_title? '':'bar_title_none'}}">
			<text style="margin-left: 24rpx;">活动</text></customNavigation> -->

		<NavBar class="!justify-start" title="活动"
			:class="`bar_title ${has_bar_title_color ? 'bar_title_color' : ''} ${is_show_bar_title ? '' : 'bar_title_none'}`"
			v-if="is_show_bar_title">
		</NavBar>

		<view :style="`height:${statusBarHeight + navHeight + 50}rpx;`"></view>


		<view class="product_area">
			<view :class="`${is_show_bar_title ? 'has_backgord' : ''}`"
				:style="`position: sticky;top:${statusBarHeight + navHeight + 50}rpx;`">
			</view>

			<view class="product_list" v-if="productList.length > 0" style="margin-top:50rpx">
				<view @click="to_application_index(item)" class="product_item_v" v-for="(item, index) in productList"
					:key="index">
					<image style="width: 278rpx;height: 200rpx;border-radius: 10rpx;margin-right: 33rpx;flex: none;"
						lazy-load :src="item.image_uri" mode="aspectFill" />
					<view class="product_info_v">
						<text class="title_v">{{ item.name }}</text>

						<view style="display: flex;font-size: 25rpx;color: #999999;">
							<view>开始时间：{{ item.start_time ? item.start_time : '现在' }}</view>
						</view>
						<view style="display: flex;font-size: 25rpx;color: #999999;">
							<view>结束时间：{{ item.end_time ? item.end_time : '长期有效' }}</view>
						</view>

						<view class="click_count">
							<view style="display: flex;align-items: center;">
								<image style="width: 20rpx;height: 24rpx;" lazy-load
									src="https://saas.jizhongkeji.com/static/jzkj/images/active_top.png"
									mode="aspectFill" />
								<view><text style="margin-left: 10rpx;margin-right: 5rpx;">热度</text>{{ item.click_count
									}}
								</view>
							</view>

							<!-- // 1:未开始2：报名中3:已结束 -->
							<image v-if="item.active_stat == 1" style="width: 95rpx;height: 35rpx;" lazy-load
								src="https://saas.jizhongkeji.com/static/jzkj/images/active_start.png"
								mode="aspectFill" />

							<image v-if="item.active_stat == 2" style="width: 95rpx;height: 35rpx;" lazy-load
								src="https://saas.jizhongkeji.com/static/jzkj/images/active_ing.png"
								mode="aspectFill" />
							<image v-if="item.active_stat == 3" style="width: 95rpx;height: 35rpx;" lazy-load
								src="https://saas.jizhongkeji.com/static/jzkj/images/start_end.png" mode="aspectFill" />
						</view>
					</view>
				</view>
			</view>

			<view class="kong" v-if="productList.length <= 0">
				<image lazy-load src="https://saas.jizhongkeji.com/static/jzkj/images/kong.png" mode="widthFix" />
				<text>暂无内容</text>
			</view>
		</view>
	</view>
	<TabBar class="fixed-bottom" :isAppMode="true" />
</template>

<script setup>
import { ref } from 'vue';
import { request } from '@/utils/request.js';
import { onLoad, onShow, onReachBottom, onPageScroll } from '@dcloudio/uni-app';
import { useTempStore } from '@/stores/temp';
import { storeToRefs } from 'pinia';

const { user: userInfo } = storeToRefs(useTempStore())

const nav_list = ref([])
const id = ref(0)

const statusBarHeight = ref(uni.getSystemInfoSync()['statusBarHeight'])
const navHeight = ref(uni.getSystemInfoSync()['statusBarHeight'] || 40)


// 头部标题是否有白色背景
const has_bar_title_color = ref(false)
const is_show_bar_title = ref(false)

const productList = ref([])
const goods_count = ref(0)


onLoad(options => {
	const menuButtonRect = uni.getMenuButtonBoundingClientRect?.()
	if (menuButtonRect) {
		navHeight.value = (menuButtonRect.top - statusBarHeight.value) * 2 + menuButtonRect.height
		console.log('navHeight', navHeight.value);
	}
})
onShow(() => {
	// this.onLogin(user => {
	//   this.setData({
	//     userInfo: user,
	//     tarbarupdated: this.data.tarbarupdated++
	//   })
	//   this.recommend_product()
	// })
	recommend_product()
})
onReachBottom(() => {
	if (goods_count.value > productList.value.length) {
		recommend_product(productList.value.length)
	}
})
onPageScroll(e => {
	// console.log('onPageScroll', e);
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


function to_application_index(applicationitem) {

	console.log('applicationitemapplicationitem', applicationitem.id);

	if (applicationitem.product_id > 0) {
		go_applications(applicationitem);

		return;
	}
	uni.navigateTo({
		url: '/pages/activity/application_index?activity_id=' + applicationitem.id,
	})
}

function go_applications(activity) {

	if (activity.start_time && activity.start_time > activity.end_date) {
		uni.showModal({
			title: '活动未开始',
			content: '活动未开始',
			showCancel: false,
			complete: (res) => {

			}
		})
		return
	}

	if (activity.end_time && activity.end_date > activity.end_time) {
		uni.showModal({
			title: '活动结束',
			content: '活动结束',
			showCancel: false,
			complete: (res) => {

			}
		})
		return
	}


	// if (this.data.is_join) {
	//   // 已经报名过的去报名记录页
	//   wx.navigateTo({
	//     url: `/pages/activity/application_record?activity_id=${this.data.activity_id}`,
	//   })
	// } else {
	uni.navigateTo({
		url: `/pages/activity/application?activity_id=${activity.id}&type=2`,
	})
	// }
}

async function recommend_product(length) {

	let res = await request('/WxAppCustomer/activity_list', 'post', { offset: length || 0 })
	if (res.code != 0) return uni.showToast({ title: res.msg, icon: 'none' })

	if (length) {
		productList.value.push.apply(productList.value, res.data.goods_list)
	} else {
		productList.value = res.data.goods_list
	}
	goods_count.value = res.data.goods_count
}

function choose_nav(id) {
	id.value = id
	recommend_product()
}
</script>

<style>
@import "../../static/styles/introproduct.css";
</style>

<style scoped lang="scss">
.activity_list_container {
	// background-color: aquamarine;
	min-height: 100vh;
	padding-bottom: $tabbar-height;
}
</style>