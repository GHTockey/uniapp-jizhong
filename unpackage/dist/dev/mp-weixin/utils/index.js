"use strict";
const common_vendor = require("../common/vendor.js");
function getStatusBarHeight() {
  return common_vendor.index.getSystemInfoSync().statusBarHeight || 0;
}
function getTitleBarHeight() {
  if (common_vendor.index.getMenuButtonBoundingClientRect) {
    let { top, height } = common_vendor.index.getMenuButtonBoundingClientRect();
    return height + (top - getStatusBarHeight()) * 2;
  } else {
    return 40;
  }
}
function toPage(url) {
  common_vendor.index.navigateTo({
    url
  });
}
function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return [year, month, day].map(formatNumber).join("-") + " " + [hour, minute, second].map(formatNumber).join(":");
}
function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}
function replaceRichTextImage(text) {
  let reg = new RegExp("<img", "gi");
  return text.replace(reg, '<img style="max-width:100%;vertical-align: top;"');
}
exports.formatTime = formatTime;
exports.getStatusBarHeight = getStatusBarHeight;
exports.getTitleBarHeight = getTitleBarHeight;
exports.replaceRichTextImage = replaceRichTextImage;
exports.toPage = toPage;
