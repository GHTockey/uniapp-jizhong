"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
const _sfc_main = {
  __name: "withdraw",
  setup(__props) {
    const withdrawType = common_vendor.ref(2);
    const bankCardInfo = common_vendor.ref(null);
    const formData = common_vendor.ref({
      name: "",
      phone: "",
      bank: "",
      bankCard: ""
    });
    function withdrawHandler() {
      if (withdrawType.value == 2) {
        if (!bankCardInfo.value) {
          common_vendor.index.showToast({
            title: "请添加银行卡",
            icon: "error"
          });
          return;
        }
      }
      utils_index.toPage("/pages/mine/withdraw_apply_ing");
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(withdrawType.value == 2 ? "银行卡" : "微信"),
        b: formData.value.name,
        c: common_vendor.o(($event) => formData.value.name = $event.detail.value),
        d: formData.value.phone,
        e: common_vendor.o(($event) => formData.value.phone = $event.detail.value),
        f: formData.value.bank,
        g: common_vendor.o(($event) => formData.value.bank = $event.detail.value),
        h: formData.value.bankCard,
        i: common_vendor.o(($event) => formData.value.bankCard = $event.detail.value),
        j: common_vendor.o(withdrawHandler),
        k: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/withdraw_list"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-50421715"]]);
wx.createPage(MiniProgramPage);
