"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_TransitionGroup = common_vendor.resolveComponent("TransitionGroup");
  _component_TransitionGroup();
}
const _sfc_main = {
  __name: "BubbleTips",
  props: {
    // 传进来的数据
    itemData: {
      type: Object,
      default: () => {
      }
    }
  },
  setup(__props) {
    const props = __props;
    const showItemList = common_vendor.ref([]);
    let timer = null;
    common_vendor.watch(() => props.itemData, (newData) => {
      if (timer) {
        clearTimeout(timer);
        showItemList.value = [];
      }
      setTimeout(() => {
        showItemList.value = [newData];
      }, 500);
      timer = setTimeout(() => {
        showItemList.value = [];
      }, 3e3);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(showItemList.value, (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.text),
            c: item.id
          };
        }),
        b: common_vendor.p({
          name: "fade"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-37a471b3"]]);
wx.createComponent(Component);
