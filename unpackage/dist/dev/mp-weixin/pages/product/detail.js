"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_request = require("../../utils/request.js");
const stores_temp = require("../../stores/temp.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _easycom_ActionSheet2 = common_vendor.resolveComponent("ActionSheet");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_ActionSheetSlot2 = common_vendor.resolveComponent("ActionSheetSlot");
  (_easycom_ActionSheet2 + _easycom_uni_number_box2 + _easycom_ActionSheetSlot2)();
}
const _easycom_ActionSheet = () => "../../components/ActionSheet/ActionSheet.js";
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_ActionSheetSlot = () => "../../components/ActionSheetSlot/ActionSheetSlot.js";
if (!Math) {
  (_easycom_ActionSheet + _easycom_uni_number_box + _easycom_ActionSheetSlot)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const { user, business } = common_vendor.storeToRefs(stores_temp.useTempStore());
    common_vendor.ref();
    common_vendor.ref({});
    const product = common_vendor.ref({});
    const act_spec1 = common_vendor.ref(0);
    const act_spec2 = common_vendor.ref(0);
    const show_select_change = common_vendor.ref(false);
    const need_spec1 = common_vendor.ref(0);
    const need_spec2 = common_vendor.ref(0);
    const add_count = common_vendor.ref(1);
    const price_show = common_vendor.ref(0);
    const price_inter = common_vendor.ref([0, 0]);
    const act_img = common_vendor.ref("");
    const max_count = common_vendor.ref(5);
    const video_list = common_vendor.ref([]);
    const swiper = common_vendor.ref({
      // 轮播图
      swiperImgUrls: [],
      indicatorDots: "",
      autoplay: true,
      interval: 5e3,
      duration: 1e3,
      video: null
    });
    const detail_image_uri = common_vendor.ref([]);
    const swiperIndex = common_vendor.ref(0);
    const act_info = common_vendor.ref(0);
    const limit = common_vendor.ref([1, 999]);
    const swiperCurrentIndex = common_vendor.ref(0);
    const show_pop = common_vendor.ref("");
    const have_chosed = common_vendor.ref();
    common_vendor.ref(1200);
    common_vendor.ref(750);
    common_vendor.ref(true);
    common_vendor.ref(1);
    const product_id = common_vendor.ref();
    const is_loading = common_vendor.ref(false);
    const spec_list2_init = common_vendor.ref();
    common_vendor.ref(0);
    const is_big_layout = common_vendor.ref(0);
    const showActionSheet = common_vendor.ref(false);
    const showActionSheetSlot = common_vendor.ref(false);
    const actionSheetData = common_vendor.ref({
      title: "商品参数",
      items: [
        { name: "颜色", value: "红色" },
        { name: "尺寸", value: "大号" },
        { name: "尺寸", value: "大号" },
        { name: "尺寸", value: "大号" }
      ]
    });
    function goBack() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    common_vendor.onLoad((options) => {
      if (options && options.scene) {
        console.log("options", options);
        let sceneStr = decodeURIComponent(options.scene);
        console.log("sceneStr", sceneStr);
        let params = sceneStr.split("&");
        console.log("params", params);
        params.forEach((param) => {
          const [key, value] = param.split("=");
          if (key === "fuid") {
            console.log("fuid", value);
            stores_temp.useTempStore().setFuid(value);
          } else if (key == "productid") {
            product_id.value = value;
          }
        });
        console.log("product_id", product_id.value);
      }
      if (options && options.id) {
        console.log("options.idoptions.id");
        product_id.value = options.id;
      }
      if (options.category_id) {
        click_page(3, product_id.value, options.category_id);
      } else {
        click_page(3, product_id.value, "");
      }
      goods_detail_v2();
    });
    function taggleWindow(type) {
      if (type == "video") {
        swiperCurrentIndex.value = 0;
      } else {
        swiperCurrentIndex.value = 1;
      }
    }
    async function goods_detail_v2() {
      var _a, _b;
      let res = await utils_request.request("/WxAppCustomer/goods_detail_v2", "post", { id: product_id.value });
      console.log(res);
      if (res.code != 0) {
        common_vendor.wx$1.showToast({
          title: res.msg,
          icon: "none"
        });
        return;
      }
      product.value = res.data.detail;
      product.value.detail ? product.value.detail = utils_index.replaceRichTextImage(product.value.detail) : "";
      is_loading.value = true;
      console.log("产品详情", product.value);
      if (res.data.detail) {
        common_vendor.index.setNavigationBarTitle({
          title: res.data.detail.name
        });
        let product_temp = res.data.detail;
        if (product_temp.spec_list1 && product_temp.spec_list1.option.length > 0) {
          need_spec1.value = 1;
          product_temp.spec_list1.option.forEach((ele, index) => {
            if (ele.img_uri) {
              show_select_change.value = true;
              return;
            }
          });
          console.log("规格", product_temp.spec_list1);
        }
        if (product_temp.spec_list2 && product_temp.spec_list2.option.length > 0) {
          need_spec2.value = 1;
          spec_list2_init.value = product_temp.spec_list2.option;
        }
        if (add_count.value > 0) {
          let show = Math.round(product.value.price_min * add_count.value * 100, 2) / 100;
          let min = Math.round(product.value.price_min * add_count.value * 100, 2) / 100;
          let max = Math.round(product.value.price_max * add_count.value * 100, 2) / 100;
          price_show.value = show;
          price_inter.value = [min, max];
          act_img.value = product_temp.image_uris_arr ? product_temp.image_uris_arr[0] : "";
          max_count.value = product_temp.max_count;
        } else {
          price_show.value = product_temp.price_min;
          price_inter.value = [product_temp.price_min, product_temp.price_max];
          act_img.value = product_temp.image_uris_arr ? product_temp.image_uris_arr[0] : "";
          max_count.value = product_temp.max_count;
        }
        if (res.data.detail.video_uri_arr.length > 0) {
          res.data.detail.video_uri_arr.forEach((ele) => {
            video_list.value.push({
              url: ele,
              width: 375,
              height: 375,
              bofang_show: true
            });
          });
          console.log("视频视频视频", video_list.value);
        }
        swiper.value.swiperImgUrls = res.data.detail.image_uris_arr;
        swiper.value.video = res.data.detail.video_1;
        swiper.value = swiper.value;
        if (swiper.value.swiperImgUrls.length == 1) {
          swiper.value.indicatorDots = false;
        } else {
          swiper.value.indicatorDots = false;
        }
        if (res.data.detail.detail)
          ;
        detail_image_uri.value = res.data.detail.detail_images;
        console.log("5555555556666666", product.value.spec_list1);
        if (business.value.is_show_buy_pop == 1) {
          if (!(!product.value.spec_list1 && product.value.price > 0)) {
            show_pop.value = "buy";
            act_spec1.value = 0;
            act_spec2.value = 0;
            if (product.value.spec_list1 && product.value.spec_list1.option.length > 0) {
              act_spec1.value = product.value.spec_list1.option[0].name;
              filter_by_spec();
            }
            if (product.value.spec_list2 && product.value.spec_list2.option && product.value.spec_list2.option.length > 0) {
              act_spec2.value = product.value.spec_list2.option[0].name;
              filter_by_spec();
            }
            (_b = (_a = common_vendor.index).setPageStyle) == null ? void 0 : _b.call(_a, {
              style: {
                overflow: "hidden"
              }
            });
          }
        }
      }
    }
    function previewImg(index) {
      var imgs = detail_image_uri.value;
      common_vendor.index.previewImage({
        //当前显示图片
        current: imgs[index],
        //所有图片
        urls: imgs
      });
    }
    function filter_by_spec() {
      if (need_spec1.value && need_spec2.value) {
        let rel_spec_list2 = product.value.spec_all.filter((m) => {
          return m.spec1_value == act_spec1.value;
        }).map((m1) => {
          return {
            name: m1.spec2_value,
            store: m1.store
          };
        });
        console.log("当前的规格1", rel_spec_list2);
        product.value.spec_list2.option = rel_spec_list2 || [];
        let info = null;
        if (act_spec2.value) {
          info = product.value.spec_all.filter((m) => m.spec1_value == act_spec1.value && m.spec2_value == act_spec2.value)[0];
        } else {
          info = product.value.spec_all.filter((m) => m.spec1_value == act_spec1.value)[0];
        }
        if (info.img_uri && info.img_uri.length > 0) {
          act_img.value = info.img_uri;
        }
        console.log("多选", info);
        let show = Math.round(info.price * add_count.value * 100, 2) / 100;
        price_show.value = show;
        act_info.value = info;
        max_count.value = info.store;
        return;
      } else {
        let spec1 = act_spec1.value;
        console.log("选择规格后的数据", product.value.spec_all);
        let info = product.value.spec_all.filter((m) => m.spec1_value == spec1)[0];
        let show = Math.round(info.price * add_count.value * 100, 2) / 100;
        console.log("选择规格后", info);
        if (info.img_uri && info.img_uri.length > 0) {
          act_img.value = info.img_uri;
        }
        price_show.value = show;
        act_info.value = info;
        max_count.value = info.store;
        console.log("选择规格后的最大数量", max_count.value);
      }
    }
    async function show_buy_pop_handler(type) {
      var _a, _b, _c, _d;
      if (!product.value.spec_list1 && !product.value.price) {
        common_vendor.index.showToast({
          title: "该商品暂不支持购买",
          icon: "none"
        });
        return;
      }
      if (!product.value.spec_list1 && product.value.price > 0) {
        if (type == "add") {
          let res = await utils_request.request("/WxAppCustomer/add_shopcar_only_price", "post", {
            goods_id: product.value.id,
            count: 1
          });
          if (res) {
            common_vendor.index.showToast({
              title: res.msg,
              icon: "none",
              mask: true
            });
            close_pop();
          }
        }
        if (type == "buy") {
          common_vendor.index.navigateTo({
            url: "/pages/mine/pay?goods_id=" + product.value.id + "&price_id=0&count=1"
          });
        }
        return;
      } else {
        if (type == "add") {
          show_pop.value = "add";
          act_spec1.value = 0;
          act_spec2.value = 0;
          have_chosed.value = 0;
          add_count.value = 1;
          price_show.value = product.value.price_min;
          price_inter.value = [product.value.price_min, product.value.price_max];
          act_img.value = product.value.image_uris_arr ? product.value.image_uris_arr[0] : "";
          if (product.value.spec_list1 && product.value.spec_list1.option.length > 0) {
            act_spec1.value = product.value.spec_list1.option[0].name;
            filter_by_spec();
          }
          if (product.value.spec_list2 && product.value.spec_list2.option && product.value.spec_list2.option.length > 0) {
            act_spec2.value = product.value.spec_list2.option[0].name;
            filter_by_spec();
          }
          (_b = (_a = common_vendor.index).setPageStyle) == null ? void 0 : _b.call(_a, {
            style: {
              overflow: "hidden"
            }
          });
        }
        if (type == "buy") {
          show_pop.value = "buy";
          act_spec1.value = 0;
          act_spec2.value = 0;
          if (product.value.spec_list1 && product.value.spec_list1.option.length > 0) {
            act_spec1.value = product.value.spec_list1.option[0].name;
            filter_by_spec();
          }
          if (product.value.spec_list2 && product.value.spec_list2.option.length > 0) {
            act_spec2.value = product.value.spec_list2.option[0].name;
            filter_by_spec();
          }
          (_d = (_c = common_vendor.index).setPageStyle) == null ? void 0 : _d.call(_c, {
            style: {
              overflow: "hidden"
            }
          });
        }
      }
    }
    function to_buy(e) {
      if (!act_spec1.value) {
        common_vendor.index.showToast({
          title: "请先选择规格",
          icon: "none"
        });
        return;
      }
      if (need_spec1.value && need_spec2.value) {
        let name = product.value.spec_list2.name || "规格";
        if (!act_spec2.value) {
          common_vendor.index.showToast({
            title: "请选择" + name,
            icon: "none"
          });
          return;
        }
      }
      let goods_price = act_info.value;
      common_vendor.index.navigateTo({
        url: "/pages/mine/pay?goods_id=" + product.value.id + "&price_id=" + goods_price.id + "&count=" + add_count.value
      });
      close_pop();
    }
    function swiperChange(e) {
      swiperIndex.value = e.detail.current;
      console.log("swiperCurrentIndex.value", swiperCurrentIndex.value);
    }
    function go_home(e) {
      common_vendor.index.redirectTo({
        url: "/pages/index/index"
      });
    }
    function change_layout(e) {
      is_big_layout.value = !is_big_layout.value;
    }
    function return_close(e) {
      return;
    }
    function close_pop() {
      var _a, _b;
      show_pop.value = "";
      (_b = (_a = common_vendor.index).setPageStyle) == null ? void 0 : _b.call(_a, {
        style: {
          overflow: "unset"
        }
      });
    }
    function reduce_count(e) {
      if (add_count.value > limit.value[0]) {
        if (!have_chosed.value) {
          let show = Math.round(product.value.price_min * (add_count.value - 1) * 100, 2) / 100;
          add_count.value = add_count.value * 1 - 1;
          price_show.value = show;
        } else {
          add_count.value = add_count.value * 1 - 1;
          filter_by_spec();
        }
        return;
      } else {
        common_vendor.index.showToast({
          title: "亲，不能再减少了",
          icon: "none"
        });
      }
    }
    function add_count_handler(e) {
      console.log("添加商品数量和最大数量", add_count.value, max_count.value);
      if (add_count.value >= max_count.value) {
        common_vendor.index.showToast({
          title: "亲，不能再添加了",
          icon: "none"
        });
        return;
      }
      if (!have_chosed.value) {
        let show = Math.round(product.value.price_min * (add_count.value + 1) * 100, 2) / 100;
        add_count.value = add_count.value * 1 + 1;
        price_show.value = show;
        return;
      } else {
        add_count.value = add_count.value * 1 + 1;
        filter_by_spec();
      }
      return;
    }
    function choose_spec1(item) {
      console.log("当前规格的数据", item);
      if (item.store == 0) {
        common_vendor.index.showToast({
          title: "该规格已售罄，请选择其他规格",
          icon: "none"
        });
        return;
      }
      have_chosed.value = 1;
      act_spec1.value = item.name;
      act_spec2.value = 0;
      add_count.value = 1;
      filter_by_spec();
      console.log("点击了选择规格", act_spec1.value, act_spec2.value);
    }
    function choose_spec2(item) {
      if (!act_spec1.value && need_spec2.value) {
        let name = product.value.spec_list1.name;
        common_vendor.index.showToast({
          title: "请先选择" + name,
          icon: "none"
        });
        return;
      }
      if (item.store == 0) {
        common_vendor.index.showToast({
          title: "该规格已售罄，请选择其他规格",
          icon: "none"
        });
        return;
      }
      have_chosed.value = 1;
      act_spec2.value = item.name;
      filter_by_spec();
    }
    async function add_shopcar(e) {
      if (!act_spec1.value) {
        common_vendor.index.showToast({
          title: "请先选择规格",
          icon: "none"
        });
        return;
      }
      if (need_spec1.value && need_spec2.value) {
        let name = product.value.spec_list2.name || "规格";
        if (!act_spec2.value) {
          common_vendor.index.showToast({
            title: "请选择" + name,
            icon: "none"
          });
          return;
        }
      }
      let goods_price = act_info.value;
      console.log("goods_price", goods_price);
      let res = await utils_request.request("/WxAppCustomer/add_shopcar_v2", "post", {
        price_id: goods_price.id,
        goods_id: product.value.id,
        count: add_count.value || 0
      });
      if (res) {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "none",
          mask: true
        });
        close_pop();
      }
    }
    async function click_page(type, goods_id, goods_group_id) {
      let res = await utils_request.request("/WxAppCustomer/visit_page", "post", {
        type,
        goods_id,
        goods_group_id
      });
      if (res.code == 0)
        ;
      else {
        common_vendor.index.showToast({
          title: res.msg,
          icon: "none",
          mask: true
        });
      }
    }
    async function good_colect(actiontype) {
      let res = await utils_request.request("/WxAppCustomer/costomer_collect", "post", {
        // action_type: e.currentTarget.dataset.actiontype,
        action_type: actiontype,
        goods_id: product.value.id
      });
      if (res.code == 0) {
        product.value.is_shoucang = res.data.is_shoucang;
      } else {
        common_vendor.index.showToast({
          title: res.data.msg,
          icon: "none",
          mask: true
        });
      }
    }
    common_vendor.onShareAppMessage((options) => {
      return {
        title: product.value.name,
        path: "pages/product/detail?id=" + product.value.id,
        imageUrl: product.value.image_uris_arr[0]
      };
    });
    common_vendor.onShareTimeline(() => {
      console.log("111111", product.value);
      return {
        title: product.value.name,
        path: "pages/product/detail?id=" + product.value.id,
        imageUrl: product.value.image_uris_arr[0]
      };
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f;
      return common_vendor.e({
        a: video_list.value.length > 0
      }, video_list.value.length > 0 ? {
        b: common_vendor.f(video_list.value, (item, index, i0) => {
          return {
            a: item.url,
            b: index
          };
        })
      } : {}, {
        c: common_vendor.f(swiper.value.swiperImgUrls, (item, index, i0) => {
          return {
            a: item,
            b: index
          };
        }),
        d: common_vendor.o(swiperChange),
        e: swiperCurrentIndex.value,
        f: common_vendor.o(goBack),
        g: common_vendor.t(swiperIndex.value + 1),
        h: common_vendor.t(((_b = (_a = swiper.value) == null ? void 0 : _a.swiperImgUrls) == null ? void 0 : _b.length) + video_list.value.length),
        i: video_list.value.length > 0
      }, video_list.value.length > 0 ? {
        j: common_vendor.s(`color: ${swiperIndex.value > 0 ? "#fff" : "#a7a7a7"} ;`),
        k: common_vendor.o(($event) => taggleWindow("video")),
        l: common_vendor.s(`color: ${swiperIndex.value == 0 ? "#fff" : "#a7a7a7"} ;`),
        m: common_vendor.o(($event) => taggleWindow("image"))
      } : {}, {
        n: common_vendor.t(product.value.price || 0),
        o: common_vendor.t(price_show.value || "???"),
        p: common_assets._imports_0,
        q: common_vendor.o(($event) => show_buy_pop_handler("buy")),
        r: common_vendor.t(product.value.name),
        s: common_vendor.o(($event) => showActionSheet.value = true),
        t: common_vendor.o(($event) => showActionSheet.value = true),
        v: common_vendor.o(($event) => showActionSheet.value = true),
        w: common_assets._imports_0,
        x: common_assets._imports_0,
        y: product.value.detail,
        z: common_vendor.f(detail_image_uri.value, (item, index, i0) => {
          return {
            a: item,
            b: common_vendor.o(($event) => previewImg(index), index),
            c: index
          };
        }),
        A: common_vendor.o(go_home),
        B: product.value.is_shoucang == 0
      }, product.value.is_shoucang == 0 ? {
        C: common_vendor.o(($event) => good_colect(1))
      } : product.value.is_shoucang == 1 ? {
        E: common_vendor.o(($event) => good_colect(0))
      } : {}, {
        D: product.value.is_shoucang == 1,
        F: common_vendor.unref(business).is_open_shopping == 1
      }, common_vendor.unref(business).is_open_shopping == 1 ? {
        G: common_vendor.o(($event) => show_buy_pop_handler("add")),
        H: common_vendor.o(($event) => show_buy_pop_handler("buy"))
      } : {}, {
        I: common_vendor.o(($event) => showActionSheet.value = $event),
        J: common_vendor.p({
          title: actionSheetData.value.title,
          items: actionSheetData.value.items,
          show: showActionSheet.value
        }),
        K: common_vendor.o(to_buy),
        L: common_vendor.o(($event) => showActionSheetSlot.value = $event),
        M: common_vendor.p({
          footerBtnText: "立即购买",
          show: showActionSheetSlot.value
        }),
        N: show_pop.value == "add" || show_pop.value == "buy"
      }, show_pop.value == "add" || show_pop.value == "buy" ? common_vendor.e({
        O: common_vendor.o(close_pop),
        P: act_img.value ? act_img.value : "https://saas.jizhongkeji.com/static/jzkj/images/tool_1.png",
        Q: common_vendor.o(close_pop),
        R: common_vendor.t(price_show.value),
        S: !have_chosed.value
      }, !have_chosed.value ? {} : {}, {
        T: common_vendor.t(price_inter.value[0]),
        U: common_vendor.t(price_inter.value[1]),
        V: ((_c = product.value.spec_list1) == null ? void 0 : _c.option) && product.value.spec_list1.option.length > 0
      }, ((_d = product.value.spec_list1) == null ? void 0 : _d.option) && product.value.spec_list1.option.length > 0 ? common_vendor.e({
        W: common_vendor.t(product.value.spec_list1.name),
        X: show_select_change.value
      }, show_select_change.value ? common_vendor.e({
        Y: is_big_layout.value
      }, is_big_layout.value ? {} : {
        Z: common_assets._imports_1
      }, {
        aa: common_vendor.o(change_layout)
      }) : {}, {
        ab: common_vendor.f(product.value.spec_list1.option, (item, index, i0) => {
          return common_vendor.e({
            a: item.img_uri && show_select_change.value
          }, item.img_uri && show_select_change.value ? {
            b: item.img_uri
          } : {}, {
            c: !item.img_uri && show_select_change.value
          }, !item.img_uri && show_select_change.value ? {} : {}, {
            d: common_vendor.t(item.name),
            e: item.store == 0
          }, item.store == 0 ? {} : {}, {
            f: common_vendor.n(`spec_item ${act_spec1.value == item.name ? "active" : ""} ${item.store == 0 ? "no_store" : ""} ${!is_big_layout.value && item.store == 0 ? "sell_out" : "sell_have"}`),
            g: common_vendor.o(($event) => choose_spec1(item), index),
            h: index
          });
        }),
        ac: common_vendor.n(`spec_list flex_row_str_str flex_wrap have_image ${is_big_layout.value ? "big_type" : ""}`)
      }) : {}, {
        ad: ((_e = product.value.spec_list2) == null ? void 0 : _e.option) && product.value.spec_list2.option.length > 0
      }, ((_f = product.value.spec_list2) == null ? void 0 : _f.option) && product.value.spec_list2.option.length > 0 ? {
        ae: common_vendor.t(product.value.spec_list2.name),
        af: common_vendor.f(product.value.spec_list2.option, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: item.store == 0
          }, item.store == 0 ? {} : {}, {
            c: common_vendor.n(`spec_item ${act_spec2.value == item.name ? "active" : ""} ${item.store == 0 ? "no_store no_store_juli" : ""}`),
            d: common_vendor.o(($event) => choose_spec2(item), item.id),
            e: item.id
          });
        })
      } : {}, {
        ag: common_vendor.n(`de_btn count_btn flex_col_cen_cen ${add_count.value == 1 ? "no_active" : ""}`),
        ah: common_vendor.o(reduce_count),
        ai: common_vendor.t(add_count.value || 1),
        aj: common_vendor.n(`add_btn count_btn flex_col_cen_cen ${add_count.value == max_count.value ? "no_active" : ""}`),
        ak: common_vendor.o(add_count_handler),
        al: show_pop.value == "add"
      }, show_pop.value == "add" ? {
        am: common_vendor.o(add_shopcar)
      } : {}, {
        an: show_pop.value == "buy"
      }, show_pop.value == "buy" ? {
        ao: common_vendor.o(to_buy)
      } : {}, {
        ap: common_vendor.o(return_close),
        aq: common_vendor.o(close_pop)
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-acf502d9"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
