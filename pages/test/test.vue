<template>
	<view>
		pages/test/test

		<CouponPopup :visible="showPopup" @close="handleClose" @claim="handleClaim" 
		title="aaa" 
		:amount=100 
		condition="满100可用" 
		expiryDate="2024.08.88"
		/>

		<!-- test btn -->
		<view>
			<button @click="showPopup = true" size="mini">优惠券弹窗</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";
import CouponPopup from "@/components/CouponPopup.vue";

const showPopup = ref(false);

const handleClose = () => {
	showPopup.value = false;
	console.log('Popup closed');
};

const handleClaim = () => {
	console.log('Coupon claimed');
	// 这里可以添加更多逻辑，例如更新状态或发送请求
};
async function testApi() {
	console.log('test');
	showPopup.value = !showPopup.value

	
	// uni.navigateTo({
	// 	url: '/pages/test/test'
	// })
	// return;
	
	
	// let data = {
	// 	__IS_APP__: 1,
	// 	wx_open_id: 'oPyg85Y9gzaTO9wgTmeApQMqmhRY',
	// 	user_id: '10662',
	// 	app_type: 'wx_mini_app',
	// 	fuid: 0,
	// };
	// let res = await request(
	// 	'/WxAppCustomer/home_all_data_v',
	// 	'POST',
	// 	data, {
	// 	['Content-Type']: 'multipart/form-data'
	// }
	// )
	// console.log(res);
}
</script>

<style></style>
