<template>
	<view class="get_shop_list_box">
		<!-- 搜索栏 -->
		<view class="search_box">
			<uni-search-bar style="flex: 1;" @confirm="" v-model="searchValue" @blur="" @focus="" @input="" @cancel=""
				@clear="" clearButton="none" cancelButton="none" placeholder="请输入关键词">
				<uni-icons slot="searchIcon" color="#999999" size="18" type="home" />
			</uni-search-bar>
			<!-- 收起/展开地图按钮 -->
			<view class="map_btn_box">
				<image style="width: 33.33rpx;height: 21.53rpx;" src="../../static//icon/map-icon.svg" mode="widthFix">
				</image>
				<text>收取地图</text>
			</view>
		</view>

		<!-- 地图 -->
		<!-- <view class="map_box">
		</view> -->


		<!-- 门店列表容器 -->
		<view class="shop_list_box">
			<!-- 头部 标签栏 -->
			<view class="shop_list_header">
				<view @click="changeActiveIndex(0)" class="shop_list_header_item"
					:class="{ 'shop_list_header_item_active': activeIndex == 0 }">
					<text>附近门店</text>
					<!-- 高亮横线 -->
					<view class="shop_list_header_line"></view>
				</view>
				<view @click="changeActiveIndex(1)" class="shop_list_header_item"
					:class="{ 'shop_list_header_item_active': activeIndex == 1 }">
					<text>收藏&常去</text>
					<!-- 高亮横线 -->
					<view class="shop_list_header_line"></view>
				</view>
			</view>
			<!-- 门店列表 -->
			<view class="shop_list_content">
				<view class="shop_list_item" v-for="item in shopList">
					<!-- img box -->
					<view class="shop_list_item_img_box">
						<image style="width: 100%;height: 120.14rpx;" :src="item.image_uri">
						</image>
						<view class="shop_list_item_detail_btn">
							<text>门店详情</text>
							<uni-icons type="arrowright" size="18" color="#999999"></uni-icons>
							<!-- <image style="width: 12.5rpx;height: 18.06rpx;" src="../../static//icon/down-map.svg"
								mode="widthFix">
							</image> -->
						</view>
						<!-- 收藏按钮 -->
						<view class="shop_list_item_collect_btn">
							<uni-icons type="star" size="20" color="#999999"></uni-icons>
						</view>
					</view>
					<!-- 门店信息 -->
					<view class="shop_list_item_info">
						<!-- 门店标题 -->
						<view class="shop_list_item_title">
							{{ item.shop_name }}
						</view>
						<!-- 距离&地址 -->
						<view class="shop_list_item_distance_address">
							<text>2.1km</text>
							<text style="margin: 0 10rpx; color: #909090;">|</text>
							<text style="color: #909090;">{{ item.address_detail }}</text>
						</view>
						<!-- 营业时间 -->
						<view class="shop_list_item_business_time">
							<text>{{ item.start_time }}-{{ item.end_time }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 空状态 -->
		<view class="empty_box"></view>

		<!-- 确定按钮 -->
		<view class="confirm_btn_box">
			<view class="confirm_btn">确定</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";
import { request } from "../../utils/request";
import { onLoad } from "@dcloudio/uni-app";

const searchValue = ref(''); // 搜索框内容
const activeIndex = ref(0); // 选中标签栏索引
const shopList = ref([]); // 门店列表

onLoad(() => {
	getData();
})

async function getData() {
	uni.showLoading({ title: '加载中...' })
	let res = await request('/WxAppCustomer/store_list', 'post', {
		// user_id
		// gps
	})
	uni.hideLoading();
	if (res.code != 0) return uni.showToast({
		title: res.msg,
		icon: 'error'
	})
	shopList.value = res.data.store_list;

}

// 切换标签栏
const changeActiveIndex = (index) => {
	activeIndex.value = index;

	// TODO: temp
	if (activeIndex.value == 0) {
		getData();
	} else {
		shopList.value = [];
	}
}

</script>

<style lang="scss" scoped>
.get_shop_list_box {
	height: calc(100vh - $nav-height);
	background-color: #f5f5f5;
	display: flex;
	flex-direction: column;

	.search_box {
		height: 125rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;


		.map_btn_box {
			width: 180rpx;
			height: 40rpx;

			font-size: 26.39rpx;
			font-weight: 500;
			color: #a0a0a0;

			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10rpx;
		}
	}


	// 地图
	.map_box {
		box-sizing: border-box;
		height: 460rpx;
		// border: 1px solid red;
	}

	// 门店列表容器
	.shop_list_box {
		// border: 1px solid red;
		padding: 10rpx 30rpx;
		background-color: #fff;
		// height: calc(100vh - 460rpx - 125rpx - $nav-height);
		flex: 1;
		border-radius: 13.89rpx 13.89rpx 0rpx 0rpx;
		padding-bottom: 106.94rpx;


		// 标签栏
		.shop_list_header {
			height: 80rpx;
			display: flex;
			align-items: center;
			gap: 50rpx;

			.shop_list_header_item {
				font-size: 30.56rpx;
				font-weight: 400;
				color: #a0a0a0;
			}


			// 选中样式
			.shop_list_header_item_active {
				font-size: 31.94rpx;
				font-weight: 700;
				color: #333333;
				display: flex;
				flex-direction: column;
				align-items: center;

				.shop_list_header_line {
					background-color: #eb2c2a;
					width: 50rpx;
					height: 4rpx;
					border-radius: 2rpx;
					margin-top: 5rpx;
				}
			}

		}

		// 门店列表
		.shop_list_content {
			display: flex;
			flex-direction: column;
			gap: 20rpx;


			.shop_list_item {
				height: 230rpx;
				border: 1.39rpx solid #e5e5e5;
				border-radius: 5.56rpx;
				display: flex;
				align-items: center;
				padding: 20rpx;


				.shop_list_item_img_box {
					width: 158.33rpx;
					border-radius: 10rpx;
					overflow: hidden;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					margin-right: 30rpx;
					position: relative;

					// 门店详情按钮
					.shop_list_item_detail_btn {
						width: 100%;
						height: 64.58rpx;
						background-color: #ececec;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 23.61rpx;
						color: #3D3D3D;
					}

					// 收藏按钮
					.shop_list_item_collect_btn {
						position: absolute;
						left: 0;
						top: 0;
						background-color: red;
						border-radius: 0 0 20rpx 0;

						width: 47.22rpx;
						height: 47.22rpx;
						background: #45454573;
						border-radius: 11.11rpx 0rpx 11.11rpx 0rpx;

						display: flex;
						align-items: center;
						justify-content: center;
					}
				}

				.shop_list_item_info {
					flex: 1;
					height: 100%;
					// display: flex;
					// flex-direction: column;
					// justify-content: space-between;

					// 门店标题
					.shop_list_item_title {
						font-size: 29.17rpx;
						font-weight: 700;
						text-align: left;
					}

					// 距离&地址
					.shop_list_item_distance_address {
						font-size: 25rpx;
						color: #000000;
						margin-top: 20rpx;
					}

					// 营业时间
					.shop_list_item_business_time {
						margin-top: 20rpx;
						font-size: 25rpx;
						color: #212121;
					}
				}
			}
		}
	}


	// 确定按钮
	.confirm_btn_box {
		width: 100%;
		height: 106.94rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0rpx 2rpx 0rpx 0rpx rgba(131, 131, 131, 0.16) inset;
		position: fixed;
		bottom: 0;

		.confirm_btn {
			width: 691.67rpx;
			height: 73.61rpx;
			opacity: 0.9;
			background: $uni-color-gradient-primary;
			border-radius: 13.89rpx;
			text-align: center;
			line-height: 73.61rpx;
			font-size: 30.56rpx;
			color: #fff;
		}
	}
}
</style>
