<template>
	<view class="address_form_container">


		<view class="my_content">
			<form @submit="submit_address">
				<template v-for="item in cols" :key="item.id">
					<template v-if="item.my_column_name == 'address'">
						<view class="form_item flex_row_space_bt">
							<view class="form_lable">{{ item.vi_name }}</view>
							<view @click="cityPickerVisible = true"
								:class="`form_picker flex_row_str_str ${!form_info[item.my_column_name] ? 'placeholder_text' : ''}`">
								{{ !form_info[item.my_column_name] ? '请选择' : Array.isArray(form_info[item.my_column_name]) ? form_info[item.my_column_name].join(',') : form_info[item.my_column_name] }}
							</view>
							<cityPicker :column="column" :mask-close-able="maskCloseAble"
								@cancel="cityPickerVisible = false" @confirm="confirm($event, item.my_column_name)"
								:visible="cityPickerVisible" />
						</view>
					</template>
					<template v-else-if="item.my_column_name == 'address_detail'">
						<view class="form_item flex_row_space_bt align_start">
							<view class="form_lable">{{ item.vi_name }}</view>
							<textarea maxlength="200" @input="change_texare" class="input_textarea"
								:name="item.my_column_name" placeholder-class="placeholder_text" placeholder="请输入您的详细地址"
								:value="form_info[item.my_column_name]" />
						</view>
					</template>
					<template v-else>
						<view class="form_item flex_row_space_bt">
							<view class="form_lable">{{ item.vi_name }}</view>
							<input class="form_input" placeholder-class="placeholder_text" :name="item.my_column_name"
								:placeholder="item.noneed_input ? '自动识别' : '请输入' + item.vi_name" type="text"
								:value="form_info[item.my_column_name]" />
						</view>
					</template>
				</template>
				<view class="form_item flex_row_space_bt">
					<view class="form_lable">设为默认收货地址</view>
					<switch name="set_default" :checked="switch1Checked" @change="switch1Change" />
				</view>

				<template v-if="type == 'edit'">
					<view class="flex_row_space_bt edit_btns">
						<view class="btn_item delete flex_col_cen_cen" @click="delete_tap">
							删除地址
						</view>
						<button class="btn_item flex_col_cen_cen" form-type="submit">
							保存
						</button>
					</view>
				</template>
				<template v-if="type == 'add'">
					<view class="flex_row_space_bt">
						<button class="btn_item save" form-type="submit">
							保存
						</button>
					</view>
				</template>
			</form>
		</view>

	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { request } from '@/utils/request.js';
import cityPicker from '@/uni_modules/piaoyi-cityPicker/components/piaoyi-cityPicker/piaoyi-cityPicker';

const switch1Checked = ref(false); // 设为默认收货地址
const type = ref('add'); // 地址类型
const form_info = ref({}); // 表单信息
const cols = ref([]); // 表单列
const id = ref(0); // 地址id
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


const cityPickerVisible = ref(false); // 是否显示
const maskCloseAble = ref(true); // 是否可以点击遮罩关闭
const column = ref(3);


function confirm(valObj, item) {
	// console.log(valObj, item)

	let str = valObj.provinceName + ',' + valObj.cityName + ',' + valObj.areaName
	// console.log('str', str)
	form_info.value[item] = str

	cityPickerVisible.value = false
}


onLoad((options) => {
	get_form_col()

	if (options && options.id) {
		type.value = 'edit'
		id.value = options.id

		get_info(options.id)

		uni.setNavigationBarTitle({
			title: '编辑收货地址',
		})
	}
})


