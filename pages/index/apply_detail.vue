<template>
	<view class="apply_detail_container">
		<HeightBar />
		<NavBar showBack>
			<template #title>预定成功</template>
		</NavBar>

		<image mode="aspectFill" style="position: fixed;top:0;left:0;width: 100%;height: 100vh;"
			src="https://saas.jizhongkeji.com/static/jzkj/images/huyuan.jpg"></image>
		<view class="context_box">
			<view class="container_box">
				<view class="hang1">
					<image style="width:166rpx;height: 166rpx;" mode="widthFix"
						src="https://saas.jizhongkeji.com/static/jzkj/images/success_right.png"></image>
					<view class="title">恭喜您预定成功</view>

					<view class="hang2">
						<view @click="backhome" class="share_order"
							style="width: 167rpx;height: 56rpx;margin:0;padding:0;background-color: unset;">
							<view>返回首页</view>
						</view>
					</view>
				</view>

				<view class="hang3">
					<view class="right">
						<view>您的姓名：{{ apply.user_name }}</view>
						<view style="margin-top:12rpx">手机号码：{{ apply.phone }}</view>
						<view style="margin-top:12rpx">预约时间：{{ apply.shop_time }}</view>
						<view style="margin-top:12rpx">编号：{{ apply.number }}</view>
						<view style="margin-top:12rpx">用餐人数：{{ apply.shop_count }}</view>
						<view style="margin-top:12rpx">核销码：{{ apply.qrcode_number }}</view>
					</view>

					<view class="right" style="margin:0;margin-left:28rpx">
						<image @click="open_img(apply.qrcode_trial)" class="left" style="margin:0;" mode="widthFix"
							:src="apply.qrcode_trial"></image>
						<view style="word-break: keep-all;">进店用餐时请出示该核销码</view>
						<view></view>
					</view>
				</view>


				<view class="product_item_v company_box">
					<view class="hang11">
						<view style="display: flex;align-items: center;">
							<view class="shop_name_text">{{ shop.shop_name }}</view>
							<image v-if="shop.is_open == 1" class="yingye"
								src="https://saas.jizhongkeji.com/static/jzkj/images/yingye.png"></image>
							<image v-else class="yingye"
								src="https://saas.jizhongkeji.com/static/jzkj/images/xiuxi.png">
							</image>
						</view>

						<view class="daohang_box">
							<image @click="to_address(shop)" class="daohang"
								src="https://saas.jizhongkeji.com/static/jzkj/images/daohang.png"></image>
							<image @click="makePhoneCall(shop.phone)" class="daohang"
								src="https://saas.jizhongkeji.com/static/jzkj/images/phone_img.png"></image>
						</view>
					</view>

					<image
						style="width: 100%;height: 238rpx;border-radius:14rpx;flex: none;margin-top: 20rpx;margin-bottom: 10rpx;"
						lazy-load :src="shop.image_uris_arr?.[0]" mode="widthFix" />
					<view class="hang22" style="margin-top:10rpx;margin-bottom: 10rpx;">
						<image class="address_company"
							src="https://saas.jizhongkeji.com/static/jzkj/images/address_company.png"></image>

						<view>{{ shop.address_name }}</view>
					</view>
					<view class="hang22" style="margin-top:0rpx;margin-bottom: 10rpx;">
						<image class="address_company" src="https://saas.jizhongkeji.com/static/jzkj/images/time.png">
						</image>
						<view>{{ shop.start_time }}-{{ shop.end_time }}</view>
					</view>
				</view>



			</view>
		</view>

		<view style="height: 50rpx;"></view>
	</view>
</template>

<script setup>
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app';
import { request } from '@/utils/request.js';
import { ref } from 'vue';
import { useTempStore } from '@/stores/temp.js';
import { storeToRefs } from "pinia";

const tempStore = useTempStore();
const { user } = storeToRefs(tempStore);

const is_loading = ref(false);
const has_bar_title_color = ref('#E2FFD1');

const course = ref({});
const title_color = ref('#000');
const back_with = ref(false);

const shop = ref({});
const apply = ref({});


onLoad((options) => {
	// console.log(options);
	if (options && options.applyid) {
		apply_detail(options.applyid)
	}
})
onShareAppMessage(() => {
	return {
		title: course.value.name,
		path: '/pages/index/course_detail?id=' + course.value.id + '&fuid=' + user.value.id,
		imageUrl: course.value.image_uris_arr[0],
	}
})


async function apply_detail(apply_id) {
	try {
		let res = await request('/WxAppCustomer/apply_detail', 'post', { apply_id })
		if (res.code == 0) {
			shop.value = res.data.shop;
			apply.value = res.data.apply;
			is_loading.value = true;
		} else {
			navigateBack();
			uni.showToast({
				title: res.msg,
				icon: 'none',
				mask: true
			})
		}
	} catch (error) {
		uni.showToast({
			title: '加载数据失败',
			icon: 'none'
		})
	}
}



