<template>
	<view>
		<!--pages/mine/withdraw_list.wxml-->
		<view class="list_box" v-if="is_loading">
			<view class="list_item" v-if="withdraw_list.length > 0" v-for="item in withdraw_list" :key="item.id">
				<view class="left">
					<view v-if="item.type == 1">提现到微信零钱</view>
					<view v-if="item.type == 2">提现到银行卡</view>
					<view class="create">{{ item.update_time }}</view>
				</view>
				<view class="right">
					<view>￥{{ item.money }}</view>
					<view v-if="item.pass_stat == 0">待审核</view>
					<view v-if="item.pass_stat == 1">已转账</view>
					<view v-if="item.pass_stat == 2">拒绝申请</view>
				</view>
			</view>

			<view class="kong" v-if="withdraw_list.length <= 0">
				<image lazy-load src="https://saas.jizhongkeji.com/static/jzkj/images/kong.png" mode="widthFix" />
				<text>暂无内容</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad, onShow, onReachBottom } from '@dcloudio/uni-app';
import { request } from '@/utils/request';



const withdraw_list = ref([]); // 提现记录
const withdraw_list_count = ref(0); // 提现记录总数
const is_loading = ref(false); // 是否加载中


onShow(() => {
	withdraw_list_data()
})
onReachBottom(() => {
	withdraw_list_data(withdraw_list.value.length)
})


async function withdraw_list_data() {

	let res = await request('/WxAppCustomer/withdraw_list', 'post', {
		offset: withdraw_list.value.length,
	});
	console.log('withdraw_list_data', res);
	if (res.code != 0) return uni.showToast({ title: res.data.msg, icon: 'none', mask: true })

	withdraw_list.value.push.apply(withdraw_list.value, res.data.withdraw_list)
	withdraw_list_count.value = res.data.withdraw_list_count
	is_loading.value = true
}
</script>

<style scoped>
.list_box {
	width: 100%;
	padding: 30rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	padding-top: 0;
	padding-bottom: 50rpx;
}

.list_item {
	width: 100%;
	padding: 30rpx;
	box-sizing: border-box;
	background: #FFFFFF;
	border-radius: 17rpx 17rpx 17rpx 17rpx;
	font-size: 28rpx;
	color: #000000;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 30rpx;
}

.left {
	display: flex;
	flex-direction: column;
}

.left .create {
	font-size: 22rpx;
	color: #787878;
}

.right {
	font-size: 21rpx;
	color: #787878;
	min-width: 100rpx;
	text-align: end;
}
</style>
<style scoped lang="scss"></style>
