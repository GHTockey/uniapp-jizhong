"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
const stores_temp = require("../../stores/temp.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_HeightBar2 = common_vendor.resolveComponent("HeightBar");
  const _easycom_TabBar2 = common_vendor.resolveComponent("TabBar");
  const _easycom_PopChooseAvatar2 = common_vendor.resolveComponent("PopChooseAvatar");
  (_easycom_HeightBar2 + _easycom_TabBar2 + _easycom_PopChooseAvatar2)();
}
const _easycom_HeightBar = () => "../../components/HeightBar/HeightBar.js";
const _easycom_TabBar = () => "../../components/TabBar/TabBar.js";
const _easycom_PopChooseAvatar = () => "../../components/PopChooseAvatar/PopChooseAvatar.js";
if (!Math) {
  (_easycom_HeightBar + _easycom_TabBar + _easycom_PopChooseAvatar)();
}
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const { business, user } = common_vendor.storeToRefs(stores_temp.useTempStore());
    utils_index.getTitleBarHeight();
    common_vendor.ref([
      { id: 1, name: "收货地址", path: "/pages/mine/address?type=edit" },
      { id: 2, name: "商品收藏", path: "/pages/mine/collect_list" },
      { id: 3, name: "在线客服" },
      { id: 4, name: "拨打电话" },
      { id: 5, name: "线下门店", path: "/pages/mine/shop_info_list" }
    ]);
    const order_nav_list = common_vendor.ref([
      { id: 1, name: "待付款", status: 1, nav_index: 1 },
      { id: 2, name: "待发货", status: 2, nav_index: 2 },
      { id: 3, name: "待收货", status: 4, nav_index: 3 },
      // { id: 4, name: "待评价", status: 5, nav_index: 4 },
      { id: 5, name: "已完成", status: 8, nav_index: 4 }
      // {id: 5,name: "售后",status: 7,}
    ]);
    const nav_list = common_vendor.ref([
      { id: 0, name: "猜你喜欢" }
    ]);
    const id = common_vendor.ref(0);
    const has_bar_title_color = common_vendor.ref(false);
    const is_show_bar_title = common_vendor.ref(false);
    common_vendor.ref(common_vendor.index.getSystemInfoSync().statusBarHeight + 44);
    common_vendor.ref(common_vendor.index.getSystemInfoSync().statusBarHeight);
    const show_pop_avatar = common_vendor.ref(false);
    common_vendor.ref(0);
    const is_image = common_vendor.ref(false);
    const goods_group_list = common_vendor.ref();
    const productList = common_vendor.ref();
    const goods_count = common_vendor.ref(0);
    common_vendor.onLoad(() => {
      common_vendor.index.showLoading({
        title: "loading"
      });
    });
    common_vendor.onShow(() => {
      recommend_product();
    });
    common_vendor.onReachBottom(() => {
      if (goods_count.value > productList.value.length) {
        recommend_product(productList.value.length);
      }
    });
    common_vendor.onPageScroll((e) => {
      if (e.scrollTop > 100) {
        has_bar_title_color.value = true;
        is_show_bar_title.value = true;
      } else {
        has_bar_title_color.value = false;
        is_show_bar_title.value = false;
      }
    });
    function close_is_image() {
      is_image.value = false;
    }
    function open_is_image() {
      is_image.value = true;
    }
    function on_pop_avatar_submit() {
      show_pop_avatar.value = false;
    }
    function show_pop_avatar_handler() {
      show_pop_avatar.value = true;
    }
    function on_pop_avatar_close() {
      show_pop_avatar.value = false;
    }
    function edit_user_info() {
      common_vendor.index.navigateTo({
        // url: '/pages/index/user?form_type=edit',
        url: "/pages/mine/info_edit"
      });
    }
    function makePhoneCall() {
      var phone = business.value.phone;
      if (!phone) {
        common_vendor.index.showToast({
          title: "商家未留有电话",
          icon: "none"
        });
        return;
      }
      common_vendor.index.makePhoneCall({
        phoneNumber: phone
      });
    }
    function tool_nav(path) {
      if (path) {
        common_vendor.index.navigateTo({
          url: path
        });
      } else {
        common_vendor.index.showToast({
          title: "敬请期待",
          icon: "none"
        });
      }
    }
    function nav_to(item) {
      if (item.nav_index) {
        common_vendor.index.navigateTo({
          url: "/pages/mine/order?status=" + item.status + "&nav_index=" + item.nav_index
        });
      }
    }
    async function recommend_product(length) {
      let goods_list = productList.value;
      let goods_count_temp = 0;
      let res = await utils_request.request("/WxAppCustomer/recommend_product", "post", {
        goods_group_id: id.value || "",
        offset: length || 0
      });
      if (res.code == 0) {
        goods_group_list.value = res.data.goods_group_list;
        if (length) {
          goods_list.push.apply(goods_list, res.data.goods_list);
        } else {
          goods_list = res.data.goods_list;
        }
        common_vendor.index.hideLoading();
        if (res.data.goods_group_list.length > 0) {
          nav_list.value = [{
            id: 0,
            name: "猜你喜欢"
          }];
          res.data.goods_group_list.forEach((element) => {
            nav_list.value.push(element);
          });
        }
        goods_count_temp = res.data.goods_count;
      } else {
        common_vendor.index.showToast({
          title: res.data.msg,
          icon: "none",
          mask: true
        });
      }
      productList.value = goods_list;
      goods_count.value = goods_count_temp;
    }
    function choose_nav(idParam) {
      id.value = idParam;
      recommend_product();
    }
    function to_scan_order() {
      common_vendor.index.navigateTo({
        url: "/pages/mine/scan_order"
      });
    }
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: common_vendor.p({
          appendTitleBar: true
        }),
        b: common_vendor.o(show_pop_avatar_handler),
        c: common_vendor.unref(user).wx_image,
        d: common_vendor.t(common_vendor.unref(user).user_name),
        e: common_vendor.t(common_vendor.unref(user).id),
        f: !common_vendor.unref(user).user_name
      }, !common_vendor.unref(user).user_name ? {
        g: common_vendor.o(edit_user_info)
      } : {}, {
        h: common_vendor.o(edit_user_info),
        i: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/integral")),
        j: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/money")),
        k: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/coupon/myCoupon")),
        l: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/order")),
        m: common_vendor.f(order_nav_list.value, (item, k0, i0) => {
          return {
            a: `https://saas.jizhongkeji.com/static/jzkj/images/order${item.nav_index * 1 + 1}.png`,
            b: common_vendor.t(item.name),
            c: common_vendor.o(($event) => nav_to(item))
          };
        }),
        n: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/address?type=edit")),
        o: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/collect_list")),
        p: common_vendor.o(open_is_image),
        q: common_vendor.o(makePhoneCall),
        r: common_vendor.o(($event) => tool_nav("/pages/mine/shopInfoList")),
        s: common_vendor.o(($event) => tool_nav("/pages/mine/distribution_center")),
        t: common_vendor.o(to_scan_order),
        v: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/notify/notify")),
        w: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/present")),
        x: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/product/seckill")),
        y: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/test/test")),
        z: nav_list.value.length > 0
      }, nav_list.value.length > 0 ? {
        A: common_vendor.f(nav_list.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.n(`${id.value == item.id ? "active" : ""}`),
            c: common_vendor.o(($event) => choose_nav(item.id), item.id),
            d: item.id
          };
        })
      } : {}, {
        B: ((_a = productList.value) == null ? void 0 : _a.length) > 0
      }, ((_b = productList.value) == null ? void 0 : _b.length) > 0 ? {
        C: common_vendor.f(productList.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.image_uri,
            b: common_vendor.t(item.name),
            c: item.price
          }, item.price ? {
            d: common_vendor.t(item.price)
          } : {}, {
            e: `/pages/product/detail?id=${item.id}`,
            f: index
          });
        })
      } : {}, {
        D: common_vendor.p({
          isAppMode: true
        }),
        E: show_pop_avatar.value
      }, show_pop_avatar.value ? {
        F: common_vendor.o(on_pop_avatar_submit),
        G: common_vendor.o(on_pop_avatar_close),
        H: common_vendor.o(($event) => show_pop_avatar.value = $event),
        I: common_vendor.p({
          modelValue: show_pop_avatar.value
        })
      } : {}, {
        J: is_image.value
      }, is_image.value ? {
        K: common_vendor.o(close_is_image),
        L: common_vendor.unref(business).erweima_serve
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
