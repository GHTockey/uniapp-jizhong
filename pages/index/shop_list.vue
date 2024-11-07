<template>
	<view class="shop_list_container">
		<HeightBar appendNavBar />
		<!-- 分类 -->
		<view class="menu flex_col_cen_cen shop_list_container_menu" :style="{ top: menu_top + 'px' }">
			<template v-for="(item, i) in category_list" :key="item.id">
				<view
					:class="`menu_item flex_col_cen_cen ${idnex == i ? 'active' : ''} menu_item_length${item.name?.length}`"
					@click="choose_nav(i)">
					<view class="active_border_left" v-if="idnex == i"></view>
					{{ item }}
				</view>
			</template>
			<view class="menu_item remain_menu"></view>
		</view>


		<!-- 右侧内容 -->
		<view class="right_content flex_col_str_str" >
			<view class="product_list" v-if="store_list.length > 0">
				<navigator hover-class="none" :url="`/pages/index/shop_detail?id=${item.id}`"
					class="product_item_v company_box" v-for="(item, index) in store_list" :key="index">

					<view class="hang1">
						<view>{{ item.shop_name }}</view>
						<view class="daohang_box">
							<image @click.stop.prevent="to_address(item)" class="daohang"
								src="https://saas.jizhongkeji.com/static/jzkj/images/daohang.png"></image>
							<image @click.stop.prevent="makePhoneCall(item.phone)" class="daohang"
								src="https://saas.jizhongkeji.com/static/jzkj/images/phone_img.png"></image>
						</view>
					</view>
					<view class="hang2" style="align-items: center;">
						<view v-if="item.distance" style="margin-right: 10rpx;">距离您{{ item.distance }}km</view>
						<image v-if="item.is_open == 1" class="yingye"
							src="https://saas.jizhongkeji.com/static/jzkj/images/yingye.png"></image>
						<image v-else class="yingye" src="https://saas.jizhongkeji.com/static/jzkj/images/xiuxi.png">
						</image>
					</view>
					<image style="width: 100%;height: 238rpx;border-radius:14rpx;flex: none;" lazy-load
						:src="item.image_uris_arr[0]" mode="widthFix" />
					<view class="hang2" style="margin-top:10rpx;margin-bottom: 10rpx;">
						<image class="address_company"
							src="https://saas.jizhongkeji.com/static/jzkj/images/address_company.png"></image>

						<view>{{ item.address_detail }}</view>
					</view>
					<view class="hang2" style="margin-top:0rpx;margin-bottom: 10rpx;">
						<image class="address_company" src="https://saas.jizhongkeji.com/static/jzkj/images/time.png">
						</image>
						<view>{{ item.start_time }}-{{ item.end_time }}</view>
					</view>
				</navigator>
			</view>

			<view class="kong" style="padding-left: 150rpx;" v-if="store_list.length <= 0">
				<image lazy-load src="https://saas.jizhongkeji.com/static/jzkj/images/kong.png" mode="widthFix" />
				<text>暂无内容</text>
			</view>
		</view>

		<!-- 标题栏 -->
		<NavBar class="!bg-white">
			<template #title>门店</template>
		</NavBar>

		<!-- tabbar -->
		<TabBar class="fixed-bottom" :isAppMode="true" />
	</view>
</template>

<script setup>
import { ref } from "vue";
import { request } from "@/utils/request";
import { onLoad } from "@dcloudio/uni-app";
import { getTitleBarHeight, getStatusBarHeight } from '@/utils';
const category_list = ref([]);
const idnex = ref(0);
const gps = ref('');
const store_list = ref([]);
const yuanshi = ref([]);

// 左侧分类菜单top值
const menu_top = ref(getStatusBarHeight() + (getTitleBarHeight() || 40));




onLoad((options) => {
	uni.showLoading({
		title: 'loading',
	})
	// this.onLogin(user => {
	// 	this.setData({
	// 		userInfo: user,
	// 		// business: user.business
	// 		tarbarupdated: this.data.tarbarupdated++
	// 	})
	// });
	get_user_location();
})

// 获取分类列表
async function store_list_data() {

	let res = await request('/WxAppCustomer/shop_category_list', 'post', {
		gps: gps.value
	})
	console.log(res)
	if (res.code != 0) uni.showToast({ title: res.msg, icon: 'none' })
	uni.hideLoading();
	store_list.value = res.data.store_list
	yuanshi.value = res.data.store_list
	category_list.value = res.data.category_list

	console.log('gps', gps.value);
	console.log('store_list', store_list.value);
}

// 选择分类
function choose_nav(i) {
	idnex.value = i

	// 获取分类名称
	var name = category_list.value[i];
	if (name != '全部') {
		// 根据分类名称过滤店铺列表
		store_list.value = yuanshi.value.filter(m => m.city == name)
	} else {
		// 显示全部店铺
		store_list.value = yuanshi.value
	}
}


// 导航
function to_address(item) {
	console.log('item', item);
	let address = item.address.split(",")
	let latitude = address[0];
	let longitude = address[1];
	let name = item.shop_name;
	let address_detail = item.address_detail;
	console.log('address11----', address, name);
	console.log('位精度', latitude, longitude);
	uni.openLocation({ //
		longitude: parseFloat(longitude),
		latitude: parseFloat(latitude),
		name: name,
		address: address
	})
}

// 打电话
function makePhoneCall(phone) {
	console.log(phone);
	uni.makePhoneCall({
		phoneNumber: phone,
	})
}

function get_user_location(e) {
	//获取当前用户的坐标
	gps.value = '';
	uni.getLocation({
		type: 'wgs84',
		success: (res) => {
			gps.value = [res.latitude, res.longitude].join(',')
			console.log('获取的位置', res);
			store_list_data()
		},
		complete: (res) => {
			console.log('获取的位置', res);
			store_list_data()
		},
	})
}
</script>

<style>
@import "/static/styles/introproduct.css";

.menu {
	top: 0;
}

.product_item_v {
	display: flex;
	flex-direction: column;
}

.company_box .hang1 {
	display: flex;
	align-items: center;
	font-weight: bold;
	font-size: 29rpx;
	color: #000000;
	text-align: justify;
	line-height: 1.5;
	justify-content: space-between;
}

.daohang_box {
	display: flex;
	align-items: center;
}

.daohang {
	width: 57.64rpx;
	height: 57.64rpx;
	margin-left: 30rpx;
	flex: none;
}

.company_box .hang2 {
	display: flex;
	align-items: baseline;
	font-size: 24rpx;
	color: #666666;
	text-align: justify;
	line-height: 1.5;
	margin-top: 10rpx;
	margin-bottom: 25rpx;
}

.yingye {
	width: 111rpx;
	height: 33rpx;
	flex: none;
}

.product_list {
	padding-top: 30rpx;
}

.product_list .product_item_v:last-child {
	border-bottom: 0;
}

.address_company {
	width: 20rpx;
	height: 20rpx;
	margin-right: 20rpx;
	flex: none;
}
</style>

<style scoped lang="scss">
.shop_list_container {
	// padding-top: 300rpx;
	// min-height: calc(100vh - $nav-height - $tabbar-height);
	min-height: 100vh;
	// padding-top: $nav-height;
	// padding-bottom: $tabbar-height;
	padding-bottom: calc($tabbar-height + env(safe-area-inset-bottom));

	.shop_list_container_menu {
		// top: $nav-height;
	}
}
</style>