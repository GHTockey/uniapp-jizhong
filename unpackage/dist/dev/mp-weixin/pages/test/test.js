"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_ActionSheet2 = common_vendor.resolveComponent("ActionSheet");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_ActionSheetSlot2 = common_vendor.resolveComponent("ActionSheetSlot");
  (_easycom_ActionSheet2 + _easycom_uni_number_box2 + _easycom_ActionSheetSlot2)();
}
const _easycom_ActionSheet = () => "../../components/ActionSheet/ActionSheet.js";
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_ActionSheetSlot = () => "../../components/ActionSheetSlot/ActionSheetSlot.js";
if (!Math) {
  (CouponPopup + _easycom_ActionSheet + _easycom_uni_number_box + _easycom_ActionSheetSlot)();
}
const CouponPopup = () => "../../components/CouponPopup.js";
const _sfc_main = {
  __name: "test",
  setup(__props) {
    const showPopup = common_vendor.ref(false);
    const showActionSheet = common_vendor.ref(false);
    const showActionSheetSlot = common_vendor.ref(false);
    function goToPage(page) {
      common_vendor.index.navigateTo({
        url: page
      });
    }
    const actionSheetData = common_vendor.ref({
      title: "商品参数",
      items: [
        { name: "颜色", value: "红色" },
        { name: "尺寸", value: "大号" },
        { name: "尺寸", value: "大号" },
        { name: "尺寸", value: "大号" },
        { name: "尺寸", value: "大号" },
        { name: "尺寸", value: "大号" },
        { name: "尺寸", value: "大号" },
        { name: "尺寸", value: "大号" },
        { name: "尺寸", value: "大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号大号" }
      ]
    });
    const handleClose = () => {
      showActionSheet.value = false;
      console.log("Popup closed");
    };
    const handleClaim = () => {
      console.log("Coupon claimed");
    };
    const handleConfirm = () => {
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
        e: common_vendor.o(testApi),
        f: common_vendor.o(($event) => goToPage("/pages/shopcar/shopcar")),
        g: common_vendor.o(($event) => goToPage("/pages/onlineSearch/onlineSearch")),
        h: common_vendor.o(($event) => goToPage("/pages/goodsDetail/goodsDetail")),
        i: common_vendor.o(($event) => showActionSheet.value = true),
        j: common_vendor.o(($event) => showActionSheetSlot.value = true),
        k: common_vendor.o(handleConfirm),
        l: common_vendor.o(($event) => showActionSheet.value = $event),
        m: common_vendor.p({
          items: actionSheetData.value.items,
          title: actionSheetData.value.title,
          show: showActionSheet.value
        }),
        n: common_assets._imports_13,
        o: common_assets._imports_12,
        p: common_assets._imports_13,
        q: common_assets._imports_13,
        r: common_assets._imports_13,
        s: common_vendor.o(($event) => showActionSheetSlot.value = $event),
        t: common_vendor.p({
          footerBtnText: "立即购买",
          show: showActionSheetSlot.value
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
