<template>
	<template name="swiper" v-if="name == 'swiper'">
		<swiper v-show="swiper.swiperImgUrls.length" :indicator-dots="swiper.indicatorDots" :autoplay="swiper.autoplay"
			:interval="swiper.interval" :duration="swiper.duration" indicator-active-color='#4791FF'
			@change="currentPage">
			<block v-if="swiper.video">
				<swiper-item>
					<video @play="startVideoPlay" @ended="onVideoEnded" style="width:100%;height:100%" mode="aspectFill"
						:src="swiper.video"></video>
				</swiper-item>
			</block>
			<block v-for="item in swiper.swiperImgUrls" :key="item">
				<swiper-item>
					<image lazy-load class="slide-image" :src="item" mode="aspectFill" />
				</swiper-item>
			</block>
		</swiper>
	</template>

	<template name="productList" v-if="name == 'productList'">
		<view class="section" v-show="productList.length">
			<view class="section_title" v-if="productListName.length">
				<view class="block_section_title_prev" v-if="!hidden_prev"></view>
				<view class="block_section_title">{{ productListName }}</view>
			</view>

			<view class="product_list" style="display: flex;flex-wrap: wrap;padding: 0 25rpx;">
				<block v-for="item in productList" :key="item.id">
					<view class="product_item">
						<view class="product_radius">
							<navigator hover-class="none" :url="`/pages/product/detail?id=${item.id}`">
								<image lazy-load class="image" mode="aspectFill" :src="item.image_uri" />
								<text class="name"
									style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;text-overflow: ellipsis;word-break: break-all;">{{
										item.name }}</text>
								<text class="price" v-if="item.price > 0"><text style="font-size:20rpx">￥</text>{{
									item.price }}</text>
							</navigator>
						</view>

					</view>
				</block>
			</view>

		</view>

	</template>

	<template name="productListShowByRow" v-if="name == 'productListShowByRow'">
		<!-- <view class="section" hidden="{{productListShowByRow.length == 0}}"> -->
		<view class="section">
			<view class="product_list_row" style="display: flex;flex-wrap: wrap;padding: 0 25rpx;">
				<block v-for="item in productListShowByRow" :key="item.id">
					<view class="product_item">
						<navigator hover-class="none" class="product_item_navigator" :url="`/pages/product/detail?id=${item.id}`">
							<image lazy-load class="image" mode="aspectFill" :src="item.image_uri" />
							<view class="flex_col_space_bt product_info">
								<text class="name"
									style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;text-overflow: ellipsis;word-break: break-all;">
									{{ item.name }}</text>
								<view class="flex_row_space_bt" v-if="item.price > 0">
									<text class="price font_bold" :style="{ opacity: item.price ? 1 : 0 }"><text
											style="font-size: 28rpx;">￥</text>{{ item.price }}</text>
									<view class="product_list_row_btn">购买</view>
									<!-- <view class="product_list_row_btn">仅剩{{item.stock}}件</view> -->
								</view>
							</view>
						</navigator>
					</view>
				</block>
			</view>
		</view>
	</template>
</template>

<script setup>


const props = defineProps({
	name: {
		type: String,
		default: ''
	},
	productListShowByRow: {
		type: Array,
		default: () => []
	},
	productList: {
		type: Array,
		default: () => []
	},
	productListName: {
		type: String,
		default: ''
	},
	swiper: {
		type: Object,
		default: () => { }
	},
	hidden_prev: {
		type: Boolean,
		default: false
	}
})
</script>

<style>
.section {
	width: 100%;
}

.product_item_navigator {

	> a {
		width: 100%;
		display: flex;
	}
}
</style>