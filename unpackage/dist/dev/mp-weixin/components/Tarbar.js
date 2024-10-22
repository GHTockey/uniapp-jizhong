"use strict";
const common_vendor = require("../common/vendor.js");
const stores_system = require("../stores/system.js");
const stores_tarbar = require("../stores/tarbar.js");
const _sfc_main = {
  __name: "Tarbar",
  setup(__props) {
    const systemStore = stores_system.useSystemStore();
    const tarbarStore = stores_tarbar.useTarbarStore();
    const { list, selectedIndex } = common_vendor.storeToRefs(tarbarStore);
    async function selectTab(index) {
      if (selectedIndex.value == index)
        return;
      try {
        await common_vendor.index.navigateTo({ url: "/" + list.value[index].path });
        selectedIndex.value = index;
      } catch (error) {
        console.log(error);
        common_vendor.index.showToast({
          title: "页面不存在",
          icon: "error"
        });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(list), (item, index, i0) => {
          return {
            a: common_vendor.unref(selectedIndex) == index ? "/static/" + item.selected_icon_path : "/static/" + item.icon_path,
            b: common_vendor.t(item.text),
            c: common_vendor.n({
              "active": common_vendor.unref(selectedIndex) == index
            }),
            d: index,
            e: common_vendor.o(($event) => selectTab(index), index)
          };
        }),
        b: common_vendor.unref(systemStore).isIos ? 1 : ""
      };
    };
  }
};
wx.createComponent(_sfc_main);
