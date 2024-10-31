"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
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
        a: common_assets._imports_0$18,
        b: common_vendor.o(($event) => sendPopupRef.value.open()),
        c: common_assets._imports_1$3,
        d: common_assets._imports_2$6,
        e: common_vendor.o(generatePoster),
        f: common_assets._imports_3$4,
        g: common_vendor.o(($event) => sendPopupRef.value.close()),
        h: common_vendor.sr(sendPopupRef, "6207edca-0", {
          "k": "sendPopupRef"
        }),
        i: common_vendor.p({
          type: "bottom",
          ["mask-click"]: false
        }),
        j: common_assets._imports_4,
        k: common_assets._imports_5$3,
        l: common_assets._imports_6$1,
        m: common_assets._imports_1$3,
        n: common_assets._imports_7$1,
        o: common_vendor.o(($event) => posterPopupRef.value.close()),
        p: common_vendor.sr(posterPopupRef, "6207edca-1", {
          "k": "posterPopupRef"
        }),
        q: common_vendor.p({
          type: "center",
          ["mask-click"]: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6207edca"]]);
wx.createPage(MiniProgramPage);
