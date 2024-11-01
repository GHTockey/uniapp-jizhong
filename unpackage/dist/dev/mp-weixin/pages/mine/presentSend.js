"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = {
  __name: "presentSend",
  setup(__props) {
    const sendPopupRef = common_vendor.ref(null);
    const posterPopupRef = common_vendor.ref(null);
    function generatePoster() {
      sendPopupRef.value.close();
      common_vendor.index.showLoading({ title: "生成海报中" });
      setTimeout(() => {
        posterPopupRef.value.open();
        common_vendor.index.hideLoading();
      }, 500);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => sendPopupRef.value.open()),
        b: common_vendor.o(generatePoster),
        c: common_vendor.o(($event) => sendPopupRef.value.close()),
        d: common_vendor.sr(sendPopupRef, "6207edca-0", {
          "k": "sendPopupRef"
        }),
        e: common_vendor.p({
          type: "bottom",
          ["mask-click"]: false
        }),
        f: common_vendor.o(($event) => posterPopupRef.value.close()),
        g: common_vendor.sr(posterPopupRef, "6207edca-1", {
          "k": "posterPopupRef"
        }),
        h: common_vendor.p({
          type: "center",
          ["mask-click"]: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6207edca"]]);
wx.createPage(MiniProgramPage);
