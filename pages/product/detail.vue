<template>
	<view class="goods-detail-container">
		<!-- 商品图片和视频区域 -->
		<swiper class="goods-detail-swiper" @change="swiperChange" :current="swiperCurrentIndex">
			<swiper-item class="goods-detail-swiper-item" v-if="video_list.length > 0"
				v-for="(item, index) in video_list" :key="index">
				<video id="video" :src="item.url" :controls="false" object-fit="cover"></video>
			</swiper-item>
			<!-- <swiper-item class="goods-detail-swiper-item" key="video">
				<video id="video" src="https://saas.jizhongkeji.com/static/jzkj/static/video/mp41.mp4" :controls="false" object-fit="cover"></video>
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
				<image class="goods-detail-swiper-back-icon"
					src="https://saas.jizhongkeji.com/static/jzkj/static/icon/left-white-icon.svg" mode="widthFix" />
			</view>
			<!-- 左下角当前视频/图片数量 -->
			<view class="goods-detail-swiper-index">
				<text class="goods-detail-swiper-index-text">{{ swiperIndex + 1 }}/{{ swiper?.swiperImgUrls?.length +
					video_list.length }}</text>
			</view>
			<!-- 右下角视频/图集按钮 -->
			<view class="goods-detail-swiper-button" v-if="video_list.length > 0">
				<text class="goods-detail-swiper-button-text"
					:style="`color: ${swiperIndex > 0 ? '#fff' : '#a7a7a7'} ;`" @click="taggleWindow('video')">视频</text>
				<text class="goods-detail-swiper-button-text"
					:style="`color: ${swiperIndex == 0 ? '#fff' : '#a7a7a7'} ;`"
					@click="taggleWindow('image')">图集</text>
			</view>
		</view>


		<!-- 商品信息区域 -->
		<view class="goods-detail-info">
			<!-- 价格信息 -->
			<view class="goods-detail-info-price">
				<view class="left">
					<text><text style="font-size: 28rpx;">￥</text><text
							style="font-size: 39rpx;font-weight: 700;color: #ff2626;">{{ product.price || 0
							}}</text></text>
					<text style="margin-left: 14rpx;">券后<text style="font-size: 28rpx;">￥</text><text
							style="font-size: 39rpx;font-weight: 700;color: #ff2626;">xxx</text></text>
					<text class="right" style="margin-left: 14rpx;">优惠前￥ {{ price_show || '???' }}</text>
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
				<view class="o-buy" style="margin-left: auto;" @click="show_buy_pop_handler('buy')">
					立即购买
					<image class="o-buy-icon"
						src="https://saas.jizhongkeji.com/static/jzkj/static/icon/right-jiantou.svg" mode="widthFix" />
				</view>
			</view>
			<!-- 商品标题 -->
			<view class="goods-detail-info-title">
				<!-- <text>{{ goodsDetail?.name }}</text> -->
				<text>{{ product.name }}</text>
			</view>
			<!-- 商品的配送方式-服务保障-商品参数 -->
			<view class="goods-detail-info-delivery">
				<view class="delivery-item" @click="showActionSheet = true">
					<image class="delivery-item-icon"
						src="https://saas.jizhongkeji.com/static/jzkj/static/icon/goods-peisong-icon.svg"
						mode="widthFix" />
					<text class="delivery-item-text">配送方式：</text>
					<text class="delivery-item-text">门店自提</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">快递物流</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">同城配送</text>
					<view class="delivery-item-text" style="margin-left: auto;">
						<image src="https://saas.jizhongkeji.com/static/jzkj/static/images/next1.svg"
							style="width: 20.56rpx;height: 20.08rpx;">
						</image>
					</view>
				</view>
				<view class="delivery-item" @click="showActionSheet = true">
					<image class="delivery-item-icon"
						src="https://saas.jizhongkeji.com/static/jzkj/static/icon/goods-baozhang-icon.svg"
						mode="widthFix" />
					<text class="delivery-item-text">服务保障：</text>
					<text class="delivery-item-text">无忧退款（运费险）</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">极速退款</text>
					<text class="delivery-item-text" style="height: 80%; overflow: hidden;">|</text>
					<text class="delivery-item-text">假一赔十</text>
					<view class="delivery-item-text" style="margin-left: auto;">
						<image src="https://saas.jizhongkeji.com/static/jzkj/static/images/next1.svg"
							style="width: 20.56rpx;height: 20.08rpx;">
						</image>
					</view>
				</view>
				<view class="delivery-item" @click="showActionSheet = true">
					<image class="delivery-item-icon"
						src="https://saas.jizhongkeji.com/static/jzkj/static/icon/goods-parm-icon.svg"
						mode="widthFix" />
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
						<image src="https://saas.jizhongkeji.com/static/jzkj/static/images/next1.svg"
							style="width: 20.56rpx;height: 20.08rpx;">
						</image>
					</view>
				</view>
			</view>
		</view>

		<!-- 客户评价 -->
		<view class="goods-detail-info-comment">
			<!-- 评价头部 -->
			<view class="comment-header">
				<text class="comment-header-title">客户评价（2万+）</text>
				<text class="comment-header-rate">好评率99%</text>
				<view class="comment-header-more">
					<image src="https://saas.jizhongkeji.com/static/jzkj/static/images/next1.svg"
						style="width: 20.56rpx;height: 20.08rpx;"></image>
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
			<view>
				<!-- <template is="wxParse" data="{{wxParseData:detail_content.nodes}}" /> -->
				<view v-html="product.detail"></view>
			</view>

			<!-- 商品详情图片 -->
			<view v-for="(item, index) in detail_image_uri" :key="index" class="detail_image">
				<image lazy-load :src="item" mode="widthFix" class="w-full" @click="previewImg(index)"></image>
			</view>

			<!-- 商品详情图片 -->
			<!-- <image class="goods-detail-info-detail-image" mode="widthFix" style="width: 100%; height: 390px;"
				src="https://saascdn.jizhongkeji.com/oss_jzkj/jpg/817f5a51a4aafe53fb3cd53c6c67e17f.w750.h780.d0.b23746.s121584.jpg" />
			<image class="goods-detail-info-detail-image" mode="widthFix" style="width: 100%; height: 390px;"
				src="https://saascdn.jizhongkeji.com/oss_jzkj/jpg/817f5a51a4aafe53fb3cd53c6c67e17f.w750.h780.d0.b23746.s121584.jpg" />
			<image class="goods-detail-info-detail-image" mode="widthFix" style="width: 100%; height: 390px;"
				src="https://saascdn.jizhongkeji.com/oss_jzkj/jpg/817f5a51a4aafe53fb3cd53c6c67e17f.w750.h780.d0.b23746.s121584.jpg" /> -->

			<!-- 技术支持 -->
			<view class="goods-detail-info-detail-support">
				<image class="goods-detail-info-detail-support-image"
					src="https://saas.jizhongkeji.com/static/jzkj/static/icon/sm-logo.svg" mode="widthFix" />
				<text class="goods-detail-info-detail-support-content">集中科技提供技术支持</text>
			</view>
		</view>

		<!-- 底部操作栏 -->
		<view class="goods-detail-info-bottom">
			<view class="goods-detail-info-bottom-left">
				<view class="goods-detail-info-bottom-left-item" @click="go_home">
					<image class="goods-detail-info-bottom-left-item-icon"
						src="https://saas.jizhongkeji.com/static/jzkj/static/icon/home-icon.svg" mode="widthFix" />
					<text class="goods-detail-info-bottom-left-item-text">首页</text>
				</view>
				<button open-type="contact" style="border: none; outline: none;line-height: 1.5;"
					class="goods-detail-info-bottom-left-item bg-transparent m-0 h-auto rounded-none shadow-none p-0">
					<image class="goods-detail-info-bottom-left-item-icon"
						src="https://saas.jizhongkeji.com/static/jzkj/static/icon/kefu.svg" mode="widthFix" />
					<text class="goods-detail-info-bottom-left-item-text">客服</text>
				</button>
				<view class="goods-detail-info-bottom-left-item" v-if="product.is_shoucang == 0"
					@click="good_colect(1)">
					<image class="goods-detail-info-bottom-left-item-icon"
						src="https://saas.jizhongkeji.com/static/jzkj/images/tool_3.png" mode="widthFix" />
					<text class="goods-detail-info-bottom-left-item-text">收藏</text>
				</view>
				<view class="goods-detail-info-bottom-left-item" v-else-if="product.is_shoucang == 1"
					@click="good_colect(0)">
					<image class="goods-detail-info-bottom-left-item-icon"
						src="https://saas.jizhongkeji.com/static/jzkj/static/icon/shoucang-active.svg"
						mode="widthFix" />
					<text class="goods-detail-info-bottom-left-item-text">收藏</text>
				</view>
			</view>
			<view class="goods-detail-info-bottom-right" v-if="business.is_open_shopping == 1">
				<view class="bottom-right-item" @click="show_buy_pop_handler('add')">加入购物车</view>
				<view class="bottom-right-item" @click="show_buy_pop_handler('buy')">立即购买</view>
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
						<image src="https://saas.jizhongkeji.com/static/jzkj/static/images/kun.png" alt=""
							class="goods-img"></image>
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
								<image src="https://saas.jizhongkeji.com/static/jzkj/static/icon/list.svg"
									style="width: 30.56rpx;height: 27.08rpx;">
								</image>
								<text>列表</text>
							</view>
						</view>
						<view class="goods-params-item-box">
							<view class="goods-params-item">
								<image src="https://saas.jizhongkeji.com/static/jzkj/static/images/kun.png"
									style="width: 61.11rpx; height: 61.11rpx;">
								</image>
								<text>固始鸡1200gx1只（共2.4斤）</text>
							</view>
							<view class="goods-params-item active">
								<image src="https://saas.jizhongkeji.com/static/jzkj/static/images/kun.png"
									style="width: 61.11rpx; height: 61.11rpx;">
								</image>
								<text>固始鸡1200gx1只（共2.4斤）</text>
							</view>
							<view class="goods-params-item disabled">
								<image src="https://saas.jizhongkeji.com/static/jzkj/static/images/kun.png"
									style="width: 61.11rpx; height: 61.11rpx;">
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
		<!-- 加购/购买 pop -->
		<template v-if="show_pop == 'add' || show_pop == 'buy'">
			<view class="my_pop !z-[100]" @click="close_pop" style="position: fixed;">
				<view class="my_pop_inner" @click.stop.prevent="return_close">
					<image lazy-load class="pop_close" mode="heightFix"
						src="https://saas.jizhongkeji.com/static/jzkj/images/close_pop_icon.png" @click="close_pop">
					</image>

					<view class="flex_row_space_bt pop_intro">
						<image lazy-load class="pop_img" mode="aspectFill"
							:src="act_img ? act_img : 'https://saas.jizhongkeji.com/static/jzkj/images/tool_1.png'"
							@click="close_pop"></image>
						<view class="flex_col_str_str pop_price">
							<view class="red_text">
								<text style="font-size: 35rpx;">￥</text>{{ price_show }}<text v-if="!have_chosed"
									style="font-size: 29rpx;font-weight: 400;margin-left: 4rpx;">起</text>
							</view>
							<view class="grey_text">
								¥{{ price_inter[0] }}~{{ price_inter[1] }}
							</view>
						</view>
					</view>

					<view class="pop_group" v-if="product.spec_list1?.option && product.spec_list1.option.length > 0">
						<view class="pop_group_title flex_row_space_bt">
							<view>{{ product.spec_list1.name }}</view>
							<view v-if="show_select_change" class="layout_btn flex_row_cen_cen" @click="change_layout">
								<template v-if="is_big_layout">
									<image lazy-load class="layout_btn_icon" mode="widthFix"
										src="https://saas.jizhongkeji.com/static/jzkj/images/layout_btn_icon.png">
									</image>
									<view class="layout_btn_text">列表</view>
								</template>
								<template v-else>
									<image lazy-load class="layout_btn_icon" mode="widthFix"
										src="../../static/big-img.svg"></image>
									<view class="layout_btn_text">大图</view>
								</template>
							</view>
						</view>
						<view
							:class="`spec_list flex_row_str_str flex_wrap have_image ${is_big_layout ? 'big_type' : ''}`">
							<template v-for="(item, index) in product.spec_list1.option" :key="index">
								<view
									:class="`spec_item ${act_spec1 == item.name ? 'active' : ''} ${item.store == 0 ? 'no_store' : ''} ${!is_big_layout && item.store == 0 ? 'sell_out' : 'sell_have'}`"
									@click="choose_spec1(item)">
									<view v-if="item.img_uri && show_select_change">
										<image lazy-load class="spec_item_img" mode="aspectFill" :src="item.img_uri">
										</image>
									</view>
									<view v-if="!item.img_uri && show_select_change">
										<image lazy-load class="spec_item_img" mode="aspectFill"
											src="https://saas.jizhongkeji.com/static/jzkj/images/big_guige.png">
										</image>
									</view>
									<view class="spec_name_text">{{ item.name }}</view>
									<view v-if="item.store == 0" class="no_store_lable flex_col_cen_cen">已售罄</view>
								</view>
							</template>
						</view>
					</view>
					<view class="pop_group" v-if="product.spec_list2?.option && product.spec_list2.option.length > 0">
						<view class="pop_group_title">
							{{ product.spec_list2.name }}
						</view>
						<view class="spec_list flex_row_str_str flex_wrap">
							<template v-for="item in product.spec_list2.option" :key="item.id">
								<view
									:class="`spec_item ${act_spec2 == item.name ? 'active' : ''} ${item.store == 0 ? 'no_store no_store_juli' : ''}`"
									@click="choose_spec2(item)">
									{{ item.name }}
									<view v-if="item.store == 0" class="no_store_lable flex_col_cen_cen">已售罄</view>
								</view>
							</template>
						</view>
					</view>
					<view class="pop_group">
						<view class="pop_group_title">
							购买数量：
						</view>
						<view class="count_btn_box width_max_content flex_row_space_bt">
							<view :class="`de_btn count_btn flex_col_cen_cen ${add_count == 1 ? 'no_active' : ''}`"
								@click="reduce_count">
								<image lazy-load class="reduce_icon_new" mode="widthFix"
									src="https://saas.jizhongkeji.com/static/jzkj/images/reduce.png"></image>
							</view>
							<view class="count flex_col_cen_cen" style="height: unset;">{{ add_count || 1 }}</view>
							<view
								:class="`add_btn count_btn flex_col_cen_cen ${add_count == max_count ? 'no_active' : ''}`"
								@click="add_count_handler">
								<image lazy-load class="reduce_icon_new" mode="widthFix"
									src="https://saas.jizhongkeji.com/static/jzkj/images/add.png"></image>
							</view>
							<!-- <view class="reduce count_btn flex_col_cen_cen {{add_count == max_count ? 'no_active' : ''}}" bindtap="add_count">+</view> -->
						</view>
					</view>
					<view v-if="show_pop == 'add'" class="pop_btn add flex_col_cen_cen" @click="add_shopcar">
						我选好了，加入购物车
					</view>
					<view v-if="show_pop == 'buy'" class="pop_btn flex_col_cen_cen" @click="to_buy">
						立即购买
					</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import { request } from '@/utils/request.js';
