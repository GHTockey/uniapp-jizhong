"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "NavBar",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    showBack: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.showBack
      }, __props.showBack ? {
        b: common_assets._imports_0$12,
        c: common_vendor.o(goBack)
      } : {}, {
        d: common_vendor.t(__props.title)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9367190c"]]);
wx.createComponent(Component);
