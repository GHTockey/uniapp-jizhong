"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _easycom_HeightBar2 = common_vendor.resolveComponent("HeightBar");
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  const _easycom_TabBar2 = common_vendor.resolveComponent("TabBar");
  (_easycom_HeightBar2 + _easycom_NavBar2 + _easycom_TabBar2)();
}
const _easycom_HeightBar = () => "../../components/HeightBar/HeightBar.js";
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
const _easycom_TabBar = () => "../../components/TabBar/TabBar.js";
if (!Math) {
  (_easycom_HeightBar + _easycom_NavBar + _easycom_TabBar)();
}
const _sfc_main = {
  __name: "presentMine",
  setup(__props) {
    const selectedIndex = common_vendor.ref(2);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          appendNavBar: true
        }),
        b: common_vendor.p({
          showBack: true,
          bgc: "transparent"
        }),
        c: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/presentRecords")),
        d: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/presentActivate")),
        e: common_vendor.o(($event) => selectedIndex.value = $event),
        f: common_vendor.p({
          selectedIndex: selectedIndex.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c279e8aa"]]);
wx.createPage(MiniProgramPage);
