"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_DefaultTip2 = common_vendor.resolveComponent("DefaultTip");
  (_easycom_uni_icons2 + _easycom_uni_search_bar2 + _easycom_DefaultTip2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_DefaultTip = () => "../../components/DefaultTip/DefaultTip.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_search_bar + _easycom_DefaultTip)();
}
const _sfc_main = {
  __name: "get_shop_list",
  setup(__props) {
    const searchValue = common_vendor.ref("");
    const activeIndex = common_vendor.ref(0);
    const shopList = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      getData();
    });
    async function getData() {
      common_vendor.index.showLoading({ title: "加载中..." });
      let res = await utils_request.request("/WxAppCustomer/store_list", "post", {
        // user_id
        // gps
      });
      common_vendor.index.hideLoading();
      if (res.code != 0)
        return common_vendor.index.showToast({
          title: res.msg,
          icon: "error"
        });
      shopList.value = res.data.store_list;
    }
    const changeActiveIndex = (index) => {
      activeIndex.value = index;
      if (activeIndex.value == 0) {
        getData();
      } else {
        shopList.value = [];
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          color: "#999999",
          size: "18",
          type: "home"
        }),
        b: common_vendor.o(() => {
        }),
        c: common_vendor.o(() => {
        }),
        d: common_vendor.o(() => {
        }),
        e: common_vendor.o(() => {
        }),
        f: common_vendor.o(() => {
        }),
        g: common_vendor.o(() => {
        }),
        h: common_vendor.o(($event) => searchValue.value = $event),
        i: common_vendor.p({
          clearButton: "none",
          cancelButton: "none",
          placeholder: "请输入关键词",
          modelValue: searchValue.value
        }),
        j: common_assets._imports_0$9,
        k: common_vendor.o(($event) => changeActiveIndex(0)),
        l: activeIndex.value == 0 ? 1 : "",
        m: common_vendor.o(($event) => changeActiveIndex(1)),
        n: activeIndex.value == 1 ? 1 : "",
        o: common_vendor.f(shopList.value, (item, k0, i0) => {
          return {
            a: item.image_uri,
            b: "3fc93fa5-2-" + i0,
            c: "3fc93fa5-3-" + i0,
            d: common_vendor.t(item.shop_name),
            e: common_vendor.t(item.address_detail),
            f: common_vendor.t(item.start_time),
            g: common_vendor.t(item.end_time)
          };
        }),
        p: common_vendor.p({
          type: "arrowright",
          size: "18",
          color: "#999999"
        }),
        q: common_vendor.p({
          type: "star",
          size: "20",
          color: "#999999"
        }),
        r: shopList.value.length == 0
      }, shopList.value.length == 0 ? {
        s: common_vendor.p({
          tipText: "暂无收藏或常去门店"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3fc93fa5"]]);
wx.createPage(MiniProgramPage);
