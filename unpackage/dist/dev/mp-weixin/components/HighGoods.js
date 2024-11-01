"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "HighGoods",
  props: {
    goods: {
      type: Array,
      default: () => [
        {
          goods_group_id: 89,
          id: 2528,
          image_uri: "https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/jpg/b3acb8d24f89f55a71b3e701075dd26a.w1000.h1000.d0.b19379.s99225.jpg",
          name: "中学生夏季校服",
          price: "90.00"
        },
        {
          goods_group_id: 89,
          id: 2528,
          image_uri: "https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/jpg/b3acb8d24f89f55a71b3e701075dd26a.w1000.h1000.d0.b19379.s99225.jpg",
          name: "中学生夏季校服你谁哦吼鸡尾酒佛系哦额文化i哦i哦附件我if就后悔偶额护肤哦",
          price: "90.00"
        },
        {
          goods_group_id: 89,
          id: 2528,
          image_uri: "https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/jpg/b3acb8d24f89f55a71b3e701075dd26a.w1000.h1000.d0.b19379.s99225.jpg",
          name: "中学生夏季校服",
          price: "90.00"
        },
        {
          goods_group_id: 89,
          id: 2528,
          image_uri: "https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/jpg/b3acb8d24f89f55a71b3e701075dd26a.w1000.h1000.d0.b19379.s99225.jpg",
          name: "中学生夏季校服",
          price: "90.00"
        },
        {
          goods_group_id: 89,
          id: 2528,
          image_uri: "https://saascdn.jizhongkeji.com/oss_jzkj/wx184d389f8e1603d4/jpg/b3acb8d24f89f55a71b3e701075dd26a.w1000.h1000.d0.b19379.s99225.jpg",
          name: "中学生夏季校服",
          price: "90.00"
        }
      ]
    },
    isShowHeader: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.isShowHeader
      }, __props.isShowHeader ? {} : {}, {
        b: common_vendor.f(__props.goods, (product, index, i0) => {
          return common_vendor.e({
            a: product.image_uri,
            b: common_vendor.t(product.name),
            c: product.price > 0
          }, product.price > 0 ? {} : {}, {
            d: common_vendor.t(product.price),
            e: `/pages/product/detail?id=${product.id}`,
            f: index
          });
        })
      });
    };
  }
};
wx.createComponent(_sfc_main);
