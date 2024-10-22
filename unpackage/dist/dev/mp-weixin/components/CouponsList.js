"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  __name: "CouponsList",
  props: {
    coupons: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.coupons, (item, index, i0) => {
          return {
            a: common_vendor.t(item.amount),
            b: common_vendor.t(item.condition),
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.date),
            e: common_vendor.t(item.usage),
            f: index
          };
        }),
        b: common_assets._imports_0$14
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-df656955"]]);
wx.createComponent(Component);
