"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
if (!Array) {
  const _easycom_HeightBar2 = common_vendor.resolveComponent("HeightBar");
  const _easycom_NavBar2 = common_vendor.resolveComponent("NavBar");
  const _easycom_DefaultTip2 = common_vendor.resolveComponent("DefaultTip");
  (_easycom_HeightBar2 + _easycom_NavBar2 + _easycom_DefaultTip2)();
}
const _easycom_HeightBar = () => "../../components/HeightBar/HeightBar.js";
const _easycom_NavBar = () => "../../components/NavBar/NavBar.js";
const _easycom_DefaultTip = () => "../../components/DefaultTip/DefaultTip.js";
if (!Math) {
  (_easycom_HeightBar + _easycom_NavBar + _easycom_DefaultTip)();
}
const _sfc_main = {
  __name: "money",
  setup(__props) {
    const years = common_vendor.ref([]);
    const yearsIndex1 = common_vendor.ref(0);
    const yearsIndex2 = common_vendor.ref(0);
    const echoVal = common_vendor.ref([]);
    const selectTab = common_vendor.ref(0);
    const listData = common_vendor.ref([]);
    const showListData = common_vendor.computed(() => {
      return listData.value.filter((item) => {
        return selectTab.value == 0 || selectTab.value == item.type;
      });
    });
    listData.value = [
      // type 1 收入 2 支出
      { text: "分销佣金提现", time: "2024-01-01 15:00:00", amount: 100, type: 2, mark: { text: "审核中", type: 2 } },
      { text: "分销佣金提现", time: "2024-01-01 15:00:00", amount: 100, type: 2, mark: { text: "已打款", type: 1 } },
      { text: "新人红包奖励", time: "2024-01-01 15:00:00", amount: 100, type: 1, mark: null },
      { text: "订单消费扣除", time: "2024-01-01 15:00:00", amount: 100, type: 2, mark: null }
    ];
    common_vendor.onLoad(() => {
      console.log("onLoad");
      var date = /* @__PURE__ */ new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      date.getDate();
      yearsIndex1.value = year - 1500;
      yearsIndex2.value = month - 1;
      let numbers = [];
      for (let i = 1500; i <= 2999; i++) {
        numbers.push(i);
      }
      var arr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
      years.value.push(numbers);
      years.value.push(arr);
      echoVal.value.push(year - 1500);
      echoVal.value.push(month - 1);
    });
    function yearChange(e) {
      console.log(e);
      yearsIndex1.value = e.detail.value[0];
      yearsIndex2.value = e.detail.value[1];
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          showBack: true,
          title: "我的钱包",
          isWhite: true
        }),
        b: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/topUpCenter")),
        c: common_vendor.o(($event) => common_vendor.unref(utils_index.toPage)("/pages/mine/withdraw")),
        d: selectTab.value == 0
      }, selectTab.value == 0 ? {} : {}, {
        e: common_vendor.o(($event) => selectTab.value = 0),
        f: selectTab.value == 1
      }, selectTab.value == 1 ? {} : {}, {
        g: common_vendor.o(($event) => selectTab.value = 1),
        h: selectTab.value == 2
      }, selectTab.value == 2 ? {} : {}, {
        i: common_vendor.o(($event) => selectTab.value = 2),
        j: common_vendor.t(years.value[0][yearsIndex1.value]),
        k: common_vendor.t(years.value[1][yearsIndex2.value]),
        l: years.value,
        m: echoVal.value,
        n: common_vendor.o(yearChange),
        o: listData.value.length == 0
      }, listData.value.length == 0 ? {
        p: common_vendor.p({
          text: "暂无数据, 请选择其它时间"
        })
      } : {}, {
        q: common_vendor.f(showListData.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.text),
            b: common_vendor.t(item.time),
            c: item.type == 2
          }, item.type == 2 ? {
            d: common_vendor.t(item.amount)
          } : {
            e: common_vendor.t(item.amount)
          }, {
            f: item.mark
          }, item.mark ? common_vendor.e({
            g: item.mark.type == 1
          }, item.mark.type == 1 ? {
            h: common_vendor.t(item.mark.text)
          } : {
            i: common_vendor.t(item.mark.text)
          }) : {}, {
            j: item.id
          });
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-243929c5"]]);
wx.createPage(MiniProgramPage);
