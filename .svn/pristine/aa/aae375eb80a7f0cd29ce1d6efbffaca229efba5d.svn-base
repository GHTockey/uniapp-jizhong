<template>
	<view class="application_index_container">
		<view v-if="is_loading">

			<view class="content_box" v-if="!(extend_active && extend_active.name)">
				<view class="content" style="padding-bottom: 200rpx;">
					<!-- <view>
						<template v-if="activity.detail_content.length > 0"
							v-for="(item, index) in activity.detail_content" :key="index">
							<rich-text class="xiangqing_rich_text" :nodes="item.content"
								v-if="item.content_type == 'rich_text'"></rich-text>
							<view>{{ item.content }}</view>
						</template>
</view> -->

					<view class="context">
						<template v-for="(item, index) in activity.detail_content" :key="index">
							<rich-text @click="on_tap_rich_text" @longpress="on_tap_rich_text"
								data-name="detail_content" v-if="item.content_type == 'rich_text'"
								:nodes="item.content"></rich-text>
							<video :loop="item.loop == 1" :autoplay="item.autostart == 1" :id="`video_${index}`"
								:data-videoindex="index" @play="bindplay" object-fit="contain"
								v-if="item.content_type == 'video'" :src="item.video_url" :poster="item.poster_url"
								:style="`width:100%;height:${690 * item.height / item.width}rpx;`"
								enable-play-gesture></video>
						</template>
					</view>
				</view>
			</view>

			<view class="new_layout" v-if="extend_active && extend_active.name" style="height: auto;">
				<view class="new_layout_cotent" style="padding-bottom: 200rpx;">

					<!-- 方案1 -->
					<view :style="{ minHeight: price_show || product.price > 0 ? '470px' : '490px' }">

						<!-- <import src="../../wxParse/wxParse.wxml" />
						<import src="/pages/template/item.wxml" /> -->

						<view style="position: relative;">
							<!-- <template is="swiper" bindchange="currentPage" data="{{swiper: swiper}}" /> -->
							<ProductItem name="swiper" :swiper="swiper" />
							<!-- 滑块位置 -->
							<view class="plan1_current_pages">
								{{ current_page }}/{{ swiper.video ? 1 + swiper.swiperImgUrls.length :
									swiper.swiperImgUrls.length
								}}
							</view>
						</view>

						<view class="section product_detail">
							<view class="name"
								style="font-weight: bold;color: #151515;padding:30rpx 0;padding-bottom: 20rpx;">
								<text class="business_name">{{ extend_active.brand }}</text> <text
									style="line-height: 2;">{{
										extend_active.name }}</text>
							</view>
						</view>

						<view>
							<view class="section detail_content" style="padding: 30rpx;">
								<view class="title">
									<text>企业简介</text>
									<view class="text_decoration_border"></view>
								</view>

								<view class="image_arrs_list" v-if="extend_active?.desc_images?.length > 0">
									<image @click="previewImg_desc_images_arr(index)" mode="widthFix"
										v-for="(item, index) in extend_active.desc_images_arr" :key="index" :src="item">
									</image>
								</view>

								<view>
									<rich-text class="xiangqing_rich_text" :nodes="extend_active.detail_context" />
								</view>

								<!-- <view v-if="extend_active.desc" class="wxParse" style="color: unset;">
									<text>wxParse 组件: wxParseData:desc.nodes</text>
									<template is="wxParse" :data="{wxParseData:desc.nodes}" />
								</view> -->
							</view>
						</view>

						<view>
							<view class="section detail_content" style="margin-top:18rpx; padding: 30rpx;">
								<view class="title">
									<text>产品详情</text>
									<view class="text_decoration_border"></view>
								</view>

								<view class="image_arrs_list" v-if="extend_active.detail_images_arr.length > 0">
									<image @click="previewImg_detail_images_arr(index)" mode="widthFix"
										v-for="(item, index) in extend_active.detail_images_arr" :key="index"
										:src="item">
									</image>
								</view>

								<view v-if="extend_active.detail_content" class="wxParse" style="color: unset;">
									<!-- <template is="wxParse" data="{{wxParseData:detail_content.nodes}}" /> -->
									<!-- <text>wxParse 组件: wxParseData:detail_content.nodes</text> -->

									<rich-text :nodes="extend_active.detail_content" />
								</view>
							</view>
						</view>

						<view>
							<view class="section detail_content" style="margin-top:18rpx; padding: 30rpx;">
								<view class="title">
									<text>产品卖点</text>
									<view class="text_decoration_border"></view>
								</view>

								<view class="image_arrs_list" v-if="extend_active.product_hot_images_arr.length > 0">
									<image @click="previewImg_product_hot_images_arr(index)" mode="widthFix"
										v-for="(item, index) in extend_active.product_hot_images_arr" :key="index"
										:src="item">
									</image>
								</view>

								<view v-if="extend_active.product_hot" class="wxParse" style="color: unset;">
									<!-- <text>wxParse 组件: wxParseData:product_hot.nodes</text> -->
									<!-- <template is="wxParse" data="{{wxParseData:product_hot.nodes}}" /> -->
									<rich-text :nodes="extend_active.product_hot" />
								</view>
							</view>
						</view>

						<view>
							<view class="section detail_content"
								style="margin-top:18rpx;padding-left: 0;padding-right: 0;">
								<view class="title" style="margin-left: 30rpx;margin-bottom: 0rpx;">
									<text>产品信息</text>
									<view class="text_decoration_border"></view>
								</view>

								<view style="display: flex;flex-direction: column;width: 100%;">

									<view class="text_decoration_item">
										<view class="text_decoration_title">产品名称</view>
										<view class="text_decoration_name">{{ extend_active.name }}</view>
									</view>
									<view class="text_decoration_item">
										<view class="text_decoration_title">所属品类</view>
										<view class="text_decoration_name">{{ extend_active.category }}</view>
									</view>
									<view class="text_decoration_item">
										<view class="text_decoration_title">产地</view>
										<view class="text_decoration_name">{{ extend_active.address }}</view>
									</view>
									<view class="text_decoration_item">
										<view class="text_decoration_title">包装规格</view>
										<view class="text_decoration_name">{{ extend_active.specs }}</view>
									</view>
									<view class="text_decoration_item">
										<view class="text_decoration_title">零售价</view>
										<view class="text_decoration_name">{{ extend_active.price }}</view>
									</view>
									<view class="text_decoration_item">
										<view class="text_decoration_title">适合渠道</view>
										<view class="text_decoration_name">{{ extend_active.channel }}</view>
									</view>
									<view class="text_decoration_item">
										<view class="text_decoration_title">利润率</view>
										<view class="text_decoration_name">{{ extend_active.profit }}</view>
									</view>
								</view>

							</view>
						</view>

						<view>
							<view class="section detail_content" style="margin-top:18rpx; padding: 30rpx;">
								<view class="title">
									<text>市场扶持</text>
									<view class="text_decoration_border"></view>
								</view>

								<view class="image_arrs_list" v-if="extend_active.market_images_arr?.length > 0">
									<image @click="previewImg_market_images_arr(index)" mode="widthFix"
										v-for="(item, index) in extend_active.market_images_arr" :key="index"
										:src="item">
									</image>
								</view>

								<view class="wxParse" style="color: unset;">
									<!-- <text>wxParse 组件: wxParseData:market.nodes</text> -->
									<!-- <template is="wxParse" data="{{wxParseData:market.nodes}}" /> -->
									<rich-text :nodes="extend_active.market" />
								</view>
							</view>
						</view>

					</view>

				</view>
			</view>
		</view>

		<view class="bottom_baocun_box">
			<button @click="go_applications" class="go_applications"
				style=" width: 692rpx;height: 100rpx;background: #FF4F26;border-radius: 14rpx;margin-top: 17rpx;  "><text
					style=" font-size: 32rpx;font-weight: 400;color: #FFFFFF;line-height: 0rpx;">立即报名</text></button>
		</view>
	</view>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';
