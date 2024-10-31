"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "addBank",
  setup(__props) {
    const bankList = common_vendor.ref([
      { name: "中国银行", icon: "", id: 1 },
      { name: "中国工商银行", icon: "", id: 2 },
      { name: "中国建设银行", icon: "", id: 3 },
      { name: "中国农业银行", icon: "", id: 4 },
      { name: "中国邮政储蓄银行", icon: "", id: 5 },
      { name: "中国交通银行", icon: "", id: 6 },
      { name: "中国招商银行", icon: "", id: 7 },
      { name: "中国民生银行", icon: "", id: 8 },
      { name: "中国兴业银行", icon: "", id: 9 },
      { name: "中国平安银行", icon: "", id: 10 },
      { name: "中国中信银行", icon: "", id: 11 },
      { name: "中国广发银行", icon: "", id: 12 },
      { name: "中国华夏银行", icon: "", id: 13 },
      { name: "中国浦发银行", icon: "", id: 14 },
      { name: "中国光大银行", icon: "", id: 15 },
      { name: "中国民生银行", icon: "", id: 16 }
    ]);
    const bankValue = common_vendor.ref();
    const formData = common_vendor.ref({
      name: "",
      phone: "",
      bank: "",
      bankCard: ""
    });
    function saveHandler() {
      if (bankValue.value) {
        formData.value.bank = bankList.value[bankValue.value].name;
      } else {
        common_vendor.index.showToast({
          title: "请选择银行",
          icon: "error"
        });
        return;
      }
      if (!formData.value.name || !formData.value.phone || !formData.value.bank || !formData.value.bankCard) {
        common_vendor.index.showToast({
          title: "请填写完整信息",
          icon: "error"
        });
        return;
      }
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    function bankChangeHandler(e) {
      bankValue.value = e.detail.value;
    }
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: formData.value.name,
        b: common_vendor.o(($event) => formData.value.name = $event.detail.value),
        c: formData.value.phone,
        d: common_vendor.o(($event) => formData.value.phone = $event.detail.value),
        e: (_a = bankList.value[bankValue.value]) == null ? void 0 : _a.name
      }, ((_b = bankList.value[bankValue.value]) == null ? void 0 : _b.name) ? {
        f: common_vendor.t(bankList.value[bankValue.value].name),
        g: common_assets._imports_2$4
      } : {
        h: common_assets._imports_2$4
      }, {
        i: common_vendor.o(bankChangeHandler),
        j: bankValue.value,
        k: bankList.value,
        l: formData.value.bankCard,
        m: common_vendor.o(($event) => formData.value.bankCard = $event.detail.value),
        n: common_vendor.o(saveHandler)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9c990e5a"]]);
wx.createPage(MiniProgramPage);
