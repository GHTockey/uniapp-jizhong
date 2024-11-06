<template>
	<view v-if="is_loading">

	</view>
</template>

<script setup>
import { ref } from 'vue';
import { request } from '@/utils/request.js';
import { useTempStore } from '@/stores/temp.js';
import { storeToRefs } from 'pinia';
import { onLoad, onShow } from '@dcloudio/uni-app';

const { user, business } = storeToRefs(useTempStore())

const order_id = ref(0)
const show_page_time = ref(null)
const countdown_Interval = ref(null)
const countdown = ref(null)
const is_show_btn = ref(false) //隐藏掉没有做的按钮

const pick_name = ref(null)
const company = ref(null)

const status = ref()
const shop = ref(null)
const order = ref(null)
const is_loading = ref(false)


onLoad(options => {
	// this.onLogin(user => {
	// 	this.setData({
	// 		user: user,
	// 		business: user.business,
	// 	})
	// });

	if (options && options.order_id) {
		order_id.value = options.order_id;
		console.log('order_idorder_id', order_id.value);
	}

	if (order_id.value > 0) {
		apply_detail();
	}
})
onShow(() => {
	// this.setData({
	//   show_page_time: Date.now()
	// });
	show_page_time.value = Date.now()
})



// 点击申请退款
function to_drawback(drawbackid) {
	// var drawbackid = e.currentTarget.dataset.drawbackid
	console.log('444', drawbackid);

	// return
	// refund_res 1:退款中;2:退款成功;3:退款失败;4:退款处理中;5:退款关闭;6:退款异常 && e.currentTarget.dataset.drawbackid.refund_res != 1 
	if (drawbackid.refund_res != 2 && drawbackid.refund_res != 4) {
		uni.navigateTo({
			url: '/pages/mine/drawback?orderid=' + drawbackid,
		})
	} else {
		uni.showModal({
			title: '提示',
			content: '页面数据过期，请刷新再试',
			complete: (res) => { }
		})
	}

}
// 点击取消订单
function cencel_order(cancelid) {
	console.log('444', cancelid);
}
//删除订单
async function delte_business(id) {

	// var id = e.target.dataset.delteid
	console.log('11111111111111111111111', id);

	uni.showModal({
		title: '系统提示',
		content: '确认删除订单吗？',
		// content: '确认要发货吗？', //提示内容
		success: async function (res) {
			if (res.confirm) {
				let reqRes = await request('/WxAppCustomer/delte_business', 'post', { id })
				if (reqRes.code == 0) {
					uni.showToast({
						title: "成功",
						icon: 'none',
						mask: true
					})
					user_order_list(status.value)
					// setTimeout(() => {
					//     this.navigateBack()
					// }, 1000);
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'error',
					})
				}
			} else {
				console.log('取消')
			}
		}
	})
}
//关闭订单
async function close_business(order_id) {
	console.log('11111111111111111111111', order_id);
	uni.showModal({
		title: '系统提示',
		content: '确认取消订单吗？',
		// content: '确认要发货吗？', //提示内容
		success: async function (res) {
			if (res.confirm) {
				let reqRes = await request('/WxAppCustomer/close_business', 'post', { id: order_id })
				if (reqRes.code == 0) {
					uni.showToast({
						title: "成功",
						icon: 'none',
						mask: true
					})
					user_order_list(status.value)
					// setTimeout(() => {
					//     this.navigateBack()
					// }, 1000);
				} else {
					uni.showToast({
						title: reqRes.msg,
						icon: 'error',
					})
				}
			} else {
				console.log('取消')
			}
		}
	})
}
async function apply_detail() {
	// var that = this;

	try {
		let res = await request('/WxAppCustomer/order_info_detail', 'post', { id: order_id.value })
		// 更新数据
		if (res.code == 0) {
			// that.setData({
			// 	shop: res.data.data.shop,
			// 	order: res.data.data.order,
			// 	pick_name: res.data.data.pick_name,
			// 	company: res.data.data.company,
			// 	is_loading: true,
			// })
			shop.value = res.data.shop
			order.value = res.data.order
			pick_name.value = res.data.pick_name
			company.value = res.data.company
			is_loading.value = true

			suan_countdown()
			console.log('order===', order.value);

			// var order = res.data.order;
			var title = '';
			if (!order) {
				return;
			}
			if (order.refund_res == 0) {
				if (order.status == 1 && order.countdown > 0) {
					title = '待付款';
				}
				if (order.status == 1 && order.countdown <= 0) {
					title = '交易关闭';
				}
				if (order.status != 1 && order.close_order_type == 1) {
					title = '付款超时,自动关闭订单';
				}
				if (order.status != 1 && order.close_order_type == 2) {
					title = '客户关闭订单';
				}
				if (order.status != 1 && order.close_order_type == 0) {
					title = order.buy_type == 1 && order.status == 4 ? '待使用' : res.data.order.status_name;
				}

			} else {
				if (order.status == 6 && order.close_order_type == 4 && order.refund_res == 2) {
					title = '商家退款成功, 关闭订单';
				}
				if (order.status == 2 && order.refund_res == 2 && order.price_all > order.drawback_money) {
					title = res.data.order.status_name + '(部分商品退款)';
				}
				if (order.refund_res == 2 && order.price_all == order.drawback_money) {
					title = '退款成功';
				}
			}

			console.log('1111111title', title);
			uni.setNavigationBarTitle?.({
				title: title
			})

		} else {
			uni.navigateBack();
			uni.showToast({
				title: res.msg,
				icon: 'none',
				mask: true
			})
		}

	} catch (error) {
		console.log('error', error);
		uni.showToast({
			title: '加载数据失败',
			icon: 'none'
		})
	}
}
function copyText(e) {
	uni.setClipboardData({
		data: e.currentTarget.dataset.text,
		success: function (res) {
			uni.showToast({
				title: '已复制',
				icon: 'none',
			});
		}
	});
}
// 导航
function to_address(address) {

	var address = address.split(",")
	var latitude = address[0];
	var longitude = address[1];
	var name = shop.value.shop_name;

	// var address = shop.value.address_detail;
	console.log('address11----', address, name);
	console.log('位精度', latitude, longitude);
	uni.openLocation({
		longitude: parseFloat(longitude),
		latitude: parseFloat(latitude),
		name: name,
		address
	})

}
// 打电话
function makePhoneCall(phone) {
	console.log(phone);
	uni.makePhoneCall({
		phoneNumber: phone,
	})
}
function open_img(img) {
	// var img = e.currentTarget.dataset.qrcodetrial;
	console.log(img);
	img = img.split(',')
	uni.previewImage({
		current: img, // 当前显示图片的为数组的第一张
		urls: img // 需要预览的图片http链接列表
	})
}
function suan_countdown() {
	// 清除现有的定时器
	if (countdown_Interval.value) {
		clearInterval(countdown_Interval.value);
	}
	// 设置新的定时器
	countdown_Interval.value = setInterval(() => {
		// 获取当前时间
		const currentTime = Date.now();
		// console.log('currentTime',currentTime);
		// 遍历订单列表
		// this.data.order_list.forEach(that.data.order => {
		// 检查订单状态是否为 1，并且有剩余时间
		if (order.value.status === 1 && order.value.countdown !== undefined) {
			// 计算剩余时间
			const remainingTime = order.value.countdown - ((currentTime - show_page_time.value) / 1000);

			// 如果剩余时间小于 0，设置为 0 表示时间已过
			order.value.countdown_time2 = remainingTime < 0 ? '0' : '00' + ':' + util.formatSecond(remainingTime);

			if (order.value.countdown_time2 <= 0) {
				order.value.countdown = 0;
			}
			// that.data.order.countdown = remainingTime < 0 ? '0' : util.formatSecond(remainingTime);
		}
		// });

		// 更新订单列表数据
		// this.setData({
		// 	order: this.data.order
		// });

		// 如果所有倒计时都完成，清除定时器
		if (!order.value.status === 1) {
			clearInterval(countdown_Interval.value);
			countdown_Interval.value = null;
		}
	}, 1000); // 每秒更新一次
}
</script>

