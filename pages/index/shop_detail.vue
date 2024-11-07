<template>
	<view class="shop_detail_container">
		<view v-if="is_loading">
			<view style="height: 472rpx;position: relative;">
				<swiper @change="swiper_change" v-show="swiper.swiperImgUrls.length != 0">
					<template v-if="swiper.video">
						<swiper-item>
							<video style="width:100%;height:100%" mode="aspectFill" :src="swiper.video"></video>
						</swiper-item>
					</template>
					<template v-for="(item, index) in swiper.swiperImgUrls" :key="index">
						<swiper-item>
							<image @click="preview_swiper_image(index)" lazy-load :src="item" mode="aspectFill"
								class="slide-image" />
						</swiper-item>
					</template>
				</swiper>
				<view class="swiper_current">{{ swiper_index * 1 + 1 }}/{{ swiper.length_count }}
				</view>
			</view>

			<view class="title_box">
				<view class="hang1">{{ shop.shop_name }}</view>
				<view class="hang2">
					<view class="left">
						<view>营业时间：{{ shop.start_time }}~{{ shop.end_time }}</view>
						<view>详细地址：{{ shop.address_name }}</view>
					</view>
					<view class="right" @click="to_address(shop)">
						<image class="green_daohang"
							src="https://saas.jizhongkeji.com/static/jzkj/images/green_daohang.png">
						</image>
						<view>导航到这里</view>
					</view>
				</view>
			</view>
			<view style="height: 25rpx;background-color: #F7F8FA;width: 100%;"></view>

			<view class="content">
				<view class="intro_box">
					<view style="position: relative;z-index: 10;">门店介绍</view>
					<view class="line"></view>
				</view>
				<block v-for="item in shop.introduce" :key="item.id">
					<rich-text @click="on_tap_rich_text" @longpress="on_tap_rich_text"
						:data-name="item.type == 1 ? 'introduce' : ''" :nodes="item.content"></rich-text>
				</block>
			</view>
			<view style="height: 25rpx;background-color: #F7F8FA;width: 100%;"></view>
			<view style="height: 150rpx;background-color: #F7F8FA;width: 100%;"></view>

			<!-- 底部按钮 -->
			<view class="course_bottom_box">
				<view class="left">
					<view @click="to_home" class="back_home_box">
						<image class="back_home" src="https://saas.jizhongkeji.com/static/jzkj/images/tool_1.png">
						</image>
						<view>首页</view>
					</view>

					<!-- <button style="border: none; outline: none;width: auto;margin:0" hover-class="none" class="back_home_box" open-type="contact">
        <image class="back_home" src="https://saas.jizhongkeji.com/static/jzkj/images/tool_2.png"></image>
        <view style="font-size: 18rpx;">客服</view>
      </button> -->
					<button hover-class="none" style="border: none; outline: none;line-height: 1;" open-type="contact"
						class="tool_item flex_col_cen_cen">
						<image lazy-load style="margin-bottom: 14rpx;" class="tool_icon" mode="heightFix"
							src="https://saas.jizhongkeji.com/static/jzkj/images/tool_2.png"></image>
						客服
					</button>

				</view>

				<view class="left right">
					<view class="hang1" @click="makePhoneCall">联系店长</view>
					<view class="hang2" @click="open_show_tc">立即订餐</view>
				</view>
			</view>


			<!-- 填写报名信息 -->
			<view class="tc_baoming" style="z-index: 100;" v-if="show_tc">
				<form @submit="apply_shop" style="position: relative;">
					<view class="context">
						<view class="tips">在线预约订餐</view>
						<view class="close" @click="close_show_tc">
							<image style="width: 40rpx;height: 40rpx;"
								src="https://saas.jizhongkeji.com/static/jzkj/images/close_pop_icon.png"></image>
						</view>
						<view class="input_item">
							<view class="left">您的姓名</view>
							<view class="input">
								<input placeholder-class="placeholder-style"
									:value="user && user.user_name ? user.user_name : ''" type="text" name="user_name"
									placeholder="请输入您的姓名" />
							</view>
						</view>
						<view class="input_item">
							<view class="left">手机号码</view>
							<view class="input">
								<input :value="user && user.phone ? user.phone : ''"
									placeholder-class="placeholder-style" type="text" name="phone"
									placeholder="输入您的手机号码" />
							</view>
						</view>
						<view class="input_item">
							<view class="left">用餐时间</view>

							<view class="input">
								<PickerSelector :start="currentDate" style="width: 100%;" mode="date" name="shop_time"
									:value="picker_selector_data.shop_time" placeholder="请选择用餐时间"
									placeholder-class="placeholder-style"
									@change="picker_selector_change($event, 'shop_time')" />

							</view>
						</view>
						<view class="input_item">
							<view class="left">用餐人数</view>
							<view class="input">
								<input placeholder-class="placeholder-style" value="" type="number" name="shop_count"
									placeholder="输入您的用餐人数" />
							</view>
						</view>


						<view style="display: flex;justify-content: center;width:100%;">
							<button
								style="width: 85%;background: linear-gradient(159deg, #07C160 0%, #00A44E 100%);height: 83rpx;border-radius: 50rpx;display: flex;align-items: center;justify-content: center;font-weight: 400;font-size: 33rpx;color: #FFFFFF;"
								form-type="submit" class="form_buttom">立即预约</button>
						</view>
					</view>
				</form>

			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { request } from '@/utils/request.js';
