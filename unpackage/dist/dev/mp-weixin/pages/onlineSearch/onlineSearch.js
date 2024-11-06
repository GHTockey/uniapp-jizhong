"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "onlineSearch",
  setup(__props) {
    const searchKeyword = common_vendor.ref("");
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
    const hotSearch = common_vendor.ref([
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
    let debounceTimeout;
    function handleSearch(event) {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        common_vendor.index.showLoading({
          title: "搜索中"
        });
        setTimeout(() => {
          common_vendor.index.hideLoading();
        }, 300);
      }, 500);
    }
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
        a: common_vendor.o([($event) => searchKeyword.value = $event.detail.value, handleSearch]),
        b: searchKeyword.value,
        c: !searchKeyword.value
      }, !searchKeyword.value ? {
        d: common_vendor.o(handleClearSearchHistory),
        e: common_vendor.f(searchHistory.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.keyword),
            b: item.id
          };
        })
      } : {}, {
        f: !searchKeyword.value
      }, !searchKeyword.value ? {
        g: common_vendor.f(hotSearch.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.keyword),
            b: item.id
          };
        })
      } : {}, {
        h: searchKeyword.value
      }, searchKeyword.value ? {} : {});
    };
  }
};
wx.createPage(_sfc_main);
