<template>
	<view v-if="is_loading">

		<view>
			<view class="nav_area" style="z-index: 10;">
				<view :data-status="item.status" :data-nav_index="index" @click="change_nav"
					:class="`${nav_index == index ? 'active' : ''}`" v-for="(item, index) in nav_list" :key="index">
					<text>{{ item.name }}</text>
				</view>
			</view>

			<view class="kong" v-if="order_list.length <= 0">
				<image lazy-load src="https://saas.jizhongkeji.com/static/jzkj/images/kong.png" mode="widthFix" />
				<text>暂时没有订单</text>
			</view>
			<view class="picker" v-if="false">
				<picker mode="selector" class="shaixuan">
					<view>
						<text>筛选</text>
						<image lazy-load src="https://saas.jizhongkeji.com/static/jzkj/images/sanjiao.png"
							mode="widthFix" />
					</view>
				</picker>
				<view mode="selector" class="search">
					<view>
						<text>搜索</text>
						<image lazy-load src="https://saas.jizhongkeji.com/static/jzkj/images/search.png"
							mode="widthFix" />
					</view>
				</view>
			</view>
		</view>

		<view class="order_list">
			<template v-for="item, index in order_list" :key="index" v-if="order_list.length > 0">
				<navigator hover-class="none" :url="`/pages/index/order_detail?order_id=${item.id}`" :key="index"
					v-if="item?.status != 9">
					<view class="order_item">
						<view class="date_state">
							<!-- <text>{{item.order_time}}拍下</text> -->
							<!-- 自提 -->
							<text style="color: #333333;font-weight: 700;" v-if="item.buy_type == 1">{{
								item.shop_detail.shop_name }}</text>
							<text style="color: #333333;font-weight: 700;" v-else>{{ item.shop_detail.name }}总店</text>

							<view v-if="item.refund_res == 0">
								<text class="state" style="color: #FF0000;"
									v-if="item.status == 1 && item.countdown > 0">待付款</text>

								<text class="state" v-if="item.status == 1 && item.countdown <= 0">交易关闭</text>

								<text class="state"
									v-if="item.status != 1 && item.close_order_type == 1">付款超时,自动关闭订单</text>
								<text class="state" v-if="item.status != 1 && item.close_order_type == 2">客户关闭订单</text>
								<text class="state" v-if="item.status != 1 && item.close_order_type == 0">{{
									item.status_name }}</text>
							</view>
							<view v-if="item.refund_res != 0">
								<text class="state"
									v-if="item.status == 6 && item.close_order_type == 4 && item.refund_res == 2">商家退款成功,
									关闭订单</text>

								<text class="state"
									v-if="item.status == 2 && item.refund_res == 2 && item.price_all > item.drawback_money">{{
										item.status_name }}(部分商品退款)</text>
								<text class="state"
									v-if="item.refund_res == 2 && item.price_all == item.drawback_money">退款成功</text>
							</view>


						</view>
						<view class="product_info" v-if="item.json_info"
							v-for="(json_item, json_index) in item.json_info" :key="json_index">
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
						<view class="state_tips" v-if="item.status == 1">
							<span style="font-weight: 700;margin-right: 10rpx;">温馨提示</span>请尽快完成支付，商品火爆可能会卖光
						</view>

						<!-- 底部按钮 -->
						<view class="order_btn">

							<view class="state_btn" v-if="item.status == 1">
								<text @click.stop.prevent="close_business(item.id)"
									v-if="item.status == 1 && item.countdown > 0">取消订单</text>
								<text @click.stop.prevent="delte_business(item.id)"
									v-if="item.status == 1 && item.countdown <= 0">删除订单</text>
								<text v-if="item.status == 1 && item.countdown > 0" class="active topayorder"
									@click.stop.prevent="re_pay(item.id)">立即付款{{ item.countdown_time2 }}</text>
								<text v-if="item.status == 1 && item.countdown <= 0 && is_show_btn"
									class="active">再买一单</text>
							</view>
							<view class="state_btn" v-if="item.status == 6">
								<text @click.stop.prevent="delte_business(item.id)">删除订单</text>
								<text class="active" v-if="is_show_btn">再买一单</text>
							</view>

							<view class="state_btn" @click.stop.prevent="to_drawback(item.id)"
								v-if="item.status == 2 && (item.refund_res == '' || item.refund_res == 3 || item.refund_res == 6)">
								<!-- // 1:退款中;2:退款成功;3:退款失败;4:退款处理中;5:退款关闭;6:退款异常 -->
								<text v-if="item.refund_res == ''">申请退款</text>
								<text v-if="item.refund_res == 3">退款失败</text>
								<text v-if="item.refund_res == 6">退款异常</text>
							</view>

							<view class="state_btn"
								v-if="item.status == 2 && (item.refund_res == 1 || item.refund_res == 2 || item.refund_res == 4 || item.refund_res == 5)">
								<text v-if="item.drawback_list.length > 0"
									@click.stop.prevent="change(item.id)">折叠退款商品</text>
								<text @click.stop.prevent="to_drawback(item.id)"
									v-if="item.refund_res == 2 && item.price_all > item.drawback_money">申请退款</text>
								<text v-if="item.refund_res == 1">退款中</text>
								<text v-if="item.refund_res == 2 && item.price_all == item.drawback_money">退款成功</text>


								<text v-if="item.refund_res == 4">退款处理中</text>
								<text v-if="item.refund_res == 5">退款关闭</text>
							</view>


							<view class="state_btn" v-if="item.status == 4">
								<!-- catch:tap="to_drawback" data-drawbackid="{{item.id}}" -->
								<text v-if="is_show_btn">申请售后</text>
								<text v-if="item.buy_type != 1" @click.stop.prevent="look_delivery(item.id)">查看物流</text>
								<!-- <text class="active topayorder" catch:tap="comfire_order" data-comfireorderid="{{item.id}}">确认收货</text> -->
							</view>
							<view class="state_btn" v-if="item.status == 5">
								<text v-if="is_show_btn">再次购买</text>
								<text v-if="is_show_btn" class="active">去评价</text>
							</view>
							<view class="state_btn" v-if="item.status == 8">
								<text v-if="is_show_btn">再次购买</text>
								<text v-if="is_show_btn" class="active">去评价</text>
							</view>
						</view>

						<!-- 已退款商品 -->
						<view style="margin-top:30rpx" v-if="item.drawback_list.length > 0 && item.is_open"
							v-for="drawback in item.drawback_list" :key="drawback">
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
										<text class="number" v-if="json_item.drawback_count_ing > 0">退款x{{
											json_item.drawback_count_ing }}</text>
									</view>
									<view class="detail_desc"><text>{{ json_item.count }}</text>件
										实收:￥<text>{{ json_item.price_all }}(退款 {{ drawback.drawback_money }})</text>
									</view>
								</view>
							</view>


							<view class="order_info_v">
								<view v-if="drawback.userback?.reason"
									style="display: flex;align-items: center;font-size: 26rpx;color: #7F7F7F;">
									<view><text style="margin-right: 10rpx;flex: none;">·{{
										drawback.drawback_time_detail
									}}</text>申请退款，原因：{{ drawback.userback.reason }}
									</view>
								</view>

								<view v-if="drawback.shopback?.reason"
									style="display: flex;align-items: center;font-size: 26rpx;color: #7F7F7F;">
									<view><text style="margin-right: 10rpx;flex: none;">·{{
										drawback.drawback_time_detail
									}}</text>商家主动退款，原因：{{ drawback.shopback.reason }}
									</view>
								</view>

								<view v-if="drawback.shop_agree_drawback == 1"
									style="display: flex;align-items: center;font-size: 26rpx;color: #7F7F7F;">
									<view><text style="margin-right: 10rpx;flex: none;">·{{
										drawback.drawback_time_detail
									}}</text>
										商家同意退款</view>
								</view>

								<view v-if="drawback.shop_agree_drawback == 2"
									style="display: flex;align-items: center;font-size: 26rpx;color: #7F7F7F;">
									<view><text style="margin-right: 10rpx;flex: none;">·{{
										drawback.drawback_time_detail
									}}</text>
										商家拒绝退款</view>
								</view>
							</view>
						</view>
					</view>

				</navigator>
			</template>
		</view>

	</view>
