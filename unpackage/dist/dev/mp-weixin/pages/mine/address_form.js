"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  _easycom_uni_data_picker2();
}
const _easycom_uni_data_picker = () => "../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
if (!Math) {
  _easycom_uni_data_picker();
}
const _sfc_main = {
  __name: "address_form",
  setup(__props) {
    const switch1Checked = common_vendor.ref(false);
    const type = common_vendor.ref("add");
    const form_info = common_vendor.ref({});
    const cols = common_vendor.ref([]);
    const id = common_vendor.ref(0);
    const items = common_vendor.ref([
      {
        text: "河北省",
        value: "1-0",
        children: [
          {
            text: "石家庄市",
            value: "1-1",
            children: [
              {
                text: "长安区",
                value: "1-1-1"
              }
            ]
          },
          {
            text: "保定市",
            value: "1-2"
          }
        ]
      },
      {
        text: "安徽省",
        value: "2-0"
      },
      {
        text: "北京市",
        value: "3-0"
      }
    ]);
    common_vendor.onLoad((options) => {
      get_form_col();
      if (options && options.id) {
        type.value = "edit";
        id.value = options.id;
        get_info(options.id);
        common_vendor.index.setNavigationBarTitle({
          title: "编辑收货地址"
        });
      }
    });
    function switch1Change(e) {
      console.log("switch1Change e", e);
    }
    function choose_address(e) {
      console.log("choose_address e", e);
      let addressArr = [];
      e.detail.value.forEach((item) => {
        addressArr.push(item.text);
      });
      form_info.value.address = addressArr;
    }
    function change_texare(e) {
      console.log("change_texare e", e);
      var val = e.detail.value;
      if (e.detail.value && e.detail.value.length > 200) {
        val = e.detail.value.slice(0, 200);
      }
      form_info.value.address_detail = val;
    }
    async function get_form_col() {
      common_vendor.index.showLoading({ title: "加载中" });
      let res = await utils_request.request("/WxAppCustomer/get_address_form_cols", "post", {});
      common_vendor.index.hideLoading();
      if (res.code != 0)
        return common_vendor.index.showToast({ title: res.msg, icon: "error", mask: true });
      cols.value = res.data.cols;
    }
    async function get_info(id2) {
      let res = await utils_request.request("/WxAppCustomer/get_address_detail", "post", { id: id2 });
      console.log("get_info res", res);
      if (res.code != 0)
        return common_vendor.index.showToast({ title: res.msg, icon: "error", mask: true });
      form_info.value = res.data.address;
      if (form_info.value) {
        if (form_info.value.address) {
          form_info.value.address = form_info.value.address.split(",");
        }
      }
    }
    async function submit_address(e) {
      let value = e.detail.value;
      if (value.address && value.address.length > 0) {
        value.address = value.address.join(",");
      } else if (form_info.value["address"] && form_info.value["address"].length > 0) {
        value.address = form_info.value["address"].join(",");
      } else {
        value.address = "临时省,临时市,临时区";
      }
      if (id.value) {
        value.id = id.value;
      }
      console.log("提交的内容", value);
      let res = await utils_request.request("/WxAppCustomer/edit_address", "post", value);
      console.log("submit_address res", res);
      if (res.code != 0)
        return common_vendor.index.showToast({ title: res.msg, icon: "error", mask: true });
      common_vendor.index.showToast({ title: res.msg, icon: "success", mask: true });
      setTimeout(() => {
        common_vendor.index.navigateBack();
      }, 1e3);
    }
    async function delete_tap() {
      common_vendor.index.showModal({
        title: "系统提示",
        content: "是否删除该收货地址？",
        //提示内容
        success: async function(exeRes) {
          if (exeRes.confirm) {
            let res = await utils_request.request("/WxAppCustomer/delete_address", "post", { id: id.value });
            if (res.code != 0)
              return common_vendor.index.showToast({ title: res.msg, icon: "error", mask: true });
            common_vendor.index.showToast({ title: res.msg, icon: "success", mask: true });
            setTimeout(() => {
              common_vendor.index.navigateBack();
            }, 1e3);
          }
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(cols.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.my_column_name == "address"
          }, item.my_column_name == "address" ? {
            b: common_vendor.t(item.vi_name),
            c: common_vendor.t(!form_info.value[item.my_column_name] ? "请选择" : form_info.value[item.my_column_name].join(",")),
            d: common_vendor.n(`form_picker flex_row_str_str  ${!form_info.value[item.my_column_name] ? "placeholder_text" : ""}`),
            e: common_vendor.o(choose_address, item.id),
            f: common_vendor.o(($event) => "", item.id),
            g: "2b87a36e-0-" + i0,
            h: common_vendor.o(($event) => form_info.value[item.my_column_name] = $event, item.id),
            i: common_vendor.p({
              name: item.my_column_name,
              localdata: items.value,
              ["popup-title"]: "请选择",
              modelValue: form_info.value[item.my_column_name]
            })
          } : item.my_column_name == "address_detail" ? {
            k: common_vendor.t(item.vi_name),
            l: common_vendor.o(change_texare, item.id),
            m: item.my_column_name,
            n: form_info.value[item.my_column_name]
          } : {
            o: common_vendor.t(item.vi_name),
            p: item.my_column_name,
            q: item.noneed_input ? "自动识别" : "请输入" + item.vi_name,
            r: form_info.value[item.my_column_name]
          }, {
            j: item.my_column_name == "address_detail",
            s: item.id
          });
        }),
        b: switch1Checked.value,
        c: common_vendor.o(switch1Change),
        d: type.value == "edit"
      }, type.value == "edit" ? {
        e: common_vendor.o(delete_tap)
      } : {}, {
        f: type.value == "add"
      }, type.value == "add" ? {} : {}, {
        g: common_vendor.o(submit_address)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2b87a36e"]]);
wx.createPage(MiniProgramPage);
