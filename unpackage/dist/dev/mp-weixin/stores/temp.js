"use strict";
const common_vendor = require("../common/vendor.js");
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
    }
  }
});
exports.useTempStore = useTempStore;