</template>

<script setup>
import { ref } from 'vue';
import { request } from '@/utils/request.js';
import { onShow, onLoad, onHide, onUnload, onReachBottom } from '@dcloudio/uni-app';
import { formatTime, formatSecond } from '@/utils';

const nav_list = ref([
	{ id: 1, name: "全部", status: 0, },
	{ id: 2, name: "待付款", status: 1, },
	{ id: 3, name: "待发货", status: 2, },
	{ id: 4, name: "待收货", status: 4, },
	// {id: 6,name: "评价",status: 8,refund_res: 0,},
	// {id: 5,name: "售后",refund_res: 9,status: 6,},
	{ id: 5, name: "已完成", refund_res: 0, status: 8, },
]);
const nav_index = ref(0);
const status = ref(0);
const show_page_time = ref(null);
const countdown_Interval = ref(null);
const countdown = ref(null);
const order_id = ref(0);
const inter = ref(null);
const order_count = ref(0);
const order_list = ref([]);
const is_loading = ref(false);
const is_show_btn = ref(false); //隐藏掉没有做的按钮

const waybillToken = ref('');

const is_saving = ref();
const is_checking = ref();


onShow(() => {
	// user_order_list(status.value)
	var date_fn = new Date();
	var date = formatTime(new Date());
	var time = date_fn.getSeconds();

	show_page_time.value = Date.now()

	uni.showLoading({
		title: 'loading',
	})
	user_order_list(status.value)
})
onLoad(options => {
	if (options.status) {
		status.value = options.status
	}

	if (options.nav_index) {
		nav_index.value = options.nav_index
	}
	var BarTitle = options.name ? options.name : '全部订单';
	uni.setNavigationBarTitle({
		title: BarTitle,
	})
})
onHide(() => {
	if (countdown_Interval.value) {
		clearInterval(countdown_Interval.value)
		countdown_Interval.value = 0
	}
})
onUnload(() => {
	if (countdown_Interval.value) {
		clearInterval(countdown_Interval.value)
		countdown_Interval.value = 0
	}
})
// 上拉触底
onReachBottom(() => {
	// console.log('加载更多');
	if (order_count.value > order_list.value.length) {
		user_order_list(status.value, order_list.value.length)
	}
})



