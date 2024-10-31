"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const stores_temp = require("../../stores/temp.js");
if (!Array) {
  const _easycom_TabBar2 = common_vendor.resolveComponent("TabBar");
  _easycom_TabBar2();
}
const _easycom_TabBar = () => "../../components/TabBar/TabBar.js";
if (!Math) {
  _easycom_TabBar();
}
const _sfc_main = {
  __name: "shopcar",
  setup(__props) {
    common_vendor.storeToRefs(stores_temp.useTempStore());
    common_vendor.ref(null);
    const show_price_text = common_vendor.ref("");
    const selected_ids = common_vendor.ref([]);
    const is_loading = common_vendor.ref(false);
    const good_count = common_vendor.ref(0);
    const good_list = common_vendor.ref([]);
    common_vendor.ref(0);
    const is_adding = common_vendor.ref(0);
    const checkedAll = common_vendor.ref(false);
    const jumpPage = (url) => common_vendor.index.navigateTo({ url });
    common_vendor.computed(() => {
      let price = 0;
      good_list.value.forEach((el) => {
        if (selected_ids.value.indexOf(el.id + "") != -1) {
          price += el.goods_price * el.count;
        }
      });
      return price;
    });
    common_vendor.onLoad((options) => {
      common_vendor.index.showLoading({
        title: "loading"
      });
      click_page(7);
    });
    common_vendor.onShow(() => {
      common_vendor.index.showLoading({
        title: "",
        mask: true
      });
      common_vendor.index.hideLoading();
      get_info_list();
    });
    common_vendor.onHide(() => {
      save_selected_good();
    });
    function checkboxChange(e) {
      console.log("checkbox发生change事件，携带value值为：", e.detail.value);
      var price_all = 0;
      const values = e.detail.value;
      for (let i = 0, lenI = good_list.value.length; i < lenI; ++i) {
        good_list.value[i].checked = false;
        for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (good_list.value[i].id == values[j]) {
            good_list.value[i].checked = true;
            price_all = Math.round((price_all * 1 + good_list.value[i]["price_all"] * 1) * 100, 2) / 100;
            break;
          }
        }
      }
      show_price_text.value = price_all;
      selected_ids.value = e.detail.value;
      console.log("show_price_text", price_all);
      if (e.detail.value.length == good_list.value.length) {
        console.log(checkedAll);
        checkedAll.value = true;
      } else {
        checkedAll.value = false;
      }
    }
    function checkboxAll(e) {
      console.log("全选", e);
      if (e.detail.value.length == 1) {
        var price_all = 0;
        var selected_ids_temp = [];
        const good_list_temp = good_list.value;
        for (let i = 0; i < good_list_temp.length; i++) {
          good_list_temp[i].checked = true;
          price_all = Math.round((price_all * 1 + good_list_temp[i]["price_all"] * 1) * 100, 2) / 100;
          selected_ids_temp.push(good_list_temp[i]["id"] + "");
        }
        show_price_text.value = price_all;
        good_list.value = good_list_temp;
        selected_ids.value = selected_ids_temp;
        console.log("selected_ids", selected_ids.value);
      } else {
        let good_list_temp = good_list.value;
        for (let i = 0; i < good_list_temp.length; i++) {
          good_list_temp[i].checked = false;
        }
        show_price_text.value = 0;
        good_list.value = good_list_temp;
        selected_ids.value = [];
      }
    }
    async function reduce_count_car(item) {
      console.log("reduce_count_car", item.count, item.limit[0]);
      if (item.count == item.limit[0]) {
        common_vendor.index.showModal({
          content: "要将该商品移除购物车吗",
          success: async (m) => {
            console.log(m);
            if (m.confirm) {
              let res2 = await utils_request.request("/WxAppCustomer/shop_car_count_reduce", "post", { id: item.id || 0 });
              if (res2.code != 0) {
                common_vendor.index.showToast({ title: res2.msg, icon: "none" });
                is_adding.value = 0;
                return;
              }
              is_adding.value = 0;
              get_info_list();
            }
          }
        });
        return;
      }
      let res = await utils_request.request("/WxAppCustomer/shop_car_count_reduce", "post", { id: item.id || 0 });
      if (res.code != 0) {
        common_vendor.index.showToast({ title: res.msg, icon: "none" });
        return;
      }
      is_adding.value = 0;
      get_info_list();
    }
    async function add_count_car(item) {
      if (item.count == item.limit[1]) {
        return;
      }
      let res = await utils_request.request("/WxAppCustomer/shop_car_count_add", "post", { id: item.id || 0 });
      if (res.code != 0) {
        common_vendor.index.showToast({ title: res.msg, icon: "none" });
        is_adding.value = 0;
        return;
      }
      is_adding.value = 0;
      get_info_list();
    }
    async function to_sub(e) {
      if (is_adding.value == 1)
        return;
      if (!show_price_text.value || show_price_text.value.length == 0)
        return;
      is_adding.value = 1;
      selected_ids.value.join(",");
      let res = await utils_request.request("/WxAppCustomer/save_selected_good", "post", { selected_ids: selected_ids.value });
      if (res.code != 0) {
        common_vendor.index.showToast({ title: res.msg, icon: "none" });
        is_adding.value = 0;
        return;
      }
      is_adding.value = 0;
      res.data.pay_id;
      common_vendor.index.navigateTo({ url: "/pages/mine/pay" });
    }
    async function save_selected_good() {
      console.log("保存选择");
      let res = await utils_request.request("/WxAppCustomer/save_selected_good", "post", { selected_ids: selected_ids.value });
      if (res.code != 0) {
        common_vendor.index.showToast({ title: res.msg, icon: "none" });
        return;
      }
    }
    async function to_menu(e) {
      common_vendor.index.redirectTo({
        url: "/pages/product/menu"
      });
    }
    async function get_info_list(length) {
      let res = await utils_request.request("/WxAppCustomer/get_shopcar_v2", "post", { offset: length || 0 });
      if (res.code != 0) {
        common_vendor.index.showToast({
          title: res.data.msg,
          icon: "none",
          mask: true
        });
      } else {
        common_vendor.index.hideLoading();
        is_loading.value = true;
        good_count.value = res.data.good_count;
        console.log("长度长度", length);
        if (length) {
          good_list.value.push.apply(good_list.value, res.data.good_list);
        } else {
          good_list.value = res.data.good_list;
        }
        good_list.value.forEach((item) => {
          item.previousCount = item.count;
        });
        let price_all = 0;
        if (selected_ids.value.length > 0 && good_list.value) {
          good_list.value.map((m) => {
            if (selected_ids.value.indexOf(m.id + "") != -1) {
              price_all = Math.round((price_all * 1 + m.price_all * 1) * 100, 2) / 100;
              m.checked = true;
            }
            return m;
          });
          show_price_text.value = price_all;
        }
      }
    }
    async function click_page(type) {
      let res = await utils_request.request("/WxAppCustomer/visit_page", "post", { type });
      if (res.code != 0) {
        common_vendor.index.showToast({ title: res.msg, icon: "none", mask: true });
        return;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: is_loading.value
      }, is_loading.value ? common_vendor.e({
        b: good_list.value && good_list.value.length > 0
      }, good_list.value && good_list.value.length > 0 ? {
        c: common_vendor.f(good_list.value, (item, k0, i0) => {
          return common_vendor.e({
            a: "" + item.id,
            b: item.checked,
            c: item.img_uri,
            d: common_vendor.t(item.name),
            e: item.spec_totall && item.spec_totall.length > 0
          }, item.spec_totall && item.spec_totall.length > 0 ? {
            f: common_vendor.t(item.spec_totall)
          } : {}, {
            g: common_vendor.t(item.unit_price),
            h: common_vendor.n(`de_btn count_btn flex_col_cen_cen ${item.count == 0 ? "no_active" : ""}`),
            i: common_vendor.o(($event) => reduce_count_car(item), item.id),
            j: common_vendor.t(item.count || 1),
            k: common_vendor.n(`reduce count_btn flex_col_cen_cen ${item.count == item.limit[1] ? "no_active" : ""}`),
            l: common_vendor.o(($event) => add_count_car(item), item.id),
            m: common_vendor.o(() => {
            }, item.id),
            n: common_vendor.o(($event) => jumpPage(`/pages/product/detail?id=${item.goods_id}`), item.id),
            o: item.id
          });
        }),
        d: common_vendor.o(checkboxChange)
      } : {
        e: common_vendor.o(to_menu)
      }, {
        f: good_list.value && good_list.value.length > 0
      }, good_list.value && good_list.value.length > 0 ? common_vendor.e({
        g: checkedAll.value,
        h: common_vendor.o(checkboxAll),
        i: show_price_text.value
      }, show_price_text.value ? {
        j: common_vendor.t(show_price_text.value)
      } : {}, {
        k: common_vendor.n(`sub_btn ${show_price_text.value ? "" : "no_active"}`),
        l: common_vendor.o(to_sub)
      }) : {}) : {}, {
        m: common_vendor.p({
          isAppMode: true
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9ea92179"]]);
wx.createPage(MiniProgramPage);
