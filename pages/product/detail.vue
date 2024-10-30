<template>
	<view class="goods-detail-container">
		<!-- 商品图片和视频区域 -->
		<swiper class="goods-detail-swiper" @change="swiperChange">
			<swiper-item class="goods-detail-swiper-item" v-if="video_list.length > 0"
				v-for="(item, index) in video_list" :key="index">
				<video id="video" :src="item.url" :controls="false" object-fit="cover"></video>
			</swiper-item>
			<!-- <swiper-item class="goods-detail-swiper-item" key="video">
				<video id="video" src="../../static/video/mp41.mp4" :controls="false" object-fit="cover"></video>
			</swiper-item> -->
			<swiper-item class="goods-detail-swiper-item" v-for="(item, index) in swiper.swiperImgUrls" :key="index">
				<image class="goods-detail-swiper-item-image" :src="item" />
			</swiper-item>
			<!-- <swiper-item class="goods-detail-swiper-item" key="image2">
				<image class="goods-detail-swiper-item-image"
					src="https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/webp/1d518e30c55a870b05bec858f6c7bf3f.w800.h800.d0.b0.s64862.webp?x-oss-process=image/format,jpg" />
			</swiper-item> -->
		</swiper>
		<!-- 商品图片操作 -->
		<view class="goods-detail-swiper-operation">
			<!-- 左上角返回按钮 -->
			<view class="goods-detail-swiper-back" @click="goBack">
				<image class="goods-detail-swiper-back-icon" src="../../static/icon/left-white-icon.svg"
					mode="widthFix" />
			</view>
			<!-- 左下角当前视频/图片数量 -->
			<view class="goods-detail-swiper-index">
				<text class="goods-detail-swiper-index-text">{{ swiperIndex + 1 }}/{{ swiper?.swiperImgUrls?.length +
					video_list.length }}</text>
			</view>
			<!-- 右下角视频/图集按钮 -->
			<view class="goods-detail-swiper-button">
				<text class="goods-detail-swiper-button-text">视频</text>
				<text class="goods-detail-swiper-button-text">图集</text>
			</view>
		</view>



		<!-- 商品信息区域 -->
		<view class="goods-detail-info">
			<!-- 价格信息 -->
			<view class="goods-detail-info-price">
				<view class="left">
					<text>券后<text style="font-size: 23rpx;">￥</text><text style="font-size: 23.61px;font-weight: 700;color: #ff2626;
