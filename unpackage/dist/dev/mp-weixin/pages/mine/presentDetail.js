"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
const _sfc_main = {
  __name: "presentDetail",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(2, (item, k0, i0) => {
          return {};
        }),
        b: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/presentPay"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4f8f3f68"]]);
wx.createPage(MiniProgramPage);
