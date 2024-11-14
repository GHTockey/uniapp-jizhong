<template>
	<view class="distribution_container" v-if="is_loading"
		style="background-image: linear-gradient(to bottom, #FF1B22, #ffffff);">
		<!-- 高度占位 -->
		<HeightBar appendNavBar />
		<!-- 标题栏 -->
		<NavBar showBack isWhite bgc="transparent">
			<template #title>
				<text class="text-white">分销中心</text>
			</template>
		</NavBar>

		<!-- 用户信息 -->
		<view class="user_info">
			<view class="user_info_deng">
				<image lazy-load
					:src="user.wx_image ? user.wx_image : 'https://saas.jizhongkeji.com/static/jzkj/images/default_tou.png'"
					mode="widthFix" />
				<!-- <text wx:if="{{!user.user_name}}">设置个人资料</text> -->
				<view class="info" v-if="user.user_name">
					<text>{{ user.user_name }}</text>

					<view style="display: flex;justify-content: space-between;align-items: center;">
						<text class="phone">{{ user.phone }}</text>
						<view class="phone" @click="to_promot">推广规则</view>
					</view>

				</view>
			</view>
		</view>

		<!-- 分销订单/总佣金/团队人数 -->
		<view class="box_list">
			<view class="item1 item_one">
				<view class="title_text" @click="to_distribution_order_list">
					<view>分销订单(笔)</view>
					<view class="height_mar">{{ order_count }}</view>
				</view>
				<view class="title_text" @click="to_distribution_order_list">
					<view>总佣金(元)</view>
					<view class="height_mar">{{ user.distribution_money_all }}</view>
				</view>
				<view class="title_text" @click="to_team">
					<view>团队人数(个)</view>
					<view class="height_mar">{{ person_count }}</view>
				</view>
			</view>
		</view>

		<!-- 可提现/待结算/已提现 -->
		<view class="box_list">
			<view class="box_list_two">
				<view class="item1_three">
					<view class="title_text_no">
						<view>可提现(元)</view>
						<view class="height_mar" style="color:#FF4F26">{{ can_cash_money }}</view>
					</view>
					<view style="display: flex;align-items: center;" @click="to_withdraw_list">
						<view style="color: #6E6E6E;">提现记录</view>
						<image style="width: 14rpx;height: 21rpx;margin-left: 13rpx;"
							src="https://saas.jizhongkeji.com/static/jzkj/images/arrow_right.png"></image>
					</view>
				</view>

				<view class="item1_three item1_four">
					<view class="title_text_no">
						<view>待结算</view>
						<view class="height_mar_nomal">{{ order_money_ing }}</view>
					</view>
					<view class="title_text_no" style="align-items: center;">
						<view>提现中</view>
						<view class="height_mar_nomal">{{ user.cash_money }}</view>
					</view>
					<view class="title_text_no" style="align-items: flex-end;">
						<view>已提现</view>
						<view class="height_mar_nomal">{{ user.withdraw_money }}</view>
					</view>
				</view>

				<view class="item1_five">
					<view class="shenqing" @click="to_withdraw_apply">申请提现</view>
				</view>
			</view>


		</view>

		<!-- 常用工具 -->
		<view class="box_list">
			<view class="box_list_two">
				<view class="tool">常用工具</view>

				<view class="tool_box_list">
					<view class="tool_item" @click="to_withdraw_list">
						<image class="promotion_img"
							src="https://saas.jizhongkeji.com/static/jzkj/images/promotion_img1.png">
						</image>
						<view class="text_tips">
							<view>提现明细</view>
							<view class="small">待入账(元)</view>
						</view>
					</view>
					<view class="tool_item" @click="to_distribution_order_list">
						<image class="promotion_img"
							src="https://saas.jizhongkeji.com/static/jzkj/images/promotion_img2.png">
						</image>
						<view class="text_tips">
							<view>分销订单</view>
							<view class="small">待入账(元)</view>
						</view>
					</view>
					<view class="tool_item">
						<image class="promotion_img"
							src="https://saas.jizhongkeji.com/static/jzkj/images/promotion_img3.png">
						</image>
						<view class="text_tips">
							<view>邀请好友*</view>
							<view class="small">邀请好友赚好礼</view>
						</view>
					</view>

					<view class="tool_item" @click="to_dis_goods">
						<image class="promotion_img"
							src="https://saas.jizhongkeji.com/static/jzkj/images/promotion_img4.png">
						</image>
						<view class="text_tips">
							<view>分销商品</view>
							<view class="small">查看可分销商品</view>
						</view>
					</view>

					<view class="tool_item">
						<image class="promotion_img"
							src="https://saas.jizhongkeji.com/static/jzkj/images/promotion_img5.png">
						</image>
						<view class="text_tips">
							<view>佣金排行*</view>
							<view class="small">您排名第{{ user_paiming }}位</view>
						</view>
					</view>

				</view>
			</view>


		</view>

		<view style="height: 100rpx;"></view>

	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow, onPageScroll } from '@dcloudio/uni-app';
