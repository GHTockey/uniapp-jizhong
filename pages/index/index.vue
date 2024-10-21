<template>
  <view class="content"
    :style="isFixedHeadeContent ? `padding-top: ${containerMarTop}px; background-image: url('../../static/icon/thumb.png');` : `background-image: url('../../static/icon/thumb.png');`">

    <!-- 气泡提示 -->
    <BubbleTips :itemData="bubbleTipsData" />

    <!-- 手机状态栏高度 -->
    <view v-if="!isFixedHeadeContent" :style="`height: ${getStatusBarHeight()}px;`"></view>

    <view class="header-content" :class="{ 'header-content-fixed': isFixedHeadeContent }"
      :style="isFixedHeadeContent ? `top: ${getStatusBarHeight()}px` : ''">
      <!-- logo 标题: 高度为小程序胶囊按钮栏高度 -->
      <!-- <view class="logo-box" :style="isFixedHeadeContent ? `height: ${getTitleBarHeight()}px;` : ''"> -->
      <view class="logo-box" :style="`height: ${getTitleBarHeight()}px;`">
        <image src="https://wx.qlogo.cn/mmhead/Q3auHgzwzM4icHOjU9t841JOtBmdETgHf8hMGMoRaW0BMH1n3B6SicFQ/0" />
        <text>集中科技</text>
      </view>
      <!-- 搜索栏 -->
      <view class="searchBar">
        <image src="../../static/icon/组 9954@2x.png" />
        <input type="text" placeholder="请输入关键词进行搜索" placeholder-class="searchPlace" />
      </view>

      <!-- 背景图片 -->
      <!-- <image src="../../static/icon/thumb.png" ></image> -->
    </view>

    <!-- 轮播图 -->
    <!-- <view> -->
    <swiper class="carousel" :autoplay="!!banner_swiper.autoplay" :interval="banner_swiper.interval"
      :duration="banner_swiper.duration" :indicator-dots="banner_swiper.indicatorDots"
      indicator-color="rgba(255, 255, 255, .5)" indicator-active-color="#fff" :circular="banner_swiper.is_radius">
      <swiper-item v-for="(image, index) in banner_swiper?.images" :key="index">
        <image :src="image" mode="aspectFill" style="width: 100%; height: 100%;" />
      </swiper-item>
    </swiper>
    <!-- </view> -->

    <!-- 按钮菜单 -->
    <view class='menueview'>
      <view v-for="(item, index) in iconlist" wx:key="id" class="menue_item" @click="to_detail(item)">
        <view class="menue-image-box">
          <image lazy-load="true" :src="item.image_uri" mode="aspectFill" />
        </view>
        <view class="nav_text">{{ item.name }}</view>
      </view>
    </view>

    <!-- 新闻动态滚动 -->
    <NewsRoll />

    <!-- 渐变容器 -->
    <view class="gradient-box">
    </view>

    <!-- 新品列表 -->
    <scroll-view class="new-product" scroll-x>
      <view class="new-product-item" v-for="(item, index) in 10" :key="index"
        :style="{ marginRight: index == 9 ? '0' : '22rpx', backgroundImage: `url('../../static//images/new-p-bg.png')` }">
        <view class="txt-box">
          <text>新品首发</text>
          <text>这是一个测试标题</text>
        </view>
        <view class="image-box">
          <image src="../../static/images/bg-test.png"></image>
        </view>
      </view>
    </scroll-view>

    <!-- 秒杀列表 -->
    <SeckillingList style="margin-top: 20rpx;" />

    <!-- 公司信息 -->
    <CompanyInfo style="margin-top: 20rpx;" />

    <!-- 好物优选 -->
    <HighGoods style="margin-top: 20rpx;" />
  </view>

  <!-- <button style="position: fixed; top: 100rpx; left: 50%; transform: translateX(-50%);" @click="addBubbleTipsData">添加数据</button> -->

  <!-- 底部导航 -->
  <Tarbar class="fixed-bottom" />
</template>

