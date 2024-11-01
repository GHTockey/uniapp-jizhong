<template>
	<view class="action-sheet" v-if="show" :class="{ 'bg-up-animation': show, 'bg-down-animation': isClosing }">
		<view class="action-sheet-content" :class="{ 'slide-up-animation': show, 'slide-down-animation': isClosing }">
			<!-- 头部 -->
			<view class="action-sheet-content-header">
				<!-- 占位 -->
				<text></text>
				<!-- 标题 -->
				<slot name="header">{{ title }}</slot>
				<!-- 关闭按钮 -->
				<view @click="closeActionSheet">
					<image style="width: 27.78rpx; height: 27.78rpx;" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/action-sheet-close.svg"
						mode="widthFix" />
				</view>
			</view>
			<!-- 内容 -->
			<view class="action-sheet-content-body">
				<slot name="body">

				</slot>
			</view>

			<!-- 底部按钮 -->
			<view class="action-sheet-content-footer">
				<slot name="footer">
					<view class="action-sheet-content-footer-btn" @click="confirm">{{ footerBtnText }}</view>
				</slot>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";


// TIPS: 本组件的show不要再外部赋值false，动画显示异常
const props = defineProps({
	show: {
		type: Boolean,
		default: false
	},
	title: { // 标题
		type: String,
		default: ''
	},
	footerBtnText: { // 底部按钮文字
		type: String,
		default: '确定'
	}
})

// 是否执行离开动画
const isClosing = ref(false)

const emit = defineEmits(['update:show', 'confirm'])

//关闭弹窗
function closeActionSheet() {
	isClosing.value = true
	setTimeout(() => {
		// 初始化
		isClosing.value = false
		emit('update:show', false)
	}, 300)
}

// 底部按钮
function confirm() {
	emit('confirm')
	closeActionSheet()
}
</script>

<style lang="scss">
// 弹窗
.action-sheet {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
	// 遮罩
	background-color: rgba(0, 0, 0, 0.5);

	// 弹窗体
	.action-sheet-content {
		background-color: #ffffff;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		min-height: 200rpx;
		border-radius: 40rpx 40rpx 0 0;

		// 头部
		.action-sheet-content-header {
			padding: 20rpx 40rpx;
			font-size: 30rpx;
			font-weight: 700;
			color: #2C2C2C;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 20rpx;
		}

		// 内容
		.action-sheet-content-body {
			padding: 0 30rpx;
			display: flex;
			flex-direction: column;
			gap: 20rpx;
			// margin-top: 30rpx;

		}

		// 底部按钮
		.action-sheet-content-footer {
			padding: 20rpx 30rpx;

			.action-sheet-content-footer-btn {
				color: #ffffff;
				font-size: 30rpx;
				font-weight: 700;
				text-align: center;
				background-image: $uni-color-gradient-primary;
				line-height: 83.33rpx;
				height: 83.33rpx;
				opacity: 0.9;
				border-radius: 13.89rpx;
			}
		}
	}
}


.slide-up-animation {
	animation: slide-up 0.3s;
}

.slide-down-animation {
	animation: slide-down 0.3s;
}

.bg-up-animation {
	animation: bg-up 0.3s;
}

.bg-down-animation {
	animation: bg-down 0.3s;
}

// 动画
@keyframes slide-up {

	// 窗体进入
	from {
		transform: translateY(100%);
	}

	to {
		transform: translateY(0);
	}
}

@keyframes slide-down {

	// 窗体离开
	from {
		transform: translateY(0);
	}

	to {
		transform: translateY(100%);
	}
}

@keyframes bg-up {

	// 透明度从0到.5
	from {
		opacity: 0;
	}

	to {
		opacity: 0.5;
	}
}

@keyframes bg-down {
	from {
		opacity: 0.5;
	}

	to {
		opacity: 0;
	}
}
</style>
