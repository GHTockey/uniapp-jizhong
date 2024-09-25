<template>
	<view class="container">
		<view class="header">
			<view class="line"></view>
			<image src="../static/icon/aixin.png" class="icon" />
			<text class="title">好物优选</text>
			<view class="line"></view>
		</view>

		<view class="product_list" style="display: flex;flex-wrap: wrap;">
			<block v-for="(product, index) in goods" :key="index">
				<view class="product_item">
					<view class="product_radius">
						<!-- <navigator hover-class="none" :url="`/pages/product/detail?id=${product.id}`"> -->
						<!-- 商品图片 -->
						<image :lazy-load="true" class="image" mode="aspectFill" :src="product.image_uri"></image>
						<view class="txt-box">
							<!-- 商品名字 -->
							<text class="name" style="font-weight: 500;
									display: -webkit-box;
									-webkit-box-orient: vertical;
									-webkit-line-clamp: 2;
									overflow: hidden;
									text-overflow: ellipsis;
									word-break: break-all;">{{ product.name }}</text>
							<view class="price-box">
								<text class="price">
									<text style="font-size:24rpx">￥</text>{{ product.price }}
								</text>

								<text>已售88</text>
							</view>
						</view>
						<!-- </navigator> -->
					</view>
				</view>
			</block>
		</view>

	</view>
</template>

<script setup>
import {
	ref
} from "vue";



const goods = [{
	goods_group_id: 89,
	id: 2528,
	image_uri: "https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/jpg/b3acb8d24f89f55a71b3e701075dd26a.w1000.h1000.d0.b19379.s99225.jpg",
	name: "中学生夏季校服",
	price: "90.00"
},
{
	goods_group_id: 89,
	id: 2528,
	image_uri: "https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/jpg/b3acb8d24f89f55a71b3e701075dd26a.w1000.h1000.d0.b19379.s99225.jpg",
	name: "中学生夏季校服你谁哦吼鸡尾酒佛系哦额文化i哦i哦附件我if就后悔偶额护肤哦",
	price: "90.00"
},
{
	goods_group_id: 89,
	id: 2528,
	image_uri: "https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/jpg/b3acb8d24f89f55a71b3e701075dd26a.w1000.h1000.d0.b19379.s99225.jpg",
	name: "中学生夏季校服",
	price: "90.00"
},
{
	goods_group_id: 89,
	id: 2528,
	image_uri: "https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/jpg/b3acb8d24f89f55a71b3e701075dd26a.w1000.h1000.d0.b19379.s99225.jpg",
	name: "中学生夏季校服",
	price: "90.00"
},
{
	goods_group_id: 89,
	id: 2528,
	image_uri: "https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/jpg/b3acb8d24f89f55a71b3e701075dd26a.w1000.h1000.d0.b19379.s99225.jpg",
	name: "中学生夏季校服",
	price: "90.00"
},
];
</script>

<style lang="less">
.container {
	// padding: 20px;

	// 头部标题
	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 47px 0;

		.icon {
			width: 37.5px;
			height: 37.5px;
			margin-left: 30rpx;
		}

		.title {
			font-size: 35rpx;
			font-weight: bold;
			white-space: nowrap;
			margin: 0 16rpx;
			margin-right: 30rpx;
		}

		.line {
			flex: none;
			width: 47rpx;
			border-bottom: 1px solid #c4c4c4;
		}
	}

	// 列表

	.product_list {
		display: flex;
		flex-wrap: wrap;
		// padding: 0 25rpx;
	}

	.product_item {
		overflow: hidden;
		border-radius: 12rpx;
		background-color: white;
		// border: 1px solid red;
		width: 48%; // 每行两个商品
		margin: 1%; // 间距
		box-sizing: border-box;


		.product_radius {
			// border: 1px solid red;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.image {
				width: 100%;
				height: 341.67rpx;
				background: rgba(0, 0, 0, 0.00);
				border-radius: 13.89rpx 13.89rpx 0px 0px;
			}

			.txt-box {
				flex: 1;
				margin-top: 14rpx;
				margin-bottom: 15.28rpx;
				padding: 0 15rpx 5rpx 15rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;


				.name {
					font-size: 24.31rpx;
					font-weight: 500;
					color: #313131;
					letter-spacing: 0.13px;
				}

				.price-box {
					margin-top: 9rpx;
					display: flex;
					justify-content: space-between;
					align-items: end;
					font-size: 20.83rpx;
					color: #999999;


					.price {
						font-size: 30.83rpx;
						font-weight: 700;
						color: #ff2626;
					}
				}
			}

		}

	}
}
</style>