<script setup>
import { request } from "../../utils/request.js";
import { ref, onMounted, computed } from "vue";
import SeckillingList from "@/components/SeckillingList.vue";
import CompanyInfo from "@/components/CompanyInfo.vue";
import HighGoods from "@/components/HighGoods.vue";
import Tarbar from "@/components/Tarbar.vue";
import NewsRoll from "@/components/NewsRoll.vue";
import {
  getStatusBarHeight,
  getTitleBarHeight
} from "@/utils/index.js";

// 是否固定标题搜索栏
const isFixedHeadeContent = ref(false);
// 往下挤的高度 
const containerMarTop = computed(() => {
  return 47.22 + getTitleBarHeight() + getStatusBarHeight()
});

// 轮播图数据
const banner_swiper = ref({
  images: [],
  indicatorDots: true,
  autoplay: true,
  interval: 5000,
  duration: 1000,
  is_radius: false,
  height_value: 0,
});
// 图标列表数据
const iconlist = ref([]);
// 气泡提示数据
const bubbleTipsData = ref();

// test 添加气泡提示数据
function addBubbleTipsData() {
  bubbleTipsData.value = {
    id: Date.now(),
    img: 'https://img0.baidu.com/it/u=4294353355,1624915568&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500',
    text: `张${Math.floor(Math.random() * 10)}一分钟前购买了商品`
  }
};
setInterval(() => {
  // addBubbleTipsData()
}, 3000);

// console.log('系统信息', uni.getSystemInfoSync());
// console.log('状态栏高度：', getStatusBarHeight());
// console.log('小程序标题高度：', getTitleBarHeight());

onMounted(() => {
  getData()
});


function to_detail(detail) {
  // console.log('轮播详情', e);
  // var detail = e.currentTarget.dataset.item;


  // 判断是否有分类id
  if (detail.category_id > 0) {
    uni.navigateTo({
      url: '/pages/goods/category?id=' + detail.category_id
    })
    return;
  }


  // 判断是否商品详情
  if (detail.goods_id > 0) {
    // console.log('detail.category_iddetail.category_iddetail.category_id', detail.category_id);
    uni.navigateTo({
      url: '/pages/goods/detail?id=' + detail.goods_id
    })
    return;
  }

  // 手机号
  if (detail.phone != null) {
    console.log('手机号 detail.phone', detail.phone);
    // wx.makePhoneCall({
    //   phoneNumber: detail.phone,
    // })

    // this.click_page(5, detail.phone);

    return;
  }

  // 位置
  if (detail.location != null) {

    var coordinate_list = detail.location.split(",")
    console.log('33333333333333333', coordinate_list[1]);
    console.log('位置 ');

    // wx.getSetting({
    //   success: resSetting => {
    //     console.log(resSetting);

    //     if (('undefined' == typeof resSetting.authSetting['scope.address']) || resSetting.authSetting['scope.address']) {
    //       wx.openLocation({
    //         latitude: coordinate_list[0] * 1,
    //         longitude: coordinate_list[1] * 1,
    //         scale: 18,
    //         name: e.currentTarget.dataset.item.name,
    //         address: e.currentTarget.dataset.item.address
    //       })
    //     } else {
    //       wx.showToast({
    //         title: '请先打开授权',
    //         icon: 'none',
    //         duration: 3000
    //       })
    //       wx.openSetting({
    //         success(resSetting2) {
    //           if (resSetting2.authSetting['scope.address']) {
    //             wx.openLocation({
    //               latitude: coordinate_list[0] * 1,
    //               longitude: coordinate_list[1] * 1,
    //               scale: 18,
    //               name: e.currentTarget.dataset.item.name,
    //               address: e.currentTarget.dataset.item.address
    //             })
    //           } else {
    //             wx.showToast({
    //               title: '授权失败',
    //               icon: 'none',
    //               duration: 3000
    //             })
    //           }
    //         }
    //       })
    //     }
    //   }
    // })

    // this.click_page(6, '');
    return;
  }

  // 跳转到门店列表
  if (detail.is_open_shop_info_list == 0) {
    uni.navigateTo({
      url: '/pages/mine/shopInfoList',
    })
  }
};

