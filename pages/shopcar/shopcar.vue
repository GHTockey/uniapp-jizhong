<template>
	<view class="shopcar_container">
		<!-- 缺省页面 -->
		<!-- 默认显示404 -->
		<!-- <ShoppingCarDefault /> -->
		<!-- unpublished 管理员暂未发布内容，敬请期待 -->
		<!-- <ShoppingCarDefault status="unpublished" /> -->
		<!-- network 网络遇到问题，请检查后再试 -->
		<!-- <ShoppingCarDefault status="network" /> -->
		<!-- pay_fail 订单支付失败 -->
		<!-- <ShoppingCarDefault status="pay_fail" /> -->
		<!-- no_permission 当前用户该功能的操作权限 -->
		<!-- <ShoppingCarDefault status="no_permission" /> -->
		<!-- empty 购物车内暂无商品，快去选购吧 -->
		<!-- <ShoppingCarDefault status="empty" /> -->

		<view style="height:auto;" class="new_layout" v-if="is_loading">
			<view style="height: auto;" class="new_layout_cotent ">
				<template v-if="good_list && good_list.length > 0">
					<checkbox-group @change="checkboxChange">
						<template v-for="item in good_list" :key="item.id">
							<view class="good_item flex_row_space_bt">
								<checkbox :value="'' + item.id" class="good_check" :checked="item.checked" />
								<!-- <navigator hover-class="none" :url="`/pages/product/detail?id=${item.goods_id}`"> -->
								<view class="flex_row_space_bt">
									<image lazy-load class="good_img" mode="aspectFill" :src="item.img_uri"></image>
									<view class="good_detail">
										<view class="good_name">{{ item.name }}</view>
										<view class="spec_totall flex_row_str_str word_break"
											v-if="item.spec_totall && item.spec_totall.length > 0">
											{{ item.spec_totall }}
										</view>
										<view class="flex_row_space_bt">
											<view class="good_price">
												<text style="color:#333333;font-size:22rpx;">￥</text>{{
													item.unit_price
												}}
											</view>
											<view class="count_btn_box width_max_content flex_row_space_bt">
												<view
													:class="`de_btn count_btn flex_col_cen_cen ${item.count == 0 ? 'no_active' : ''}`"
													:data-item="item" @click="reduce_count_car">
													<view class="reduce_icon"></view>
												</view>
												<view class="count flex_col_cen_cen">{{ item.count || 1 }}</view>
												<view
													:class="`reduce count_btn flex_col_cen_cen ${item.count == item.limit[1] ? 'no_active' : ''}`"
													:data-item="item" @click="add_count_car">
													+
												</view>
											</view>
										</view>
									</view>
								</view>
								<!-- </navigator> -->
							</view>
						</template>
					</checkbox-group>
				</template>
				<template v-else>
					<view class="empty_tip flex_col_space_ar" style="height: 60vh;">
						<view class="empty_tip_text flex_col_cen_cen">
							<image lazy-load class="empty_tip_img" mode="widthFix"
								src="https://saas.jizhongkeji.com/static/jzkj/images/empty_img_shopcar.png"></image>
							购物车是空的
						</view>
						<view class="empty_btn flex_col_cen_cen" bindtap="to_menu">
							去挑选商品
						</view>
					</view>
				</template>

			</view>

			<view
				style="position: fixed;bottom: 100rpx;width: 100%;height: 100rpx;padding-bottom: constant(safe-area-inset-bottom); padding-bottom: env(safe-area-inset-bottom);">
				<view class="tool_box flex_row_space_bt" style="bottom: 0;top:0;"
					v-if="good_list && good_list.length > 0">
					<view class="choose_all flex_row_space_bt width_max_content">
						<checkbox-group @change="checkboxAll">
							<checkbox :checked="checkedAll" />
						</checkbox-group>
						<text>全选</text>
					</view>
					<view class="flex_row_space_bt width_max_content">
						<view class="price_totall" v-if="show_price_text">
							合计：<text class="price">￥{{ show_price_text }}</text>
						</view>
						<view :class="`sub_btn ${show_price_text ? '' : 'no_active'}`" @click="to_sub">
							去付款
						</view>
					</view>
				</view>
			</view>
			<view class="ying" style="box-shadow: none;"></view>

		</view>

		<TabBar class="fixed-bottom" :isAppMode="true" />
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { request } from "@/utils/request.js";
import { onLoad, onShow, onHide } from '@dcloudio/uni-app';
import { useTempStore } from '@/stores/temp';
import { storeToRefs } from 'pinia';

