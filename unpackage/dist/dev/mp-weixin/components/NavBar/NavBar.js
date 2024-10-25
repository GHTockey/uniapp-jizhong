"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "NavBar",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    isWhite: {
      type: Boolean,
      default: false
    },
    showBack: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const search_str = common_vendor.ref("");
    let boundingWidth = 0;
    {
      boundingWidth = (common_vendor.index.getSystemInfoSync()["windowWidth"] - common_vendor.index.getMenuButtonBoundingClientRect().right) * 2 + common_vendor.index.getMenuButtonBoundingClientRect().width;
    }
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.showBack
      }, __props.showBack ? {
        b: __props.isWhite ? "../../static/icon/left-white-icon.svg" : "../../static/icon/left-black-icon.svg",
        c: common_vendor.o(goBack)
      } : {}, {
        d: !__props.showSearch
      }, !__props.showSearch ? {
        e: common_vendor.t(__props.title)
      } : {}, {
        f: __props.showSearch
      }, __props.showSearch ? common_vendor.e({
        g: !search_str.value || search_str.value.length == 0
      }, !search_str.value || search_str.value.length == 0 ? {} : {}, {
        h: search_str.value,
        i: common_vendor.o(($event) => search_str.value = $event.detail.value),
        j: common_vendor.unref(boundingWidth) + "px"
      }) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9367190c"]]);
wx.createComponent(Component);
