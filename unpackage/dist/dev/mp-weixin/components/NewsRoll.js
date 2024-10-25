"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  __name: "NewsRoll",
  setup(__props) {
    const newsList = common_vendor.ref([
      { id: 10, title: "热烈祝贺XX公司微信小程序上线运营！" },
      { id: 11, title: "祝贺河南省智慧健康养老专业委员会成立" },
      { id: 12, title: "公司年会圆满结束，感谢全体员工的努力" },
      { id: 13, title: "新产品发布会即将举行，敬请期待" }
    ]);
    const visibleNewsList = common_vendor.ref(newsList.value.slice(0, 2));
    const txtBoxAnimation = common_vendor.ref(false);
    const scrollNews = () => {
      const lastIndex = newsList.value.findIndex((item) => item.id == visibleNewsList.value[visibleNewsList.value.length - 1].id);
      const nextIndex = (lastIndex + 1) % newsList.value.length;
      const nextNextIndex = (lastIndex + 2) % newsList.value.length;
      visibleNewsList.value.push(newsList.value[nextIndex], newsList.value[nextNextIndex]);
      txtBoxAnimation.value = true;
      setTimeout(() => {
        visibleNewsList.value.splice(0, 2);
        txtBoxAnimation.value = false;
      }, 500);
    };
    common_vendor.onMounted(() => {
      setInterval(scrollNews, 5e3);
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$13,
        b: common_vendor.f(visibleNewsList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.id
          };
        }),
        c: txtBoxAnimation.value ? 1 : "",
        d: common_vendor.o(scrollNews)
      };
    };
  }
};
wx.createComponent(_sfc_main);
