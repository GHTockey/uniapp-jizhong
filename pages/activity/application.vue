<template>
	<view class="application_container">
		<view v-if="is_loading">

			<view class="content_box" v-if="type == 2 && activity.detail_content.length > 0 && product && product.id">
				<view class="content">
					<view>
						<template v-if="activity.detail_content.length > 0" v-for="item in activity.detail_content"
							:key="item.id">
							<rich-text class="xiangqing_rich_text" :nodes="item.content"
								v-if="item.content_type == 'rich_text'"></rich-text>
						</template>
					</view>
				</view>
			</view>
			<view class="application_box" v-else>
				<image src="https://saas.jizhongkeji.com/static/jzkj/images/application.png" mode="" />
			</view>

			<view class="application_from">
				<form @submit="formSubmit">

					<view class="item_name" v-if="type == 2 && product && product.id">
						商品信息
					</view>
					<view class="product_info_box" v-if="type == 2 && product && product.id">
						<image class="right" mode="aspectFill" :src="product.image_uris_arr[0]"></image>
						<view class="left">
							<view class="productname">{{ product.name }}</view>
							<view style="font-weight: 400;font-size: 28rpx;color: #FF4F26;margin-top:10rpx">
								￥{{ product.price }}
							</view>

							<view class="fonr_item">
								<view class="text_clo">选择尺码：</view>
								<view class="fonr_item_v">
									<!-- <PickerSelector class="form_input" name="size" value="" :range="sex_list"
										rangeKey="name" rangeValue="id" placeholder-class="nickname_placeholder"
										placeholder="请选择尺码" @change="bindPickerChange($event, 'size')" /> -->
									<picker @change="bindPickerChange($event, 'size')"
										:range="sex_list.map(item => item.name)">
										<view class="fonr_item_v">
											<!--  <input class="form_input" @click.prevent type="text" confirm-type="done" name="size"
												placeholder-class="nickname_placeholder"
												:placeholder="picker_select['size'] != undefined ? sex_list.find(item => item.id == picker_select['size'] + 1).name : '请选择尺码'" /> -->
											<view class="form_input" style="line-height: 39rpx;">
												<text v-if="picker_select['size'] != undefined">
													{{ sex_list.find(item => item.id == (+picker_select['size'] + 1))?.name }}
												</text>
												<text v-else style="color: #bfb9b9;">请选择尺码</text>
											</view>
										</view>
									</picker>
									<view class="text_clo">码</view>
								</view>
							</view>

							<view class="fonr_item">
								<view class="text_clo">订购数量：</view>
								<view class="fonr_item_v">
									 <input class="form_input" type="number" confirm-type="done" name="buy_count" value=""
										placeholder-class="nickname_placeholder" placeholder="请输入数量" />
									<view class="text_clo">件</view>
								</view>
							</view>
						</view>
					</view>


					<view v-for="(item, index) in fields"
						:style="`border-bottom:  ${item.my_input_type == 'textarea' ? '' : '1rpx solid #DFDFDF'};`">
						<view class="message_list_box" v-if="item.my_input_type != 'address'">
							<view style="display: flex;align-items: center;">
								<text class="item_name">{{ item.vi_name }} </text><text v-if="item.my_is_nullable == 1"
									style="color: #bfb9b9;font-size:32rpx;word-break: keep-all;margin-left: 10rpx;line-height: 39rpx;">(非必填项)</text>
							</view>

							<input
								v-if="item.my_input_type == 'input' && !item.relative_list || item.relative_list?.length == 0"
								type="text" :name="item.my_column_name" value="" :placeholder="`请输入${item.vi_name}`"
								placeholder-class="placeholderStyle" />
							<view
								v-if="item.my_input_type == 'select' && item.relative_list && item.relative_list.length > 0"
								style="border: 1rpx solid #DFDFDF; border-radius: 8rpx ;display: flex;padding: 4rpx 17rpx;justify-content: center;align-items: center;">
								<!-- <PickerSelector v-if="item.relative_list && item.relative_list.length > 0"
									class="input pickerSelector" :name="item.my_column_name"
									@change="bindPickerChange($event, item.my_column_name)"
									placeholder-class="placeholderStyle" :range="item.relative_list"
									:placeholder="`请选择${item.vi_name}`" rangeValue="id" rangeKey="name" /> -->
								<picker v-if="item.relative_list && item.relative_list.length > 0"
									class="input pickerSelector" :name="item.my_column_name"
									@change="bindPickerChange($event, item.my_column_name)"
									placeholder-class="placeholderStyle" :range="item.relative_list"
									:placeholder="`请选择${item.vi_name}`" rangeValue="id" rangeKey="name">
									<view>
										<text style="color: #bfb9b9;"
											v-if="picker_select[item.my_column_name] === undefined || picker_select[item.my_column_name] === ''">
											{{ `请${item.vi_name}` }}
										</text>
										<text v-else>
											{{ fields[index].relative_list[picker_select[item.my_column_name]].name }}
										</text>
										<!-- <text>{{ fields[index].relative_list[picker_select[item.my_column_name]].name }}</text> -->
										<!-- <text>{{ picker_select[item.my_column_name] }}</text> -->
									</view>
								</picker>
								<image src="https://saas.jizhongkeji.com/static/jzkj/images/class_select.png"
									style="width: 23rpx;margin-left: 15rpx;height: 14rpx; " mode="widthFix" />
							</view>
						</view>
						<view v-if="item.my_input_type == 'textarea'"
							style=" padding: 22rpx 27rpx; box-sizing: border-box;border: 1rpx solid #DFDFDF;border-radius: 8rpx ;">
							<textarea :name="item.my_column_name" maxlength="-1"
								style="width: 100%; height: 158rpx; font-weight: 29rpx;" :placeholder="item.user_desc"
								placeholder-class="placeholderStyle" />
						</view>


						<view class="message_list_box" v-if="item.my_input_type == 'address'">
							<view style="display: flex;align-items: center;">
								<text class="item_name">{{ item.vi_name }} </text><text v-if="item.my_is_nullable == 1"
									style="color: #bfb9b9;font-size:32rpx;word-break: keep-all;margin-left: 10rpx;line-height: 39rpx;">(非必填项)</text>
							</view>

							<view
								style="border: 1rpx solid #DFDFDF; border-radius: 8rpx ;display: flex;padding: 4rpx 17rpx; justify-content: center;align-items: center;">
								<!-- 省市区 -->
								<view @click="cityPickerVisible = true" class="picker"
									style="font-size: 32rpx;display: flex;align-items: center;">
									<view v-if="region">{{ region[0] }}，{{ region[1] }}，{{ region[2] }}</view>
									<view style="color: #bfb9b9;" v-else>请选择{{ item.vi_name }}</view>
									<image src="https://saas.jizhongkeji.com/static/jzkj/images/class_select.png"
										style="width: 23rpx;margin-left: 15rpx;height: 14rpx; " mode="widthFix" />
								</view>
								<cityPicker :column="3" :mask-close-able="true" @cancel="cityPickerVisible = false"
									@confirm="cityPickerConfirm($event, item.my_column_name)"
									:visible="cityPickerVisible" />
							</view>
						</view>

					</view>
					<view style="height: 200rpx;">
						<button form-type="submit" class='application_but'
							style="width: 692rpx;height: 100rpx;background: #FF4F26;border-radius: 14rpx "><text
								style=" font-size: 32rpx;font-weight: 400;color: #FFFFFF;line-height: 0rpx;">{{ type ==
									2
									? '立即预定' :
									'立即报名' }}</text></button>
					</view>
				</form>
			</view>

		</view>
	</view>
