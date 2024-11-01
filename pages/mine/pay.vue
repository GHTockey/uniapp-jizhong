<template>
	<view class="pay_container" style="background-image: url('https://saas.jizhongkeji.com/static/jzkj/static/images/goods-pay-bg.svg');">


		<HeightBar />

		<!-- 标题栏 -->
		<NavBar title="待付款订单" showBack isWhite>
			<template #title>
				<view style="color: #fff;">待付款订单</view>
			</template>
		</NavBar>

		<!-- 渐变背景 [之所以用img是微信小程序里不支持相对图片路径] -->
		<!-- <image src="/static/images/goods-pay-bg.svg" class="bg_gradient" /> -->


		<form v-if="is_loading" @submit="to_sub" class="pay_form">

			<!-- taps -->
			<view class="buy_type_box" style="top:200rpx">
				<!-- 选择配送方式 -->
				<view class="select_buy_box">
					<view :class="item.id == buy_type ? 'buy_type_active' : 'buy_type_normol'"
						v-for="(item, index) in buy_type_list" :key="index" @click="change_buy_type(item.id)"
						:data-buyid="item.id">
						{{ item.name }}
					</view>
				</view>

				<!-- 自提 -->
				<view class="ziti_box" v-if="buy_type == 1">
					<view class="address_item flex_row_space_bt buy_address_top" @click="to_get_shop_list">
						<template v-if="targte_shop && targte_shop.shop_name">
							<view class="address_text targte_shop_box">
								<view>{{ targte_shop.shop_name }}</view>
								<view style="color: #666666;margin-top:20rpx">{{ targte_shop.address_detail }}</view>
							</view>
							<image lazy-load class="arrow_icon" mode="aspectFit"
								src="https://saas.jizhongkeji.com/static/jzkj/images/arrow_right.png"></image>
						</template>
						<template v-else>
							<view class="address_text">
								请选择要去提货的门店
							</view>
							<image lazy-load class="arrow_icon" mode="aspectFit"
								src="https://saas.jizhongkeji.com/static/jzkj/images/arrow_right.png"></image>
						</template>
					</view>

					<view class="address_item flex_row_space_bt buy_address_top"
						style="padding-top:0;padding-bottom: 0;height: 106rpx;">
						<view class="address_text" style="width: unset;">
							提货人员
						</view>
						<input style="font-size: 28rpx;" class="input_address" v-model="user.user_name"
							placeholder-class="placeholder-style" type="text" name="user_name" placeholder="输入提货人员姓名" />
					</view>

					<view class="address_item flex_row_space_bt buy_address_top"
						style="padding-top:0;padding-bottom: 0;height: 106rpx;border-bottom: 0;">
						<view class="address_text" style="width: unset;">
							手机号码
						</view>
						<input style="font-size: 28rpx;" class="input_address" v-model="user.phone"
							placeholder-class="placeholder-style" type="text" name="phone" placeholder="输入您的手机号码" />
					</view>
				</view>


				<!-- 物流配送选择地址 -->
				<view class="address_item flex_row_space_bt buy_address_top buy_address_top_v" v-if="buy_type == 0"
					style="box-sizing: border-box;" @click="showAddressSheet = true">
					<template v-if="address && address.mobile">
						<image lazy-load class="address_icon" mode="widthFix"
							src="https://saas.jizhongkeji.com/static/jzkj/images/address_icon.png"></image>
						<view class="address_text">
							<text>{{ address.user_name }}</text>,
							<text>{{ address.mobile }}</text>,
							<text>{{ address.address }}</text>,
							<text>{{ address.address_detail }}</text>
							<text v-if="address.is_default" class="lable">默认地址</text>
						</view>
						<image lazy-load class="arrow_icon" mode="aspectFit"
							src="https://saas.jizhongkeji.com/static/jzkj/images/arrow_right.png"></image>
					</template>
					<template v-else>
						<image lazy-load class="address_icon" mode="widthFix"
							src="https://saas.jizhongkeji.com/static/jzkj/images/address_icon.png"></image>
						<view class="address_text">
							请设置收货地址
						</view>
						<image lazy-load class="arrow_icon" mode="aspectFit"
							src="https://saas.jizhongkeji.com/static/jzkj/images/arrow_right.png"></image>
					</template>
				</view>
			</view>

			<!-- 商品信息 -->
			<view class="goods_item">
				<image class="good_img !w-[160rpx] !h-[160rpx]" mode="aspectFill"
					:src="goods_info.good_imgs || 'https://saas.jizhongkeji.com/static/jzkj/images/empty_img.png'">
				</image>
				<view class="good_info_box">
					<view class="good_name">{{ goods_info.name }}</view>
					<view class="good_spec_box">
						<view class="good_spec_item" v-if="goods_info.spec_totall && goods_info.spec_totall.length > 0">
							<!-- <text class="good_spec_text">颜色：红色</text>
							/
							<text class="good_spec_text">尺寸：100CM</text> -->
							<text class="good_spec_text">{{ goods_info.spec_totall }}</text>
						</view>
					</view>
					<!-- 数量及价格 -->
					<view class="good_num_price_box">
						<view class="good_price"><span style="font-size: 20rpx;">￥</span>{{ goods_info.unit_price }}
						</view>
						<text class="good_num">×{{ goods_info.count || 1 }}</text>
					</view>
				</view>
			</view>

			<!-- 买家留言 -->
			<view class="buyer_msg_box" @click="showActionSheet = true">
				<text class="buyer_msg_title">买家留言</text>
				<view style="display: flex;align-items: center;">
					<view class="text_ellipsis" style="font-size: 27.78rpx;font-weight: 500;color: #a0a0a0;">{{ buyerMsg
						||
						'无留言' }}</view>
					<image style="width: 13.89rpx; height: 20.83rpx; margin-left: 19.44rpx;" mode="aspectFit"
						src="https://saas.jizhongkeji.com/static/jzkj/static/icon/right1.svg">
					</image>
				</view>
			</view>

			<!-- 其它项 -->
			<view class="other_item_box">
				<view class="other_item">
					<text class="buyer_msg_title">优惠券</text>
					<view>
						<text style="font-size: 27.78rpx;font-weight: 500;">暂无优惠券</text>
					</view>
				</view>
				<view class="other_item">
					<text class="buyer_msg_title">使用150积分可以地沟</text>
					<view>
						<text
							style="font-size: 27.78rpx;font-family: PingFang SC, PingFang SC-Medium;font-weight: 500;color: #a0a0a0;">100</text>
						<image style="width: 13.89rpx; height: 20.83rpx; margin-left: 19.44rpx;" mode="aspectFit"
							src="https://saas.jizhongkeji.com/static/jzkj/static/icon/right1.svg">
						</image>
					</view>
				</view>
				<view class="other_item">
					<text class="buyer_msg_title">发票</text>
					<view>
						<text
							style="font-size: 27.78rpx;font-family: PingFang SC, PingFang SC-Medium;font-weight: 500;color: #a0a0a0;">无需发票</text>
						<image style="width: 13.89rpx; height: 20.83rpx; margin-left: 19.44rpx;" mode="aspectFit"
							src="https://saas.jizhongkeji.com/static/jzkj/static/icon/right1.svg">
						</image>
					</view>
				</view>
			</view>

			<!-- 底部提交 -->
			<view class="bottom_submit_box">
				<view class="bottom_submit_price_box">
					<view style="color: #A7A7A7; margin-right: 20rpx;">共3件</view>
					<view>
						<text>合计：</text>
						<text style="color: #eb2c2a;">￥100</text>
					</view>
				</view>
				<view @click="to_pay" class="bottom_submit_btn">去付款</view>
			</view>
		</form>



		<!-- 留言弹窗 -->
		<ActionSheetSlot v-model:show="showActionSheet" :title="'买家留言'">
			<template #body>
				<view style="height: 422.22rpx; border-radius: 13.89rpx; padding: 32rpx; background-color: #ececec;">
					<!-- 输入框 -->
					<textarea class="buyer_msg_input" placeholder="请与商家客服沟通一致后再留言，留言内容勿超过100个汉字" v-model="buyerMsg" />
				</view>
			</template>
		</ActionSheetSlot>

	</view>
	<!-- 支付弹窗 -->
	<uni-popup ref="payPopup" background-color="#fff" @change="" border-radius="27.78rpx" :mask-click="false">
		<view class="pay_popup_box">
			<!-- 标题 -->
			<view class="pay_popup_title">
				选择支付方式
			</view>
			<!-- 待付款金额 -->
			<view class="pay_popup_price">
				<view>待付款金额：￥666.66元</view>
			</view>
			<!-- 支付方式列表 -->
			<view class="pay_popup_pay_list">
				<!-- 微信支付 -->
				<view class="pay_popup_pay_item" @click="change_pay_type(1)">
					<view style="display: flex;align-items: center;">
						<image mode="widthFix" style="width: 83.33rpx;height: 83.33rpx; margin-right: 25rpx;"
							src="https://saas.jizhongkeji.com/static/jzkj/static/images/wx.svg">
						</image>
						<view>
							<view style="font-size: 30.56rpx;font-weight: bold;color: #000000;">微信支付</view>
							<!-- <text style="font-size: 29.17rpx; color: #a1a1a1;">可用余额￥555.50</text> -->
						</view>
					</view>
					<image mode="widthFix" style="width: 41.67rpx;"
						:src="`https://saas.jizhongkeji.com/static/jzkj/static/icon/select_fill-${selectPayType == 1 ? 'a' : 'n'}.svg`" />
				</view>
				<!-- 佣金支付 -->
				<view class="pay_popup_pay_item" @click="change_pay_type(2)">
					<view style="display: flex;align-items: center;">
						<image mode="widthFix" style="width: 83.33rpx;height: 83.33rpx; margin-right: 25rpx;"
							src="https://saas.jizhongkeji.com/static/jzkj/static/images/yj.svg">
						</image>
						<view>
							<view style="font-size: 30.56rpx;font-weight: bold;color: #000000;">佣金支付</view>
							<text style="font-size: 29.17rpx; color: #a1a1a1;">可用余额￥555.50</text>
						</view>
					</view>
					<image mode="widthFix" style="width: 41.67rpx;"
						:src="`https://saas.jizhongkeji.com/static/jzkj/static/icon/select_fill-${selectPayType == 2 ? 'a' : 'n'}.svg`" />
				</view>
				<!-- 储值支付 -->
				<view class="pay_popup_pay_item" @click="change_pay_type(3)">
					<view style="display: flex;align-items: center;">
						<image mode="widthFix" style="width: 83.33rpx;height: 83.33rpx; margin-right: 25rpx;"
							src="https://saas.jizhongkeji.com/static/jzkj/static/images/cz.svg">
						</image>
						<view>
							<view style="font-size: 30.56rpx;font-weight: bold;color: #000000;">储值支付</view>
							<text style="font-size: 29.17rpx; color: #a1a1a1;">可用余额￥{{ save_money }}</text>
						</view>
					</view>
					<image mode="widthFix" style="width: 41.67rpx;"
						:src="`https://saas.jizhongkeji.com/static/jzkj/static/icon/select_fill-${selectPayType == 3 ? 'a' : 'n'}.svg`" />
				</view>
			</view>
			<!-- 确认支付按钮 -->
			<view class="pay_popup_confirm_btn_box">
				<view class="pay_popup_confirm_btn">确认支付</view>
			</view>
			<!-- 关闭图标 -->
			<image class="pay_popup_close_icon" mode="widthFix" style="width: 33.33rpx;height: 33.33rpx;"
				src="https://saas.jizhongkeji.com/static/jzkj/static/icon/pay-pup-close.svg" @click="payPopup.close()" />
		</view>
	</uni-popup>

	<!-- 选择地址弹窗 -->
	<ActionSheetSlot v-model:show="showAddressSheet" :title="'选择地址'"
		:footerBtnText="address_list?.length ? '立即购买' : '添加收货地址'" @confirm="addressSheetBtnHandler">
		<template #body>
			<!-- 地址列表 -->
			<view v-if="address_list?.length" class="address_list_box">
				<view class="address_item" v-for="(item, index) in address_list" :key="index"
					@click="change_address(item.id)">
					<view class="address_text">
						{{ item.user_name }}, {{ item.mobile }}, {{ item.address }}, {{ item.address_detail }}
					</view>
					<image mode="widthFix" style="width: 41.67rpx;height: 41.67rpx;"
						:src="`https://saas.jizhongkeji.com/static/jzkj/static/icon/Checkbox_selected2-${item.id == address.id ? 'a' : 'n'}.svg`">
					</image>
				</view>
			</view>

			<!-- 没有地址的空状态 -->
			<view v-else style="text-align: center; padding: 80rpx 0;">
				<text>暂无收货地址，请先添加收货地址</text>
			</view>
		</template>
	</ActionSheetSlot>
