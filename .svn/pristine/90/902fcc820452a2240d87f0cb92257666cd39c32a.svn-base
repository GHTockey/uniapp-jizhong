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
    return 40 // 默认高度
  }
};


// 跳转指定页
export function toPage(url) {
  uni.navigateTo({
    url: url
  })
}