const { business, user } = storeToRefs(useTempStore())

const order = ref(null) // 订单
const show_price_text = ref('') // 显示价格文字
const selected_ids = ref([]) // 选中的商品id
const is_loading = ref(false) // 是否加载中
const good_count = ref(0) // 商品数量
const good_list = ref([]) // 商品列表
const tarbarupdated = ref(0) // 更新tabbar

const is_adding = ref(0) // 是否正在添加
const checkedAll = ref(false) // 是否全选


onLoad(options => {
	uni.showLoading({
		title: 'loading',
	})
	click_page(7);
})
onShow(() => {
	uni.showLoading({
		title: '',
		mask: true,
	})

	uni.hideLoading()
	get_info_list()
})
onHide(() => {
	save_selected_good() // 保存选择
})

// 手册改变复选框状态
function checkboxChange(e) {
	// currentTarget.id
	console.log('checkbox发生change事件，携带value值为：', e.detail.value)
	
	var price_all = 0
	const values = e.detail.value
	for (let i = 0, lenI = good_list.value.length; i < lenI; ++i) {
		good_list.value[i].checked = false
		for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
			if (good_list.value[i].id == values[j]) {
				good_list.value[i].checked = true
				price_all = Math.round((price_all * 1 + good_list.value[i]['price_all'] * 1) * 100, 2) / 100
				break
			}
		}
	}

	// good_list.value = good_list
	show_price_text.value = price_all
	selected_ids.value = e.detail.value


	console.log('show_price_text', price_all)

	if (e.detail.value.length == good_list.value.length) {
		console.log(checkedAll);
		checkedAll.value = true
	} else {
		checkedAll.value = false
	}
}
//改变全选框状态	
function checkboxAll(e) {
	console.log('全选', e);
	if (e.detail.value.length == 1) {
		// 全选状态
		var price_all = 0
		var selected_ids_temp = []
		const good_list_temp = good_list.value
		for (let i = 0; i < good_list_temp.length; i++) {
			good_list_temp[i].checked = true
			price_all = Math.round((price_all * 1 + good_list_temp[i]['price_all'] * 1) * 100, 2) / 100
			selected_ids_temp.push(good_list_temp[i]['id'] + '');
		}
		show_price_text.value = price_all
		good_list.value = good_list_temp
		selected_ids.value = selected_ids_temp
		console.log('selected_ids', selected_ids.value)

	} else {
		// 没有全选状态
		let good_list_temp = good_list.value
		for (let i = 0; i < good_list_temp.length; i++) {
			good_list_temp[i].checked = false
		}
		show_price_text.value = 0
		good_list.value = good_list_temp
		selected_ids.value = []
	}
}
// 减少购物车数量
async function reduce_count_car(e) {
	let item = e.currentTarget.dataset.item;
	if (item.count == item.limit[0]) {
		uni.showModal({
			content: '要将该商品移除购物车吗',
			success: async m => {
				console.log(m)

				if (m.confirm) {
					let res = await request('/WxAppCustomer/shop_car_count_reduce', 'post', { id: item.id || 0 })
					if (res.code != 0) {
						uni.showToast({ title: res.msg, icon: 'none' })
						is_adding.value = 0
						return
					}
					is_adding.value = 0
					get_info_list()
				}
			}
		})
		return
	}

	let res = await request('/WxAppCustomer/shop_car_count_reduce', 'post', { id: item.id || 0 })
	if (res.code != 0) {
		uni.showToast({ title: res.msg, icon: 'none' })
		return
	}
	is_adding.value = 0
	get_info_list()
}

// 增加购物车数量
async function add_count_car(e) {
	let item = e.currentTarget.dataset.item;
	if (item.count == item.limit[1]) {
		return
	}

	let res = await request('/WxAppCustomer/shop_car_count_add', 'post', { id: item.id || 0 })
	if (res.code != 0) {
		uni.showToast({ title: res.msg, icon: 'none' })
		is_adding.value = 0
		return
	}
	is_adding.value = 0
	get_info_list()
}

