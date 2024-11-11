<template>
	<view>
		<!-- 搜索表单 -->
		<form>
			<view class="search_input_box">
				<image lazy-load class="search_icon" style="width: 30rpx;height: 30rpx;"
					src="https://saas.jizhongkeji.com/static/jzkj/images/search.png" mode="aspectFit" />

				<input hold-keyboard="true" class="search_input" confirm-type="search" type="text" placeholder="输入关键词"
					@input="change_search_str" name="search_str" placeholder-class="input_placeholder_class"
					@confirm="to_search" v-model="search_str" />

				<view class="sousuo" @click="to_search_v">搜索</view>
			</view>
		</form>

		<!-- 列表 -->
		<view class="content_list" v-if="appointent_list.length > 0">
			<view class="context_box" v-for="(item, index) in appointent_list" :key="index">
				<view class="container_box">
					<view class="hang1">
						<view class="left"><text
								style="color: #383838;font-size: 29rpx;font-weight: bold;">预约单号：</text>{{ item.number }}
						</view>
						<view class="right" v-if="item.stat == 1">待核销</view>
						<view class="right" v-if="item.stat == 2">已核销</view>
						<view class="right" v-if="item.stat == 3">已取消</view>
					</view>
					<view class="hang1" style="padding:0">
						<view class="left"><text
								style="color: #383838;font-size: 29rpx;font-weight: bold;">预约时间：</text>{{ item.shop_time
							}}
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
								<image @click="makePhoneCall(item.shop_phone)" class="daohang"
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
								取消原因：{{ item.reason }}</view>
						</view>

						<view class="right" style="margin:0;margin-left:28rpx;align-items: center;">
							<image @click="open_img(item.qrcode_trial)" class="left" style="margin:0;" mode="widthFix"
								:src="item.qrcode_trial"></image>
							<view>核销码{{ item.qrcode_number }}</view>
							<view></view>
						</view>
					</view>

					<view class="hang3" style="border-bottom: 0;" v-if="type == 2">
						<image @click="makePhoneCall(item.phone)" class="lianxi6" mode="widthFix"
							src="https://saas.jizhongkeji.com/static/jzkj/images/lianxi1.png"></image>

						<image @click="open_show_tc(item)" class="lianxi6" mode="widthFix"
							src="https://saas.jizhongkeji.com/static/jzkj/images/lianxi2.png"></image>
						<image class="lianxi6" style="opacity: 0;" v-if="item.stat != 1" mode="widthFix"
							src="https://saas.jizhongkeji.com/static/jzkj/images/lianxi2.png"></image>

						<image class="lianxi6" v-if="item.stat == 1" @click="cancel_target(item.id)" mode="widthFix"
							src="https://saas.jizhongkeji.com/static/jzkj/images/lianxi3.png"></image>
						<image class="lianxi6" style="opacity: 0;" v-if="item.stat != 1" mode="widthFix"
							src="https://saas.jizhongkeji.com/static/jzkj/images/lianxi3.png"></image>
					</view>
				</view>
			</view>
		</view>

		<!-- 空数据 -->
		<view class="kong_box" v-if="is_kong">
			<image class="kong_img" src="https://saas.jizhongkeji.com/static/jzkj/images/kong.png"></image>
			<view>换个搜索词试试</view>
		</view>

		<!-- 填写报名信息 -->
		<view class="tc_baoming" v-if="show_tc">
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
							<input placeholder-class="placeholder-style" v-model="shop_detail.user_name" type="text"
								name="user_name" placeholder="请输入您的姓名" />
						</view>
					</view>
					<view class="input_item">
						<view class="left">手机号码</view>
						<view class="input">
							<input placeholder-class="placeholder-style" v-model="shop_detail.phone" type="text"
								name="phone" placeholder="输入您的手机号码" />
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
							<input placeholder-class="placeholder-style" v-model="shop_detail.shop_count" type="number"
								name="shop_count" placeholder="输入您的用餐人数" />
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
import { onLoad, onReachBottom } from '@dcloudio/uni-app';


const type = ref(1);
const appointent_list = ref([]);
const load = ref(0);
const stat = ref(0);
const search_str = ref('');
const show_tc = ref(false);
const shop_detail = ref({});
const is_kong = ref(false);

const appointent_count = ref();
const is_loading = ref(false);
const picker_selector_data = ref({});


