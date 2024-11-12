<template>
	<view class="list-box">
		<!-- 头部 -->
		<view class="head">
			<!-- 图标和主题 -->
			<view>
				<image src="https://saas.jizhongkeji.com/static/jzkj/static/images/hot-icon.png"></image>
				<text>超值秒杀</text>
			</view>
			<!-- 时间信息 -->
			<view>距活动结束仅剩2时38分55秒</view>
			<!-- 更多 -->
			<!-- <view>3</view> -->
			<image src="https://saas.jizhongkeji.com/static/jzkj/static/images/gengduo.png"></image>
		</view>
		<!-- 内容 -->
		<scroll-view scroll-x class="content-box">
			<view class="content-item" v-for="(item, index) in 10" :key="index"
				:style="{ marginRight: index == 9 ? '60rpx' : '20rpx' }">
				<!-- 图片 -->
				<view></view>
				<!-- 文字 -->
				<view class="txt-box">
					<text>商品标题商品标题商品标商品商品标题商品标题商品标</text>
					<view class="tag">
						买十送一
					</view>
					<view class="price">
						<text class="currency">￥</text>
						<text class="amount">111.</text>
						<text class="decimal">00</text>
					</view>
					<view>已售88件</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>

</script>

<style lang="less">
.list-box {
	border-radius: 14rpx;
	background-color: white;
	overflow: hidden;

	// 头部操作栏
	.head {
		background-color: #e62624;
		padding: 27rpx 29rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		>view:nth-child(1) {
			// width: 64px;
			// height: 22.33px;
			font-size: 33.33rpx;
			color: #ffe7c8;
			text-shadow: 0px 0.33px 0.67px 0px #9c1e1c;

			>image {
				width: 34.72rpx;
				height: 34.72rpx;
				display: inline-block;
				vertical-align: -6rpx;
				margin-right: 16rpx;
			}
		}

		>view:nth-child(2) {
			font-size: 22.22rpx;
			color: #f9dbb4;
			margin-left: -30rpx;
		}

		>image:nth-child(3) {
			width: 66.67rpx;
			height: 34.72rpx;
		}
	}

	// 内容
	.content-box {
		padding: 23.6rpx 29rpx;
		// display: flex;
		// column-gap: 20rpx;
		white-space: nowrap;


		.content-item {
			display: inline-block;
			// width: 100%;
			// height: 300rpx;
			width: 194.44rpx;
			height: 194.44rpx;
			border-radius: 11.11rpx;
			// border: 1rpx solid #d8d8d8;
			// flex-shrink: 0; // 防止项目缩小
			// height: 400rpx;

			// 图片
			>view:nth-child(1) {
				width: 100%;
				height: 100%;
				background-color: #d8d8d8;
				border-radius: 11rpx;
			}

			// 文字
			>view:nth-child(2) {

				// 商品标题
				>text:nth-child(1) {
					margin: 11rpx 0;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 25rpx;
					color: #323232;
				}

				>.tag {
					padding: 0 11rpx;
					text-align: center;
					color: white;
					font-size: 19.33rpx;
					// width: auto;
					display: inline-block;
					height: 30.56rpx;
					background: linear-gradient(90deg, #f91a13, #ff3700);
					border-radius: 6rpx;
				}

				>.price {
					color: #EB2C2A;

					.currency {
						font-size: 20rpx; // 设置货币符号字体大小
					}

					.amount {
						font-size: 32rpx; // 设置金额整数部分字体大小
					}

					.decimal {
						font-size: 22rpx; // 设置金额小数部分字体大小
					}
				}

				>view:nth-child(4) {
					font-size: 20.83rpx;
					color: #b8b8b8;
				}
			}
		}
	}
}
</style>