<template>
	<view v-if="is_loading" class="distribution_order_list_container">
		<view class="nav_area">
			<view :data-type="item.type" :data-nav_index="index" @click="change_nav"
				:class="{ 'active': nav_index == index }" v-for="(item, index) in nav_list" :key="index">
				<text>{{ item.name }}</text>
			</view>
		</view>
		<view style="height: 90rpx;"></view>

		<view class="order_list_box">
			<view v-for="item in order_list" :key="item.id" class="order_list_item">
				<view class="distribution_stat">
					<view>{{ item.order_id }}</view>
					<!-- 0:;1:不参与结算;2:待结算;3:已结算 -->
					<view class="stat" v-if="item.distribution_stat == 2 && item.refund_res == 0">待结算</view>
					<view class="stat" v-if="item.distribution_stat == 3 && item.refund_res == 0">已结算</view>
					<view class="stat" v-if="item.refund_res == 2">已退款</view>
				</view>

				<view class="product_info" v-if="item.order_goods_list.length > 0"
					v-for="json_item in item.order_goods_list" :key="json_item.id">
					<!-- good_imgs -->
					<image lazy-load="true" :src="json_item.img_uri" mode="aspectFill" />
					<view class="detail_info">
						<view class="name_price">
							<text class="name">{{ json_item.goods_name }}</text>
							<!-- <text class="price">￥<text>{{json_item.unit_price}}</text></text> -->
						</view>
						<view class="guige_number">
							<view class="guige_list">
								<text v-if="json_item.spec_totall">{{ json_item.spec_totall }}</text>
							</view>
							<!-- <text class="number">x{{json_item.count}}</text> -->
						</view>

						<view style="width: 100%;display: flex;justify-content: space-between;align-items: center;">
							<view class="detail_desc" style="color: #6D6D6D;"><text>￥<text
										style="font-size: 29rpx;margin-right: 10rpx;">{{ json_item.unit_price
										}}</text></text>
								<text>x{{ json_item.count }}</text>
							</view>

							<view style="font-size: 22rpx;font-weight: 500;color: #6D6D6D;">
								佣金:￥{{ json_item.money_divide_user }}</view>
						</view>

						<!-- <view class="detail_desc"><text>{{json_item.count}}</text>件 实收:￥<text>{{json_item.price_all}}</text></view> -->
					</view>
				</view>

				<view class="distribution_stat" style="padding-bottom: 0;">
					<view style="color:#6D6D6D">{{ item.create_time }}</view>
					<view style="font-size: 22rpx;font-weight: 500;color: #000000;">
						共{{ item.goods_all }}件,合计佣金:{{ item.money_divide_user }}</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script setup>
import { ref } from 'vue';
import { request } from '@/utils/request.js';
import { onShow } from '@dcloudio/uni-app';

const is_loading = ref(false);
const order_list = ref([]);
const order_count = ref(0);
const nav_list = ref(
	[
		{ id: 1, name: "全部", type: 0, },
		{ id: 2, name: "待结算", type: 1, },
		{ id: 3, name: "已结算", type: 2, },
		{ id: 4, name: "已退款", type: 3, },
	]
);
const nav_index = ref(0);
const type = ref(0);


onShow(() => {
	distribution_center_data(type.value)
})


function change_nav(e) {
	nav_index.value = e.currentTarget.dataset.nav_index;
	type.value = e.currentTarget.dataset.type;
	order_list.value = [];
	// console.log('3333333', this.data.order_list);
	distribution_center_data(type.value)
	// console.log('555', this.data.order_list);
}
async function distribution_center_data(type) {
	let res = await request('/WxAppCustomer/distribution_order_list', 'post', {
		offset: order_list.value.length,
		type: type || 0,
	})
	// 更新数据
	if (res.code == 0) {
		order_list.value.push.apply(order_list.value, res.data.order_list)

		order_count.value = res.data.order_count;
		is_loading.value = true;
		uni.hideLoading();
	} else {
		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true
		})
	}
}
function onReachBottom() {
	if (order_count.value > order_list.value.length) {
		distribution_center_data(order_list.value.length)
	}
}
</script>

<style>
page {
	background-color: #F7F7F7;
	padding: 0;
	margin: 0;
}

.nav_area {
	width: 100%;
	height: 90rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	/* padding: 0 29rpx; */
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
	width: 24%;
}


.nav_area text {
	font-size: 26rpx;
	font-weight: 400;
	color: #000000;
	box-sizing: border-box;
}

.nav_area view.active {
	border-bottom: 4rpx solid #FF0000;
}

.order_list_box {
	display: flex;
	flex-direction: column;
	width: 100%;
	box-sizing: border-box;
	padding: 0 29rpx;
	padding-bottom: 50rpx;
}

.order_list_item {
	background-color: #fff;
	width: 100%;
	box-sizing: border-box;
	padding: 25rpx;
	border-radius: 17rpx;
	margin-top: 33rpx;
	display: flex;
	flex-direction: column;
}

.distribution_stat {
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	font-size: 25rpx;
	font-weight: 400;
	color: #000000;
	padding-bottom: 22rpx;
}

.distribution_stat .stat {
	font-size: 22rpx;
	font-weight: bold;
	color: #FF4F26;
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

/* .detail_desc text {
    color: #F46822;
    margin: 0 5rpx;
} */
</style>
