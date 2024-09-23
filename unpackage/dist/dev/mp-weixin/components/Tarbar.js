"use strict";
const common_vendor = require("../common/vendor.js");
const stores_system = require("../stores/system.js");
const _sfc_main = {
  __name: "Tarbar",
  setup(__props) {
    const systemStore = stores_system.useSystemStore();
    const list = [
      {
        "selectedIconPath": "https://saas.jizhongkeji.com/static/jzkj/images/tab1.png",
        "iconPath": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab1.png",
        "path": "pages/index/index",
        "text": "首页"
      },
      {
        "selectedIconPath": "https://saas.jizhongkeji.com/static/jzkj/images/tab2.png",
        "iconPath": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab2.png",
        "path": "pages/product/menu",
        "text": "商品"
      },
      {
        "selectedIconPath": "https://saas.jizhongkeji.com/static/jzkj/images/tab3.png",
        "iconPath": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab3.png",
        "path": "pages/shopcar/shopcar",
        "text": "购物车"
      },
      {
        "selectedIconPath": "https://saas.jizhongkeji.com/static/jzkj/images/tab5.png",
        "iconPath": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab5.png",
        "path": "pages/index/introproduct",
        "text": "资讯"
      },
      {
        "selectedIconPath": "https://saas.jizhongkeji.com/static/jzkj/images/tab6.png",
        "iconPath": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab6.png",
        "path": "pages/activity/activity_list",
        "text": "活动"
      },
      {
        "selectedIconPath": "https://saas.jizhongkeji.com/static/jzkj/images/tab4.png",
        "iconPath": "https://saas.jizhongkeji.com/static/jzkj/images/init_tab4.png",
        "path": "pages/mine/mine",
        "text": "我的"
      }
    ];
    const selectedIndex = common_vendor.ref(0);
    function selectTab(index) {
      selectedIndex.value = index;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list, (item, index, i0) => {
          return {
            a: selectedIndex.value === index ? item.selectedIconPath : item.iconPath,
            b: common_vendor.t(item.text),
            c: common_vendor.n({
              "active": selectedIndex.value === index
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
