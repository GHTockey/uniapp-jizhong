<template>
	<view>
		<form @submit="bindsubmit">
			<view class="input_item_block">
				<view class="input_item">
					<view class="label">客户编号</view>
					<view class="input">{{ user.id }}</view>
				</view>
				<view class="input_item">
					<view class="label">昵称</view>
					<view class="input">{{ user.nickname || '' }}</view>
				</view>
				<view class="input_item">
					<view class="label">微信头像</view>
					<view class="input">
						<image class="user_avatar"
							:src="user.wx_image || 'https://saas.jizhongkeji.com/static/jzkj/images/default_avatar.png'"
							mode="aspectFill" />
					</view>
				</view>
				<view class="input_item">
					<view class="label">手机号码<text class="is_required">*</text></view>
					<view class="input">
						<input type="text" name="phone" :value="user.phone || ''" placeholder="请填写手机号" />
					</view>
				</view>

			</view>

			<view class="input_item_block">
				<view class="input_item">
					<view class="label">姓名<text class="is_required">*</text></view>
					<view class="input">
						<input type="text" name="user_name" :value="user.user_name || ''" placeholder="请填写姓名" />
					</view>
				</view>

				<view class="input_item">
					<view class="label">生日</view>
					<view class="input">

						<PickerSelector mode="date" align="right" name="birthday" :value="user.birthday || ''"
							placeholder="请选择生日" @change="picker_selector_change($event, 'birthday')" />
						<image class="right" src="https://saas.jizhongkeji.com/static/jzkj/images/right.png"
							mode="widthFix" />

					</view>
				</view>

				<view class="input_item">
					<view class="label">地区</view>
					<view class="input">
						<!-- <PickerSelector mode="region" align="right" name="city" :value="user.city || ''"
							placeholder="请选择城市" @change="picker_selector_change($event, 'city')"  /> -->
						<uni-data-picker :name="'city'" :localdata="items" @change="uniDataPickerChange($event, 'city')">
							<view class="picker justify-end" style="font-size: 32rpx;display: flex;align-items: center;">
								<view v-if="picker_select_data['city']">{{ picker_select_data['city'] }}</view>
								<view style="color: #bfb9b9;" v-else>请选择城市</view>
							</view>
						</uni-data-picker>
						<image class="right" src="https://saas.jizhongkeji.com/static/jzkj/images/right.png"
							mode="widthFix" />

					</view>
				</view>

				<view class="input_item">
					<view class="label">地址</view>
					<view class="input">
						<input type="text" name="address" :value="user.address || ''" placeholder="请填写地址" />
					</view>
				</view>

				<view class="input_item">
					<view class="label">性别</view>
					<view class="input">

						<PickerSelector align="right" name="sex" :value="user.sex || ''" :range="sex_list"
							rangeKey="name" rangeValue="id" placeholder="请选择性别"
							@change="picker_selector_change($event, 'sex')" />
						<image class="right" src="https://saas.jizhongkeji.com/static/jzkj/images/right.png"
							mode="widthFix" />
					</view>
				</view>
			</view>



			<view class="btn_box_height"></view>
			<view class="btn_box">
				<button class="btn" form-type="submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { useTempStore } from '@/stores/temp.js';
import { storeToRefs } from 'pinia';
import { request } from '@/utils/request.js';
import { onLoad, onShow, onReachBottom, onPageScroll } from '@dcloudio/uni-app';

// 响应式解构 business user
const { business, user } = storeToRefs(useTempStore());

const items = ref([{
	text: "河北省",
	value: "1-0",
	children: [
		{
			text: "石家庄市",
			value: "1-1",
			children: [
				{
					text: "长安区",
					value: "1-1-1"
				}
			]
		},
		{
			text: "保定市",
			value: "1-2"
		}
	]
},
{
	text: "安徽省",
	value: "2-0"
},
{
	text: "北京市",
	value: "3-0"
}]); // 地址列表
const sex_list = ref([
	{ id: 1, name: '男' },
	{ id: 2, name: '女' }
]);
const api_params1 = ref();
const api_params2 = ref();
const picker_select_data = ref({});


onLoad(async () => {
	// console.log(user.value);

	let res = await request('/WxAppCustomer/info_edit_view_data', 'post');
	// console.log(res);
	api_params1.value = res.data.api_params1;
	api_params2.value = res.data.api_params2;
})




async function bindsubmit(e) {
	console.log(e.detail.value);

	let formData = { ...e.detail.value, ...picker_select_data.value };
	// console.log(formData);
	// return
	let res = await request('/WxAppCustomer/info_edit', 'post', formData);

	if (res.code == 0) {
		uni.showToast({
			title: '提交成功',
			icon: 'none'
		})
		setTimeout(() => {
			uni.navigateBack()
		}, 2000)
	} else {
		uni.showToast({
			title: res.data.msg,
			icon: 'none'
		})
	}
}

function picker_selector_change(e, colName) {
	picker_select_data.value[colName] = e.value;
}
function uniDataPickerChange(e, colName) {
	// console.log(e, colName);
	picker_select_data.value[colName] = e.detail.value.map(item => item.text).join(',');
}
</script>

<style>
page {
	background-color: #f0f0f0;
}


.input_item {
	border-top: 2rpx solid #ebebeb;
	height: 130rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 40rpx;
}

.input_item_block {
	background: #fff;
}

.input_item_block+.input_item_block {
	margin-top: 30rpx;
}

.label {
	min-width: 5em;
	word-break: keep-all;
	flex: none;
	display: flex;
	align-items: center;
}

.is_required {
	color: rgb(184, 0, 0);
}

.input {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.input input {
	width: 100%;
	text-align: right;
}

.user_avatar {
	width: 80rpx;
	height: 80rpx;
	border-radius: 10rpx;
}

.right {
	width: 18rpx;
	height: 31rpx;
	margin-left: 10rpx;
}

pickerSelector {
	width: 100%;
	height: 100%;
	margin-left: 10rpx;
}

.btn {
	background: #ff4f26;
	width: 693rpx;
	height: 73rpx;
	font-size: 30rpx;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}

.btn_box {
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 110rpx;
	padding-bottom: constant(safe-area-inset-bottom);
	/* 兼容 iOS < 11.2 */
	padding-bottom: env(safe-area-inset-bottom);
	/* 兼容 iOS >= 11.2 */
}

.btn_box_height {
	height: 120rpx;
}
</style>