// 提交订单
async function to_sub(e) {
	if (is_adding.value == 1) return
	if (!show_price_text.value || show_price_text.value.length == 0) return

	is_adding.value = 1
	let ids = selected_ids.value.join(',')

	let res = await request('/WxAppCustomer/save_selected_good', 'post', { selected_ids: selected_ids.value })
	if (res.code != 0) {
		uni.showToast({ title: res.msg, icon: 'none' })
		is_adding.value = 0
		return
	}
	is_adding.value = 0

	let pay_id = res.data.pay_id
	// uni.navigateTo({ url: '/pages/mine/pay?pay_id=' + pay_id })
	uni.navigateTo({ url: '/pages/mine/pay' })
}
// 保存选择
async function save_selected_good() {
	console.log('保存选择');

	let res = await request('/WxAppCustomer/save_selected_good', 'post', { selected_ids: selected_ids.value })
	if (res.code != 0) {
		uni.showToast({ title: res.msg, icon: 'none' })
		return
	}
}
// 跳转菜单
async function to_menu(e) {
	uni.switchTab({
		//   url: '/pages/product/index',
		url: '/pages/product/menu',
	})
}

// 获取购物车列表
async function get_info_list(length) {
	let res = await request('/WxAppCustomer/get_shopcar_v2', 'post', { offset: length || 0 })
	if (res.code != 0) {
		uni.showToast({
			title: res.data.msg,
			icon: 'none',
			mask: true
		})
	} else {
		uni.hideLoading()

		is_loading.value = true
		good_count.value = res.data.good_count

		console.log('长度长度', length);

		if (length) {
			// console.log('执行了');
			good_list.value.push.apply(good_list.value, res.data.good_list)
		} else {
			good_list.value = res.data.good_list
		}


		let price_all = 0
		if (selected_ids.value.length > 0 && good_list.value) {
			good_list.value.map(m => {
				if (selected_ids.value.indexOf(m.id + '') != -1) {
					price_all = Math.round((price_all * 1 + m.price_all * 1) * 100, 2) / 100
					m.checked = true
				}
				return m
			})

			// good_list.value = good_list.value
			show_price_text.value = price_all

		}
	}
}

// 点击填写用户资料
function open_tian() {
	// 用户带头像页面
	uni.navigateTo({
		url: '/pages/index/user',
	})
}

// 点击页面
async function click_page(type) {
	let res = await request('/WxAppCustomer/visit_page', 'post', { type: type })
	if (res.code != 0) {
		uni.showToast({ title: res.msg, icon: 'none', mask: true })
		return
	}
}
</script>

<style>
@import '../../static/styles/payOld.css';

.good_check {
	height: 38rpx;
	margin-right: 24rpx;
	width: 38rpx;
}

.choose_all {
	font-size: 29rpx;
}

.width_max_content {
	width: max-content;
}

.sub_btn.no_active {
	background-color: #DBDBDB;
	color: #ffffff;
}

.empty_tip {
	box-sizing: border-box;
	padding-top: 0rpx;
	/* padding-bottom: 150rpx; */
	height: 100vh;
	width: 100vw;
}

.empty_tip_text {
	color: #B2B2B2;
	font-size: 35rpx;
}

.empty_tip_img {
	height: 350rpx;
	width: 342rpx;
}

.empty_btn {
	background-color: #FC4740;
	border-radius: 34rpx;
	color: #ffffff;
	font-size: 30rpx;
	height: 70rpx;
	width: 360rpx;
}

.new_layout_cotent {
	padding-bottom: 0;
	/* height: 100%; */
}

.bottom_juli {
	padding-bottom: 150rpx;
}

.new_layout {
	box-sizing: border-box;
	background-color: #F8F9FA;
	/* height: 100vh; */
	width: 100vw;
}

.tool_box {
	z-index: 5;
	position: absolute;
	right: 0rpx;
	background-color: #F8F9FA;
	box-sizing: border-box;
	box-shadow: 0px -2rpx 10rpx 4rpx rgba(0, 0, 0, 0.1);
	padding-bottom: 84rpx;
	height: 180rpx;
	width: 100vw;
}

.new_layout_cotent {
	padding-bottom: 150rpx;
}
</style>

<style scoped lang="scss">
.shopcar_container {
	min-height: 100vh;
	background-color: #f8f9fa;
	padding-bottom: $tabbar-height;
}
</style>