">123</text></text>
					<text class="right" style="margin-left: 14rpx;">优惠前￥123</text>
				</view>
				<text class="right">已售123+</text>
			</view>
			<!-- 可用券 -->
			<view class="goods-detail-info-coupon">
				<view class="coupon-item">商品券满128减20</view>
				<view class="coupon-item">商品券满128减20</view>
			</view>
			<!-- 其它用户正在购买 -->
			<view class="goods-detail-info-other">
				<image class="o-avatar" src="../../static/logo.png" mode="widthFix" />
				<text class="o-text">张**48秒前正在加购</text>
				<!-- 立即购买按钮-右对齐 -->
				<view class="o-buy" style="margin-left: auto;" @click="showActionSheetSlot = true">
					立即购买
					<image class="o-buy-icon" src="../../static/icon/right-jiantou.svg" mode="widthFix" />
				</view>
			</view>
			<!-- 商品标题 -->
			<view class="goods-detail-info-title">
				<text>{{ goodsDetail?.name }}</text>
			</view>
			<!-- 商品的配送方式-服务保障-商品参数 -->
			<view class="goods-detail-info-delivery">
				<view class="delivery-item" @tap="showActionSheet = true">
					<image class="delivery-item-icon" src="../../static/icon/goods-peisong-icon.svg" mode="widthFix" />
					<text class="delivery-item-text">配送方式：</text>
					<text class="delivery-item-text">门店自提</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">快递物流</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">同城配送</text>
					<view class="delivery-item-text" style="margin-left: auto;">
						<image src="../../static/images/next1.svg" style="width: 20.56rpx;height: 20.08rpx;">
						</image>
					</view>
				</view>
				<view class="delivery-item" @tap="showActionSheet = true">
					<image class="delivery-item-icon" src="../../static/icon/goods-baozhang-icon.svg" mode="widthFix" />
					<text class="delivery-item-text">服务保障：</text>
					<text class="delivery-item-text">无忧退款（运费险）</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">极速退款</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">假一赔十</text>
					<view class="delivery-item-text" style="margin-left: auto;">
						<image src="../../static/images/next1.svg" style="width: 20.56rpx;height: 20.08rpx;">
						</image>
					</view>
				</view>
				<view class="delivery-item" @tap="showActionSheet = true">
					<image class="delivery-item-icon" src="../../static/icon/goods-parm-icon.svg" mode="widthFix" />
					<text class="delivery-item-text">商品参数：</text>
					<text class="delivery-item-text">美辰</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">中国</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">江南省</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">长安市</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">食品工艺...</text>
					<view class="delivery-item-text" style="margin-left: auto;">
						<image src="../../static/images/next1.svg" style="width: 20.56rpx;height: 20.08rpx;">
						</image>
					</view>
				</view>
			</view>
		</view>

		<!-- 客户评价 ⟩ -->
		<view class="goods-detail-info-comment">
			<!-- 评价头部 -->
			<view class="comment-header">
				<text class="comment-header-title">客户评价（2万+）</text>
				<text class="comment-header-rate">好评率99%</text>
				<view class="comment-header-more">
					<image src="../../static/images/next1.svg" style="width: 20.56rpx;height: 20.08rpx;"></image>
				</view>
			</view>
			<!-- 评价内容 -->
			<view class="comment-content">
				<view class="comment-item">
					<image class="comment-item-avatar" src="../../static/logo.png" mode="aspectFill" />
					<view class="comment-item-info">
						<text class="comment-item-username">用户_5689825687</text>
						<text class="comment-item-content">产品收到了，发货速度快，产品的效果非常不错，家人挺满意，一定还会再次回购的，祝老板生意兴隆！</text>
					</view>
				</view>
				<view class="comment-item">
					<image class="comment-item-avatar" src="../../static/logo.png" mode="aspectFill" />
					<view class="comment-item-info">
						<text class="comment-item-username">用户_5689825687</text>
						<text class="comment-item-content">产品收到了，发货速度快，产品的效果非常不错，家人挺满意，一定还会再次回购的，祝老板生意兴隆！</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 商品详情 -->
		<view class="goods-detail-info-detail">
			<!-- 商品详情标题 -->
			<view class="goods-detail-info-detail-title">商品详情</view>
			<!-- 商品详情图片 -->
			<image class="goods-detail-info-detail-image" mode="widthFix" style="width: 100%; height: 390px;"
				src="https://saascdn.jizhongkeji.com/oss_jzkj/jpg/817f5a51a4aafe53fb3cd53c6c67e17f.w750.h780.d0.b23746.s121584.jpg" />
			<image class="goods-detail-info-detail-image" mode="widthFix" style="width: 100%; height: 390px;"
				src="https://saascdn.jizhongkeji.com/oss_jzkj/jpg/817f5a51a4aafe53fb3cd53c6c67e17f.w750.h780.d0.b23746.s121584.jpg" />
			<image class="goods-detail-info-detail-image" mode="widthFix" style="width: 100%; height: 390px;"
				src="https://saascdn.jizhongkeji.com/oss_jzkj/jpg/817f5a51a4aafe53fb3cd53c6c67e17f.w750.h780.d0.b23746.s121584.jpg" />

			<!-- 技术支持 -->
			<view class="goods-detail-info-detail-support">
				<image class="goods-detail-info-detail-support-image" src="../../static/icon/sm-logo.svg"
					mode="widthFix" />
				<text class="goods-detail-info-detail-support-content">集中科技提供技术支持</text>
			</view>
		</view>

		<!-- 底部操作栏 -->
		<view class="goods-detail-info-bottom">
			<view class="goods-detail-info-bottom-left">
				<view class="goods-detail-info-bottom-left-item">
					<image class="goods-detail-info-bottom-left-item-icon" src="../../static/icon/home-icon.svg"
						mode="widthFix" />
					<text class="goods-detail-info-bottom-left-item-text">首页</text>
				</view>
				<view class="goods-detail-info-bottom-left-item">
					<image class="goods-detail-info-bottom-left-item-icon" src="../../static/icon/kefu.svg"
						mode="widthFix" />
					<text class="goods-detail-info-bottom-left-item-text">客服</text>
				</view>
				<view class="goods-detail-info-bottom-left-item">
					<image class="goods-detail-info-bottom-left-item-icon" src="../../static/icon/shoucang-active.svg"
						mode="widthFix" />
					<text class="goods-detail-info-bottom-left-item-text">收藏</text>
				</view>
			</view>
			<view class="goods-detail-info-bottom-right">
				<view class="bottom-right-item">加入购物车</view>
				<view class="bottom-right-item" @click="showActionSheetSlot = true">立即购买</view>
			</view>
		</view>


		<!-- 商品参数弹窗 -->
		<ActionSheet :title="actionSheetData.title" :items="actionSheetData.items" v-model:show="showActionSheet" />
		<!-- 立即购买弹窗 -->
		<ActionSheetSlot v-model:show="showActionSheetSlot" :footerBtnText="'立即购买'" @confirm="to_buy">
			<template #body>
				<view class="ActionSheetSlotComponentBody">
					<!-- 商品图片价格 -->
					<view class="goods-img-price-box">
						<image src="../../static//images/kun.png" alt="" class="goods-img"></image>
						<view class="goods-price-box">
							<view class="goods-price"><text style="font-size: 27.78rpx;">￥</text>100</view>
							<view class="goods-price-unit"><text style="font-size: 27.78rpx;">￥</text>10~360</view>
						</view>
					</view>
					<!-- 商品参数 -->
					<view class="goods-params-box">
						<view class="goods-params-title" style="display: flex; justify-content: space-between;">
							<text>商品型号:</text>
							<view class="goods-params-title-right">
								<image src="../../static/icon/list.svg" style="width: 30.56rpx;height: 27.08rpx;">
								</image>
								<text>列表</text>
							</view>
						</view>
						<view class="goods-params-item-box">
							<view class="goods-params-item">
								<image src="../../static/images/kun.png" style="width: 61.11rpx; height: 61.11rpx;">
								</image>
								<text>固始鸡1200gx1只（共2.4斤）</text>
							</view>
							<view class="goods-params-item active">
								<image src="../../static/images/kun.png" style="width: 61.11rpx; height: 61.11rpx;">
								</image>
								<text>固始鸡1200gx1只（共2.4斤）</text>
							</view>
							<view class="goods-params-item disabled">
								<image src="../../static/images/kun.png" style="width: 61.11rpx; height: 61.11rpx;">
								</image>
								<text>固始鸡1200gx1只（共2.4斤）</text>
							</view>

						</view>
					</view>
					<!-- 购买数量 -->
					<view class="goods-buy-num-box">
						<view class="goods-params-title" style="display: flex; justify-content: space-between;">
							<text>购买数量:</text>
						</view>
						<view>
							<uni-number-box />
						</view>
					</view>
				</view>
			</template>
		</ActionSheetSlot>
	</view>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { request } from '@/utils/request.js';

