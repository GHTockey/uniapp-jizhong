"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "get_shop_list",
  setup(__props) {
    const is_loading = common_vendor.ref(false);
    common_vendor.ref([
      { id: 1, name: "附近门店" },
      { id: 2, name: "收藏" }
    ]);
    const type_index = common_vendor.ref(0);
    const store_list = common_vendor.ref([]);
    const search_str = common_vendor.ref("");
    const is_kong = common_vendor.ref(false);
    const gps = common_vendor.ref();
    const yuan_list = common_vendor.ref([]);
    const appointent_list = common_vendor.ref();
    common_vendor.onLoad((options) => {
      common_vendor.index.showLoading({
        title: "loading"
      });
      get_user_location();
    });
    function to_shop(shopid) {
      common_vendor.index.navigateTo({
        url: "/pages/index/shop_detail?id=" + shopid
      });
    }
    function get_user_location(e) {
      gps.value = "";
      common_vendor.index.getLocation({
        type: "wgs84",
        success: (res) => {
          gps.value = [res.latitude, res.longitude].join(",");
          console.log("获取的位置", res);
          get_store_list();
        },
        complete: (res) => {
          console.log("获取的位置", res);
          get_store_list();
        }
      });
    }
    async function get_store_list(type, name) {
      let res = await utils_request.request("/WxAppCustomer/store_list", "post", {
        gps: gps.value || "",
        type: type_index.value || "",
        name: search_str.value || ""
      });
      if (res.code == 1) {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "none",
          mask: true
        });
      } else {
        common_vendor.index.hideLoading();
        store_list.value = res.data.store_list;
        yuan_list.value = res.data.store_list;
        is_loading.value = true;
        if (store_list.value.length <= 0) {
          is_kong.value = true;
        }
      }
    }
    async function to_choose(e) {
      let shop_id = e.currentTarget.dataset.id;
      let res = await utils_request.request("/WxAppCustomer/choose_shop", "post", { shop_id: shop_id || 0 });
      if (res.code == 1) {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "none",
          mask: true
        });
      } else {
        common_vendor.index.navigateBack();
      }
    }
    function to_search(e) {
      search_str.value = e.detail.value;
      if (!search_str.value || search_str.value == "") {
        common_vendor.index.showToast({
          title: "请输入关键词",
          icon: "none"
        });
        return;
      }
      store_list.value = [];
      get_store_list();
    }
    function change_search_str(e) {
      if (e.detail.value.length == 0) {
        search_str.value = "";
        appointent_list.value = [];
        is_kong.value = false;
        get_store_list();
      } else {
        search_str.value = e.detail.value;
      }
    }
    function to_search_v(e) {
      console.log("333", search_str.value);
      if (!search_str.value || search_str.value == "") {
        common_vendor.index.showToast({
          title: "请输入关键词",
          icon: "none"
        });
        return;
      }
      store_list.value = [];
      get_store_list();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: is_loading.value
      }, is_loading.value ? common_vendor.e({
        b: !search_str.value || search_str.value.length == 0
      }, !search_str.value || search_str.value.length == 0 ? {} : {}, {
        c: common_vendor.o([($event) => search_str.value = $event.detail.value, change_search_str]),
        d: common_vendor.o(to_search),
        e: search_str.value,
        f: common_vendor.o(to_search_v),
        g: common_vendor.f(store_list.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.image_uris_arr[0],
            b: common_vendor.o(($event) => to_shop(item.id), item.id),
            c: common_vendor.t(item.shop_name),
            d: item.distance > 0
          }, item.distance > 0 ? {
            e: common_vendor.t(item.distance)
          } : {}, {
            f: common_vendor.t(item.address_detail),
            g: common_vendor.t(item.start_time),
            h: common_vendor.t(item.end_time),
            i: common_vendor.o(to_choose, item.id),
            j: item.id,
            k: item.id
          });
        }),
        h: is_kong.value
      }, is_kong.value ? {} : {}) : {});
    };
  }
};
wx.createPage(_sfc_main);
