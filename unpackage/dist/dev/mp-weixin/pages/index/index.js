"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _easycom_BubbleTips2 = common_vendor.resolveComponent("BubbleTips");
  const _easycom_TabBar2 = common_vendor.resolveComponent("TabBar");
  (_easycom_BubbleTips2 + _easycom_TabBar2)();
}
const _easycom_BubbleTips = () => "../../components/BubbleTips/BubbleTips.js";
const _easycom_TabBar = () => "../../components/TabBar/TabBar.js";
if (!Math) {
  (_easycom_BubbleTips + NewsRoll + SeckillingList + CompanyInfo + HighGoods + _easycom_TabBar)();
}
const SeckillingList = () => "../../components/SeckillingList.js";
const CompanyInfo = () => "../../components/CompanyInfo.js";
const HighGoods = () => "../../components/HighGoods.js";
const NewsRoll = () => "../../components/NewsRoll.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const isFixedHeadeContent = common_vendor.ref(false);
    const containerMarTop = common_vendor.computed(() => {
      return 47.22 + utils_index.getTitleBarHeight() + utils_index.getStatusBarHeight();
    });
    const banner_swiper = common_vendor.ref({
      images: [],
      indicatorDots: true,
      autoplay: true,
      interval: 5e3,
      duration: 1e3,
      is_radius: false,
      height_value: 0
    });
    const iconlist = common_vendor.ref([]);
    const bubbleTipsData = common_vendor.ref();
    const goodsList = common_vendor.ref([]);
    function addBubbleTipsData() {
      bubbleTipsData.value = {
        id: Date.now(),
        img: "https://img0.baidu.com/it/u=4294353355,1624915568&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500",
        text: `张${Math.floor(Math.random() * 10)}一分钟前购买了商品`
      };
    }
    setInterval(() => {
      addBubbleTipsData();
    }, 3e3);
    common_vendor.index.showLoading({
      title: "加载中..."
    });
    common_vendor.onMounted(() => {
      getData();
    });
    function to_detail(detail) {
      if (detail.category_id > 0) {
        console.log("跳转至分类页面");
        common_vendor.index.navigateTo({
          url: "/pages/goods/category?id=" + detail.category_id
        });
        return;
      }
      if (detail.goods_id > 0) {
        console.log("跳转至商品详情页面");
        common_vendor.index.navigateTo({
          // url: '/pages/goods/detail?id=' + detail.goods_id
          url: "/pages/product/detail?id=" + detail.goods_id
        });
        return;
      }
      if (detail.phone != null) {
        console.log("手机号 detail.phone", detail.phone);
        return;
      }
      if (detail.location != null) {
        console.log("位置", detail);
        var coordinate_list = detail.location.split(",");
        console.log("33333333333333333", coordinate_list[1]);
        common_vendor.index.getSetting({
          success: (resSetting) => {
            console.log(resSetting);
            if ("undefined" == typeof resSetting.authSetting["scope.address"] || resSetting.authSetting["scope.address"]) {
              common_vendor.index.openLocation({
                latitude: coordinate_list[0] * 1,
                longitude: coordinate_list[1] * 1,
                scale: 18,
                //
                name: detail.name,
                address: detail.address
              });
            } else {
              common_vendor.index.showToast({
                title: "请先打开授权",
                icon: "none",
                duration: 3e3
              });
              common_vendor.index.openSetting({
                success(resSetting2) {
                  if (resSetting2.authSetting["scope.address"]) {
                    common_vendor.index.openLocation({
                      latitude: coordinate_list[0] * 1,
                      longitude: coordinate_list[1] * 1,
                      scale: 18,
                      name: detail.name,
                      address: detail.address
                    });
                  } else {
                    common_vendor.index.showToast({
                      title: "授权失败",
                      icon: "none",
                      duration: 3e3
                    });
                  }
                }
              });
            }
          }
        });
        return;
      }
      if (detail.is_open_shop_info_list == 0) {
        common_vendor.index.navigateTo({
          url: "/pages/mine/shopInfoList"
        });
      }
    }
    async function getData() {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      banner_swiper.value = {
        autoplay: true,
        duration: 1e3,
        height_value: "425",
        images: [
          "https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/webp/a6f71d577e2e33852dce398fe705fad8.w1079.h607.d0.b0.s76702.webp?x-oss-process=image/format,jpg",
          "https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/webp/cf4066b5383d633898e846db09750e4b.w1079.h2338.d0.b0.s94168.webp?x-oss-process=image/format,jpg",
          "https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/webp/998fc5561ab0be4969cf0db273615732.w507.h960.d0.b0.s41754.webp?x-oss-process=image/format,jpg"
        ],
        indicatorDots: true,
        interval: "3000",
        is_radius: true
      };
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
      }];
      let res = await utils_request.request(
        "/WxAppCustomer/home_all_data_v",
        "post"
      );
      if (res.code != 0)
        return common_vendor.index.showToast({
          title: res.msg,
          duration: 2e3,
          icon: "error"
        });
      common_vendor.index.hideLoading();
      console.log(res.data);
      banner_swiper.value.images = (_b = (_a = res.data) == null ? void 0 : _a.banner_detail) == null ? void 0 : _b.image_uris_arr;
      banner_swiper.value.height_value = (_d = (_c = res.data) == null ? void 0 : _c.banner_detail) == null ? void 0 : _d.height_value;
      banner_swiper.value.interval = (_f = (_e = res.data) == null ? void 0 : _e.banner_detail) == null ? void 0 : _f.interval_value;
      banner_swiper.value.is_radius = !!((_h = (_g = res.data) == null ? void 0 : _g.banner_detail) == null ? void 0 : _h.is_radius);
      banner_swiper.value.autoplay = !!((_j = (_i = res.data) == null ? void 0 : _i.banner_detail) == null ? void 0 : _j.autoplay);
      iconlist.value = (_k = res.data) == null ? void 0 : _k.icon_list;
      goodsList.value = (_l = res.data) == null ? void 0 : _l.goods_list;
    }
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.p({
          itemData: bubbleTipsData.value
        }),
        b: !isFixedHeadeContent.value
      }, !isFixedHeadeContent.value ? {
        c: common_vendor.s(`height: ${common_vendor.unref(utils_index.getStatusBarHeight)()}px;`)
      } : {}, {
        d: common_vendor.s(`height: ${common_vendor.unref(utils_index.getTitleBarHeight)()}px;`),
        e: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/onlineSearch/onlineSearch")),
        f: isFixedHeadeContent.value ? 1 : "",
        g: common_vendor.s(isFixedHeadeContent.value ? `top: ${common_vendor.unref(utils_index.getStatusBarHeight)()}px` : ""),
        h: common_vendor.f((_a = banner_swiper.value) == null ? void 0 : _a.images, (image, index, i0) => {
          return {
            a: image,
            b: index
          };
        }),
        i: !!banner_swiper.value.autoplay,
        j: banner_swiper.value.interval,
        k: banner_swiper.value.duration,
        l: banner_swiper.value.indicatorDots,
        m: banner_swiper.value.is_radius,
        n: common_vendor.f(iconlist.value, (item, index, i0) => {
          return {
            a: item.image_uri,
            b: common_vendor.t(item.name),
            c: common_vendor.o(($event) => to_detail(item))
          };
        }),
        o: common_vendor.f(10, (item, index, i0) => {
          return {
            a: index,
            b: index == 9 ? "0" : "22rpx"
          };
        }),
        p: `url('https://saas.jizhongkeji.com/static/jzkj/static/images/new-p-bg.png')`,
        q: common_vendor.p({
          goods: goodsList.value
        }),
        r: common_vendor.s(isFixedHeadeContent.value ? `padding-top: ${containerMarTop.value}px; background-image: url('https://saas.jizhongkeji.com/static/jzkj/static/icon/thumb.png');` : `background-image: url('https://saas.jizhongkeji.com/static/jzkj/static/icon/thumb.png');`),
        s: common_vendor.p({
          isAppMode: true
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