const goodsId = ref(); // 商品id
const goodsDetail = ref({}); // 商品详情
const product = ref({}); // 商品

const act_spec1 = ref(0); // 规格1
const act_spec2 = ref(0); // 规格2
const show_select_change = ref(false); // 是否展示列表或者大图的选项
const need_spec1 = ref(0); // 是否需要规格1
const need_spec2 = ref(0); // 是否需要规格2
const add_count = ref(0); // 购买数量
const price_show = ref(0); // 显示价格
const price_inter = ref([0, 0]); // 价格区间
const act_img = ref(''); // 活动图片
const max_count = ref(0); // 最大购买数量
const video_list = ref([]); // 视频列表
const swiper = ref({}); // 轮播图
const detail_image_uri = ref([]); // 商品详情图片
const swiperIndex = ref(0); // 轮播图当前索引
const act_info = ref(0); // 活动价格 ???



const showActionSheet = ref(false)
const showActionSheetSlot = ref(false)
// 商品参数
const actionSheetData = ref({
	title: '商品参数',
	items: [
		{ name: '颜色', value: '红色' },
		{ name: '尺寸', value: '大号' },
		{ name: '尺寸', value: '大号' },
		{ name: '尺寸', value: '大号' },
	]
})

// 返回上一页
function goBack() {
	uni.navigateBack({
		delta: 1
	})
}


