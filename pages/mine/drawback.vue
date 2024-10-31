<template>
	<view v-if="is_loading">

		<view style="height:auto;" class="new_layout">
			<view style="height: auto;"
				:class="`new_layout_cotent ${draw_good_info && draw_good_info.length > 0 ? 'bottom_juli' : ''}`">
				<view class="product_info">
					<checkbox-group @change="checkboxChange" class=" w-full">
						<template v-if="draw_good_info" v-for="(json_item, json_index) in draw_good_info"
							:key="json_index">
							<view class="good_item flex_row_space_bt">
								<checkbox :value="'' + json_item.id" class="good_check" :checked="json_item.checked" />
								<image class="good_img" :src="json_item.img_uri" mode="aspectFill" />
								<view class="detail_info" style="max-width: 72%;overflow: hidden;">
									<view class="name_price" style="width: 92%;">
										<text class="name">{{ json_item.goods_name }}</text>
									</view>
									<view class="guige_number">
										<view class="guige_list">
											<text v-if="json_item.spec_totall.length > 0">{{ json_item.spec_totall
												}}</text>
										</view>
									</view>
									<view class="jiajian">
										<view>
											<view><text style="font-size:24rpx">￥</text><text>{{ json_item.unit_price
													}}</text>
											</view>
										</view>
										<view style="display: flex;align-items: center;">

											<image @click="reduce_drawback(json_item)" style="width: 38rpx;height:38rpx"
												:src="json_item.draw_diff_show > 0 ? 'https://saas.jizhongkeji.com/static/jzkj/images/draw_jian.png' : 'https://saas.jizhongkeji.com/static/jzkj/images/draw_jian.png'">
											</image>

											<view style="margin:0 15rpx">{{ json_item.draw_diff_show }}</view>

											<image @click="add_drawback(json_item)" style="width: 38rpx;height:38rpx"
												:src="json_item.draw_diff_show >= json_item.count - json_item.drawback_count - json_item.drawback_count_ing ? 'https://saas.jizhongkeji.com/static/jzkj/images/draw_jia_bu.png' : 'https://saas.jizhongkeji.com/static/jzkj/images/draw_jia.png'">
											</image>
										</view>
									</view>
								</view>
							</view>
						</template>
					</checkbox-group>
				</view>

			</view>

		</view>

		<view class="picker_w">
			<view style="display: flex;width: 100%;align-items: center;justify-content: space-between;">
				<view style="font-size: 28rpx;font-weight: bold;color: #1D1D1D;">退款原因</view>

				<view style="display: flex;width: 70%;align-items: center;">
					<PickerSelector style="flex: none;width: 100%;font-size: 28rpx;line-height: 56rpx;height: 56rpx;"
						class="input pickerSelector" name="dawback_id" :range="shop_dawback_list" rangeKey="reason"
						rangeValue="id" @change="change_reason" placeholder="请选择退款原因" />
					<image style="width: 40rpx;height: 18rpx;position: absolute;right: 10rpx;"
						src="https://saas.jizhongkeji.com/static/jzkj/images/down_btn.png"></image>
				</view>

			</view>

		</view>

		<view style="position: fixed;bottom: 0;justify-content: space-between;border-radius: 0;"
			class="tool_box flex_row_space_bt">
			<view class="choose_all width_max_content" style="display: flex;align-items: center;">
				<checkbox-group @change="checkboxAll">
					<checkbox :checked="checkedAll" />
				</checkbox-group>
				<text style="word-break: keep-all;">全选</text>
			</view>
			<view class="width_max_content" style="display: flex;">
				<view class="price_totall" style="display: flex;align-items: center;margin-right: 30rpx;">
					合计退款金额:<text class="price price_all_v">￥{{ show_price_text }}</text>
				</view>
				<view class="sub_btn" @click="drawback">
					退款
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { request } from '@/utils/request.js';
import { onLoad } from '@dcloudio/uni-app';


const is_loading = ref(false);

const show_price_text = ref(0);
const selected_ids = ref([]);
const good_count = ref(0);
const good_list = ref([]);

const draw_good_info = ref([]);
const shop_dawback_list = ref([]);

const reason_id = ref(0);