</template>

<script setup>
import { ref } from "vue";
import { useTempStore } from "@/stores/temp";
import { storeToRefs } from "pinia";
import { request } from "@/utils/request";
import { onUnload, onLoad, onShow } from "@dcloudio/uni-app";

const { user, business } = storeToRefs(useTempStore());

const is_loading = ref(true); // 是否加载中
const buy_type = ref(1); // 购买类型
const is_saving = ref(0); // 是否保存中
const price_all = ref(0); // 总价
const address = ref({}); // 地址 {}
const address_list = ref([
	// {
	// 	address: "北京市,北京市,东城区",
	// 	address_detail: "333",
	// 	create_time: "2024-10-23 19:00:34",
	// 	id: 446,
	// 	is_default: 0,
	// 	mobile: "222",
	// 	update_time: "2024-10-23 19:00:34",
	// 	user_id: 10662,
	// 	user_name: "111"
	// },
	// {
	// 	address: "北京市,北京市,东城区",
	// 	address_detail: "333",
	// 	create_time: "2024-10-23 19:00:34",
	// 	id: 46,
	// 	is_default: 0,
	// 	mobile: "222",
	// 	update_time: "2024-10-23 19:00:34",
	// 	user_id: 10662,
	// 	user_name: "111"
	// }
]); // 地址列表
const targte_shop = ref(); // 自提门店 {}
const buyerMsg = ref(''); // 买家留言