onLoad((options) => {
	// console.log(options, 'options');
	goodsId.value = options.id;
	getData();
})



async function getData() {
	uni.showLoading({ title: '加载中' })
	let res = await request('/WxAppCustomer/goods_detail', 'POST', {
		id: goodsId.value
	})
	console.log('getData res', res);
	uni.hideLoading();
	if (res.code != 0) return uni.showToast({ title: res.msg, icon: 'error' });
	goodsDetail.value = res.data.detail;

	// 修改页面标题
	uni.setNavigationBarTitle({
		title: goodsDetail.value.name
	})


	// 处理规格
	let product = goodsDetail.value
	if (product.spec_list1 && product.spec_list1.option.length > 0) {
		need_spec1.value = 1

		product.spec_list1.option.forEach((ele, index) => {
			if (ele.img_uri) {
				show_select_change.value = true
				return
			}
		});
		console.log('规格', product.spec_list1);
	}
	if (product.spec_list2 && product.spec_list2.option.length > 0) {
		need_spec2.value = 1
		// that.data.spec_list2_init = product.spec_list2.option  // TODO: 没看懂
	}


	// 处理价格
	if (add_count.value > 0) {
		let show = Math.round((product.price_min * add_count.value * 100), 2) / 100;
		let min = Math.round((product.price_min * add_count.value * 100), 2) / 100;
		let max = Math.round((product.price_max * add_count.value * 100), 2) / 100;
		price_show.value = show;
		price_inter.value = [min, max];
		act_img.value = product.image_uris_arr ? product.image_uris_arr[0] : '';
		max_count.value = product.max_count;
	} else {
		price_show.value = product.price_min;
		price_inter.value = [product.price_min, product.price_max];
		act_img.value = product.image_uris_arr ? product.image_uris_arr[0] : '';
		max_count.value = product.max_count;
	}


	// 视频列表
	if (product.video_uri_arr.length > 0) {
		let video_list_temp = [];

		product.video_uri_arr.forEach(ele => {
			video_list_temp.push({
				url: ele,
				width: 375,
				height: 375,
				bofang_show: true,
			});
		});

		console.log("视频视频视频", video_list_temp);

		video_list.value = video_list_temp;
	}


	// 轮播图
	swiper.value = {
		swiperImgUrls: product.image_uris_arr,
		video: product.video_1
	}
	// 轮播图指示器
	console.log('swiper.value.swiperImgUrls.length', swiper.value.swiperImgUrls.length);
	if (swiper.value.swiperImgUrls.length == 1) {
		swiper.value.indicatorDots = false
	} else {
		// LRR 修改swiper样式 改为false
		swiper.value.indicatorDots = false
	}


	//
	if (product.detail) {
		console.log('WxParse');
		return
		WxParse.wxParse('detail_content', 'html', product.detail, that, 5);
	}
	detail_image_uri.value = product.detail_images
	swiper.value = swiper.value



	// if (product.business.is_show_buy_pop == 1) {
	// 	// ---打开立即购买弹窗
	// 	if (!(!product.spec_list1 && product.price > 0)) {
	// 		// if (type == 'buy') {
	// 		console.log('dakai13333333333333333333333333');
	// 		// console.log('立即购买111111111', that.data.product.spec_list2.option[0].name);
	// 		show_pop.value = 'buy'
	// 		act_spec1.value = 0
	// 		act_spec2.value = 0

	// 		// 选中默认规格1
	// 		if (product.spec_list1 && product.spec_list1.option.length > 0) {
	// 			act_spec1.value = product.spec_list1.option[0].name
	// 		}
	// 		//  选中默认规格2
	// 		if (product.spec_list2 && product.spec_list2.option && product.spec_list2.option.length > 0) {
	// 			act_spec2.value = product.spec_list2.option[0].name
	// 			filter_by_spec()
	// 		}

	// 		wx.setPageStyle({
	// 			style: {
	// 				overflow: 'hidden'
	// 			}
	// 		})
	// 	}
	// }
}

