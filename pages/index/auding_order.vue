<template>
	<view class="auding_order_container" v-if="is_loading">

		<view class="course_box" style="align-items: center;" v-if="order.shoper_id != user.shoper_id">
			<image mode="widthFix" style="width: 88rpx;height: 88rpx;margin-right:20rpx;"
				src="https://saas.jizhongkeji.com/static/jzkj/images/yellow.png"></image>
			<view class="scan_peron">
				<view style="font-weight: 700;">非本店订单</view>
				<view style="font-weight: 400;font-size: 25rpx;color: #989898;">
					请告知客户到{{ shop.city }}—{{ shop.shop_name }}店核销</view>
			</view>
		</view>

		<view class="course_box" style="align-items: center;" v-if="order.status == 8">
			<!-- 订单已完成 -->
			<image mode="widthFix" style="width: 88rpx;height: 88rpx;margin-right:20rpx;"
				src="https://saas.jizhongkeji.com/static/jzkj/images/success_dui.png"></image>
			<view class="scan_peron">
				<view style="font-weight: 700;">该订单已核销</view>
				<!-- 后台管理员核销 -->
				<view style="font-weight: 400;font-size: 25rpx;color: #989898;" v-if="order.pick_name">
					{{ order.pick_name }}于{{ order.pick_time }}操作核销</view>
				<view style="font-weight: 400;font-size: 25rpx;color: #989898;" v-else>{{ pick_name.user_name ?
					pick_name.user_name : (pick_name.nickname ? pick_name.nickname : '匿名用户') }}于{{ order.pick_time
					}}操作核销
				</view>
			</view>
		</view>

		<view class="order_list">
			<view class="order_item" key="index">
				<view class="product_info" v-if="order.json_info" v-for="(json_item, json_index) in order.json_info"
					:key="json_index">
					<image lazy-load :src="json_item.img_uri" mode="aspectFill" />
					<view class="detail_info">
						<view class="name_price">
							<text class="name">{{ json_item.name }}</text>
							<text class="price">￥<text>{{ json_item.unit_price }}</text></text>
						</view>
						<view class="guige_number">
							<view class="guige_list">
								<text v-if="json_item.spec_totall">{{ json_item.spec_totall }}</text>
							</view>
							<text class="number">x{{ json_item.count }}</text>
						</view>
						<view class="detail_desc"><text>{{ json_item.count }}</text>件
							实收:￥<text>{{ json_item.price_all }}</text></view>
					</view>
				</view>

				<!-- <view class="price_all">
					<view class="detail_desc">共<text style="color: #F46822;">{{item.goods_all}}</text>件 实收:￥<text style="color: #F46822;">{{item.price_all}}</text>(含快递费：￥0.00)</view>
				</view> -->
			</view>
		</view>

		<view class="content_list">
			<view class="context_box">
				<view class="container_box">

					<view class="bottom_list">
						<view class="item">
							<view>人员姓名</view>
							<view class="right">{{ order.user_name }}</view>
						</view>
						<view class="item">
							<view>联系手机</view>
							<view class="right">{{ order.mobile }}</view>
						</view>
						<view class="item">
							<view>提货门店</view>
							<view class="right">{{ shop.city }}—{{ shop.shop_name }}</view>
						</view>
						<view class="item">
							<view>订单编号</view>
							<view class="right">{{ order.order_id }}</view>
						</view>

						<view class="item" style="border-bottom: 0;">
							<view>下单时间</view>
							<view class="right">{{ order.order_time }}</view>
						</view>
					</view>
				</view>
				<view class="bottom_tips">请确认好商品及数量无误后再进行核销，订单一经核销无法撤回，请谨慎操作</view>
			</view>
		</view>

		<view v-if="order.shoper_id == user.shoper_id && order.status != 8" @click="confire"
			style="display: flex;justify-content: center;width:100%;padding: 0 28rpx;box-sizing: border-box;">
			<view style="width: 100%;" class="form_buttom">确认核销</view>
		</view>
		<view v-else @click="to_scan"
			style="display: flex;justify-content: center;width:100%;padding: 0 28rpx;box-sizing: border-box;">
			<view style="width: 100%;" class="form_buttom">核销其他订单</view>
		</view>

		<view @click="to_home" style="display: flex;justify-content: center;width:100%;margin-top:50rpx">
			<view class="form_buttom"
				style="width: 100%;background: #fff;border:1rpx solid #FF0000;color: #FF0000;box-sizing: border-box; margin: 0 30rpx;">
				返回个人中心</view>
		</view>

		<view style="height: 100rpx;"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { useTempStore } from '@/stores/temp';