// 导航
function to_address(shop) {
	console.log(shop);
	let address = shop.address.split(",")
	let latitude = address[0];
	let longitude = address[1];
	let name = shop.shop_name;
	// console.log(latitude, longitude, name);

	let address2 = shop.address_detail;
	// console.log('address11----', shop.address, name);
	// console.log('位精度', latitude, longitude);
	uni.openLocation({
		longitude: parseFloat(longitude),
		latitude: parseFloat(latitude),
		name: name,
		address: address2
	})
}
// 打电话
function makePhoneCall(phone) {
	uni.makePhoneCall({
		phoneNumber: phone,
	})
}
function backhome() {
	uni.redirectTo({
		url: '/pages/index/index',
	})
}

function open_img(qrcode_trial) {
	var img = qrcode_trial
	img = img.split(',')
	uni.previewImage({
		current: img, // 当前显示图片的为数组的第一张
		urls: img // 需要预览的图片http链接列表
	})
}
</script>

<style scoped>
.has_bar_title_color {
	background-color: rgb(228, 255, 212);
	color: transparent;
}

.context_box {
	position: relative;
	z-index: 10;
	width: 100%;
	box-sizing: border-box;
	padding: 0 28rpx;
}

.container_box {
	width: 100%;
	background-color: #ffffff;
	border-radius: 50rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	padding-top: 10rpx;
}

.hang1 {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding-top: 100rpx;
}

.hang1 .title {
	font-weight: bold;
	font-size: 32rpx;
	color: #313131;
	padding: 20rpx;
	padding-bottom: 40rpx;
}

.hang2 {
	display: flex;
	align-items: center;
	width: 60%;
	justify-content: center;
	padding-bottom: 55rpx;
}

.hang2 .left {
	width: 167rpx;
	height: 56rpx;
	background: linear-gradient(159deg, #07C160 0%, #00A44E 100%);
	border-radius: 28rpx 28rpx 28rpx 28rpx;
	font-size: 28rpx;
	color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
}

.share_order {
	width: 167rpx;
	height: 56rpx;
	border-radius: 28rpx 28rpx 28rpx 28rpx;
	border: 1rpx solid #07C160;
	font-size: 28rpx;
	color: #07C160;
	display: flex;
	align-items: center;
	justify-content: center;
}

.hang3 {
	display: flex;
	padding: 30rpx 0;
	border-top: 1rpx solid #CACACA;
	border-bottom: 1rpx solid #CACACA;
	justify-content: space-between;
}

.hang3 .left {
	width: 277.78rpx;
	height: 183.33rpx;
	margin-right: 28rpx;
	flex: none;
	border-radius: 15rpx;
}

.hang3 .right {
	display: flex;
	flex-direction: column;
	font-size: 25rpx;
	color: rgba(0, 0, 0, 0.5);
	/* text-align: justify; */
	word-break: break-all;
}

.hang4 {
	border: 0;
	padding-top: 70rpx;
	justify-content: space-between;
}

.hang4 .left {
	margin: 0;
	margin-left: 28rpx;
}

.product_item_v {
	display: flex;
	flex-direction: column;
	padding: 30rpx 0;
}

.company_box .hang11 {
	display: flex;
	align-items: center;
	font-weight: bold;
	font-size: 29rpx;
	color: #000000;
	text-align: justify;
	line-height: 1.5;
	justify-content: space-between;
}

.daohang_box {
	display: flex;
	align-items: center;
}

.daohang {
	width: 57.64rpx;
	height: 57.64rpx;
	margin-left: 30rpx;
	flex: none;
}

.company_box .hang22 {
	display: flex;
	align-items: baseline;
	font-size: 24rpx;
	color: #666666;
	text-align: justify;
	line-height: 1.5;
	margin-top: 10rpx;
	margin-bottom: 25rpx;
}

.yingye {
	width: 111rpx;
	height: 33rpx;
	flex: none;
	margin-left: 20rpx;
}

.product_list {
	padding-top: 30rpx;
}

.product_list .product_item_v:last-child {
	border-bottom: 0;
}

.address_company {
	width: 20rpx;
	height: 20rpx;
	margin-right: 20rpx;
	flex: none;
}

.shop_name_text {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: break-all;
}
</style>
<style scoped lang="scss">
.apply_detail_container {
	min-height: calc(100vh);
	padding-top: calc($nav-height + 30rpx);
	// background-color: #f7f8fa;
	// position: relative;
}
</style>
