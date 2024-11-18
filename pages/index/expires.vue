<template>
	<view class="bottom_box">
		<image lazy-load class="topbg" src="https://saas.jizhongkeji.com/static/jzkj/images/daoqi.jpg"
			mode="widthFix" />

		<view class="bottom_btn bottom_text">
			<view>尊敬的用户您好</view>
			<view>您的云服务即将到期，为了不影响正常使用</view>
			<view>请联系技术人员及时续费</view>
		</view>
		<view class="bottom_btn">
			<view @click="freeTell" class="btn">拨打技术支持电话</view>

			<view @click="tohome" class="btn btn2">我知道了,关闭提醒</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	methods: {
		// 联系电话
		freeTell() {
			uni.makePhoneCall({
				phoneNumber: '18638714968', //仅为示例，并非真实的电话号码
				// success: function () {
				//     console.log("拨打电话成功！")
				// },
				// fail: function () {
				//     console.log("拨打电话失败！")
				// }
			})
		},
		tohome() {
			console.log('indexindexindex');
			uni.redirectTo({
				url: '/pages/index/index',
			})
		},
	}
}
</script>

<style>
/* pages/index/expires.wxss */
page {
	overflow: hidden;
}

.topbg {
	width: 100%;
	height: 200rpx;
	position: relative;
	top: 0;
	left: 0;
	flex: none;
}

.bottom_box {
	display: flex;
	flex-direction: column;
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	box-sizing: border-box;
	height: 100vh;
	padding-bottom: 200rpx;
	justify-content: space-between;
	overflow: hidden;
}

.bottom_btn {
	display: flex;
	flex-direction: column;
	width: 100%;
	box-sizing: border-box;
	padding: 0 30rpx;
}

.bottom_btn .btn {
	width: 692rpx;
	height: 83rpx;
	background: #179BF3;
	border-radius: 14rpx 14rpx 14rpx 14rpx;
	font-weight: 400;
	font-size: 31rpx;
	color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
}

.bottom_btn .btn2 {
	margin-top: 55rpx;
	border: 1rpx solid #179BF3;
	background: unset;
	color: #179BF3;
}

.bottom_text {
	font-weight: 400;
	font-size: 31rpx;
	color: #000000;
	align-items: center;
	line-height: 2;
	padding: 50rpx 0;
}
</style>
