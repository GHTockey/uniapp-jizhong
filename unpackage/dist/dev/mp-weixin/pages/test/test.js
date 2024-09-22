"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  CouponPopup();
}
const CouponPopup = () => "../../components/CouponPopup.js";
const _sfc_main = {
  __name: "test",
  setup(__props) {
    const showPopup = common_vendor.ref(false);
    const handleClose = () => {
      showPopup.value = false;
      console.log("Popup closed");
    };
    const handleClaim = () => {
      console.log("Coupon claimed");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleClose),
        b: common_vendor.o(handleClaim),
        c: common_vendor.p({
          visible: showPopup.value,
          title: "aaa",
          amount: 100,
          condition: "满100可用",
          expiryDate: "2024.08.88"
        }),
        d: common_vendor.o(($event) => showPopup.value = true)
      };
    };
  }
};
wx.createPage(_sfc_main);