import { useTempStore } from '@/stores/temp';
import { storeToRefs } from 'pinia';
import { replaceRichTextImage } from '@/utils';
const { user, business } = storeToRefs(useTempStore());

const goodsId = ref(); // 商品id
const goodsDetail = ref({}); // 商品详情
const product = ref({}); // 商品

const act_spec1 = ref(0); // 规格1
const act_spec2 = ref(0); // 规格2
const show_select_change = ref(false); // 是否展示列表或者大图的选项
const need_spec1 = ref(0); // 是否需要规格1
const need_spec2 = ref(0); // 是否需要规格2
const add_count = ref(1); // 购买数量
const price_show = ref(0); // 显示价格
const price_inter = ref([0, 0]); // 价格区间
const act_img = ref(''); // 活动图片
const max_count = ref(5); // 最大购买数量
const video_list = ref([]); // 视频列表
const swiper = ref({// 轮播图
	swiperImgUrls: [],
	indicatorDots: '',
	autoplay: true,
	interval: 5000,
	duration: 1000,
	video: null,
});
const detail_image_uri = ref([]); // 商品详情图片
const swiperIndex = ref(0); // 轮播图当前索引
const act_info = ref(0); // 活动价格 ???
const limit = ref([1, 999]); // 购买数量限制

const swiperCurrentIndex = ref(0); // 轮播图当前索引

