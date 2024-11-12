<template>
	<view class="application_record_container" v-if="is_loading">
		<HeightBar />

		<view class="application_box" v-if="type != 2 && my_record_list.length > 0">
			<image src="https://saas.jizhongkeji.com/static/jzkj/images/application_suc.png" mode="" />
		</view>

		<view class="application_message_box" v-for="item in my_record_list" :key="item.id">
			<view class="application_message_item">
				<text class="application_message_item_left">报名时间</text> <text style="color: #767676;"
					class="application_message_item_right">{{ item.create_time == null ? "" : item.create_time }}</text>
			</view>
			<view class="application_message_item">
				<text class="application_message_item_left">报名编号</text> <text style="color: #767676;"
					class="application_message_item_right">{{ item.id_str == null ? "" : item.id_str }}</text>
			</view>
			<view class="application_message_item" v-if="item.product_id > 0">
				<text class="application_message_item_left" style="word-break: keep-all;">产品名称</text> <text
					style="color: #767676;" class="application_message_item_right">{{ item.product_name ?
						item.product_name : '' }}</text>
			</view>
			<view class="application_message_item" v-if="item.product_id > 0">
				<text class="application_message_item_left" style="word-break: keep-all;">产品单价</text> <text
					style="color: #767676;" class="application_message_item_right">{{ item.price }}</text>
			</view>
			<view class="application_message_item" v-if="item.product_id > 0">
				<text class="application_message_item_left" style="word-break: keep-all;">所选尺码</text> <text
					style="color: #767676;" class="application_message_item_right">{{ item.size == 1 ? 'S码'
						: (item.size == 2 ? 'M码' : (item.size == 3 ? 'L码' : (item.size == 4 ? 'XL码' : (item.size == 5 ?
							'XXL码' : 'XXXL码')))) }}</text>
			</view>
			<view class="application_message_item" v-if="item.product_id > 0">
				<text class="application_message_item_left" style="word-break: keep-all;">数量</text> <text
					style="color: #767676;" class="application_message_item_right">{{ item.buy_count }}</text>
			</view>

			<view :class="`${field.my_input_type == 'textarea' ? 'huanhang' : ''} application_message_item`"
				v-for="field in item.fields || fields" :key="field.id">
				<text class="application_message_item_left">{{ field.vi_name }}</text> <text
					class="application_message_item_right">{{ item[field.my_column_name] || '' }}</text>
			</view>
		</view>

		<view style="height: 100rpx;"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { request } from '@/utils/request.js';
import HeightBar from '../../components/HeightBar/HeightBar.vue';

const activity_id = ref(0)
const type = ref(0)
const is_loading = ref(false)

const fields = ref()
const my_record_list = ref()



onLoad(options => {
	activity_id.value = options.activity_id

	if (options && options.type && options.type == 2) {
		type.value = 2

		uni.setNavigationBarTitle?.({
			title: '预定记录'
		});
	}
})
onShow(async () => {




	let res = await request('/WxAppCustomer/activity_my_record', 'post', {
		activity_id: activity_id.value || 0
	})
	console.log('res', res);
	// this.setData(res.data.data);
	fields.value = res.data.fields
	my_record_list.value = res.data.my_record_list


	if (my_record_list.value && my_record_list.value.length > 0) {
		var foundNumber = my_record_list.value.find(num => num.product_id > 0);

		console.log('11111', foundNumber);

		if (foundNumber) {
			type.value = 2

			uni.setNavigationBarTitle?.({
				title: '预定记录'
			});
		}
	}
	is_loading.value = true
})

function again_spplication() {
	uni.navigateTo({
		url: `/pages/activity/application?activity_id=${activity_id.value}`,
	})
}
</script>

<style>
/* pages/activity/application_re.wxss */
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
	padding-top: 20rpx;
	padding-bottom: 20rpx;
}

.bottom_baocun_box {
	width: 750rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	height: 107rpx;
	background: #FFFFFF;
	border-top: 0.5rpx solid #CDCED0;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.application_message_box {
	width: 692rpx;
	margin: 0 auto;
	border-radius: 14rpx;
	border: 1rpx solid #B7B7B7;
	margin-bottom: 42rpx;

}

.application_message_item {
	width: 636rpx;
	margin: 0 auto;
	padding: 23rpx 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.application_message_item:not(:last-child) {
	border-bottom: 1rpx solid #DFDFDF;

}

.application_message_item .application_message_item_left {
	/* white-space: nowrap;
    width: 118rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; */
	color: #1D1D1D;
}

.application_message_item_right {
	margin-left: 30rpx;
}

.application_message_item text {

	font-size: 29rpx;
	font-family: PingFang SC-Medium, PingFang SC;
	font-weight: 500;
	color: #767676;
	line-height: 42rpx;



}

.application_message_box .huanhang {
	width: 636rpx;
	margin: 0 auto;
	padding: 23rpx 0;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: flex-start;

}

.huanhang .application_message_item_right {
	margin-left: 0;
	margin-top: 8rpx;
}
</style>
