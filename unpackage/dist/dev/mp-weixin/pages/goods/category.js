"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  _easycom_NavBar2();
}
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
if (!Math) {
  (_easycom_NavBar + HighGoods)();
}
const HighGoods = () => "../../components/HighGoods.js";
const _sfc_main = {
  __name: "category",
  setup(__props) {
    common_vendor.useRoute();
    const productList = common_vendor.ref([]);
    const productListName = common_vendor.ref("");
    const category_id = common_vendor.ref(null);
    common_vendor.onLoad((options) => {
      category_id.value = options.id;
      getData();
    });
    async function getData() {
      common_vendor.index.showLoading({ title: "加载中" });
      let res = await utils_request.request("/WxAppCustomer/goods_list", "POST", {
        goods_group_ids: category_id.value
      });
      if (res.code != 0)
        return common_vendor.index.showToast({ title: res.msg, icon: "error" });
      productList.value = res.data.list;
      let res2 = await utils_request.request("/WxAppCustomer/goods_group_detail", "POST", {
        id: category_id.value
      });
      if (res2.code != 0)
        return common_vendor.index.showToast({ title: res2.msg, icon: "error" });
      productListName.value = res2.data.detail.name;
      common_vendor.index.hideLoading();
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: productListName.value,
          showBack: true
        }),
        b: common_vendor.p({
          goods: productList.value,
          isShowHeader: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3ee92683"]]);
wx.createPage(MiniProgramPage);
