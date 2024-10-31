<template>
	<view class="collect_list_container">
		<view v-if="is_loading">

			<!-- 空列表 -->
			<view class="kong" v-if="group_data_arr.length <= 0">
				<image src="https://saas.jizhongkeji.com/static/jzkj/images/kong.png" mode="widthFix" />
				<text>暂无商品</text>
			</view>

			<view v-for="(item, index) in group_data_arr" :key="index" class="collect_list">
				<view class="colect_time">{{ item[0] }}</view>
				<navigator v-for="(collect_item, index) in item[1]" :key="index"
					:url="`/pages/product/detail?id=${collect_item.goods_id}`">
					<view class="collect_item">
						<image class="collect_img" mode="aspectFill" lazy-load :src="collect_item.good_imgs">
						</image>
						<view class="collect_right">
							<view class="collect_title">{{ collect_item.name }}</view>
							<view v-if="collect_item.goods_price"><text style="font-size: 26rpx;">￥</text>{{
								collect_item.goods_price }}</view>
						</view>
					</view>
				</navigator>
			</view>

		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { request } from '@/utils/request.js';
import { onShow, onReachBottom } from '@dcloudio/uni-app';

const collect_list = ref([]);
const collect_count = ref(0);
const is_loading = ref(false);
const group_data_arr = ref([]);


onShow(() => {
	uni.showLoading({
		title: 'loading',
	})
	collect_list_handler()
})
onReachBottom(() => {
	if (collect_count.value > collect_list.value.length) {
		collect_list_handler(collect_list.value.length)
	}
})

// 列表数据
async function collect_list_handler(length) {

	let res = await request('/WxAppCustomer/collect_list', 'post', { offset: length || 0 })
	if (res.code == 1) {
		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true
		})
	} else {
		if (length) {
			collect_list.value.push.apply(collect_list.value, res.data.collect_list)
		} else {
			collect_list.value = res.data.collect_list
		}

		collect_count.value = res.data.collect_count

		uni.hideLoading();

		console.log('collect_list', collect_list.value);

		// 按天进行分组
		let groupData = new Map()
		collect_list.value.forEach(item => {
			let date = item.day_time
			if (!groupData.has(date)) {
				groupData.set(date, [item])
			} else {
				groupData.get(date).push(item)
			}
		})

		group_data_arr.value = [...groupData.entries()]
		console.log('分组之后', group_data_arr.value);

		is_loading.value = true
	}

}
</script>

<style lang="scss" scoped>
.collect_list_container {
	background-color: #F0F0F0;
	padding-top: 0;
	padding-bottom: 100rpx;
	min-height: calc(100vh - $nav-height);
}
</style>

<style scoped>
/* page {
    background-color: #F0F0F0;
    padding-top: 0;
    padding-bottom: 100rpx;
} */

.colect_time {
	margin-top: 25rpx;
	font-size: 28rpx;
	font-weight: bold;
	color: #333333;
}

.collect_list {
	display: flex;
	flex-direction: column;
	width: 100%;
	box-sizing: border-box;
	padding: 0 30rpx;
}

.collect_item {
	display: flex;
	background-color: #ffffff;
	padding: 34rpx 28rpx;
	margin-top: 25rpx;
	border-radius: 14rpx
}

.collect_img {
	width: 160rpx;
	height: 160rpx;
	border-radius: 6rpx;
	flex: none;
	margin-right: 20rpx;
}

.collect_title {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	text-overflow: ellipsis;
	word-break: break-all;
	font-size: 29rpx;
	color: #333333;
	font-weight: bold;
}

.collect_right {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}


.kong {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 400rpx;
}

.kong image {
	width: 300rpx;
	height: 200rpx;
	margin-bottom: 20rpx;
}

.kong text {
	font-size: 28rpx;
	font-weight: 500;
	color: #838383;
}
</style>
