"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _easycom_BubbleTips2 = common_vendor.resolveComponent("BubbleTips");
  _easycom_BubbleTips2();
}
const _easycom_BubbleTips = () => "../../components/BubbleTips/BubbleTips.js";
if (!Math) {
  (_easycom_BubbleTips + NewsRoll + SeckillingList + CompanyInfo + HighGoods + Tarbar)();
}
const SeckillingList = () => "../../components/SeckillingList.js";
const CompanyInfo = () => "../../components/CompanyInfo.js";
const HighGoods = () => "../../components/HighGoods.js";
const Tarbar = () => "../../components/Tarbar.js";
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
    setInterval(() => {
    }, 3e3);
    console.log("系统信息", common_vendor.index.getSystemInfoSync());
    console.log("状态栏高度：", utils_index.getStatusBarHeight());
    console.log("小程序标题高度：", utils_index.getTitleBarHeight());
    common_vendor.onMounted(() => {
      getData();
    });
    async function getData() {
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
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          itemData: bubbleTipsData.value
        }),
        b: !isFixedHeadeContent.value
      }, !isFixedHeadeContent.value ? {
        c: common_vendor.s(`height: ${common_vendor.unref(utils_index.getStatusBarHeight)()}px;`)
      } : {}, {
        d: common_vendor.s(`height: ${common_vendor.unref(utils_index.getTitleBarHeight)()}px;`),
        e: common_assets._imports_0,
        f: isFixedHeadeContent.value ? 1 : "",
        g: common_vendor.s(isFixedHeadeContent.value ? `top: ${common_vendor.unref(utils_index.getStatusBarHeight)()}px` : ""),
        h: common_vendor.f(banner_swiper.value.images, (image, index, i0) => {
          return {
            a: image,
            b: index
          };
        }),
        i: banner_swiper.value.autoplay,
        j: banner_swiper.value.interval,
        k: banner_swiper.value.duration,
        l: banner_swiper.value.indicatorDots,
        m: banner_swiper.value.is_radius,
        n: common_vendor.f(iconlist.value.flatMap((item) => Array(10).fill(item)), (item, index, i0) => {
          return {
            a: item.image_uri,
            b: common_vendor.t(item.name)
          };
        }),
        o: common_vendor.f(10, (item, index, i0) => {
          return {
            a: index,
            b: index == 9 ? "0" : "22rpx"
          };
        }),
        p: common_assets._imports_1,
        q: `url('../../static//images/new-p-bg.png')`,
        r: common_vendor.s(isFixedHeadeContent.value ? `padding-top: ${containerMarTop.value}px; background-image: url('../../static/icon/thumb.png');` : `background-image: url('../../static/icon/thumb.png');`)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);