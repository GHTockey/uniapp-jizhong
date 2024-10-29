"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_index = require("../../utils/index.js");
const _sfc_main = {
  __name: "presentDetailSimple",
  setup(__props) {
    const isRecords = common_vendor.ref(false);
    common_vendor.onLoad((options) => {
      isRecords.value = options.is_records || false;
      if (isRecords.value) {
        common_vendor.index.setNavigationBarTitle({
          title: "订单详情"
        });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$17,
        b: common_assets._imports_1$7,
        c: !isRecords.value
      }, !isRecords.value ? {
        d: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/presentCard"))
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3a296596"]]);
wx.createPage(MiniProgramPage);
