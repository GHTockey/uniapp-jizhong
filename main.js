import App from './App'
import * as Pinia from 'pinia'

// --------------------------------------------------------
// #ifndef VUE3
import Vue from 'vue'
// import Vant from 'vant' // *
// import 'vant/lib/index.css' // *
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})

// app.use(Vant)
app.$mount()
// #endif
// --------------------------------------------------------





// ========================================================
// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)

  // 给 app 添加全局属性
  // app.config.globalProperties.tce = 123
  // get: getCurrentInstance().proxy.tce

  app.use(Pinia.createPinia())
  return {
    app,
    Pinia
  }
}
// #endif
// ========================================================
