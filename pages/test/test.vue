<template>
	<view class="test-container">
		pages/test/test

		<CouponPopup v-model:visible="showPopup" @close="handleCloseCoupon" @claim="handleClaimCoupon" title="aaa"
			:amount=100 condition="满100可用" expiryDate="2024.08.88" />

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
			@confirm="handleConfirmActionSheet" />

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
							<view class="goods-params-item" v-for="item in goodsParamsData" :key="item.id"
								@click="handleSelectGoodsParams(item.id)"
								:class="{ 'active': selectedGoodsParams.includes(item.id), 'disabled': item.id == 3 }">
								<image src="../../static/images/kun.png" style="width: 61.11rpx; height: 61.11rpx;">
								</image>
								<text>{{ item.value }}</text>
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

		<!-- 导航栏 -->
		<NavBar title="标题" showBack />
	</view>
</template>

<script setup>
import { ref } from "vue";
import CouponPopup from "@/components/CouponPopup.vue";
import { request } from "@/utils/request.js"


const showPopup = ref(false);
const showActionSheet = ref(false);
const showActionSheetSlot = ref(false);

// 商品参数数据
const goodsParamsData = ref([
	{ name: '商品型号', value: '固始鸡1200gx1只（共2.4斤）', id: 1 },
	{ name: '商品型号', value: '固始鸡1200gx1只（共3.4斤）', id: 2 },
	{ name: '商品型号', value: '固始鸡1200gx1只（共5.4斤）', id: 3 },
]);
// 选中的商品参数
const selectedGoodsParams = ref([1]);
// 商品参数点击事件
const handleSelectGoodsParams = (id) => {
	selectedGoodsParams.value = [id];
	console.log(selectedGoodsParams.value);
}

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

const handleCloseCoupon = () => {
	console.log('优惠券弹窗关闭');
};
const handleClaimCoupon = () => {
	console.log('优惠券领取');
	uni.showToast({
		title: '领取'
	});
}

// actionSheet 确定
const handleConfirmActionSheet = () => {
	console.log('actionSheet 确定');
	// 这里可以添加更多逻辑，例如更新状态或发送请求
};

async function testApi() {
	// uni.navigateTo({
	// 	url: '/pages/test/test'
	// })
	// return;

	let data = {
		wx_open_id: 'oPyg85Y9gzaTO9wgTmeApQMqmhRY',
		wx_appid: 'wx184d389f8e1603d4'
	};

	let res = await request(
		'/home_all_data_v',
		'post',
	)
	console.log(res);
}
</script>

<style lang="scss" scoped>
.test-container {
	padding-top: $nav-height;
}
</style>
