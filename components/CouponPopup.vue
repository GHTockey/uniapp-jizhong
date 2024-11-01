<template>
	<transition name="fade">
		<view v-if="visible" class="overlay">
<!-- 			<view class="coupon-popup" @click.stop
				style="background-image: url('https://saas.jizhongkeji.com/static/jzkj/static/images/youhuiquan.png');"> -->
			<view class="coupon-popup" @click.stop>
				<image class="bg-img" src="https://saas.jizhongkeji.com/static/jzkj/static/images/youhuiquan.png" mode="aspectFill"></image>
				<view class="popup-header">
					<span>{{ title }}</span>
				</view>
				<view class="popup-content">
					<view class="amount">
						<text style="font-size: 32rpx;">¥</text>{{ amount }}
					</view>
					<view class="condition">{{ condition }}</view>
					<view class="expiry">有效期截至{{ expiryDate }}请尽快使用</view>
					<view class="claim-btn" @click="claimCoupon"></view>
				</view>
				<!-- 关闭按钮 -->
				<view class="close-btn" @click.stop="closePopup">				
					<image style="width: 100%; height: 100%;" mode="aspectFill" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/close-icon.png">
					</image>
				</view>
			</view>
		</view>
	</transition>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
	title: {
		type: String,
		default: '优惠券标题'
	},
	amount: {
		type: Number,
		default: 1000
	},
	condition: {
		type: String,
		default: '优惠券使用条件'
	},
	expiryDate: {
		type: String,
		default: '2024.08.08'
	},
	visible: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(['close', 'claim']);

const closePopup = () => {
	emit('close');
	emit('update:visible', false);
};

const claimCoupon = () => {
	emit('claim');
};
</script>

<style lang="less" scoped>
// 蒙层
.overlay {
	z-index: 10;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}

// 窗体
.coupon-popup {
	width: 624rpx;
	height: 648rpx;
	text-align: center;
	box-sizing: border-box;
	padding: 0 20px;
	position: relative;
	background-repeat: no-repeat;
	background-position: center; 
	background-size: contain;
	// border: 1px solid greenyellow;
	
	> .bg-img{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.popup-header {
		text-align: center;
		font-size: 12.67px;
		font-weight: 700;
		color: #cd6600;
		position: absolute;
		top: 8px;
		left: 50%;
		transform: translateX(-50%);
	}

	.popup-content {
		.amount, .condition, .expiry, .claim-btn {
			position: absolute;
		}

		.amount {
			font-size: 80rpx;
			font-weight: 700;
			color: #ff2626;
			top: 80rpx;
			left: 50%;
			transform: translateX(-50%);
		}

		.condition {
			font-size: 12.67px;
			font-weight: 400;
			color: #ff2626;
			top: 210rpx;
			left: 50%;
			transform: translateX(-50%);
			padding: 0 10px;
			height: 40rpx;
			background: #ffd7b1;
			border-radius: 10px;
			display: flex;
			align-items: center;
		}

		.expiry {
			font-size: 24rpx;
			font-weight: 400;
			color: #ffde9f;
			bottom: 50rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 80%;
		}
		
		.claim-btn {
			width: 70%;
			height: 80rpx;
			font-size: 17px;
			font-weight: 700;
			color: #e10000;
			bottom: 110rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}

	.close-btn {
		width: 50rpx;
		height: 50rpx;
		background: none;
		border: none;
		font-size: 20px;
		cursor: pointer;
		position: absolute;
		bottom: -80rpx;
		left: 50%;
		transform: translateX(-50%);
	}
}

// 动画效果
.fade-enter-active, .fade-leave-active {
	transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
	opacity: 0;
}
</style>