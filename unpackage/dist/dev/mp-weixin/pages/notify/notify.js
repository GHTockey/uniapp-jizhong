"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
const _sfc_main = {
  __name: "notify",
  setup(__props) {
    common_vendor.ref(1);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/notify/notifyList?notifyType=1")),
        b: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/notify/notifyList?notifyType=2")),
        c: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/notify/notifyList?notifyType=3")),
        d: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/notify/notifyList?notifyType=4")),
        e: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/notify/notifyList?notifyType=5"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5bb7aa92"]]);
wx.createPage(MiniProgramPage);