import { useTempStore } from '@/stores/temp.js'
import { storeToRefs } from 'pinia';
import { request } from '@/utils/request.js'

const { user, business } = storeToRefs(useTempStore())

const has_bar_title_color = ref('unset');
const is_loading = ref(false);
const order_count = ref(0);
const order_money = ref(0);
const order_money_ing = ref(0);
const can_cash_money = ref(0);
const user_paiming = ref('暂无');
const tixian_tc = ref(false);
const person_count = ref(0);


onShow(() => {
	// console.log('onShow');

	distribution_center_data()
})
//监听用户滑动页面事件
onPageScroll(e => {
	// console.log('页面滚动', e.scrollTop);
	// 页面像下滚动了
	if (e.scrollTop > 50) {
		// 让页面标题有白色背景
		has_bar_title_color.value = '#FF1B21'
	} else {
		// 让页面标题去掉白色背景
		has_bar_title_color.value = 'unset'
	}
})



function to_dis_goods() {
	uni.navigateTo({
		url: '/pages/mine/distribute_goods',
	})
}
function to_promot() {
	uni.navigateTo({
		url: '/pages/mine/promot',
	})
}
function to_team() {
	uni.navigateTo({
		url: '/pages/mine/team',
	})
}

// 提现列表
function to_withdraw_list() {
	uni.navigateTo({
		url: '/pages/mine/withdraw_list',
	})
}
function open_tixian_tc() {
	tixian_tc.value = true;
}
function close_tixian_tc() {
	tixian_tc.value = false;
}

async function distribution_center_data() {

	let res = await request('/WxAppCustomer/distribution_center_data', 'post', {})
	// 更新数据
	if (res.code == 0) {
		// that.setData({
		// 	order_count: res.data.data.order_count,
		// 	// order_money: res.data.data.order_money,
		// 	order_money_ing: res.data.data.order_money_ing,
		// 	can_cash_money: res.data.data.can_cash_money,
		// 	user_paiming: res.data.data.user_paiming,
		// 	person_count: res.data.data.person_count,
		// 	is_loading: true
		// })

		order_count.value = res.data.order_count
		// order_money_ing.value = res.data.order_money_ing
		can_cash_money.value = res.data.can_cash_money
		user_paiming.value = res.data.user_paiming
		person_count.value = res.data.person_count
		is_loading.value = true

		uni.hideLoading();
	} else {
		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true
		})
	}
}
/**
 * 分销订单
 */
function to_distribution_order_list() {
	uni.navigateTo({
		url: '/pages/mine/distribution_order_list',
	})
}

/**
 * 申请提现
 */
function to_withdraw_apply() {
	uni.navigateTo({
		url: '/pages/mine/withdraw',
	})
}

</script>

<style scoped>
page {
	padding: 0;
	margin: 0;
}

.user_info {
	width: 100%;
	box-sizing: border-box;
	padding: 0 33rpx;
	margin-top: 50rpx;
}

.info {
	display: flex;
	flex-direction: column;
	justify-content: center;
	font-size: 32rpx;
	font-weight: 400;
	color: #FFFFFF;
	width: 80%;
}

.info .phone {
	font-size: 24rpx;
	font-weight: normal;
	color: #FFA3B0;
	margin-top: 10rpx;
}

.user_info_deng {
	display: flex;
	align-items: center;
}

.user_info_deng image {
	width: 111rpx;
	height: 111rpx;
	margin-right: 28rpx;
	border-radius: 50%;
}

.user_info_deng text {
	font-size: 32rpx;
	font-weight: 400;
	color: #FFFFFF;
}

.box_list {
	padding: 0 33rpx;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}

