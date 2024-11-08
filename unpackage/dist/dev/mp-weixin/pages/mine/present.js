"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _easycom_TabBar2 = common_vendor.resolveComponent("TabBar");
  _easycom_TabBar2();
}
const _easycom_TabBar = () => "../../components/TabBar/TabBar.js";
if (!Math) {
  _easycom_TabBar();
}
const _sfc_main = {
  __name: "present",
  setup(__props) {
    const selectedIndex = common_vendor.ref(0);
    common_vendor.watch(selectedIndex, (newVal) => {
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(10, (item, k0, i0) => {
          return {};
        }),
        b: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/presentDetail")),
        c: common_vendor.o(($event) => selectedIndex.value = $event),
        d: common_vendor.p({
          selectedIndex: selectedIndex.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-06fb772d"]]);
wx.createPage(MiniProgramPage);