import { onLoad } from '@dcloudio/uni-app';
import { useTempStore } from "@/stores/temp.js";
import { storeToRefs } from 'pinia';
import { replaceRichTextImage } from '@/utils';
const tempStore = useTempStore();
const { user } = storeToRefs(tempStore);

const is_loading = ref(false);
const swiper = ref({
	swiperImgUrls: [],
	video: null,
	length_count: 0,
});
const swiper_index = ref(0);
const shop = ref({});
const show_tc = ref(false);
const is_vip = ref(0);
const show_member = ref(false);
const targte_apply = ref({});
const is_saving = ref(0);
const shop_id = ref(0);
const currentDate = ref(new Date().toISOString().split('T')[0]);

const picker_selector_data = ref({});


onLoad((options) => {
	uni.showLoading({
		title: 'loading',
	})
	// this.onLogin(user => {
	// 	this.setData({
	// 		user: user
	// 	})
	// })

	if (options && options.id && options.id > 0) {
		shop_detail_data(options.id);
		shop_id.value = options.id;
	}
});

function picker_selector_change(e, colName) {
	// console.log(e, colName);
	picker_selector_data.value[colName] = e.value;
}

function close_show_tc() {
	show_tc.value = false;
}
function open_show_tc() {
	show_tc.value = true;
}

async function shop_detail_data(shop_id) {

	let res = await request('/WxAppCustomer/shop_detail', 'post', { shop_id });
	console.log('shop_detail_data', res);
	if (res.code != 0) {
		uni.showToast({
			title: '加载数据失败',
			icon: 'none'
		})
	} else {
		uni.hideLoading();

		swiper.value.swiperImgUrls = res.data.shop.image_uris_arr;
		swiper.value.length_count = res.data.shop.image_uris_arr.length
		swiper.value.video = res.data.shop.video_uri;

		if (res.data.shop.video_uri) {
			swiper.value.length_count += 1;
		}

		// that.setData({
		// 	shop: res.data.data.shop,
		// 	swiper: that.data.swiper,
		// 	targte_apply: res.data.data.targte_apply,
		// 	is_loading: true
		// });
		shop.value = res.data.shop;
		// swiper.value = swiper.value;
		targte_apply.value = res.data.targte_apply;
		is_loading.value = true;
		// 初始化富文本样式
		console.log(shop.value.introduce);
		shop.value.introduce = replaceRichTextImage(shop.value.introduce);
		console.log('shop.value.introduce', shop.value.introduce);

		if (res.data.shop && res.data.shop.shop_name) {
			uni.setNavigationBarTitle({
				title: res.data.shop.shop_name
			})
		}
	}
}

