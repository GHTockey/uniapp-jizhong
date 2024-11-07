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
function getTitleBarWidth() {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  return (((_b = (_a = common_vendor.index).getSystemInfoSync) == null ? void 0 : _b.call(_a)["windowWidth"]) - ((_e = (_d = (_c = common_vendor.index).getMenuButtonBoundingClientRect) == null ? void 0 : _d.call(_c)) == null ? void 0 : _e.right)) * 2 + ((_h = (_g = (_f = common_vendor.index).getMenuButtonBoundingClientRect) == null ? void 0 : _g.call(_f)) == null ? void 0 : _h.width) || 0;
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
  if (Array.isArray(text)) {
    return text.map((item) => {
      if (item.content_type === "rich_text" && Array.isArray(item.content)) {
        item.content = item.content.map(processRichTextNode);
      }
      return item;
    });
  } else if (typeof text === "string") {
    text = text.replace(/\s+/g, "");
    text = text.replace(/(\r\n|\n|\r)/g, "");
    let reg = new RegExp("<img", "gi");
    return text.replace(reg, '<img style="max-width:100%;vertical-align: top;"');
  }
  return text;
}
function processRichTextNode(node) {
  if (node.name === "img") {
    node.attrs.style = "max-width:100%;vertical-align: top;";
  }
  if (node.children && Array.isArray(node.children)) {
    node.children = node.children.map(processRichTextNode);
  }
  return node;
}
exports.formatSecond = formatSecond;
exports.formatTime = formatTime;
exports.getStatusBarHeight = getStatusBarHeight;
exports.getTitleBarHeight = getTitleBarHeight;
exports.getTitleBarWidth = getTitleBarWidth;
exports.replaceRichTextImage = replaceRichTextImage;
exports.toPage = toPage;
