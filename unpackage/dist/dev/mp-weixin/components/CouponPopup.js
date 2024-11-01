"use strict";
const common_vendor = require("../common/vendor.js");
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
        b: common_vendor.t(__props.title),
        c: common_vendor.t(__props.amount),
        d: common_vendor.t(__props.condition),
        e: common_vendor.t(__props.expiryDate),
        f: common_vendor.o(claimCoupon),
        g: common_vendor.o(closePopup),
        h: common_vendor.o(() => {
        })
      } : {}, {
        i: common_vendor.p({
          name: "fade"
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-969a1607"]]);
wx.createComponent(Component);
