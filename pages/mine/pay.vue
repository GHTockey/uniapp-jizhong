<template>
	<view class="pay_container"
		style="background-image: url('https://saas.jizhongkeji.com/static/jzkj/static/images/goods-pay-bg.svg');">
		<HeightBar />

		<!-- 标题栏 -->
		<NavBar title="待付款订单" showBack isWhite bgc="transparent">
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
						<input style="font-size: 28rpx; text-align: right;" class="input_address" v-model="user.user_name"
							placeholder-class="placeholder-style" type="text" name="user_name" placeholder="输入提货人员姓名" />
					</view>

					<view class="address_item flex_row_space_bt buy_address_top"
						style="padding-top:0;padding-bottom: 0;height: 106rpx;border-bottom: 0;">
						<view class="address_text" style="width: unset;">
							手机号码
						</view>
						<input style="font-size: 28rpx; text-align: right;" class="input_address" v-model="user.phone"
							placeholder-class="placeholder-style" type="text" name="phone" placeholder="输入您的手机号码" />
					</view>
				</view>


				<!-- 物流配送选择地址 showAddressSheet = true -->
				<view class="address_item flex_row_space_bt buy_address_top buy_address_top_v" v-if="buy_type == 0"
					style="box-sizing: border-box;" @click="addressSheetBtnHandler">
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
			<view v-if="false" class="goods_item">
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
						<!-- <text class="good_num">×{{ goods_info.count || 1 }}</text> -->
						<!-- <uni-number-box v-model="goods_info.count"
							@change="change_count(unref(goods_info.count), $event)" /> -->
					</view>
				</view>
			</view>


			<!-- 购物车 -->
			<template v-if="type != 'buy_now'">
				<view class="new_layout" v-if="good_list && good_list.length > 0">
					<view class="new_layout_cotent">

						<tempalte v-for="item in good_list" :key="item.id">
							<view class="good_item flex_row_space_bt">
								<image lazy-load="true" class="good_img" mode="widthFix"
									:src="item.good_imgs || 'https://saas.jizhongkeji.com/static/jzkj/images/empty_img.png'">
								</image>
								<view class="good_detail">
									<view class="good_name">
										{{ item.name }}
									</view>
									<view class="spec_totall flex_row_str_str word_break"
										v-if="item.spec_totall && item.spec_totall.length > 0">
										{{ item.spec_totall }}
									</view>
									<view class="flex_row_space_bt">
										<view class="good_price">
											<text style="color:#333333;font-size:22rpx;">￥</text>{{ item.price_all }}
										</view>
										<view class="count_btn_box width_max_content flex_row_space_bt !max-w-max">
											<view
												:class="`de_btn count_btn flex_col_cen_cen ${item.count == item.limit[0] ? 'no_active' : ''}`"
												@click="reduce_count(item)">
												<view class="reduce_icon"></view>
											</view>
											<view class="count flex_col_cen_cen px-2 mx-2">{{ item.count || 1 }}</view>
											<view
												:class="`reduce count_btn flex_col_cen_cen ${item.count == item.limit[1] ? 'no_active' : ''}`"
												@click="add_count(item)">+</view>
										</view>
									</view>
								</view>
							</view>
						</tempalte>
						<view class="address_item have_text flex_col_cen_cen" v-if="false">
							<view class="flex_row_space_bt">
								<view class="font_bold">商品金额</view>
								<view class="">￥{{ price_all }}</view>
							</view>
							<view class="flex_row_space_bt margin_top20">
								<view class="font_bold">商品金额</view>
								<view class="">￥{{ price_all }}</view>
							</view>
						</view>
					</view>
					<view class="tool_box flex_row_end_cen">
						<view class="price_totall">
							合计：<text class="price">￥{{ price_all }}</text>
						</view>
						<!-- <view class="sub_btn" bindtap="to_sub">
							提交订单
							</view> -->
						<button class="sub_btn" form-type="submit">提交订单</button>
					</view>
				</view>
			</template>

			<!-- 立即购买 -->
			<template v-if="type == 'buy_now'">
				<view class="new_layout" v-if="goods_info">
					<view class="new_layout_cotent">
						<view class="good_item flex_row_space_bt">
							<image lazy-load class="good_img" mode="aspectFill"
								:src="goods_info.good_imgs || 'https://saas.jizhongkeji.com/static/jzkj/images/empty_img.png'">
							</image>
							<view class="good_detail">
								<view class="good_name">
									{{ goods_info.name }}
								</view>
								<view class="spec_totall flex_row_str_str word_break"
									v-if="goods_info.spec_totall && goods_info.spec_totall.length > 0">
									{{ goods_info.spec_totall }}
								</view>
								<view class="flex_row_space_bt">
									<view class="good_price">
										<text style="color:#333333;font-size:22rpx;">￥</text>{{ goods_info.unit_price }}
									</view>
									<view class="count_btn_box width_max_content flex_row_space_bt !max-w-max">
										<view
											:class="`de_btn count_btn flex_col_cen_cen ${goods_info.count == goods_info.limit?.[0] ? 'no_active' : ''}`"
											@click="info_reduce_count(goods_info)">
											<view class="reduce_icon"></view>
										</view>
										<view class="count flex_col_cen_cen px-2 mx-2">{{ goods_info.count || 1 }}
										</view>
										<view
											:class="`reduce count_btn flex_col_cen_cen ${goods_info.count == goods_info.limit?.[1] ? 'no_active' : ''}`"
											@click="info_add_count(goods_info)">+</view>
									</view>
								</view>
							</view>
						</view>
						<view class="address_item have_text flex_col_cen_cen" v-if="false">
							<view class="flex_row_space_bt">
								<view class="font_bold">商品金额</view>
								<view class="">￥{{ price_all }}</view>
							</view>
							<view class="flex_row_space_bt margin_top20">
								<view class="font_bold">商品金额</view>
								<view class="">￥{{ price_all }}</view>
							</view>
						</view>
					</view>
					<view class="tool_box flex_row_end_cen">
						<view class="price_totall">
							合计：<text class="price">￥{{ price_all }}</text>
						</view>
						<!-- <view class="sub_btn" bindtap="to_sub">
						提交订单
						</view> -->
						<button class="sub_btn" form-type="submit">提交订单</button>
					</view>
				</view>
			</template>

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
			<view class="other_item_box" v-if="1">
				<view class="other_item">
					<text class="buyer_msg_title">优惠券</text>
					<view>
						<text style="font-size: 27.78rpx;font-weight: 500;">暂无优惠券</text>
					</view>
				</view>
				<view class="other_item">
					<text class="buyer_msg_title">使用150积分可以低购</text>
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
			<view v-if="false" class="bottom_submit_box">
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
	</view>
	<!-- 留言弹窗 -->
	<ActionSheetSlot v-model:show="showActionSheet" :title="'买家留言'">
		<template #body>
			<view style="height: 422.22rpx; border-radius: 13.89rpx; padding: 32rpx; background-color: #ececec;">
				<!-- 输入框 -->
				<textarea class="buyer_msg_input" placeholder="请与商家客服沟通一致后再留言，留言内容勿超过100个汉字" v-model="buyerMsg" />
			</view>
		</template>
	</ActionSheetSlot>
	<!-- 支付弹窗 -->
	<uni-popup ref="payPopup" background-color="#fff" @change="" border-radius="27.78rpx" :mask-click="false">
		<view class="pay_popup_box">
			<!-- 标题 -->
			<view class="pay_popup_title">
				选择支付方式
			</view>
			<!-- 待付款金额 -->
			<view class="pay_popup_price">
				<view>待付款金额：￥{{ price_all }}元</view>
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
				<view class="pay_popup_confirm_btn" @click="payPopupConfirmHandler">确认支付</view>
			</view>
			<!-- 关闭图标 -->
			<image class="pay_popup_close_icon" mode="widthFix" style="width: 33.33rpx;height: 33.33rpx;"
				src="https://saas.jizhongkeji.com/static/jzkj/static/icon/pay-pup-close.svg"
				@click="payPopup.close()" />
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
import { ref, unref, watch } from "vue";
import { useTempStore } from "@/stores/temp";
import { storeToRefs } from "pinia";
import { request } from "@/utils/request";
import { onUnload, onLoad, onShow } from "@dcloudio/uni-app";
import { toPage } from "../../utils";