const checkedAll = ref();

const order_id = ref();




onLoad(options => {
	uni.showLoading({
		title: 'loading',
	})
	console.log(options);
	if (options && options.orderid) {
		order_id.value = options.orderid
		business_order_info(options.orderid)
	}
})


async function business_order_info(id) {
	let res = await request('/WxAppCustomer/draw_good_info', 'post', { id })
	if (res.code == 1) {
		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true
		})
		return
	}

	res.data.order_goods_list.forEach(m => {

		m.draw_diff_show = m.count - m.drawback_count - m.drawback_count_ing
	})
	var money = show_price_text.value
	draw_good_info.value = res.data.order_goods_list

	var list = draw_good_info.value.filter(m => {
		return m.draw_diff_show > 0
	})

	console.log('listlist', list);
	show_price_text.value = money.toFixed(2)
	shop_dawback_list.value = res.data.shop_dawback_list
	reason_id.value = res.data.shop_dawback_list[0].id

	uni.hideLoading({
		success: (res) => {
			is_loading.value = true
		},
	})
}
function calc_money() {
	var money = 0
	draw_good_info.value.forEach(m => {
		if (m.checked) {
			money += m.draw_diff_show * m.unit_price
		}
	})

	show_price_text.value = money.toFixed(2)
}
// 手册改变复选框状态
function checkboxChange(e) {
	// currentTarget.id
	console.log('checkbox发生change事件，携带value值为：', e.detail.value)

	draw_good_info.value.forEach(m => {
		m.checked = e.detail.value.indexOf('' + m.id) >= 0
	})

	calc_money()

	if (e.detail.value.length == draw_good_info.value.length) {
		checkedAll.value = true
	} else {
		checkedAll.value = ""
	}
}
//改变全选框状态
function checkboxAll(e) {
	console.log('全选', e);

	var has_no_checked = !!draw_good_info.value.find(m => {
		return !m.checked
	})

	draw_good_info.value.forEach(m => {
		m.checked = has_no_checked
	})

	calc_money()

}
function no_add() {
	// this.selectComponent("#toastDialog").showDialog({
	// 	content: '退款数量不能超过用户下单数量', //可传入提示的内容
	// 	icon: 'https://saas.jizhongkeji.com/static/jzkj/images/gantan.png', //可传入自定义的图片路径，优先级大于icon
	// })
	uni.showToast({
		title: '退款数量不能超过用户下单数量',
		icon: 'none',
		mask: true
	})
}
function add_drawback(item) {
	// var item = e.currentTarget.dataset.item
	if (item.draw_diff_show < item.count - item.drawback_count - item.drawback_count_ing) {
		draw_good_info.value.find(m => {
			return m.id == item.id
		}).draw_diff_show++
		calc_money()
	}

}
//减少退款数量
function reduce_drawback(item) {
	// var item = e.currentTarget.dataset.item

	if (item.draw_diff_show > 0) {
		draw_good_info.value.find(m => {
			return m.id == item.id
		}).draw_diff_show--
		calc_money()
	}
}
function change_reason(e) {
	// console.log('00000000000000');
	console.log(e);
	reason_id.value = e.detail.value
}
async function drawback() {
	var backlist = draw_good_info.value.filter(m => {
		return m.draw_diff_show > 0 && m.checked
	}).map(m => {
		return {
			id: m.id,
			count: m.draw_diff_show
		}
	})

	let res = await request('/WxAppCustomer/change_drawback_count', 'post', {
		order_goods_id: order_id.value,
		drawback_count_json: JSON.stringify(backlist),
		reason_id: reason_id.value
	})
	if (res.code == 1) {
		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true
		})
		return
	}
	if (res.code == 0) {
		uni.redirectTo({
			url: '/pages/mine/refund_result',
		})
	}
}
</script>

<style>
.first_wrap {
	background-color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding: 0rpx 22rpx 0rpx 22rpx;
}

.first_wrap .way {
	font-size: 25rpx;
	margin-top: 28rpx;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}

.first_wrap .image {
	width: 690rpx;
	margin: 0 auto;
	margin-top: 28rpx;
	border-radius: 14rpx 14rpx 14rpx 14rpx;
}

