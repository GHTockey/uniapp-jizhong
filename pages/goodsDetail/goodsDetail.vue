<template>
	<view class="goods-detail-container">
		<!-- 商品图片和视频区域 -->
		<swiper class="goods-detail-swiper">
			<swiper-item class="goods-detail-swiper-item" key="video">
				<video id="video" src="https://saas.jizhongkeji.com/static/jzkj/static/video/mp41.mp4" :controls="false" object-fit="cover"></video>
			</swiper-item>
			<swiper-item class="goods-detail-swiper-item" key="image1">
				<image class="goods-detail-swiper-item-image"
					src="https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/webp/1d518e30c55a870b05bec858f6c7bf3f.w800.h800.d0.b0.s64862.webp?x-oss-process=image/format,jpg" />
			</swiper-item>
			<swiper-item class="goods-detail-swiper-item" key="image2">
				<image class="goods-detail-swiper-item-image"
					src="https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/webp/1d518e30c55a870b05bec858f6c7bf3f.w800.h800.d0.b0.s64862.webp?x-oss-process=image/format,jpg" />
			</swiper-item>
			<!-- 左上角返回按钮 -->
			<view class="goods-detail-swiper-back" @tap="goBack">
				<image class="goods-detail-swiper-back-icon" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/left-white-icon.svg"
					mode="widthFix" />
			</view>
			<!-- 左下角当前视频/图片数量 -->
			<view class="goods-detail-swiper-index">
				<text class="goods-detail-swiper-index-text">1/3</text>
			</view>
			<!-- 右下角视频/图集按钮 -->
			<view class="goods-detail-swiper-button">
				<text class="goods-detail-swiper-button-text">视频</text>
				<text class="goods-detail-swiper-button-text">图集</text>
			</view>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-detail-info">
			<!-- 价格信息 -->
			<view class="goods-detail-info-price">
				<view class="left">
					<text>券后<text style="font-size: 23rpx;">￥</text><text style="font-size: 23.61px;font-weight: 700;color: #ff2626;