// 折叠退款商品
function change(changeid) {
	var id = changeid
	// console.log('changechangechange', id);

	order_list.value.find(item => {
		return item.id == id
	}).is_open = !order_list.value.find(item => {
		return item.id == id
	}).is_open;
}

//确认收货
function comfire_order(comfireorderid) {
	var id = comfireorderid
	// console.log('11111111111111111111111', id);

	uni.showModal({
		title: '系统提示',
		content: '确认收货吗？',
		// content: '确认要发货吗？', //提示内容
		success: async function (res) {
			if (res.confirm) {
				let ReqRes = await request('/WxAppCustomer/comfire_order_recive', 'post', { order_id: id })
				if (ReqRes.code == 0) {
					uni.showToast({
						title: "成功",
						icon: 'none',
						mask: true
					})

					user_order_list(status.value)
				} else {
					uni.showToast({
						title: ReqRes.msg,
						icon: 'error',
					})
				}

			} else {
				console.log('取消')
			}
		}
	})
}
//删除订单
function delte_business(delteid) {
	var id = delteid
	console.log('11111111111111111111111', id);

	uni.showModal({
		title: '系统提示',
		content: '确认删除订单吗？',
		// content: '确认要发货吗？', //提示内容
		success: async function (res) {
			if (res.confirm) {
				let ReqRes = await request('/WxAppCustomer/delte_business', 'post', { id: id })
				if (ReqRes.code == 0) {
					uni.showToast({
						title: "成功",
						icon: 'none',
						mask: true
					})
					user_order_list(status.value)
				} else {
					uni.showToast({
						title: ReqRes.msg,
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
function close_business(closeid) {
	var id = closeid
	// console.log('11111111111111111111111', order_id);

	uni.showModal({
		title: '系统提示',
		content: '确认取消订单吗？',
		// content: '确认要发货吗？', //提示内容
		success: async function (res) {
			if (res.confirm) {
				let ReqRes = await request('/WxAppCustomer/close_business', 'post', { id: id })
				if (ReqRes.code == 0) {
					uni.showToast({
						title: "成功",
						icon: 'none',
						mask: true
					})
					user_order_list(status.value)
				} else {
					uni.showToast({
						title: ReqRes.msg,
						icon: 'error',
					})
				}
			} else {
				console.log('取消')
			}
		}
	})
}
function wx_pay(wxAppJsSign) {
	console.log('wx_pay', wxAppJsSign);

	uni.requestPayment({
		timeStamp: '' + wxAppJsSign.timeStamp,
		nonceStr: wxAppJsSign.nonceStr,
		package: wxAppJsSign.package,
		signType: wxAppJsSign.signType,
		paySign: wxAppJsSign.paySign,
		fail: (res) => {
			// TODO 记录微信支付取消
			is_saving.value = 0
		},
		success: (res) => {
			var pay_status = 0;
			is_checking.value = 1

			inter.value = setInterval(async (res) => {
				let reqRes = await request("/WxAppCustomer/check_user_order", 'post', { id: order_id.value })
				pay_status = reqRes.data.info ? reqRes.data.info.pay_status : 0;
				// console.log('11111111112222222', pay_status);
				if (pay_status == 1) {
					clearInterval(inter.value);
					is_checking.value = 0
					setTimeout(() => {
						user_order_list(status.value)
						is_saving.value = 0
					}, 1000)
				}
			}, 1000);
			return;
		}
	})
}
async function re_pay(id) {
	if (is_saving.value == 1) {
		console.log('加购物车 防止连点啦');
		return
	}
	is_saving.value = 1

	let reqRes = await request('/WxAppCustomer/re_pay_order', 'post', { id: id || 0 })
	if (reqRes.code == 1) {
		is_saving.value = 0

		uni.showToast({
			title: reqRes.msg,
			icon: 'none',
			mask: true
		})
	} else {
		if (reqRes.data.wxAppJsSign) {
			order_id.value = reqRes.data.order_id
			wx_pay(reqRes.data.wxAppJsSign)
		}
	}
}
function change_nav(e) {
	nav_index.value = e.currentTarget.dataset.nav_index
	status.value = e.currentTarget.dataset.status
	order_list.value = []
	// console.log('3333333', this.data.order_list);
	user_order_list(status.value)
	// console.log('555', this.data.order_list);
}

async function user_order_list(status, length) {

	let reqRes = await request('/WxAppCustomer/user_order_list_later', 'post', { status: status, offset: length || 0 })
	if (length) {
		order_list.value.push.apply(order_list.value, reqRes.data.order_list)
	} else {
		order_list.value = reqRes.data.order_list
	}
	suan_countdown()
	order_count.value = reqRes.data.order_count
	uni.hideLoading({
		success: (res) => {
			is_loading.value = true
		}
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
		order_list.value.forEach(element => {
			// 检查订单状态是否为 1，并且有剩余时间
			if (element.status === 1 && element.countdown !== undefined) {
				// 计算剩余时间
				const remainingTime = element.countdown - ((currentTime - show_page_time.value) / 1000);

				// 如果剩余时间小于 0，设置为 0 表示时间已过
				element.countdown_time2 = remainingTime < 0 ? '0' : '00' + ':' + formatSecond(remainingTime);

				if (element.countdown_time2 <= 0) {
					element.countdown = 0;
				}
				// element.countdown = remainingTime < 0 ? '0' : util.formatSecond(remainingTime);
			}
		});

		// 更新订单列表数据 [已在循环中更新]

		// 如果所有倒计时都完成，清除定时器
		if (!order_list.value.some(order => order.status === 1)) {
			clearInterval(countdown_Interval.value);
			countdown_Interval.value = null;
		}
	}, 1000); // 每秒更新一次
}

// 点击取消订单
function cencel_order(cancelid) {
	var id = cancelid
	console.log('444', id);
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
// 查看物流
async function look_delivery(deliverykid) {
	// var deliverykid = e.currentTarget.dataset.deliverykid
	console.log('deliverykiddeliverykid', deliverykid);

	try {
		let reqRes = await request('/WxAppCustomer/look_delivery', 'post', { order_id: deliverykid })
		// 更新数据
		if (reqRes.code == 0) {
			if (reqRes.data.res.errcode == 0) {
				console.log('1111111', reqRes.data.res, reqRes.data.res.waybill_token);
				waybillToken.value = reqRes.data.res.waybill_token; //通过后台接口获取到的值

				plugin.openWaybillTracking({
					waybillToken: waybillToken.value
				});
			}

		} else {
			uni.showToast({
				title: reqRes.msg,
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
</script>

<style>
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
	border-bottom: 4rpx solid #FF0000;
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
	padding: 0 29rpx;
	padding-top: 115rpx;
}

.order_item {
	width: 100%;
	box-sizing: border-box;
	padding: 30rpx 22rpx;
	background-color: #fff;
	border-radius: 12rpx;
	margin-bottom: 22rpx;
}

.order_item .date_state {
	font-size: 25rpx;
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
	padding-top: 30rpx;
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
	color: #FF0000;
	border: 1rpx solid #FF0000;
}

.price_all {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-size: 28rpx;
	color: #4D4D4D;
	padding-bottom: 20rpx;
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
</style>
