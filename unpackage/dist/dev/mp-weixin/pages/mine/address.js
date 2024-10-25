"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_DefaultTip2 = common_vendor.resolveComponent("DefaultTip");
  _easycom_DefaultTip2();
}
const _easycom_DefaultTip = () => "../../components/DefaultTip/DefaultTip.js";
if (!Math) {
  _easycom_DefaultTip();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      text: "暂无地址",
      btnText: "立即添加",
      image: "address-em.svg"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6685374a"]]);
wx.createPage(MiniProgramPage);