// 弹窗 点击购买
function to_buy() {
	console.log('点击购买');
	console.log('商品id', goodsDetail.value.id);

	if (!act_spec1.value) {
		uni.showToast({
			title: '请先选择规格',
			icon: 'none'
		})
		// return
	}

	if (need_spec1.value && need_spec2.value) {
		let name = goodsDetail.value.spec_list2.name || '规格';
		if (!act_spec2.value) {
			uni.showToast({
				title: '请选择' + name,
				icon: 'none'
			})
			return
		}
	}
	let goods_price = act_info.value


	uni.navigateTo({
		url: `/pages/mine/pay?goods_id=${goodsDetail.value.id}&price_id=1073&count=1`,
		// url: '/pages/mine/pay?goods_id=' + goodsDetail.value.id + '&price_id=' + goods_price.id + '&count=' + add_count.value,
	})

	// 关闭弹窗 [这里不需要操作，点击后自动关闭]
	// showActionSheetSlot.value = false

}

async function filter_by_spec() {
	if (need_spec1.value && need_spec2.value) { // 双规格
		let rel_spec_list2 = goodsDetail.value.spec_all.filter(m => {
			return m.spec1_value == act_spec1.value
		}).map(m1 => {
			return {
				name: m1.spec2_value,
				store: m1.store,
			}
		})
		console.log('当前的规格1', rel_spec_list2);

		if (product.value && product.value.spec_list2) {
			product.value.spec_list2.option = rel_spec_list2 || []
		}

		await nextTick()
		let info = null;
		if (act_spec2.value) {
			info = goodsDetail.value.spec_all.filter(m => m.spec1_value == act_spec1.value && m.spec2_value == act_spec2.value)[0]
		} else {
			info = goodsDetail.value.spec_all.filter(m => (m.spec1_value == act_spec1.value))[0]
		}

		if (info.img_uri && info.img_uri.length > 0) {
			act_img.value = info.img_uri
		}
		console.log('多选', info);

		let show = Math.round((info.price * (add_count.value) * 100), 2) / 100;
		price_show.value = show
		act_info.value = info
		max_count.value = info.store
		return


	} else {
		let spec1 = act_spec1.value
		console.log('选择规格后的数据', goodsDetail.value.spec_all);
		let info = goodsDetail.value.spec_all.filter(m => m.spec1_value == spec1)[0]
		let show = Math.round((info.price * (add_count.value) * 100), 2) / 100;

		console.log('选择规格后', info);
		if (info.img_uri && info.img_uri.length > 0) {
			act_img.value = info.img_uri
		}
		price_show.value = show
		act_info.value = info
		max_count.value = info.store

		console.log('选择规格后的最大数量', max_count.value);
	}
}

// 轮播图改变事件 [更新swiperIndex]
function swiperChange(e) {
	// console.log(e, '轮播图改变');
	swiperIndex.value = e.detail.current
}
</script>