import { request } from '@/utils/request.js';
import { formatTime } from '@/utils';

const ctx = getCurrentInstance() // 获取当前实例

const activity_id = ref(1)
const end_date = ref('')
const show_one = ref(false)
const is_loading = ref(false)

const swiper = ref({
	swiperImgUrls: [],
	indicatorDots: '',
	autoplay: true,
	interval: 5000,
	duration: 1000,
	video: null,
})
const product = ref({})
const detail_image_uri = ref([])
const bofang_show = ref(true)
const height = ref(1200)
const width = ref(750)
// 商品图片
// 详情已经商品图
// imgs_list_all:[],
const current_page = ref(1) //当前滑块的位置
const video_list = ref([]) //视频列表
const show_pop = ref('')
const max_count = ref(5)
const add_count = ref(1)
const price_show = ref(0)
const act_img = ref(null)
const price_inter = ref([0, 0])
const limit = ref([1, 999])
const act_spec1 = ref(0)
const act_spec2 = ref(0)
const current_item = ref(0) // 当前选中的规格
const need_spec1 = ref(0)
const need_spec2 = ref(0)
const have_chosed = ref(0)
const is_big_layout = ref(0)
// 是否展示列表或者大图的选项
const show_select_change = ref(false)

const extend_active = ref({})
const business = ref({})
const activity = ref({})
const is_join = ref(false)