">123</text></text>
					<text class="right" style="margin-left: 14rpx;">优惠前￥123</text>
				</view>
				<text class="right">已售123+</text>
			</view>
			<!-- 可用券 -->
			<view class="goods-detail-info-coupon">
				<view class="coupon-item">商品券满128减20</view>
				<view class="coupon-item">商品券满128减20</view>
			</view>
			<!-- 其它用户正在购买 -->
			<view class="goods-detail-info-other">
				<image class="o-avatar" src="../../static/logo.png" mode="widthFix" />
				<text class="o-text">张**48秒前正在加购</text>
				<!-- 立即购买按钮-右对齐 -->
				<view class="o-buy" style="margin-left: auto;" @click="showActionSheetSlot = true">
					立即购买
					<image class="o-buy-icon" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/right-jiantou.svg" mode="widthFix" />
				</view>
			</view>
			<!-- 商品标题 -->
			<view class="goods-detail-info-title">
				<text>豫珍源固始鸡林间大别山高山林间散养豫珍源固始鸡林间大别山高山林间散养750g</text>
			</view>
			<!-- 商品的配送方式-服务保障-商品参数 -->
			<view class="goods-detail-info-delivery">
				<view class="delivery-item" @tap="showActionSheet = true">
					<image class="delivery-item-icon" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/goods-peisong-icon.svg" mode="widthFix" />
					<text class="delivery-item-text">配送方式：</text>
					<text class="delivery-item-text">门店自提</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">快递物流</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">同城配送</text>
					<text class="delivery-item-text" style="margin-left: auto;">></text>
				</view>
				<view class="delivery-item" @tap="showActionSheet = true">
					<image class="delivery-item-icon" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/goods-baozhang-icon.svg" mode="widthFix" />
					<text class="delivery-item-text">服务保障：</text>
					<text class="delivery-item-text">无忧退款（运费险）</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">极速退款</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">假一赔十</text>
					<text class="delivery-item-text" style="margin-left: auto;">></text>
				</view>
				<view class="delivery-item" @tap="showActionSheet = true">
					<image class="delivery-item-icon" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/goods-parm-icon.svg" mode="widthFix" />
					<text class="delivery-item-text">商品参数：</text>
					<text class="delivery-item-text">美辰</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">中国</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">江南省</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">长安市</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">食品工艺...</text>
					<text class="delivery-item-text" style="margin-left: auto;">></text>
				</view>
			</view>
		</view>

		<!-- 客户评价 ⟩ -->
		<view class="goods-detail-info-comment">
			<!-- 评价头部 -->
			<view class="comment-header">
				<text class="comment-header-title">客户评价（2万+）</text>
				<text class="comment-header-rate">好评率99%</text>
				<text class="comment-header-more">></text>
			</view>
			<!-- 评价内容 -->
			<view class="comment-content">
				<view class="comment-item">
					<image class="comment-item-avatar" src="https://saas.jizhongkeji.com/static/jzkj/static/logo.png" mode="aspectFill" />
					<view class="comment-item-info">
						<text class="comment-item-username">用户_5689825687</text>
						<text class="comment-item-content">产品收到了，发货速度快，产品的效果非常不错，家人挺满意，一定还会再次回购的，祝老板生意兴隆！</text>
					</view>
				</view>
				<view class="comment-item">
					<image class="comment-item-avatar" src="https://saas.jizhongkeji.com/static/jzkj/static/logo.png" mode="aspectFill" />
					<view class="comment-item-info">
						<text class="comment-item-username">用户_5689825687</text>
						<text class="comment-item-content">产品收到了，发货速度快，产品的效果非常不错，家人挺满意，一定还会再次回购的，祝老板生意兴隆！</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 商品详情 -->
		<view class="goods-detail-info-detail">
			<!-- 商品详情标题 -->
			<view class="goods-detail-info-detail-title">商品详情</view>
			<!-- 商品详情图片 -->
			<image class="goods-detail-info-detail-image" mode="widthFix" style="width: 100%; height: 390px;"
				src="https://saascdn.jizhongkeji.com/oss_jzkj/jpg/817f5a51a4aafe53fb3cd53c6c67e17f.w750.h780.d0.b23746.s121584.jpg" />
			<image class="goods-detail-info-detail-image" mode="widthFix" style="width: 100%; height: 390px;"
				src="https://saascdn.jizhongkeji.com/oss_jzkj/jpg/817f5a51a4aafe53fb3cd53c6c67e17f.w750.h780.d0.b23746.s121584.jpg" />
			<image class="goods-detail-info-detail-image" mode="widthFix" style="width: 100%; height: 390px;"
				src="https://saascdn.jizhongkeji.com/oss_jzkj/jpg/817f5a51a4aafe53fb3cd53c6c67e17f.w750.h780.d0.b23746.s121584.jpg" />

			<!-- 技术支持 -->
			<view class="goods-detail-info-detail-support">
				<image class="goods-detail-info-detail-support-image" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/sm-logo.svg"
					mode="widthFix" />
				<text class="goods-detail-info-detail-support-content">集中科技提供技术支持</text>
			</view>
		</view>

		<!-- 底部操作栏 -->
		<view class="goods-detail-info-bottom">
			<view class="goods-detail-info-bottom-left">
				<view class="goods-detail-info-bottom-left-item">
					<image class="goods-detail-info-bottom-left-item-icon" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/home-icon.svg"
						mode="widthFix" />
					<text class="goods-detail-info-bottom-left-item-text">首页</text>
				</view>
				<view class="goods-detail-info-bottom-left-item">
					<image class="goods-detail-info-bottom-left-item-icon" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/kefu.svg"
						mode="widthFix" />
					<text class="goods-detail-info-bottom-left-item-text">客服</text>
				</view>
				<view class="goods-detail-info-bottom-left-item">
					<image class="goods-detail-info-bottom-left-item-icon" src="https://saas.jizhongkeji.com/static/jzkj/static/icon/shoucang-active.svg"
						mode="widthFix" />
					<text class="goods-detail-info-bottom-left-item-text">收藏</text>
				</view>
			</view>
			<view class="goods-detail-info-bottom-right">
				<view class="bottom-right-item">加入购物车</view>
				<view class="bottom-right-item" @click="showActionSheetSlot = true">立即购买</view>
			</view>
		</view>


		<!-- 商品参数弹窗 -->
		<ActionSheet :title="actionSheetData.title" :items="actionSheetData.items" v-model:show="showActionSheet" />
		<!-- 立即购买弹窗 -->
		<ActionSheetSlot v-model:show="showActionSheetSlot" :footerBtnText="'立即购买'">
			<template #body>
				<view class="ActionSheetSlotComponentBody">
					<!-- 商品图片价格 -->
					<view class="goods-img-price-box">
						<image src="https://saas.jizhongkeji.com/static/jzkj/kun.png" alt="" class="goods-img"></image>
						<view class="goods-price-box">
							<text class="goods-price"><text style="font-size: 27.78rpx;">￥</text>100</text>
							<text class="goods-price-unit"><text style="font-size: 27.78rpx;">￥</text>10~360</text>
						</view>
					</view>
					<!-- 商品参数 -->
					<view class="goods-params-box">
						<view class="goods-params-title" style="display: flex; justify-content: space-between;">
							<text>商品型号:</text>
							<view class="goods-params-title-right">
								<image src="https://saas.jizhongkeji.com/static/jzkj/static/icon/list.svg" style="width: 30.56rpx;height: 27.08rpx;">
								</image>
								<text>列表</text>
							</view>
						</view>
						<view class="goods-params-item-box">
							<view class="goods-params-item">
								<image src="https://saas.jizhongkeji.com/static/jzkj/kun.png" style="width: 61.11rpx; height: 61.11rpx;">
								</image>
								<text>固始鸡1200gx1只（共2.4斤）</text>
							</view>
							<view class="goods-params-item active">
								<image src="https://saas.jizhongkeji.com/static/jzkj/kun.png" style="width: 61.11rpx; height: 61.11rpx;">
								</image>
								<text>固始鸡1200gx1只（共2.4斤）</text>
							</view>
							<view class="goods-params-item disabled">
								<image src="https://saas.jizhongkeji.com/static/jzkj/kun.png" style="width: 61.11rpx; height: 61.11rpx;">
								</image>
								<text>固始鸡1200gx1只（共2.4斤）</text>
							</view>

						</view>
					</view>
					<!-- 购买数量 -->
					<view class="goods-buy-num-box">
						<view class="goods-params-title" style="display: flex; justify-content: space-between;">
							<text>购买数量:</text>
						</view>
						<view>
							<uni-number-box />
						</view>
					</view>
				</view>
			</template>
		</ActionSheetSlot>
	</view>
