<template>
	<view>
		pages/test/test

		<CouponPopup :visible="showPopup" @close="handleClose" @claim="handleClaim" title="aaa" :amount=100
			condition="满100可用" expiryDate="2024.08.88" />

		<!-- test btn -->
		<view>
			<button @click="showPopup = true" size="mini">优惠券弹窗</button>
			<button @click="testApi" size="mini">test api</button>
			<button @click="goToPage('/pages/shopcar/shopcar')" size="mini">跳转至购物车页</button>
			<button @click="goToPage('/pages/onlineSearch/onlineSearch')" size="mini">跳转至在线搜索页</button>
			<button @click="goToPage('/pages/goodsDetail/goodsDetail')" size="mini">跳转商品详情页</button>
			<button @click="showActionSheet = true" size="mini">使用ActionSheet组件</button>
			<button @click="showActionSheetSlot = true" size="mini">选择商品弹窗 ActionSheetSlot组件</button>
		</view>


		<!-- 商品参数弹窗 -->
		<ActionSheet :items="actionSheetData.items" :title="actionSheetData.title" v-model:show="showActionSheet"
			@confirm="handleConfirm" />

		<!-- 选择商品弹窗 -->
		<ActionSheetSlot v-model:show="showActionSheetSlot" :footerBtnText="'立即购买'">
			<template #body>
				<view class="ActionSheetSlotComponentBody">
					<!-- 商品图片价格 -->
					<view class="goods-img-price-box">
						<image src="../../static//images/kun.png" alt="" class="goods-img"></image>
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
								<image src="../../static/icon/list.svg" style="width: 30.56rpx;height: 27.08rpx;">
								</image>
								<text>列表</text>
							</view>
						</view>
						<view class="goods-params-item-box">
							<view class="goods-params-item">
								<image src="../../static/images/kun.png" style="width: 61.11rpx; height: 61.11rpx;">
								</image>
								<text>固始鸡1200gx1只（共2.4斤）</text>
							</view>
							<view class="goods-params-item active">
								<image src="../../static/images/kun.png" style="width: 61.11rpx; height: 61.11rpx;">
								</image>
								<text>固始鸡1200gx1只（共2.4斤）</text>
							</view>
							<view class="goods-params-item disabled">
								<image src="../../static/images/kun.png" style="width: 61.11rpx; height: 61.11rpx;">
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
import { ref } from "vue";
import CouponPopup from "@/components/CouponPopup.vue";
import { request } from "@/utils/request.js"

const showPopup = ref(false);
const showActionSheet = ref(false);
const showActionSheetSlot = ref(false);

// 跳转到指定页
function goToPage(page) {
	uni.navigateTo({
		url: page
	})
}

// actionSheet 数据
const actionSheetData = ref({
	title: '商品参数',
	items: [
		{ name: '颜色', value: '红色' },
		{ name: '尺寸', value: '大号' },
		{ name: '尺寸', value: '大号' },
		{ name: '尺寸', value: '大号' },
		{ name: '尺寸', value: '大号' },
		{ name: '尺寸', value: '大号' },
		{ name: '尺寸', value: '大号' },
		{ name: '尺寸', value: '大号' },
		{ name: '尺寸', value: '大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号' },
	]
})

const handleClose = () => {
	showActionSheet.value = false;
	console.log('Popup closed');
};
const handleClaim = () => {
	console.log('Coupon claimed');
}

const handleConfirm = () => {
	console.log('Coupon claimed');
	// 这里可以添加更多逻辑，例如更新状态或发送请求
};
async function testApi() {
	console.log('test');


	// uni.navigateTo({
	// 	url: '/pages/test/test'
	// })
	// return;


	let data = {
		// __IS_APP__: 1,
		wx_open_id: 'oPyg85Y9gzaTO9wgTmeApQMqmhRY',
		// user_id: '10662',
		// app_type: 'wx_mini_app',
		// fuid: 0,
		// preview: 0
	};
	// 转成form-data
	// data = Object.keys(data).reduce((acc, key) => {
	// 	acc.append(key, data[key]);
	// 	return acc;
	// }, new FormData());

	console.log(data);
	let res = await request(
		'/jzkj/WxAppCustomer/home_all_data_v',
		'post',
		data,
		{
			// ['Content-Type']: 'multipart/form-data'
			['Content-Type']: 'application/x-www-form-urlencoded' // 为什么要用这个才是FormData数据
		}
	)
	console.log(res);
}
</script>

<style></style>
