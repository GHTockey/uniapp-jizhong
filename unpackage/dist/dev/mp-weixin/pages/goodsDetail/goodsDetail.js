"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
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
  (_easycom_ActionSheet + _easycom_uni_number_box + _easycom_ActionSheetSlot)();
}
const _sfc_main = {
  __name: "goodsDetail",
  setup(__props) {
    const showActionSheet = common_vendor.ref(false);
    const showActionSheetSlot = common_vendor.ref(false);
    const actionSheetData = common_vendor.ref({
      title: "商品参数",
      items: [
        { name: "颜色", value: "红色" },
        { name: "尺寸", value: "大号" },
        { name: "尺寸", value: "大号" },
        { name: "尺寸", value: "大号" }
      ]
    });
    function goBack() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$6,
        b: common_assets._imports_0$7,
        c: common_vendor.o(goBack),
        d: common_assets._imports_1$2,
        e: common_assets._imports_2$1,
        f: common_vendor.o(($event) => showActionSheetSlot.value = true),
        g: common_assets._imports_3$1,
        h: common_vendor.o(($event) => showActionSheet.value = true),
        i: common_assets._imports_5,
        j: common_vendor.o(($event) => showActionSheet.value = true),
        k: common_assets._imports_6,
        l: common_vendor.o(($event) => showActionSheet.value = true),
        m: common_assets._imports_1$2,
        n: common_assets._imports_1$2,
        o: common_assets._imports_7,
        p: common_assets._imports_8,
        q: common_assets._imports_9,
        r: common_assets._imports_10,
        s: common_vendor.o(($event) => showActionSheetSlot.value = true),
        t: common_vendor.o(($event) => showActionSheet.value = $event),
        v: common_vendor.p({
          title: actionSheetData.value.title,
          items: actionSheetData.value.items,
          show: showActionSheet.value
        }),
        w: common_assets._imports_4,
        x: common_assets._imports_12,
        y: common_assets._imports_4,
        z: common_assets._imports_4,
        A: common_assets._imports_4,
        B: common_vendor.o(($event) => showActionSheetSlot.value = $event),
        C: common_vendor.p({
          footerBtnText: "立即购买",
          show: showActionSheetSlot.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c35cc779"]]);
wx.createPage(MiniProgramPage);
