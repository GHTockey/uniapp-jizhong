"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  const _easycom_ProductItem2 = common_vendor.resolveComponent("ProductItem");
  const _easycom_TabBar2 = common_vendor.resolveComponent("TabBar");
  (_easycom_NavBar2 + _easycom_ProductItem2 + _easycom_TabBar2)();
}
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
const _easycom_ProductItem = () => "../../components/ProductItem/ProductItem.js";
const _easycom_TabBar = () => "../../components/TabBar/TabBar.js";
if (!Math) {
  (_easycom_NavBar + _easycom_ProductItem + _easycom_TabBar)();
}
const menu_top = 110;
const _sfc_main = {
  __name: "menu",
  setup(__props) {
    setTimeout(() => {
      console.log("=======================================containerMarTop", containerMarTop.value);
    }, 1e3);
    const containerMarTop = common_vendor.computed(() => {
      return utils_index.getTitleBarHeight() + utils_index.getStatusBarHeight();
    });
    const statusBarHeight = utils_index.getStatusBarHeight();
    const cuisine_list = common_vendor.ref();
    const currentTab = common_vendor.ref(0);
    const cuisine_id = common_vendor.ref(0);
    const category_id = common_vendor.ref(0);
    const navScrollLeft = common_vendor.ref(0);
    const productList = common_vendor.ref([]);
    const product_category_list = common_vendor.ref([]);
    const expand_box_top = common_vendor.ref(-300);
    common_vendor.ref(false);
    const navHeight = common_vendor.index.getSystemInfoSync()["statusBarHeight"];
    const business = common_vendor.ref({
      is_open_product_menu: 1,
      // 是否开启顶部菜单
      expand_list_show: false
      // 是否展开顶部菜单
    });
    common_vendor.onLoad((options) => {
      console.log("onLoad");
      getData();
    });
    common_vendor.onShow(() => {
      console.log("onShow");
      goods_list();
    });
    async function getData() {
      let res = await utils_request.request("/WxAppCustomer/goods_group_list", "post");
      common_vendor.index.hideLoading();
      if (res.code != 0)
        return common_vendor.index.showToast({ title: res.message, icon: "error" });
      cuisine_list.value = res.data.cuisine_list;
    }
    function switchNav(id) {
      var cur = id;
      if (currentTab.value == cur) {
        currentTab.value = -1;
        cuisine_id.value = 0;
        category_id.value = 0;
      } else {
        currentTab.value = cur;
        cuisine_id.value = cur;
        category_id.value = 0;
      }
      getScrollLeft();
      productList.value = [];
      goods_list();
      product_category_list_active();
    }
    function getScrollLeft() {
      const query = common_vendor.index.createSelectorQuery();
      query.selectAll(".nav-item").boundingClientRect();
      query.exec((res) => {
        let num = 0;
        for (let i = 0; i < currentTab.value - 1; i++) {
          num += res[0][i].width;
        }
        navScrollLeft.value = Math.ceil(num);
      });
    }
    async function goods_list() {
      common_vendor.index.showLoading({ title: "加载中" });
      let res = await utils_request.request("/WxAppCustomer/goods_list_v", "post", {
        offset: productList.value.length,
        goods_group_ids: category_id.value || "",
        type: 2,
        cuisine_id: cuisine_id.value || ""
      });
      common_vendor.index.hideLoading();
      if (res.code != 0)
        return common_vendor.index.showToast({ title: res.message, icon: "error" });
      res.data.goods_group_list.forEach((item) => {
        var find = product_category_list.value.find((item2) => item.id == item2.id);
        item.is_actived = false;
        item.is_category_open = find && find.is_category_open;
      });
      product_category_list.value = res.data.goods_group_list;
      if (category_id.value == 0) {
        if (product_category_list.value.length > 0) {
          var first = product_category_list.value[0].id;
          category_id.value = first;
        }
      }
      product_category_list_active();
      productList.value.push.apply(productList.value, res.data.list);
    }
    function product_category_list_active() {
      product_category_list.value.forEach((item) => {
        item.is_actived = item.id == category_id.value || item.sub_list && item.sub_list.find((item2) => item2.id == category_id.value);
      });
    }
    function open_expand_list_show() {
      expand_box_top.value = statusBarHeight + 40;
    }
    function close_expand_list_show() {
      expand_box_top.value = -300;
    }
    function navbarSelectvideo_category_id(id) {
      category_id.value = id;
      console.log(product_category_list.value.find((item2) => item2.id == id), 333);
      productList.value = [];
      goods_list();
      var item = product_category_list.value.find((item2) => item2.id == id);
      if (item) {
        if (!item.is_actived) {
          item.is_category_open = true;
        } else {
          item.is_category_open = !item.is_category_open;
        }
      }
      product_category_list_active();
    }
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: common_vendor.p({
          title: "标题",
          showSearch: true
        }),
        b: business.value.is_open_product_menu == 1
      }, business.value.is_open_product_menu == 1 ? {
        c: common_vendor.f(cuisine_list.value, (navItem, k0, i0) => {
          return {
            a: navItem.image_uri,
            b: common_vendor.t(navItem.name),
            c: common_vendor.n(currentTab.value == navItem.id ? "active" : ""),
            d: common_vendor.o(($event) => switchNav(navItem.id))
          };
        }),
        d: common_vendor.unref(statusBarHeight) + 44 + "px"
      } : {}, {
        e: ((_a = cuisine_list.value) == null ? void 0 : _a.length) > 5 && business.value.is_open_product_menu == 1
      }, ((_b = cuisine_list.value) == null ? void 0 : _b.length) > 5 && business.value.is_open_product_menu == 1 ? {
        f: common_vendor.unref(statusBarHeight) + 50 + "px",
        g: common_vendor.o(open_expand_list_show)
      } : {}, {
        h: common_vendor.f(cuisine_list.value, (navItem, idx, i0) => {
          return {
            a: navItem.image_uri,
            b: common_vendor.t(navItem.name),
            c: common_vendor.n(`nav-item ${currentTab.value == navItem.id ? "active" : ""}`),
            d: common_vendor.o(($event) => switchNav(navItem.id), idx),
            e: idx
          };
        }),
        i: common_vendor.o(close_expand_list_show),
        j: expand_box_top.value + "px",
        k: common_vendor.f(product_category_list.value, (item, k0, i0) => {
          return common_vendor.e({
            a: category_id.value == item.id || item.is_actived,
            b: common_vendor.t(item.name),
            c: common_vendor.n(`menu_item  flex_col_cen_cen ${item.is_actived ? "active" : ""} menu_item_length${item.name.length}`),
            d: common_vendor.o(($event) => navbarSelectvideo_category_id(item.id), item.id),
            e: item.sub_list && item.sub_list.length
          }, item.sub_list && item.sub_list.length ? {
            f: common_vendor.f(item.sub_list, (item_sub, k1, i1) => {
              return {
                a: common_vendor.t(item_sub.name),
                b: common_vendor.n(`menu_item menu_item_sub ${item.is_actived ? "category_open" : "category_close"} flex_col_cen_cen ${category_id.value == item_sub.id ? "active" : ""} menu_item_length${item_sub.name.length}`),
                c: common_vendor.o(($event) => navbarSelectvideo_category_id(item_sub.id), item_sub.index),
                d: item_sub.index
              };
            })
          } : {}, {
            g: item.id
          });
        }),
        l: common_vendor.unref(statusBarHeight) + menu_top + 10 + "px",
        m: "calc(100vh - " + (common_vendor.unref(statusBarHeight) + menu_top) + "px)",
        n: common_vendor.s(`height:${common_vendor.unref(navHeight)}px;padding-top:${common_vendor.unref(statusBarHeight) + 20}px;`),
        o: productList.value && productList.value.length
      }, productList.value && productList.value.length ? {
        p: common_vendor.p({
          name: "productListShowByRow",
          productListShowByRow: productList.value
        })
      } : {}, {
        q: common_vendor.p({
          isAppMode: true
        }),
        r: containerMarTop.value + "px"
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dddef5a4"]]);
wx.createPage(MiniProgramPage);
