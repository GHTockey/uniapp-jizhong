<template>
	<view class="tu_img">
		<image src="https://saas.jizhongkeji.com/static/jzkj/images/tuikuan.png" mode="widthFix"></image>
		<text>您的退款申请已提交
			请等待商家处理</text>
		<!-- <text style="font-weight: 300;font-size: 29rpx;">客户主动确认收货，或发货满7天后\n该订单状态切换为“已完成”</text> -->
		<view @click="to_list_page" class="btn">
			<text>返回</text>
		</view>
	</view>

</template>

<script setup>



// 去列表页
function to_list_page() {
	uni.navigateBack({
		delta: 1 // 返回的页面数，如果 delta 是2，就返回上两级页面
	})
}
</script>

<style>
.tu_img {
	width: 100%;
	padding-top: 160rpx;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.tu_img image {
	width: 120rpx;
	height: 120rpx;
}

.tu_img text {
	margin-top: 30rpx;
	color: #313131;
	font-size: 33rpx;
	font-weight: bold;
}

.btn {
	margin-top: 580rpx;
	width: 375rpx;
	height: 74rpx;
	background-color: #FF4F26;
	border-radius: 14rpx;
	border: 1rpx solid #FF4F26;
	display: flex;
	justify-content: center;
	align-items: center;
}

.tu_img .btn text {
	margin-top: 0rpx;
	color: #fff;
	font-size: 31rpx;
}
</style>