<style>
/* pages/index/order_detail.wxss */
/* pages/index/auding_order.wxss */
/* pages/index/auding.wxss */
/* @import '/pages/mine/appointent.wxss'; */

@import '../../static/styles/appointentOld.css';

.bottom_list {
	background: #ffffff;
	border-radius: 14rpx;
	/* margin-top: 30rpx; */
	box-sizing: border-box;
	/* padding: 0 28rpx; */
	display: flex;
	flex-direction: column;
}

.bottom_list .item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: 400;
	font-size: 28rpx;
	color: #383838;
	/* border-bottom: 1rpx solid #CACACA; */
	height: 80rpx;
	color: #333333;
	font-size: 25rpx;
	/* font-weight: bold; */
	flex: none
}

.bottom_list .item .right {
	font-weight: normal;
}

.form_buttom {
	color: #ffffff;
	font-size: 35rpx;
	width: 692rpx;
	height: 88rpx;
	background: linear-gradient(89deg, #ff3981 3%, #ff1e1a 97%);
	border-radius: 7rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.course_box {
	background: #ffffff;
	border-radius: 14rpx;
	box-sizing: border-box;
	padding: 28rpx;
	display: flex;
	margin: 0 28rpx;
	margin-top: 30rpx;
}




page {
	background-color: #F0F0F0;
	padding-top: 0;
}

.kong {
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	padding-top: 400rpx;
	box-sizing: border-box;
}

.kong image {
	width: 239rpx;
	height: 128rpx;
	margin-bottom: 42rpx;
}

.kong text {
	font-size: 28rpx;
	font-weight: 500;
	color: #838383;
}

.nav_area {
	width: 100%;
	height: 90rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 0 29rpx;
	background-color: #fff;
	position: fixed;
	margin-bottom: 20rpx;
}

.nav_area view {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 4rpx solid transparent;

}


.nav_area text {
	font-size: 28rpx;
	color: #4D4D4D;
	box-sizing: border-box;
}

.nav_area view.active {
	border-bottom: 4rpx solid #1378FF;
}

.picker {
	width: 100%;
	box-sizing: border-box;
	padding: 0 29rpx;
	height: 63rpx;
	background: #FFFFFF;
	display: flex;
	align-items: center;
}

.picker .shaixuan {
	display: flex;
	align-items: center;
	margin-right: 58rpx;
}

.picker .shaixuan image {
	width: 18rpx;
	height: 10rpx;
}

.picker .shaixuan text {
	font-size: 25rpx;
	font-weight: 400;
	color: #4D4D4D;
	margin-right: 8rpx;
}

.search {
	display: flex;
	justify-content: center;
	align-items: center;
}

.search image {
	width: 17rpx;
	height: 17rpx;
}

.search text {
	font-size: 25rpx;
	font-weight: 400;
	color: #4D4D4D;
	margin-right: 8rpx;
}

.order_list {
	display: flex;
	flex-direction: column;
	width: 100%;
	box-sizing: border-box;
	padding: 0 13rpx;
	padding-top: 30rpx;
}

.order_item {
	width: 100%;
	box-sizing: border-box;
	padding: 30rpx 22rpx;
	background-color: #fff;
	border-radius: 12rpx;
	/* margin-bottom: 22rpx; */
}

.order_item .date_state {
	font-size: 24rpx;
	width: 100%;
	justify-content: space-between;
	display: flex;
	align-items: center;
	margin-bottom: 35rpx;
}

.order_item .date_state text:nth-child(1) {
	color: #989898;
}

.order_item .date_state .state {
	color: #F46822;
}

.product_info {
	width: 100%;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	margin-bottom: 25rpx;
}

.product_info image {
	width: 160rpx;
	height: 160rpx;
	border-radius: 10rpx;
	flex: none;
	margin-right: 20rpx;
}

.detail_info {
	width: 72%;
	height: 160rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.name_price {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.name_price .name {
	font-size: 28rpx;
	color: #333333;
	font-weight: bold;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: block;
	width: 75%;
}

.name_price .price {
	font-size: 24rpx;
	color: #333333;
	font-weight: 500;
}

.guige_number {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.guige_number .guige_list {
	width: 70%;
	display: flex;
	align-items: center;
}

.guige_number .guige_list text {
	font-size: 22rpx;
	color: #111015;
	padding: 8rpx 16rpx;
	display: block;
	background-color: #E7EFFF;
	border-radius: 8rpx;
	margin-right: 20rpx;
}

.guige_number .guige_list text:last-child {
	margin-right: 0;
}

.guige_number .number {
	color: #F46822;
	font-size: 24rpx;
}

.detail_desc {
	font-size: 22rpx;
	color: #999999;
}

.detail_desc text {
	color: #F46822;
	margin: 0 5rpx;
}

.order_info {
	width: 100%;
	box-sizing: border-box;
	padding: 20rpx;
	background-color: #F6F7FB;
	border-radius: 10rpx;
}


.order_info_v {
	width: 100%;
	box-sizing: border-box;
	padding: 20rpx;
	background-color: #F6F7FB;
	border-radius: 10rpx;
}

.order_info view {
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	margin-bottom: 30rpx;
}

.order_info view:last-child {
	margin-bottom: 0;
}

.order_info view image {
	width: 20rpx;
	height: 30rpx;
	margin-right: 10rpx;
	margin-top: 0.2em;
	flex: none;
}

.order_info view text {
	font-size: 26rpx;
	color: #1D1D1D;
	line-height: 1.5;
}

.order_btn {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: 0 29rpx;
	box-sizing: border-box;
	height: 90.97rpx;
	background: #ffffff;
	display: flex;
	align-items: center;
	box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.16);
	z-index: 999;
}

.state_btn {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
}

.state_btn text {
	/* width: 150rpx; */
	height: 58rpx;
	border-radius: 13.89rpx;
	border: 1rpx solid rgba(92, 92, 92, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 28rpx;
	font-weight: 400;
	color: #5C5C5C;
	margin-right: 22rpx;
	padding: 0 10rpx;
}

.state_btn text:last-child {
	margin-right: 0;
}

.state_btn text.active {
	font-size: 28rpx;
	font-weight: 400;
	color: #FF4F26;
	border: 1rpx solid #FF4F26;
}

.price_all {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-size: 28rpx;
	color: #4D4D4D;
	padding-bottom: 20rpx;
}

.bottom_tips {
	font-size: 29.17rpx;
	font-weight: 400;
	text-align: justify;
	color: #7d7d7d;
	line-height: 1.5;
	letter-spacing: 0.82rpx;
	margin-top: 28rpx;
}

.container_box {
	padding-top: 0;
	padding: 0 22rpx;
}

.content_list {
	padding-bottom: 40rpx;
}


.state_tips {
	width: 100%;
	height: 62.5rpx;
	background: #f6f7fb;
	border-radius: 13.89rpx;
	font-size: 25rpx;
	font-weight: 400;
	color: #333333;
	display: flex;
	align-items: center;
	padding-left: 20rpx;
}

.state_btn text.topayorder {
	background: linear-gradient(89deg, #ff3981 3%, #ff1e1a 97%);
	border-radius: 13.89rpx;
	color: #ffffff;
	border: 1rpx solid transparent;
}

.content_list {
	padding-bottom: 0rpx;
}

.container_box_title {
	color: #333333;
	font-size: 28rpx;
	font-weight: bold;
	padding: 25rpx 0;
}

.shop_info_box {
	display: flex;
	padding-bottom: 28rpx;
}

.shop_info_img {
	width: 159.72rpx;
	height: 159.72rpx;
	background: rgba(0, 0, 0, 0.00);
	border-radius: 13.89rpx;
	flex: none;
	margin-right: 22rpx;
}

.shop_info_right {
	display: flex;
	flex-direction: column;

	font-size: 25rpx;
	font-weight: 400;
	color: #333333;
	width: 100%;
	line-height: 1.5;
	justify-content: space-between;
}

.shop_info_right_hang1 {
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: space-between;
}


.daohang_box {
	display: flex;
	align-items: center;
	flex: none;
}

.daohang {
	width: 50rpx;
	height: 50rpx;
	margin-left: 28rpx;
	flex: none;
}

.context_box {
	padding: 0 13rpx;
}
</style>
