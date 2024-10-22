<template>
	<view class="shopInfoList-container">
		<!-- <NavBar title="门店列表" showBack /> -->
		<view>
			<!-- 空列表 -->
			<view class="kong" v-if="shop_list.length <= 0">
				<image src="https://saas.jizhongkeji.com/static/jzkj/images/kong.png" mode="widthFix" />
				<text>暂无门店</text>
			</view>

			<!-- 门店列表 -->
			<view class="shop_list">
				<view v-for="item in shop_list" :key="item.id" class="shop_item">
					<image style="width: 100%;height:412rpx" mode="aspectFill" :src="item.image_uri"></image>

					<view class="context_list">
						<view class="shop_name">{{ item.shop_name }}</view>
						<view class="address_detail">{{ item.address_detail }}</view>
						<view class="bottom_list">
							<view class="left">
								<view class="daohang" @click="to_address(item)" style="margin-right: 30rpx;">地图导航</view>
								<view class="daohang" @click="phone(item.phone)">门店电话</view>
							</view>
						</view>
					</view>

				</view>
			</view>

		</view>

	</view>
</template>

<script setup>
import { ref } from 'vue';
import { request } from '@/utils/request.js';

const shop_list = ref([]);
const is_loading = ref(true);


getData();

async function getData() {
	uni.showLoading({ title: '加载中' })

	// 获取门店列表
	let res = await request('/WxAppCustomer/shop_info_list', 'POST', {})
	// console.log(res);
	if (res.code != 0) return uni.showToast({ title: res.msg, icon: 'error' });
	shop_list.value = res.data.shop_info_list;
	is_loading.value = false;

	uni.hideLoading();
}


// 跳转地图
function to_address(item) {
	var address = item.address.split(",")
	var latitude = address[0];
	var longitude = address[1];
	var name = item.shop_name;

	var address = item.address_name;

	console.log('位精度', latitude, longitude);
	uni.openLocation({
		longitude: parseFloat(longitude), // 经度
		latitude: parseFloat(latitude), // 纬度
		name: address, // 位置名称
		address: name // 地址详情
	})
}
// 拨打电话
function phone(phone) {
	uni.makePhoneCall({
		phoneNumber: phone,
		success() { },
		fail() { }
	})
}
</script>

<style>
.shopInfoList-container {
	background-color: #F0F0F0;
	padding-bottom: 40rpx;
}


.kong {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 400rpx;
}

.kong image {
	width: 300rpx;
	height: 200rpx;
	margin-bottom: 20rpx;
}

.kong text {
	font-size: 28rpx;
	font-weight: 500;
	color: #838383;
}

.bottom_xiajia {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 124rpx;
	background: #ffffff;
}


.bottom2 {
	background-color: #4791FF;
	height: 74rpx;
	width: 396rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #ffffff;
	font-size: 31rpx;
	border-radius: 14rpx;
}

.shop_list {
	width: 100%;
	box-sizing: border-box;
	padding: 0 30rpx;
	overflow: hidden;
}

.shop_item {
	width: 100%;
	background-color: #ffffff;
	box-shadow: 0rpx 2rpx 4rpx 1rpx rgba(0, 0, 0, 0.08);
	border-radius: 14rpx 14rpx 14rpx 14rpx;
	margin-top: 30rpx;
	overflow: hidden;
}

.context_list {
	display: flex;
	flex-direction: column;
	padding: 25rpx 28rpx;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
}

.shop_name {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: break-all;
	font-size: 32rpx;
	color: #333333;
	font-weight: bold;

}

.address_detail {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: break-all;
	font-size: 28rpx;
	color: #6A6A6A;
	margin-bottom: 30rpx;
	margin-top: 20rpx;
}

.bottom_list {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.bottom_list .left {
	display: flex;
}

.bottom_list .left .daohang {
	font-size: 25rpx;
	color: #FF4F26;
	width: 125rpx;
	height: 44rpx;
	border-radius: 29rpx 29rpx 29rpx 29rpx;
	border: 1rpx solid #FF4F26;
	display: flex;
	align-items: center;
	justify-content: center;
}

.bottom_list .right {
	font-size: 26rpx;
	color: #4791FF;
	display: flex;
	align-items: center;
}
</style>
