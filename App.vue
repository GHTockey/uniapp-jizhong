<script>
export default {
	onLaunch: function () {
		console.log('App Launch')
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
/*每个页面公共css */

.ActionSheetSlotComponentBody {
	display: flex;
	flex-direction: column;
	gap: 20rpx;

	.goods-img-price-box {
		display: flex;
		align-items: center;
		height: 159.72rpx;

		.goods-img {
			width: 159.72rpx;
			height: 159.72rpx;
			border-radius: 11.11rpx;
		}

		.goods-price-box {
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: flex-end;
			margin-left: 20rpx;

			.goods-price {
				font-size: 35.42rpx;
				font-family: Alibaba PuHuiTi, Alibaba PuHuiTi-Bold;
				font-weight: 700;
				color: #eb2c2a;
				line-height: 56.94rpx;
			}

			.goods-price-unit {
				font-size: 27.78rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				color: #999999;
				line-height: 55.56rpx;
			}
		}
	}

	// 商品参数标题
	.goods-params-box .goods-params-title,
	.goods-buy-num-box .goods-params-title {
		height: 40.97rpx;
		font-size: 29.17rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		text-align: left;
		color: #3e3e3e;
	}

	.goods-params-box {

		.goods-params-title {
			height: 40.97rpx;
			font-size: 29.17rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 700;
			text-align: left;
			color: #3e3e3e;

			.goods-params-title-right {
				font-size: 27.78rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				color: #3e3e3e;
				display: flex;
				align-items: center;
				gap: 5rpx;
			}
		}


		.goods-params-item-box {
			margin-top: 20rpx;
			display: flex;
			flex-wrap: wrap;
			gap: 20rpx;

			.goods-params-item {
				height: 77.78rpx;
				border-radius: 11.11rpx;
				display: flex;
				align-items: center;
				gap: 10rpx;
				padding: 0 10rpx;
				border: 1rpx solid #ededed;
				font-size: 27.78rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				color: #313131;
			}

			// 选中效果
			.goods-params-item.active {
				border: 2.78rpx solid #eb2c2a;
			}

			// 禁用效果
			.goods-params-item.disabled {
				background: #ededed;
				color: #999999;
			}
		}
	}

	.goods-buy-num-box {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}
}
</style>