</template>

<script setup>
import { ref } from "vue";
import { request } from "@/utils/request.js";
import { onLoad, onUnload } from '@dcloudio/uni-app';
import { replaceRichTextImage } from '@/utils';
import cityPicker from '@/uni_modules/piaoyi-cityPicker/components/piaoyi-cityPicker/piaoyi-cityPicker'


const class_select = ref(false);
const activity_id = ref(1);
const input_array = ref([]);

const cityPickerVisible = ref(false); // 是否显示

const end_date = ref('');

const type = ref(0);
const is_loading = ref(false);

const sex_list = ref([
	{ id: 1, name: 'S（参考身高160CM）' },
	{ id: 2, name: 'M码（参考身高165CM）' },
	{ id: 3, name: 'L（参考身高170CM）' },
	{ id: 4, name: 'XL（参考身高175CM）' },
	{ id: 5, name: 'XXL（参考身高180CM）' },
	{ id: 6, name: 'XXXL（参考身高185CM）' },
]);

const region = ref('');

const is_saving = ref();
const is_checking = ref();
const inter = ref();
const order_id = ref();

const pickerListIdx = ref();

const activity = ref({});
const fields = ref([]);
const product = ref();

const picker_select = ref({});
const customItem = ref([{
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
}]);

onUnload(() => {
	clearInterval(inter.value);
})
onLoad(async (options) => {
	console.log('onLoad options', options);

	if (options && options.type == 2) {
		type.value = options.type
		uni.setNavigationBarTitle({
			title: '填写预定信息'
		});
	}

	activity_id.value = options.activity_id

	let res = await request('/WxAppCustomer/activity_form_fields', 'post', { activity_id: activity_id.value })
	console.log('res', res);
	if (res.code != 0) {
		uni.showModal({
			title: '活动结束',
			content: '活动结束',
			showCancel: false,
		})
	} else {
		input_array.value = res.data.fields

		activity.value = res.data.activity
		product.value = res.data.product
		fields.value = res.data.fields

		// 处理富文本格式
		activity.value.detail_content = replaceRichTextImage(activity.value.detail_content)

		is_loading.value = true
	}
})