const { user, business } = storeToRefs(useTempStore());

const has_bar_title_color = 'unset';
const is_show_locate = false;
const good_list = ref([]);
const is_checking = ref(0);
const inter = ref(null);
const type = ref();
const good_count = ref()
const order_id = ref();

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


// watch(() => goods_info.value.count, (newVal, oldVal) => {
// 	// console.log('watch goods_info.value.count', newVal, oldVal);
// 	// 判断是加还是减
// 	if (newVal > oldVal) {
// 		// console.log('加');
// 		info_add_count(goods_info.value)
// 	} else {
// 		// console.log('减');
// 		info_reduce_count(goods_info.value)
// 	}
// })


onLoad((options) => {
	uni.showLoading({
		title: 'loading',
	})
	// this.onLogin(user => {
	// 	this.setData({
	// 		user: user,
	// 		business: user.business,
	// 	})
	// })

	if (business && business.buy_type == 1) {
		// 商家默认方式为自提
		var list = [{
			'id': 1,
			'name': '门店自提'
		}, {
			'id': 0,
			'name': '物流配送'
		},]
		// this.setData({
		// 	buy_type_list: list,
		// 	buy_type: 1,
		// });
		buy_type_list.value = list;
		buy_type.value = 1;
	}

	console.log('onload====', buy_type.value);
	if (options && options.goods_id) {
		// this.setData({
		// 	type: 'buy_now'
		// })
		type.value = 'buy_now';
		console.log('获取的options', options);
		get_good_info(options.goods_id, options.price_id, options.count)
	} else {
		get_info_list()
	}
})

