"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
if (!Array) {
  const _component_transition = common_vendor.resolveComponent("transition");
  _component_transition();
}
const _sfc_main = {
  __name: "CouponPopup",
  props: {
    title: {
      type: String,
      default: "优惠券标题"
    },
    amount: {
      type: Number,
      default: 1e3
    },
    condition: {
      type: String,
      default: "优惠券使用条件"
    },
    expiryDate: {
      type: String,
      default: "2024.08.08"
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ["close", "claim"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const closePopup = () => {
      emit("close");
      emit("update:visible", false);
    };
    const claimCoupon = () => {
      emit("claim");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.visible
      }, __props.visible ? {
        b: common_assets._imports_0$15,
        c: common_vendor.t(__props.title),
        d: common_vendor.t(__props.amount),
        e: common_vendor.t(__props.condition),
        f: common_vendor.t(__props.expiryDate),
        g: common_vendor.o(claimCoupon),
        h: common_assets._imports_1$6,
        i: common_vendor.o(closePopup),
        j: common_vendor.o(() => {
        })
      } : {}, {
        k: common_vendor.p({
          name: "fade"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-969a1607"]]);
wx.createComponent(Component);
