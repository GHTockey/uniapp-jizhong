"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "BubbleTips",
  props: {
    // 传进来的数据
    itemData: {
      type: Object
    },
    // 动画时间
    duration: {
      type: Number,
      default: 300
    },
    // 停留时间
    stayTime: {
      type: Number,
      default: 1e3
    }
  },
  setup(__props) {
    const props = __props;
    common_vendor.ref(null);
    const isAnimating = common_vendor.ref(false);
    const bubbleTipsItemStyle = common_vendor.ref({
      transition: `all ${props.duration}ms`
    });
    const itemDataShow = common_vendor.ref();
    common_vendor.watch(() => props.itemData, () => {
      nextItem(props.itemData);
    }, { deep: true });
    function nextItem(itemData) {
      if (isAnimating.value)
        return;
      isAnimating.value = true;
      bubbleTipsItemStyle.value.transform = `translateY(-${100}%)`;
      bubbleTipsItemStyle.value.opacity = 0;
      setTimeout(() => {
        bubbleTipsItemStyle.value.transition = "none";
        bubbleTipsItemStyle.value.transform = `translateY(100%)`;
        itemDataShow.value = itemData;
      }, props.duration);
      setTimeout(() => {
        bubbleTipsItemStyle.value.transition = `all ${props.duration}ms`;
        bubbleTipsItemStyle.value.transform = `translateY(0)`;
        bubbleTipsItemStyle.value.opacity = 1;
        isAnimating.value = false;
      }, props.duration * 2);
    }
    return (_ctx, _cache) => {
      var _a, _b;
      return {
        a: (_a = itemDataShow.value) == null ? void 0 : _a.img,
        b: common_vendor.t((_b = itemDataShow.value) == null ? void 0 : _b.text),
        c: common_vendor.s(bubbleTipsItemStyle.value),
        d: !itemDataShow.value ? 1 : ""
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-37a471b3"]]);
wx.createComponent(Component);
