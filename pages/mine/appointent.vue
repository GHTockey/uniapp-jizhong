<template>

	<HeightBar appendNavBar />
	<NavBar showBack :showSearch="type == 2" searchPlaceholder="输入关键词"
		:searchPath="`/pages/mine/apply_search?type=${type}`">
		<template #title>
			<text style="white-space: nowrap; margin-right: 30rpx;">{{ type == 2 ? '预约管理' : '我的预约' }}</text>
		</template>
	</NavBar>

	<view v-if="is_loading" class="appointent_page">
		<view class="nav_list" :style="{ position: 'sticky', top: statusBarHeight + 40 + 'px' }">
			<view class="category_item" @click="change_nav" :data-nav_index="index" :key="index"
				v-for="item, index in caretory_list">
				<view :class="`${nav_index == index ? 'nav_item active_nav' : 'nav_item'}`">
					{{ item.name }}
				</view>
			</view>
		</view>

		<view class="content_list" v-if="appointent_list.length > 0">
			<view class="context_box" v-for="item in appointent_list" :key="item.id">
				<view class="container_box">
					<view class="hang1" style="flex-direction: unset;">
						<view class="left"><text
								style="color: #383838;font-size: 29rpx;font-weight: bold;">预约单号：</text>{{
									item.number }}
						</view>
						<view class="right" v-if="item.stat == 1">待核销</view>
						<view class="right" v-if="item.stat == 2">已核销</view>
						<view class="right" v-if="item.stat == 3">已取消</view>
					</view>
					<view class="hang1" style="padding:0">
						<view class="left"><text
								style="color: #383838;font-size: 29rpx;font-weight: bold;">预约时间：</text>{{
									item.shop_time }}
						</view>
					</view>

					<view class="product_item_v company_box" style="padding:25rpx 0;padding-top:15rpx">
						<view class="hang11">
							<view style="display: flex;align-items: center;">
								<view class="shop_name_text" style="color: #383838;">{{ item.shop_name }}</view>
								<image v-if="item.is_open == 1" class="yingye"
									src="https://saas.jizhongkeji.com/static/jzkj/images/yingye.png"></image>
								<image v-else class="yingye"
									src="https://saas.jizhongkeji.com/static/jzkj/images/xiuxi.png"></image>
							</view>
							<view class="daohang_box">
								<image @click="to_address" :data-address="item" class="daohang"
									src="https://saas.jizhongkeji.com/static/jzkj/images/daohang.png"></image>
								<image @click="makePhoneCall(item.phone)" class="daohang"
									src="https://saas.jizhongkeji.com/static/jzkj/images/phone_img.png"></image>
							</view>
						</view>

						<image
							style="width: 100%;height: 238rpx;border-radius:14rpx;flex: none;margin-top: 20rpx;margin-bottom: 10rpx;"
							lazy-load :src="item.image_uris_arr[0]" mode="widthFix" />
						<view class="hang22" style="margin-top:10rpx;margin-bottom: 10rpx;">
							<image class="address_company"
								src="https://saas.jizhongkeji.com/static/jzkj/images/address_company.png"></image>

							<view>{{ item.address_name }}</view>
						</view>
						<view class="hang22" style="margin-top:0rpx;margin-bottom: 10rpx;">
							<image class="address_company" mode="widthFix"
								src="https://saas.jizhongkeji.com/static/jzkj/images/time.png"></image>
							<view>{{ item.start_time }}-{{ item.end_time }}</view>
						</view>
					</view>

					<view class="hang3" style="border-bottom: 0;">
						<view class="right">
							<view>您的姓名：{{ item.user_name }}</view>
							<view style="margin-top:20rpx">手机号码：{{ item.phone }}</view>
							<view style="margin-top:20rpx">预约时间：{{ item.shop_time }}</view>
							<view style="margin-top:20rpx">编号：{{ item.number }}</view>
							<view style="margin-top:20rpx">用餐人数：{{ item.shop_count }}</view>
							<view style="margin-top:20rpx;line-height: 1.5;" v-if="item.reason">
								取消原因：{{ item.reason }}
							</view>
						</view>

						<view v-if="item.stat == 1" class="right"
							style="margin:0;margin-left:28rpx;align-items: center;">
							<image @click="open_img(item.qrcode_trial)" class="left" style="margin:0;" mode="widthFix"
								:src="item.qrcode_trial"></image>
							<view>核销码{{ item.qrcode_number }}</view>
							<view></view>
						</view>
					</view>

					<view class="hang3" style="border-bottom: 0;" v-if="type == 2">
						<!-- 联系客户 -->
						<!-- <image @click="makePhoneCall(item.phone)" class="lianxi6" mode="widthFix"
							src="https://saas.jizhongkeji.com/static/jzkj/images/lianxi1.png"></image> -->
						<view @click="makePhoneCall(item.phone)" style="border: 3rpx solid #08c160;"
							class="rounded-[50rpx] px-3 text-[#08c160] text-[30rpx] flex items-center">
							<text>联系客户</text>
						</view>

						<!-- 修改预约 -->
						<view @click="open_show_tc" v-if="item.stat == 1" :data-itemdetail="item"
							style="border: 3rpx solid #08c160;"
							class="rounded-[50rpx] px-3 text-[#08c160] text-[30rpx] flex items-center">
							<text>修改预约1</text>
						</view>
						<view v-if="item.stat != 1" style="border: 3rpx solid gainsboro;"
							class="rounded-[50rpx] px-3 text-[#999999] text-[30rpx] flex items-center">
							<text>修改预约</text>
						</view>
						<!-- <image @click="open_show_tc" :data-itemdetail="item" mode="widthFix"
							src="https://saas.jizhongkeji.com/static/jzkj/images/lianxi2.png"></image> -->
						<!-- <image class="lianxi6" style="opacity: 0;" v-if="item.stat != 1" mode="widthFix"
							src="https://saas.jizhongkeji.com/static/jzkj/images/lianxi2.png"></image> -->

						<!-- 取消预约 -->
						<view @click="cancel_target" v-if="item.stat == 1" :data-targetid="item.id"
							style="border: 3rpx solid #08c160;"
							class="rounded-[50rpx] px-3 text-[#08c160] text-[30rpx] flex items-center">
							<text>取消预约</text>
						</view>
						<view v-if="item.stat != 1" style="border: 3rpx solid gainsboro;"
							class="rounded-[50rpx] px-3 text-[#999999] text-[30rpx] flex items-center">
							<text>取消预约</text>
						</view>
						<!-- <image class="lianxi6" v-if="item.stat == 1" @click="cancel_target" :data-targetid="item.id"
							mode="widthFix" src="https://saas.jizhongkeji.com/static/jzkj/images/lianxi3.png"></image>
						<image class="lianxi6" style="opacity: 0;" v-if="item.stat != 1" mode="widthFix"
							src="https://saas.jizhongkeji.com/static/jzkj/images/lianxi3.png"></image> -->
					</view>


				</view>
			</view>
		</view>

		<view class="kong" v-if="appointent_list.length <= 0">
			<image lazy-load src="https://saas.jizhongkeji.com/static/jzkj/images/kong.png" mode="widthFix" />
			<text>暂无数据</text>
		</view>

		<!-- 填写报名信息 -->
		<view class="tc_baoming" style="z-index: 999;" v-if="show_tc">
			<form @submit="apply_shop" style="position: relative;">
				<view class="context">
					<view class="tips">修改预约信息</view>
					<view class="close" @click="close_show_tc">
						<image style="width: 40rpx;height: 40rpx;"
							src="https://saas.jizhongkeji.com/static/jzkj/images/close_pop_icon.png"></image>
					</view>
					<view class="input_item">
						<view class="left">您的姓名</view>
						<view class="input">
							<input placeholder-class="placeholder-style"
								:value="shop_detail && shop_detail.user_name ? shop_detail.user_name : ''" type="text"
								name="user_name" placeholder="请输入您的姓名" />
						</view>
					</view>
					<view class="input_item">
						<view class="left">手机号码</view>
						<view class="input">
							<input :value="shop_detail && shop_detail.phone ? shop_detail.phone : ''"
								placeholder-class="placeholder-style" type="text" name="phone" placeholder="输入您的手机号码" />
						</view>
					</view>
					<view class="input_item">
						<view class="left">用餐时间</view>
						<view class="input">
							<PickerSelector style="width: 100%;" mode="date" name="shop_time"
								:start="new Date().toISOString().split('T')[0]"
								:value="shop_detail && shop_detail.shop_time_v ? shop_detail.shop_time_v : ''"
								placeholder="请选择用餐时间" placeholder-class="placeholder-style"
								@change="picker_selector_change($event, 'shop_time')" />
						</view>
					</view>
					<view class="input_item">
						<view class="left">用餐人数</view>
						<view class="input">
							<input placeholder-class="placeholder-style"
								:value="shop_detail && shop_detail.shop_count ? shop_detail.shop_count : ''"
								type="number" name="shop_count" placeholder="输入您的用餐人数" />
						</view>
					</view>

					<view style="display: flex;justify-content: center;width:100%;">
						<button
							style="width: 85%;background: linear-gradient(159deg, #07C160 0%, #00A44E 100%);height: 83rpx;border-radius: 50rpx;display: flex;align-items: center;justify-content: center;font-weight: 400;font-size: 33rpx;color: #FFFFFF;"
							form-type="submit" class="form_buttom">立即修改</button>
					</view>
				</view>
			</form>

		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { request } from '@/utils/request';
