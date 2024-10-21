"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "onlineSearch",
  setup(__props) {
    const searchHistory = common_vendor.ref([
      {
        id: 1,
        keyword: "苹果",
        time: "2024-02-01 12:00:00"
      },
      {
        id: 2,
        keyword: "香蕉",
        time: "2024-02-01 12:00:00"
      },
      {
        id: 3,
        keyword: "橘子",
        time: "2024-02-01 12:00:00"
      },
      {
        id: 4,
        keyword: "橘子",
        time: "2024-02-01 12:00:00"
      }
    ]);
    common_vendor.ref([
      {
        id: 1,
        keyword: "苹果",
        time: "2024-02-01 12:00:00"
      },
      {
        id: 2,
        keyword: "香蕉",
        time: "2024-02-01 12:00:00"
      },
      {
        id: 3,
        keyword: "橘子方式打开链接哦",
        time: "2024-02-01 12:00:00"
      }
    ]);
    function handleClearSearchHistory() {
      common_vendor.index.showModal({
        content: "是否确定删除所有搜索历史?",
        success: function(res) {
          if (res.confirm) {
            searchHistory.value = [];
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$5
      }, {
        b: common_vendor.o(handleClearSearchHistory),
        c: common_assets._imports_1$1,
        d: common_vendor.f(searchHistory.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.keyword),
            b: item.id
          };
        })
      }, {}, {});
    };
  }
};
wx.createPage(_sfc_main);