const show_pop = ref('')
const have_chosed = ref()
const height = ref(1200)
const width = ref(750)
const bofang_show = ref(true)
const current_page = ref(1)
const product_id = ref()
const is_loading = ref(false)
const spec_list2_init = ref()
const current_item = ref(0) // 当前选中的规格
const is_big_layout = ref(0)

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
	// goodsId.value = options.id;
	// getData();


	if (options && options.scene) {
		var sceneStr = decodeURIComponent(options.scene);
		var params = sceneStr.split('&');

		params.forEach(param => {
			const [key, value] = param.split('=');
			if (key === 'fuid') {
				getApp().globalData.fuid = value;
			} else if (key === 'productid') {
				product_id.value = value;
			}
		});
		console.log('product_id', product_id.value);
	}

	if (options && options.id) {
		console.log('options.idoptions.id');
		product_id.value = options.id;
	}

	// console.log(options.category_id);
	if (options.category_id) {
		click_page(3, product_id.value, options.category_id)
	} else {
		click_page(3, product_id.value, '')
	}

	goods_detail_v2()
})




// 切换图片和视频
function taggleWindow(type) {
	// console.log(type);
	if (type == 'video') {
		swiperCurrentIndex.value = 0
	} else {
		swiperCurrentIndex.value = 1
	}
}


