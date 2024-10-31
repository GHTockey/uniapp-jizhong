"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_index = require("../../utils/index.js");
const stores_temp = require("../../stores/temp.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_TabBar2 = common_vendor.resolveComponent("TabBar");
  const _easycom_PopChooseAvatar2 = common_vendor.resolveComponent("PopChooseAvatar");
  (_easycom_TabBar2 + _easycom_PopChooseAvatar2)();
}
const _easycom_TabBar = () => "../../components/TabBar/TabBar.js";
const _easycom_PopChooseAvatar = () => "../../components/PopChooseAvatar/PopChooseAvatar.js";
if (!Math) {
  (_easycom_TabBar + _easycom_PopChooseAvatar)();
}
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const { business, user } = common_vendor.storeToRefs(stores_temp.useTempStore());
    const titleBarHeight = utils_index.getTitleBarHeight();
    common_vendor.ref([
      { id: 1, name: "收货地址", path: "/pages/mine/address?type=edit" },
      { id: 2, name: "商品收藏", path: "/pages/mine/collect_list" },
      { id: 3, name: "在线客服" },
      { id: 4, name: "拨打电话" },
      { id: 5, name: "线下门店", path: "/pages/mine/shop_info_list" }
    ]);
    common_vendor.ref([
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
    common_vendor.ref(false);
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: `${common_vendor.unref(titleBarHeight)}px`,
        b: common_vendor.o(show_pop_avatar_handler),
        c: common_vendor.unref(user).wx_image,
        d: common_vendor.t(common_vendor.unref(user).user_name),
        e: common_vendor.t(common_vendor.unref(user).id),
        f: !common_vendor.unref(user).user_name
      }, !common_vendor.unref(user).user_name ? {
        g: common_vendor.o(edit_user_info)
      } : {}, {
        h: common_assets._imports_0$8,
        i: common_vendor.o(edit_user_info),
        j: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/money")),
        k: common_assets._imports_4$2,
        l: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/order")),
        m: common_vendor.f(5, (item, k0, i0) => {
          return {};
        }),
        n: common_assets._imports_2$2,
        o: common_assets._imports_3$2,
        p: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/address?type=edit")),
        q: common_assets._imports_4$3,
        r: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/collect_list")),
        s: common_assets._imports_5$1,
        t: common_assets._imports_7,
        v: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/present")),
        w: common_vendor.p({
          isAppMode: true
        }),
        x: show_pop_avatar.value
      }, show_pop_avatar.value ? {
        y: common_vendor.o(on_pop_avatar_submit),
        z: common_vendor.o(on_pop_avatar_close),
        A: common_vendor.o(($event) => show_pop_avatar.value = $event),
        B: common_vendor.p({
          modelValue: show_pop_avatar.value
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