import { onLoad, onShow, onReachBottom } from '@dcloudio/uni-app';
import { getStatusBarHeight, getTitleBarWidth } from '@/utils';

const boundingWidth = ref(getTitleBarWidth());
const statusBarHeight = ref(getStatusBarHeight());

const type = ref(1);
const caretory_list = ref([
	{ 'id': 0, 'name': '全部', },
	{ 'id': 1, 'name': '待核销', },
	{ 'id': 2, 'name': '已核销', },
	{ 'id': 3, 'name': '已取消' }
]);
const nav_index = ref(0);
const appointent_list = ref([]);
const load = ref(0);
const stat = ref(0);
const show_tc = ref(false);
const shop_detail = ref({});
const appointent_count = ref();
const is_loading = ref(false);

const search_str = ref('');
const picker_selector_data = ref({});

onLoad(options => {
	if (options && options.type) {
		type.value = options.type
	}
	appointent_list_data();
})
onShow(() => {
	search_str.value = null;
})
onReachBottom(() => {
	if (appointent_count.value > appointent_list.value.length) {
		appointent_list_data(appointent_list.value.length)
	}
})


function picker_selector_change(e, colName) {
	// console.log(e, colName);
	picker_selector_data.value[colName] = e.value;
}

function close_show_tc() {
	// this.setData({
	// 	show_tc: false,
	// })
	show_tc.value = false;
}
function open_show_tc(itemdetail) {
	// this.setData({
	// 	show_tc: true,
	// 	shop_detail: e.currentTarget.dataset.itemdetail
	// })
	show_tc.value = true;
	shop_detail.value = itemdetail;
}
function back() {
	// wx.navigateBack({
	//   delta: 1,
	// })
	uni.navigateBack()
}

