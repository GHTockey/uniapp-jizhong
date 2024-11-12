"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
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
    },
    searchPath: {
      type: String,
      default: ""
    },
    searchPlaceholder: {
      type: String,
      default: "搜索商品"
    },
    bgc: {
      type: String
    }
  },
  setup(__props) {
    const search_str = common_vendor.ref("");
    const boundingWidth = utils_index.getTitleBarWidth();
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.showBack
      }, __props.showBack ? {
        b: __props.isWhite ? "https://saas.jizhongkeji.com/static/jzkj/static/icon/left-white-icon.svg" : "https://saas.jizhongkeji.com/static/jzkj/static/icon/left-black-icon.svg",
        c: common_vendor.o(goBack)
      } : {}, {
        d: !__props.showSearch
      }, !__props.showSearch ? {
        e: common_vendor.t(__props.title)
      } : {}, {
        f: __props.showSearch
      }, __props.showSearch ? common_vendor.e({
        g: common_vendor.t(__props.title),
        h: !search_str.value || search_str.value.length == 0
      }, !search_str.value || search_str.value.length == 0 ? {} : {}, {
        i: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)(__props.searchPath)),
        j: __props.searchPlaceholder,
        k: search_str.value,
        l: common_vendor.o(($event) => search_str.value = $event.detail.value),
        m: common_vendor.unref(boundingWidth) + "px",
        n: common_vendor.s(__props.showBack && __props.title ? {
          width: `calc(100% - 60rpx)`,
          marginLeft: "60rpx"
        } : "")
      }) : {}, {
        o: common_vendor.unref(utils_index.getStatusBarHeight)() + "px",
        p: __props.bgc || "#FFFFFF"
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9367190c"]]);
wx.createComponent(Component);
