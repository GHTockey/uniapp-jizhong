"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_request = require("../../utils/request.js");
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
    const goodsId = common_vendor.ref();
    const goodsDetail = common_vendor.ref({});
    common_vendor.ref({});
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
      goodsId.value = options.id;
      getData();
    });
    async function getData() {
      common_vendor.index.showLoading({ title: "加载中" });
      let res = await utils_request.request("/WxAppCustomer/goods_detail", "POST", {
        id: goodsId.value
      });
      console.log("getData res", res);
      common_vendor.index.hideLoading();
      if (res.code != 0)
        return common_vendor.index.showToast({ title: res.msg, icon: "error" });
      goodsDetail.value = res.data.detail;
      common_vendor.index.setNavigationBarTitle({
        title: goodsDetail.value.name
      });
      let product = goodsDetail.value;
      if (product.spec_list1 && product.spec_list1.option.length > 0) {
        need_spec1.value = 1;
        product.spec_list1.option.forEach((ele, index) => {
          if (ele.img_uri) {
            show_select_change.value = true;
            return;
          }
        });
        console.log("规格", product.spec_list1);
      }
      if (product.spec_list2 && product.spec_list2.option.length > 0) {
        need_spec2.value = 1;
      }
      if (add_count.value > 0) {
        let show = Math.round(product.price_min * add_count.value * 100, 2) / 100;
        let min = Math.round(product.price_min * add_count.value * 100, 2) / 100;
        let max = Math.round(product.price_max * add_count.value * 100, 2) / 100;
        price_show.value = show;
        price_inter.value = [min, max];
        act_img.value = product.image_uris_arr ? product.image_uris_arr[0] : "";
        max_count.value = product.max_count;
      } else {
        price_show.value = product.price_min;
        price_inter.value = [product.price_min, product.price_max];
        act_img.value = product.image_uris_arr ? product.image_uris_arr[0] : "";
        max_count.value = product.max_count;
      }
      if (product.video_uri_arr.length > 0) {
        let video_list_temp = [];
        product.video_uri_arr.forEach((ele) => {
          video_list_temp.push({
            url: ele,
            width: 375,
            height: 375,
            bofang_show: true
          });
        });
        console.log("视频视频视频", video_list_temp);
        video_list.value = video_list_temp;
      }
      swiper.value = {
        swiperImgUrls: product.image_uris_arr,
        video: product.video_1
      };
      console.log("swiper.value.swiperImgUrls.length", swiper.value.swiperImgUrls.length);
      if (swiper.value.swiperImgUrls.length == 1) {
        swiper.value.indicatorDots = false;
      } else {
        swiper.value.indicatorDots = false;
      }
      if (product.detail) {
        console.log("WxParse");
        return;
      }
      detail_image_uri.value = product.detail_images;
      swiper.value = swiper.value;
    }
    function to_buy() {
      console.log("点击购买");
      console.log("商品id", goodsDetail.value.id);
      if (!act_spec1.value) {
        common_vendor.index.showToast({
          title: "请先选择规格",
          icon: "none"
        });
        return;
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
    return (_ctx, _cache) => {
      var _a, _b, _c;
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
        e: common_assets._imports_0$7,
        f: common_vendor.o(goBack),
        g: common_vendor.t(swiperIndex.value + 1),
        h: common_vendor.t(((_b = (_a = swiper.value) == null ? void 0 : _a.swiperImgUrls) == null ? void 0 : _b.length) + video_list.value.length),
        i: common_assets._imports_1$2,
        j: common_assets._imports_2$1,
        k: common_vendor.o(($event) => showActionSheetSlot.value = true),
        l: common_vendor.t((_c = goodsDetail.value) == null ? void 0 : _c.name),
        m: common_assets._imports_3$1,
        n: common_assets._imports_4$2,
        o: common_vendor.o(($event) => showActionSheet.value = true),
        p: common_assets._imports_5,
        q: common_assets._imports_4$2,
        r: common_vendor.o(($event) => showActionSheet.value = true),
        s: common_assets._imports_6,
        t: common_assets._imports_4$2,
        v: common_vendor.o(($event) => showActionSheet.value = true),
        w: common_assets._imports_4$2,
        x: common_assets._imports_1$2,
        y: common_assets._imports_1$2,
        z: common_assets._imports_7,
        A: common_assets._imports_8,
        B: common_assets._imports_9,
        C: common_assets._imports_10,
        D: common_vendor.o(($event) => showActionSheetSlot.value = true),
        E: common_vendor.o(($event) => showActionSheet.value = $event),
        F: common_vendor.p({
          title: actionSheetData.value.title,
          items: actionSheetData.value.items,
          show: showActionSheet.value
        }),
        G: common_assets._imports_4,
        H: common_assets._imports_12,
        I: common_assets._imports_4,
        J: common_assets._imports_4,
        K: common_assets._imports_4,
        L: common_vendor.o(to_buy),
        M: common_vendor.o(($event) => showActionSheetSlot.value = $event),
        N: common_vendor.p({
          footerBtnText: "立即购买",
          show: showActionSheetSlot.value
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-acf502d9"]]);
wx.createPage(MiniProgramPage);
