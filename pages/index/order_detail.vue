<template>
	<view class="order_detail_container" v-if="is_loading">

		<!-- <NavBar showBack title="" /> -->
		<!-- <HeightBar appendNavBar /> -->

		<!-- 商品信息 -->
		<view class="order_list">
			<view class="order_item">

				<view class="date_state">
					<text style="color: #333333;font-weight: 700;font-size: 28rpx;" v-if="order.buy_type == 1">{{
						shop.shop_name }}</text>
					<text style="color: #333333;font-weight: 700;font-size: 28rpx;" v-else>{{ business.name }}总店</text>

					<view v-if="order.refund_res == 0">
						<text class="state" style="color: #FF0000;"
							v-if="order.status == 1 && order.countdown > 0">待付款</text>
						<text class="state" v-if="order.status == 1 && order.countdown <= 0">交易关闭</text>

						<text class="state" v-if="order.status != 1 && order.close_order_type == 1">付款超时,自动关闭订单</text>
						<text class="state" v-if="order.status != 1 && order.close_order_type == 2">客户关闭订单</text>
						<text class="state" v-if="order.status != 1 && order.close_order_type == 0">{{ order.buy_type
							== 1
							&& order.status == 4 ? '待使用' : order.status_name }}</text>
					</view>
					<view v-if="order.refund_res != 0">
						<text class="state"
							v-if="order.status == 6 && order.close_order_type == 4 && order.refund_res == 2">商家退款成功,
							关闭订单</text>

						<text class="state"
							v-if="order.status == 2 && order.refund_res == 2 && order.price_all > order.drawback_money">{{
								order.status_name }}(部分商品退款)</text>
						<text class="state"
							v-if="order.refund_res == 2 && order.price_all == order.drawback_money">退款成功</text>
					</view>
				</view>


				<view class="product_info" v-if="order.json_info" v-for="(json_item, json_index) in order.json_info"
					:key="json_index">
					<!-- good_imgs -->
					<image lazy-load :src="json_item.img_uri" mode="aspectFill" />
					<view class="detail_info">
						<view class="name_price">
							<text class="name">{{ json_item.name }}</text>
							<text class="price">￥<text>{{ json_item.unit_price }}</text></text>
						</view>
						<view class="guige_number">
							<view class="guige_list">
								<text v-if="json_item.spec_totall">{{ json_item.spec_totall }}</text>
							</view>
							<text class="number">x{{ json_item.count }}</text>
						</view>
						<view class="detail_desc"><text>{{ json_item.count }}</text>件
							实收:￥<text>{{ json_item.price_all }}</text></view>
					</view>
				</view>
				<view class="state_tips" v-if="order.status == 1">
					<span style="font-weight: 700;margin-right: 10rpx;">温馨提示</span>请尽快完成支付，商品火爆可能会卖光
				</view>

				<!-- 已退款商品 -->
				<view style="margin-top:30rpx" v-if="order.drawback_list.length > 0 && order.is_open"
					v-for=" drawback in order.drawback_list" :key="id">
					<view class="product_info" v-if="drawback.json_info"
						v-for="(json_item, json_index) in drawback.json_info" :key="json_index">
						<image lazy-load :src="json_item.img_uri" mode="aspectFill" />
						<view class="detail_info">
							<view class="name_price">
								<text class="name">{{ json_item.name }}</text>
								<text class="price">￥<text>{{ json_item.unit_price }}</text></text>
							</view>
							<view class="guige_number">
								<view class="guige_list">
									<text v-if="json_item.spec_totall">{{ json_item.spec_totall }}</text>
								</view>
								<text class="number" v-if="json_item.drawback_count > 0">x{{
									json_item.drawback_count }}</text>
								<text class="number" v-if="json_item.drawback_count_ing > 0">退款中x{{
									json_item.drawback_count_ing }}</text>
							</view>
							<view class="detail_desc"><text>{{ json_item.count }}</text>件
								实收:￥<text>{{ json_item.price_all }}(已退款{{ json_item.unit_price *
									json_item.drawback_count }})</text>
							</view>
						</view>
					</view>


					<view class="order_info_v">
						<view v-if="drawback.userback.reason"
							style="display: flex;align-items: center;font-size: 26rpx;color: #7F7F7F;">
							<view><text style="margin-right: 10rpx;flex: none;">·{{ drawback.drawback_time_detail
									}}</text>申请退款，原因：{{ drawback.userback.reason }}
							</view>
						</view>

						<view v-if="drawback.shopback.reason"
							style="display: flex;align-items: center;font-size: 26rpx;color: #7F7F7F;">
							<view><text style="margin-right: 10rpx;flex: none;">·{{ drawback.drawback_time_detail
									}}</text>商家主动退款，原因：{{ drawback.shopback.reason }}
							</view>
						</view>

						<view v-if="drawback.shop_agree_drawback == 1"
							style="display: flex;align-items: center;font-size: 26rpx;color: #7F7F7F;">
							<view><text style="margin-right: 10rpx;flex: none;">·{{ drawback.drawback_time_detail
									}}</text>
								商家同意退款</view>
						</view>

						<view v-if="drawback.shop_agree_drawback == 2"
							style="display: flex;align-items: center;font-size: 26rpx;color: #7F7F7F;">
							<view><text style="margin-right: 10rpx;flex: none;">·{{ drawback.drawback_time_detail
									}}</text>
								商家拒绝退款</view>
						</view>
					</view>
				</view>

			</view>
		</view>

		<!-- 核销码 -->
		<view class="content_list" v-if="order.buy_type == 1 && order.status == 4">
			<view class="context_box">
				<view class="container_box">
					<view class="container_box_title">核销码</view>

					<view class="shop_info_box">
						<image @click="open_img(order.qrcode_uri)" :data-qrcodetrial="order.qrcode_uri"
							class="shop_info_img" mode="aspectFill" :src="order.qrcode_uri"></image>

						<view class="shop_info_right">
							<view class="shop_info_right_hang1">
								<view class="shop_info_right">
									<view style="font-size: 28rpx;font-weight: 700;">{{ order.qrcode_number }}</view>
								</view>

								<view @click="copyText(order.qrcode_number)" class="daohang_box">复制
								</view>
							</view>

							<view style="width: 80%;text-align: justify;font-size: 23rpx;color: #989898;">
								风险提示：二维码及券码是您在门店消费的有效凭证，仅限门店工作人员核销。切勿泄露给他人，谨防上当受骗造成损失！</view>
						</view>
					</view>

				</view>
			</view>
		</view>

		<!-- 门店信息 -->
		<view class="content_list">
			<view class="context_box" v-if="order.buy_type == 1">
				<view class="container_box">
					<view class="container_box_title">门店信息</view>
					<view class="shop_info_box">
						<image class="shop_info_img" mode="aspectFill" :src="shop.image_uri"></image>

						<view class="shop_info_right">
							<view class="shop_info_right_hang1">
								<view class="shop_info_right">
									<view style="font-size: 28rpx;font-weight: 700;">{{ shop.shop_name }}</view>
									<view style="margin-top: 10rpx;">{{ shop.start_time }}-{{ shop.end_time }}</view>
								</view>

								<view class="daohang_box">
									<image @click="to_address(shop)" class="daohang"
										src="https://saas.jizhongkeji.com/static/jzkj/images/daohang.png"></image>
									<image @click="makePhoneCall(shop.phone)" class="daohang"
										src="https://saas.jizhongkeji.com/static/jzkj/images/phone_img.png"></image>
								</view>
							</view>

							<view>{{ shop.city }}{{ shop.address_name }}{{ shop.address_detail }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 订单信息 -->
		<view class="content_list">
			<view class="context_box">
				<view class="container_box">
					<view class="bottom_list">
						<view class="item">
							<view>商品总价</view>
							<view class="right">￥{{ order?.price_all }}</view>
						</view>
						<view class="item">
							<view>订单编号</view>
							<view class="right">{{ order?.order_id }}</view>
						</view>
						<view class="item" v-if="order?.status != 1 && order?.pay_success_time">
							<view>付款时间</view>
							<view class="right">{{ order?.pay_success_time }}</view>
						</view>
						<view class="item" style="border-bottom: 0;">
							<view>下单时间</view>
							<view class="right">{{ order?.order_time }}</view>
						</view>

						<!-- 核销信息 -->
						<view v-if="order?.status == 8 && order?.buy_type == 1">
							<view class="item" style="border-bottom: 0;">
								<view>提货时间</view>
								<view class="right">{{ order?.pick_time }}</view>
							</view>
							<view v-if="order?.pick_name" class="item" style="border-bottom: 0;">
								<view>核销人员</view>
								<view class="right">{{ order?.pick_name }}</view>
							</view>
							<view v-else class="item" style="border-bottom: 0;">
								<view>核销人员</view>
								<view class="right"> {{ pick_name.user_name ? pick_name.user_name : (pick_name.nickname
									?
									pick_name.nickname : '匿名用户') }}</view>
							</view>
						</view>


						<!-- 发货信息 -->
						<view v-if="order?.buy_type != 1 && order?.status > 2">
							<view class="item" style="border-bottom: 0;">
								<view>发货时间</view>
								<view class="right">{{ order?.delivery_time }}</view>
							</view>
							<view class="item" style="border-bottom: 0;">
								<view>物流公司</view>
								<view class="right">{{ company?.name }}</view>
							</view>
							<view class="item" style="border-bottom: 0;">
								<view>物流单号</view>
								<view class="right">{{ order?.delivery_notes }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view style="height: 150rpx;width: 100%;"></view>
		<!-- 底部按钮 -->
		<view class="order_btn" v-if="!(order.status == 4 && order.buy_type == 1)">

			<view class="state_btn" v-if="order.status == 1">
				<text @click="close_business(order.id)" v-if="order.status == 1 && order.countdown > 0">取消订单</text>
				<!-- <text>分享商品</text> -->
				<text @click="delte_business(order.id)" v-if="order.status == 1 && order.countdown <= 0">删除订单</text>
				<text v-if="order.status == 1 && order.countdown > 0" class="active topayorder"
					@click="re_pay(order.id)">立即付款{{ order.countdown_time2 }}</text>
				<text v-if="order.status == 1 && order.countdown <= 0 && is_show_btn" class="active">再买一单</text>
			</view>
			<view class="state_btn" v-if="order.status == 6">
				<text @click="delte_business(order.id)">删除订单</text>
				<text v-if="is_show_btn" class="active">再买一单</text>
			</view>

			<view class="state_btn" @click="to_drawback(order.id)"
				v-if="order.status == 2 && (order.refund_res == '' || order.refund_res == 3 || order.refund_res == 6)">
				<!-- // 1:退款中;2:退款成功;3:退款失败;4:退款处理中;5:退款关闭;6:退款异常 -->
				<text v-if="order.refund_res == ''">申请退款</text>
				<text v-if="order.refund_res == 3">退款失败</text>
				<text v-if="order.refund_res == 6">退款异常</text>
			</view>

			<view class="state_btn"
				v-if="order.status == 2 && (order.refund_res == 1 || order.refund_res == 2 || order.refund_res == 4 || order.refund_res == 5)">
				<!-- <text v-if="order.drawback_list.length > 0" @click.stop.prevent="change(order.id)">折叠退款商品</text> -->
				<text @click.stop.prevent="to_drawback(order.id)"
					v-if="order.refund_res == 2 && order.price_all > order.drawback_money">申请退款</text>
				<text v-if="order.refund_res == 1">退款中</text>
				<text v-if="order.refund_res == 2 && order.price_all == order.drawback_money">退款成功</text>

				<text v-if="order.refund_res == 4">退款处理中</text>
				<text v-if="order.refund_res == 5">退款关闭</text>
			</view>


			<view class="state_btn" v-if="order.status == 4">
				<!-- bindtap="to_drawback" data-drawbackid="{{order.id}}" -->
				<text v-if="is_show_btn">申请售后</text>
				<text>查看物流</text>
				<!-- <text class="active topayorder" bind:tap="comfire_order" data-comfireorderid="{{order.id}}">确认收货</text> -->
			</view>
			<view class="state_btn" v-if="order.status == 5">
				<text v-if="is_show_btn">再次购买</text>
				<text v-if="is_show_btn" class="active">去评价</text>
			</view>
			<view class="state_btn" v-if="order.status == 8">
				<text v-if="is_show_btn">再次购买</text>
				<text v-if="is_show_btn" class="active">去评价</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { request } from '@/utils/request.js';
import { formatSecond } from '@/utils';
import { useTempStore } from '@/stores/temp.js';
import { storeToRefs } from 'pinia';
import { onLoad, onShow } from '@dcloudio/uni-app';

const { user, business } = storeToRefs(useTempStore())

const order_id = ref(0);
const show_page_time = ref(null);
const countdown_Interval = ref(null);
const countdown = ref(null);
const is_show_btn = ref(false); //隐藏掉没有做的按钮

const pick_name = ref(null);
const company = ref(null);

const status = ref();
const shop = ref(null);
const order = ref(null);
const is_loading = ref(false);


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



// 折叠退款商品
function change(changeid) {
	var id = changeid
	console.log('changechangechange', id);
	return

	order_list.value.find(item => {
		return item.id == id
	}).is_open = !order_list.value.find(item => {
		return item.id == id
	}).is_open;
}
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
			// console.log(order.value);
			if (!order.value) {
				return;
			}
			if (order.value.refund_res == 0) {
				if (order.value.status == 1 && order.value.countdown > 0) {
					title = '待付款';
				}
				if (order.value.status == 1 && order.value.countdown <= 0) {
					title = '交易关闭';
				}
				if (order.value.status != 1 && order.value.close_order_type == 1) {
					title = '付款超时,自动关闭订单';
				}
				if (order.value.status != 1 && order.value.close_order_type == 2) {
					title = '客户关闭订单';
				}
				if (order.value.status != 1 && order.value.close_order_type == 0) {
					title = order.value.buy_type == 1 && order.value.status == 4 ? '待使用' : res.data.order.status_name;
				}

			} else {
				if (order.value.status == 6 && order.value.close_order_type == 4 && order.value.refund_res == 2) {
					title = '商家退款成功, 关闭订单';
				}
				if (order.value.status == 2 && order.value.refund_res == 2 && order.value.price_all > order.value.drawback_money) {
					title = res.data.order.status_name + '(部分商品退款)';
				}
				if (order.value.refund_res == 2 && order.value.price_all == order.value.drawback_money) {
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
function copyText(text) {
	uni.setClipboardData({
		// data: e.currentTarget.dataset.text,
		data: text,
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
	// console.log('address', address);
	var address = address.address.split(",")
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
			order.value.countdown_time2 = remainingTime < 0 ? '0' : '00' + ':' + formatSecond(remainingTime);

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

<style scoped>	
.order_detail_container {
	height: 100vh;
}
</style>