onLoad((options) => {
	// console.log('options', options)
	activity_id.value = options.activity_id
	uni.hideHomeButton?.()

	activity_id.value = options.activity_id || 0
})
onShow(() => {
	onShowHandler()
})

async function onShowHandler() {
	let res = await request('/WxAppCustomer/activity_detail', 'post', { activity_id: activity_id.value })
	console.log('res', res)
	if (res.code != 0) return uni.showModal({
		title: '活动结束',
		content: '活动结束',
		showCancel: false
	});

	let applicationitem = res.data.activity
	if (applicationitem.product_id > 0) return go_applications(applicationitem)

	let date = formatTime(new Date())
	end_date.value = date
	is_loading.value = true

	if (applicationitem.start_time && applicationitem.start_time > date) {
		uni.showModal({
			title: '活动未开始',
			content: '活动未开始',
			showCancel: false
		})
		activity.value = res.data.activity
		business.value = res.data.business
		extend_active.value = res.data.extend_active
		is_join.value = res.data.is_join
		uni.setNavigationBarTitle({
			title: res.data.activity.name
		});
		if (res.data.extend_active && res.data.extend_active.name) {
			// 视频列表
			if (res.data.extend_active.video_uri_arr.length > 0) {
				var video_list_temp = [];
				res.data.extend_active.video_uri_arr.forEach(ele => {
					video_list_temp.push({
						url: ele,
						width: 375,
						height: 375,
						bofang_show: true,
					});
				});
				video_list_temp.value = video_list_temp
			}


			swiper.value.swiperImgUrls = res.data.extend_active.image_uris_arr;
			swiper.value.video = res.data.extend_active.video_1;

			if (swiper.value.swiperImgUrls.length == 1) {
				swiper.value.indicatorDots = false
			} else {
				// LRR 修改swiper样式 改为false
				swiper.value.indicatorDots = false
			}
			console.log('这里需要处理富文本，待定 res.data.extend_active', res.data.extend_active)
			return // TODO: 这里需要处理富文本，待定

			if (res.data.extend_active.detail_context) {
				WxParse.wxParse('detail_content', 'html', res.data.data.extend_active.detail_context, that, 5);
			}

			if (res.data.extend_active.product_hot) {
				WxParse.wxParse('product_hot', 'html', res.data.data.extend_active.product_hot, that, 5);
			}

			if (res.data.extend_active.desc) {
				WxParse.wxParse('desc', 'html', res.data.data.extend_active.desc, that, 5);
			}
			if (res.data.extend_active.market) {
				WxParse.wxParse('market', 'html', res.data.data.extend_active.market, that, 5);
			}

			that.setData({
				swiper: that.data.swiper
			})

		}
		return
	}

	if (date > res.data.activity.end_time) {
		uni.showModal({
			title: '活动结束',
			content: '活动结束',
			showCancel: false
		})
		activity.value = res.data.activity
		business.value = res.data.business
		extend_active.value = res.data.extend_active
		is_join.value = res.data.is_join
		uni.setNavigationBarTitle({
			title: res.data.data.activity.name
		})

		if (res.data.data.extend_active && res.data.data.extend_active.name) {
			// 视频列表
			if (res.data.extend_active.video_uri_arr.length > 0) {
				var video_list_temp = [];

				res.data.extend_active.video_uri_arr.forEach(ele => {
					video_list_temp.push({
						url: ele,
						width: 375,
						height: 375,
						bofang_show: true,
					});
				});
				video_list_temp.value = video_list_temp
			}

			swiper.value.swiperImgUrls = res.data.extend_active.image_uris_arr;
			swiper.value.video = res.data.extend_active.video_1;

			if (swiper.value.swiperImgUrls.length == 1) {
				swiper.value.indicatorDots = false
			} else {
				// LRR 修改swiper样式 改为false
				swiper.value.indicatorDots = false
			}

			return console.log('[[wxParse]] 待处理 res.data.extend_active', res.data.extend_active)

			if (res.data.data.extend_active.detail_context) {
				WxParse.wxParse('detail_content', 'html', res.data.data.extend_active.detail_context, that, 5);
			}
			if (res.data.data.extend_active.product_hot) {
				WxParse.wxParse('product_hot', 'html', res.data.data.extend_active.product_hot, that, 5);
			}
			if (res.data.data.extend_active.desc) {
				WxParse.wxParse('desc', 'html', res.data.data.extend_active.desc, that, 5);
			}
			if (res.data.data.extend_active.market) {
				WxParse.wxParse('market', 'html', res.data.data.extend_active.market, that, 5);
			}
			// that.setData({
			// 	swiper: that.data.swiper
			// })
		}
		return
	}

	if (res.data.activity.tip_text &&
		(!getApp().globalData.activity_tip_ids ||
			!getApp().globalData.activity_tip_ids.includes(res.data.activity.id))) {
		if (!getApp().globalData.activity_tip_ids) {
			getApp().globalData.activity_tip_ids = []
		}
		getApp().globalData.activity_tip_ids.push(res.data.activity.id)
		uni.showModal({
			content: res.data.activity.tip_text,
			success(res) {
				if (res.confirm) {
					go_applications()
				} else if (res.cancel) {
					// console.log('用户点击取消')
				}
			}
		})
	}


	// wx.setData(res.data.data);
	activity.value = res.data.activity
	business.value = res.data.business
	extend_active.value = res.data.extend_active
	is_join.value = res.data.is_join
	uni.setNavigationBarTitle({
		title: res.data.activity.name
	})
	if (res.data.extend_active && res.data.extend_active.name) {
		// 视频列表
		if (res.data.extend_active.video_uri_arr.length > 0) {
			var video_list_temp = [];

			res.data.extend_active.video_uri_arr.forEach(ele => {
				video_list_temp.push({
					url: ele,
					width: 375,
					height: 375,
					bofang_show: true,
				});
			});

			// that.setData({
			// 	video_list: video_list_temp,
			// });
			video_list.value = video_list_temp
		}


		swiper.value.swiperImgUrls = res.data.extend_active.image_uris_arr;
		swiper.value.video = res.data.extend_active.video_1;

		if (swiper.value.swiperImgUrls.length == 1) {
			swiper.value.indicatorDots = false
		} else {
			// LRR 修改swiper样式 改为false
			swiper.value.indicatorDots = false
		}

		// pages/activity/application_index
		return console.log('[[wxParse]] 待处理 res.data.extend_active', res.data.extend_active)

		if (res.data.data.extend_active.detail_context) {
			WxParse.wxParse('detail_content', 'html', res.data.data.extend_active.detail_context, that, 5);
		}
		if (res.data.data.extend_active.product_hot) {
			WxParse.wxParse('product_hot', 'html', res.data.data.extend_active.product_hot, that, 5);
		}
		if (res.data.data.extend_active.desc) {
			WxParse.wxParse('desc', 'html', res.data.data.extend_active.desc, that, 5);
		}
		if (res.data.data.extend_active.market) {
			WxParse.wxParse('market', 'html', res.data.data.extend_active.market, that, 5);
		}
		that.setData({
			swiper: that.data.swiper
		})
	}
}


