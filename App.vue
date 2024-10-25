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

<script setup>
import { onMounted } from 'vue';
import { useTarbarStore } from "@/stores/tarbar";

const tarbarStore = useTarbarStore();
tarbarStore.getTarBarListApi();

onMounted(() => {
	console.log('App Mounted')
})
</script>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>

<style lang="scss">
/*每个页面公共css */
view,
text {
	box-sizing: border-box;
}


/* 文本超出显示省略号 */
.text_ellipsis {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* 弹性布局 */
.flex_row_str_str {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	width: 100%;
}

.flex_row_str_end {
	display: flex;
	flex-direction: row;

	justify-content: flex-start;
	align-items: flex-end;
	width: 100%;
}

.flex_row_space_bt {
	display: flex;
	flex-direction: row;

	justify-content: space-between;
	align-items: center;
	width: 100%;
}

.flex_row_space_ar {
	display: flex;
	flex-direction: row;

	justify-content: space-around;
	align-items: center;
	width: 100%;
}

.flex_row_cen_cen {
	display: flex;
	flex-direction: row;

	justify-content: center;
	align-items: center;
	width: 100%;
}

.flex_row_end_cen {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
}

.flex_row_end_end {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: flex-end;
	width: 100%;
}

.flex_col_space_bt {
	display: flex;
	flex-direction: column;

	justify-content: space-between;
	align-items: center;
	width: 100%;
}

.flex_col_str_str {
	display: flex;
	flex-direction: column;

	justify-content: flex-start;
	align-items: flex-start;
	width: 100%;
}

.flex_col_space_ar {
	display: flex;
	flex-direction: column;

	justify-content: space-around;
	align-items: center;
	width: 100%;
}

.flex_col_cen_cen {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
}

.flex_col_end_cen {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
}

.flex_col_cen_end {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-end;
	width: 100%;
}

.flex_wrap {
	flex-wrap: wrap;
}

.flex_none {
	flex: none;
}

/* 弹性布局结束 */


/* 横向展示的产品列表 [start] */
.product_list_row {
	box-sizing: border-box;
	width: 100%;
}

.product_list_row .product_item {
	border-bottom: 1rpx solid #ededed;
	color: #333333;
	padding: 26rpx 0rpx;
	width: 100%;
}

.product_list_row navigator {
	display: flex;
	flex-direction: row;
	width: 100%;
}

.product_list_row .product_info {
	flex: 1;
	align-items: flex-start;
	width: calc(100% - 196rpx);
}

.product_list_row .image {
	flex: none;
	border-radius: 12rpx;
	height: 168rpx;
	margin-right: 18rpx;
	width: 168rpx;
}

.product_list_row .name {
	font-size: 28rpx;
}

.product_list_row .price {
	color: #FE3E3D;
	font-size: 34rpx;
}

.product_list_row .product_list_row_btn {
	padding: 10rpx 12rpx;
	background-color: #ff4f26;
	border-radius: 34rpx;
	color: #ffffff;
	font-size: 22rpx;
}
/* 横向展示的产品列表 [end] */


.product_item_navigator {
	a {
		width: 100%;
		display: flex;
	}
}

.kong {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 400rpx;
}

.kong image {
  width: 300rpx;
  height: 200rpx;
  margin-bottom: 20rpx;
}

.kong text {
  font-size: 28rpx;
  font-weight: 500;
  color: #838383;
}
















//  ========================== 华丽的分割线 ==========================


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
				pointer-events: none;
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
