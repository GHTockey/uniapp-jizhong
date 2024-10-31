"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "ProductItem",
  props: {
    name: {
      type: String,
      default: ""
    },
    productListShowByRow: {
      type: Array,
      default: () => []
    },
    productList: {
      type: Array,
      default: () => []
    },
    productListName: {
      type: String,
      default: ""
    },
    swiper: {
      type: Object,
      default: () => {
      }
    },
    hidden_prev: {
      type: Boolean,
      default: false
    }
  },
  emits: ["currentPage"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    function currentPage(e) {
      emit("currentPage", e);
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.name == "swiper"
      }, __props.name == "swiper" ? common_vendor.e({
        b: __props.swiper.video
      }, __props.swiper.video ? {
        c: common_vendor.o((...args) => _ctx.startVideoPlay && _ctx.startVideoPlay(...args)),
        d: common_vendor.o((...args) => _ctx.onVideoEnded && _ctx.onVideoEnded(...args)),
        e: __props.swiper.video
      } : {}, {
        f: common_vendor.f(__props.swiper.swiperImgUrls, (item, k0, i0) => {
          return {
            a: item,
            b: item
          };
        }),
        g: __props.swiper.swiperImgUrls.length,
        h: __props.swiper.indicatorDots,
        i: __props.swiper.autoplay,
        j: __props.swiper.interval,
        k: __props.swiper.duration,
        l: common_vendor.o(currentPage)
      }) : {}, {
        m: __props.name == "productList"
      }, __props.name == "productList" ? common_vendor.e({
        n: __props.productListName.length
      }, __props.productListName.length ? common_vendor.e({
        o: !__props.hidden_prev
      }, !__props.hidden_prev ? {} : {}, {
        p: common_vendor.t(__props.productListName)
      }) : {}, {
        q: common_vendor.f(__props.productList, (item, k0, i0) => {
          return common_vendor.e({
            a: item.image_uri,
            b: common_vendor.t(item.name),
            c: item.price > 0
          }, item.price > 0 ? {
            d: common_vendor.t(item.price)
          } : {}, {
            e: `/pages/product/detail?id=${item.id}`,
            f: item.id
          });
        }),
        r: __props.productList.length
      }) : {}, {
        s: __props.name == "productListShowByRow"
      }, __props.name == "productListShowByRow" ? {
        t: common_vendor.f(__props.productListShowByRow, (item, k0, i0) => {
          return common_vendor.e({
            a: item.image_uri,
            b: common_vendor.t(item.name),
            c: item.price > 0
          }, item.price > 0 ? {
            d: common_vendor.t(item.price),
            e: item.price ? 1 : 0
          } : {}, {
            f: `/pages/product/detail?id=${item.id}`,
            g: item.id
          });
        })
      } : {});
    };
  }
};
wx.createComponent(_sfc_main);
