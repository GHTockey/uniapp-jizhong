"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "MessageBar",
  setup(__props) {
    const notifyType = common_vendor.ref(-1);
    common_vendor.onLoad((options) => {
      notifyType.value = options.notifyType;
    });
    function getNotifyInonName() {
      if (notifyType.value == 1) {
        return "yue";
      } else if (notifyType.value == 2) {
        return "wuliu";
      } else if (notifyType.value == 3) {
        return "fangke";
      } else if (notifyType.value == 4) {
        return "jifen";
      } else if (notifyType.value == 5) {
        return "yingxiao";
      }
    }
    return (_ctx, _cache) => {
      return {
        a: `https://saas.jizhongkeji.com/static/jzkj/static/icon/${getNotifyInonName(notifyType.value)}.png`
      };
    };
  }
};
wx.createComponent(_sfc_main);