function swiper_change(e) {
	// console.log('11111111111', e);
	swiper_index.value = e.detail.current;
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

function preview_swiper_image(index) {
	uni.previewImage({
		urls: swiper.value.swiperImgUrls,
		current: index
	})
}

//点击预览图片,放大预览
function on_tap_rich_text(e) {
	console.log(e);
	let imgs = [] //把详情页面所有图片放在一个数组中
	let name = e.currentTarget.dataset.name;

	console.log('00000000000', name, shop.value[name]);

	shop.value[name].forEach((m) => {
		console.log("mmmmm", m);
		if (m.content_type == "rich_text") { //如果详情内容是富文本，则遍历富文本中content中的每一个元素
			m.content.forEach((m2) => {
				console.log("mmmm2", m2);
				find_imgs(m2, imgs) //调用函数，把查找到的图片添加到imgs数组中
			})
		}
	})
	console.log("imgs", imgs);
	// let currentUrl = e.currentTarget.dataset.src
	if (imgs.length > 0) { //如果图片多余1张，则可以左右滑动查看(一张的时候左右滑不动)
		uni.previewImage({
			current: imgs[0], // 当前显示图片的为数组的第一张
			urls: imgs // 需要预览的图片http链接列表

		})
	}

	// console.log('4444', this.data.notice_list_show);
}

// 查找图片
function find_imgs(node, imgs) { //node是自定义节点，表示node下面的imgs
	if (node.name == "img") {
		imgs.push(node.attrs.src) //把查找到的图片放进imgs数组中
	}
	if (node.children) { //判断node下面有没有children，有的话接着遍历children里面的children去找img
		node.children.forEach((m) => {
			find_imgs(m, imgs) //调用查找函数，把得到的图片放进数组中
		})
	}
}

// 打电话
function makePhoneCall(e) {
	// console.log(e);
	// var phone = e.currentTarget.dataset.userphone
	// console.log(phone);
	uni.makePhoneCall({
		phoneNumber: shop.value.phone,
	})
}

function to_home() {
	uni.redirectTo({
		url: '/pages/index/index',
	})
}

async function apply_shop(e) {
	// console.log(e);

	// let formData = {...e.detail.value, ...picker_selector_data.value};

	try {
		uni.showLoading({
			title: '提交中',
		})
		let res = await request('/WxAppCustomer/apply_shop', 'post', {
			shop_id: shop.value.id,
			user_name: e.detail.value.user_name || '',
			phone: e.detail.value.phone || '',
			shop_time: e.detail.value.shop_time || picker_selector_data.value.shop_time,
			shop_count: e.detail.value.shop_count || '',
		})
		uni.hideLoading();
		if (res.code == 0) {
			// console.log('11111111111',res.data.data.apply);
			uni.navigateTo({
				url: '/pages/index/apply_detail?applyid=' + res.data.target.id,
			})

			show_tc.value = false;
		} else {
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
		uni.hideLoading();
	}
}
</script>

<style scoped>
swiper {
	position: relative;
	height: 472rpx;
	overflow: hidden;
}

.slide-image {
	width: 100%;
	height: 472rpx;
}

.swiper_current {
	position: absolute;
	bottom: 62rpx;
	right: 17rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	/* width: 72rpx;
height: 36rpx; */
	background: rgb(7, 193, 96, 0.6);
	border-radius: 18px;
	font-size: 25rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #FFFFFF;
	letter-spacing: 3rpx;
	padding: 5rpx 10rpx;
}

.title_box {
	width: 100%;
	background-color: #FFFFFF;
	padding: 28rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	font-weight: bold;
	font-size: 32rpx;
	color: #313131;
	text-align: justify;
	line-height: 1.5;
}

.title_box .hang2 {
	display: flex;
	/* margin-top: 27rpx; */
	font-size: 28rpx;
	color: rgba(0, 0, 0, 0.5);
	align-items: center;
	justify-content: space-between;
}

.title_box .hang2 .left {
	display: flex;
	flex-direction: column;

}

.title_box .hang2 .right {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: none;
	border-left: 1rpx solid #EAEAEA;
	font-size: 25rpx;
	color: #09C161;
	padding-left: 18rpx;
	margin-left: 18rpx;
	justify-content: center;
}

.green_daohang {
	width: 83rpx;
	height: 83rpx;
	margin-bottom: 20rpx;
}


.content {
	box-sizing: border-box;
	padding: 28rpx;
	padding-top: 0;
}

rich-text {
	max-width: 100%;
	color: #0D0D0D;
	/* letter-spacing: 3rpx; */
	text-align: justify;
	line-height: 1.5;
	font-size: 28rpx;
}

rich-text .img {
	max-width: 100%;
}

.intro_box {
	position: relative;
	padding-top: 25rpx;
	padding-bottom: 30rpx;
	font-weight: bold;
	font-size: 35rpx;
	color: #151515;
}

.intro_box .line {
	width: 146rpx;
	position: absolute;
	bottom: 38rpx;
	left: -2rpx;
	height: 8rpx;
	background: rgba(7, 193, 96, 0.5);
	border-radius: 4rpx 4rpx 4rpx 4rpx;
}

.course_bottom_box {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
	padding: 14rpx 28rpx;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 100;
	box-shadow: 0px -2rpx 10rpx 4rpx rgba(0, 0, 0, 0.1);
	height: 100rpx;
	background-color: #FFFFFF;
}

.back_home_box {
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: 400;
	font-size: 18rpx;
	color: #686868;
}

.back_home {
	width: 35rpx;
	height: 35rpx;
	flex: none;
	margin-bottom: 9rpx;
}

.course_bottom_box .left {
	display: flex;
	align-items: center;
	width: 18%;
	justify-content: space-between;
}

button {
	border: none;
	/* background-color: red; */
	outline: none;
	padding: 0;
	margin: 0;
	border-radius: 0;
}

.course_bottom_box .right {
	width: 80%;
	box-sizing: border-box;
	padding-left: 28rpx;
}

.course_bottom_box .right .hang2 {
	width: 319.45rpx;
	font-weight: 400;
	font-size: 29rpx;
	color: #FFFFFF;
	height: 70rpx;
	background: linear-gradient(159deg, #07C160 0%, #00A44E 100%);
	border-radius: 50rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.course_bottom_box .right .hang1 {
	width: 180rpx;
	border-radius: 50rpx;
	border: 1rpx solid #07C160;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 70rpx;
	font-weight: 400;
	font-size: 29rpx;
	color: #07C160;
	box-sizing: border-box;
}

.course_bottom_box .right .bomingjiezhi {
	background: #E2E2E2;
	color: #AAAAAA;
}

.tc_baoming {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99999;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.8);
}

.context {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 860rpx;
	display: flex;
	flex-direction: column;
	background: #FFFFFF;
	border-radius: 25rpx 25rpx 0rpx 0rpx;
	box-sizing: border-box;
	padding: 50rpx 0 60rpx;
	align-items: center;
	justify-content: space-between;
}

.tc_baoming .tips {
	font-weight: bold;
	font-size: 38rpx;
	color: #000000;
}


.input_item {
	display: flex;
	/* flex-direction: column; */
	width: 85%;
	align-items: center;
}

.input_item .left {
	font-weight: bold;
	font-size: 29rpx;
	color: #424242;
	margin-right: 22rpx;
	flex: none;
}

.input_item text {
	font-size: 29rpx;
	font-weight: 400;
	color: #28211F;
	margin-bottom: 12rpx;
	word-break: keep-all;
	flex: none;
}

.input_item image {
	width: 24rpx;
	height: 0;
	margin-right: 24rpx;
	flex: none;
}

.input {
	width: 100%;
	height: 90rpx;
	opacity: 1;
	border: 2rpx solid #EEEEEE;
	box-sizing: border-box;
	padding: 25rpx 33rpx;
	display: flex;
	align-items: center;
	border-radius: 8rpx;
	background-color: #F7F7F7;
	font-size: 29rpx;
}

.input input {
	width: 100%;
	font-weight: 400;
	font-size: 29rpx;
	color: #28211F;
	/* color: #8D8D8D; */
}

.placeholder-style {
	color: #CCCCCC;
}


.yanzhengma {
	width: 210rpx;
	height: 90rpx;
	background: #FFFFFF;
	border: 2rpx solid #EEEEEE;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 28rpx;
	font-weight: 400;
	color: #CCCCCC;
	border-radius: 8rpx;
}

.tc_baoming .close {
	position: absolute;
	top: 33rpx;
	right: 33rpx;
	z-index: 10;
}

.show_member {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
}

.member_context {
	width: 531rpx;
	height: 556rpx;
	background: linear-gradient(136deg, #E9FFDE 0%, #BDFF91 99%);
	border-radius: 17rpx 17rpx 17rpx 17rpx;
	box-sizing: border-box;
	padding: 50rpx 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
}

.member_context .hang1 {
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: 400;
	font-size: 25rpx;
	color: #925300;
	width: 86%;
}

.member_context .hang1 .title {
	font-weight: bold;
	font-size: 42rpx;
	color: #07C160;
}

.member_context .image_box {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: 500;
	font-size: 22rpx;
	color: #6D422E;
	width: 100%;
}

.member_context .image_box .item {
	display: flex;
	align-items: center;
	flex-direction: column;
}

.member_context .image_box .item image {
	width: 94.44rpx;
	height: 94.44rpx;
	margin-bottom: 10rpx;
	flex: none;
}

.member_context .btn {
	width: 333rpx;
	height: 69rpx;
	background: linear-gradient(159deg, #07C160 0%, #00A44E 100%);
	border-radius: 41rpx 41rpx 41rpx 41rpx;
	font-weight: 400;
	font-size: 31rpx;
	color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 50rpx;
}

.tool_item {
	font-size: 18rpx;
	color: #686868;
	width: max-content;
}

.tool_icon {
	height: 35rpx;
	margin-bottom: 8rpx;
	width: 35rpx;
}

.tool_box .tool_big_btn {
	margin-left: 44rpx;
	flex: none;
	box-sizing: border-box;
	width: 402rpx;
}

.tool_btn_item {
	background-color: #F2AB20;
	color: #FFFFFF;
	font-size: 28rpx;
	height: 68rpx;
	overflow: hidden;
	width: 100%;
}

.tool_btn_item.yellow {
	border-radius: 34rpx 0rpx 0rpx 34rpx;
}

.tool_btn_item.pink {
	background-color: #FC4740;
	border-radius: 0rpx 34rpx 34rpx 0rpx;
}


/*去掉按钮边框*/
button::after {
	border: 0;
}
</style>