const showAddressSheet = ref(false); // 是否展示选择地址弹窗
const showActionSheet = ref(false); // 是否展示留言弹窗
const payPopup = ref(null); // 普通弹窗实例
const selectPayType = ref(1);// 选择的支付方式
const save_money = ref(0);// 储值金额
const goods_info = ref({}); // 商品信息


const buy_type_list = ref([
	{ id: 1, name: '门店自提' },
	{ id: 0, name: '物流配送' }
]);


onLoad((options) => {
	console.log('页面加载：pay');

	// 获取 user 数据后

	if (options && options.goods_id) {
		buy_type.value = 1; // 默认门店自提
		get_good_info(options.goods_id, options.price_id, options.count)
		console.log('获取的options', options);
	}
	get_info_list()
	// else {
	// 	get_info_list()
	// }
})

onShow(() => {
	get_address();
})

onUnload(() => {
	console.log('页面卸载：pay');
	clear_select_address(); // 清除选择地址
})


// 去付款
function to_pay() {
	console.log('去付款');

	// 如果是自提，检查是否选择了门店
	if (buy_type.value == 1) {
		if (!targte_shop.value || !targte_shop.value.shop_name) {
			uni.showToast({
				title: '  请选择提货的门店  ',
				icon: 'error'
			})
			return
		}
	}


	// 打开支付弹窗
	payPopup.value.open('center');
}