async function goods_detail_v2() {

	let res = await request('/WxAppCustomer/goods_detail_v2', 'post', { id: product_id.value })
	// 更新数据
	console.log(res);
	if (res.code != 0) {
		wx.showToast({
			title: res.msg,
			icon: 'none'
		})
		return;
	}
	product.value = res.data.detail

	// console.log(product.value);
	product.value.detail ? product.value.detail = replaceRichTextImage(product.value.detail) : '' // 替换富文本中的图片

	is_loading.value = true
	console.log('产品详情', product.value);
	if (res.data.detail) {
		// 修改页面标题
		uni.setNavigationBarTitle({
			title: res.data.detail.name
		})

		// 处理规格
		let product_temp = res.data.detail
		if (product_temp.spec_list1 && product_temp.spec_list1.option.length > 0) {
			need_spec1.value = 1 // 需要规格1

			product_temp.spec_list1.option.forEach((ele, index) => {
				if (ele.img_uri) {
					show_select_change.value = true
					return
				}
			});
			console.log('规格', product_temp.spec_list1);
		}

		// 需要规格2
		if (product_temp.spec_list2 && product_temp.spec_list2.option.length > 0) {
			need_spec2.value = 1
			spec_list2_init.value = product_temp.spec_list2.option
		}


		if (add_count.value > 0) {
			let show = Math.round((product.value.price_min * add_count.value * 100), 2) / 100;
			let min = Math.round((product.value.price_min * add_count.value * 100), 2) / 100;
			let max = Math.round((product.value.price_max * add_count.value * 100), 2) / 100;
			// let show = Math.round((product_temp.price_min * add_count.value * 100), 2) / 100;
			// let min = Math.round((product_temp.price_min * add_count.value * 100), 2) / 100;
			// let max = Math.round((product_temp.price_max * add_count.value * 100), 2) / 100;
			price_show.value = show;
			price_inter.value = [min, max];
			act_img.value = product_temp.image_uris_arr ? product_temp.image_uris_arr[0] : '';
			max_count.value = product_temp.max_count;
		} else {
			price_show.value = product_temp.price_min;
			price_inter.value = [product_temp.price_min, product_temp.price_max];
			act_img.value = product_temp.image_uris_arr ? product_temp.image_uris_arr[0] : '';
			max_count.value = product_temp.max_count;
		}

		// 视频列表
		if (res.data.detail.video_uri_arr.length > 0) {
			res.data.detail.video_uri_arr.forEach(ele => {
				video_list.value.push({
					url: ele,
					width: 375,
					height: 375,
					bofang_show: true,
				});
			});
			console.log("视频视频视频", video_list.value);
		}

		// that.imgs_list_all=[];
		// if(){
		//     that.imgs_list_all=[];
		// }

		swiper.value.swiperImgUrls = res.data.detail.image_uris_arr;
		swiper.value.video = res.data.detail.video_1;
		swiper.value = swiper.value

		// console.log('swiperswiperswiper', swiper.value.swiperImgUrls.length);
		if (swiper.value.swiperImgUrls.length == 1) {
			swiper.value.indicatorDots = false
		} else {
			// LRR 修改swiper样式 改为false
			swiper.value.indicatorDots = false
		}

		// if (that.data.swiper.video) {
		//   that.data.swiper.autoplay = false;
		// }
		if (res.data.detail.detail) {
			// WxParse.wxParse('detail_content', 'html', res.data.detail.detail, that, 5);
			// console.log(`WxParse.wxParse('detail_content...`, res.data.detail.detail);
		}
		// that.setData({
		// 	detail_image_uri: res.data.data.detail.detail_images,
		// 	swiper: that.data.swiper
		// })
		detail_image_uri.value = res.data.detail.detail_images
		// swiper.value = swiper.value

		// console.log('detail_image_uridetail_image_uri', that.data.detail_image_uri);

		console.log('5555555556666666', product.value.spec_list1);



		if (business.value.is_show_buy_pop == 1) {
			// ---打开立即购买弹窗
			if (!(!product.value.spec_list1 && product.value.price > 0)) {
				// if (type == 'buy') {
				// console.log('立即购买111111111', that.data.product.spec_list2.option[0].name);
				show_pop.value = 'buy'
				act_spec1.value = 0
				act_spec2.value = 0
				// console.log('dakai13333333333333333333333333');

				// 选中默认规格1
				if (product.value.spec_list1 && product.value.spec_list1.option.length > 0) {
					act_spec1.value = product.value.spec_list1.option[0].name
					filter_by_spec()
				}
				//  选中默认规格2
				if (product.value.spec_list2 && product.value.spec_list2.option && product.value.spec_list2.option.length > 0) {
					act_spec2.value = product.value.spec_list2.option[0].name
					filter_by_spec()
				}

				uni.setPageStyle?.({
					style: {
						overflow: 'hidden'
					}
				})
			}
		}
	}
}

