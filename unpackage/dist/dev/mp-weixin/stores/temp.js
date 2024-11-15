"use strict";
const common_vendor = require("../common/vendor.js");
const utils_request = require("../utils/request.js");
const useTempStore = common_vendor.defineStore("temp", {
  state: () => ({
    business: {},
    user: {},
    fuid: ""
  }),
  actions: {
    setBusiness(business) {
      this.business = business;
    },
    setUser(user) {
      this.user = user;
    },
    setFuid(fuid) {
      this.fuid = fuid;
    },
    async getUserInfoApi() {
      const systemRes = common_vendor.index.getSystemInfoSync();
      if (systemRes.uniPlatform == "web") {
        console.log("h5 环境");
        let res = await utils_request.request("/WxAppCustomer/on_login", "post", {
          code: "0f3rdall2IQwqe4dxjnl2cdmwu2rdalv",
          wx_open_id_storage: "oPyg85Y9gzaTO9wgTmeApQMqmhRY"
        });
        if (res.code == 0) {
          this.setUser(res.data.user);
          this.setBusiness(res.data.user.business);
        } else {
          common_vendor.index.showToast({
            title: res.msg,
            icon: "error"
          });
        }
      }
      console.log("小程序环境");
      common_vendor.wx$1.login({
        success: async (res) => {
          if (res.code) {
            let reqRes = await utils_request.request("/WxAppCustomer/on_login", "post", {
              code: res.code
            });
            this.setUser(reqRes.data.user);
            this.setBusiness(reqRes.data.user.business);
          } else {
            console.log("登录失败！" + res.errMsg);
            common_vendor.wx$1.showLoading({
              title: "登录失败！请重启再试",
              mask: true
            });
          }
        },
        fail(res) {
          console.log("登录失败！fail", res);
          common_vendor.wx$1.showLoading({
            title: "登录失败！请重启再试",
            mask: true
          });
        }
      });
    }
  }
});
exports.useTempStore = useTempStore;