onShow(() => {
	// get_address();
	get_address();
	get_select_shop();
})

onUnload(() => {
	console.log('页面卸载：pay');
	clear_select_address(); // 清除选择地址
})


// 去付款 [弃用]
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
async function to_sub(e) {
	// console.log(e);
	// return
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


	// 打开支付弹窗
	payPopup.value.open('center');
	return

	// getWxPayData()
}
async function getWxPayData() {
	var json_goods = null;
	if (type.value == 'buy_now') {
		let good_arr = []
		good_arr.push(goods_info.value)
		json_goods = JSON.stringify(good_arr)

	} else {
		json_goods = JSON.stringify(good_list.value)
	}
	// console.log('下单', json_goods);
	is_saving.value = 1
	uni.showLoading({
		title: '正在请求数据'
	});
	let res = await request('/WxAppCustomer/sub_order', 'post', {
		json_info: json_goods,
		address_id: address.value ? address.value.id : null,
		price_all: price_all.value || 0,
		type: type.value || '',
		buy_type: buy_type.value,
		mobile: user.value.phone || '',
		user_name: user.value.user_name || '',
		shoper_id: targte_shop.value ? targte_shop.value.id : null,
	})
	uni.hideLoading();
	if (res.code == 1) {
		is_saving.value = 0
		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true
		})
	} else {
		if (res.data.wxAppJsSign) {
			order_id.value = res.data.order_id
			uni.showLoading({
				title: '调起微信支付'
			});
			wx_pay(res.data.wxAppJsSign)
		}
	}
}
// 弹窗确认按钮事件
function payPopupConfirmHandler() {
	if (selectPayType.value == 1) {
		// 微信支付
		getWxPayData()
	} else if (selectPayType.value == 2) {
		// 佣金支付
		uni.showToast({
			title: '佣金支付[待开发]',
			icon: 'none',
			mask: true
		})
	} else if (selectPayType.value == 3) {
		// 储值支付
		uni.showToast({
			title: '储值支付[待开发]',
			icon: 'none',
			mask: true
		})
	}
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
	let res = await request('/WxAppCustomer/get_shopcar_v2', 'post', { type: 'selected' });
	console.log('get_info_list res', res);
	if (res.code == 1) {
		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true
		})
	} else {
		uni.hideLoading();
		// this.setData(res.data.data)
		good_count.value = res.data.good_count;
		good_list.value = res.data.good_list;
		price_all.value = res.data.price_all;
		// this.setData({
		// 	is_loading: true,
		// })
		is_loading.value = true;
	}
}

// 获取商品信息
async function get_good_info(goods_id, price_id, count) {
	let res = await request('/WxAppCustomer/get_good_info', 'post', {
		goods_id: goods_id || 0,
		price_id: price_id || 0,
		count: count || 0,
	});
	console.log('get_good_info res', res);
	if (res.code == 1) {
		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true
		})
	} else {
		uni.hideLoading();
		goods_info.value = res.data.goods_info
		price_all.value = res.data.price_all;
		is_loading.value = true;
	}
}


