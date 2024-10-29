"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "withdraw_list",
  setup(__props) {
    const withdraw_list = common_vendor.ref([]);
    const withdraw_list_count = common_vendor.ref(0);
    const is_loading = common_vendor.ref(false);
    common_vendor.onShow(() => {
      withdraw_list_data();
    });
    common_vendor.onReachBottom(() => {
      withdraw_list_data(withdraw_list.value.length);
    });
    async function withdraw_list_data() {
      let res = await utils_request.request("/WxAppCustomer/withdraw_list", "post", {
        offset: withdraw_list.value.length
      });
      console.log("withdraw_list_data", res);
      if (res.code != 0)
        return common_vendor.index.showToast({ title: res.data.msg, icon: "none", mask: true });
      withdraw_list.value.push.apply(withdraw_list.value, res.data.withdraw_list);
      withdraw_list_count.value = res.data.withdraw_list_count;
      is_loading.value = true;
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: is_loading.value
      }, is_loading.value ? common_vendor.e({
        b: withdraw_list.value.length > 0
      }, withdraw_list.value.length > 0 ? {
        c: common_vendor.f(withdraw_list.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.type == 1
          }, item.type == 1 ? {} : {}, {
            b: item.type == 2
          }, item.type == 2 ? {} : {}, {
            c: common_vendor.t(item.update_time),
            d: common_vendor.t(item.money),
            e: item.pass_stat == 0
          }, item.pass_stat == 0 ? {} : {}, {
            f: item.pass_stat == 1
          }, item.pass_stat == 1 ? {} : {}, {
            g: item.pass_stat == 2
          }, item.pass_stat == 2 ? {} : {}, {
            h: item.id
          });
        })
      } : {}, {
        d: withdraw_list.value.length <= 0
      }, withdraw_list.value.length <= 0 ? {} : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5748e982"]]);
wx.createPage(MiniProgramPage);