import { storeToRefs } from 'pinia';
import { request } from '@/utils/request';

const { user, business } = storeToRefs(useTempStore());

const order_id = ref();
const shop = ref();
const order = ref();
const pick_name = ref();
const is_loading = ref(false);


onLoad((options) => {
	if (options && options.scene) {
		var active_str = decodeURIComponent(options.scene)
		if (active_str.indexOf('order_id') == 0) {
			// this.data.order_id = parseInt(active_str.split('=')[1]);
			order_id.value = active_str.substr('order_id'.length);
		}
		console.log('区域码id', order_id.value);
	}

	if (options && options.order_id) {
		order_id.value = options.order_id;
		console.log('order_id', order_id.value);
	}

	if (order_id.value > 0) {
		apply_detail();
	}
});

async function apply_detail() {
	try {
		let res = await request('/WxAppCustomer/order_info', 'post', { id: order_id.value })
		// 更新数据
		if (res.code == 0) {
			shop.value = res.data.shop;
			order.value = res.data.order;
			pick_name.value = res.data.pick_name;
			is_loading.value = true;
		} else {
			uni.showToast({
				title: res.msg,
				icon: 'none',
				mask: true
			})

			// setTimeout(() => {
			// 	uni.navigateBack();
			// }, 500)
		}

	} catch (error) {
		uni.showToast({
			title: '加载数据失败',
			icon: 'none'
		})
	}
}

function to_home() {
	uni.redirectTo({
		url: '/pages/mine/mine',
	})
}

function to_scan() {
	let pages = getCurrentPages()
	let index = pages.findIndex(item => item.route == 'pages/mine/scan_order')

	if (index == -1) {
		uni.redirectTo({
			url: '/pages/mine/scan_order',
		})
	} else {
		// this.navigateBack();
		uni.navigateBack({
			delta: pages.length - index - 1
		})
	}
}