onLoad(options => {
	if (options && options.type) {
		// this.setData({
		// 	type: options.type
		// })
		type.value = options.type
	}
	if (options && options.search_str) {
		// this.setData({
		// 	search_str: options.search_str
		// })
		search_str.value = options.search_str
	}

	appointent_list_data();
})
onReachBottom(() => {
	if (appointent_count.value > appointent_list.value.length) {
		appointent_list_data(appointent_list.value.length)
	}
}
)


function picker_selector_change(e, colName) {
	// console.log(e, colName);
	picker_selector_data.value[colName] = e.value;
}

async function apply_shop(e) {
	try {
		let res = await request('/WxAppCustomer/edit_apply', 'post', {
			apply_id: shop_detail.value.id,
			shop_id: shop_detail.value.shop_id,
			user_name: e.detail.value.user_name || '',
			phone: e.detail.value.phone || '',
			// shop_time: e.detail.value.shop_time || '',
			shop_time: picker_selector_data.value.shop_time || '',
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
	if (!search_str.value || search_str.value == '') {
		uni.showToast({
			title: '请输入关键词',
			icon: 'none'
		})
		return
	}

	appointent_list.value = [];
	appointent_count.value = 0;
	appointent_list_data()
}
function change_search_str(e) {
	if (e.detail.value.length == 0) {
		search_str.value = '';
		appointent_list.value = [];
		appointent_count.value = 0;
		is_kong.value = false;
	} else {
		search_str.value = e.detail.value
	}
}
function to_search_v(e) {
	console.log('333', search_str.value);
	if (!search_str.value || search_str.value == '') {
		uni.showToast({
			title: '请输入关键词',
			icon: 'none'
		})
		return
	}
	appointent_list.value = [];
	appointent_count.value = 0;
	appointent_list_data()
}

function close_show_tc() {
	show_tc.value = false;
}
function open_show_tc(itemdetail) {
	show_tc.value = true;
	shop_detail.value = itemdetail
}

function cancel_target(targetid) {
	uni.showModal({
		title: '系统提示',
		content: '确定要取消吗？',
		complete: async (res) => {
			if (res.cancel) { }
			if (res.confirm) {
				try {
					let reqRes = await request('/WxAppCustomer/cancel_target', 'post', {
						apply_id: targetid,
					})
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
				} catch (error) {
					uni.showToast({
						title: '加载数据失败',
						icon: 'none'
					})
				}
			}
		}
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

function open_img(img) {
	// var img = e.currentTarget.dataset.qrcodetrial
	img = img.split(',')
	uni.previewImage({
		current: img, // 当前显示图片的为数组的第一张
		urls: img // 需要预览的图片http链接列表
	})
}

async function appointent_list_data(length) {
	// var that = this
	// var appointent_list = that.data.appointent_list
	// var appointent_count = 0
	if (load.value == 1) {
		return
	}
	load.value = 1

	try {
		let res = await request('/WxAppCustomer/appointent_list', 'post', {
			stat: stat.value || 0,
			offset: length || 0,
			type: type.value,
			name: search_str.value,
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

			if (appointent_list.value.length <= 0) {
				is_kong.value = true
			}
			is_loading.value = true
			load.value = 0
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
</script>

<style scoped lang="scss">
// @import '/pages/mine/appointent.wxss';
@import '../../static/styles/appointentOld.css';

.search_input_box {
	position: sticky;
	top: 0rpx;
	box-sizing: border-box;
	width: 100%;
	padding: 0 29rpx;
	z-index: 100;
	padding-top: 30rpx;
	height: 100rpx;
	background-color: #F5F5F5;
	display: flex;
	align-items: center;
	// border: 1px solid red;

	.search_icon {
		position: absolute;
		left: 60rpx;
	}
}


.search_input {
	background-color: #fff;
	padding-left: 80rpx;
}

.sousuo {
	height: 60rpx;
	padding: 0rpx 30rpx;
	font-size: 28rpx;
	text-align: center;
	background-color: #09C161;
	color: #fff;
	flex: none;
	border-radius: 30rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
	margin-left: 20rpx;
}


.kong_box {
	display: flex;
	align-items: center;
	flex-direction: column;
	font-weight: 500;
	font-size: 28rpx;
	color: #838383;
	margin-top: 260rpx;
}

.kong_img {
	width: 238.89rpx;
	height: 127.78rpx;
	flex: none;
	margin-bottom: 15rpx;
}
</style>
