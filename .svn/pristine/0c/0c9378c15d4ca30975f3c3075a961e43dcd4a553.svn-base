<template>
	<view class="category-container">
		<!-- 导航条 -->
		<NavBar :title="productListName" showBack />

		<!-- <view name="productList">
			<view class="section" v-show="productList.length > 0">
				<view class="product_list" style="display: flex;flex-wrap: wrap;padding: 0 25rpx;">
					<block v-for="(item, index) in productList" :key="index">
						<view class="product_item">
							<view class="product_radius">
								<navigator hover-class="none"
									url="/pages/product/detail?id={{item.id}}&category_id={{category_id}}">
									<image lazy-load class="image" mode="aspectFill" :src="item.image_uri"></image>
									<text class="name"
										style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;text-overflow: ellipsis;word-break: break-all;">{{
											item.name }}</text>
									<text class="price" v-if="item.price > 0">{{ item.price }}元</text>
								</navigator>
							</view>

						</view>
					</block>
				</view>
			</view>
			<view v-show="productList.length == 0" style="margin-left: 30rpx;margin-top: 20rpx;">暂无商品</view>
		</view> -->

		<HighGoods :goods="productList" :isShowHeader="false" />

	</view>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { request } from '@/utils/request.js';
import HighGoods from "@/components/HighGoods.vue";
import { onLoad } from '@dcloudio/uni-app';


const route = useRoute();
const productList = ref([]);
const productListName = ref('');
const category_id = ref(null);

// 微信小程序不适用
// const query = defineProps();
// console.log(query, 'query');

// 微信小程序不适用
// const { id } = route.query;
// category_id.value = id;

onLoad((options) => {
	// console.log(options, 'options');

	category_id.value = options.id;
	getData();
})



async function getData() {
	uni.showLoading({ title: '加载中' })

	// 获取商品列表
	let res = await request('/WxAppCustomer/goods_list', 'POST', {
		goods_group_ids: category_id.value,
	})
	// console.log(res);
	if (res.code != 0) return uni.showToast({ title: res.msg, icon: 'error' });
	productList.value = res.data.list;

	// 获取商品列表名称
	let res2 = await request('/WxAppCustomer/goods_group_detail', 'POST', {
		id: category_id.value
	})
	if (res2.code != 0) return uni.showToast({ title: res2.msg, icon: 'error' });
	// console.log(res2);
	productListName.value = res2.data.detail.name;

	uni.hideLoading();
}

</script>

<style lang="scss" scoped>
.category-container {
	padding-top: $nav-height;
}
</style>