function bindRegionChange(e, colName) {
	console.log('picker发送选择改变，携带值为', e.detail.value)
	// region.value = e.detail.value

	let temp = e.detail.value.map(item => item.text)
	picker_select.value[colName] = temp
	console.log('temp', temp)
	region.value = temp

}

function wx_pay(wxAppJsSign) {
	console.log('wx_pay', wxAppJsSign);
	if (!uni.requestPayment) {
		uni.showToast({
			title: 'H5 环境不支持调用requestPayment',
			duration: 2000,
			icon: 'none',
		});
		return;
	}
	uni.requestPayment({
		timeStamp: '' + wxAppJsSign.timeStamp,
		nonceStr: wxAppJsSign.nonceStr,
		package: wxAppJsSign.package,
		signType: wxAppJsSign.signType,
		paySign: wxAppJsSign.paySign,
		fail: (res) => {
			// TODO 记录微信支付取消
			is_saving.value = 0
		},
		success: (res) => {
			let pay_status = 0;
			is_checking.value = 1

			uni.showLoading({
				title: 'loading',
				mask: true
			})
			inter.value = setInterval(async () => {
				// let res = await request('/WxAppCustomer/check_user_activity_order', 'post', { id: order_id.value })
				// pay_status = res.data.info ? res.data.info.pay_status : 0;
				console.log('pay_status', pay_status)
				if (pay_status == 1) {
					uni.hideLoading()
					clearInterval(inter.value);
					is_checking.value = 0
					setTimeout(() => {
						to_application_record()
					}, 1000)
				}
			}, 1000);
			return;
		}
	})
}


function cityPickerConfirm(e, colName) {
	console.log('cityPickerConfirm', e, colName)
	// picker_select.value[colName] = e.detail.value
	// region.value = e.detail.value
	region.value = [e.provinceName, e.cityName, e.areaName]
	picker_select.value[colName] = region.value

	cityPickerVisible.value = false
}


function bindPickerSale(e) {
	console.log(e)
	pickerListIdx.value = e.detail.value
}
function to_application_record() {
	var pages = getCurrentPages()
	var index = pages.findIndex(item => item.route == 'pages/activity/application_record')
	if (index == -1) {
		uni.redirectTo({
			url: `/pages/activity/application_record?activity_id=${this.data.activity_id}`,
		})
	} else {
		uni.navigateBack({
			delta: pages.length - index - 1
		})
	}
}
function bind_ChangeTime(e) {
	console.log(e)
}

function bindPickerChange(e, colName) {
	console.log('bindPickerChange111', colName, e)
	picker_select.value[colName] = e.detail.value
}
async function formSubmit(e) {
	e.detail.value.activity_id = activity_id.value
	// Object.assign(picker_select.value, e.detail.value)

	let form_data = { ...e.detail.value, ...picker_select.value }
	console.log('formSubmit e', form_data);
	// return;

	let res = await request('/WxAppCustomer/activity_form_submit', 'post', { ...form_data, product_id: (product.value && product.value.id > 0) ? product.value.id : 0 })
	console.log('res', res);
	if (res.code != 0) {
		uni.showToast({
			title: res.msg,
			icon: "none",
		})
	} else {
		if (res.data && res.data.wxAppJsSign) {
			order_id.value = res.data.order_id
			wx_pay(res.data.wxAppJsSign)
		} else {
			to_application_record()
		}
	}
}
</script>

<style>
.content_box {
	background-color: #ffffff;
}

.content {
	width: 692rpx;
	margin: 0 auto;
	padding-bottom: 30rpx;
	display: flex;
	flex-direction: column;
}