async function clear_select_address() { // 清空选择地址
	let res = await request('/WxAppCustomer/clear_select_address', 'post', {});
	console.log('clear_select_address res', res);
	if (res.code != 0) return uni.showToast({ title: res.msg, icon: 'error', duration: 2000 });
	// uni.navigateBack();
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


function reduce_count(item) {
	// let item = e.currentTarget.dataset.item;
	if (item.count == item.limit[0]) {
		uni.showToast({
			title: '亲，不能再减少了',
			icon: "none",
		})
		return
	}

	let new_good_list = good_list.value.map(m => {
		if (m.id == item.id) {
			m.count -= 1;
			m.price_all = Math.round((m.unit_price * (m.count) * 100), 2) / 100;
		}
		return m
	})
	console.log('减少后的列表', new_good_list);
	good_list.value = new_good_list;
	comput_price_all(new_good_list)
}
function add_count(item) {
	// let item = e.currentTarget.dataset.item;
	// let good_list = good_list.value

	if (item.count == item.limit[1]) {
		uni.showToast({
			title: '亲，不能再添加了',
			icon: "none",
		})
		return
	}
	let new_good_list = good_list.value.map(m => {
		if (m.id == item.id) {
			m.count += 1;
			m.price_all = Math.round((m.unit_price * (m.count) * 100), 2) / 100;
		}
		return m
	})
	console.log('增加后的列表', new_good_list);
	good_list.value = new_good_list;
	comput_price_all(new_good_list)
}
function info_reduce_count(item) {
	// let item = e.currentTarget.dataset.item;
	if (item.count == item.limit[0]) {
		uni.showToast({
			title: '亲，不能再减少了',
			icon: "none",
		})
		return
	}
	item.count = item.count * 1 - 1;
	item.price_all = Math.round((item.unit_price * (item.count) * 100), 2) / 100;

	goods_info.value = item;
	price_all.value = item.price_all;
}
function info_add_count(item) {
	// console.log('info_add_count', item);
	if (item.count == item.limit[1]) {
		uni.showToast({
			title: '亲，不能再添加了',
			icon: "none",
		})
		return
	}
	item.count = item.count * 1 + 1
	item.price_all = Math.round((item.unit_price * (item.count) * 100), 2) / 100;

	goods_info.value = item;
	price_all.value = item.price_all;
}
function change_count(e, e2) {
	// console.log('change_count', e, e2);
}
function comput_price_all(list) {
	let price_all_temp = 0
	list.map(m => {
		price_all_temp = Math.round(((price_all_temp * 1 + m.price_all * 1) * 100), 2) / 100;
	})
	console.log('合计', price_all_temp);
	// this.setData({
	// 	price_all: price_all_temp
	// })
	price_all.value = price_all_temp;
}
function to_list(e) {
	uni.navigateTo({
		url: '/pages/mine/address',
	})
}
async function wx_pay(wxAppJsSign) {
	console.log('wx_pay', wxAppJsSign);
	if (!uni.requestPayment) return uni.showToast({ title: '当前环境不支持微信支付', icon: 'none' });
	uni.requestPayment({
		timeStamp: '' + wxAppJsSign.timeStamp,
		nonceStr: wxAppJsSign.nonceStr,
		package: wxAppJsSign.package,
		signType: wxAppJsSign.signType,
		paySign: wxAppJsSign.paySign,
		fail: (res) => {
			// TODO 记录微信支付取消
			is_saving.value = 0
			console.log('wx_pay 失败', res);
			uni.hideLoading();
			uni.showToast({
				title: '用户取消支付',
				icon: 'none',
				duration: 2000
			});
		},
		success: (res) => {
			let pay_status = 0;
			is_checking.value = 1

			uni.hideLoading();
			uni.showToast({
				title: '支付成功',
				duration: 2000
			});

			// console.log('wx_pay 支付成功', res);
			// return

			inter.value = setInterval(async () => {
				let res = await request('/WxAppCustomer/check_user_order', 'post', {
					id: order_id.value,
				});
				pay_status = res.data.info ? res.data.info.pay_status : 0;
				if (pay_status == 1) {
					clearInterval(inter.value);
					is_checking.value = 0;
					setTimeout(() => {
						is_saving.value = 0
						// TODO 下单成功页面
						let url = `/pages/mine/order_success?buy_type=${buy_type.value}`;
						console.log('url', url);
						uni.redirectTo({ url })
						// toPage(`/pages/mine/order_success?buy_type=${buy_type.value}`)
					}, 1000)
				}
			}, 1000);
			return;
		},
		complete: () => {
			is_saving.value = 0
			console.log('wx_pay 结束');
		}
	})
}
async function get_select_shop() {
	let res = await request('/WxAppCustomer/select_shop', 'post', {});
	if (res.code == 1) {
		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true
		})
	} else {
		// targte_shop
		// console.log('get_select_shop res', res);
		// this.setData(res.data.data)
		targte_shop.value = res.data.targte_shop;
	}
}
</script>

<style scoped>
@import '@/static/styles/address.css';

.new_layout {
	height: unset;
	background-color: transparent;
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
	min-height: 100vh;
	position: relative; // 相对定位
	padding-top: $nav-height;
	// background-image: url('/static/images/goods-pay-bg.svg');
	background-size: 100%;
	background-repeat: no-repeat;
	background-color: #F8F9FA;
	padding-bottom: 98rpx;

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