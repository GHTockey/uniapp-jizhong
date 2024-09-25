"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "https://saas.jizhongkeji.com";
const requestInterceptors = [];
const responseInterceptors = [];
const request = (url, method = "GET", data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    let modifiedHeaders = {
      ...headers
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
