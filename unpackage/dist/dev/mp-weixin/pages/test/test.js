"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_ActionSheet2 = common_vendor.resolveComponent("ActionSheet");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_ActionSheetSlot2 = common_vendor.resolveComponent("ActionSheetSlot");
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  (_easycom_ActionSheet2 + _easycom_uni_number_box2 + _easycom_ActionSheetSlot2 + _easycom_NavBar2)();
}
const _easycom_ActionSheet = () => "../../components/ActionSheet/ActionSheet.js";
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_ActionSheetSlot = () => "../../components/ActionSheetSlot/ActionSheetSlot.js";
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
if (!Math) {
  (CouponPopup + _easycom_ActionSheet + _easycom_uni_number_box + _easycom_ActionSheetSlot + _easycom_NavBar)();
}
const CouponPopup = () => "../../components/CouponPopup.js";
const _sfc_main = {
  __name: "test",
  setup(__props) {
    const showPopup = common_vendor.ref(false);
    const showActionSheet = common_vendor.ref(false);
    const showActionSheetSlot = common_vendor.ref(false);
    const goodsParamsData = common_vendor.ref([
      { name: "商品型号", value: "固始鸡1200gx1只（共2.4斤）", id: 1 },
      { name: "商品型号", value: "固始鸡1200gx1只（共3.4斤）", id: 2 },
      { name: "商品型号", value: "固始鸡1200gx1只（共5.4斤）", id: 3 }
    ]);
    const selectedGoodsParams = common_vendor.ref([1]);
    const handleSelectGoodsParams = (id) => {
      selectedGoodsParams.value = [id];
      console.log(selectedGoodsParams.value);
    };
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
    const handleCloseCoupon = () => {
      console.log("优惠券弹窗关闭");
    };
    const handleClaimCoupon = () => {
      console.log("优惠券领取");
      common_vendor.index.showToast({
        title: "领取"
      });
    };
    const handleConfirmActionSheet = () => {
      console.log("actionSheet 确定");
    };
    async function testApi() {
      let res = await utils_request.request(
        "/home_all_data_v",
        "post"
      );
      console.log(res);
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleCloseCoupon),
        b: common_vendor.o(handleClaimCoupon),
        c: common_vendor.o(($event) => showPopup.value = $event),
        d: common_vendor.p({
          title: "aaa",
          amount: 100,
          condition: "满100可用",
          expiryDate: "2024.08.88",
          visible: showPopup.value
        }),
        e: common_vendor.o(($event) => showPopup.value = true),
        f: common_vendor.o(testApi),
        g: common_vendor.o(($event) => goToPage("/pages/shopcar/shopcar")),
        h: common_vendor.o(($event) => goToPage("/pages/onlineSearch/onlineSearch")),
        i: common_vendor.o(($event) => goToPage("/pages/goodsDetail/goodsDetail")),
        j: common_vendor.o(($event) => showActionSheet.value = true),
        k: common_vendor.o(($event) => showActionSheetSlot.value = true),
        l: common_vendor.o(handleConfirmActionSheet),
        m: common_vendor.o(($event) => showActionSheet.value = $event),
        n: common_vendor.p({
          items: actionSheetData.value.items,
          title: actionSheetData.value.title,
          show: showActionSheet.value
        }),
        o: common_assets._imports_13,
        p: common_assets._imports_12,
        q: common_vendor.f(goodsParamsData.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.value),
            b: item.id,
            c: common_vendor.o(($event) => handleSelectGoodsParams(item.id), item.id),
            d: selectedGoodsParams.value.includes(item.id) ? 1 : "",
            e: item.id == 3 ? 1 : ""
          };
        }),
        r: common_assets._imports_13,
        s: common_vendor.o(($event) => showActionSheetSlot.value = $event),
        t: common_vendor.p({
          footerBtnText: "立即购买",
          show: showActionSheetSlot.value
        }),
        v: common_vendor.p({
          title: "标题",
          showBack: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-727d09f0"]]);
wx.createPage(MiniProgramPage);
