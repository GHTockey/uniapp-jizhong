"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
const _sfc_main = {
  __name: "presentSend",
  setup(__props) {
    const sendPopupRef = common_vendor.ref(null);
    const posterPopupRef = common_vendor.ref(null);
    let imgPath = common_vendor.ref("");
    function savePoster() {
      let tempFilePath;
      common_vendor.index.downloadFile({
        url: imgPath.value,
        success: (res) => {
          tempFilePath = res.tempFilePath;
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success: () => {
              common_vendor.index.showToast({
                duration: 3e3,
                icon: "none",
                title: "图片已下载至相册，快去分享吧"
              });
            },
            fail: (err) => {
              console.log(err);
            }
          });
        }
      });
    }
    async function generatePoster() {
      sendPopupRef.value.close();
      common_vendor.index.showLoading({ title: "生成海报中" });
      let res = await utils_request.request("/WxAppCustomer/haibao_add_qrcode_arr", "post", { id: 1480 });
      common_vendor.index.hideLoading();
      if (res.code == 0) {
        imgPath.value = res.data.arr_imgs;
        posterPopupRef.value.open();
      } else {
        common_vendor.index.showToast({ title: res.msg, icon: "error" });
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => sendPopupRef.value.open()),
        b: common_vendor.o(generatePoster),
        c: common_vendor.o(($event) => sendPopupRef.value.close()),
        d: common_vendor.sr(sendPopupRef, "6207edca-0", {
          "k": "sendPopupRef"
        }),
        e: common_vendor.p({
          type: "bottom",
          ["mask-click"]: false
        }),
        f: common_vendor.unref(imgPath),
        g: common_vendor.o(savePoster),
        h: common_vendor.o(($event) => posterPopupRef.value.close()),
        i: common_vendor.sr(posterPopupRef, "6207edca-1", {
          "k": "posterPopupRef"
        }),
        j: common_vendor.p({
          type: "center",
          ["mask-click"]: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6207edca"]]);
wx.createPage(MiniProgramPage);
