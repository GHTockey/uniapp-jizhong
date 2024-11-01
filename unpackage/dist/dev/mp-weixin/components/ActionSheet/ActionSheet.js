"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "ActionSheet",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "标题"
    },
    items: {
      type: Array,
      default: () => []
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.show
      }, __props.show ? {
        b: common_vendor.t(__props.title),
        c: common_vendor.o(closeActionSheet),
        d: common_vendor.f(__props.items, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.value),
            c: item
          };
        }),
        e: common_vendor.o(($event) => emit("confirm")),
        f: __props.show ? 1 : "",
        g: isClosing.value ? 1 : "",
        h: __props.show ? 1 : "",
        i: isClosing.value ? 1 : ""
      } : {});
    };
  }
};
wx.createComponent(_sfc_main);
