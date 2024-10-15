<template>
	<view>
		pages/test/test

		<CouponPopup :visible="showPopup" @close="handleClose" @claim="handleClaim" title="aaa" :amount=100
			condition="满100可用" expiryDate="2024.08.88" />

		<!-- test btn -->
		<view>
			<button @click="showPopup = true" size="mini">优惠券弹窗</button>
			<button @click="testApi" size="mini">test api</button>
			<button @click="goToPage('/pages/shopcar/shopcar')" size="mini">跳转至购物车页</button>
			<button @click="goToPage('/pages/onlineSearch/onlineSearch')" size="mini">跳转至在线搜索页</button>
			<button @click="goToPage('/pages/goodsDetail/goodsDetail')" size="mini">跳转商品详情页</button>
			<button @click="showActionSheet = true" size="mini">使用ActionSheet组件</button>
		</view>


		<ActionSheet :items="actionSheetData.items" :title="actionSheetData.title" v-model:show="showActionSheet"
			@confirm="handleConfirm" />
	</view>
</template>

<script setup>
import { ref } from "vue";
import CouponPopup from "@/components/CouponPopup.vue";
import { request } from "@/utils/request.js"

const showPopup = ref(false);
const showActionSheet = ref(false);

// 跳转到指定页
function goToPage(page) {
	uni.navigateTo({
		url: page
	})
}

// actionSheet 数据
const actionSheetData = ref({
	title: '商品参数',
	items: [
		{ name: '颜色', value: '红色' },
		{ name: '尺寸', value: '大号' },
		{ name: '尺寸', value: '大号' },
		{ name: '尺寸', value: '大号' },
		{ name: '尺寸', value: '大号' },
		{ name: '尺寸', value: '大号' },
		{ name: '尺寸', value: '大号' },
		{ name: '尺寸', value: '大号' },
		{ name: '尺寸', value: '大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号' },
	]
})

const handleClose = () => {
	showActionSheet.value = false;
	console.log('Popup closed');
};
const handleClaim = () => {
	console.log('Coupon claimed');
}

const handleConfirm = () => {
	console.log('Coupon claimed');
	// 这里可以添加更多逻辑，例如更新状态或发送请求
};
async function testApi() {
	console.log('test');


	// uni.navigateTo({
	// 	url: '/pages/test/test'
	// })
	// return;


	let data = {
		// __IS_APP__: 1,
		wx_open_id: 'oPyg85Y9gzaTO9wgTmeApQMqmhRY',
		// user_id: '10662',
		// app_type: 'wx_mini_app',
		// fuid: 0,
		// preview: 0
	};
	// 转成form-data
	// data = Object.keys(data).reduce((acc, key) => {
	// 	acc.append(key, data[key]);
	// 	return acc;
	// }, new FormData());

	console.log(data);
	let res = await request(
		'/jzkj/WxAppCustomer/home_all_data_v',
		'post',
		data,
		{
			// ['Content-Type']: 'multipart/form-data'
			['Content-Type']: 'application/x-www-form-urlencoded' // 为什么要用这个才是FormData数据
		}
	)
	console.log(res);
}
</script>

<style></style>
