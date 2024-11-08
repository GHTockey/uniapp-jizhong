"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
const utils_request = require("../../utils/request.js");
const stores_temp = require("../../stores/temp.js");
const _sfc_main = {
  __name: "withdraw",
  setup(__props) {
    const { user, business } = common_vendor.storeToRefs(stores_temp.useTempStore());
    common_vendor.ref(2);
    common_vendor.ref(null);
    const total_amount = common_vendor.ref(0);
    const can_cash_money = common_vendor.ref();
    const target_bank = common_vendor.ref();
    const formData = common_vendor.ref({
      name: "",
      phone: "",
      bank: "",
      bankCard: ""
    });
    common_vendor.onShow(() => {
      distribution_center_data();
      last_withdraw();
    });
    function all_can_cash() {
      total_amount.value = can_cash_money.value;
    }
    async function distribution_center_data() {
      let res = await utils_request.request("/WxAppCustomer/distribution_center_data", "post", {});
      console.log("distribution_center_data", res);
      if (res.code == 0) {
        can_cash_money.value = res.data.can_cash_money;
      } else {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "none",
          mask: true
        });
      }
    }
    async function last_withdraw() {
      let res = await utils_request.request("/WxAppCustomer/last_withdraw", "post", {});
      console.log("last_withdraw", res);
      if (res.code == 0) {
        target_bank.value = res.data.target_bank;
        if (res.data.target_bank && res.data.target_bank.id) {
          formData.value.name = res.data.target_bank.user_name;
          formData.value.phone = res.data.target_bank.phone;
          formData.value.bank = res.data.target_bank.bank;
          formData.value.bankCard = res.data.target_bank.card;
        }
      } else {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "none",
          mask: true
        });
      }
    }
    function create_batches_bank() {
      if (!formData.value.name)
        return common_vendor.index.showToast({ title: "请输入本人真实姓名", icon: "none" });
      if (!formData.value.phone)
        return common_vendor.index.showToast({ title: "请输入本人手机号码", icon: "none" });
      if (!formData.value.bank)
        return common_vendor.index.showToast({ title: "请输入开户银行", icon: "none" });
      if (!formData.value.bankCard)
        return common_vendor.index.showToast({ title: "请输入银行卡号", icon: "none" });
      if (total_amount.value <= 0)
        return common_vendor.index.showToast({ title: "请输入提现金额", icon: "none" });
      common_vendor.index.showModal({
        title: "系统提示",
        content: "确认提现吗?",
        complete: async (res) => {
          if (res.cancel)
            ;
          if (res.confirm) {
            let reqRes = await utils_request.request("/WxAppCustomer/apply_withdraw_bank", "post", {
              total_amount: total_amount.value,
              user_name: formData.value.name,
              phone: formData.value.phone,
              bank: formData.value.bank,
              card: formData.value.bankCard
            });
            if (res.code == 0) {
              can_cash_money.value = reqRes.data.can_cash_money;
              user.value = reqRes.data.user;
              common_vendor.index.redirectTo({
                url: "/pages/mine/withdraw_apply_ing"
              });
            } else {
              common_vendor.index.showToast({
                title: reqRes.msg,
                icon: "none",
                mask: true
              });
            }
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(business).withdraw_type == 2 ? "银行卡" : "微信"),
        b: formData.value.name,
        c: common_vendor.o(($event) => formData.value.name = $event.detail.value),
        d: formData.value.phone,
        e: common_vendor.o(($event) => formData.value.phone = $event.detail.value),
        f: formData.value.bank,
        g: common_vendor.o(($event) => formData.value.bank = $event.detail.value),
        h: formData.value.bankCard,
        i: common_vendor.o(($event) => formData.value.bankCard = $event.detail.value),
        j: total_amount.value,
        k: common_vendor.o(($event) => total_amount.value = $event.detail.value),
        l: common_vendor.t(can_cash_money.value),
        m: common_vendor.o(all_can_cash),
        n: common_vendor.o(create_batches_bank),
        o: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/withdraw_list"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-50421715"]]);
wx.createPage(MiniProgramPage);
