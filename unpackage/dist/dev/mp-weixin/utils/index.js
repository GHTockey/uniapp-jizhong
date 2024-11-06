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
function formatSecond(time) {
  var theTime = parseInt(time);
  var middle = 0;
  var hour = 0;
  if (theTime >= 60) {
    middle = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    if (middle >= 60) {
      hour = parseInt(middle / 60);
      middle = parseInt(middle % 60);
    }
  }
  var result = "" + formatNumber(parseInt(theTime));
  if (middle > 0) {
    result = "" + formatNumber(parseInt(middle)) + ":" + result;
  }
  if (hour > 0) {
    result = "" + formatNumber(parseInt(hour)) + ":" + result;
  }
  return result;
}
function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}
function replaceRichTextImage(text) {
  text = text.replace(/\s+/g, "");
  text = text.replace(/(\r\n|\n|\r)/g, "");
  let reg = new RegExp("<img", "gi");
  return text.replace(reg, '<img style="max-width:100%;vertical-align: top;"');
}
exports.formatSecond = formatSecond;
exports.formatTime = formatTime;
exports.getStatusBarHeight = getStatusBarHeight;
exports.getTitleBarHeight = getTitleBarHeight;
exports.replaceRichTextImage = replaceRichTextImage;
exports.toPage = toPage;