.first_wrap .way .img {
	width: 17rpx;
	height: 29rpx;
	margin-left: 200rpx;
}

.btn_fahuo {
	position: fixed;
	bottom: 0rpx;
	width: 100%;
	padding: 25rpx 0rpx;
	background-color: #fff;
	text-align: center;
	z-index: 99;
}

.btn_fahuo .btn {
	width: 680rpx;
	height: 74rpx;
	background: #FF4F26;
	margin: 0 auto;
	border-radius: 14rpx 14rpx 14rpx 14rpx;
	border: 1rpx solid #FF4F26;
	font-size: 31rpx;
	color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
}

/* 图片 */
.add_image {
	display: flex;
	flex-wrap: wrap;
	margin-top: 30rpx;
}

.add_image1 {
	width: 154rpx;
	height: 154rpx;
	border: 2rpx dashed;
	display: flex;
	justify-content: center;
	align-items: center;
}

.tutu {
	width: 154rpx;
	height: 154rpx;
	position: relative;
	margin-right: 22rpx;
}

/* .tutu:last-child {
    margin-top: 30rpx;
} */

.shangju {
	margin-top: 0rpx;
}

.wrong {
	width: 15px;
	height: 15px;
	position: absolute;
	right: -16rpx;
	top: -17rpx;
}

picker {
	width: 80%;

}