// 预览图片放大
function previewImg_detail(e) {
	//获取当前图片的下标
	var index = e.currentTarget.dataset.index;

	// type 1:商品图  2：详情图
	if (e.currentTarget.dataset.type == 1) {
		//所有图片
		var imgs = product.value.image_uris_arr;
	} else if (e.currentTarget.dataset.type == 2) {
		//所有图片
		var imgs = product.value.detail_images;
	}

	uni.previewImage({
		//当前显示图片
		current: imgs[index],
		//所有图片
		urls: imgs
	})
}
// 预览图片
function previewImg(index) {
	//获取当前图片的下标
	// var index = e.currentTarget.dataset.tuindex;
	//所有图片
	var imgs = detail_image_uri.value;
	uni.previewImage({
		//当前显示图片
		current: imgs[index],
		//所有图片
		urls: imgs
	})
}

function filter_by_spec() {
	if (need_spec1.value && need_spec2.value) { // 双规格
		let rel_spec_list2 = product.value.spec_all.filter(m => {
			return m.spec1_value == act_spec1.value
		}).map(m1 => {
			return {
				name: m1.spec2_value,
				store: m1.store,
			}
		})
		console.log('当前的规格1', rel_spec_list2);

		product.value.spec_list2.option = rel_spec_list2 || []
		// 数据更新后
		let info = null
		if (act_spec2.value) {
			info = product.value.spec_all.filter(m => m.spec1_value == act_spec1.value && m.spec2_value == act_spec2.value)[0]
		} else {
			info = product.value.spec_all.filter(m => (m.spec1_value == act_spec1.value))[0]
		}

		if (info.img_uri && info.img_uri.length > 0) {
			act_img.value = info.img_uri
		}
		console.log('多选', info);

		let show = Math.round((info.price * (add_count.value) * 100), 2) / 100;
		// this.setData({
		// 	'price_show': show,
		// 	'act_info': info,
		// 	'max_count': info.store,
		// })
		price_show.value = show
		act_info.value = info
		max_count.value = info.store
		return
	} else {
		let spec1 = act_spec1.value
		console.log('选择规格后的数据', product.value.spec_all);
		let info = product.value.spec_all.filter(m => m.spec1_value == spec1)[0]
		let show = Math.round((info.price * (add_count.value) * 100), 2) / 100;

		console.log('选择规格后', info);
		if (info.img_uri && info.img_uri.length > 0) {
			// this.setData({
			// 	'act_img': info.img_uri,
			// })
			act_img.value = info.img_uri
		}
		// this.setData({
		// 	'price_show': show,
		// 	'act_info': info,
		// 	'max_count': info.store,
		// })
		price_show.value = show
		act_info.value = info
		max_count.value = info.store

		console.log('选择规格后的最大数量', max_count.value);
	}
}
async function show_buy_pop_handler(type) {
	// showActionSheetSlot.value = true
	if (!product.value.spec_list1 && !product.value.price) {
		uni.showToast({
			title: '该商品暂不支持购买',
			icon: 'none'
		})
		return
	}

	// 只有价格没有多规格
	if (!product.value.spec_list1 && product.value.price > 0) {
		if (type == 'add') {

			let res = await request('/WxAppCustomer/add_shopcar_only_price', 'post', {
				goods_id: product.value.id,
				count: 1
			})
			if (res) {
				uni.showToast({
					title: res.msg,
					icon: 'none',
					mask: true
				})
				close_pop()
			}
		}

		if (type == 'buy') {
			uni.navigateTo({
				url: '/pages/mine/pay?goods_id=' + product.value.id + '&price_id=0&count=1',
			})
		}
		return
	} else {
		if (type == 'add') {

			show_pop.value = 'add';
			act_spec1.value = 0;
			act_spec2.value = 0;
			have_chosed.value = 0;
			add_count.value = 1;
			// product.value.spec_list2.option = product.value.spec_list2.option;
			price_show.value = product.value.price_min;
			price_inter.value = [product.value.price_min, product.value.price_max];
			act_img.value = product.value.image_uris_arr ? product.value.image_uris_arr[0] : '';


			// 选中默认规格1
			if (product.value.spec_list1 && product.value.spec_list1.option.length > 0) {
				act_spec1.value = product.value.spec_list1.option[0].name
				filter_by_spec()
			}
			//  选中默认规格2
			if (product.value.spec_list2 && product.value.spec_list2.option && product.value.spec_list2.option.length > 0) {
				act_spec2.value = product.value.spec_list2.option[0].name
				filter_by_spec()
			}

			uni.setPageStyle?.({
				style: {
					overflow: 'hidden'
				}
			})
		}
		if (type == 'buy') {

			// console.log('立即购买111111111', this.data.product.spec_list2.option[0].name);
			show_pop.value = 'buy'
			act_spec1.value = 0
			act_spec2.value = 0

			// 选中默认规格1
			if (product.value.spec_list1 && product.value.spec_list1.option.length > 0) {
				act_spec1.value = product.value.spec_list1.option[0].name
				filter_by_spec()
			}
			//  选中默认规格2
			if (product.value.spec_list2 && product.value.spec_list2.option.length > 0) {
				act_spec2.value = product.value.spec_list2.option[0].name
				filter_by_spec()
			}


			uni.setPageStyle?.({
				style: {
					overflow: 'hidden'
				}
			})
		}
	}
}
// 立即购买
function to_buy(e) {
	if (!act_spec1.value) {
		uni.showToast({
			title: '请先选择规格',
			icon: 'none'
		})
		return
	}

	if (need_spec1.value && need_spec2.value) {
		let name = product.value.spec_list2.name || '规格';
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
		url: '/pages/mine/pay?goods_id=' + product.value.id + '&price_id=' + goods_price.id + '&count=' + add_count.value,
	})
	close_pop()
}