// 提交订单
function to_sub() {
	console.log('提交订单提交订单', buy_type.value);
	if (is_saving.value == 1) {
		console.log('加购物车 防止连点啦');
		return
	}

	// 总价小于0
	if (price_all.value <= 0) return

	if ((!address.value || !address.value.mobile) && buy_type.value == 0) {
		// 物流配送
		uni.showToast({
			title: '请先设置收货地址',
			icon: 'none',
			mask: true
		})
		return
	}

	if (buy_type.value == 1) {
		if (!targte_shop.value || !targte_shop.value.shop_name) {
			uni.showToast({
				title: '请选择自提门店',
				icon: 'none',
				mask: true
			})
			return
		}

		if (!e.detail.value.user_name) {
			uni.showToast({
				title: '请输入提货人员姓名',
				icon: 'none',
				mask: true
			})
			return
		}

		if (!e.detail.value.phone) {
			uni.showToast({
				title: '请输入您的手机号码',
				icon: 'none',
				mask: true
			})
			return
		}
	}

	// if ((!this.data.targte_shop || !this.data.targte_shop.shop_name) && this.data.buy_type == 1) {
	//   // 物流配送
	//   uni.showToast({
	//     title: '请选择自提门店',
	//     icon: 'none',
	//     mask: true
	//   })
	//   return
	// }

	var json_goods = null;
	if (this.data.type == 'buy_now') {
		let good_arr = []
		good_arr.push(this.data.goods_info)
		json_goods = JSON.stringify(good_arr)

	} else {
		json_goods = JSON.stringify(this.data.good_list)
	}
	console.log('下单', json_goods);
	this.data.is_saving = 1
	this.request({
		url: '/WxAppCustomer/sub_order',
		data: {
			json_info: json_goods,
			address_id: this.data.address ? this.data.address.id : null,
			price_all: this.data.price_all || 0,
			type: this.data.type || '',
			buy_type: this.data.buy_type,
			mobile: e.detail.value.phone || '',
			user_name: e.detail.value.user_name || '',
			shoper_id: this.data.targte_shop ? this.data.targte_shop.id : null,
		},
		success: (res) => {

			if (res.data && res.data.code == 1) {
				this.data.is_saving = 0

				uni.showToast({
					title: res.data.msg,
					icon: 'none',
					mask: true
				})
			} else {
				if (res.data.data.wxAppJsSign) {
					this.data.order_id = res.data.data.order_id
					this.wx_pay(res.data.data.wxAppJsSign)
				}
			}
		}
	});
}

