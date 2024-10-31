"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  return {
    a: common_assets._imports_0$21,
    b: common_assets._imports_1$9,
    c: common_vendor.f(10, (item, index, i0) => {
      return {
        a: index,
        b: index == 9 ? "60rpx" : "20rpx"
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
