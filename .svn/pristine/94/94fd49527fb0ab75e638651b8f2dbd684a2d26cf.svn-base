"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
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
    async function testApi() {
      console.log("test");
      let data = {
        // __IS_APP__: 1,
        wx_open_id: "oPyg85Y9gzaTO9wgTmeApQMqmhRY"
        // user_id: '10662',
        // app_type: 'wx_mini_app',
        // fuid: 0,
        // preview: 0
      };
      console.log(data);
      let res = await utils_request.request(
        "/jzkj/WxAppCustomer/home_all_data_v",
        "post",
        data,
        {
          // ['Content-Type']: 'multipart/form-data'
          ["Content-Type"]: "application/x-www-form-urlencoded"
          // 为什么要用这个才是FormData数据
        }
      );
      console.log(res);
    }
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
        d: common_vendor.o(($event) => showPopup.value = true),
        e: common_vendor.o(testApi)
      };
    };
  }
};
wx.createPage(_sfc_main);