// 获取用户地址 [默认]
async function get_address() {
	// this.request({
	// 	url: '/WxAppCustomer/get_user_address',
	// 	data: {},
	// 	success: (res) => {
	// 		if (res.data && res.data.code == 1) {
	// 			wx.showToast({
	// 				title: res.data.msg,
	// 				icon: 'none',
	// 				mask: true
	// 			})
	// 		} else {
	// 			this.setData(res.data.data)
	// 		}
	// 	}
	// });

	let res = await request('/WxAppCustomer/get_user_address', 'post', {});
	console.log('get_address res', res);
	if (res.code != 0) return uni.showToast({ title: res.msg, icon: 'error', duration: 2000 });
	address.value = res.data.address;
}

// 获取地址列表
async function get_info_list() {
	// this.request({
	// 	url: '/WxAppCustomer/get_address_list',
	// 	data: {},
	// 	success: (res) => {
	// 		if (res.data && res.data.code == 1) {
	// 			wx.showToast({
	// 				title: res.data.msg,
	// 				icon: 'none',
	// 				mask: true
	// 			})
	// 		} else {
	// 			this.setData(res.data.data)
	// 		}
	// 	}
	// });

	let res = await request('/WxAppCustomer/get_address_list', 'post', {});
	console.log('get_info_list res', res);
	if (res.code != 0) return uni.showToast({ title: res.msg, icon: 'error', duration: 2000 });
	address_list.value = res.data.address_list;
}

// 获取商品信息
async function get_good_info(goods_id, price_id, count) {
	let res = await request('/WxAppCustomer/get_good_info', 'post', {
		goods_id: goods_id || 0,
		price_id: price_id || 0,
		count: count || 0,
	});
	console.log('get_good_info res', res);
	// 获取数据失败提示
	if (res.code != 0) return uni.showToast({ title: res.msg, icon: 'error', duration: 2000 });
	goods_info.value = res.data.goods_info;

	// this.request({
	// 	url: '/WxAppCustomer/get_good_info',
	// 	data: {
	// 		goods_id: goods_id || 0,
	// 		price_id: price_id || 0,
	// 		count: count || 0,
	// 	},
	// 	success: (res) => {
	// 		if (res.data && res.data.code == 1) {
	// 			wx.showToast({
	// 				title: res.data.msg,
	// 				icon: 'none',
	// 				mask: true
	// 			})
	// 		} else {
	// 			wx.hideLoading();
	// 			this.setData(res.data.data)
	// 			this.setData({
	// 				is_loading: true,
	// 			})
	// 		}
	// 	}
	// });
}



async function clear_select_address() { // 清空选择地址
	let res = await request('/WxAppCustomer/clear_select_address', 'post', {});
	console.log('clear_select_address res', res);
	if (res.code != 0) return uni.showToast({ title: res.msg, icon: 'error', duration: 2000 });
	uni.navigateBack();
}

// 选择地址弹窗按钮事件
function addressSheetBtnHandler() {
	console.log('addressSheetBtnHandler');
	if (address_list.value?.length) {
		// 打开支付弹窗
		payPopup.value.open('center');

	} else {
		uni.navigateTo({
			url: '/pages/mine/address'
		})
	}
}