.content image {
	width: 100%;
	margin-top: 22rpx;
}


page {
	width: 750rpx;
	background-color: #ffffff;
	min-height: 100vh;
	position: relative;
}

.application_box {
	width: 750rpx;
	display: flex;
	justify-content: center;
	padding: 20rpx 0;
}

.application_from {
	width: 692rpx;
	margin: 0 auto;
}

.message_list_box {
	display: flex;
	padding: 32rpx 0;
	justify-content: space-between;
}

.message_list_box input {
	margin-left: 20rpx;
}

.message_list_box input,
.message_list_box pickerSelector {
	font-size: 32rpx;
	font-family: PingFangSC-Regular-, PingFangSC-Regular;
	font-weight: normal;
	color: #000000;
	line-height: 39rpx;
	text-align: right;
	width: 100%;
	/* margin-left: 20rpx; */
}

pickerSelector view {

	font-size: 32rpx;
	font-family: PingFangSC-Regular-, PingFangSC-Regular;
	font-weight: normal;
	/* color: #C7C7C7; */
	line-height: 39rpx;
	text-align: right;
}

.placeholderStyle {
	font-size: 32rpx;
	font-family: PingFangSC-Regular-, PingFangSC-Regular;
	font-weight: normal;
	color: #C7C7C7;
	line-height: 39rpx;
	text-align: right;

}


.item_name {
	font-size: 32rpx;
	font-family: PingFang SC-Bold, PingFang SC;
	font-weight: bold;
	color: #333333;
	line-height: 39rpx;
	word-break: keep-all;


}

.application_but {
	margin-top: 76rpx;
	font-size: 32rpx;
	font-weight: 400;
	color: #FFFFFF;
	display: flex;
	justify-content: center;
	align-items: center;
}

.tan_box {
	width: 750rpx;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	background: rgba(85, 85, 85, 0.8);
	z-index: 555;
}

.tan_bottom {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 750rpx;
	height: 533rpx;
	background: #FFFFFF;
	border-radius: 13rpx 13rpx 0rpx 0rpx;

}

.quque_box {
	display: flex;
	padding: 32rpx 0;
	justify-content: space-between;
}

.quque_box .cancel {
	font-size: 33rpx;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	color: #6A6A6A;
	line-height: 46rpx;


}

.quque_box .sure {
	font-size: 33rpx;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	color: #FF4F26;
	line-height: 46rpx;


}

.class_alllist_item {
	display: flex;
	justify-content: center;
	padding: 25rpx 0;
	border-bottom: 1rpx solid #E3E3E3;
}

.bottom_baocun_box {
	width: 750rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	height: 148rpx;
	background: #FFFFFF;
	box-shadow: inset 0rpx 0.1rpx 0rpx 0.1rpx rgba(0, 0, 0, 0.16);
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.tishi {
	font-size: 20rpx;
	color: #C7C7C7;
	font-size: 32rpx;
}

.product_info_box {
	display: flex;
	width: 100%;
	background: #F5F5F5;
	border-radius: 11rpx 11rpx 11rpx 11rpx;
	border: 1rpx solid #9B9B9B;
	box-sizing: border-box;
	padding: 30rpx;
	margin-top: 35rpx;
	margin-bottom: 5rpx;
}

.product_info_box .right {
	width: 181rpx;
	height: 181rpx;
	border: 1rpx solid #E0E0E0;
	flex: none;
	margin-right: 28rpx;
}

.productname {
	font-weight: 400;
	font-size: 28rpx;
	color: #000000;
	text-align: justify;
}

.fonr_item {
	display: flex;
	align-items: center;
	font-weight: 400;
	font-size: 24rpx;
	/* color: #A5A5A5; */
	margin-top: 15rpx;
	justify-content: space-between;
}

.fonr_item_v {
	display: flex;
	align-items: center;
}

.form_input {
	width: 252rpx;
	height: 45rpx;
	background: #FFFFFF;
	border-radius: 6rpx 6rpx 6rpx 6rpx;
	border: 1rpx solid #707070;
	padding: 0 10rpx;
	box-sizing: border-box;
	font-size: 22rpx;
	margin-right: 15rpx;
}

.nickname_placeholder {
	color: #A5A5A5;
}

pickerSelector .empty {
	opacity: 0.5;
}

pickerSelector view {
	font-size: 20rpx;
	/* color: #A5A5A5; */
}

.text_clo {
	color: #A5A5A5;
}
</style>
