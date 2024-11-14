"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "DefaultTip",
  props: {
    text: {
      type: String,
      default: "暂无数据"
    },
    btnText: {
      type: String
    },
    image: {
      type: String,
      default: "kong2.svg"
    }
  },
  emits: ["btnClick"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    return (_ctx, _cache) => {
      return {
        a: `https://saas.jizhongkeji.com/static/jzkj/static/images/${props.image}`,
        b: common_vendor.t(props.text),
        c: common_vendor.t(props.btnText),
        d: common_vendor.o(($event) => emit("btnClick")),
        e: props.btnText
      };
    };
  }
};
wx.createComponent(_sfc_main);
