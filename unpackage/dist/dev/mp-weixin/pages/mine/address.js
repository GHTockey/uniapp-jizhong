"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_DefaultTip2 = common_vendor.resolveComponent("DefaultTip");
  _easycom_DefaultTip2();
}
const _easycom_DefaultTip = () => "../../components/DefaultTip/DefaultTip.js";
if (!Math) {
  _easycom_DefaultTip();
}
const _sfc_main = {
  __name: "address",
  setup(__props) {
    const type = common_vendor.ref("to_choose");
    const address_list = common_vendor.ref([]);
    common_vendor.onLoad((options) => {
      if ((options == null ? void 0 : options.type) == "edit") {
        type.value = options.type;
      }
    });
    common_vendor.onShow(() => {
      get_info_list();
    });
    function toAddressForm() {
      common_vendor.index.navigateTo({
        url: "/pages/mine/address_form"
      });
    }
    function to_edit(item) {
      common_vendor.index.navigateTo({
        url: "/pages/mine/address_form?id=" + item.id
      });
    }
    function to_add(e) {
      common_vendor.index.navigateTo({
        url: "/pages/mine/address_form"
      });
    }
    async function to_choose(item) {
      console.log("to_choose item", item.id);
      let res = await utils_request.request("/WxAppCustomer/choose_address", "post", { id: item.id || 0 });
      console.log("to_choose res", res);
      if (res.code != 0)
        return common_vendor.index.showToast({ title: res.msg, icon: "error", duration: 2e3 });
      common_vendor.index.navigateBack();
    }
    async function get_info_list() {
      common_vendor.index.showLoading({ title: "加载中" });
      let res = await utils_request.request("/WxAppCustomer/get_address_list", "post", {});
      console.log("get_info_list res", res);
      common_vendor.index.hideLoading();
      if (res.code != 0)
        return common_vendor.index.showToast({ title: res.msg, icon: "error", duration: 2e3 });
      address_list.value = res.data.address_list;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: address_list.value && address_list.value.length > 0
      }, address_list.value && address_list.value.length > 0 ? {
        b: common_vendor.f(address_list.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.user_name),
            b: common_vendor.t(item.mobile),
            c: common_vendor.t(item.address),
            d: common_vendor.t(item.address_detail),
            e: item.is_default
          }, item.is_default ? {} : {}, type.value == "edit" ? {} : {}, {
            f: common_vendor.o(($event) => type.value == "edit" ? to_edit(item) : to_choose(item), item.id),
            g: item.id
          });
        }),
        c: common_vendor.n(`address_text ${type.value == "edit" ? "" : "width_big"}`),
        d: type.value == "edit"
      } : {
        e: common_vendor.o(toAddressForm),
        f: common_vendor.p({
          text: "暂无地址",
          btnText: "立即添加",
          image: "address-em.svg"
        })
      }, {
        g: common_vendor.o(to_add)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6685374a"]]);
wx.createPage(MiniProgramPage);
