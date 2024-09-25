"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  CouponList();
}
const CouponList = () => "../../components/CouponsList.js";
const _sfc_main = {
  __name: "myCoupon",
  setup(__props) {
    const activeTab = common_vendor.ref(0);
    const coupons = common_vendor.ref([
      {
        condition: "满100可用",
        title: "优惠券标题",
        date: "2024.08.08至2024.08.09",
        usage: "全部商品可用",
        amount: 1e3
      }
    ]);
    const changeTab = (index) => {
      activeTab.value = index;
    };
    const getMoreCoupons = () => {
      console.log("领取更多优惠券");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.n(activeTab.value === 0 ? "active" : ""),
        b: common_vendor.o(($event) => changeTab(0)),
        c: common_vendor.n(activeTab.value === 1 ? "active" : ""),
        d: common_vendor.o(($event) => changeTab(1)),
        e: common_vendor.n(activeTab.value === 2 ? "active" : ""),
        f: common_vendor.o(($event) => changeTab(2)),
        g: activeTab.value == 0
      }, activeTab.value == 0 ? {
        h: common_vendor.p({
          coupons: coupons.value
        })
      } : {}, {
        i: activeTab.value == 1
      }, activeTab.value == 1 ? {
        j: common_assets._imports_0$1
      } : {}, {
        k: activeTab.value == 2
      }, activeTab.value == 2 ? {
        l: common_assets._imports_0$1
      } : {}, {
        m: common_vendor.o(getMoreCoupons)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f4f12eb7"]]);
wx.createPage(MiniProgramPage);