// 轮播图改变事件 [更新swiperIndex]
function swiperChange(e) {
	// console.log(e, '轮播图改变');
	swiperIndex.value = e.detail.current
	console.log('swiperCurrentIndex.value', swiperCurrentIndex.value)
}

function startVideoPlay(e) {
	swiper.value.autoplay = false
}
function onVideoEnded(e) {
	console.log('111');
	swiper.value.autoplay = true
}
function go_home(e) {
	uni.redirectTo({
		url: '/pages/index/index',
	})
}
function change_layout(e) {
	is_big_layout.value = !is_big_layout.value
}
function return_close(e) {
	return
}
function close_pop() {
	show_pop.value = ''
	uni.setPageStyle?.({
		style: {
			overflow: 'unset'
		}
	})
}
function reduce_count(e) {
	if (add_count.value > limit.value[0]) {
		if (!have_chosed.value) {
			let show = Math.round((product.value.price_min * (add_count.value - 1) * 100), 2) / 100;
			add_count.value = add_count.value * 1 - 1
			price_show.value = show
		} else {
			add_count.value = add_count.value * 1 - 1
			filter_by_spec()
		}
		return
	} else {
		uni.showToast({
			title: '亲，不能再减少了',
			icon: "none",
		})
	}
}
function add_count_handler(e) {
	console.log('添加商品数量和最大数量', add_count.value, max_count.value);
	if (add_count.value >= max_count.value) {
		uni.showToast({
			title: '亲，不能再添加了',
			icon: "none",
		})
		return
	}
	if (!have_chosed.value) {
		let show = Math.round((product.value.price_min * (add_count.value + 1) * 100), 2) / 100;
		add_count.value = add_count.value * 1 + 1
		price_show.value = show

		return
	} else {
		add_count.value = add_count.value * 1 + 1
		filter_by_spec()
	}
	return
}
function choose_spec1(item) {

	console.log('当前规格的数据', item);
	if (item.store == 0) {
		uni.showToast({
			title: '该规格已售罄，请选择其他规格',
			icon: 'none'
		})
		return
	}
	have_chosed.value = 1
	act_spec1.value = item.name
	act_spec2.value = 0
	add_count.value = 1
	filter_by_spec()

	console.log('点击了选择规格', act_spec1.value, act_spec2.value);
}
function choose_spec2(item) {
	if (!act_spec1.value && need_spec2.value) {
		let name = product.value.spec_list1.name
		uni.showToast({
			title: '请先选择' + name,
			icon: 'none'
		})
		return
	}

	if (item.store == 0) {
		uni.showToast({
			title: '该规格已售罄，请选择其他规格',
			icon: 'none'
		})
		return
	}

	have_chosed.value = 1
	act_spec2.value = item.name
	filter_by_spec()
}
async function add_shopcar(e) {
	if (!act_spec1.value) {
		uni.showToast({
			title: '请先选择规格',
			icon: 'none'
		})
		return
	}

	if (need_spec1.value && need_spec2.value) {
		let name = product.value.spec_list2.name || '规格';
		if (!act_spec2.value) {
			uni.showToast({
				title: '请选择' + name,
				icon: 'none'
			})
			return
		}
	}

	// wx.showToast({
	//     title: '微信支付接口审核中，暂不能付款',
	//     icon:'none'
	// })

	let goods_price = act_info.value
	console.log('goods_price', goods_price);

	let res = await request('/WxAppCustomer/add_shopcar_v2', 'post', {
		price_id: goods_price.id,
		goods_id: product.value.id,
		count: add_count.value || 0,
	})
	if (res) {
		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true
		})
		close_pop()
	}
}
//获取视频的宽高
function videometa(e) {
	//获取系统信息
	uni.getSystemInfo({
		success(res) {
			//视频的高
			let height_temp = e.detail.height;
			//视频的宽
			let width_temp = e.detail.width;
			//算出视频的比例
			let proportion = height_temp / width_temp;
			//res.windowWidth为手机屏幕的宽。
			let windowWidth = res.windowWidth;
			//算出当前宽度下高度的数值
			height_temp = proportion * windowWidth;

			// var video_list=this.data.product

			// TODO 多个视频

			height.value = height_temp
			width.value = windowWidth
		}
	})
}
//获取视频的宽高
function videometa2(e) {
	let video_index = e.currentTarget.dataset.index;
	console.log("skskdkskd视频高度", e);
	// return;
	//获取系统信息
	uni.getSystemInfo({
		success(res) {
			//视频的高
			let height_temp = e.detail.height;
			//视频的宽
			let width_temp = e.detail.width;
			//算出视频的比例
			let proportion = height_temp / width_temp;
			//res.windowWidth为手机屏幕的宽。
			let windowWidth = res.windowWidth;
			//算出当前宽度下高度的数值
			height_temp = proportion * windowWidth;

			video_list.value && video_list.value.forEach((m, i) => {
				if (i == video_index) {
					m.height = height_temp;
					m.width = windowWidth;

				}
			});
		}
	})
}
function stop_all_video(e) {
	video_list.value && video_list.value.forEach((m, i) => {
		try {
			uni.createVideoContext('video_id_' + i).pause();
		} catch (error) { }
		m.bofang_show = true;
	});
}
function play_video2(e) {
	stop_all_video();
	console.log("播放视频", e);

	let video_id = e.currentTarget.dataset.id;
	let video_index = e.currentTarget.dataset.index;
	uni.createVideoContext(video_id).play(); //wx.createVideoContext() 可以用这个函数控制视频的暂停与播放

	video_list.value && video_list.value.forEach((ele, index) => {
		if (index == video_index) {
			ele.bofang_show = false;
		}

	});
}
function play_video(video_id) {
	console.log("播放视频", video_id);

	// let video_id = e.currentTarget.dataset.id;
	uni.createVideoContext(video_id).play(); //wx.createVideoContext() 可以用这个函数控制视频的暂停与播放
	// this.setData({
	// 	bofang_show: false, //播放按钮消失
	// })
	bofang_show.value = false
}
function bindplay() {
	// this.setData({
	// 	bofang_show: false //播放视频，播放按钮消失
	// // })
	bofang_show.value = false
}
function bindplay2(e) {
	let video_index = e.currentTarget.dataset.index;
	video_list.value && video_list.value.forEach((m, i) => {
		if (i == video_index) {
			m.bofang_show = false;
		}
	});

	// this.setData({
	// 	video_list: this.data.video_list
	// })
}
function bindpause() { //视频暂停，播放按钮出现
	bofang_show.value = true
}
function bindpause2(video_index) { //视频暂停，播放按钮出现
	// let video_index = e.currentTarget.dataset.index;
	video_list.value && video_list.value.forEach((m, i) => {
		if (i == video_index) {
			m.bofang_show = true;
		}
	});
	// this.setData({
	// 	video_list: this.data.video_list
	// })
}
// 监听当前滑块
function currentPage(e) {
	let index = e.detail.current * 1 + 1;
	// console.log('监听当前滑块', e.detail.current);
	// TODO 
	// this.setData({
	// 	current_page: index
	// })
	current_page.value = index
}
// 点击页面
async function click_page(type, goods_id, goods_group_id) {
	let res = await request('/WxAppCustomer/visit_page', 'post', {
		type: type,
		goods_id: goods_id,
		goods_group_id: '' || goods_group_id
	})
	// 更新数据
	if (res.code == 0) { } else {
		// console.log(24444,res);
		uni.showToast({
			title: res.msg,
			icon: 'none',
			mask: true
		})
	}
}
// 点击收藏按钮
async function good_colect(actiontype) {
	let res = await request('/WxAppCustomer/costomer_collect', 'post', {
		// action_type: e.currentTarget.dataset.actiontype,
		action_type: actiontype,
		goods_id: product.value.id,
	})
	// 更新数据
	if (res.code == 0) {
		// that.goods_detail_v2();
		product.value.is_shoucang = res.data.is_shoucang;
	} else {
		// console.log(24444,res);
		uni.showToast({
			title: res.data.msg,
			icon: 'none',
			mask: true
		})
	}
}




/**
 * 用户点击右上角分享
 */
onShareAppMessage(options => {
	// return app.onShareAppMessage(options);
	return {
		title: product.value.name,
		path: 'pages/product/detail?id=' + product.value.id,
		imageUrl: product.value.image_uris_arr[0]
	};
})
onShareTimeline(() => {
	// return app.onShareAppMessage(options);
	console.log('111111', product.value);
	return {
		title: product.value.name,
		path: 'pages/product/detail?id=' + product.value.id,
		imageUrl: product.value.image_uris_arr[0]
	};
}) 
</script>

<style lang="scss" scoped>
@import '../../static/styles/detailOld.css';

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
