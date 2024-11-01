"use strict";
const common_vendor = require("../../common/vendor.js");
const TYPE_GIFT_CARD = 0;
const TYPE_STORE_CARD = 1;
const STATUS_PENDING = 0;
const STATUS_COMPLETED = 1;
const STATUS_CLOSED = 2;
const _sfc_main = {
  __name: "presentRecords",
  setup(__props) {
    const currentTabIndex = common_vendor.ref(0);
    const filteredRecords = common_vendor.computed(() => {
      if (currentTabIndex.value == 0) {
        return records.value;
      } else if (currentTabIndex.value == 1) {
        return records.value.filter((item) => item.status == STATUS_PENDING);
      } else if (currentTabIndex.value == 2) {
        return records.value.filter((item) => item.status == STATUS_COMPLETED);
      } else if (currentTabIndex.value == 3) {
        return records.value.filter((item) => item.status == STATUS_CLOSED);
      }
    });
    const records = common_vendor.ref([
      {
        id: 1,
        type: TYPE_GIFT_CARD,
        // 礼品卡
        status: STATUS_CLOSED,
        // 已关闭
        image: "https://saas.jizhongkeji.com/static/jzkj/static/images/present_item.png",
        description: "2025新春礼品卡2025新春礼品卡2025新春礼2025新春礼品卡2025新春礼品卡2025新春礼",
        price: 180,
        quantity: 2,
        date: "2024-08-09 14:56:45",
        total: 360
      },
      {
        id: 2,
        type: TYPE_STORE_CARD,
        // 储值卡
        status: STATUS_COMPLETED,
        // 已完成
        image: "https://saas.jizhongkeji.com/static/jzkj/static/images/present_item.png",
        description: "2025新春礼品卡2025新春礼品卡2025新春礼2025新春礼品卡2025新春礼品卡2025新春礼",
        price: 180,
        quantity: 2,
        date: "2024-08-09 14:56:45",
        total: 360
      },
      {
        id: 3,
        type: TYPE_GIFT_CARD,
        // 礼品卡
        status: STATUS_PENDING,
        // 待支付
        image: "https://saas.jizhongkeji.com/static/jzkj/static/images/present_item.png",
        description: "2025新春礼品卡2025新春礼品卡2025新春礼2025新春礼品卡2025新春礼品卡2025新春礼",
        price: 180,
        quantity: 2,
        date: "2024-08-09 14:56:45",
        total: 360,
        closingTime: "23:59:00"
      }
    ]);
    function getTypeName(type) {
      switch (type) {
        case TYPE_GIFT_CARD:
          return "礼品卡";
        case TYPE_STORE_CARD:
          return "储值卡";
        default:
          return "未知类型";
      }
    }
    function getStatusName(status) {
      switch (status) {
        case STATUS_PENDING:
          return "待支付";
        case STATUS_COMPLETED:
          return "已完成";
        case STATUS_CLOSED:
          return "已关闭";
        default:
          return "未知状态";
      }
    }
    function handleItemClick(item) {
      common_vendor.index.navigateTo({
        url: `/pages/mine/presentDetailSimple?id=${item.id}&is_records=true`
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: currentTabIndex.value == 0 ? 1 : "",
        b: common_vendor.o(($event) => currentTabIndex.value = 0),
        c: currentTabIndex.value == 1 ? 1 : "",
        d: common_vendor.o(($event) => currentTabIndex.value = 1),
        e: currentTabIndex.value == 2 ? 1 : "",
        f: common_vendor.o(($event) => currentTabIndex.value = 2),
        g: currentTabIndex.value == 3 ? 1 : "",
        h: common_vendor.o(($event) => currentTabIndex.value = 3),
        i: common_vendor.f(filteredRecords.value, (item, k0, i0) => {
          return common_vendor.e({
            a: `https://saas.jizhongkeji.com/static/jzkj/static/icon/${item.type ? "chuzhi" : "lipin"}-card.svg`,
            b: common_vendor.t(getTypeName(item.type)),
            c: common_vendor.t(getStatusName(item.status)),
            d: item.image,
            e: common_vendor.t(item.description),
            f: common_vendor.t(item.price),
            g: common_vendor.t(item.quantity),
            h: item.status == 0
          }, item.status == 0 ? {
            i: common_vendor.t(item.closingTime)
          } : {
            j: common_vendor.t(item.date),
            k: common_vendor.t(item.total)
          }, {
            l: item.id,
            m: common_vendor.o(($event) => handleItemClick(item), item.id)
          });
        })
      }, {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-58f5f503"]]);
wx.createPage(MiniProgramPage);
