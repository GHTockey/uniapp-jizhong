<template>
	<view class="coupons-list">
		<view class="coupon" v-for="(item, index) in coupons" :key="index">
			<!-- 背景图片 -->
			<image class="img-bg" src="https://saas.jizhongkeji.com/static/jzkj/static/images//youhuiquan-bg.svg"></image>
			<view class="coupon-left">
				<text class="coupon-amount">
					<text style="font-size: 30rpx;">¥</text>{{ item.amount }}
				</text>
				<view class="right-border"></view>
				<text class="coupon-condition">{{ item.condition }}</text>
			</view>
			<view class="coupon-right">
				<text class="coupon-title">{{ item.title }}</text>
				<text class="coupon-date">{{ item.date }}</text>
				<text class="coupon-usage">{{ item.usage }}</text>
				<view class="coupon-button">立即使用</view>
				<!-- <view class="coupon-button">立即领取</view> -->
				<!-- <view class="coupon-button overdue">已过期</view> -->
				<!-- <view class="coupon-button overdue">已使用</view> -->
				<!-- <view class="coupon-button overdue">已领取</view> -->
				<!-- <view class="coupon-button grab-the-light">已抢光</view> -->
			</view>
		</view>
	</view>
</template>

<script setup>

const props = defineProps({
	coupons: {
		type: Array,
		required: true
	}
});
</script>

<style scoped lang="less">
// 优惠券列表样式
.coupons-list {
	padding: 20rpx;
	height: 100%;
	box-sizing: border-box;
	overflow-y: auto;
	// border: 1px solid gold;

	.coupon {
		margin: 0 auto;
		width: 691.67rpx;
		height: 208.33rpx;
		position: relative;
		display: flex;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		border-radius: 6.6px;
		// border: 1px solid gold;
		overflow: hidden;
		// clip-path: path("M 0 0 L 0 176 L 192 176 A 8 8 0 0 1 208 176 L 686 176 L 686 0 L 208 0 A 8 8 0 0 1 192 0");
		// background: radial-gradient(circle at right top, transparent 7px, #ffe6e6 0) top left / 225rpx 103rpx no-repeat,
		// 	radial-gradient(circle at right bottom, transparent 7px, #ffe6e6 0) bottom left / 225rpx 103rpx no-repeat,
		// 	radial-gradient(circle at left top, transparent 7px, #ffffff 0) top right / 490rpx 103rpx no-repeat,
		// 	radial-gradient(circle at left bottom, transparent 7px, #ffffff 0) bottom right / 490rpx 103rpx no-repeat;

		>.img-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}


		.coupon-left {
			// width: 220rpx;
			width: 207.65rpx;
			// background-color: #ffe6e6;
			// padding: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			// 虚线
			// border-right: #ff26262b 1px dashed;
			// // 圆角/*4个角落各放一个圆*/
			// -webkit-mask:
			// 	radial-gradient(circle at 0 0, #0000 0px, red 0),
			// 	radial-gradient(circle at right 0, #0000 8px, red 0),
			// 	radial-gradient(circle at 0 100%, #0000 0px, red 0),
			// 	radial-gradient(circle at right 100%, #0000 8px, red 0);
			// //   -webkit-mask-composite: source-in || destination-in ; /*chrome*/
			// /*Firefox*/
			// mask-composite: intersect;

			.right-border {
				// width: 1px;
				// background-color: gold;
				height: 85%;
				position: absolute;
				right: -1px;
				// border-right: #ff26262b 1.5px dashed;
			}



			.coupon-amount {
				font-size: 36rpx;
				color: #ff2626;
				font-weight: bold;
				margin-bottom: 20rpx;
			}

			.coupon-condition {
				font-size: 24rpx;
				color: #ff2626;
			}

			// &::before {
			// 	z-index: 11;
			// 	content: '';
			// 	display: inline-block;
			// 	width: 25rpx;
			// 	height: 25rpx;
			// 	background-color: #f4f6fa;
			// 	border-radius: 50%;
			// 	position: absolute;
			// 	top: 0;
			// 	right: 0;
			// 	transform: translateY(-50%) translateX(50%);
			// }

			// &::after {
			// 	z-index: 11;
			// 	content: '';
			// 	display: inline-block;
			// 	width: 25rpx;
			// 	height: 25rpx;
			// 	background-color: #f4f6fa;
			// 	border-radius: 50%;
			// 	position: absolute;
			// 	bottom: 0;
			// 	right: 0;
			// 	transform: translateY(50%) translateX(50%);
			// }
		}

		.coupon-right {
			// background-color: white;
			text-align: left;
			// width: 100%;
			flex: 1;
			height: 200rpx;
			box-sizing: border-box;
			position: relative;
			padding: 30rpx;
			// justify-content: space-between;
			// 圆角/*4个角落各放一个圆*/
			// -webkit-mask:
			// 	radial-gradient(circle at 0 0, #0000 8px, red 0),
			// 	radial-gradient(circle at right 0, #0000 0px, red 0),
			// 	radial-gradient(circle at 0 100%, #0000 8px, red 0),
			// 	radial-gradient(circle at right 100%, #0000 0px, red 0);
			// // -webkit-mask-composite: source-in | destination-in ; /*chrome*/
			// /*Firefox*/
			// mask-composite: intersect;

			.coupon-title,
			.coupon-date,
			.coupon-usage,
			.coupon-button {
				position: absolute;
			}

			.coupon-title {
				font-size: 29rpx;
				color: #181818;
				font-weight: bold;
				top: 35rpx;
			}

			.coupon-date {
				font-size: 22rpx;
				color: #525252;
				top: 90rpx;
				font-weight: 400;
			}

			.coupon-usage {
				font-size: 22rpx;
				color: #525252;
				top: 130rpx;
				font-weight: 400;
			}

			.coupon-button {
				width: 120rpx;
				height: 44rpx;
				background-image: linear-gradient(89deg, #ff3981 3%, #ff1e1a 97%);
				border-radius: 11.33px;
				cursor: pointer;
				right: 30rpx;
				top: 50%;
				transform: translateY(-50%);
				// font
				font-size: 24rpx;
				font-weight: 400;
				color: #ffffff;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			// 已过期 已使用
			.coupon-button.overdue {
				width: 60px;
				height: 22.67px;
				opacity: 0.9;
				border: 1px solid #999999;
				border-radius: 12.33px;
				background-image: none;
				color: #8c8c8c;
			}

			// 已抢光
			.coupon-button.grab-the-light {
				opacity: 0.9;
				background: #616161;
			}
		}
	}
}
</style>