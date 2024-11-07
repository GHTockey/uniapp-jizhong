"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _easycom_HeightBar2 = common_vendor.resolveComponent("HeightBar");
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_ActionSheetSlot2 = common_vendor.resolveComponent("ActionSheetSlot");
  (_easycom_HeightBar2 + _easycom_NavBar2 + _easycom_uni_number_box2 + _easycom_ActionSheetSlot2)();
}
const _easycom_HeightBar = () => "../../components/HeightBar/HeightBar.js";
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_ActionSheetSlot = () => "../../components/ActionSheetSlot/ActionSheetSlot.js";
if (!Math) {
  (_easycom_HeightBar + _easycom_NavBar + _easycom_uni_number_box + _easycom_ActionSheetSlot)();
}
const _sfc_main = {
  __name: "presentPay",
  setup(__props) {
    const showActionSheet = common_vendor.ref(false);
    const buyerMsg = common_vendor.ref("");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          showBack: true,
          isWhite: true,
          bgc: "transparent"
        }),
        b: common_vendor.t(buyerMsg.value || "无留言"),
        c: common_vendor.o(($event) => showActionSheet.value = true),
        d: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/presentDetailSimple")),
        e: buyerMsg.value,
        f: common_vendor.o(($event) => buyerMsg.value = $event.detail.value),
        g: common_vendor.o(($event) => showActionSheet.value = $event),
        h: common_vendor.p({
          title: "买家留言",
          show: showActionSheet.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-14330de5"]]);
wx.createPage(MiniProgramPage);