//点击预览图片,放大预览
function on_tap_rich_text(e) {
	// console.log(e);
	var imgs = [] //把详情页面所有图片放在一个数组中
	var name = e.currentTarget.dataset.name;
	activity.value[name].forEach((m) => {
		// console.log("mmmmm", m);
		if (m.content_type == "rich_text") { //如果详情内容是富文本，则遍历富文本中content中的每一个元素
			m.content.forEach((m2) => {
				// console.log("mmmm2", m2);
				find_imgs(m2, imgs) //调用函数，把查找到的图片添加到imgs数组中
			})
		}
	})
	// console.log("imgs", imgs);
	// let currentUrl = e.currentTarget.dataset.src
	if (imgs.length > 0) { //如果图片多余1张，则可以左右滑动查看(一张的时候左右滑不动)
		uni.previewImage({
			current: imgs[0], // 当前显示图片的为数组的第一张
			urls: imgs // 需要预览的图片http链接列表
		})
	}
}
// 查找图片
function find_imgs(node, imgs) { //node是自定义节点，表示node下面的imgs
	if (node.name == "img") {
		imgs.push(node.attrs.src) //把查找到的图片放进imgs数组中
	}
	if (node.children) { //判断node下面有没有children，有的话接着遍历children里面的children去找img
		node.children.forEach((m) => {
			find_imgs(m, imgs) //调用查找函数，把得到的图片放进数组中
		})
	}
}




