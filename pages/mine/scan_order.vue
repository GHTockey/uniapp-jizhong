<template>
	<view class="page_box scan_order_container">

		<HeightBar />
		<NavBar class="bg-white" showBack bgc="white">
			<template #title>核销订单</template>
		</NavBar>

		<view class="saomatext">请使用摄像头扫描核销码图案，或输入核销码</view>
		<view class="sacn_box" @click="scanCode">
			<image class="scan_img" mode="widthFix" src="https://saas.jizhongkeji.com/static/jzkj/images/scan_img.png">
			</image>
			<view style="margin-top: 20rpx;">点击扫描核销码</view>
		</view>

		<form @submit="form_submit">
			<view class="form_item">
				<view style="flex:none;font-weight: 600;">核销码：</view>
				 <input class="form_input" type="text" confirm-type="done" name="number" v-model="number"
					placeholder-class="nickname_placeholder" placeholder="请输入核销码" />
			</view>
			<view style="display: flex;justify-content: center;width:100%;margin-top:30rpx">
				<button style="width: 100%;" form-type="submit" class="form_buttom">确认</button>
			</view>
		</form>
	</view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { request } from '@/utils/request.js';

const number = ref('');
// 扫码按钮的事件处理函数
function scanCode() {
	uni.scanCode({
		success: function (res) {
			console.log('111111111', res);

			// return;
			var active_str = decodeURIComponent(res.path)
			var apply_id = 0;

			if (active_str.indexOf('pages/index/auding_order?scene=order_id') == 0) {
				apply_id = active_str.substr('pages/index/auding_order?scene=order_id'.length);
				// console.log('55555');
				// apply_id = parseInt(active_str.split()[1]);

				uni.navigateTo({
					url: '/pages/index/auding_order?order_id=' + apply_id,
				})
			}

		},
		fail: function (error) {
			console.log('fail', error);
			uni.showToast({
				title: '当前环境不支持扫码',
				icon: 'none'
			})
		}
	})

}

async function form_submit(e) {
	console.log(e.detail.value);

	let res = await request('/WxAppCustomer/scan_order_number', 'post', { qrcode_number: e.detail.value.number })
	if (res.code == 0) {
		if (res.data.target) {
			uni.navigateTo({
				url: '/pages/index/auding_order?order_id=' + res.data.target.id,
			})
		}
	} else {
		uni.showToast({
			title: res.msg,
			icon: 'none'
		})
	}
}

</script>

<style scoped>
page {
	background-color: #F5F5F5;
}

.page_box {
	width: 100%;
	box-sizing: border-box;
	padding: 0 28rpx;
}

.sacn_box {
	width: 100%;
	background-color: #ffffff;
	border-radius: 14rpx;
	height: 400rpx;
	margin-top: 30rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-weight: 600;
	font-size: 30rpx;
	color: #000000;
}

.scan_img {
	width: 138.89rpx;
	height: 138.89rpx;
}


.form_buttom {
	color: #ffffff;
	font-size: 35rpx;
	font-weight: 700;
	width: 692rpx;
	height: 88rpx;
	background: linear-gradient(89deg, #ff3981 3%, #ff1e1a 97%);
	border-radius: 7rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.form_item {
	width: 100%;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	background-color: #ffffff;
	border-radius: 14rpx;
	height: 100rpx;
	margin-top: 30rpx;
	padding: 0 28rpx;

	font-size: 30rpx;
	color: #000000;
}

.form_input {
	width: 80%;
	height: 100%;
}

.saomatext {
	color: #7D7D7D;
	margin-top: 30rpx;
}
</style>

<style lang="scss" scoped>
.scan_order_container {
	background-color: #F5F5F5;
	overflow: hidden;
	// min-height: calc(100vh - $nav-height);
	min-height: 100vh;
	padding-top: $nav-height;
}
</style>
