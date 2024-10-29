"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "ActionSheetSlot",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      // 标题
      type: String,
      default: ""
    },
    footerBtnText: {
      // 底部按钮文字
      type: String,
      default: "确定"
    }
  },
  emits: ["update:show", "confirm"],
  setup(__props, { emit: __emit }) {
    const isClosing = common_vendor.ref(false);
    const emit = __emit;
    function closeActionSheet() {
      isClosing.value = true;
      setTimeout(() => {
        isClosing.value = false;
        emit("update:show", false);
      }, 300);
    }
    function confirm() {
      emit("confirm");
      closeActionSheet();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.show
      }, __props.show ? {
        b: common_vendor.t(__props.title),
        c: common_assets._imports_0$11,
        d: common_vendor.o(closeActionSheet),
        e: common_vendor.t(__props.footerBtnText),
        f: common_vendor.o(confirm),
        g: __props.show ? 1 : "",
        h: isClosing.value ? 1 : "",
        i: __props.show ? 1 : "",
        j: isClosing.value ? 1 : ""
      } : {});
    };
  }
};
wx.createComponent(_sfc_main);
