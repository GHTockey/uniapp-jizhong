"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "shopInfoList",
  setup(__props) {
    const shop_list = common_vendor.ref([]);
    const is_loading = common_vendor.ref(true);
    getData();
    async function getData() {
      common_vendor.index.showLoading({ title: "加载中" });
      let res = await utils_request.request("/WxAppCustomer/shop_info_list", "POST", {});
      if (res.code != 0)
        return common_vendor.index.showToast({ title: res.msg, icon: "error" });
      shop_list.value = res.data.shop_info_list;
      is_loading.value = false;
      common_vendor.index.hideLoading();
    }
    function to_address(item) {
      var address = item.address.split(",");
      var latitude = address[0];
      var longitude = address[1];
      var name = item.shop_name;
      var address = item.address_name;
      console.log("位精度", latitude, longitude);
      common_vendor.index.openLocation({
        longitude: parseFloat(longitude),
        // 经度
        latitude: parseFloat(latitude),
        // 纬度
        name: address,
        // 位置名称
        address: name
        // 地址详情
      });
    }
    function phone(phone2) {
      common_vendor.index.makePhoneCall({
        phoneNumber: phone2,
        success() {
        },
        fail() {
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: shop_list.value.length <= 0
      }, shop_list.value.length <= 0 ? {} : {}, {
        b: common_vendor.f(shop_list.value, (item, k0, i0) => {
          return {
            a: item.image_uri,
            b: common_vendor.t(item.shop_name),
            c: common_vendor.t(item.address_detail),
            d: common_vendor.o(($event) => to_address(item), item.id),
            e: common_vendor.o(($event) => phone(item.phone), item.id),
            f: item.id
          };
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
