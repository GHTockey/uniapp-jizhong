<template>
	<NavBar bgc="transparent" showBack isWhite v-if="has_bar_title_color == 'unset'">
		<template #title><text style="color: white;">代理加盟</text></template>
	</NavBar>
	<NavBar :bgc="has_bar_title_color" showBack isWhite v-else>
		<template #title><text style="color: white;">代理加盟</text></template>
	</NavBar>

	<view v-if="is_loading" style="background-image: linear-gradient(to bottom, #FF1B22, #ffffff);">
		<image style="width: 100%;margin-top:50rpx" mode="widthFix"
			src="https://saas.jizhongkeji.com/static/jzkj/images/agrent_bg1.png"></image>

		<!-- <backheader title="代理加盟" is_show_locate="{{is_show_locate}}" background="{{has_bar_title_color}}"></backheader> -->

		<view class="box_list">
			<image style="width: 168rpx;height: 168rpx;position: relative;z-index: 9;"
				src="https://saas.jizhongkeji.com/static/jzkj/images/agrent_bg3.png"></image>

			<view class="box_item">
				<view class="context">
					<template v-for="fuwenben in rule.detail_context" :key="fuwenben.id">
						<rich-text data-name="detail" v-if="fuwenben.content_type == 'rich_text'"
							:nodes="fuwenben.content"></rich-text>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { request } from '@/utils/request';
import { onLoad, onPageScroll } from '@dcloudio/uni-app';


const is_loading = ref(false);
const has_bar_title_color = ref('unset');
const is_show_locate = ref(false);

const rule = ref();


onLoad(options => {
	uni.showLoading({
		title: 'loading',
	})

	rule_data();
})
onPageScroll(e => {
	// console.log('页面滚动', e.scrollTop);
	// 页面像下滚动了
	if (e.scrollTop > 50) {
		// 让页面标题有白色背景
		has_bar_title_color.value = '#FF1B21';
	} else {
		// 让页面标题去掉白色背景
		has_bar_title_color.value = 'unset';
	}
})



async function rule_data() {

	let res = await request('/WxAppCustomer/agent_rule', 'post', {});
	// 更新数据
	if (res.code == 0) {
		// that.setData({
		// 	rule: res.data.data.rule,
		// 	is_loading: true
		// })
		rule.value = res.data.rule;
		is_loading.value = true;
		uni.hideLoading();
	} else {
		uni.showToast({
			title: res.data.msg,
			icon: 'none',
			mask: true
		})
	}
}
</script>

<style>
page {
	padding: 0;
	margin: 0;

}

.box_list {
	width: 100%;
	display: flex;
	justify-content: center;
	transform: translateY(-60rpx);
	flex-direction: column;
	align-items: center;
	padding: 0 33rpx;
	box-sizing: border-box;
}

.box_item {
	background-color: #fff;
	border-radius: 22rpx;
	padding: 0 33rpx;
	box-sizing: border-box;
	padding-top: 100rpx;
	padding-bottom: 33rpx;
	width: 100%;
	transform: translateY(-85rpx);
}

.context {
	line-height: 2;
	position: relative;
	z-index: 7;
	font-size: 29rpx;
	font-weight: 400;
	color: #000000;
	text-align: justify;
}
</style>
