<template>
	<view>
		<view name="productList" v-if="is_loading">
			<view class="section" v-show="!productList.length > 0">

				<view class="product_list" style="display: flex;flex-wrap: wrap;padding: 0 25rpx;">
					<template v-for="item in productList" :key="item.id">
						<view class="product_item">
							<view class="product_radius">
								<navigator hover-class="none"
									:url="`/pages/product/detail?id=${item.id}&category_id=${category_id}`">
									<image lazy-load class="image" mode="aspectFill" :src="item.image_uri"></image>
									<text class="name"
										style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;text-overflow: ellipsis;word-break: break-all;">{{
											item.name }}</text>
									<text class="price" v-if="item.price > 0">{{ item.price }}元</text>
								</navigator>
							</view>

						</view>
					</template>
				</view>
			</view>

			<view v-if="productList.length == 0" style="margin-left: 30rpx;margin-top: 20rpx;">暂无商品</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { request } from '@/utils/request.js';
import { onLoad, onShow } from '@dcloudio/uni-app';


const productList = ref([]);
const onReachBottomActioning = ref(false);
const per_page = ref(40);
const is_home = ref(0);
const productListName = ref('');
const category_id = ref(null);
const is_loading = ref(false);

onShow(async () => {
	// var that = this
	uni.showLoading({
		title: 'loading',
	})

	let res = await request('/WxAppCustomer/goods_list', 'post', { goods_group_ids: category_id.value })
	console.log(res);
	// 更新数据
	if (res.code == 0) {
		productList.value = res.data.list;
		uni.hideLoading({
			success: (res) => { },
		})
	} else {
		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true
		})
		productList.value = []
	}
	productList.value = productList.value
	is_loading.value = true


	let res2 = await request('/WxAppCustomer/goods_group_detail', 'post', { id: category_id.value })
	console.log(res2);
	// 更新数据
	if (res2.code == 0) {
		productListName.value = res2.data.detail.name;


		uni.setNavigationBarTitle({
			title: res2.data.detail.name,
		})

		uni.hideLoading()
	} else {
		uni.showToast({
			title: res2.msg,
			icon: 'none',
			mask: true
		})
		productListName.value = ''
	}
});


// 点击页面
async function click_page(type, goods_group_id) {
	let res = await request('/WxAppCustomer/visit_page', 'post', {
		type: type,
		goods_group_id
	})
	// 更新数据
	if (res.code == 0) { } else {
		// console.log(24444,res);
		uni.showToast({
			title: res.data.msg,
			icon: 'none',
			mask: true
		})
	}
}

onLoad(options => {
	console.log('onLoad')
	// this.setData({
	// 	category_id: options.id
	// })
	category_id.value = options.id
	console.log('category_idcategory_id', category_id.value);

	click_page(2, category_id.value);
})



// /**
//  * 用户点击右上角分享
//  */
// onShareAppMessage(options => {
// 	return app.onShareAppMessage(options);
// })

// /**
//  * 分享朋友圈
//  */
// onShareTimeline(e => {
// 	return app.onShareAppMessage(options);
// })
</script>

<style></style>
