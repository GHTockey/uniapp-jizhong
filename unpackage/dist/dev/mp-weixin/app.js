"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_tabbar = require("./stores/tabbar2.js");
const stores_temp = require("./stores/temp.js");
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
  "./pages/product/menu.js";
  "./pages/product/detail.js";
  "./pages/mine/pay.js";
  "./pages/mine/address.js";
  "./pages/mine/get_shop_list.js";
  "./pages/mine/address_form.js";
  "./pages/mine/money.js";
  "./pages/mine/topUpCenter.js";
  "./pages/mine/withdraw.js";
  "./pages/mine/addBank.js";
  "./pages/mine/withdraw_apply_ing.js";
  "./pages/mine/withdraw_list.js";
  "./pages/mine/present.js";
  "./pages/mine/presentDetail.js";
  "./pages/mine/presentCard.js";
  "./pages/mine/presentMine.js";
  "./pages/mine/presentPay.js";
  "./pages/mine/presentDetailSimple.js";
  "./pages/mine/presentSend.js";
  "./pages/mine/presentActivate.js";
  "./pages/mine/presentActivateRes.js";
  "./pages/mine/presentRecords.js";
  "./pages/index/shop_list.js";
  "./pages/index/introproduct.js";
  "./pages/index/introproduct_detail.js";
  "./pages/activity/activity_list.js";
  "./pages/activity/application_index.js";
  "./pages/activity/application.js";
  "./pages/index/shop_detail.js";
  "./pages/index/apply_detail.js";
  "./pages/mine/collect_list.js";
  "./pages/mine/info_edit.js";
  "./pages/mine/order.js";
  "./pages/mine/drawback.js";
  "./pages/mine/distribution_center.js";
  "./pages/mine/promot.js";
  "./pages/mine/distribution_order_list.js";
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
    const tempStore = stores_temp.useTempStore();
    tempStore.getUserInfoApi();
    const tabBarStore = stores_tabbar.useTabBarStore();
    tabBarStore.getTabBarListApi();
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
