"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_temp = require("../../stores/temp.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_HeightBar2 = common_vendor.resolveComponent("HeightBar");
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  const _component_tempalte = common_vendor.resolveComponent("tempalte");
  const _easycom_ActionSheetSlot2 = common_vendor.resolveComponent("ActionSheetSlot");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_HeightBar2 + _easycom_NavBar2 + _component_tempalte + _easycom_ActionSheetSlot2 + _easycom_uni_popup2)();
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
    const is_checking = common_vendor.ref(0);
    const inter = common_vendor.ref(null);
    const type = common_vendor.ref();
    const good_count = common_vendor.ref();
    const order_id = common_vendor.ref();
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
    async function to_sub(e) {
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
      payPopup.value.open("center");
      return;
    }
    async function getWxPayData() {
      var json_goods = null;
      if (type.value == "buy_now") {
        let good_arr = [];
        good_arr.push(goods_info.value);
        json_goods = JSON.stringify(good_arr);
      } else {
        json_goods = JSON.stringify(good_list.value);
      }
      is_saving.value = 1;
      common_vendor.index.showLoading({
        title: "正在请求数据"
      });
      let res = await utils_request.request("/WxAppCustomer/sub_order", "post", {
        json_info: json_goods,
        address_id: address.value ? address.value.id : null,
        price_all: price_all.value || 0,
        type: type.value || "",
        buy_type: buy_type.value,
        mobile: user.value.phone || "",
        user_name: user.value.user_name || "",
        shoper_id: targte_shop.value ? targte_shop.value.id : null
      });
      common_vendor.index.hideLoading();
      if (res.code == 1) {
        is_saving.value = 0;
        common_vendor.index.showToast({
          title: res.msg,
          icon: "none",
          mask: true
        });
      } else {
        if (res.data.wxAppJsSign) {
          order_id.value = res.data.order_id;
          common_vendor.index.showLoading({
            title: "调起微信支付"
          });
          wx_pay(res.data.wxAppJsSign);
        }
      }
    }
    function payPopupConfirmHandler() {
      if (selectPayType.value == 1) {
        getWxPayData();
      } else if (selectPayType.value == 2) {
        common_vendor.index.showToast({
          title: "佣金支付[待开发]",
          icon: "none",
          mask: true
        });
      } else if (selectPayType.value == 3) {
        common_vendor.index.showToast({
          title: "储值支付[待开发]",
          icon: "none",
          mask: true
        });
      }
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
        return common_vendor.index.showToast({ title: res.msg, icon: "none", duration: 2e3 });
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
          title: "储值余额不足，\n请更换其它支付方式",
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
    function reduce_count(item) {
      if (item.count == item.limit[0]) {
        common_vendor.index.showToast({
          title: "亲，不能再减少了",
          icon: "none"
        });
        return;
      }
      let new_good_list = good_list.value.map((m) => {
        if (m.id == item.id) {
          m.count -= 1;
          m.price_all = Math.round(m.unit_price * m.count * 100, 2) / 100;
        }
        return m;
      });
      console.log("减少后的列表", new_good_list);
      good_list.value = new_good_list;
      comput_price_all(new_good_list);
    }
    function add_count(item) {
      if (item.count == item.limit[1]) {
        common_vendor.index.showToast({
          title: "亲，不能再添加了",
          icon: "none"
        });
        return;
      }
      let new_good_list = good_list.value.map((m) => {
        if (m.id == item.id) {
          m.count += 1;
          m.price_all = Math.round(m.unit_price * m.count * 100, 2) / 100;
        }
        return m;
      });
      console.log("增加后的列表", new_good_list);
      good_list.value = new_good_list;
      comput_price_all(new_good_list);
    }
    function info_reduce_count(item) {
      if (item.count == item.limit[0]) {
        common_vendor.index.showToast({
          title: "亲，不能再减少了",
          icon: "none"
        });
        return;
      }
      item.count = item.count * 1 - 1;
      item.price_all = Math.round(item.unit_price * item.count * 100, 2) / 100;
      goods_info.value = item;
      price_all.value = item.price_all;
    }
    function info_add_count(item) {
      if (item.count == item.limit[1]) {
        common_vendor.index.showToast({
          title: "亲，不能再添加了",
          icon: "none"
        });
        return;
      }
      item.count = item.count * 1 + 1;
      item.price_all = Math.round(item.unit_price * item.count * 100, 2) / 100;
      goods_info.value = item;
      price_all.value = item.price_all;
    }
    function comput_price_all(list) {
      let price_all_temp = 0;
      list.map((m) => {
        price_all_temp = Math.round((price_all_temp * 1 + m.price_all * 1) * 100, 2) / 100;
      });
      console.log("合计", price_all_temp);
      price_all.value = price_all_temp;
    }
    async function wx_pay(wxAppJsSign) {
      console.log("wx_pay", wxAppJsSign);
      if (!common_vendor.index.requestPayment)
        return common_vendor.index.showToast({ title: "当前环境不支持微信支付", icon: "none" });
      common_vendor.index.requestPayment({
        timeStamp: "" + wxAppJsSign.timeStamp,
        nonceStr: wxAppJsSign.nonceStr,
        package: wxAppJsSign.package,
        signType: wxAppJsSign.signType,
        paySign: wxAppJsSign.paySign,
        fail: (res) => {
          is_saving.value = 0;
          console.log("wx_pay 失败", res);
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "用户取消支付",
            icon: "none",
            duration: 2e3
          });
        },
        success: (res) => {
          let pay_status = 0;
          is_checking.value = 1;
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            title: "支付成功",
            duration: 2e3
          });
          inter.value = setInterval(async () => {
            let res2 = await utils_request.request("/WxAppCustomer/check_user_order", "post", {
              id: order_id.value
            });
            pay_status = res2.data.info ? res2.data.info.pay_status : 0;
            if (pay_status == 1) {
              clearInterval(inter.value);
              is_checking.value = 0;
              setTimeout(() => {
                is_saving.value = 0;
                let url = `/pages/mine/order_success?buy_type=${buy_type.value}`;
                console.log("url", url);
                common_vendor.index.redirectTo({ url });
              }, 1e3);
            }
          }, 1e3);
          return;
        },
        complete: () => {
          is_saving.value = 0;
          console.log("wx_pay 结束");
        }
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
      var _a, _b, _c, _d, _e;
      return common_vendor.e({
        a: common_vendor.p({
          title: "待付款订单",
          showBack: true,
          isWhite: true,
          bgc: "transparent"
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
        t: common_vendor.o(addressSheetBtnHandler)
      }) : {}, {}, {
        A: type.value != "buy_now"
      }, type.value != "buy_now" ? common_vendor.e({
        B: good_list.value && good_list.value.length > 0
      }, good_list.value && good_list.value.length > 0 ? common_vendor.e({
        C: common_vendor.f(good_list.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.good_imgs || "https://saas.jizhongkeji.com/static/jzkj/images/empty_img.png",
            b: common_vendor.t(item.name),
            c: item.spec_totall && item.spec_totall.length > 0
          }, item.spec_totall && item.spec_totall.length > 0 ? {
            d: common_vendor.t(item.spec_totall)
          } : {}, {
            e: common_vendor.t(item.price_all),
            f: common_vendor.n(`de_btn count_btn flex_col_cen_cen ${item.count == item.limit[0] ? "no_active" : ""}`),
            g: common_vendor.o(($event) => reduce_count(item), item.id),
            h: common_vendor.t(item.count || 1),
            i: common_vendor.n(`reduce count_btn flex_col_cen_cen ${item.count == item.limit[1] ? "no_active" : ""}`),
            j: common_vendor.o(($event) => add_count(item), item.id),
            k: item.id,
            l: "87306594-2-" + i0
          });
        })
      }, {}, {
        F: common_vendor.t(price_all.value)
      }) : {}) : {}, {
        G: type.value == "buy_now"
      }, type.value == "buy_now" ? common_vendor.e({
        H: goods_info.value
      }, goods_info.value ? common_vendor.e({
        I: goods_info.value.good_imgs || "https://saas.jizhongkeji.com/static/jzkj/images/empty_img.png",
        J: common_vendor.t(goods_info.value.name),
        K: goods_info.value.spec_totall && goods_info.value.spec_totall.length > 0
      }, goods_info.value.spec_totall && goods_info.value.spec_totall.length > 0 ? {
        L: common_vendor.t(goods_info.value.spec_totall)
      } : {}, {
        M: common_vendor.t(goods_info.value.unit_price),
        N: common_vendor.n(`de_btn count_btn flex_col_cen_cen ${goods_info.value.count == ((_a = goods_info.value.limit) == null ? void 0 : _a[0]) ? "no_active" : ""}`),
        O: common_vendor.o(($event) => info_reduce_count(goods_info.value)),
        P: common_vendor.t(goods_info.value.count || 1),
        Q: common_vendor.n(`reduce count_btn flex_col_cen_cen ${goods_info.value.count == ((_b = goods_info.value.limit) == null ? void 0 : _b[1]) ? "no_active" : ""}`),
        R: common_vendor.o(($event) => info_add_count(goods_info.value))
      }, {}, {
        U: common_vendor.t(price_all.value)
      }) : {}) : {}, {
        V: common_vendor.t(buyerMsg.value || "无留言"),
        W: common_vendor.o(($event) => showActionSheet.value = true)
      }, {}, {}, {
        Y: common_vendor.o(to_sub)
      }) : {}, {
        Z: buyerMsg.value,
        aa: common_vendor.o(($event) => buyerMsg.value = $event.detail.value),
        ab: common_vendor.o(($event) => showActionSheet.value = $event),
        ac: common_vendor.p({
          title: "买家留言",
          show: showActionSheet.value
        }),
        ad: common_vendor.t(price_all.value),
        ae: `https://saas.jizhongkeji.com/static/jzkj/static/icon/select_fill-${selectPayType.value == 1 ? "a" : "n"}.svg`,
        af: common_vendor.o(($event) => change_pay_type(1)),
        ag: common_vendor.t(common_vendor.unref(user).distribution_money_all),
        ah: `https://saas.jizhongkeji.com/static/jzkj/static/icon/select_fill-${selectPayType.value == 2 ? "a" : "n"}.svg`,
        ai: common_vendor.o(($event) => change_pay_type(2)),
        aj: common_vendor.t(save_money.value),
        ak: `https://saas.jizhongkeji.com/static/jzkj/static/icon/select_fill-${selectPayType.value == 3 ? "a" : "n"}.svg`,
        al: common_vendor.o(($event) => change_pay_type(3)),
        am: common_vendor.o(payPopupConfirmHandler),
        an: common_vendor.o(($event) => payPopup.value.close()),
        ao: common_vendor.sr(payPopup, "87306594-4", {
          "k": "payPopup"
        }),
        ap: common_vendor.o(() => {
        }),
        aq: common_vendor.p({
          ["background-color"]: "#fff",
          ["border-radius"]: "27.78rpx",
          ["mask-click"]: false
        }),
        ar: (_c = address_list.value) == null ? void 0 : _c.length
      }, ((_d = address_list.value) == null ? void 0 : _d.length) ? {
        as: common_vendor.f(address_list.value, (item, index, i0) => {
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
        at: common_vendor.o(addressSheetBtnHandler),
        av: common_vendor.o(($event) => showAddressSheet.value = $event),
        aw: common_vendor.p({
          title: "选择地址",
          footerBtnText: ((_e = address_list.value) == null ? void 0 : _e.length) ? "立即购买" : "添加收货地址",
          show: showAddressSheet.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-87306594"]]);
wx.createPage(MiniProgramPage);
