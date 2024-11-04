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
    const goodsDetail = common_vendor.ref({});
    const product = common_vendor.ref({});
    const act_spec1 = common_vendor.ref(0);
    const act_spec2 = common_vendor.ref(0);
    const show_select_change = common_vendor.ref(false);
    const need_spec1 = common_vendor.ref(0);
    const need_spec2 = common_vendor.ref(0);
    const add_count = common_vendor.ref(0);
    const price_show = common_vendor.ref(0);
    const price_inter = common_vendor.ref([0, 0]);
    const act_img = common_vendor.ref("");
    const max_count = common_vendor.ref(0);
    const video_list = common_vendor.ref([]);
    const swiper = common_vendor.ref({});
    const detail_image_uri = common_vendor.ref([]);
    const swiperIndex = common_vendor.ref(0);
    const act_info = common_vendor.ref(0);
    const show_pop = common_vendor.ref();
    const have_chosed = common_vendor.ref();
    common_vendor.ref();
    common_vendor.ref();
    common_vendor.ref(true);
    common_vendor.ref();
    const product_id = common_vendor.ref();
    const is_loading = common_vendor.ref(false);
    const spec_list2_init = common_vendor.ref();
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
        var sceneStr = decodeURIComponent(options.scene);
        var params = sceneStr.split("&");
        params.forEach((param) => {
          const [key, value] = param.split("=");
          if (key === "fuid") {
            getApp().globalData.fuid = value;
          } else if (key === "productid") {
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
    async function goods_detail_v2() {
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
      product.value.detail = utils_index.replaceRichTextImage(product.value.detail);
      is_loading.value = true;
      console.log("产品详情", product.value);
      if (res.data.detail) {
        common_vendor.index.setNavigationBarTitle({
          title: res.data.detail.name
        });
        let product_temp = res.data.detail;
        if (product_temp.spec_list1 && product_temp.spec_list1.option.length > 0) {
          need_spec1.value = 1;
          product_temp.spec_list1.option.forEach((ele, index2) => {
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
          console.log("视频视频视频", video_list);
        }
        swiper.value.swiperImgUrls = res.data.detail.image_uris_arr;
        swiper.value.video = res.data.detail.video_1;
        swiper.value = swiper.value;
        console.log("swiperswiperswiper", swiper.value.swiperImgUrls.length);
        if (swiper.value.swiperImgUrls.length == 1) {
          swiper.value.indicatorDots = false;
        } else {
          swiper.value.indicatorDots = false;
        }
        if (res.data.detail.detail) {
          console.log(`WxParse.wxParse('detail_content', 'html', res.data.detail.detail, that, 5);`);
        }
        detail_image_uri.value = res.data.detail.detail_images;
        console.log("5555555556666666", product.value.spec_list1);
        if (business.value.is_show_buy_pop == 1) {
          if (!(!product.value.spec_list1 && product.value.price > 0)) {
            console.log("dakai13333333333333333333333333");
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
            common_vendor.index.setPageStyle({
              style: {
                overflow: "hidden"
              }
            });
          }
        }
      }
    }
    function previewImg(tuindex) {
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
        let rel_spec_list2 = goodsDetail.value.spec_all.filter((m) => {
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
          info = goodsDetail.value.spec_all.filter((m) => m.spec1_value == act_spec1.value && m.spec2_value == act_spec2.value)[0];
        } else {
          info = goodsDetail.value.spec_all.filter((m) => m.spec1_value == act_spec1.value)[0];
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
        console.log("选择规格后的数据", goodsDetail.value.spec_all);
        let info = goodsDetail.value.spec_all.filter((m) => m.spec1_value == spec1)[0];
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
          common_vendor.index.setPageStyle({
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
          common_vendor.index.setPageStyle({
            style: {
              overflow: "hidden"
            }
          });
        }
      }
    }
    function to_buy() {
      console.log("点击购买");
      console.log("商品id", goodsDetail.value.id);
      if (!act_spec1.value) {
        common_vendor.index.showToast({
          title: "请先选择规格",
          icon: "none"
        });
      }
      if (need_spec1.value && need_spec2.value) {
        let name = goodsDetail.value.spec_list2.name || "规格";
        if (!act_spec2.value) {
          common_vendor.index.showToast({
            title: "请选择" + name,
            icon: "none"
          });
          return;
        }
      }
      act_info.value;
      common_vendor.index.navigateTo({
        url: `/pages/mine/pay?goods_id=${goodsDetail.value.id}&price_id=1073&count=1`
        // url: '/pages/mine/pay?goods_id=' + goodsDetail.value.id + '&price_id=' + goods_price.id + '&count=' + add_count.value,
      });
    }
    function swiperChange(e) {
      swiperIndex.value = e.detail.current;
    }
    function go_home(e) {
      common_vendor.index.redirectTo({
        url: "/pages/index/index"
      });
    }
    function close_pop() {
      show_pop.value = "";
      common_vendor.index.setPageStyle({
        style: {
          overflow: "unset"
        }
      });
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
      var _a, _b;
      return common_vendor.e({
        a: video_list.value.length > 0
      }, video_list.value.length > 0 ? {
        b: common_vendor.f(video_list.value, (item, index2, i0) => {
          return {
            a: item.url,
            b: index2
          };
        })
      } : {}, {
        c: common_vendor.f(swiper.value.swiperImgUrls, (item, index2, i0) => {
          return {
            a: item,
            b: index2
          };
        }),
        d: common_vendor.o(swiperChange),
        e: common_vendor.o(goBack),
        f: common_vendor.t(swiperIndex.value + 1),
        g: common_vendor.t(((_b = (_a = swiper.value) == null ? void 0 : _a.swiperImgUrls) == null ? void 0 : _b.length) + video_list.value.length),
        h: common_vendor.t(product.value.price || 0),
        i: common_vendor.t(price_show.value || "???"),
        j: common_assets._imports_0$1,
        k: common_vendor.o(($event) => showActionSheetSlot.value = true),
        l: common_vendor.t(product.value.name),
        m: common_vendor.o(($event) => showActionSheet.value = true),
        n: common_vendor.o(($event) => showActionSheet.value = true),
        o: common_vendor.o(($event) => showActionSheet.value = true),
        p: common_assets._imports_0$1,
        q: common_assets._imports_0$1,
        r: product.value.detail,
        s: common_vendor.f(detail_image_uri.value, (item, index2, i0) => {
          return {
            a: item,
            b: common_vendor.o(($event) => previewImg(), index2),
            c: index2
          };
        }),
        t: common_vendor.o(go_home),
        v: product.value.is_shoucang == 0
      }, product.value.is_shoucang == 0 ? {
        w: common_vendor.o(($event) => good_colect(1))
      } : product.value.is_shoucang == 1 ? {
        y: common_vendor.o(($event) => good_colect(0))
      } : {}, {
        x: product.value.is_shoucang == 1,
        z: common_vendor.unref(business).is_open_shopping == 1
      }, common_vendor.unref(business).is_open_shopping == 1 ? {
        A: common_vendor.o(($event) => show_buy_pop_handler("add")),
        B: common_vendor.o(($event) => show_buy_pop_handler("buy"))
      } : {}, {
        C: common_vendor.o(($event) => showActionSheet.value = $event),
        D: common_vendor.p({
          title: actionSheetData.value.title,
          items: actionSheetData.value.items,
          show: showActionSheet.value
        }),
        E: common_vendor.o(to_buy),
        F: common_vendor.o(($event) => showActionSheetSlot.value = $event),
        G: common_vendor.p({
          footerBtnText: "立即购买",
          show: showActionSheetSlot.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-acf502d9"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
