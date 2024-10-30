"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "https://saas.jizhongkeji.com/jzkj";
const requestInterceptors = [];
const responseInterceptors = [];
const request = (url, method = "GET", data = {}, headers = {}) => {
  data = {
    ...data,
    wx_open_id: "oPyg85Y9gzaTO9wgTmeApQMqmhRY",
    wx_appid: "wx184d389f8e1603d4",
    user_id: 10662
  };
  return new Promise((resolve, reject) => {
    let modifiedHeaders = {
      ...headers,
      ["Content-Type"]: "application/x-www-form-urlencoded"
      // php 表单提交
    };
    requestInterceptors.forEach((interceptor) => {
      const result = interceptor({
        url,
        method,
        data,
        headers: modifiedHeaders
      });
      if (result) {
        url = result.url || url;
        method = result.method || method;
        data = result.data || data;
        modifiedHeaders = result.headers || modifiedHeaders;
      }
    });
    common_vendor.index.request({
      url: `${baseURL}${url}`,
      method,
      data,
      header: modifiedHeaders,
      success: (res) => {
        responseInterceptors.forEach((interceptor) => {
          res = interceptor(res) || res;
        });
        if (res.statusCode == 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
exports.request = request;