function switch1Change(e) {
	console.log('switch1Change e', e);
};
function choose_address(e) {
	console.log('choose_address e', e);
	// form_info.value.address = e.detail.value

	let addressArr = []
	e.detail.value.forEach(item => {
		addressArr.push(item.text)
	})
	form_info.value.address = addressArr
};
function change_texare(e) {
	console.log('change_texare e', e);
	var val = e.detail.value
	if (e.detail.value && e.detail.value.length > 200) {
		val = e.detail.value.slice(0, 200)
	}
	form_info.value.address_detail = val;
};
// 获取表单列
async function get_form_col() {
	uni.showLoading({ title: '加载中' })
	let res = await request('/WxAppCustomer/get_address_form_cols', 'post', {})
	uni.hideLoading()
	// console.log('get_form_col res', res);
	if (res.code != 0) return uni.showToast({ title: res.msg, icon: 'error', mask: true })
	cols.value = res.data.cols
};
// 获取地址详情
async function get_info(id) {
	// this.request({
	// 	url: '/WxAppCustomer/get_address_detail',
	// 	data: {
	// 		id: id || 0
	// 	},
	// 	success: (res) => {
	// 		if (res.data && res.data.code == 0) {

	// 			let form_info = res.data.data.address
	// 			if (form_info) {
	// 				if (form_info.address) {
	// 					form_info.address = form_info.address.split(',')
	// 				}
	// 			}
	// 			this.setData({
	// 				form_info: form_info
	// 			})
	// 		} else {
	// 			wx.showToast({
	// 				title: res.data.msg,
	// 				icon: 'none',
	// 				mask: true
	// 			})
	// 		}
	// 	}
	// });

	let res = await request('/WxAppCustomer/get_address_detail', 'post', { id })
	console.log('get_info res', res);
	if (res.code != 0) return uni.showToast({ title: res.msg, icon: 'error', mask: true })
	form_info.value = res.data.address
	if (form_info.value) {
		if (form_info.value.address) {
			form_info.value.address = form_info.value.address.split(',')
		}
	}

};
async function submit_address(e) {
	let value = { ...e.detail.value, ...form_info.value }
	// console.log('submit_address value', value);
	// console.log('form_info.value', form_info.value);
	// return

	if (id.value) {
		value.id = id.value
	}
	console.log('提交的内容', value);
	// return

	let res = await request('/WxAppCustomer/edit_address', 'post', value)
	console.log('submit_address res', res);
	if (res.code != 0) return uni.showToast({ title: res.msg, icon: 'error', mask: true })
	uni.showToast({ title: res.msg, icon: 'success', mask: true })
	setTimeout(() => { // 延迟1秒后返回
		uni.navigateBack()
	}, 1000)
};
async function delete_tap() {

	uni.showModal({
		title: '系统提示',
		content: '是否删除该收货地址？', //提示内容
		success: async function (exeRes) {
			if (exeRes.confirm) {

				let res = await request('/WxAppCustomer/delete_address', 'post', { id: id.value })
				if (res.code != 0) return uni.showToast({ title: res.msg, icon: 'error', mask: true })
				uni.showToast({ title: res.msg, icon: 'success', mask: true })
				setTimeout(() => { // 延迟1秒后返回
					uni.navigateBack()
				}, 1000)
			} else {

			}
		}
	})

};


</script>

<style scoped lang="scss">
.address_form_container {
	background-color: #F8F9FA;
	height: calc(100vh - 44px);
	overflow: hidden;

	.my_content {
		box-sizing: border-box;
		padding: 0rpx 30rpx;
		width: 100vw;
	}

	.form_item {
		margin-top: 46rpx;
	}

	.form_item.align_start {
		align-items: flex-start;
	}

	.placeholder_text {
		color: #676767;
	}

	.form_lable {
		color: #03081A;
		font-size: 31rpx;
	}

	.form_input,
	.form_picker {
		background: #FFFFFF;
		border-radius: 11rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		height: 70rpx;
		padding: 0rpx 28rpx;
		align-items: center;
		width: 500rpx;
	}

	.input_textarea {
		background: #FFFFFF;
		border-radius: 11rpx;
		box-sizing: border-box;
		min-height: 140rpx;
		padding: 15rpx 28rpx;
		width: 500rpx;
	}

	.btn_item {
		border: 1rpx solid #FC4740;
		border-radius: 80rpx;
		background-color: #FC4740;
		color: #FFFFFF;
		font-weight: 500;
		font-size: 33rpx;
		height: 87rpx;
		margin-top: 88rpx;
		width: 100%;
	}

	.edit_btns .btn_item {
		height: 87rpx;
		width: 329rpx;
	}

	.edit_btns .btn_item.delete {
		background: #FFFFFF;
		color: #FC4740;
	}
}
</style>