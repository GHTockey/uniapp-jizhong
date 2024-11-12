<template>
	<view class="team_container" v-if="is_loading">
		<view class="top">
			<view :class="`select ${type == 1 ? 'active' : ''}`" @click="change(1)" data-changetype="1">一级</view>
			<view :class="`select ${type == 2 ? 'active' : ''}`" @click="change(2)" data-changetype="2">二级</view>
		</view>


		<view class="middle" v-if="team_list.length > 0">
			<view class="item" v-for="item in team_list" :key="item.id">
				<view class="left_box">
					<image class="left" mode="aspectFill"
						:src="item.wx_image ? item.wx_image : 'https://saas.jizhongkeji.com/static/jzkj/images/default_tou.png'">
					</image>
					<view class="hang1">
						<view class="hang2">
							<view>{{ item.user_name ? item.user_name : (item.nickname ? item.nickname : '匿名用户') }}
							</view>
							<view v-if="item.is_distribution == 1" class="fenxaio">分销商</view>
							<view v-else class="fenxaio fenxaio_pu">普通用户</view>
						</view>
						<view style="font-weight: 400;font-size: 22rpx;color: #787878;">加入时间：{{ item.create_time }}
						</view>
					</view>
				</view>
			</view>
		</view>


		<view class="kong_box" v-if="team_list.length <= 0">
			<image class="kong_img" src="https://saas.jizhongkeji.com/static/jzkj/images/kong.png"></image>
			<view>暂无数据</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow, onReachBottom } from '@dcloudio/uni-app';
import { request } from '@/utils/request.js'

const team_list = ref([]);
const team_count = ref(0);
const type = ref(1);
const is_loading = ref(false);


onShow(() => {
	uni.showLoading({
		title: 'loading',
	})
	team_list_data();
})
onReachBottom(() => {
	if (team_count.value > team_list.value.length) {
		team_list_data(team_list.value.length)
	}
})

function change(changetype) {
	type.value = changetype;
	team_list.value = [];
	team_count.value = 0;
	team_list_data();

}
async function team_list_data(length) {
	// var team_list = that.data.team_list

	let res = await request('/WxAppCustomer/team_list', 'post', {
		type: type.value || '',
		offset: length || 0
	})
	// 更新数据
	if (res.code == 0) {

		if (length) {
			team_list.value.push.apply(team_list.value, res.data.team_list)
		} else {
			team_list.value = res.data.team_list
		}

		uni.hideLoading();

		team_count.value = res.data.team_count
		is_loading.value = true;

	} else {
		uni.showToast({
			title: res.data.msg,
			icon: 'none',
			mask: true
		})
	}
}
</script>

<style>
page {
	background-color: #F7F7F7;
	padding: 0;
}

.top {
	width: 100%;
	background-color: #ffffff;
	height: 68rpx;
	display: flex;
	align-items: center;
	font-weight: 400;
	font-size: 26rpx;
	color: #000000;
	justify-content: space-between;
}

.select {
	width: 50%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
}

.top .active {
	border-bottom: 3rpx solid #FF0000;
}

.middle {
	width: 100%;
	padding: 0 28rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	padding-bottom: 100rpx;
}

.item {
	width: 100%;
	box-sizing: border-box;
	padding: 28rpx 22rpx;
	background-color: #ffffff;
	border-radius: 17rpx;
	margin-top: 28rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.item .left {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	flex: none;
	margin-right: 20rpx;
}

.item .left_box {
	display: flex;
}

.hang1 {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100rpx;
	box-sizing: border-box;
	padding: 5rpx 0;
	font-weight: 400;
	font-size: 29rpx;
	color: #000000;
}

.fenxaio {
	width: 83rpx;
	height: 29rpx;
	border-radius: 6rpx 6rpx 6rpx 6rpx;
	border: 1rpx solid #F50000;
	font-weight: 500;
	font-size: 17rpx;
	color: #FF0000;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 12rpx;
	flex: none;
}

.fenxaio_pu {
	border: 1rpx solid #191919;
	color: #191919;
}

.hang2 {
	display: flex;
	align-items: center;
}

.right_box {
	flex: none;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-weight: 400;
	font-size: 21rpx;
	color: #787878;
	align-items: flex-end;
	min-height: 100rpx;
	box-sizing: border-box;
	padding: 10rpx 0;
}


.kong_box {
	display: flex;
	align-items: center;
	flex-direction: column;
	font-weight: 500;
	font-size: 28rpx;
	color: #838383;
	margin-top: 260rpx;
}

.kong_img {
	width: 238.89rpx;
	height: 127.78rpx;
	flex: none;
	margin-bottom: 15rpx;
}
</style>