// 切换地址
function change_address(address_id) {
	address.value = address_list.value.find(item => item.id == address_id);
}

// 切换支付方式
function change_pay_type(pay_type) {
	if (pay_type == 3 && save_money.value < 500) {
		uni.showToast({
			title: '储值余额不足，请更换其他支付方式',
			icon: 'error'
		})
		return
	}
	selectPayType.value = pay_type;
}

// 切换购买类型
function change_buy_type(buyid) {
	// console.log(buyid);
	buy_type.value = buyid;

	console.log('change_buy_type', buy_type.value);
}

// 跳转门店列表
function to_get_shop_list() {
	uni.navigateTo({
		url: '/pages/mine/get_shop_list'
	})
}
// 跳转地址页
function to_address() {
	uni.navigateTo({
		url: '/pages/mine/address'
	})
}
</script>

<style scoped>
@import '@/static/styles/address.css';

.new_layout {
	height: unset;
}

.new_layout_cotent {
	padding-bottom: 150rpx;
	height: unset;
}

.tool_box {
	height: 98rpx;
}

.address_item {
	margin: 22rpx auto 0rpx auto;
	padding: 34rpx 32rpx;
}


.good_item {
	background-color: #FFFFFF;
	border-radius: 14rpx;
	box-sizing: border-box;
	padding: 22rpx 32rpx;
	margin: 22rpx auto 0rpx auto;
	width: 722rpx;
}

.good_img {
	flex: none;
	height: 160rpx;
	margin-right: 22rpx;
	width: 160rpx;
	border-radius: 10rpx;
}

.good_name {
	color: #333333;
	font-size: 29rpx;
	font-weight: bold;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 1.5;
	margin-bottom: 18rpx;
}

.spec_totall {
	background: #E7EFFF;
	border-radius: 6rpx;
	box-sizing: border-box;
	color: #111015;
	font-size: 22rpx;
	padding: 8rpx 14rpx;
	margin-bottom: 10rpx;
	max-width: max-content;
}

.spec_totall .flex_none {
	margin-right: 10rpx;
}

.good_price {
	font-size: 29rpx;
}

.tool_box {
	padding-bottom: 0rpx;
	padding: 0rpx 30rpx;
	position: fixed;
}

.price_totall {
	color: #000000;
	font-size: 29rpx;
	margin-right: 40rpx;
}

.price_totall .price {
	color: #FC4740;
}

.sub_btn {
	background-color: #FF4F26;
	border-radius: 34rpx;
	color: #FFFFFF;
	font-size: 29rpx;
	padding: 11rpx 32rpx;
	height: 60rpx;
	margin: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}

.address_item.have_text {
	color: #1d1d1d;
}

.good_detail {
	width: 100%;
}

.buy_type_box {
	width: 100%;
	box-sizing: border-box;
	padding: 0 14rpx;
	/* position: sticky; */
	/* top: 50rpx; */
}

.select_buy_box {
	width: 100%;
	display: flex;
	align-items: center;
	/* background-color: rgb(255, 255, 255,0.5); */
	background-color: #FDE0D9;
	height: 75rpx;
	color: #333333;
	font-size: 32rpx;
	margin-top: 50rpx;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	box-sizing: border-box;
}

.buy_type_active {
	color: #FF4F26;
	background: #FFFFFF;
	width: 32%;
	height: calc(83.33rpx + 6rpx);
	box-sizing: border-box;
	padding-top: 18rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	transform: translateY(-6rpx);
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	font-weight: bold;
}

.buy_type_normol {
	width: 30%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 83.33rpx;
}

.buy_address_top {
	margin-top: 0;
	border-radius: 0;
	border-bottom: 1rpx solid #EEEEEE;
}

.input_address {
	height: 100%;
	width: 60%;
	text-align: end;
}

.ziti_box {
	width: 100%;
	box-sizing: border-box;
	padding: 0 32rpx;
	background-color: #FFFFFF;
	border-bottom-right-radius: 20rpx;
	border-bottom-left-radius: 20rpx;
}

.address_item {
	padding: 0rpx 0;
	width: 100%;
	box-sizing: unset;
	min-height: 120rpx;
}

