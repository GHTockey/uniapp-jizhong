"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
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
}
const _sfc_main = {
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
