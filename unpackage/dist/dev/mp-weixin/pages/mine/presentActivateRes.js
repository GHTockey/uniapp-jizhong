"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  _easycom_NavBar2();
}
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
if (!Math) {
  _easycom_NavBar();
}
const _sfc_main = {
  __name: "presentActivateRes",
  setup(__props) {
    const currentItem = common_vendor.ref({
      img: "../../static/images/present_item.png",
      card_text: "储值卡",
      title: "2025新春礼品卡2025新春礼品卡2025新春礼2025新春礼品卡2025新春礼品卡2025新春礼",
      time: "2024-08-09 14:56:45 至 2024-08-09 14:56:45"
    });
    const handleUse = () => {
      console.log("立即使用");
      common_vendor.index.showModal({
        title: "确定要使用该储值卡吗?",
        success: function(res) {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "使用成功",
              icon: "success",
              duration: 1500
            });
            setTimeout(() => {
              common_vendor.index.navigateBack();
            }, 1500);
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          showBack: true
        }),
        b: common_assets._imports_0$20,
        c: common_assets._imports_1$7,
        d: common_vendor.t(currentItem.value.title),
        e: common_vendor.t(currentItem.value.time),
        f: common_vendor.t(currentItem.value.card_text),
        g: common_vendor.o(handleUse)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d6e5ca00"]]);
wx.createPage(MiniProgramPage);
