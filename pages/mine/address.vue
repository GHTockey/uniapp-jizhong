<template>
	<view class="address_container">

		<view class="new_layout !h-[calc(100vh-44px)]">
			<view class="new_layout_cotent !h-[100%]">
				<template v-if="address_list && address_list.length > 0">
					<view class="flex_col_cen_cen">
						<template v-for="item in address_list" :key="item.id">
							<view class="address_item flex_row_space_bt"
								@click="type == 'edit' ? to_edit(item) : to_choose(item)">
								<image lazy-load class="address_icon" mode="widthFix"
									src="https://saas.jizhongkeji.com/static/jzkj/images/address_icon.png"></image>
								<view :class="`address_text ${type == 'edit' ? '' : 'width_big'}`">
									<text>{{ item.user_name }}</text>,
									<text>{{ item.mobile }}</text>,
									<text>{{ item.address }}</text>,
									<text>{{ item.address_detail }}</text>
									<text v-if="item.is_default" class="lable">默认地址</text>
								</view>
								<image lazy-load v-if="type == 'edit'" class="arrow_icon" mode="aspectFit"
									src="https://saas.jizhongkeji.com/static/jzkj/images/arrow_right.png"></image>
							</view>
						</template>
					</view>
				</template>
				<template v-else>
					<DefaultTip text="暂无地址" image="address-em.svg" @btnClick="toAddressForm" />
					<!-- <view class="empty_tip flex_col_cen_cen">
						<image lazy-load class="empty_tip_img" mode="widthFix"
							src="https://saas.jizhongkeji.com/static/jzkj/images/empty_img.png"></image>
						<view class="empty_tip_text">暂无收货地址1</view>
					</view> -->
				</template>
			</view>
			<!-- <view class="tool_box flex_col_cen_cen" @click="to_add">
				<view class="add_btn flex_col_cen_cen">
					添加收货地址
				</view>
			</view> -->
			<view class="tool_box flex_col_cen_cen" @click="to_add">
				<view class="add_btn flex_col_cen_cen">
					添加收货地址
				</view>
			</view>
		</view>


	</view>
</template>

<script setup>
import { ref } from 'vue';
import { request } from "@/utils/request.js";
import { onLoad, onShow } from "@dcloudio/uni-app";

const type = ref('to_choose') // 跳转类型
const address_list = ref([])




onLoad((options) => {
	if (options?.type == 'edit') {
		type.value = options.type;
	}
})
onShow(() => {
	get_info_list();
})



// 跳转添加地址 [表单]
function toAddressForm() {
	uni.navigateTo({
		url: '/pages/mine/address_form'
	})
}


function to_edit(item) { // 跳转编辑
	// console.log('to_edit e', e);
	// return;
	uni.navigateTo({
		url: '/pages/mine/address_form?id=' + item.id,
	})
};
function to_add(e) { // 跳转添加
	uni.navigateTo({
		url: '/pages/mine/address_form',
	})
};
async function to_choose(item) { // 选择地址
	console.log('to_choose item', item.id);
	let res = await request('/WxAppCustomer/choose_address', 'post', { id: item.id || 0 });
	console.log('to_choose res', res);
	if (res.code != 0) return uni.showToast({ title: res.msg, icon: 'error', duration: 2000 });
	uni.navigateBack();

};
async function get_info_list() {
	uni.showLoading({ title: '加载中' });
	let res = await request('/WxAppCustomer/get_address_list', 'post', {});
	console.log('get_info_list res', res);
	uni.hideLoading();
	if (res.code != 0) return uni.showToast({ title: res.msg, icon: 'error', duration: 2000 });
	address_list.value = res.data.address_list;
}
</script>

<style lang="scss" scoped>
@import '@/static/styles/address.css';

.tool_box {
	height: 130rpx !important;
	padding-bottom: 0;
	box-shadow: none;

	.add_btn {
		background-image: $uni-color-gradient-primary;
		opacity: 0.9;
		border-radius: 13.89rpx;

		font-size: 31.94rpx;
		font-weight: 400;
		color: #ffffff;
	}
}
</style>