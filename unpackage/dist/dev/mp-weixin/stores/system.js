"use strict";
const common_vendor = require("../common/vendor.js");
const useSystemStore = common_vendor.defineStore("system", {
  // 状态
  state: () => {
    return {
      var1: "123123321"
    };
  },
  // 计算属性
  getters: {
    // 获取屏幕高度
    getWindowHeight: () => {
      return common_vendor.index.getSystemInfoSync().windowHeight;
    },
    // 是否是苹果移动端
    isIos: () => {
      return /(iPhone|iPad|iPod|iOS)/i.test(common_vendor.index.getSystemInfoSync().model);
    },
    // 当前宿主环境  [mp-weixin, web]
    getPlatform: () => {
      return common_vendor.index.getSystemInfoSync().uniPlatform;
    }
  },
  // 方法
  actions: {
    increment() {
      this.counter++;
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random());
    }
  }
});
exports.useSystemStore = useSystemStore;
