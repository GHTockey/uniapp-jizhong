"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _easycom_TabBar2 = common_vendor.resolveComponent("TabBar");
  _easycom_TabBar2();
}
const _easycom_TabBar = () => "../../components/TabBar/TabBar.js";
if (!Math) {
  _easycom_TabBar();
}
const _sfc_main = {
  __name: "presentCard",
  setup(__props) {
    const selectedIndex = common_vendor.ref(1);
    const tabsList = common_vendor.ref(["全部", "待使用", "已使用", "已过期"]);
    const tabsIndex = common_vendor.ref(0);
    const itemListData = common_vendor.ref([]);
    itemListData.value = [
      {
        img: "https://saas.jizhongkeji.com/static/jzkj/static/images/present_item.png",
        card_text: "礼品卡",
        title: "2025新春礼品卡2025新春礼品卡2025新春礼2025新春礼品卡2025新春礼品卡2025新春礼",
        time: "2024-08-09 14:56:45 至 2024-08-09 14:56:45",
        is_used: 0
        // 0: 未使用 1: 已使用 2: 已过期
      },
      {
        img: "https://saas.jizhongkeji.com/static/jzkj/static/images/present_item.png",
        card_text: "礼品卡",
        title: "2024中秋礼品卡2024中秋礼品卡2024中秋礼2024中秋礼品卡2024中秋礼品卡2024中秋礼",
        time: "2023-09-21 10:00:00 至 2023-09-21 10:00:00",
        is_used: 1
        // 0: 未使用 1: 已使用 2: 已过期
      },
      {
        img: "https://saas.jizhongkeji.com/static/jzkj/static/images/present_item.png",
        card_text: "储值卡",
        title: "2023端午礼品卡2023端午礼品卡2023端午礼2023端午礼品卡2023端午礼品卡2023端午礼",
        time: "2023-06-14 08:00:00 至 2023-06-14 08:00:00",
        is_used: 2
        // 0: 未使用 1: 已使用 2: 已过期
      },
      {
        img: "https://saas.jizhongkeji.com/static/jzkj/static/images/present_item.png",
        card_text: "储值卡",
        title: "2022春节礼品卡2022春节礼品卡2022春节礼2022春节礼品卡2022春节礼品卡2022春节礼",
        time: "2022-02-01 12:00:00 至 2022-02-01 12:00:00",
        is_used: 0
        // 0: 未使用 1: 已使用 2: 已过期
      }
    ];
    const currentItemList = common_vendor.computed(() => {
      return itemListData.value.filter((item) => {
        return tabsIndex.value === 0 || item.is_used === tabsIndex.value - 1;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabsList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: tabsIndex.value == index ? 1 : "",
            c: common_vendor.o(($event) => tabsIndex.value = index, index),
            d: index
          };
        }),
        b: common_vendor.f(currentItemList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.time),
            c: common_vendor.t(item.card_text),
            d: item.is_used == 0
          }, item.is_used == 0 ? {
            e: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/presentSend"), index),
            f: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/presentActivate"), index)
          } : item.is_used == 1 ? {} : item.is_used == 2 ? {} : {}, {
            g: item.is_used == 1,
            h: item.is_used == 2,
            i: index
          });
        }),
        c: common_vendor.o(($event) => selectedIndex.value = $event),
        d: common_vendor.p({
          selectedIndex: selectedIndex.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5cbe5b80"]]);
wx.createPage(MiniProgramPage);
