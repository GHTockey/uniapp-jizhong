"use strict";
const common_vendor = require("../common/vendor.js");
const utils_request = require("../utils/request.js");
const useTempStore = common_vendor.defineStore("temp", {
  state: () => ({
    business: {},
    user: {}
  }),
  actions: {
    setBusiness(business) {
      this.business = business;
    },
    setUser(user) {
      this.user = user;
    },
    // api
    async getUserInfoApi() {
      let res = await utils_request.request("/WxAppCustomer/on_login", "post", {
        code: "0f3rdall2IQwqe4dxjnl2cdmwu2rdalv",
        wx_open_id_storage: "oPyg85Y9gzaTO9wgTmeApQMqmhRY"
      });
      this.setUser(res.data.user);
      this.setBusiness(res.data.user.business);
    }
    // getBusinessApi() {
    //     return request({
    //         url: '/api/business/getBusiness',
    //     })
    // }
  }
});
exports.useTempStore = useTempStore;