async function getData() {
  banner_swiper.value = {
    autoplay: true,
    duration: 1000,
    height_value: "425",
    images: [
      "https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/webp/a6f71d577e2e33852dce398fe705fad8.w1079.h607.d0.b0.s76702.webp?x-oss-process=image/format,jpg",
      "https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/webp/cf4066b5383d633898e846db09750e4b.w1079.h2338.d0.b0.s94168.webp?x-oss-process=image/format,jpg",
      "https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/webp/998fc5561ab0be4969cf0db273615732.w507.h960.d0.b0.s41754.webp?x-oss-process=image/format,jpg"
    ],
    indicatorDots: true,
    interval: "3000",
    is_radius: true
  }
  iconlist.value = [{
    auth: null,
    authorizer_appid: "wx184d389f8e1603d4",
    category_id: 89,
    create_time: "2023-02-15 10:05:07",
    goods_id: 0,
    id: 14,
    image_uri: "https://saascdn.jizhongkeji.com/oss_jzkj/wx46a2145a358aaa4f/png/bab247b6850f63b2f06f8abd13f6f6f6.w400.h400.d0.b0.s7587.png",
    is_open_shop_info_list: 1,
    location: null,
    name: "热菜",
    phone: null,
    sort: null,
    update_time: "2023-02-15 10:05:07"
  }]


  let res = await request(
    '/WxAppCustomer/home_all_data_v',
    'post',
  )
  if (res.code != 0) return uni.showToast({
    title: res.msg,
    duration: 2000,
    icon: 'error'
  });
  // console.log(res.data);

  // 轮播图数据
  if (res.data.banner_detail) {
    banner_swiper.value.images = res.data.banner_detail.image_uris_arr;
    banner_swiper.value.height_value = res.data.banner_detail.height_value;
    banner_swiper.value.interval = res.data.banner_detail.interval_value;
    banner_swiper.value.is_radius = !!res.data.banner_detail.is_radius;
    banner_swiper.value.autoplay = !!res.data.banner_detail.autoplay;
  } else {
    banner_swiper.value.images = []
  }
  // iconlist 数据
  if (res.data.icon_list) {
    iconlist.value = res.data.icon_list
  } else {
    iconlist.value = []
  }
};
</script>

