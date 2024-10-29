"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  const _easycom_TabBar2 = common_vendor.resolveComponent("TabBar");
  (_easycom_NavBar2 + _easycom_TabBar2)();
}
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
const _easycom_TabBar = () => "../../components/TabBar/TabBar.js";
if (!Math) {
  (_easycom_NavBar + _easycom_TabBar)();
}
const _sfc_main = {
  __name: "presentMine",
  setup(__props) {
    const selectedIndex = common_vendor.ref(2);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          showBack: true
        }),
        b: common_assets._imports_0$16,
        c: common_assets._imports_1$8,
        d: common_assets._imports_1$8,
        e: common_assets._imports_2$4,
        f: common_assets._imports_2$3,
        g: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/presentRecords")),
        h: common_assets._imports_4$4,
        i: common_assets._imports_2$3,
        j: common_assets._imports_5$2,
        k: common_assets._imports_2$3,
        l: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/presentActivate")),
        m: common_vendor.o(($event) => selectedIndex.value = $event),
        n: common_vendor.p({
          selectedIndex: selectedIndex.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c279e8aa"]]);
wx.createPage(MiniProgramPage);