async function confire() {
	uni.showModal({
		title: '系统提示',
		content: '确认核销吗?',
		complete: async (res) => {
			// if (res.cancel) {}
			if (res.confirm) {
				try {
					let reqRes = await request('/WxAppCustomer/confire_order', 'post', { id: order_id.value })
					// 更新数据
					if (reqRes.code == 0) {
						shop.value = reqRes.data.shop
						order.value = reqRes.data.order
						pick_name.value = reqRes.data.pick_name
					} else {
						uni.showToast({
							title: reqRes.msg,
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
		}
	})
}
</script>

<style scoped>
/* @import '/pages/mine/appointent.wxss'; */
@import '../../static/styles/appointentOld.css';

.bottom_list {
	background: #ffffff;
	border-radius: 14rpx;
	/* margin-top: 30rpx; */
	box-sizing: border-box;
	/* padding: 0 28rpx; */
	display: flex;
	flex-direction: column;
}

.bottom_list .item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: 400;
	font-size: 28rpx;
	color: #383838;
	border-bottom: 1rpx solid #CACACA;
	height: 100rpx;
	color: #383838;
	font-size: 29rpx;
	font-weight: bold;
	flex: none
}

.bottom_list .item .right {
	font-weight: normal;
}

.form_buttom {
	color: #ffffff;
	font-size: 35rpx;
	width: 692rpx;
	height: 88rpx;
	background: linear-gradient(89deg, #ff3981 3%, #ff1e1a 97%);
	border-radius: 7rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.course_box {
	background: #ffffff;
	border-radius: 14rpx;
	box-sizing: border-box;
	padding: 28rpx;
	display: flex;
	margin: 0 28rpx;
	margin-top: 30rpx;
}




page {
	background-color: #F0F0F0;
	padding-top: 0;
}

.kong {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	padding-top: 400rpx;
	box-sizing: border-box;
}

.kong image {
	width: 239rpx;
	height: 128rpx;
	margin-bottom: 42rpx;
}

.kong text {
	font-size: 28rpx;
	font-weight: 500;
	color: #838383;
}

.nav_area {
	width: 100%;
	height: 90rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 0 29rpx;
	background-color: #fff;
	position: fixed;
	margin-bottom: 20rpx;
}

.nav_area view {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 4rpx solid transparent;

}


.nav_area text {
	font-size: 28rpx;
	color: #4D4D4D;
	box-sizing: border-box;
}

.nav_area view.active {
	border-bottom: 4rpx solid #1378FF;
}

.picker {
	width: 100%;
	box-sizing: border-box;
	padding: 0 29rpx;
	height: 63rpx;
	background: #FFFFFF;
	display: flex;
	align-items: center;
}

.picker .shaixuan {
	display: flex;
	align-items: center;
	margin-right: 58rpx;
}

.picker .shaixuan image {
	width: 18rpx;
	height: 10rpx;
}

.picker .shaixuan text {
	font-size: 25rpx;
	font-weight: 400;
	color: #4D4D4D;
	margin-right: 8rpx;
}

.search {
	display: flex;
	justify-content: center;
	align-items: center;
}

.search image {
	width: 17rpx;
	height: 17rpx;
}

.search text {
	font-size: 25rpx;
	font-weight: 400;
	color: #4D4D4D;
	margin-right: 8rpx;
}

.order_list {
	display: flex;
	flex-direction: column;
	width: 100%;
	box-sizing: border-box;
	padding: 0 29rpx;
	padding-top: 30rpx;
}

.order_item {
	width: 100%;
	box-sizing: border-box;
	padding: 30rpx 22rpx;
	background-color: #fff;
	border-radius: 12rpx;
	/* margin-bottom: 22rpx; */
}

.order_item .date_state {
	font-size: 24rpx;
	width: 100%;
	justify-content: space-between;
	display: flex;
	align-items: center;
	margin-bottom: 35rpx;
}

.order_item .date_state text:nth-child(1) {
	color: #989898;
}

.order_item .date_state .state {
	color: #F46822;
}

.product_info {
	width: 100%;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	margin-bottom: 25rpx;
}

.product_info image {
	width: 160rpx;
	height: 160rpx;
	border-radius: 10rpx;
	flex: none;
	margin-right: 20rpx;
}

.detail_info {
	width: 72%;
	height: 160rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.name_price {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.name_price .name {
	font-size: 28rpx;
	color: #333333;
	font-weight: bold;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: block;
	width: 75%;
}

.name_price .price {
	font-size: 24rpx;
	color: #333333;
	font-weight: 500;
}

.guige_number {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.guige_number .guige_list {
	width: 70%;
	display: flex;
	align-items: center;
}

.guige_number .guige_list text {
	font-size: 22rpx;
	color: #111015;
	padding: 8rpx 16rpx;
	display: block;
	background-color: #E7EFFF;
	border-radius: 8rpx;
	margin-right: 20rpx;
}

.guige_number .guige_list text:last-child {
	margin-right: 0;
}

.guige_number .number {
	color: #F46822;
	font-size: 24rpx;
}

.detail_desc {
	font-size: 22rpx;
	color: #999999;
}

.detail_desc text {
	color: #F46822;
	margin: 0 5rpx;
}

.order_info {
	width: 100%;
	box-sizing: border-box;
	padding: 20rpx;
	background-color: #F6F7FB;
	border-radius: 10rpx;
}


.order_info_v {
	width: 100%;
	box-sizing: border-box;
	padding: 20rpx;
	background-color: #F6F7FB;
	border-radius: 10rpx;
}

.order_info view {
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	margin-bottom: 30rpx;
}

.order_info view:last-child {
	margin-bottom: 0;
}

.order_info view image {
	width: 20rpx;
	height: 30rpx;
	margin-right: 10rpx;
	margin-top: 0.2em;
	flex: none;
}

.order_info view text {
	font-size: 26rpx;
	color: #1D1D1D;
	line-height: 1.5;
}

.order_btn {
	padding-top: 30rpx;
}

.state_btn {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
}

.state_btn text {
	/* width: 150rpx; */
	height: 58rpx;
	border-radius: 29rpx;
	border: 1rpx solid rgba(92, 92, 92, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 28rpx;
	font-weight: 400;
	color: #5C5C5C;
	margin-right: 22rpx;
	padding: 0 10rpx;
}

.state_btn text:last-child {
	margin-right: 0;
}

.state_btn text.active {
	font-size: 28rpx;
	font-weight: 400;
	color: #FF4F26;
	border: 1rpx solid #FF4F26;
}

.price_all {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-size: 28rpx;
	color: #4D4D4D;
	padding-bottom: 20rpx;
}

.bottom_tips {
	font-size: 29.17rpx;
	font-weight: 400;
	text-align: justify;
	color: #7d7d7d;
	line-height: 1.5;
	letter-spacing: 0.82rpx;
	margin-top: 28rpx;
}

.container_box {
	padding-top: 0;
}

.content_list {
	padding-bottom: 40rpx;
}
</style>

<style lang="scss" scoped>
.auding_order_container {
	background-color: #f0f0f0;
	min-height: 100vh;
	overflow: hidden;
}
</style>