</template>

<script setup>
import { ref } from 'vue'


const showActionSheet = ref(false)
const showActionSheetSlot = ref(false)
// 商品参数
const actionSheetData = ref({
	title: '商品参数',
	items: [
		{ name: '颜色', value: '红色' },
		{ name: '尺寸', value: '大号' },
		{ name: '尺寸', value: '大号' },
		{ name: '尺寸', value: '大号' },
	]
})

// 返回上一页
function goBack() {
	uni.navigateBack({
		delta: 1
	})
}
</script>

<style lang="scss" scoped>
.goods-detail-container {
	background-color: #f7f8fa;
	padding-bottom: 100rpx;


	// 商品图片和视频区域
	.goods-detail-swiper {
		// border: 1px solid #000;
		height: 750rpx;

		.goods-detail-swiper-item {
			width: 100%;
			height: 100%;

			#video {
				width: 100%;
				height: 100%;
			}

			.goods-detail-swiper-item-image {
				width: 100%;
				height: 100%;
			}

		}

		// 左上角返回按钮
		.goods-detail-swiper-back {
			position: absolute;
			top: 114rpx;
			left: 16.67rpx;
			width: 59.72rpx;
			height: 59.72rpx;
			background: #5959598d;
			border-radius: 13.89rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.goods-detail-swiper-back-icon {
				width: 17.36rpx;
				height: 30.56rpx;
			}
		}

		// 左下角当前视频/图片数量
		.goods-detail-swiper-index {
			position: absolute;
			bottom: 32rpx;
			left: 29.17rpx;
			background: rgba(67, 67, 67, 0.60);
			border-radius: 18.75rpx;
			padding: 0 18rpx;
			box-sizing: border-box;

			.goods-detail-swiper-index-text {
				font-size: 26.39rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				color: #ffffff;
			}
		}

		// 右下角视频/图集按钮
		.goods-detail-swiper-button {
			position: absolute;
			bottom: 32rpx;
			right: 29.17rpx;
			display: flex;
			gap: 5.6rpx;

			.goods-detail-swiper-button-text {
				width: 58.33rpx;
				height: 40.97rpx;
				font-size: 29.17rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				// font-weight: 700;
				color: #ffffff;
				padding: 0 11rpx;
				background: #5959598d;
				border-radius: 18.75rpx;
				// 阻止文字换行
				white-space: nowrap;
			}
		}
	}

	// 商品信息区域
	.goods-detail-info {
		padding: 0 29.17rpx;
		padding-bottom: 27rpx;
		background-color: #ffffff;

		// 价格信息
		.goods-detail-info-price {
			display: flex;
			justify-content: space-between;
			align-items: end;
			// margin-top: 20rpx;
			padding-top: 20rpx;

			.left {
				font-size: 27.78rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				color: #ff4f26;

				// .right {
				// 	font-size: 27.78rpx;
				// 	font-family: PingFang SC, PingFang SC-Regular;
				// 	font-weight: 400;
				// 	color: #8b8b8b;
				// }
			}

			.right {
				font-size: 27.78rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #8b8b8b;
			}
		}

		// 可用券
		.goods-detail-info-coupon {
			display: flex;
			gap: 10rpx;
			margin-top: 21rpx;

			.coupon-item {
				font-size: 26.39rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 500;
				color: #ff4f26;
				padding: 8rpx 20rpx;
				background: #fef0e5;
				border-radius: 8.33rpx;

			}
		}

		// 其它用户正在购买
		.goods-detail-info-other {
			display: flex;
			gap: 11rpx;
			margin-top: 21rpx;
			background: #fef0e5;
			border-radius: 8.33rpx;
			padding: 9.72rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;

			.o-avatar {
				width: 33.33rpx;
				height: 33.33rpx;
				border-radius: 50%;
			}

			.o-text {
				font-size: 26.39rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #ff4f26;
			}

			.o-buy {
				background: #ff4f26;
				border-radius: 8.33rpx;
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				color: #f7f8fa;
				box-sizing: border-box;
				padding: 0 11rpx;
				display: flex;
				align-items: center;

				.o-buy-icon {
					width: 10.56rpx;
					height: 9.72rpx;
					margin-left: 10rpx;
				}
			}
		}

		// 商品标题
		.goods-detail-info-title {
			font-size: 31.94rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 500;
			color: #313131;
			margin-top: 29.17rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		// 商品的配送方式-服务保障-商品参数
		.goods-detail-info-delivery {
			// display: flex;
			margin-top: 28rpx;
			box-sizing: border-box;

			.delivery-item {
				width: 100%;
				display: flex;
				align-items: center;
				color: #8B8B8B;
				font-size: 26.39rpx;
				gap: 10rpx;
				margin-top: 23.61rpx;

				.delivery-item-icon {
					width: 32rpx;
					height: 32rpx;
					vertical-align: middle;
				}

				.delivery-item-text {
					font-size: 25rpx;
				}
			}
		}
	}

	// 客户评价
	.goods-detail-info-comment {
		margin-top: 20rpx;
		background: #ffffff;
		padding: 29.17rpx;
		box-sizing: border-box;

		// 评价头部
		.comment-header {
			display: flex;
			// justify-content: space-between;
			align-items: center;

			.comment-header-title {
				font-size: 30.56rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 600;
				color: #313131;
			}

			.comment-header-rate {
				font-size: 25rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #8B8B8B;
				margin-left: auto;
			}

			.comment-header-more {
				font-size: 25rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #8B8B8B;
				margin-left: 29rpx;
			}

		}

		// 评价内容
		.comment-content {
			margin-top: 30rpx;

			.comment-item {
				display: flex;
				margin-top: 33rpx;

				.comment-item-avatar {
					width: 38.89rpx;
					height: 38.89rpx;
					background: rgba(0, 0, 0, 0.00);
					border-radius: 50%;
				}

				.comment-item-info {
					flex: 1;
					display: flex;
					flex-direction: column;
					margin-left: 16.67rpx;

					.comment-item-username {
						font-size: 25rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						color: #8b8b8b;
					}

					.comment-item-content {
						font-size: 25rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						color: #232323;
						margin-top: 22rpx;
					}
				}
			}
		}
	}

	// 商品详情
	.goods-detail-info-detail {
		margin-top: 20rpx;
		background: #ffffff;
		// padding: 29.17rpx;
		box-sizing: border-box;
		// border: 1px solid #000;

		.goods-detail-info-detail-title {
			font-size: 30.56rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 600;
			color: #313131;
			padding: 25rpx 29.17rpx;
		}

		.goods-detail-info-detail-image {
			// width: 100%;
			// height: 100%;
		}


	}

	// 技术支持
	.goods-detail-info-detail-support {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10rpx;
		// margin-top: 20rpx;
		background-color: #f7f8fa;
		padding: 33.33rpx;

		.goods-detail-info-detail-support-image {
			width: 25rpx;
			height: 25rpx;
		}

		.goods-detail-info-detail-support-content {
			font-size: 25rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			color: #babbbd;
		}
	}

	// 底部操作栏
	.goods-detail-info-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		// border: 1px solid #000;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 29.17rpx;
		box-sizing: border-box;

		// 底部操作栏左侧
		.goods-detail-info-bottom-left {
			display: flex;
			align-items: center;
			// gap: 10rpx;
			// column-gap: 10rpx;
			// row-gap: 10rpx;
			flex: 1;
			justify-content: space-between;
			// border: 1px solid #000;
			padding-right: 60rpx;

			.goods-detail-info-bottom-left-item {
				display: flex;
				flex-direction: column;
				// gap: 10rpx;
				// flex: 1;
				align-items: center;

				.goods-detail-info-bottom-left-item-icon {
					width: 38.19rpx;
					height: 34.72rpx;
				}

				.goods-detail-info-bottom-left-item-text {
					font-size: 18.06rpx;
					color: #686868;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					margin-top: 10rpx;
				}
			}
		}

		// 底部操作栏右侧
		.goods-detail-info-bottom-right {
			display: flex;
			align-items: center;

			.bottom-right-item {
				padding: 18rpx 30rpx;
				color: #ffffff;


				&:first-child {
					background: #f2ab20;
					border-radius: 14rpx 0 0 14rpx;
				}

				&:last-child {
					background: #ff4f26;
					border-radius: 0 14rpx 14rpx 0;
				}
			}
		}
	}
}
</style>
