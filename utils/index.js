// 状态栏高度
export function getStatusBarHeight() {
  return uni.getSystemInfoSync().statusBarHeight || 0
};
// 小程序胶囊按钮栏高度
export function getTitleBarHeight() {
  if (uni.getMenuButtonBoundingClientRect) {
    let { top, height } = uni.getMenuButtonBoundingClientRect()
    return height + (top - getStatusBarHeight()) * 2
  } else {
    return 40
  }
};