"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "ShoppingCarDefault",
  props: {
    status: {
      type: String,
      required: true,
      default: "404"
    }
  },
  setup(__props) {
    const props = __props;
    const text = {
      "404": "抱歉，你访问的页面找不到了",
      unpublished: "管理员暂未发布内容，敬请期待",
      network: "网络遇到问题，请检查后再试",
      pay_fail: "订单支付失败",
      no_permission: "当前用户该功能的操作权限",
      empty: "购物车内暂无商品，快去选购吧"
    };
    const buttonConfig = {
      btnText: {
        404: "返回首页",
        unpublished: "返回首页",
        network: "重新加载",
        pay_fail: null,
        no_permission: "返回",
        empty: null
      },
      btnStyle: {
        404: "shopping-car-default-button-gradient",
        unpublished: "shopping-car-default-button-gradient",
        network: "shopping-car-default-button-border",
        pay_fail: null,
        no_permission: "shopping-car-default-button-border",
        empty: null
      }
    };
    const imageConfig = {
      404: "../../static/default/404.svg",
      unpublished: "../../static/default/kong.svg",
      network: "../../static/default/wifi.svg",
      pay_fail: "../../static/default/pay_fail.svg",
      no_permission: "../../static/default/no_permission.svg",
      empty: "../../static/default/shoppingCart-empty.svg"
    };
    const handleClick = () => {
      if (buttonConfig.btnText[props.status] == "返回首页") {
        common_vendor.index.navigateTo({
          url: "/pages/index/index"
        });
      } else if (buttonConfig.btnText[props.status] == "重新加载")
        ;
      else if (buttonConfig.btnText[props.status] == "返回") {
        common_vendor.index.navigateBack();
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: imageConfig[props.status],
        b: common_vendor.t(text[props.status]),
        c: buttonConfig.btnText[props.status]
      }, buttonConfig.btnText[props.status] ? {
        d: common_vendor.t(buttonConfig.btnText[props.status]),
        e: common_vendor.n(buttonConfig.btnStyle[props.status]),
        f: common_vendor.o(handleClick)
      } : {});
    };
  }
};
wx.createComponent(_sfc_main);