function open_img(img) {
	// var img = e.currentTarget.dataset.qrcodetrial
	console.log(img);
	img = img.split(',')
	uni.previewImage({
		current: img, // 当前显示图片的为数组的第一张
		urls: img // 需要预览的图片http链接列表
	})
}
// 导航
function to_address(e) {
	var address = e.currentTarget.dataset.address.address.split(",")
	var latitude = address[0];
	var longitude = address[1];
	var name = e.currentTarget.dataset.address.shop_name;

	var address = e.currentTarget.dataset.address.address_detail;
	console.log('address11----', e.currentTarget.dataset.address.address, name);
	console.log('位精度', latitude, longitude);
	uni.openLocation({
		longitude: parseFloat(longitude),
		latitude: parseFloat(latitude),
		name: name,
		address: address
	})

}
// 打电话
function makePhoneCall(phone) {
	// var phone = e.currentTarget.dataset.userphone
	console.log(phone);
	uni.makePhoneCall({
		phoneNumber: phone,
	})
}

async function appointent_list_data(length) {
	// var that = this
	// var appointent_list = that.data.appointent_list
	if (load.value == 1) {
		return
	}
	load.value = 1

	try {
		let res = await request('/WxAppCustomer/appointent_list', 'post', {
			stat: stat.value || 0,
			offset: length || 0,
			type: type.value,
		})
		// 更新数据
		if (res.code == 0) {
			if (length) {
				appointent_list.value.push.apply(appointent_list.value, res.data.appointent_list)
			} else {
				appointent_list.value = res.data.appointent_list
			}
			uni.hideLoading();
			appointent_count.value = res.data.appointent_count

			// that.setData({
			// 	appointent_list: appointent_list,
			// 	appointent_count: appointent_count,
			// 	is_loading: true
			// });
			load.value = 0
			is_loading.value = true
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
	}
}

function cancel_target(e) {
	uni.showModal({
		title: '系统提示',
		content: '确定要取消吗？',
		complete: async (res) => {
			if (res.cancel) { }
			if (res.confirm) {
				let reqRes = await request('/WxAppCustomer/cancel_target', 'post', { apply_id: e.currentTarget.dataset.targetid })
				// 更新数据
				if (reqRes.code == 0) {
					uni.showToast({
						title: '已取消',
						icon: 'none',
						mask: true
					})
					appointent_list.value = [];
					appointent_count.value = 0;
					appointent_list_data()
				} else {
					uni.showToast({
						title: reqRes.msg,
						icon: 'none',
						mask: true
					})
				}
			}
		}
	})
}

function change_nav(e) {
	nav_index.value = e.currentTarget.dataset.nav_index

	// this.setData({
	// 	nav_index: e.currentTarget.dataset.nav_index,
	// 	stat: this.data.caretory_list[this.data.nav_index].id,
	// })

	stat.value = caretory_list.value[nav_index.value].id
	console.log('stat', stat.value);
	appointent_list.value = [];
	appointent_count.value = 0;

	appointent_list_data()
}

async function apply_shop(e) {
	// var that = this;
	try {

		// console.log('picker_selector_data', picker_selector_data.value);
		// console.log('e.detail.value', e.detail.value);
		// return

		let res = await request('/WxAppCustomer/edit_apply', 'post', {
			apply_id: shop_detail.value.id,
			shop_id: shop_detail.value.shop_id,
			user_name: e.detail.value.user_name || '',
			phone: e.detail.value.phone || '',
			// shop_time: e.detail.value.shop_time || '',
			shop_time: picker_selector_data.value['shop_time'] || '',
			shop_count: e.detail.value.shop_count || '',
		})
		// 更新数据
		if (res.code == 0) {
			uni.showToast({
				title: '修改成功',
				icon: 'none',
				mask: true
			})
			appointent_list.value = [];
			appointent_count.value = 0;
			appointent_list_data()
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
	}
}

function to_search(e) {
	search_str.value = e.detail.value
	console.log('search_str', search_str.value);
	if (!search_str.value || search_str.value == '') {
		uni.showToast({
			title: '请输入关键词',
			icon: 'none'
		})
		return
	}
	uni.navigateTo({
		url: '/pages/mine/apply_search?search_str=' + search_str.value + '&type=' + type.value,
	})
}
function change_search_str(e) {
	if (e.detail.value.length == 0) {
		search_str.value = ''
	} else {
		search_str.value = e.detail.value
	}
}
</script>

<style scoped lang="scss">
// @import '/pages/index/apply_detail.wxss';
// @import '/pages/index/shop_detail.wxss';
@import '../../static/styles/apply_detailOld.css';
@import '../../static/styles/shop_detailOld.css';

page,
.appointent_page {
	background-color: #F5F5F5;
	padding: 0;
	min-height: calc(100vh - $nav-height);
}

.nav_list {
	width: 100%;
	height: 100rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	/* padding: 0 29rpx; */
	background-color: #fff;
	position: sticky;
	margin-bottom: 20rpx;
	top: 0;
	z-index: 100;
}

.nav_item {
	font-weight: 400;
	font-size: 29rpx;
	color: #4D4D4D;
	padding-bottom: 5rpx;
}

.active_nav {
	font-weight: bold;
	font-size: 29rpx;
	color: #09C161;
	font-weight: bold;
	font-size: 29rpx;
	color: #09C161;
	border-bottom: 4rpx solid #09C161;
	padding-bottom: 5rpx;
}

.hang1 {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	padding: 25rpx 0;
	font-weight: 400;
	font-size: 28rpx;
	color: #383838;
}

.hang1 .right {
	font-weight: 400;
	font-size: 28rpx;
	color: #09C161;
}

.hang4 {
	padding-top: 30rpx;
}

.context_box {
	margin-top: 30rpx;
}

.container_box {
	border-radius: 14rpx;
}

.content_list {
	padding-bottom: 100rpx;
}

.ganhan_box {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.ganhan_box .hang11 {
	width: 210rpx;
	height: 100rpx;
	border-radius: 14rpx 14rpx 14rpx 14rpx;
	border: 1rpx solid #7F7F7F;
	font-weight: 400;
	font-size: 21rpx;
	color: #7F7F7F;
	box-sizing: border-box;
	text-align: justify;
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-top: 20rpx;
}


.search_box {
	flex: none;
	background-color: #FFFFFF;
	box-sizing: border-box;
	/* padding: 0rpx 30rpx; */
	width: 100%;
	height: 100%;
	z-index: 9999;
}

.search_box_lable {
	flex: none;
	color: #000000;
	height: 60rpx;
	font-size: 31rpx;
	font-weight: bold;
	/* max-width: max-content; */
}

.search_input_box {
	position: relative;
	box-sizing: border-box;
	/* width: max-content; */
	width: 100%;
	display: flex;
	align-items: center;
	background-color: #EFEFEF;
	border-radius: 30rpx;
	padding: 0 20rpx;
	/* padding-right: 90rpx; */
}

.search_input {
	box-sizing: border-box;
	background-color: #EFEFEF;
	border-radius: 30rpx;
	height: 60rpx;
	padding: 0rpx 10rpx;
	font-size: 28rpx;
	/* text-align: center; */
	width: 100%;
	border-radius: 30rpx;
}

.search_icon {
	height: 24rpx;
	width: 24rpx;
}

.arrow_right_icon {
	height: 16rpx;
	margin-left: 16rpx;
	width: 8rpx;
}

.default_heihgt {
	border-bottom: 1rpx solid #EEEEEE;
	height: 20rpx;
	width: 100vw;
}

.content {
	flex: 1;
	box-sizing: border-box;
	overflow: hidden;
	width: 100%;
}

.lianxi6 {
	width: 166rpx;
	height: 55rpx;
}

.category_item {
	width: 25%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