<style lang="scss" scoped>
.goods-detail-container {
	background-color: #f7f8fa;
	padding-bottom: 100rpx;

	// 商品图片操作
	.goods-detail-swiper-operation {
		position: absolute;
		top: 0;
		left: 0;
		// border: 1px solid #00ff15;
		height: 750rpx;
		width: 100%;
		// 使其可以操作后面被挡住的元素
		pointer-events: none; // 允许事件穿透


		// 需要交互的子元素恢复 pointer-events
		.goods-detail-swiper-back,
		.goods-detail-swiper-index,
		.goods-detail-swiper-button {
			pointer-events: auto;
		}

		// 左上角返回按钮
		.goods-detail-swiper-back {
			position: absolute;
			top: 114rpx;
			left: 16.67rpx;
			width: 59.72rpx;
			height: 59.72rpx;
			background: #5959598d;
			border-radius: 13.89rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.goods-detail-swiper-back-icon {
				width: 17.36rpx;
				height: 30.56rpx;
			}
		}

		// 左下角当前视频/图片数量
		.goods-detail-swiper-index {
			z-index: 100;
			position: absolute;
			bottom: 32rpx;
			left: 29.17rpx;
			background: rgba(67, 67, 67, 0.60);
			border-radius: 18.75rpx;
			padding: 0 18rpx;
			box-sizing: border-box;

			.goods-detail-swiper-index-text {
				font-size: 26.39rpx;
				font-family: PingFang SC, PingFang SC-Medium;
				font-weight: 500;
				color: #ffffff;
			}
		}

		// 右下角视频/图集按钮
		.goods-detail-swiper-button {
			z-index: 100;
			position: absolute;
			bottom: 32rpx;
			right: 29.17rpx;
			display: flex;
			gap: 5.6rpx;

			.goods-detail-swiper-button-text {
				// width: 58.33rpx;
				height: 40.97rpx;
				font-size: 29.17rpx;
				// font-weight: 700;
				color: #ffffff;
				padding: 0 11rpx;
				background: #5959598d;
				border-radius: 18.75rpx;
				// 阻止文字换行
				white-space: nowrap;
			}
		}
	}



	// 商品图片和视频区域
	.goods-detail-swiper {
		// border: 1px solid #000;
		height: 750rpx;

		.goods-detail-swiper-item {
			width: 100%;
			height: 100%;

			#video {
				width: 100%;
				height: 100%;
			}

			.goods-detail-swiper-item-image {
				width: 100%;
				height: 100%;
			}

		}
	}

	// 商品信息区域
	.goods-detail-info {
		padding: 0 29.17rpx;
		padding-bottom: 27rpx;
		background-color: #ffffff;

		// 价格信息
		.goods-detail-info-price {
			display: flex;
			justify-content: space-between;
			align-items: end;
			// margin-top: 20rpx;
			padding-top: 20rpx;

			.left {
				font-size: 27.78rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				color: #ff4f26;

				// .right {
				// 	font-size: 27.78rpx;
				// 	font-family: PingFang SC, PingFang SC-Regular;
				// 	font-weight: 400;
				// 	color: #8b8b8b;
				// }
			}

			.right {
				font-size: 27.78rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #8b8b8b;
			}
		}

		// 可用券
		.goods-detail-info-coupon {
			display: flex;
			gap: 10rpx;
			margin-top: 21rpx;

			.coupon-item {
				font-size: 26.39rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 500;
				color: #ff4f26;
				padding: 8rpx 20rpx;
				background: #fef0e5;
				border-radius: 8.33rpx;

			}
		}

		// 其它用户正在购买
		.goods-detail-info-other {
			display: flex;
			gap: 11rpx;
			margin-top: 21rpx;
			background: #fef0e5;
			border-radius: 8.33rpx;
			padding: 9.72rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;

			.o-avatar {
				width: 33.33rpx;
				height: 33.33rpx;
				border-radius: 50%;
			}

			.o-text {
				font-size: 26.39rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #ff4f26;
			}

			.o-buy {
				background: #ff4f26;
				border-radius: 8.33rpx;
				font-size: 28rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				color: #f7f8fa;
				box-sizing: border-box;
				padding: 0 11rpx;
				display: flex;
				align-items: center;

				.o-buy-icon {
					width: 10.56rpx;
					height: 9.72rpx;
					margin-left: 10rpx;
				}
			}
		}

		// 商品标题
		.goods-detail-info-title {
			font-size: 31.94rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 500;
			color: #313131;
			margin-top: 29.17rpx;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		// 商品的配送方式-服务保障-商品参数
		.goods-detail-info-delivery {
			// display: flex;
			margin-top: 28rpx;
			box-sizing: border-box;

			.delivery-item {
				width: 100%;
				display: flex;
				align-items: center;
				color: #8B8B8B;
				font-size: 26.39rpx;
				gap: 10rpx;
				margin-top: 23.61rpx;

				.delivery-item-icon {
					width: 32rpx;
					height: 32rpx;
					vertical-align: middle;
				}

				.delivery-item-text {
					font-size: 25rpx;
				}
			}
		}
	}

	// 客户评价
	.goods-detail-info-comment {
		margin-top: 20rpx;
		background: #ffffff;
		padding: 29.17rpx;
		box-sizing: border-box;

		// 评价头部
		.comment-header {
			display: flex;
			// justify-content: space-between;
			align-items: center;

			.comment-header-title {
				font-size: 30.56rpx;
				font-family: PingFang SC, PingFang SC-Bold;
				font-weight: 600;
				color: #313131;
			}

			.comment-header-rate {
				font-size: 25rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #8B8B8B;
				margin-left: auto;
			}

			.comment-header-more {
				font-size: 25rpx;
				font-family: PingFang SC, PingFang SC-Regular;
				font-weight: 400;
				color: #8B8B8B;
				margin-left: 29rpx;
			}

		}

		// 评价内容
		.comment-content {
			margin-top: 30rpx;

			.comment-item {
				display: flex;
				margin-top: 33rpx;

				.comment-item-avatar {
					width: 38.89rpx;
					height: 38.89rpx;
					background: rgba(0, 0, 0, 0.00);
					border-radius: 50%;
				}

				.comment-item-info {
					flex: 1;
					display: flex;
					flex-direction: column;
					margin-left: 16.67rpx;

					.comment-item-username {
						font-size: 25rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						color: #8b8b8b;
					}

					.comment-item-content {
						font-size: 25rpx;
						font-family: PingFang SC, PingFang SC-Regular;
						color: #232323;
						margin-top: 22rpx;
					}
				}
			}
		}
	}

	// 商品详情
	.goods-detail-info-detail {
		margin-top: 20rpx;
		background: #ffffff;
		// padding: 29.17rpx;
		box-sizing: border-box;
		// border: 1px solid #000;

		.goods-detail-info-detail-title {
			font-size: 30.56rpx;
			font-family: PingFang SC, PingFang SC-Bold;
			font-weight: 600;
			color: #313131;
			padding: 25rpx 29.17rpx;
		}

		.goods-detail-info-detail-image {
			// width: 100%;
			// height: 100%;
		}


	}

	// 技术支持
	.goods-detail-info-detail-support {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10rpx;
		// margin-top: 20rpx;
		background-color: #f7f8fa;
		padding: 33.33rpx;

		.goods-detail-info-detail-support-image {
			width: 25rpx;
			height: 25rpx;
		}

		.goods-detail-info-detail-support-content {
			font-size: 25rpx;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			color: #babbbd;
		}
	}

	// 底部操作栏
	.goods-detail-info-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		// border: 1px solid #000;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 29.17rpx;
		box-sizing: border-box;

		// 底部操作栏左侧
		.goods-detail-info-bottom-left {
			display: flex;
			align-items: center;
			// gap: 10rpx;
			// column-gap: 10rpx;
			// row-gap: 10rpx;
			flex: 1;
			justify-content: space-between;
			// border: 1px solid #000;
			padding-right: 60rpx;

			.goods-detail-info-bottom-left-item {
				display: flex;
				flex-direction: column;
				// gap: 10rpx;
				// flex: 1;
				align-items: center;

				.goods-detail-info-bottom-left-item-icon {
					width: 38.19rpx;
					height: 34.72rpx;
				}

				.goods-detail-info-bottom-left-item-text {
					font-size: 18.06rpx;
					color: #686868;
					font-family: PingFang SC, PingFang SC-Regular;
					font-weight: 400;
					margin-top: 10rpx;
				}
			}
		}

		// 底部操作栏右侧
		.goods-detail-info-bottom-right {
			display: flex;
			align-items: center;

			.bottom-right-item {
				padding: 18rpx 30rpx;
				color: #ffffff;


				&:first-child {
					background: #f2ab20;
					border-radius: 14rpx 0 0 14rpx;
				}

				&:last-child {
					background: #ff4f26;
					border-radius: 0 14rpx 14rpx 0;
				}
			}
		}
	}
}
</style>
