"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_temp = require("../../stores/temp.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_HeightBar2 = common_vendor.resolveComponent("HeightBar");
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  const _easycom_ActionSheetSlot2 = common_vendor.resolveComponent("ActionSheetSlot");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_HeightBar2 + _easycom_NavBar2 + _easycom_ActionSheetSlot2 + _easycom_uni_popup2)();
}
const _easycom_HeightBar = () => "../../components/HeightBar/HeightBar.js";
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
const _easycom_ActionSheetSlot = () => "../../components/ActionSheetSlot/ActionSheetSlot.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_HeightBar + _easycom_NavBar + _easycom_ActionSheetSlot + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "pay",
  setup(__props) {
    const { user, business } = common_vendor.storeToRefs(stores_temp.useTempStore());
    const good_list = common_vendor.ref([]);
    common_vendor.ref(0);
    common_vendor.ref(null);
    const type = common_vendor.ref();
    const good_count = common_vendor.ref();
    const is_loading = common_vendor.ref(true);
    const buy_type = common_vendor.ref(1);
    const is_saving = common_vendor.ref(0);
    const price_all = common_vendor.ref(0);
    const address = common_vendor.ref({});
    const address_list = common_vendor.ref([
      // {
      // 	address: "北京市,北京市,东城区",
      // 	address_detail: "333",
      // 	create_time: "2024-10-23 19:00:34",
      // 	id: 446,
      // 	is_default: 0,
      // 	mobile: "222",
      // 	update_time: "2024-10-23 19:00:34",
      // 	user_id: 10662,
      // 	user_name: "111"
      // },
      // {
      // 	address: "北京市,北京市,东城区",
      // 	address_detail: "333",
      // 	create_time: "2024-10-23 19:00:34",
      // 	id: 46,
      // 	is_default: 0,
      // 	mobile: "222",
      // 	update_time: "2024-10-23 19:00:34",
      // 	user_id: 10662,
      // 	user_name: "111"
      // }
    ]);
    const targte_shop = common_vendor.ref();
    const buyerMsg = common_vendor.ref("");
    const showAddressSheet = common_vendor.ref(false);
    const showActionSheet = common_vendor.ref(false);
    const payPopup = common_vendor.ref(null);
    const selectPayType = common_vendor.ref(1);
    const save_money = common_vendor.ref(0);
    const goods_info = common_vendor.ref({});
    const buy_type_list = common_vendor.ref([
      { id: 1, name: "门店自提" },
      { id: 0, name: "物流配送" }
    ]);
    common_vendor.onLoad((options) => {
      common_vendor.index.showLoading({
        title: "loading"
      });
      if (business && business.buy_type == 1) {
        var list = [{
          "id": 1,
          "name": "门店自提"
        }, {
          "id": 0,
          "name": "物流配送"
        }];
        buy_type_list.value = list;
        buy_type.value = 1;
      }
      console.log("onload====", buy_type.value);
      if (options && options.goods_id) {
        type.value = "buy_now";
        console.log("获取的options", options);
        get_good_info(options.goods_id, options.price_id, options.count);
      } else {
        get_info_list();
      }
    });
    common_vendor.onShow(() => {
      get_address();
      get_select_shop();
    });
    common_vendor.onUnload(() => {
      console.log("页面卸载：pay");
      clear_select_address();
    });
    function to_pay() {
      console.log("去付款");
      if (buy_type.value == 1) {
        if (!targte_shop.value || !targte_shop.value.shop_name) {
          common_vendor.index.showToast({
            title: "  请选择提货的门店  ",
            icon: "error"
          });
          return;
        }
      }
      payPopup.value.open("center");
    }
    function to_sub() {
      console.log("提交订单提交订单", buy_type.value);
      if (is_saving.value == 1) {
        console.log("加购物车 防止连点啦");
        return;
      }
      if (price_all.value <= 0)
        return;
      if ((!address.value || !address.value.mobile) && buy_type.value == 0) {
        common_vendor.index.showToast({
          title: "请先设置收货地址",
          icon: "none",
          mask: true
        });
        return;
      }
      if (buy_type.value == 1) {
        if (!targte_shop.value || !targte_shop.value.shop_name) {
          common_vendor.index.showToast({
            title: "请选择自提门店",
            icon: "none",
            mask: true
          });
          return;
        }
        if (!e.detail.value.user_name) {
          common_vendor.index.showToast({
            title: "请输入提货人员姓名",
            icon: "none",
            mask: true
          });
          return;
        }
        if (!e.detail.value.phone) {
          common_vendor.index.showToast({
            title: "请输入您的手机号码",
            icon: "none",
            mask: true
          });
          return;
        }
      }
      var json_goods = null;
      if (this.data.type == "buy_now") {
        let good_arr = [];
        good_arr.push(this.data.goods_info);
        json_goods = JSON.stringify(good_arr);
      } else {
        json_goods = JSON.stringify(this.data.good_list);
      }
      console.log("下单", json_goods);
      this.data.is_saving = 1;
      this.request({
        url: "/WxAppCustomer/sub_order",
        data: {
          json_info: json_goods,
          address_id: this.data.address ? this.data.address.id : null,
          price_all: this.data.price_all || 0,
          type: this.data.type || "",
          buy_type: this.data.buy_type,
          mobile: e.detail.value.phone || "",
          user_name: e.detail.value.user_name || "",
          shoper_id: this.data.targte_shop ? this.data.targte_shop.id : null
        },
        success: (res) => {
          if (res.data && res.data.code == 1) {
            this.data.is_saving = 0;
            common_vendor.index.showToast({
              title: res.data.msg,
              icon: "none",
              mask: true
            });
          } else {
            if (res.data.data.wxAppJsSign) {
              this.data.order_id = res.data.data.order_id;
              this.wx_pay(res.data.data.wxAppJsSign);
            }
          }
        }
      });
    }
    async function get_address() {
      let res = await utils_request.request("/WxAppCustomer/get_user_address", "post", {});
      console.log("get_address res", res);
      if (res.code != 0)
        return common_vendor.index.showToast({ title: res.msg, icon: "error", duration: 2e3 });
      address.value = res.data.address;
    }
    async function get_info_list() {
      let res = await utils_request.request("/WxAppCustomer/get_shopcar_v2", "post", { type: "selected" });
      console.log("get_info_list res", res);
      if (res.code == 1) {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "none",
          mask: true
        });
      } else {
        common_vendor.index.hideLoading();
        good_count.value = res.data.good_count;
        good_list.value = res.data.good_list;
        price_all.value = res.data.price_all;
        is_loading.value = true;
      }
    }
    async function get_good_info(goods_id, price_id, count) {
      let res = await utils_request.request("/WxAppCustomer/get_good_info", "post", {
        goods_id: goods_id || 0,
        price_id: price_id || 0,
        count: count || 0
      });
      console.log("get_good_info res", res);
      if (res.code == 1) {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "none",
          mask: true
        });
      } else {
        common_vendor.index.hideLoading();
        goods_info.value = res.data.goods_info;
        price_all.value = res.data.price_all;
        is_loading.value = true;
      }
    }
    async function clear_select_address() {
      let res = await utils_request.request("/WxAppCustomer/clear_select_address", "post", {});
      console.log("clear_select_address res", res);
      if (res.code != 0)
        return common_vendor.index.showToast({ title: res.msg, icon: "error", duration: 2e3 });
      common_vendor.index.navigateBack();
    }
    function addressSheetBtnHandler() {
      var _a;
      console.log("addressSheetBtnHandler");
      if ((_a = address_list.value) == null ? void 0 : _a.length) {
        payPopup.value.open("center");
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/mine/address"
        });
      }
    }
    function change_address(address_id) {
      address.value = address_list.value.find((item) => item.id == address_id);
    }
    function change_pay_type(pay_type) {
      if (pay_type == 3 && save_money.value < 500) {
        common_vendor.index.showToast({
          title: "储值余额不足，请更换其他支付方式",
          icon: "error"
        });
        return;
      }
      selectPayType.value = pay_type;
    }
    function change_buy_type(buyid) {
      buy_type.value = buyid;
      console.log("change_buy_type", buy_type.value);
    }
    function to_get_shop_list() {
      common_vendor.index.navigateTo({
        url: "/pages/mine/get_shop_list"
      });
    }
    async function get_select_shop() {
      let res = await utils_request.request("/WxAppCustomer/select_shop", "post", {});
      if (res.code == 1) {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "none",
          mask: true
        });
      } else {
        targte_shop.value = res.data.targte_shop;
      }
    }
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return common_vendor.e({
        a: common_vendor.p({
          title: "待付款订单",
          showBack: true,
          isWhite: true
        }),
        b: is_loading.value
      }, is_loading.value ? common_vendor.e({
        c: common_vendor.f(buy_type_list.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.n(item.id == buy_type.value ? "buy_type_active" : "buy_type_normol"),
            c: index,
            d: common_vendor.o(($event) => change_buy_type(item.id), index),
            e: item.id
          };
        }),
        d: buy_type.value == 1
      }, buy_type.value == 1 ? common_vendor.e({
        e: targte_shop.value && targte_shop.value.shop_name
      }, targte_shop.value && targte_shop.value.shop_name ? {
        f: common_vendor.t(targte_shop.value.shop_name),
        g: common_vendor.t(targte_shop.value.address_detail)
      } : {}, {
        h: common_vendor.o(to_get_shop_list),
        i: common_vendor.unref(user).user_name,
        j: common_vendor.o(($event) => common_vendor.unref(user).user_name = $event.detail.value),
        k: common_vendor.unref(user).phone,
        l: common_vendor.o(($event) => common_vendor.unref(user).phone = $event.detail.value)
      }) : {}, {
        m: buy_type.value == 0
      }, buy_type.value == 0 ? common_vendor.e({
        n: address.value && address.value.mobile
      }, address.value && address.value.mobile ? common_vendor.e({
        o: common_vendor.t(address.value.user_name),
        p: common_vendor.t(address.value.mobile),
        q: common_vendor.t(address.value.address),
        r: common_vendor.t(address.value.address_detail),
        s: address.value.is_default
      }, address.value.is_default ? {} : {}) : {}, {
        t: common_vendor.o(($event) => showAddressSheet.value = true)
      }) : {}, {
        v: goods_info.value.good_imgs || "https://saas.jizhongkeji.com/static/jzkj/images/empty_img.png",
        w: common_vendor.t(goods_info.value.name),
        x: goods_info.value.spec_totall && goods_info.value.spec_totall.length > 0
      }, goods_info.value.spec_totall && goods_info.value.spec_totall.length > 0 ? {
        y: common_vendor.t(goods_info.value.spec_totall)
      } : {}, {
        z: common_vendor.t(goods_info.value.unit_price),
        A: common_vendor.t(goods_info.value.count || 1),
        B: common_vendor.t(buyerMsg.value || "无留言"),
        C: common_vendor.o(($event) => showActionSheet.value = true),
        D: common_vendor.o(to_pay),
        E: common_vendor.o(to_sub)
      }) : {}, {
        F: buyerMsg.value,
        G: common_vendor.o(($event) => buyerMsg.value = $event.detail.value),
        H: common_vendor.o(($event) => showActionSheet.value = $event),
        I: common_vendor.p({
          title: "买家留言",
          show: showActionSheet.value
        }),
        J: `https://saas.jizhongkeji.com/static/jzkj/static/icon/select_fill-${selectPayType.value == 1 ? "a" : "n"}.svg`,
        K: common_vendor.o(($event) => change_pay_type(1)),
        L: `https://saas.jizhongkeji.com/static/jzkj/static/icon/select_fill-${selectPayType.value == 2 ? "a" : "n"}.svg`,
        M: common_vendor.o(($event) => change_pay_type(2)),
        N: common_vendor.t(save_money.value),
        O: `https://saas.jizhongkeji.com/static/jzkj/static/icon/select_fill-${selectPayType.value == 3 ? "a" : "n"}.svg`,
        P: common_vendor.o(($event) => change_pay_type(3)),
        Q: common_vendor.o(($event) => payPopup.value.close()),
        R: common_vendor.sr(payPopup, "87306594-3", {
          "k": "payPopup"
        }),
        S: common_vendor.o(() => {
        }),
        T: common_vendor.p({
          ["background-color"]: "#fff",
          ["border-radius"]: "27.78rpx",
          ["mask-click"]: false
        }),
        U: (_a = address_list.value) == null ? void 0 : _a.length
      }, ((_b = address_list.value) == null ? void 0 : _b.length) ? {
        V: common_vendor.f(address_list.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.user_name),
            b: common_vendor.t(item.mobile),
            c: common_vendor.t(item.address),
            d: common_vendor.t(item.address_detail),
            e: `https://saas.jizhongkeji.com/static/jzkj/static/icon/Checkbox_selected2-${item.id == address.value.id ? "a" : "n"}.svg`,
            f: index,
            g: common_vendor.o(($event) => change_address(item.id), index)
          };
        })
      } : {}, {
        W: common_vendor.o(addressSheetBtnHandler),
        X: common_vendor.o(($event) => showAddressSheet.value = $event),
        Y: common_vendor.p({
          title: "选择地址",
          footerBtnText: ((_c = address_list.value) == null ? void 0 : _c.length) ? "立即购买" : "添加收货地址",
          show: showAddressSheet.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-87306594"]]);
wx.createPage(MiniProgramPage);
