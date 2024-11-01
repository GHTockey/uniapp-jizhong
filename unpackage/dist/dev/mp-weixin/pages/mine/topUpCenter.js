"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = {
  __name: "topUpCenter",
  setup(__props) {
    const activeIndex = common_vendor.ref(0);
    const isShowOtherAmount = common_vendor.ref(false);
    const inputRef = common_vendor.ref(null);
    const inputValue = common_vendor.ref("");
    const isShowTopUpStatus = common_vendor.ref(null);
    function rechargeEvent() {
      console.log("rechargeEvent");
      isShowTopUpStatus.value = "ok";
    }
    function inputEvent(params) {
      switch (params) {
        case "close":
          inputValue.value = "";
          break;
        case "submit":
          console.log("submit");
          isShowTopUpStatus.value = "no";
          break;
        default:
          if (params == ".") {
            if (inputValue.value.includes("."))
              return;
            if (!inputValue.value && !Number(params))
              return;
            inputValue.value += params;
          } else {
            inputValue.value += params;
          }
          break;
      }
    }
    function backEvent() {
      common_vendor.index.navigateBack();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !isShowTopUpStatus.value
      }, !isShowTopUpStatus.value ? common_vendor.e({
        b: !isShowOtherAmount.value
      }, !isShowOtherAmount.value ? {
        c: common_vendor.f(6, (item, index, i0) => {
          return common_vendor.e({
            a: activeIndex.value == index
          }, activeIndex.value == index ? {} : {}, {
            b: common_vendor.n(`top_up_center_amount_item ${activeIndex.value == index ? "active" : ""}`),
            c: common_vendor.o(($event) => activeIndex.value = index)
          });
        }),
        d: common_vendor.o(($event) => isShowOtherAmount.value = true)
      } : {
        e: common_vendor.t(inputValue.value || "请输入要充值的金额"),
        f: common_vendor.o(($event) => inputRef.value.open("bottom"))
      }, {
        g: common_vendor.o(rechargeEvent),
        h: common_vendor.t(inputValue.value || "请输入要充值的金额"),
        i: common_vendor.o(($event) => inputEvent("1")),
        j: common_vendor.o(($event) => inputEvent("2")),
        k: common_vendor.o(($event) => inputEvent("3")),
        l: common_vendor.o(($event) => inputEvent("4")),
        m: common_vendor.o(($event) => inputEvent("5")),
        n: common_vendor.o(($event) => inputEvent("6")),
        o: common_vendor.o(($event) => inputEvent("7")),
        p: common_vendor.o(($event) => inputEvent("8")),
        q: common_vendor.o(($event) => inputEvent("9")),
        r: common_vendor.o(($event) => inputEvent("0")),
        s: common_vendor.o(($event) => inputEvent(".")),
        t: common_vendor.o(($event) => inputEvent("close")),
        v: common_vendor.o(($event) => inputEvent("submit")),
        w: common_vendor.sr(inputRef, "ad8f55dc-0", {
          "k": "inputRef"
        }),
        x: common_vendor.o(($event) => ""),
        y: common_vendor.p({
          ["background-color"]: "#fff"
        })
      }) : {
        z: `https://saas.jizhongkeji.com/static/jzkj/static/icon/topUp${isShowTopUpStatus.value == "ok" ? "Ok" : "No"}.svg`,
        A: common_vendor.t(isShowTopUpStatus.value == "ok" ? "成功" : "失败"),
        B: common_vendor.t(isShowTopUpStatus.value == "ok" ? "金额已自动充值到您的储值余额可进入“我的钱包”查看" : "本次充值失败，请检查支付密码是否正确或者重新充值"),
        C: common_vendor.o(($event) => isShowTopUpStatus.value = null),
        D: common_vendor.o(backEvent)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ad8f55dc"]]);
wx.createPage(MiniProgramPage);
