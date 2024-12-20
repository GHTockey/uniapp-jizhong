"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
const stores_system = require("../../stores/system.js");
const stores_tabBar = require("../../stores/tabBar.js");
const _sfc_main = {
  __name: "TabBar",
  props: {
    selectedIndex: {
      type: Number,
      default: 0
    },
    isAppMode: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => [
        {
          icon_path: "/images/present-home-n.svg",
          selected_icon_path: "/images/present-home-a.svg",
          page_name: "首页",
          text: "首页",
          path: "pages/mine/present",
          is_hide: 0
        },
        {
          icon_path: "/images/present-card-n.svg",
          selected_icon_path: "/images/present-card-a.svg",
          page_name: "卡包",
          text: "卡包",
          path: "pages/mine/presentCard",
          is_hide: 0
        },
        {
          icon_path: "/images/present-mine-n.svg",
          selected_icon_path: "/images/present-mine-a.svg",
          page_name: "我的",
          text: "我的",
          path: "pages/mine/presentMine",
          is_hide: 0
        }
      ]
    }
  },
  emits: ["update:selectedIndex"],
  setup(__props, { emit: __emit }) {
    stores_system.useSystemStore();
    const tabBarStore = stores_tabBar.useTabBarStore();
    const { list: tabbarList, selectedIndex: tabbarSelectedIndex } = common_vendor.storeToRefs(tabBarStore);
    const emit = __emit;
    const props = __props;
    common_vendor.onMounted(() => {
      let currentPath = getCurrentPages()[getCurrentPages().length - 1].route;
      if (props.isAppMode) {
        tabbarList.value.forEach((item, index) => {
          if (item.path == currentPath) {
            tabBarStore.selectedIndex = index;
            emit("update:selectedIndex", index);
          }
        });
      }
    });
    const updateSelectedIndex = (index) => {
      emit("update:selectedIndex", index);
    };
    async function selectTab(index) {
      if (props.isAppMode) {
        if (tabbarSelectedIndex.value == index)
          return;
        try {
          await common_vendor.index.redirectTo({ url: "/" + tabbarList.value[index].path });
          tabbarSelectedIndex.value = index;
        } catch (error) {
          console.log(error);
          common_vendor.index.showToast({ title: error.errMsg, icon: "none" });
        }
      } else {
        if (props.selectedIndex == index)
          return;
        try {
          await common_vendor.index.redirectTo({ url: "/" + props.list[index].path });
          updateSelectedIndex(index);
        } catch (error) {
          console.log(error);
          common_vendor.index.showToast({ title: error.errMsg, icon: "none" });
        }
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.isAppMode
      }, __props.isAppMode ? {
        b: common_vendor.f(common_vendor.unref(tabbarList), (item, index, i0) => {
          return {
            a: common_vendor.unref(tabbarSelectedIndex) == index ? "https://saas.jizhongkeji.com/static/jzkj/static/" + item.selected_icon_path : "https://saas.jizhongkeji.com/static/jzkj/static/" + item.icon_path,
            b: common_vendor.t(item.text),
            c: common_vendor.n({
              "active": common_vendor.unref(tabbarSelectedIndex) == index
            }),
            d: index,
            e: common_vendor.o(($event) => selectTab(index), index)
          };
        })
      } : {
        c: common_vendor.f(__props.list, (item, index, i0) => {
          return {
            a: __props.selectedIndex == index ? "https://saas.jizhongkeji.com/static/jzkj/static/" + item.selected_icon_path : "https://saas.jizhongkeji.com/static/jzkj/static/" + item.icon_path,
            b: common_vendor.t(item.text),
            c: common_vendor.n({
              "active": __props.selectedIndex == index
            }),
            d: index,
            e: common_vendor.o(($event) => selectTab(index), index)
          };
        })
      });
    };
  }
};
wx.createComponent(_sfc_main);