.box_list .item1 {
	width: 100%;
	box-sizing: border-box;
	padding-left: 33rpx;
	padding-right: 33rpx;
	background-color: #ffffff;
	margin-top: 30rpx;
	border-radius: 22rpx;
}

.box_list .item_one {
	padding-top: 28rpx;
	padding-bottom: 28rpx;
	font-size: 25rpx;
	font-weight: 400;
	color: #181818;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.box_list_two {
	width: 100%;
	box-sizing: border-box;
	padding-left: 33rpx;
	padding-right: 33rpx;
	background-color: #ffffff;
	margin-top: 30rpx;
	border-radius: 22rpx;
	padding-top: 28rpx;
	padding-bottom: 28rpx;
	font-size: 25rpx;
	font-weight: 400;
	color: #181818;
	display: flex;
	flex-direction: column;
}

.title_text {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.title_text_no {
	display: flex;
	flex-direction: column;
}

.height_mar {
	margin-top: 20rpx;
	font-size: 46rpx;
	font-weight: bold;
	color: #000000;
}

.item1_three {
	align-items: baseline;
	display: flex;
	justify-content: space-between;
	padding: 0;
	width: 100%;
	box-sizing: border-box;
}

.item1_four {
	margin-top: 28rpx;
}

.height_mar_nomal {
	font-size: 32rpx;
	font-weight: 400;
	color: #000000;
	margin-top: 20rpx;
}

.item1_five {
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
}

.shenqing {
	width: 592rpx;
	height: 81rpx;
	background: linear-gradient(89deg, #FF3981 0%, #FF1E1A 100%);
	border-radius: 41rpx 41rpx 41rpx 41rpx;
	opacity: 0.9;
	font-size: 29rpx;
	font-weight: 400;
	color: #FFFFFF;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 66rpx;
}

.tool {
	font-size: 31rpx;
	font-weight: bold;
	color: #181818;
}

.tool_box_list {
	display: flex;
	flex-wrap: wrap;
}

.tool_item {
	display: flex;
	align-items: center;
	margin-top: 42rpx;
	width: 58%;
}

.tool_box_list .tool_item:nth-child(2n) {
	width: 42%;
}

.promotion_img {
	width: 69rpx;
	height: 69rpx;
	margin-right: 17rpx;
}

.text_tips {
	display: flex;
	flex-direction: column;
	font-size: 28rpx;
	font-weight: bold;
	color: #181818;
}

.text_tips .small {
	font-size: 24rpx;
	font-weight: 400;
	color: #ADADAD;
}


.form_box {
	margin: 0 100rpx;
	box-sizing: border-box;
	padding: 64rpx 40rpx 64rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 17.44rpx;
	background: #ffffff;
	position: relative;
	z-index: 99;
	top: 300rpx;
	margin-top: 153rpx;
}

.welcome_text {
	/** 文本1 */
	font-size: 31.4rpx;
	font-weight: 700;
	color: rgba(0, 0, 0, 1);
	text-align: center;
	width: 100%;
	margin-bottom: 40rpx;
}


button {
	margin: 0 !important;
	padding: 0 !important;
	width: 100rpx;
	height: 100rpx;
}

button::after {
	border: none;
}

button.choose_avatar_btn:not([size=mini]) {
	box-sizing: border-box;
	background-color: transparent;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 0;
	margin: 0;
	line-height: unset;
	width: 124rpx;
	height: 124rpx;
	/* border: none; */
	/* border: 2rpx solid #807b7b; */
	border-radius: 50%;
	overflow: hidden;
}

.input_box {
	/** 文本1 */
	font-size: 27.91rpx;
	font-weight: 400;
	letter-spacing: 0rpx;
	color: rgba(0, 0, 0, 1);
	display: flex;
	align-items: center;
	width: 100%;
	height: 78rpx;
	background-color: #ffffff;
	margin-top: 22rpx;
	justify-content: center;
	border: 1rpx solid #E5E5E5
}

.nickname_placeholder {
	color: rgba(128, 128, 128, 1);
}

.input_box_mar {
	margin-bottom: 60rpx;
}

input {
	width: 95%;
	/* margin-left: 10rpx; */
}

.bottom_text {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 80rpx;
	z-index: 9;
	font-size: 28rpx;
	color: rgba(225, 240, 0, 1);
}

.mask {
	position: fixed;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 999;
}
</style>

<style scoped lang="scss">
.distribution_container {
	min-height: 100vh;
}
</style>
