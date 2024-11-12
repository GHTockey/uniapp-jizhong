<template>
	<view class="action-sheet" v-if="show" :class="{ 'bg-up-animation': show, 'bg-down-animation': isClosing }">
		<view class="action-sheet-content" :class="{ 'slide-up-animation': show, 'slide-down-animation': isClosing }">
			<!-- 头部 -->
			<view class="action-sheet-content-header">
				<!-- 占位 -->
				<text></text>
				<!-- 标题 -->
				<text>{{ title }}</text>
				<!-- 关闭按钮 -->
				<view @click="closeActionSheet">
					<image style="width: 27.78rpx; height: 27.78rpx;" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/action-sheet-close.svg"
						mode="widthFix" />
				</view>
			</view>
			<!-- 内容 -->
			<view class="action-sheet-content-body">
				<view class="action-sheet-content-body-item" v-for="item in items" :key="item">
					<text class="item-content-title">{{ item.name }}</text>
					<text class="item-content">{{ item.value }}</text>
				</view>
				<!-- <view class="action-sheet-content-body-item">
					<text class="item-content-title">品牌</text>
					<text
						class="item-content">豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫</text>
				</view>
				<view class="action-sheet-content-body-item">
					<text class="item-content-title">品牌</text>
					<text class="item-content">豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫珍藏豫</text>
				</view> -->
			</view>

			<!-- 底部按钮 -->
			<view class="action-sheet-content-footer">
				<view class="action-sheet-content-footer-btn" @click="emit('confirm')">确定</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
	show: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: '标题'
	},
	items: {
		type: Array,
		default: () => []
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
			margin-top: 30rpx;

			.action-sheet-content-body-item {
				display: flex;
				justify-content: space-between;
				font-size: 27.78rpx;

				.item-content-title {
					color: #0A0A0A;
					// 不换行
					white-space: nowrap;
					margin-right: 20rpx;
				}

				.item-content {
					color: #8A8A8A;
					// 最多显示2行
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			}
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