.buy_address_top_v {
	padding-left: 32rpx;
	padding-right: 32rpx;
	border-bottom-right-radius: 20rpx;
	border-bottom-left-radius: 20rpx;
	border-bottom: 0;
}

.targte_shop_box {
	display: flex;
	flex-direction: column;
	padding: 30rpx 0;
}
</style>

<style scoped lang="scss">
// 支付弹窗
.pay_popup_box {
	position: relative;
	width: 611.11rpx;
	// height: 875rpx;
	padding: 47.22rpx 55.56rpx;
	// border-radius: 27.78rpx; // 必须在组件中设置

	// 标题
	.pay_popup_title {
		font-size: 37.5rpx;
		font-weight: 700;
		text-align: center;
		color: #000000;
	}

	// 待付款金额
	.pay_popup_price {
		font-size: 33.33rpx;
		font-weight: 400;
		text-align: center;
		color: #000000;
		margin-top: 44.44rpx;
	}

	// 支付方式列表
	.pay_popup_pay_list {
		margin-top: 30rpx;

		.pay_popup_pay_item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 40rpx 0;
			border-bottom: 1px solid #EEEEEE;

			&:last-child {
				border-bottom: none;
			}
		}
	}

	// 确认支付按钮
	.pay_popup_confirm_btn_box {
		margin-top: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.pay_popup_confirm_btn {
			width: 500rpx;
			height: 69.44rpx;
			opacity: 0.9;
			border-radius: 31.25rpx;
			background-image: $uni-color-gradient-primary;
			color: #FFFFFF;
			font-size: 29.17rpx;
			line-height: 69.44rpx;
			text-align: center;
		}
	}

	// 关闭图标
	.pay_popup_close_icon {
		position: absolute;
		top: 38.36rpx;
		right: 33.33rpx;
	}
}

// 地址列表弹窗
.address_list_box {
	padding: 20rpx;

	.address_item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #EEEEEE;

		font-size: 27.78rpx;
		font-weight: 400;
		text-align: left;
		color: #03081a;
	}
}

.pay_container {
	height: 100vh;
	position: relative; // 相对定位
	padding-top: $nav-height;
	// background-image: url('/static/images/goods-pay-bg.svg');
	background-size: 100%;
	background-repeat: no-repeat;
	background-color: #F8F9FA;

	// 渐变背景
	.bg_gradient {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
	}

	// 买家留言
	.buyer_msg_input {
		width: 100%;
		height: 100%;
	}


	// 商品信息
	.goods_item {
		margin: 0 14rpx;
		margin-top: 25rpx;
		background-color: #FFFFFF;
		border-radius: 14rpx;
		display: flex;
		padding: 20rpx;

		.good_img {
			width: 160rpx;
			height: 160rpx;
			margin-right: 20rpx;
			border-radius: 10rpx;
		}

		.good_info_box {
			// flex: 1;
			width: calc(100% - 160rpx - 20rpx);

			.good_name {
				// 文本超出显示省略号
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.good_spec_box {
				// margin-top: 10rpx;
				display: flex;

				.good_spec_item {
					font-size: 22.22rpx;
					border-radius: 10rpx;
					padding: 10rpx 20rpx;
					background-color: #e7efff;
				}
			}

			.good_num_price_box {
				margin-top: 10rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}


	// 买家留言
	.buyer_msg_box {
		border-radius: 14rpx;
		background-color: #FFFFFF;
		margin: 25rpx 14rpx;
		padding: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		font-size: 27.78rpx;
		font-family: PingFang SC, PingFang SC-Bold;
		font-weight: 700;
		text-align: left;
		color: #1d1d1d;
	}

	// 其它项
	.other_item_box {
		margin: 25rpx 14rpx;
		background-color: #FFFFFF;
		border-radius: 14rpx;
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		gap: 30rpx;

		.other_item {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.buyer_msg_title {
				font-size: 27.78rpx;
				font-weight: bold;
			}
		}
	}

	// 底部提交
	.bottom_submit_box {
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #FFFFFF;
		height: 97.22rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 47.22rpx;

		.bottom_submit_price_box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 29.17rpx;
		}

		.bottom_submit_btn {
			color: #FFFFFF;
			background-image: $uni-color-gradient-primary;
			border-radius: 31.25rpx;
			padding: 10rpx 45rpx;
		}
	}
}
</style>