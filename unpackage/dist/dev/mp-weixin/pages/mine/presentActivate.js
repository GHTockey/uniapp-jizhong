"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  _easycom_NavBar2();
}
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
if (!Math) {
  _easycom_NavBar();
}
const _sfc_main = {
  __name: "presentActivate",
  setup(__props) {
    const formData = common_vendor.ref({
      cardNum: "",
      cardPwd: ""
    });
    const handleActivate = () => {
      if (!formData.value.cardNum || !formData.value.cardPwd) {
        common_vendor.index.showToast({
          title: "请输入卡片号码和密码",
          icon: "none"
        });
        return;
      }
      if (formData.value.cardNum == "111" && formData.value.cardPwd == "111") {
        utils_index.toPage("/pages/mine/presentActivateRes");
        return;
      }
      common_vendor.index.showToast({
        title: "当前卡密无效或已被激活",
        icon: "error"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          showBack: true
        }),
        b: common_assets._imports_0$19,
        c: common_assets._imports_1$9,
        d: common_assets._imports_2$6,
        e: formData.value.cardNum,
        f: common_vendor.o(($event) => formData.value.cardNum = $event.detail.value),
        g: common_assets._imports_3$5,
        h: formData.value.cardPwd,
        i: common_vendor.o(($event) => formData.value.cardPwd = $event.detail.value),
        j: common_vendor.o(handleActivate),
        k: common_assets._imports_4$5
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-42e05070"]]);
wx.createPage(MiniProgramPage);
