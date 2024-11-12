<template>
	<view class="my_content">

		<HeightBar appendTitleBar appendNavBar />
		<NavBar title="" showBack />

		<view class="msg_box flex_col_cen_cen">
			<image lazy-load class="correct_icon" mode="widthFix"
				src="https://saas.jizhongkeji.com/static/jzkj/images/correct_icon.png"></image>
			<view class="msg_text font_bold color333 text_center margin_top28">下单成功</view>
			<view class="msg_text grey text_center margin_top28" v-if="buy_type == 1">请您及时到自提点</view>
			<view class="msg_text grey text_center" v-if="buy_type == 1">向店长出示二维码，核销完成后即可提货</view>

			<view class="msg_text grey text_center margin_top28" v-else>请等待商家发货，可在“我的订单”中</view>
			<view class="msg_text grey text_center">查看该订单详情</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const buy_type = ref(-1);


onLoad(options => {
	if (options && options.buy_type) {
		buy_type.value = options.buy_type
	}
}) 
</script>

<style>
.my_content {
	box-sizing: border-box;
	padding: 0rpx 30rpx;
	width: 100vw;
}

.msg_box {
	padding: 40rpx 0rpx;
	/* border-bottom: 2rpx solid #EEEEEE; */
}

.correct_icon {
	height: 83rpx;
	width: 83rpx;
}

.msg_text {
	font-size: 38rpx;
}

.grey {
	font-size: 30rpx;
	color: #9A9A9A;
}
</style>
