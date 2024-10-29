"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_index = require("../../utils/index.js");
if (!Math) {
  Tarbar();
}
const Tarbar = () => "../../components/tarbar.js";
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const titleBarHeight = utils_index.getTitleBarHeight();
    function toPage(url) {
      common_vendor.index.navigateTo({
        url
      });
    }
    return (_ctx, _cache) => {
      return {
        a: `${common_vendor.unref(titleBarHeight)}px`,
        b: common_assets._imports_0$8,
        c: common_assets._imports_1$3,
        d: common_vendor.o(($event) => toPage("/pages/mine/money")),
        e: common_assets._imports_4$2,
        f: common_vendor.f(5, (item, k0, i0) => {
          return {};
        }),
        g: common_assets._imports_3$2,
        h: common_assets._imports_4$3,
        i: common_vendor.o(($event) => toPage("/pages/mine/address?type=edit")),
        j: common_vendor.f(7, (item, k0, i0) => {
          return {};
        }),
        k: common_assets._imports_5$1,
        l: common_assets._imports_7,
        m: common_vendor.o(($event) => toPage("/pages/mine/present"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"]]);
wx.createPage(MiniProgramPage);
