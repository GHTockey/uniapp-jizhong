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

					<!-- <button open-type="chooseAvatar" class="chooseAvatarBtn w-full flex " -->
					<!-- @chooseavatar="onChooseAvatarHandler"> -->
					<view class="label">微信头像</view>
					<view class="input">
						<image class="user_avatar"
							:src="user.wx_image || 'https://saas.jizhongkeji.com/static/jzkj/images/default_avatar.png'"
							mode="aspectFill" />
					</view>
					<!-- </button> -->

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

						<!-- <PickerSelector mode="date" align="right" name="birthday" :value="user.birthday || ''"
							placeholder="请选择生日" @change="picker_selector_change($event, 'birthday')" /> -->

						<picker mode="date" :value="user?.birthday || ''" :start="startDate"
							@change="picker_selector_change($event, 'birthday')">
							<template v-if="user?.birthday">
								{{ user?.birthday }}
							</template>
							<template v-else>
								请选择生日
							</template>
						</picker>

						<image class="right" src="https://saas.jizhongkeji.com/static/jzkj/images/right.png"
							mode="widthFix" />

					</view>
				</view>

				<view class="input_item">
					<view class="label">地区</view>
					<view class="input">
						<!-- <PickerSelector mode="region" align="right" name="city" :value="user.city || ''"
							placeholder="请选择城市" @change="picker_selector_change($event, 'city')"  /> -->
						<!-- <uni-data-picker :name="'city'" :localdata="items"
							@change="uniDataPickerChange($event, 'city')">
							<view class="picker justify-end"
								style="font-size: 32rpx;display: flex;align-items: center;">
								<view v-if="picker_select_data['city']">{{ picker_select_data['city'] }}</view>
								<view style="color: #bfb9b9;" v-else>请选择城市</view>
							</view>
						</uni-data-picker> -->

						<view @click="cityPickerVisible = true">
							{{ user['city'] || '请选择城市' }}
						</view>
						<cityPicker :column="column" :mask-close-able="true" @cancel="cityPickerVisible = false"
							@confirm="confirm($event, 'city')" :visible="cityPickerVisible" />

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

						<!-- <PickerSelector align="right" name="sex" :value="user.sex || ''" :range="sex_list"
							rangeKey="name" rangeValue="id" placeholder="请选择性别"
							@change="picker_selector_change($event, 'sex')" /> -->

						<picker @change="picker_selector_change($event, 'sex')" :value="user.sex || ''"
							:range="sex_list.map(item => item.name)">
							<view class="uni-input">{{ sex_list[user.sex]?.name || '请选择性别' }}</view>
						</picker>


						<image class="right" src="https://saas.jizhongkeji.com/static/jzkj/images/right.png"
							mode="widthFix" />
					</view>
				</view>
			</view>



			<view class="btn_box_height"></view>
			<view class="btn_box">
				<button
					class="tce_theme_btn w-full !rounded-lg mx-[30rpx] text-[30rpx] h-[70rpx] flex justify-center items-center"
					form-type="submit">提交</button>
				<!-- <button class="btn" form-type="submit">提交</button> -->
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
import cityPicker from '@/uni_modules/piaoyi-cityPicker/components/piaoyi-cityPicker/piaoyi-cityPicker';


// 响应式解构 business user
const tempStore = useTempStore()
const { business, user } = storeToRefs(tempStore);


const cityPickerVisible = ref(false); // 是否显示
const column = ref(3);

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


// 新版获取头像
async function onChooseAvatarHandler(e) {
	// console.log('onChooseAvatarTest', e);
	user.value.wx_image = e.detail.avatarUrl


	uni.uploadFile({
		url: 'https://saas.jizhongkeji.com/jzkj/WxAppCustomer/upload',
		filePath: e.detail.avatarUrl,
		name: 'file',
		// formData: {
		// 	'user': 'test'
		// },
		success: (uploadFileRes) => {
			// console.log('uploadFileRes', uploadFileRes.data);
			let res = typeof uploadFileRes.data == 'string' ? JSON.parse(uploadFileRes.data) : uploadFileRes.data;
			let { code, msg, data } = res;
			if (code == 0) {
				// console.log('上传头像成功', data.file_url);
				user.value.wx_image = data.file_url; // 上传后的头像链接
			} else {
				uni.showToast({
					title: msg,
					icon: 'none'
				})
			}
		}
	});

}

function confirm(valObj, item) {
	// console.log(valObj, item)

	let str = valObj.provinceName + ',' + valObj.cityName + ',' + valObj.areaName
	// console.log('str', str)
	// form_info.value[item] = str

	picker_select_data.value[item] = str
	user.value[item] = str

	cityPickerVisible.value = false
}

async function bindsubmit(e) {

	let formData = { ...e.detail.value, ...picker_select_data.value, wx_image: user.value.wx_image, nickname: user.value.nickname };
	// console.log(formData);
	// 接口 info_edit 需要的参数：'phone', 'user_name', 'birthday', 'city', 'address', 'sex'
	// return

	let res = await request('/WxAppCustomer/info_edit', 'post', formData);

	if (res.code == 0) {
		uni.showToast({
			title: '提交成功',
			icon: 'none'
		})
		// console.log(res);
		// user.value = res.data.user;
		tempStore.setBusiness(res.data.user.business);
		tempStore.setUser(res.data.user);

		setTimeout(() => {
			uni.navigateBack()
		}, 2000)
	} else {
		uni.showToast({
			title: res.msg,
			icon: 'none'
		})
	}
}

function picker_selector_change(e, colName) {
	console.log(e, colName);
	picker_select_data.value[colName] = e.detail.value;
	user.value[colName] = e.detail.value;
}
function uniDataPickerChange(e, colName) {
	// console.log(e, colName);
	picker_select_data.value[colName] = e.detail.value.map(item => item.text).join(',');
}
</script>

<style lang="scss">
page {
	background-color: #f0f0f0;
}

.chooseAvatarBtn {
	background-color: transparent;
	border: unset;
	padding: 0;
	box-shadow: none;
	margin: unset;
	padding: unset;
	font-size: unset;

	&:after {
		border: unset;
	}
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
