"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_tarbar = require("./stores/tarbar.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/test/test.js";
  "./pages/coupon/myCoupon.js";
  "./pages/coupon/couponCenter.js";
  "./pages/notify/notify.js";
  "./pages/notify/notifyList.js";
  "./pages/shopcar/shopcar.js";
  "./pages/onlineSearch/onlineSearch.js";
  "./pages/goodsDetail/goodsDetail.js";
  "./pages/goods/waitPay.js";
  "./pages/goods/category.js";
  "./pages/mine/mine.js";
  "./pages/mine/shopInfoList.js";
  "./pages/goods/detail.js";
}
const __default__ = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "App",
  setup(__props) {
    const tarbarStore = stores_tarbar.useTarbarStore();
    tarbarStore.getTarBarListApi();
    common_vendor.onMounted(() => {
      console.log("App Mounted");
    });
    return () => {
    };
  }
});
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
