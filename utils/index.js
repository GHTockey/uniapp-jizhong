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
    // return 40 // 默认高度
    return 0;
  }
};
// 小程序胶囊按钮宽度
export function getTitleBarWidth() {
  return (uni.getSystemInfoSync?.()['windowWidth'] - uni.getMenuButtonBoundingClientRect?.()?.right) * 2 + uni.getMenuButtonBoundingClientRect?.()?.width || 0;
};


// 跳转指定页
export function toPage(url) {
  uni.navigateTo({
    url: url
  })
}



export function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export function formatSecond(time) {
  var theTime = parseInt(time); // 秒
  var middle = 0; // 分
  var hour = 0; // 小时

  if (theTime >= 60) {
    middle = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    if (middle >= 60) {
      hour = parseInt(middle / 60);
      middle = parseInt(middle % 60);
    }
  }
  var result = "" + formatNumber(parseInt(theTime)) + "";
  if (middle > 0) {
    result = "" + formatNumber(parseInt(middle)) + ":" + result;
  }
  if (hour > 0) {
    result = "" + formatNumber(parseInt(hour)) + ":" + result;
  }
  return result;
}

export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}



// 替换富文本中的图片
// let reg = new RegExp('<img','gi');
// this.info = this.info.replace(reg,'<img style="max-width:100%;vertical-align: top;"');
// export function replaceRichTextImage(text) {
//   //去除空格
//   text = text.replace(/\s+/g, '');
//   // 去除换行
//   text = text.replace(/(\r\n|\n|\r)/g, '');
//   let reg = new RegExp('<img', 'gi');
//   return text.replace(reg, '<img style="max-width:100%;vertical-align: top;"');
// }
export function replaceRichTextImage(text) {
  if (Array.isArray(text)) {
    return text.map(item => {
      if (item.content_type === "rich_text" && Array.isArray(item.content)) {
        item.content = item.content.map(processRichTextNode);
      }
      return item;
    });
  } else if (typeof text === 'string') {
    // 处理字符串类型的富文本
    text = text.replace(/\s+/g, '');
    text = text.replace(/(\r\n|\n|\r)/g, '');
    let reg = new RegExp('<img', 'gi');
    return text.replace(reg, '<img style="max-width:100%;vertical-align: top;"');
  }
  return text;
}

function processRichTextNode(node) {
  if (node.name === 'img') {
    node.attrs.style = "max-width:100%;vertical-align: top;";
  }
  if (node.children && Array.isArray(node.children)) {
    node.children = node.children.map(processRichTextNode);
  }
  return node;
}


// 节流函数
/**
 * 使用：
 * const handleSearch = throttle(() => {
    console.log('搜索');
  }, 300); // 300 毫秒的节流时间
 */
export function throttle(func, delay) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      func.apply(this, args);
    }
  };
}