// 去报名
function go_applications() {
	if (activity.value.start_time && activity.value.start_time > end_date.value) {
		uni.showModal({
			title: '活动未开始',
			content: '活动未开始',
			showCancel: false,
			complete: (res) => {

			}
		})
		return
	}

	if (activity.value.end_time && activity.value.end_time > end_date.value) {
		uni.showModal({
			title: '活动结束',
			content: '活动结束',
			showCancel: false,
			complete: (res) => {

			}
		})
		return
	}


	if (is_join.value) {
		// 已经报名过的去报名记录页
		uni.navigateTo({
			url: `/pages/activity/application_record?activity_id=${activity_id.value}`,
		})
	} else {
		uni.navigateTo({
			url: `/pages/activity/application?activity_id=${activity_id.value}`,
		})
	}

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
function videometa(e) {
	//获取系统信息
	uni.getSystemInfo({
		success(res) {
			//视频的高
			var height_temp = e.detail.height;
			//视频的宽
			var width_temp = e.detail.width;
			//算出视频的比例
			var proportion = height_temp / width_temp;
			//res.windowWidth为手机屏幕的宽。
			var windowWidth = res.windowWidth;
			//算出当前宽度下高度的数值
			height_temp = proportion * windowWidth;

			// var video_list=this.data.product

			// TODO 多个视频

			height.value = height_temp
			width.value = windowWidth
		}
	})
}
function videometa2(e) {
	var video_index = e.currentTarget.dataset.index;
	console.log("skskdkskd视频高度", e);
	// return;
	//获取系统信息
	uni.getSystemInfo({
		success(res) {
			//视频的高
			var height_temp = e.detail.height;
			//视频的宽
			var width_temp = e.detail.width;
			//算出视频的比例
			var proportion = height_temp / width_temp;
			//res.windowWidth为手机屏幕的宽。
			var windowWidth = res.windowWidth;
			//算出当前宽度下高度的数值
			height_temp = proportion * windowWidth;

			video_list.value && video_list.value.forEach((m, i) => {
				if (i == video_index) {
					m.height = height_temp;
					m.width = windowWidth;

				}
			});

			// that.setData({
			// 	video_list: that.data.video_list
			// })
		}
	})
}
// 暂停所有视频
function stop_all_video(e) {
	video_list.value && video_list.value.forEach((m, i) => {
		try {
			uni.createVideoContext('video_id_' + i, ctx).pause();
		} catch (error) { }

		m.bofang_show = true;
	});
}
function play_video2(e) {

	stop_all_video();

	console.log("播放视频", e);

	var video_id = e.currentTarget.dataset.id;
	var video_index = e.currentTarget.dataset.index;
	uni.createVideoContext(video_id).play(); //wx.createVideoContext() 可以用这个函数控制视频的暂停与播放

	// 播放视频后，将视频的播放状态设置为 false
	video_list.value.forEach((ele, index) => {
		if (index == video_index) {
			ele.bofang_show = false;
		}

	});
}
function play_video(e) {
	console.log("播放视频", e);

	var video_id = e.currentTarget.dataset.id;
	uni.createVideoContext(video_id).play(); //wx.createVideoContext() 可以用这个函数控制视频的暂停与播放
	bofang_show.value = false //播放按钮消失
}
function bindplay() { //播放视频，播放按钮消失
	bofang_show.value = false
}
function bindplay2(e) {
	var video_index = e.currentTarget.dataset.index;
	video_list.value && video_list.value.forEach((m, i) => {
		if (i == video_index) {
			m.bofang_show = false;

		}
	});
}
function bindpause() {//视频暂停，播放按钮出现
	bofang_show.value = true
}
function bindpause2(e) { //视频暂停，播放按钮出现
	var video_index = e.currentTarget.dataset.index;
	video_list.value && video_list.value.forEach((m, i) => {
		if (i == video_index) {
			m.bofang_show = true;
		}
	});
}

// 监听当前滑块
function currentPage(e) {
	var index = e.detail.current * 1 + 1;
	// console.log('监听当前滑块', e.detail.current);
	// TODO 
	current_page.value = index
}
// 预览图片放大
function previewImg_detail(e) {
	// //获取当前图片的下标
	// var url = e.currentTarget.dataset.url;
	// wx.previewImage({
	//     urls: [url], // 需要预览的图片http链接列表
	//     current: '', // 当前显示图片的http链接
	//   })

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
function previewImg(e) {
	//获取当前图片的下标
	var index = e.currentTarget.dataset.tuindex;
	//所有图片
	var imgs = extend_active.value.desc_images_arr;
	uni.previewImage({
		//当前显示图片
		current: imgs[index],
		//所有图片
		urls: imgs
	})
}
// 预览图片
function previewImg_desc_images_arr(index) {
	//获取当前图片的下标
	// var index = e.currentTarget.dataset.tuindex;
	//所有图片
	var imgs = extend_active.value.desc_images_arr;
	uni.previewImage({
		//当前显示图片
		current: imgs[index],
		//所有图片
		urls: imgs
	})
}
function previewImg_detail_images_arr(index) {
	//获取当前图片的下标
	// var index = e.currentTarget.dataset.tuindex;
	//所有图片
	var imgs = extend_active.value.detail_images_arr;
	uni.previewImage({
		//当前显示图片
		current: imgs[index],
		//所有图片
		urls: imgs
	})
}
function previewImg_product_hot_images_arr(index) {
	//获取当前图片的下标
	// var index = e.currentTarget.dataset.tuindex;
	//所有图片
	var imgs = extend_active.value.product_hot_images_arr;
	uni.previewImage({
		//当前显示图片
		current: imgs[index],
		//所有图片
		urls: imgs
	})
}
function previewImg_market_images_arr(index) {
	//获取当前图片的下标
	// var index = e.currentTarget.dataset.tuindex;
	//所有图片
	var imgs = extend_active.value.market_images_arr;
	uni.previewImage({
		//当前显示图片
		current: imgs[index],
		//所有图片
		urls: imgs
	})
}


function to_application_index_v(applicationitem) {
	if (applicationitem.product_id > 0) {
		go_applications(applicationitem);

		return;
	}
	uni.navigateTo({
		url: `/pages/activity/application_index?activity_id=${applicationitem.id}`,
	})
}
function go_applications_v(activity) {
	if (activity.start_time && activity.start_time > activity.end_date) {
		uni.showModal({
			title: '活动未开始',
			content: '活动未开始',
			showCancel: false,
			complete: (res) => {

			}
		})
		return
	}

	if (activity.end_time && activity.end_date > activity.end_time) {
		uni.showModal({
			title: '活动结束',
			content: '活动结束',
			showCancel: false,
			complete: (res) => {

			}
		})
		return
	}


	// if (this.data.is_join) {
	//   // 已经报名过的去报名记录页
	//   wx.navigateTo({
	//     url: `/pages/activity/application_record?activity_id=${this.data.activity_id}`,
	//   })
	// } else {
	uni.reLaunch({
		url: `/pages/activity/application?activity_id=${activity.id}&type=2`,
	})
	// }
}
</script>

<style scoped lang="scss">
.application_index_container {
	height: calc(100vh - $nav-height);
	background-color: #f7f8fa;
	position: relative;
}
</style>

<style>
@import '../../static/styles/detailOld.css';

.biaoti {
	padding-top: 25rpx;
	width: 525rpx;
	font-size: 38rpx;
	margin: 0 auto;
	font-family: STZhongsong-Regular, STZhongsong;
	font-weight: 400;
	color: #000000;
	line-height: 50rpx;
	word-wrap: break-word;
	word-break: break-all;
	overflow: hidden;
	text-align: center;
}

.content_box {
	background-color: #ffffff;
}

.content {
	width: 692rpx;
	margin: 0 auto;
	padding-bottom: 55rpx;
	display: flex;
	flex-direction: column;
}

.content image {
	width: 100%;
	margin-top: 22rpx;
}

.go_application_box {
	width: 750rpx;
	height: 107rpx;
	background: #F5F6F8;
	box-shadow: inset 0rpx 1rpx 0rpx 1rpx rgba(0, 0, 0, 0.16);
	border-radius: 0rpx 0rpx 0rpx 0rpx;
	display: flex;

}

.huodong_text {
	line-height: 50rpx;
	font-size: 30rpx;
	padding-top: 22rpx;
}

.go_applications {
	font-size: 32rpx;
	font-weight: 400;
	color: #FFFFFF;
	display: flex;
	justify-content: center;
	align-items: center;
}

.bottom_baocun_box {
	width: 750rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	height: 156rpx;
	background: #F5F6F8;
	border-top: 0.5rpx solid #CDCED0;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
	padding-bottom: 20rpx;
}

.text_decoration_item {
	border-bottom: 1rpx solid #DFDFDF;
	display: flex;
	justify-content: space-between;
	width: 100%;
	box-sizing: border-box;
	padding: 30rpx;
}

.text_decoration_item .text_decoration_title {
	flex: none;
	word-break: keep-all;
	margin-right: 100rpx;
	font-size: 30rpx;
	/* font-weight: bold; */
}

.text_decoration_item .text_decoration_name {
	text-align: right;
	font-size: 30rpx;
}

.business_name {
	background-image: linear-gradient(to bottom, #FF4744, #FF1F1B);
	color: #ffffff;
	padding: 2rpx 18rpx;
	border-radius: 8rpx;
	margin-right: 10rpx;
}

.image_arrs_list {
	display: flex;
	flex-direction: column;
	width: 100%;
	/* line-height: 0; */
}

.image_arrs_list image {
	width: 100%;
}
</style>