<style lang="less" scoped>
.content {
  // z-index: 1;
  padding: 0 19.44rpx;
  padding-bottom: 100rpx;
  // margin-top: 100rpx;
  // padding-top: 150rpx;
  background-color: #f8f9fa;
  background-repeat: no-repeat;
  background-size: contain;

  // 头部内容挤下
  // padding-top: 145rpx;

  .header-content-fixed {
    position: fixed;
    // top: 0;
    left: 0;
    width: 100%;
    padding: 0 19.44rpx;
    padding-bottom: 20rpx;
    box-sizing: border-box;
    // background-color: #1989f9;
    // border: 1px solid gold;
    z-index: 999;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('../../static/icon/thumb.png');
  }

  .header-content {

    >image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }

    .logo-box {
      display: flex;
      align-items: center;

      font-size: 43rpx;
      font-family: Alimama ShuHeiTi, Alimama ShuHeiTi-Bold;
      font-weight: 700;
      color: #ff1c17;

      >image {
        border-radius: 50%;
        width: 59.72rpx;
        height: 59.72rpx;
        margin-right: 13.19rpx;
      }
    }

    // 搜索栏
    .searchBar {
      margin-top: 27rpx;
      // padding: 0 8px;
      display: flex;
      // justify-content: center;
      justify-content: space-between;
      align-items: center;

      image {
        width: 48.61rpx;
        height: 47.22rpx;
      }

      input {
        // margin: 0 10rpx;
        // margin-right: 0;
        margin-left: 27.78rpx;
        box-sizing: border-box;
        // padding: 0 16rpx;
        padding-left: 90rpx;
        // width: 304.67px;
        flex: 1;
        height: 60rpx;
        background-color: rgba(255, 255, 255, .3);
        border-radius: 30rpx;
        position: relative;
        // font
        font-size: 25rpx;
        font-weight: 400;
        color: #ffffff;

        &::before {
          content: '';
          display: inline-block;
          width: 23.61rpx;
          height: 23.61rpx;
          margin: 0 8rpx;
          position: absolute;
          left: 35rpx;
          top: 50%;
          transform: translateY(-50%);
          background: url('../../static/icon/search-icon.png') no-repeat center;
          background-size: contain;
        }
      }
    }
  }


  // 轮播图
  .carousel {
    overflow: hidden;
    border-radius: 14rpx;
    margin-top: 20rpx;
    height: 333.33rpx;
  }

  // 图标菜单
  .menueview {
    margin-top: 20rpx;
    border-radius: 14rpx;
    padding: 10px;
    background-color: white;
    display: flex;
    column-gap: 30px;
    row-gap: 15px;
    flex-wrap: wrap;
    justify-content: space-around;
    // justify-content: space-between;
    // justify-content: space-evenly;

    .menue_item {
      // border: 1px solid forestgreen;
      text-align: center;

      .menue-image-box {
        width: 81.94rpx;
        height: 81.94rpx;
        // box-sizing: border-box;
        // padding: 3px;
        // background-color: aquamarine;
        // background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        >image {
          width: 70%;
          height: 70%;
        }
      }

      .nav_text {
        width: 81.94rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #333333;
        margin-top: 3px;
        // 超出显示省略号
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  // 渐变容器
  .gradient-box {
    margin-top: 20rpx;
    height: 169.44rpx;
    border-radius: 14rpx;
    background-image: linear-gradient(-90deg, #2af598 0%, #009efd 100%);
  }

  // 新品列表
  .new-product {
    margin-top: 20rpx;
    // border: #009efd solid 1px;
    // height: 210px;
    width: 100%;
    // height: 400rpx;
    // height: 100%;
    // display: flex;
    // flex-wrap: nowrap;
    white-space: nowrap;
    // gap: 10px !important;

    .new-product-item {
      border-radius: 6.7px;
      // background-color: white;
      // width: 143px;
      width: 298.61rpx;
      height: 436.11rpx;
      border-radius: 16.67rpx;
      display: inline-block;
      // display: flex;
      font-size: 36rpx;
      // margin-right: 22rpx;
      /* 设置右边距 */
      padding: 19.44rpx 29.17rpx;
      box-sizing: border-box;
      background-size: contain;
      background-repeat: no-repeat;
      // border: #009efd solid 1px;

      .txt-box {
        >text {
          display: block;
          width: 100%;

          &:nth-child(1) {
            height: 41.2rpx;
            font-size: 30.56rpx;
            font-family: PingFang SC, PingFang SC-Heavy;
            font-weight: 800;
            color: #2a2a2a;
          }

          &:nth-child(2) {
            font-size: 22.33rpx;
            color: #ff2626;
            margin-top: 8.33rpx;
          }
        }
      }

      .image-box {
        margin-top: 19.44rpx;
        height: 283.33rpx;
        overflow-y: hidden;
        // background-color: #00f2fe;

        >image {
          width: 100%;
          height: 100%;
        }
      }
    }


  }

}
</style>

<style>
/* 覆盖默认的 swiper 指示器样式 */
::v-deep .uni-swiper-dot {
  width: 8px;
  /* 未激活的小圆点宽度 */
  height: 8px;
  /* 未激活的小圆点高度 */
  background-color: rgba(0, 0, 0, 0);
  /* 透明色 */
}

::v-deep .uni-swiper-dot-active {
  width: 16px;
  /* 选中的小圆点宽度 */
  height: 8px;
  /* 选中的小圆点高度 */
  background-color: #fff;
  /* 白色 */
  border-radius: 8px;
  /* 圆角 */
}

.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.searchPlace {
  /* // width: 108px;
  // height: 16.67px; */
  font-size: 25rpx;
  opacity: .7;
  /* // margin-left: 50rpx;
  // font-weight: 400; */
  text-align: center;
  color: #ffffff;
  display: flex;
  align-items: center;
}
</style>