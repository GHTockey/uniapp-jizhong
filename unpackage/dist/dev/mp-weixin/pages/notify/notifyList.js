"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_system = require("../../stores/system.js");
if (!Array) {
  const _easycom_MessageBar2 = common_vendor.resolveComponent("MessageBar");
  _easycom_MessageBar2();
}
const _easycom_MessageBar = () => "../../components/MessageBar/MessageBar.js";
if (!Math) {
  _easycom_MessageBar();
}
const _sfc_main = {
  __name: "notifyList",
  setup(__props) {
    stores_system.useSystemStore();
    common_vendor.onLoad((options) => {
      common_vendor.index.setNavigationBarTitle({
        title: `${options.notifyType == 1 ? "余额通知" : options.notifyType == 2 ? "物流信息" : options.notifyType == 3 ? "访客通知" : options.notifyType == 4 ? "积分通知" : "营销通知"}`
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({}, {
        a: common_vendor.f(3, (item, k0, i0) => {
          return {
            a: item,
            b: "51974676-0-" + i0
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-51974676"]]);
wx.createPage(MiniProgramPage);
