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
// import { useTarbarStore } from "@/stores/tarbar";
import { useTabBarStore } from '@/stores/tabbar';
import { useTempStore } from "@/stores/temp";

const tempStore = useTempStore();

tempStore.getUserInfoApi();

const tabBarStore = useTabBarStore();
tabBarStore.getTabBarListApi();

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
@import './static/styles/appOld.css';

/*每个页面公共css */
view,
text {
	box-sizing: border-box;
}

// 数字/单词换行
text,
p {
	word-break: break-all;
	word-wrap: break-word;
}

::-webkit-scrollbar {
	display: none !important;
}

::-webkit-scrollbar-thumb {
	display: none !important;
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
	// a {
		width: 100%;
		display: flex;
	// }
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



// pitem
/* 列表标题，带前置的颜色块 */
.section_title {
    display: flex;
    padding: 17rpx 25rpx;
    /* border-bottom: 1px solid #eeeeee; */
    height: 1.6em;
    background-color: #ffffff;
    /* margin-top: 8rpx; */
}

.section_title .block_section_title_prev {
    background-color: #09bb07;
    height: 100%;
    width: 10rpx;
}

.section_title .block_section_title {
    text-indent: 0.5em;
    font-size: 1.2em;
}


/* 产品列表 */
.product_list .product_item {
    width: 340rpx;
    display: inline-block;
    margin: 16rpx 0;
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.05);
    border-radius: 12rpx;
    background-color: #ffffff;
}

.product_list .product_item:nth-child(even) {
    margin-left: 20rpx;
}

.product_list .product_item .image {
    width: 340rpx;
    height: 340rpx;
    border-top-left-radius: 14rpx;
    border-top-right-radius: 14rpx;
}

.product_list .product_item .name {
    /* font-size: 1em; */
    /* height: 3em; */
    line-height: 1.5em;
    overflow: hidden;
    color: #595959;
    font-size: 26rpx;
    padding-left: 15rpx;
    font-size: 28rpx;
    color: #242424;
}

.product_list .product_item .price {
    font-size: 1.2em;
    color: #303030;
}

.product_list .product_item .name,
.product_list .product_item .price {
    display: block;
}


/* 横向展示的产品列表 */
.product_list_row{
    box-sizing: border-box;
    width: 100%;
}

.product_list_row .product_item{
    border-bottom: 1rpx solid #ededed;
    color: #333333;
    padding: 26rpx 0rpx;
    width: 100%;
}

.product_list_row navigator{
    display: flex;
    flex-direction: row;
    width: 100%;
}

.product_list_row .product_info{
    flex: 1;
    align-items: flex-start;
    width: calc(100% - 196rpx);
}
.product_list_row .image{
    flex: none;
    border-radius: 12rpx;
    height: 168rpx;
    margin-right: 18rpx;
    width: 168rpx;
}
.product_list_row .name{
    font-size: 28rpx;
}

.product_list_row .price{
    color: #FE3E3D;
    font-size: 34rpx;
}
.product_list_row .product_list_row_btn{
    padding: 10rpx 12rpx;
    background-color: #ff4f26;
    border-radius: 34rpx;
    color: #ffffff;
    font-size: 22rpx;
}













//  ========================== 华丽的分割线 ==========================

// 购买商品的弹窗
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

.fixed-bottom {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
	background-color: #fff;
	padding-bottom: Max(env(safe-area-inset-bottom), 16rpx) !important;
}

// 虚空按钮
.tce_empty_btn {
	opacity: 0.9;
	border: 1.39rpx solid #a0a0a0;
	border-radius: 13.89rpx;
	color: #A0A0A0;
	padding: 11rpx 13rpx;
	text-align: center;
}

// 主题按钮
.tce_theme_btn {
	opacity: 0.9;
	background: $uni-color-gradient-primary;
	border-radius: 27.78rpx;
	color: #ffffff;
	padding: 11rpx 29rpx;
	text-align: center;
}

// 主题虚空按钮
.tce_theme_empty_btn {
	opacity: 0.9;
	border: 2.08rpx solid $uni-color-theme;
	border-radius: 29.86rpx;
	color: #FF0000;
	padding: 10rpx 29rpx;
	text-align: center;
}

// 主题禁用按钮
.tce_theme_disabled_btn {
	opacity: 0.9;
	background: #8c8c8c;
	border-radius: 27.78rpx;
	color: #ffffff;
	padding: 11rpx 29rpx;
	text-align: center;
}
</style>
