<template>
	<view class="distribution_goods_container" v-if="is_loading">

		<template v-if="productList && productList.length > 0">
			<view class="section" v-show="!productList.length == 0">
				<view class="product_list_row" style="display: flex;flex-wrap: wrap;padding: 0 25rpx;">
					<template v-for="item in productList" :key="item.id">
						<view class="product_item">
							<!-- <navigator hover-class="none" :url="`/pages/product/detail?id=${item.id}`"> -->
							<view class="flex" @click="toPage(`/pages/product/detail?id=${item.id}`)">
								<image lazy-load="true" class="image" mode="aspectFill" :src="item.image_uri">
								</image>
								<view class="flex_col_space_bt product_info">
									<text class="name"
										style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;text-overflow: ellipsis;word-break: break-all;">{{
											item.name }}</text>

									<view class="share_box_v">
										<view class="jiage_he">
											<view>售价￥{{ item.price }}<span
													v-if="item.guige_price && item.guige_price > 0">~￥{{
														item.guige_price }}</span>
											</view>

											<view v-if="item.distribution_money > 0" style="margin-top: 12rpx;">
												预计最高佣金<span style="color:#FF2626;">￥{{ item.distribution_money }}</span>
											</view>
										</view>

										<view class="share_box" @click.stop.prevent="share_good(item.id)">分享
										</view>
									</view>
								</view>
							</view>
							<!-- </navigator> -->
						</view>
					</template>
				</view>

			</view>
		</template>

		<template v-else>
			<view class="flex_col_cen_cen no_data_tip_box">
				<image lazy-load class="no_data_img" src="https://saas.jizhongkeji.com/static/jzkj/images/kong.png"
					mode="aspectFit"></image>
				<view class="no_data_tip">暂无数据</view>
			</view>
		</template>


		<view class="tc_baoming" v-if="is_image">
			<view class="image_box">
				<view style="width: 100%;display: flex;justify-content: flex-end;margin-bottom: 30rpx;">
					<image @click="close_is_image" style="width: 40rpx;height: 40rpx;"
						src="https://saas.jizhongkeji.com/static/jzkj/images/wrong.png" mode="widthFix" />
				</view>
				<image :src="arr_imgs" style="width: 100%;height: 800rpx;" mode="widthFix"></image>
				<view style="display: flex;flex-direction: column;align-items: center;"
					@click="tap_package_downloadToPhotosAlbum">
					<image style="width: 80rpx;height: 80rpx;margin-top: 30rpx;"
						src="https://saas.jizhongkeji.com/static/jzkj/images/down_img.png" mode="widthFix" />
					<view>下载到手机</view>
				</view>

			</view>


		</view>

	</view>
</template>

<script setup>
import { ref } from 'vue';
import { request } from '@/utils/request.js';
import { onLoad, onReachBottom } from '@dcloudio/uni-app';
import { toPage } from '@/utils';


const productList = ref([]);
const is_loading = ref(false);
const is_image = ref(false);
const arr_imgs = ref('');
const share = ref(false);


onLoad(options => {
	uni.showLoading({
		title: 'loading',
	})
	goods_list()
})
onReachBottom(() => {
	goods_list();
})


function tap_package_downloadToPhotosAlbum(e) {
	// var item = e.currentTarget.dataset.downimg
	// console.log('itemitemimage_uris_arr', item.image_uris_arr)

	// TODO: uni.saveImageToPhotosAlbum(OBJECT)

	var img = arr_imgs.value;
	// console.log('img that.downloadToPhotosAlbum', img)
	// return;

	// 不支持网络图片，需要先下载到本地
	let tempFilePath;
	uni.downloadFile({
		url: img,
		success: (res) => {
			// console.log('downloadFile res', res);
			tempFilePath = res.tempFilePath
			// console.log('tempFilePath', tempFilePath)
			uni.saveImageToPhotosAlbum({
				filePath: tempFilePath,
				success: () => {
					uni.showToast({
						duration: 3000,
						icon: 'none',
						title: '图片已下载至相册，快去分享吧'
					})
				},
				fail: (err) => {
					console.log(err);
				}
			})
		}
	})
}
async function goods_list() {
	let res = await request('/WxAppCustomer/distribution_goods', 'post', {
		offset: productList.value.length,
	})
	// 更新数据
	if (res.code == 1) {
		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true
		})
		uni.hideLoading()
		return
	}
	productList.value.push.apply(productList.value, res.data.list)

	is_loading.value = true
	uni.hideLoading()
}
function close_is_image() {
	is_image.value = false
}

// 分享海报
async function share_good(goodid) {
	console.log('share.value', share.value)
	if (share.value) {
		return;
	}
	share.value = true;

	uni.showLoading({
		title: 'loading',
	})
	let res = await request('/WxAppCustomer/haibao_add_qrcode_arr', 'post', { id: goodid })
	uni.hideLoading()
	if (res.code == 0) {
		share.value = false;
		is_image.value = true;
		arr_imgs.value = res.data.arr_imgs;
	} else {
		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true
		})
	}
}
function saveImage() {
	let imageUrl = arr_imgs.value; // 图片的URL

	if (!arr_imgs.value) {
		uni.showToast({
			title: '请选择图片',
			icon: 'none',
		})
		return;
	}

	uni.downloadFile({
		url: imageUrl,
		success: function (res) {
			uni.saveImageToPhotosAlbum({
				filePath: res.tempFilePath,
				success: function () {
					uni.showToast({
						title: '保存成功',
						icon: 'success',
					});
				},
				fail: function (err) {
					console.log(err);
					uni.showToast({
						title: '保存失败',
						icon: 'none',
					});
				}
			});
		},
		fail: function (err) {
			console.log(err);
		}
	});
}

</script>

<style>
page {
	background: #f6f8fe;
}

.product_list_row .product_item {
	background-color: #fff;
	border: 0;
	margin-top: 28rpx;
	padding: 28rpx;
}

.jiage_he {
	display: flex;
	flex-direction: column;
	color: #a0a0a0;
	font-size: 25rpx;
}

.share_box_v {
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: flex-end;
}

.share_box {
	width: 83.33rpx;
	height: 38.89rpx;
	opacity: 0.9;
	border-radius: 8.33rpx;
	background: linear-gradient(181deg, #ff1b1b 0%, #ff3671 90%);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 25rpx;
	color: #fff;
}

.tc_baoming {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99999;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.8);
	overflow-y: auto;
}

.image_box {
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 100%;
	padding: 0 60rpx;
	color: #fff;
	font-size: 28rpx;
	box-sizing: border-box;
	padding-top: 100rpx;
	padding-bottom: 100rpx;
}
</style>
