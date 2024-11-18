<template>
	<view>
		<checkbox-group class="content_order">
			<view class="content_item">
				<image lazy-load src="https://saas.jizhongkeji.com/static/jzkj/images/xiao.png" mode="widthFix" />
				<text>请选择取消订单的原因，帮助商家完善服务</text>
			</view>
			<label class="content_item content_item2">
				<text class="text">不想要了/临时有事</text>
				<checkbox value="" />
			</label>
			<label class="content_item content_item2">
				<text class="text">点错了/点多了/点少了</text>
				<checkbox value="" />
			</label>
			<label class="content_item content_item2">
				<text class="text">地址/电话填错了</text>
				<checkbox value="" />
			</label>
			<label class="content_item content_item2">
				<text class="text">送达时间选错了</text>
				<checkbox value="" />
			</label>
			<label class="content_item content_item2">
				<text class="text">忘记用红包/优惠券</text>
				<checkbox value="" />
			</label>
			<label class="content_item content_item2">
				<text class="text">忘记写备注</text>
				<checkbox value="" />
			</label>
			<label class="content_item content_item2">
				<text class="text">支付遇到问题</text>
				<checkbox value="" />
			</label>
		</checkbox-group>

		<view class="btn tce_theme_btn">取消订单</view>
	</view>
</template>

<script setup>

</script>

<style scoped>
page {
	background-color: #F0F0F0;
	padding-top: 30rpx;
}

.content_order {
	width: 700rpx;
	background: #FFFFFF;
	border-radius: 25rpx;
	display: block;
	margin: 0 auto;
	padding: 0 23rpx;
	box-sizing: border-box;
}

.content_item {
	display: flex;
	align-items: center;
	width: 100%;
	box-sizing: border-box;
	height: 100rpx;
	box-sizing: border-box;
	border-bottom: 1rpx solid #F3F3F3;
}

.content_item2 {
	justify-content: space-between;
}

.content_item image {
	width: 40rpx;
	height: 33rpx;
	margin-right: 8rpx;
}

.content_item text {
	font-size: 32rpx;
	font-weight: bold;
	color: #333333;
}

.content_item .text {
	color: #111413;
	font-weight: normal;
	font-size: 28rpx;
}

/* 未选中的背景样式 */
checkbox .wx-checkbox-input {
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
}

/* 选中后的背景样式 */
checkbox .wx-checkbox-input.wx-checkbox-input-checked {
	border-color: transparent;
	background-color: #FF4F26;
}

/* 选中后的勾子样式 */
checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
	width: 40rpx;
	height: 40rpx;
	line-height: 40rpx;
	border-radius: 50%;
	text-align: center;
	font-size: 28rpx;
	color: #FFF;
	background: transparent;
	transform: translate(-50%, -50%) scale(1);
	-webkit-transform: translate(-50%, -50%) scale(1);
}

.content_item:last-child {
	border-bottom-color: transparent;
}

.btn {
	font-size: 33rpx;
	font-weight: 500;
	color: #FFFFFF;
	margin: 0 auto;
	color: #FFFFFF;
	width: 700rpx;
	height: 87rpx;
	/* background: #FF4F26; */
	border-radius: 20rpx;
	border: 1rpx solid #FC4740;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 39rpx;
}
</style>
