"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
if (!Math) {
  CouponList();
}
const CouponList = () => "../../components/CouponsList.js";
const _sfc_main = {
  __name: "couponCenter",
  setup(__props) {
    const coupons = common_vendor.ref([
      {
        condition: "满100可用",
        title: "优惠券标题",
        date: "2024.08.08至2024.08.09",
        usage: "全部商品可用",
        amount: 1e3
      },
      {
        condition: "满100可用",
        title: "优惠券标题",
        date: "2024.08.08至2024.08.09",
        usage: "全部商品可用",
        amount: 1e3
      },
      {
        condition: "满100可用",
        title: "优惠券标题",
        date: "2024.08.08至2024.08.09",
        usage: "全部商品可用",
        amount: 300
      },
      {
        condition: "满100可用",
        title: "优惠券标题",
        date: "2024.08.08至2024.08.09",
        usage: "全部商品可用",
        amount: 300
      },
      {
        condition: "满100可用",
        title: "优惠券标题",
        date: "2024.08.08至2024.08.09",
        usage: "全部商品可用",
        amount: 300
      },
      {
        condition: "满100可用",
        title: "优惠券标题",
        date: "2024.08.08至2024.08.09",
        usage: "全部商品可用",
        amount: 300
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          coupons: coupons.value
        }),
        b: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/coupon/myCoupon"))
      };
    };
  }
};
wx.createPage(_sfc_main);