picker view {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

picker view image {
	width: 18rpx;
	height: 10rpx;
	flex: none;
}

picker .picker_val {
	font-size: 25rpx;
	font-weight: 400;
	color: #1D1D1D;
	white-space: normal;
	word-break: break-all;
	flex: unset;
}

picker .picker_val.active {
	color: #212121;
}

/* 发货页面 */
.tu_img {
	width: 100%;
	padding-top: 160rpx;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.tu_img image {
	width: 120rpx;
	height: 120rpx;
}

.tu_img text {
	margin-top: 30rpx;
	color: #313131;
	font-size: 33rpx;
	font-weight: bold;
}

.btn_blue {
	margin-top: 580rpx;
	width: 375rpx;
	height: 74rpx;
	background-color: #FF4F26;
	border-radius: 14rpx;
	border: 1rpx solid #FF4F26;
	display: flex;
	justify-content: center;
	align-items: center;
}

.tu_img .btn_blue text {
	margin-top: 0rpx;
	color: #fff;
	font-size: 31rpx;
}

.btn_mod {
	position: fixed;
	bottom: 0rpx;
	width: 100%;
	padding: 25rpx 0rpx;
	background-color: #fff;
	text-align: center;
}

.btn_mod .btn {
	width: 680rpx;
	height: 74rpx;
	background: #FF4F26;
	margin: 0 auto;
	border-radius: 14rpx 14rpx 14rpx 14rpx;
	border: 1rpx solid #FF4F26;
	font-size: 31rpx;
	color: #ffffff;
	display: flex;
	justify-content: center;
	align-items: center;
}


.good_check {
	height: 38rpx;
	margin-right: 24rpx;
	width: 38rpx;
}

.choose_all,
.price_totall,
.sub_btn {
	font-size: 30rpx;
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
	height: 60vh;
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
	/* padding-bottom: 150rpx; */
}

.new_layout {
	box-sizing: border-box;
	/* background-color: #F8F9FA; */
	/* height: 100vh; */
	width: 100vw;
	box-sizing: border-box;
	padding: 30rpx 10rpx;
	padding-top: 10rpx;
	padding-bottom: 40rpx;
}

.good_img {
	flex: none;
	height: 160rpx;
	margin-right: 22rpx;
	width: 160rpx;
	border-radius: 10rpx;
}

.flex_row_space_bt {
	background-color: #ffffff;
	margin-top: 30rpx;
	padding: 30rpx 16rpx;
	width: 100%;
	box-sizing: border-box;
	border-radius: 14rpx;
}

.jiajian {
	display: flex;
	justify-content: space-between;
}

.name_price .name {
	width: 90%;
}


/* 重写 checkbox 样式 */
/* 未选中的 背景样式 */
checkbox .wx-checkbox-input {
	border-radius: 50%;
	/* 圆角 */
	width: 39rpx;
	/* 背景的宽 */
	height: 39rpx;
	/* 背景的高 */
}

/* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */
checkbox .wx-checkbox-input.wx-checkbox-input-checked {
	border: 1rpx solid #FF4F26;
	background: #FF4F26;
}

/* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */
checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
	border-radius: 50%;
	/* 圆角 */
	width: 39rpx;
	/* 选中后对勾大小，不要超过背景的尺寸 */
	height: 39rpx;
	/* 选中后对勾大小，不要超过背景的尺寸 */
	line-height: 39rpx;
	text-align: center;
	font-size: 39rpx;
	/* 对勾大小 30rpx */
	color: #fff;
	/* 对勾颜色 白色 */
	background: transparent;
	transform: translate(-50%, -50%) scale(1);
	-webkit-transform: translate(-50%, -50%) scale(1);
}

.price_all_v {
	color: #FC4740;
	font-size: 32rpx;
}

.sub_btn {
	width: 120rpx;
	height: 60rpx;
	background: #FF4F26;
	border-radius: 40rpx;
	line-height: 60rpx;
	text-align: center;
	color: #ffffff;
}

.picker_w {
	/* width: 100%; */
	/* box-sizing: border-box; */
	padding: 0 16rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	height: 92rpx;
	background-color: #ffffff;
	margin: 0 10rpx;
	box-sizing: border-box;
	border-radius: 14rpx;
}


page {
	background-color: #F0F0F0;
	padding-top: 0;
}

/* 搜索栏 */
.search_box {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	background-color: #FFFFFF;
	box-sizing: border-box;
	/* padding: 0rpx 30rpx; */
	width: 100%;
	height: 100%;
}

.tu_1 {
	flex: none;
	padding-left: 15rpx;
	width: 50rpx;
	height: 50rpx;
}

.search_box text {
	flex: none;
	color: #000000;
	font-size: 31rpx;
	/* max-width: max-content; */
}

.search_input_box {
	position: relative;
	box-sizing: border-box;
	width: 100%;
}

.search_input {
	box-sizing: border-box;
	background-color: #EFEFEF;
	border-radius: 30rpx;
	height: 60rpx;
	margin-left: 20rpx;
	padding: 0rpx 10rpx;
	font-size: 28rpx;
	text-align: center;
	width: 280rpx;
}

.search_icon {
	position: absolute;
	top: calc(50% - 14rpx);
	left: 60rpx;
	height: 24rpx;
	width: 24rpx;
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
	position: fixed;
	width: 100%;
	height: 90rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 0 29rpx;
	background-color: #fff;
}

.nav_area view {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 4rpx solid transparent;

}

.price_all {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-size: 28rpx;
	color: #4D4D4D;
	padding-bottom: 20rpx;
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
	padding: 0 29rpx;
	padding-top: 110rpx;
	padding-bottom: 10rpx;
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
	font-size: 24rpx;
	width: 100%;
	justify-content: space-between;
	display: flex;
	align-items: center;
	margin-bottom: 35rpx;
}

.order_item .date_state text {
	color: #989898;
	margin-right: 10rpx;
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

.date_state_right {
	display: flex;
	align-items: center;
}

.date_state_left {
	display: flex;
	align-items: center;
}

.date_state_left image {
	width: 30rpx;
	height: 50rpx;
	margin-right: 10rpx;
}

.date_state_left text {
	font-size: 26rpx;
	font-weight: 500;
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
	width: 150rpx;
	height: 58rpx;
	border-radius: 29rpx;
	border: 1rpx solid rgba(92, 92, 92, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 28rpx;
	font-weight: 400;
	color: #5C5C5C;
	margin-right: 22rpx;
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

/* 搜索栏 */
.top {
	position: sticky;
	left: 0;
	top: 0;
	background-color: #F7F7F7;
	height: 126rpx;
}

.search {
	display: flex;
	margin: 0 30rpx;
	justify-content: space-between;
	margin-top: 30rpx;
	position: fixed;
	padding-bottom: 20rpx;
}

.search_item1 {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #EBEBEB;
	padding: 10rpx 20rpx;
	border-radius: 40rpx;
}

.search_item2 {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
